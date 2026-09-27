import { describe, it, expect } from "vitest";
import { PIEZAS, CENTRO, COPY_ECO, orbita } from "./piezas";
import type { Lang } from "@/i18n/types";

const LANGS: Lang[] = ["es", "en", "de", "pt"];

describe("las piezas del ecosistema", () => {
  it("son ocho, sin repetirse", () => {
    expect(PIEZAS).toHaveLength(8);
    expect(new Set(PIEZAS.map((p) => p.id)).size).toBe(8);
  });

  it("cada una dice su beneficio en los cuatro idiomas", () => {
    const registros = [CENTRO.nombre, ...Object.values(COPY_ECO), ...PIEZAS.flatMap((p) => [p.nombre, p.titulo, p.texto])];
    for (const r of registros) for (const l of LANGS) expect(r[l]?.trim().length, JSON.stringify(r)).toBeGreaterThan(0);
  });

  it("hablan de resultados, no de tecnología: sin «IA», sin «100 %», sin «pasarela»", () => {
    const todo = PIEZAS.flatMap((p) => [p.titulo.es, p.texto.es]).join(" ") + COPY_ECO.sub.es;
    expect(todo).not.toMatch(/\bIA\b|inteligencia artificial|100 ?%|pasarela|agente/i);
  });

  it("el nombre de la órbita es corto: cabe bajo el ícono en un celular", () => {
    for (const p of PIEZAS) for (const l of LANGS) expect(p.nombre[l].length, p.nombre[l]).toBeLessThanOrEqual(11);
  });
});

describe("orbita", () => {
  it("reparte las piezas en círculo, la primera arriba y en sentido horario", () => {
    const a = orbita(0, 8, 38);
    expect(a.x).toBeCloseTo(50);
    expect(a.y).toBeCloseTo(12);
    const b = orbita(2, 8, 38);
    expect(b.x).toBeCloseTo(88);
    expect(b.y).toBeCloseTo(50);
  });

  it("todas quedan dentro del cuadro", () => {
    for (let i = 0; i < 8; i++) {
      const { x, y } = orbita(i, 8, 38);
      expect(x).toBeGreaterThan(0);
      expect(x).toBeLessThan(100);
      expect(y).toBeGreaterThan(0);
      expect(y).toBeLessThan(100);
    }
  });
});
