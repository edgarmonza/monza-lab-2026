import { describe, it, expect } from "vitest";
import { precargarRuta } from "./rutas";

/* main.tsx precarga la página de la ruta de entrada antes del primer render, para que React no
 * pinte el vacío de Suspense encima del HTML prerenderizado (auditoría móvil, 27-sep-2026). */
describe("precargarRuta", () => {
  it("la portada no se precarga: viene en el paquete principal", async () => {
    expect(await precargarRuta("/")).toBe(false);
    expect(await precargarRuta("/en")).toBe(false);
  });

  it("baja la página de la ruta, en cualquier idioma", async () => {
    for (const r of ["/shopify", "/pt/speaker", "/en/work/eleonora-morales", "/de/agentes"]) {
      expect(await precargarRuta(r), r).toBe(true);
    }
  });
});
