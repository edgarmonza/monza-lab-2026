import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import FooterMinimal from "@/components/FooterMinimal";
import PremiumBackground from "@/components/layout/PremiumBackground";
import SEO from "@/components/SEO";

const EASE = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#F8B4D9";
const ACCENT_DEEP = "#f4a0cc";

type Lang = "es" | "en" | "de" | "pt";
type LT = { es: string; en: string; de: string; pt: string };
const t = (obj: LT, lang: Lang) => obj[lang] ?? obj.es;

/* Section wrapper */
const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

/* ──────────────────────────────────────────
   HERO — utilidad > data
   ────────────────────────────────────────── */
const Hero = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = {
    es: "MONZAHAUS · VENTURE 01",
    en: "MONZAHAUS · VENTURE 01",
    de: "MONZAHAUS · VENTURE 01", pt: "MONZAHAUS · VENTURE 01",
  };
  const headline: LT = {
    es: "Decisiones inteligentes para el ecosistema Porsche.",
    en: "Intelligent decisions for the Porsche ecosystem.",
    de: "Intelligente Entscheidungen für das Porsche-Ökosystem.",
    pt: "Decisões inteligentes para o ecossistema Porsche.",
  };
  const sub: LT = {
    es: "35.000+ Porsches de Japón, Europa y EE.UU. en una sola plataforma AI-native. Coleccionistas, dealers y compradores deciden con datos curados — no datos crudos.",
    en: "35,000+ Porsches from Japan, Europe and the US on a single AI-native platform. Collectors, dealers and buyers decide with curated data — not raw data.",
    de: "35.000+ Porsche aus Japan, Europa und den USA auf einer AI-nativen Plattform. Sammler, Händler und Käufer entscheiden mit kuratierten Daten — nicht mit Rohdaten.",
    pt: "35.000+ Porsches do Japão, Europa e EUA numa só plataforma AI-native. Colecionadores, dealers e compradores decidem com dados curados — não com dados em bruto.",
  };
  const cta: LT = { es: "Abrir MonzaHaus", en: "Open MonzaHaus", de: "MonzaHaus öffnen", pt: "Abrir MonzaHaus" };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-14 items-center relative z-10">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="md:col-span-6"
        >
          <p
            className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
            style={{ color: `${ACCENT}cc` }}
          >
            {t(eyebrow, lang)}
          </p>
          <h1
            className="font-clash font-bold leading-[0.95] mb-6"
            style={{
              fontSize: "clamp(38px, 6.6vw, 84px)",
              letterSpacing: "-0.03em",
              color: "rgba(var(--text-rgb), 0.92)",
            }}
          >
            {t(headline, lang)}
          </h1>
          <p
            className="font-clash text-base md:text-lg max-w-xl leading-relaxed mb-10"
            style={{ color: "rgba(var(--text-rgb), 0.55)" }}
          >
            {t(sub, lang)}
          </p>
          <a
            href="https://www.monzahaus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-clash text-sm tracking-[0.2em] uppercase font-medium py-4 px-7 rounded-full transition-all duration-300"
            style={{
              color: "#0B0B10",
              background: ACCENT,
              boxShadow: `0 20px 60px -20px ${ACCENT}99`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ACCENT_DEEP;
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = ACCENT;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t(cta, lang)} <span aria-hidden>↗</span>
          </a>
        </motion.div>

        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          className="md:col-span-6 relative aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden"
          style={{
            border: `1px solid ${ACCENT}33`,
            boxShadow: `0 40px 100px -30px ${ACCENT}33`,
          }}
        >
          <img
            src="/images/projects/monza-haus-cover.png"
            alt="MonzaHaus product preview"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(150deg, transparent 60%, ${ACCENT}1f 100%)`,
            }}
          />
          {/* Tag overlay */}
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.2em] backdrop-blur-md"
            style={{
              color: ACCENT,
              background: "rgba(11,11,16,0.55)",
              border: `1px solid ${ACCENT}40`,
            }}
          >
            LIVE · monzahaus.com
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────
   PURPOSE — utilidad > data
   ────────────────────────────────────────── */
const Purpose = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "PROPÓSITO", en: "PURPOSE", de: "ZWECK", pt: "PROPÓSITO" };
  const head: LT = {
    es: "Generamos valor al ecosistema Porsche.",
    en: "We generate value for the Porsche ecosystem.",
    de: "Wir schaffen Wert für das Porsche-Ökosystem.", pt: "Generamos valor al ecosistema Porsche.",
  };
  const body: LT = {
    es: "Coleccionistas, dealers y compradores no necesitan más datos. Necesitan los datos correctos. MonzaHaus cura, normaliza y puntúa el mercado global de Porsche coleccionable — para que cada decisión esté informada por inteligencia, no por intuición.",
    en: "Collectors, dealers and buyers don't need more data. They need the right data. MonzaHaus curates, normalizes and scores the global collector Porsche market — so every decision is informed by intelligence, not intuition.",
    de: "Sammler, Händler und Käufer brauchen keine mehr Daten. Sie brauchen die richtigen Daten. MonzaHaus kuratiert, normalisiert und bewertet den globalen Sammler-Porsche-Markt — damit jede Entscheidung durch Intelligenz informiert ist, nicht durch Intuition.", pt: "Coleccionistas, dealers y compradores no necesitan más datos. Necesitan los datos correctos. MonzaHaus cura, normaliza y puntúa el mercado global de Porsche coleccionable — para que cada decisión esté informada por inteligencia, no por intuición.",
  };

  return (
    <Section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-8"
          style={{
            fontSize: "clamp(28px, 4.4vw, 56px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p
          className="font-clash text-lg md:text-xl max-w-3xl leading-relaxed"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {t(body, lang)}
        </p>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   HOW IT WORKS — flow diagram
   ────────────────────────────────────────── */
const FLOW: { num: string; label: LT; detail: LT }[] = [
  {
    num: "01",
    label: { es: "Sources", en: "Sources", de: "Quellen", pt: "Sources" },
    detail: {
      es: "Subastas + dealers JP · EU · USA. Scraping continuo.",
      en: "Auctions + dealers JP · EU · USA. Continuous scraping.",
      de: "Auktionen + Händler JP · EU · USA. Kontinuierliches Scraping.", pt: "Subastas + dealers JP · EU · USA. Scraping continuo.",
    },
  },
  {
    num: "02",
    label: { es: "Database", en: "Database", de: "Datenbank", pt: "Database" },
    detail: {
      es: "Realtime, normalizada, con histórico. Cada listing tiene linaje.",
      en: "Realtime, normalized, with history. Every listing has lineage.",
      de: "Echtzeit, normalisiert, mit Historie. Jedes Listing hat Lineage.", pt: "Realtime, normalizada, con histórico. Cada listing tiene linaje.",
    },
  },
  {
    num: "03",
    label: { es: "AI Scoring", en: "AI Scoring", de: "KI-Scoring", pt: "AI Scoring" },
    detail: {
      es: "Precio justo, anomalías, tendencias. Modelos entrenados sobre el mercado real.",
      en: "Fair price, anomalies, trends. Models trained on the real market.",
      de: "Fair Price, Anomalien, Trends. Modelle auf dem realen Markt trainiert.", pt: "Precio justo, anomalías, tendencias. Modelos entrenados sobre el mercado real.",
    },
  },
  {
    num: "04",
    label: { es: "Frontend", en: "Frontend", de: "Frontend", pt: "Frontend" },
    detail: {
      es: "Explorer · Search · Listing · Account. Construido para decidir, no para navegar.",
      en: "Explorer · Search · Listing · Account. Built to decide, not to browse.",
      de: "Explorer · Search · Listing · Account. Zum Entscheiden gebaut, nicht zum Stöbern.", pt: "Explorer · Search · Listing · Account. Construido para decidir, no para navegar.",
    },
  },
];

const HowItWorks = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "CÓMO FUNCIONA", en: "HOW IT WORKS", de: "WIE ES FUNKTIONIERT", pt: "CÓMO FUNCIONA" };
  const head: LT = {
    es: "De la subasta cruda a la decisión informada.",
    en: "From raw auction to informed decision.",
    de: "Von der rohen Auktion zur informierten Entscheidung.", pt: "De la subasta cruda a la decisión informada.",
  };

  return (
    <Section className="py-24 md:py-32" id="how">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-16 md:mb-20 max-w-3xl"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>

        {/* Horizontal flow on desktop, stacked on mobile */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative">
          {FLOW.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              className="relative flex-1"
            >
              <div
                className="rounded-2xl p-6 md:p-7 h-full"
                style={{
                  background: "rgba(var(--text-rgb), 0.025)",
                  border: `1px solid ${ACCENT}1f`,
                }}
              >
                <p
                  className="font-mono text-[11px] tracking-[0.25em] mb-4"
                  style={{ color: `${ACCENT}b3` }}
                >
                  {step.num}
                </p>
                <h3
                  className="font-clash font-bold text-xl md:text-2xl mb-3"
                  style={{
                    letterSpacing: "-0.02em",
                    color: "rgba(var(--text-rgb), 0.92)",
                  }}
                >
                  {t(step.label, lang)}
                </h3>
                <p
                  className="font-clash text-sm leading-relaxed"
                  style={{ color: "rgba(var(--text-rgb), 0.55)" }}
                >
                  {t(step.detail, lang)}
                </p>
              </div>
              {/* Connector arrow on desktop */}
              {i < FLOW.length - 1 && (
                <div
                  className="hidden md:flex absolute top-1/2 -right-5 -translate-y-1/2 w-4 h-4 rounded-full items-center justify-center z-10"
                  style={{
                    background: "var(--surface-bg)",
                    border: `1px solid ${ACCENT}55`,
                  }}
                >
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: ACCENT }}
                  >
                    →
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   AI AGENTS — agentes especializados en Porsche
   ────────────────────────────────────────── */
type Agent = { num: string; label: LT; detail: LT };

const AGENTS: Agent[] = [
  {
    num: "Α",
    label: { es: "Provenance Agent", en: "Provenance Agent", de: "Provenance Agent", pt: "Provenance Agent" },
    detail: {
      es: "Reconstruye el historial completo: propietarios, mantenimientos, accidentes, originalidad. La historia importa cuando vale millones.",
      en: "Reconstructs the full history: owners, maintenance, accidents, originality. History matters when it's worth millions.",
      de: "Rekonstruiert die vollständige Historie: Besitzer, Wartung, Unfälle, Originalität. Geschichte zählt bei Millionen.", pt: "Reconstruye el historial completo: propietarios, mantenimientos, accidentes, originalidad. La historia importa cuando vale millones.",
    },
  },
  {
    num: "Β",
    label: { es: "Specification Agent", en: "Specification Agent", de: "Specification Agent", pt: "Specification Agent" },
    detail: {
      es: "Lee opciones de fábrica, M-codes, paint-to-sample, Sport Chrono. La diferencia entre un GT3 y un GT3 Touring son detalles que solo un agente especializado captura.",
      en: "Reads factory options, M-codes, paint-to-sample, Sport Chrono. The difference between a GT3 and a GT3 Touring lives in details only a specialized agent captures.",
      de: "Liest Werksoptionen, M-Codes, Paint-to-Sample, Sport Chrono. Der Unterschied zwischen einem GT3 und einem GT3 Touring liegt in Details, die nur ein spezialisierter Agent erfasst.", pt: "Lee opciones de fábrica, M-codes, paint-to-sample, Sport Chrono. La diferencia entre un GT3 y un GT3 Touring son detalles que solo un agente especializado captura.",
    },
  },
  {
    num: "Γ",
    label: { es: "Market Agent", en: "Market Agent", de: "Market Agent", pt: "Market Agent" },
    detail: {
      es: "Cruza comparables Japón · Europa · EE.UU. Detecta el arbitraje real, sin sesgos regionales. El mercado global del Porsche en una sola lectura.",
      en: "Cross-references comparables Japan · Europe · USA. Detects real arbitrage without regional bias. The global Porsche market in one read.",
      de: "Vergleicht Japan · Europa · USA. Erkennt echte Arbitrage ohne regionalen Bias. Der globale Porsche-Markt in einer Lesung.", pt: "Cruza comparables Japón · Europa · EE.UU. Detecta el arbitraje real, sin sesgos regionales. El mercado global del Porsche en una sola lectura.",
    },
  },
  {
    num: "Δ",
    label: { es: "Pricing Agent", en: "Pricing Agent", de: "Pricing Agent", pt: "Pricing Agent" },
    detail: {
      es: "Sintetiza provenance, spec y comparables en un precio justo defendible. No un número — una tesis. Con su razonamiento citable.",
      en: "Synthesizes provenance, spec and comparables into a defensible fair price. Not a number — a thesis. With citable reasoning.",
      de: "Synthetisiert Provenance, Spec und Comparables zu einem verteidigungsfähigen Fair Price. Keine Zahl — eine These. Mit zitierbarer Begründung.", pt: "Sintetiza provenance, spec y comparables en un precio justo defendible. No un número — una tesis. Con su razonamiento citable.",
    },
  },
];

const AIAgents = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "AGENTES ESPECIALIZADOS", en: "SPECIALIZED AGENTS", de: "SPEZIALISIERTE AGENTEN", pt: "AGENTES ESPECIALIZADOS" };
  const head: LT = {
    es: "Cada Porsche es único. Cuatro agentes lo entienden.",
    en: "Each Porsche is unique. Four agents understand it.",
    de: "Jeder Porsche ist einzigartig. Vier Agenten verstehen ihn.", pt: "Cada Porsche es único. Cuatro agentes lo entienden.",
  };
  const body: LT = {
    es: "Un Porsche no se valora con un solo modelo genérico. Construimos una arquitectura de agentes IA especializados — cada uno con un lente distinto sobre el mismo carro. Trabajan en orquesta para producir una decisión defensible.",
    en: "A Porsche cannot be valued by a single generic model. We built an architecture of specialized AI agents — each with a distinct lens on the same car. They work in orchestra to produce a defensible decision.",
    de: "Ein Porsche lässt sich nicht mit einem generischen Modell bewerten. Wir haben eine Architektur spezialisierter KI-Agenten gebaut — jeder mit einer anderen Linse auf das gleiche Auto. Sie arbeiten im Orchester für eine verteidigungsfähige Entscheidung.", pt: "Un Porsche no se valora con un solo modelo genérico. Construimos una arquitectura de agentes IA especializados — cada uno con un lente distinto sobre el mismo carro. Trabajan en orquesta para producir una decisión defensible.",
  };

  return (
    <Section className="py-24 md:py-32" id="agents">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-6 max-w-3xl"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p
          className="font-clash text-base md:text-lg max-w-3xl leading-relaxed mb-14"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {t(body, lang)}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {AGENTS.map((a, i) => (
            <motion.div
              key={a.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl p-7 md:p-9 relative overflow-hidden"
              style={{
                background: "rgba(var(--text-rgb), 0.025)",
                border: `1px solid ${ACCENT}1a`,
              }}
            >
              <div className="flex items-baseline gap-5 mb-5">
                <span
                  className="font-clash font-bold text-2xl md:text-3xl"
                  style={{
                    color: ACCENT,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {a.num}
                </span>
                <h3
                  className="font-clash font-bold text-xl md:text-2xl"
                  style={{
                    letterSpacing: "-0.02em",
                    color: "rgba(var(--text-rgb), 0.92)",
                  }}
                >
                  {t(a.label, lang)}
                </h3>
              </div>
              <p
                className="font-clash text-[15px] md:text-base leading-relaxed"
                style={{ color: "rgba(var(--text-rgb), 0.6)" }}
              >
                {t(a.detail, lang)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   CONTENT ENGINE — carousels reales como prueba
   ────────────────────────────────────────── */
type Carousel = { title: string; sub: LT; slides: string[] };

const CAROUSELS: Carousel[] = [
  {
    title: "GT3 992",
    sub: {
      es: "5 slides · listing breakdown",
      en: "5 slides · listing breakdown",
      de: "5 Slides · Listing-Breakdown", pt: "5 slides · listing breakdown",
    },
    slides: [
      "/images/projects/monza-haus/posts/gt3-992/slide-1.png",
      "/images/projects/monza-haus/posts/gt3-992/slide-2.png",
      "/images/projects/monza-haus/posts/gt3-992/slide-3.png",
      "/images/projects/monza-haus/posts/gt3-992/slide-4.png",
      "/images/projects/monza-haus/posts/gt3-992/slide-5.png",
    ],
  },
  {
    title: "Targa 4 GTS",
    sub: {
      es: "5 slides · spec & market read",
      en: "5 slides · spec & market read",
      de: "5 Slides · Spec & Markt-Read", pt: "5 slides · spec & market read",
    },
    slides: [
      "/images/projects/monza-haus/posts/targa-4-gts/slide-1.png",
      "/images/projects/monza-haus/posts/targa-4-gts/slide-2.png",
      "/images/projects/monza-haus/posts/targa-4-gts/slide-3.png",
      "/images/projects/monza-haus/posts/targa-4-gts/slide-4.png",
      "/images/projects/monza-haus/posts/targa-4-gts/slide-5.png",
    ],
  },
  {
    title: "930 Turbo 1986",
    sub: {
      es: "5 slides · provenance deep-dive",
      en: "5 slides · provenance deep-dive",
      de: "5 Slides · Provenance Deep-Dive", pt: "5 slides · provenance deep-dive",
    },
    slides: [
      "/images/projects/monza-haus/posts/930-turbo/slide-1.png",
      "/images/projects/monza-haus/posts/930-turbo/slide-2.png",
      "/images/projects/monza-haus/posts/930-turbo/slide-3.png",
      "/images/projects/monza-haus/posts/930-turbo/slide-4.png",
      "/images/projects/monza-haus/posts/930-turbo/slide-5.png",
    ],
  },
];

const ContentEngine = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "CONTENT ENGINE", en: "CONTENT ENGINE", de: "CONTENT ENGINE", pt: "CONTENT ENGINE" };
  const head: LT = {
    es: "El producto también escribe.",
    en: "The product writes too.",
    de: "Das Produkt schreibt auch.", pt: "El producto también escribe.",
  };
  const body: LT = {
    es: "Cada listing relevante genera su propio carousel editorial — provenance, spec y mercado, todo desde los agentes. AI-native no es solo el data: es también la voz pública del producto.",
    en: "Every relevant listing generates its own editorial carousel — provenance, spec and market, all from the agents. AI-native isn't just the data: it's also the product's public voice.",
    de: "Jedes relevante Listing erzeugt ein eigenes redaktionelles Karussell — Provenance, Spec und Markt, alles aus den Agenten. AI-native ist nicht nur das Data: Es ist auch die öffentliche Stimme des Produkts.", pt: "Cada listing relevante genera su propio carousel editorial — provenance, spec y mercado, todo desde los agentes. AI-native no es solo el data: es también la voz pública del producto.",
  };

  return (
    <Section className="py-24 md:py-32" id="content">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-6 max-w-3xl"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p
          className="font-clash text-base md:text-lg max-w-3xl leading-relaxed mb-14"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {t(body, lang)}
        </p>

        <div className="space-y-12 md:space-y-16">
          {CAROUSELS.map((c, ci) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: ci * 0.05 }}
            >
              <div className="flex items-baseline justify-between mb-4 gap-4 flex-wrap">
                <h3
                  className="font-clash font-bold text-xl md:text-2xl"
                  style={{
                    letterSpacing: "-0.02em",
                    color: "rgba(var(--text-rgb), 0.92)",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="font-clash text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-medium"
                  style={{ color: `${ACCENT}b3` }}
                >
                  {t(c.sub, lang)}
                </p>
              </div>
              <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                {c.slides.map((src, i) => (
                  <div
                    key={src}
                    className="relative aspect-square w-[68%] sm:w-[40%] md:w-[19%] flex-shrink-0 rounded-xl overflow-hidden"
                    style={{ border: `1px solid ${ACCENT}1f` }}
                  >
                    <img
                      src={src}
                      alt={`${c.title} slide ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   FOR WHO + screenshots placeholder
   ────────────────────────────────────────── */
const FOR_WHO: { label: LT; detail: LT }[] = [
  {
    label: { es: "Coleccionistas", en: "Collectors", de: "Sammler", pt: "Coleccionistas" },
    detail: {
      es: "Encuentra el carro correcto al precio justo, en el momento justo. Sin jet-lag de mercado.",
      en: "Find the right car at fair price at the right moment. No market jet-lag.",
      de: "Finde das richtige Auto zum fairen Preis im richtigen Moment. Ohne Markt-Jetlag.", pt: "Encuentra el carro correcto al precio justo, en el momento justo. Sin jet-lag de mercado.",
    },
  },
  {
    label: { es: "Dealers", en: "Dealers", de: "Händler", pt: "Dealers" },
    detail: {
      es: "Detecta anomalías de precio en JP/EU/USA antes que la competencia. Inventario informado.",
      en: "Spot price anomalies across JP/EU/USA before the competition. Informed inventory.",
      de: "Erkenne Preis-Anomalien in JP/EU/USA vor der Konkurrenz. Informiertes Inventar.", pt: "Detecta anomalías de precio en JP/EU/USA antes que la competencia. Inventario informado.",
    },
  },
  {
    label: { es: "Compradores", en: "Buyers", de: "Käufer", pt: "Compradores" },
    detail: {
      es: "Compara generaciones, modelos y mercados con benchmarks reales — no opiniones.",
      en: "Compare generations, models and markets with real benchmarks — not opinions.",
      de: "Vergleiche Generationen, Modelle und Märkte mit echten Benchmarks — keine Meinungen.", pt: "Compara generaciones, modelos y mercados con benchmarks reales — no opiniones.",
    },
  },
];

const ForWho = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "PARA QUIÉN", en: "FOR WHO", de: "FÜR WEN", pt: "PARA QUIÉN" };
  const head: LT = {
    es: "Tres personas. Una sola plataforma.",
    en: "Three personas. One platform.",
    de: "Drei Personen. Eine Plattform.", pt: "Tres personas. Una sola plataforma.",
  };

  return (
    <Section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-16 max-w-3xl"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {FOR_WHO.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-xl p-6 md:p-7"
              style={{
                background: "rgba(var(--text-rgb), 0.02)",
                border: "1px solid rgba(var(--text-rgb), 0.06)",
              }}
            >
              <p
                className="font-clash text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold mb-4"
                style={{ color: ACCENT }}
              >
                {t(p.label, lang)}
              </p>
              <p
                className="font-clash text-sm md:text-base leading-relaxed"
                style={{ color: "rgba(var(--text-rgb), 0.6)" }}
              >
                {t(p.detail, lang)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   STATS strip
   ────────────────────────────────────────── */
const Stats = ({ lang }: { lang: Lang }) => {
  const stats: { value: string; label: LT }[] = [
    {
      value: "35K+",
      label: { es: "Porsches indexados", en: "Indexed Porsches", de: "Indizierte Porsche", pt: "Porsches indexados" },
    },
    {
      value: "3",
      label: { es: "Mercados (JP · EU · USA)", en: "Markets (JP · EU · USA)", de: "Märkte (JP · EU · USA)", pt: "Mercados (JP · EU · USA)" },
    },
    { value: "24/7", label: { es: "Scraping continuo", en: "Continuous scraping", de: "Kontinuierliches Scraping", pt: "Scraping continuo" } },
    { value: "AI", label: { es: "Native scoring", en: "Native scoring", de: "Natives Scoring", pt: "Native scoring" } },
  ];

  return (
    <Section className="py-16 md:py-20">
      <div
        className="mx-auto max-w-[1200px] px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 py-10 md:py-14 border-y"
        style={{ borderColor: `rgba(var(--text-rgb), 0.06)` }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.value}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <p
              className="font-clash font-bold mb-2"
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                letterSpacing: "-0.02em",
                color: ACCENT,
              }}
            >
              {s.value}
            </p>
            <p
              className="font-clash text-[10px] tracking-[0.25em] uppercase font-medium"
              style={{ color: "rgba(var(--text-rgb), 0.55)" }}
            >
              {t(s.label, lang)}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   CTA final
   ────────────────────────────────────────── */
const FinalCTA = ({ lang }: { lang: Lang }) => {
  const head: LT = {
    es: "Empieza a decidir con datos reales.",
    en: "Start deciding with real data.",
    de: "Beginne mit echten Daten zu entscheiden.", pt: "Empieza a decidir con datos reales.",
  };
  const sub: LT = {
    es: "Abre la plataforma y explora el mercado global en vivo.",
    en: "Open the platform and explore the live global market.",
    de: "Öffne die Plattform und erkunde den globalen Live-Markt.", pt: "Abre la plataforma y explora el mercado global en vivo.",
  };
  const cta: LT = { es: "Abrir MonzaHaus", en: "Open MonzaHaus", de: "MonzaHaus öffnen", pt: "Abrir MonzaHaus" };

  return (
    <Section className="py-32 md:py-40">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div
          className="rounded-3xl p-10 md:p-16 lg:p-20 relative overflow-hidden"
          style={{
            border: `1px solid ${ACCENT}33`,
            background: `radial-gradient(ellipse at 70% 30%, ${ACCENT}14 0%, transparent 60%), rgba(var(--text-rgb), 0.02)`,
          }}
        >
          <h2
            className="font-clash font-bold leading-[1.02] mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              letterSpacing: "-0.03em",
              color: "rgba(var(--text-rgb), 0.92)",
            }}
          >
            {t(head, lang)}
          </h2>
          <p
            className="font-clash text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
            style={{ color: "rgba(var(--text-rgb), 0.6)" }}
          >
            {t(sub, lang)}
          </p>
          <a
            href="https://www.monzahaus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-clash text-sm tracking-[0.2em] uppercase font-medium py-4 px-7 rounded-full transition-all duration-300"
            style={{
              color: "#0B0B10",
              background: ACCENT,
              boxShadow: `0 20px 60px -20px ${ACCENT}99`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ACCENT_DEEP;
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = ACCENT;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t(cta, lang)} <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   PAGE
   ────────────────────────────────────────── */
const MonzaHaus = () => {
  const { language } = useLanguage();
  const lang = language as Lang;

  return (
    <PremiumBackground>
      <SEO
        path="/monzahaus"
        type="website"
        title={{
          es: "MonzaHaus — Decisiones inteligentes para el ecosistema Porsche · Monza Lab",
          en: "MonzaHaus — Intelligent decisions for the Porsche ecosystem · Monza Lab",
          de: "MonzaHaus — Intelligente Entscheidungen für das Porsche-Ökosystem · Monza Lab", pt: "MonzaHaus — Decisiones inteligentes para el ecosistema Porsche · Monza Lab",
        }}
        description={{
          es: "MonzaHaus: 35.000+ Porsches de Japón, Europa y EE.UU. en una plataforma AI-native. Coleccionistas, dealers y compradores deciden con datos curados, no datos crudos.",
          en: "MonzaHaus: 35,000+ Porsches from Japan, Europe and the US on a single AI-native platform. Collectors, dealers and buyers decide with curated data, not raw data.",
          de: "MonzaHaus: 35.000+ Porsche aus Japan, Europa und den USA auf einer AI-nativen Plattform. Sammler, Händler und Käufer entscheiden mit kuratierten Daten.", pt: "MonzaHaus: 35.000+ Porsches de Japón, Europa y EE.UU. en una plataforma AI-native. Coleccionistas, dealers y compradores deciden con datos curados, no datos crudos.",
        }}
        ogPage="monzahaus"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "MonzaHaus",
          applicationCategory: "BusinessApplication",
          url: "https://monzahaus.com",
          provider: {
            "@type": "Organization",
            name: "Monza Lab",
            url: "https://monzalab.com",
          },
        }}
      />

      <main id="main" aria-label="MonzaHaus">
        <Hero lang={lang} />
        <Stats lang={lang} />
        <Purpose lang={lang} />
        <HowItWorks lang={lang} />
        <AIAgents lang={lang} />
        <ContentEngine lang={lang} />
        <ForWho lang={lang} />
        <FinalCTA lang={lang} />
      </main>

      <FooterMinimal />
    </PremiumBackground>
  );
};

export default MonzaHaus;
