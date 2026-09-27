import { describe, it, expect, afterEach } from "vitest";
import { Suspense } from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { perezosa } from "./perezosa";

/* React.lazy suspende siempre en su primer render, aunque el módulo ya esté bajado. Con el HTML
 * prerenderizado en pantalla, ese suspenso pintaba la página en blanco un instante (auditoría
 * móvil, 27-sep-2026). Una ruta precargada tiene que pintarse directo. */

afterEach(() => cleanup());

const Pagina = () => <p>listo</p>;

describe("perezosa", () => {
  it("precargada, se pinta en el primer render sin pasar por Suspense", async () => {
    const Ruta = perezosa(() => Promise.resolve({ default: Pagina }));
    await Ruta.precargar();
    render(
      <Suspense fallback={<p>cargando</p>}>
        <Ruta />
      </Suspense>,
    );
    expect(screen.getByText("listo")).toBeTruthy();
    expect(screen.queryByText("cargando")).toBeNull();
  });

  it("sin precargar, se porta como React.lazy", async () => {
    const Ruta = perezosa(() => Promise.resolve({ default: Pagina }));
    render(
      <Suspense fallback={<p>cargando</p>}>
        <Ruta />
      </Suspense>,
    );
    expect(screen.getByText("cargando")).toBeTruthy();
    expect(await screen.findByText("listo")).toBeTruthy();
  });
});
