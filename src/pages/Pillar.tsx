import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { getPillarBySlug } from "@/data/pillars";
import type { Lang } from "@/i18n/types";
import PremiumBackground from "@/components/layout/PremiumBackground";
import FooterMinimal from "@/components/FooterMinimal";
import SEO from "@/components/SEO";
import { whatsAppUrl } from "@/lib/pixel";

const EASE = [0.16, 1, 0.3, 1] as const;

const CTA_AGENT = { es: "Hablar con el agente", en: "Talk to the agent", de: "Mit dem Agenten sprechen", pt: "Falar com o agente" };
const CTA_WA = { es: "WhatsApp directo", en: "Direct WhatsApp", de: "Direkt per WhatsApp", pt: "WhatsApp direto" };
const WA_MSG = {
  es: "Hola Edgar, vengo de monzalab.com y quiero hablar de un proyecto.",
  en: "Hi Edgar, coming from monzalab.com — I'd like to talk about a project.",
  de: "Hallo Edgar, ich komme von monzalab.com und möchte über ein Projekt sprechen.",
  pt: "Olá Edgar, venho do monzalab.com e quero falar de um projeto.",
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className={`relative py-16 md:py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
};

const CtaRow = ({ lang, accent }: { lang: Lang; accent: string }) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("monza:open-agent"))}
      className="font-clash text-[12px] tracking-[0.2em] uppercase font-semibold rounded-full px-8 py-4 transition-all duration-300 hover:scale-[1.03]"
      style={{ background: "#F8B4D9", color: "#0B0B10", boxShadow: `0 0 40px ${accent}30` }}
    >
      {CTA_AGENT[lang]} →
    </button>
    <a
      href={whatsAppUrl(WA_MSG[lang])}
      target="_blank"
      rel="noopener noreferrer"
      className="font-clash text-[12px] tracking-[0.2em] uppercase font-medium transition-colors duration-300"
      style={{ color: "rgba(var(--text-rgb), 0.6)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(var(--text-rgb), 0.95)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(var(--text-rgb), 0.6)")}
    >
      {CTA_WA[lang]}
    </a>
  </div>
);

const Pillar = ({ slug }: { slug: "shopify" | "agentes" }) => {
  const { language } = useLanguage();
  const lang = language as Lang;
  const langPrefix = lang === "es" ? "" : `/${lang}`;
  const p = getPillarBySlug(slug)!;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.h1[lang],
    description: p.seoDescription[lang],
    provider: { "@type": "Organization", name: "Monza Lab", url: "https://monzalab.com" },
    areaServed: ["Latin America", "Colombia", "Spain", "Europe", "United States"],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map((f) => ({
      "@type": "Question",
      name: f.q[lang],
      acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
    })),
  };

  return (
    <PremiumBackground>
      <SEO path={`/${p.slug}`} title={p.seoTitle} description={p.seoDescription} jsonLd={[serviceLd, faqLd]} />
      <main id="main" className="pt-32 md:pt-40">
        {/* Hero */}
        <section className="mx-auto max-w-[1000px] px-6 md:px-10 pb-4 md:pb-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <p className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-5" style={{ color: `${p.accent}c0` }}>
              {p.eyebrow[lang]}
            </p>
            <h1
              className="font-clash font-bold leading-[1.05] mb-6"
              style={{ fontSize: "clamp(34px, 5.5vw, 62px)", letterSpacing: "-0.025em", color: "rgba(var(--text-rgb), 0.94)" }}
            >
              {p.h1[lang]}
            </h1>
            <p className="font-clash text-base md:text-xl max-w-3xl leading-relaxed mb-10" style={{ color: "rgba(var(--text-rgb), 0.6)" }}>
              {p.sub[lang]}
            </p>
            <CtaRow lang={lang} accent={p.accent} />
          </motion.div>
        </section>

        {/* Demo viva (solo agentes) */}
        {p.demo && (
          <Section>
            <div className="mx-auto max-w-[1000px] px-6 md:px-10">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("monza:open-agent"))}
                className="w-full rounded-2xl px-7 py-9 md:px-10 md:py-11 text-left transition-all duration-500 hover:scale-[1.005] group"
                style={{ border: `1px dashed ${p.accent}66`, background: `${p.accent}0a` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="relative flex w-2.5 h-2.5" aria-hidden>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: p.accent }} />
                    <span className="relative inline-flex rounded-full w-2.5 h-2.5" style={{ background: p.accent }} />
                  </span>
                  <h2 className="font-clash font-bold text-xl md:text-2xl" style={{ letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}>
                    {p.demo.heading[lang]}
                  </h2>
                </div>
                <p className="font-clash text-sm md:text-base max-w-2xl mb-4" style={{ color: "rgba(var(--text-rgb), 0.55)" }}>
                  {p.demo.body[lang]}
                </p>
                <span className="font-clash text-[11px] tracking-[0.25em] uppercase font-semibold transition-transform duration-500 group-hover:translate-x-1 inline-block" style={{ color: p.accent }}>
                  {p.demo.cta[lang]} →
                </span>
              </button>
            </div>
          </Section>
        )}

        {/* Deliverables */}
        <Section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <h2 className="font-clash font-bold mb-10 md:mb-14" style={{ fontSize: "clamp(24px, 3.6vw, 40px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}>
              {p.deliverablesHeading[lang]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {p.deliverables.map((d, i) => (
                <div key={i} className="rounded-2xl p-6 md:p-7" style={{ border: "1px solid rgba(var(--text-rgb), 0.08)", background: "rgba(var(--text-rgb), 0.02)" }}>
                  <span className="font-mono text-[10px] tracking-[0.25em] block mb-4" style={{ color: `${p.accent}b0` }}>
                    0{i + 1}
                  </span>
                  <h3 className="font-clash font-semibold text-lg md:text-xl mb-3" style={{ letterSpacing: "-0.015em", color: "rgba(var(--text-rgb), 0.9)" }}>
                    {d.title[lang]}
                  </h3>
                  <p className="font-clash text-[13px] md:text-sm leading-relaxed" style={{ color: "rgba(var(--text-rgb), 0.5)" }}>
                    {d.body[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Caso ancla */}
        <Section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
              <Link to={`${langPrefix}${p.caseBlock.href}`} className="group relative block aspect-[4/3] rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(var(--text-rgb), 0.06)" }}>
                <img
                  src={p.caseBlock.image}
                  alt={p.caseBlock.imageAlt[lang]}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.6) 100%)" }} />
              </Link>
              <div>
                <p className="font-clash text-[10px] tracking-[0.35em] uppercase font-medium mb-4" style={{ color: `${p.accent}c0` }}>
                  {p.caseBlock.eyebrow[lang]}
                </p>
                <h2 className="font-clash font-bold mb-5" style={{ fontSize: "clamp(24px, 3.4vw, 38px)", letterSpacing: "-0.02em", lineHeight: 1.15, color: "rgba(var(--text-rgb), 0.92)" }}>
                  {p.caseBlock.heading[lang]}
                </h2>
                <p className="font-clash text-sm md:text-base leading-relaxed mb-6" style={{ color: "rgba(var(--text-rgb), 0.55)" }}>
                  {p.caseBlock.body[lang]}
                </p>
                <Link
                  to={`${langPrefix}${p.caseBlock.href}`}
                  className="font-clash text-[11px] tracking-[0.25em] uppercase font-semibold inline-block transition-transform duration-300 hover:translate-x-1"
                  style={{ color: p.accent }}
                >
                  {p.caseBlock.linkLabel[lang]} →
                </Link>
              </div>
            </div>
          </div>
        </Section>

        {/* Proceso */}
        <Section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <h2 className="font-clash font-bold mb-10 md:mb-14" style={{ fontSize: "clamp(24px, 3.6vw, 40px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}>
              {p.processHeading[lang]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {p.process.map((s) => (
                <div key={s.n} className="relative rounded-2xl p-6 md:p-7 overflow-hidden" style={{ border: "1px solid rgba(var(--text-rgb), 0.08)" }}>
                  <span className="absolute font-clash font-bold select-none pointer-events-none" style={{ fontSize: "120px", right: "-6px", bottom: "-34px", color: "rgba(var(--text-rgb), 0.05)", letterSpacing: "-0.04em" }} aria-hidden>
                    {s.n}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] block mb-4" style={{ color: `${p.accent}b0` }}>
                    {s.n}
                  </span>
                  <h3 className="font-clash font-semibold text-lg mb-3" style={{ letterSpacing: "-0.015em", color: "rgba(var(--text-rgb), 0.9)" }}>
                    {s.title[lang]}
                  </h3>
                  <p className="font-clash text-[13px] md:text-sm leading-relaxed relative" style={{ color: "rgba(var(--text-rgb), 0.5)" }}>
                    {s.body[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* FAQ — todo visible: cada respuesta indexable */}
        <Section>
          <div className="mx-auto max-w-[900px] px-6 md:px-10">
            <h2 className="font-clash font-bold mb-10 md:mb-14" style={{ fontSize: "clamp(24px, 3.6vw, 40px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}>
              {p.faqHeading[lang]}
            </h2>
            <div>
              {p.faq.map((f, i) => (
                <div key={i} className="py-7 md:py-8" style={{ borderTop: "1px solid rgba(var(--text-rgb), 0.08)" }}>
                  <h3 className="font-clash font-semibold text-lg md:text-xl mb-3" style={{ letterSpacing: "-0.015em", color: "rgba(var(--text-rgb), 0.9)" }}>
                    {f.q[lang]}
                  </h3>
                  <p className="font-clash text-sm md:text-base leading-relaxed" style={{ color: "rgba(var(--text-rgb), 0.55)" }}>
                    {f.a[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Cierre */}
        <Section className="pb-28 md:pb-36">
          <div className="mx-auto max-w-[900px] px-6 md:px-10 text-center">
            <h2 className="font-clash font-bold leading-[1.05] mb-5" style={{ fontSize: "clamp(30px, 5vw, 54px)", letterSpacing: "-0.025em", color: "rgba(var(--text-rgb), 0.92)" }}>
              {p.closingHeading[lang]}
            </h2>
            <p className="font-clash text-base md:text-lg mb-10" style={{ color: "rgba(var(--text-rgb), 0.55)" }}>
              {p.closingSub[lang]}
            </p>
            <div className="flex justify-center">
              <CtaRow lang={lang} accent={p.accent} />
            </div>
          </div>
        </Section>
      </main>
      <FooterMinimal />
    </PremiumBackground>
  );
};

export default Pillar;
