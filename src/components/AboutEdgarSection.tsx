import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import edgarEditorial from "@/assets/edgar-editorial-pink.png";
import { useTheme } from "@/theme/ThemeContext";

// Terminal-style typing lines
const LINES = [
  { prefix: "name", value: '"Edgar Navarro Soto"', delay: 0, isName: true },
  { prefix: "role", value: '"Company Builder × Creative Director"', delay: 0.6, isName: false },
  { prefix: "prev", value: '"Innovation Lead @ KPMG"', delay: 1.2, isName: false },
  { prefix: "built", value: '"Bavarian Econs → Forbes Feature"', delay: 1.8, isName: false },
  { prefix: "now", value: '"Founder @ Monza Lab"', delay: 2.4, isName: false },
  { prefix: "method", value: '"7-day sprints. Ship or die."', delay: 3.0, isName: false },
  { prefix: "stack", value: '"Strategy + Design + Tech + AI"', delay: 3.6, isName: false },
];

const TypingLine = ({
  prefix,
  value,
  delay,
  isInView,
  isName,
  onHoverName,
  isModena,
}: {
  prefix: string;
  value: string;
  delay: number;
  isInView: boolean;
  isName: boolean;
  onHoverName: (hovering: boolean, rect: DOMRect | null) => void;
  isModena: boolean;
}) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;
    const startTimer = setTimeout(() => {
      setStarted(true);
      setShowCursor(true);
    }, delay * 1000);
    return () => clearTimeout(startTimer);
  }, [isInView, delay]);

  useEffect(() => {
    if (!started) return;
    const fullText = value;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 600);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [started, value]);

  const textColor = isModena ? "rgba(11,11,16,0.65)" : "rgba(255,252,247,0.55)";
  const colonColor = isModena ? "rgba(11,11,16,0.25)" : "rgba(255,252,247,0.15)";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={started ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3 }}
      className="flex items-baseline gap-0 font-mono text-[11px] md:text-[13px] leading-[2.2]"
    >
      <span className="text-[#F8B4D9]/50 select-none mr-1">{">"}</span>
      <span className="text-[#F8B4D9]/70 font-medium">{prefix}</span>
      <span className="mx-1.5" style={{ color: colonColor }}>:</span>
      <span
        ref={valueRef}
        className={isName ? "cursor-pointer transition-colors duration-300" : ""}
        style={{ color: textColor }}
        onMouseEnter={() => {
          if (isName && valueRef.current) {
            onHoverName(true, valueRef.current.getBoundingClientRect());
          }
        }}
        onMouseLeave={() => {
          if (isName) onHoverName(false, null);
        }}
      >
        {displayed}
      </span>
      {showCursor && (
        <span className="inline-block w-[6px] h-[14px] bg-[#F8B4D9]/70 ml-[1px] animate-pulse" />
      )}
    </motion.div>
  );
};

const AboutEdgarSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const [photoVisible, setPhotoVisible] = useState(false);
  const [photoPos, setPhotoPos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isModena = theme === "modena";

  const handleHoverName = (hovering: boolean, rect: DOMRect | null) => {
    setPhotoVisible(hovering);
    if (rect) {
      setPhotoPos({
        x: rect.left + rect.width / 2,
        y: rect.top - 12,
      });
    }
  };

  const boxBg     = isModena ? "rgba(11,11,16,0.04)"  : "rgba(255,252,247,0.015)";
  const boxBorder = isModena ? "rgba(11,11,16,0.10)"  : "rgba(255,252,247,0.04)";
  const dimText   = isModena ? "rgba(11,11,16,0.30)"  : "rgba(255,252,247,0.15)";
  const muteText  = isModena ? "rgba(11,11,16,0.20)"  : "rgba(255,252,247,0.10)";
  const divider   = isModena ? "rgba(11,11,16,0.08)"  : "rgba(255,252,247,0.04)";

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(248,180,217,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(248,180,217,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto w-full max-w-[900px] px-6 relative z-10">
        {/* Tag — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#F8B4D9]/40 font-medium">
            THE BUILDER
          </p>
        </motion.div>

        {/* Terminal typing block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-xl p-6 md:p-10"
          style={{
            background: boxBg,
            border: `1px solid ${boxBorder}`,
          }}
        >
          {/* Terminal header dots */}
          <div className="flex items-center gap-1.5 mb-6 md:mb-8">
            <div className="w-2 h-2 rounded-full bg-[#FF6B6B]/30" />
            <div className="w-2 h-2 rounded-full bg-[#C4A35A]/30" />
            <div className="w-2 h-2 rounded-full bg-[#4ECDC4]/30" />
            <span className="ml-3 font-mono text-[9px] md:text-[10px] tracking-wider uppercase" style={{ color: dimText }}>
              edgar.config
            </span>
          </div>

          {/* Typing lines */}
          <div className="space-y-0">
            {LINES.map((line) => (
              <TypingLine
                key={line.prefix}
                prefix={line.prefix}
                value={line.value}
                delay={line.delay}
                isInView={isInView}
                isName={line.isName}
                onHoverName={handleHoverName}
                isModena={isModena}
              />
            ))}
          </div>

          {/* Hint for photo hover */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 4.5 }}
            className="mt-6 font-mono text-[9px] italic"
            style={{ color: muteText }}
          >
            // hover name to reveal
          </motion.p>

          {/* Bottom status bar */}
          <div className="mt-6 pt-4 flex items-center justify-between" style={{ borderTop: `1px solid ${divider}` }}>
            <div className="flex items-center gap-4">
              {["KPMG", "Forbes", "Bavarian Econs"].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[8px] md:text-[9px] tracking-[0.15em] uppercase"
                  style={{ color: dimText }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/edgarnavarrosoto/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[8px] md:text-[9px] tracking-[0.1em] uppercase hover:text-[#F8B4D9]/50 transition-colors duration-300"
                style={{ color: dimText }}
              >
                LI
              </a>
              <a
                href="https://www.instagram.com/monzalab/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[8px] md:text-[9px] tracking-[0.1em] uppercase hover:text-[#F8B4D9]/50 transition-colors duration-300"
                style={{ color: dimText }}
              >
                IG
              </a>
              <span className="font-mono text-[8px] md:text-[9px] text-[#4ECDC4]/30">
                ● online
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating photo — appears on hover over name */}
      <AnimatePresence>
        {photoVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[60] pointer-events-none"
            style={{
              left: photoPos.x,
              top: photoPos.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="relative">
              <div
                className="absolute inset-0 blur-[30px] opacity-30"
                style={{ background: "#F8B4D9" }}
              />
              <div
                className="relative w-[140px] h-[180px] md:w-[180px] md:h-[230px] overflow-hidden"
                style={{ clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)" }}
              >
                <img
                  src={edgarEditorial}
                  alt="Edgar Navarro"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "brightness(0.9) contrast(1.1) saturate(0.9)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(248,180,217,0.08) 100%)" }}
                />
              </div>
              <p className="text-center mt-2 font-mono text-[8px] text-[#F8B4D9]/40 tracking-wider uppercase">
                Barranquilla, CO
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutEdgarSection;
