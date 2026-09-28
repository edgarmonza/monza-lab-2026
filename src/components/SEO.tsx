import { Helmet } from "react-helmet";
import { useLanguage } from "@/i18n/LanguageContext";

import type { LangText } from "@/i18n/types";
export type TrilingualText = LangText;

type SEOProps = {
  title: TrilingualText;
  description: TrilingualText;
  /** Route path WITHOUT the language prefix, e.g. "/speaker", "/work/eleonora-morales". Use "" for home. */
  path?: string;
  /** Full URL or site-relative path of a custom OG image — overrides ogKey. */
  image?: string;
  /** La tarjeta para compartir: public/og/<idioma>/<ogKey>.jpg («home», «sessions», «work/soloio»…).
   *  Las pinta scripts/og/generar.mjs; SEO.test.tsx verifica que existan en los cuatro idiomas. */
  ogKey?: string;
  type?: "website" | "article" | "profile";
  /** Extra JSON-LD structured data to inject. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** When true, sets robots to noindex. */
  noindex?: boolean;
};

const SITE_URL = "https://www.monzalab.com";
/* Versión de las tarjetas para compartir. LinkedIn (y otros) cachean la imagen por URL:
 * cuando se vuelvan a pintar (scripts/og/generar.mjs), subir este número para que
 * las redes las vuelvan a descargar. v2 = 2026-08-17 (fix del mosaico de la home).
 * v3 = 2026-09-28: tarjetas estáticas por página y por caso, en los cuatro idiomas. */
const OG_VERSION = "3";

const LOCALE_MAP = {
  es: "es_ES",
  en: "en_US",
  de: "de_DE",
  pt: "pt_PT",
} as const;

const buildUrl = (lang: "es" | "en" | "de" | "pt", path: string) => {
  const prefix = lang === "es" ? "" : `/${lang}`;
  const cleanPath = path === "/" ? "" : path;
  return `${SITE_URL}${prefix}${cleanPath}`;
};

const SEO = ({ title, description, path = "", image, ogKey = "home", type = "website", jsonLd, noindex }: SEOProps) => {
  const { language } = useLanguage();

  const currentTitle = title[language];
  const currentDescription = description[language];
  const canonical = buildUrl(language, path);
  /* La imagen: la de `image` si viene; si no, la tarjeta de la página en su idioma
   * (1200×630, public/og/<idioma>/<ogKey>.jpg). Sin ogKey, la de la portada. */
  const ogImage = image
    ? (image.startsWith("http") ? image : `${SITE_URL}${image}`)
    : `${SITE_URL}/og/${language}/${ogKey}.jpg?v=${OG_VERSION}`;

  const hreflangs: Array<{ lang: "es" | "en" | "de" | "pt"; url: string }> = [
    { lang: "es", url: buildUrl("es", path) },
    { lang: "en", url: buildUrl("en", path) },
    { lang: "de", url: buildUrl("de", path) },
    { lang: "pt", url: buildUrl("pt", path) },
  ];

  /* defer={false}: react-helmet espera un requestAnimationFrame para escribir la cabecera, y
   * el prerender captura pestañas en segundo plano donde ese cuadro no llega. Con la espera,
   * 9 de 76 páginas salían con la canónica de la portada (27-sep-2026). */
  return (
    <Helmet defer={false}>
      <html lang={language} />
      <title>{currentTitle}</title>
      <meta name="description" content={currentDescription} />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates */}
      {hreflangs.map((h) => (
        <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={buildUrl("es", path)} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Monza Lab" />
      <meta property="og:locale" content={LOCALE_MAP[language]} />
      {(Object.entries(LOCALE_MAP) as Array<[keyof typeof LOCALE_MAP, string]>)
        .filter(([lang]) => lang !== language)
        .map(([lang, locale]) => (
          <meta key={lang} property="og:locale:alternate" content={locale} />
        ))}
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:image" content={ogImage} />
      {!image && <meta property="og:image:type" content="image/jpeg" />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={currentTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@MonzaLab" />
      <meta name="twitter:creator" content="@edgarnavarro" />
      <meta name="twitter:title" content={currentTitle} />
      <meta name="twitter:description" content={currentDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Optional JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
