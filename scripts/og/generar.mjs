/* Las tarjetas para compartir (og:image) de monzalab.com — 28-sep-2026.
 *
 * Una por página y una por caso, en los cuatro idiomas: 1200×630 JPG en
 * public/og/<idioma>/<ruta>.jpg (la portada es home.jpg; un caso, work/<slug>.jpg).
 * SEO.tsx las pide con `ogKey`. Cada tarjeta repite la gramática de su página: el casco y la cara
 * para la portada, el rosa para Sessions, el navegador y el celular para cada caso.
 *
 * Los textos NO se copian aquí: salen de los mismos archivos que pinta la web (los casos de
 * src/data/casos, los textos de cada página), así que al cambiar un caso basta con volver a correr esto.
 *
 * Uso (desde la raíz del proyecto, con Chrome instalado):
 *   node scripts/og/generar.mjs            → todas
 *   node scripts/og/generar.mjs soloio     → solo las que contienen «soloio» en la ruta
 * Después: subir OG_VERSION en src/components/SEO.tsx para que LinkedIn y WhatsApp las vuelvan a bajar.
 */
import http from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { createServer as crearVite } from "vite";
import puppeteer from "puppeteer-core";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const RAIZ = path.resolve(import.meta.dirname, "../..");
const PUBLIC = path.join(RAIZ, "public");
const IDIOMAS = ["es", "en", "de", "pt"];
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const FILTRO = process.argv[2] || "";

/* ── 1. Los textos, de las mismas fuentes que la web ── */
const vite = await crearVite({
  configFile: false, root: RAIZ, logLevel: "error", appType: "custom",
  server: { middlewareMode: true, hmr: false },
  resolve: { alias: { "@": path.join(RAIZ, "src") } },
  esbuild: { jsx: "automatic" },
  optimizeDeps: { noDiscovery: true, include: [] },
});
const cargar = (m) => vite.ssrLoadModule(m);
const { CASOS } = await cargar("/src/data/casos/index.ts");
const PORTADA = await cargar("/src/components/portada/textos.ts");
const SESSIONS = await cargar("/src/components/sessions/datos.ts");
const PLATAFORMAS = await cargar("/src/components/plataformas/datos.ts");
const SPEAKER = await cargar("/src/components/speaker/datos.ts");
const SHOPIFY = await cargar("/src/components/shopify/textos.ts");
const { TX: TXT_CASO } = await cargar("/src/components/caso/textos.ts");
const { default: IconoEntregable } = await cargar("/src/components/portada/IconoEntregable.tsx");
await vite.close();

const icono = (clave) => renderToStaticMarkup(createElement(IconoEntregable, { icono: clave }));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ── 2. Las piezas comunes ── */
const CASCO = `<svg viewBox="0 0 120 121" aria-hidden="true"><path class="sh" d="M60 3C36 3 12 18 7 40C2 57 2 72 6 86L15 103C23 113 38 118 57 118L60 118L63 118C82 118 97 113 105 103L114 86C118 72 118 57 113 40C108 18 84 3 60 3Z"/><path class="vi" d="M14 46C14 36 33 30 60 30C87 30 106 36 106 46L106 68C105 77 86 83 60 83C34 83 15 77 14 68Z"/></svg>`;
const logo = (clase = "") => `<span class="mlogo ${clase}">M${CASCO}NZA</span>`;
const dominio = (ruta) => `monzalab.com${ruta}`;

const CSS = /* css */ `
@font-face{font-family:"Clash Display";src:url(/fonts/clash-display-700.woff2) format("woff2");font-weight:700}
@font-face{font-family:"Clash Display";src:url(/fonts/clash-display-600.woff2) format("woff2");font-weight:600}
@font-face{font-family:"Clash Display";src:url(/fonts/clash-display-500.woff2) format("woff2");font-weight:500}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1200px;height:630px;overflow:hidden;background:#0B0B10}
body{font-family:"Clash Display",sans-serif;color:rgba(255,252,247,.92);-webkit-font-smoothing:antialiased}
.card{position:relative;width:1200px;height:630px;overflow:hidden;isolation:isolate;background:#0B0B10}
.grano{position:absolute;inset:0;z-index:30;pointer-events:none;opacity:.07;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
/* El logo: el casco mide lo que las mayúsculas, apoyado en la línea base, con el mismo tracking que las letras.
 * A tamaño chico, −.45px reparten el engorde del suavizado de las letras (como en src/components/v2/chrome.css). */
.mlogo{--ls:-.025em;--hy:calc(.0175em - .45px);display:inline-flex;align-items:baseline;font-weight:700;font-size:26px;line-height:1;letter-spacing:var(--ls);color:rgba(255,252,247,.94);white-space:nowrap}
.mlogo svg{height:.705em;width:auto;aspect-ratio:120/121;translate:0 var(--hy);margin-right:var(--ls);flex:none;display:block}
.mlogo .sh{fill:#F8B4D9}.mlogo .vi{fill:#1a1a2a}
.rosa .mlogo{color:#0B0B10}.rosa .mlogo .sh{fill:#0B0B10}.rosa .mlogo .vi{fill:#F8B4D9}
.top{position:absolute;z-index:20;left:64px;right:64px;top:50px;display:flex;align-items:center;justify-content:space-between}
.url{font-weight:500;font-size:16px;letter-spacing:.01em;color:rgba(255,252,247,.55)}
.rosa .url{color:rgba(11,11,16,.6)}
.eyebrow{display:block;font-weight:500;font-size:14px;letter-spacing:.24em;text-transform:uppercase;color:#F8B4D9;white-space:nowrap;overflow:hidden}
.rosa .eyebrow{color:rgba(11,11,16,.72)}
.ghost{position:absolute;z-index:0;left:-28px;bottom:-78px;font-weight:700;font-size:380px;line-height:.8;letter-spacing:-.05em;color:rgba(248,180,217,.05);white-space:nowrap;pointer-events:none}
.izq{position:absolute;z-index:10;left:64px;top:118px;bottom:54px;width:520px;display:flex;flex-direction:column;justify-content:center;gap:20px}
h1{font-weight:700;line-height:.9;letter-spacing:-.045em;color:rgba(255,252,247,.94);overflow-wrap:normal;text-wrap:balance}
h1 .l{display:block}
.pk{color:#F8B4D9}
.frase{font-weight:600;font-size:25px;line-height:1.18;letter-spacing:-.015em;color:rgba(255,252,247,.86)}
.glow{position:absolute;inset:0;z-index:-1;background:radial-gradient(52% 62% at 80% 56%,rgba(248,180,217,.22),transparent 70%),radial-gradient(40% 44% at 6% 0%,rgba(194,65,127,.2),transparent 70%)}
/* navegador y celular, como el hero de cada caso */
.escena{position:absolute;z-index:5;left:606px;top:118px;width:560px;height:462px}
.nave{position:absolute;left:0;top:18px;width:512px;border-radius:14px;overflow:hidden;background:#15141D;border:1px solid rgba(255,255,255,.1);box-shadow:0 50px 90px -36px rgba(0,0,0,.95),0 0 90px -30px rgba(248,180,217,.4)}
.nave-barra{display:flex;align-items:center;gap:6px;height:32px;padding:0 12px;background:#1B1A24;border-bottom:1px solid rgba(255,255,255,.06)}
.nave-barra i{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.16)}
.nave-barra span{margin-left:10px;width:220px;font-family:"Clash Display";font-weight:500;font-size:12px;color:rgba(255,252,247,.55);background:rgba(255,255,255,.06);border-radius:999px;padding:4px 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nave img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:50% 0}
.cel{position:absolute;right:0;top:128px;width:162px;padding:7px;border-radius:30px;background:#0c0c12;border:1px solid rgba(255,255,255,.14);box-shadow:0 40px 70px -24px rgba(0,0,0,.95);rotate:4deg}
.cel img{display:block;width:100%;aspect-ratio:390/760;object-fit:cover;object-position:50% 0;border-radius:23px}
.flota{position:absolute;right:0;top:238px;width:300px;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.14);box-shadow:0 40px 80px -24px rgba(0,0,0,.95),0 0 60px -20px rgba(248,180,217,.35);rotate:-2.5deg}
.flota img{display:block;width:100%}
.iconos{display:flex;align-items:center;gap:8px;flex-wrap:nowrap}
.iconos b{font-weight:500;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,252,247,.5);margin-right:6px;white-space:nowrap}
.ico{width:38px;height:38px;flex:none;display:grid;place-items:center;border-radius:11px;border:1px solid rgba(248,180,217,.3);background:rgba(248,180,217,.06);color:#F8B4D9}
.ico svg{width:19px;height:19px}
`;

/* Ajusta cada [data-max-h] hasta que quepa (alto y ancho); los .eyebrow que no caben pierden su último tramo. */
const AJUSTE = /* js */ `
(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
  for (const el of document.querySelectorAll("[data-tramos]")) {
    const tramos = JSON.parse(el.dataset.tramos);
    while (tramos.length > 1) { el.textContent = tramos.join(" · "); if (el.scrollWidth <= el.clientWidth + 1) break; tramos.pop(); }
    el.textContent = tramos.join(" · ");
  }
  for (const el of document.querySelectorAll("[data-max-h]")) {
    let fs = parseFloat(getComputedStyle(el).fontSize);
    const maxH = +el.dataset.maxH, min = +(el.dataset.min || 12);
    const sobra = () => el.scrollHeight > maxH + 1 || el.scrollWidth > el.clientWidth + 1 || [...el.querySelectorAll(".l")].some((l) => l.scrollWidth > el.clientWidth + 1);
    while (sobra() && fs > min) { fs -= 1; el.style.fontSize = fs + "px"; }
    if (sobra()) console.error("NO CABE", el.textContent.slice(0, 60));
  }
  document.body.dataset.listo = "1";
})();
`;

const pagina = (cuerpo, { rosa = false } = {}) => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head>
<body><div class="card${rosa ? " rosa" : ""}">${cuerpo}<div class="grano"></div></div><script>${AJUSTE}</script></body></html>`;

/* ── 3. Las tarjetas ── */

/* Portada: el MONZA grande con el casco, la frase del hero y la foto del casco con la cara que
 * aparece en el círculo (el «efecto de gafa» del hero, congelado en su momento de la intro). */
const tarjetaPortada = (l) => pagina(`
<style>
.foto{position:absolute;inset:0;z-index:1}
.foto .capa{position:absolute;left:0;top:0;width:1200px;height:630px;background-repeat:no-repeat}
.foto .base{--s:760px;background-image:url(/v2/edgar/casco.webp);background-size:var(--s) var(--s);background-position:calc(890px - .5 * var(--s)) calc(330px - .525 * var(--s));filter:brightness(.82)}
.foto .revela{background:#0B0B10;-webkit-mask-image:radial-gradient(circle 215px at 890px 330px,#000 0,#000 40%,rgba(0,0,0,.55) 66%,transparent 100%)}
.foto .gafas{--g:calc(.95 * 760px);background-image:url(/v2/edgar/gafas.webp);background-size:var(--g) var(--g);background-position:calc(890px - .49 * var(--g)) calc(330px - .505 * var(--g))}
.velo{position:absolute;inset:0;z-index:2;background:linear-gradient(90deg,#0B0B10 0,#0B0B10 34%,rgba(11,11,16,.55) 52%,rgba(11,11,16,0) 70%),radial-gradient(60% 70% at 74% 50%,rgba(248,180,217,.14),transparent 70%)}
.izq{gap:30px;width:600px;top:0;bottom:0}
.marca{font-size:150px;--ls:-.02em;--hy:.0175em}
.marca .l{color:rgba(255,252,247,.9)}
.linea{font-weight:500;font-size:18px;line-height:1.55;letter-spacing:.2em;text-transform:uppercase}
.linea .a{display:block;color:#F8B4D9;text-wrap:balance}
.linea .b{display:block;color:rgba(255,252,247,.92)}
</style>
<div class="foto"><div class="capa base"></div><div class="capa revela"><div class="capa gafas"></div></div></div>
<div class="velo"></div>
<div class="top"><span></span><span class="url">${dominio("")}</span></div>
<div class="izq">
  ${logo("marca")}
  <p class="linea" data-max-h="90" data-min="14"><span class="a">${esc(PORTADA.HERO.lineaA[l])}</span><span class="b">${esc(PORTADA.HERO.lineaB[l])}</span></p>
</div>`);

/* Sessions: el rosa, el titular con su caja negra y la foto de la sala con Edgar enseñando. */
const tarjetaSessions = (l) => pagina(`
<style>
.card{background:linear-gradient(135deg,#FBC8E4 0%,#F8B4D9 45%,#F2A2CB 100%)}
.ghost{color:rgba(11,11,16,.06);font-size:330px;bottom:-60px}
.izq{width:560px;gap:24px}
h1{color:#0B0B10;font-size:78px;line-height:.95;letter-spacing:-.045em}
h1 .l{white-space:nowrap}
h1 .caja{display:inline-block;background:#0B0B10;color:#F8B4D9;padding:0 .12em;margin-top:.08em}
.foto{position:absolute;z-index:5;left:690px;top:128px;width:440px;rotate:3deg}
.foto img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;object-position:52% 45%;border-radius:18px;box-shadow:0 44px 80px -30px rgba(90,20,60,.7);border:6px solid #0B0B10}
.foto span{position:absolute;left:18px;bottom:-16px;background:#0B0B10;color:#F8B4D9;font-weight:600;font-size:12.5px;letter-spacing:.18em;text-transform:uppercase;padding:9px 14px;border-radius:999px}
</style>
<div class="ghost">Sessions</div>
<div class="top">${logo()}<span class="url">${dominio("/sessions")}</span></div>
<div class="izq">
  <span class="eyebrow">${esc(SESSIONS.HERO.eyebrow[l])}</span>
  <h1 data-max-h="300" data-min="44">${esc(SESSIONS.HERO.h1[l])}<span class="l"><span class="caja">${esc(SESSIONS.HERO.h1Box[l])}</span></span></h1>
</div>
<div class="foto"><img src="/v2/sessions/sesion-sala.webp" alt=""><span>${esc(SESSIONS.HERO.asi[l])}</span></div>`, { rosa: true });

/* Studio (/shopify): el titular en dos tiempos y la estela de fotos, abierta como un abanico. */
const ESTELA = ["soloio-iglesia", "monza-casco", "soloio-terraza", "monza-burbuja"];
const tarjetaShopify = (l) => {
  const [uno, ...resto] = SHOPIFY.HERO_H1[l].split(/(?<=\.)\s+/);
  const fotos = ESTELA.map((id, i) => `<img class="f f${i}" src="/v2/estela/${id}.webp" alt="">`).join("");
  return pagina(`
<style>
.izq{width:560px}
h1{font-size:64px;line-height:.95}
.abanico{position:absolute;z-index:5;left:640px;top:120px;width:520px;height:470px}
.abanico .f{position:absolute;width:210px;aspect-ratio:440/550;object-fit:cover;border-radius:14px;border:1px solid rgba(255,255,255,.12);box-shadow:0 36px 70px -26px rgba(0,0,0,.95)}
.f0{left:0;top:96px;rotate:-10deg}.f1{left:112px;top:30px;rotate:-3deg}.f2{left:222px;top:70px;rotate:5deg}.f3{left:318px;top:128px;rotate:12deg}
</style>
<div class="glow"></div>
<div class="ghost">Studio</div>
<div class="top">${logo()}<span class="url">${dominio("/shopify")}</span></div>
<div class="izq">
  <span class="eyebrow">${esc(SHOPIFY.HERO_EYEBROW[l])}</span>
  <h1 data-max-h="330" data-min="40"><span class="l">${esc(uno)}</span><span class="l pk">${esc(resto.join(" "))}</span></h1>
</div>
<div class="abanico">${fotos}</div>`);
};

/* Plataformas: el titular con su segunda línea en rosa y la plataforma de comercio exterior con su asesor. */
const tarjetaPlataformas = (l) => pagina(`
<div class="glow"></div>
<div class="ghost">IA</div>
<div class="top">${logo()}<span class="url">${dominio("/plataformas")}</span></div>
<div class="izq">
  <span class="eyebrow" data-tramos="${esc(JSON.stringify(PLATAFORMAS.HERO.pastillas.map((p) => p[l])))}"></span>
  <h1 data-max-h="300" data-min="44" style="font-size:78px"><span>${esc(PLATAFORMAS.HERO.linea1[l])}</span> <span class="pk">${esc(PLATAFORMAS.HERO.linea2[l])}</span></h1>
</div>
<div class="escena">
  <div class="nave"><div class="nave-barra"><i></i><i></i><i></i><span>plataforma °01 · confidencial</span></div><img src="/v2/portafolio/comercio.jpg" alt=""></div>
  <div class="flota"><img src="/v2/portafolio/comercio-i.jpg" alt=""></div>
</div>`);

/* Speaker: el escenario de fondo, «No habla de IA. La usa.» con la caja rosa y el dato de público. */
const tarjetaSpeaker = (l) => {
  const publico = SPEAKER.NUMEROS.find((n) => /1.200|1,200/.test(n.n.es)) ?? SPEAKER.NUMEROS[0];
  return pagina(`
<style>
.fondo{position:absolute;inset:0;z-index:0;background:url(/v2/speaker/hero.webp) 62% 40%/cover no-repeat;filter:saturate(.9) brightness(.72)}
.velo{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(11,11,16,.94) 0,rgba(11,11,16,.8) 42%,rgba(11,11,16,.15) 78%),linear-gradient(0deg,rgba(11,11,16,.7),transparent 40%)}
.izq{width:640px;gap:26px}
h1{font-size:104px;line-height:.92}
h1 .l{white-space:nowrap}
h1 .caja{display:inline-block;background:#F8B4D9;color:#0B0B10;padding:0 .1em;margin-top:.06em}
.dato{display:flex;align-items:baseline;gap:14px}
.dato strong{font-weight:700;font-size:44px;letter-spacing:-.03em;color:#F8B4D9}
.dato span{font-weight:500;font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,252,247,.72)}
</style>
<div class="fondo"></div><div class="velo"></div>
<div class="top">${logo()}<span class="url">${dominio("/speaker")}</span></div>
<div class="izq">
  <span class="eyebrow">${esc(SPEAKER.HERO.eyebrow[l])}</span>
  <h1 data-max-h="300" data-min="48"><span class="l">${esc(SPEAKER.HERO.titulo[l].trim())}</span><span class="l"><span class="caja">${esc(SPEAKER.HERO.resaltado[l])}</span></span></h1>
  <p class="dato"><strong>${esc(publico.n[l])}</strong><span>${esc(publico.label[l])}</span></p>
</div>`);
};

/* /work: «Lo que hemos construido» y un muro con las webs de los casos. */
const tarjetaWork = (l) => {
  const muro = CASOS.filter((c) => !c.confidencial).slice(0, 6).map((c) => `<img src="${c.tarjeta.imagen}" alt="">`).join("");
  return pagina(`
<style>
.muro{position:absolute;z-index:3;left:580px;top:20px;width:900px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;rotate:-10deg;transform-origin:0 0;translate:0 150px}
.muro img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:50% 0;border-radius:10px;border:1px solid rgba(255,255,255,.1);box-shadow:0 30px 50px -20px rgba(0,0,0,.9)}
.velo{position:absolute;inset:0;z-index:4;background:linear-gradient(180deg,rgba(11,11,16,.92) 0,rgba(11,11,16,0) 26%),linear-gradient(90deg,#0B0B10 0,#0B0B10 40%,rgba(11,11,16,.6) 52%,rgba(11,11,16,0) 66%)}
.izq{width:540px}
h1{font-size:96px}
</style>
<div class="glow"></div>
<div class="muro">${muro}</div><div class="velo"></div>
<div class="top">${logo()}<span class="url">${dominio("/work")}</span></div>
<div class="izq">
  <span class="eyebrow">${esc(TXT_CASO.proyectos[l])}</span>
  <h1 data-max-h="280" data-min="48">${esc(PORTADA.PROYECTOS.eyebrow[l])}.</h1>
  <p class="frase" data-max-h="90" data-min="17">${esc(PORTADA.PROYECTOS.titulo[l])}</p>
</div>`);
};

/* Un caso: su título en dos tiempos, su frase, sus pastillas, lo que producimos y su web recorriéndose. */
const tarjetaCaso = (c) => (l) => {
  const iconos = [...new Set(c.producimos.items.map((i) => i.icono))].slice(0, 7);
  const visual = c.tarjeta.imagenCel
    ? `<div class="cel"><img src="${c.tarjeta.imagenCel}" alt=""></div>`
    : c.tarjeta.inserto ? `<div class="flota"><img src="${c.tarjeta.inserto}" alt=""></div>` : "";
  const barra = c.hero.web.barra;
  return pagina(`
<div class="glow"></div>
<div class="ghost">${esc(c.hero.fantasma)}</div>
<div class="top">${logo()}<span class="url">${dominio(`/work/${c.slug}`)}</span></div>
<div class="izq">
  <span class="eyebrow" data-tramos="${esc(JSON.stringify(c.hero.pastillas.map((p) => p[l])))}"></span>
  <h1 data-max-h="236" data-min="46" style="font-size:98px"><span class="l">${esc(c.hero.linea1[l])}</span><span class="l pk">${esc(c.hero.linea2[l])}</span></h1>
  <p class="frase" data-max-h="90" data-min="17">${esc(c.hero.frase[l])}</p>
  <div class="iconos"><b>${esc(TXT_CASO.producimos[l])}</b>${iconos.map((i) => `<span class="ico">${icono(i)}</span>`).join("")}</div>
</div>
<div class="escena">
  <div class="nave"><div class="nave-barra"><i></i><i></i><i></i><span>${esc(barra)}</span></div><img src="${c.tarjeta.imagen}" alt=""></div>
  ${visual}
</div>`);
};

const TARJETAS = [
  { ruta: "home", html: tarjetaPortada },
  { ruta: "sessions", html: tarjetaSessions },
  { ruta: "shopify", html: tarjetaShopify },
  { ruta: "plataformas", html: tarjetaPlataformas },
  { ruta: "speaker", html: tarjetaSpeaker },
  { ruta: "work", html: tarjetaWork },
  ...CASOS.map((c) => ({ ruta: `work/${c.slug}`, html: tarjetaCaso(c) })),
].filter((t) => t.ruta.includes(FILTRO));

/* ── 4. Pintar: un servidor mínimo sobre public/ y Chrome ── */
const TIPOS = { ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".avif": "image/avif", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
let actual = "";
const servidor = http.createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (url === "/__tarjeta") { res.writeHead(200, { "content-type": "text/html; charset=utf-8" }); return res.end(actual); }
  try {
    const archivo = path.join(PUBLIC, path.normalize(url));
    if (!archivo.startsWith(PUBLIC)) throw new Error("fuera");
    const datos = await readFile(archivo);
    res.writeHead(200, { "content-type": TIPOS[path.extname(archivo)] || "application/octet-stream" });
    res.end(datos);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => servidor.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${servidor.address().port}`;

const chrome = await puppeteer.launch({ headless: true, executablePath: CHROME, args: ["--no-sandbox", "--hide-scrollbars", "--font-render-hinting=none"] });
const pag = await chrome.newPage();
await pag.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
const faltas = [];
pag.on("console", (m) => { if (m.type() === "error") faltas.push(m.text()); });
pag.on("requestfailed", (r) => faltas.push(`no cargó ${r.url()}`));
pag.on("response", (r) => { if (r.status() >= 400) faltas.push(`${r.status()} ${r.url().replace(BASE, "")}`); });

let n = 0;
try {
  for (const t of TARJETAS) {
    for (const l of IDIOMAS) {
      actual = t.html(l);
      const antes = faltas.length;
      await pag.goto(`${BASE}/__tarjeta`, { waitUntil: "networkidle0" });
      await pag.waitForFunction(() => document.body.dataset.listo === "1", { timeout: 15000 });
      const destino = path.join(PUBLIC, "og", l, `${t.ruta}.jpg`);
      await mkdir(path.dirname(destino), { recursive: true });
      await pag.screenshot({ path: destino, type: "jpeg", quality: 88 });
      n++;
      console.log(`${faltas.length > antes ? "⚠️ " : "ok"} ${path.relative(RAIZ, destino)}${faltas.length > antes ? "  " + faltas.slice(antes).join(" | ") : ""}`);
    }
  }
} finally {
  await chrome.close();
  servidor.close();
}
console.log(`\n${n} tarjetas${faltas.length ? ` · ${faltas.length} avisos` : ""}`);
if (faltas.length) process.exitCode = 1;
