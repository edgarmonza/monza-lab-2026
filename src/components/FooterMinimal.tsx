import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import HelmetIcon from "./HelmetIcon";
import { useTheme } from "@/theme/ThemeContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackContact, whatsAppUrl } from "@/lib/pixel";

const EASE = [0.16, 1, 0.3, 1] as const;

const content = {
  headline: {
    es: "Construyamos.",
    en: "Let's build.",
    de: "Lass uns bauen.", pt: "Construyamos.",
  },
  email: "edgar@monzalab.com",
  whatsapp: {
    es: "WhatsApp directo",
    en: "Direct WhatsApp",
    de: "Direkter WhatsApp",
    pt: "WhatsApp direto",
  },
  waMessage: {
    es: "Hola Edgar, vengo de monzalab.com. Construyamos.",
    en: "Hi Edgar, I came from monzalab.com. Let's build.",
    de: "Hallo Edgar, ich komme von monzalab.com.",
    pt: "Olá Edgar, venho de monzalab.com. Construamos.",
  },
};

const FooterMinimal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { theme } = useTheme();
  const isModena = theme === "modena";
  const { language } = useLanguage();

  const textPrimary = isModena ? "rgba(11,11,16,0.92)" : "rgba(255,252,247,0.92)";
  const textMuted = isModena ? "rgba(11,11,16,0.35)" : "rgba(255,252,247,0.35)";
  const textSubtle = isModena ? "rgba(11,11,16,0.20)" : "rgba(255,252,247,0.20)";
  const borderSubtle = isModena ? "rgba(11,11,16,0.08)" : "rgba(255,252,247,0.06)";

  return (
    <footer
      ref={ref}
      className="relative py-40 md:py-56 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="mx-auto w-full max-w-[900px] px-6 text-center relative z-10">
        {/* Headline — premium but not shouting */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="font-clash font-bold leading-[1.0] tracking-[-0.025em]"
          style={{
            fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
            color: textPrimary,
          }}
        >
          {content.headline[language]}
        </motion.h2>

        {/* Single email CTA — no button, no border */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="mt-12 md:mt-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <a
              href={`mailto:${content.email}`}
              onClick={() => trackContact("email", "footer")}
              className="group inline-flex items-center gap-3 font-clash text-[13px] md:text-[15px] tracking-[0.05em] transition-colors duration-400"
              style={{ color: textMuted }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(248,180,217,0.95)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = textMuted; }}
            >
              <span
                className="inline-block w-6 h-px transition-all duration-500 group-hover:w-10"
                style={{ background: "currentColor" }}
              />
              {content.email}
            </a>
            <a
              href={whatsAppUrl(content.waMessage[language])}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp", "footer")}
              className="group inline-flex items-center gap-3 font-clash text-[13px] md:text-[15px] tracking-[0.05em] transition-colors duration-400"
              style={{ color: textMuted }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(37,211,102,0.95)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = textMuted; }}
            >
              <span
                className="inline-block w-6 h-px transition-all duration-500 group-hover:w-10"
                style={{ background: "currentColor" }}
              />
              {content.whatsapp[language]}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom strip — ultra minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mx-auto w-full max-w-[1200px] px-6 mt-32 md:mt-40 pt-8"
        style={{ borderTop: `1px solid ${borderSubtle}` }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left — helmet + copyright */}
          <div className="flex items-center gap-4">
            <div className="w-3 h-3" aria-hidden="true">
              <HelmetIcon
                variant="ghost"
                shellColor={textSubtle}
                visorColor={textSubtle}
                className="w-full h-full"
              />
            </div>
            <span
              className="font-clash text-[10px] tracking-[0.3em] uppercase"
              style={{ color: textSubtle }}
            >
              © 2026 Monza Lab
            </span>
          </div>

          {/* Middle — internal pillars, discreet (SEO + navegación) */}
          <div className="flex items-center gap-8">
            {([
              { to: "/shopify", label: { es: "Shopify con IA", en: "Shopify with AI", de: "Shopify mit KI", pt: "Shopify com IA" } },
              { to: "/agentes", label: { es: "Agentes de IA", en: "AI Agents", de: "KI-Agenten", pt: "Agentes de IA" } },
              { to: "/work", label: { es: "Casos", en: "Work", de: "Cases", pt: "Casos" } },
            ] as const).map((l) => (
              <RouterLink
                key={l.to}
                to={`${language === "es" ? "" : `/${language}`}${l.to}`}
                className="font-clash text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
                style={{ color: textSubtle }}
                onMouseEnter={(e) => { e.currentTarget.style.color = textMuted; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = textSubtle; }}
              >
                {l.label[language]}
              </RouterLink>
            ))}
          </div>

          {/* Right — socials, discreet */}
          <div className="flex items-center gap-8">
            <a
              href="https://www.instagram.com/monza.lab/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram — @monza.lab"
              className="font-clash text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
              style={{ color: textSubtle }}
              onMouseEnter={(e) => { e.currentTarget.style.color = textMuted; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = textSubtle; }}
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/edgarnavarrosoto/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn — Edgar Navarro"
              className="font-clash text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
              style={{ color: textSubtle }}
              onMouseEnter={(e) => { e.currentTarget.style.color = textMuted; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = textSubtle; }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default FooterMinimal;
