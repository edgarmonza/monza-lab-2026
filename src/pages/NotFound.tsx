import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEO from "@/components/SEO";

const content = {
  message: { es: "Oops! Página no encontrada", en: "Oops! Page not found", de: "Oops! Seite nicht gefunden", pt: "Oops! Página no encontrada" },
  returnHome: { es: "Volver al inicio", en: "Return to Home", de: "Zur Startseite", pt: "Volver al inicio" },
};

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEO
        noindex
        title={{
          es: "Página no encontrada — Monza Lab",
          en: "Page not found — Monza Lab",
          de: "Seite nicht gefunden — Monza Lab", pt: "Página no encontrada — Monza Lab",
        }}
        description={{
          es: "La página que buscas no existe. Volver al inicio de Monza Lab.",
          en: "The page you are looking for does not exist. Return to Monza Lab.",
          de: "Die gesuchte Seite existiert nicht. Zurück zur Startseite von Monza Lab.", pt: "La página que buscas no existe. Volver al inicio de Monza Lab.",
        }}
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{content.message[language]}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {content.returnHome[language]}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
