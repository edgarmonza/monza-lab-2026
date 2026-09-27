import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

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

  it("dice la comparación que pidió Edgar: más barato y más eficiente que una agencia tradicional", () => {
    expect(textos("es").join(" ")).toMatch(/más barato y con más eficiencia que con una agencia tradicional/);
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
