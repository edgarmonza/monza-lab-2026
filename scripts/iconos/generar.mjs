/* Los íconos del sitio que no son el SVG — 29-sep-2026.
 *
 * WhatsApp, iMessage y los navegadores viejos no leen public/favicon.svg: piden /favicon.ico o
 * /apple-touch-icon.png. El .ico que había era el corazón de Lovable (abril) y salía al lado de cada
 * enlace compartido por WhatsApp. Este script los pinta desde el mismo favicon.svg, así hay un solo casco.
 *
 * Uso (desde la raíz del proyecto, con Chrome instalado):
 *   node scripts/iconos/generar.mjs
 * Escribe public/favicon.ico (16, 32 y 48 px) y public/apple-touch-icon.png (180 px, fondo lleno:
 * iOS redondea las esquinas por su cuenta).
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const RAIZ = path.resolve(import.meta.dirname, "../..");
const PUBLIC = path.join(RAIZ, "public");
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const svg = await readFile(path.join(PUBLIC, "favicon.svg"), "utf8");
const dataSvg = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
/* El casco solo (sin la píldora oscura), para ponerlo sobre un fondo lleno. */
const cascoSolo = svg.replace(/<rect[^>]*\/>/, "");
const dataCasco = `data:image/svg+xml;base64,${Buffer.from(cascoSolo).toString("base64")}`;

const chrome = await puppeteer.launch({ headless: true, executablePath: CHROME, args: ["--no-sandbox", "--hide-scrollbars"] });
const pag = await chrome.newPage();

const pintar = async (lado, cuerpo) => {
  await pag.setViewport({ width: lado, height: lado, deviceScaleFactor: 1 });
  await pag.setContent(`<!doctype html><html><head><style>*{margin:0;padding:0}html,body{width:${lado}px;height:${lado}px;overflow:hidden;background:transparent}</style></head><body>${cuerpo}</body></html>`);
  await pag.evaluate(() => Promise.all([...document.images].map((i) => i.decode())));
  return pag.screenshot({ type: "png", omitBackground: true });
};

try {
  /* favicon.ico: la píldora oscura con el casco, igual que el SVG, con PNG adentro (lo admiten todos desde Vista). */
  const tamanos = [16, 32, 48];
  const pngs = [];
  for (const t of tamanos) pngs.push(await pintar(t, `<img src="${dataSvg}" width="${t}" height="${t}" style="display:block">`));

  const cabecera = Buffer.alloc(6 + 16 * pngs.length);
  cabecera.writeUInt16LE(0, 0);
  cabecera.writeUInt16LE(1, 2);
  cabecera.writeUInt16LE(pngs.length, 4);
  let desplazamiento = cabecera.length;
  pngs.forEach((png, i) => {
    const e = 6 + 16 * i;
    cabecera.writeUInt8(tamanos[i], e);
    cabecera.writeUInt8(tamanos[i], e + 1);
    cabecera.writeUInt8(0, e + 2);
    cabecera.writeUInt8(0, e + 3);
    cabecera.writeUInt16LE(1, e + 4);
    cabecera.writeUInt16LE(32, e + 6);
    cabecera.writeUInt32LE(png.length, e + 8);
    cabecera.writeUInt32LE(desplazamiento, e + 12);
    desplazamiento += png.length;
  });
  await writeFile(path.join(PUBLIC, "favicon.ico"), Buffer.concat([cabecera, ...pngs]));
  console.log(`ok public/favicon.ico (${tamanos.join(", ")} px)`);

  /* apple-touch-icon: fondo lleno y el casco al 72 %, centrado. */
  const lado = 180, casco = Math.round(lado * 0.72);
  const touch = await pintar(lado, `<div style="width:${lado}px;height:${lado}px;background:#0B0B10;display:grid;place-items:center"><img src="${dataCasco}" width="${casco}" height="${casco}" style="display:block"></div>`);
  await writeFile(path.join(PUBLIC, "apple-touch-icon.png"), touch);
  console.log("ok public/apple-touch-icon.png (180 px)");
} finally {
  await chrome.close();
}
