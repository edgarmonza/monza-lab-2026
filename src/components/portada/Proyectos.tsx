/* «Algunos de nuestros proyectos»: nueve tarjetas que llevan a su caso (/work/<slug>), cada una
 * con los íconos de lo que se produjo. En el celular es un carrusel con barra de avance; desde
 * 960 px, un mosaico con soloio grande. */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { enlace } from "@/lib/enlace";
import IconoEntregable from "./IconoEntregable";
import { PROYECTOS } from "./datos";
import { PROYECTOS as TXT } from "./textos";

const Proyectos = () => {
  const { language } = useLanguage();
  const pista = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLElement>(null);

  useEffect(() => {
    const tr = pista.current, th = barra.current;
    if (!tr || !th) return;
    const upd = () => {
      const max = tr.scrollWidth - tr.clientWidth;
      const f = tr.clientWidth / tr.scrollWidth;
      th.style.width = `${f * 100}%`;
      th.style.transform = `translateX(${max > 0 ? (tr.scrollLeft / max) * ((1 - f) / f) * 100 : 0}%)`;
    };
    tr.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    upd();
    return () => { tr.removeEventListener("scroll", upd); window.removeEventListener("resize", upd); };
  }, []);

  return (
    <section id="proyectos" aria-labelledby="s-proyectos">
      <span className="eyebrow rv">{TXT.eyebrow[language]}</span>
      <h2 id="s-proyectos" className="rv">{TXT.titulo[language]}</h2>
      <p className="lede rv">{TXT.lede[language]}</p>
      <div className="pj-track rv" ref={pista}>
        {PROYECTOS.map((p) => (
          <Link key={p.slug} className="pj" to={enlace(language, `/work/${p.slug}`)}>
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
      <div className="pj-foot" aria-hidden="true">
        <div className="pj-bar"><i ref={barra} /></div>
        <span className="pj-hint">{TXT.desliza[language]}</span>
      </div>
    </section>
  );
};

export default Proyectos;
