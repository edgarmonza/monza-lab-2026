import { beforeEach, describe, expect, it, vi } from "vitest";
const send = vi.hoisted(() => vi.fn());
vi.mock("./_shared/sendRadiografia", () => ({ sendRadiografia: send }));
import handler from "./radiografia";
const base = { productUrl: "tienda.com", email: "ana@tienda.com", whatsapp: "+1 305 555 0100" };
const request = (body: unknown) => new Request("https://www.monzalab.com/api/radiografia", { method: "POST", body: JSON.stringify(body) });
beforeEach(() => send.mockReset());
describe("captura de Radiografía", () => {
  it("rechaza datos inválidos sin enviar avisos", async () => {
    for (const body of [null, { ...base, productUrl: 99 }, { ...base, email: "bad" }, { ...base, whatsapp: "abc" }]) {
      expect((await handler(request(body))).status).toBe(400);
    }
    expect(send).not.toHaveBeenCalled();
  });
  it("transporta atribución acotada e identifica las pruebas internas", async () => {
    send.mockResolvedValue({ ok: true });
    const id = "11111111-1111-4111-8111-111111111111";
    const res = await handler(request({ ...base, email: "info@monzalab.com", requestId: id, offer: "radiografia-v2", attribution: { qa: true, campaign: "florida-leads-v2", landing: "/shopify/radiografia", secret: "exclude" } }));
    expect(await res.json()).toEqual({ ok: true, requestId: id, isTest: true });
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ productUrl: "https://tienda.com/", attribution: { campaign: "florida-leads-v2", landing: "/shopify/radiografia" }, isTest: true }));
  });
  it("un aviso rechazado no responde como una solicitud recibida", async () => {
    send.mockResolvedValue({ ok: false, fallback: "whatsapp" });
    const res = await handler(request(base));
    expect(res.status).toBe(502);
    expect((await res.json()).ok).toBe(false);
  });
});
