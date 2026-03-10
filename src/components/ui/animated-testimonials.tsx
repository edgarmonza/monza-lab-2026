"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  const bullets = (text: string) =>
    text
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

  return (
    <div className={cn("relative w-full overflow-hidden py-16 md:py-24", className)}>
      {/* subtle vignette / focus */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        {/* section header */}
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-[#F8B4D9]">
            FOUNDERS QUE YA AVANZARON
          </span>
          <h2 className="text-3xl font-bold text-[#F6F1EA] md:text-4xl">
            Lo que dicen
          </h2>
        </div>

        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          {/* photo stack */}
          <div className="relative flex h-72 items-center justify-center md:h-96">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div 
                    className={cn(
                      "relative h-full w-full overflow-visible rounded-3xl transition-shadow duration-300",
                      isActive(index) 
                        ? "border border-[rgba(248,180,217,0.55)] shadow-[0_0_20px_rgba(248,180,217,0.18)]" 
                        : "border border-[rgba(248,180,217,0.18)]"
                    )}
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* text side */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-[#F6F1EA] md:text-3xl">
                    {testimonials[active].name}
                  </h3>

                  <p className="mt-1 text-sm text-[#9CA3AF] md:text-base">
                    {testimonials[active].designation}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* bullets: executive, short */}
            <AnimatePresence mode="wait">
              <motion.ul
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-8 space-y-3"
              >
                {bullets(testimonials[active].quote).map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.25 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 text-xs text-[#F8B4D9]">●</span>
                    <span className="text-[15px] leading-relaxed text-[#E5E7EB] md:text-base">
                      {b}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>

            {/* controls */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#F8B4D9]/35 bg-black/50 transition-all duration-200 hover:border-[#F8B4D9]/70 hover:shadow-[0_0_12px_rgba(248,180,217,0.25)]"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="h-5 w-5 text-[#F6F1EA] transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={handleNext}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#F8B4D9]/35 bg-black/50 transition-all duration-200 hover:border-[#F8B4D9]/70 hover:shadow-[0_0_12px_rgba(248,180,217,0.25)]"
                aria-label="Next testimonial"
              >
                <ArrowRight className="h-5 w-5 text-[#F6F1EA] transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
