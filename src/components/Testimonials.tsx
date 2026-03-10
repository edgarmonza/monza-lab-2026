import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    name: "Equipo Helpy",
    designation: "Founder @ Helpy",
    src: "/testimonials/helpy.jpg",
    quote:
      "Cómo vender: pitch, oferta y posicionamiento\nPensar rápido y decidir según contexto\nAcompañamiento en decisiones clave del negocio",
  },
  {
    name: "Eduardo",
    designation: "Founder @ Lappiz",
    src: "/testimonials/lappiz.jpg",
    quote:
      "Perspectiva objetiva para decidir mejor\nLa persona en el centro, sin perder el norte\nConversaciones genuinas que destraban ventas",
  },
  {
    name: "Alexandra",
    designation: "Founder @ PhageLife",
    src: "/testimonials/phagelife.jpg",
    quote:
      "Claridad para decidir sin ruido\nConvertir convicción en ejecución real\nFoco comercial con propósito",
  },
];

export default function Testimonials() {
  return (
    <section 
      id="testimonials" 
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        // Override CSS variables for dark background context
        '--foreground': '40 30% 95%',
        '--muted-foreground': '35 15% 78%',
        '--accent': '330 70% 84%',
        '--border': '330 40% 50%',
      } as React.CSSProperties}
    >
      {/* Gradient background with subtle pink glows */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_30%,rgba(248,180,217,0.12),transparent_55%),radial-gradient(900px_circle_at_80%_70%,rgba(248,180,217,0.10),transparent_60%),linear-gradient(180deg,#0b0a0a_0%,#120c10_45%,#0b0a0a_100%)]" />
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)] bg-black/20" />
      
      {/* Grain/noise texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ 
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')" 
        }} 
      />
      
      {/* Content */}
      <div className="relative">
        <AnimatedTestimonials testimonials={testimonials} autoplay={false} />
      </div>
    </section>
  );
}
