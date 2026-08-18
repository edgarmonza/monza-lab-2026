import { describe, it, expect } from "vitest";
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
});
