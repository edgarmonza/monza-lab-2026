import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { PROJECTS } from "@/data/projects";
import type { ProjectCategory } from "@/data/projects";
import type { Lang, LangText } from "@/i18n/types";
import PremiumBackground from "@/components/layout/PremiumBackground";
import FooterMinimal from "@/components/FooterMinimal";
import SEO from "@/components/SEO";

const EASE = [0.16, 1, 0.3, 1] as const;

type Filter = "all" | ProjectCategory;

const COPY: Record<string, LangText> = {
  eyebrow: { es: "CASOS", en: "WORK", de: "CASES", pt: "CASOS" },
  heading: { es: "Lo que construimos.", en: "What we build.", de: "Was wir bauen.", pt: "O que construímos." },
  sub: {
    es: "Plataformas AI-first, ventures propias y marcas operadas desde Monza Lab.",
    en: "AI-first platforms, our own ventures and brands operated from Monza Lab.",
    de: "AI-First-Plattformen, eigene Ventures und Marken, betrieben von Monza Lab.",
    pt: "Plataformas AI-first, ventures próprias e marcas operadas a partir da Monza Lab.",
  },
  nda: { es: "En confidencialidad", en: "Under NDA", de: "Unter NDA", pt: "Em confidencialidade" },
  view: { es: "Ver el caso", en: "View case", de: "Case ansehen", pt: "Ver o caso" },
};

const FILTERS: Array<{ key: Filter; label: LangText }> = [
  { key: "all", label: { es: "Todos", en: "All", de: "Alle", pt: "Todos" } },
  { key: "platform", label: { es: "Plataformas", en: "Platforms", de: "Plattformen", pt: "Plataformas" } },
  { key: "venture", label: { es: "Ventures", en: "Ventures", de: "Ventures", pt: "Ventures" } },
  { key: "studio", label: { es: "Studio", en: "Studio", de: "Studio", pt: "Studio" } },
];

const CATEGORY_TAG: Record<ProjectCategory, string> = {
  platform: "PLATAFORMA",
  venture: "VENTURE",
  studio: "STUDIO",
};

const Work = () => {
  const { language } = useLanguage();
  const lang = language as Lang;
  const langPrefix = lang === "es" ? "" : `/${lang}`;
  const [params, setParams] = useSearchParams();

  const raw = params.get("f");
  const initial: Filter =
    raw === "platform" || raw === "venture" || raw === "studio" ? raw : "all";
  const [filter, setFilter] = useState<Filter>(initial);

  const pick = (f: Filter) => {
    setFilter(f);
    const next = new URLSearchParams(params);
    if (f === "all") next.delete("f");
    else next.set("f", f);
    setParams(next, { replace: true });
  };

  const projects = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <PremiumBackground>
      <SEO
        path="/work"
        title={{
          es: "Casos — Monza Lab · Plataformas, ventures y marcas",
          en: "Work — Monza Lab · Platforms, ventures & brands",
          de: "Cases — Monza Lab · Plattformen, Ventures & Marken",
          pt: "Casos — Monza Lab · Plataformas, ventures e marcas",
        }}
        description={{
          es: "Todo el trabajo de Monza Lab en un solo lugar: plataformas AI-first para clientes, ventures propias y marcas operadas con IA.",
          en: "All of Monza Lab's work in one place: AI-first platforms for clients, our own ventures and brands operated with AI.",
          de: "Die gesamte Arbeit von Monza Lab an einem Ort: AI-First-Plattformen für Kunden, eigene Ventures und mit KI betriebene Marken.",
          pt: "Todo o trabalho da Monza Lab num só lugar: plataformas AI-first para clientes, ventures próprias e marcas operadas com IA.",
        }}
      />
      <main id="main" className="pt-32 md:pt-40 pb-10">
        <section className="mx-auto max-w-[1200px] px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-10 md:mb-14"
          >
            <p
              className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-4"
              style={{ color: "rgba(248,180,217,0.75)" }}
            >
              {COPY.eyebrow[lang]}
            </p>
            <h1
              className="font-clash font-bold leading-[1.05] mb-5"
              style={{
                fontSize: "clamp(32px, 5.5vw, 60px)",
                letterSpacing: "-0.025em",
                color: "rgba(var(--text-rgb), 0.92)",
              }}
            >
              {COPY.heading[lang]}
            </h1>
            <p
              className="font-clash text-base md:text-lg max-w-2xl leading-relaxed"
              style={{ color: "rgba(var(--text-rgb), 0.55)" }}
            >
              {COPY.sub[lang]}
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-10 md:mb-12" role="tablist" aria-label="Filtro de casos">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => pick(f.key)}
                  className="font-clash text-[11px] tracking-[0.2em] uppercase font-medium rounded-full px-4 py-2 transition-all duration-300"
                  style={{
                    color: active ? "#0B0B10" : "rgba(var(--text-rgb), 0.6)",
                    background: active ? "#F8B4D9" : "transparent",
                    border: active ? "1px solid #F8B4D9" : "1px solid rgba(var(--text-rgb), 0.15)",
                  }}
                >
                  {f.label[lang]}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {projects.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: EASE }}
              >
                <Link
                  to={`${langPrefix}/work/${p.slug}`}
                  className="group relative block aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(var(--text-rgb), 0.06)" }}
                >
                  {p.image || p.gallery?.[0] ? (
                    <img
                      src={p.image ?? p.gallery![0]}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                      style={{ opacity: 0.85 }}
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: p.visual.gradient }}>
                      <span
                        className="absolute font-clash font-bold select-none"
                        style={{
                          fontSize: "clamp(80px, 10vw, 150px)",
                          color: p.visual.accent,
                          opacity: 0.12,
                          right: "-2%",
                          bottom: "-10%",
                          letterSpacing: "-0.04em",
                        }}
                        aria-hidden
                      >
                        {p.visual.letter}
                      </span>
                    </div>
                  )}

                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.9) 100%)",
                    }}
                  />

                  <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-[0.25em]" style={{ color: `${p.visual.accent}cc` }}>
                      {p.visual.number} / {CATEGORY_TAG[p.category]}
                    </span>
                    <span
                      className="font-clash text-[9px] tracking-[0.3em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ color: p.visual.accent }}
                    >
                      {COPY.view[lang]} →
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6">
                    <div className="flex items-baseline gap-2.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.visual.accent }} aria-hidden />
                      <h3
                        className="font-clash font-bold text-xl md:text-2xl"
                        style={{ letterSpacing: "-0.02em", color: "rgba(255,252,247,0.95)" }}
                      >
                        {p.name}
                      </h3>
                    </div>
                    <p
                      className="font-clash text-[12px] md:text-[13px] leading-snug line-clamp-2"
                      style={{ color: "rgba(255,252,247,0.55)" }}
                    >
                      {p.desc[lang]}
                    </p>
                    {p.confidential && (
                      <span
                        className="mt-2 inline-block font-clash text-[8px] tracking-[0.25em] uppercase"
                        style={{ color: "rgba(255,252,247,0.35)" }}
                      >
                        {COPY.nda[lang]}
                      </span>
                    )}
                  </div>

                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{ boxShadow: `inset 0 0 80px -16px ${p.visual.accent}30` }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <FooterMinimal />
    </PremiumBackground>
  );
};

export default Work;
