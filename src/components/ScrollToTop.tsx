import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Al cambiar de ruta sube al principio; si el enlace trae ancla («/#proyectos», «/en#edgar»),
 * espera a que la sección exista (las páginas llegan perezosas) y baja hasta ella. */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let intentos = 0;
    let t = 0;
    const buscar = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (intentos++ < 30) t = window.setTimeout(buscar, 60);
    };
    buscar();
    return () => clearTimeout(t);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
