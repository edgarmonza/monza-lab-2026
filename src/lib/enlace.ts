import type { Lang } from "@/i18n/types";

/** El mismo camino en el idioma de la página: «/work/soloio» → «/en/work/soloio»; «/#proyectos» → «/en#proyectos».
 *  El español va sin prefijo. Los enlaces externos (http, mailto, wa.me) se devuelven igual. */
export const enlace = (lang: Lang, camino: string): string => {
  if (/^(https?:|mailto:|tel:)/.test(camino)) return camino;
  if (lang === "es") return camino;
  const [ruta, hash] = camino.split("#");
  const base = ruta === "/" || ruta === "" ? `/${lang}` : `/${lang}${ruta}`;
  return hash ? `${base}#${hash}` : base;
};

