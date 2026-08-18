import { describe, it, expect } from "vitest";
import { AGENT_TOOLS } from "./tools";

describe("AGENT_TOOLS", () => {
  it("define las cuatro herramientas del vendedor", () => {
    const names = AGENT_TOOLS.map((t) => t.name).sort();
    expect(names).toEqual(["abrir_whatsapp", "capturar_lead", "consultar_criterio", "leer_sitio"]);
  });

  it("consultar_criterio exige tema y leer_sitio exige url", () => {
    expect(AGENT_TOOLS.find((t) => t.name === "consultar_criterio")!.input_schema.required).toContain("tema");
    expect(AGENT_TOOLS.find((t) => t.name === "leer_sitio")!.input_schema.required).toContain("url");
  });

  it("capturar_lead exige nombre, email y marca", () => {
    const lead = AGENT_TOOLS.find((t) => t.name === "capturar_lead")!;
    expect(lead.input_schema.required).toEqual(
      expect.arrayContaining(["nombre", "email", "marca"]),
    );
    expect(lead.input_schema.properties).toHaveProperty("caso");
    expect(lead.input_schema.properties).toHaveProperty("necesidad");
  });

  it("abrir_whatsapp exige resumen", () => {
    const wa = AGENT_TOOLS.find((t) => t.name === "abrir_whatsapp")!;
    expect(wa.input_schema.required).toContain("resumen");
  });
});
