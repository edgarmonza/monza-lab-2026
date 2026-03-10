import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const EligeTuLinea = () => {
  const { language } = useLanguage();

  // Helper to get localized path
  const getLocalizedPath = (path: string) => {
    if (language === 'en') {
      return path === '/' ? '/en' : `/en${path}`;
    }
    return path;
  };

  const content = {
    es: {
      title: 'Elige tu sistema Monza.',
      subtitle: 'Un carril claro según tu contexto. Mismo estándar: criterio, velocidad y ejecución con IA-first.',
      servicios: [
        {
          titulo: "Monza Sessions",
          descripcion: "Taller intensivo de 4 horas. Entras con caos, sales con un activo construido y un plan de ataque validado. Sin teoría.",
          chips: ["Workshop 4h", "Presencial", "Desbloqueo"],
          cta: "Ver Sessions →",
          ctaLink: "/sessions",
        },
        {
          titulo: "Monza Studio 1:1",
          descripcion: "Tu negocio desde cero en 12 semanas. Diseñamos tu Oferta Signature, Branding y Sistema Operativo. Te entregamos la llave de tu empresa lista para vender.",
          chips: ["Founders 0→1", "Turnkey Solution", "12 Semanas"],
          cta: "Activar Studio 1:1 →",
          ctaLink: "/studio",
        },
        {
          titulo: "Monza Studio Pro",
          descripcion: "Arquitectura de Negocio completa. Estrategia \"Outside-In\": Desde una interfaz web Global Standard hasta software a la medida que automatiza tu operación.",
          chips: ["Business Architecture", "CX & Web", "Custom Software"],
          cta: "Explorar Studio Pro →",
          ctaLink: "/studio-pro",
        },
      ],
    },
    en: {
      title: 'Choose your Monza System.',
      subtitle: 'A clear lane for your context. Same standard: judgment, velocity, and AI-first execution.',
      servicios: [
        {
          titulo: "Monza Sessions",
          descripcion: "Intensive 4-hour workshop. Walk in with chaos, walk out with a built asset and a validated action plan. No theory.",
          chips: ["Workshop 4h", "In-Person", "Unblock"],
          cta: "View Sessions →",
          ctaLink: "/sessions",
        },
        {
          titulo: "Monza Studio 1:1",
          descripcion: "Your business from zero in 12 weeks. We design your Signature Offer, Branding & Operating System. We hand you the keys to a company ready to sell.",
          chips: ["Founders 0→1", "Turnkey Solution", "12 Weeks"],
          cta: "Activate Studio 1:1 →",
          ctaLink: "/studio",
        },
        {
          titulo: "Monza Studio Pro",
          descripcion: "Complete Business Architecture. \"Outside-In\" strategy: From a Global Standard web interface to custom software that automates your operation.",
          chips: ["Business Architecture", "CX & Web", "Custom Software"],
          cta: "Explore Studio Pro →",
          ctaLink: "/studio-pro",
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section 
      id="sistemas"
      className="py-20 md:py-28 relative overflow-hidden scroll-mt-20"
    >
      {/* Subtle glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(248, 180, 217, 0.03) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-[#fffcf7] mb-4">
            {t.title}
          </h2>
          <p className="text-base md:text-lg text-[#fffcf7]/60 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Grid 3 cols */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {t.servicios.map((servicio, index) => (
            <div
              key={index}
              className="group p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(15, 14, 22, 0.9)",
                border: "1px solid rgba(248, 180, 217, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 252, 247, 0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(248, 180, 217, 0.25)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(248, 180, 217, 0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(248, 180, 217, 0.1)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 252, 247, 0.03)";
              }}
            >
              {/* Título */}
              <h3 className="font-display text-xl md:text-2xl text-[#fffcf7] mb-3">
                {servicio.titulo}
              </h3>

              {/* Descripción */}
              <p className="text-[#fffcf7]/70 text-sm md:text-base leading-relaxed mb-5">
                {servicio.descripcion}
              </p>

              {/* Chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {servicio.chips.map((chip, chipIndex) => (
                  <span
                    key={chipIndex}
                    className="px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      background: "rgba(248, 180, 217, 0.08)",
                      border: "1px solid rgba(248, 180, 217, 0.2)",
                      color: "#f8b4d9",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                to={getLocalizedPath(servicio.ctaLink)}
                className="inline-flex items-center text-sm font-semibold transition-all duration-200 hover:opacity-80"
                style={{ color: "#f8b4d9" }}
              >
                {servicio.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EligeTuLinea;
