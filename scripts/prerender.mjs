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
const SLUGS = ["soloio", "bavarian-econs", "pacho-alvarez", "guardian-of-speed", "monza-haus", "ia-index", "eleonora-morales", "plataforma-comercio-exterior", "plataforma-turismo"];
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

/* Las animaciones (framer-motion) avanzan con requestAnimationFrame, y una pestaña en segundo
 * plano no lo corre: con cuatro a la vez, en Chrome local 60 de 76 páginas salían con el título a
 * opacidad 0 (27-sep-2026; el Chromium de Vercel no frena las pestañas de atrás, por eso en
 * producción no se veía). Cada página se trae al frente para su recta final, de a una. */
let turno = Promise.resolve();
const enTurno = (fn) => {
  const r = turno.then(fn, fn);
  turno = r.catch(() => {});
  return r;
};

async function capture(browser, route) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1440, height: 900 });
    /* Fija el idioma ANTES de cargar: el auto-detect de "/" respeta localStorage,
     * así la raíz se prerenderiza en español y los prefijos /en /de /pt mandan. */
    await page.evaluateOnNewDocument(() => {
      try { localStorage.setItem("monza-lang", "es"); } catch { /* ignore */ }
      /* Las animaciones que lo consultan (la pantalla de /shopify) se congelan en un cuadro fijo:
       * así el HTML guarda siempre el mismo y el navegador sigue desde ahí (lib/prerender.ts). */
      window.__PRERENDER__ = true;
    });
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0", timeout: 45000 });
    /* networkidle0 no garantiza que la ruta perezosa ya esté pintada: con cuatro pestañas a la vez,
     * /pt/speaker salió vacía y con la canónica de la portada (27-sep-2026). Se espera a que la
     * página escriba SU canónica y tenga texto. Si no llega, se captura igual y se avisa abajo. */
    const esperadaAntes = `https://www.monzalab.com${route === "/" ? "" : route}`;
    await page
      .waitForFunction(
        (esperada) => {
          const c = document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";
          return c.replace(/\/$/, "") === esperada && (document.body.innerText || "").length > 200;
        },
        { polling: 100, timeout: 20000 },
        esperadaAntes,
      )
      .catch(() => {});
    /* Scroll a fondo y de vuelta: dispara las animaciones whileInView para que
     * el contenido no quede con opacity 0 inline. Al frente y de a una (ver enTurno). */
    return await enTurno(async () => {
      await page.bringToFront();
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
      // Lo que entró al final del recorrido termina de animar (las entradas duran ≤ 1 s).
      await new Promise((r) => setTimeout(r, 900));
      let html = await page.content();
      html = html.replace("<head>", '<head><meta name="x-prerendered" content="true">');
      // El snippet del píxel de Meta inserta fbevents.js ANTES de sí mismo; guardado así, el script
      // puede correr antes de que exista fbq y falla («fbq is not defined»): ese día no se cuenta la
      // visita. Se quita del HTML y el snippet lo vuelve a poner en orden al cargar (28-sep-2026).
      html = html.replace(/<script[^>]*src="https:\/\/connect\.facebook\.net\/[^"]*fbevents\.js"[^>]*><\/script>/g, "");
      /* Cada página tiene que salir con SU canónica. Si sale con la de la portada, Google la
       * trata como copia de la home (pasó con 9 de 76 hasta el 27-sep-2026). No rompe el build:
       * lo deja escrito en el log de Vercel. */
      const canonicas = [...html.matchAll(/<link[^>]+rel="canonical"[^>]*href="([^"]*)"/g)].map((m) => m[1]);
      const esperada = `https://www.monzalab.com${route === "/" ? "" : route}`;
      if (canonicas.length !== 1 || canonicas[0].replace(/\/$/, "") !== esperada) {
        console.warn(`[prerender] ⚠️ ${route}: canónica ${JSON.stringify(canonicas)}, se esperaba ${esperada}`);
      }
      return html;
    });
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
  const fallidas = [];
  const queue = [...routes];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const route = queue.shift();
        try {
          results.set(route, await capture(browser, route));
        } catch (err) {
          fallidas.push(route);
          console.warn(`[prerender] falló ${route}: ${String(err).slice(0, 120)}`);
        }
      }
    }),
  );
  /* Una segunda vuelta, de a una: con cuatro pestañas a la vez alguna ruta se pasa de los 45 s
   * (/en y /de/work/pacho-alvarez el 27-sep-2026) y quedaba servida como la portada vacía. */
  let failed = 0;
  for (const route of fallidas) {
    try {
      results.set(route, await capture(browser, route));
      console.log(`[prerender] ${route}: lista en la segunda vuelta`);
    } catch (err) {
      failed++;
      console.warn(`[prerender] falló otra vez ${route}: ${String(err).slice(0, 120)}`);
    }
  }
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
