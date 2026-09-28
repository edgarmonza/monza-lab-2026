/* La portada v2 (28-sep-2026): el casco y la cara · algunos de nuestros proyectos · criterio ·
 * lo que hacemos · Edgar y speaker · hablemos. Sale del prototipo aprobado por Edgar
 * (docs/internal/portada/prototipo/index.html). El menú, el pie, el cursor y los botones
 * flotantes los pone el shell (App.tsx). */
import { useRef } from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/i18n/LanguageContext";
import SEO from "@/components/SEO";
import FooterMinimal from "@/components/FooterMinimal";
import { useRevela } from "@/components/v2/useRevela";
import HeroCasco from "@/components/portada/HeroCasco";
import Proyectos from "@/components/portada/Proyectos";
import Criterio from "@/components/portada/Criterio";
import LoQueHacemos from "@/components/portada/LoQueHacemos";
import Edgar from "@/components/portada/Edgar";
import Cierre from "@/components/portada/Cierre";
import { SEO_HOME } from "@/components/portada/textos";
import "@/styles/v2.css";
import "@/components/portada/portada.css";

const Index = () => {
  const { language } = useLanguage();
  const raiz = useRef<HTMLDivElement>(null);
  useRevela(raiz, [language]);

  return (
    <>
      <SEO path="" ogPage="home" title={SEO_HOME.titulo} description={SEO_HOME.descripcion} />
      {/* La foto del casco es fondo CSS: se pide antes para que el hero no espere al JavaScript. */}
      <Helmet>
        <link rel="preload" href="/v2/edgar/casco.webp" as="image" type="image/webp" {...{ fetchpriority: "high" }} />
      </Helmet>
      <div className="v2 portada" ref={raiz}>
        <main id="main" aria-label="Monza Lab">
          <HeroCasco />
          <div className="wrap" style={{ paddingBottom: 0 }}>
            <Proyectos />
          </div>
          <Criterio />
          <div className="wrap" style={{ paddingBottom: 24 }}>
            <LoQueHacemos />
          </div>
          <Edgar />
          <Cierre />
        </main>
      </div>
      <FooterMinimal />
    </>
  );
};

export default Index;
