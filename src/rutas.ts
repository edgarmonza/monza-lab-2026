import { perezosa } from "@/lib/perezosa";

/* Las páginas que se bajan cuando se necesitan (code-split: el paquete principal queda liviano y
 * la portada carga rápido en el celular). Viven aquí y no en App.tsx para que main.tsx pueda
 * precargar la página de la ruta de entrada antes del primer render (ver lib/perezosa.tsx). La
 * portada (Index) va en el paquete principal y no se precarga. */
export const Speaker = perezosa(() => import("./pages/Speaker"));
export const NotFound = perezosa(() => import("./pages/NotFound"));
export const Upload = perezosa(() => import("./pages/Upload"));
export const MonzaSessions = perezosa(() => import("./pages/MonzaSessions"));
export const Work = perezosa(() => import("./pages/Work"));
// /shopify tiene página propia (vertical e-commerce). Mantiene el mismo SEO y FAQ
// que la pilar genérica: lee de src/data/pillars.ts para no perder lo ya indexado.
export const ShopifyVertical = perezosa(() => import("./pages/ShopifyVertical"));
// /work/<slug>: el caso v2 si existe en src/data/casos; si no, «no encontrada» (ver CasoRuta).
export const CasoRuta = perezosa(() => import("./pages/CasoRuta"));
export const Plataformas = perezosa(() => import("./pages/Plataformas"));

const POR_RUTA: Record<string, { precargar: () => Promise<void> }> = {
  "/speaker": Speaker,
  "/work": Work,
  "/shopify": ShopifyVertical,
  "/sessions": MonzaSessions,
  "/plataformas": Plataformas,
  "/upload": Upload,
};

/** Baja el código de la página de esa ruta. false si es la portada, que ya viene en el paquete principal. */
export const precargarRuta = async (pathname: string): Promise<boolean> => {
  const base = pathname.replace(/^\/(en|de|pt)(?=\/|$)/, "").replace(/\/+$/, "") || "/";
  if (base === "/") return false;
  const pagina = POR_RUTA[base] ?? (/^\/work\/[^/]+$/.test(base) ? CasoRuta : NotFound);
  await pagina.precargar();
  return true;
};
