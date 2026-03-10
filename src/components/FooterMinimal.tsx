import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HelmetIcon from "./HelmetIcon";
import { useTheme } from "@/theme/ThemeContext";

const EASE = [0.16, 1, 0.3, 1] as const;

const FooterMinimal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { theme } = useTheme();
  const isModena = theme === "modena";

  return (
    <footer
      ref={ref}
      className="relative py-32 md:py-44 overflow-hidden border-t border-white/[0.04]"
      style={{ background: "transparent" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(248,180,217,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-[700px] px-6 text-center relative z-10">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-clash text-[10px] tracking-[0.5em] uppercase text-[#F8B4D9]/30 mb-8"
        >
          Disponibilidad limitada
        </motion.p>

        {/* Big headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
          className="font-clash font-bold leading-[1.0] tracking-[-0.02em] mb-6"
          style={{
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            color: `rgba(var(--text-rgb), 0.88)`,
          }}
        >
          Proyectos<br />seleccionados.
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="text-[13px] mb-12 max-w-sm mx-auto leading-relaxed"
          style={{ color: `rgba(var(--text-rgb), 0.30)` }}
        >
          No acepto todo. Si crees que hay algo que construir juntos, agenda aquí.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
        >
          <a
            href="https://calendar.notion.so/meet/monzaedgar/monzastudiopro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-clash text-[11px] tracking-[0.3em] uppercase px-8 py-3.5 rounded-full transition-all duration-400 hover:-translate-y-[2px]"
            style={{
              background: "rgba(248,180,217,0.07)",
              border: "1px solid rgba(248,180,217,0.20)",
              color: "rgba(248,180,217,0.80)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(248,180,217,0.13)";
              e.currentTarget.style.borderColor = "rgba(248,180,217,0.40)";
              e.currentTarget.style.color = "#F8B4D9";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(248,180,217,0.07)";
              e.currentTarget.style.borderColor = "rgba(248,180,217,0.20)";
              e.currentTarget.style.color = "rgba(248,180,217,0.80)";
            }}
          >
            Solicitar una sesión
            <span className="text-[#F8B4D9]/40">→</span>
          </a>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 md:mt-32 flex items-center justify-center gap-8"
        >
          <div className="w-4 h-4">
            <HelmetIcon
              variant="ghost"
              shellColor={isModena ? "rgba(11,11,16,0.18)" : "rgba(255,252,247,0.12)"}
              visorColor={isModena ? "rgba(11,11,16,0.10)" : "rgba(255,252,247,0.06)"}
              className="w-full h-full"
            />
          </div>

          <span
            className="font-clash text-[9px] tracking-[0.35em] uppercase"
            style={{ color: `rgba(var(--text-rgb), 0.15)` }}
          >
            © 2026 Monza Lab
          </span>

          <a
            href="https://www.linkedin.com/in/edgarnavarrosoto/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-clash text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[#F8B4D9]"
            style={{ color: `rgba(var(--text-rgb), 0.25)` }}
          >
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/monzalab/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-clash text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[#F8B4D9]"
            style={{ color: `rgba(var(--text-rgb), 0.25)` }}
          >
            Instagram
          </a>
        </motion.div>

      </div>
    </footer>
  );
};

export default FooterMinimal;
