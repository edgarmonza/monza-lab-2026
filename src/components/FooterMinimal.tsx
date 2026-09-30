/* El pie de toda la web (v2, 28-sep-2026, desde el prototipo): la marca, cuatro columnas de
 * enlaces y los idiomas. El bloque grande «Construyamos.» salió: cada página cierra con su propio
 * llamado, y «Hablemos» y el WhatsApp flotante están siempre a mano. */
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang, LangText } from "@/i18n/types";
import { enlace } from "@/lib/enlace";
import { Casco } from "@/components/v2/NavbarV2";
import "@/styles/v2.css";
import "@/components/v2/chrome.css";

const L = (es: string, en = es, de = en, pt = es): LangText => ({ es, en, de, pt });

type Item = { t: LangText; to?: string; href?: string };
const COLUMNAS: { titulo: LangText; items: Item[] }[] = [
  {
    titulo: L("Monza Lab"),
    items: [
      { t: L("Proyectos", "Work", "Projekte", "Projetos"), to: "/#proyectos" },
      { t: L("Edgar"), to: "/#edgar" },
      { t: L("Speaker"), to: "/speaker" },
    ],
  },
  {
    titulo: L("Trabajar juntos", "Work together", "Zusammenarbeiten", "Trabalhar juntos"),
    items: [
      { t: L("Studio · e-commerce"), to: "/shopify" },
      { t: L("Plataformas y agentes", "Platforms and agents", "Plattformen und Agenten", "Plataformas e agentes"), to: "/plataformas" },
      { t: L("Monza Sessions"), to: "/sessions" },
    ],
  },
  {
    titulo: L("Lo mío", "Our own", "Eigenes", "O que é nosso"),
    items: [
      { t: L("MonzaHaus"), href: "https://www.monzahaus.com" },
      { t: L("Bavarian Econs"), href: "https://bavarianecons.com" },
      { t: L("Monza Index"), href: "https://www.monzaindex.ai" },
    ],
  },
  {
    titulo: L("Redes", "Social", "Social", "Redes"),
    items: [
      { t: L("Instagram"), href: "https://www.instagram.com/monza.lab/" },
      { t: L("LinkedIn"), href: "https://www.linkedin.com/in/edgarnavarrosoto/" },
      { t: L("Correo", "Email", "E-Mail", "E-mail"), href: "mailto:edgar@monzalab.com" },
    ],
  },
];
const LEMA = L(
  "Sistemas con IA para que tu negocio crezca. Con criterio.",
  "AI systems that help your business grow. With judgment.",
  "KI-Systeme, damit dein Unternehmen wächst. Mit Verstand.",
  "Sistemas com IA para o teu negócio crescer. Com critério.",
);
const IDIOMAS: Lang[] = ["es", "en", "de", "pt"];

const FooterMinimal = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <footer className="v2-chrome v2-pie">
      <div className="v2-pie-in">
        <div className="v2-pie-marca">
          <Link className="mlogo" to={enlace(language, "/")} aria-label="Monza Lab">M<Casco />NZA</Link>
          <p>{LEMA[language]}</p>
        </div>
        {COLUMNAS.map((c) => (
          <div key={c.titulo.es}>
            <h4>{c.titulo[language]}</h4>
            <ul>
              {c.items.map((i) => (
                <li key={i.t.es}>
                  {i.to ? (
                    <Link to={enlace(language, i.to)}>{i.t[language]}</Link>
                  ) : (
                    <a href={i.href} {...(i.href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{i.t[language]}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="v2-pie-bajo">
        <span>© 2026 Monza Lab</span>
        <span className="v2-pie-idiomas">
          {IDIOMAS.map((l) => (
            <button key={l} type="button" aria-current={l === language ? "true" : undefined} onClick={() => setLanguage(l)}>{l.toUpperCase()}</button>
          ))}
        </span>
      </div>
    </footer>
  );
};

export default FooterMinimal;
