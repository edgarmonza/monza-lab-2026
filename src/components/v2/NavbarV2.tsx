/* El menú v2 (28-sep-2026, desde el prototipo): Proyectos · Studio · Plataformas · Sessions · Edgar,
 * el idioma y «Hablemos». Sobre el rosa se pone oscuro; sobre lo oscuro, vidrio al bajar.
 * En el celular, un menú rosa a pantalla completa. Sin selector claro/oscuro: hay un solo tema. */
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang, LangText } from "@/i18n/types";
import { enlace } from "@/lib/enlace";
import { trackContact, whatsAppUrl } from "@/lib/pixel";
import "@/styles/v2.css";
import "./chrome.css";

const L = (es: string, en = es, de = en, pt = es): LangText => ({ es, en, de, pt });

const LINKS: { id: string; t: LangText; sub: LangText; to: string; activo: (base: string) => boolean }[] = [
  { id: "proyectos", t: L("Proyectos", "Work", "Projekte", "Projetos"), sub: L("Casos", "Cases", "Fälle", "Casos"), to: "/#proyectos", activo: (b) => b.startsWith("/work") },
  { id: "studio", t: L("Studio"), sub: L("E-commerce"), to: "/shopify", activo: (b) => b === "/shopify" },
  { id: "plataformas", t: L("Plataformas", "Platforms", "Plattformen", "Plataformas"), sub: L("Empresas", "Companies", "Unternehmen", "Empresas"), to: "/plataformas", activo: (b) => b === "/plataformas" },
  { id: "sessions", t: L("Sessions"), sub: L("Aprender", "Learn", "Lernen", "Aprender"), to: "/sessions", activo: (b) => b === "/sessions" },
  { id: "edgar", t: L("Edgar"), sub: L("Quién", "Who", "Wer", "Quem"), to: "/#edgar", activo: (b) => b === "/speaker" },
];
const HABLEMOS = L("Hablemos", "Let's talk", "Sprechen wir", "Falemos");
const ESCRIBIR = L("Escribir por WhatsApp", "Message on WhatsApp", "Auf WhatsApp schreiben", "Escrever no WhatsApp");
const MENSAJE = L("Hola Edgar, vengo de monzalab.com", "Hi Edgar, I'm coming from monzalab.com", "Hallo Edgar, ich komme von monzalab.com", "Olá Edgar, venho de monzalab.com");
const IDIOMAS: { l: Lang; nombre: string }[] = [
  { l: "es", nombre: "Español" }, { l: "en", nombre: "English" }, { l: "de", nombre: "Deutsch" }, { l: "pt", nombre: "Português" },
];

export const Casco = () => (
  <svg viewBox="0 0 120 121" aria-hidden="true">
    <path className="h-shell" d="M60 3C36 3 12 18 7 40C2 57 2 72 6 86L15 103C23 113 38 118 57 118L60 118L63 118C82 118 97 113 105 103L114 86C118 72 118 57 113 40C108 18 84 3 60 3Z" />
    <path className="h-visor" d="M14 46C14 36 33 30 60 30C87 30 106 36 106 46L106 68C105 77 86 83 60 83C34 83 15 77 14 68Z" />
  </svg>
);

const base = (pathname: string) => pathname.replace(/^\/(en|de|pt)(?=\/|$)/, "").replace(/\/+$/, "") || "/";

const NavbarV2 = () => {
  const { language, setLanguage } = useLanguage();
  const { pathname } = useLocation();
  const nav = useRef<HTMLElement>(null);
  const [piel, setPiel] = useState<"oscuro" | "rosa">("oscuro");
  const [bajo, setBajo] = useState(false);
  const [menu, setMenu] = useState(false);
  const [lang, setLang] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const cerrar = useRef<HTMLButtonElement>(null);
  const b = base(pathname);

  // sobre el rosa, oscuro; sobre lo oscuro, vidrio al bajar
  const medir = useCallback(() => {
    const y = (nav.current?.offsetHeight ?? 64) / 2;
    const enRosa = [...document.querySelectorAll<HTMLElement>(".v2 .rosa")].some((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= y && r.bottom >= y;
    });
    setPiel(enRosa ? "rosa" : "oscuro");
    setBajo(window.scrollY > 8);
  }, []);
  useEffect(() => {
    let tick = false;
    const alBajar = () => { if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; medir(); }); } };
    addEventListener("scroll", alBajar, { passive: true });
    addEventListener("resize", alBajar);
    const t = [0, 150, 700].map((ms) => window.setTimeout(medir, ms)); // la página llega perezosa
    return () => { removeEventListener("scroll", alBajar); removeEventListener("resize", alBajar); t.forEach(clearTimeout); };
  }, [medir, pathname]);

  // menú de celular: bloquea el scroll, Escape cierra, el foco va y vuelve
  useEffect(() => {
    document.body.classList.toggle("v2-menu-abierto", menu);
    if (menu) cerrar.current?.focus();
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); setLang(false); } };
    addEventListener("keydown", esc);
    return () => { removeEventListener("keydown", esc); document.body.classList.remove("v2-menu-abierto"); };
  }, [menu]);
  useEffect(() => { setMenu(false); setLang(false); }, [pathname]);
  useEffect(() => {
    if (!lang) return;
    const fuera = () => setLang(false);
    document.addEventListener("click", fuera);
    return () => document.removeEventListener("click", fuera);
  }, [lang]);

  const hablar = () => trackContact("whatsapp", "nav");
  const wa = whatsAppUrl(MENSAJE[language]);

  return (
    <>
      <header ref={nav} className="v2-chrome v2-nav" data-on={piel} data-bajo={bajo ? "" : undefined}>
        <Link className="mlogo" to={enlace(language, "/")} aria-label="Monza Lab">M<Casco />NZA</Link>
        <nav className="v2-links" aria-label="Principal">
          {LINKS.map((l) => (
            <Link key={l.id} to={enlace(language, l.to)} aria-current={l.activo(b) ? "page" : undefined}>{l.t[language]}</Link>
          ))}
        </nav>
        <div className="v2-lang">
          <button type="button" className="v2-lang-btn" aria-expanded={lang} aria-haspopup="true" onClick={(e) => { e.stopPropagation(); setLang((v) => !v); }}>
            {language.toUpperCase()}
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2 3.5L5 6.5 8 3.5" /></svg>
          </button>
          {lang && (
            <div className="v2-lang-pop" role="menu">
              {IDIOMAS.map((i) => (
                <button key={i.l} type="button" role="menuitem" aria-current={i.l === language ? "true" : undefined} onClick={() => { setLanguage(i.l); setLang(false); }}>{i.nombre}</button>
              ))}
            </div>
          )}
        </div>
        <a className="v2-cta" href={wa} target="_blank" rel="noopener noreferrer" onClick={hablar}>{HABLEMOS[language]}</a>
        <button ref={burger} type="button" className="v2-burger" aria-label="Menú" aria-expanded={menu} aria-controls="v2-menu" onClick={() => setMenu(true)}><span aria-hidden="true" /></button>
      </header>

      {menu && (
        <div className="v2-chrome v2-menu" id="v2-menu" role="dialog" aria-modal="true" aria-label="Menú">
          <div className="v2-menu-top">
            <Link className="mlogo" to={enlace(language, "/")} onClick={() => setMenu(false)}>M<Casco />NZA</Link>
            <button ref={cerrar} type="button" className="v2-menu-close" aria-label="Cerrar" onClick={() => { setMenu(false); burger.current?.focus(); }}>×</button>
          </div>
          <ul>
            {LINKS.map((l) => (
              <li key={l.id}><Link to={enlace(language, l.to)} onClick={() => setMenu(false)}>{l.t[language]} <small>{l.sub[language]}</small></Link></li>
            ))}
          </ul>
          <div className="v2-menu-pie">
            <div className="v2-menu-lang">
              {IDIOMAS.map((i) => (
                <button key={i.l} type="button" aria-current={i.l === language ? "true" : undefined} onClick={() => setLanguage(i.l)}>{i.l.toUpperCase()}</button>
              ))}
            </div>
            <a className="v2-menu-wa" href={wa} target="_blank" rel="noopener noreferrer" onClick={hablar}>{ESCRIBIR[language]}</a>
            <a className="v2-menu-mail" href="mailto:edgar@monzalab.com">edgar@monzalab.com</a>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarV2;
