/* Un caso de la web v2 (/work/<slug>). Sale del molde del prototipo (docs/internal/portada/prototipo/
 * caso-*.html): hero con la web que se recorre sola · lo que producimos · qué hace Monza aquí · el
 * punto de partida · pieza por pieza · la tecnología · así se ve · lo que cambió · otros casos · cierre.
 * Los datos de cada caso viven en src/data/casos/<slug>.ts. Mobile first. */
import { useRef } from "react";
import { Helmet } from "react-helmet";
import "@/styles/v2.css";
import "@/components/caso/caso.css";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/types";
import type { Caso as CasoDatos } from "@/data/casos/tipos";
import SEO from "@/components/SEO";
import FooterMinimal from "@/components/FooterMinimal";
import { useRevela } from "@/components/v2/useRevela";
import Piezas from "@/components/caso/Piezas";
import Tecnologia from "@/components/caso/Tecnologia";
import { Cambio, Cierre, Galeria, Hace, Hero, Otros, Producimos, Reto } from "@/components/caso/Secciones";
import { TX } from "@/components/caso/textos";

const SITIO = "https://www.monzalab.com";
const absoluta = (src: string) => (/^https?:/.test(src) ? src : `${SITIO}${src}`);
const url = (lang: Lang, slug: string) => `${SITIO}${lang === "es" ? "" : `/${lang}`}/work/${slug}`;

const Caso = ({ caso }: { caso: CasoDatos }) => {
  const { language } = useLanguage();
  const lang = language as Lang;
  const raiz = useRef<HTMLDivElement>(null);
  useRevela(raiz, [caso.slug, lang]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `${caso.nombre[lang]} · Monza Lab`,
      headline: caso.seo.titulo[lang],
      description: caso.seo.descripcion[lang],
      url: url(lang, caso.slug),
      image: absoluta(caso.tarjeta.imagen),
      inLanguage: lang,
      creator: { "@type": "Organization", "@id": `${SITIO}/#organization`, name: "Monza Lab", url: SITIO },
      about: caso.producimos.items.map((i) => i.nombre[lang]).join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Monza Lab", item: `${SITIO}${lang === "es" ? "/" : `/${lang}`}` },
        { "@type": "ListItem", position: 2, name: TX.proyectos[lang], item: `${SITIO}${lang === "es" ? "" : `/${lang}`}/work` },
        { "@type": "ListItem", position: 3, name: caso.nombre[lang], item: url(lang, caso.slug) },
      ],
    },
  ];

  return (
    <>
      <SEO title={caso.seo.titulo} description={caso.seo.descripcion} path={`/work/${caso.slug}`} image={caso.tarjeta.imagen} type="article" jsonLd={jsonLd} />
      {/* La web del hero es fondo CSS: se pide antes para que no espere al CSS ni al JavaScript. */}
      <Helmet>
        <link rel="preload" href={caso.hero.web.escritorio} as="image" {...{ fetchpriority: "high" }} />
      </Helmet>
      <div className="v2" ref={raiz}>
        <main id="main" className="caso">
          <Hero caso={caso} lang={lang} />
          <div className="wrap">
            <Producimos caso={caso} lang={lang} />
            <Hace caso={caso} lang={lang} />
            <Reto caso={caso} lang={lang} />
            <section id="sistema" aria-labelledby="cs-s-sistema">
              <span className="eyebrow rv">{TX.piezas[lang]}</span>
              <h2 id="cs-s-sistema" className="rv">{caso.piezas.titulo[lang]}</h2>
              <p className="lede rv">{caso.piezas.lede[lang]}</p>
              <Piezas caso={caso} lang={lang} />
            </section>
            <section id="tecnologia" aria-labelledby="cs-s-tec">
              <span className="eyebrow rv">{TX.tecnologia[lang]}</span>
              <h2 id="cs-s-tec" className="rv">{caso.tecnologia.titulo[lang]}</h2>
              <p className="lede rv">{caso.tecnologia.lede[lang]}</p>
              <Tecnologia caso={caso} lang={lang} />
            </section>
            <Galeria caso={caso} lang={lang} />
            <Cambio caso={caso} lang={lang} />
            <Otros caso={caso} lang={lang} />
          </div>
          <Cierre caso={caso} lang={lang} />
        </main>
      </div>
      <FooterMinimal />
    </>
  );
};

export default Caso;
