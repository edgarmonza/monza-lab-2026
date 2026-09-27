import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/theme/ThemeContext";
import ShopifyVertical from "./ShopifyVertical";

/* La página entera, montada como la ve un visitante (27-sep-2026). Edgar pidió que /shopify
 * aparezca a quien busca una agencia de marketing y que todo lo que lleva a una conversación
 * quede medido: el H1 dice lo que la gente busca, los botones mandan su evento y la ficha para
 * Google es la de /shopify en www, con el servicio atado a la organización. */

class SinObservador {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

type ConGtag = Window & { gtag?: (...a: unknown[]) => void };
let gtag: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", SinObservador);
  // Movimiento reducido: la página se monta quieta y la prueba no depende de relojes.
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: q.includes("prefers-reduced-motion"),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  }));
  Element.prototype.scrollIntoView = vi.fn();
  gtag = vi.fn();
  (window as ConGtag).gtag = gtag as unknown as ConGtag["gtag"];
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  delete (window as ConGtag).gtag;
});

const montar = (ruta = "/shopify") =>
  render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[ruta]}>
        <LanguageProvider>
          <ShopifyVertical />
        </LanguageProvider>
      </MemoryRouter>
    </ThemeProvider>,
  );

const fichas = () =>
  [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(
    (s) => JSON.parse(s.textContent || "[]") as Record<string, unknown>[],
  );

describe("/shopify para quien busca una agencia de marketing", () => {
  it("el H1 dice lo que la gente busca, sin perder la frase de la página", () => {
    montar();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toMatch(/Agencia de marketing para Shopify/);
    expect(h1.textContent).toMatch(/El problema casi nunca es el producto/);
  });

  it("sin HTML previo, el hero entra animado", () => {
    montar();
    const envoltura = screen.getByRole("heading", { level: 1 }).parentElement as HTMLElement;
    expect(envoltura.style.opacity).toBe("0");
  });

  it("en inglés también", () => {
    montar("/en/shopify");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/Shopify marketing agency/i);
  });

  it("la ficha para Google es la de /shopify, en www, con el servicio atado a la organización", async () => {
    montar();
    await waitFor(() =>
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://www.monzalab.com/shopify"),
    );
    expect(document.title).toMatch(/Agencia de marketing para tiendas Shopify/);
    const ld = fichas();
    const servicio = ld.find((x) => x["@type"] === "Service") as { provider: Record<string, string> } | undefined;
    expect(servicio?.provider["@id"]).toBe("https://www.monzalab.com/#organization");
    expect(ld.some((x) => x["@type"] === "FAQPage")).toBe(true);
    expect(ld.some((x) => x["@type"] === "BreadcrumbList")).toBe(true);
  });
});

describe("/shopify mide lo que lleva a una conversación", () => {
  it("el WhatsApp del hero manda su evento de contacto", () => {
    montar();
    // El pie de página tiene su propio «WhatsApp directo» (se mide como "footer"): aquí va el del hero.
    const hero = screen.getByRole("heading", { level: 1 }).closest("section")!;
    fireEvent.click(within(hero).getByRole("link", { name: "WhatsApp directo" }));
    expect(gtag).toHaveBeenCalledWith("event", "contact", { method: "whatsapp", content_name: "shopify_hero" });
  });

  it("los dos botones que llevan a la radiografía mandan su evento, cada uno con su lugar", () => {
    montar();
    const [hero, cierre] = screen.getAllByRole("button", { name: /Ver mi tienda por dentro/ });
    fireEvent.click(hero);
    fireEvent.click(cierre);
    expect(gtag).toHaveBeenCalledWith("event", "select_content", { content_type: "cta", item_id: "radiografia", location: "shopify_hero" });
    expect(gtag).toHaveBeenCalledWith("event", "select_content", { content_type: "cta", item_id: "radiografia", location: "shopify_cierre" });
  });
});
