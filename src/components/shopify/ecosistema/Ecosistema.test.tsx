import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import Ecosistema from "./Ecosistema";

const movimiento = (reducido: boolean) =>
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: reducido && q.includes("prefers-reduced-motion"),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Ecosistema", () => {
  it("presenta la tienda y las ocho piezas como botones con su beneficio", () => {
    movimiento(false);
    render(<Ecosistema lang="es" />);
    expect(screen.getByRole("heading", { level: 2, name: "Tu tienda, hablándose entre sí." })).toBeTruthy();
    const grupo = screen.getByRole("group", { name: "Las piezas del ecosistema" });
    expect(within(grupo).getAllByRole("button")).toHaveLength(8);
    expect(screen.getByRole("button", { name: "WhatsApp: Nadie se queda sin respuesta" })).toBeTruthy();
  });

  it("al tocar una pieza cuenta su beneficio y el recorrido se queda ahí", () => {
    movimiento(false);
    render(<Ecosistema lang="es" />);
    fireEvent.click(screen.getByRole("button", { name: "Catálogo: Lo que llega, se vende" }));
    expect(screen.getByRole("heading", { level: 3, name: "Lo que llega, se vende" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Seguir el recorrido" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("todo el texto queda legible para buscadores y lectores de pantalla", () => {
    movimiento(false);
    const { container } = render(<Ecosistema lang="es" />);
    const lista = container.querySelector("ul.sr-only");
    expect(lista?.querySelectorAll("li")).toHaveLength(8);
    expect(lista?.textContent).toContain("Nada se vende dos veces.");
  });

  it("con movimiento reducido no hay recorrido que pausar", () => {
    movimiento(true);
    render(<Ecosistema lang="es" />);
    expect(screen.queryByRole("button", { name: /recorrido/ })).toBeNull();
    expect(screen.getByRole("heading", { level: 3, name: "Nadie se queda sin respuesta" })).toBeTruthy();
  });

  it("habla el idioma de la página", () => {
    movimiento(true);
    render(<Ecosistema lang="en" />);
    expect(screen.getByRole("heading", { level: 2, name: "Your store, all talking to each other." })).toBeTruthy();
  });
});
