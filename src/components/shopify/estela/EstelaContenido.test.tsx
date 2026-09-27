import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import EstelaContenido from "./EstelaContenido";
import { FOTOS, PIE, COPY_ESTELA } from "./fotos";
import type { Lang } from "@/i18n/types";

const LANGS: Lang[] = ["es", "en", "de", "pt"];
const movimiento = (reducido: boolean) =>
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: reducido && q.includes("prefers-reduced-motion"),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("las fotos de la estela", () => {
  it("son 18, seis por marca y alternadas: nunca dos de la misma marca seguidas", () => {
    expect(FOTOS).toHaveLength(18);
    for (const m of ["soloio", "eleonora", "monza"] as const) expect(FOTOS.filter((f) => f.marca === m)).toHaveLength(6);
    for (let i = 1; i < FOTOS.length; i++) expect(FOTOS[i].marca).not.toBe(FOTOS[i - 1].marca);
  });

  it("cada una existe en AVIF y en WebP", () => {
    const pub = join(__dirname, "../../../../public");
    for (const f of FOTOS) {
      expect(existsSync(join(pub, f.avif)), f.avif).toBe(true);
      expect(existsSync(join(pub, f.webp)), f.webp).toBe(true);
    }
  });

  it("los créditos y los textos están en los cuatro idiomas", () => {
    const registros = [...Object.values(PIE), ...Object.values(COPY_ESTELA)];
    for (const r of registros) for (const l of LANGS) expect(r[l]?.trim().length, JSON.stringify(r)).toBeGreaterThan(0);
  });
});

describe("EstelaContenido", () => {
  it("tiene su titular y cuenta en texto lo que se ve", () => {
    movimiento(false);
    render(<EstelaContenido lang="es" />);
    expect(screen.getByRole("heading", { level: 2, name: "Campañas, catálogo y redes, todas las semanas." })).toBeTruthy();
    expect(screen.getByText(/campañas de soloio/)).toBeTruthy();
  });

  it("con movimiento reducido deja un collage quieto a la vista (en el celular)", () => {
    movimiento(true);
    const antes = window.innerWidth;
    Object.defineProperty(window, "innerWidth", { value: 390, configurable: true });
    const { container } = render(<EstelaContenido lang="es" />);
    Object.defineProperty(window, "innerWidth", { value: antes, configurable: true });
    expect(container.querySelectorAll(".estela-carta.is-quieta").length).toBeGreaterThanOrEqual(4);
  });
});
