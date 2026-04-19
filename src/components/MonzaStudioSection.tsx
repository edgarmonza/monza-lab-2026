import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "@/theme/ThemeContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * MONZA STUDIO — Visual moodboard (gallery + lightbox).
 *
 * Filosofía: no vender. Mostrar. Que la gente diga "qué cool la marca".
 *
 * - Masonry layout con column-count CSS (se acomoda natural al aspect de cada foto)
 * - Hover cinematográfico: scale + overlay + subtle info reveal
 * - Click: lightbox full-screen premium con keyboard navigation
 *
 * Para agregar fotos: pon en `/public/images/studio/{fashion|automotive}/` y añade al array IMAGES.
 */

type StudioImage = {
  src: string;
  alt: string;
  category: "fashion" | "automotive";
};

const IMAGES: StudioImage[] = [
  { src: "/images/studio/fashion/01-frontal-intense.jpg", alt: "Cascos Colaboraciones — frontal intense", category: "fashion" },
  { src: "/images/studio/automotive/01-wheel-hero.jpg", alt: "BMW E30 — wheel hero detail", category: "automotive" },
  { src: "/images/studio/fashion/06-falda-johanna-ortiz.jpg", alt: "Johanna Ortiz — falda editorial", category: "fashion" },
  { src: "/images/studio/automotive/02-side-profile.jpg", alt: "BMW E30 — side profile", category: "automotive" },
  { src: "/images/studio/fashion/08-helmet-burgundy.jpg", alt: "Monza Helmet — editorial burgundy", category: "fashion" },
  { src: "/images/studio/fashion/05-luxury.jpg", alt: "Fashion editorial — luxury", category: "fashion" },
  { src: "/images/studio/automotive/03-front-wipers.jpg", alt: "BMW E30 — front low", category: "automotive" },
  { src: "/images/studio/fashion/07-blusa-kika-vargas.jpg", alt: "Kika Vargas — blusa editorial", category: "fashion" },
  { src: "/images/studio/fashion/03-chin-up.jpg", alt: "Cascos Colaboraciones — chin up power", category: "fashion" },
];

const eyebrowContent = {
  es: "MONZA STUDIO",
  en: "MONZA STUDIO",
  de: "MONZA STUDIO",
};

const taglineContent = {
  es: "Fashion. Automotive. Obsesión.",
  en: "Fashion. Automotive. Obsession.",
  de: "Fashion. Automotive. Obsession.",
};

const MonzaStudioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { theme } = useTheme();
  const isModena = theme === "modena";
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const textPrimary = isModena ? "rgba(11,11,16,0.92)" : "rgba(255,252,247,0.92)";
  const textMuted = isModena ? "rgba(11,11,16,0.45)" : "rgba(255,252,247,0.45)";

  // Keyboard navigation for lightbox
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % IMAGES.length));
  }, []);
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length));
  }, []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, nextImage, prevImage, closeLightbox]);

  return (
    <>
      <section
        ref={sectionRef}
        id="studio"
        aria-labelledby="studio-heading"
        className="relative py-32 md:py-44 overflow-hidden"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 relative z-10">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center gap-4 mb-10 md:mb-14"
          >
            <div
              className="h-px flex-none w-10"
              style={{ background: "rgba(248,180,217,0.85)" }}
            />
            <p
              id="studio-heading"
              className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase"
              style={{ color: "rgba(248,180,217,0.85)" }}
            >
              {eyebrowContent[language]}
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
            className="font-clash font-bold leading-[1.05] mb-14 md:mb-24 max-w-[900px]"
            style={{
              letterSpacing: "-0.025em",
              color: textPrimary,
              fontSize: "clamp(26px, 5.5vw, 64px)",
            }}
          >
            {taglineContent[language]}
          </motion.h2>

          {/* Masonry gallery — natural aspect ratios, editorial rhythm */}
          <div
            className="gallery-masonry"
            style={{
              columnCount: 2,
              columnGap: "12px",
            }}
          >
            {IMAGES.map((img, i) => (
              <motion.figure
                key={img.src}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.85,
                  delay: 0.18 + i * 0.05,
                  ease: EASE,
                }}
                className="group relative mb-3 break-inside-avoid overflow-hidden rounded-sm cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-[1.8s] ease-out group-hover:scale-[1.04]"
                />

                {/* Hover overlay — subtle, editorial */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)",
                  }}
                />

                {/* Category micro-label on hover, bottom-right */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-1 group-hover:translate-y-0 pointer-events-none">
                  <span
                    className="font-clash text-[9px] tracking-[0.35em] uppercase"
                    style={{ color: "rgba(255,252,247,0.85)" }}
                  >
                    {img.category}
                  </span>
                </div>

                {/* Tiny "VIEW" badge top-left on hover */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-1 group-hover:translate-y-0 pointer-events-none">
                  <span
                    className="inline-block font-clash text-[9px] tracking-[0.4em] uppercase px-2 py-1 rounded-sm"
                    style={{
                      color: "rgba(248,180,217,0.95)",
                      background: "rgba(11,11,16,0.35)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                    }}
                  >
                    View
                  </span>
                </div>
              </motion.figure>
            ))}
          </div>

          {/* Responsive: 3 columns on tablet, 4 on desktop */}
          <style>{`
            @media (min-width: 768px) {
              .gallery-masonry { column-count: 3 !important; column-gap: 14px !important; }
            }
            @media (min-width: 1100px) {
              .gallery-masonry { column-count: 4 !important; column-gap: 16px !important; }
            }
          `}</style>

          {/* Capabilities — editorial single-row line, replaces old CapabilitiesSection */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="mt-20 md:mt-28 pt-10 md:pt-14"
            style={{ borderTop: `1px solid ${isModena ? "rgba(11,11,16,0.08)" : "rgba(255,252,247,0.08)"}` }}
          >
            <p
              className="font-clash text-[9px] md:text-[10px] tracking-[0.4em] uppercase mb-6 md:mb-8"
              style={{ color: textMuted }}
            >
              Capabilities
            </p>
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 md:gap-x-5">
              {(() => {
                const allCaps: Array<{ label: { es: string; en: string; de: string }; mobileHide?: boolean }> = [
                  { label: { es: "Brand systems", en: "Brand systems", de: "Brand Systems" } },
                  { label: { es: "Digital experiences", en: "Digital experiences", de: "Digital Experiences" } },
                  { label: { es: "Contenido", en: "Content", de: "Content" }, mobileHide: true },
                  { label: { es: "Pauta", en: "Ads", de: "Ads" }, mobileHide: true },
                  { label: { es: "AI", en: "AI", de: "AI" } },
                ];
                const visible = isMobile ? allCaps.filter((c) => !c.mobileHide) : allCaps;
                return visible.map((cap, i, arr) => (
                  <li key={cap.label.en} className="flex items-center gap-3 md:gap-5">
                    <span
                      className="font-clash text-[12px] md:text-[16px] lg:text-[20px] font-bold tracking-[-0.02em]"
                      style={{ color: textPrimary }}
                    >
                      {cap.label[language]}
                    </span>
                    {i < arr.length - 1 && (
                      <span
                        className="font-clash text-[12px] md:text-[16px] lg:text-[20px] font-bold select-none"
                        style={{ color: "rgba(248,180,217,0.85)" }}
                        aria-hidden="true"
                      >
                        ·
                      </span>
                    )}
                  </li>
                ));
              })()}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[90] flex items-center justify-center"
            style={{
              background: isModena ? "rgba(245,240,235,0.98)" : "rgba(8,8,12,0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              aria-label="Close lightbox"
              className="absolute top-6 right-6 md:top-10 md:right-10 w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: isModena ? "rgba(11,11,16,0.06)" : "rgba(255,252,247,0.06)",
                border: `1px solid ${isModena ? "rgba(11,11,16,0.12)" : "rgba(255,252,247,0.12)"}`,
                color: textPrimary,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous image"
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: isModena ? "rgba(11,11,16,0.06)" : "rgba(255,252,247,0.06)",
                border: `1px solid ${isModena ? "rgba(11,11,16,0.12)" : "rgba(255,252,247,0.12)"}`,
                color: textPrimary,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next image"
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: isModena ? "rgba(11,11,16,0.06)" : "rgba(255,252,247,0.06)",
                border: `1px solid ${isModena ? "rgba(11,11,16,0.12)" : "rgba(255,252,247,0.12)"}`,
                color: textPrimary,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Image container */}
            <motion.div
              key={IMAGES[lightboxIndex].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative max-w-[92vw] max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={IMAGES[lightboxIndex].src}
                alt={IMAGES[lightboxIndex].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-sm"
                style={{ boxShadow: isModena ? "0 24px 64px -16px rgba(11,11,16,0.25)" : "0 24px 64px -16px rgba(0,0,0,0.6)" }}
              />

              {/* Counter + category */}
              <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-between">
                <span
                  className="font-clash text-[10px] tracking-[0.35em] uppercase"
                  style={{ color: "rgba(248,180,217,0.85)" }}
                >
                  {IMAGES[lightboxIndex].category}
                </span>
                <span
                  className="font-mono text-[10px] tracking-[0.1em]"
                  style={{ color: textMuted }}
                >
                  {String(lightboxIndex + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MonzaStudioSection;
