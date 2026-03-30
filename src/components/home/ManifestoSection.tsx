import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.16, 1, 0.3, 1] as const;

type Line = {
  text: { es: string; en: string; de: string };
  opacity: number;
  size: "lg" | "md" | "sm";
  accent?: string | { es: string; en: string; de: string };
};

const LINES: Line[] = [
  {
    text: {
      es: "Construyo empresas solo.",
      en: "I build companies alone.",
      de: "Ich baue Unternehmen allein.",
    },
    opacity: 0.85,
    size: "lg",
  },
  {
    text: {
      es: "Desde el modelo de negocio hasta el código.",
      en: "From the business model to the code.",
      de: "Vom Geschäftsmodell bis zum Code.",
    },
    opacity: 0.45,
    size: "md",
  },
  {
    text: {
      es: "Desde la marca hasta cada pieza de contenido.",
      en: "From the brand to every piece of content.",
      de: "Von der Marke bis zu jedem Stück Content.",
    },
    opacity: 0.45,
    size: "md",
  },
  {
    text: {
      es: "Una marca de autos. Una plataforma de coleccionistas. Una marca de ropa — sin inventario.",
      en: "A car brand. A collector platform. A fashion label — no inventory.",
      de: "Eine Automarke. Eine Sammlerplattform. Ein Modelabel — kein Inventar.",
    },
    opacity: 0.30,
    size: "sm",
  },
  {
    text: {
      es: "Una persona. Full-stack. Con ",
      en: "One person. Full-stack. With ",
      de: "Eine Person. Full-stack. Mit ",
    },
    opacity: 0.85,
    size: "lg",
    accent: { es: "criterio", en: "criteria", de: "Kriterien" },
  },
];

const sizeClasses = {
  lg: "text-[6.5vw] md:text-[3.8vw] lg:text-[2.8vw] font-bold",
  md: "text-[5vw] md:text-[2.8vw] lg:text-[2vw] font-semibold",
  sm: "text-[3.8vw] md:text-[2.2vw] lg:text-[1.5vw] font-medium",
};

const ManifestoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="mx-auto w-full max-w-[900px] px-6 relative z-10">
        {/* Tag */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#F8B4D9]/40 font-medium mb-14 md:mb-20"
        >
          {{ es: "LA TESIS", en: "THE THESIS", de: "DIE THESE" }[language]}
        </motion.p>

        {/* Manifesto lines */}
        <div className="space-y-5 md:space-y-7">
          {LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.18,
                ease: EASE,
              }}
              className={`font-clash leading-[1.25] ${sizeClasses[line.size]}`}
              style={{
                color: `rgba(var(--text-rgb), ${line.opacity})`,
                letterSpacing: "-0.01em",
              }}
            >
              {line.text[language]}
              {line.accent && (
                <span className="text-[#F8B4D9]">
                  {typeof line.accent === "string" ? line.accent : line.accent[language]}
                  <span style={{ color: `rgba(var(--text-rgb), ${line.opacity})` }}>.</span>
                </span>
              )}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
