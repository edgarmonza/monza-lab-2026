import { useEffect } from "react";

/**
 * Inyecta GA4 en cliente. Solo se activa si hay measurement id en
 * VITE_GA_MEASUREMENT_ID — sin id, no carga nada y no rompe nada.
 *
 * El id de GA4 es público (viaja en el HTML de cualquier sitio con
 * Analytics), así que va como variable de entorno por comodidad de
 * configuración, no por secreto.
 */
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

type GaWindow = {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

// La cola se arma al cargar el módulo, NO dentro del efecto. RouteAnalytics
// está más arriba en el árbol y su primer efecto corre antes que el de este
// componente: si gtag todavía no existe, la vista de la primera página —la
// del aterrizaje desde un anuncio— se pierde. (Hallado el 21-sep-2026.)
if (GA_ID && typeof window !== "undefined") {
  const w = window as unknown as GaWindow;
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    // gtag.js solo procesa el objeto `arguments`. Con parámetros rest llega
    // un Array, y un Array en dataLayer se ignora en silencio: ni config ni
    // eventos salen hacia Google. Por eso aquí NO se usan rest params.
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    w.gtag("js", new Date());
    // El page_view de cada ruta lo manda RouteAnalytics — aquí se apaga
    // el automático para no contar dos veces la carga inicial.
    w.gtag("config", GA_ID, { send_page_view: false });
  }
}

const GoogleAnalytics = () => {
  useEffect(() => {
    if (!GA_ID) return;
    if (document.getElementById("ga4-src")) return;

    const s = document.createElement("script");
    s.id = "ga4-src";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
  }, []);

  return null;
};

export default GoogleAnalytics;
