import React, { createContext, useContext, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations, Language } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect language from URL path
  const getLanguageFromPath = (): Language => {
    if (location.pathname.startsWith('/en')) {
      return 'en';
    }
    if (location.pathname.startsWith('/de')) {
      return 'de';
    }
    return 'es';
  };

  const language = getLanguageFromPath();

  const setLanguage = (lang: Language) => {
    const currentPath = location.pathname;
    let newPath: string;

    // Strip any existing language prefix to get the base path
    let basePath = currentPath;
    if (basePath.startsWith('/en')) {
      basePath = basePath.slice(3) || '/';
    } else if (basePath.startsWith('/de')) {
      basePath = basePath.slice(3) || '/';
    } else if (basePath.startsWith('/es')) {
      basePath = basePath.slice(3) || '/';
    }

    if (lang === 'es') {
      // Spanish is default — no prefix
      newPath = basePath;
    } else {
      // English or German — add prefix
      newPath = `/${lang}${basePath === '/' ? '' : basePath}`;
    }

    navigate(newPath, { replace: true });
  };

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
