import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/* El SDK de Resend (v6) NO lanza cuando la API rechaza un correo: devuelve { data: null, error }.
 * Estas pruebas cubren ese camino, que es el que perdía leads en silencio (30-sep-2026). */
const sendMock = vi.fn();

vi.mock("resend", () => {
  return {
    Resend: vi.fn(function(apiKey: string) {
      this.emails = { send: sendMock };
    }),
  };
});

import { sendRadiografia } from "./sendRadiografia";

const prospecto = {
  productUrl: "https://tienda.com/products/vestido",
  email: "ana@tienda.com",
  whatsapp: "+1 305 555 0100",
  lang: "es",
};

describe("sendRadiografia", () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    sendMock.mockReset();
    process.env.RESEND_API_KEY = "test";
    process.env.NOTIFY_EMAIL = "info@monzalab.com";
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
    delete process.env.RESEND_API_KEY;
    delete process.env.NOTIFY_EMAIL;
  });

  it("hace fallback a whatsapp si no hay RESEND_API_KEY", async () => {
    delete process.env.RESEND_API_KEY;
    const r = await sendRadiografia(prospecto);
    expect(r).toEqual({ ok: false, fallback: "whatsapp" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("manda el aviso a info@ con reply-to al prospecto y después la confirmación al prospecto", async () => {
    sendMock.mockResolvedValue({ data: { id: "e1" }, error: null });
    const r = await sendRadiografia(prospecto);
    expect(r).toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledTimes(2);
    expect(sendMock.mock.calls[0][0].to).toEqual(["info@monzalab.com"]);
    expect(sendMock.mock.calls[0][0].replyTo).toBe("ana@tienda.com");
    expect(sendMock.mock.calls[0][0].subject).toMatch(/tienda\.com/);
    expect(sendMock.mock.calls[1][0].to).toEqual(["ana@tienda.com"]);
  });

  it("hace fallback a whatsapp si Resend DEVUELVE error en el aviso interno, sin lanzar", async () => {
    sendMock.mockResolvedValue({ data: null, error: { name: "validation_error", message: "Invalid `reply_to` field" } });
    const r = await sendRadiografia(prospecto);
    expect(r).toEqual({ ok: false, fallback: "whatsapp" });
    // si el aviso a Edgar no salió, no se le promete nada al prospecto
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("sigue siendo ok si el aviso interno salió y solo falla la confirmación al prospecto", async () => {
    sendMock
      .mockResolvedValueOnce({ data: { id: "e1" }, error: null })
      .mockResolvedValueOnce({ data: null, error: { name: "validation_error", message: "Invalid `to` field" } });
    const r = await sendRadiografia(prospecto);
    expect(r).toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledTimes(2);
  });

  it("hace fallback a whatsapp si Resend lanza", async () => {
    sendMock.mockRejectedValue(new Error("boom"));
    const r = await sendRadiografia(prospecto);
    expect(r).toEqual({ ok: false, fallback: "whatsapp" });
  });

  it("separa prueba, atribución y claves de reintento sin prometer un cupo no confirmado", async () => {
    sendMock.mockResolvedValue({ data: { id: "e1" }, error: null });
    await sendRadiografia({ ...prospecto, requestId: "request-1", isTest: true, offer: "radiografia-v2", attribution: {campaign: "florida-leads-v2"} });
    expect(sendMock.mock.calls[0][0].subject).toContain("PRUEBA · NO LEAD");
    expect(sendMock.mock.calls[0][0].html).toContain("florida-leads-v2");
    expect(sendMock.mock.calls[0][1]).toEqual({idempotencyKey:"rx-internal-request-1"});
    expect(sendMock.mock.calls[1][1]).toEqual({idempotencyKey:"rx-confirm-request-1"});
    expect(sendMock.mock.calls[1][0].html).toContain("72 horas desde la confirmación");
  });
});
