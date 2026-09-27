import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/theme/ThemeContext";
import Speaker from "./Speaker";

/* /pt/speaker salía en blanco en producción: el texto no tenía portugués y la página se
 * caía al leer `hero` (hallado el 27-sep-2026 al revisar el prerender). */

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Speaker", () => {
  it.each(["/speaker", "/en/speaker", "/de/speaker", "/pt/speaker"])("%s se monta con su texto", (ruta) => {
    vi.stubGlobal("IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } });
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={[ruta]}>
          <LanguageProvider>
            <Speaker />
          </LanguageProvider>
        </MemoryRouter>
      </ThemeProvider>,
    );
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(2);
  });

  it("en portugués habla portugués", () => {
    vi.stubGlobal("IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } });
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/pt/speaker"]}>
          <LanguageProvider>
            <Speaker />
          </LanguageProvider>
        </MemoryRouter>
      </ThemeProvider>,
    );
    expect(document.body.textContent).toMatch(/Não fala de IA\./);
  });
});
