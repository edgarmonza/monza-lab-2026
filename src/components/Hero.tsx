import helmetHero from "@/assets/edgar-helmet-hero.png";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pb-16 md:pb-24 pt-32 md:pt-40" style={{ backgroundColor: 'transparent' }}>
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
      
      {/* Layer 1: Helmet Image - Reduced scale, centered, breathable */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: `url(${helmetHero})`,
          backgroundSize: '75% auto',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          opacity: 0.65,
          filter: 'brightness(1.05) contrast(1.15) saturate(1.05)',
          mixBlendMode: 'normal',
        }}
      />
      
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
          background: 'radial-gradient(70% 70% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.20) 70%, rgba(0,0,0,0.30) 100%)',
        }}
      />

      {/* Mobile: Stronger text protection */}
      <div 
        className="absolute inset-0 z-[4] lg:hidden"
        style={{
          background: 'linear-gradient(90deg, rgba(10,9,12,0.35) 0%, rgba(10,9,12,0.15) 60%, rgba(10,9,12,0.00) 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12 flex flex-col items-center lg:items-start justify-center">
        <div className="w-full max-w-[680px] text-center lg:text-left">
          {/* Tag / Eyebrow */}
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-white/35 font-normal mb-8 md:mb-10">
            Studio 1:1 | 12 Semanas
          </p>

          {/* H1 - Matching HeroHome */}
          <h1 className="font-display font-medium text-[2rem] md:text-[2.6rem] lg:text-[3.2rem] xl:text-[3.6rem] leading-[1.08] tracking-[-0.01em] mb-8 md:mb-10 text-[#FFFCF7]">
            Lanza tu proyecto propio<br />
            <span className="text-[#F8B4D9]">en 12 semanas.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg lg:text-xl text-white/50 max-w-[560px] mb-12 md:mb-14 leading-[1.7] tracking-wide mx-auto lg:mx-0">
            Acompañamiento 1:1 para ejecutivos y profesionales que quieren pasar de idea → oferta vendible, con estructura seria y IA como copiloto.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
            <a
              href="https://calendar.notion.so/meet/monzaedgar/flow0"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase bg-[#F8B4D9] text-[#0b0b10] hover:bg-[#f4cbde] border-0 shadow-[0_6px_24px_-6px_rgba(248,180,217,0.3)] hover:shadow-[0_8px_32px_-6px_rgba(248,180,217,0.4)] transition-all duration-300"
            >
              Agendar Sesión Exploratoria
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
