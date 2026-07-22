#!/usr/bin/env node
/* Prerender post-build: sirve dist/ y captura el HTML renderizado de cada ruta
 * con Chrome headless. Los crawlers de IA (GPTBot, ClaudeBot, PerplexityBot) no
 * ejecutan JavaScript — sin esto solo ven el index.html vacío.
 *
 * Nunca rompe el build: si no hay browser disponible, loguea y sale con 0
 * (el sitio queda como SPA normal). Local usa Chrome del sistema; en Vercel
 * usa @sparticuz/chromium (ver vercel.json buildCommand). */
import { createServer } from "node:http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist", import.meta.url));
const PORT = 4917;
const CONCURRENCY = 4;

const STATICS = ["", "work", "shopify", "agentes", "studio", "monzastudio", "monzahaus", "monzaindex", "bavarianecons", "sessions", "speaker"];
const SLUGS = ["bavarian-econs", "spectro", "pacho-alvarez", "guardian-of-speed", "monza-haus", "ia-index", "eleonora-morales", "plataforma-comercio-exterior", "plataforma-turismo"];
const LANGS = ["", "/en", "/de", "/pt"];

const routes = [];
for (const lang of LANGS) {
  for (const s of STATICS) routes.push(`${lang}/${s}`.replace(/\/+$/, "") || "/");
  for (const sl of SLUGS) routes.push(`${lang}/work/${sl}`);
}

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp",
  ".woff": "font/woff", ".woff2": "font/woff2", ".mp4": "video/mp4",
  ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml",
};

/* Server estático con fallback SPA — siempre sirve el index.html ORIGINAL como
 * fallback (se guarda en memoria antes de escribir nada). */
const originalIndex = readFileSync(join(DIST, "index.html"));
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const filePath = join(DIST, path);
  try {
    if (extname(path) && existsSync(filePath)) {
      res.setHeader("Content-Type", MIME[extname(path)] ?? "application/octet-stream");
      res.end(readFileSync(filePath));
      return;
    }
  } catch { /* cae al fallback */ }
  res.setHeader("Content-Type", "text/html");
  res.end(originalIndex);
});

async function launchBrowser() {
  const puppeteer = await import("puppeteer-core");
  let executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  let args = ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"];
  if (!executablePath) {
    const macChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    if (existsSync(macChrome)) executablePath = macChrome;
  }
  if (!executablePath) {
    try {
      const chromium = (await import("@sparticuz/chromium")).default;
      executablePath = await chromium.executablePath();
      args = chromium.args;
    } catch { /* no hay chromium disponible */ }
  }
  if (!executablePath) return null;
  return puppeteer.launch({ headless: true, executablePath, args });
}

async function capture(browser, route) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1440, height: 900 });
    /* Fija el idioma ANTES de cargar: el auto-detect de "/" respeta localStorage,
     * así la raíz se prerenderiza en español y los prefijos /en /de /pt mandan. */
    await page.evaluateOnNewDocument(() => {
      try { localStorage.setItem("monza-lang", "es"); } catch { /* ignore */ }
    });
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0", timeout: 45000 });
    /* Scroll a fondo y de vuelta: dispara las animaciones whileInView para que
     * el contenido no quede con opacity 0 inline. */
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          y += 1200;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 90);
          else { window.scrollTo(0, 0); setTimeout(resolve, 400); }
        };
        step();
      });
    });
    let html = await page.content();
    html = html.replace("<head>", '<head><meta name="x-prerendered" content="true">');
    return html;
  } finally {
    await page.close();
  }
}

async function main() {
  server.listen(PORT);
  const browser = await launchBrowser();
  if (!browser) {
    console.log("[prerender] sin browser disponible — se salta (el sitio queda como SPA)");
    server.close();
    return;
  }
  console.log(`[prerender] ${routes.length} rutas…`);
  const results = new Map();
  let failed = 0;
  const queue = [...routes];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const route = queue.shift();
        try {
          results.set(route, await capture(browser, route));
        } catch (err) {
          failed++;
          console.warn(`[prerender] falló ${route}: ${String(err).slice(0, 120)}`);
        }
      }
    }),
  );
  await browser.close();
  server.close();

  /* Escribir TODO al final (así las capturas nunca se contaminan entre sí). */
  for (const [route, html] of results) {
    const outDir = route === "/" ? DIST : join(DIST, route.slice(1));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), html);
  }
  console.log(`[prerender] listo: ${results.size} páginas escritas, ${failed} fallidas`);
}

main().catch((err) => {
  console.warn(`[prerender] error no fatal — el build continúa: ${err}`);
  process.exit(0);
});
