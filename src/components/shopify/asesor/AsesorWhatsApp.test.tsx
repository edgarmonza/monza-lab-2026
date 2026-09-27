import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import AsesorWhatsApp from "./AsesorWhatsApp";
import { VIDEO } from "./video";

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

describe("AsesorWhatsApp", () => {
  it("dice el beneficio, no la tecnología", () => {
    movimiento(false);
    render(<AsesorWhatsApp lang="es" />);
    expect(screen.getByRole("heading", { level: 2, name: "Vende mientras tu equipo duerme." })).toBeTruthy();
    expect(document.body.textContent).not.toMatch(/\bIA\b|inteligencia artificial|agente/i);
  });

  it("avisa que la conversación es de ejemplo y la cuenta en texto", () => {
    movimiento(false);
    render(<AsesorWhatsApp lang="es" />);
    expect(screen.getByText("Conversación de ejemplo.")).toBeTruthy();
    expect(screen.getByText(/3:12 de la mañana/)).toBeTruthy();
  });

  it("el video es el del idioma de la página, mudo y en línea, y se puede pausar", () => {
    movimiento(false);
    const { container } = render(<AsesorWhatsApp lang="en" />);
    const video = container.querySelector("video")!;
    expect(video.getAttribute("poster")).toBe(VIDEO.poster("en"));
    expect(video.muted).toBe(true);
    expect(video.hasAttribute("playsinline")).toBe(true);
    const pausar = screen.getByRole("button", { name: "Pause the video" });
    fireEvent.click(pausar);
    expect(screen.getByRole("button", { name: "Play the video" })).toBeTruthy();
  });

  it("con movimiento reducido no arranca solo", () => {
    movimiento(true);
    const { container } = render(<AsesorWhatsApp lang="es" />);
    expect(container.querySelector("video")?.hasAttribute("autoplay")).toBe(false);
    expect(screen.getByRole("button", { name: "Reproducir el video" })).toBeTruthy();
  });

  it("los cuatro videos y sus portadas existen", () => {
    const pub = join(__dirname, "../../../../public");
    for (const l of ["es", "en", "de", "pt"] as const) {
      expect(existsSync(join(pub, VIDEO.mp4(l))), VIDEO.mp4(l)).toBe(true);
      expect(existsSync(join(pub, VIDEO.poster(l))), VIDEO.poster(l)).toBe(true);
    }
  });
});
