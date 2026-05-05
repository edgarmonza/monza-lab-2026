import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import FooterMinimal from "@/components/FooterMinimal";
import PremiumBackground from "@/components/layout/PremiumBackground";
import SEO from "@/components/SEO";

const EASE = [0.16, 1, 0.3, 1] as const;
/* Bavarian — stone gray (Munich limestone). NO gold. */
const ACCENT = "#A8A29E";
const ACCENT_DEEP = "#8C8780";

type Lang = "es" | "en" | "de" | "pt";
type LT = { es: string; en: string; de: string; pt: string };
const t = (obj: LT, lang: Lang) => obj[lang] ?? obj.es;

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
   HERO
   ────────────────────────────────────────── */
const Hero = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = {
    es: "BAVARIAN ECONS · VENTURE 04",
    en: "BAVARIAN ECONS · VENTURE 04",
    de: "BAVARIAN ECONS · VENTURE 04", pt: "BAVARIAN ECONS · VENTURE 04",
  };
  const headline: LT = {
    es: "We are not distracted by the future.",
    en: "We are not distracted by the future.",
    de: "We are not distracted by the future.", pt: "We are not distracted by the future.",
  };
  const sub: LT = {
    es: "Recreando el pasado. Electrificado. BMW 2002 e icónicos del Golden Era — restaurados como atelier en Munich, electrificados para coleccionistas globales.",
    en: "Recreating the past. Electrified. Iconic BMW 2002 and Golden Era classics — atelier-restored in Munich, electrified for global collectors.",
    de: "Die Vergangenheit neu erschaffen. Elektrifiziert. Ikonische BMW 2002 und Golden-Era-Klassiker — Atelier-restauriert in München, elektrifiziert für globale Sammler.",
    pt: "Recriar o passado. Eletrificado. BMW 2002 e ícones do Golden Era — restaurados em atelier em Munique, eletrificados para colecionadores globais.",
  };
  const cta: LT = { es: "Visitar Bavarian Econs", en: "Visit Bavarian Econs", de: "Bavarian Econs besuchen", pt: "Visitar Bavarian Econs" };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-14 items-center relative z-10">
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
            href="https://www.bavarianecons.com"
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

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          className="md:col-span-5 relative aspect-[4/5] md:aspect-[4/5] rounded-2xl overflow-hidden"
          style={{
            border: `1px solid ${ACCENT}33`,
            boxShadow: `0 40px 100px -30px ${ACCENT}33`,
          }}
        >
          <img
            src="/images/projects/bavarian-econs/coast-frontal.jpeg"
            alt="Bavarian Econs — BMW 2002 te"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.55) 100%)`,
            }}
          />
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.2em] backdrop-blur-md"
            style={{
              color: ACCENT,
              background: "rgba(11,11,16,0.55)",
              border: `1px solid ${ACCENT}40`,
            }}
          >
            ATELIER · MUNICH
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────
   STATS
   ────────────────────────────────────────── */
const Stats = ({ lang }: { lang: Lang }) => {
  const stats: { value: string; label: LT }[] = [
    { value: "2021", label: { es: "Fundada", en: "Founded", de: "Gegründet", pt: "Fundada" } },
    { value: "Munich", label: { es: "Atelier", en: "Atelier", de: "Atelier", pt: "Atelier" } },
    { value: "500h+", label: { es: "Por conversión", en: "Per conversion", de: "Pro Umbau", pt: "Por conversión" } },
    { value: "400V", label: { es: "Arquitectura EV", en: "EV architecture", de: "EV-Architektur", pt: "Arquitectura EV" } },
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
                fontSize: "clamp(28px, 3.5vw, 44px)",
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
   PURPOSE / STORY
   ────────────────────────────────────────── */
const Purpose = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "LA HISTORIA", en: "THE STORY", de: "DIE GESCHICHTE", pt: "LA HISTORIA" };
  const head: LT = {
    es: "El BMW 2002 es uno de los clásicos más cotizados del mundo. Lo electrificamos.",
    en: "The BMW 2002 is one of the most sought-after classics in the world. We electrify it.",
    de: "Der BMW 2002 ist einer der begehrtesten Klassiker der Welt. Wir elektrifizieren ihn.", pt: "El BMW 2002 es uno de los clásicos más cotizados del mundo. Lo electrificamos.",
  };
  const body: LT = {
    es: "Nicolas y Edgar Navarro fundaron Bavarian Econs en 2021 con una idea: rescatar los íconos del Golden Era de BMW (1966-1977) y darles 50 años más de vida con powertrain eléctrico. Cada conversión nace en el atelier de Munich — 500+ horas por carro, 3 personas, certificación TÜV. German Engineering. Latin Soul.",
    en: "Nicolas and Edgar Navarro founded Bavarian Econs in 2021 with one idea: rescue the icons of BMW's Golden Era (1966–1977) and give them 50 more years of life with an electric powertrain. Every conversion is born in the Munich atelier — 500+ hours per car, 3 people, TÜV certification. German Engineering. Latin Soul.",
    de: "Nicolas und Edgar Navarro gründeten Bavarian Econs 2021 mit einer Idee: die Ikonen der goldenen Ära von BMW (1966–1977) zu retten und ihnen mit elektrischem Antrieb 50 weitere Jahre Leben zu geben. Jeder Umbau entsteht in der Werkstatt in München — 500+ Stunden pro Auto, 3 Personen, TÜV-Zertifizierung. German Engineering. Latin Soul.", pt: "Nicolas y Edgar Navarro fundaron Bavarian Econs en 2021 con una idea: rescatar los íconos del Golden Era de BMW (1966-1977) y darles 50 años más de vida con powertrain eléctrico. Cada conversión nace en el atelier de Munich — 500+ horas por carro, 3 personas, certificación TÜV. German Engineering. Latin Soul.",
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
   MODELS
   ────────────────────────────────────────── */
type Model = { name: string; status: LT; desc: LT; cover: string };

const MODELS: Model[] = [
  {
    name: "2002 te",
    status: { es: "Available", en: "Available", de: "Verfügbar", pt: "Available" },
    desc: {
      es: "El icónico touring BMW 2002, electrificado. Suspensión refinada, interior cuero artesanal, powertrain de 250 HP. Conducción del 2026 con alma del 1972.",
      en: "The iconic BMW 2002 touring, electrified. Refined suspension, artisanal leather interior, 250 HP powertrain. 2026 driving with 1972 soul.",
      de: "Der ikonische BMW 2002 Touring, elektrifiziert. Verfeinerte Federung, handgefertigtes Leder-Interieur, 250 PS Antrieb. Fahrgefühl 2026 mit Seele von 1972.", pt: "El icónico touring BMW 2002, electrificado. Suspensión refinada, interior cuero artesanal, powertrain de 250 HP. Conducción del 2026 con alma del 1972.",
    },
    cover: "/images/projects/bavarian-econs/coast-frontal.jpeg",
  },
  {
    name: "2002 Turbo e",
    status: { es: "Available", en: "Available", de: "Verfügbar", pt: "Available" },
    desc: {
      es: "Wide-body homenaje al icónico Turbo de 1973. Aerodinámica ampliada, distribución 50/50, certificación TÜV — un Turbo digno de su mito original.",
      en: "Wide-body tribute to the iconic 1973 Turbo. Widened aerodynamics, 50/50 weight distribution, TÜV certification — a Turbo worthy of its original myth.",
      de: "Wide-Body-Hommage an den ikonischen Turbo von 1973. Erweiterte Aerodynamik, 50/50-Gewichtsverteilung, TÜV-Zertifizierung — ein Turbo seines ursprünglichen Mythos würdig.", pt: "Wide-body homenaje al icónico Turbo de 1973. Aerodinámica ampliada, distribución 50/50, certificación TÜV — un Turbo digno de su mito original.",
    },
    cover: "/images/projects/bavarian-econs/bmw-welt-charging.jpeg",
  },
  {
    name: "E30 Touring e",
    status: { es: "Coming 2026 · 50 unidades", en: "Coming 2026 · 50 units", de: "Ab 2026 · 50 Einheiten", pt: "Coming 2026 · 50 unidades" },
    desc: {
      es: "Nueva línea: el icónico E30 Touring electrificado. Producción limitada a 50 unidades globales. Probado en los Alpes, ajustado a mano en Munich.",
      en: "New line: the iconic E30 Touring electrified. Production limited to 50 global units. Alps-tested, hand-tuned in Munich.",
      de: "Neue Linie: der ikonische E30 Touring elektrifiziert. Produktion auf 50 globale Einheiten limitiert. In den Alpen getestet, in München von Hand abgestimmt.", pt: "Nueva línea: el icónico E30 Touring electrificado. Producción limitada a 50 unidades globales. Probado en los Alpes, ajustado a mano en Munich.",
    },
    cover: "/images/projects/bavarian-econs/interior-leather.jpeg",
  },
];

const ModelsSection = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "LA COLECCIÓN", en: "THE COLLECTION", de: "DIE KOLLEKTION", pt: "LA COLECCIÓN" };
  const head: LT = {
    es: "Tres carros. Cincuenta años de mito.",
    en: "Three cars. Fifty years of myth.",
    de: "Drei Autos. Fünfzig Jahre Mythos.", pt: "Tres carros. Cincuenta años de mito.",
  };

  return (
    <Section className="py-24 md:py-32" id="models">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {MODELS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(var(--text-rgb), 0.08)" }}
            >
              <img
                src={m.cover}
                alt={m.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                style={{ opacity: 0.85 }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.92) 100%)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p
                  className="font-clash text-[9px] tracking-[0.3em] uppercase font-medium mb-2"
                  style={{ color: `${ACCENT}cc` }}
                >
                  {t(m.status, lang)}
                </p>
                <h3
                  className="font-clash font-bold text-2xl md:text-3xl mb-3"
                  style={{
                    letterSpacing: "-0.02em",
                    color: "rgba(255,252,247,0.95)",
                  }}
                >
                  {m.name}
                </h3>
                <p
                  className="font-clash text-[13px] leading-relaxed"
                  style={{ color: "rgba(255,252,247,0.65)" }}
                >
                  {t(m.desc, lang)}
                </p>
              </div>
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 80px -10px ${ACCENT}30` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   TECHNOLOGY
   ────────────────────────────────────────── */
type Tech = { num: string; label: LT; detail: LT };

const TECH: Tech[] = [
  {
    num: "01",
    label: { es: "Arquitectura 400V", en: "400V Architecture", de: "400V-Architektur", pt: "Arquitectura 400V" },
    detail: {
      es: "Plataforma EV moderna sobre chasis vintage. Carga rápida, eficiencia y reliability — sin perder el feel del original.",
      en: "Modern EV platform on a vintage chassis. Fast charging, efficiency and reliability — without losing the feel of the original.",
      de: "Moderne EV-Plattform auf Vintage-Chassis. Schnellladung, Effizienz und Zuverlässigkeit — ohne das ursprüngliche Gefühl zu verlieren.", pt: "Plataforma EV moderna sobre chasis vintage. Carga rápida, eficiencia y reliability — sin perder el feel del original.",
    },
  },
  {
    num: "02",
    label: { es: "Certificación TÜV", en: "TÜV Certification", de: "TÜV-Zertifizierung", pt: "Certificación TÜV" },
    detail: {
      es: "Cada conversión pasa el estándar más exigente del mundo automotriz. No es un kit — es ingeniería certificada.",
      en: "Every conversion passes the world's strictest automotive standard. It's not a kit — it's certified engineering.",
      de: "Jeder Umbau besteht den weltweit strengsten Automobilstandard. Kein Kit — zertifizierte Ingenieurskunst.", pt: "Cada conversión pasa el estándar más exigente del mundo automotriz. No es un kit — es ingeniería certificada.",
    },
  },
  {
    num: "03",
    label: { es: "Distribución 50/50", en: "50/50 Weight Balance", de: "50/50-Gewichtsverteilung", pt: "Distribución 50/50" },
    detail: {
      es: "Balance perfecto entre ejes. La sensación del 2002 original — pero con torque inmediato y silencio absoluto.",
      en: "Perfect balance between axles. The feel of the original 2002 — but with instant torque and absolute silence.",
      de: "Perfekte Balance zwischen den Achsen. Das Gefühl des originalen 2002 — aber mit sofortigem Drehmoment und absoluter Stille.", pt: "Balance perfecto entre ejes. La sensación del 2002 original — pero con torque inmediato y silencio absoluto.",
    },
  },
  {
    num: "04",
    label: { es: "Probado en los Alpes", en: "Alps-tested", de: "In den Alpen getestet", pt: "Probado en los Alpes" },
    detail: {
      es: "Cada modelo se valida en los pasos alpinos antes de ser entregado. Si funciona ahí, funciona en cualquier lugar del mundo.",
      en: "Every model is validated on Alpine passes before delivery. If it works there, it works anywhere in the world.",
      de: "Jedes Modell wird vor der Auslieferung in alpinen Pässen validiert. Wenn es dort funktioniert, funktioniert es weltweit.", pt: "Cada modelo se valida en los pasos alpinos antes de ser entregado. Si funciona ahí, funciona en cualquier lugar del mundo.",
    },
  },
];

const Technology = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "TECNOLOGÍA", en: "TECHNOLOGY", de: "TECHNOLOGIE", pt: "TECNOLOGÍA" };
  const head: LT = {
    es: "Cuatro pilares de ingeniería bávara.",
    en: "Four pillars of Bavarian engineering.",
    de: "Vier Säulen bayerischer Ingenieurskunst.", pt: "Cuatro pilares de ingeniería bávara.",
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
          className="font-clash font-bold leading-[1.05] mb-14 max-w-3xl"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {TECH.map((tech, i) => (
            <motion.div
              key={tech.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl p-7 md:p-9"
              style={{
                background: "rgba(var(--text-rgb), 0.025)",
                border: "1px solid rgba(var(--text-rgb), 0.06)",
              }}
            >
              <div className="flex items-baseline gap-4 mb-5">
                <span
                  className="font-mono text-[11px] tracking-[0.2em]"
                  style={{ color: `${ACCENT}b3` }}
                >
                  {tech.num}
                </span>
                <h3
                  className="font-clash font-bold text-xl md:text-2xl"
                  style={{
                    letterSpacing: "-0.02em",
                    color: "rgba(var(--text-rgb), 0.92)",
                  }}
                >
                  {t(tech.label, lang)}
                </h3>
              </div>
              <p
                className="font-clash text-[15px] md:text-base leading-relaxed"
                style={{ color: "rgba(var(--text-rgb), 0.6)" }}
              >
                {t(tech.detail, lang)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   ATELIER + GALLERY
   ────────────────────────────────────────── */
const ATELIER_GALLERY = [
  "/images/projects/bavarian-econs/coast-frontal.jpeg",
  "/images/projects/bavarian-econs/bmw-welt-charging.jpeg",
  "/images/projects/bavarian-econs/badge-detail.jpeg",
  "/images/projects/bavarian-econs/interior-leather.jpeg",
];

const Atelier = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "EL ATELIER", en: "THE ATELIER", de: "DAS ATELIER", pt: "EL ATELIER" };
  const head: LT = {
    es: "Tres personas. 500+ horas por carro.",
    en: "Three people. 500+ hours per car.",
    de: "Drei Personen. 500+ Stunden pro Auto.", pt: "Tres personas. 500+ horas por carro.",
  };
  const body: LT = {
    es: "El atelier vive en Munich, a metros del BMW Welt. Cada panel se trabaja a mano, cada interior se cose en cuero, cada pintura pasa por la línea Glasurit 55 con primer y pulido manual. No es producción. Es haute couture automotriz.",
    en: "The atelier lives in Munich, steps from BMW Welt. Every panel is hand-worked, every interior hand-stitched in leather, every paint goes through the Glasurit 55 line with primer and hand polish. It's not production. It's automotive haute couture.",
    de: "Das Atelier liegt in München, wenige Meter von der BMW Welt entfernt. Jedes Panel wird von Hand bearbeitet, jedes Interieur in Leder genäht, jede Lackierung durchläuft die Glasurit-55-Linie mit Grundierung und Handpolitur. Keine Produktion. Automotive Haute Couture.", pt: "El atelier vive en Munich, a metros del BMW Welt. Cada panel se trabaja a mano, cada interior se cose en cuero, cada pintura pasa por la línea Glasurit 55 con primer y pulido manual. No es producción. Es haute couture automotriz.",
  };

  return (
    <Section className="py-24 md:py-32" id="atelier">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-8 max-w-3xl"
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {ATELIER_GALLERY.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden group"
              style={{ border: "1px solid rgba(var(--text-rgb), 0.06)" }}
            >
              <img
                src={src}
                alt={`Bavarian Econs atelier ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   PRESS
   ────────────────────────────────────────── */
const PRESS_ITEMS: { name: string; href: string }[] = [
  { name: "Forbes Colombia", href: "https://forbes.co/2024/09/10/editors-picks/estos-colombianos-estan-electrificando-clasicos-de-bmw-para-coleccionistas-en-europa-y-estados-unidos" },
  { name: "MotorTrend", href: "https://www.motortrend.com/reviews/bmw-2002-bavarian-econs-2002te-ev-swap-first-drive-review" },
  { name: "Top Gear", href: "https://www.bavarianecons.com" },
  { name: "Hagerty", href: "https://www.bavarianecons.com" },
  { name: "Bring a Trailer", href: "https://www.bavarianecons.com" },
  { name: "BMW Blog", href: "https://www.bavarianecons.com" },
  { name: "Auto Motor und Sport", href: "https://www.bavarianecons.com" },
  { name: "The Org", href: "https://theorg.com/iterate/bavarian-econs-how-two-colombians-are-reviving-germanys-iconic-auto-industry" },
];

const Press = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "PRESS & VALIDATION", en: "PRESS & VALIDATION", de: "PRESSE & VALIDIERUNG", pt: "PRESS & VALIDATION" };
  const head: LT = {
    es: "El mundo automotriz tomó nota.",
    en: "The automotive world took note.",
    de: "Die Automobilwelt hat es bemerkt.", pt: "El mundo automotriz tomó nota.",
  };

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
          className="font-clash font-bold leading-[1.05] mb-10 max-w-3xl"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>

        <div className="flex flex-wrap gap-x-8 md:gap-x-12 gap-y-5">
          {PRESS_ITEMS.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="font-clash text-base md:text-lg font-medium transition-colors duration-300"
              style={{ color: "rgba(var(--text-rgb), 0.7)", letterSpacing: "-0.01em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(var(--text-rgb), 0.7)")}
            >
              {p.name} <span aria-hidden style={{ color: `${ACCENT}55` }}>↗</span>
            </motion.a>
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
    es: "German Engineering. Latin Soul.",
    en: "German Engineering. Latin Soul.",
    de: "German Engineering. Latin Soul.", pt: "German Engineering. Latin Soul.",
  };
  const sub: LT = {
    es: "Reserva una visita al atelier o solicita información sobre tu BMW.",
    en: "Book a visit to the atelier or request information about your BMW.",
    de: "Buche einen Atelier-Besuch oder fordere Informationen zu deinem BMW an.", pt: "Reserva una visita al atelier o solicita información sobre tu BMW.",
  };
  const cta: LT = { es: "Visitar Bavarian Econs", en: "Visit Bavarian Econs", de: "Bavarian Econs besuchen", pt: "Visitar Bavarian Econs" };

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
            href="https://www.bavarianecons.com"
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
const BavarianEcons = () => {
  const { language } = useLanguage();
  const lang = language as Lang;

  return (
    <PremiumBackground>
      <SEO
        path="/bavarianecons"
        type="website"
        title={{
          es: "Bavarian Econs — German Engineering. Latin Soul. · Monza Lab",
          en: "Bavarian Econs — German Engineering. Latin Soul. · Monza Lab",
          de: "Bavarian Econs — German Engineering. Latin Soul. · Monza Lab", pt: "Bavarian Econs — German Engineering. Latin Soul. · Monza Lab",
        }}
        description={{
          es: "Bavarian Econs: BMW 2002, Turbo y E30 electrificados desde el atelier de Munich. 500+ horas por conversión, certificación TÜV, probado en los Alpes. Featured en Forbes, MotorTrend, Top Gear.",
          en: "Bavarian Econs: BMW 2002, Turbo and E30 electrified from the Munich atelier. 500+ hours per conversion, TÜV certified, Alps tested. Featured in Forbes, MotorTrend, Top Gear.",
          de: "Bavarian Econs: BMW 2002, Turbo und E30 elektrifiziert aus dem Atelier in München. 500+ Stunden pro Umbau, TÜV-zertifiziert, in den Alpen getestet.", pt: "Bavarian Econs: BMW 2002, Turbo y E30 electrificados desde el atelier de Munich. 500+ horas por conversión, certificación TÜV, probado en los Alpes. Featured en Forbes, MotorTrend, Top Gear.",
        }}
        image="/images/projects/bavarian-econs/coast-frontal.jpeg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Bavarian Econs",
          url: "https://bavarianecons.com",
          description: "BMW 2002 EV restomod atelier — Munich",
          founder: [
            { "@type": "Person", name: "Edgar Navarro" },
            { "@type": "Person", name: "Nicolas Navarro" },
          ],
          parentOrganization: {
            "@type": "Organization",
            name: "Monza Lab",
            url: "https://monzalab.com",
          },
        }}
      />

      <main id="main" aria-label="Bavarian Econs">
        <Hero lang={lang} />
        <Stats lang={lang} />
        <Purpose lang={lang} />
        <ModelsSection lang={lang} />
        <Technology lang={lang} />
        <Atelier lang={lang} />
        <Press lang={lang} />
        <FinalCTA lang={lang} />
      </main>

      <FooterMinimal />
    </PremiumBackground>
  );
};

export default BavarianEcons;
