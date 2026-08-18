import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/pixel";

/**
 * En una SPA el PageView del pixel solo cuenta la carga inicial: si alguien
 * entra por /shopify y navega a /work, Meta y GA4 ven una sola página.
 * Esto manda la vista de cada ruta.
 *
 * La primera carga la omite a propósito — index.html ya disparó su PageView
 * y GA4 arranca con send_page_view en false, así que aquí se emite una vez
 * por ruta y ninguna se cuenta doble.
 */
const RouteAnalytics = () => {
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      // La inicial: el pixel ya la contó, falta contarla en GA4.
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      w.gtag?.("event", "page_view", { page_path: pathname });
      return;
    }
    trackPageView(pathname);
  }, [pathname]);

  return null;
};

export default RouteAnalytics;
