import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fast spring for near-instant response
  const springConfig = { stiffness: 800, damping: 35 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      setIsVisible(true);
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        cursorX.set(lastX);
        cursorY.set(lastY);
        rafId = null;
      });
    };

    const isInteractive = (target: HTMLElement) =>
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest("a") ||
      target.closest("button") ||
      target.classList.contains("interactive") ||
      target.closest(".interactive");

    const handleMouseEnter = (e: MouseEvent) => {
      if (isInteractive(e.target as HTMLElement)) setIsHovering(true);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (isInteractive(e.target as HTMLElement)) setIsHovering(false);
    };

    const handleMouseOut = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleMouseEnter, { passive: true });
    document.addEventListener("mouseout", handleMouseLeave, { passive: true });
    document.addEventListener("mouseleave", handleMouseOut, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      document.removeEventListener("mouseleave", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      <motion.div
        className="rounded-full"
        style={{
          backgroundColor: "#F8B4D9",
          mixBlendMode: "normal",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 0.8 : 0,
          width: 20,
          height: 20,
          marginLeft: -10,
          marginTop: -10,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 },
          opacity: { duration: 0.15 },
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;
