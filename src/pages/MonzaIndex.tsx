import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import FooterMinimal from "@/components/FooterMinimal";
import PremiumBackground from "@/components/layout/PremiumBackground";
import SEO from "@/components/SEO";

const EASE = [0.16, 1, 0.3, 1] as const;
/* Index brand — monochrome cream/off-white. No gold. Matches monzaindex.ai */
const ACCENT = "#FFFCF7";
const ACCENT_DEEP = "#E5DFD5";
const ACCENT_MUTED = "rgba(255,252,247,0.55)";

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
   RADAR — SVG hex chart of 6 dimensions
   ────────────────────────────────────────── */
const RADAR_LABELS: Record<Lang, string[]> = {
  es: ["Adopción", "Talento", "Inversión", "Consumo", "Infra", "Regulación"],
  en: ["Adoption", "Talent", "Investment", "Consumer", "Infra", "Regulation"],
  de: ["Adoption", "Talent", "Investition", "Konsum", "Infra", "Regulierung"],
};

const Radar = ({ lang }: { lang: Lang }) => {
  // 6 vertices around a center, each weighted differently
  const cx = 200;
  const cy = 200;
  const r = 150;

  // Colombia score normalized 0..1 for each dimension (illustrative)
  const values = [0.62, 0.55, 0.48, 0.65, 0.58, 0.45];
  const labels = RADAR_LABELS[lang];

  const points = values.map((v, i) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * r * v,
      y: cy + Math.sin(angle) * r * v,
    };
  });

  const ringPoints = (factor: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
      return `${cx + Math.cos(angle) * r * factor},${cy + Math.sin(angle) * r * factor}`;
    }).join(" ");

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow */}
      <circle cx={cx} cy={cy} r={r + 30} fill="url(#radarGlow)" />

      {/* Concentric rings */}
      {[0.25, 0.5, 0.75, 1].map((factor) => (
        <polygon
          key={factor}
          points={ringPoints(factor)}
          fill="none"
          stroke={ACCENT}
          strokeOpacity={0.18}
          strokeWidth={1}
        />
      ))}

      {/* Spokes */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(angle) * r}
            y2={cy + Math.sin(angle) * r}
            stroke={ACCENT}
            strokeOpacity={0.15}
            strokeWidth={1}
          />
        );
      })}

      {/* Filled value polygon */}
      <motion.polygon
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill={ACCENT}
        fillOpacity={0.15}
        stroke={ACCENT}
        strokeWidth={1.5}
      />

      {/* Vertex dots */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.07 }}
          cx={p.x}
          cy={p.y}
          r={3}
          fill={ACCENT}
        />
      ))}

      {/* Labels */}
      {labels.map((label, i) => {
        const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        const lx = cx + Math.cos(angle) * (r + 28);
        const ly = cy + Math.sin(angle) * (r + 28);
        return (
          <text
            key={label}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Clash Display, sans-serif"
            fontSize="11"
            letterSpacing="0.15em"
            fill={ACCENT}
            opacity={0.8}
          >
            {label.toUpperCase()}
          </text>
        );
      })}

      {/* Center score */}
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fontFamily="Clash Display, sans-serif"
        fontWeight="700"
        fontSize="56"
        fill={ACCENT}
      >
        58
      </text>
      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        fontFamily="Clash Display, sans-serif"
        fontSize="10"
        letterSpacing="0.3em"
        fill={ACCENT}
        opacity={0.6}
      >
        / 100
      </text>
    </svg>
  );
};

/* ──────────────────────────────────────────
   HERO
   ────────────────────────────────────────── */
const Hero = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = {
    es: "MONZA INDEX · VENTURE 02",
    en: "MONZA INDEX · VENTURE 02",
    de: "MONZA INDEX · VENTURE 02", pt: "MONZA INDEX · VENTURE 02",
  };
  const headline: LT = {
    es: "Medir la IA no basta. Hay que entenderla.",
    en: "Measuring AI is not enough. You have to understand it.",
    de: "KI zu messen reicht nicht. Man muss sie verstehen.",
    pt: "Medir a IA não chega. É preciso entendê-la.",
  };
  const sub: LT = {
    es: "Para que empresas y personas tomen las mejores decisiones sobre IA — y para entender cómo está LATAM frente al mundo.",
    en: "So companies and people make the best decisions about AI — and so we understand how LATAM compares to the world.",
    de: "Damit Unternehmen und Menschen die besten Entscheidungen zur KI treffen — und damit wir verstehen, wie LATAM weltweit abschneidet.",
    pt: "Para que empresas e pessoas tomem as melhores decisões sobre IA — e para entender como está a LATAM face ao mundo.",
  };
  const cta: LT = { es: "Abrir Monza Index", en: "Open Monza Index", de: "Monza Index öffnen", pt: "Abrir Monza Index" };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-14 items-center relative z-10">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="md:col-span-7"
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
            href="https://www.monzaindex.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-clash text-sm tracking-[0.2em] uppercase font-medium py-4 px-7 rounded-full transition-all duration-300"
            style={{
              color: "#0B0B10",
              background: ACCENT,
              boxShadow: `0 20px 60px -20px ${ACCENT}88`,
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

        {/* Radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          className="md:col-span-5 relative"
        >
          <div className="relative aspect-square w-full max-w-[440px] mx-auto">
            <Radar lang={lang} />
          </div>
          <p
            className="font-clash text-[10px] tracking-[0.3em] uppercase text-center mt-2"
            style={{ color: `${ACCENT}99` }}
          >
            Colombia · Q2 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────
   PURPOSE
   ────────────────────────────────────────── */
const Purpose = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "PROPÓSITO", en: "PURPOSE", de: "ZWECK", pt: "PROPÓSITO" };
  const head: LT = {
    es: "Medimos la IA para que las decisiones dejen de ser intuición.",
    en: "We measure AI so decisions stop being intuition.",
    de: "Wir messen KI, damit Entscheidungen keine Intuition mehr sind.", pt: "Medimos la IA para que las decisiones dejen de ser intuición.",
  };
  const body: LT = {
    es: "Empresas, gobiernos y personas necesitan saber dónde están parados frente a la inteligencia artificial. Monza Index mide la adopción real de la IA — empezando por Colombia, expandiendo a LATAM, comparando con el mundo. Sin opinión, sin caja negra: pesos y fuentes auditables.",
    en: "Companies, governments and individuals need to know where they stand against AI. Monza Index measures real AI adoption — starting in Colombia, expanding to LATAM, comparing to the world. No opinion, no black box: weights and sources are auditable.",
    de: "Unternehmen, Regierungen und Einzelpersonen müssen wissen, wo sie gegenüber KI stehen. Monza Index misst die echte KI-Adoption — beginnend in Kolumbien, ausgeweitet auf LATAM, im Vergleich zur Welt. Keine Meinung, keine Black Box: Gewichte und Quellen sind auditierbar.", pt: "Empresas, gobiernos y personas necesitan saber dónde están parados frente a la inteligencia artificial. Monza Index mide la adopción real de la IA — empezando por Colombia, expandiendo a LATAM, comparando con el mundo. Sin opinión, sin caja negra: pesos y fuentes auditables.",
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
   DIMENSIONS — 6 weighted bars
   ────────────────────────────────────────── */
type Dimension = { label: LT; weight: number; detail: LT };

const DIMENSIONS: Dimension[] = [
  {
    label: { es: "Adopción Empresarial", en: "Enterprise Adoption", de: "Unternehmens-Adoption", pt: "Adopción Empresarial" },
    weight: 25,
    detail: {
      es: "Cuántas empresas han implementado IA en producción y a qué profundidad.",
      en: "How many companies have deployed AI in production and at what depth.",
      de: "Wie viele Unternehmen KI produktiv eingesetzt haben und wie tief.", pt: "Cuántas empresas han implementado IA en producción y a qué profundidad.",
    },
  },
  {
    label: { es: "Talento y Capital Humano", en: "Talent & Human Capital", de: "Talent & Humankapital", pt: "Talento y Capital Humano" },
    weight: 20,
    detail: {
      es: "Job listings activas, salarios, formación universitaria y bootcamps.",
      en: "Active job listings, salaries, university training and bootcamps.",
      de: "Aktive Stellenanzeigen, Gehälter, Universitätsausbildung und Bootcamps.", pt: "Job listings activas, salarios, formación universitaria y bootcamps.",
    },
  },
  {
    label: { es: "Inversión y Ecosistema", en: "Investment & Ecosystem", de: "Investition & Ökosystem", pt: "Inversión y Ecosistema" },
    weight: 15,
    detail: {
      es: "Funding levantado por startups de IA, deal count, exits y M&A.",
      en: "Funding raised by AI startups, deal count, exits and M&A.",
      de: "Funding für KI-Startups, Deal-Count, Exits und M&A.", pt: "Funding levantado por startups de IA, deal count, exits y M&A.",
    },
  },
  {
    label: { es: "Adopción del Consumidor", en: "Consumer Adoption", de: "Konsumenten-Adoption", pt: "Adopción del Consumidor" },
    weight: 15,
    detail: {
      es: "Uso de ChatGPT, Gemini, Claude y herramientas IA por persona/mes.",
      en: "ChatGPT, Gemini, Claude and AI tool usage per person/month.",
      de: "ChatGPT, Gemini, Claude und KI-Tool-Nutzung pro Person/Monat.", pt: "Uso de ChatGPT, Gemini, Claude y herramientas IA por persona/mes.",
    },
  },
  {
    label: { es: "Infraestructura y Cómputo", en: "Infrastructure & Compute", de: "Infrastruktur & Compute", pt: "Infraestructura y Cómputo" },
    weight: 15,
    detail: {
      es: "Data centers, GPUs disponibles, conectividad y costo de cómputo.",
      en: "Data centers, available GPUs, connectivity and compute cost.",
      de: "Rechenzentren, verfügbare GPUs, Konnektivität und Compute-Kosten.", pt: "Data centers, GPUs disponibles, conectividad y costo de cómputo.",
    },
  },
  {
    label: { es: "Regulación y Gobernanza", en: "Regulation & Governance", de: "Regulierung & Governance", pt: "Regulación y Gobernanza" },
    weight: 10,
    detail: {
      es: "Marcos legales, ética, privacidad y políticas públicas de IA.",
      en: "Legal frameworks, ethics, privacy and public AI policy.",
      de: "Rechtliche Rahmen, Ethik, Datenschutz und KI-Politik.", pt: "Marcos legales, ética, privacidad y políticas públicas de IA.",
    },
  },
];

const Dimensions = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "QUÉ MEDIMOS", en: "WHAT WE MEASURE", de: "WAS WIR MESSEN", pt: "QUÉ MEDIMOS" };
  const head: LT = {
    es: "Seis dimensiones. Pesos auditables.",
    en: "Six dimensions. Auditable weights.",
    de: "Sechs Dimensionen. Auditierbare Gewichte.", pt: "Seis dimensiones. Pesos auditables.",
  };

  return (
    <Section className="py-24 md:py-32" id="dimensions">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
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

        <div className="space-y-3 md:space-y-4">
          {DIMENSIONS.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
              className="rounded-xl px-6 py-5 md:px-8 md:py-6"
              style={{
                background: "rgba(var(--text-rgb), 0.025)",
                border: "1px solid rgba(var(--text-rgb), 0.06)",
              }}
            >
              <div className="flex items-baseline justify-between gap-4 mb-3 flex-wrap">
                <h3
                  className="font-clash font-bold text-lg md:text-xl"
                  style={{
                    letterSpacing: "-0.015em",
                    color: "rgba(var(--text-rgb), 0.92)",
                  }}
                >
                  <span
                    className="font-mono text-[11px] tracking-[0.2em] mr-3"
                    style={{ color: `${ACCENT}b3` }}
                  >
                    0{i + 1}
                  </span>
                  {t(d.label, lang)}
                </h3>
                <span
                  className="font-clash font-bold text-lg md:text-xl"
                  style={{ color: ACCENT, letterSpacing: "-0.01em" }}
                >
                  {d.weight}%
                </span>
              </div>

              {/* Weight bar */}
              <div
                className="relative h-1 rounded-full mb-3 overflow-hidden"
                style={{ background: "rgba(var(--text-rgb), 0.06)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(d.weight / 25) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.06 + 0.3, ease: EASE }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: ACCENT }}
                />
              </div>

              <p
                className="font-clash text-sm md:text-[15px] leading-relaxed"
                style={{ color: "rgba(var(--text-rgb), 0.55)" }}
              >
                {t(d.detail, lang)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   PARTNERS / TEAM
   ────────────────────────────────────────── */
type Partner = { name: string; role: LT; bio: LT; initials: string };

const PARTNERS: Partner[] = [
  {
    name: "Giovanni Stella",
    initials: "GS",
    role: {
      es: "ex-Director Google Colombia",
      en: "ex-Director Google Colombia",
      de: "ex-Direktor Google Kolumbien", pt: "ex-Director Google Colombia",
    },
    bio: {
      es: "Lideró Google Colombia. Network amplio en LATAM tech, gobierno y media. Visión de cómo el ecosistema digital se construye desde dentro.",
      en: "Led Google Colombia. Wide network in LATAM tech, government and media. Vision of how the digital ecosystem builds from within.",
      de: "Leitete Google Kolumbien. Breites Netzwerk in LATAM Tech, Regierung und Medien. Vision, wie das digitale Ökosystem von innen aufgebaut wird.", pt: "Lideró Google Colombia. Network amplio en LATAM tech, gobierno y media. Visión de cómo el ecosistema digital se construye desde dentro.",
    },
  },
  {
    name: "Edgar Navarro",
    initials: "EN",
    role: {
      es: "Founder Monza Lab · ex-KPMG Innovation",
      en: "Founder Monza Lab · ex-KPMG Innovation",
      de: "Gründer Monza Lab · ex-KPMG Innovation", pt: "Founder Monza Lab · ex-KPMG Innovation",
    },
    bio: {
      es: "Founder de Monza Lab. Construye los productos AI-native: arquitectura del Index, plataforma, modelo de negocio y go-to-market.",
      en: "Founder of Monza Lab. Builds the AI-native products: Index architecture, platform, business model and go-to-market.",
      de: "Gründer von Monza Lab. Baut die AI-nativen Produkte: Index-Architektur, Plattform, Geschäftsmodell und Go-to-Market.", pt: "Founder de Monza Lab. Construye los productos AI-native: arquitectura del Index, plataforma, modelo de negocio y go-to-market.",
    },
  },
  {
    name: "Guillermo Jaramillo",
    initials: "GJ",
    role: {
      es: "BBVA Colombia · ex-CEO KPMG",
      en: "BBVA Colombia · ex-CEO KPMG",
      de: "BBVA Colombia · ex-CEO KPMG", pt: "BBVA Colombia · ex-CEO KPMG",
    },
    bio: {
      es: "Ex-CEO de KPMG Colombia. Hoy en BBVA. Profundo conocimiento del ecosistema empresarial colombiano y la transformación digital de servicios financieros.",
      en: "Ex-CEO of KPMG Colombia. Now at BBVA. Deep knowledge of the Colombian enterprise ecosystem and the digital transformation of financial services.",
      de: "Ex-CEO von KPMG Kolumbien. Heute bei BBVA. Tiefes Wissen über das kolumbianische Unternehmens-Ökosystem und die digitale Transformation der Finanzdienstleistungen.", pt: "Ex-CEO de KPMG Colombia. Hoy en BBVA. Profundo conocimiento del ecosistema empresarial colombiano y la transformación digital de servicios financieros.",
    },
  },
];

const Partners = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "EQUIPO FUNDADOR", en: "FOUNDING TEAM", de: "GRÜNDERTEAM", pt: "EQUIPO FUNDADOR" };
  const head: LT = {
    es: "Tres voces. Una tesis.",
    en: "Three voices. One thesis.",
    de: "Drei Stimmen. Eine These.", pt: "Tres voces. Una tesis.",
  };
  const affiliated: LT = {
    es: "AFILIADOS",
    en: "AFFILIATED",
    de: "AFFILIIERT", pt: "AFILIADOS",
  };

  return (
    <Section className="py-24 md:py-32" id="team">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-14 max-w-3xl"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-14">
          {PARTNERS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl p-7 md:p-8"
              style={{
                background: "rgba(var(--text-rgb), 0.025)",
                border: "1px solid rgba(var(--text-rgb), 0.06)",
              }}
            >
              {/* Initials avatar */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-clash font-bold text-xl mb-5"
                style={{
                  background: `${ACCENT}1a`,
                  border: `1px solid ${ACCENT}55`,
                  color: ACCENT,
                }}
              >
                {p.initials}
              </div>
              <h3
                className="font-clash font-bold text-xl md:text-2xl mb-1"
                style={{
                  letterSpacing: "-0.015em",
                  color: "rgba(var(--text-rgb), 0.92)",
                }}
              >
                {p.name}
              </h3>
              <p
                className="font-clash text-[11px] tracking-[0.2em] uppercase font-medium mb-5"
                style={{ color: `${ACCENT}cc` }}
              >
                {t(p.role, lang)}
              </p>
              <p
                className="font-clash text-[14px] leading-relaxed"
                style={{ color: "rgba(var(--text-rgb), 0.6)" }}
              >
                {t(p.bio, lang)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Affiliated brands */}
        <div
          className="pt-8 border-t flex items-baseline gap-6 flex-wrap"
          style={{ borderColor: "rgba(var(--text-rgb), 0.06)" }}
        >
          <p
            className="font-clash text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(var(--text-rgb), 0.45)" }}
          >
            {t(affiliated, lang)}
          </p>
          <div className="flex items-baseline gap-6 md:gap-10 flex-wrap">
            {["KPMG", "BBVA", "Google", "Monza Lab"].map((name) => (
              <span
                key={name}
                className="font-clash text-base md:text-lg font-medium"
                style={{ color: "rgba(var(--text-rgb), 0.7)", letterSpacing: "-0.01em" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   METHODOLOGY
   ────────────────────────────────────────── */
const Methodology = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "METODOLOGÍA", en: "METHODOLOGY", de: "METHODIK", pt: "METODOLOGÍA" };
  const head: LT = {
    es: "Sin opinión. Sin caja negra.",
    en: "No opinion. No black box.",
    de: "Keine Meinung. Keine Black Box.", pt: "Sin opinión. Sin caja negra.",
  };
  const body: LT = {
    es: "Cada peso del Index es público. Cada fuente es citada. Cada cálculo se reproduce.",
    en: "Every Index weight is public. Every source is cited. Every calculation is reproducible.",
    de: "Jedes Index-Gewicht ist öffentlich. Jede Quelle wird zitiert. Jede Berechnung ist reproduzierbar.", pt: "Cada peso del Index es público. Cada fuente es citada. Cada cálculo se reproduce.",
  };
  const sourcesLabel: LT = { es: "FUENTES", en: "SOURCES", de: "QUELLEN", pt: "FUENTES" };

  const sources = [
    "Computrabajo",
    "elempleo",
    "GetOnBoard",
    "Google Trends",
    "datos.gov.co (RUES)",
    "World Bank",
    "IMF",
  ];

  return (
    <Section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-6"
          style={{
            fontSize: "clamp(28px, 4.4vw, 56px)",
            letterSpacing: "-0.03em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p
          className="font-clash text-lg md:text-xl mb-12 max-w-3xl leading-relaxed"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {t(body, lang)}
        </p>

        <p
          className="font-clash text-[10px] tracking-[0.3em] uppercase mb-5"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(sourcesLabel, lang)}
        </p>
        <div className="flex flex-wrap gap-x-5 md:gap-x-7 gap-y-3">
          {sources.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="font-clash text-base md:text-lg"
              style={{ color: "rgba(var(--text-rgb), 0.7)", letterSpacing: "-0.005em" }}
            >
              {s}
              {i < sources.length - 1 && (
                <span className="ml-5 md:ml-7" style={{ color: `${ACCENT}55` }}>
                  ·
                </span>
              )}
            </motion.span>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   DATA POINTS — Colombia snapshot
   ────────────────────────────────────────── */
const DataPoints = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "COLOMBIA · SNAPSHOT", en: "COLOMBIA · SNAPSHOT", de: "KOLUMBIEN · SNAPSHOT", pt: "COLOMBIA · SNAPSHOT" };
  const head: LT = {
    es: "Datos en vivo del Index, Q2 2026.",
    en: "Live Index data, Q2 2026.",
    de: "Live Index-Daten, Q2 2026.", pt: "Datos en vivo del Index, Q2 2026.",
  };

  const data: { value: string; label: LT }[] = [
    {
      value: "58/100",
      label: { es: "Score Index Colombia", en: "Colombia Index Score", de: "Kolumbien Index-Score", pt: "Score Index Colombia" },
    },
    {
      value: "796",
      label: { es: "Job listings IA activas", en: "Active AI job listings", de: "Aktive KI-Stellen", pt: "Job listings IA activas" },
    },
    {
      value: "95",
      label: { es: "AI startups activas", en: "Active AI startups", de: "Aktive KI-Startups", pt: "AI startups activas" },
    },
    {
      value: "$5.0B",
      label: { es: "Total funding levantado", en: "Total funding raised", de: "Total Funding", pt: "Total funding levantado" },
    },
    {
      value: "$920M",
      label: { es: "Tech investment 2024 (+17%)", en: "Tech investment 2024 (+17%)", de: "Tech-Investition 2024 (+17%)", pt: "Tech investment 2024 (+17%)" },
    },
    {
      value: "$540B",
      label: { es: "GDP 2026 est. (+18% YoY)", en: "GDP 2026 est. (+18% YoY)", de: "BIP 2026 est. (+18% YoY)", pt: "GDP 2026 est. (+18% YoY)" },
    },
    {
      value: "79.3%",
      label: { es: "Penetración internet", en: "Internet penetration", de: "Internet-Durchdringung", pt: "Penetración internet" },
    },
    {
      value: "9.0%",
      label: { es: "Desempleo (+0.4pp)", en: "Unemployment (+0.4pp)", de: "Arbeitslosigkeit (+0.4pp)", pt: "Desempleo (+0.4pp)" },
    },
    {
      value: "74%",
      label: {
        es: "Search interest dominado por ChatGPT",
        en: "Search interest dominated by ChatGPT",
        de: "Suchinteresse von ChatGPT dominiert", pt: "Search interest dominado por ChatGPT",
      },
    },
  ];

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
          className="font-clash font-bold leading-[1.05] mb-14 max-w-3xl"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {data.map((d, i) => (
            <motion.div
              key={d.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="rounded-xl p-5 md:p-7"
              style={{
                background: "rgba(var(--text-rgb), 0.025)",
                border: "1px solid rgba(var(--text-rgb), 0.06)",
              }}
            >
              <p
                className="font-clash font-bold mb-3"
                style={{
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  letterSpacing: "-0.02em",
                  color: ACCENT,
                }}
              >
                {d.value}
              </p>
              <p
                className="font-clash text-[11px] md:text-[12px] tracking-[0.15em] uppercase font-medium leading-snug"
                style={{ color: "rgba(var(--text-rgb), 0.55)" }}
              >
                {t(d.label, lang)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   FINAL CTA
   ────────────────────────────────────────── */
const FinalCTA = ({ lang }: { lang: Lang }) => {
  const head: LT = {
    es: "Explora el Index en vivo.",
    en: "Explore the live Index.",
    de: "Erkunde den Live-Index.", pt: "Explora el Index en vivo.",
  };
  const sub: LT = {
    es: "Reportes auditables, explorer interactivo, datos abiertos.",
    en: "Auditable reports, interactive explorer, open data.",
    de: "Auditierbare Reports, interaktiver Explorer, offene Daten.", pt: "Reportes auditables, explorer interactivo, datos abiertos.",
  };
  const cta: LT = { es: "Abrir Monza Index", en: "Open Monza Index", de: "Monza Index öffnen", pt: "Abrir Monza Index" };

  return (
    <Section className="py-32 md:py-40">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div
          className="rounded-3xl p-10 md:p-16 lg:p-20 relative overflow-hidden"
          style={{
            border: `1px solid ${ACCENT}33`,
            background: `radial-gradient(ellipse at 30% 20%, ${ACCENT}14 0%, transparent 60%), rgba(var(--text-rgb), 0.02)`,
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
            href="https://www.monzaindex.ai"
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
const MonzaIndex = () => {
  const { language } = useLanguage();
  const lang = language as Lang;

  return (
    <PremiumBackground>
      <SEO
        path="/monzaindex"
        type="website"
        title={{
          es: "Monza Index — Medir la IA no basta. Hay que entenderla. · Monza Lab",
          en: "Monza Index — Measuring AI is not enough. You have to understand it. · Monza Lab",
          de: "Monza Index — KI zu messen reicht nicht. Man muss sie verstehen. · Monza Lab", pt: "Monza Index — Medir la IA no basta. Hay que entenderla. · Monza Lab",
        }}
        description={{
          es: "Monza Index mide la adopción real de la inteligencia artificial: 6 dimensiones, pesos auditables, fuentes públicas. Empezando por Colombia, expandiendo a LATAM.",
          en: "Monza Index measures real AI adoption: 6 dimensions, auditable weights, public sources. Starting in Colombia, expanding to LATAM.",
          de: "Monza Index misst die echte KI-Adoption: 6 Dimensionen, auditierbare Gewichte, öffentliche Quellen. Beginnend in Kolumbien, ausgeweitet auf LATAM.", pt: "Monza Index mide la adopción real de la inteligencia artificial: 6 dimensiones, pesos auditables, fuentes públicas. Empezando por Colombia, expandiendo a LATAM.",
        }}
        image="/images/projects/ia-index-cover.jpg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: "Monza Index — AI Adoption Index for LATAM",
          description: "AI adoption measurement across 6 weighted dimensions, starting in Colombia.",
          url: "https://monzaindex.ai",
          creator: {
            "@type": "Organization",
            name: "Monza Lab",
            url: "https://monzalab.com",
          },
        }}
      />

      <main id="main" aria-label="Monza Index">
        <Hero lang={lang} />
        <Purpose lang={lang} />
        <Dimensions lang={lang} />
        <Partners lang={lang} />
        <Methodology lang={lang} />
        <DataPoints lang={lang} />
        <FinalCTA lang={lang} />
      </main>

      <FooterMinimal />
    </PremiumBackground>
  );
};

export default MonzaIndex;
