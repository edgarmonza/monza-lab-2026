import { describe, it, expect, afterEach } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import SEO from "./SEO";
import { CASOS } from "@/data/casos";

/* El prerender abre cuatro pestañas a la vez y las que quedan atrás no corren
 * requestAnimationFrame. react-helmet espera un cuadro para escribir la cabecera, así
 * que 9 de 76 páginas salían con la canónica de la portada (hallado el 27-sep-2026).
 * La cabecera tiene que quedar escrita en el mismo render. */

afterEach(() => cleanup());

const t = { es: "Título", en: "Title", de: "Titel", pt: "Título" };

describe("SEO", () => {
  it("escribe la canónica y la descripción en el mismo render, sin esperar un cuadro", () => {
    render(
      <MemoryRouter initialEntries={["/en/shopify"]}>
        <LanguageProvider>
          <SEO path="/shopify" title={t} description={t} />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://www.monzalab.com/en/shopify");
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.title).toBe("Title");
  });

  it("la imagen para compartir es la tarjeta de la página, en su idioma", () => {
    render(
      <MemoryRouter initialEntries={["/de/work/soloio"]}>
        <LanguageProvider>
          <SEO path="/work/soloio" ogKey="work/soloio" title={t} description={t} />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute("content")).toMatch(
      /^https:\/\/www\.monzalab\.com\/og\/de\/work\/soloio\.jpg\?v=\d+$/,
    );
  });

  /* Un caso nuevo sin tarjeta compartiría una imagen rota: correr `node scripts/og/generar.mjs`. */
  it("cada página y cada caso tiene su tarjeta en los cuatro idiomas", () => {
    const claves = ["home", "sessions", "shopify", "plataformas", "speaker", "work", ...CASOS.map((c) => `work/${c.slug}`)];
    const faltan = ["es", "en", "de", "pt"].flatMap((l) =>
      claves.map((k) => `public/og/${l}/${k}.jpg`).filter((f) => !existsSync(resolve(__dirname, "../..", f))),
    );
    expect(faltan).toEqual([]);
  });
});
