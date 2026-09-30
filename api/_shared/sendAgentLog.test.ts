import { describe, it, expect, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => {
  return {
    Resend: vi.fn(function(apiKey: string) {
      this.emails = { send: sendMock };
    }),
  };
});

import { agentLogSubject, sendAgentLog } from "./sendAgentLog";

describe("sendAgentLog", () => {
  it("el asunto es estable por sesión (así Gmail agrupa el hilo)", () => {
    const a = agentLogSubject("s-abcdef12-3456", "/shopify");
    const b = agentLogSubject("s-abcdef12-3456", "/shopify");
    expect(a).toBe(b);
    expect(a).toMatch(/\[Agente Monza\] conversación sabcdef1 · \/shopify/);
  });
  it("sin RESEND_API_KEY o sin AGENT_LOG_EMAIL no hace nada", async () => {
    const prev = { k: process.env.RESEND_API_KEY, e: process.env.AGENT_LOG_EMAIL };
    delete process.env.RESEND_API_KEY;
    delete process.env.AGENT_LOG_EMAIL;
    const r = await sendAgentLog({ sessionId: "s-test1234", lang: "es", model: "m", messages: [{ role: "user", content: "hola" }], reply: "hey", tools: [] });
    expect(r.ok).toBe(false);
    if (prev.k) process.env.RESEND_API_KEY = prev.k;
    if (prev.e) process.env.AGENT_LOG_EMAIL = prev.e;
  });
  it("devuelve ok:false si Resend DEVUELVE error sin lanzar (el SDK v6 no lanza)", async () => {
    const prev = { k: process.env.RESEND_API_KEY, e: process.env.AGENT_LOG_EMAIL };
    process.env.RESEND_API_KEY = "test";
    process.env.AGENT_LOG_EMAIL = "info@monzalab.com";
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: null, error: { name: "application_error", message: "Internal server error" } });
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const r = await sendAgentLog({ sessionId: "s-test1234", lang: "es", model: "m", messages: [{ role: "user", content: "hola" }], reply: "hey", tools: [] });
    spy.mockRestore();
    expect(r.ok).toBe(false);
    expect(sendMock).toHaveBeenCalledOnce();
    if (prev.k) process.env.RESEND_API_KEY = prev.k; else delete process.env.RESEND_API_KEY;
    if (prev.e) process.env.AGENT_LOG_EMAIL = prev.e; else delete process.env.AGENT_LOG_EMAIL;
  });
});
