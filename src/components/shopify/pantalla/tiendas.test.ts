import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { TIENDAS, ASPECTO, COPY, SISTEMA, escenasPara } from "./tiendas";
import type { Lang } from "@/i18n/types";

const LANGS: Lang[] = ["es", "en", "de", "pt"];
const PUBLIC = join(__dirname, "../../../../public");

describe("capturas", () => {
  it("ninguna tienda baja más allá de lo que se capturó (ni en celular ni en escritorio)", () => {
    for (const t of TIENDAS) {
      for (const formato of ["movil", "escritorio"] as const) {
        const c = t.capturas[formato];
        const altoCss = (c.alto / c.ancho) * c.anchoSitio;
        const visibleCss = c.anchoSitio / ASPECTO[formato];
        expect(c.bajarA + visibleCss, `${t.id} ${formato}`).toBeLessThanOrEqual(altoCss);
        expect(c.bajarA).toBeGreaterThan(0);
      }
    }
  });

  it("cada captura existe en AVIF y en WebP, y cada ícono de pestaña también", () => {
    for (const t of TIENDAS) {
      for (const formato of ["movil", "escritorio"] as const) {
        const { avif, webp } = t.capturas[formato];
        expect(existsSync(join(PUBLIC, avif)), avif).toBe(true);
        expect(existsSync(join(PUBLIC, webp)), webp).toBe(true);
      }
      if (t.icono) expect(existsSync(join(PUBLIC, t.icono)), t.icono).toBe(true);
    }
  });
});

describe("textos", () => {
  it("en español la pantalla dice las tres frases tal cual", () => {
    expect(SISTEMA.map((l) => l.frase.es)).toEqual(["Crece tus ventas.", "Configura tu CRM.", "Crea agentes de WhatsApp."]);
  });

  it("todo está en los cuatro idiomas", () => {
    const registros = [
      ...Object.values(COPY),
      ...SISTEMA.flatMap((l) => [l.frase, ...l.chips.map((c) => c.texto)]),
      ...TIENDAS.flatMap((t) => (t.aviso ? [t.aviso] : [])),
    ];
    for (const r of registros) for (const lang of LANGS) expect(r[lang]?.trim().length, JSON.stringify(r)).toBeGreaterThan(0);
  });

  it("cada frase enciende entre dos y cuatro piezas del sistema", () => {
    for (const l of SISTEMA) {
      expect(l.chips.length).toBeGreaterThanOrEqual(2);
      expect(l.chips.length).toBeLessThanOrEqual(4);
    }
  });
});

describe("escenasPara", () => {
  it("soloio, Eleonora y Skin V, después el sistema en monzalab.com y el cierre", () => {
    const e = escenasPara("es");
    expect(e.map((x) => (x.tipo === "tienda" ? x.id : x.tipo))).toEqual(["soloio", "eleonora", "skinv", "sistema", "cierre"]);
    expect(e[0]).toMatchObject({ url: "soloio.com" });
    expect(e[1]).toMatchObject({ url: "eleonoramorales.com" });
    expect(e[2]).toMatchObject({ url: "skinv.com.co" });
    expect(e[3]).toMatchObject({ url: "monzalab.com", lineas: ["Crece tus ventas.", "Configura tu CRM.", "Crea agentes de WhatsApp."] });
    expect(e[4]).toEqual({ tipo: "cierre", texto: "¿Y la tuya?" });
  });

  it("cambia de idioma sin cambiar las tiendas", () => {
    const en = escenasPara("en");
    expect(en[3]).toMatchObject({ lineas: ["Grow your sales.", "Set up your CRM.", "Build WhatsApp agents."] });
    expect(en[4]).toEqual({ tipo: "cierre", texto: "What about yours?" });
  });
});
