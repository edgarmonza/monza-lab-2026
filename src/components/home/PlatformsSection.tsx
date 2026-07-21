import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { PROJECTS } from "@/data/projects";
import type { Lang, LangText } from "@/i18n/types";

const EASE = [0.16, 1, 0.3, 1] as const;

const COPY: Record<string, LangText> = {
  eyebrow: { es: "PLATAFORMAS AI-FIRST", en: "AI-FIRST PLATFORMS", de: "AI-FIRST-PLATTFORMEN", pt: "PLATAFORMAS AI-FIRST" },
  heading: {
    es: "El mismo músculo, aplicado a tu industria.",
    en: "The same muscle, applied to your industry.",
    de: "Derselbe Muskel, angewendet auf deine Industrie.",
    pt: "O mesmo músculo, aplicado à tua indústria.",
  },
  sub: {
    es: "Plataformas con IA construidas y operadas para empresas reales — comercio exterior, turismo. La siguiente puede ser la tuya.",
    en: "AI platforms built and operated for real companies — foreign trade, travel. The next one can be yours.",
    de: "KI-Plattformen, gebaut und betrieben für echte Unternehmen — Außenhandel, Reisen. Die nächste kann deine sein.",
    pt: "Plataformas com IA construídas e operadas para empresas reais — comércio exterior, viagens. A próxima pode ser a tua.",
  },
  view: { es: "Ver el caso", en: "View case", de: "Case ansehen", pt: "Ver o caso" },
  nda: { es: "En confidencialidad", en: "Under NDA", de: "Unter NDA", pt: "Em confidencialidade" },
  ctaTitle: { es: "¿Tu industria es la próxima?", en: "Is your industry next?", de: "Ist deine Industrie die nächste?", pt: "A tua indústria é a próxima?" },
  ctaSub: {
    es: "Cuéntale al agente qué hace tu empresa. Te decimos qué construiríamos.",
    en: "Tell the agent what your company does. We'll tell you what we'd build.",
    de: "Erzähl dem Agenten, was dein Unternehmen macht. Wir sagen dir, was wir bauen würden.",
    pt: "Conta ao agente o que faz a tua empresa. Dizemos-te o que construiríamos.",
  },
  ctaAction: { es: "Hablar con el agente", en: "Talk to the agent", de: "Mit dem Agenten sprechen", pt: "Falar com o agente" },
};

const ORDINALS: Record<string, string> = {
  "plataforma-comercio-exterior": "°01",
  "plataforma-turismo": "°02",
};

const PlatformsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();
  const lang = language as Lang;
  const langPrefix = lang === "es" ? "" : `/${lang}`;
  const platforms = PROJECTS.filter((p) => p.category === "platform");

  return (
    <motion.section
      ref={ref}
      id="plataformas"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <p
            className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-4"
            style={{ color: "rgba(248,180,217,0.75)" }}
          >
            {COPY.eyebrow[lang]}
          </p>
          <h2
            className="font-clash font-bold leading-[1.05] mb-5"
            style={{
              fontSize: "clamp(28px, 5vw, 56px)",
              letterSpacing: "-0.025em",
              color: "rgba(var(--text-rgb), 0.92)",
            }}
          >
            {COPY.heading[lang]}
          </h2>
          <p
            className="font-clash text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: "rgba(var(--text-rgb), 0.55)" }}
          >
            {COPY.sub[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {platforms.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              <Link
                to={`${langPrefix}/work/${p.slug}`}
                className="group relative block aspect-[4/5] md:aspect-[3/2] rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(var(--text-rgb), 0.06)" }}
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                    style={{ opacity: 0.85 }}
                  />
                )}

                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.92) 100%)",
                  }}
                />

                <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
                  <span
                    className="font-mono text-[10px] tracking-[0.25em]"
                    style={{ color: `${p.visual.accent}cc` }}
                  >
                    {ORDINALS[p.slug]} / PLATAFORMA
                  </span>
                  <span
                    className="font-clash text-[9px] tracking-[0.3em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ color: p.visual.accent }}
                  >
                    {COPY.view[lang]} →
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className="w-2 h-2 rounded-full transition-transform duration-500 group-hover:scale-125"
                      style={{ background: p.visual.accent }}
                      aria-hidden
                    />
                    <h3
                      className="font-clash font-bold text-2xl md:text-3xl"
                      style={{ letterSpacing: "-0.02em", color: "rgba(255,252,247,0.95)" }}
                    >
                      {p.name}
                    </h3>
                  </div>
                  <p
                    className="font-clash text-[12px] md:text-sm tracking-[0.04em] mb-2"
                    style={{ color: "rgba(255,252,247,0.6)" }}
                  >
                    {p.desc[lang]}
                  </p>
                  <span
                    className="font-clash text-[9px] tracking-[0.25em] uppercase"
                    style={{ color: "rgba(255,252,247,0.35)" }}
                  >
                    {COPY.nda[lang]}
                  </span>
                </div>

                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 100px -20px ${p.visual.accent}30` }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("monza:open-agent"))}
          className="mt-4 md:mt-5 w-full rounded-2xl px-6 py-8 md:py-10 text-left transition-all duration-500 hover:scale-[1.005] group"
          style={{ border: "1px dashed rgba(248,180,217,0.4)", background: "rgba(248,180,217,0.04)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3
                className="font-clash font-bold text-xl md:text-2xl mb-2"
                style={{ letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}
              >
                {COPY.ctaTitle[lang]}
              </h3>
              <p className="font-clash text-sm md:text-base" style={{ color: "rgba(var(--text-rgb), 0.55)" }}>
                {COPY.ctaSub[lang]}
              </p>
            </div>
            <span
              className="font-clash text-[11px] tracking-[0.25em] uppercase font-semibold whitespace-nowrap transition-transform duration-500 group-hover:translate-x-1"
              style={{ color: "#F8B4D9" }}
            >
              {COPY.ctaAction[lang]} →
            </span>
          </div>
        </button>
      </div>
    </motion.section>
  );
};

export default PlatformsSection;
