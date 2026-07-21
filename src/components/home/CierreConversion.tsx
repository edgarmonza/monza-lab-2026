import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang, LangText } from "@/i18n/types";

const EASE = [0.16, 1, 0.3, 1] as const;

const COPY: Record<string, LangText> = {
  heading: {
    es: "¿Construimos algo juntos?",
    en: "Shall we build something together?",
    de: "Bauen wir etwas zusammen?",
    pt: "Construímos algo juntos?",
  },
  sub: {
    es: "Una venture, una plataforma AI-first para tu industria, o tu marca operada con IA.",
    en: "A venture, an AI-first platform for your industry, or your brand operated with AI.",
    de: "Ein Venture, eine AI-First-Plattform für deine Industrie oder deine Marke, betrieben mit KI.",
    pt: "Uma venture, uma plataforma AI-first para a tua indústria, ou a tua marca operada com IA.",
  },
  primary: {
    es: "Hablar con el agente",
    en: "Talk to the agent",
    de: "Mit dem Agenten sprechen",
    pt: "Falar com o agente",
  },
};

const CierreConversion = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();
  const lang = language as Lang;

  return (
    <motion.section
      ref={ref}
      id="hablemos"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative py-28 md:py-40"
    >
      <div className="mx-auto max-w-[900px] px-6 md:px-10 text-center">
        <h2
          className="font-clash font-bold leading-[1.05] mb-6"
          style={{
            fontSize: "clamp(34px, 6vw, 64px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {COPY.heading[lang]}
        </h2>
        <p
          className="font-clash text-base md:text-lg leading-relaxed mb-10 mx-auto max-w-xl"
          style={{ color: "rgba(var(--text-rgb), 0.55)" }}
        >
          {COPY.sub[lang]}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("monza:open-agent"))}
            className="font-clash text-[12px] tracking-[0.2em] uppercase font-semibold rounded-full px-8 py-4 transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "#F8B4D9",
              color: "#0B0B10",
              boxShadow: "0 0 40px rgba(248,180,217,0.25)",
            }}
          >
            {COPY.primary[lang]} →
          </button>
          <a
            href="mailto:edgar@monzalab.com"
            className="font-clash text-[12px] tracking-[0.2em] uppercase font-medium transition-colors duration-300"
            style={{ color: "rgba(var(--text-rgb), 0.6)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(var(--text-rgb), 0.95)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(var(--text-rgb), 0.6)")}
          >
            edgar@monzalab.com
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default CierreConversion;
