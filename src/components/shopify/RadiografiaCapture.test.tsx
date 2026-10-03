import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
const funnel = vi.hoisted(() => vi.fn());
vi.mock("@/lib/pixel", () => ({ trackRadiografia: funnel, trackRadiografiaView: vi.fn(), trackContact: vi.fn(), whatsAppUrl: () => "https://wa.me/573208492641" }));
import RadiografiaForm from "./RadiografiaForm";
afterEach(() => { cleanup(); vi.unstubAllGlobals(); funnel.mockClear(); });
const mount = () => {
  vi.stubGlobal("IntersectionObserver", class { observe() {} disconnect() {} });
  return render(<MemoryRouter initialEntries={["/shopify/radiografia"]}><LanguageProvider><RadiografiaForm compact /></LanguageProvider></MemoryRouter>);
};
describe("éxito real del formulario", () => {
  it("una respuesta vacía con HTTP 200 no cuenta como Lead", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }));
    const page = mount();
    fireEvent.submit(page.container.querySelector("form")!);
    await waitFor(() => expect(page.getByRole("alert")).toBeTruthy());
    expect(funnel).not.toHaveBeenCalledWith("submit");
  });
  it("una solicitud aceptada cuenta y muestra confirmación; el payload conserva la atribución", async () => {
    const fetcher=vi.fn().mockResolvedValue({ ok: true, json: async () => ({ok:true,isTest:false}) });
    vi.stubGlobal("fetch",fetcher);
    const page=mount();fireEvent.submit(page.container.querySelector("form")!);
    await waitFor(() => expect(page.getByText("Recibido.")).toBeTruthy());
    expect(funnel).toHaveBeenCalledWith("submit");
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual(expect.objectContaining({requestId:expect.any(String),attribution:expect.any(Object),offer:"radiografia-v2"}));
  });
  it("la prueba interna puede verificar recepción sin generar un Lead", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ok:true,isTest:true}) }));
    const page=mount();fireEvent.submit(page.container.querySelector("form")!);
    await waitFor(() => expect(page.getByText("Recibido.")).toBeTruthy());
    expect(funnel).not.toHaveBeenCalledWith("submit");
  });
});
