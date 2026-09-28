import { describe, expect, it } from "vitest";
import { aroIA, cablesFuentes, cablesTecnologia, layoutPiezas, ordenRecorrido, posicionesTecnologia, vecinos } from "./diagrama";
import type { NodoTecnologia } from "@/data/casos/tipos";
import { CASOS } from "@/data/casos";

const n = (id: string, tipo: "ia" | "herramienta", con: string[] = []): NodoTecnologia =>
  ({ id, tipo, con, nombre: { es: id, en: id, de: id, pt: id }, hace: { es: "", en: "", de: "", pt: "" } });

describe("layoutPiezas", () => {
  it("reparte N piezas en dos filas, arriba la mitad redondeada hacia arriba, dentro del lienzo", () => {
    for (const N of [3, 4, 5, 6, 7, 8]) {
      const nodos = layoutPiezas(N);
      expect(nodos).toHaveLength(N);
      expect(nodos.filter((x) => x.y < 100)).toHaveLength(Math.ceil(N / 2));
      nodos.forEach((x) => { expect(x.x).toBeGreaterThanOrEqual(0); expect(x.x + x.ancho).toBeLessThanOrEqual(380); });
    }
  });
});

describe("mapa de tecnología", () => {
  const nodos = [n("a", "ia", ["x", "y"]), n("b", "ia", ["y"]), n("x", "herramienta", ["y"]), n("y", "herramienta"), n("z", "herramienta")];
  it("pone la IA arriba y abajo del centro y ninguna herramienta encima de una IA", () => {
    const pos = posicionesTecnologia(nodos, false);
    expect(pos.a.y).toBeLessThan(50); expect(pos.b.y).toBeGreaterThan(50);
    expect(Math.abs(pos.a.x - 50)).toBeLessThan(0.01);
    for (const h of ["x", "y", "z"]) for (const i of ["a", "b"]) expect(Math.hypot(pos[h].x - pos[i].x, pos[h].y - pos[i].y)).toBeGreaterThan(12);
  });
  it("un cable por par, sin repetir, y los vecinos en los dos sentidos", () => {
    const pos = posicionesTecnologia(nodos, false);
    const cables = cablesTecnologia(nodos, pos);
    expect(cables).toHaveLength(4);
    expect(vecinos(nodos, "y").sort()).toEqual(["a", "b", "x"]);
    expect(ordenRecorrido(nodos).slice(0, 2)).toEqual(["a", "b"]);
  });
  it("con más de dos IA usa un óvalo más ancho", () => {
    expect(aroIA(6).rx).toBeGreaterThan(aroIA(2).rx);
  });
  it("las fuentes llegan todas al centro", () => {
    expect(cablesFuentes(3)).toHaveLength(3);
    cablesFuentes(2).forEach((d) => expect(d.endsWith("60 32")).toBe(true));
  });
});

describe("los datos de los casos", () => {
  it("cada cable apunta a un nodo que existe y cada caso tiene todo en los cuatro idiomas", () => {
    expect(CASOS.length).toBeGreaterThan(0);
    for (const c of CASOS) {
      const ids = new Set(c.tecnologia.nodos.map((x) => x.id));
      c.tecnologia.nodos.forEach((x) => x.con.forEach((o) => expect(ids.has(o), `${c.slug}: ${x.id} → ${o}`).toBe(true)));
      const textos = JSON.stringify(c);
      expect(textos.includes("—"), `${c.slug} tiene guion largo`).toBe(false);
      for (const lang of ["es", "en", "de", "pt"] as const) {
        expect(c.seo.titulo[lang], `${c.slug} ${lang}`).toBeTruthy();
        expect(c.hero.frase[lang], `${c.slug} ${lang}`).toBeTruthy();
      }
    }
  });
});
