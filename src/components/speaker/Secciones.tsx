/* /speaker · las secciones de la página (v2). Los textos viven en datos.ts. */
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { enlace } from "@/lib/enlace";
import { trackContact, whatsAppUrl } from "@/lib/pixel";
import { CIERRE, CREDENCIALES, ESCENARIOS, FOTOS, HERO, LINEAS, LO_QUE_CONSTRUYE, MENSAJE_WA, NUMEROS, QUIEN, STATEMENT } from "./datos";

const Invitar = ({ fuente, texto }: { fuente: string; texto: string }) => {
  const { language } = useLanguage();
  return (
    <a
      className="btn"
      href={whatsAppUrl(MENSAJE_WA[language])}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContact("whatsapp", fuente)}
    >
      {texto}
    </a>
  );
};

export const Hero = () => {
  const { language } = useLanguage();
  return (
    <section className="spk-hero" aria-labelledby="spk-h1">
      <picture className="spk-fondo">
        <source media="(max-width: 700px)" srcSet="/v2/speaker/hero-cel.webp" />
        <img src="/v2/speaker/hero.webp" alt={HERO.fondoAlt[language]} width={1800} height={1350} decoding="async" {...{ fetchpriority: "high" }} />
      </picture>
      <div className="spk-fantasma" aria-hidden="true">Speaker</div>
      <div className="spk-hero-in">
        <span className="spk-eyebrow">{HERO.eyebrow[language]}</span>
        <h1 id="spk-h1">
          {HERO.titulo[language]}
          <span className="box rosa-box">{HERO.resaltado[language]}</span>
        </h1>
        <p className="spk-lede">{HERO.lede[language]}</p>
        <div className="spk-acts">
          <Invitar fuente="speaker_hero" texto={HERO.invitar[language]} />
          <a className="lnk" href="#conferencias">{HERO.lineas[language]}</a>
        </div>
      </div>
    </section>
  );
};

export const Numeros = () => {
  const { language } = useLanguage();
  return (
    <div className="spk-numeros">
      {NUMEROS.map((n) => (
        <div key={n.label.es} className="spk-num rv">
          <b>{n.n[language]}</b>
          <span>{n.label[language]}</span>
        </div>
      ))}
    </div>
  );
};

export const Quien = () => {
  const { language } = useLanguage();
  return (
    <section aria-labelledby="spk-quien">
      <div className="spk-quien">
        <div className="spk-fig rv">
          <span className="spk-humo" aria-hidden="true" />
          <div className="spk-ph">
            <img src="/v2/edgar/retrato-rayban.jpg" alt={QUIEN.retratoAlt[language]} width={864} height={1184} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="rv">
          <span className="eyebrow">{QUIEN.eyebrow[language]}</span>
          <h2 id="spk-quien">
            {QUIEN.titulo[language]}
            <span className="rosa-txt">{QUIEN.resaltado[language]}</span>
          </h2>
          <p className="spk-rol">{QUIEN.rol[language]}</p>
          <p className="spk-bio">{QUIEN.bio[language]}</p>
        </div>
      </div>
      <div className="spk-cred" style={{ marginTop: "clamp(40px, 6vw, 72px)" }}>
        {CREDENCIALES.map((c) => (
          <article key={c.k.es} className="rv">
            <i>{c.k[language]}</i>
            <b>{c.b[language]}</b>
            <span>{c.s[language]}</span>
          </article>
        ))}
      </div>
    </section>
  );
};

export const Frase = () => {
  const { language } = useLanguage();
  return (
    <section aria-label={STATEMENT.resaltado[language]}>
      <p className="spk-frase rv">
        {STATEMENT.a[language]}
        <span className="rosa-txt">{STATEMENT.resaltado[language]}</span>
        {STATEMENT.b[language]}
      </p>
    </section>
  );
};

export const Escenarios = () => {
  const { language } = useLanguage();
  return (
    <section id="conferencias" aria-labelledby="spk-esc">
      <span className="eyebrow rv">{ESCENARIOS.eyebrow[language]}</span>
      <h2 id="spk-esc" className="rv">{ESCENARIOS.titulo[language]}</h2>
      <ul className="spk-lista">
        {ESCENARIOS.items.map((e) => (
          <li key={e.lugar.es} className="rv">
            <div className="spk-lugar">
              {e.lugar[language]}
              {e.meta[language] && <small>{e.meta[language]}</small>}
            </div>
            <div className="spk-tema">
              {e.tema[language]}
              <span>{e.formato[language]}</span>
            </div>
            {e.href ? (
              <a href={e.href} target="_blank" rel="noopener noreferrer">{ESCENARIOS.ver[language]}</a>
            ) : (
              <span aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export const Lineas = () => {
  const { language } = useLanguage();
  return (
    <section aria-labelledby="spk-lin">
      <div className="spk-lineas-cab">
        <span className="eyebrow rv">{LINEAS.eyebrow[language]}</span>
        <h2 id="spk-lin" className="rv" style={{ marginTop: 14 }}>
          {LINEAS.titulo[language]}
          <span className="box rosa-box">{LINEAS.resaltado[language]}</span>
        </h2>
      </div>
      <p className="lede rv">{LINEAS.lede[language]}</p>
      <div className="spk-lineas">
        {LINEAS.items.map((l) => (
          <article key={l.lente.es} className="spk-linea rv">
            <i>{l.lente[language]}</i>
            <h3>{l.titulo[language]}</h3>
            <p>{l.texto[language]}</p>
            <span>{l.para[language]}</span>
          </article>
        ))}
      </div>
      <p className="fine rv">{LINEAS.nota[language]}</p>
    </section>
  );
};

export const Tira = () => {
  const { language } = useLanguage();
  const fotos = [...FOTOS.items, ...FOTOS.items];
  return (
    <div className="spk-escena">
      <span className="eyebrow">{FOTOS.eyebrow[language]}</span>
      <div className="spk-tira" aria-label={FOTOS.aria[language]} role="group">
        <div className="spk-tira-in">
          {fotos.map((f, i) => (
            <figure key={i} className="spk-foto" aria-hidden={i >= FOTOS.items.length ? true : undefined}>
              <img src={f.src} alt={i >= FOTOS.items.length ? "" : f.alt[language]} loading="lazy" decoding="async" />
              <figcaption>{f.pie[language]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Construye = () => {
  const { language } = useLanguage();
  return (
    <section aria-labelledby="spk-emp">
      <span className="eyebrow rv">{LO_QUE_CONSTRUYE.eyebrow[language]}</span>
      <h2 id="spk-emp" className="rv">{LO_QUE_CONSTRUYE.titulo[language]}</h2>
      <div className="spk-empresas">
        {LO_QUE_CONSTRUYE.items.map((e) => (
          <Link key={e.nombre} className="rv" to={enlace(language, e.to)}>
            <span><b>{e.nombre}</b><small>{e.desc[language]}</small></span>
            <em aria-hidden="true">→</em>
          </Link>
        ))}
      </div>
    </section>
  );
};

export const Cierre = () => {
  const { language } = useLanguage();
  return (
    <section className="spk-cierre" aria-labelledby="spk-cierre">
      <div className="spk-cierre-in">
        <span className="eyebrow rv">{CIERRE.eyebrow[language]}</span>
        <h2 id="spk-cierre" className="rv">
          {CIERRE.titulo[language]}
          <span className="box rosa-box">{CIERRE.resaltado[language]}</span>
        </h2>
        <p className="lede rv">{CIERRE.lede[language]}</p>
        <div className="spk-acts rv">
          <Invitar fuente="speaker_cierre" texto={CIERRE.whatsapp[language]} />
          <a className="lnk" href="mailto:edgar@monzalab.com">edgar@monzalab.com</a>
        </div>
      </div>
    </section>
  );
};
