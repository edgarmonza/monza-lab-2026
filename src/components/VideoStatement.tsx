import { useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const EASE = [0.16, 1, 0.3, 1] as const;

const VideoStatement = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  /** Callback ref — fires every time the video element mounts (including after key change) */
  const videoCallback = useCallback((node: HTMLVideoElement | null) => {
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) node.play().catch(() => {});
        else node.pause();
      },
      { threshold: 0.25 }
    );
    obs.observe(node);
    // Also try immediate play
    node.play().catch(() => {});
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative rounded-2xl overflow-hidden"
          style={{ aspectRatio: isMobile ? "4/5" : "16/9" }}
        >
          {/* Video — reader demo: web (16:9) or mobile (4:5) */}
          <video
            ref={videoCallback}
            key={isMobile ? "mobile" : "desktop"}
            src={isMobile ? "/videos/monza-reader-mobile.mp4" : "/videos/monza-reader-demo.mp4"}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Top-left label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="absolute top-5 left-6 font-clash text-[10px] tracking-[0.35em] uppercase pointer-events-none"
            style={{ color: "rgba(255,252,247,0.35)" }}
          >
            Monza Lab — Creative Studio
          </motion.p>

          {/* Bottom-right CTA */}
          <motion.a
            href="https://calendar.notion.so/meet/monzaedgar/monzastudiopro"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="absolute bottom-5 right-6 font-clash text-[11px] tracking-[0.25em] uppercase px-4 py-2 rounded-lg transition-all duration-300"
            style={{
              color: "rgba(255,252,247,0.85)",
              background: "rgba(255,252,247,0.08)",
              border: "1px solid rgba(255,252,247,0.15)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,252,247,0.14)";
              e.currentTarget.style.borderColor = "rgba(255,252,247,0.25)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,252,247,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,252,247,0.15)";
            }}
          >
            Construyamos →
          </motion.a>

        </motion.div>
      </div>
    </section>
  );
};

export default VideoStatement;
