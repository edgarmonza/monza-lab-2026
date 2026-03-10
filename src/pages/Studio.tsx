import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EdgarPink from "@/assets/edgar-pink.png";
import { Gem, Layers, Monitor, Cpu } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import helmetHero from "@/assets/FotoMonzaHeroWeb.png";

const Studio = () => {
  const { language } = useLanguage();

  const content = {
    es: {
      hero: {
        tag: 'Studio 1:1 | 12 Semanas',
        title1: 'Lanza tu proyecto propio',
        title2: 'en 12 semanas.',
        subtitle: 'Acompañamiento 1:1 para ejecutivos. Pasamos de idea a Oferta Vendible con estructura, branding y sistema comercial.',
        cta: 'Agendar Sesión Exploratoria',
      },
      experience: {
        label: 'Trayectoria Corporativa & Startup',
      },
      context: 'Tienes una carrera exitosa, pero vives el plan de alguien más. Tienes la capacidad, pero te falta el',
      contextHighlight: 'sistema',
      contextEnd: 'para ejecutar tu visión sin poner en riesgo tu estabilidad.',
      assetStack: {
        tag: 'The Asset Stack',
        title1: 'Todo lo que necesitas.',
        title2: 'En una sola ejecución.',
        subtitle: 'Normalmente contratarías una Agencia de Branding, un Dev Shop, un Consultor y un Experto en Sistemas. Aquí construimos todo bajo una visión unificada.',
        items: [
          { title: "Investment-Grade Branding", text: "Identidad Visual y Verbal de alto calibre. Logotipo, tipografías y narrativa diseñados para competir en ligas globales, no locales." },
          { title: "Signature Offer Architecture", text: "Ingeniería de tu oferta High-Ticket. Estructura de precios, promesas y entregables para vender por valor, no por horas." },
          { title: "High-Performance Web", text: "Landing Page con desarrollo real. Copywriting persuasivo y diseño móvil perfecto. Tu vendedor 24/7." },
          { title: "Commercial OS & AI", text: "Sistema de operación instalado. CRM en Notion y mi Stack Personal de IA para crear contenido y propuestas a velocidad x10." },
        ],
      },
      system: {
        tag: 'El Sistema de 12 Semanas',
        phases: [
          { 
            weeks: "WEEKS 1-4", 
            phase: "PHASE 1 // AUTHORITY & OFFER", 
            title: "Materializar tu Expertise.", 
            subtitle: "Convertimos tu carrera en una oferta de mercado.",
            bullets: ["Diseño de Oferta Signature.", "Perfil de Autoridad (LinkedIn).", "Landing Page V1 (Validación)."],
            glowColor: "rgba(74, 222, 128, 0.15)"
          },
          { 
            weeks: "WEEKS 5-8", 
            phase: "PHASE 2 // HYBRID MONETIZATION", 
            title: "Arquitectura de Ingresos.", 
            subtitle: "Dejas de vender tiempo. Empiezas a vender activos.",
            bullets: ["Modelo de Precios High-Ticket.", "Mix de Servicios (Retainers + One-off).", "Pitch de Ventas Estructurado."],
            glowColor: "rgba(250, 204, 21, 0.15)"
          },
          { 
            weeks: "WEEKS 9-12", 
            phase: "PHASE 3 // GLOBAL AESTHETICS", 
            title: "De Experto a Firma.", 
            subtitle: "El empaque que justifica tu precio. Operación real.",
            bullets: ["Investment-Grade Branding.", "Commercial OS (Instalación en Notion).", "Roadmap de Escala 2026."],
            glowColor: "rgba(248, 113, 113, 0.15)"
          },
        ],
        cta: 'Aplicar al Sistema',
      },
      founder: {
        tag: 'Edgar Navarro | Founder',
        copy: 'Ex-KPMG. Ex-CocaCola. He construido negocios con riesgo real. No te enseño teoría de libro; te instalo el',
        highlight: 'sistema operativo',
        copyEnd: 'con el que yo opero.',
        linkedin: 'Ver más en LinkedIn →',
      },
      finalCta: {
        title: 'Ready to Build?',
        cta: 'Aplicar a Studio 1:1',
        note: 'Solo 4 cupos por trimestre.',
      },
    },
    en: {
      hero: {
        tag: 'Studio 1:1 | 12 Weeks',
        title1: 'Deploy Your Venture',
        title2: 'in 12 Weeks.',
        subtitle: '1:1 executive partnership. From idea to Sellable Offer with structure, branding & commercial system.',
        cta: 'Book Discovery Session',
      },
      experience: {
        label: 'Corporate & Startup Track Record',
      },
      context: 'You have a successful career, but you\'re living someone else\'s plan. You have the capacity, but you lack the',
      contextHighlight: 'system',
      contextEnd: 'to execute your vision without risking your stability.',
      assetStack: {
        tag: 'The Asset Stack',
        title1: 'Everything you need.',
        title2: 'In a single execution.',
        subtitle: 'Normally you\'d hire a Branding Agency, a Dev Shop, a Consultant, and a Systems Expert. Here we build everything under one unified vision.',
        items: [
          { title: "Investment-Grade Branding", text: "High-caliber Visual & Verbal Identity. Logo, typography & narrative designed to compete globally, not locally." },
          { title: "Signature Offer Architecture", text: "Engineering your High-Ticket offer. Pricing structure, promises & deliverables to sell on value, not hours." },
          { title: "High-Performance Web", text: "Landing Page with real development. Persuasive copywriting & flawless mobile design. Your 24/7 salesperson." },
          { title: "Commercial OS & AI", text: "Operating system installed. CRM in Notion & my Personal AI Stack to create content & proposals at 10x velocity." },
        ],
      },
      system: {
        tag: 'The 12-Week System',
        phases: [
          { 
            weeks: "WEEKS 1-4", 
            phase: "PHASE 1 // AUTHORITY & OFFER", 
            title: "Materialize Your Expertise.", 
            subtitle: "We turn your career into a market offer.",
            bullets: ["Signature Offer Design.", "Authority Profile (LinkedIn).", "Landing Page V1 (Validation)."],
            glowColor: "rgba(74, 222, 128, 0.15)"
          },
          { 
            weeks: "WEEKS 5-8", 
            phase: "PHASE 2 // HYBRID MONETIZATION", 
            title: "Revenue Architecture.", 
            subtitle: "Stop selling time. Start selling assets.",
            bullets: ["High-Ticket Pricing Model.", "Service Mix (Retainers + One-off).", "Structured Sales Pitch."],
            glowColor: "rgba(250, 204, 21, 0.15)"
          },
          { 
            weeks: "WEEKS 9-12", 
            phase: "PHASE 3 // GLOBAL AESTHETICS", 
            title: "From Expert to Firm.", 
            subtitle: "The packaging that justifies your price. Real operations.",
            bullets: ["Investment-Grade Branding.", "Commercial OS (Notion Install).", "2026 Scale Roadmap."],
            glowColor: "rgba(248, 113, 113, 0.15)"
          },
        ],
        cta: 'Apply to the System',
      },
      founder: {
        tag: 'Edgar Navarro | Founder',
        copy: 'Ex-KPMG. Ex-CocaCola. I\'ve built ventures with real risk. I don\'t teach book theory; I install the',
        highlight: 'operating system',
        copyEnd: 'I operate with.',
        linkedin: 'View on LinkedIn →',
      },
      finalCta: {
        title: 'Ready to Build?',
        cta: 'Apply to Studio 1:1',
        note: 'Only 4 spots per quarter.',
      },
    },
  };

  const t = content[language];
  const icons = [Gem, Layers, Monitor, Cpu];

  return (
    <div className="relative min-h-screen">
      {/* LIGHTING STACK - Cinematic Spotlight */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'rgb(11, 11, 16)' }} />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(80% 50% at 50% 0%, rgba(248, 180, 217, 0.12) 0%, transparent 60%)' }} />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(60% 40%, rgba(248, 180, 217, 0.06) 0%, transparent 50%)' }} />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(70% 30% at 50% 100%, rgba(120, 120, 180, 0.04) 0%, transparent 50%)' }} />
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')",
          backgroundRepeat: 'repeat'
        }} 
      />
      
      {/* Content Layer */}
      <div className="relative z-10">
      <Navbar />
      
      {/* HERO SECTION */}
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
          className="absolute inset-0 z-[1] lg:bg-[length:90%_auto] bg-cover studio-hero-helmet-bg"
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
            .studio-hero-helmet-bg {
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
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-white/35 font-normal mb-8 md:mb-10">
              {t.hero.tag}
            </p>
            <h1 className="font-display font-medium text-[2rem] md:text-[2.6rem] lg:text-[3.2rem] xl:text-[3.6rem] leading-[1.08] tracking-[-0.01em] mb-8 md:mb-10 text-[#FFFCF7]">
              {t.hero.title1}<br />
              <span className="text-[#F8B4D9]">{t.hero.title2}</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/50 max-w-[560px] mb-12 md:mb-14 leading-[1.7] tracking-wide mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
              <a
                href="https://calendar.notion.so/meet/monzaedgar/studio1-1"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase bg-[#F8B4D9] text-[#0b0b10] hover:bg-[#f4cbde] border-0 shadow-[0_6px_24px_-6px_rgba(248,180,217,0.3)] hover:shadow-[0_8px_32px_-6px_rgba(248,180,217,0.4)] transition-all duration-300"
              >
                {t.hero.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE BANNER */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-transparent border-t border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/30 mb-8 md:mb-10">
            {t.experience.label}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
            <img src="/logos/experience/kpmg.png" alt="KPMG" className="h-6 md:h-8 w-auto opacity-50 brightness-0 invert" />
            <img src="/logos/experience/coca-cola.png" alt="Coca-Cola" className="h-6 md:h-8 w-auto opacity-50 brightness-0 invert" />
            <img src="/logos/experience/nielsen.png" alt="Nielsen" className="h-5 md:h-7 w-auto opacity-50 brightness-0 invert" />
            <img src="/logos/experience/carvajal.png" alt="Carvajal" className="h-5 md:h-7 w-auto opacity-50 brightness-0 invert" />
          </div>
        </div>
      </section>

      {/* THE CONTEXT */}
      <section className="py-20 md:py-24 px-4 md:px-8 bg-transparent">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-xl md:text-2xl lg:text-[1.65rem] text-white/80 leading-[1.7] font-light">
            {t.context}{" "}
            <span className="text-[#F8B4D9]">{t.contextHighlight}</span> {t.contextEnd}
          </p>
        </div>
      </section>

      {/* THE ASSET STACK */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-transparent">
        <div className="max-w-[1120px] mx-auto">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/30 text-center mb-6">
            {t.assetStack.tag}
          </p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white text-center mb-4 leading-tight">
            {t.assetStack.title1}<br />
            <span className="text-[#F8B4D9]">{t.assetStack.title2}</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg text-center max-w-[700px] mx-auto mb-12 md:mb-16 leading-relaxed">
            {t.assetStack.subtitle}
          </p>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {t.assetStack.items.map((asset, index) => {
              const IconComponent = icons[index];
              return (
                <div
                  key={index}
                  className="group rounded-xl p-6 md:p-8 bg-black border border-white/10 hover:border-[#F8B4D9]/30 transition-all duration-300"
                >
                  <IconComponent className="w-8 h-8 text-[#F8B4D9] mb-5 stroke-[1.5]" />
                  <h3 className="font-display text-lg md:text-xl text-white mb-3">{asset.title}</h3>
                  <p className="text-white/55 text-sm md:text-base leading-relaxed">{asset.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* THE 3-PHASE SYSTEM */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-transparent">
        <div className="max-w-[1120px] mx-auto">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/30 text-center mb-12 md:mb-16">
            {t.system.tag}
          </p>
          
          {/* 3 Vertical Phase Cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {t.system.phases.map((phase, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-6 md:p-8 bg-[#0a0a0f] border border-white/[0.08] hover:border-white/20 transition-all duration-500 flex flex-col"
                style={{
                  boxShadow: `0 0 60px -10px ${phase.glowColor}, inset 0 1px 0 0 rgba(255,255,255,0.04)`
                }}
              >
                {/* Phase Number Indicator */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-white/50">
                    {index + 1}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono">
                    {phase.weeks}
                  </span>
                </div>
                
                {/* Technical Phase Title */}
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono mb-4 leading-relaxed">
                  {phase.phase}
                </p>
                
                {/* Main Headline */}
                <h3 className="font-display text-xl md:text-2xl lg:text-[1.65rem] text-white mb-3 leading-[1.2]">
                  {phase.title}
                </h3>
                
                {/* Subtitle */}
                <p className="text-white/45 text-sm md:text-[15px] mb-6">
                  {phase.subtitle}
                </p>
                
                {/* Bullet List */}
                <ul className="space-y-3 flex-grow">
                  {phase.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm md:text-[15px] leading-[1.5]">
                      <span className="text-white/20 mt-[2px]">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Progress Arrow (visual connector on desktop) */}
                {index < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/20">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="mt-14 md:mt-16 text-center">
            <a
              href="https://calendar.notion.so/meet/monzaedgar/studio1-1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-10 md:px-12 py-4 md:py-5 text-xs font-semibold tracking-[0.2em] uppercase bg-[#0b0b10] text-white border border-white/20 hover:border-[#F8B4D9]/50 hover:shadow-[0_0_30px_-5px_rgba(248,180,217,0.3)] transition-all duration-300"
            >
              {t.system.cta}
            </a>
          </div>
        </div>
      </section>

      {/* THE FOUNDER */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-transparent border-t border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
            <div className="md:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-white/[0.08]" style={{ maxWidth: '400px' }}>
                <img
                  src={EdgarPink}
                  alt="Edgar Navarro"
                  className="w-full h-auto object-cover"
                  style={{ filter: 'grayscale(40%) contrast(1.1) brightness(0.9)' }}
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, transparent 30%, rgba(248, 180, 217, 0.1) 100%)' }} />
              </div>
            </div>
            <div className="md:col-span-7 space-y-6">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/40">{t.founder.tag}</p>
              <p className="text-xl md:text-2xl text-white/90 leading-[1.6] font-light">
                {t.founder.copy}{" "}
                <span className="text-[#F8B4D9]">{t.founder.highlight}</span> {t.founder.copyEnd}
              </p>
              <a
                href="https://www.linkedin.com/in/edgarnavarrosoto/"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-sm text-white/40 hover:text-[#F8B4D9] transition-colors"
              >
                {t.founder.linkedin}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-transparent">
        <div className="max-w-[720px] mx-auto text-center space-y-8">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            {t.finalCta.title}
          </h2>
          <a
            href="https://calendar.notion.so/meet/monzaedgar/studio1-1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full px-10 md:px-12 py-4 md:py-5 text-xs font-semibold tracking-[0.2em] uppercase bg-[#F8B4D9] text-[#0b0b10] hover:bg-[#f4cbde] shadow-[0_6px_24px_-6px_rgba(248,180,217,0.3)] hover:shadow-[0_8px_32px_-6px_rgba(248,180,217,0.4)] transition-all duration-300"
          >
            {t.finalCta.cta}
          </a>
          <p className="text-sm text-white/40">{t.finalCta.note}</p>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
};

export default Studio;
