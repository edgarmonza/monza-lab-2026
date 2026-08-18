import { describe, it, expect } from "vitest";
import { normalizeSiteUrl, extractSiteFacts, detectPlatform, describeSite } from "./leerSitio";

describe("normalizeSiteUrl", () => {
  it("acepta dominios con o sin https y limpia el hash", () => {
    expect(normalizeSiteUrl("tienda.com/p/x#top")).toBe("https://tienda.com/p/x");
    expect(normalizeSiteUrl("https://www.marca.co")).toBe("https://www.marca.co/");
  });
  it("rechaza lo que no es una web pública", () => {
    for (const bad of ["", "localhost", "http://127.0.0.1/", "ftp://x.com", "intranet", "http://10.0.0.1", "user:pw@site.com"]) {
      expect(normalizeSiteUrl(bad)).toBeNull();
    }
  });
});

describe("extractSiteFacts", () => {
  const html = `<html lang="es"><head><title>Marca Bonita — Vestidos</title>
    <meta name="description" content="Vestidos de baño hechos en Colombia">
    <script src="https://cdn.shopify.com/s/files/1/theme.js"></script></head>
    <body><h1>Nueva colección</h1><h2>Enterizos</h2>
    <a href="https://wa.me/573001112233">WhatsApp</a>
    <a href="https://instagram.com/marcabonita">IG</a>
    <a href="mailto:hola@marcabonita.co">correo</a>
    <p>Vestidos de baño y activewear con estampados de autor.</p></body></html>`;
  it("detecta plataforma, contacto y textos", () => {
    const f = extractSiteFacts(html, "https://marcabonita.co");
    expect(f.platform).toBe("shopify");
    expect(f.title).toBe("Marca Bonita — Vestidos");
    expect(f.description).toMatch(/Colombia/);
    expect(f.headings).toEqual(["Nueva colección", "Enterizos"]);
    expect(f.whatsapp).toBe(true);
    expect(f.instagram).toBe("marcabonita");
    expect(f.email).toBe("hola@marcabonita.co");
    expect(f.languageHint).toBe("es");
    expect(f.excerpt).toMatch(/estampados de autor/);
    expect(f.excerpt).not.toMatch(/cdn\.shopify/); // scripts fuera del extracto
  });
  it("detecta otras plataformas", () => {
    expect(detectPlatform("<link href='/wp-content/x.css'>")).toBe("wordpress");
    expect(detectPlatform("<script src='static.wixstatic.com/a.js'>")).toBe("wix");
    expect(detectPlatform("<div>nada</div>")).toBe("otra");
  });
  it("describe errores de forma útil para el modelo", () => {
    expect(describeSite({ ok: false, error: "red_social_no_legible", url: "https://instagram.com/x" })).toMatch(/Pide la web/);
  });
});
