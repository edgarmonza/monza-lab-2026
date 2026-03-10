const Deliverables = () => {
  const items = [
    {
      title: "No negociables + contexto",
      description: "Tu plan real: tiempo, energía, límites y cadencia semanal sostenible."
    },
    {
      title: "Dirección clara + historia",
      description: "Posicionamiento en 1 frase + story de 30s (quién, por qué tú, por qué ahora)."
    },
    {
      title: "Validaciones reales",
      description: "Guión + 10–15 conversaciones + señales de compra para decidir sin adivinar."
    },
    {
      title: "Oferta vendible v1",
      description: "Qué es / qué no es + alcance + condiciones mínimas para cobrar ya."
    },
    {
      title: "Oferta Signature",
      description: "Entregables, proceso, límites, naming y promesa con sello premium."
    },
    {
      title: "Pricing defendible",
      description: "Estructura en capas + lógica por valor + reglas para subir precio."
    },
    {
      title: "Activos que convierten",
      description: "Mensajes (DM/email) + objeciones + CTA + propuesta lista."
    },
    {
      title: "Sistema + roadmap",
      description: "Pipeline, seguimiento y roadmap: 1 oferta principal + 2 futuras."
    },
  ];

  return (
    <section 
      id="con-que-sales"
      className="py-24 md:py-36 px-4 md:px-8 lg:px-12 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #fffcf7 0%, #faf8f5 60%, #f5f3ef 100%)',
      }}
    >
      {/* Subtle warm vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(244, 203, 222, 0.03) 100%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Headline */}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-5 text-center leading-tight" style={{ color: '#141218' }}>
          Sales con una oferta vendible.{' '}
          <span style={{ color: '#141218' }}>Y si ya vendes, la vuelves</span>{' '}
          <span style={{ color: 'hsl(var(--primary))' }}>premium</span>.
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl mb-4 text-center max-w-2xl mx-auto leading-relaxed" style={{ color: '#4a4652' }}>
          En pocas semanas sales con: oferta, pricing, mensajes, página y sistema comercial listo para ejecutar.
        </p>

        {/* Anchor line */}
        <p className="text-sm mb-14 md:mb-16 text-center tracking-wide" style={{ color: '#8a8692' }}>
          Entregables concretos. Ritmo semanal. Cero teoría suelta.
        </p>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-14 md:mb-16">
          {items.map((item, index) => (
            <div
              key={index}
              className="group p-6 md:p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#fffcf9',
                border: '1px solid rgba(20, 18, 24, 0.08)',
                boxShadow: '0 2px 12px rgba(20, 18, 24, 0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(248, 180, 217, 0.45)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(248, 180, 217, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(20, 18, 24, 0.08)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(20, 18, 24, 0.04)';
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{
                    background: 'rgba(248, 180, 217, 0.12)',
                    border: '1px solid rgba(248, 180, 217, 0.35)',
                  }}
                >
                  <span className="font-semibold text-sm" style={{ color: '#141218' }}>{index + 1}</span>
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="font-semibold text-base mb-1.5" style={{ color: '#141218', lineHeight: '1.35' }}>
                    {item.title}
                  </p>
                  <p className="text-sm" style={{ color: '#6a6672', lineHeight: '1.55' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://calendar.notion.so/meet/monzaedgar/flow0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: '#141218',
              border: '1px solid rgba(248, 180, 217, 0.3)',
              color: '#fffcf7',
              boxShadow: '0 4px 20px -4px rgba(20, 18, 24, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1a181e';
              e.currentTarget.style.borderColor = 'rgba(248, 180, 217, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#141218';
              e.currentTarget.style.borderColor = 'rgba(248, 180, 217, 0.3)';
            }}
          >
            Agendar Monza Session
          </a>
          <p className="mt-4 text-sm" style={{ color: '#8a8692' }}>
            Si no eres fit, te lo digo de frente en la llamada.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Deliverables;