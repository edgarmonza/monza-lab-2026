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

describe("sanitizeSessionId", () => {
  it("acepta ids limpios y descarta basura", async () => {
    const { sanitizeSessionId } = await import("./chat");
    expect(sanitizeSessionId("s-abc12345-xyz")).toBe("s-abc12345-xyz");
    expect(sanitizeSessionId("<script>alert(1)</script>")).toMatch(/^anon-|^scriptalert1script$/);
    expect(sanitizeSessionId(undefined)).toMatch(/^anon-[a-z0-9]{8}$/);
    expect(sanitizeSessionId("x".repeat(200)).length).toBeLessThanOrEqual(64);
  });
});
