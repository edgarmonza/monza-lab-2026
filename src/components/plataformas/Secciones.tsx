/* /plataformas · las secciones. Reusa la gramática del molde de caso (clases de caso.css bajo
 * .caso: hero con la web que se recorre sola, tarjetas de entregables, mapa de tecnología, cierre)
 * y suma lo suyo bajo .pl-: las fases, los casos, la demo del agente y las preguntas. */
import { Link } from "react-router-dom";
import type { Lang } from "@/i18n/types";
import { casoPorSlug } from "@/data/casos";
import type { Caso } from "@/data/casos/tipos";
import { enlace } from "@/lib/enlace";
import { trackContact, whatsAppUrl } from "@/lib/pixel";
import Tecnologia from "@/components/caso/Tecnologia";
import { Chispa, FlechaAbajo, IconoEntregableSvg, IconoWhatsApp } from "@/components/caso/iconos";
import { CASOS_PL, CIERRE, CONSTRUIMOS, DEMO, FAQ, FASES, HERO, MAPA } from "./datos";

type P = { lang: Lang };
const abrirAgente = () => window.dispatchEvent(new CustomEvent("monza:open-agent"));

/* ── 1 · Hero: la plataforma de comercio exterior, recorriéndose sola ── */
export const Hero = ({ lang }: P) => {
  const ref = casoPorSlug("plataforma-comercio-exterior");
  const web = ref?.hero.web;
  return (
    <header className="c-hero pl-hero" aria-labelledby="pl-h1">
      <div className="c-ghost" aria-hidden="true">IA</div>
      <div className="c-in">
        <div className="c-copy">
          <nav className="miga" aria-label="Monza Lab">
            <Link to={enlace(lang, "/")}>Monza Lab</Link><i>/</i><span>{HERO.miga[lang]}</span>
          </nav>
          <h1 id="pl-h1" className="largo">{HERO.linea1[lang]} <span className="pk">{HERO.linea2[lang]}</span></h1>
          <p className="c-frase">{HERO.frase[lang]}</p>
          <div className="pills">{HERO.pastillas.map((p, i) => <span key={i} className="pill">{p[lang]}</span>)}</div>
          <div className="c-acts">
            <a className="btn" href="#fases">{HERO.comoSeArma[lang]} <FlechaAbajo /></a>
            <button type="button" className="lnk" onClick={abrirAgente}>{HERO.hablarAgente[lang]} →</button>
          </div>
        </div>
        {web && (
          <div className="escena" role="img" aria-label={HERO.escena[lang]}>
            <div className="nave">
              <div className="nave-barra" aria-hidden="true"><i /><i /><i /><span>{web.barra}</span></div>
              <div className="recorre" style={{ backgroundImage: `url(${web.escritorio})` }} />
            </div>
            {web.celular && <div className="tel"><div className="recorre" style={{ backgroundImage: `url(${web.celular})` }} /></div>}
            {web.flota && (
              <div className="flota"><span className="sello">{web.flota.sello[lang]}</span><img src={web.flota.img} alt="" loading="lazy" decoding="async" /></div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

/* ── 2 · Qué construimos ── */
export const Construimos = ({ lang }: P) => (
  <section id="construimos" aria-labelledby="pl-s-cons">
    <span className="eyebrow rv">{CONSTRUIMOS.eyebrow[lang]}</span>
    <h2 id="pl-s-cons" className="rv">{CONSTRUIMOS.titulo[lang]}</h2>
    <div className="prod-grid">
      {CONSTRUIMOS.items.map((it, i) => (
        <article key={i} className="prod-it rv">
          <span className="prod-ic"><IconoEntregableSvg icono={it.icono} /></span>
          <b>{it.nombre[lang]}</b>
          <p>{it.texto[lang]}</p>
        </article>
      ))}
    </div>
  </section>
);

/* ── 3 · Cómo se arma: cuatro fases, cada una deja algo andando ── */
export const Fases = ({ lang }: P) => (
  <section id="fases" aria-labelledby="pl-s-fases">
    <span className="eyebrow rv">{FASES.eyebrow[lang]}</span>
    <h2 id="pl-s-fases" className="rv">{FASES.titulo[lang]}</h2>
    <p className="lede rv">{FASES.lede[lang]}</p>
    <ol className="pl-fases">
      {FASES.items.map((f) => (
        <li key={f.n} className="rv">
          <span className="pl-f-n" aria-hidden="true">{f.n}</span>
          <h3>{f.titulo[lang]}</h3>
          <p>{f.texto[lang]}</p>
          <p className="pl-f-queda"><b>{FASES.queda[lang]}</b>{f.queda[lang]}</p>
        </li>
      ))}
    </ol>
  </section>
);

/* ── 4 · El mapa de tecnología genérico (el mismo componente de los casos) ── */
export const Mapa = ({ lang }: P) => (
  <section id="tecnologia" aria-labelledby="pl-s-tec">
    <span className="eyebrow rv">{MAPA.eyebrow[lang]}</span>
    <h2 id="pl-s-tec" className="rv">{MAPA.titulo[lang]}</h2>
    <p className="lede rv">{MAPA.lede[lang]}</p>
    <Tecnologia caso={MAPA.caso} lang={lang} />
  </section>
);

/* ── 5 · Los casos de plataforma ── */
export const Casos = ({ lang }: P) => {
  const casos = CASOS_PL.slugs.map((s) => casoPorSlug(s)).filter((c): c is Caso => !!c);
  if (!casos.length) return null;
  return (
    <section id="casos" aria-labelledby="pl-s-casos">
      <span className="eyebrow rv">{CASOS_PL.eyebrow[lang]}</span>
      <h2 id="pl-s-casos" className="rv">{CASOS_PL.titulo[lang]}</h2>
      <p className="lede rv">{CASOS_PL.lede[lang]}</p>
      <div className="pl-casos">
        {casos.map((c) => (
          <Link key={c.slug} className="pl-caso rv" to={enlace(lang, `/work/${c.slug}`)}>
            <div className="pl-c-media">
              <img className="pl-c-desk" src={c.tarjeta.imagen} alt="" loading="lazy" decoding="async" />
              {c.tarjeta.inserto && <img className="pl-c-inset" src={c.tarjeta.inserto} alt="" loading="lazy" decoding="async" />}
              {!c.tarjeta.inserto && c.tarjeta.imagenCel && <img className="pl-c-cel" src={c.tarjeta.imagenCel} alt="" loading="lazy" decoding="async" />}
            </div>
            <div className="pl-c-info">
              <span className="pl-c-tag">{c.tarjeta.etiqueta[lang]}</span>
              <b className="pl-c-name">{c.nombre[lang]}</b>
              <span className="pl-c-prod" aria-label={c.producimos.items.map((i) => i.nombre[lang]).join(", ")}>
                {c.producimos.items.map((i, k) => <i key={k} title={i.nombre[lang]}><IconoEntregableSvg icono={i.icono} /></i>)}
              </span>
              <span className="pl-c-go">{CASOS_PL.verCaso[lang]}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

/* ── 6 · La demo del agente: la pantalla de ejemplo abre el agente real ── */
export const Demo = ({ lang }: P) => (
  <section id="demo" className="pl-demo rv" aria-labelledby="pl-s-demo">
    <div className="pl-d-copy">
      <span className="eyebrow">{DEMO.eyebrow[lang]}</span>
      <h2 id="pl-s-demo">{DEMO.titulo[lang]}</h2>
      <p className="lede">{DEMO.texto[lang]}</p>
      <button type="button" className="btn" onClick={abrirAgente}><Chispa />{DEMO.boton[lang]}</button>
    </div>
    <div className="pl-chat" aria-label={DEMO.nota[lang]}>
      <div className="pl-chat-top">
        <span className="pl-chat-av" aria-hidden="true"><Chispa /></span>
        <span><b>{DEMO.nombre[lang]}</b><small><i aria-hidden="true" />{DEMO.enLinea[lang]}</small></span>
      </div>
      <p className="pl-chat-msg">{DEMO.saludo[lang]}</p>
      <div className="pl-chat-qs">
        {DEMO.preguntas.map((q, i) => <button key={i} type="button" onClick={abrirAgente}>{q[lang]}</button>)}
      </div>
      <p className="pl-chat-nota">{DEMO.nota[lang]}</p>
    </div>
  </section>
);

/* ── 7 · Preguntas frecuentes: nativas (details), el texto completo queda en el HTML ── */
export const Preguntas = ({ lang }: P) => (
  <section id="preguntas" aria-labelledby="pl-s-faq">
    <span className="eyebrow rv">{FAQ.eyebrow[lang]}</span>
    <h2 id="pl-s-faq" className="rv">{FAQ.titulo[lang]}</h2>
    <div className="pl-faq">
      {FAQ.items.map((f, i) => (
        <details key={i} className="rv" open={i === 0}>
          <summary>{f.q[lang]}<span aria-hidden="true" /></summary>
          <p>{f.a[lang]}</p>
        </details>
      ))}
    </div>
  </section>
);

/* ── 8 · Cierre negro ── */
export const Cierre = ({ lang }: P) => (
  <section className="c-cierre" aria-labelledby="pl-s-cierre">
    <div className="cc-in">
      <span className="eyebrow rv">{CIERRE.eyebrow[lang]}</span>
      <h2 id="pl-s-cierre" className="rv">{CIERRE.titulo[lang]} <span className="box rosa-box">{CIERRE.resaltado[lang]}</span></h2>
      <p className="lede rv">{CIERRE.lede[lang]}</p>
      <div className="cc-acts rv">
        <a className="btn" href={whatsAppUrl(CIERRE.mensaje[lang])} target="_blank" rel="noopener" onClick={() => trackContact("whatsapp", "plataformas_cierre")}>
          <IconoWhatsApp />{CIERRE.whatsapp[lang]}
        </a>
        <button type="button" className="lnk" onClick={abrirAgente}>{CIERRE.agente[lang]}</button>
      </div>
    </div>
  </section>
);
