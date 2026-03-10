import Navbar from "@/components/Navbar";
import FooterMinimal from "@/components/FooterMinimal";
import { Button } from "@/components/ui/button";
import { 
  Monitor, 
  Code2, 
  Workflow,
  ArrowRight,
  Check,
  X,
  Globe,
  Server,
  Link2,
  Bot
} from "lucide-react";
import helmetHero from "@/assets/FotoMonzaHeroWeb.png";

const StudioPro = () => {
  const niveles = [
    {
      icon: Monitor,
      tag: "Nivel 01",
      title: "The Interface",
      subtitle: "El Punto de Entrada",
      text: "No negociable. Diseñamos webs y experiencias de usuario con estándar global. Si la primera impresión no es perfecta, la tecnología detrás no importa. Aquí comienza la transformación."
    },
    {
      icon: Code2,
      tag: "Nivel 02",
      title: "Custom Engineering",
      subtitle: "El Músculo",
      text: "Cuando el SaaS se queda corto, nosotros construimos. Desarrollamos software propietario, plataformas operativas y herramientas complejas hechas 100% a la medida de tus reglas de negocio."
    },
    {
      icon: Workflow,
      tag: "Nivel 03",
      title: "Connected Ecosystem",
      subtitle: "La Inteligencia",
      text: "Integramos todo. CRM, automatizaciones, Agentes IA en WhatsApp y flujos de datos. Tu web habla con tu operación y tu operación responde automáticamente."
    }
  ];

  const capacidades = [
    { icon: Globe, label: "High-Performance Websites" },
    { icon: Server, label: "Plataformas Operativas a Medida" },
    { icon: Link2, label: "Integraciones de Sistemas Complejos" },
    { icon: Bot, label: "Customer Experience Automation" }
  ];

  const funcionaSi = [
    "Quieres que tu marca juegue en ligas globales.",
    "Entiendes que la web es tu mejor vendedor.",
    "Necesitas software a medida, no otro SaaS genérico."
  ];

  const noEs = [
    "Buscas soluciones \"baratas\" o parches rápidos.",
    "No te importa la estética.",
    "Crees que el Excel es suficiente CRM."
  ];

  return (
    <div className="relative min-h-screen">
      {/* LIGHTING STACK */}
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
      
      {/* HERO */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pb-20 md:pb-28 pt-32 md:pt-40" style={{ backgroundColor: 'transparent' }}>
        <div className="absolute inset-0 z-[0]" style={{ background: 'linear-gradient(180deg, rgba(11, 11, 16, 0) 0%, rgba(11, 11, 16, 0) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 z-[5] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgb(11, 11, 16) 100%)' }} />
        <div className="absolute inset-0 z-[0]" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(248, 180, 217, 0.08) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 z-[0]" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(120, 100, 140, 0.04) 0%, transparent 50%)' }} />
        
        <div 
          className="absolute inset-0 z-[1] lg:bg-[length:90%_auto] bg-cover studiopro-hero-helmet-bg"
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
            .studiopro-hero-helmet-bg {
              background-position: right 52% !important;
            }
          }
        `}</style>
        
        <div className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(90deg, rgba(10,9,12,0.78) 0%, rgba(10,9,12,0.70) 35%, rgba(10,9,12,0.25) 70%, rgba(10,9,12,0.00) 100%)' }} />
        <div className="absolute inset-0 z-[3]" style={{ background: 'radial-gradient(70% 70% at 50% 40%, transparent 0%, rgba(11,11,16,0.20) 70%, rgba(11,11,16,0.30) 100%)' }} />
        <div className="absolute inset-0 z-[4] lg:hidden" style={{ background: 'linear-gradient(90deg, rgba(10,9,12,0.35) 0%, rgba(10,9,12,0.15) 60%, rgba(10,9,12,0.00) 100%)' }} />

        <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12 flex flex-col items-center lg:items-start justify-center">
          <div className="w-full max-w-[680px] text-center lg:text-left">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-white/35 font-normal mb-8 md:mb-10">
              End-to-End Engineering
            </p>

            <h1 className="font-display font-medium text-[2rem] md:text-[2.6rem] lg:text-[3.2rem] xl:text-[3.6rem] leading-[1.08] tracking-[-0.01em] mb-8 md:mb-10 text-[#FFFCF7]">
              Monza Studio Pro:<br />
              <span className="text-[#F8B4D9]">Business Architecture</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white/50 max-w-[560px] mb-12 md:mb-14 leading-[1.7] tracking-wide mx-auto lg:mx-0">
              Empezamos por lo que tu cliente ve. Terminamos construyendo lo que tu negocio necesita. Desde interfaces Global Standard hasta plataformas de software a medida.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
              <a
                href="https://calendar.notion.so/meet/monzaedgar/monzastudiopro"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase bg-[#F8B4D9] text-[#0b0b10] hover:bg-[#f4cbde] border-0 shadow-[0_6px_24px_-6px_rgba(248,180,217,0.3)] hover:shadow-[0_8px_32px_-6px_rgba(248,180,217,0.4)] transition-all duration-300"
              >
                Aplicar a Studio Pro
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE DE VALOR - Outside-In */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="max-w-[720px]">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#F8B4D9]/70 mb-4">
              Nuestra Tesis
            </p>
            <h2 className="font-display font-medium text-2xl md:text-3xl text-[#FFFCF7] mb-8">
              La Estrategia <span className="text-[#F8B4D9]">"Outside-In"</span>
            </h2>
            
            <p className="text-sm md:text-base text-[#FFFCF7]/55 leading-relaxed max-w-[600px]">
              No tocamos el código hasta que la experiencia no sea impecable. Entramos perfeccionando tu cara visible (Website & CX) para luego construir la ingeniería profunda que sostiene tu operación.
            </p>
          </div>
        </div>
      </section>

      {/* Hairline separator */}
      <div className="max-w-[1120px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(248, 180, 217, 0.2) 50%, transparent 100%)" }} />
      </div>

      {/* 3 PILARES */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-8 lg:px-10">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#F8B4D9]/70 mb-4">
            Niveles de Ejecución
          </p>
          <h2 className="font-display font-medium text-2xl md:text-3xl text-[#FFFCF7] mb-12">
            3 niveles. Una arquitectura.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {niveles.map((nivel) => {
              const IconComponent = nivel.icon;
              return (
                <div 
                  key={nivel.title}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-[2px]"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(8px)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(248, 180, 217, 0.15)";
                    e.currentTarget.style.boxShadow = "0 8px 32px -8px rgba(248, 180, 217, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent 
                      size={20} 
                      strokeWidth={1.5} 
                      className="text-[#F8B4D9]/70 group-hover:text-[#F8B4D9] transition-colors duration-200" 
                    />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#F8B4D9]/50 font-mono">
                      {nivel.tag}
                    </span>
                  </div>
                  
                  <h3 className="font-display font-medium text-lg text-[#FFFCF7] mb-1 leading-tight">
                    {nivel.title}
                  </h3>
                  <p className="text-xs text-[#F8B4D9]/40 mb-4 italic">{nivel.subtitle}</p>
                  
                  <p className="text-sm text-[#FFFCF7]/50 leading-relaxed">
                    {nivel.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CAPACIDADES */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-8 lg:px-10">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#F8B4D9]/70 mb-8">
            Lo que construimos
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {capacidades.map((cap) => {
              const Icon = cap.icon;
              return (
                <div 
                  key={cap.label}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl text-center"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)"
                  }}
                >
                  <Icon size={18} strokeWidth={1.5} className="text-[#F8B4D9]/60" />
                  <span className="text-xs text-[#FFFCF7]/50 leading-snug">{cap.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hairline separator */}
      <div className="max-w-[1120px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(248, 180, 217, 0.2) 50%, transparent 100%)" }} />
      </div>

      {/* FIT */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-8 lg:px-10">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#F8B4D9]/70 mb-4">
            Fit
          </p>
          <h2 className="font-display font-medium text-2xl md:text-3xl text-[#FFFCF7] mb-10">
            ¿Es para ti?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-[800px]">
            <div 
              className="p-6 rounded-xl"
              style={{
                background: "rgba(248, 180, 217, 0.03)",
                border: "1px solid rgba(248, 180, 217, 0.1)"
              }}
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#F8B4D9]/70 mb-5">
                Funciona si…
              </h3>
              <ul className="space-y-3">
                {funcionaSi.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={14} strokeWidth={2} className="text-[#F8B4D9]/70 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#FFFCF7]/60">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div 
              className="p-6 rounded-xl"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)"
              }}
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#FFFCF7]/40 mb-5">
                No es para ti si…
              </h3>
              <ul className="space-y-3">
                {noEs.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X size={14} strokeWidth={2} className="text-[#FFFCF7]/30 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#FFFCF7]/40">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hairline separator */}
      <div className="max-w-[1120px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(248, 180, 217, 0.2) 50%, transparent 100%)" }} />
      </div>

      {/* CTA FINAL */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="max-w-[560px] mx-auto text-center">
            <h2 className="font-display font-medium text-2xl md:text-3xl text-[#FFFCF7] mb-4">
              Aplicar a <span className="text-[#F8B4D9]">Studio Pro</span>
            </h2>
            <p className="text-sm text-[#FFFCF7]/50 mb-8 leading-relaxed">
              Cuéntame sobre tu marca, tu cliente ideal y qué significa "experiencia global" para ti.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="bg-[#f8b4d9] text-[#0b0b10] hover:bg-[#f4cbde] hover:shadow-[0_8px_24px_-4px_rgba(248,180,217,0.25)] hover:-translate-y-[1px] uppercase tracking-[0.12em] text-xs font-semibold h-11 px-8 rounded-full transition-all duration-200"
              >
                <a
                  href="https://calendar.notion.so/meet/monzaedgar/monzastudiopro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aplicar
                </a>
              </Button>
              
              <a
                href="https://calendar.notion.so/meet/monzaedgar/flow0"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-sm text-[#FFFCF7]/50 hover:text-[#FFFCF7]/70 transition-colors duration-200 flex items-center gap-1.5"
              >
                Prefiero hablar 15 min
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterMinimal />
      </div>
    </div>
  );
};

export default StudioPro;
