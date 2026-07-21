import { describe, it, expect } from "vitest";
import { buildKnowledge } from "./knowledge";

describe("buildKnowledge", () => {
  it("incluye los 6 casos de uso y proyectos nombrables", () => {
    const k = buildKnowledge("es");
    expect(k).toMatch(/AI-first/i);
    expect(k).toMatch(/e-commerce|ecommerce|shopify/i);
    expect(k).toMatch(/agentes/i);
    expect(k).toMatch(/branding/i);
    expect(k).toMatch(/consultor/i);
    expect(k).toMatch(/Bavarian/);
    expect(k).toMatch(/Forbes/);
  });

  it("describe agentes por vertical SIN nombre propio de cliente", () => {
    const k = buildKnowledge("es");
    expect(k).toMatch(/asesora de moda/i);
    expect(k).toMatch(/comercio exterior/i);
    expect(k).not.toMatch(/Eleonora/i);
  });

  it("responde en inglés cuando lang=en", () => {
    const k = buildKnowledge("en");
    expect(k).toMatch(/AI-first/i);
    expect(k).not.toMatch(/Eleonora/i);
  });

  it("incluye el caso de plataformas AI-first por vertical, sin nombres de cliente", () => {
    const es = buildKnowledge("es");
    expect(es).toMatch(/PLATAFORMA AI-FIRST PARA TU INDUSTRIA/i);
    expect(es).toMatch(/costeo DDP/i);
    expect(es).toMatch(/trip planner/i);
    expect(es).toMatch(/751/);
    const en = buildKnowledge("en");
    expect(en).toMatch(/AI-FIRST PLATFORM FOR YOUR INDUSTRY/i);
    expect(en).toMatch(/DDP costing/i);
    expect(en).toMatch(/751/);
  });
});
