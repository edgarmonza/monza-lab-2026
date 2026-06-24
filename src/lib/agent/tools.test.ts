import { describe, it, expect } from "vitest";
import { AGENT_TOOLS } from "./tools";

describe("AGENT_TOOLS", () => {
  it("define capturar_lead y abrir_whatsapp", () => {
    const names = AGENT_TOOLS.map((t) => t.name).sort();
    expect(names).toEqual(["abrir_whatsapp", "capturar_lead"]);
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
