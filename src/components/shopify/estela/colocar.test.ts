import { describe, it, expect } from "vitest";
import { encuadrar, patronPara, RAFAGA_ANCHA, RAFAGA_ANGOSTA, RAFAGA_FILA } from "./colocar";

/* Auditoría móvil, 27-sep-2026: en el celular las fotos que se quedan tapaban el título y el
 * texto, se cortaban contra el borde y una tapaba la etiqueta de la otra. */

describe("patronPara", () => {
  it("en escritorio el collage va a la derecha, al lado del texto", () => {
    expect(patronPara(true, 1400)).toBe(RAFAGA_ANCHA);
  });
  it("en una franja ancha (celular acostado, tablet) las fotos van en fila", () => {
    expect(patronPara(false, 844)).toBe(RAFAGA_FILA);
    expect(patronPara(false, 768)).toBe(RAFAGA_FILA);
  });
  it("en el celular parado van en cascada", () => {
    expect(patronPara(false, 390)).toBe(RAFAGA_ANGOSTA);
  });
});

describe("encuadrar", () => {
  it("una foto nunca queda cortada por el borde de su franja", () => {
    const c = encuadrar(380, -20, 390, 437, 156, 195);
    expect(c.x + 156 / 2).toBeLessThanOrEqual(390);
    expect(c.y - 195 / 2).toBeGreaterThanOrEqual(0);
  });
  it("si cabe, no la mueve", () => {
    expect(encuadrar(195, 200, 390, 437, 156, 195)).toEqual({ x: 195, y: 200 });
  });
});

describe("la cascada del celular deja ver las tres etiquetas", () => {
  it("cada foto que se queda empieza donde termina la etiqueta de la anterior o más abajo", () => {
    const [w, h, cw, ch] = [390, 437, 156, 195];
    const quedan = RAFAGA_ANGOSTA.filter((p) => p.queda).map((p) => encuadrar(p.x * w, p.y * h, w, h, cw, ch));
    for (let k = 1; k < quedan.length; k++) {
      const anterior = quedan[k - 1];
      const actual = quedan[k];
      // La etiqueta va abajo a la izquierda de cada foto (8 px del borde, ~22 px de alto).
      const etiqueta = { x0: anterior.x - cw / 2 + 8, y0: anterior.y + ch / 2 - 30, y1: anterior.y + ch / 2 - 8 };
      const tapa =
        actual.x - cw / 2 < etiqueta.x0 + 90 && actual.x + cw / 2 > etiqueta.x0 && actual.y - ch / 2 < etiqueta.y1 && actual.y + ch / 2 > etiqueta.y0;
      expect(tapa, `la foto ${k} tapa la etiqueta de la ${k - 1}`).toBe(false);
    }
  });
});
