import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HelmetIcon from "./HelmetIcon";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "@/theme/ThemeContext";
import { useLanguage } from "@/i18n/LanguageContext";
import CTAButton from "./ui/CTAButton";

type Lang = "es" | "en" | "de" | "pt";

const LANGS: Lang[] = ["es", "en", "de", "pt"];

const NAV_LINKS: Record<Lang, { label: string; href: string }[]> = {
  es: [
    { label: "About", href: "#about" },
    { label: "Method", href: "#metodo" },
    { label: "Speaker", href: "/speaker" },
  ],
  en: [
    { label: "About", href: "#about" },
    { label: "Approach", href: "#metodo" },
    { label: "Speaker", href: "/en/speaker" },
  ],
  de: [
    { label: "Über uns", href: "#about" },
    { label: "Methode", href: "#metodo" },
    { label: "Speaker", href: "/de/speaker" },
  ],
  pt: [
    { label: "Sobre", href: "#about" },
    { label: "Método", href: "#metodo" },
    { label: "Speaker", href: "/pt/speaker" },
  ],
};

type VentureNav = {
  slug: string;
  name: string;
  accent: string;
  oneLiner: { es: string; en: string; de: string; pt: string };
};

const VENTURE_NAV: VentureNav[] = [
  {
    slug: "monzastudio",
    name: "Monza Studio",
    accent: "#f074aa",
    oneLiner: {
      es: "Construyo y hago crecer marcas globales — branding, contenido, e-commerce, growth.",
      en: "I build and grow global brands — branding, content, e-commerce, growth.",
      de: "Ich baue und lasse globale Marken wachsen — Branding, Content, E-Commerce, Growth.",
      pt: "Construo e faço crescer marcas globais — branding, conteúdo, e-commerce, growth.",
    },
  },
  {
    slug: "monzahaus",
    name: "MonzaHaus",
    accent: "#F8B4D9",
    oneLiner: {
      es: "Plataforma para comprar el Porsche correcto al precio justo.",
      en: "Platform to buy the right Porsche at the right price.",
      de: "Plattform, um den richtigen Porsche zum fairen Preis zu kaufen.",
      pt: "Plataforma para comprar o Porsche certo ao preço justo.",
    },
  },
  {
    slug: "monzaindex",
    name: "Monza Index",
    accent: "#FFFCF7",
    oneLiner: {
      es: "Mide qué tan adoptada está la IA — país por país, empresa por empresa.",
      en: "Measures real AI adoption — country by country, company by company.",
      de: "Misst echte KI-Adoption — Land für Land, Unternehmen für Unternehmen.",
      pt: "Mede o nível real de adoção da IA — país a país, empresa a empresa.",
    },
  },
  {
    slug: "bavarianecons",
    name: "Bavarian Econs",
    accent: "#A8A29E",
    oneLiner: {
      es: "Convertimos BMW clásicos de los 70 en autos eléctricos modernos. Hecho a mano en Munich.",
      en: "We turn 70s classic BMWs into modern electric cars. Hand-built in Munich.",
      de: "Wir verwandeln klassische BMWs der 70er in moderne Elektroautos. Handgefertigt in München.",
      pt: "Convertemos BMWs clássicos dos anos 70 em carros elétricos modernos. Feito à mão em Munique.",
    },
  },
];

const VENTURES_LABEL: Record<Lang, string> = {
  es: "Ventures",
  en: "Ventures",
  de: "Ventures", pt: "Ventures",
};

const CTA_LABEL: Record<Lang, string> = {
  es: "Construyamos",
  en: "Let's build",
  de: "Let's build", pt: "Construyamos",
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [venturesOpen, setVenturesOpen] = useState(false);
  const [mobileVenturesOpen, setMobileVenturesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const lang = language as Lang;
  const { theme } = useTheme();
  const isModena = theme === 'modena';
  const location = useLocation();
  const navigate = useNavigate();
  const langPrefix = lang === "es" ? "" : `/${lang}`;

  /** Handle anchor links — if not on home, navigate to home first then scroll */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return; // regular links work normally
    e.preventDefault();
    const hash = href;
    const isHome =
      location.pathname === "/" ||
      location.pathname === "/en" ||
      location.pathname === "/de" ||
      location.pathname === "/pt";
    if (isHome) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      const base = language === "es" ? "/" : `/${language}`;
      navigate(base, { replace: false });
      // Wait for page to render then scroll
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

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

  // Active venture detection — illuminates the Ventures button when in a venture page
  const ventureSlugs = VENTURE_NAV.map((v) => v.slug);
  const pathSegment = location.pathname.replace(/^\/(en|de|pt)\//, "/").replace(/^\/(en|de|pt)$/, "/");
  const activeVentureSlug = ventureSlugs.find((slug) => pathSegment === `/${slug}`);
  const activeVenture = VENTURE_NAV.find((v) => v.slug === activeVentureSlug);
  const isVentureActive = !!activeVenture || venturesOpen;

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
          <div
            className="flex items-center justify-between transition-all duration-500"
            style={{ height: isScrolled ? "56px" : "76px" }}
          >

            {/* Logo — MONZA wordmark with helmet */}
            <Link to="/" className="flex items-center gap-0 select-none group">
              <span
                className="font-clash font-bold transition-all duration-500"
                style={{
                  letterSpacing: "-0.025em",
                  color: textPrimary,
                  fontSize: isScrolled ? "1rem" : "1.125rem",
                }}
              >
                M
              </span>
              <HelmetIcon
                variant="solid"
                shellColor="#F8B4D9"
                visorColor={isModena ? "#0B0B10" : "#1a1a2a"}
                className="transition-all duration-500 group-hover:scale-110"
                style={{
                  height: isScrolled ? "0.78rem" : "0.9rem",
                  width: isScrolled ? "0.78rem" : "0.9rem",
                }}
              />
              <span
                className="font-clash font-bold transition-all duration-500"
                style={{
                  letterSpacing: "-0.025em",
                  color: textPrimary,
                  fontSize: isScrolled ? "1rem" : "1.125rem",
                }}
              >
                NZA
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7">
              {/* Ventures dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setVenturesOpen(true)}
                onMouseLeave={() => setVenturesOpen(false)}
              >
                <button
                  className="group relative font-clash text-[11px] tracking-[0.28em] uppercase transition-colors duration-300 flex items-center gap-1.5 py-2"
                  style={{
                    color: isVentureActive
                      ? activeVenture?.accent ?? textMutedHover
                      : venturesOpen
                        ? textMutedHover
                        : textMuted,
                  }}
                  aria-haspopup="menu"
                  aria-expanded={venturesOpen}
                >
                  {VENTURES_LABEL[lang]}
                  <span
                    className="text-[10px] transition-transform duration-300"
                    style={{ transform: venturesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    aria-hidden
                  >
                    ▾
                  </span>
                  {/* Underline */}
                  <span
                    className="absolute left-0 right-4 bottom-1 h-px transition-all duration-500 ease-out"
                    style={{
                      transformOrigin: "left",
                      transform: isVentureActive || venturesOpen ? "scaleX(1)" : "scaleX(0)",
                      background: activeVenture?.accent ?? textMutedHover,
                    }}
                    aria-hidden
                  />
                </button>

                <AnimatePresence>
                  {venturesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] rounded-2xl overflow-hidden"
                      style={{
                        background: "var(--surface-overlay)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: `1px solid ${borderColor}`,
                        boxShadow: isModena
                          ? "0 24px 60px -20px rgba(11,11,16,0.18)"
                          : "0 24px 60px -20px rgba(0,0,0,0.55)",
                      }}
                      role="menu"
                    >
                      <div className="grid grid-cols-2 gap-2 p-3">
                        {VENTURE_NAV.map((v, i) => (
                          <motion.div
                            key={v.slug}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.45,
                              delay: 0.04 + i * 0.06,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <Link
                              to={`${langPrefix}/${v.slug}`}
                              onClick={() => setVenturesOpen(false)}
                              role="menuitem"
                              className="group block rounded-xl p-4 transition-all duration-300 h-full"
                              style={{
                                border: `1px solid ${
                                  v.slug === activeVentureSlug
                                    ? `${v.accent}55`
                                    : borderColor
                                }`,
                                background:
                                  v.slug === activeVentureSlug
                                    ? isModena
                                      ? "rgba(11,11,16,0.05)"
                                      : "rgba(255,252,247,0.04)"
                                    : "transparent",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = isModena
                                  ? "rgba(11,11,16,0.04)"
                                  : "rgba(255,252,247,0.03)";
                                e.currentTarget.style.borderColor = `${v.accent}55`;
                              }}
                              onMouseLeave={(e) => {
                                if (v.slug !== activeVentureSlug) {
                                  e.currentTarget.style.background = "transparent";
                                  e.currentTarget.style.borderColor = borderColor;
                                }
                              }}
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <span
                                  className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                                  style={{ background: v.accent }}
                                  aria-hidden
                                />
                                <span
                                  className="font-clash text-[15px] font-semibold transition-colors duration-300"
                                  style={{
                                    letterSpacing: "-0.015em",
                                    color: textPrimary,
                                  }}
                                >
                                  {v.name}
                                </span>
                              </div>
                              <p
                                className="font-clash text-[12px] leading-relaxed pl-5"
                                style={{ color: textMuted }}
                              >
                                {v.oneLiner[lang]}
                              </p>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative font-clash text-[11px] tracking-[0.28em] uppercase transition-colors duration-300 py-2"
                  style={{ color: textMuted }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = textMutedHover;
                    const u = e.currentTarget.querySelector("[data-underline]") as HTMLElement | null;
                    if (u) u.style.transform = "scaleX(1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = textMuted;
                    const u = e.currentTarget.querySelector("[data-underline]") as HTMLElement | null;
                    if (u) u.style.transform = "scaleX(0)";
                  }}
                >
                  {link.label}
                  <span
                    data-underline
                    className="absolute left-0 right-0 bottom-1 h-px transition-transform duration-500 ease-out"
                    style={{
                      transformOrigin: "left",
                      transform: "scaleX(0)",
                      background: textMutedHover,
                    }}
                    aria-hidden
                  />
                </a>
              ))}

              {/* Theme toggle — single compact dot */}
              <ThemeSwitcher compact />

              {/* Language switcher — compact dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setLangOpen(true)}
                onMouseLeave={() => setLangOpen(false)}
              >
                <button
                  className="font-clash text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 flex items-center gap-1 py-1.5 px-1"
                  style={{ color: langOpen ? textMutedHover : textMuted }}
                  aria-haspopup="menu"
                  aria-expanded={langOpen}
                  aria-label="Language selector"
                >
                  {lang.toUpperCase()}
                  <span
                    className="text-[9px] transition-transform duration-300 -mt-px"
                    style={{ transform: langOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full right-0 mt-2 min-w-[88px] rounded-xl overflow-hidden"
                      style={{
                        background: "var(--surface-overlay)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: `1px solid ${borderColor}`,
                        boxShadow: isModena
                          ? "0 16px 40px -16px rgba(11,11,16,0.18)"
                          : "0 16px 40px -16px rgba(0,0,0,0.55)",
                      }}
                      role="menu"
                    >
                      <div className="py-1">
                        {LANGS.map((l) => (
                          <button
                            key={l}
                            onClick={() => {
                              setLanguage(l);
                              setLangOpen(false);
                            }}
                            role="menuitem"
                            aria-label={`Switch to ${l === 'es' ? 'Spanish' : l === 'en' ? 'English' : l === 'de' ? 'German' : 'Portuguese'}`}
                            aria-pressed={lang === l}
                            className="w-full font-clash text-[10px] tracking-[0.25em] uppercase px-4 py-2 text-left transition-colors duration-200"
                            style={{
                              color: lang === l ? textPrimary : textMuted,
                              background: lang === l ? langActiveBg : "transparent",
                            }}
                            onMouseEnter={(e) => {
                              if (lang !== l) e.currentTarget.style.color = textMutedHover;
                            }}
                            onMouseLeave={(e) => {
                              if (lang !== l) e.currentTarget.style.color = textMuted;
                            }}
                          >
                            {l.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <CTAButton href="mailto:edgar@monzalab.com" size="sm" className="font-clash">
                {cta}
              </CTAButton>
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
            <nav className="flex flex-col items-center gap-8 max-h-[80vh] overflow-y-auto px-6 py-4">
              {/* Mobile Ventures expandable */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col items-center gap-4 w-full"
              >
                <button
                  onClick={() => setMobileVenturesOpen((o) => !o)}
                  className="font-clash text-2xl font-bold tracking-[0.1em] uppercase transition-colors duration-300 flex items-center gap-2"
                  style={{ color: isModena ? "rgba(11,11,16,0.60)" : "rgba(255,252,247,0.60)" }}
                  aria-expanded={mobileVenturesOpen}
                >
                  {VENTURES_LABEL[lang]}
                  <span
                    className="text-base transition-transform duration-300"
                    style={{ transform: mobileVenturesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
                <AnimatePresence>
                  {mobileVenturesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center gap-3 w-full max-w-md"
                    >
                      {VENTURE_NAV.map((v) => (
                        <Link
                          key={v.slug}
                          to={`${langPrefix}/${v.slug}`}
                          onClick={() => {
                            setMobileVenturesOpen(false);
                            setIsMenuOpen(false);
                          }}
                          className="w-full rounded-xl px-5 py-4 transition-all duration-300"
                          style={{
                            border: `1px solid ${borderColor}`,
                            background: isModena ? "rgba(11,11,16,0.03)" : "rgba(255,252,247,0.03)",
                          }}
                        >
                          <div className="flex items-center gap-3 mb-1.5">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: v.accent }}
                              aria-hidden
                            />
                            <span
                              className="font-clash text-base font-semibold"
                              style={{
                                letterSpacing: "-0.015em",
                                color: textPrimary,
                              }}
                            >
                              {v.name}
                            </span>
                          </div>
                          <p
                            className="font-clash text-[12px] leading-relaxed pl-5"
                            style={{ color: textMuted }}
                          >
                            {v.oneLiner[lang]}
                          </p>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { handleNavClick(e, link.href); setIsMenuOpen(false); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.18 + i * 0.08 }}
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
                    onClick={() => setLanguage(l)}
                    aria-label={`Switch to ${l === 'es' ? 'Spanish' : l === 'en' ? 'English' : l === 'de' ? 'German' : 'Portuguese'}`}
                    aria-pressed={lang === l}
                    className="font-clash text-xs tracking-[0.15em] uppercase px-4 py-3 rounded-lg transition-all duration-300 border min-w-[48px] min-h-[44px]"
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
                <CTAButton
                  href="mailto:edgar@monzalab.com"
                  size="md"
                  onClick={() => setIsMenuOpen(false)}
                  className="font-clash"
                >
                  {cta}
                </CTAButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
