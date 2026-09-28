/* /speaker · v2 (28-sep-2026). La página para que Edgar se publicite como speaker: foto del auditorio,
 * «No habla de IA. La usa.», números, quién es, credenciales (KPMG · Forbes · EAFIT · conferencias),
 * dónde ha estado, las cuatro líneas de conferencia, la tira de fotos, lo que construye y el cierre a
 * WhatsApp. Los textos, en src/components/speaker/datos.ts. Mobile first. */
import { useRef } from "react";
import FooterMinimal from "@/components/FooterMinimal";
import SEO from "@/components/SEO";
import { useRevela } from "@/components/v2/useRevela";
import { enPrerender } from "@/lib/prerender";
import { Cierre, Construye, Escenarios, Frase, Hero, Lineas, Numeros, Quien, Tira } from "@/components/speaker/Secciones";
import { SEO_TEXTOS } from "@/components/speaker/datos";
import "@/styles/v2.css";
import "@/components/speaker/speaker.css";

const IMAGEN = "https://www.monzalab.com/images/Speaker/15474a8a-40f8-4533-b39d-20a91fb73992.jpg";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Edgar Navarro",
  jobTitle: "AI Keynote Speaker & Founder",
  worksFor: { "@type": "Organization", name: "Monza Lab", url: "https://www.monzalab.com" },
  url: "https://www.monzalab.com/speaker",
  image: IMAGEN,
  sameAs: ["https://www.linkedin.com/in/edgarnavarrosoto/", "https://www.instagram.com/monza.lab/"],
  knowsAbout: ["Artificial Intelligence", "AI Adoption Strategy", "Company Building", "Innovation", "Luxury Branding", "Go-to-Market Strategy"],
  hasOccupation: [
    { "@type": "Occupation", name: "Keynote Speaker", occupationalCategory: "Public Speaking" },
    { "@type": "Occupation", name: "AI Specialist", occupationalCategory: "Artificial Intelligence" },
    { "@type": "Occupation", name: "Company Builder", occupationalCategory: "Entrepreneurship" },
  ],
  knowsLanguage: ["es", "en"],
  performerIn: [
    {
      "@type": "Event",
      name: "Andigraf 2026 · La industria gráfica se reinventó con IA",
      startDate: "2026-05-25",
      location: { "@type": "Place", name: "Barranquilla, Colombia" },
      organizer: { "@type": "Organization", name: "Andigraf · Heidelberg" },
    },
    {
      "@type": "Event",
      name: "Programa de mentoría de startups · Universidad EAFIT",
      location: { "@type": "Place", name: "Medellín, Colombia" },
    },
  ],
};

const Speaker = () => {
  const raiz = useRef<HTMLDivElement>(null);
  useRevela(raiz);
  const quieto = enPrerender();

  return (
    <div className="v2 speaker" ref={raiz} data-quieto={quieto ? "" : undefined}>
      <SEO path="/speaker" image={IMAGEN} type="profile" title={SEO_TEXTOS.titulo} description={SEO_TEXTOS.descripcion} jsonLd={JSON_LD} />
      <main id="main">
        <Hero />
        <Numeros />
        <div className="wrap">
          <Quien />
          <Frase />
          <Escenarios />
          <Lineas />
        </div>
        <Tira />
        <div className="wrap" style={{ paddingTop: 0 }}>
          <Construye />
        </div>
        <Cierre />
      </main>
      <FooterMinimal />
    </div>
  );
};

export default Speaker;
