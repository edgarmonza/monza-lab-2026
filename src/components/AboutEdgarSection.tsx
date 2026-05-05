import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const EDGAR_PORTRAIT = "/images/Edgar/edgar-about.png";

const EASE = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#F8B4D9";

type Lang = "es" | "en" | "de" | "pt";
type LT = { es: string; en: string; de: string; pt: string };

type Block = {
  label: LT;
  copy: LT[];
};

const BLOCKS: Block[] = [
  {
    label: { es: "QUIÉN", en: "WHO", de: "WER", pt: "QUEM" },
    copy: [
      {
        es: "Edgar Navarro Soto",
        en: "Edgar Navarro Soto",
        de: "Edgar Navarro Soto",
        pt: "Edgar Navarro Soto",
      },
      {
        es: "Founder & Creative Director — Monza Lab",
        en: "Founder & Creative Director — Monza Lab",
        de: "Founder & Creative Director — Monza Lab",
        pt: "Founder & Creative Director — Monza Lab",
      },
      {
        es: "Bogotá ↔ Munich ↔ Mundo",
        en: "Bogotá ↔ Munich ↔ World",
        de: "Bogotá ↔ München ↔ Welt",
        pt: "Bogotá ↔ Munique ↔ Mundo",
      },
    ],
  },
  {
    label: { es: "QUÉ HACE", en: "WHAT HE DOES", de: "WAS ER MACHT", pt: "O QUE FAZ" },
    copy: [
      {
        es: "Construye empresas con IA como palanca.",
        en: "Builds companies with AI as leverage.",
        de: "Baut Unternehmen mit KI als Hebel.",
        pt: "Constrói empresas com IA como alavanca.",
      },
      {
        es: "Cuatro ventures activas. Un founder.",
        en: "Four active ventures. One founder.",
        de: "Vier aktive Ventures. Ein Founder.",
        pt: "Quatro ventures activas. Um founder.",
      },
      {
        es: "Featured en Forbes con Bavarian Econs.",
        en: "Featured in Forbes with Bavarian Econs.",
        de: "Featured in Forbes mit Bavarian Econs.",
        pt: "Featured na Forbes com a Bavarian Econs.",
      },
    ],
  },
  {
    label: { es: "CÓMO LO HACE", en: "HOW HE DOES IT", de: "WIE ER ES MACHT", pt: "COMO O FAZ" },
    copy: [
      {
        es: "Solo. Desde el modelo de negocio hasta el código.",
        en: "Solo. From the business model to the code.",
        de: "Allein. Vom Geschäftsmodell bis zum Code.",
        pt: "Sozinho. Do modelo de negócio ao código.",
      },
      {
        es: "Branding · Producto · Content · Growth — todo en loop.",
        en: "Branding · Product · Content · Growth — all in loop.",
        de: "Branding · Produkt · Content · Growth — alles im Loop.",
        pt: "Branding · Produto · Content · Growth — tudo em loop.",
      },
      {
        es: "Sprints de 7 días. Ship or die.",
        en: "Seven-day sprints. Ship or die.",
        de: "Sieben-Tage-Sprints. Ship or die.",
        pt: "Sprints de 7 dias. Ship or die.",
      },
    ],
  },
];

const AboutEdgarSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();
  const lang = language as Lang;
  const langPrefix = lang === "es" ? "" : `/${lang}`;

  const eyebrow: LT = { es: "ABOUT", en: "ABOUT", de: "ÜBER", pt: "SOBRE" };
  const heading: LT = {
    es: "Un founder. Cuatro empresas. Una operación.",
    en: "One founder. Four companies. One operation.",
    de: "Ein Founder. Vier Unternehmen. Eine Operation.",
    pt: "Um founder. Quatro empresas. Uma operação.",
  };
  const linkSpeaker: LT = { es: "Speaker", en: "Speaker", de: "Speaker", pt: "Speaker" };
  const linkLinkedIn: LT = { es: "LinkedIn", en: "LinkedIn", de: "LinkedIn", pt: "LinkedIn" };
  const linkInstagram: LT = { es: "Instagram", en: "Instagram", de: "Instagram", pt: "Instagram" };
  const linkEmail: LT = { es: "Email", en: "Email", de: "Email", pt: "Email" };

  return (
    <motion.section
      ref={ref}
      id="about"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${ACCENT}33`,
              boxShadow: `0 30px 80px -30px ${ACCENT}33`,
            }}
          >
            <img
              src={EDGAR_PORTRAIT}
              alt="Edgar Navarro — Founder Monza Lab"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            <div className="absolute bottom-5 left-5 right-5">
              <p
                className="font-clash text-[9px] tracking-[0.3em] uppercase mb-1.5"
                style={{ color: `${ACCENT}cc` }}
              >
                EDGAR NAVARRO SOTO
              </p>
              <p
                className="font-mono text-[10px]"
                style={{ color: "rgba(255,252,247,0.55)" }}
              >
                Founder & Creative Director · Monza Lab
              </p>
            </div>
          </motion.div>

          {/* Right — content blocks */}
          <div className="md:col-span-7">
            <p
              className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-4"
              style={{ color: `${ACCENT}b3` }}
            >
              {eyebrow[lang]}
            </p>
            <h2
              className="font-clash font-bold leading-[1.05] mb-12"
              style={{
                fontSize: "clamp(28px, 4.4vw, 56px)",
                letterSpacing: "-0.025em",
                color: "rgba(var(--text-rgb), 0.92)",
              }}
            >
              {heading[lang]}
            </h2>

            <div className="space-y-10 md:space-y-12">
              {BLOCKS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                  className="grid grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] gap-4 md:gap-6 pb-8 md:pb-10"
                  style={{ borderBottom: "1px solid rgba(var(--text-rgb), 0.06)" }}
                >
                  <p
                    className="font-clash text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold pt-1"
                    style={{ color: ACCENT, letterSpacing: "0.25em" }}
                  >
                    {b.label[lang]}
                  </p>
                  <div className="space-y-2.5">
                    {b.copy.map((line, li) => (
                      <p
                        key={li}
                        className="font-clash leading-relaxed"
                        style={{
                          fontSize: li === 0 ? "clamp(18px, 2vw, 22px)" : "clamp(14px, 1.4vw, 17px)",
                          fontWeight: li === 0 ? 600 : 400,
                          letterSpacing: li === 0 ? "-0.015em" : "-0.005em",
                          color:
                            li === 0
                              ? "rgba(var(--text-rgb), 0.92)"
                              : "rgba(var(--text-rgb), 0.6)",
                        }}
                      >
                        {line[lang]}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Links — premium row, minimal, sin flechas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
              className="mt-12 pt-6 flex flex-wrap items-center gap-x-10 md:gap-x-14 gap-y-4"
              style={{ borderTop: "1px solid rgba(var(--text-rgb), 0.08)" }}
            >
              {[
                { label: linkSpeaker[lang], href: `${langPrefix}/speaker`, internal: true },
                {
                  label: linkLinkedIn[lang],
                  href: "https://www.linkedin.com/in/edgarnavarrosoto/",
                  internal: false,
                },
                {
                  label: linkInstagram[lang],
                  href: "https://www.instagram.com/monza.lab/",
                  internal: false,
                },
                { label: linkEmail[lang], href: "mailto:edgar@monzalab.com", internal: false },
              ].map((item) => {
                const baseClass =
                  "group font-clash text-[11px] md:text-[12px] tracking-[0.32em] uppercase font-medium transition-colors duration-300 relative inline-block";
                const baseStyle = { color: "rgba(var(--text-rgb), 0.55)" };
                const inner = (
                  <>
                    <span>{item.label}</span>
                    <span
                      className="absolute left-0 -bottom-1 h-px transition-all duration-500 ease-out"
                      style={{
                        width: "0%",
                        background: "rgba(var(--text-rgb), 0.85)",
                      }}
                      aria-hidden
                    />
                  </>
                );
                const onEnter = (e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.style.color = "rgba(var(--text-rgb), 1)";
                  const underline = e.currentTarget.querySelector("span:last-child") as HTMLElement | null;
                  if (underline) underline.style.width = "100%";
                };
                const onLeave = (e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.style.color = "rgba(var(--text-rgb), 0.55)";
                  const underline = e.currentTarget.querySelector("span:last-child") as HTMLElement | null;
                  if (underline) underline.style.width = "0%";
                };

                return item.internal ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={baseClass}
                    style={baseStyle}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                  >
                    {inner}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={baseClass}
                    style={baseStyle}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                  >
                    {inner}
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutEdgarSection;
