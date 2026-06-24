import { describe, it, expect } from "vitest";
import { sseLine, sanitizeMessages } from "./chat";

describe("sseLine", () => {
  it("serializa un evento como línea SSE", () => {
    expect(sseLine({ type: "text", value: "hola" })).toBe(
      'data: {"type":"text","value":"hola"}\n\n',
    );
  });
});

describe("sanitizeMessages", () => {
  it("descarta entradas inválidas y recorta longitud", () => {
    const out = sanitizeMessages([
      { role: "user", content: "a".repeat(5000) },
      { role: "bogus", content: "x" },
      { role: "assistant", content: "ok" },
    ]);
    expect(out).toHaveLength(2);
    expect(out[0].content.length).toBe(2000);
    expect(out[1]).toEqual({ role: "assistant", content: "ok" });
  });

  it("limita el número de turnos a 40 (conserva los últimos)", () => {
    const many = Array.from({ length: 50 }, (_, i) => ({
      role: "user" as const,
      content: `m${i}`,
    }));
    const out = sanitizeMessages(many);
    expect(out).toHaveLength(40);
    expect(out[out.length - 1].content).toBe("m49");
  });
});
