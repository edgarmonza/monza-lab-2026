import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const VIDEOS = [
  {
    src: "/videos/reel/IMG_0080.mp4",
    rotate: "4deg",
    border: "rgba(248,180,217,0.85)",
    coords: "48°11'N · 11°34'E",
    city: "München",
    country: "DE",
  },
  {
    src: "/videos/reel/IMG_3593.mp4",
    rotate: "-3deg",
    border: "rgba(248,180,217,0.5)",
    coords: "45°49'N · 06°39'E",
    city: "Chamonix-Mont-Blanc",
    country: "FR",
  },
  {
    src: "/videos/reel/IMG_3633.mp4",
    rotate: "5deg",
    border: "rgba(248,180,217,0.8)",
    coords: "45°49'N · 06°38'E",
    city: "Les Alpes",
    country: "FR",
  },
  {
    src: "/videos/reel/IMG_3811.mp4",
    rotate: "-2deg",
    border: "rgba(248,180,217,0.6)",
    coords: "45°51'N · 06°39'E",
    city: "Les Houches",
    country: "FR",
  },
  {
    src: "/videos/reel/IMG_8331.mp4",
    rotate: "3.5deg",
    border: "rgba(248,180,217,0.9)",
    coords: "36°35'N · 121°57'W",
    city: "Pebble Beach",
    country: "CA · USA",
  },
  {
    src: "/videos/reel/IMG_8737.mp4",
    rotate: "-4deg",
    border: "rgba(248,180,217,0.5)",
    coords: "34°09'N · 118°58'W",
    city: "Malibu",
    country: "CA · USA",
  },
];

const GlobalReel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-38%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden mt-20 md:mt-32 pt-20 md:pt-28 border-t border-white/[0.04] h-[80vh] md:h-[120vh]"
    >
      <div className="sticky top-0 h-[60vh] md:h-[70vh] flex flex-col justify-center overflow-hidden">

        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(248,180,217,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center text-[10px] uppercase tracking-[0.5em] text-[#F8B4D9]/40 mb-4 relative z-10"
        >
          Presencia Global
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          className="text-center font-clash leading-[1.0] tracking-[-0.02em] mb-3 relative z-10"
          style={{ color: "rgba(var(--text-rgb), 0.90)", fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
        >
          No deck. No pitch. Esto.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="text-center text-[13px] mb-8 relative z-10"
          style={{ color: "rgba(var(--text-rgb), 0.25)" }}
        >
          Tres continentes. Proyectos que corren hoy.
        </motion.p>

        {/* Scrolling strip */}
        <div className="relative z-10 w-full overflow-visible">
          <motion.div
            style={{ x }}
            className="flex items-end gap-4 md:gap-8 px-6 md:px-16 w-max"
          >
            {VIDEOS.map((v, i) => (
              <div key={i} style={{ transform: `rotate(${v.rotate})`, flexShrink: 0 }}>

                {/* Video card */}
                <div
                  style={{
                    border: `1.5px solid ${v.border}`,
                    borderRadius: "6px",
                    overflow: "hidden",
                    width: "clamp(110px, 28vw, 230px)",
                    aspectRatio: "9/16",
                    flexShrink: 0,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.03)",
                    position: "relative",
                  }}
                >
                  <video
                    src={v.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      backgroundColor: "#0B0B10",
                    }}
                  />

                  {/* Location overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "20px 12px 12px",
                      background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                    }}
                  >
                    <p className="font-mono text-[8px] text-[#F8B4D9]/50 tracking-[0.1em] mb-[3px]">
                      {v.coords}
                    </p>
                    <p className="font-mono text-[11px] text-[#FFFCF7]/80 tracking-[0.04em]">
                      {v.city}
                      <span className="text-[#F8B4D9]/50 ml-2">· {v.country}</span>
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default GlobalReel;
