import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getPillarBySlug } from "@/data/pillars";

/* Edgar, 26-sep-2026: el copy de /shopify habla de lo que gana la tienda, no de cómo está hecha:
 * «no quiero poner que es 100 % de AI, que pasarela en Colombia… la gente necesita entender esos
 * resultados». Esta prueba evita que vuelva a colarse. (Las preguntas frecuentes viven en
 * pillars.ts y sí nombran la IA: son lo que la gente busca; eso lo decide Edgar aparte.) */
const fuente = readFileSync(join(__dirname, "ShopifyVertical.tsx"), "utf8");
const textos = (lang: string) => [...fuente.matchAll(new RegExp(`${lang}: "([^"]*)"`, "g"))].map((m) => m[1]);

describe("el copy de /shopify habla de resultados", () => {
  it("en español no promete tecnología", () => {
    const todo = textos("es").join(" · ");
    expect(todo).not.toMatch(/pasarela|100 ?%|con IA|motor de agentes|storefront/i);
  });

  it("en los otros idiomas tampoco", () => {
    expect(textos("en").join(" · ")).not.toMatch(/gateway|100 ?%|with AI|agent engine/i);
    expect(textos("de").join(" · ")).not.toMatch(/100 ?%|mit KI|Agenten-Engine|Storefront/i);
    expect(textos("pt").join(" · ")).not.toMatch(/gateway|100 ?%|com IA|motor de agentes|storefront/i);
  });

  it("dice la comparación que pidió Edgar, con las palabras que se buscan", () => {
    expect(textos("es").join(" ")).toMatch(/más barato y con más eficiencia que con una agencia de marketing tradicional/);
  });
});

/* 27-sep-2026 · Edgar: que la página aparezca a «toda la gente que esté buscando agencias de
 * marketing». El título y la descripción son lo que se ve en Google; las preguntas frecuentes,
 * lo que citan Google y los asistentes. */
const shopify = getPillarBySlug("shopify")!;
const IDIOMAS = ["es", "en", "de", "pt"] as const;

describe("la ficha de /shopify para buscadores", () => {
  it("el título nombra lo que la gente busca y cabe en el resultado de Google", () => {
    expect(shopify.seoTitle.es).toMatch(/agencia de marketing/i);
    expect(shopify.seoTitle.en).toMatch(/marketing agency/i);
    expect(shopify.seoTitle.de).toMatch(/Marketingagentur/i);
    expect(shopify.seoTitle.pt).toMatch(/agência de marketing/i);
    for (const l of IDIOMAS) {
      expect(shopify.seoTitle[l]).toMatch(/shopify/i);
      expect(shopify.seoTitle[l].length, l).toBeLessThanOrEqual(60);
    }
  });

  it("la descripción cabe y trae la comparación", () => {
    for (const l of IDIOMAS) expect(shopify.seoDescription[l].length, l).toBeLessThanOrEqual(160);
    expect(shopify.seoDescription.es).toMatch(/agencia tradicional/);
  });
});

describe("las preguntas frecuentes de /shopify", () => {
  const todo = (l: (typeof IDIOMAS)[number]) => shopify.faq.flatMap((f) => [f.q[l], f.a[l]]).join(" · ");

  it("contestan lo que pregunta quien busca una agencia de marketing", () => {
    expect(shopify.faq.length).toBeGreaterThanOrEqual(8);
    expect(shopify.faq[0].q.es).toMatch(/agencia de marketing/i);
    expect(shopify.faq.some((f) => /agencia de marketing tradicional/.test(f.q.es))).toBe(true);
    expect(shopify.faq.some((f) => /cuánto cuesta/i.test(f.q.es))).toBe(true);
    for (const f of shopify.faq) expect(f.q.es).toMatch(/^¿.*\?$/);
  });

  it("hablan de resultados: sin 100 %, sin pasarela y sin guiones largos", () => {
    for (const l of IDIOMAS) expect(todo(l), l).not.toMatch(/100 ?%|pasarela|gateway|storefront|—/i);
    expect(todo("es")).not.toMatch(/con IA\b/);
  });

  it("la inteligencia artificial sale en una sola pregunta", () => {
    expect(shopify.faq.filter((f) => /inteligencia artificial|\bIA\b/.test(f.q.es + " " + f.a.es)).length).toBe(1);
  });
});

describe("la página compila", () => {
  // Las pruebas de copy leen el archivo como texto: una llave de más pasaría sin ruido (pasó el
  // 27-sep al cambiar un dato). Importarla obliga a que el archivo sea TSX válido.
  it("se puede importar", async () => {
    const m = await import("./ShopifyVertical");
    expect(typeof m.default).toBe("function");
  });
});
