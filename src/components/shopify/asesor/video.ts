/* Dónde viven el video del asesor y su portada, por idioma. Se rehacen con
 * docs/internal/asesor/ (chat.html + render.mjs). */
import type { Lang } from "@/i18n/types";

export const VIDEO = {
  mp4: (l: Lang) => `/videos/shopify/asesor-${l}.mp4`,
  poster: (l: Lang) => `/videos/shopify/asesor-${l}.webp`,
};
