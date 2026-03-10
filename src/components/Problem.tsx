const Problem = () => {
  const problems = [
    { num: "1", text: "Una carrera que va bien… pero con la sensación de que estás viviendo el plan de alguien más." },
    { num: "2", text: "Ideas de negocio que llevan años dando vueltas en tu cabeza." },
    { num: "3", text: "Miedo real a soltar tu estabilidad: familia, colegio, estilo de vida." },
    { num: "4", text: "Cansancio de cursos que inspiran pero no dejan nada ejecutado." },
  ];

  return (
    <section 
      className="relative py-24 md:py-32 px-4 md:px-8 lg:px-12"
      style={{
        background: `
          radial-gradient(ellipse 60% 40% at 50% 30%, rgba(248,180,217,0.05), transparent 60%),
          linear-gradient(180deg, hsl(var(--monza-dark-1)) 0%, hsl(var(--monza-dark-2)) 100%)
        `,
      }}
    >
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Main container - editorial card with subtle glow */}
        <div 
          className="rounded-2xl p-8 md:p-12 lg:p-14"
          style={{
            background: 'rgba(255, 252, 247, 0.03)',
            border: '1px solid rgba(244, 203, 222, 0.15)',
            boxShadow: '0 0 60px -20px rgba(248, 180, 217, 0.12)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground">
              Si te suena esto, <span className="text-primary/90">no estás solo</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 font-light">
              Y ojo: no es drama. Es una señal.
            </p>
          </div>

          {/* Numbered list with generous spacing */}
          <ol className="space-y-5 md:space-y-6 mb-10 md:mb-12 max-w-2xl mx-auto">
            {problems.map((problem) => (
              <li key={problem.num} className="flex items-start gap-4 md:gap-5">
                <span 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                  style={{
                    background: 'rgba(248, 180, 217, 0.1)',
                    border: '1px solid rgba(248, 180, 217, 0.25)',
                    color: 'hsl(var(--primary))',
                  }}
                >
                  {problem.num}
                </span>
                <span className="text-base md:text-lg leading-relaxed text-foreground/80 pt-1">
                  {problem.text}
                </span>
              </li>
            ))}
          </ol>

          {/* Tension line */}
          <p className="text-center text-lg md:text-xl font-semibold text-foreground mb-10 md:mb-12">
            "Si no hago algo mío en 12–18 meses… <span className="text-primary">¿cuándo?</span>"
          </p>

          {/* Mini-card premium */}
          <div 
            className="p-6 md:p-8 rounded-xl text-center max-w-xl mx-auto mb-10 md:mb-12"
            style={{
              background: 'rgba(248, 180, 217, 0.06)',
              border: '1px solid rgba(248, 180, 217, 0.2)',
            }}
          >
            <p className="text-lg md:text-xl text-foreground/90 mb-2">
              No te falta capacidad.
            </p>
            <p className="text-lg md:text-xl text-foreground font-medium">
              Te falta <span className="text-primary">claridad</span> + <span className="text-primary">foco</span> + un <span className="text-primary">sistema semanal</span>.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://calendar.notion.so/meet/monzaedgar/flow0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-medium rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(248, 180, 217, 0.12)',
                border: '1px solid rgba(248, 180, 217, 0.35)',
                color: 'hsl(var(--foreground))',
                boxShadow: '0 4px 20px -4px rgba(248, 180, 217, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(248, 180, 217, 0.18)';
                e.currentTarget.style.borderColor = 'rgba(248, 180, 217, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(248, 180, 217, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(248, 180, 217, 0.35)';
              }}
            >
              Agendar Monza Session
            </a>
            <p className="mt-4 text-sm text-foreground/50 max-w-xs mx-auto">
              Cupo limitado por semana. Si no eres fit, te lo digo de frente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
