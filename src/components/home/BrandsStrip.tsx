import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.16, 1, 0.3, 1] as const;

type Lang = "es" | "en" | "de" | "pt";
type LT = { es: string; en: string; de: string; pt: string };

type Brand = {
  name: string;
  slug: string | null;
  cover: string;
  accent: string;
  desc: LT;
};

const BRANDS: Brand[] = [
  {
    name: "Eleonora Morales",
    slug: "eleonora-morales",
    cover: "/images/brands/eleonora/eleonora-portrait.jpg",
    accent: "#f074aa",
    desc: {
      es: "Plataforma de moda preowned de lujo, curada pieza por pieza.",
      en: "Preowned luxury fashion platform, curated piece by piece.",
      de: "Plattform für Preowned-Luxusmode, kuratiert Stück für Stück.", pt: "Plataforma de moda preowned de lujo, curada pieza por pieza.",
    },
  },
  {
    name: "Pacho Alvarez",
    slug: "pacho-alvarez",
    cover: "/images/projects/pacho-alvarez/dakar-2026-dunas.jpg",
    accent: "#D9A468",
    desc: {
      es: "Piloto colombiano del Dakar Rally 2026.",
      en: "Colombian driver in the 2026 Dakar Rally.",
      de: "Kolumbianischer Fahrer der Dakar Rally 2026.", pt: "Piloto colombiano del Dakar Rally 2026.",
    },
  },
  {
    name: "Spectro",
    slug: "spectro",
    cover: "/images/projects/spectro/andres-purple.png",
    accent: "#8B5CF6",
    desc: {
      es: "Plataforma global de creadores y contenido deportivo.",
      en: "Global platform for sports creators and content.",
      de: "Globale Plattform für Sport-Creators und Content.", pt: "Plataforma global de creadores y contenido deportivo.",
    },
  },
  {
    name: "Garage Advisory",
    slug: null,
    cover: "/images/brands/garage-advisory/aston-front.jpg",
    accent: "#C4A35A",
    desc: {
      es: "Concierge de carros exóticos para coleccionistas en Europa.",
      en: "Exotic-car concierge for collectors across Europe.",
      de: "Exotic-Car-Concierge für Sammler in Europa.", pt: "Concierge de carros exóticos para coleccionistas en Europa.",
    },
  },
  {
    name: "Guardian of Speed",
    slug: null,
    cover: "/images/brands/guardian-of-speed/hero-runway.jpg",
    accent: "#B8B5AD",
    desc: {
      es: "Atelier y comunidad para coleccionistas de carros clásicos.",
      en: "Atelier and community for classic-car collectors.",
      de: "Atelier und Community für Sammler klassischer Autos.", pt: "Atelier y comunidad para coleccionistas de carros clásicos.",
    },
  },
  {
    name: "Musgo",
    slug: null,
    cover: "/images/brands/musgo/juanita-lopez-portrait.jpeg",
    accent: "#7fb878",
    desc: {
      es: "Consultora boutique de transiciones regenerativas.",
      en: "Boutique consultancy on regenerative transitions.",
      de: "Boutique-Beratung für regenerative Transformationen.", pt: "Consultora boutique de transiciones regenerativas.",
    },
  },
];

const BrandsStrip = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();
  const lang = language as Lang;
  const langPrefix = lang === "es" ? "" : `/${lang}`;

  const eyebrow: LT = {
    es: "BRANDS WE'VE GROWN",
    en: "BRANDS WE'VE GROWN",
    de: "BRANDS WE'VE GROWN", pt: "BRANDS WE'VE GROWN",
  };
  const heading: LT = {
    es: "Marcas que crecimos juntos.",
    en: "Brands we grew together.",
    de: "Marken — gemeinsam gewachsen.",
    pt: "Marcas que crescemos juntos.",
  };
  const sub: LT = {
    es: "Branding, build, contenido o growth — el rol cambia con cada marca.",
    en: "Branding, build, content or growth — the role changes with each brand.",
    de: "Branding, Build, Content oder Growth — die Rolle ändert sich mit jeder Marke.",
    pt: "Branding, build, conteúdo ou growth — o papel muda com cada marca.",
  };
  const seeAll: LT = {
    es: "Ver todos los casos",
    en: "See all work",
    de: "Alle Cases ansehen",
    pt: "Ver todos os casos",
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
        <div className="flex items-end justify-between mb-12 md:mb-16 gap-6 flex-wrap">
          <div>
            <p
              className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-3"
              style={{ color: "rgba(var(--text-rgb), 0.45)" }}
            >
              {eyebrow[lang]}
            </p>
            <h2
              className="font-clash font-bold leading-[1.05] mb-3"
              style={{
                fontSize: "clamp(24px, 3.5vw, 40px)",
                letterSpacing: "-0.025em",
                color: "rgba(var(--text-rgb), 0.92)",
              }}
            >
              {heading[lang]}
            </h2>
            <p
              className="font-clash text-sm md:text-base max-w-xl leading-relaxed"
              style={{ color: "rgba(var(--text-rgb), 0.55)" }}
            >
              {sub[lang]}
            </p>
          </div>
          <Link
            to={`${langPrefix}/work`}
            className="font-clash text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-300"
            style={{ color: "rgba(var(--text-rgb), 0.7)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(var(--text-rgb), 1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(var(--text-rgb), 0.7)")}
          >
            {seeAll[lang]} →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {BRANDS.map((brand, i) => {
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
                style={{ border: "1px solid rgba(var(--text-rgb), 0.06)" }}
              >
                <img
                  src={brand.cover}
                  alt={brand.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.7 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.88) 100%)`,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3
                    className="font-clash font-bold text-[13px] md:text-sm mb-1"
                    style={{
                      letterSpacing: "-0.015em",
                      color: "rgba(255,252,247,0.95)",
                    }}
                  >
                    {brand.name}
                  </h3>
                  <p
                    className="font-clash text-[10px] md:text-[11px]"
                    style={{ color: `${brand.accent}cc`, letterSpacing: "0.02em" }}
                  >
                    {brand.desc[lang]}
                  </p>
                </div>
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 60px -10px ${brand.accent}30` }}
                />
              </motion.div>
            );

            return brand.slug ? (
              <Link key={brand.name} to={`${langPrefix}/work/${brand.slug}`}>
                {inner}
              </Link>
            ) : (
              <div key={brand.name}>{inner}</div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default BrandsStrip;
