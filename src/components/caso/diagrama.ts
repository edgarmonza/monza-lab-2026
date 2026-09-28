/* Las cuentas de los dos diagramas del caso. Puro: se prueba sin navegador.
 *
 * - Pieza por pieza: N nodos en dos filas (arriba la mitad redondeada hacia arriba) alrededor de un
 *   centro, en un lienzo de 380 × 320 como el prototipo.
 * - La tecnología: las herramientas en un anillo girado medio paso (así ninguna queda a la altura
 *   de la IA) y la IA arriba y abajo del centro, en un lienzo de 100 × 100. */
import type { NodoTecnologia } from "@/data/casos/tipos";

export const LIENZO = { ancho: 380, alto: 320 } as const;
const HUB = { x: 105, y: 131, ancho: 170, alto: 58 } as const;
const FILA_ARRIBA = 28;
const FILA_ABAJO = 254;
const ALTO_NODO = 38;

export type NodoPieza = { x: number; y: number; ancho: number; alto: number; cx: number; cy: number; arista: string };

/** Dónde va cada nodo de «Pieza por pieza» y el cable que lo une al centro. */
export const layoutPiezas = (n: number): NodoPieza[] => {
  const arriba = Math.ceil(n / 2);
  const abajo = n - arriba;
  const fila = (k: number, y: number, deArriba: boolean): NodoPieza[] => {
    if (k === 0) return [];
    const gap = 12;
    const ancho = Math.min(108, (LIENZO.ancho - 32 - (k - 1) * gap) / k);
    const total = k * ancho + (k - 1) * gap;
    const x0 = (LIENZO.ancho - total) / 2;
    return Array.from({ length: k }, (_, i) => {
      const x = x0 + i * (ancho + gap);
      const cx = x + ancho / 2;
      const centro = LIENZO.ancho / 2;
      const recto = Math.abs(cx - centro) < 1;
      const arista = deArriba
        ? recto ? `M${centro} ${y + ALTO_NODO} L${centro} ${HUB.y}` : `M${r(cx)} ${y + ALTO_NODO} C${r(cx)} 104, ${centro} 96, ${centro} ${HUB.y}`
        : recto ? `M${centro} ${y} L${centro} ${HUB.y + HUB.alto}` : `M${r(cx)} ${y} C${r(cx)} 216, ${centro} 224, ${centro} ${HUB.y + HUB.alto}`;
      return { x: r(x), y, ancho: r(ancho), alto: ALTO_NODO, cx: r(cx), cy: y + ALTO_NODO / 2, arista };
    });
  };
  return [...fila(arriba, FILA_ARRIBA, true), ...fila(abajo, FILA_ABAJO, false)];
};

export const HUB_PIEZAS = HUB;

/** Los cables de la tarjeta «fuentes»: de cada fuente (arriba) al total (abajo), en un lienzo de 120 × 34. */
export const cablesFuentes = (n: number): string[] => {
  if (n <= 1) return ["M60 2 L60 32"];
  const xs = Array.from({ length: n }, (_, i) => 16 + (i * (104 - 16)) / (n - 1));
  return xs.map((x) => (Math.abs(x - 60) < 1 ? "M60 2 L60 32" : `M${r(x)} 2 C${r(x)} 20, 60 14, 60 32`));
};

export type Punto = { x: number; y: number };

/** Posición (en % del mapa) de cada nodo de la tecnología. */
export const posicionesTecnologia = (nodos: NodoTecnologia[], angosto: boolean): Record<string, Punto> => {
  const herr = nodos.filter((n) => n.tipo !== "ia");
  const ia = nodos.filter((n) => n.tipo === "ia");
  const rFuera = angosto ? 38 : 40;
  const pos: Record<string, Punto> = {};
  herr.forEach((n, i) => {
    const a = -Math.PI / 2 + Math.PI / Math.max(herr.length, 1) + (i * 2 * Math.PI) / Math.max(herr.length, 1);
    pos[n.id] = { x: 50 + rFuera * Math.cos(a), y: 50 + rFuera * Math.sin(a) };
  });
  const aro = aroIA(ia.length);
  ia.forEach((n, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(ia.length, 1);
    pos[n.id] = { x: 50 + aro.rx * Math.cos(a), y: 50 + aro.ry * Math.sin(a) };
  });
  return pos;
};
export const R_IA = 23;
/** Hasta dos IA van en un círculo (arriba y abajo del centro); con más, en un óvalo más ancho para
 *  que no se monten entre ellas ni sobre el centro (Comercio exterior tiene seis). */
export const aroIA = (n: number) => (n > 2 ? { rx: 27, ry: 21 } : { rx: R_IA, ry: R_IA });
export const radioFuera = (angosto: boolean) => (angosto ? 38 : 40);

export type Cable = { a: string; b: string; d: string; conIA: boolean };

/** Un cable por cada par que se habla (sin repetir), curvado hacia el centro. */
export const cablesTecnologia = (nodos: NodoTecnologia[], pos: Record<string, Punto>): Cable[] => {
  const porId = new Map(nodos.map((n) => [n.id, n]));
  const pares = new Map<string, [string, string]>();
  nodos.forEach((n) => (n.con || []).forEach((o) => {
    if (!porId.has(o) || o === n.id) return;
    const k = [n.id, o].sort().join("|");
    if (!pares.has(k)) pares.set(k, [n.id, o]);
  }));
  return [...pares.values()].map(([a, b]) => {
    const A = pos[a], B = pos[b];
    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
    const cx = mx + (50 - mx) * 0.38, cy = my + (50 - my) * 0.38;
    return {
      a, b,
      d: `M${A.x.toFixed(2)} ${A.y.toFixed(2)} Q${cx.toFixed(2)} ${cy.toFixed(2)} ${B.x.toFixed(2)} ${B.y.toFixed(2)}`,
      conIA: porId.get(a)?.tipo === "ia" || porId.get(b)?.tipo === "ia",
    };
  });
};

/** Con quién se conecta un nodo (en los dos sentidos). */
export const vecinos = (nodos: NodoTecnologia[], id: string): string[] => {
  const s = new Set<string>();
  const nodo = nodos.find((n) => n.id === id);
  (nodo?.con || []).forEach((o) => s.add(o));
  nodos.forEach((n) => { if ((n.con || []).includes(id)) s.add(n.id); });
  s.delete(id);
  return [...s].filter((o) => nodos.some((n) => n.id === o));
};

/** El orden en que el mapa se recorre solo: primero la IA, después las herramientas. */
export const ordenRecorrido = (nodos: NodoTecnologia[]) => [...nodos.filter((n) => n.tipo === "ia"), ...nodos.filter((n) => n.tipo !== "ia")].map((n) => n.id);

/** Iniciales cuando no hay ícono (se saltan «de», «y», «la»…). */
export const iniciales = (t: string) => t.split(/\s+/).filter((w) => w.length > 2).map((w) => w[0]).join("").slice(0, 2).toUpperCase() || t.slice(0, 2).toUpperCase();

const r = (v: number) => Math.round(v * 10) / 10;
