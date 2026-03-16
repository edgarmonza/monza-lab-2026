import { useRef, useState, useEffect, useCallback, memo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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
  subtitle: string;
  colors: string[];
  font: string;
  tagline: string;
};

type Experience = {
  name: string;
  subtitle: string;
  video: string;
  accent: string;
};

type Capability = {
  id: string;
  label: string;
  shortLabel: string;
  desc: string;
  accent: string;
  tag: string;
  type: "video" | "collage" | "brands" | "experiences" | "content-board";
  video?: string;
  images?: string[];
  brands?: BrandProject[];
  experiences?: Experience[];
};

const CAPABILITIES: Capability[] = [
  {
    id: "brand-systems",
    shortLabel: "Brand Systems",
    label: "Sistemas de marca completos",
    desc: "Manual de marca, paleta, tipografía, logo, aplicaciones, voz — entregados como sistema interactivo, no un PDF estático. Listos en días, no meses.",
    type: "brands",
    brands: [
      {
        name: "ELEONORA MORALES",
        subtitle: "Coleccionista de belleza · Moda circular & lujo",
        colors: ["#f074aa", "#d461c1", "#9af5fd", "#e5ff21"],
        font: "Midashi Min",
        tagline: "Nada es más sostenible que lo que ya existe.",
      },
      {
        name: "MUSGO",
        subtitle: "Juanita López · Transiciones regenerativas",
        colors: ["#689b61", "#7fb878", "#0f0f0f", "#eeeeee"],
        font: "Bebas Neue",
        tagline: "Regenera sin imponer.",
      },
      {
        name: "SAMUEL CORDERO",
        subtitle: "El Estratega · Reestructuración empresarial",
        colors: ["#E3342F", "#FFDA00", "#006CB7", "#00852B"],
        font: "Space Grotesk",
        tagline: "Sistemas, no motivación.",
      },
    ],
    accent: "#F8B4D9",
    tag: "BRAND × SYSTEM",
  },
  {
    id: "digital-branding",
    shortLabel: "Digital Branding",
    label: "Branding digital — marcas que cobran vida",
    desc: "Logos animados, identidad visual en web, sistemas interactivos. Tu marca no es un archivo — es una experiencia que vive en cada pantalla.",
    type: "video",
    video: "/videos/monza-reel-beat-synced.mp4",
    accent: "#C4A35A",
    tag: "IDENTITY × MOTION",
  },
  {
    id: "experiencias",
    shortLabel: "Experiencias Digitales",
    label: "No hago websites — creo experiencias digitales",
    desc: "Cada interacción, cada transición, cada detalle diseñado para que tu marca se sienta a otro nivel. Esto no es una página web.",
    type: "experiences",
    experiences: [
      { name: "PACHO ALVAREZ", subtitle: "Piloto Dakar · Experiencia inmersiva", video: "/videos/pacho-alvarez-reel.mp4", accent: "#E8C547" },
      { name: "BAVARIAN ECONS", subtitle: "BMW 2002te · The Classic of the Future", video: "/videos/bavarian-econs-reel.mp4", accent: "#38BDF8" },
      { name: "SPECTRO", subtitle: "Gaming & Esports · Plataforma digital", video: "/videos/spectro-reel.mp4", accent: "#8B5CF6" },
    ],
    accent: "#38BDF8",
    tag: "EXPERIENCE × DIGITAL",
  },
  {
    id: "ai-photos",
    shortLabel: "AI Photography",
    label: "Fotografía AI a escala",
    desc: "Bibliotecas enteras de fotografía editorial generadas en minutos. Sin sesión, sin estudio, sin límites de volumen.",
    type: "collage",
    images: [
      "/images/ai-motorsport/slide-07-reflection.png",
      "/images/ai-motorsport/slide-03-badge.png",
      "/images/ai-motorsport/slide-08-rain.png",
      "/images/ai-motorsport/edgar-helmet-monza.png",
      "/images/ai-motorsport/slide-02-overhead.png",
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
    shortLabel: "Contenido",
    label: "Ecosistema completo de contenido",
    desc: "LinkedIn, stories, carousels, posts — todo el diseño de piezas para tu marca. No solo hago un post: te entrego el sistema visual completo.",
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
    shortLabel: "Voice & Motion",
    label: "Tipografía cinética, readers & voz",
    desc: "Contenido que impacta en 3 segundos. Speed readers, manifiestos animados, integración de voz — formatos que detienen el scroll.",
    type: "video",
    video: "/videos/monza-reader-demo.mp4",
    accent: "#4ECDC4",
    tag: "MOTION × VOICE",
  },
  {
    id: "automation",
    shortLabel: "Automatización",
    label: "Automatización, datos & infraestructura",
    desc: "Bases de datos, scrapers, pipelines de contenido, generación por API — la infraestructura invisible que hace que todo escale sin fricción.",
    type: "video",
    video: "/videos/monza-code-showcase.mp4",
    accent: "#F59E0B",
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

/* ── Content Board — social media ecosystem showcase ── */
const ContentBoard = memo(({ images }: { images: string[] }) => {
  const [activeSlide] = useAutoRotate(images.length, 3000);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0e0e0e" }}>
      {/* Subtle warm glow */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 40% 40%, rgba(255,107,107,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(248,180,217,0.05) 0%, transparent 45%)",
      }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* ★ CENTER LEFT — IG Carousel mockup (phone frame with real carousel images) */}
      <div className="absolute left-[3%] md:left-[5%] top-[6%] bottom-[6%] w-[55%] sm:w-[40%] md:w-[35%] max-w-[280px] z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full h-full rounded-2xl overflow-hidden relative"
          style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Phone top bar */}
          <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />
            <div>
              <p className="text-[8px] font-bold text-white/70">monza.lab</p>
              <p className="text-[6px] text-white/25">Sponsored</p>
            </div>
            <span className="ml-auto text-[8px] text-white/20">•••</span>
          </div>

          {/* Carousel image area */}
          <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
            {images.map((img, i) => (
              <img
                key={img}
                src={img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: i === activeSlide ? 1 : 0 }}
              />
            ))}
            {/* Carousel dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.slice(0, 6).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full transition-all duration-300" style={{
                  background: i === activeSlide % 6 ? "#FF6B6B" : "rgba(255,255,255,0.25)",
                }} />
              ))}
            </div>
            {/* Slide counter */}
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.5)" }}>
              <span className="text-[7px] text-white/60 font-mono">{(activeSlide % 6) + 1}/6</span>
            </div>
          </div>

          {/* Engagement bar */}
          <div className="px-3 py-2">
            <div className="flex gap-3 mb-1.5">
              {["♡", "💬", "↗"].map((e) => (
                <span key={e} className="text-[12px]" style={{ filter: "grayscale(1) brightness(0.7)" }}>{e}</span>
              ))}
            </div>
            <p className="text-[7px] text-white/50"><span className="font-bold text-white/70">monza.lab</span> Diseño que posiciona.</p>
          </div>
        </motion.div>
      </div>

      {/* ★ CENTER RIGHT — LinkedIn post mockup (hidden on very small screens) */}
      <MockCard delay={0.25} className="hidden sm:block" style={{ top: "6%", right: "3%", width: "38%", maxWidth: 300, background: "#1B2430", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="p-3 md:p-4">
          {/* LinkedIn header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">M</span>
            </div>
            <div>
              <p className="text-[9px] font-bold text-white/80">Monza Lab</p>
              <p className="text-[6px] text-white/30">Creative Studio · 1d</p>
            </div>
            <div className="ml-auto w-4 h-4 rounded-sm flex items-center justify-center" style={{ background: "rgba(0,119,181,0.3)" }}>
              <span className="text-[7px] font-bold" style={{ color: "#0077B5" }}>in</span>
            </div>
          </div>
          {/* Post content */}
          <p className="text-[9px] md:text-[10px] text-white/60 leading-relaxed mb-3">
            Tu marca no necesita 47 posts al mes.<br />
            Necesita <span className="text-white/90 font-bold">10 piezas que impacten</span>.<br />
            <span className="text-[8px]" style={{ color: "#FF6B6B" }}>#BrandDesign #ContentStrategy</span>
          </p>
          {/* Preview image */}
          <div className="rounded-lg overflow-hidden" style={{ aspectRatio: "1.91/1", background: "#0e0e0e" }}>
            <img src={images[0]} alt="" className="w-full h-full object-cover opacity-80" />
          </div>
          {/* Engagement */}
          <div className="flex items-center justify-between mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <span className="text-[7px] text-white/25">👍 142 · 23 comments</span>
            <span className="text-[7px] text-white/20">Share</span>
          </div>
        </div>
      </MockCard>

      {/* ★ BOTTOM RIGHT — IG Story mockup (hidden on small screens) */}
      <MockCard delay={0.4} className="hidden md:block" style={{ bottom: "6%", right: "5%", width: "22%", maxWidth: 160, background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="relative" style={{ aspectRatio: "9/16" }}>
          <img src={images[2] || images[0]} alt="" className="w-full h-full object-cover rounded-xl" />
          {/* Story top bar */}
          <div className="absolute top-0 left-0 right-0 p-2">
            <div className="w-full h-0.5 rounded-full bg-white/20">
              <div className="h-full rounded-full" style={{ width: "60%", background: "rgba(255,107,107,0.8)" }} />
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-red-400" />
              <span className="text-[7px] font-bold text-white/80">monza.lab</span>
              <span className="text-[6px] text-white/30">2h</span>
            </div>
          </div>
          {/* Story CTA */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="px-3 py-1 rounded-full" style={{ background: "rgba(255,107,107,0.3)", border: "1px solid rgba(255,107,107,0.4)" }}>
              <span className="text-[7px] font-bold" style={{ color: "#FF6B6B" }}>Ver más ↑</span>
            </div>
          </div>
        </div>
      </MockCard>

      {/* ★ BOTTOM — Format labels (hidden on very small, visible sm+) */}
      <MockCard delay={0.5} className="hidden sm:block" style={{ bottom: "8%", left: "42%", background: "rgba(14,14,14,0.9)", border: "1px solid rgba(255,107,107,0.08)" }}>
        <div className="px-4 py-3">
          <p className="text-[7px] tracking-[0.25em] uppercase mb-2" style={{ color: "rgba(255,107,107,0.3)" }}>Formatos que entrego</p>
          <div className="flex flex-wrap gap-1.5">
            {["IG Carousel", "IG Story", "LinkedIn", "Reels Cover", "Twitter/X", "Thumbnail"].map((f) => (
              <span key={f} className="text-[7px] md:text-[8px] px-2 py-0.5 rounded-md font-medium" style={{
                background: "rgba(255,107,107,0.08)", color: "rgba(255,107,107,0.6)",
                border: "1px solid rgba(255,107,107,0.1)",
              }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </MockCard>
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
const ExperiencesShowcase = ({ experiences }: { experiences: Experience[] }) => {
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
              {exp.subtitle}
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

/* ── Main section ── */
const CapabilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

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
            Todo lo que necesitas.<br />
            <span style={{ color: "rgba(var(--text-rgb), 0.35)" }}>Un solo lugar.</span>
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
                        color: isActive ? "#FFFCF7" : "rgba(var(--text-rgb), 0.30)",
                        background: isActive ? `${c.accent}18` : "transparent",
                        border: isActive ? `1px solid ${c.accent}35` : "1px solid rgba(var(--text-rgb), 0.06)",
                      }}
                    >
                      {c.shortLabel}
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
                background: "rgba(0,0,0,0.4)",
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
                  <ExperiencesShowcase experiences={cap.experiences} />
                )}
              </div>

              {/* Gradient overlay — skip for brands and experiences (they have their own) */}
              {cap.type !== "brands" && cap.type !== "experiences" && cap.type !== "content-board" && (
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
              {cap.type !== "brands" && cap.type !== "experiences" && cap.type !== "content-board" && (
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
                  <h3
                    className="font-clash text-xl md:text-2xl lg:text-3xl font-bold mb-2"
                    style={{ letterSpacing: "-0.01em", color: "rgba(255,252,247,0.95)" }}
                  >
                    {cap.label}
                  </h3>
                  <p className="font-clash text-xs md:text-sm text-[#FFFCF7]/45 leading-relaxed max-w-xl">
                    {cap.desc}
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
