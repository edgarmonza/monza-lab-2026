import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import HelmetIcon from "./HelmetIcon";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "@/theme/ThemeContext";

type Lang = "es" | "en" | "de";

const LANGS: Lang[] = ["es", "en", "de"];

const NAV_LINKS: Record<Lang, { label: string; href: string }[]> = {
  es: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Method", href: "#metodo" },
    { label: "Speaker", href: "/speaker" },
  ],
  en: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Approach", href: "#metodo" },
    { label: "Speaker", href: "/speaker" },
  ],
  de: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Approach", href: "#metodo" },
    { label: "Speaker", href: "/speaker" },
  ],
};

const CTA_LABEL: Record<Lang, string> = {
  es: "Construyamos",
  en: "Let's build",
  de: "Let's build",
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>("es");
  const { theme } = useTheme();
  const isModena = theme === 'modena';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // In Modena: always show cream background (dark text needs light bg).
  // In Enzo: transparent at top, dark when scrolled.
  const showBg = isModena || isScrolled;

  const links = NAV_LINKS[lang];
  const cta = CTA_LABEL[lang];

  // Text colors based on theme
  const textPrimary = isModena ? 'rgba(11,11,16,0.85)' : 'rgba(255,252,247,0.85)';
  const textMuted = isModena ? 'rgba(11,11,16,0.45)' : 'rgba(255,252,247,0.30)';
  const textMutedHover = isModena ? 'rgba(11,11,16,0.80)' : 'rgba(255,252,247,0.70)';
  const langActive = isModena ? 'rgba(11,11,16,0.85)' : 'rgba(248,180,217,0.90)';
  const langActiveBg = isModena ? 'rgba(11,11,16,0.08)' : 'rgba(248,180,217,0.10)';
  const borderColor = isModena ? 'rgba(11,11,16,0.06)' : 'rgba(255,252,247,0.04)';

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: showBg ? 'var(--surface-nav)' : 'transparent',
          backdropFilter: showBg ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: showBg ? 'blur(20px)' : 'none',
          borderBottom: showBg ? `1px solid ${borderColor}` : '1px solid transparent',
        }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo — MONZA wordmark with helmet */}
            <Link to="/" className="flex items-center gap-0 select-none group">
              <span
                className="font-clash text-lg md:text-xl font-bold transition-all duration-300"
                style={{ letterSpacing: "-0.02em", color: textPrimary }}
              >
                M
              </span>
              <HelmetIcon
                variant="solid"
                shellColor="#F8B4D9"
                visorColor={isModena ? "#0B0B10" : "#1a1a2a"}
                className="transition-transform duration-300 group-hover:scale-110 h-[0.82rem] w-[0.82rem] md:h-[0.9rem] md:w-[0.9rem]"
              />
              <span
                className="font-clash text-lg md:text-xl font-bold transition-all duration-300"
                style={{ letterSpacing: "-0.02em", color: textPrimary }}
              >
                NZA
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-clash text-[11px] tracking-[0.25em] uppercase transition-colors duration-300"
                  style={{ color: textMuted }}
                  onMouseEnter={e => (e.currentTarget.style.color = textMutedHover)}
                  onMouseLeave={e => (e.currentTarget.style.color = textMuted)}
                >
                  {link.label}
                </a>
              ))}

              {/* Theme toggle */}
              <ThemeSwitcher />

              {/* Language switcher */}
              <div className="flex items-center gap-1">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className="font-clash text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-md transition-all duration-300"
                    style={{
                      color: lang === l ? langActive : textMuted,
                      background: lang === l ? langActiveBg : 'transparent',
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://calendar.notion.so/meet/monzaedgar/monzastudiopro"
                target="_blank"
                rel="noopener noreferrer"
                className="font-clash text-[11px] tracking-[0.2em] uppercase px-5 py-2 rounded-full transition-all duration-300 hover:-translate-y-[1px]"
                style={{
                  background: isModena ? "rgba(11, 11, 16, 0.08)" : "rgba(248, 180, 217, 0.08)",
                  border: isModena ? "1px solid rgba(11, 11, 16, 0.20)" : "1px solid rgba(248, 180, 217, 0.18)",
                  color: isModena ? "rgba(11, 11, 16, 0.75)" : "rgba(248, 180, 217, 0.75)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isModena ? "rgba(11, 11, 16, 0.12)" : "rgba(248, 180, 217, 0.14)";
                  e.currentTarget.style.borderColor = isModena ? "rgba(11, 11, 16, 0.35)" : "rgba(248, 180, 217, 0.35)";
                  e.currentTarget.style.color = isModena ? "#0B0B10" : "#F8B4D9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isModena ? "rgba(11, 11, 16, 0.08)" : "rgba(248, 180, 217, 0.08)";
                  e.currentTarget.style.borderColor = isModena ? "rgba(11, 11, 16, 0.20)" : "rgba(248, 180, 217, 0.18)";
                  e.currentTarget.style.color = isModena ? "rgba(11, 11, 16, 0.75)" : "rgba(248, 180, 217, 0.75)";
                }}
              >
                {cta}
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
                style={{
                  background: textPrimary,
                  transform: isMenuOpen ? "rotate(45deg) translateY(3.25px)" : "none",
                }}
              />
              <span
                className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
                style={{
                  background: textPrimary,
                  transform: isMenuOpen ? "rotate(-45deg) translateY(-3.25px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
            style={{
              background: 'var(--surface-overlay)',
              backdropFilter: 'blur(30px)',
            }}
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="font-clash text-2xl font-bold tracking-[0.1em] uppercase transition-colors duration-300"
                  style={{ color: isModena ? 'rgba(11,11,16,0.60)' : 'rgba(255,252,247,0.60)' }}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile theme toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.32 }}
              >
                <ThemeSwitcher />
              </motion.div>

              {/* Mobile language switcher */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.40 }}
                className="flex items-center gap-2"
              >
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className="font-clash text-xs tracking-[0.15em] uppercase px-3 py-1.5 rounded-lg transition-all duration-300 border"
                    style={{
                      color: lang === l ? '#F8B4D9' : textMuted,
                      background: lang === l ? 'rgba(248,180,217,0.10)' : 'transparent',
                      borderColor: lang === l ? 'rgba(248,180,217,0.20)' : 'transparent',
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </motion.div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.48 }}
                className="mt-4"
              >
                <a
                  href="https://calendar.notion.so/meet/monzaedgar/monzastudiopro"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="font-clash text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-full"
                  style={{
                    background: "rgba(248, 180, 217, 0.10)",
                    border: "1px solid rgba(248, 180, 217, 0.20)",
                    color: "rgba(248, 180, 217, 0.85)",
                  }}
                >
                  {cta}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
