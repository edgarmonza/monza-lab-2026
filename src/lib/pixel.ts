/* Meta Pixel event helpers.
 * The base pixel (PageView) is initialised in index.html — these helpers fire
 * the conversion events Meta Ads optimises against. Safe no-ops if fbq is absent
 * (adblockers, SSR, pixel stripped in dev). */

type FbqFn = (...args: unknown[]) => void;

const fbq = (): FbqFn | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { fbq?: FbqFn };
  return typeof w.fbq === "function" ? w.fbq : null;
};

/** Lead = formulario enviado. El evento que optimizan las campañas de conversión. */
export const trackLead = (source: string) => {
  fbq()?.("track", "Lead", { content_name: source });
};

/** Contact = click a WhatsApp o email — intención directa de hablar. */
export const trackContact = (channel: "whatsapp" | "email", source: string) => {
  fbq()?.("track", "Contact", { content_name: source, content_category: channel });
};

/** ViewContent = vio una sección clave (caso, oferta, pricing). */
export const trackViewContent = (contentName: string) => {
  fbq()?.("track", "ViewContent", { content_name: contentName });
};

export const WHATSAPP_NUMBER = "573208492641";

/** Link de WhatsApp con mensaje pre-cargado. */
export const whatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
