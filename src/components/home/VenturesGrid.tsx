import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.16, 1, 0.3, 1] as const;

type Lang = "es" | "en" | "de" | "pt";
type LT = { es: string; en: string; de: string; pt: string };

type Venture = {
  slug: string;
  name: string;
  number: string;
  accent: string;
  cover: string;
  tagline: LT;
  oneLiner: LT;
};

const VENTURES: Venture[] = [
  {
    slug: "monzastudio",
    name: "Monza Studio",
    number: "03",
    accent: "#f074aa",
    cover: "/images/people/santi/santi-clubmaster.png",
    tagline: {
      es: "Hago crecer marcas globales.",
      en: "I grow global brands.",
      de: "Ich lasse globale Marken wachsen.",
      pt: "Faço crescer marcas globais.",
    },
    oneLiner: {
      es: "Identidad, contenido y growth — operados en loop.",
      en: "Identity, content and growth — operated in loop.",
      de: "Identität, Content und Growth — im Loop betrieben.",
      pt: "Identidade, conteúdo e growth — operados em loop.",
    },
  },
  {
    slug: "monzahaus",
    name: "MonzaHaus",
    number: "01",
    accent: "#F8B4D9",
    cover: "/images/projects/monza-haus-cover.png",
    tagline: {
      es: "Compra el Porsche correcto, al precio justo.",
      en: "Buy the right Porsche, at the right price.",
      de: "Kauf den richtigen Porsche zum fairen Preis.",
      pt: "Compra o Porsche certo, ao preço justo.",
    },
    oneLiner: {
      es: "Inteligencia de mercado de Porsche en una sola plataforma.",
      en: "Porsche market intelligence on a single platform.",
      de: "Porsche-Marktintelligenz auf einer Plattform.",
      pt: "Inteligência de mercado de Porsche numa única plataforma.",
    },
  },
  {
    slug: "monzaindex",
    name: "Monza Index",
    number: "02",
    accent: "#FFFCF7",
    cover: "/images/projects/ia-index-cover.jpg",
    tagline: {
      es: "Mide qué tan adoptada está la IA.",
      en: "Measures how adopted AI really is.",
      de: "Misst, wie weit KI wirklich verbreitet ist.",
      pt: "Mede o nível real de adoção da IA.",
    },
    oneLiner: {
      es: "Compara países y empresas en adopción real de IA.",
      en: "Compares countries and companies on real AI adoption.",
      de: "Vergleicht Länder und Unternehmen bei echter KI-Adoption.",
      pt: "Compara países e empresas na adoção real de IA.",
    },
  },
  {
    slug: "bavarianecons",
    name: "Bavarian Econs",
    number: "04",
    accent: "#A8A29E",
    cover: "/images/projects/bavarian-econs/coast-frontal.jpeg",
    tagline: {
      es: "BMW clásicos, ahora eléctricos.",
      en: "Classic BMWs, now electric.",
      de: "Klassische BMWs, jetzt elektrisch.",
      pt: "BMWs clássicos, agora elétricos.",
    },
    oneLiner: {
      es: "Convertimos íconos de los 70 en autos modernos. Hecho a mano en Munich.",
      en: "We turn 70s icons into modern cars. Hand-built in Munich.",
      de: "Wir verwandeln 70er-Ikonen in moderne Autos. Handgefertigt in München.",
      pt: "Convertemos ícones dos anos 70 em carros modernos. Feito à mão em Munique.",
    },
  },
];

const VenturesGrid = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();
  const lang = language as Lang;
  const langPrefix = lang === "es" ? "" : `/${lang}`;

  const eyebrow: LT = { es: "VENTURES", en: "VENTURES", de: "VENTURES", pt: "VENTURES" };
  const heading: LT = {
    es: "Cuatro empresas. Una operación.",
    en: "Four ventures. One operation.",
    de: "Vier Ventures. Eine Operation.",
    pt: "Quatro empresas. Uma operação.",
  };
  const sub: LT = {
    es: "Cada venture vive como su propia empresa. Construidas y operadas desde Monza Lab.",
    en: "Each venture runs as its own company. Built and operated from Monza Lab.",
    de: "Jedes Venture läuft als eigenes Unternehmen. Gebaut und betrieben von Monza Lab.",
    pt: "Cada venture funciona como a sua própria empresa. Construídas e operadas a partir da Monza Lab.",
  };
  const visit: LT = { es: "Entrar", en: "Enter", de: "Öffnen", pt: "Entrar" };

  return (
    <motion.section
      ref={ref}
      id="ventures"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <p
            className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-4"
            style={{ color: "rgba(var(--text-rgb), 0.45)" }}
          >
            {eyebrow[lang]}
          </p>
          <h2
            className="font-clash font-bold leading-[1.05] mb-5"
            style={{
              fontSize: "clamp(28px, 5vw, 56px)",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {VENTURES.map((v, i) => (
            <motion.div
              key={v.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              <Link
                to={`${langPrefix}/${v.slug}`}
                className="group relative block aspect-[4/5] md:aspect-[3/2] rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(var(--text-rgb), 0.06)" }}
              >
                {/* Cover image */}
                <img
                  src={v.cover}
                  alt={v.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  style={{ opacity: 0.78 }}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.92) 100%)`,
                  }}
                />

                {/* Top tag */}
                <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
                  <span
                    className="font-mono text-[10px] tracking-[0.25em]"
                    style={{ color: `${v.accent}cc` }}
                  >
                    {v.number} / VENTURE
                  </span>
                  <span
                    className="font-clash text-[9px] tracking-[0.3em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ color: v.accent }}
                  >
                    {visit[lang]} →
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className="w-2 h-2 rounded-full transition-transform duration-500 group-hover:scale-125"
                      style={{ background: v.accent }}
                      aria-hidden
                    />
                    <h3
                      className="font-clash font-bold text-2xl md:text-3xl"
                      style={{
                        letterSpacing: "-0.02em",
                        color: "rgba(255,252,247,0.95)",
                      }}
                    >
                      {v.name}
                    </h3>
                  </div>
                  <p
                    className="font-clash text-base md:text-lg font-medium mb-2"
                    style={{
                      letterSpacing: "-0.015em",
                      color: "rgba(255,252,247,0.78)",
                    }}
                  >
                    {v.tagline[lang]}
                  </p>
                  <p
                    className="font-clash text-[12px] md:text-sm tracking-[0.04em]"
                    style={{ color: "rgba(255,252,247,0.45)" }}
                  >
                    {v.oneLiner[lang]}
                  </p>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 100px -20px ${v.accent}30` }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default VenturesGrid;
