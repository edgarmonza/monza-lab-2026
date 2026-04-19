import { Helmet } from "react-helmet";
import { useLanguage } from "@/i18n/LanguageContext";

export type TrilingualText = { es: string; en: string; de: string };

type SEOProps = {
  title: TrilingualText;
  description: TrilingualText;
  /** Route path WITHOUT the language prefix, e.g. "/speaker", "/work/eleonora-morales". Use "" for home. */
  path?: string;
  /** Full URL or site-relative path of the OG image. Defaults to /og-image.png */
  image?: string;
  type?: "website" | "article" | "profile";
  /** Extra JSON-LD structured data to inject. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** When true, sets robots to noindex. */
  noindex?: boolean;
};

const SITE_URL = "https://monzalab.com";

const LOCALE_MAP = {
  es: "es_ES",
  en: "en_US",
  de: "de_DE",
} as const;

const buildUrl = (lang: "es" | "en" | "de", path: string) => {
  const prefix = lang === "es" ? "" : `/${lang}`;
  const cleanPath = path === "/" ? "" : path;
  return `${SITE_URL}${prefix}${cleanPath}`;
};

const SEO = ({ title, description, path = "", image, type = "website", jsonLd, noindex }: SEOProps) => {
  const { language } = useLanguage();

  const currentTitle = title[language];
  const currentDescription = description[language];
  const canonical = buildUrl(language, path);
  const ogImage = image
    ? (image.startsWith("http") ? image : `${SITE_URL}${image}`)
    : `${SITE_URL}/og-image.png`;

  const hreflangs: Array<{ lang: "es" | "en" | "de"; url: string }> = [
    { lang: "es", url: buildUrl("es", path) },
    { lang: "en", url: buildUrl("en", path) },
    { lang: "de", url: buildUrl("de", path) },
  ];

  return (
    <Helmet>
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
