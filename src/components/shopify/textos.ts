/* /shopify · la etiqueta y el titular del hero, en los cuatro idiomas. Viven aquí (y no dentro de
 * la página) porque también los usa la tarjeta para compartir (scripts/og/generar.mjs). */
import type { Lang } from "@/i18n/types";

type L = Record<Lang, string>;

// La etiqueta va dentro del H1: es lo que escribe quien busca (Edgar, 27-sep-2026: «toda la gente
// que esté buscando agencias de marketing»). Se escribe en minúsculas y la pone en mayúsculas el CSS.
export const HERO_EYEBROW: L = {
  es: "Agencia de marketing para Shopify",
  en: "Shopify marketing agency",
  de: "Shopify-Marketingagentur",
  pt: "Agência de marketing para Shopify",
};
export const HERO_H1: L = {
  es: "El problema casi nunca es el producto. Es la tienda que lo frena.",
  en: "The problem is almost never the product. It's the store slowing it down.",
  de: "Das Problem ist fast nie das Produkt. Es ist der Store, der es bremst.",
  pt: "O problema quase nunca é o produto. É a loja que o trava.",
};
