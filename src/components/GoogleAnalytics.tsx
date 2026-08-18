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

const GoogleAnalytics = () => {
  useEffect(() => {
    if (!GA_ID) return;
    if (document.getElementById("ga4-src")) return;

    const s = document.createElement("script");
    s.id = "ga4-src";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);

    const w = window as unknown as {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag(...args: unknown[]) {
      w.dataLayer!.push(args);
    };
    w.gtag("js", new Date());
    // El page_view de cada ruta lo manda RouteAnalytics — aquí se apaga
    // el automático para no contar dos veces la carga inicial.
    w.gtag("config", GA_ID, { send_page_view: false });
  }, []);

  return null;
};

export default GoogleAnalytics;
