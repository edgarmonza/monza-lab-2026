import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const PRESS_ITEMS = [
  {
    src: "/press/topgear.png",
    alt: "Top Gear",
    name: "Top Gear",
    link: "https://www.topgear.com/car-reviews/bavarian-econs/2002te/first-drive",
    descriptor: "Reseña y primer manejo.",
  },
  {
    src: "/press/motortrend.png",
    alt: "MotorTrend",
    name: "MotorTrend",
    link: "https://www.motortrend.com/reviews/bmw-2002-bavarian-econs-2002te-ev-swap-first-drive-review",
    descriptor: "First drive en nicho automotriz.",
  },
  {
    src: "/press/forbes.png",
    alt: "Forbes Colombia",
    name: "Forbes Colombia",
    link: "https://forbes.co/2024/09/10/editors-picks/estos-colombianos-estan-electrificando-clasicos-de-bmw-para-coleccionistas-en-europa-y-estados-unidos",
    descriptor: "Perfil y validación de negocio.",
  },
  {
    src: "/press/theorg.png",
    alt: "The Org",
    name: "The Org",
    link: "https://theorg.com/iterate/bavarian-econs-how-two-colombians-are-reviving-germanys-iconic-auto-industry",
    descriptor: "Historia de fundador y contexto.",
  },
  {
    src: "/press/bmwblog.png",
    alt: "BMWBlog",
    name: "BMWBlog",
    link: "https://www.bmwblog.com/2022/04/17/bavarian-econs-2002te-specs/",
    descriptor: "Specs y cobertura técnica.",
  },
];

const Press = () => {
  return (
    <div className="min-h-screen" style={{ background: '#fffcf7' }}>
      <Helmet>
        <title>Prensa | Monza Lab</title>
        <meta name="description" content="Artículos y menciones sobre proyectos que he construido." />
      </Helmet>
      <Navbar />
      
      <main className="pt-28 md:pt-32 pb-24 md:pb-28 px-6 md:px-8">
        <div className="max-w-[1140px] mx-auto">
          {/* Editorial header */}
          <div className="text-center mb-14 md:mb-16">
            <h1 
              className="font-display text-3xl md:text-4xl font-semibold mb-4"
              style={{ color: '#0f0f12' }}
            >
              Prensa
            </h1>
            <p 
              className="max-w-lg mx-auto text-base"
              style={{ color: '#6b6b72' }}
            >
              Artículos y menciones sobre proyectos que he construido.
            </p>
          </div>

          {/* Cards grid - 2 columns desktop, 1 mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {PRESS_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative rounded-[26px] p-7 md:p-8 transition-all duration-200"
                style={{
                  background: '#f7f1ea',
                  border: '1px solid rgba(15, 15, 18, 0.08)',
                  boxShadow: '0 2px 12px rgba(15, 15, 18, 0.03)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(248, 180, 217, 0.45)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(15, 15, 18, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(15, 15, 18, 0.08)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(15, 15, 18, 0.03)';
                }}
              >
                {/* Subtle pink accent line at top */}
                <div 
                  className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
                  style={{ background: 'rgba(248, 180, 217, 0.35)' }}
                />

                {/* Logo - monochrome unified */}
                <div className="h-9 flex items-center mb-5">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-7 md:h-8 w-auto object-contain select-none"
                    style={{
                      filter: 'grayscale(1) contrast(1.1) brightness(0.35)',
                      opacity: 0.8,
                    }}
                  />
                </div>

                {/* Media name */}
                <p 
                  className="text-xs tracking-wide uppercase mb-2"
                  style={{ color: '#6b6b72' }}
                >
                  {item.name}
                </p>

                {/* Descriptor */}
                <p 
                  className="text-sm mb-5"
                  style={{ color: '#0f0f12' }}
                >
                  {item.descriptor}
                </p>

                {/* CTA link with animated underline */}
                <span 
                  className="inline-flex items-center gap-1 text-sm font-medium"
                  style={{ color: '#0f0f12' }}
                >
                  <span className="relative">
                    Abrir artículo
                    <span 
                      className="absolute left-0 -bottom-0.5 w-0 h-[1px] transition-all duration-300 group-hover:w-full"
                      style={{ background: 'rgba(248, 180, 217, 0.7)' }}
                    />
                  </span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
              </a>
            ))}
          </div>

          {/* Disclaimer */}
          <p 
            className="text-center text-[13px] mt-14 md:mt-16"
            style={{ color: '#8a8a91' }}
          >
            Los logos se usan como referencia. No implican afiliación ni endorsement.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Press;
