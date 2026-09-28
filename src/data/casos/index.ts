/* El registro de los casos v2: junta los archivos de esta carpeta en el orden de la portada.
 * Un caso nuevo = un archivo que exporta `caso` + su slug en ORDEN. */
import type { Caso } from "./tipos";

export const ORDEN = [
  "soloio",
  "eleonora-morales",
  "plataforma-comercio-exterior",
  "monza-haus",
  "bavarian-econs",
  "pacho-alvarez",
  "ia-index",
  "plataforma-turismo",
  "guardian-of-speed",
] as const;

const modulos = import.meta.glob<{ caso: Caso }>(["./*.ts", "!./index.ts", "!./tipos.ts", "!./*.test.ts"], { eager: true });
const porSlug = new Map<string, Caso>();
Object.values(modulos).forEach((m) => { if (m?.caso) porSlug.set(m.caso.slug, m.caso); });

export const CASOS: Caso[] = ORDEN.map((s) => porSlug.get(s)).filter((c): c is Caso => !!c);
export const casoPorSlug = (slug: string | undefined) => (slug ? porSlug.get(slug) : undefined);
/** Los tres que siguen, para «otros casos». */
export const otrosCasos = (slug: string, n = 3) => {
  const i = CASOS.findIndex((c) => c.slug === slug);
  return Array.from({ length: Math.min(n, CASOS.length - 1) }, (_, k) => CASOS[(i + 1 + k) % CASOS.length]);
};
