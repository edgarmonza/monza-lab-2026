import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackLead, trackContact, whatsAppUrl } from "@/lib/pixel";

type Lang = "es" | "en" | "de" | "pt";

const T: Record<string, Record<Lang, string>> = {
  name: { es: "Tu nombre", en: "Your name", de: "Dein Name", pt: "O teu nome" },
  email: { es: "Tu correo", en: "Your email", de: "Deine E-Mail", pt: "O teu email" },
  brand: { es: "Tu marca o empresa", en: "Your brand or company", de: "Deine Marke oder Firma", pt: "A tua marca ou empresa" },
  handle: { es: "Instagram o página web (opcional)", en: "Instagram or website (optional)", de: "Instagram oder Website (optional)", pt: "Instagram ou site (opcional)" },
  need: { es: "¿Qué necesitas?", en: "What do you need?", de: "Was brauchst du?", pt: "O que precisas?" },
  needEcom: { es: "Ecommerce en Shopify", en: "Shopify ecommerce", de: "Shopify E-Commerce", pt: "Ecommerce em Shopify" },
  needContent: { es: "Más y mejor contenido", en: "More and better content", de: "Mehr und besserer Content", pt: "Mais e melhor conteúdo" },
  needAgents: { es: "Agentes de IA (ventas / pauta)", en: "AI agents (sales / paid media)", de: "KI-Agenten (Vertrieb / Ads)", pt: "Agentes de IA (vendas / anúncios)" },
  needAll: { es: "Todo el sistema completo", en: "The full system", de: "Das komplette System", pt: "O sistema completo" },
  budget: { es: "Presupuesto estimado", en: "Estimated budget", de: "Geschätztes Budget", pt: "Orçamento estimado" },
  b1: { es: "Menos de $12M COP (~USD 3.000)", en: "Under USD 3,000", de: "Unter USD 3.000", pt: "Menos de USD 3.000" },
  b2: { es: "$12M – $25M COP (USD 3.000–6.000)", en: "USD 3,000–6,000", de: "USD 3.000–6.000", pt: "USD 3.000–6.000" },
  b3: { es: "$25M – $50M COP (USD 6.000–12.000)", en: "USD 6,000–12,000", de: "USD 6.000–12.000", pt: "USD 6.000–12.000" },
  b4: { es: "Más de $50M COP (USD 12.000+)", en: "USD 12,000+", de: "USD 12.000+", pt: "USD 12.000+" },
  b5: { es: "Aún no lo sé", en: "Not sure yet", de: "Noch unklar", pt: "Ainda não sei" },
  message: { es: "Cuéntanos de tu marca en una línea", en: "Tell us about your brand in one line", de: "Erzähl uns in einem Satz von deiner Marke", pt: "Fala-nos da tua marca numa linha" },
  submit: { es: "Enviar — Edgar te responde", en: "Send — Edgar replies personally", de: "Senden — Edgar antwortet persönlich", pt: "Enviar — o Edgar responde" },
  sending: { es: "Enviando…", en: "Sending…", de: "Senden…", pt: "A enviar…" },
  orWhatsApp: { es: "o escríbenos directo por WhatsApp", en: "or message us directly on WhatsApp", de: "oder schreib uns direkt auf WhatsApp", pt: "ou fala connosco diretamente no WhatsApp" },
  successTitle: { es: "Recibido.", en: "Received.", de: "Erhalten.", pt: "Recebido." },
  successBody: {
    es: "Edgar revisa cada mensaje personalmente. Te respondemos por correo o WhatsApp en menos de 24 horas.",
    en: "Edgar reviews every message personally. You'll hear back by email or WhatsApp within 24 hours.",
    de: "Edgar prüft jede Nachricht persönlich. Du hörst innerhalb von 24 Stunden per E-Mail oder WhatsApp von uns.",
    pt: "O Edgar revê cada mensagem pessoalmente. Respondemos por email ou WhatsApp em menos de 24 horas.",
  },
};

const inputStyle: React.CSSProperties = {
  background: "rgba(255,252,247,0.04)",
  border: "1px solid rgba(255,252,247,0.12)",
  color: "rgba(255,252,247,0.92)",
  borderRadius: 10,
  padding: "14px 16px",
  fontSize: 15,
  width: "100%",
  outline: "none",
};

/** Lead form — posts to /api/lead (Resend → edgar@monzalab.com).
 *  If the API can't send, falls back to opening WhatsApp with the same info.
 *  Fires Meta `Lead` on success so campaigns can optimise for it. */
const LeadForm = ({ source = "studio_landing" }: { source?: string }) => {
  const { language } = useLanguage();
  const t = (k: keyof typeof T) => T[k][language];

  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [form, setForm] = useState({ name: "", email: "", brand: "", handle: "", need: "", budget: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const waSummary = () =>
    `Hola Edgar — soy ${form.name} de ${form.brand}. Necesito: ${form.need || "—"}. Presupuesto: ${form.budget || "—"}. ${form.message}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state !== "idle") return;
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source, lang: language }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      trackLead(source);
      if (data.ok) {
        setState("done");
      } else {
        // Fallback: el lead no se pierde — se abre WhatsApp con el resumen.
        window.open(whatsAppUrl(waSummary()), "_blank", "noopener");
        setState("done");
      }
    } catch {
      trackLead(source);
      window.open(whatsAppUrl(waSummary()), "_blank", "noopener");
      setState("done");
    }
  };

  if (state === "done") {
    return (
      <div className="text-center py-12">
        <p className="font-clash font-bold text-3xl mb-4" style={{ color: "rgba(248,180,217,0.95)" }}>
          {t("successTitle")}
        </p>
        <p className="text-[15px] leading-relaxed max-w-md mx-auto" style={{ color: "rgba(255,252,247,0.65)" }}>
          {t("successBody")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input required placeholder={t("name")} value={form.name} onChange={set("name")} style={inputStyle} aria-label={t("name")} />
      <input required type="email" placeholder={t("email")} value={form.email} onChange={set("email")} style={inputStyle} aria-label={t("email")} />
      <input required placeholder={t("brand")} value={form.brand} onChange={set("brand")} style={inputStyle} aria-label={t("brand")} />
      <input placeholder={t("handle")} value={form.handle} onChange={set("handle")} style={inputStyle} aria-label={t("handle")} />
      <select required value={form.need} onChange={set("need")} style={{ ...inputStyle, appearance: "none" }} aria-label={t("need")}>
        <option value="" disabled>{t("need")}</option>
        <option>{t("needEcom")}</option>
        <option>{t("needContent")}</option>
        <option>{t("needAgents")}</option>
        <option>{t("needAll")}</option>
      </select>
      <select value={form.budget} onChange={set("budget")} style={{ ...inputStyle, appearance: "none" }} aria-label={t("budget")}>
        <option value="" disabled>{t("budget")}</option>
        <option>{t("b1")}</option>
        <option>{t("b2")}</option>
        <option>{t("b3")}</option>
        <option>{t("b4")}</option>
        <option>{t("b5")}</option>
      </select>
      <textarea
        placeholder={t("message")}
        value={form.message}
        onChange={set("message")}
        rows={3}
        style={{ ...inputStyle, gridColumn: "1 / -1", resize: "vertical" }}
        className="md:col-span-2"
        aria-label={t("message")}
      />
      <div className="md:col-span-2 flex flex-col items-center gap-4 mt-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="font-clash font-semibold tracking-wide rounded-full px-10 py-4 text-[15px] transition-transform duration-300 hover:scale-[1.03]"
          style={{ background: "#F8B4D9", color: "#0B0B10", opacity: state === "sending" ? 0.6 : 1 }}
        >
          {state === "sending" ? t("sending") : t("submit")}
        </button>
        <a
          href={whatsAppUrl(`Hola Edgar, vengo de monzalab.com/studio y quiero hablar de mi marca.`)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact("whatsapp", source)}
          className="text-[13px] underline underline-offset-4 transition-colors"
          style={{ color: "rgba(255,252,247,0.45)" }}
        >
          {t("orWhatsApp")}
        </a>
      </div>
    </form>
  );
};

export default LeadForm;
