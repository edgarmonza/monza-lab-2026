import { useRef, useState, useEffect, useCallback, memo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "@/theme/ThemeContext";
import { useLanguage } from "@/i18n/LanguageContext";

type LangText = { es: string; en: string; de: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Reusable interval hook ── */
const useAutoRotate = (length: number, ms: number) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (length <= 1) return;
    const id = setInterval(() => setIdx(p => (p + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms]);
  return [idx, setIdx] as const;
};

type BrandProject = {
  name: string;
  subtitle: LangText;
  colors: string[];
  font: string;
  tagline: LangText;
};

type Experience = {
  name: string;
  subtitle: LangText;
  video: string;
  accent: string;
};

type Capability = {
  id: string;
  label: LangText;
  shortLabel: LangText;
  desc: LangText;
  accent: string;
  tag: string;
  type: "video" | "collage" | "brands" | "experiences" | "content-board" | "terminal";
  video?: string;
  images?: string[];
  brands?: BrandProject[];
  experiences?: Experience[];
};

const CAPABILITIES: Capability[] = [
  {
    id: "brand-systems",
    shortLabel: { es: "Brand Systems", en: "Brand Systems", de: "Brand Systems" },
    label: { es: "Sistemas de marca completos", en: "Complete brand systems", de: "Komplette Markensysteme" },
    desc: {
      es: "Manual de marca, paleta, tipografía, logo, aplicaciones, voz — entregados como sistema interactivo, no un PDF estático. Listos en días, no meses.",
      en: "Brand manual, palette, typography, logo, applications, voice — delivered as an interactive system, not a static PDF. Ready in days, not months.",
      de: "Markenhandbuch, Palette, Typografie, Logo, Anwendungen, Stimme — als interaktives System geliefert, nicht als statisches PDF. Fertig in Tagen, nicht Monaten.",
    },
    type: "brands",
    brands: [
      {
        name: "ELEONORA MORALES",
        subtitle: { es: "Coleccionista de belleza · Moda circular & lujo", en: "Beauty collector · Circular fashion & luxury", de: "Beauty-Sammlerin · Circular Fashion & Luxus" },
        colors: ["#f074aa", "#d461c1", "#9af5fd", "#e5ff21"],
        font: "Midashi Min",
        tagline: { es: "Nada es más sostenible que lo que ya existe.", en: "Nothing is more sustainable than what already exists.", de: "Nichts ist nachhaltiger als das, was bereits existiert." },
      },
      {
        name: "MUSGO",
        subtitle: { es: "Juanita López · Transiciones regenerativas", en: "Juanita López · Regenerative transitions", de: "Juanita López · Regenerative Übergänge" },
        colors: ["#689b61", "#7fb878", "#0f0f0f", "#eeeeee"],
        font: "Bebas Neue",
        tagline: { es: "Regenera sin imponer.", en: "Regenerate without imposing.", de: "Regenerieren ohne aufzuzwingen." },
      },
      {
        name: "SAMUEL CORDERO",
        subtitle: { es: "El Estratega · Reestructuración empresarial", en: "The Strategist · Business restructuring", de: "Der Stratege · Unternehmensrestrukturierung" },
        colors: ["#E3342F", "#FFDA00", "#006CB7", "#00852B"],
        font: "Space Grotesk",
        tagline: { es: "Sistemas, no motivación.", en: "Systems, not motivation.", de: "Systeme, nicht Motivation." },
      },
    ],
    accent: "#F8B4D9",
    tag: "BRAND × SYSTEM",
  },
  {
    id: "digital-branding",
    shortLabel: { es: "Digital Branding", en: "Digital Branding", de: "Digital Branding" },
    label: { es: "Branding digital — marcas que cobran vida", en: "Digital branding — brands that come alive", de: "Digital Branding — Marken, die lebendig werden" },
    desc: {
      es: "Logos animados, identidad visual en web, sistemas interactivos. Tu marca no es un archivo — es una experiencia que vive en cada pantalla.",
      en: "Animated logos, visual identity on web, interactive systems. Your brand isn't a file — it's an experience that lives on every screen.",
      de: "Animierte Logos, visuelle Identität im Web, interaktive Systeme. Deine Marke ist keine Datei — sie ist ein Erlebnis auf jedem Bildschirm.",
    },
    type: "video",
    video: "/videos/monza-reel-beat-synced.mp4",
    accent: "#C4A35A",
    tag: "IDENTITY × MOTION",
  },
  {
    id: "experiencias",
    shortLabel: { es: "Experiencias Digitales", en: "Digital Experiences", de: "Digitale Erlebnisse" },
    label: { es: "No hago websites — creo experiencias digitales", en: "I don't make websites — I create digital experiences", de: "Ich mache keine Websites — ich kreiere digitale Erlebnisse" },
    desc: {
      es: "Cada interacción, cada transición, cada detalle diseñado para que tu marca se sienta a otro nivel. Esto no es una página web.",
      en: "Every interaction, every transition, every detail designed to make your brand feel next-level. This is not a webpage.",
      de: "Jede Interaktion, jeder Übergang, jedes Detail — gestaltet, damit sich deine Marke auf einem anderen Level anfühlt. Das ist keine Webseite.",
    },
    type: "experiences",
    experiences: [
      { name: "PACHO ALVAREZ", subtitle: { es: "Piloto Dakar · Experiencia inmersiva", en: "Dakar Driver · Immersive experience", de: "Dakar-Fahrer · Immersives Erlebnis" }, video: "/videos/pacho-alvarez-reel.mp4", accent: "#E8C547" },
      { name: "BAVARIAN ECONS", subtitle: { es: "BMW 2002te · The Classic of the Future", en: "BMW 2002te · The Classic of the Future", de: "BMW 2002te · The Classic of the Future" }, video: "/videos/bavarian-econs-reel.mp4", accent: "#38BDF8" },
      { name: "SPECTRO", subtitle: { es: "Gaming & Esports · Plataforma digital", en: "Gaming & Esports · Digital platform", de: "Gaming & Esports · Digitale Plattform" }, video: "/videos/spectro-reel.mp4", accent: "#8B5CF6" },
    ],
    accent: "#38BDF8",
    tag: "EXPERIENCE × DIGITAL",
  },
  {
    id: "ai-photos",
    shortLabel: { es: "AI Photography", en: "AI Photography", de: "AI Photography" },
    label: { es: "Fotografía AI a escala", en: "AI Photography at scale", de: "KI-Fotografie im großen Maßstab" },
    desc: {
      es: "Bibliotecas enteras de fotografía editorial generadas en minutos. Sin sesión, sin estudio, sin límites de volumen.",
      en: "Entire editorial photography libraries generated in minutes. No session, no studio, no volume limits.",
      de: "Ganze redaktionelle Fotobibliotheken in Minuten generiert. Kein Shooting, kein Studio, keine Volumenbegrenzung.",
    },
    type: "collage",
    images: [
      "/images/ai-motorsport/slide-07-reflection.png",
      "/images/ai-motorsport/slide-03-badge.png",
      "/images/ai-motorsport/slide-08-rain.png",
      "/images/ai-motorsport/edgar-helmet-rain.png",
      "/images/ai-motorsport/slide-04-cockpit.png",
      "/images/ai-motorsport/slide-06-engine.png",
      "/images/ai-motorsport/edgar-helmet-dark.png",
      "/images/ai-motorsport/slide-05-wheel.png",
    ],
    accent: "#8B5CF6",
    tag: "AI × VOLUME",
  },
  {
    id: "content-design",
    shortLabel: { es: "Contenido", en: "Content", de: "Content" },
    label: {
      es: "Ecosistema completo de contenido",
      en: "Complete content ecosystem",
      de: "Komplettes Content-Ökosystem",
    },
    desc: {
      es: "LinkedIn, stories, carousels, posts — todo el diseño de piezas para tu marca. No solo hago un post: te entrego el sistema visual completo.",
      en: "LinkedIn, stories, carousels, posts — all the design pieces for your brand. I don't just make a post: I deliver the complete visual system.",
      de: "LinkedIn, Stories, Karussells, Posts — alle Designstücke für deine Marke. Ich mache nicht nur einen Post: Ich liefere das komplette visuelle System.",
    },
    type: "content-board",
    images: [
      "/images/content-design/carousel-01.png",
      "/images/content-design/carousel-02.png",
      "/images/content-design/carousel-03.png",
      "/images/content-design/carousel-04.png",
      "/images/content-design/carousel-05.png",
      "/images/content-design/carousel-06.png",
    ],
    accent: "#FF6B6B",
    tag: "CONTENT × DESIGN",
  },
  {
    id: "readers",
    shortLabel: { es: "Voice & Motion", en: "Voice & Motion", de: "Voice & Motion" },
    label: {
      es: "Tipografía cinética, readers & voz",
      en: "Kinetic typography, readers & voice",
      de: "Kinetische Typografie, Readers & Stimme",
    },
    desc: {
      es: "Contenido que impacta en 3 segundos. Speed readers, manifiestos animados, integración de voz — formatos que detienen el scroll.",
      en: "Content that hits in 3 seconds. Speed readers, animated manifestos, voice integration — formats that stop the scroll.",
      de: "Content, der in 3 Sekunden wirkt. Speed Readers, animierte Manifeste, Sprachintegration — Formate, die das Scrollen stoppen.",
    },
    type: "video",
    video: "/videos/monza-reader-demo.mp4",
    accent: "#4ECDC4",
    tag: "MOTION × VOICE",
  },
  {
    id: "automation",
    shortLabel: { es: "Automatización", en: "Automation", de: "Automatisierung" },
    label: {
      es: "Automatización, datos & infraestructura",
      en: "Automation, data & infrastructure",
      de: "Automatisierung, Daten & Infrastruktur",
    },
    desc: {
      es: "Bases de datos, scrapers, pipelines de contenido, generación por API — la infraestructura invisible que hace que todo escale sin fricción.",
      en: "Databases, scrapers, content pipelines, API generation — the invisible infrastructure that makes everything scale without friction.",
      de: "Datenbanken, Scraper, Content-Pipelines, API-Generierung — die unsichtbare Infrastruktur, die alles reibungslos skalieren lässt.",
    },
    type: "terminal",
    accent: "#F8B4D9",
    tag: "TECH × SCALE",
  },
];

/* ── Video player with proper cleanup ── */
const ShowcaseVideo = memo(({ src }: { src: string }) => {
  const nodeRef = useRef<HTMLVideoElement | null>(null);
  const obsRef = useRef<IntersectionObserver | null>(null);

  const setRef = useCallback((node: HTMLVideoElement | null) => {
    // Cleanup previous
    if (obsRef.current && nodeRef.current) {
      obsRef.current.unobserve(nodeRef.current);
      obsRef.current.disconnect();
    }
    nodeRef.current = node;
    if (!node) return;
    const play = () => node.play().catch(() => {});
    node.addEventListener("canplay", play, { once: true });
    play();
    obsRef.current = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) play(); else node.pause(); },
      { threshold: 0.15 }
    );
    obsRef.current.observe(node);
  }, []);

  return (
    <video
      ref={setRef}
      key={src}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      className="w-full h-full object-cover"
    />
  );
});

/* ── Photo grid — cinematic mosaic with auto-rotate hero ── */
const PhotoGrid = memo(({ images }: { images: string[] }) => {
  const [heroIdx, setHeroIdx] = useAutoRotate(images.length, 2800);
  const thumbs = images.filter((_, idx) => idx !== heroIdx).slice(0, 3);

  return (
    <div className="h-full w-full grid grid-cols-1 sm:grid-cols-4 grid-rows-1 sm:grid-rows-3 gap-1.5">
      {/* Hero — full width on mobile, 3 cols on desktop */}
      <div className="col-span-1 sm:col-span-3 row-span-1 sm:row-span-3 relative rounded-lg overflow-hidden min-h-[200px]">
        {images.map((img, i) => (
          <img
            key={img}
            src={img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === heroIdx ? 1 : 0 }}
            loading="lazy"
          />
        ))}
        <div className="absolute bottom-3 left-3 z-10 px-2 py-1 rounded-md" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
          <span className="text-[9px] font-mono text-white/60">{heroIdx + 1} / {images.length}</span>
        </div>
      </div>

      {/* Thumbnails — hidden on mobile, right column on desktop */}
      {thumbs.map((img) => (
        <div
          key={img}
          className="relative rounded-lg overflow-hidden cursor-pointer group hidden sm:block"
          onClick={() => setHeroIdx(images.indexOf(img))}
        >
          <img src={img} alt="" className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300" />
        </div>
      ))}
    </div>
  );
});

/* ── LEGO block with stud ── */
const LegoBlock = ({ color, size = 48 }: { color: string; size?: number }) => (
  <div className="relative rounded-[4px]" style={{ width: size, height: size, background: color }}>
    <div className="absolute rounded-full" style={{
      width: size * 0.4, height: size * 0.4, top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      background: `linear-gradient(135deg, ${color} 0%, rgba(255,255,255,0.25) 100%)`,
      boxShadow: `inset 0 -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.15)`,
    }} />
  </div>
);

/* ── Floating mockup card ── */
const MockCard = ({ children, delay, className = "", style = {} }: {
  children: React.ReactNode; delay: number; className?: string; style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay, ease: EASE }}
    className={`absolute rounded-xl shadow-2xl ${className}`}
    style={{ ...style, backdropFilter: "blur(12px)" }}
  >
    {children}
  </motion.div>
);

/* ── Punticos rosados text style (reusable) ── */
const pinkDots = {
  backgroundImage: "radial-gradient(circle, #f074aa 2px, transparent 2px)",
  backgroundSize: "6px 6px",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

/* ── Eleonora Morales brand board ── */
const EleonoraBoard = memo(() => (
  <div className="absolute inset-0 overflow-hidden" style={{ background: "#0a0a0a" }}>
    {/* Radial glows — pink atmosphere */}
    <div className="absolute inset-0" style={{
      background: "radial-gradient(ellipse at 30% 40%, rgba(240,116,170,0.18) 0%, transparent 55%), radial-gradient(ellipse at 70% 25%, rgba(212,97,193,0.10) 0%, transparent 45%), radial-gradient(ellipse at 55% 75%, rgba(154,245,253,0.06) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(229,255,33,0.03) 0%, transparent 40%)",
    }} />

    {/* Punticos rosados background pattern */}
    <div className="absolute inset-0 opacity-[0.07]" style={{
      backgroundImage: "radial-gradient(circle, #f074aa 1.5px, transparent 1.5px)",
      backgroundSize: "10px 10px",
    }} />

    {/* ★ Mobile: stacked center layout / Desktop: left-right split */}
    {/* LEFT SIDE — Hero name stack */}
    <div className="absolute left-[5%] md:left-[6%] top-[15%] md:top-0 md:bottom-0 flex items-start md:items-center z-10 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex flex-col"
      >
        <span className="block text-[22px] sm:text-[32px] md:text-[46px] lg:text-[58px] font-bold leading-[0.88]" style={{
          ...pinkDots, letterSpacing: "-0.04em",
        }}>
          Eleonora
        </span>
        <span className="block text-[26px] sm:text-[38px] md:text-[54px] lg:text-[68px] italic font-bold leading-[0.85]" style={{
          color: "#f074aa", letterSpacing: "-0.03em",
        }}>
          Morales
        </span>
        <div className="mt-2 md:mt-3" style={{ borderBottom: "2px dotted #f074aa", width: 60, opacity: 0.5 }} />
        <p className="text-[7px] md:text-[9px] tracking-[0.2em] uppercase mt-2 md:mt-3" style={{ color: "rgba(240,116,170,0.35)" }}>
          Coleccionista de belleza
        </p>
      </motion.div>
    </div>

    {/* RIGHT SIDE — "La Moda es Magia" title block */}
    <div className="absolute right-[5%] md:right-[8%] bottom-[20%] md:bottom-auto md:top-0 md:h-full flex items-end md:items-center z-10 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="text-right flex flex-col items-end"
      >
        <span className="block text-[7px] sm:text-[9px] md:text-[12px] lg:text-[14px] font-bold uppercase" style={{
          letterSpacing: "0.5em", color: "rgba(255,255,255,0.5)",
        }}>
          LA
        </span>
        <span className="block text-[24px] sm:text-[36px] md:text-[50px] lg:text-[64px] italic font-bold leading-[0.85]" style={{
          ...pinkDots, letterSpacing: "-0.03em",
        }}>
          Moda
        </span>
        <span className="block text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] font-bold uppercase" style={{
          letterSpacing: "0.4em", color: "rgba(255,255,255,0.4)",
        }}>
          ES
        </span>
        <span className="block text-[28px] sm:text-[40px] md:text-[56px] lg:text-[72px] font-bold leading-[0.85]" style={{
          ...pinkDots, letterSpacing: "-0.04em",
          backgroundImage: "radial-gradient(circle, #d461c1 2px, transparent 2px)",
        }}>
          Magia
        </span>
      </motion.div>
    </div>

    {/* Three worlds — floating bottom center — hidden xs */}
    <MockCard delay={0.4} className="hidden sm:block" style={{ bottom: "14%", left: "50%", transform: "translateX(-50%)", background: "rgba(10,10,10,0.85)", border: "1px solid rgba(240,116,170,0.1)" }}>
      <div className="px-4 py-3 flex items-center gap-4 md:gap-6">
        {[
          { name: "Garage Sale", em: "by EM", color: "#f074aa" },
          { name: "Luxe", em: "by EM", color: "#d461c1" },
          { name: "Mundo", em: "Lujo", color: "#9af5fd" },
        ].map((w, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: w.color }} />
            <p className="text-[9px] md:text-[10px] font-bold text-white/70 leading-tight whitespace-nowrap">
              {w.name} <span className="italic" style={{ color: w.color }}>{w.em}</span>
            </p>
          </div>
        ))}
      </div>
    </MockCard>

    {/* Pink manifesto card — top right corner — hidden xs */}
    <MockCard delay={0.5} className="hidden sm:block" style={{ top: "5%", right: "4%", width: "28%", maxWidth: 200, background: "#f074aa", border: "none" }}>
      <div className="p-3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "radial-gradient(circle, #000 1.5px, transparent 1.5px)",
          backgroundSize: "8px 8px",
        }} />
        <p className="relative text-sm md:text-base font-bold leading-tight" style={{ color: "rgba(0,0,0,0.85)", letterSpacing: "-0.02em" }}>
          Nada es más sostenible que lo que ya existe.
        </p>
        <span className="relative block text-[7px] mt-2" style={{
          color: "rgba(0,0,0,0.35)",
          textDecorationLine: "underline",
          textDecorationStyle: "dotted",
          textDecorationColor: "rgba(0,0,0,0.2)",
        }}>
          — Eleonora Morales
        </span>
      </div>
    </MockCard>

    {/* Color palette — bottom right */}
    <MockCard delay={0.55} style={{ bottom: "5%", right: "4%", background: "rgba(10,10,10,0.8)", border: "1px solid rgba(240,116,170,0.08)" }}>
      <div className="px-3 py-2 flex gap-1.5">
        {["#f074aa", "#d461c1", "#e587f8", "#9af5fd", "#e5ff21", "#ffa2eb"].map((c, i) => (
          <div key={i} className="w-5 h-5 md:w-6 md:h-6 rounded-md" style={{ background: c, boxShadow: `0 3px 8px ${c}20` }} />
        ))}
      </div>
    </MockCard>

    {/* Nav mockup — top left corner — hidden xs */}
    <MockCard delay={0.45} className="hidden sm:block" style={{ top: "5%", left: "4%", background: "rgba(10,10,10,0.8)", border: "1px solid rgba(240,116,170,0.06)" }}>
      <div className="px-3 py-2 flex items-center gap-3">
        <span className="text-[8px] font-bold" style={{ color: "#f074aa" }}>EM</span>
        <div className="flex gap-2">
          {["Tienda", "Nosotros", "Contacto"].map((t) => (
            <span key={t} className="text-[6px] md:text-[7px] tracking-[0.1em] uppercase" style={{
              color: "rgba(255,255,255,0.25)",
              textDecorationLine: "underline",
              textDecorationStyle: "dotted",
              textDecorationColor: "rgba(240,116,170,0.2)",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </MockCard>
  </div>
));

/* ── Musgo brand board — Editorial, Bebas Neue, grain texture ── */
const MusgoBoard = memo(() => (
  <div className="absolute inset-0 overflow-hidden" style={{ background: "#0d0d0d" }}>
    {/* Forest green radials */}
    <div className="absolute inset-0" style={{
      background: "radial-gradient(ellipse at 20% 50%, rgba(104,155,97,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(127,184,120,0.08) 0%, transparent 45%), radial-gradient(ellipse at 60% 80%, rgba(104,155,97,0.05) 0%, transparent 40%)",
    }} />

    {/* Grain texture overlay — key Musgo identity element */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "128px 128px",
    }} />

    {/* ★ CENTER — MUSGO wordmark, massive Bebas Neue uppercase */}
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-center"
      >
        {/* MUSGO — huge, condensed, tight tracking like moss growing dense */}
        <h3 className="font-bold leading-[0.82] uppercase" style={{
          fontSize: "clamp(48px, 14vw, 160px)",
          color: "#689b61",
          letterSpacing: "-0.03em",
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
        }}>
          MUSGO
        </h3>
        {/* Animated green line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="h-[2px] rounded-full mx-auto mt-3"
          style={{ background: "#689b61" }}
        />
        {/* Tagline — Inter light, editorial */}
        <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase mt-4 font-light" style={{ color: "rgba(104,155,97,0.45)" }}>
          Regenera sin imponer
        </p>
      </motion.div>
    </div>

    {/* ★ TOP LEFT — Editorial quote card (cream, premium) — hidden on xs */}
    <MockCard delay={0.3} className="hidden sm:block" style={{ top: "6%", left: "4%", width: "34%", maxWidth: 260, background: "#eeeeee", border: "none" }}>
      <div className="p-4 md:p-5">
        <p className="text-[7px] tracking-[0.3em] uppercase mb-3 font-medium" style={{ color: "rgba(53,53,53,0.3)" }}>Musgo · Manifiesto</p>
        <p className="text-sm md:text-base font-bold leading-[1.2]" style={{ color: "#353535", letterSpacing: "-0.02em" }}>
          Cambio no es lo mismo<br />que transición.
        </p>
        <p className="text-[9px] font-light mt-2 leading-relaxed" style={{ color: "rgba(53,53,53,0.45)" }}>
          Tu equipo necesita vivir la estrategia,<br />no solo escucharla.
        </p>
        <div className="mt-3 pt-2.5" style={{ borderTop: "1px solid rgba(104,155,97,0.15)" }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full" style={{ background: "#689b61" }} />
            <div>
              <p className="text-[8px] font-semibold" style={{ color: "#353535" }}>Juanita López Peláez</p>
              <p className="text-[6px] font-light" style={{ color: "rgba(53,53,53,0.35)" }}>Transiciones regenerativas</p>
            </div>
          </div>
        </div>
      </div>
    </MockCard>

    {/* ★ TOP RIGHT — Dark editorial card — hidden on xs */}
    <MockCard delay={0.4} className="hidden sm:block" style={{ top: "5%", right: "4%", width: "30%", maxWidth: 220, background: "#282828", border: "1px solid rgba(104,155,97,0.08)" }}>
      <div className="p-4">
        <p className="text-[20px] md:text-[26px] font-bold uppercase leading-[0.82]" style={{
          color: "#7fb878", letterSpacing: "-0.03em",
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
        }}>
          HABILITAR<br />INTEGRAR<br />TRADUCIR
        </p>
        <div className="flex gap-1.5 mt-3">
          {["#689b61", "#7fb878", "#353535", "#eeeeee"].map((c, i) => (
            <div key={i} className="w-5 h-5 rounded-md" style={{ background: c, border: c === "#eeeeee" ? "1px solid rgba(0,0,0,0.1)" : "none" }} />
          ))}
        </div>
      </div>
    </MockCard>

    {/* ★ BOTTOM LEFT — Services card */}
    <MockCard delay={0.5} style={{ bottom: "10%", left: "5%", background: "rgba(13,13,13,0.9)", border: "1px solid rgba(104,155,97,0.1)" }}>
      <div className="p-3 md:p-4">
        <p className="text-[7px] tracking-[0.25em] uppercase mb-2.5 font-medium" style={{ color: "rgba(104,155,97,0.3)" }}>Servicios</p>
        {["Talleres de transición", "Consultoría regenerativa", "Estrategia de marca"].map((s, i) => (
          <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
            <div className="w-1 h-1 rounded-full" style={{ background: "#689b61" }} />
            <span className="text-[9px] md:text-[10px] font-light" style={{ color: "rgba(238,238,238,0.5)" }}>{s}</span>
          </div>
        ))}
      </div>
    </MockCard>

    {/* ★ BOTTOM RIGHT — Editorial button mockup */}
    <MockCard delay={0.55} style={{ bottom: "12%", right: "5%", background: "transparent", border: "1.5px solid #689b61" }}>
      <div className="px-5 py-2.5 flex items-center gap-3">
        <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "#689b61" }}>
          Explorar Musgo
        </span>
        <span style={{ color: "#689b61" }}>→</span>
      </div>
    </MockCard>

    {/* ★ BOTTOM CENTER — musgo.space label */}
    <MockCard delay={0.6} style={{ bottom: "4%", left: "50%", transform: "translateX(-50%)", background: "rgba(13,13,13,0.8)", border: "1px solid rgba(104,155,97,0.06)" }}>
      <div className="px-4 py-1.5">
        <span className="text-[8px] font-light tracking-[0.15em]" style={{ color: "rgba(104,155,97,0.4)" }}>musgo.space</span>
      </div>
    </MockCard>
  </div>
));

/* ── Samuel Cordero brand board — LEGO system, bold, strategic ── */
const SamuelBoard = memo(() => {
  const colors = ["#E3342F", "#FFDA00", "#006CB7", "#00852B"];
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Stud pattern — bigger, more visible */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 5px, transparent 5px)`,
        backgroundSize: "48px 48px",
      }} />

      {/* Color strip top — thicker */}
      <div className="absolute top-0 left-0 right-0 flex h-2 z-20">
        {colors.map((c, i) => <div key={i} className="flex-1" style={{ background: c }} />)}
      </div>
      {/* Color strip bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex h-1 z-20">
        {colors.map((c, i) => <div key={i} className="flex-1" style={{ background: c, opacity: 0.4 }} />)}
      </div>

      {/* ★ CENTER — LEGO logo + name, much bigger */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-center">
          {/* Big LEGO grid */}
          <div className="grid grid-cols-2 gap-2 md:gap-2.5 mx-auto mb-6" style={{ width: "fit-content" }}>
            {colors.map((c, i) => <LegoBlock key={i} color={c} size={52} />)}
          </div>
          {/* Name */}
          <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.9] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            SAMUEL<br />CORDERO
          </h3>
          <p className="text-[9px] tracking-[0.3em] uppercase mt-4 text-white/25 font-mono">El Estratega · Reestructuración</p>
          {/* 4-color bar under name */}
          <div className="flex gap-0.5 mt-3 mx-auto" style={{ width: "fit-content" }}>
            {colors.map((c, i) => <div key={i} className="w-8 md:w-10 h-1 rounded-sm" style={{ background: c }} />)}
          </div>
        </motion.div>
      </div>

      {/* ★ TOP RIGHT — Social post with impact quote — hidden xs */}
      <MockCard delay={0.3} className="hidden sm:block" style={{ top: "7%", right: "4%", width: "34%", maxWidth: 250, background: "rgba(17,17,17,0.92)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="p-4 md:p-5">
          <div className="flex gap-1.5 mb-3">
            {colors.map((c, i) => <LegoBlock key={i} color={c} size={20} />)}
          </div>
          <p className="text-base md:text-lg font-bold text-white/90 leading-tight tracking-tight">
            Tu negocio no necesita motivación.
          </p>
          <p className="text-[10px] text-white/35 mt-2 leading-relaxed">
            Necesita un sistema que funcione<br />sin depender de ti.
          </p>
          <div className="flex items-center justify-between mt-4 pt-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-[8px] font-mono text-white/20 tracking-wider">R.E.A.L. FRAMEWORK</span>
            <div className="flex gap-0.5">
              {colors.map((c, i) => <div key={i} className="w-4 h-1.5 rounded-sm" style={{ background: c }} />)}
            </div>
          </div>
        </div>
      </MockCard>

      {/* ★ TOP LEFT — Framework pillars — hidden xs */}
      <MockCard delay={0.4} className="hidden sm:block" style={{ top: "6%", left: "4%", width: "28%", maxWidth: 210, background: "rgba(17,17,17,0.92)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="p-3 md:p-4">
          <p className="text-[7px] tracking-[0.25em] uppercase mb-3 font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>Sistema</p>
          {[
            { letter: "R", word: "Reestructura", color: "#E3342F" },
            { letter: "E", word: "Ejecuta", color: "#FFDA00" },
            { letter: "A", word: "Automatiza", color: "#006CB7" },
            { letter: "L", word: "Lidera", color: "#00852B" },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
              <span className="text-sm md:text-base font-bold font-mono" style={{ color: p.color }}>{p.letter}</span>
              <span className="text-[9px] text-white/45 font-light">{p.word}</span>
            </div>
          ))}
        </div>
      </MockCard>

      {/* ★ BOTTOM — Business card, bigger */}
      <MockCard delay={0.55} style={{ bottom: "8%", left: "50%", transform: "translateX(-50%)", background: "#F5F5F0", border: "none" }}>
        <div className="p-4 flex items-center gap-4">
          <div className="grid grid-cols-2 gap-0.5">{colors.map((c, i) => <LegoBlock key={i} color={c} size={16} />)}</div>
          <div>
            <p className="text-[10px] font-bold text-[#0A0A0A] tracking-tight">Samuel Cordero</p>
            <p className="text-[7px] text-[#0A0A0A]/35 font-mono">El Estratega · Reestructuración empresarial</p>
          </div>
          <div className="flex h-8 ml-2 gap-[1px]">
            {colors.map((c, i) => <div key={i} className="w-1.5 h-full rounded-sm" style={{ background: c }} />)}
          </div>
        </div>
      </MockCard>
    </div>
  );
});

/* ── Content Board — Content Production System ── */
const CONTENT_POSTS = [
  {
    id: "cual-es-real",
    title: "¿Cuál es real?",
    tag: "AI EXPERIMENT",
    slides: [
      "/images/content-design/posts/hyperreal-a.png",
      "/images/content-design/posts/hyperreal-b.png",
      "/images/content-design/posts/hyperreal-c.png",
    ],
    slideCount: 5,
    format: "Carousel",
  },
  {
    id: "ai-motorsport",
    title: "AI × Motorsport",
    tag: "SERIE AI",
    slides: [
      "/images/content-design/carousel-01.png",
      "/images/content-design/carousel-02.png",
      "/images/content-design/carousel-03.png",
      "/images/content-design/carousel-04.png",
      "/images/content-design/carousel-05.png",
      "/images/content-design/carousel-06.png",
    ],
    slideCount: 10,
    format: "Carousel",
  },
  {
    id: "prompt-detras",
    title: "El prompt detrás",
    tag: "PROMPT ENGINEERING",
    slides: [
      "/images/content-design/stories/story-01.png",
      "/images/content-design/stories/story-02.png",
      "/images/content-design/stories/story-03.png",
      "/images/content-design/stories/story-04.png",
      "/images/content-design/stories/story-05.png",
    ],
    slideCount: 6,
    format: "Story",
  },
] as const;

const ContentBoard = memo(({ images }: { images: string[] }) => {
  const [activePost, setActivePost] = useState(0);
  const post = CONTENT_POSTS[activePost];
  const [activeSlide] = useAutoRotate(post.slides.length, 2800);
  const totalSlides = CONTENT_POSTS.reduce((a, p) => a + p.slideCount, 0);

  /* Auto-rotate posts every 12s */
  useEffect(() => {
    const id = setInterval(() => setActivePost(p => (p + 1) % CONTENT_POSTS.length), 12000);
    return () => clearInterval(id);
  }, []);

  const isStory = post.format === "Story";

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0e0e0e" }}>
      {/* Subtle glow */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 35% 45%, rgba(255,107,107,0.07) 0%, transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(248,180,217,0.05) 0%, transparent 45%)",
      }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      {/* ★ TOP BAR — Dashboard header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 z-20 px-4 py-2.5 flex items-center justify-between"
        style={{ background: "rgba(14,14,14,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: "#FF6B6B" }} />
          <span className="text-[9px] font-bold tracking-[0.15em] uppercase" style={{ color: "rgba(255,252,247,0.50)" }}>
            Content System
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[8px] font-mono" style={{ color: "rgba(255,107,107,0.45)" }}>
            {CONTENT_POSTS.length} posts
          </span>
          <span className="text-[8px] font-mono" style={{ color: "rgba(255,252,247,0.20)" }}>·</span>
          <span className="text-[8px] font-mono" style={{ color: "rgba(255,107,107,0.45)" }}>
            {totalSlides} slides
          </span>
        </div>
      </motion.div>

      {/* ★ POST TABS */}
      <div className="absolute top-[38px] left-0 right-0 z-20 px-3 py-2 flex gap-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
        {CONTENT_POSTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActivePost(i)}
            className="flex-1 px-2 py-1.5 rounded-lg text-left transition-all duration-300"
            style={{
              background: i === activePost ? "rgba(255,107,107,0.08)" : "transparent",
              border: `1px solid ${i === activePost ? "rgba(255,107,107,0.15)" : "rgba(255,255,255,0.03)"}`,
            }}
          >
            <p className="text-[6px] tracking-[0.2em] uppercase mb-0.5" style={{
              color: i === activePost ? "rgba(255,107,107,0.6)" : "rgba(255,252,247,0.15)",
            }}>{p.tag}</p>
            <p className="text-[8px] font-bold truncate" style={{
              color: i === activePost ? "rgba(255,252,247,0.85)" : "rgba(255,252,247,0.30)",
            }}>{p.title}</p>
          </button>
        ))}
      </div>

      {/* ★ MAIN VIEWER — Phone frame with slides */}
      <div className="absolute left-[3%] md:left-[4%] top-[90px] bottom-[60px] w-[55%] sm:w-[42%] md:w-[36%] max-w-[280px] z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full h-full rounded-2xl overflow-hidden relative"
          style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Phone header */}
          <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />
            <div>
              <p className="text-[8px] font-bold text-white/70">monza.lab</p>
              <p className="text-[6px] text-white/25">{post.format === "Story" ? "Story · 2h" : "Sponsored"}</p>
            </div>
            <span className="ml-auto text-[8px] text-white/20">•••</span>
          </div>

          {/* Slide viewer */}
          <div className="relative w-full flex-1" style={{ aspectRatio: isStory ? "9/16" : "4/5" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={`${post.id}-${activeSlide}`}
                src={post.slides[activeSlide]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            {/* Slide counter */}
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.55)" }}>
              <span className="text-[7px] text-white/60 font-mono">{activeSlide + 1}/{post.slides.length}</span>
            </div>
            {/* Story progress bars */}
            {isStory && (
              <div className="absolute top-2 left-2 right-10 flex gap-0.5 z-10">
                {post.slides.map((_, i) => (
                  <div key={i} className="flex-1 h-0.5 rounded-full" style={{
                    background: i <= activeSlide ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                  }} />
                ))}
              </div>
            )}
          </div>

          {/* Carousel dots (non-story) */}
          {!isStory && (
            <div className="px-3 py-2">
              <div className="flex justify-center gap-1 mb-1.5">
                {post.slides.map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full transition-all duration-300" style={{
                    background: i === activeSlide ? "#FF6B6B" : "rgba(255,255,255,0.2)",
                  }} />
                ))}
              </div>
              <div className="flex gap-3 mb-1">
                {["♡", "💬", "↗"].map((e) => (
                  <span key={e} className="text-[11px]" style={{ filter: "grayscale(1) brightness(0.7)" }}>{e}</span>
                ))}
              </div>
              <p className="text-[7px] text-white/50"><span className="font-bold text-white/70">monza.lab</span> Diseño que posiciona.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* ★ RIGHT PANEL — Post details + mini previews */}
      <div className="absolute right-[3%] top-[90px] bottom-[60px] left-[60%] sm:left-[48%] md:left-[44%] z-10 flex flex-col gap-3 overflow-hidden">
        {/* Active post info */}
        <motion.div
          key={post.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl p-3 md:p-4"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="text-[7px] tracking-[0.25em] uppercase mb-1.5" style={{ color: "rgba(255,107,107,0.5)" }}>{post.tag}</p>
          <p className="text-[13px] md:text-[15px] font-bold mb-2" style={{ color: "rgba(255,252,247,0.88)", letterSpacing: "-0.02em" }}>{post.title}</p>
          <div className="flex gap-2">
            <span className="text-[7px] px-2 py-0.5 rounded-md" style={{ background: "rgba(255,107,107,0.08)", color: "rgba(255,107,107,0.55)", border: "1px solid rgba(255,107,107,0.1)" }}>
              {post.slideCount} slides
            </span>
            <span className="text-[7px] px-2 py-0.5 rounded-md" style={{ background: "rgba(248,180,217,0.06)", color: "rgba(248,180,217,0.50)", border: "1px solid rgba(248,180,217,0.1)" }}>
              {post.format}
            </span>
          </div>
        </motion.div>

        {/* Mini slide strip */}
        <div className="flex gap-1.5 overflow-hidden">
          {post.slides.slice(0, 4).map((img, i) => (
            <div key={img} className="relative rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300" style={{
              width: "48px", height: "60px",
              border: `1px solid ${i === activeSlide ? "rgba(255,107,107,0.3)" : "rgba(255,255,255,0.04)"}`,
              opacity: i === activeSlide ? 1 : 0.4,
            }}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
          {post.slides.length > 4 && (
            <div className="flex items-center justify-center rounded-lg flex-shrink-0" style={{
              width: "48px", height: "60px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <span className="text-[8px] text-white/25">+{post.slides.length - 4}</span>
            </div>
          )}
        </div>

        {/* Format export card */}
        <div className="rounded-xl p-3" style={{ background: "rgba(14,14,14,0.6)", border: "1px solid rgba(255,107,107,0.06)" }}>
          <p className="text-[7px] tracking-[0.25em] uppercase mb-2" style={{ color: "rgba(255,107,107,0.3)" }}>Formatos disponibles</p>
          <div className="flex flex-wrap gap-1">
            {["Feed 4:5", "Story 9:16", "LinkedIn", "Reels", "X/Twitter"].map((f) => (
              <span key={f} className="text-[7px] px-1.5 py-0.5 rounded" style={{
                background: "rgba(255,107,107,0.06)", color: "rgba(255,107,107,0.50)",
                border: "1px solid rgba(255,107,107,0.08)",
              }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* IG Feed mini grid */}
        <div className="hidden md:block rounded-xl overflow-hidden" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-1.5 px-2 py-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />
            <span className="text-[6px] font-bold text-white/50">monza.lab</span>
            <span className="text-[5px] text-white/15 ml-auto">Feed preview</span>
          </div>
          <div className="grid grid-cols-3 gap-px p-px">
            {[
              ...CONTENT_POSTS[0].slides.slice(0, 3),
              ...CONTENT_POSTS[1].slides.slice(0, 3),
            ].map((img, i) => (
              <div key={`feed-${i}`} className="relative" style={{ aspectRatio: "1/1" }}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ★ BOTTOM BAR — Stats */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-2 flex items-center justify-between"
        style={{ background: "rgba(14,14,14,0.85)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center gap-4">
          <span className="text-[7px] text-white/20 tracking-wider uppercase">Sistema de contenido</span>
        </div>
        <div className="flex items-center gap-2">
          {["IG Carousel", "IG Story", "LinkedIn"].map((f) => (
            <span key={f} className="text-[6px] px-1.5 py-0.5 rounded" style={{
              background: "rgba(248,180,217,0.05)", color: "rgba(248,180,217,0.35)",
              border: "1px solid rgba(248,180,217,0.08)",
            }}>
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

/* ── Brand showcase — switches between brand boards ── */
const BrandShowcase = ({ brands }: { brands: BrandProject[] }) => {
  const [activeBrand, setActiveBrand] = useAutoRotate(brands.length, 6000);

  return (
    <div className="w-full h-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeBrand}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          {activeBrand === 0 && <EleonoraBoard />}
          {activeBrand === 1 && <MusgoBoard />}
          {activeBrand === 2 && <SamuelBoard />}
        </motion.div>
      </AnimatePresence>

      {/* Brand selector */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {brands.map((b, i) => (
          <button
            key={b.name}
            onClick={() => setActiveBrand(i)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: activeBrand === i ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
              border: activeBrand === i ? `1px solid ${b.colors[0]}50` : "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="w-2 h-2 rounded-full transition-all duration-300" style={{ background: activeBrand === i ? b.colors[0] : "rgba(255,255,255,0.15)" }} />
            <span className="font-clash text-[8px] tracking-[0.12em] uppercase transition-all duration-300 hidden md:inline"
              style={{ color: activeBrand === i ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)" }}>
              {b.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── Experiences showcase — rotates between client site videos ── */
const ExperiencesShowcase = ({ experiences, language }: { experiences: Experience[]; language: string }) => {
  const [activeExp, setActiveExp] = useAutoRotate(experiences.length, 7000);

  const exp = experiences[activeExp];

  return (
    <div className="w-full h-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeExp}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <ShowcaseVideo src={exp.video} />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
      }} />

      {/* Editorial tagline — comic-style statement */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 md:right-8 z-10 max-w-[200px] sm:max-w-[260px] md:max-w-xs pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative px-3 py-2 sm:px-4 sm:py-3" style={{
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "2px",
          }}>
            <p className="font-clash text-[10px] sm:text-xs md:text-sm leading-tight" style={{ color: "rgba(255,252,247,0.5)" }}>
              Yo no creo websites.
            </p>
            <p className="font-clash text-sm sm:text-lg md:text-xl font-bold leading-tight mt-0.5" style={{ color: "#FFFCF7" }}>
              Creo experiencias <span style={{ color: "#F8B4D9" }}>digitales.</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Client name overlay — bottom left */}
      <div className="absolute bottom-12 sm:bottom-14 left-4 sm:left-6 md:left-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExp}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.35 }}
          >
            <p className="font-clash text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: "#FFFCF7", letterSpacing: "-0.02em" }}>
              {exp.name}
            </p>
            <p className="font-clash text-[10px] md:text-xs tracking-[0.15em] uppercase mt-1" style={{ color: `${exp.accent}90` }}>
              {exp.subtitle[language]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Experience selector */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {experiences.map((e, i) => (
          <button
            key={e.name}
            onClick={() => setActiveExp(i)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: activeExp === i ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
              border: activeExp === i ? `1px solid ${e.accent}50` : "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="w-2 h-2 rounded-full transition-all duration-300" style={{ background: activeExp === i ? e.accent : "rgba(255,255,255,0.15)" }} />
            <span className="font-clash text-[8px] tracking-[0.12em] uppercase transition-all duration-300 hidden md:inline"
              style={{ color: activeExp === i ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)" }}>
              {e.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── Terminal Viva — animated terminal + benefit labels for automation showcase ── */
const TERMINAL_LINES = [
  { type: "cmd", text: "$ monza pipeline --init client-onboarding", group: 0 },
  { type: "out", text: "✓ Pipeline created: client-onboarding-v3", group: 0 },
  { type: "out", text: "  → Trigger: New client form submitted", group: 0 },
  { type: "out", text: "  → Action 1: Create Notion workspace", group: 0 },
  { type: "out", text: "  → Action 2: Send welcome email sequence", group: 0 },
  { type: "out", text: "  → Action 3: Generate brand audit report", group: 0 },
  { type: "out", text: "  → Action 4: Schedule onboarding call", group: 0 },
  { type: "cmd", text: "$ monza db --status", group: 1 },
  { type: "out", text: "✓ PostgreSQL: 3 schemas · 847 records", group: 1 },
  { type: "out", text: "✓ Redis cache: hit rate 98.4%", group: 1 },
  { type: "out", text: "✓ Webhook endpoints: 12 active", group: 1 },
  { type: "cmd", text: "$ monza scrape --run content-audit", group: 2 },
  { type: "out", text: "⟳ Scanning 4 platforms...", group: 2 },
  { type: "out", text: "  LinkedIn:  142 posts analyzed", group: 2 },
  { type: "out", text: "  Instagram: 89 posts analyzed", group: 2 },
  { type: "out", text: "  Twitter/X: 203 posts analyzed", group: 2 },
  { type: "out", text: "  Website:   34 pages indexed", group: 2 },
  { type: "out", text: "✓ Content audit complete → report.pdf", group: 2 },
  { type: "cmd", text: "$ monza generate --proposal --client $NAME", group: 3 },
  { type: "out", text: "✓ Proposal generated from transcript + audit", group: 3 },
  { type: "out", text: "✓ PDF exported → /proposals/latest.pdf", group: 3 },
  { type: "out", text: "✓ Notion page created · link sent via email", group: 3 },
  { type: "cmd", text: "$ monza deploy --production", group: 3 },
  { type: "out", text: "✓ Build passed · Assets optimized", group: 3 },
  { type: "out", text: "✓ Deployed to monzalab.com in 4.2s", group: 3 },
] as const;

const BENEFITS = [
  { num: "01", title: "Cada cliente nuevo, automatizado", desc: "Entra un cliente → se crea su workspace, se manda el email de bienvenida, se agenda la llamada. Sin que toques nada." },
  { num: "02", title: "Tu infraestructura, siempre activa", desc: "Bases de datos, caché, webhooks — todo conectado y corriendo 24/7 para que tu negocio no pare." },
  { num: "03", title: "Tu contenido, auditado en segundos", desc: "Escaneamos LinkedIn, Instagram, X y tu web. Te decimos qué funciona, qué no, y qué hacer diferente." },
  { num: "04", title: "Propuestas listas en minutos", desc: "De la llamada al PDF listo para enviar. El sistema procesa, estructura y entrega — tú solo revisas y mandas." },
] as const;

const TerminalShowcase = memo(() => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) {
      const reset = setTimeout(() => setVisibleLines(0), 3000);
      return () => clearTimeout(reset);
    }
    const line = TERMINAL_LINES[visibleLines];
    const delay = line.type === "cmd" ? 800 : 180;
    const id = setTimeout(() => setVisibleLines(v => v + 1), delay);
    return () => clearTimeout(id);
  }, [visibleLines]);

  // Which benefit group is active based on current terminal progress
  const activeGroup = visibleLines > 0 ? TERMINAL_LINES[Math.min(visibleLines - 1, TERMINAL_LINES.length - 1)].group : -1;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0a0a0f" }}>
      {/* Ambient glow */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 30% 50%, rgba(248,180,217,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(248,180,217,0.03) 0%, transparent 45%)",
      }} />

      {/* Layout: Terminal left + Benefits right */}
      <div className="absolute inset-3 sm:inset-4 md:inset-6 flex flex-col md:flex-row gap-3 md:gap-4">

        {/* Terminal window — full on mobile, 55% on desktop */}
        <div className="flex-1 md:w-[55%] rounded-xl overflow-hidden flex flex-col min-h-0" style={{
          background: "rgba(10,10,18,0.95)",
          border: "1px solid rgba(248,180,217,0.12)",
          boxShadow: "0 0 60px rgba(248,180,217,0.05), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}>
          {/* Title bar */}
          <div className="flex items-center px-3 py-2 sm:px-4 sm:py-2.5 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <span className="ml-3 text-[9px] sm:text-[10px] font-mono tracking-wide" style={{ color: "rgba(255,255,255,0.2)" }}>
              monza-lab — infrastructure
            </span>
            <div className="ml-auto flex gap-2">
              <span className="text-[7px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(248,180,217,0.1)", color: "rgba(248,180,217,0.5)" }}>LIVE</span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="flex-1 overflow-hidden p-3 sm:p-4 md:p-5 font-mono text-[8px] sm:text-[9px] md:text-[10px] leading-[1.8] relative">
            <div className="space-y-0">
              {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={`${i}-${line.text}`}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {line.type === "cmd" ? (
                    <p className="mt-2 first:mt-0" style={{ color: "#F8B4D9" }}>{line.text}</p>
                  ) : (
                    <p style={{ color: line.text.startsWith("✓") ? "rgba(248,180,217,0.7)" : line.text.startsWith("⟳") ? "rgba(248,180,217,0.5)" : "rgba(255,255,255,0.35)" }}>
                      {line.text}
                    </p>
                  )}
                </motion.div>
              ))}
              {visibleLines < TERMINAL_LINES.length && (
                <span className="inline-block w-[6px] h-[14px] ml-0.5 animate-pulse" style={{ background: "#F8B4D9", opacity: 0.7 }} />
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none" style={{
              background: "linear-gradient(to top, rgba(10,10,18,0.95), transparent)",
            }} />
          </div>
        </div>

        {/* Benefits panel — hidden on mobile, 45% on desktop */}
        <div className="hidden md:flex md:w-[45%] flex-col gap-2.5">
          {/* Panel header */}
          <div className="px-4 py-3 rounded-xl" style={{ background: "rgba(10,10,18,0.6)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <p className="text-[8px] tracking-[0.3em] uppercase font-clash" style={{ color: "rgba(248,180,217,0.5)" }}>
              ¿Qué significa esto para tu marca?
            </p>
          </div>

          {/* Benefit cards */}
          {BENEFITS.map((b, i) => {
            const isActive = activeGroup >= i;
            const isCurrent = activeGroup === i;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  scale: isCurrent ? 1.02 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 px-4 py-3 rounded-xl transition-all duration-500"
                style={{
                  background: isCurrent ? "rgba(248,180,217,0.06)" : "rgba(10,10,18,0.6)",
                  border: isCurrent ? "1px solid rgba(248,180,217,0.18)" : "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] mt-0.5 shrink-0 transition-colors duration-400" style={{
                    color: isActive ? "rgba(248,180,217,0.7)" : "rgba(255,255,255,0.15)",
                  }}>{b.num}</span>
                  <div className="min-w-0">
                    <p className="font-clash text-[11px] md:text-xs font-semibold leading-tight transition-colors duration-400" style={{
                      color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)",
                    }}>
                      {b.title}
                    </p>
                    <p className="font-clash text-[9px] md:text-[10px] leading-relaxed mt-1 transition-colors duration-400" style={{
                      color: isActive ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.12)",
                    }}>
                      {b.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile benefits — bottom overlay on small screens */}
      <div className="absolute bottom-3 left-3 right-3 md:hidden z-10">
        <AnimatePresence mode="wait">
          {activeGroup >= 0 && activeGroup < BENEFITS.length && (() => {
            const idx = activeGroup as 0 | 1 | 2 | 3;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="px-3 py-2.5 rounded-lg"
                style={{ background: "rgba(10,10,18,0.92)", border: "1px solid rgba(248,180,217,0.15)", backdropFilter: "blur(12px)" }}
              >
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-[10px] shrink-0" style={{ color: "rgba(248,180,217,0.7)" }}>{BENEFITS[idx].num}</span>
                  <div>
                    <p className="font-clash text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {BENEFITS[idx].title}
                    </p>
                    <p className="font-clash text-[8px] leading-relaxed mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {BENEFITS[idx].desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </div>
  );
});

/* ── Main section ── */
const CapabilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isModena = theme === "modena";

  const cap = CAPABILITIES[active];

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14 md:mb-16"
        >
          <p className="font-clash text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#F8B4D9]/50 font-medium mb-4">
            ALL-IN-ONE CREATIVE STUDIO
          </p>
          <h2
            className="font-clash text-[8vw] md:text-[5vw] lg:text-[3.5vw] font-bold leading-[1.05]"
            style={{ letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.80)" }}
          >
            {{ es: "Todo lo que necesitas.", en: "Everything you need.", de: "Alles, was du brauchst." }[language]}<br />
            <span style={{ color: "rgba(var(--text-rgb), 0.35)" }}>{{ es: "Un solo lugar.", en: "One place.", de: "An einem Ort." }[language]}</span>
          </h2>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="relative mb-8"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActive(prev => (prev - 1 + CAPABILITIES.length) % CAPABILITIES.length)}
              className="shrink-0 w-9 h-9 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
              style={{
                background: "rgba(var(--text-rgb), 0.05)",
                border: "1px solid rgba(var(--text-rgb), 0.08)",
                color: "rgba(var(--text-rgb), 0.40)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>

            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 md:gap-3 w-max">
                {CAPABILITIES.map((c, i) => {
                  const isActive = active === i;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActive(i)}
                      className="relative font-clash text-[11px] md:text-xs tracking-[0.15em] uppercase font-medium px-4 py-2.5 rounded-lg transition-all duration-400 cursor-pointer whitespace-nowrap"
                      style={{
                        color: isActive ? "var(--text-primary)" : "rgba(var(--text-rgb), 0.30)",
                        background: isActive ? `${c.accent}18` : "transparent",
                        border: isActive ? `1px solid ${c.accent}35` : "1px solid rgba(var(--text-rgb), 0.06)",
                      }}
                    >
                      {c.shortLabel[language]}
                      {isActive && (
                        <motion.div
                          layoutId="tab-dot"
                          className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                          style={{ background: c.accent }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setActive(prev => (prev + 1) % CAPABILITIES.length)}
              className="shrink-0 w-9 h-9 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
              style={{
                background: "rgba(var(--text-rgb), 0.05)",
                border: "1px solid rgba(var(--text-rgb), 0.08)",
                color: "rgba(var(--text-rgb), 0.40)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </motion.div>

        {/* Showcase area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]"
              style={{
                background: isModena ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.4)",
              }}
            >
              {/* Media */}
              <div className="absolute inset-0">
                {cap.type === "video" && cap.video && (
                  <ShowcaseVideo src={cap.video} />
                )}
                {cap.type === "collage" && cap.images && (
                  <div className="w-full h-full p-3">
                    <PhotoGrid images={cap.images} />
                  </div>
                )}
                {cap.type === "content-board" && cap.images && (
                  <ContentBoard images={cap.images} />
                )}
                {cap.type === "brands" && cap.brands && (
                  <BrandShowcase brands={cap.brands} />
                )}
                {cap.type === "experiences" && cap.experiences && (
                  <ExperiencesShowcase experiences={cap.experiences} language={language} />
                )}
                {cap.type === "terminal" && (
                  <TerminalShowcase />
                )}
              </div>

              {/* Gradient overlay — skip for brands and experiences (they have their own) */}
              {cap.type !== "brands" && cap.type !== "experiences" && cap.type !== "content-board" && cap.type !== "terminal" && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
                  }}
                />
              )}

              {/* Tag — top right */}
              <div className="absolute top-5 right-6 z-10">
                <span
                  className="font-clash text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-medium"
                  style={{ color: `${cap.accent}70` }}
                >
                  {cap.tag}
                </span>
              </div>

              {/* Accent line — top left */}
              <div className="absolute top-5 left-6 z-10">
                <div
                  className="w-8 h-[2px] rounded-full"
                  style={{ background: cap.accent, opacity: 0.5 }}
                />
              </div>

              {/* Bottom content — skip for brands and experiences */}
              {cap.type !== "brands" && cap.type !== "experiences" && cap.type !== "content-board" && cap.type !== "terminal" && (
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
                  <h3
                    className="font-clash text-xl md:text-2xl lg:text-3xl font-bold mb-2"
                    style={{ letterSpacing: "-0.01em", color: "rgba(255,252,247,0.95)" }}
                  >
                    {cap.label[language]}
                  </h3>
                  <p className="font-clash text-xs md:text-sm text-[#FFFCF7]/45 leading-relaxed max-w-xl">
                    {cap.desc[language]}
                  </p>
                </div>
              )}

              {/* Border */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ border: `1px solid ${cap.accent}15` }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {CAPABILITIES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: active === i ? c.accent : "rgba(var(--text-rgb), 0.10)",
                transform: active === i ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
