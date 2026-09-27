import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import PantallaQueEscribe from "./PantallaQueEscribe";

const conMovimientoReducido = (reducido: boolean) => {
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: reducido && q.includes("prefers-reduced-motion"),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
};

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const barra = (c: HTMLElement) => c.querySelector("[data-barra]")?.textContent ?? "";

describe("PantallaQueEscribe", () => {
  it("cuenta todo en texto para lectores de pantalla y buscadores", () => {
    conMovimientoReducido(false);
    render(<PantallaQueEscribe lang="es" onPedir={() => {}} />);
    const d = screen.getByText(/Una pantalla escribe las direcciones/);
    for (const s of [
      "soloio.com",
      "eleonoramorales.com",
      "skinv.com.co",
      "Crece tus ventas",
      "Configura tu CRM",
      "Crea agentes de WhatsApp",
    ]) {
      expect(d.textContent).toContain(s);
    }
  });

  it("la animación se esconde a los lectores de pantalla; los controles no", () => {
    conMovimientoReducido(false);
    const { container } = render(<PantallaQueEscribe lang="es" onPedir={() => {}} />);
    expect(container.querySelector("[data-pantalla]")?.getAttribute("aria-hidden")).toBe("true");
    const grupo = screen.getByRole("group", { name: "Controles de la pantalla" });
    expect(grupo).toBeTruthy();
    for (const n of ["Ver soloio", "Ver Eleonora", "Ver Skin V", "Ver el sistema"])
      expect(screen.getByRole("button", { name: n })).toBeTruthy();
  });

  it("se puede pausar y seguir", () => {
    conMovimientoReducido(false);
    render(<PantallaQueEscribe lang="es" onPedir={() => {}} />);
    const pausar = screen.getByRole("button", { name: "Pausar la animación" });
    expect(pausar.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(pausar);
    const seguir = screen.getByRole("button", { name: "Seguir la animación" });
    expect(seguir.getAttribute("aria-pressed")).toBe("true");
  });

  it("con movimiento reducido no se mueve: muestra cada tienda quieta y se cambia con los controles", () => {
    conMovimientoReducido(true);
    const { container } = render(<PantallaQueEscribe lang="es" onPedir={() => {}} />);
    expect(screen.queryByRole("button", { name: "Pausar la animación" })).toBeNull();
    expect(barra(container)).toBe("soloio.com");
    fireEvent.click(screen.getByRole("button", { name: "Ver Eleonora" }));
    expect(barra(container)).toBe("eleonoramorales.com");
    fireEvent.click(screen.getByRole("button", { name: "Ver el sistema" }));
    expect(container.textContent).toContain("Crea agentes de WhatsApp.");
    expect(container.textContent).toContain("¿Y la tuya?");
  });

  it("la pausa va antes de los capítulos, lejos de los botones flotantes de la esquina", () => {
    conMovimientoReducido(false);
    render(<PantallaQueEscribe lang="es" onPedir={() => {}} />);
    const botones = screen.getAllByRole("button").filter((b) => b.closest('[role="group"]'));
    expect(botones[0].getAttribute("aria-label")).toBe("Pausar la animación");
  });

  it("el capítulo del sistema se ve corto y se anuncia completo", () => {
    conMovimientoReducido(false);
    render(<PantallaQueEscribe lang="de" onPedir={() => {}} />);
    const b = screen.getByRole("button", { name: "Zeige das System" });
    expect(b.textContent).toBe("System");
  });

  it("el navegador elige la captura de celular o de escritorio desde el HTML, por media query", () => {
    conMovimientoReducido(false);
    const { container } = render(<PantallaQueEscribe lang="es" onPedir={() => {}} />);
    const soloio = container.querySelector("picture")!;
    const escritorio = soloio.querySelector('source[type="image/avif"][media]');
    expect(escritorio?.getAttribute("media")).toBe("(min-width: 528px)");
    expect(escritorio?.getAttribute("srcset")).toContain("soloio-d.avif");
    const movil = [...soloio.querySelectorAll('source[type="image/avif"]')].find((s) => !s.hasAttribute("media"));
    expect(movil?.getAttribute("srcset")).toContain("soloio-m.avif");
    expect(soloio.querySelector("img")?.getAttribute("src")).toContain("soloio-m.webp");
  });

  it("habla el idioma de la página", () => {
    conMovimientoReducido(true);
    const { container } = render(<PantallaQueEscribe lang="en" onPedir={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Show the system" }));
    expect(container.textContent).toContain("Build WhatsApp agents.");
    expect(container.textContent).toContain("How we're building it at soloio");
  });
});
