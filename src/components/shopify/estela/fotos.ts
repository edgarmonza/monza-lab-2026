/* La estela de contenido de /shopify: lo que hicimos de ropa, alternado por marca.
 *
 * Edgar, 26-sep-2026: «algunas de Eleonora, de las que hicimos para ella para redes; algunas de
 * las que yo hago para mi Instagram; y algunas de soloio», con el efecto de la sección de Monza
 * en la página de Eleonora (la estela que sigue al mouse).
 * - soloio: campaña de agosto (autorización: ver docs/internal/ESTADO.md).
 * - Eleonora: el set que ella aprobó y que ya está publicado en su web (AI Atelier), solo los
 *   looks cubiertos (su regla de imagen).
 * - Monza: sets de la Biblioteca que salieron en @monza.lab.
 * Se recodifican con docs/internal/estela/codificar.sh (440×550, AVIF + WebP). */
import type { Lang } from "@/i18n/types";

type L = Record<Lang, string>;
export type MarcaEstela = "soloio" | "eleonora" | "monza";

export interface FotoEstela {
  id: string;
  marca: MarcaEstela;
  avif: string;
  webp: string;
}

const R = "/images/shopify/estela";
const foto = (id: string, marca: MarcaEstela): FotoEstela => ({ id, marca, avif: `${R}/${id}.avif`, webp: `${R}/${id}.webp` });

/** Alternadas: nunca dos de la misma marca seguidas.
 *  28-sep-2026: salió `eleonora-miumiu` (cárdigan abierto sobre bralette): rompe la regla de imagen de
 *  Eleonora (Clientes/Eleonora-EM/REGLA-IMAGEN-ELEONORA.md). Quedan 5 de ella. */
export const FOTOS: FotoEstela[] = [
  foto("soloio-boda", "soloio"),
  foto("eleonora-rojo", "eleonora"),
  foto("monza-casco", "monza"),
  foto("soloio-jardin", "soloio"),
  foto("monza-flow", "monza"),
  foto("soloio-cartas", "soloio"),
  foto("eleonora-chanel", "eleonora"),
  foto("monza-gorra", "monza"),
  foto("soloio-iglesia", "soloio"),
  foto("eleonora-gucci", "eleonora"),
  foto("monza-burbuja", "monza"),
  foto("soloio-terraza", "soloio"),
  foto("eleonora-cuero", "eleonora"),
  foto("monza-tacon", "monza"),
  foto("soloio-cena", "soloio"),
  foto("eleonora-noche", "eleonora"),
  foto("monza-luz-rosa", "monza"),
];

/** El crédito de cada tarjeta: de quién es y qué es. */
export const PIE: Record<MarcaEstela, L> = {
  soloio: { es: "soloio · campaña", en: "soloio · campaign", de: "soloio · Kampagne", pt: "soloio · campanha" },
  eleonora: {
    es: "Eleonora Morales · redes",
    en: "Eleonora Morales · social",
    de: "Eleonora Morales · Social Media",
    pt: "Eleonora Morales · redes sociais",
  },
  monza: { es: "Monza · Instagram", en: "Monza · Instagram", de: "Monza · Instagram", pt: "Monza · Instagram" },
};

export const COPY_ESTELA = {
  antetitulo: {
    es: "Contenido · hecho en Monza",
    en: "Content · made at Monza",
    de: "Content · gemacht bei Monza",
    pt: "Conteúdo · feito na Monza",
  },
  titulo: {
    es: "Campañas, catálogo y redes, todas las semanas.",
    en: "Campaigns, catalog and social, every week.",
    de: "Kampagnen, Katalog und Social, jede Woche.",
    pt: "Campanhas, catálogo e redes, todas as semanas.",
  },
  sub: {
    es: "Sale del mismo sistema que vende, para marcas como soloio y Eleonora Morales y para nuestro propio Instagram. Tu marca publica al ritmo que necesita, sin montar una producción cada vez.",
    en: "It comes out of the same system that sells, for brands like soloio and Eleonora Morales and for our own Instagram. Your brand publishes at the pace it needs, without staging a production every time.",
    de: "Es entsteht im selben System, das verkauft, für Marken wie soloio und Eleonora Morales und für unser eigenes Instagram. Deine Marke veröffentlicht in ihrem Tempo, ohne jedes Mal eine Produktion aufzusetzen.",
    pt: "Sai do mesmo sistema que vende, para marcas como a soloio e a Eleonora Morales e para o nosso próprio Instagram. A tua marca publica ao ritmo de que precisa, sem montar uma produção de cada vez.",
  },
  pistaMouse: { es: "Mueve el mouse", en: "Move your mouse", de: "Bewege die Maus", pt: "Move o rato" },
  pistaDedo: { es: "Desliza el dedo", en: "Swipe your finger", de: "Wisch mit dem Finger", pt: "Desliza o dedo" },
  resumen: {
    es: "Una estela de fotos que aparece al mover el mouse o el dedo: campañas de soloio, editoriales de Eleonora Morales para sus redes y publicaciones del Instagram de Monza.",
    en: "A trail of photos that appears as you move your mouse or finger: soloio campaigns, Eleonora Morales editorials for her social media and posts from Monza's Instagram.",
    de: "Eine Spur aus Fotos, die erscheint, wenn du Maus oder Finger bewegst: Kampagnen von soloio, Editorials von Eleonora Morales für ihre Social Media und Posts aus Monzas Instagram.",
    pt: "Um rasto de fotos que aparece ao mover o rato ou o dedo: campanhas da soloio, editoriais da Eleonora Morales para as redes sociais e publicações do Instagram da Monza.",
  },
} satisfies Record<string, L>;
