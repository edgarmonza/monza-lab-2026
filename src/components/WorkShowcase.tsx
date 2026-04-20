import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "@/theme/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/i18n/LanguageContext";

/**
 * Truly lazy video for mobile compatibility.
 * - Defers loading until element is near viewport (rootMargin 300px)
 * - Uses key={src} so React remounts when src changes (isMobile switch)
 * - Plays via IntersectionObserver + canplay event + autoPlay attribute
 * - Pauses when scrolled away to free resources
 */
const LazyVideo = ({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  // Observe sentinel div; once near viewport, set the real src
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActiveSrc(src); obs.disconnect(); } },
      { threshold: 0, rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [src]);

  // Callback ref on the <video> — handles play/pause via IO
  const videoCallback = (node: HTMLVideoElement | null) => {
    if (!node) return;
    const tryPlay = () => { node.play().catch(() => {}); };
    node.addEventListener("canplay", tryPlay, { once: true });
    tryPlay();
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) tryPlay(); else node.pause(); },
      { threshold: 0.15 }
    );
    obs.observe(node);
  };

  return (
    <div ref={sentinelRef} className={className} style={style}>
      {activeSrc && (
        <video
          ref={videoCallback}
          key={activeSrc}
          src={activeSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

const PROJECTS = [
  {
    id: "bavarian",
    slug: "bavarian-econs",
    name: "Bavarian Econs",
    tag: "VENTURE × LUXURY",
    desc: {
      es: "Marca de lujo automotriz. Branding, web global y sistema de ventas. Featured in Forbes.",
      en: "Automotive luxury brand. Branding, global web & sales system. Featured in Forbes.",
      de: "Automotive Luxusmarke. Branding, globale Web & Vertriebssystem. Featured in Forbes.",
    },
    image: null as string | null,
    video: "/videos/bavarian-econs-reel.mp4",
    mobileVideo: "/videos/bavarian-econs-mobile.mp4",
    color: "#C4A35A",
    url: "https://www.bavarianecons.com",
    caseStudy: {
      role: "Co-Founder & Creative Director",
      location: "Europa · USA",
      year: "2022–present",
      headline: {
        es: "De idea a marca de lujo global en un mercado que nadie había tocado.",
        en: "From idea to global luxury brand in a market no one had touched.",
        de: "Von der Idee zur globalen Luxusmarke in einem Markt, den niemand berührt hatte.",
      },
      story: {
        es: "Validé el MVP, estructuré el pitch de financiación y construí el sistema digital completo — desde la identidad de marca hasta el ecosistema de ventas. El BMW 2002 es hoy uno de los clásicos más cotizados del mundo. Bavarian Econs lo electrifica para coleccionistas en Europa y Estados Unidos.",
        en: "I validated the MVP, structured the funding pitch and built the complete digital system — from brand identity to the sales ecosystem. The BMW 2002 is one of the most sought-after classics in the world today. Bavarian Econs electrifies it for collectors in Europe and the United States.",
        de: "Ich validierte das MVP, strukturierte den Finanzierungs-Pitch und baute das komplette digitale System — von der Markenidentität bis zum Vertriebs-Ökosystem. Der BMW 2002 ist heute einer der begehrtesten Klassiker der Welt. Bavarian Econs elektrifiziert ihn für Sammler in Europa und den USA.",
      },
      pillars: [
        { label: "Strategy", detail: { es: "Validación de mercado, MVP y modelo de negocio", en: "Market validation, MVP & business model", de: "Marktvalidierung, MVP & Geschäftsmodell" } },
        { label: "Brand", detail: { es: "Identidad, naming, sistema visual completo", en: "Identity, naming, complete visual system", de: "Identität, Naming, komplettes visuelles System" } },
        { label: "Digital", detail: { es: "Web global, SEO y ecosistema de ventas", en: "Global web, SEO & sales ecosystem", de: "Globale Web, SEO & Vertriebs-Ökosystem" } },
        { label: "Capital", detail: { es: "Pitch deck y ronda de financiación", en: "Pitch deck & funding round", de: "Pitch Deck & Finanzierungsrunde" } },
      ],
      press: [
        { name: "Forbes Colombia", href: "https://forbes.co/2024/09/10/editors-picks/estos-colombianos-estan-electrificando-clasicos-de-bmw-para-coleccionistas-en-europa-y-estados-unidos" },
        { name: "Motor Trend", href: "https://www.motortrend.com/reviews/bmw-2002-bavarian-econs-2002te-ev-swap-first-drive-review" },
        { name: "The Org", href: "https://theorg.com/iterate/bavarian-econs-how-two-colombians-are-reviving-germanys-iconic-auto-industry" },
      ],
    },
    gridClass: "md:col-span-2 md:row-span-2",
    aspect: "aspect-[16/10] md:aspect-auto",
    // Visual identity for placeholder
    visual: {
      gradient: "radial-gradient(ellipse at 20% 30%, #C4A35A22 0%, transparent 45%), radial-gradient(ellipse at 80% 70%, #C4A35A12 0%, transparent 40%), linear-gradient(135deg, #0D0D14 0%, #141418 100%)",
      letter: "B",
      letterSize: "clamp(120px, 20vw, 320px)",
      letterPos: "bottom-[-5%] right-[-3%]",
      accent: "#C4A35A",
      decorLine: true,
      number: "01",
    },
  },
  {
    id: "monzahaus",
    slug: "monza-haus",
    name: "MonzaHaus",
    tag: "VENTURE × AI-NATIVE PLATFORM",
    desc: {
      es: "35,000+ Porsches de Japón, UE y EEUU en una sola plataforma AI-native. Dealers, coleccionistas y compradores deciden con data real.",
      en: "35,000+ Porsches from Japan, EU and the US in a single AI-native platform. Dealers, collectors and buyers decide with real data.",
      de: "35.000+ Porsche aus Japan, EU und den USA auf einer AI-nativen Plattform. Händler, Sammler und Käufer entscheiden mit echten Daten.",
    },
    image: "/images/projects/monza-haus-cover.png" as string | null,
    video: null,
    mobileVideo: null,
    color: "#F8B4D9",
    url: "https://www.monzahaus.com",
    caseStudy: {
      role: "Founder & Product Lead",
      location: "Global",
      year: "2026–present",
      headline: {
        es: "El Bloomberg de los carros coleccionables.",
        en: "The Bloomberg of collector cars.",
        de: "Das Bloomberg der Sammlerautos.",
      },
      story: {
        es: "Base de datos en tiempo real, frontend y UI desde cero, y diseño del modelo de negocio. Monza Haus centraliza toda la inteligencia del mercado automotriz de colección en una sola plataforma AI-native.",
        en: "Real-time database, frontend and UI from scratch, and business model design. Monza Haus centralizes all collector automotive market intelligence in a single AI-native platform.",
        de: "Echtzeit-Datenbank, Frontend und UI von Grund auf und Geschäftsmodell-Design. Monza Haus zentralisiert die gesamte Collector-Automotive-Marktintelligenz auf einer einzigen AI-nativen Plattform.",
      },
      pillars: [
        { label: "Database", detail: { es: "Arquitectura de datos en tiempo real", en: "Real-time data architecture", de: "Echtzeit-Datenarchitektur" } },
        { label: "Frontend", detail: { es: "UI/UX desde cero", en: "UI/UX from scratch", de: "UI/UX von Grund auf" } },
        { label: "Product", detail: { es: "Modelo de negocio y go-to-market", en: "Business model & go-to-market", de: "Geschäftsmodell & Go-to-Market" } },
        { label: "AI", detail: { es: "Inteligencia de mercado automotriz", en: "Automotive market intelligence", de: "Automotive-Marktintelligenz" } },
      ],
      press: [],
    },
    gridClass: "md:col-span-1 md:row-span-2",
    aspect: "aspect-[4/5] md:aspect-auto",
    visual: {
      gradient: "radial-gradient(circle at 30% 40%, #F8B4D918 0%, transparent 50%), radial-gradient(circle at 70% 70%, #F8B4D90C 0%, transparent 40%), linear-gradient(160deg, #110F16 0%, #0D0D14 100%)",
      letter: "MH",
      letterSize: "clamp(80px, 14vw, 180px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#F8B4D9",
      decorLine: false,
      number: "02",
    },
  },
  {
    id: "iaindex",
    slug: "ia-index",
    name: "IA Index",
    tag: "VENTURE × MARKET INTELLIGENCE",
    desc: {
      es: "El primer índice que mide la penetración real de la IA en empresas y personas. 6 dimensiones, reportes co-creados, data compartida para el ecosistema.",
      en: "The first index measuring real AI penetration across companies and people. 6 dimensions, co-created reports, shared ecosystem data.",
      de: "Der erste Index, der die echte KI-Penetration in Unternehmen und Personen misst. 6 Dimensionen, co-kreierte Reports, geteilte Ökosystem-Daten.",
    },
    image: "/images/projects/ia-index-cover.jpg" as string | null,
    video: null,
    mobileVideo: null,
    color: "#C4A35A",
    url: "https://www.monzaindex.ai",
    caseStudy: {
      role: "Co-Founder",
      location: "Colombia · LATAM · Global",
      year: "Launch Agosto 2026",
      headline: {
        es: "Acelerar la adopción estratégica de la inteligencia artificial.",
        en: "Accelerating strategic adoption of artificial intelligence.",
        de: "Die strategische Adoption von künstlicher Intelligenz beschleunigen.",
      },
      story: {
        es: "Venture co-fundado con Guillermo Jaramillo y Giovanni Stella. Plataforma de inteligencia de mercado donde co-creamos reportes con empresas líderes — cada reporte genera data de valor para todo el ecosistema. Lanzamiento público en agosto 2026 con expansión multi-país.",
        en: "Venture co-founded with Guillermo Jaramillo and Giovanni Stella. A market intelligence platform where we co-create reports with leading companies — each report generates valuable data for the entire ecosystem. Public launch in August 2026 with multi-country expansion.",
        de: "Venture mitgegründet mit Guillermo Jaramillo und Giovanni Stella. Eine Market-Intelligence-Plattform, auf der wir Reports gemeinsam mit führenden Unternehmen erstellen — jeder Report generiert wertvolle Daten für das gesamte Ökosystem. Öffentlicher Launch im August 2026 mit Multi-Country-Expansion.",
      },
      pillars: [
        { label: "Intelligence", detail: { es: "Reportes co-creados con empresas líderes", en: "Reports co-created with leading companies", de: "Mit führenden Unternehmen co-kreierte Reports" } },
        { label: "Data", detail: { es: "Data compartida de valor para el ecosistema", en: "Shared ecosystem-grade data", de: "Geteilte Ökosystem-Daten von Wert" } },
        { label: "Product", detail: { es: "Plataforma AI-native y distribución", en: "AI-native platform & distribution", de: "AI-native Plattform & Distribution" } },
        { label: "Network", detail: { es: "Expansión multi-país desde LATAM", en: "Multi-country expansion from LATAM", de: "Multi-Country-Expansion aus LATAM" } },
      ],
      press: [],
    },
    gridClass: "md:col-span-2 md:row-span-1",
    aspect: "aspect-[16/9] md:aspect-auto",
    visual: {
      gradient: "radial-gradient(circle at 20% 30%, #C4A35A20 0%, transparent 50%), radial-gradient(circle at 80% 70%, #C4A35A10 0%, transparent 40%), linear-gradient(135deg, #110F0C 0%, #0D0D14 100%)",
      letter: "IA",
      letterSize: "clamp(70px, 13vw, 160px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#C4A35A",
      decorLine: true,
      number: "03",
    },
  },
  {
    id: "eleonora",
    slug: "eleonora-morales",
    name: "Eleonora Morales",
    tag: "STUDIO × DIGITAL ECOSYSTEM",
    desc: {
      es: "Seis mundos de lujo circular bajo una sombrilla. 350K seguidores, e-commerce live, pipeline de fotos con IA y growth multi-canal.",
      en: "Six worlds of circular luxury under one umbrella. 350K followers, live e-commerce, AI photo pipeline and multi-channel growth.",
      de: "Sechs Welten zirkulären Luxus unter einem Dach. 350K Follower, Live-E-Commerce, KI-Foto-Pipeline und Multi-Channel-Growth.",
    },
    image: "/images/projects/eleonora-cover.jpg" as string | null,
    video: null,
    mobileVideo: null,
    color: "#f074aa",
    url: "https://eleonora-morales.vercel.app",
    caseStudy: {
      role: "Creative Director & Tech Partner",
      location: "Colombia · Global",
      year: "2026–present",
      headline: {
        es: "Lujo circular con ecosistema digital 360° — en operación.",
        en: "Circular luxury with a 360° live digital ecosystem.",
        de: "Zirkulärer Luxus mit einem 360° Live-Ökosystem.",
      },
      story: {
        es: "Arranque con e-commerce (Shopify + Storefront API custom) y 6 sub-brands bajo una sombrilla, incluyendo Garage Sale para la operación second-hand. Dirección creativa, producción de contenido y growth multi-canal — pauta digital y orgánico. Go-live Abril 2026, escalamiento continuo hacia Día de la Madre.",
        en: "Kicked off with e-commerce (Shopify + custom Storefront API) and 6 sub-brands under one umbrella, including Garage Sale for the second-hand operation. Creative direction, content production and multi-channel growth — paid and organic. Live April 2026, ongoing ramp-up toward Mother's Day.",
        de: "Start mit E-Commerce (Shopify + Custom Storefront API) und 6 Sub-Brands unter einem Dach, einschließlich Garage Sale für den Second-Hand-Betrieb. Kreativdirektion, Content-Produktion und Multi-Channel-Growth — Paid und Organic. Live seit April 2026, kontinuierlicher Ramp-Up bis Muttertag.",
      },
      pillars: [
        { label: "Brand", detail: { es: "Sistema visual y manual live", en: "Visual system & live brand manual", de: "Visuelles System & Live-Brand-Manual" } },
        { label: "E-commerce", detail: { es: "Shopify + Storefront API custom", en: "Shopify + custom Storefront API", de: "Shopify + Custom Storefront API" } },
        { label: "Content", detail: { es: "Second-hand y dirección creativa", en: "Second-hand & creative direction", de: "Second-Hand & Kreativdirektion" } },
        { label: "Growth", detail: { es: "Pauta y orgánico multi-canal", en: "Paid & organic multi-channel", de: "Paid & Organic Multi-Channel" } },
      ],
      press: [],
    },
    gridClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5] md:aspect-auto",
    visual: {
      gradient: "radial-gradient(circle at 30% 30%, #f074aa18 0%, transparent 50%), radial-gradient(circle at 70% 80%, #f074aa0C 0%, transparent 40%), linear-gradient(160deg, #15101A 0%, #0D0D14 100%)",
      letter: "EM",
      letterSize: "clamp(70px, 13vw, 160px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#f074aa",
      decorLine: false,
      number: "04",
    },
  },
  {
    id: "pacho",
    slug: "pacho-alvarez",
    name: "Pacho Alvarez",
    tag: "STUDIO × COMPANY BUILDER",
    desc: {
      es: "Piloto del Dakar Rally. Web inmersiva, estructura de negocio, conferencias, pricing y go-to-market.",
      en: "Dakar Rally driver. Immersive web, business structure, conferences, pricing & go-to-market.",
      de: "Dakar-Rally-Fahrer. Immersive Web, Geschäftsstruktur, Konferenzen, Pricing & Go-to-Market.",
    },
    image: null as string | null,
    video: "/videos/pacho-alvarez-reel.mp4",
    mobileVideo: "/videos/pacho-alvarez-mobile.mp4",
    color: "#F8B4D9",
    url: "https://pacho-alvarez-dakar.vercel.app",
    gridClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5] md:aspect-auto",
    visual: {
      gradient: "radial-gradient(circle at 70% 20%, #F8B4D918 0%, transparent 50%), radial-gradient(circle at 30% 80%, #F8B4D90C 0%, transparent 40%), linear-gradient(160deg, #110F16 0%, #0D0D14 100%)",
      letter: "PA",
      letterSize: "clamp(60px, 12vw, 140px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#F8B4D9",
      decorLine: false,
      number: "05",
    },
  },
  {
    id: "spectro",
    slug: "spectro",
    name: "Spectro",
    tag: "PARTNER × GLOBAL CONTENT",
    desc: {
      es: "Plataforma global de entretenimiento deportivo. Socio en Spectro Legends — contenido audiovisual de Colombia al mundo.",
      en: "Global sports entertainment platform. Partner in Spectro Legends — Colombia's audiovisual content to the world.",
      de: "Globale Sport-Entertainment-Plattform. Partner bei Spectro Legends — Kolumbiens audiovisuelle Inhalte weltweit.",
    },
    image: null as string | null,
    video: "/videos/spectro-reel.mp4",
    mobileVideo: "/videos/spectro-mobile.mp4",
    color: "#8B5CF6",
    url: null,
    gridClass: "md:col-span-2 md:row-span-1",
    aspect: "aspect-[16/9] md:aspect-auto",
    visual: {
      gradient: "conic-gradient(from 180deg at 50% 50%, #8B5CF608 0deg, #8B5CF620 120deg, #8B5CF608 240deg, #8B5CF600 360deg), linear-gradient(180deg, #0E0D16 0%, #12111A 100%)",
      letter: "S",
      letterSize: "clamp(100px, 18vw, 200px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#8B5CF6",
      decorLine: false,
      number: "06",
    },
  },
];

const WorkShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { theme } = useTheme();
  const isModena = theme === "modena";
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const langPrefix = language === "es" ? "" : `/${language}`;

  const content = {
    tag: { es: 'SELECTED WORK', en: 'SELECTED WORK', de: 'SELECTED WORK' },
    heading: { es: 'Lo que construyo.', en: 'What I build.', de: 'Was ich baue.' },
    back: { es: 'Volver', en: 'Back', de: 'Zurück' },
    visitSite: { es: 'Visitar sitio', en: 'Visit site', de: 'Website besuchen' },
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="relative py-28 md:py-36 overflow-hidden"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-20"
          >
            <p className="font-clash text-[9px] md:text-[11px] tracking-[0.4em] uppercase text-[#F8B4D9]/75 font-medium mb-3 md:mb-4">
              {content.tag[language]}
            </p>
            <h2
              className="font-clash font-bold leading-[1.05]"
              style={{
                letterSpacing: "-0.025em",
                color: "rgba(var(--text-rgb), 0.85)",
                fontSize: "clamp(26px, 5.5vw, 56px)",
              }}
            >
              {content.heading[language]}
            </h2>
          </motion.div>

          {/* Editorial asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-auto md:auto-rows-[280px]">
            {PROJECTS.map((project, i) => {
              const isHovered = hovered === project.id;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer ${project.gridClass} ${(project as { aspect?: string }).aspect || ""}`}
                  onClick={() => navigate(`${langPrefix}/work/${(project as { slug: string }).slug}`)}
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Background */}
                  <div
                    className="absolute inset-0"
                    style={{ background: project.visual.gradient }}
                  />
                  {(project as { video?: string }).video ? (
                    <LazyVideo
                      src={isMobile && (project as { mobileVideo?: string }).mobileVideo ? (project as { mobileVideo?: string }).mobileVideo! : (project as { video?: string }).video!}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                      style={{ opacity: 0.75 }}
                    />
                  ) : project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.name} — cover`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                      style={{ opacity: 0.85 }}
                    />
                  ) : null}

                  {/* Decorative accent line */}
                  {project.visual.decorLine && (
                    <div
                      className="absolute top-0 left-0 w-px h-full opacity-[0.06] group-hover:opacity-[0.15] transition-opacity duration-700"
                      style={{ background: `linear-gradient(to bottom, transparent, ${project.visual.accent}, transparent)` }}
                    />
                  )}

                  {/* Giant letter watermark */}
                  <span
                    className={`absolute ${project.visual.letterPos} font-clash font-bold select-none transition-all duration-[1.4s] ease-out opacity-[0.04] group-hover:opacity-[0.08]`}
                    style={{
                      fontSize: project.visual.letterSize,
                      color: project.visual.accent,
                      letterSpacing: "-0.06em",
                      lineHeight: 1,
                    }}
                  >
                    {project.visual.letter}
                  </span>

                  {/* Number index */}
                  <div className="absolute top-5 left-5 z-10">
                    <span
                      className="font-mono text-[10px] transition-all duration-500"
                      style={{
                        color: isHovered
                          ? `${project.visual.accent}90`
                          : "rgba(255,252,247,0.1)",
                      }}
                    >
                      {project.visual.number}
                    </span>
                  </div>

                  {/* Tag — top right */}
                  <div className="absolute top-5 right-5 z-10">
                    <span
                      className="font-clash text-[8px] md:text-[9px] tracking-[0.25em] uppercase font-medium transition-all duration-500"
                      style={{
                        color: isHovered
                          ? `${project.visual.accent}80`
                          : "rgba(255,252,247,0.12)",
                      }}
                    >
                      {project.tag}
                    </span>
                  </div>

                  {/* Bottom info — always visible but enhanced on hover */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6">
                    {/* Gradient behind text */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to top, ${isHovered ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0.55)"} 0%, transparent 100%)`,
                      }}
                    />

                    <div className="relative">
                      <h3
                        className="font-clash text-xl md:text-2xl font-bold transition-all duration-500"
                        style={{
                          letterSpacing: "-0.02em",
                          color: isHovered
                            ? "rgba(255,252,247,0.95)"
                            : "rgba(255,252,247,0.5)",
                        }}
                      >
                        {project.name}
                      </h3>

                      {/* Description — slides up on hover */}
                      <div
                        className="overflow-hidden transition-all duration-500 ease-out"
                        style={{
                          maxHeight: isHovered ? "80px" : "0px",
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? "translateY(0)" : "translateY(8px)",
                        }}
                      >
                        <p className="font-clash text-xs text-[#FFFCF7]/35 leading-relaxed mt-2 max-w-sm">
                          {project.desc[language]}
                        </p>
                      </div>

                      {/* Arrow — appears on hover */}
                      <div
                        className="flex items-center gap-2 mt-3 transition-all duration-500"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? "translateX(0)" : "translateX(-8px)",
                        }}
                      >
                        <div
                          className="h-px transition-all duration-500"
                          style={{
                            width: isHovered ? "24px" : "0px",
                            background: project.visual.accent,
                            opacity: 0.5,
                          }}
                        />
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          style={{ color: `${project.visual.accent}80` }}
                        >
                          <path
                            d="M3 7h8M8 3.5L11 7l-3 3.5"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-700"
                    style={{
                      border: isHovered
                        ? `1px solid ${project.visual.accent}25`
                        : "1px solid rgba(255,252,247,0.03)",
                      boxShadow: isHovered
                        ? `inset 0 0 60px -20px ${project.visual.accent}08`
                        : "none",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fullscreen expanded view */}
      <AnimatePresence>
        {expanded &&
          (() => {
            const project = PROJECTS.find((p) => p.id === expanded);
            if (!project) return null;
            return (
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[60] flex items-center justify-center pt-20"
                style={{
                  background: isModena ? "rgba(245, 240, 235, 0.98)" : "rgba(8, 8, 12, 0.98)",
                }}
                onClick={() => setExpanded(null)}
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-[92vw] h-[85vh] max-w-[1400px] rounded-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Background */}
                  {(project as { video?: string }).video ? (
                    <>
                      <div className="absolute inset-0" style={{ background: project.visual.gradient }} />
                      <LazyVideo
                        src={isMobile && (project as { mobileVideo?: string }).mobileVideo ? (project as { mobileVideo?: string }).mobileVideo! : (project as { video?: string }).video!}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ opacity: 0.35 }}
                      />
                    </>
                  ) : project.image ? (
                    <>
                      {/* Brand background gradient behind image, visible where image doesn't cover */}
                      <div className="absolute inset-0" style={{ background: project.visual.gradient }} />
                      {/* Image positioned top so hero of the captured website is visible */}
                      <img
                        src={project.image}
                        alt={`${project.name} — website preview`}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        style={{ opacity: 0.70 }}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full" style={{ background: project.visual.gradient }}>
                      <span
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-clash font-bold select-none"
                        style={{ fontSize: "25vw", color: `${project.visual.accent}06`, letterSpacing: "-0.06em", lineHeight: 1 }}
                      >
                        {project.visual.letter}
                      </span>
                    </div>
                  )}

                  {/* Gradient overlay — lighter up top when we have an image, heavy only at bottom */}
                  <div className="absolute inset-0" style={{ background: isModena
                    ? (project.image
                        ? "linear-gradient(to top, rgba(245,240,235,0.98) 0%, rgba(245,240,235,0.82) 30%, rgba(245,240,235,0.15) 55%, rgba(245,240,235,0.05) 100%)"
                        : "linear-gradient(to top, rgba(245,240,235,0.99) 0%, rgba(245,240,235,0.92) 35%, rgba(245,240,235,0.70) 60%, rgba(245,240,235,0.30) 100%)")
                    : (project.image
                        ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.02) 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.15) 100%)")
                  }} />

                  {/* Number */}
                  <div className="absolute top-8 left-8 md:top-10 md:left-10">
                    <span className="font-mono text-sm" style={{ color: `${project.visual.accent}40` }}>
                      {project.visual.number}
                    </span>
                  </div>

                  {/* Case study layout — two columns on desktop */}
                  {(project as { caseStudy?: object }).caseStudy ? (() => {
                    const cs = (project as { caseStudy: { role: string; location: string; year: string; headline: { es: string; en: string; de: string }; story: { es: string; en: string; de: string }; pillars: { label: string; detail: { es: string; en: string; de: string } }[]; press: { name: string; href: string }[] } }).caseStudy;
                    return (
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
                        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">

                          {/* Left — main info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <span className="font-clash text-[10px] tracking-[0.3em] uppercase" style={{ color: `${project.visual.accent}80` }}>
                                {project.tag}
                              </span>
                              <span className="font-mono text-[10px]" style={{ color: `${project.visual.accent}30` }}>·</span>
                              <span className="font-mono text-[10px]" style={{ color: `${project.visual.accent}50` }}>{cs.location}</span>
                              <span className="font-mono text-[10px]" style={{ color: `${project.visual.accent}30` }}>·</span>
                              <span className="font-mono text-[10px]" style={{ color: `${project.visual.accent}50` }}>{cs.year}</span>
                            </div>

                            <h3
                              className={`font-clash text-3xl md:text-5xl lg:text-6xl font-bold mb-3 ${isModena ? 'text-[#0B0B10]/90' : 'text-[#FFFCF7]/90'}`}
                              style={{ letterSpacing: "-0.02em", lineHeight: 1.0 }}
                            >
                              {project.name}
                            </h3>

                            <p className={`font-clash text-[13px] md:text-sm mb-4 max-w-lg leading-relaxed ${isModena ? 'text-[#0B0B10]/65' : 'text-[#FFFCF7]/35'}`}>
                              {cs.story[language]}
                            </p>

                            {/* Press links */}
                            <div className="flex flex-wrap items-center gap-4 mb-2">
                              {cs.press.map((p) => (
                                <a
                                  key={p.name}
                                  href={p.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-clash text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
                                  style={{ color: `${project.visual.accent}60` }}
                                  onMouseEnter={e => { e.currentTarget.style.color = project.visual.accent; }}
                                  onMouseLeave={e => { e.currentTarget.style.color = `${project.visual.accent}60`; }}
                                  onClick={e => e.stopPropagation()}
                                >
                                  {p.name} →
                                </a>
                              ))}
                              {project.url && (
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-clash text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
                                  style={{ color: isModena ? "rgba(11,11,16,0.40)" : "rgba(255,252,247,0.30)" }}
                                  onMouseEnter={e => { e.currentTarget.style.color = isModena ? "rgba(11,11,16,0.80)" : "rgba(255,252,247,0.70)"; }}
                                  onMouseLeave={e => { e.currentTarget.style.color = isModena ? "rgba(11,11,16,0.40)" : "rgba(255,252,247,0.30)"; }}
                                  onClick={e => e.stopPropagation()}
                                >
                                  {content.visitSite[language]} →
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Right — pillars */}
                          <div className="hidden md:grid grid-cols-2 gap-3 flex-shrink-0 w-[320px]">
                            {cs.pillars.map((pillar) => (
                              <div
                                key={pillar.label}
                                className="rounded-lg p-4"
                                style={{
                                  background: isModena ? "rgba(11,11,16,0.06)" : "rgba(255,252,247,0.03)",
                                  border: `1px solid ${project.visual.accent}15`,
                                }}
                              >
                                <p className="font-clash text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: `${project.visual.accent}70` }}>
                                  {pillar.label}
                                </p>
                                <p className={`font-clash text-[11px] leading-snug ${isModena ? 'text-[#0B0B10]/60' : 'text-[#FFFCF7]/35'}`}>
                                  {pillar.detail[language]}
                                </p>
                              </div>
                            ))}
                          </div>

                        </div>
                      </div>
                    );
                  })() : (
                    /* Default info for other projects */
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
                      <p className="font-clash text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ color: `${project.visual.accent}80` }}>
                        {project.tag}
                      </p>
                      <h3
                        className={`font-clash text-4xl md:text-6xl lg:text-7xl font-bold mb-4 ${isModena ? 'text-[#0B0B10]/90' : 'text-[#FFFCF7]/90'}`}
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {project.name}
                      </h3>
                      <p className={`font-clash text-sm md:text-base max-w-xl leading-relaxed ${isModena ? 'text-[#0B0B10]/65' : 'text-[#FFFCF7]/40'}`}>
                        {project.desc[language]}
                      </p>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 mt-6 font-clash text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                          style={{ color: `${project.visual.accent}70` }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = project.visual.accent; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = `${project.visual.accent}70`; }}
                          onClick={e => e.stopPropagation()}
                        >
                          {content.visitSite[language]}
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M4 10L10 4M10 4H5M10 4v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Back button — top left, visible on mobile */}
                <button
                  onClick={() => setExpanded(null)}
                  className={`absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${isModena ? 'bg-[#F5F0EB]/80 text-[#0B0B10]/70 hover:text-[#0B0B10] border border-[#0B0B10]/10' : 'bg-[#0B0B10]/60 text-[#FFFCF7]/70 hover:text-[#FFFCF7] border border-[#FFFCF7]/15'}`}
                >
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                    <path d="M11 7H3M3 7l3.5-3.5M3 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-clash text-[11px] tracking-[0.15em] uppercase font-semibold">{content.back[language]}</span>
                </button>

                {/* Close — top right, visible on mobile */}
                <button
                  onClick={() => setExpanded(null)}
                  className={`absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${isModena ? 'bg-[#F5F0EB]/80 text-[#0B0B10]/70 hover:text-[#0B0B10] border border-[#0B0B10]/10' : 'bg-[#0B0B10]/60 text-[#FFFCF7]/70 hover:text-[#FFFCF7] border border-[#FFFCF7]/15'}`}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M4 4l10 10M14 4L4 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </motion.div>
            );
          })()}
      </AnimatePresence>
    </>
  );
};

export default WorkShowcase;
