import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "@/theme/ThemeContext";
import { useLanguage } from "@/i18n/LanguageContext";
import FooterMinimal from "@/components/FooterMinimal";
import PremiumBackground from "@/components/layout/PremiumBackground";
import SEO from "@/components/SEO";

/* Lazy autoplay video — loads & plays when near viewport */
const LazyShootVideo = ({ src, className }: { src: string; className?: string }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(src);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "300px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [src]);

  const videoCallback = (node: HTMLVideoElement | null) => {
    if (!node) return;
    const tryPlay = () => {
      node.play().catch(() => {});
    };
    node.addEventListener("canplay", tryPlay, { once: true });
    tryPlay();
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else node.pause();
      },
      { threshold: 0.15 },
    );
    obs.observe(node);
  };

  return (
    <div ref={sentinelRef} className={className}>
      {activeSrc && (
        <video
          ref={videoCallback}
          key={activeSrc}
          src={activeSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

const EASE = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#f074aa";
const ACCENT_DEEP = "#d461c1";

type Lang = "es" | "en" | "de" | "pt";
type LT = { es: string; en: string; de: string; pt: string };
const t = (obj: LT, lang: Lang) => obj[lang] ?? obj.es;

/* ──────────────────────────────────────────
   Section wrapper with in-view animation
   ────────────────────────────────────────── */
const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

/* ──────────────────────────────────────────
   HERO — collage parallax + headline
   ────────────────────────────────────────── */
const Hero = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = {
    es: "MONZA STUDIO · VENTURE 03",
    en: "MONZA STUDIO · VENTURE 03",
    de: "MONZA STUDIO · VENTURE 03", pt: "MONZA STUDIO · VENTURE 03",
  };
  const headline: LT = {
    es: "No delego marcas. Las construyo.",
    en: "I don't delegate brands. I build them.",
    de: "Ich delegiere keine Marken. Ich baue sie.",
    pt: "Não delego marcas. Construo-as.",
  };
  const sub: LT = {
    es: "Atiendo cada una personalmente — estrategia, branding, producto, contenido y growth. Criterio editorial. IA como palanca.",
    en: "I attend each one personally — strategy, branding, product, content and growth. Editorial criterion. AI as leverage.",
    de: "Ich betreue jede persönlich — Strategie, Branding, Produkt, Content und Growth. Redaktionelles Urteil. KI als Hebel.",
    pt: "Acompanho cada uma pessoalmente — estratégia, branding, produto, conteúdo e growth. Critério editorial. IA como alavanca.",
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
        {/* ── Copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="md:col-span-7"
        >
          <p
            className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
            style={{ color: `${ACCENT}cc` }}
          >
            {t(eyebrow, lang)}
          </p>
          <h1
            className="font-clash font-bold leading-[0.95] mb-6"
            style={{
              fontSize: "clamp(40px, 7.5vw, 96px)",
              letterSpacing: "-0.03em",
              color: "rgba(var(--text-rgb), 0.92)",
            }}
          >
            {t(headline, lang)}
          </h1>
          <p
            className="font-clash text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "rgba(var(--text-rgb), 0.55)" }}
          >
            {t(sub, lang)}
          </p>
        </motion.div>

        {/* ── Collage parallax ── */}
        <div className="md:col-span-5 relative h-[420px] md:h-[560px]">
          {/* Frame 1 — Eleonora portrait (top-right) */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
            className="absolute top-0 right-0 w-[58%] h-[58%] rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${ACCENT}33`,
              boxShadow: `0 30px 80px -30px ${ACCENT}22`,
            }}
          >
            <img
              src="/images/brands/eleonora/eleonora-portrait.jpg"
              alt="Eleonora Morales — editorial"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(140deg, transparent 50%, ${ACCENT}22 100%)`,
              }}
            />
          </motion.div>

          {/* Frame 2 — Santi editorial (left, mid) */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
            className="absolute top-[28%] left-0 w-[52%] h-[48%] rounded-2xl overflow-hidden"
            style={{
              border: `1px solid rgba(255,252,247,0.10)`,
              boxShadow: `0 30px 80px -30px rgba(0,0,0,0.55)`,
            }}
          >
            <img
              src="/images/people/santi/santi-clubmaster.png"
              alt="Editorial portrait — gafas"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>

          {/* Frame 3 — Automotive hero (bottom-right) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
            className="absolute bottom-0 right-[8%] w-[50%] h-[40%] rounded-2xl overflow-hidden"
            style={{
              border: `1px solid rgba(255,252,247,0.08)`,
              boxShadow: `0 30px 80px -30px rgba(0,0,0,0.55)`,
            }}
          >
            <img
              src="/images/studio/automotive/01-wheel-hero.jpg"
              alt="Automotive editorial — wheel hero"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>

          {/* Tag — number in corner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="absolute top-2 left-2 font-mono text-[11px] tracking-[0.2em]"
            style={{ color: `${ACCENT}80` }}
          >
            03 / STUDIO
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          className="font-clash text-[9px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(var(--text-rgb), 0.35)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: `linear-gradient(to bottom, rgba(var(--text-rgb), 0.35), transparent)`,
          }}
        />
      </motion.div>
    </section>
  );
};

/* ──────────────────────────────────────────
   PURPOSE
   ────────────────────────────────────────── */
const Purpose = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "PROPÓSITO", en: "PURPOSE", de: "ZWECK", pt: "PROPÓSITO" };
  const head: LT = {
    es: "Para empresas con presencia que quieren dar el salto global.",
    en: "For brands with presence ready to make the global jump.",
    de: "Für Marken mit Präsenz, die den globalen Sprung wagen wollen.", pt: "Para empresas con presencia que quieren dar el salto global.",
  };
  const body: LT = {
    es: "No vendemos servicios. Operamos la marca contigo. Construimos el sistema de identidad, el motor de contenido, la tienda y la pauta — y los hacemos correr en loop. Una sola operación. Cualquier marca global, cualquier industria.",
    en: "We don't sell services. We operate the brand with you. We build the identity system, the content engine, the store and the paid growth — and we run them in loop. One operation. Any global brand, any industry.",
    de: "Wir verkaufen keine Services. Wir betreiben die Marke mit dir. Wir bauen das Identitätssystem, den Content-Motor, den Store und die Pauta — und betreiben sie im Loop. Eine Operation. Jede globale Marke, jede Branche.", pt: "No vendemos servicios. Operamos la marca contigo. Construimos el sistema de identidad, el motor de contenido, la tienda y la pauta — y los hacemos correr en loop. Una sola operación. Cualquier marca global, cualquier industria.",
  };

  return (
    <Section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-8"
          style={{
            fontSize: "clamp(28px, 4.4vw, 56px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p
          className="font-clash text-lg md:text-xl max-w-3xl leading-relaxed"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {t(body, lang)}
        </p>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   CAPABILITIES — 4 pillars
   ────────────────────────────────────────── */
type Capability = {
  num: string;
  label: LT;
  detail: LT;
  proof: LT;
};

const CAPABILITIES: Capability[] = [
  {
    num: "01",
    label: { es: "Branding", en: "Branding", de: "Branding", pt: "Branding" },
    detail: {
      es: "Identidad, sistema visual, manual de marca, voz. Diseñados como sistema interactivo, no como PDF estático.",
      en: "Identity, visual system, brand manual, voice. Designed as an interactive system, not a static PDF.",
      de: "Identität, visuelles System, Markenhandbuch, Stimme. Als interaktives System entworfen, nicht als statisches PDF.", pt: "Identidad, sistema visual, manual de marca, voz. Diseñados como sistema interactivo, no como PDF estático.",
    },
    proof: {
      es: "Eleonora · Musgo · Bavarian Econs",
      en: "Eleonora · Musgo · Bavarian Econs",
      de: "Eleonora · Musgo · Bavarian Econs", pt: "Eleonora · Musgo · Bavarian Econs",
    },
  },
  {
    num: "02",
    label: { es: "Content Engine", en: "Content Engine", de: "Content Engine", pt: "Content Engine" },
    detail: {
      es: "Pipeline de contenido con IA: editorials, carouseles, reels, posts. Calidad de revista, ritmo de plataforma.",
      en: "AI content pipeline: editorials, carousels, reels, posts. Magazine quality, platform pace.",
      de: "KI-Content-Pipeline: Editorials, Karussells, Reels, Posts. Magazinqualität, Plattform-Tempo.", pt: "Pipeline de contenido con IA: editorials, carouseles, reels, posts. Calidad de revista, ritmo de plataforma.",
    },
    proof: {
      es: "Eleonora · Garage Advisory · Pacho Alvarez",
      en: "Eleonora · Garage Advisory · Pacho Alvarez",
      de: "Eleonora · Garage Advisory · Pacho Alvarez", pt: "Eleonora · Garage Advisory · Pacho Alvarez",
    },
  },
  {
    num: "03",
    label: { es: "E-commerce", en: "E-commerce", de: "E-Commerce", pt: "E-commerce" },
    detail: {
      es: "Shopify + Storefront API custom. Drops, waitlists, automatizaciones de Klaviyo conectadas a la base de datos.",
      en: "Shopify + custom Storefront API. Drops, waitlists, Klaviyo automations connected to the database.",
      de: "Shopify + Custom Storefront API. Drops, Waitlists, Klaviyo-Automationen mit Datenbankanbindung.", pt: "Shopify + Storefront API custom. Drops, waitlists, automatizaciones de Klaviyo conectadas a la base de datos.",
    },
    proof: {
      es: "Eleonora — 4 mundos en una sola tienda",
      en: "Eleonora — 4 worlds in a single storefront",
      de: "Eleonora — 4 Welten in einem Storefront", pt: "Eleonora — 4 mundos en una sola tienda",
    },
  },
  {
    num: "04",
    label: { es: "Paid Growth", en: "Paid Growth", de: "Paid Growth", pt: "Paid Growth" },
    detail: {
      es: "Agentes IA para gestión de pauta. Criterio, ejecución y optimización en loop. Solo escalamos lo que funciona.",
      en: "AI agents for paid management. Criterion, execution and optimization in loop. We only scale what works.",
      de: "KI-Agenten für Paid Management. Kriterium, Ausführung und Optimierung im Loop. Wir skalieren nur, was funktioniert.", pt: "Agentes IA para gestión de pauta. Criterio, ejecución y optimización en loop. Solo escalamos lo que funciona.",
    },
    proof: {
      es: "Meta Ads · TikTok · LinkedIn",
      en: "Meta Ads · TikTok · LinkedIn",
      de: "Meta Ads · TikTok · LinkedIn", pt: "Meta Ads · TikTok · LinkedIn",
    },
  },
];

const Capabilities = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "QUÉ HACEMOS", en: "WHAT WE DO", de: "WAS WIR TUN", pt: "QUÉ HACEMOS" };
  const head: LT = {
    es: "Cuatro motores. Una sola operación.",
    en: "Four engines. One operation.",
    de: "Vier Motoren. Eine Operation.", pt: "Cuatro motores. Una sola operación.",
  };

  return (
    <Section className="py-24 md:py-32" id="capabilities">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-16 md:mb-20"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl p-7 md:p-9 group transition-all duration-500"
              style={{
                background: "rgba(var(--text-rgb), 0.02)",
                border: "1px solid rgba(var(--text-rgb), 0.06)",
              }}
            >
              <div className="flex items-baseline gap-4 mb-5">
                <span
                  className="font-mono text-[11px] tracking-[0.2em]"
                  style={{ color: `${ACCENT}80` }}
                >
                  {cap.num}
                </span>
                <h3
                  className="font-clash font-bold text-2xl md:text-3xl"
                  style={{
                    letterSpacing: "-0.02em",
                    color: "rgba(var(--text-rgb), 0.92)",
                  }}
                >
                  {t(cap.label, lang)}
                </h3>
              </div>
              <p
                className="font-clash text-[15px] md:text-base leading-relaxed mb-5"
                style={{ color: "rgba(var(--text-rgb), 0.6)" }}
              >
                {t(cap.detail, lang)}
              </p>
              <p
                className="font-clash text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-medium"
                style={{ color: `${ACCENT}80` }}
              >
                {t(cap.proof, lang)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   GLOBAL SHOOT INFRASTRUCTURE — videos BTS
   ────────────────────────────────────────── */
const SHOOT_VIDEOS = [
  "/videos/reel/IMG_8331.mp4",
  "/videos/reel/IMG_8737.mp4",
  "/videos/reel/IMG_3633.mp4",
  "/videos/reel/IMG_3593.mp4",
  "/videos/reel/IMG_3811.mp4",
  "/videos/reel/IMG_0080.mp4",
];

const ShootInfrastructure = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = {
    es: "INFRAESTRUCTURA GLOBAL DE SHOOTS",
    en: "GLOBAL SHOOT INFRASTRUCTURE",
    de: "GLOBALE SHOOT-INFRASTRUKTUR", pt: "INFRAESTRUCTURA GLOBAL DE SHOOTS",
  };
  const head: LT = {
    es: "Fotógrafos en cualquier ciudad. Sin viajar.",
    en: "Photographers in any city. Without traveling.",
    de: "Fotografen in jeder Stadt. Ohne zu reisen.", pt: "Fotógrafos en cualquier ciudad. Sin viajar.",
  };
  const body: LT = {
    es: "Trabajo con una red de fotógrafos y videógrafos en Europa, Estados Unidos y Japón — en las ciudades principales. Una marca que opera global no puede esperar al avión: hago shoot donde la audiencia está, con dirección creativa remota, en una semana.",
    en: "I work with a network of photographers and videographers across Europe, the US and Japan — in the main cities. A brand operating globally can't wait for a flight: I shoot where the audience is, with remote creative direction, in a week.",
    de: "Ich arbeite mit einem Netzwerk aus Fotografen und Videografen in Europa, den USA und Japan — in den Hauptstädten. Eine global operierende Marke kann nicht aufs Flugzeug warten: Ich produziere dort, wo die Audience ist, mit Fern-Kreativdirektion, in einer Woche.", pt: "Trabajo con una red de fotógrafos y videógrafos en Europa, Estados Unidos y Japón — en las ciudades principales. Una marca que opera global no puede esperar al avión: hago shoot donde la audiencia está, con dirección creativa remota, en una semana.",
  };
  const cities: LT = {
    es: "EUROPA · ESTADOS UNIDOS · JAPÓN — EN LAS CIUDADES PRINCIPALES",
    en: "EUROPE · UNITED STATES · JAPAN — IN THE MAIN CITIES",
    de: "EUROPA · USA · JAPAN — IN DEN HAUPTSTÄDTEN", pt: "EUROPA · ESTADOS UNIDOS · JAPÓN — EN LAS CIUDADES PRINCIPALES",
  };

  return (
    <Section className="py-24 md:py-32" id="shoots">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-6 max-w-3xl"
          style={{
            fontSize: "clamp(28px, 4.4vw, 56px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p
          className="font-clash text-base md:text-lg max-w-3xl leading-relaxed mb-10"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {t(body, lang)}
        </p>
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-medium mb-12 md:mb-16"
          style={{ color: `${ACCENT}99` }}
        >
          {t(cities, lang)}
        </p>

        {/* Video grid — 3 cols desktop, 2 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {SHOOT_VIDEOS.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden group"
              style={{ border: `1px solid ${ACCENT}1f` }}
            >
              <LazyShootVideo src={src} className="w-full h-full" />
              {/* Subtle vignette + index */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.55) 100%)",
                }}
                aria-hidden
              />
              <span
                className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.2em] pointer-events-none"
                style={{ color: `${ACCENT}cc` }}
              >
                0{i + 1}
              </span>
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 80px -10px ${ACCENT}30` }}
                aria-hidden
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   FLAGSHIP — Eleonora Morales (case detallado)
   ────────────────────────────────────────── */
const ELEONORA_BLOCKS: { label: LT; detail: LT }[] = [
  {
    label: { es: "E-commerce Shopify", en: "Shopify E-commerce", de: "Shopify E-Commerce", pt: "E-commerce Shopify" },
    detail: {
      es: "Storefront API custom. 4 mundos en una sola tienda: Garage Sale (vintage), Luxe (deadstock colombiano), Mundo Lujo (investment), Parisienne (contemporáneo).",
      en: "Custom Storefront API. 4 worlds in one store: Garage Sale (vintage), Luxe (Colombian deadstock), Mundo Lujo (investment), Parisienne (contemporary).",
      de: "Custom Storefront API. 4 Welten in einem Store: Garage Sale (Vintage), Luxe (kolumbianischer Deadstock), Mundo Lujo (Investment), Parisienne (Contemporary).", pt: "Storefront API custom. 4 mundos en una sola tienda: Garage Sale (vintage), Luxe (deadstock colombiano), Mundo Lujo (investment), Parisienne (contemporáneo).",
    },
  },
  {
    label: { es: "Content Engine", en: "Content Engine", de: "Content Engine", pt: "Content Engine" },
    detail: {
      es: "Pipeline IA para editorials, carouseles de IG, reels y posts diarios. Conectado al calendario editorial.",
      en: "AI pipeline for editorials, IG carousels, reels and daily posts. Connected to the editorial calendar.",
      de: "KI-Pipeline für Editorials, IG-Karussells, Reels und tägliche Posts. An den redaktionellen Kalender angebunden.", pt: "Pipeline IA para editorials, carouseles de IG, reels y posts diarios. Conectado al calendario editorial.",
    },
  },
  {
    label: { es: "Drops & Waitlist", en: "Drops & Waitlist", de: "Drops & Waitlist", pt: "Drops & Waitlist" },
    detail: {
      es: "Sistema 'Coming Soon' para anticipación controlada de pieces nuevas. Gatekeeping editorial para la comunidad fashion.",
      en: "‘Coming Soon’ system for controlled anticipation on new pieces. Editorial gatekeeping for the fashion community.",
      de: "‚Coming Soon‘-System für kontrollierte Vorfreude auf neue Pieces. Editoriales Gatekeeping für die Fashion-Community.", pt: "Sistema 'Coming Soon' para anticipación controlada de pieces nuevas. Gatekeeping editorial para la comunidad fashion.",
    },
  },
  {
    label: { es: "Klaviyo Automatizado", en: "Klaviyo Automation", de: "Klaviyo-Automation", pt: "Klaviyo Automatizado" },
    detail: {
      es: "Flows de email/SMS conectados a la base de datos del e-commerce. Segmentación por mundo, comportamiento y cohorte.",
      en: "Email/SMS flows wired to the e-commerce database. Segmentation by world, behaviour and cohort.",
      de: "E-Mail/SMS-Flows, an die E-Commerce-Datenbank angebunden. Segmentierung nach Welt, Verhalten und Kohorte.", pt: "Flows de email/SMS conectados a la base de datos del e-commerce. Segmentación por mundo, comportamiento y cohorte.",
    },
  },
  {
    label: { es: "Brand System", en: "Brand System", de: "Brand-System", pt: "Brand System" },
    detail: {
      es: "Identidad completa, sistema visual y manual de marca interactivo. Voz editorial consistente entre los 4 mundos.",
      en: "Full identity, visual system and interactive brand manual. Editorial voice consistent across the 4 worlds.",
      de: "Komplette Identität, visuelles System und interaktives Brand Manual. Redaktionelle Stimme konsistent über die 4 Welten.", pt: "Identidad completa, sistema visual y manual de marca interactivo. Voz editorial consistente entre los 4 mundos.",
    },
  },
  {
    label: { es: "Casco · Cápsula collab", en: "Helmet · Capsule Collab", de: "Helm · Kapsel-Collab", pt: "Casco · Cápsula collab" },
    detail: {
      es: "Cápsula limited Eleonora × Monza Studio: el casco rosa metálico — pieza física que sella la collab y vive como halo de la marca.",
      en: "Limited capsule Eleonora × Monza Studio: the rose-gold helmet — physical piece that seals the collab and lives as a halo for the brand.",
      de: "Limitierte Kapsel Eleonora × Monza Studio: der roségoldene Helm — physisches Stück, das die Collab besiegelt und als Halo der Marke dient.", pt: "Cápsula limited Eleonora × Monza Studio: el casco rosa metálico — pieza física que sella la collab y vive como halo de la marca.",
    },
  },
];

const ELEONORA_GALLERY = [
  "/images/brands/eleonora/gallery/eleonora-1.jpeg",
  "/images/brands/eleonora/casco-eleonora.png",
  "/images/brands/eleonora/gallery/eleonora-7.jpeg",
  "/images/brands/eleonora/casco-neon.png",
  "/images/brands/eleonora/gallery/eleonora-12.jpeg",
  "/images/brands/eleonora/gallery/eleonora-8.jpeg",
];

const FlagshipEleonora = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "CASO FLAGSHIP", en: "FLAGSHIP CASE", de: "FLAGSHIP-CASE", pt: "CASO FLAGSHIP" };
  const tagline: LT = { es: "La Moda es Magia", en: "La Moda es Magia", de: "La Moda es Magia", pt: "La Moda es Magia" };
  const subtitle: LT = {
    es: "Lujo circular · Colombia · 4 mundos · live e-commerce",
    en: "Circular luxury · Colombia · 4 worlds · live e-commerce",
    de: "Zirkulärer Luxus · Kolumbien · 4 Welten · Live-E-Commerce", pt: "Lujo circular · Colombia · 4 mundos · live e-commerce",
  };
  const story: LT = {
    es: "Construimos el ecosistema digital desde cero — branding, e-commerce con 4 mundos, pipeline de contenido y automatizaciones. Hoy Eleonora opera 350K+ seguidores y un e-commerce activo bajo una sola sombrilla.",
    en: "We built the digital ecosystem from scratch — branding, 4-world e-commerce, content pipeline and automations. Today Eleonora operates 350K+ followers and a live e-commerce under a single umbrella.",
    de: "Wir haben das digitale Ökosystem von Grund auf gebaut — Branding, 4-Welten-E-Commerce, Content-Pipeline und Automationen. Heute betreibt Eleonora 350K+ Follower und einen Live-E-Commerce unter einem Dach.", pt: "Construimos el ecosistema digital desde cero — branding, e-commerce con 4 mundos, pipeline de contenido y automatizaciones. Hoy Eleonora opera 350K+ seguidores y un e-commerce activo bajo una sola sombrilla.",
  };
  const buildLabel: LT = { es: "CONSTRUCCIÓN", en: "CONSTRUCTION", de: "AUFBAU", pt: "CONSTRUCCIÓN" };
  const proofLabel: LT = { es: "EL OUTPUT", en: "THE OUTPUT", de: "DAS ERGEBNIS", pt: "EL OUTPUT" };
  const cta: LT = {
    es: "Ver eleonoramorales.com",
    en: "Visit eleonoramorales.com",
    de: "Besuche eleonoramorales.com", pt: "Ver eleonoramorales.com",
  };
  const press: LT = {
    es: "Vogue · El Espectador · Forbes",
    en: "Vogue · El Espectador · Forbes",
    de: "Vogue · El Espectador · Forbes", pt: "Vogue · El Espectador · Forbes",
  };

  return (
    <Section className="py-24 md:py-36" id="eleonora">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Header */}
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="md:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${ACCENT}33`,
              boxShadow: `0 30px 80px -30px ${ACCENT}33`,
            }}
          >
            <img
              src="/images/brands/eleonora/eleonora-portrait.jpg"
              alt="Eleonora Morales — portrait"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            <div className="absolute bottom-5 left-5 right-5">
              <p
                className="font-clash text-[9px] tracking-[0.3em] uppercase mb-2"
                style={{ color: `${ACCENT}cc` }}
              >
                ELEONORA MORALES
              </p>
              <p
                className="font-mono text-[10px]"
                style={{ color: "rgba(255,252,247,0.55)" }}
              >
                {t(press, lang)}
              </p>
            </div>
          </motion.div>

          {/* Copy */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <h2
              className="font-clash font-bold leading-[1.05] mb-3"
              style={{
                fontSize: "clamp(36px, 5.5vw, 72px)",
                letterSpacing: "-0.025em",
                color: "rgba(var(--text-rgb), 0.92)",
              }}
            >
              {t(tagline, lang)}
            </h2>
            <p
              className="font-clash text-sm md:text-base mb-6"
              style={{ color: `${ACCENT}cc`, letterSpacing: "0.02em" }}
            >
              {t(subtitle, lang)}
            </p>
            <p
              className="font-clash text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
              style={{ color: "rgba(var(--text-rgb), 0.65)" }}
            >
              {t(story, lang)}
            </p>
            <a
              href="https://www.eleonoramorales.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-clash text-xs tracking-[0.25em] uppercase font-medium self-start py-3 px-5 rounded-full transition-all duration-300"
              style={{
                color: ACCENT,
                border: `1px solid ${ACCENT}55`,
                background: `${ACCENT}10`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${ACCENT}25`;
                e.currentTarget.style.borderColor = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${ACCENT}10`;
                e.currentTarget.style.borderColor = `${ACCENT}55`;
              }}
            >
              {t(cta, lang)} <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        {/* Construction blocks */}
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `rgba(var(--text-rgb), 0.4)` }}
        >
          {t(buildLabel, lang)}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16 md:mb-20">
          {ELEONORA_BLOCKS.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-xl p-6"
              style={{
                background: "rgba(var(--text-rgb), 0.025)",
                border: "1px solid rgba(var(--text-rgb), 0.06)",
              }}
            >
              <p
                className="font-clash text-[10px] tracking-[0.3em] uppercase font-bold mb-3"
                style={{ color: ACCENT }}
              >
                {t(b.label, lang)}
              </p>
              <p
                className="font-clash text-[14px] leading-relaxed"
                style={{ color: "rgba(var(--text-rgb), 0.6)" }}
              >
                {t(b.detail, lang)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Output gallery */}
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `rgba(var(--text-rgb), 0.4)` }}
        >
          {t(proofLabel, lang)}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {ELEONORA_GALLERY.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden group"
              style={{ border: "1px solid rgba(var(--text-rgb), 0.06)" }}
            >
              <img
                src={src}
                alt={`Eleonora editorial ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   12-WEEK PROGRAM — Consultoras Boutique 1:1
   Caso flagship: Musgo (Juanita López)
   ────────────────────────────────────────── */
type Phase = { num: string; weeks: LT; label: LT; detail: LT };

const PROGRAM_PHASES: Phase[] = [
  {
    num: "01",
    weeks: { es: "Semanas 1–4", en: "Weeks 1–4", de: "Wochen 1–4", pt: "Semanas 1–4" },
    label: { es: "Foundations", en: "Foundations", de: "Foundations", pt: "Foundations" },
    detail: {
      es: "Discovery 1:1, posicionamiento, tesis de la consultora, modelo de negocio y pricing. Salimos con la hoja de ruta de los próximos 8 semanas.",
      en: "1:1 discovery, positioning, consultancy thesis, business model and pricing. We leave with the roadmap for the next 8 weeks.",
      de: "1:1 Discovery, Positionierung, Beratungs-These, Geschäftsmodell und Pricing. Wir verlassen die Phase mit der Roadmap für die nächsten 8 Wochen.", pt: "Discovery 1:1, posicionamiento, tesis de la consultora, modelo de negocio y pricing. Salimos con la hoja de ruta de los próximos 8 semanas.",
    },
  },
  {
    num: "02",
    weeks: { es: "Semanas 5–8", en: "Weeks 5–8", de: "Wochen 5–8", pt: "Semanas 5–8" },
    label: { es: "Brand & Product", en: "Brand & Product", de: "Brand & Produkt", pt: "Brand & Product" },
    detail: {
      es: "Identidad completa, sistema visual, manual, web propia y arquitectura de servicios. La consultora se vuelve tangible.",
      en: "Full identity, visual system, brand manual, dedicated website and service architecture. The consultancy becomes tangible.",
      de: "Komplette Identität, visuelles System, Manual, eigene Website und Service-Architektur. Die Beratung wird greifbar.", pt: "Identidad completa, sistema visual, manual, web propia y arquitectura de servicios. La consultora se vuelve tangible.",
    },
  },
  {
    num: "03",
    weeks: { es: "Semanas 9–12", en: "Weeks 9–12", de: "Wochen 9–12", pt: "Semanas 9–12" },
    label: { es: "Launch & Operate", en: "Launch & Operate", de: "Launch & Operate", pt: "Launch & Operate" },
    detail: {
      es: "Lanzamiento público, motor de contenido, primeros clientes y operación lista para correr sola. La consultora opera en loop sin Edgar.",
      en: "Public launch, content engine, first clients and operation ready to run on its own. The consultancy operates in loop without Edgar.",
      de: "Öffentlicher Launch, Content-Engine, erste Klienten und Operation läuft eigenständig. Die Beratung operiert im Loop ohne Edgar.", pt: "Lanzamiento público, motor de contenido, primeros clientes y operación lista para correr sola. La consultora opera en loop sin Edgar.",
    },
  },
];

const ProgramFlagship = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = {
    es: "1:1 PROGRAM · 12 SEMANAS",
    en: "1:1 PROGRAM · 12 WEEKS",
    de: "1:1 PROGRAMM · 12 WOCHEN", pt: "1:1 PROGRAM · 12 SEMANAS",
  };
  const head: LT = {
    es: "Consultoras boutique en doce semanas.",
    en: "Boutique consultancies in twelve weeks.",
    de: "Boutique-Beratungen in zwölf Wochen.", pt: "Consultoras boutique en doce semanas.",
  };
  const body: LT = {
    es: "Un programa 1:1 para fundadores que quieren montar su consultora boutique como un sistema, no como una freelance personal. Branding, web, modelo, contenido y go-to-market — entregados como operación, lista para escalar.",
    en: "A 1:1 program for founders who want to build their boutique consultancy as a system, not as a personal freelance. Branding, web, model, content and go-to-market — delivered as an operation, ready to scale.",
    de: "Ein 1:1-Programm für Gründer, die ihre Boutique-Beratung als System aufbauen wollen — nicht als persönliche Freelance. Branding, Web, Modell, Content und Go-to-Market — als Operation geliefert, bereit zu skalieren.", pt: "Un programa 1:1 para fundadores que quieren montar su consultora boutique como un sistema, no como una freelance personal. Branding, web, modelo, contenido y go-to-market — entregados como operación, lista para escalar.",
  };
  const phasesLabel: LT = {
    es: "ESTRUCTURA",
    en: "STRUCTURE",
    de: "STRUKTUR", pt: "ESTRUCTURA",
  };
  const caseLabel: LT = {
    es: "CASO FLAGSHIP",
    en: "FLAGSHIP CASE",
    de: "FLAGSHIP CASE", pt: "CASO FLAGSHIP",
  };
  const caseHead: LT = {
    es: "Musgo · Juanita López",
    en: "Musgo · Juanita López",
    de: "Musgo · Juanita López", pt: "Musgo · Juanita López",
  };
  const caseSub: LT = {
    es: "Transiciones regenerativas · Bogotá",
    en: "Regenerative transitions · Bogotá",
    de: "Regenerative Übergänge · Bogotá", pt: "Transiciones regenerativas · Bogotá",
  };
  const caseStory: LT = {
    es: "Construimos Musgo desde cero — la consultora boutique de Juanita López sobre transiciones regenerativas. En 12 semanas pasamos del concepto a una operación con identidad, web, contenido y primer pipeline de clientes. Sin equipo. Sin agencia tradicional.",
    en: "We built Musgo from scratch — Juanita López's boutique consultancy on regenerative transitions. In 12 weeks we went from concept to a running operation with identity, web, content and first client pipeline. No team. No traditional agency.",
    de: "Wir haben Musgo von Grund auf gebaut — die Boutique-Beratung von Juanita López zu regenerativen Übergängen. In 12 Wochen vom Konzept zu einer laufenden Operation mit Identität, Website, Content und ersten Kunden-Pipeline. Ohne Team. Ohne klassische Agentur.", pt: "Construimos Musgo desde cero — la consultora boutique de Juanita López sobre transiciones regenerativas. En 12 semanas pasamos del concepto a una operación con identidad, web, contenido y primer pipeline de clientes. Sin equipo. Sin agencia tradicional.",
  };
  const cta: LT = {
    es: "Aplicar al programa",
    en: "Apply to the program",
    de: "Zum Programm bewerben", pt: "Aplicar al programa",
  };

  const PROGRAM_ACCENT = "#7fb878";

  return (
    <Section className="py-24 md:py-36" id="program">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Header */}
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `${PROGRAM_ACCENT}cc` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-6 max-w-3xl"
          style={{
            fontSize: "clamp(28px, 4.4vw, 56px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p
          className="font-clash text-base md:text-lg max-w-3xl leading-relaxed mb-14 md:mb-20"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {t(body, lang)}
        </p>

        {/* 3 phases */}
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `rgba(var(--text-rgb), 0.4)` }}
        >
          {t(phasesLabel, lang)}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-16 md:mb-20">
          {PROGRAM_PHASES.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl p-7 md:p-8 relative"
              style={{
                background: "rgba(var(--text-rgb), 0.025)",
                border: `1px solid ${PROGRAM_ACCENT}1a`,
              }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-5">
                <span
                  className="font-mono text-[11px] tracking-[0.25em]"
                  style={{ color: `${PROGRAM_ACCENT}cc` }}
                >
                  {p.num}
                </span>
                <span
                  className="font-clash text-[10px] tracking-[0.25em] uppercase font-medium"
                  style={{ color: `rgba(var(--text-rgb), 0.45)` }}
                >
                  {t(p.weeks, lang)}
                </span>
              </div>
              <h3
                className="font-clash font-bold text-xl md:text-2xl mb-3"
                style={{
                  letterSpacing: "-0.02em",
                  color: "rgba(var(--text-rgb), 0.92)",
                }}
              >
                {t(p.label, lang)}
              </h3>
              <p
                className="font-clash text-[14px] md:text-[15px] leading-relaxed"
                style={{ color: "rgba(var(--text-rgb), 0.6)" }}
              >
                {t(p.detail, lang)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Flagship case Musgo / Juanita */}
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `rgba(var(--text-rgb), 0.4)` }}
        >
          {t(caseLabel, lang)}
        </p>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="md:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${PROGRAM_ACCENT}33`,
              boxShadow: `0 30px 80px -30px ${PROGRAM_ACCENT}33`,
            }}
          >
            <img
              src="/images/brands/musgo/juanita-lopez-portrait.jpeg"
              alt="Juanita López — Musgo"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            <div className="absolute bottom-5 left-5 right-5">
              <p
                className="font-clash text-[9px] tracking-[0.3em] uppercase mb-1.5"
                style={{ color: `${PROGRAM_ACCENT}dd` }}
              >
                MUSGO
              </p>
              <p
                className="font-mono text-[10px]"
                style={{ color: "rgba(255,252,247,0.55)" }}
              >
                Juanita López · Founder
              </p>
            </div>
          </motion.div>

          <div className="md:col-span-7 flex flex-col">
            <h3
              className="font-clash font-bold leading-[1.05] mb-3"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.02em",
                color: "rgba(var(--text-rgb), 0.92)",
              }}
            >
              {t(caseHead, lang)}
            </h3>
            <p
              className="font-clash text-sm md:text-base mb-6"
              style={{ color: `${PROGRAM_ACCENT}cc`, letterSpacing: "0.02em" }}
            >
              {t(caseSub, lang)}
            </p>
            <p
              className="font-clash text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
              style={{ color: "rgba(var(--text-rgb), 0.65)" }}
            >
              {t(caseStory, lang)}
            </p>
            <a
              href="mailto:edgar@monzalab.com?subject=Monza%20Studio%20—%2012-Week%20Program"
              className="inline-flex items-center gap-3 font-clash text-xs tracking-[0.25em] uppercase font-medium self-start py-3 px-5 rounded-full transition-all duration-300"
              style={{
                color: PROGRAM_ACCENT,
                border: `1px solid ${PROGRAM_ACCENT}55`,
                background: `${PROGRAM_ACCENT}10`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${PROGRAM_ACCENT}25`;
                e.currentTarget.style.borderColor = PROGRAM_ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${PROGRAM_ACCENT}10`;
                e.currentTarget.style.borderColor = `${PROGRAM_ACCENT}55`;
              }}
            >
              {t(cta, lang)} <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* More program cases — additional consultoras */}
        <ProgramCases lang={lang} />
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   PROGRAM CASES — Samuel · Roberto · Felipe
   ────────────────────────────────────────── */
type ProgramCase = {
  name: string;
  cover: string;
  consultancy: string;
  desc: LT;
};

const PROGRAM_CASES: ProgramCase[] = [
  {
    name: "Samuel Cordero",
    cover: "/images/brands/program-cases/samuel-cordero.jpg",
    consultancy: "El Estratega",
    desc: {
      es: "Reestructuración empresarial. Entrega su consultoría como sistema, no como consejo suelto.",
      en: "Business restructuring. Delivers his consultancy as a system, not loose advice.",
      de: "Unternehmensrestrukturierung. Liefert seine Beratung als System, nicht als loser Rat.", pt: "Reestructuración empresarial. Entrega su consultoría como sistema, no como consejo suelto.",
    },
  },
  {
    name: "Roberto Caballero",
    cover: "/images/brands/program-cases/roberto-caballero.png",
    consultancy: "Vida, Claridad, Propósito",
    desc: {
      es: "Acompañamiento ejecutivo. Construimos su práctica privada para C-suite y founders en transición.",
      en: "Executive coaching. We built his private practice for C-suite and founders in transition.",
      de: "Executive-Coaching. Wir bauten seine Privatpraxis für C-Suite und Gründer im Übergang.", pt: "Acompañamiento ejecutivo. Construimos su práctica privada para C-suite y founders en transición.",
    },
  },
  {
    name: "Luis Felipe Hernández",
    cover: "/images/brands/program-cases/felipe-hernandez.png",
    consultancy: "Sightline Advisory",
    desc: {
      es: "Estrategia en ejecución. Consultora boutique enfocada en cerrar la brecha entre plan y resultado.",
      en: "Strategy in execution. Boutique advisory focused on closing the gap between plan and result.",
      de: "Strategie in der Ausführung. Boutique-Beratung, die die Lücke zwischen Plan und Ergebnis schließt.", pt: "Estrategia en ejecución. Consultora boutique enfocada en cerrar la brecha entre plan y resultado.",
    },
  },
];

const ProgramCases = ({ lang }: { lang: Lang }) => {
  const PROGRAM_ACCENT = "#7fb878";
  const eyebrow: LT = {
    es: "MÁS CASOS DEL PROGRAMA",
    en: "MORE PROGRAM CASES",
    de: "WEITERE PROGRAMM-CASES", pt: "MÁS CASOS DEL PROGRAMA",
  };
  const head: LT = {
    es: "Otras consultoras construidas en 12 semanas.",
    en: "Other consultancies built in 12 weeks.",
    de: "Weitere Beratungen, in 12 Wochen gebaut.", pt: "Otras consultoras construidas en 12 semanas.",
  };

  return (
    <div className="mt-20 md:mt-28 pt-14 md:pt-20" style={{ borderTop: "1px solid rgba(var(--text-rgb), 0.06)" }}>
      <p
        className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-5"
        style={{ color: `${PROGRAM_ACCENT}cc` }}
      >
        {t(eyebrow, lang)}
      </p>
      <h3
        className="font-clash font-bold leading-[1.05] mb-12 max-w-3xl"
        style={{
          fontSize: "clamp(22px, 3vw, 36px)",
          letterSpacing: "-0.02em",
          color: "rgba(var(--text-rgb), 0.92)",
        }}
      >
        {t(head, lang)}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
        {PROGRAM_CASES.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(var(--text-rgb), 0.08)" }}
          >
            <img
              src={c.cover}
              alt={c.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              style={{ opacity: 0.92 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.92) 100%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
              <p
                className="font-clash text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-medium mb-2"
                style={{ color: `${PROGRAM_ACCENT}dd` }}
              >
                {c.consultancy}
              </p>
              <h4
                className="font-clash font-bold text-lg md:text-2xl mb-2.5"
                style={{
                  letterSpacing: "-0.02em",
                  color: "rgba(255,252,247,0.95)",
                }}
              >
                {c.name}
              </h4>
              <p
                className="font-clash text-[12px] md:text-[13px] leading-relaxed"
                style={{ color: "rgba(255,252,247,0.65)" }}
              >
                {t(c.desc, lang)}
              </p>
            </div>
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              style={{ boxShadow: `inset 0 0 80px -10px ${PROGRAM_ACCENT}30` }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────
   BRANDS WE'VE GROWN — strip
   ────────────────────────────────────────── */
type GrownBrand = {
  name: string;
  slug: string | null;
  desc: LT;
  accent: string;
  cover: string;
};

const GROWN_BRANDS: GrownBrand[] = [
  {
    name: "Eleonora Morales",
    slug: "eleonora-morales",
    desc: {
      es: "Plataforma de moda preowned de lujo, curada pieza por pieza.",
      en: "Preowned luxury fashion platform, curated piece by piece.",
      de: "Plattform für Preowned-Luxusmode, kuratiert Stück für Stück.", pt: "Plataforma de moda preowned de lujo, curada pieza por pieza.",
    },
    accent: "#f074aa",
    cover: "/images/brands/eleonora/eleonora-portrait.jpg",
  },
  {
    name: "Garage Advisory",
    slug: null,
    desc: {
      es: "Concierge de carros exóticos para coleccionistas en Europa.",
      en: "Exotic-car concierge for collectors across Europe.",
      de: "Exotic-Car-Concierge für Sammler in Europa.", pt: "Concierge de carros exóticos para coleccionistas en Europa.",
    },
    accent: "#C4A35A",
    cover: "/images/brands/garage-advisory/aston-front.jpg",
  },
  {
    name: "Guardian of Speed",
    slug: null,
    desc: {
      es: "Atelier y comunidad para coleccionistas de carros clásicos.",
      en: "Atelier and community for classic-car collectors.",
      de: "Atelier und Community für Sammler klassischer Autos.", pt: "Atelier y comunidad para coleccionistas de carros clásicos.",
    },
    accent: "#B8B5AD",
    cover: "/images/brands/guardian-of-speed/hero-runway.jpg",
  },
  {
    name: "Pacho Alvarez",
    slug: "pacho-alvarez",
    desc: {
      es: "Piloto colombiano del Dakar Rally 2026.",
      en: "Colombian driver in the 2026 Dakar Rally.",
      de: "Kolumbianischer Fahrer der Dakar Rally 2026.", pt: "Piloto colombiano del Dakar Rally 2026.",
    },
    accent: "#D9A468",
    cover: "/images/projects/pacho-alvarez/dakar-2026-dunas.jpg",
  },
  {
    name: "Musgo",
    slug: null,
    desc: {
      es: "Consultora boutique de transiciones regenerativas.",
      en: "Boutique consultancy on regenerative transitions.",
      de: "Boutique-Beratung für regenerative Transformationen.", pt: "Consultora boutique de transiciones regenerativas.",
    },
    accent: "#7fb878",
    cover: "/images/brands/musgo/juanita-lopez-portrait.jpeg",
  },
  {
    name: "Bavarian Econs",
    slug: "bavarian-econs",
    desc: {
      es: "BMW 2002 EV · Forbes · global luxury",
      en: "BMW 2002 EV · Forbes · global luxury",
      de: "BMW 2002 EV · Forbes · Global Luxury", pt: "BMW 2002 EV · Forbes · global luxury",
    },
    accent: "#A8A29E",
    cover: "/images/projects/bavarian-econs/coast-frontal.jpeg",
  },
];

const BrandsStrip = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = {
    es: "BRANDS WE'VE GROWN",
    en: "BRANDS WE'VE GROWN",
    de: "BRANDS WE'VE GROWN", pt: "BRANDS WE'VE GROWN",
  };
  const head: LT = {
    es: "Marcas que crecimos juntos.",
    en: "Brands we grew together.",
    de: "Marken — gemeinsam gewachsen.", pt: "Marcas que crecimos juntos.",
  };
  const langPrefix = lang === "es" ? "" : `/${lang}`;

  return (
    <Section className="py-24 md:py-32" id="brands">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex items-baseline justify-between mb-12 md:mb-16 gap-6 flex-wrap">
          <div>
            <p
              className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-4"
              style={{ color: `${ACCENT}b3` }}
            >
              {t(eyebrow, lang)}
            </p>
            <h2
              className="font-clash font-bold leading-[1.05]"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.025em",
                color: "rgba(var(--text-rgb), 0.92)",
              }}
            >
              {t(head, lang)}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {GROWN_BRANDS.map((brand, i) => {
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
                style={{ border: "1px solid rgba(var(--text-rgb), 0.06)" }}
              >
                <img
                  src={brand.cover}
                  alt={brand.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  style={{ opacity: 0.78 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)`,
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                  <span
                    className="font-mono text-[10px] tracking-[0.2em] mb-2"
                    style={{ color: `${brand.accent}cc` }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="font-clash font-bold text-xl md:text-2xl mb-1"
                    style={{
                      letterSpacing: "-0.02em",
                      color: "rgba(255,252,247,0.95)",
                    }}
                  >
                    {brand.name}
                  </h3>
                  <p
                    className="font-clash text-[12px] md:text-sm"
                    style={{ color: "rgba(255,252,247,0.55)" }}
                  >
                    {t(brand.desc, lang)}
                  </p>
                </div>
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 80px -10px ${brand.accent}30` }}
                />
              </motion.div>
            );
            return brand.slug ? (
              <Link key={brand.name} to={`${langPrefix}/work/${brand.slug}`}>
                {inner}
              </Link>
            ) : (
              <div key={brand.name}>{inner}</div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   CRITERIA / CTA
   ────────────────────────────────────────── */
const CriteriaCTA = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "CRITERIO", en: "CRITERIA", de: "KRITERIUM", pt: "CRITERIO" };
  const head: LT = {
    es: "No tomamos a todos.",
    en: "We don't take on everyone.",
    de: "Wir nehmen nicht jeden.", pt: "No tomamos a todos.",
  };
  const body: LT = {
    es: "Solo trabajamos con marcas que ya tienen presencia. Si la tuya la tiene, hablemos.",
    en: "We only work with brands that already have presence. If yours does, let's talk.",
    de: "Wir arbeiten nur mit Marken, die bereits Präsenz haben. Wenn deine das tut, lass uns reden.", pt: "Solo trabajamos con marcas que ya tienen presencia. Si la tuya la tiene, hablemos.",
  };
  const cta: LT = { es: "Hablemos", en: "Let's talk", de: "Lass uns reden", pt: "Hablemos" };

  return (
    <Section className="py-32 md:py-40">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div
          className="rounded-3xl p-10 md:p-16 lg:p-20 relative overflow-hidden"
          style={{
            border: `1px solid ${ACCENT}33`,
            background: `radial-gradient(ellipse at 30% 20%, ${ACCENT}14 0%, transparent 60%), rgba(var(--text-rgb), 0.02)`,
          }}
        >
          <p
            className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
            style={{ color: `${ACCENT}b3` }}
          >
            {t(eyebrow, lang)}
          </p>
          <h2
            className="font-clash font-bold leading-[1.02] mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              letterSpacing: "-0.03em",
              color: "rgba(var(--text-rgb), 0.92)",
            }}
          >
            {t(head, lang)}
          </h2>
          <p
            className="font-clash text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
            style={{ color: "rgba(var(--text-rgb), 0.6)" }}
          >
            {t(body, lang)}
          </p>
          <a
            href="mailto:edgar@monzalab.com?subject=Monza%20Studio%20—%20Hablemos"
            className="inline-flex items-center gap-3 font-clash text-sm tracking-[0.2em] uppercase font-medium py-4 px-7 rounded-full transition-all duration-300"
            style={{
              color: "#0B0B10",
              background: ACCENT,
              boxShadow: `0 20px 60px -20px ${ACCENT}99`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ACCENT_DEEP;
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = ACCENT;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t(cta, lang)} <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   PAGE
   ────────────────────────────────────────── */
const MonzaStudio = () => {
  const { language } = useLanguage();
  const lang = language as Lang;

  return (
    <PremiumBackground>
      <SEO
        path="/monzastudio"
        type="website"
        title={{
          es: "Monza Studio — No delego marcas. Las construyo. · Monza Lab",
          en: "Monza Studio — I don't delegate brands. I build them. · Monza Lab",
          de: "Monza Studio — Ich delegiere keine Marken. Ich baue sie. · Monza Lab",
          pt: "Monza Studio — Não delego marcas. Construo-as. · Monza Lab",
        }}
        description={{
          es: "Monza Studio: estrategia, branding, producto, contenido y growth para marcas globales. Atendido por el founder, con criterio editorial y la IA como palanca.",
          en: "Monza Studio: strategy, branding, product, content and growth for global brands. Founder-attended, with editorial criterion and AI as leverage.",
          de: "Monza Studio: Strategie, Branding, Produkt, Content und Growth für globale Marken. Vom Founder betreut, mit redaktionellem Urteil und KI als Hebel.",
          pt: "Monza Studio: estratégia, branding, produto, conteúdo e growth para marcas globais. Acompanhado pelo founder, com critério editorial e a IA como alavanca.",
        }}
        ogPage="monzastudio"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Monza Studio",
          provider: {
            "@type": "Organization",
            name: "Monza Lab",
            url: "https://monzalab.com",
          },
          serviceType: "Brand growth, e-commerce, content & paid media operation",
          areaServed: "Global",
        }}
      />

      <main id="main" aria-label="Monza Studio">
        <Hero lang={lang} />
        <Purpose lang={lang} />
        <Capabilities lang={lang} />
        <ShootInfrastructure lang={lang} />
        <FlagshipEleonora lang={lang} />
        <ProgramFlagship lang={lang} />
        <BrandsStrip lang={lang} />
        <CriteriaCTA lang={lang} />
      </main>

      <FooterMinimal />
    </PremiumBackground>
  );
};

export default MonzaStudio;
