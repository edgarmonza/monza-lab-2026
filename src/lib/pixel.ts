/* Eventos de negocio del sitio.
 *
 * Cada evento sale hacia los tres destinos a la vez:
 *   - Meta Pixel  → optimización de campañas y públicos similares
 *   - GA4         → atribución y comportamiento
 *   - Vercel      → el mismo dato sin depender de scripts de terceros
 *
 * El pixel base (init + PageView) se inicializa en index.html; GA4 se
 * inyecta desde <GoogleAnalytics /> y solo si hay measurement id.
 *
 * Todo es no-op seguro si un destino no cargó (adblock, SSR, dev). */

import { track as vercelTrack } from "@vercel/analytics";

type FbqFn = (...args: unknown[]) => void;
type GtagFn = (...args: unknown[]) => void;
type Props = Record<string, string | number | boolean | null>;

const fbq = (): FbqFn | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { fbq?: FbqFn };
  return typeof w.fbq === "function" ? w.fbq : null;
};

const gtag = (): GtagFn | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : null;
};

const toVercel = (event: string, props?: Props) => {
  try {
    vercelTrack(event, props ?? {});
  } catch {
    /* best-effort */
  }
};

/** Lead = formulario enviado. El evento que optimizan las campañas de conversión. */
export const trackLead = (source: string) => {
  fbq()?.("track", "Lead", { content_name: source });
  gtag()?.("event", "generate_lead", { content_name: source });
  toVercel("lead", { source });
};

/** Contact = click a WhatsApp o email — intención directa de hablar. */
export const trackContact = (channel: "whatsapp" | "email", source: string) => {
  fbq()?.("track", "Contact", { content_name: source, content_category: channel });
  gtag()?.("event", "contact", { method: channel, content_name: source });
  toVercel("contact_click", { channel, source });
};

/** ViewContent = vio una sección clave (caso, oferta, pricing). */
export const trackViewContent = (contentName: string) => {
  fbq()?.("track", "ViewContent", { content_name: contentName });
  gtag()?.("event", "view_item", { item_name: contentName });
  toVercel("view_content", { content: contentName });
};

/** La Radiografía es el lead magnet — se mide aparte del contacto general. */
export const trackRadiografia = (step: "start" | "submit") => {
  if (step === "submit") {
    fbq()?.("track", "Lead", { content_name: "Radiografía Shopify" });
    gtag()?.("event", "generate_lead", { content_name: "Radiografía Shopify" });
  }
  gtag()?.("event", step === "start" ? "form_start" : "form_submit", {
    form_name: "radiografia",
  });
  toVercel(step === "start" ? "radiografia_start" : "radiografia_submit");
};

/** Click en un CTA. Mide el embudo antes del formulario. */
export const trackCta = (label: string, location: string) => {
  gtag()?.("event", "select_content", { content_type: "cta", item_id: label, location });
  toVercel("cta_click", { label, location });
};

/** Vista de página en una SPA: el PageView de index.html solo cuenta la carga inicial. */
export const trackPageView = (path: string) => {
  fbq()?.("track", "PageView");
  gtag()?.("event", "page_view", { page_path: path });
};

export const WHATSAPP_NUMBER = "573208492641";

/** Link de WhatsApp con mensaje pre-cargado. */
export const whatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
