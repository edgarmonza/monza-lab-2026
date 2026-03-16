"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type SpeedProfile = "ia-first" | "ya-facturas" | "corporate";

const speedConfig: Record<
  SpeedProfile,
  { duration: number; label: string; recommended: string; recommendedLink: string; comingSoon?: boolean }
> = {
  "ia-first": { duration: 3, label: "0→1 (IA-first)", recommended: "Studio 1:1", recommendedLink: "/studio" },
  "ya-facturas": { duration: 6, label: "Ya facturas", recommended: "Studio Pro", recommendedLink: "/studio-pro" },
  "corporate": { duration: 10, label: "Corporate", recommended: "Quantum", recommendedLink: "", comingSoon: true },
};

const labels = ["Criterio", "Oferta", "Sistemas", "Branding", "Growth"];

type MonzaInfiniteLoopProps = {
  className?: string;
};

export const MonzaInfiniteLoop: React.FC<MonzaInfiniteLoopProps> = ({ className }) => {
  const [speed, setSpeed] = React.useState<SpeedProfile>("ia-first");
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % labels.length);
    }, (speedConfig[speed].duration * 1000) / labels.length);

    return () => clearInterval(interval);
  }, [speed]);

  const duration = speedConfig[speed].duration;
  const currentConfig = speedConfig[speed];

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Loop container with labels */}
      <div className="relative w-full max-w-[480px] aspect-[2/1]">
        {/* Labels positioned around the loop */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top left - Criterio */}
          <span
            className={cn(
              "absolute top-[8%] left-[10%] text-xs md:text-sm font-medium tracking-wide transition-colors duration-500",
              activeIndex === 0 ? "text-primary" : "text-muted-foreground/40"
            )}
          >
            Criterio
          </span>

          {/* Top right - Oferta */}
          <span
            className={cn(
              "absolute top-[8%] right-[10%] text-xs md:text-sm font-medium tracking-wide transition-colors duration-500",
              activeIndex === 1 ? "text-primary" : "text-muted-foreground/40"
            )}
          >
            Oferta
          </span>

          {/* Right center - Sistemas */}
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2 right-0 text-xs md:text-sm font-medium tracking-wide transition-colors duration-500",
              activeIndex === 2 ? "text-primary" : "text-muted-foreground/40"
            )}
          >
            Sistemas
          </span>

          {/* Bottom center - Branding */}
          <span
            className={cn(
              "absolute bottom-[5%] left-1/2 -translate-x-1/2 text-xs md:text-sm font-medium tracking-wide transition-colors duration-500",
              activeIndex === 3 ? "text-primary" : "text-muted-foreground/40"
            )}
          >
            Branding
          </span>

          {/* Left center - Growth */}
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2 left-0 text-xs md:text-sm font-medium tracking-wide transition-colors duration-500",
              activeIndex === 4 ? "text-primary" : "text-muted-foreground/40"
            )}
          >
            Growth
          </span>
        </div>

        {/* SVG Loop */}
        <svg viewBox="0 0 200 100" className="w-full h-full" aria-hidden="true">
          <defs>
            {/* Gradient for glow effect */}
            <linearGradient id="monzaGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            </linearGradient>

            {/* Blur filter for glow */}
            <filter id="monzaBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>

          {/* Track - subtle gray */}
          <path
            d="M 50 50 
               C 50 25, 75 25, 100 50 
               C 125 75, 150 75, 150 50 
               C 150 25, 125 25, 100 50 
               C 75 75, 50 75, 50 50"
            fill="none"
            stroke="hsl(var(--muted-foreground) / 0.15)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Glow layer */}
          <path
            d="M 50 50 
               C 50 25, 75 25, 100 50 
               C 125 75, 150 75, 150 50 
               C 150 25, 125 25, 100 50 
               C 75 75, 50 75, 50 50"
            fill="none"
            stroke="url(#monzaGlow)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="40 260"
            filter="url(#monzaBlur)"
            style={{
              animation: `monzaWormFlow ${duration}s linear infinite`,
              willChange: "stroke-dashoffset",
            }}
          />

          {/* Animated worm - Monza pink */}
          <path
            d="M 50 50 
               C 50 25, 75 25, 100 50 
               C 125 75, 150 75, 150 50 
               C 150 25, 125 25, 100 50 
               C 75 75, 50 75, 50 50"
            fill="none"
            stroke="url(#monzaGlow)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="40 260"
            style={{
              animation: `monzaWormFlow ${duration}s linear infinite`,
              willChange: "stroke-dashoffset",
            }}
          />
        </svg>
      </div>

      {/* Speed selector */}
      <div className="flex flex-col items-center gap-6 mt-10">
        {/* Speed tabs */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-muted/30 border border-border/30">
          {(Object.keys(speedConfig) as SpeedProfile[]).map((key) => (
            <button
              key={key}
              onClick={() => setSpeed(key)}
              className={cn(
                "px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-300",
                speed === key ? "bg-primary/20 text-primary" : "text-muted-foreground/60 hover:text-muted-foreground"
              )}
            >
              {speedConfig[key].label}
            </button>
          ))}
        </div>

        {/* Recommendation */}
        <p className="text-sm text-muted-foreground/70">
          Recomendado: <span className="text-primary font-medium">{currentConfig.recommended}</span>
          {currentConfig.comingSoon && <span className="text-muted-foreground/50 ml-1">(coming soon)</span>}
        </p>

        {/* CTA */}
        {currentConfig.comingSoon ? (
          <button className="px-6 py-2.5 text-sm font-medium rounded-full bg-muted/40 text-muted-foreground/60 cursor-not-allowed border border-border/20">
            Notificarme
          </button>
        ) : (
          <Link
            to={currentConfig.recommendedLink}
            className="px-6 py-2.5 text-sm font-medium rounded-full bg-primary/15 border border-primary/40 text-primary hover:bg-primary/25 transition-all duration-300"
          >
            Ir a {currentConfig.recommended}
          </Link>
        )}
      </div>
    </div>
  );
};

export default MonzaInfiniteLoop;
