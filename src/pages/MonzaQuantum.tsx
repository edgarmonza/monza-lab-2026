import React from 'react';
import { TrendingUp, ShieldCheck, Globe, Cpu, Sparkles } from 'lucide-react';
import edgarPhoto from '@/assets/edgar-quantum-board.png';
import guillermoPhoto from '@/assets/guillermo-quantum-board.png';
import { useLanguage } from '@/i18n/LanguageContext';

export default function MonzaQuantum() {
  const { language } = useLanguage();

  const content = {
    es: {
      hero: {
        tag: 'MONZA QUANTUM | BOARD & C-LEVEL',
        title1: 'BOARD STRATEGY.',
        title2: 'EXECUTION NATIVE.',
        subtitle: 'Instalamos el Sistema Operativo para la innovación corporativa. Fusionamos Gobierno Corporativo, Capital Estratégico (CVC) y Equipos AI-Native.',
        cta: 'OPENING SOON',
        edgar: { name: 'Edgar Navarro', role: 'Founder Monza Lab | Serial Entrepreneur' },
        guillermo: { name: 'Guillermo Jaramillo', role: 'Board Member | Ex-CEO KPMG' },
      },
      methodology: {
        tag: 'METHODOLOGY',
        title: 'The',
        titleAccent: 'Acceleration',
        titleEnd: 'Loop',
        cards: [
          { title: 'Next-Gen Revenue Engines', desc: 'Validación de nuevos modelos de negocio. Reemplazamos tu Core actual antes de que el mercado lo haga obsoleto.' },
          { title: 'AI Governance & Control', desc: 'Adopción de IA blindada. Marcos de seguridad que protegen tu IP y Data sin frenar la velocidad de ejecución.' },
          { title: 'Inorganic Growth & Venture', desc: 'Estrategias de CVC y M&A Tecnológico. Si no puedes construirlo lo suficientemente rápido, intégralo.' },
        ],
      },
      capabilities: {
        tag: 'CORPORATE SERVICES',
        title: 'Execution',
        titleAccent: 'Capabilities',
        items: [
          { title: 'AI-Native Teams', desc: 'Creación de células de innovación de alto rendimiento. Equipos entrenados para operar con velocidad startup y herramientas de IA.' },
          { title: 'Tech Ecosystems', desc: 'Desarrollo de ecosistemas digitales internos. Conectamos startups, partners y talento externo con tu operación.' },
        ],
      },
      intelligence: {
        title: 'MONZA',
        titleAccent: 'INTELLIGENCE',
        badge: 'Coming Soon',
        subtitle: 'El siguiente nivel de autoridad estratégica. Información exclusiva para líderes que toman decisiones.',
        items: [
          { title: 'Boardroom Bootcamp', desc: 'Entrenamiento inmersivo para CEOs sobre estrategia de IA y transformación digital.' },
          { title: 'The Decision Network', desc: 'Comunidad exclusiva de C-Levels para compartir benchmarks y conocimiento estratégico.' },
        ],
      },
    },
    en: {
      hero: {
        tag: 'MONZA QUANTUM | BOARD & C-LEVEL',
        title1: 'BOARD STRATEGY.',
        title2: 'EXECUTION NATIVE.',
        subtitle: 'We install the Operating System for corporate innovation. We merge Corporate Governance, Strategic Capital (CVC) & AI-Native Teams.',
        cta: 'OPENING SOON',
        edgar: { name: 'Edgar Navarro', role: 'Founder Monza Lab | Serial Entrepreneur' },
        guillermo: { name: 'Guillermo Jaramillo', role: 'Board Member | Former CEO KPMG' },
      },
      methodology: {
        tag: 'METHODOLOGY',
        title: 'The',
        titleAccent: 'Acceleration',
        titleEnd: 'Loop',
        cards: [
          { title: 'Next-Gen Revenue Engines', desc: 'Validating new business models. We replace your current Core before the market makes it obsolete.' },
          { title: 'AI Governance & Control', desc: 'Armored AI adoption. Security frameworks that protect your IP & Data without slowing execution velocity.' },
          { title: 'Inorganic Growth & Venture', desc: 'CVC & Tech M&A strategies. If you can\'t build it fast enough, integrate it.' },
        ],
      },
      capabilities: {
        tag: 'CORPORATE SERVICES',
        title: 'Execution',
        titleAccent: 'Capabilities',
        items: [
          { title: 'AI-Native Teams', desc: 'High-performance innovation cells. Teams trained to operate at startup velocity with AI tools.' },
          { title: 'Tech Ecosystems', desc: 'Internal digital ecosystem development. We connect startups, partners & external talent with your operation.' },
        ],
      },
      intelligence: {
        title: 'MONZA',
        titleAccent: 'INTELLIGENCE',
        badge: 'Coming Soon',
        subtitle: 'The next level of strategic authority. Exclusive intelligence for decision-makers.',
        items: [
          { title: 'Boardroom Bootcamp', desc: 'Immersive CEO training on AI strategy and digital transformation.' },
          { title: 'The Decision Network', desc: 'Exclusive C-Level community for sharing benchmarks and strategic knowledge.' },
        ],
      },
    },
  };

  const t = content[language];

  return (
    <div className="relative w-full min-h-screen bg-transparent">
      
      {/* CAPA 1: FONDO PREMIUM */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(38, 38, 38, 0.4) 0%, transparent 60%)' }}
      />

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-[100svh] flex flex-col justify-center items-center pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
        <div className="flex flex-col items-center justify-center px-6">
          
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/50 mb-4">{t.hero.tag}</p>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-white text-center mb-4 md:mb-5 tracking-[0.02em]">
            <span className="text-[#F8B4D9]">{t.hero.title1}</span>{' '}
            <span className="text-white">{t.hero.title2}</span>
          </h1>

          <p className="text-sm md:text-base text-white/60 text-center max-w-2xl mb-8 md:mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Grid de Fundadores */}
          <div className="relative grid grid-cols-2 gap-4 md:gap-12 max-w-4xl w-full mb-10">
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none z-0"
              style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 40%, rgba(255, 166, 246, 0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
            />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative w-32 h-40 md:w-56 md:h-64 lg:w-64 lg:h-72 mb-3 md:mb-4">
                <img 
                  src={edgarPhoto} 
                  alt={t.hero.edgar.name}
                  className="w-full h-full object-contain object-center"
                  style={{ maskImage: 'linear-gradient(to bottom, white 0%, white 60%, transparent 95%)', WebkitMaskImage: 'linear-gradient(to bottom, white 0%, white 60%, transparent 95%)', filter: 'drop-shadow(0 0 40px rgba(248, 180, 217, 0.12))' }}
                />
              </div>
              <h3 className="text-white font-semibold text-sm md:text-lg tracking-wide mb-0.5">{t.hero.edgar.name}</h3>
              <p className="text-white/40 text-[10px] md:text-xs tracking-wide">{t.hero.edgar.role}</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative w-32 h-40 md:w-56 md:h-64 lg:w-64 lg:h-72 mb-3 md:mb-4">
                <img 
                  src={guillermoPhoto} 
                  alt={t.hero.guillermo.name}
                  className="w-full h-full object-contain object-center"
                  style={{ maskImage: 'linear-gradient(to bottom, white 0%, white 60%, transparent 95%)', WebkitMaskImage: 'linear-gradient(to bottom, white 0%, white 60%, transparent 95%)', filter: 'drop-shadow(0 0 40px rgba(248, 180, 217, 0.12))' }}
                />
              </div>
              <h3 className="text-white font-semibold text-sm md:text-lg tracking-wide mb-0.5">{t.hero.guillermo.name}</h3>
              <p className="text-white/40 text-[10px] md:text-xs tracking-wide">{t.hero.guillermo.role}</p>
            </div>
          </div>

          <button 
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 border border-border text-muted-foreground text-xs md:text-sm uppercase tracking-[0.25em] rounded-sm opacity-50 cursor-not-allowed pointer-events-none select-none"
          >
            OPENING SOON
          </button>
        </div>
      </section>

      {/* THE QUANTUM LOOP */}
      <section className="relative z-10 py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-3">{t.methodology.tag}</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-[0.02em]">
              {t.methodology.title} <span className="text-[#F8B4D9]">{t.methodology.titleAccent}</span> {t.methodology.titleEnd}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {t.methodology.cards.map((card, index) => {
              const icons = [TrendingUp, ShieldCheck, Globe];
              const Icon = icons[index];
              return (
                <div key={index} className="group relative flex flex-col p-8 md:p-10 min-h-[180px] border border-white/10 rounded-sm bg-white/[0.02] hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="w-5 h-5 text-[#F8B4D9] flex-shrink-0" strokeWidth={1.5} />
                    <h3 className="text-white font-medium text-sm md:text-base tracking-wide">{card.title}</h3>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXECUTION CAPABILITIES */}
      <section className="relative z-10 py-20 md:py-28 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-3">{t.capabilities.tag}</p>
            <h2 className="text-xl md:text-2xl font-light text-white tracking-[0.02em]">
              {t.capabilities.title} <span className="text-[#F8B4D9]">{t.capabilities.titleAccent}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {t.capabilities.items.map((item, index) => {
              const icons = [Cpu, Globe];
              const Icon = icons[index];
              return (
                <div key={index} className="flex items-start gap-4 p-6 border border-white/10 rounded-sm bg-white/[0.02]">
                  <Icon className="w-6 h-6 text-[#F8B4D9] flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-white font-medium text-base mb-2">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MONZA INTELLIGENCE */}
      <section className="relative z-10 py-24 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-[0.02em]">
              {t.intelligence.title} <span className="text-[#F8B4D9]">{t.intelligence.titleAccent}</span>
            </h2>
            <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-[#F8B4D9]/10 text-[#F8B4D9] border border-[#F8B4D9]/20 rounded-sm">
              {t.intelligence.badge}
            </span>
          </div>

          <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto mb-12">{t.intelligence.subtitle}</p>

          <div className="flex flex-col md:flex-row justify-center gap-8 text-left">
            {t.intelligence.items.map((item, index) => (
              <div key={index} className="p-6 border border-white/10 rounded-sm bg-white/[0.02] md:w-80">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#F8B4D9]" strokeWidth={1.5} />
                  <h3 className="text-white font-medium text-sm">{item.title}</h3>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
