import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/theme/ThemeContext";

/* Cuando la visita llega con el HTML prerenderizado en pantalla, el primer render sigue desde lo
 * que ya se ve: el hero no se esconde para volver a entrar y la pantalla no se rebobina a la barra
 * vacía (auditoría móvil, 27-sep-2026: en celular se veía un parpadeo y la escritura empezaba de
 * nuevo). */
vi.mock("@/lib/prerender", () => ({
  RUTA_PRERENDERIZADA: "/shopify",
  enPrerender: () => false,
  llegoPrerenderizada: () => true,
}));

import ShopifyVertical from "./ShopifyVertical";

class SinObservador {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", SinObservador);
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: false,
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  }));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("/shopify que llegó prerenderizada", () => {
  it("el hero no se esconde para entrar otra vez", () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/shopify"]}>
          <LanguageProvider>
            <ShopifyVertical />
          </LanguageProvider>
        </MemoryRouter>
      </ThemeProvider>,
    );
    const envoltura = screen.getByRole("heading", { level: 1 }).parentElement as HTMLElement;
    expect(envoltura.style.opacity).not.toBe("0");
  });

  it("la pantalla sigue desde la portada de soloio", () => {
    const { container } = render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/shopify"]}>
          <LanguageProvider>
            <ShopifyVertical />
          </LanguageProvider>
        </MemoryRouter>
      </ThemeProvider>,
    );
    expect(container.querySelector("[data-barra]")?.textContent).toBe("soloio.com");
  });
});
