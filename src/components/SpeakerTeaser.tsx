import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeContext";

const edgarSpeaking = "/images/Speaker/15474a8a-40f8-4533-b39d-20a91fb73992.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

const SpeakerTeaser = () => {
  const { theme } = useTheme();
  const bg = theme === "modena" ? "#F5F0EB" : "#0B0B10";

  return (
    <section className="relative w-full overflow-hidden border-t border-white/[0.04]" style={{ height: "70vh", minHeight: "480px" }}>

      {/* Photo — full bleed with Ken Burns */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${edgarSpeaking})`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          filter: "brightness(0.38) saturate(0.7)",
          animation: "kenburns 14s ease-in-out infinite alternate",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.05,
        }}
      />

      {/* Bottom fade — theme-aware */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
        style={{ background: `linear-gradient(to top, ${bg}, transparent)` }}
      />

      {/* Top fade — theme-aware */}
      <div
        className="absolute top-0 left-0 right-0 h-20 z-[2] pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${bg}55, transparent)` }}
      />

      {/* Content — centered editorial */}
      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-[10px] uppercase tracking-[0.5em] text-[#F8B4D9]/50 mb-8"
        >
          Speaker
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="font-clash text-[#FFFCF7] leading-[1.0] tracking-[-0.02em] mb-10"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
        >
          En escenario.
        </motion.h2>

        <motion.a
          href="/speaker"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#F8B4D9]/60 hover:text-[#F8B4D9] transition-colors duration-500 group"
        >
          Ver página de speaker
          <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
        </motion.a>
      </div>

      <style>{`
        @keyframes kenburns {
          from { transform: scale(1.0) translateY(0px); }
          to   { transform: scale(1.06) translateY(-8px); }
        }
      `}</style>
    </section>
  );
};

export default SpeakerTeaser;
