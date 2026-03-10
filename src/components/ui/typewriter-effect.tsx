"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterConfig {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBetweenPhrases?: number;
}

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  config = {},
  lastPhraseClassName,
  highlightStyle = false,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  config?: TypewriterConfig;
  lastPhraseClassName?: string;
  highlightStyle?: boolean;
}) => {
  const {
    typingSpeed = 55,
    deletingSpeed = 35,
    pauseBetweenPhrases = 1100,
  } = config;

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(words[0]?.text || "");
      return;
    }

    const currentWord = words[currentWordIndex]?.text || "";
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseBetweenPhrases);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && displayText === currentWord) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, currentWordIndex, words, prefersReducedMotion, typingSpeed, deletingSpeed, pauseBetweenPhrases]);

  const isLastPhrase = currentWordIndex === words.length - 1;
  const currentWordClass = words[currentWordIndex]?.className || "";
  const appliedClass = isLastPhrase && lastPhraseClassName 
    ? cn(currentWordClass, lastPhraseClassName) 
    : currentWordClass;

  return (
    <div className={cn("flex items-center", className)} style={{ letterSpacing: "-0.02em" }}>
      <motion.span 
        className={cn("inline-block whitespace-nowrap", appliedClass)}
        animate={isLastPhrase && !isDeleting && displayText === words[currentWordIndex]?.text ? {
          scale: [1, 1.02, 1],
        } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {displayText}
      </motion.span>
      <motion.span
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0.6 }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className={cn(
          "inline-block rounded-sm w-[2px] h-[0.85em] ml-1",
          cursorClassName
        )}
      />
    </div>
  );
};
