/* /plataformas (v2, 28-sep-2026): la puerta para empresas con operación, el equivalente de /shopify
 * para plataformas y agentes con IA. Absorbe /agentes, que redirige aquí: conserva su FAQPage, su
 * Service en JSON-LD, la demo en vivo del agente y los cuatro idiomas. Mobile first. */
import { useRef } from "react";
import "@/styles/v2.css";
import "@/components/caso/caso.css";
import "@/components/plataformas/plataformas.css";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/types";
import SEO from "@/components/SEO";
import FooterMinimal from "@/components/FooterMinimal";
import { useRevela } from "@/components/v2/useRevela";
import { Casos, Cierre, Construimos, Demo, Fases, Hero, Mapa, Preguntas } from "@/components/plataformas/Secciones";
import { CONSTRUIMOS, FAQ, HERO, SEO_PL } from "@/components/plataformas/datos";

const SITIO = "https://www.monzalab.com";
const url = (lang: Lang) => `${SITIO}${lang === "es" ? "" : `/${lang}`}/plataformas`;

const Plataformas = () => {
  const { language } = useLanguage();
  const lang = language as Lang;
  const raiz = useRef<HTMLDivElement>(null);
  useRevela(raiz, [lang]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: SEO_PL.servicio[lang],
      serviceType: CONSTRUIMOS.items.map((i) => i.nombre[lang]),
      description: SEO_PL.descripcion[lang],
      url: url(lang),
      provider: { "@type": "Organization", "@id": `${SITIO}/#organization`, name: "Monza Lab", url: SITIO },
      areaServed: ["Latin America", "Colombia", "Spain", "Portugal", "Germany", "United States"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.items.map((f) => ({ "@type": "Question", name: f.q[lang], acceptedAnswer: { "@type": "Answer", text: f.a[lang] } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Monza Lab", item: `${SITIO}${lang === "es" ? "/" : `/${lang}`}` },
        { "@type": "ListItem", position: 2, name: HERO.miga[lang], item: url(lang) },
      ],
    },
  ];

  return (
    <>
      <SEO title={SEO_PL.titulo} description={SEO_PL.descripcion} path="/plataformas" image="/v2/portafolio/comercio.jpg" jsonLd={jsonLd} />
      <div className="v2" ref={raiz}>
        <main id="main" className="caso plataformas">
          <Hero lang={lang} />
          <div className="wrap">
            <Construimos lang={lang} />
            <Fases lang={lang} />
            <Mapa lang={lang} />
            <Casos lang={lang} />
            <Demo lang={lang} />
            <Preguntas lang={lang} />
          </div>
          <Cierre lang={lang} />
        </main>
      </div>
      <FooterMinimal />
    </>
  );
};

export default Plataformas;
