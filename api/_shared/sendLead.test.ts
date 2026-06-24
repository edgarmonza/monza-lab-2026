import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => {
  return {
    Resend: vi.fn(function(apiKey: string) {
      this.emails = { send: sendMock };
    }),
  };
});

import { sendLeadEmail } from "./sendLead";

describe("sendLeadEmail", () => {
  beforeEach(() => {
    sendMock.mockReset();
    delete process.env.RESEND_API_KEY;
  });

  it("hace fallback a whatsapp si no hay RESEND_API_KEY", async () => {
    const r = await sendLeadEmail({ name: "Ana", email: "a@b.com", brand: "X" });
    expect(r).toEqual({ ok: false, fallback: "whatsapp" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("envía el correo cuando hay clave", async () => {
    process.env.RESEND_API_KEY = "test";
    sendMock.mockResolvedValue({});
    const r = await sendLeadEmail({
      name: "Ana",
      email: "a@b.com",
      brand: "X",
      source: "agente",
    });
    expect(r).toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledOnce();
    const arg = sendMock.mock.calls[0][0];
    expect(arg.replyTo).toBe("a@b.com");
    expect(arg.subject).toMatch(/Ana/);
    expect(arg.subject).toMatch(/agente/);
  });

  it("hace fallback si Resend lanza", async () => {
    process.env.RESEND_API_KEY = "test";
    sendMock.mockRejectedValue(new Error("boom"));
    const r = await sendLeadEmail({ name: "Ana", email: "a@b.com", brand: "X" });
    expect(r).toEqual({ ok: false, fallback: "whatsapp" });
  });
});
