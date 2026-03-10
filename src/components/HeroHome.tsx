import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import HelmetIcon from "./HelmetIcon";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { useTheme } from "@/theme/ThemeContext";

/* ── Public transparent PNGs ── */
const EDGAR_HELMET  = "/images/Edgar/2.png"; // MONZA pink helmet, transparent bg
const EDGAR_GLASSES = "/images/Edgar/1.png"; // editorial sunglasses, transparent bg

/* ── Spotlight config ── */
const SPOTLIGHT_RADIUS_DESKTOP = 380;
const SPOTLIGHT_RADIUS_MOBILE  = 240;
const LERP_SPEED     = 0.08;
const RING_LERP      = 0.06;
const RING_SIZE      = 48;
const FADE_IN_SPEED  = 0.06;
const FADE_OUT_SPEED = 0.03;
const HINT_DELAY     = 2000;
const HINT_DURATION  = 2500;

/*
  Eye anchor points calibrated to new images (fraction of image 0-1):
  - Helmet (2.png): eyes inside visor, slightly below center
  - Glasses (1.png): eyes behind lenses, upper third
*/
const HELMET_EYES  = { x: 0.50, y: 0.48 };
const GLASSES_EYES = { x: 0.50, y: 0.44 };

const HeroHome = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef    = useRef<HTMLDivElement>(null);
  const baseRef      = useRef<HTMLDivElement>(null);
  const glassesRef   = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number | null>(null);

  const targetRef  = useRef({ x: -9999, y: -9999 });
  const currentRef = useRef({ x: -9999, y: -9999 });
  const ringPosRef = useRef({ x: -9999, y: -9999 });
  const opacityRef  = useRef(0);
  const isActiveRef = useRef(false);
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hintShownRef = useRef(false);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [touchHintVisible, setTouchHintVisible] = useState(true);
  const touchedOnce = useRef(false);
  const { theme } = useTheme();
  const isModena = theme === "modena";

  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  /* Logo cross-fade refs */
  const mTextRef       = useRef<HTMLSpanElement>(null);
  const nzaTextRef     = useRef<HTMLSpanElement>(null);
  const helmetSolidRef = useRef<HTMLDivElement>(null);
  const helmetGhostRef = useRef<HTMLDivElement>(null);

  /* Reset wordmark on theme toggle */
  useEffect(() => {
    const initColor = isModena ? "rgba(11,11,16,0.85)" : "rgba(255,252,247,0.80)";
    if (mTextRef.current) {
      mTextRef.current.style.color = initColor;
      mTextRef.current.style.webkitTextStroke = "0px transparent";
    }
    if (nzaTextRef.current) {
      nzaTextRef.current.style.color = initColor;
      nzaTextRef.current.style.webkitTextStroke = "0px transparent";
    }
    if (helmetSolidRef.current) helmetSolidRef.current.style.opacity = "1";
    if (helmetGhostRef.current) helmetGhostRef.current.style.opacity = "0";
    opacityRef.current  = 0;
    isActiveRef.current = false;
    if (revealRef.current) {
      revealRef.current.style.opacity = "0";
      revealRef.current.style.maskImage = "none";
      (revealRef.current.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = "none";
    }
  }, [theme, isModena]);

  const isMobile  = () => window.innerWidth < 768;
  const getRadius = () =>
    isMobile() ? SPOTLIGHT_RADIUS_MOBILE : SPOTLIGHT_RADIUS_DESKTOP;

  /* Align both photos so eyes sit at the same screen position */
  const alignImages = useCallback(() => {
    const container = containerRef.current;
    const base      = baseRef.current;
    const glasses   = glassesRef.current;
    if (!container || !base || !glasses) return;

    const cw = container.offsetWidth;
    const ch = container.offsetHeight;

    const eyeTargetX = cw * 0.50;
    const eyeTargetY = ch * 0.68;

    /* Helmet photo — sized to viewport height so it never blows up on wide screens */
    const helmetSize = ch * 0.82;
    base.style.backgroundSize     = `${helmetSize}px ${helmetSize}px`;
    base.style.backgroundPosition = `${eyeTargetX - HELMET_EYES.x * helmetSize}px ${eyeTargetY - HELMET_EYES.y * helmetSize}px`;

    /* Glasses photo — independent size, eyes anchored to same screen point */
    const glassesSize = ch * 0.78;
    glasses.style.backgroundSize     = `${glassesSize}px ${glassesSize}px`;
    glasses.style.backgroundPosition = `${eyeTargetX - GLASSES_EYES.x * glassesSize}px ${eyeTargetY - GLASSES_EYES.y * glassesSize}px`;
  }, []);

  useEffect(() => {
    alignImages();
    const observer = new ResizeObserver(alignImages);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [alignImages]);

  const applySpotlight = useCallback(() => {
    const reveal = revealRef.current;
    if (!reveal) return;
    const { x, y } = currentRef.current;
    const o = opacityRef.current;

    if (o <= 0.01) {
      reveal.style.maskImage = "none";
      (reveal.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = "none";
      reveal.style.opacity = "0";
      return;
    }

    const r    = getRadius();
    const mask = `radial-gradient(circle ${r}px at ${x}px ${y}px, rgba(0,0,0,${o}) 0%, rgba(0,0,0,${o * 0.6}) 40%, rgba(0,0,0,${o * 0.2}) 70%, transparent 100%)`;
    reveal.style.opacity = "1";
    reveal.style.maskImage = mask;
    (reveal.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = mask;
  }, []);

  const tick = useCallback(() => {
    const cur  = currentRef.current;
    const tgt  = targetRef.current;
    const ring = ringPosRef.current;

    cur.x  += (tgt.x - cur.x)  * LERP_SPEED;
    cur.y  += (tgt.y - cur.y)  * LERP_SPEED;
    ring.x += (tgt.x - ring.x) * RING_LERP;
    ring.y += (tgt.y - ring.y) * RING_LERP;

    const targetOpacity = isActiveRef.current ? 1 : 0;
    opacityRef.current += (targetOpacity - opacityRef.current) *
      (isActiveRef.current ? FADE_IN_SPEED : FADE_OUT_SPEED);

    applySpotlight();

    const o  = opacityRef.current;
    const dot   = dotRef.current;
    const ringEl = ringRef.current;
    if (dot)    { dot.style.transform    = `translate(${tgt.x}px, ${tgt.y}px) translate(-50%,-50%)`; dot.style.opacity    = String(o); }
    if (ringEl) { ringEl.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%,-50%)`; ringEl.style.opacity = String(o * 0.7); }

    /* ── Logo cross-fade ── */
    const modena = themeRef.current === "modena";
    const fillColor   = modena ? `rgba(11,11,16,${(0.85*(1-o)).toFixed(3)})` : `rgba(255,252,247,${(0.80*(1-o)).toFixed(3)})`;
    const strokeAlpha = (o * 0.75).toFixed(3);
    const strokeColor = modena
      ? `rgba(11,11,16,${strokeAlpha})`
      : `rgba(255,252,247,${strokeAlpha})`;
    [mTextRef.current, nzaTextRef.current].forEach(el => {
      if (!el) return;
      el.style.color            = o > 0.99 ? "transparent" : fillColor;
      el.style.webkitTextStroke = `2px ${strokeColor}`;
    });
    if (helmetSolidRef.current) helmetSolidRef.current.style.opacity = String(1 - o);
    if (helmetGhostRef.current) helmetGhostRef.current.style.opacity = String(o);

    if (opacityRef.current > 0.01 || isActiveRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, [applySpotlight]);

  const ensureLoop   = useCallback(() => { if (!rafRef.current) rafRef.current = requestAnimationFrame(tick); }, [tick]);
  const snapIfNeeded = useCallback(() => { if (currentRef.current.x < 0) { currentRef.current = { ...targetRef.current }; ringPosRef.current = { ...targetRef.current }; } }, []);
  const resetPositions = useCallback(() => {
    setTimeout(() => {
      if (!isActiveRef.current) {
        currentRef.current = { x: -9999, y: -9999 };
        targetRef.current  = { x: -9999, y: -9999 };
        ringPosRef.current = { x: -9999, y: -9999 };
      }
    }, 800);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile()) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    snapIfNeeded(); ensureLoop();
  }, [ensureLoop, snapIfNeeded]);

  const handleMouseEnter = useCallback(() => { if (!isMobile()) { isActiveRef.current = true;  ensureLoop(); } }, [ensureLoop]);
  const handleMouseLeave = useCallback(() => { if (!isMobile()) { isActiveRef.current = false; resetPositions(); ensureLoop(); } }, [ensureLoop, resetPositions]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isMobile()) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const t = e.touches[0];
    targetRef.current = currentRef.current = ringPosRef.current = { x: t.clientX - rect.left, y: t.clientY - rect.top };
    isActiveRef.current = true; ensureLoop();
    if (!touchedOnce.current) { touchedOnce.current = true; setTouchHintVisible(false); }
  }, [ensureLoop]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isMobile()) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const t = e.touches[0];
    targetRef.current = { x: t.clientX - rect.left, y: t.clientY - rect.top };
    ensureLoop();
  }, [ensureLoop]);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile()) return;
    isActiveRef.current = false; resetPositions(); ensureLoop();
  }, [ensureLoop, resetPositions]);

  /* Mobile hint animation */
  useEffect(() => {
    if (!isMobile()) return;
    hintTimerRef.current = setTimeout(() => {
      if (hintShownRef.current) return;
      hintShownRef.current = true;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.width / 2, cy = rect.height * 0.52;
      targetRef.current = currentRef.current = ringPosRef.current = { x: cx, y: cy };
      isActiveRef.current = true; ensureLoop();
      setTimeout(() => { isActiveRef.current = false; resetPositions(); ensureLoop(); }, HINT_DURATION);
    }, HINT_DELAY);
    return () => { if (hintTimerRef.current) clearTimeout(hintTimerRef.current); };
  }, [ensureLoop, resetPositions]);

  useEffect(() => { const t = setTimeout(() => setIsLoaded(true), 100); return () => clearTimeout(t); }, []);
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const mobile = useMemo(() => typeof window !== "undefined" && window.innerWidth < 768, []);
  const sectionBg    = isModena ? "#F5F0EB" : "#0B0B10";
  const ctaColor     = isModena ? "rgba(11,11,16,0.75)"  : "rgba(255,252,247,0.60)";
  const cornerBorder = isModena ? "rgba(11,11,16,0.12)"  : "rgba(255,255,255,0.10)";
  const revealBg     = isModena ? "#F5F0EB" : "#0B0B10";

  return (
    <section
      className={`relative h-[100svh] w-full overflow-hidden ${mobile ? "" : "cursor-none"}`}
      style={{ backgroundColor: sectionBg }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Interactive hero — hover or touch to reveal"
    >
      {/* ── Photo layer ── */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0"
      >
        {/*
          BASE — Edgar with MONZA helmet (transparent PNG, adapts to both themes)
          Enzo:   looks cinematic on dark
          Modena: pink helmet looks premium on cream
        */}
        <div
          ref={baseRef}
          className="absolute inset-0"
          style={{
            backgroundImage:  `url(${EDGAR_HELMET})`,
            backgroundRepeat: "no-repeat",
            filter: isModena ? "brightness(0.97)" : "brightness(0.80)",
          }}
        />

        {/*
          REVEAL — Edgar with glasses (revealed on hover/touch)
          Always sits on the correct bg color (dark in Enzo, cream in Modena)
        */}
        <div
          ref={revealRef}
          className="absolute inset-0"
          style={{ opacity: 0, maskImage: "none" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: revealBg }} />
          <div
            ref={glassesRef}
            className="absolute inset-0"
            style={{
              backgroundImage:  `url(${EDGAR_GLASSES})`,
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Grain texture */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            opacity:      isModena ? 0.02 : 0.05,
            mixBlendMode: "overlay",
          }}
        />

        {/* Cursor ring */}
        {!mobile && (
          <>
            <div ref={ringRef} className="pointer-events-none absolute top-0 left-0 z-30"
              style={{ width: RING_SIZE, height: RING_SIZE, borderRadius: "50%", border: "1.5px solid #F8B4D9", boxShadow: "0 0 14px 3px rgba(248,180,217,0.2)", opacity: 0, willChange: "transform, opacity" }} />
            <div ref={dotRef}  className="pointer-events-none absolute top-0 left-0 z-30"
              style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#F8B4D9", boxShadow: "0 0 10px 3px rgba(248,180,217,0.35)", opacity: 0, willChange: "transform, opacity" }} />
          </>
        )}
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 z-[5] pointer-events-none"
        style={{
          height: "40%",
          background: isModena
            ? "linear-gradient(to top, #F5F0EB 0%, rgba(245,240,235,0.8) 35%, rgba(245,240,235,0.2) 70%, transparent 100%)"
            : "linear-gradient(to top, #0B0B10 0%, rgba(11,11,16,0.6) 35%, rgba(11,11,16,0.1) 70%, transparent 100%)",
        }}
      />

      {/* ── MONZA wordmark ── */}
      <div className="absolute inset-0 z-[6] flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center font-clash"
          style={{ gap: 0 }}
        >
          <motion.span
            ref={mTextRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-[15vw] md:text-[10vw] lg:text-[8vw] font-bold leading-none select-none"
            style={{ letterSpacing: "-0.02em", color: isModena ? "rgba(11,11,16,0.85)" : "rgba(255,252,247,0.80)" }}
          >M</motion.span>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative text-[15vw] md:text-[10vw] lg:text-[8vw] leading-none"
            style={{ width: "0.73em", height: "0.73em", marginLeft: "0.02em", marginRight: "0.01em", alignSelf: "center" }}
          >
            <div ref={helmetSolidRef} className="absolute inset-0">
              <HelmetIcon variant="solid" shellColor={isModena ? "#0B0B10" : "#F8B4D9"} visorColor={isModena ? "#F8B4D9" : "#1a1a2a"} className="w-full h-full" />
            </div>
            <div ref={helmetGhostRef} className="absolute inset-0" style={{ opacity: 0 }}>
              <HelmetIcon
                variant="ghost"
                shellColor={isModena ? "rgba(11,11,16,0.75)" : "rgba(255,252,247,0.70)"}
                visorColor="#F8B4D9"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          <motion.span
            ref={nzaTextRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-[15vw] md:text-[10vw] lg:text-[8vw] font-bold leading-none select-none"
            style={{ letterSpacing: "-0.02em", color: isModena ? "rgba(11,11,16,0.85)" : "rgba(255,252,247,0.80)" }}
          >NZA</motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-4 md:mt-6 h-5 md:h-7 flex items-center justify-center px-4 overflow-hidden"
        >
          <TypewriterEffectSmooth
            words={[
              { text: mobile ? "AI STUDIO" : "AI-NATIVE CREATIVE STUDIO" },
              { text: "COMPANY BUILDER"                                   },
              { text: mobile ? "BUILT DIFFERENT" : "FOR AMBITIOUS BRANDS" },
              { text: mobile ? "BRAND · TECH · AI" : "BRAND · TECH · BUSINESS" },
              { text: "BUILT DIFFERENT"                                   },
            ]}
            className="text-[9px] md:text-sm font-medium tracking-[0.2em] md:tracking-[0.25em] uppercase text-[#F8B4D9]/70 font-clash whitespace-nowrap"
            cursorClassName="bg-[#F8B4D9]/40"
            config={{ typingSpeed: 60, deletingSpeed: 30, pauseBetweenPhrases: 1400 }}
          />
        </motion.div>

        {/* Mobile touch hint */}
        {mobile && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isLoaded && touchHintVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="mt-6 flex flex-col items-center gap-2 pointer-events-none"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full border border-[#F8B4D9]/30 flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#F8B4D9]/60" />
            </motion.div>
            <span className="font-clash text-[9px] uppercase tracking-[0.35em] text-[#F8B4D9]/35">
              Touch to reveal
            </span>
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 1.5 }}
        className="absolute bottom-8 md:bottom-12 left-0 right-0 z-10 flex justify-center pointer-events-auto"
      >
        <a
          href="#work"
          className="group inline-flex items-center gap-3 text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase transition-colors duration-300"
          style={{ color: ctaColor }}
          onMouseEnter={e => (e.currentTarget.style.color = "#F8B4D9")}
          onMouseLeave={e => (e.currentTarget.style.color = ctaColor)}
        >
          Ver el trabajo
          <span className="inline-block w-8 h-px bg-current transition-all duration-300 group-hover:w-14" />
        </a>
      </motion.div>

      {/* Corner marks */}
      <motion.div initial={{ opacity: 0 }} animate={isLoaded ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 1 }}
        className="absolute top-8 right-6 md:right-10 z-10 w-5 h-5 md:w-6 md:h-6 border-t border-r" style={{ borderColor: cornerBorder }} />
      <motion.div initial={{ opacity: 0 }} animate={isLoaded ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute top-8 left-6 md:left-10 z-10 w-5 h-5 md:w-6 md:h-6 border-t border-l" style={{ borderColor: cornerBorder }} />

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={isLoaded ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-6 md:left-10 z-10 pointer-events-none">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: isModena ? "linear-gradient(to bottom, transparent, rgba(11,11,16,0.20), transparent)" : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.20), transparent)" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroHome;
