/* /work en v2 (28-sep-2026): todos los casos, con las mismas tarjetas de la portada, en
 * cuadrícula y con filtro Todos · Studio · Plataformas · Ventures. El filtro vive en ?f= y
 * acepta los valores viejos (platform, venture, studio) porque llms.txt y Google los enlazan. */
import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import type { LangText } from "@/i18n/types";
import { enlace } from "@/lib/enlace";
import { casoPorSlug } from "@/data/casos";
import type { Caso } from "@/data/casos/tipos";
import { PROYECTOS } from "@/components/portada/datos";
import { PROYECTOS as TXT } from "@/components/portada/textos";
import IconoEntregable from "@/components/portada/IconoEntregable";
import { useRevela } from "@/components/v2/useRevela";
import FooterMinimal from "@/components/FooterMinimal";
import SEO from "@/components/SEO";
import "@/styles/v2.css";
import "@/components/portada/portada.css";

type Filtro = "todos" | Caso["categoria"];
const L = (es: string, en = es, de = en, pt = es): LangText => ({ es, en, de, pt });

const FILTROS: { k: Filtro; t: LangText }[] = [
  { k: "todos", t: L("Todos", "All", "Alle", "Todos") },
  { k: "studio", t: L("Studio") },
  { k: "plataforma", t: L("Plataformas", "Platforms", "Plattformen", "Plataformas") },
  { k: "venture", t: L("Ventures") },
];
const DESDE_URL: Record<string, Filtro> = { platform: "plataforma", plataforma: "plataforma", venture: "venture", studio: "studio" };
const A_URL: Record<Filtro, string | null> = { todos: null, studio: "studio", plataforma: "platform", venture: "venture" };

const COPY = {
  eyebrow: L("Proyectos", "Work", "Projekte", "Projetos"),
  titulo: L("Lo que hemos construido.", "What we've built.", "Was wir gebaut haben.", "O que construímos."),
  lede: L(
    "Tiendas, plataformas con inteligencia artificial y productos propios. Cada caso cuenta qué producimos y qué hace Monza ahí.",
    "Stores, artificial intelligence platforms and products of our own. Each case shows what we produced and what Monza does there.",
    "Shops, KI-Plattformen und eigene Produkte. Jeder Fall zeigt, was wir gebaut haben und was Monza dort macht.",
    "Lojas, plataformas com inteligência artificial e produtos próprios. Cada caso mostra o que produzimos e o que a Monza faz lá.",
  ),
  filtrar: L("Filtrar proyectos", "Filter projects", "Projekte filtern", "Filtrar projetos"),
  seoTitulo: L(
    "Casos: tiendas, plataformas y agentes con IA | Monza Lab",
    "Case studies: stores, platforms and AI agents | Monza Lab",
    "Fallstudien: Shops, Plattformen und KI-Agenten | Monza Lab",
    "Casos: lojas, plataformas e agentes com IA | Monza Lab",
  ),
  seoDesc: L(
    "Los casos de Monza Lab: e-commerce, plataformas con inteligencia artificial para empresas y productos propios. Qué se produjo en cada uno y qué hace Monza ahí.",
    "Monza Lab case studies: e-commerce, AI platforms for companies and products of our own. What we produced in each and what Monza does there.",
    "Die Fallstudien von Monza Lab: E-Commerce, KI-Plattformen für Unternehmen und eigene Produkte. Was jeweils gebaut wurde und was Monza dort macht.",
    "Os casos da Monza Lab: e-commerce, plataformas com IA para empresas e produtos próprios. O que produzimos em cada um e o que a Monza faz lá.",
  ),
};

const Work = () => {
  const { language } = useLanguage();
  const raiz = useRef<HTMLDivElement>(null);
  const [params, setParams] = useSearchParams();
  const filtro: Filtro = DESDE_URL[params.get("f") ?? ""] ?? "todos";
  const lista = PROYECTOS.filter((p) => filtro === "todos" || casoPorSlug(p.slug)?.categoria === filtro);
  useRevela(raiz, [filtro]);

  const elegir = (k: Filtro) => {
    const v = A_URL[k];
    const siguiente = new URLSearchParams(params);
    if (v) siguiente.set("f", v); else siguiente.delete("f");
    setParams(siguiente, { replace: true });
  };

  return (
    <div className="v2 portada work" ref={raiz}>
      <SEO path="/work" title={COPY.seoTitulo} description={COPY.seoDesc} />
      <main id="main" className="wrap work-in">
        <section aria-labelledby="s-work">
          <span className="eyebrow">{COPY.eyebrow[language]}</span>
          <h1 id="s-work" className="work-h1">{COPY.titulo[language]}</h1>
          <p className="lede">{COPY.lede[language]}</p>
          <div className="work-filtros" role="group" aria-label={COPY.filtrar[language]}>
            {FILTROS.map((f) => (
              <button key={f.k} type="button" aria-pressed={f.k === filtro} onClick={() => elegir(f.k)}>{f.t[language]}</button>
            ))}
          </div>
          <div className="pj-track">
            {lista.map((p) => (
              <Link key={p.slug} className="pj rv" to={enlace(language, `/work/${p.slug}`)}>
                <div className="pj-media">
                  <img className="pj-desk" src={p.escritorio} alt={p.alt[language]} loading="lazy" decoding="async" />
                  {p.celular && <img className="pj-phone" src={p.celular} alt="" loading="lazy" decoding="async" />}
                  {p.inserto && <img className="pj-inset" src={p.inserto} alt="" loading="lazy" decoding="async" />}
                </div>
                <div className="pj-info">
                  <span className="pj-tag">{p.etiqueta[language]}</span>
                  <b className="pj-name">{p.nombre[language]}</b>
                  <ul className="pj-prod" aria-label={`${TXT.producimos[language]}: ${p.producido.map((x) => x.nombre[language]).join(", ")}`}>
                    {p.producido.map((x) => (
                      <li key={x.icono + x.nombre.es} title={x.nombre[language]}><IconoEntregable icono={x.icono} /></li>
                    ))}
                  </ul>
                  <span className="pj-go">{TXT.verCaso[language]}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <FooterMinimal />
    </div>
  );
};

export default Work;
