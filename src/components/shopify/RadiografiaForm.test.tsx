import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import RadiografiaForm from "./RadiografiaForm";

/* Auditoría móvil, 27-sep-2026: con 15 px el iPhone hace zoom al tocar un campo, y a 360 px
 * los textos de ayuda se cortaban («…de tu tiend», «(opciona»). */

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const montar = () => {
  vi.stubGlobal("IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } });
  return render(
    <MemoryRouter initialEntries={["/shopify"]}>
      <LanguageProvider>
        <RadiografiaForm />
      </LanguageProvider>
    </MemoryRouter>,
  );
};

describe("RadiografiaForm en el celular", () => {
  it("los campos van a 16 px en el celular para que el iPhone no haga zoom", () => {
    const { container } = montar();
    const campos = container.querySelectorAll("input, select");
    expect(campos.length).toBe(4);
    for (const c of campos) expect(c.className, c.id).toMatch(/(^|\s)text-base(\s|$)/);
  });

  it("lo que se ve dentro de los campos cabe a 360 px", () => {
    const { container } = montar();
    const url = container.querySelector<HTMLInputElement>("#rx-url")!;
    expect(url.placeholder.length).toBeLessThanOrEqual(24);
    const primera = container.querySelector("#rx-rev option")!;
    expect(primera.textContent!.length).toBeLessThanOrEqual(25);
  });

  it("el menú de ventas se ve como menú: lleva su flecha", () => {
    const { container } = montar();
    expect(container.querySelector("#rx-rev")?.parentElement?.querySelector("svg")).toBeTruthy();
  });
});
