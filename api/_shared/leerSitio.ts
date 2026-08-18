/* Lee la web de un visitante desde el servidor y devuelve hechos útiles para
 * el agente comercial: qué vende, en qué plataforma corre, si hay WhatsApp
 * visible, cuántos productos publica (si es Shopify), títulos y un extracto.
 *
 * Es criterio en vivo, no scraping: una sola página (más products.json si
 * es Shopify), con límites duros de tiempo y tamaño. Instagram no se puede
 * leer (login) — el agente pide la web.
 *
 * Seguridad: solo http(s), host con punto, sin IPs literales ni hosts locales;
 * respuesta solo si es HTML; máximo ~400 KB; 8 s de espera.
 */

export type SiteFacts = {
  ok: true;
  url: string;
  finalUrl: string;
  title: string;
  description: string;
  headings: string[];
  platform: string;
  whatsapp: boolean;
  instagram: string | null;
  email: string | null;
  languageHint: string | null;
  productCount: number | null;
  productSamples: string[];
  excerpt: string;
};

export type SiteError = { ok: false; error: string; url?: string };

const UA = "MonzaLabAgent/1.0 (+https://monzalab.com; agente comercial)";
const MAX_BYTES = 400_000;
const TIMEOUT_MS = 8_000;

const isIpLiteral = (host: string) => /^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.includes(":");

/** "tienda.com/producto" → "https://tienda.com/producto". null si no es una URL pública válida. */
export function normalizeSiteUrl(raw: string): string | null {
  const s = (raw || "").trim().replace(/^<|>$/g, "");
  if (!s) return null;
  const withScheme = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  let u: URL;
  try {
    u = new URL(withScheme);
  } catch {
    return null;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  const host = u.hostname.toLowerCase();
  if (!host.includes(".")) return null;
  if (isIpLiteral(host)) return null;
  if (/(^|\.)(localhost|local|internal|lan|home|corp)$/.test(host)) return null;
  if (u.username || u.password) return null;
  u.hash = "";
  return u.toString();
}

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const clean = (s: string) => decodeEntities(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const meta = (html: string, key: string): string => {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${key}["'][^>]*content=["']([^"']*)["']|<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${key}["']`,
    "i",
  );
  const m = html.match(re);
  return clean(m?.[1] ?? m?.[2] ?? "");
};

export function detectPlatform(html: string): string {
  const h = html.toLowerCase();
  if (h.includes("cdn.shopify.com") || h.includes("shopify.theme") || h.includes("/cdn/shop/") || h.includes("myshopify.com")) return "shopify";
  if (h.includes("wp-content") || h.includes("wp-json")) return h.includes("woocommerce") ? "woocommerce" : "wordpress";
  if (h.includes("static.wixstatic.com") || h.includes("wix.com")) return "wix";
  if (h.includes("squarespace")) return "squarespace";
  if (h.includes("webflow")) return "webflow";
  if (h.includes("tiendanube") || h.includes("nuvemshop")) return "tiendanube";
  if (h.includes("vtex")) return "vtex";
  if (h.includes("framer")) return "framer";
  if (h.includes("_next/static")) return "next.js";
  return "otra";
}

/** Extrae hechos de un HTML ya descargado (función pura, testeable). */
export function extractSiteFacts(html: string, url: string, finalUrl = url): Omit<SiteFacts, "productCount" | "productSamples"> {
  const title = clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "") || meta(html, "og:title");
  const description = meta(html, "description") || meta(html, "og:description");
  const headings = Array.from(html.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi))
    .map((m) => clean(m[1]))
    .filter((t) => t.length > 2 && t.length < 140)
    .slice(0, 8);
  const whatsapp = /wa\.me\/|api\.whatsapp\.com|whatsapp:\/\/|whatsapp\.com\/send/i.test(html);
  const ig = html.match(/instagram\.com\/([A-Za-z0-9_.]{2,40})\/?/i)?.[1] ?? null;
  const email = html.match(/mailto:([^"'?\s>]+)/i)?.[1] ?? null;
  const languageHint = html.match(/<html[^>]+lang=["']([a-zA-Z-]{2,10})["']/i)?.[1] ?? null;
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<nav[\s\S]*?<\/nav>/gi, " ");
  const excerpt = clean(body).slice(0, 1500);
  return {
    ok: true,
    url,
    finalUrl,
    title,
    description,
    headings,
    platform: detectPlatform(html),
    whatsapp,
    instagram: ig && !/^(p|reel|explore|accounts)$/i.test(ig) ? ig : null,
    email,
    languageHint,
    excerpt,
  };
}

async function fetchText(url: string): Promise<{ text: string; finalUrl: string; contentType: string } | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "text/html,application/json;q=0.9,*/*;q=0.5", "accept-language": "es,en;q=0.8" },
      redirect: "follow",
      signal: ctrl.signal,
    });
    const contentType = res.headers.get("content-type") ?? "";
    if (!res.ok) return null;
    const reader = res.body?.getReader();
    if (!reader) return { text: await res.text(), finalUrl: res.url || url, contentType };
    const chunks: Uint8Array[] = [];
    let total = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        total += value.byteLength;
        if (total >= MAX_BYTES) {
          try {
            await reader.cancel();
          } catch {
            /* ignore */
          }
          break;
        }
      }
    }
    const buf = new Uint8Array(total);
    let off = 0;
    for (const c of chunks) {
      buf.set(c.subarray(0, Math.min(c.byteLength, total - off)), off);
      off += c.byteLength;
      if (off >= total) break;
    }
    return { text: new TextDecoder("utf-8", { fatal: false }).decode(buf), finalUrl: res.url || url, contentType };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Si es Shopify, cuenta productos publicados (una página de products.json, tope 250) y trae 5 nombres. */
async function shopifyProducts(finalUrl: string): Promise<{ count: number | null; samples: string[] }> {
  try {
    const origin = new URL(finalUrl).origin;
    const r = await fetchText(`${origin}/products.json?limit=250`);
    if (!r || !r.contentType.includes("json")) return { count: null, samples: [] };
    const data = JSON.parse(r.text) as { products?: Array<{ title?: string }> };
    const products = data.products ?? [];
    return { count: products.length, samples: products.slice(0, 5).map((p) => p.title ?? "").filter(Boolean) };
  } catch {
    return { count: null, samples: [] };
  }
}

export async function leerSitio(rawUrl: string): Promise<SiteFacts | SiteError> {
  const url = normalizeSiteUrl(rawUrl);
  if (!url) return { ok: false, error: "url_invalida", url: rawUrl };
  if (/instagram\.com|facebook\.com|tiktok\.com|linkedin\.com/i.test(url)) {
    return { ok: false, error: "red_social_no_legible", url };
  }
  const page = await fetchText(url);
  if (!page) return { ok: false, error: "no_se_pudo_leer", url };
  if (!/html/i.test(page.contentType) && !/<html/i.test(page.text.slice(0, 2000))) {
    return { ok: false, error: "no_es_html", url };
  }
  const facts = extractSiteFacts(page.text, url, page.finalUrl);
  let productCount: number | null = null;
  let productSamples: string[] = [];
  if (facts.platform === "shopify") {
    const p = await shopifyProducts(page.finalUrl);
    productCount = p.count;
    productSamples = p.samples;
  }
  return { ...facts, productCount, productSamples };
}

/** Texto compacto para el tool_result — el modelo lo lee, no el visitante. */
export function describeSite(f: SiteFacts | SiteError): string {
  if (!f.ok) {
    const why: Record<string, string> = {
      url_invalida: "La URL no es válida o no es pública.",
      red_social_no_legible: "Es una red social: no se puede leer desde aquí. Pide la web.",
      no_se_pudo_leer: "No respondió a tiempo o bloqueó la lectura.",
      no_es_html: "La URL no devuelve una página web.",
    };
    const err = (f as SiteError).error;
    return `NO SE PUDO LEER ${f.url ?? ""}: ${why[err] ?? err}. Sigue la conversación sin drama y pide otra URL o pregunta directamente.`;
  }
  const lines = [
    `SITIO: ${f.finalUrl}`,
    `Título: ${f.title || "—"}`,
    `Descripción: ${f.description || "—"}`,
    `Plataforma detectada: ${f.platform}${f.productCount !== null ? ` · productos publicados: ${f.productCount >= 250 ? "250+" : f.productCount}` : ""}`,
    f.productSamples.length ? `Ejemplos de productos: ${f.productSamples.join(" · ")}` : "",
    `WhatsApp visible: ${f.whatsapp ? "sí" : "no"} · Instagram: ${f.instagram ? "@" + f.instagram : "no visible"} · Email: ${f.email ?? "no visible"} · Idioma: ${f.languageHint ?? "?"}`,
    f.headings.length ? `Titulares: ${f.headings.join(" | ")}` : "",
    `Extracto: ${f.excerpt.slice(0, 900)}`,
    "Úsalo para comentar 1–2 cosas concretas y útiles (qué vende, plataforma, si hay quien conteste, tamaño del catálogo, qué falta). No inventes lo que no está aquí; lo que no se ve desde afuera (velocidad real, checkout, márgenes) se pregunta o se mide después.",
  ].filter(Boolean);
  return lines.join("\n");
}
