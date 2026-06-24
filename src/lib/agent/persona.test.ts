import { describe, it, expect } from "vitest";
import { buildSystemPrompt } from "./persona";

describe("buildSystemPrompt", () => {
  it("incluye voz, conocimiento y reglas de cierre", () => {
    const p = buildSystemPrompt("es");
    expect(p).toMatch(/Bavarian/); // conocimiento embebido
    expect(p).toMatch(/capturar_lead/);
    expect(p).toMatch(/abrir_whatsapp/);
  });

  it("incluye las barandas clave", () => {
    const p = buildSystemPrompt("es");
    expect(p).toMatch(/precio/i); // no cierra precios
    expect(p).toMatch(/sin emoji|no uses emoji/i);
    expect(p).not.toMatch(/Eleonora/i); // nunca el nombre del cliente
  });

  it("instruye responder en el idioma pedido", () => {
    expect(buildSystemPrompt("en")).toMatch(/English/);
    expect(buildSystemPrompt("de")).toMatch(/German|Deutsch/);
    expect(buildSystemPrompt("pt")).toMatch(/Portuguese|Portugu/);
  });
});
