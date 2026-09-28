/* Monza Sessions (v2, 28-sep-2026): la página rosa de la línea educativa, con la gramática de las
 * propuestas de Sessions. Sale del prototipo docs/internal/portada/prototipo/sessions.html.
 * Sin precios: la inversión se confirma por WhatsApp. Mobile first. El texto vive en
 * components/sessions/datos.ts, en los cuatro idiomas. */
import { useRef } from "react";
import SEO from "@/components/SEO";
import FooterMinimal from "@/components/FooterMinimal";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/types";
import { useRevela } from "@/components/v2/useRevela";
import "@/styles/v2.css";
import "@/components/sessions/sessions.css";
import HeroSessions from "@/components/sessions/Hero";
import { ComoFunciona, Formatos, HoyDespues, ParaQuien, PorQue } from "@/components/sessions/Secciones";
import Programa from "@/components/sessions/Programa";
import UnoAUno from "@/components/sessions/UnoAUno";
import QuienEnsena from "@/components/sessions/QuienEnsena";
import { CierreSessions, Preguntas } from "@/components/sessions/Final";
import { FORMATOS, PREGUNTAS, SEO_SESSIONS } from "@/components/sessions/datos";

const MODOS = ["onsite", "online", "online", "onsite"];

const MonzaSessions = () => {
  const { language } = useLanguage();
  const L = language as Lang;
  const raiz = useRef<HTMLElement>(null);
  useRevela(raiz, [L]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PREGUNTAS.items.map((p) => ({
      "@type": "Question",
      name: p.q[L],
      acceptedAnswer: { "@type": "Answer", text: p.a[L] },
    })),
  };

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Monza Sessions",
    description: SEO_SESSIONS.descripcion[L],
    inLanguage: L,
    provider: { "@type": "Organization", name: "Monza Lab", url: "https://www.monzalab.com" },
    instructor: { "@type": "Person", name: "Edgar Navarro" },
    hasCourseInstance: FORMATOS.items.map((f, i) => ({
      "@type": "CourseInstance",
      name: `Monza Sessions · ${f.titulo[L]}`,
      courseMode: MODOS[i],
      description: f.texto[L],
    })),
  };

  return (
    <>
      <SEO title={SEO_SESSIONS.titulo} description={SEO_SESSIONS.descripcion} path="/sessions" jsonLd={[faqJsonLd, courseJsonLd]} />
      <main id="main" className="v2" ref={raiz}>
        <HeroSessions L={L} />
        <div className="wrap">
          <ParaQuien L={L} />
          <HoyDespues L={L} />
          <Formatos L={L} />
          <ComoFunciona L={L} />
          <Programa L={L} />
          <UnoAUno L={L} />
          <PorQue L={L} />
        </div>
        <QuienEnsena L={L} />
        <div className="wrap">
          <Preguntas L={L} />
        </div>
        <CierreSessions L={L} />
      </main>
      <FooterMinimal />
    </>
  );
};

export default MonzaSessions;
