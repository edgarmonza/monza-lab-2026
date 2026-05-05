import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations, Language } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'monza-lang';

/* Country → language mapping for first-visit auto-detection.
   Defaults to 'es' for the LATAM market, 'pt' for Portugal/Brazil,
   'de' for the DACH region, 'en' for the rest. */
const SPANISH_COUNTRIES = new Set([
  'ES', 'MX', 'CO', 'AR', 'CL', 'PE', 'VE', 'EC', 'BO', 'PY', 'UY',
  'GT', 'CR', 'DO', 'HN', 'NI', 'PA', 'SV', 'CU', 'PR',
]);
const GERMAN_COUNTRIES = new Set(['DE', 'AT', 'CH', 'LI']);
const PORTUGUESE_COUNTRIES = new Set(['PT', 'BR']);

const countryToLang = (cc: string | undefined | null): Language => {
  if (!cc) return 'en';
  const code = cc.toUpperCase();
  if (PORTUGUESE_COUNTRIES.has(code)) return 'pt';
  if (GERMAN_COUNTRIES.has(code)) return 'de';
  if (SPANISH_COUNTRIES.has(code)) return 'es';
  return 'en';
};

/* Read browser language as a fallback before hitting an external API. */
const browserLang = (): Language | null => {
  if (typeof navigator === 'undefined') return null;
  const raw = (navigator.language || '').toLowerCase();
  if (raw.startsWith('pt')) return 'pt';
  if (raw.startsWith('de')) return 'de';
  if (raw.startsWith('es')) return 'es';
  if (raw.startsWith('en')) return 'en';
  return null;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect language from URL path
  const getLanguageFromPath = (): Language => {
    if (location.pathname.startsWith('/en')) return 'en';
    if (location.pathname.startsWith('/de')) return 'de';
    if (location.pathname.startsWith('/pt')) return 'pt';
    return 'es';
  };

  const language = getLanguageFromPath();

  const setLanguage = (lang: Language) => {
    const currentPath = location.pathname;
    let newPath: string;

    // Strip any existing language prefix to get the base path
    let basePath = currentPath;
    if (
      basePath.startsWith('/en') ||
      basePath.startsWith('/de') ||
      basePath.startsWith('/pt') ||
      basePath.startsWith('/es')
    ) {
      basePath = basePath.slice(3) || '/';
    }

    if (lang === 'es') {
      // Spanish is default — no prefix
      newPath = basePath;
    } else {
      // Non-default language — add prefix
      newPath = `/${lang}${basePath === '/' ? '' : basePath}`;
    }

    // Persist user's explicit choice — overrides future auto-detection
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore storage errors (private mode) */
    }

    navigate(newPath, { replace: true });
  };

  /* First-visit auto-detection
   * Order of precedence:
   *   1. Explicit URL prefix (/en, /de, /pt) — never override
   *   2. localStorage saved choice — respect user's previous pick
   *   3. Browser navigator.language — quick, no network call
   *   4. IP geolocation via ipapi.co — last resort, ~150ms
   * Only triggers on the bare root path. Bots/SSR get 'es' (default).
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only auto-detect on the root home (no language prefix)
    const isRootSpanish = location.pathname === '/' || location.pathname === '';
    if (!isRootSpanish) return;

    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }

    // If user already chose a language before, honor it
    if (saved && ['es', 'en', 'de', 'pt'].includes(saved)) {
      if (saved !== 'es') {
        navigate(`/${saved}`, { replace: true });
      }
      return;
    }

    // 1) Try browser language synchronously — instant, no flash
    const fromBrowser = browserLang();
    if (fromBrowser && fromBrowser !== 'es') {
      try {
        localStorage.setItem(STORAGE_KEY, fromBrowser);
      } catch {
        /* ignore */
      }
      navigate(`/${fromBrowser}`, { replace: true });
      return;
    }

    // 2) Fallback to IP geolocation if browser language is es or unknown
    const controller = new AbortController();
    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { country_code?: string } | null) => {
        if (!data) return;
        const lang = countryToLang(data.country_code);
        try {
          localStorage.setItem(STORAGE_KEY, lang);
        } catch {
          /* ignore */
        }
        if (lang !== 'es') {
          navigate(`/${lang}`, { replace: true });
        }
      })
      .catch(() => {
        /* ignore network errors — default es is fine */
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Translation function with dot notation support
  const t = (section: string, key: string): string => {
    try {
      const sectionParts = section.split('.');
      let current: any = translations;

      for (const part of sectionParts) {
        current = current[part];
        if (!current) return `${section}.${key}`;
      }

      const item = current[key];
      if (!item) return `${section}.${key}`;

      return item[language] || item['es'] || `${section}.${key}`;
    } catch {
      return `${section}.${key}`;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
