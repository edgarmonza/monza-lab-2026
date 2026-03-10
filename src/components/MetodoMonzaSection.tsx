import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LOOP_PATH =
  "M 50 50 C 50 22, 75 22, 100 50 C 125 78, 150 78, 150 50 C 150 22, 125 22, 100 50 C 75 78, 50 78, 50 50";

const MetodoMonzaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="metodo"
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="mx-auto w-full max-w-[900px] px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <p className="font-clash text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#F8B4D9]/50 font-medium mb-6">
            HOW WE BUILD
          </p>
          <h2
            className="font-clash text-[10vw] md:text-[6vw] lg:text-[4.5vw] font-bold leading-[1.05]"
            style={{ letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.80)" }}
          >
            Vision. Build. Ship.
            <br />
            <span className="text-[#F8B4D9]/80">Learn. Scale.</span>
          </h2>
        </motion.div>

        {/* The Loop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative w-full max-w-[500px] mx-auto"
        >
          <svg viewBox="0 0 200 100" className="w-full" aria-hidden="true">
            <defs>
              <linearGradient id="wormGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F8B4D9" stopOpacity="0" />
                <stop offset="50%" stopColor="#F8B4D9" stopOpacity="1" />
                <stop offset="100%" stopColor="#F8B4D9" stopOpacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>

            {/* Track */}
            <path
              d={LOOP_PATH}
              pathLength={1}
              fill="none"
              style={{ stroke: "rgba(var(--text-rgb), 0.07)" }}
              strokeWidth="1"
            />

            {/* Glow */}
            <path
              d={LOOP_PATH}
              pathLength={1}
              fill="none"
              stroke="#F8B4D9"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="0.15 0.85"
              strokeOpacity="0.15"
              filter="url(#glow)"
              style={{ animation: "monzaWormFlow 4s linear infinite" }}
            />

            {/* Worm */}
            <path
              d={LOOP_PATH}
              pathLength={1}
              fill="none"
              stroke="url(#wormGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="0.15 0.85"
              style={{ animation: "monzaWormFlow 4s linear infinite" }}
            />
          </svg>

          {/* Center ∞ */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-2xl md:text-5xl font-clash font-bold"
              style={{ color: "rgba(var(--text-rgb), 0.10)" }}
            >
              ∞
            </span>
          </div>
        </motion.div>

        {/* One-liner */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center font-clash text-xs md:text-sm tracking-[0.2em] uppercase mt-16 md:mt-20"
          style={{ color: "rgba(var(--text-rgb), 0.25)" }}
        >
          7 días. 1 sprint. Sin parar.
        </motion.p>

      </div>
    </section>
  );
};

export default MetodoMonzaSection;
