import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackLead, trackContact, whatsAppUrl } from "@/lib/pixel";

type Lang = "es" | "en" | "de" | "pt";

const PINK = "#F8B4D9";

const T = {
  eyebrow: {
    es: "GRATIS · 3 CUPOS AL MES",
    en: "FREE · 3 SLOTS A MONTH",
    de: "KOSTENLOS · 3 PLÄTZE MONATLICH",
    pt: "GRÁTIS · 3 VAGAS POR MÊS",
  },
  heading: {
    es: "Mándanos el link de un producto tuyo.",
    en: "Send us a link to one of your products.",
    de: "Schick uns den Link zu einem deiner Produkte.",
    pt: "Manda-nos o link de um produto teu.",
  },
  headingAccent: {
    es: "Te devolvemos esa página, hecha por nosotros.",
    en: "We'll send that page back, built by us.",
    de: "Wir schicken dir die Seite zurück — von uns gebaut.",
    pt: "Devolvemos essa página, feita por nós.",
  },
  sub: {
    es: "No es un consejo ni un PDF. Es tu ficha de producto reconstruida y funcionando, al lado de la tuya — con un índice de 0 a 100 y la evidencia de cada punto.",
    en: "Not advice, not a PDF. It's your product page rebuilt and live, next to yours — with a 0–100 index and evidence for every point.",
    de: "Kein Ratschlag, kein PDF. Es ist deine Produktseite, neu gebaut und live, direkt neben deiner — mit einem 0–100-Index und Belegen für jeden Punkt.",
    pt: "Não é um conselho nem um PDF. É a tua ficha de produto reconstruída e a funcionar, ao lado da tua — com um índice de 0 a 100 e evidência de cada ponto.",
  },
  url: {
    es: "Link de un producto de tu tienda",
    en: "Link to a product in your store",
    de: "Link zu einem Produkt in deinem Store",
    pt: "Link de um produto da tua loja",
  },
  email: { es: "Tu correo", en: "Your email", de: "Deine E-Mail", pt: "O teu email" },
  whatsapp: { es: "Tu WhatsApp", en: "Your WhatsApp", de: "Dein WhatsApp", pt: "O teu WhatsApp" },
  revenue: {
    es: "Facturación mensual (opcional)",
    en: "Monthly revenue (optional)",
    de: "Monatsumsatz (optional)",
    pt: "Faturação mensal (opcional)",
  },
  revenueHelp: {
    es: "Si nos lo dices, calculamos qué vale cada fricción en tu caso. Si no, usamos referencias de tu categoría y lo decimos.",
    en: "Tell us and we'll price each friction for your case. If not, we use category benchmarks — and we say so.",
    de: "Sag es uns und wir beziffern jede Friktion für deinen Fall. Sonst nutzen wir Kategorie-Benchmarks — und sagen das.",
    pt: "Se nos disseres, calculamos quanto vale cada fricção no teu caso. Se não, usamos referências da categoria e dizemo-lo.",
  },
  submit: {
    es: "Pedir mi radiografía",
    en: "Request my breakdown",
    de: "Meine Analyse anfordern",
    pt: "Pedir a minha radiografia",
  },
  sending: { es: "Enviando…", en: "Sending…", de: "Senden…", pt: "A enviar…" },
  doneTitle: { es: "Recibido.", en: "Got it.", de: "Erhalten.", pt: "Recebido." },
  doneBody: {
    es: "Vamos a abrir tu tienda nosotros mismos y te llega un link privado en 72 horas. Te mandamos un correo con el detalle de qué incluye.",
    en: "We'll open your store ourselves and send you a private link within 72 hours. Check your inbox for what's included.",
    de: "Wir öffnen deinen Store selbst und schicken dir innerhalb von 72 Stunden einen privaten Link. Details stehen in deiner E-Mail.",
    pt: "Vamos abrir a tua loja nós mesmos e recebes um link privado em 72 horas. Enviámos um email com o detalhe.",
  },
  errUrl: {
    es: "Necesitamos un link válido — por ejemplo tutienda.com/products/tu-producto",
    en: "We need a valid link — for example yourstore.com/products/your-product",
    de: "Wir brauchen einen gültigen Link — z. B. deinstore.com/products/dein-produkt",
    pt: "Precisamos de um link válido — por exemplo alojada.com/products/o-teu-produto",
  },
  errEmail: { es: "Revisa el correo.", en: "Check the email.", de: "Prüfe die E-Mail.", pt: "Verifica o email." },
  errWa: { es: "Revisa el WhatsApp.", en: "Check the WhatsApp number.", de: "Prüfe die WhatsApp-Nummer.", pt: "Verifica o WhatsApp." },
  errGeneric: {
    es: "No pudimos enviarlo. Escríbenos por WhatsApp y lo resolvemos.",
    en: "Couldn't send it. Message us on WhatsApp and we'll sort it out.",
    de: "Konnte nicht gesendet werden. Schreib uns auf WhatsApp.",
    pt: "Não conseguimos enviar. Fala connosco por WhatsApp.",
  },
  orWa: {
    es: "o mándanos el link por WhatsApp",
    en: "or send us the link on WhatsApp",
    de: "oder schick uns den Link per WhatsApp",
    pt: "ou manda-nos o link por WhatsApp",
  },
  privacy: {
    es: "Usamos tu tienda solo para hacerte la radiografía. No publicamos nada ni la usamos en nuestro portafolio sin tu permiso escrito.",
    en: "We use your store only to build your breakdown. We publish nothing and won't use it in our portfolio without written permission.",
    de: "Wir nutzen deinen Store nur für deine Analyse. Wir veröffentlichen nichts und nutzen ihn nicht ohne schriftliche Erlaubnis in unserem Portfolio.",
    pt: "Usamos a tua loja apenas para a radiografia. Não publicamos nada nem a usamos no portefólio sem permissão escrita.",
  },
} as const;

const REVENUE_OPTIONS: { value: string; label: Record<Lang, string> }[] = [
  { value: "", label: { es: "Prefiero no decirlo", en: "Rather not say", de: "Lieber nicht", pt: "Prefiro não dizer" } },
  { value: "pre-launch", label: { es: "Todavía no vendo", en: "Not selling yet", de: "Verkaufe noch nicht", pt: "Ainda não vendo" } },
  { value: "small", label: { es: "Estoy empezando", en: "Just getting started", de: "Ganz am Anfang", pt: "A começar" } },
  { value: "growing", label: { es: "Vendo constante y quiero crecer", en: "Selling steadily, want to grow", de: "Verkaufe stetig, will wachsen", pt: "Vendo de forma constante e quero crescer" } },
  { value: "scaling", label: { es: "Vendo bien y quiero escalar", en: "Selling well, want to scale", de: "Verkaufe gut, will skalieren", pt: "Vendo bem e quero escalar" } },
];

const WA_MSG: Record<Lang, string> = {
  es: "Hola Edgar, quiero la radiografía de mi tienda. Este es el link de un producto: ",
  en: "Hi Edgar, I'd like the breakdown of my store. Here's a product link: ",
  de: "Hallo Edgar, ich möchte die Analyse meines Stores. Hier ein Produktlink: ",
  pt: "Olá Edgar, quero a radiografia da minha loja. Este é o link de um produto: ",
};

const inputBase =
  "w-full rounded-xl px-5 py-4 text-[15px] font-clash outline-none transition-colors duration-300";

const RadiografiaForm = ({ id = "radiografia" }: { id?: string }) => {
  const { language } = useLanguage();
  const lang = (language as Lang) || "es";
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ productUrl: "", email: "", whatsapp: "", revenue: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setState("sending");
    try {
      const res = await fetch("/api/radiografia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const map: Record<string, string> = {
          invalid_url: T.errUrl[lang],
          invalid_email: T.errEmail[lang],
          invalid_whatsapp: T.errWa[lang],
        };
        setError(map[data?.error] || T.errGeneric[lang]);
        setState("idle");
        return;
      }
      if (data?.ok === false) {
        setError(T.errGeneric[lang]);
        setState("idle");
        return;
      }
      trackLead("radiografia-shopify");
      setState("done");
    } catch {
      setError(T.errGeneric[lang]);
      setState("idle");
    }
  };

  if (state === "done") {
    return (
      <div
        id={id}
        className="rounded-3xl px-7 py-14 md:px-14 md:py-20 text-center"
        style={{ border: `1px solid ${PINK}40`, background: `${PINK}0a` }}
      >
        <h3
          className="font-clash font-bold mb-4"
          style={{ fontSize: "clamp(26px, 4vw, 38px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.94)" }}
        >
          {T.doneTitle[lang]}
        </h3>
        <p
          className="font-clash text-[15px] md:text-base max-w-lg mx-auto leading-relaxed"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {T.doneBody[lang]}
        </p>
      </div>
    );
  }

  return (
    <div
      id={id}
      className="rounded-3xl px-6 py-10 sm:px-9 sm:py-12 md:px-14 md:py-16 scroll-mt-28"
      style={{ border: `1px solid ${PINK}33`, background: `${PINK}08` }}
    >
      <p
        className="font-clash text-[10px] md:text-[11px] tracking-[0.32em] uppercase font-semibold mb-5"
        style={{ color: `${PINK}dd` }}
      >
        {T.eyebrow[lang]}
      </p>
      <h2
        className="font-clash font-bold leading-[1.08] mb-5"
        style={{ fontSize: "clamp(26px, 4.4vw, 46px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.94)" }}
      >
        {T.heading[lang]}
        <br />
        <span style={{ color: PINK }}>{T.headingAccent[lang]}</span>
      </h2>
      <p
        className="font-clash text-[15px] md:text-lg max-w-2xl leading-relaxed mb-9 md:mb-11"
        style={{ color: "rgba(var(--text-rgb), 0.6)" }}
      >
        {T.sub[lang]}
      </p>

      <form onSubmit={submit} noValidate className="max-w-2xl">
        <label htmlFor="rx-url" className="sr-only">
          {T.url[lang]}
        </label>
        <input
          id="rx-url"
          type="text"
          inputMode="url"
          autoComplete="url"
          required
          placeholder={T.url[lang]}
          value={form.productUrl}
          onChange={set("productUrl")}
          className={`${inputBase} mb-3`}
          style={{
            background: "rgba(var(--text-rgb), 0.04)",
            border: `1px solid ${PINK}55`,
            color: "rgba(var(--text-rgb), 0.95)",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label htmlFor="rx-email" className="sr-only">
              {T.email[lang]}
            </label>
            <input
              id="rx-email"
              type="email"
              autoComplete="email"
              required
              placeholder={T.email[lang]}
              value={form.email}
              onChange={set("email")}
              className={inputBase}
              style={{
                background: "rgba(var(--text-rgb), 0.04)",
                border: "1px solid rgba(var(--text-rgb), 0.14)",
                color: "rgba(var(--text-rgb), 0.95)",
              }}
            />
          </div>
          <div>
            <label htmlFor="rx-wa" className="sr-only">
              {T.whatsapp[lang]}
            </label>
            <input
              id="rx-wa"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder={T.whatsapp[lang]}
              value={form.whatsapp}
              onChange={set("whatsapp")}
              className={inputBase}
              style={{
                background: "rgba(var(--text-rgb), 0.04)",
                border: "1px solid rgba(var(--text-rgb), 0.14)",
                color: "rgba(var(--text-rgb), 0.95)",
              }}
            />
          </div>
        </div>

        <label htmlFor="rx-rev" className="sr-only">
          {T.revenue[lang]}
        </label>
        <select
          id="rx-rev"
          value={form.revenue}
          onChange={set("revenue")}
          className={`${inputBase} appearance-none cursor-pointer`}
          style={{
            background: "rgba(var(--text-rgb), 0.04)",
            border: "1px solid rgba(var(--text-rgb), 0.14)",
            color: form.revenue ? "rgba(var(--text-rgb), 0.95)" : "rgba(var(--text-rgb), 0.45)",
          }}
        >
          <option value="" disabled>
            {T.revenue[lang]}
          </option>
          {REVENUE_OPTIONS.map((o) => (
            <option key={o.value || "none"} value={o.value} style={{ color: "#0B0B10" }}>
              {o.label[lang]}
            </option>
          ))}
        </select>
        <p className="font-clash text-[12px] leading-relaxed mt-2.5 mb-7" style={{ color: "rgba(var(--text-rgb), 0.42)" }}>
          {T.revenueHelp[lang]}
        </p>

        {error && (
          <p role="alert" className="font-clash text-[13px] mb-5" style={{ color: "#ff8fab" }}>
            {error}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <button
            type="submit"
            disabled={state === "sending"}
            className="font-clash text-[12px] tracking-[0.2em] uppercase font-semibold rounded-full px-8 py-4 transition-all duration-300 hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100 w-full sm:w-auto"
            style={{ background: PINK, color: "#0B0B10", boxShadow: `0 0 40px ${PINK}30` }}
          >
            {state === "sending" ? T.sending[lang] : `${T.submit[lang]} →`}
          </button>
          <a
            href={whatsAppUrl(WA_MSG[lang])}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("whatsapp", "radiografia-shopify")}
            className="font-clash text-[12px] tracking-[0.16em] uppercase font-medium inline-flex items-center justify-center sm:justify-start min-h-[44px] px-2 -mx-2 transition-colors duration-300"
            style={{ color: "rgba(var(--text-rgb), 0.55)" }}
          >
            {T.orWa[lang]}
          </a>
        </div>

        <p className="font-clash text-[12px] leading-relaxed mt-7 max-w-xl" style={{ color: "rgba(var(--text-rgb), 0.38)" }}>
          {T.privacy[lang]}
        </p>
      </form>
    </div>
  );
};

export default RadiografiaForm;
