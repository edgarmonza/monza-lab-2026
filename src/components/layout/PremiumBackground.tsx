import { ReactNode } from "react";

interface PremiumBackgroundProps {
  children: ReactNode;
  className?: string;
}

const PremiumBackground = ({ children, className = "" }: PremiumBackgroundProps) => {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Base layer - theme aware (z-index 0, behind all content) */}
      <div
        className="fixed inset-0 pointer-events-none transition-colors duration-500"
        style={{ background: "var(--surface-bg)", zIndex: 0 }}
      />

      {/* Primary accent glow - center top */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(var(--accent-rgb), 0.12) 0%, transparent 60%)`,
          zIndex: 0,
        }}
      />

      {/* Secondary accent glow - center */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(var(--accent-rgb), 0.06) 0%, transparent 50%)`,
          zIndex: 0,
        }}
      />

      {/* Cool subtle glow - bottom */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 30% at 50% 100%, rgba(120, 120, 180, 0.04) 0%, transparent 50%)",
          zIndex: 0,
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          opacity: "var(--noise-opacity)",
          zIndex: 0,
        }}
      />

      {/* Editorial rail line - left side (desktop only) */}
      <div
        className="fixed inset-y-0 left-1/2 -translate-x-[560px] w-px pointer-events-none hidden lg:block"
        style={{
          background: "var(--rail-color)",
          maskImage: "linear-gradient(to bottom, transparent 0%, white 15%, white 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, white 15%, white 85%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* Editorial rail line - right side (desktop only) */}
      <div
        className="fixed inset-y-0 left-1/2 translate-x-[560px] w-px pointer-events-none hidden lg:block"
        style={{
          background: "var(--rail-color)",
          maskImage: "linear-gradient(to bottom, transparent 0%, white 15%, white 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, white 15%, white 85%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PremiumBackground;
