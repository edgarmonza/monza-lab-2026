import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'enzo' | 'modena';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'monza-theme';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  /* v2 (28-sep-2026): un solo tema, oscuro. El claro (Modena) salió por pedido de Edgar; se borra
   * la preferencia guardada para que nadie quede atrapado en él. setTheme y toggleTheme quedan
   * como no-ops para las páginas viejas que todavía los importan. */
  const [theme] = useState<ThemeMode>(() => {
    try { localStorage.removeItem(THEME_KEY); } catch { /* sin almacenamiento */ }
    return 'enzo';
  });

  const setTheme = (_newTheme: ThemeMode) => {};

  const toggleTheme = () => {};

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-enzo', 'theme-modena');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
