import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import SEO from "./SEO";

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
});
