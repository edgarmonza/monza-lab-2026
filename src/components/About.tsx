import EdgarPink from "@/assets/edgar-pink.png";
import { Check } from "lucide-react";

const bullets = [
  "Familia primero, pero con ambición: un plan que respete tu contexto.",
  "Negocio de verdad: oferta, pricing, pipeline y seguimiento.",
  "IA como copiloto: ahorro de tiempo + mejor calidad, aplicado a tu caso.",
  "Claridad brutal: qué sí, qué no, y cómo se cuenta en 30 segundos.",
  "Acompañamiento exigente y humano: te empujo con empatía.",
];

const About = () => {
  return (
    <section 
      id="sobre-mi" 
      className="relative py-28 md:py-36 px-4 md:px-8 lg:px-12"
    >
      <div className="relative z-10 max-w-[1120px] mx-auto">
        {/* Grid: 2 columnas en desktop */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
          
          {/* Columna texto - primero en mobile, derecha en desktop */}
          <div className="order-1 md:order-2 md:col-span-7 space-y-6">
            {/* Eyebrow */}
            <span className="inline-block text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary/80 font-medium">
              Sobre mí
            </span>

            {/* Título */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.15]">
              Te acompaño con estructura.<br className="hidden sm:block" /> Y con vida real.
            </h2>

            {/* Subtítulo */}
            <p className="text-muted-foreground/80 text-base md:text-lg leading-relaxed max-w-[48ch]">
              Trabajo con ejecutivos que quieren construir algo propio sin poner en riesgo su estabilidad.
            </p>

            {/* Bullets */}
            <ul className="space-y-3 pt-2">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <span className="text-foreground/90 text-sm md:text-base leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Cierre editorial */}
            <p className="text-foreground font-medium text-base md:text-lg pt-4 border-t border-white/[0.06]">
              No vienes a soñar. Vienes a salir con{" "}
              <span className="text-primary">siguiente paso claro</span>.
            </p>

            {/* CTA secundario - LinkedIn */}
            <a
              href="https://www.linkedin.com/in/edgarnavarrosoto/"
              target="_blank"
              rel="noreferrer"
              className="inline-block text-sm text-muted-foreground/60 hover:text-primary transition-colors"
            >
              Ver más en LinkedIn →
            </a>
          </div>

          {/* Columna foto - segundo en mobile, izquierda en desktop */}
          <div className="order-2 md:order-1 md:col-span-5">
            <figure className="relative">
              {/* Foto editorial */}
              <div 
                className="relative rounded-xl overflow-hidden border border-white/[0.08]"
                style={{ maxWidth: '400px' }}
              >
                <img
                  src={EdgarPink}
                  alt="Edgar Navarro"
                  className="w-full h-auto object-cover grayscale-[30%] contrast-[1.05]"
                  style={{
                    filter: 'grayscale(30%) contrast(1.05) sepia(8%)',
                  }}
                />
                {/* Subtle pink overlay on highlights */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-soft-light"
                  style={{
                    background: 'linear-gradient(135deg, transparent 40%, rgba(248, 180, 217, 0.15) 100%)',
                  }}
                />
              </div>
              <figcaption className="mt-3 text-[10px] text-muted-foreground/40 tracking-wide">
                Edgar Navarro · Founder, Monza Lab
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Qué traigo a la mesa - Editorial */}
        <div className="mt-24 md:mt-32 space-y-10 md:space-y-12">
          <h3 className="font-display text-2xl md:text-3xl text-foreground">Qué traigo a la mesa</h3>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {/* Bloque A - Credenciales */}
            <div className="rounded-xl p-6 md:p-8 border border-white/[0.08] hover:border-primary/20 transition-colors">
              <p className="text-foreground font-medium text-base md:text-lg leading-relaxed mb-2">
                15+ años en negocio, marketing e innovación (KPMG, Coca-Cola).
              </p>
              <p className="text-muted-foreground/60 text-sm">
                Estrategia, ventas, branding y transformación digital en multinacionales.
              </p>
            </div>

            {/* Bloque B - 0→1 real */}
            <div className="rounded-xl p-6 md:p-8 border border-white/[0.08] hover:border-primary/20 transition-colors">
              <p className="text-foreground font-medium text-base md:text-lg leading-relaxed mb-2">
                He construido proyectos propios con clientes reales y riesgo real.
              </p>
              <p className="text-muted-foreground/60 text-sm">
                Lo que no enseña ningún MBA: decisiones que se sienten en el bolsillo.
              </p>
            </div>

            {/* Bloque C - Método */}
            <div className="rounded-xl p-6 md:p-8 border border-white/[0.08] hover:border-primary/20 transition-colors md:col-span-2">
              <p className="text-foreground font-medium text-base md:text-lg leading-relaxed mb-2">
                Branding premium + números + IA aplicada para vender mejor.
              </p>
              <p className="text-muted-foreground/60 text-sm">
                No solo creatividad: sistema comercial listo para operar desde el día uno.
              </p>
            </div>
          </div>

          {/* Frase editorial final */}
          <p className="text-center text-foreground/90 text-base md:text-lg max-w-[52ch] mx-auto leading-relaxed">
            No buscamos más ideas. Buscamos un{" "}
            <span className="text-primary font-medium">proyecto real</span>{" "}
            con siguiente paso claro.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
