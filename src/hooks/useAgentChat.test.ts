import { describe, it, expect } from "vitest";
import { parseSSE } from "./useAgentChat";

describe("parseSSE", () => {
  it("extrae eventos completos y guarda el resto parcial", () => {
    const input =
      'data: {"type":"text","value":"ho"}\n\ndata: {"type":"text","value":"la"}\n\ndata: {"type":"done"';
    const { events, rest } = parseSSE(input, "");
    expect(events).toEqual([
      { type: "text", value: "ho" },
      { type: "text", value: "la" },
    ]);
    expect(rest).toBe('data: {"type":"done"');
  });

  it("completa un evento partido entre chunks", () => {
    const first = parseSSE('data: {"type":"te', "");
    expect(first.events).toEqual([]);
    const second = parseSSE('xt","value":"hi"}\n\n', first.rest);
    expect(second.events).toEqual([{ type: "text", value: "hi" }]);
  });
});
