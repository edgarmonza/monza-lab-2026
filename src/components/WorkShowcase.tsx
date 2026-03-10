import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: "bavarian",
    name: "Bavarian Econs",
    tag: "0→1 × LUXURY",
    desc: "Marca de lujo automotriz. Branding, web global y sistema de ventas. Featured in Forbes.",
    image: null as string | null,
    video: "/videos/bavarian-econs-reel.mp4",
    color: "#C4A35A",
    url: "https://www.bavarianecons.com",
    caseStudy: {
      role: "Co-Founder & Creative Director",
      location: "Europa · USA",
      year: "2022–present",
      headline: "De idea a marca de lujo global en un mercado que nadie había tocado.",
      story: "Validé el MVP, estructuré el pitch de financiación y construí el sistema digital completo — desde la identidad de marca hasta el ecosistema de ventas. El BMW 2002 es hoy uno de los clásicos más cotizados del mundo. Bavarian Econs lo electrifica para coleccionistas en Europa y Estados Unidos.",
      pillars: [
        { label: "Strategy", detail: "Validación de mercado, MVP y modelo de negocio" },
        { label: "Brand", detail: "Identidad, naming, sistema visual completo" },
        { label: "Digital", detail: "Web global, SEO y ecosistema de ventas" },
        { label: "Capital", detail: "Pitch deck y ronda de financiación" },
      ],
      press: [
        { name: "Forbes Colombia", href: "https://forbes.co/2024/09/10/editors-picks/estos-colombianos-estan-electrificando-clasicos-de-bmw-para-coleccionistas-en-europa-y-estados-unidos" },
        { name: "Motor Trend", href: "https://www.motortrend.com/reviews/bmw-2002-bavarian-econs-2002te-ev-swap-first-drive-review" },
        { name: "The Org", href: "https://theorg.com/iterate/bavarian-econs-how-two-colombians-are-reviving-germanys-iconic-auto-industry" },
      ],
    },
    gridClass: "md:col-span-2 md:row-span-2",
    aspect: "aspect-[16/10] md:aspect-auto md:h-full",
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
    id: "spectro",
    name: "Spectro",
    tag: "STUDIO PRO × SPORTS",
    desc: "Plataforma de entretenimiento deportivo. Copa Creadores, branding y ecosistema digital.",
    image: null as string | null,
    video: "/videos/spectro-reel.mp4",
    color: "#8B5CF6",
    url: null,
    gridClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5]",
    visual: {
      gradient: "conic-gradient(from 180deg at 50% 50%, #8B5CF608 0deg, #8B5CF620 120deg, #8B5CF608 240deg, #8B5CF600 360deg), linear-gradient(180deg, #0E0D16 0%, #12111A 100%)",
      letter: "S",
      letterSize: "clamp(100px, 18vw, 200px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#8B5CF6",
      decorLine: false,
      number: "02",
    },
  },
  {
    id: "pacho",
    name: "Pacho Alvarez",
    tag: "STUDIO 1:1 × COMPANY BUILDER",
    desc: "Piloto del Dakar Rally. Web inmersiva, estructura de negocio, conferencias, pricing y go-to-market.",
    image: null as string | null,
    video: "/videos/pacho-alvarez-reel.mp4",
    color: "#F8B4D9",
    url: null,
    gridClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5]",
    visual: {
      gradient: "radial-gradient(circle at 70% 20%, #F8B4D918 0%, transparent 50%), radial-gradient(circle at 30% 80%, #F8B4D90C 0%, transparent 40%), linear-gradient(160deg, #110F16 0%, #0D0D14 100%)",
      letter: "PA",
      letterSize: "clamp(60px, 12vw, 140px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#F8B4D9",
      decorLine: false,
      number: "03",
    },
  },
  {
    id: "guardian",
    name: "Guardian of Speed",
    tag: "0→1 × COMPANY BUILDER",
    desc: "Transporte de lujo para autos de alta gama en Europa. Experiencia digital hiperpersonalizada, pitch de inversión y go-to-market.",
    image: null as string | null,
    video: "/videos/guardian-speed-reel.mp4",
    color: "#C4A35A",
    url: null,
    caseStudy: {
      role: "Co-Founder & Creative Director",
      location: "München · Europa",
      year: "2025–present",
      headline: "Logística de lujo para los autos más exclusivos del mundo.",
      story: "Construí la marca, el sistema digital hiperpersonalizado para clientes y la estructura de crecimiento con inversores. Guardian of Speed transporta autos de alta gama por toda Europa con una experiencia que iguala el nivel de los vehículos que mueve.",
      pillars: [
        { label: "Brand", detail: "Identidad premium y sistema visual" },
        { label: "Digital", detail: "Web y experiencia hiperpersonalizada" },
        { label: "Capital", detail: "Pitch deck y ronda de inversión" },
        { label: "Growth", detail: "Go-to-market y estrategia comercial" },
      ],
      press: [],
    },
    gridClass: "md:col-span-2 md:row-span-1",
    aspect: "aspect-[4/5] md:aspect-[21/9]",
    visual: {
      gradient: "radial-gradient(ellipse at 10% 50%, #C4A35A15 0%, transparent 40%), radial-gradient(ellipse at 90% 50%, #C4A35A10 0%, transparent 40%), linear-gradient(90deg, #14100F 0%, #0D0D14 50%, #14100F 100%)",
      letter: "GS",
      letterSize: "clamp(60px, 12vw, 180px)",
      letterPos: "top-[50%] right-[8%] -translate-y-1/2",
      accent: "#C4A35A",
      decorLine: true,
      number: "04",
    },
  },
  {
    id: "monzahaus",
    name: "Monza Haus",
    tag: "0→1 × PRODUCT",
    desc: "El Bloomberg de los carros. Base de datos, frontend, UI y modelo de negocio. En construcción.",
    image: null as string | null,
    video: "/videos/monza-haus-reel.mp4",
    color: "#F8B4D9",
    url: null,
    caseStudy: {
      role: "Founder & Product Lead",
      location: "Global",
      year: "2026–present",
      headline: "El Bloomberg de los carros.",
      story: "Base de datos en tiempo real, configuración de frontend y UI desde cero, y diseño del modelo de negocio. Monza Haus centraliza toda la inteligencia del mercado automotriz en una sola plataforma.",
      pillars: [
        { label: "Database", detail: "Arquitectura de datos en tiempo real" },
        { label: "Frontend", detail: "UI/UX desde cero" },
        { label: "Product", detail: "Modelo de negocio y go-to-market" },
        { label: "AI", detail: "Inteligencia de mercado automotriz" },
      ],
      press: [],
    },
    gridClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5]",
    visual: {
      gradient: "radial-gradient(circle at 30% 40%, #F8B4D918 0%, transparent 50%), radial-gradient(circle at 70% 70%, #F8B4D90C 0%, transparent 40%), linear-gradient(160deg, #110F16 0%, #0D0D14 100%)",
      letter: "MH",
      letterSize: "clamp(60px, 12vw, 140px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#F8B4D9",
      decorLine: false,
      number: "05",
    },
  },
];

const WorkShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

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
            <p className="font-clash text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#F8B4D9]/50 font-medium mb-4">
              SELECTED WORK
            </p>
            <h2
              className="font-clash text-[8vw] md:text-[5vw] lg:text-[3.5vw] font-bold leading-[1.05]"
              style={{ letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.80)" }}
            >
              Lo que construimos.
            </h2>
          </motion.div>

          {/* Editorial asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3 auto-rows-auto md:auto-rows-[260px]">
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
                  className={`group relative rounded-xl overflow-hidden cursor-pointer ${project.gridClass}`}
                  onClick={() => setExpanded(project.id)}
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Background */}
                  <div
                    className="absolute inset-0"
                    style={{ background: project.visual.gradient }}
                  />
                  {(project as { video?: string }).video && (
                    <video
                      src={(project as { video?: string }).video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                      style={{ opacity: 0.75 }}
                    />
                  )}

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
                          {project.desc}
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
                className="fixed inset-0 z-[45] flex items-center justify-center pt-20"
                style={{
                  background: "rgba(8, 8, 12, 0.98)",
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
                      <video
                        src={(project as { video?: string }).video}
                        autoPlay loop muted playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ opacity: 0.35 }}
                      />
                    </>
                  ) : project.image ? (
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
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

                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.15) 100%)" }} />

                  {/* Number */}
                  <div className="absolute top-8 left-8 md:top-10 md:left-10">
                    <span className="font-mono text-sm" style={{ color: `${project.visual.accent}40` }}>
                      {project.visual.number}
                    </span>
                  </div>

                  {/* Case study layout — two columns on desktop */}
                  {(project as { caseStudy?: object }).caseStudy ? (() => {
                    const cs = (project as { caseStudy: { role: string; location: string; year: string; headline: string; story: string; pillars: { label: string; detail: string }[]; press: { name: string; href: string }[] } }).caseStudy;
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
                              className="font-clash text-3xl md:text-5xl lg:text-6xl font-bold text-[#FFFCF7]/90 mb-3"
                              style={{ letterSpacing: "-0.02em", lineHeight: 1.0 }}
                            >
                              {project.name}
                            </h3>

                            <p className="font-clash text-[13px] md:text-sm text-[#FFFCF7]/35 mb-4 max-w-lg leading-relaxed">
                              {cs.story}
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
                                  style={{ color: "rgba(255,252,247,0.30)" }}
                                  onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,252,247,0.70)"; }}
                                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,252,247,0.30)"; }}
                                  onClick={e => e.stopPropagation()}
                                >
                                  Visitar sitio →
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
                                  background: "rgba(255,252,247,0.03)",
                                  border: `1px solid ${project.visual.accent}15`,
                                }}
                              >
                                <p className="font-clash text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: `${project.visual.accent}70` }}>
                                  {pillar.label}
                                </p>
                                <p className="font-clash text-[11px] text-[#FFFCF7]/35 leading-snug">
                                  {pillar.detail}
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
                        className="font-clash text-4xl md:text-6xl lg:text-7xl font-bold text-[#FFFCF7]/90 mb-4"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {project.name}
                      </h3>
                      <p className="font-clash text-sm md:text-base text-[#FFFCF7]/40 max-w-xl leading-relaxed">
                        {project.desc}
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
                          Visitar sitio
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M4 10L10 4M10 4H5M10 4v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Back button — top left */}
                <button
                  onClick={() => setExpanded(null)}
                  className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFFCF7]/10 text-[#FFFCF7]/40 hover:text-[#FFFCF7]/80 hover:border-[#FFFCF7]/30 transition-all duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M11 7H3M3 7l3.5-3.5M3 7l3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-clash text-[10px] tracking-[0.2em] uppercase">Volver</span>
                </button>

                {/* Close — top right */}
                <button
                  onClick={() => setExpanded(null)}
                  className="absolute top-6 right-6 md:top-10 md:right-10 w-10 h-10 flex items-center justify-center rounded-full border border-[#FFFCF7]/10 text-[#FFFCF7]/40 hover:text-[#FFFCF7]/80 hover:border-[#FFFCF7]/30 transition-all duration-300"
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
