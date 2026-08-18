import { describe, it, expect } from "vitest";
import { consultarCriterio, CRITERIO, CRITERIO_MAX_CHARS } from "./criterio";

describe("consultarCriterio", () => {
  it("responde precio/modelo sin cifras de Studio y con la forma de pago", () => {
    const out = consultarCriterio("precio", "¿cuánto cuesta el sistema?");
    expect(out).toMatch(/dos tiempos/i);
    expect(out).toMatch(/sin permanencia/i);
    expect(out).not.toMatch(/\$\s?\d/);
    expect(out).not.toMatch(/12\.?000\.?000|12M/);
  });

  it("encuentra la regla de imagen y la pauta por palabras clave", () => {
    expect(consultarCriterio("fotos con IA")).toMatch(/cambia la escena/i);
    expect(consultarCriterio("pauta")).toMatch(/margen decide la pauta/i);
  });

  it("reencuadra agentes por turnos y responde a 'ya probé un bot'", () => {
    const out = consultarCriterio("agentes", "ya probamos un bot y alucinaba");
    expect(out).toMatch(/alucina/i);
    expect(out).toMatch(/turnos|voz de la marca/i);
  });

  it("devuelve el índice cuando nada coincide", () => {
    const out = consultarCriterio("zzz-tema-inexistente");
    expect(out).toMatch(/Temas disponibles/);
    for (const t of CRITERIO) expect(out).toContain(t.key);
  });

  it("nunca excede el tope y nunca nombra clientes bajo confidencialidad", () => {
    for (const t of CRITERIO) {
      const out = consultarCriterio(t.key);
      expect(out.length).toBeLessThanOrEqual(CRITERIO_MAX_CHARS + 20);
      expect(out).not.toMatch(/Eleonora|Swim|Irina|Skin V/i);
    }
  });
});
