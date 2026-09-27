/* Dónde caen las fotos de la estela. Puro: se prueba sin navegador.
 *
 * En escritorio el collage va a la derecha del texto, sobre toda la sala. Por debajo de 1024 px
 * las fotos tienen su propia franja encima del texto (index.css, .estela-pista): antes flotaban
 * sobre toda la sala y en el celular tapaban el título (auditoría móvil, 27-sep-2026). */

/** Posición en fracciones del ancho y del alto de la franja. Las que llevan `queda` no se van. */
export type Punto = { x: number; y: number; queda?: boolean };

/** Escritorio: el texto va a la izquierda, así que el collage queda en la mitad derecha. */
export const RAFAGA_ANCHA: Punto[] = [
  { x: 0.34, y: 0.22 },
  { x: 0.7, y: 0.5 },
  { x: 0.5, y: 0.3 },
  { x: 0.6, y: 0.3, queda: true },
  { x: 0.76, y: 0.2, queda: true },
  { x: 0.9, y: 0.38, queda: true },
];
/** Franja ancha (celular acostado, tablet): las tres que se quedan, en fila. */
export const RAFAGA_FILA: Punto[] = [
  { x: 0.3, y: 0.4 },
  { x: 0.7, y: 0.55 },
  { x: 0.5, y: 0.45 },
  { x: 0.2, y: 0.5, queda: true },
  { x: 0.5, y: 0.45, queda: true },
  { x: 0.8, y: 0.52, queda: true },
];
/** Celular parado: en cascada, cada una más abajo y corrida, para que se lean las tres etiquetas. */
export const RAFAGA_ANGOSTA: Punto[] = [
  { x: 0.3, y: 0.35 },
  { x: 0.7, y: 0.3 },
  { x: 0.5, y: 0.55 },
  { x: 0.3, y: 0.24, queda: true },
  { x: 0.7, y: 0.5, queda: true },
  { x: 0.28, y: 0.76, queda: true },
];

export const patronPara = (ancho: boolean, w: number): Punto[] => (ancho ? RAFAGA_ANCHA : w >= 600 ? RAFAGA_FILA : RAFAGA_ANGOSTA);

/** El centro de una foto de cw × ch corrido lo justo para que quede entera dentro de w × h. */
export const encuadrar = (x: number, y: number, w: number, h: number, cw: number, ch: number, margen = 10) => ({
  x: Math.min(Math.max(x, cw / 2 + margen), Math.max(cw / 2 + margen, w - cw / 2 - margen)),
  y: Math.min(Math.max(y, ch / 2 + margen), Math.max(ch / 2 + margen, h - ch / 2 - margen)),
});

/** El collage de quien pide menos movimiento: índice de la foto, posición en % de la franja y giro. */
export type Quieta = { i: number; x: number; y: number; r: number };
export const QUIETAS_ANCHA: Quieta[] = [
  { i: 0, x: 20, y: 24, r: -5 },
  { i: 1, x: 50, y: 16, r: 3 },
  { i: 2, x: 80, y: 27, r: -3 },
  { i: 5, x: 34, y: 42, r: 4 },
  { i: 4, x: 66, y: 44, r: -4 },
];
export const QUIETAS_FILA: Quieta[] = [
  { i: 0, x: 20, y: 50, r: -4 },
  { i: 1, x: 50, y: 46, r: 3 },
  { i: 2, x: 80, y: 52, r: -3 },
];
export const QUIETAS_ANGOSTA: Quieta[] = [
  { i: 0, x: 26, y: 25, r: -5 },
  { i: 1, x: 74, y: 25, r: 3 },
  { i: 2, x: 50, y: 50, r: -3 },
  { i: 5, x: 27, y: 75, r: 4 },
  { i: 4, x: 73, y: 76, r: -4 },
];
export const quietasPara = (ancho: boolean, w: number): Quieta[] => (ancho ? QUIETAS_ANCHA : w >= 600 ? QUIETAS_FILA : QUIETAS_ANGOSTA);
