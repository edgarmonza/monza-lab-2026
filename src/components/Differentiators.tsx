import helmetPink from "@/assets/helmet-pink.png";

const Differentiators = () => {
  const points = [
    {
      text: "Velocidad con método",
      highlights: ["(0→1)"],
      suffix: ": en semanas tienes claridad, activos listos y conversaciones reales.",
    },
    {
      text: "Estrategia ejecutable: cada semana cerramos",
      highlights: ["decisiones"],
      suffix: "y sales con un siguiente paso concreto (sin fricción).",
    },
    {
      text: "Innovación aplicada: foco en una",
      highlights: ["apuesta principal"],
      suffix: "+ portafolio en capas para construir futuro sin perder caja hoy.",
    },
    {
      text: "IA con criterio (no show): para",
      highlights: ["pensar mejor", "producir más rápido", "vender mejor"],
      suffix: "— con mensajes y entregables.",
    },
    {
      text: "Brand",
      highlights: ["premium"],
      suffix: "que convierte: narrativa, posicionamiento y página que se sienten lujo (experiencia real en high-end).",
    },
    {
      text: "Sistema comercial listo: propuesta, pipeline y seguimiento para",
      highlights: ["cerrar sin rogar"],
      suffix: "y sostener ritmo.",
    },
    {
      text: "Ecosistema y crecimiento:",
      highlights: ["roadmap por etapas"],
      suffix: "(ingresos → expansión → ecosistema) con gatillos claros para activar nuevas líneas.",
    },
    {
      text: "Acompañamiento",
      highlights: ["1:1 exigente"],
      suffix: ": ultra personalizado, directo y con estándar alto (ritmo, calidad y ejecución).",
    },
  ];

  const renderPoint = (point: typeof points[0]) => {
    if (point.highlights.length === 0) {
      return <span>{point.text}</span>;
    }

    let result = point.text + " ";
    const highlightedParts = point.highlights.map((h, i) => (
      <span key={i} style={{ color: '#f4cbde' }}>{h}</span>
    ));

    return (
      <>
        {point.text}{" "}
        {highlightedParts.map((h, i) => (
          <span key={i}>
            {h}
            {i < highlightedParts.length - 1 ? ", " : " "}
          </span>
        ))}
        {point.suffix}
      </>
    );
  };

  return (
    <section 
      className="py-20 md:py-32 px-4 md:px-8 lg:px-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0b0a0f 0%, #12101a 100%)',
      }}
    >
      {/* Subtle pink glow in center */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(248, 180, 217, 0.07) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 
          className="font-display text-3xl md:text-5xl mb-4 text-center"
          style={{ color: '#fffcf7' }}
        >
          ¿Qué hace distinto a Monza Lab?
        </h2>
        
        {/* Subtle underline */}
        <div 
          className="w-24 h-0.5 mx-auto mb-14"
          style={{ background: 'linear-gradient(90deg, transparent, #f4cbde, transparent)' }}
        />

        <div className="grid gap-5">
          {points.map((point, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl transition-all duration-300 group"
              style={{
                background: 'rgba(255, 252, 247, 0.05)',
                border: '1px solid rgba(255, 252, 247, 0.10)',
                boxShadow: '0 14px 50px rgba(0, 0, 0, 0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(248, 180, 217, 0.22)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 252, 247, 0.10)';
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5"
                  style={{
                    background: 'transparent',
                    border: '1.5px solid rgba(248, 180, 217, 0.55)',
                  }}
                >
                  <img 
                    src={helmetPink} 
                    alt="" 
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <p 
                  className="leading-relaxed flex-1 text-base md:text-lg"
                  style={{ color: '#fffcf7', lineHeight: '1.75' }}
                >
                  {renderPoint(point)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
