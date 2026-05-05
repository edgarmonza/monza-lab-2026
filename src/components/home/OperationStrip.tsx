import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.16, 1, 0.3, 1] as const;
/* Operation strip — cool monochrome neutral. Mantiene contraste sin saturar de rosa. */
const ACCENT = "rgba(var(--text-rgb), 0.55)";
const ACCENT_HOVER = "rgba(var(--text-rgb), 0.85)";

type Lang = "es" | "en" | "de" | "pt";
type LT = { es: string; en: string; de: string; pt: string };

type Pillar = { num: string; label: LT; sub: LT; tone: string };

const PILLARS: Pillar[] = [
  {
    num: "01",
    label: { es: "Strategy", en: "Strategy", de: "Strategy", pt: "Strategy" },
    sub: {
      es: "Tesis · posicionamiento · modelo",
      en: "Thesis · positioning · model",
      de: "These · Positionierung · Modell",
      pt: "Tese · posicionamento · modelo",
    },
    tone: "#FFFCF7", // cream — neutral, foundation
  },
  {
    num: "02",
    label: { es: "Brand", en: "Brand", de: "Brand", pt: "Brand" },
    sub: {
      es: "Identidad · sistema visual · voz",
      en: "Identity · visual system · voice",
      de: "Identität · visuelles System · Voice",
      pt: "Identidade · sistema visual · voz",
    },
    tone: "#F8B4D9", // pink Monza
  },
  {
    num: "03",
    label: { es: "Product", en: "Product", de: "Produkt", pt: "Produto" },
    sub: {
      es: "Web · e-commerce · plataforma o app",
      en: "Web · e-commerce · platform or app",
      de: "Web · E-Commerce · Plattform oder App",
      pt: "Web · e-commerce · plataforma ou app",
    },
    tone: "#A8B5C5", // cool slate — digital
  },
  {
    num: "04",
    label: { es: "Growth", en: "Growth", de: "Growth", pt: "Growth" },
    sub: {
      es: "Contenido AI · pauta · automatizaciones",
      en: "AI content · paid · automations",
      de: "KI-Content · Paid · Automatisierung",
      pt: "Conteúdo AI · paid · automações",
    },
    tone: "#7fb878", // green Musgo — growth
  },
];

const OperationStrip = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();
  const lang = language as Lang;
  const langPrefix = lang === "es" ? "" : `/${lang}`;

  const eyebrow: LT = { es: "ASÍ CONSTRUYO", en: "HOW I BUILD", de: "SO BAUE ICH", pt: "COMO CONSTRUO" };
  const heading: LT = {
    es: "Cuatro capas. Marcas, consultoras, productos.",
    en: "Four layers. Brands, consultancies, products.",
    de: "Vier Schichten. Marken, Beratungen, Produkte.",
    pt: "Quatro camadas. Marcas, consultorias, produtos.",
  };
  const sub: LT = {
    es: "El motor es el mismo. Lo que cambia es lo que necesita cada negocio: a veces es e-commerce, a veces una consultora boutique, a veces una plataforma. Yo armo lo que falta y lo pongo a correr.",
    en: "The engine is the same. What changes is what each business needs: sometimes e-commerce, sometimes a boutique consultancy, sometimes a platform. I build what's missing and put it to run.",
    de: "Der Motor ist derselbe. Was sich ändert, ist was jedes Geschäft braucht: mal E-Commerce, mal eine Boutique-Beratung, mal eine Plattform. Ich baue, was fehlt, und bringe es zum Laufen.",
    pt: "O motor é o mesmo. O que muda é o que cada negócio precisa: às vezes é e-commerce, às vezes uma consultoria boutique, às vezes uma plataforma. Eu monto o que falta e ponho-o a correr.",
  };
  const cta: LT = {
    es: "Ver el motor en Monza Studio",
    en: "See the engine in Monza Studio",
    de: "Den Motor in Monza Studio sehen",
    pt: "Ver o motor em Monza Studio",
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mb-10 md:mb-14">
          <p
            className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-3"
            style={{ color: ACCENT }}
          >
            {eyebrow[lang]}
          </p>
          <h2
            className="font-clash font-bold leading-[1.05] mb-5 max-w-3xl"
            style={{
              fontSize: "clamp(24px, 3.5vw, 40px)",
              letterSpacing: "-0.025em",
              color: "rgba(var(--text-rgb), 0.92)",
            }}
          >
            {heading[lang]}
          </h2>
          <p
            className="font-clash text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: "rgba(var(--text-rgb), 0.55)" }}
          >
            {sub[lang]}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="group relative rounded-xl p-5 md:p-7 overflow-hidden transition-all duration-500"
              style={{
                background: "rgba(var(--text-rgb), 0.025)",
                border: "1px solid rgba(var(--text-rgb), 0.06)",
                aspectRatio: "1 / 1.15",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${p.tone}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(var(--text-rgb), 0.06)";
              }}
            >
              {/* Tonal radial glow — subtle by default, intensifies on hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 30% 20%, ${p.tone}1f 0%, transparent 60%)`,
                  opacity: 0.6,
                }}
                aria-hidden
              />
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse 90% 70% at 30% 20%, ${p.tone}33 0%, transparent 65%)`,
                }}
                aria-hidden
              />

              {/* Giant watermark number — bottom right */}
              <span
                className="absolute font-clash font-bold select-none pointer-events-none transition-all duration-700 leading-none"
                style={{
                  bottom: "-0.18em",
                  right: "-0.05em",
                  fontSize: "clamp(120px, 18vw, 220px)",
                  letterSpacing: "-0.06em",
                  color: p.tone,
                  opacity: 0.06,
                }}
                aria-hidden
              >
                {p.num}
              </span>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <p
                  className="font-mono text-[10px] tracking-[0.25em] mb-3 transition-colors duration-500"
                  style={{ color: `${p.tone}cc` }}
                >
                  {p.num}
                </p>
                <h3
                  className="font-clash font-bold text-base md:text-xl mb-1.5"
                  style={{
                    letterSpacing: "-0.015em",
                    color: "rgba(var(--text-rgb), 0.92)",
                  }}
                >
                  {p.label[lang]}
                </h3>
                <p
                  className="font-clash text-[11px] md:text-[12px]"
                  style={{ color: "rgba(var(--text-rgb), 0.5)" }}
                >
                  {p.sub[lang]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <Link
          to={`${langPrefix}/monzastudio`}
          className="inline-flex items-center gap-2 font-clash text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-300"
          style={{ color: ACCENT_HOVER }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(var(--text-rgb), 1)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = ACCENT_HOVER)}
        >
          {cta[lang]} <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.section>
  );
};

export default OperationStrip;
