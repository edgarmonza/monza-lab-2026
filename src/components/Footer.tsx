import { Instagram, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer 
      className="py-12 md:py-16 px-4 md:px-8 lg:px-12 relative"
      style={{
        background: 'linear-gradient(180deg, #0b0a0f 0%, #12101a 100%)',
        borderTop: '1px solid rgba(248, 180, 217, 0.35)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Fila superior - 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Columna 1 - Marca */}
          <div className="flex flex-col gap-4">
            <img 
              alt="Monza Lab" 
              className="footer-logo w-36 md:w-40 h-auto" 
              src="/lovable-uploads/logo-crema.png"
            />
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 252, 247, 0.85)' }}>
              Acompañamiento 1:1 para convertir tu experiencia en un servicio vendible, con oferta, pricing y sistema comercial.
            </p>
          </div>

          {/* Columna 2 - Navegación */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold" style={{ color: '#fffcf7' }}>Navegación</h3>
            <nav className="flex flex-col gap-2">
              <a 
                href="#phases" 
                className="text-sm transition-colors"
                style={{ color: 'rgba(255, 252, 247, 0.7)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fffcf7'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 252, 247, 0.7)'}
              >
                Programa
              </a>
              <a 
                href="#about" 
                className="text-sm transition-colors"
                style={{ color: 'rgba(255, 252, 247, 0.7)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fffcf7'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 252, 247, 0.7)'}
              >
                Sobre mí
              </a>
              <a 
                href="#faq" 
                className="text-sm transition-colors"
                style={{ color: 'rgba(255, 252, 247, 0.7)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fffcf7'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 252, 247, 0.7)'}
              >
                Preguntas frecuentes
              </a>
              <a 
                href="https://calendar.notion.so/meet/monzaedgar/flow0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors"
                style={{ color: 'rgba(255, 252, 247, 0.7)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fffcf7'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 252, 247, 0.7)'}
              >
                Quiero hablar contigo
              </a>
            </nav>
          </div>

          {/* Columna 3 - Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold" style={{ color: '#fffcf7' }}>Novedades de Monza Lab</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 252, 247, 0.7)' }}>
              Ideas aplicadas sobre oferta, pricing, IA y casos reales. Pocas, buenas y al punto.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Tu correo" 
                className="flex-1 rounded-full border-0"
                style={{ 
                  background: 'rgba(255, 252, 247, 0.1)',
                  color: '#fffcf7',
                }}
              />
              <button 
                type="submit" 
                className="rounded-full uppercase tracking-wide font-display font-semibold px-6 py-2 transition-all duration-200"
                style={{
                  background: 'transparent',
                  color: '#fffcf7',
                  border: '1px solid rgba(255, 252, 247, 0.30)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 252, 247, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(248, 180, 217, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 252, 247, 0.30)';
                }}
              >
                Unirme
              </button>
            </form>
            <p className="text-xs" style={{ color: 'rgba(255, 252, 247, 0.55)' }}>
              Te escribo solo cuando tenga algo que valga la pena.
            </p>
          </div>
        </div>

        {/* Fila inferior - Legal + Redes */}
        <div 
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255, 252, 247, 0.1)' }}
        >
          {/* Lado izquierdo - Legal */}
          <div className="text-center md:text-left">
            <p className="text-xs" style={{ color: 'rgba(255, 252, 247, 0.55)' }}>
              © {new Date().getFullYear()} Monza Lab. Todos los derechos reservados. ·{" "}
              <a href="#" className="transition-colors hover:opacity-100" style={{ color: 'rgba(255, 252, 247, 0.55)' }}>
                Política de privacidad
              </a>{" "}
              ·{" "}
              <a href="#" className="transition-colors hover:opacity-100" style={{ color: 'rgba(255, 252, 247, 0.55)' }}>
                Términos y condiciones
              </a>
            </p>
          </div>

          {/* Lado derecho - Redes sociales */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/monza.lab/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors"
              aria-label="Instagram"
              style={{ color: 'rgba(255, 252, 247, 0.7)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fffcf7'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 252, 247, 0.7)'}
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/company/monza-lab/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors"
              aria-label="LinkedIn"
              style={{ color: 'rgba(255, 252, 247, 0.7)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fffcf7'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 252, 247, 0.7)'}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;