import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterMinimal from "@/components/FooterMinimal";
import PremiumBackground from "@/components/layout/PremiumBackground";
import PageCue from "@/components/PageCue";
import { Target, FileCheck, RefreshCw, Layers, ChevronDown, ChevronUp, X } from "lucide-react";
import helmetHero from "@/assets/FotoMonzaHeroWeb.png";

const Sessions = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedSprint, setSelectedSprint] = useState<number | null>(null);
  const [loopInView, setLoopInView] = useState(false);
  const loopSectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for performance - pause animation when not in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setLoopInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (loopSectionRef.current) {
      observer.observe(loopSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sprints = [
    {
      num: "01",
      nombre: "Evidence Vault",
      output: "Evidence Vault + prueba de impacto.",
      detalles: [
        "Armamos tu repositorio de evidencia (logros, casos, cifras).",
        "Conectamos evidencia a prompts que la activan.",
        "Sistema para alimentarlo cada semana.",
      ],
    },
    {
      num: "02",
      nombre: 'Cerebro "Yo"',
      output: "Bio + pitch 30s + fortalezas con evidencia.",
      detalles: [
        "Definimos tu voz y tono únicos.",
        "Extraemos fortalezas con evidencia real.",
        "Bio y pitch listos para usar.",
      ],
    },
    {
      num: "03",
      nombre: 'Cerebro "Estratega"',
      output: "3 rutas + decisión con criterio.",
      detalles: [
        "Mapeamos 3 rutas posibles.",
        "Evaluamos con criterios claros.",
        "Próximos pasos definidos.",
      ],
    },
    {
      num: "04",
      nombre: "Storytelling",
      output: "Historia base (vendible) + 3 versiones.",
      detalles: [
        "Historia central con gancho.",
        "Adaptada a post, bio, pitch.",
        "Lista para publicar.",
      ],
    },
    {
      num: "05",
      nombre: "Branding (empaque para vender)",
      output: "Promesa 1 línea + tokens visuales.",
      detalles: [
        "Promesa clara en una línea.",
        "Tokens visuales básicos.",
        "Mensaje alineado con estética.",
      ],
    },
    {
      num: "06",
      nombre: "Pitch Deck",
      output: "Deck corto listo para enviar hoy.",
      detalles: [
        "Deck de 6 slides estructurado.",
        "One-pager complementario.",
        "Mensaje de CTA listo.",
      ],
    },
  ];

  const loopSteps = [
    { 
      icon: Target, 
      num: "01",
      label: "Enfoque (Contexto)", 
      desc: "Objetivo + restricciones + definición de 'listo'." 
    },
    { 
      icon: Layers, 
      num: "02",
      label: "Receta (Sistema)", 
      desc: "Framework + prompts + plantilla para tu caso." 
    },
    { 
      icon: FileCheck, 
      num: "03",
      label: "Output (Entregable)", 
      desc: "Lo construimos en vivo. Versión 1 lista." 
    },
    { 
      icon: RefreshCw, 
      num: "04",
      label: "Iteración (en vivo)", 
      desc: "Feedback → versión 2 → versión 3 (en sesión)." 
    },
  ];

  const faqs = [
    { q: "¿Es clase o es ejecución?", a: "Es sprint. Trabajas en tu entregable en vivo." },
    { q: "¿Es grupal o 1:1?", a: "Es grupal en grupo reducido; el trabajo es individual." },
    { q: "¿Qué necesito llevar?", a: "Tu computador. Y 15 minutos de pre-session (obligatoria) para definir objetivo y dejar todo listo. Si tienes evidencia, mejor." },
    { q: "¿Salgo con algo listo?", a: "Sí: un entregable real (listo para usar) + plantilla + prompts." },
    { q: "¿Para quién NO es?", a: "Si no vas a construir en vivo, mejor no." },
    { q: "¿Cuántos cupos hay?", a: "Limitados por sesión." },
  ];

  const specs = [
    { label: "Formato", value: "Sprint grupal presencial (4h). Trabajo individual guiado." },
    { label: "Ritmo", value: "Loop guiado: construir → iterar → publicar." },
    { label: "Te llevas", value: "1 entregable real + plantilla + prompts." },
    { label: "Después", value: "Sales con el entregable y la receta." },
  ];

  return (
    <PremiumBackground>
      <Navbar />
      
      {/* HERO - Standardized with HeroHome */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pb-20 md:pb-28 pt-32 md:pt-40" style={{ backgroundColor: 'transparent' }}>
        {/* Layer 0: Base Background - Seamless with body */}
        <div 
          className="absolute inset-0 z-[0]"
          style={{
            background: 'linear-gradient(180deg, rgba(11, 11, 16, 0) 0%, rgba(11, 11, 16, 0) 100%)',
          }}
        />
        {/* Bottom fade to blend with next section */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 z-[5] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgb(11, 11, 16) 100%)',
          }}
        />
        <div 
          className="absolute inset-0 z-[0]"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(248, 180, 217, 0.08) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute inset-0 z-[0]"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(120, 100, 140, 0.04) 0%, transparent 50%)',
          }}
        />
        
        {/* Layer 1: Helmet Image - IDENTICAL TO HOME */}
        <div 
          className="absolute inset-0 z-[1] lg:bg-[length:90%_auto] bg-cover sessions-hero-helmet-bg"
          style={{
            backgroundImage: `url(${helmetHero})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 56%',
            opacity: 1,
            filter: 'contrast(1.05) saturate(1.05)',
          }}
        />
        <style>{`
          @media (min-width: 1024px) {
            .sessions-hero-helmet-bg {
              background-position: right 52% !important;
            }
          }
        `}</style>
        
        {/* Layer 2: Text Protection - LEFT SIDE ONLY */}
        <div 
          className="absolute inset-0 z-[2]"
          style={{
            background: 'linear-gradient(90deg, rgba(10,9,12,0.78) 0%, rgba(10,9,12,0.70) 35%, rgba(10,9,12,0.25) 70%, rgba(10,9,12,0.00) 100%)',
          }}
        />
        
        {/* Layer 3: Premium Vignette - SUBTLE */}
        <div 
          className="absolute inset-0 z-[3]"
          style={{
            background: 'radial-gradient(70% 70% at 50% 40%, transparent 0%, rgba(11,11,16,0.20) 70%, rgba(11,11,16,0.30) 100%)',
          }}
        />

        {/* Mobile: Stronger text protection */}
        <div 
          className="absolute inset-0 z-[4] lg:hidden"
          style={{
            background: 'linear-gradient(90deg, rgba(10,9,12,0.35) 0%, rgba(10,9,12,0.15) 60%, rgba(10,9,12,0.00) 100%)',
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12 flex flex-col items-center lg:items-start justify-center">
          <div className="w-full max-w-[680px] text-center lg:text-left">
            {/* Tag / Eyebrow */}
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-white/35 font-normal mb-8 md:mb-10">
              Monza Sessions | Sprints
            </p>

            {/* H1 - Matching HeroHome */}
            <h1 className="font-display font-medium text-[2rem] md:text-[2.6rem] lg:text-[3.2rem] xl:text-[3.6rem] leading-[1.08] tracking-[-0.01em] mb-8 md:mb-10 text-[#FFFCF7]">
              Sprints IA-first para salir<br />
              <span className="text-[#F8B4D9]">con entregables reales.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg lg:text-xl text-white/50 max-w-[560px] mb-12 md:mb-14 leading-[1.7] tracking-wide mx-auto lg:mx-0">
              4 horas en grupo reducido. Cada persona trabaja en su propuesta/pitch y aprende el loop: iterar → mejorar → pulir.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
              <a
                href="#sessions-catalogo"
                className="rounded-full px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase bg-[#F8B4D9] text-[#0b0b10] hover:bg-[#f4cbde] border-0 shadow-[0_6px_24px_-6px_rgba(248,180,217,0.3)] hover:shadow-[0_8px_32px_-6px_rgba(248,180,217,0.4)] transition-all duration-300"
              >
                Ver Sessions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE PROOF - Editorial Visual Block */}
      <section className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[440px] overflow-hidden">
        {/* Desktop Image */}
        <picture>
          <source 
            media="(min-width: 640px)" 
            srcSet="/images/sessions/stage-desktop.png" 
          />
          <img
            src="/images/sessions/stage-mobile.png"
            alt="Monza Session - Keynote stage"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              filter: 'saturate(0.75) contrast(1.05)',
            }}
          />
        </picture>
        
        {/* Charcoal overlay with grain */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(11, 11, 16, 0.65) 0%, rgba(11, 11, 16, 0.70) 100%)',
          }}
        />
        
        {/* Subtle grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Editorial caption */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-10 pb-10 md:pb-14">
            <h3 className="text-[#fffcf7] text-xl md:text-2xl lg:text-3xl font-display mb-2">
              De keynote a <span className="text-[#f8b4d9]">sprint</span>.
            </h3>
            <p className="text-[#fffcf7]/60 text-sm md:text-base max-w-md">
              Mismo criterio. Menos ruido. Más <span className="text-[#f8b4d9]">output</span>.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-white/[0.06]" />

      {/* SPEC STRIP */}
      <section className="py-16 md:py-20 relative">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {specs.map((item, index) => (
              <div key={index} className="text-center md:text-left">
                <h3 className="text-[#f8b4d9]/70 text-xs uppercase tracking-[0.2em] mb-2">{item.label}</h3>
                <p className="text-[#fffcf7]/90 text-sm md:text-base font-medium leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-white/[0.06]" />

      {/* EL LOOP MONZA (EN PEQUEÑO) - ÚNICA SECCIÓN DEL LOOP */}
      <section 
        ref={loopSectionRef}
        id="como-funciona" 
        className="py-24 md:py-28 relative overflow-hidden group/loop"
      >
        {/* z-0: Background glow */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 50% 30% at 50% 50%, rgba(248, 180, 217, 0.05) 0%, transparent 60%)',
          }}
        />
        
        {/* z-[1]: Premium Infinity Watermark with Animated Highlight */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          <svg
            viewBox="0 0 200 100"
            className="w-[90%] max-w-[1000px] md:w-[85%] lg:w-[80%] h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginTop: '1.5rem' }}
          >
            {/* Gradient definitions for tail effect */}
            <defs>
              <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f8b4d9" stopOpacity="0" />
                <stop offset="30%" stopColor="#f8b4d9" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#f8b4d9" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#f8b4d9" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f8b4d9" stopOpacity="0" />
                <stop offset="50%" stopColor="#f8b4d9" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f8b4d9" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            
            {/* Base infinity track - visible watermark */}
            <path
              d="M50 50 C50 20, 80 20, 100 50 C120 80, 150 80, 150 50 C150 20, 120 20, 100 50 C80 80, 50 80, 50 50 Z"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            
            {/* Animated pink highlight with tail gradient - ultra slow cinematographic */}
            <path
              d="M50 50 C50 20, 80 20, 100 50 C120 80, 150 80, 150 50 C150 20, 120 20, 100 50 C80 80, 50 80, 50 50 Z"
              stroke="url(#highlightGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="50 250"
              className={`transition-opacity duration-700 motion-reduce:animate-none ${loopInView ? 'animate-infinity-trace-slow' : ''}`}
              style={{
                opacity: loopInView ? 0.40 : 0,
                filter: 'drop-shadow(0 0 6px rgba(248, 180, 217, 0.12))',
              }}
            />
            
            {/* Subtle glow trail behind highlight - even more subtle */}
            <path
              d="M50 50 C50 20, 80 20, 100 50 C120 80, 150 80, 150 50 C150 20, 120 20, 100 50 C80 80, 50 80, 50 50 Z"
              stroke="url(#glowGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="40 260"
              className={`transition-opacity duration-700 motion-reduce:animate-none ${loopInView ? 'animate-infinity-trace-slow' : ''}`}
              style={{
                opacity: loopInView ? 0.08 : 0,
                filter: 'blur(8px)',
              }}
            />
          </svg>
        </div>
        
        {/* z-[2]: Content - Cards and text */}
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-10 relative z-[2]">
          <h2 className="font-display text-2xl md:text-3xl text-[#fffcf7] mb-4 text-center">
            El <span className="text-[#f8b4d9]">loop</span> Monza <span className="text-[#fffcf7]/40">(en pequeño)</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {loopSteps.map((step, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl backdrop-blur-md transition-all duration-[220ms] ease-out hover:-translate-y-[2px] hover:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)] group/card"
                style={{
                  background: "rgba(15, 14, 22, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.boxShadow = "0 10px 30px -18px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(248,180,217,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span className="absolute top-4 right-4 text-xs font-medium text-[#f8b4d9]/70">
                  {step.num}
                </span>
                
                <step.icon className="w-7 h-7 text-[#f8b4d9]/85 mb-4 transition-all duration-200 group-hover/card:text-[#f8b4d9] group-hover/card:drop-shadow-[0_0_8px_rgba(248,180,217,0.25)]" strokeWidth={1.25} />
                <h3 className="text-[#fffcf7] font-semibold text-sm mb-2">{step.label}</h3>
                <p className="text-[#fffcf7]/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-[#fffcf7]/50 text-sm mt-12">
            La herramienta cambia. El loop se queda.
          </p>
        </div>
      </section>

      <div className="w-full h-px bg-white/[0.06]" />

      {/* LA SESSION CORRE 6 SPRINTS */}
      <section id="sessions-catalogo" className="py-24 md:py-28 relative">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(248, 180, 217, 0.06) 0%, transparent 60%)',
          }}
        />
        
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-10 relative z-10">
          {/* Section header */}
          <div className="text-center mb-14">
            <h2 className="font-display text-2xl md:text-3xl text-[#fffcf7] mb-3">
              4 Horas de <span className="text-[#f8b4d9]">Deep Work</span>. De la idea al activo.
            </h2>
          </div>
          
          {/* Hourly agenda grid - 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              {
                label: "HORA 01",
                title: "Deconstrucción del Caos",
                desc: "Auditoría radical en vivo. Filtramos el ruido y aislamos el único problema que te impide escalar hoy.",
              },
              {
                label: "HORA 02",
                title: "Arquitectura de la Solución",
                desc: "Diseñamos la estrategia a medida (Oferta, Sistema o Rol). Sin teoría, puro criterio aplicado.",
              },
              {
                label: "HORA 03",
                title: "Producción IA-First",
                desc: "Ejecución en tiempo real. Usamos IA para construir la primera versión de tu activo (Borrador/MVP) frente a tus ojos.",
              },
              {
                label: "HORA 04",
                title: "El Plan de Ataque",
                desc: "Diseño de tu rutina operativa para los próximos 7 días. Te vas con el sistema instalado, no con tareas pendientes.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="relative p-6 rounded-xl transition-all duration-[220ms] ease-out hover:-translate-y-[2px]"
                style={{
                  background: "rgba(15, 14, 22, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.boxShadow = "0 10px 30px -18px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(248,180,217,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span className="text-[#f8b4d9]/70 text-[10px] uppercase tracking-[0.2em] font-medium mb-3 block">
                  {card.label}
                </span>
                <h3 className="text-[#fffcf7] text-sm font-semibold mb-2">{card.title}</h3>
                <p className="text-[#fffcf7]/50 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      <div className="w-full h-px bg-white/[0.06]" />

      {/* FECHAS DISPONIBLES - BOGOTÁ */}
      <section id="fechas" className="py-24 md:py-28 relative">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 35% at 50% 30%, rgba(248, 180, 217, 0.04) 0%, transparent 60%)',
          }}
        />
        
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-10 relative z-10">
          {/* Section header */}
          <div className="text-center mb-14">
            <h2 className="font-display text-2xl md:text-3xl text-[#fffcf7] mb-3">
              Próximas <span className="text-[#f8b4d9]">Fechas</span> <span className="text-[#fffcf7]/40">[BOGOTÁ]</span>
            </h2>
            <p className="text-[#fffcf7]/60 text-base mb-6">
              Cupos limitados por sesión.
            </p>
            
            {/* Venue Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <span className="text-[#fffcf7]/80">📍</span>
              <span className="text-[#fffcf7]/70 text-sm">
                Venue: <span className="text-[#fffcf7]">Scola Abogados</span> | Calle 72 (Zona Financiera)
              </span>
            </div>
          </div>
          
          {/* Schedule cards grid */}
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            
            {/* Card 1 - Miércoles 5 Marzo */}
            <div
              className="relative p-6 rounded-xl transition-all duration-[220ms] ease-out hover:-translate-y-[2px] group/card"
              style={{
                background: "rgba(15, 14, 22, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(248, 180, 217, 0.25)";
                e.currentTarget.style.boxShadow = "0 10px 30px -18px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(248,180,217,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="mb-4">
                <span className="text-[#f8b4d9]/70 text-xs uppercase tracking-[0.15em]">Marzo</span>
              </div>
              
              <h3 className="text-[#fffcf7] font-medium text-lg mb-1">Jueves 6</h3>
              <p className="text-[#fffcf7]/50 text-sm mb-3">2:00 PM - 6:00 PM</p>
              
              <p className="text-[#fffcf7] text-sm mb-4">$490.000 COP</p>
              
              <a
                href="https://wa.me/573208496241?text=Hola!!%20estoy%20interesado%20en%20el%20Monza%20Session%20del%20jueves%206%20de%20marzo%20en%20Bogot%C3%A1."
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-lg text-center text-xs font-semibold uppercase tracking-[0.1em] bg-[#f8b4d9] text-[#0b0b10] hover:bg-[#f4cbde] transition-all duration-200"
              >
                Aplicar al Jueves
              </a>
            </div>
            
            {/* Card 2 - Jueves 6 Marzo */}
            <div
              className="relative p-6 rounded-xl transition-all duration-[220ms] ease-out hover:-translate-y-[2px] group/card"
              style={{
                background: "rgba(15, 14, 22, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(248, 180, 217, 0.25)";
                e.currentTarget.style.boxShadow = "0 10px 30px -18px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(248,180,217,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="mb-4">
                <span className="text-[#f8b4d9]/70 text-xs uppercase tracking-[0.15em]">Marzo</span>
              </div>
              
              <h3 className="text-[#fffcf7] font-medium text-lg mb-1">Viernes 7</h3>
              <p className="text-[#fffcf7]/50 text-sm mb-3">2:00 PM - 6:00 PM</p>
              
              <p className="text-[#fffcf7] text-sm mb-4">$490.000 COP</p>
              
              <a
                href="https://wa.me/573208496241?text=Hola!!%20estoy%20interesado%20en%20el%20Monza%20Session%20del%20viernes%207%20de%20marzo%20en%20Bogot%C3%A1."
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-lg text-center text-xs font-semibold uppercase tracking-[0.1em] bg-[#f8b4d9] text-[#0b0b10] hover:bg-[#f4cbde] transition-all duration-200"
              >
                Aplicar al Viernes
              </a>
            </div>
            
          </div>
          
          {/* Microcopy */}
          <p className="text-center text-[#fffcf7]/40 text-sm mt-10">
            Los cupos se confirman por WhatsApp.
          </p>
        </div>
      </section>

      {/* SPRINT DETAIL MODAL */}
      {selectedSprint !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedSprint(null)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div 
            className="relative w-full max-w-md rounded-2xl p-8"
            style={{
              background: "rgba(15, 14, 22, 0.98)",
              border: "1px solid rgba(248, 180, 217, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSprint(null)}
              className="absolute top-4 right-4 text-[#fffcf7]/50 hover:text-[#fffcf7] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <span className="text-[#f8b4d9]/60 text-xs font-mono mb-2 block">
              Sprint {sprints[selectedSprint].num}
            </span>
            
            <h3 className="font-display text-xl text-[#fffcf7] mb-3">
              {sprints[selectedSprint].nombre}
            </h3>
            
            <p className="text-[#fffcf7]/70 text-sm mb-6">
              <span className="text-[#fffcf7]/50">Output:</span> {sprints[selectedSprint].output}
            </p>
            
            <div className="space-y-2 mb-6">
              {sprints[selectedSprint].detalles.map((detalle, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#f8b4d9] flex-shrink-0 mt-2" />
                  <p className="text-[#fffcf7]/60 text-sm">{detalle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-px bg-white/[0.06]" />

      {/* FAQ */}
      <section className="py-24 md:py-28 relative">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-10">
          <h2 className="font-display text-2xl md:text-3xl text-[#fffcf7] mb-14 text-center">
            Preguntas <span className="text-[#f8b4d9]">frecuentes</span>
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden transition-all duration-[220ms] ease-out group/faq"
                style={{
                  background: "rgba(15, 14, 22, 0.5)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-[#fffcf7]/90 text-sm md:text-base font-medium">
                    {faq.q}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-4 h-4 text-[#f8b4d9] flex-shrink-0 transition-opacity duration-200" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#fffcf7]/40 flex-shrink-0 transition-opacity duration-200 group-hover/faq:opacity-70" />
                  )}
                </button>
                
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-[#fffcf7]/60 text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MICRO-CALLOUT 1:1 */}
      <div className="py-10 md:py-12 text-center">
        <p className="text-[#fffcf7]/45 text-sm tracking-[0.02em]">
          Si quieres llevar esto a tu caso, lo vemos{" "}
          <Link to="/studio" className="text-[#f8b4d9] hover:text-[#f8b4d9]/80 transition-colors">
            1:1
          </Link>.
        </p>
      </div>

      <div className="w-full h-px bg-white/[0.06]" />

      {/* CTA FINAL */}
      <section className="py-24 md:py-28 relative">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(248, 180, 217, 0.05) 0%, transparent 60%)',
          }}
        />
        
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-10 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-4xl text-[#fffcf7] mb-4">
              IA, sí. Pero en modo play: haciendo.
            </h2>
            <p className="text-[#fffcf7]/60 text-base md:text-lg mb-10">
              4 horas para salir con entregables reales y el loop listo para repetir.
            </p>
            
            <a
              href="https://calendar.notion.so/meet/monzaedgar/flow0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-200 bg-[#f8b4d9] text-[#0b0b10] hover:bg-[#f4cbde] hover:shadow-[0_8px_24px_-4px_rgba(248,180,217,0.25)] hover:-translate-y-[1px]"
            >
              Ver Sesiones y Cupos
            </a>
          </div>
        </div>
      </section>

      <FooterMinimal />
    </PremiumBackground>
  );
};

export default Sessions;
