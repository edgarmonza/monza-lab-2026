/* Las secciones fijas del caso v2 (todo lo que no es interactivo). El orden lo pone pages/Caso.tsx. */
import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Caso } from "@/data/casos/tipos";
import type { Lang } from "@/i18n/types";
import { otrosCasos } from "@/data/casos";
import { enlace } from "@/lib/enlace";
import { trackContact, whatsAppUrl } from "@/lib/pixel";
import { FlechaAbajo, IconoEntregableSvg, IconoWhatsApp } from "./iconos";
import { TX } from "./textos";

type P = { caso: Caso; lang: Lang };

/** Un enlace de los datos: externo (nueva pestaña), ancla de la página o camino del sitio en el idioma. */
const Enlace = ({ href, className, children }: { href: string; className?: string; children: ReactNode }) =>
  /^https?:/.test(href)
    ? <a className={className} href={href} target="_blank" rel="noopener">{children}</a>
    : <a className={className} href={href}>{children}</a>;

/* ── 1 · Hero: la web que se recorre sola ── */
export const Hero = ({ caso, lang }: P) => {
  const { hero } = caso;
  const l1 = hero.linea1[lang], l2 = hero.linea2[lang];
  const largo = Math.max(l1.length, l2.length) > 12;
  return (
    <header className="c-hero" aria-labelledby="cs-h1">
      <div className="c-ghost" aria-hidden="true">{hero.fantasma}</div>
      <div className="c-in">
        <div className="c-copy">
          <nav className="miga" aria-label={TX.estasEn[lang]}>
            <a href={enlace(lang, "/#proyectos")}>{TX.proyectos[lang]}</a><i>/</i>
            {caso.categoria === "plataforma" && <><a href={enlace(lang, "/#plataformas")}>{TX.plataformas[lang]}</a><i>/</i></>}
            <span>{caso.confidencial ? TX.casoConfidencial[lang] : TX.caso[lang]}</span>
          </nav>
          <h1 id="cs-h1" className={largo ? "largo" : undefined}>{l1} <span className="pk">{l2}</span></h1>
          <p className="c-frase">{hero.frase[lang]}</p>
          <div className="pills">{hero.pastillas.map((p, i) => <span key={i} className="pill">{p[lang]}</span>)}</div>
          <div className="c-acts">
            <a className="btn" href="#sistema">{TX.loQueConstruimos[lang]} <FlechaAbajo /></a>
            {hero.enlace && <Enlace className="lnk" href={/^[/]/.test(hero.enlace.href) ? enlace(lang, hero.enlace.href) : hero.enlace.href}>{hero.enlace.texto[lang]}</Enlace>}
          </div>
        </div>
        <div className="escena" role="img" aria-label={`${caso.nombre[lang]}. ${TX.webRecorre[lang]}`}>
          <div className="nave">
            <div className="nave-barra" aria-hidden="true"><i /><i /><i /><span>{hero.web.barra}</span></div>
            <div className="recorre" style={{ backgroundImage: `url(${hero.web.escritorio})` }} />
          </div>
          {hero.web.celular && <div className="tel"><div className="recorre" style={{ backgroundImage: `url(${hero.web.celular})` }} /></div>}
          {hero.web.flota && (
            <div className="flota"><span className="sello">{hero.web.flota.sello[lang]}</span><img src={hero.web.flota.img} alt="" loading="lazy" decoding="async" /></div>
          )}
        </div>
      </div>
    </header>
  );
};

/* ── 2 · Lo que producimos ── */
export const Producimos = ({ caso, lang }: P) => (
  <section id="producimos" aria-labelledby="cs-s-prod">
    <span className="eyebrow rv">{TX.producimos[lang]}</span>
    <h2 id="cs-s-prod" className="rv">{caso.producimos.titulo[lang]}</h2>
    <div className="prod-grid">
      {caso.producimos.items.map((it, i) => (
        <article key={i} className="prod-it rv">
          <span className="prod-ic"><IconoEntregableSvg icono={it.icono} /></span>
          <b>{it.nombre[lang]}</b>
          <p>{it.texto[lang]}</p>
        </article>
      ))}
    </div>
    {caso.hero.reserva && <p className="fine rv">{caso.hero.reserva[lang]}</p>}
  </section>
);

/* ── 3 · Qué hace Monza aquí ── */
export const Hace = ({ caso, lang }: P) => (
  <section id="hace" aria-labelledby="cs-s-hace">
    <span className="eyebrow rv">{TX.hace[lang]}</span>
    <h2 id="cs-s-hace" className="rv">{caso.hace.titulo[lang]}</h2>
    <ol className="hace-lista">
      {caso.hace.items.map((it, i) => <li key={i} className="rv"><b>{it.verbo[lang]}</b><span>{it.texto[lang]}</span></li>)}
    </ol>
  </section>
);

/* ── 4 · El punto de partida ── */
export const Reto = ({ caso, lang }: P) => (
  <section aria-labelledby="cs-s-reto">
    <span className="eyebrow rv">{TX.partida[lang]}</span>
    <h2 id="cs-s-reto" className="rv">{caso.reto.titulo[lang]}</h2>
    <div className="reto">
      {caso.reto.items.map((it, i) => (
        <article key={i} className="rv">
          <span className="n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <h3>{it.titulo[lang]}</h3>
          <p>{it.texto[lang]}</p>
        </article>
      ))}
    </div>
  </section>
);

/* ── 7 · Así se ve ── */
const CLASE_FORMA: Record<string, string> = { web: "g-web", alta: "g-alto", ancha: "g-ancho", cel: "g-alto cel-fig", completa: "g-full", tira: "g-tira" };

export const Galeria = ({ caso, lang }: P) => {
  const pista = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLElement>(null);
  useEffect(() => {
    const g = pista.current, th = barra.current;
    if (!g || !th) return;
    const upd = () => {
      const max = g.scrollWidth - g.clientWidth;
      const f = g.clientWidth / Math.max(g.scrollWidth, 1);
      th.style.width = `${f * 100}%`;
      th.style.transform = `translateX(${max > 0 ? (g.scrollLeft / max) * ((1 - f) / f) * 100 : 0}%)`;
    };
    g.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    upd();
    return () => { g.removeEventListener("scroll", upd); window.removeEventListener("resize", upd); };
  }, []);
  return (
    <section aria-labelledby="cs-s-gal">
      <span className="eyebrow rv">{TX.asiSeVe[lang]}</span>
      <h2 id="cs-s-gal" className="rv">{caso.galeria.titulo[lang]}</h2>
      <div className="gal rv" ref={pista}>
        {caso.galeria.items.map((it, i) => (
          <figure key={i} className={it.forma ? CLASE_FORMA[it.forma] : undefined}>
            <img src={it.src} alt={it.alt[lang]} loading="lazy" decoding="async" style={it.posicion ? { objectPosition: it.posicion } : undefined} />
            <figcaption>{it.pie[lang]}</figcaption>
          </figure>
        ))}
      </div>
      <div className="gal-foot"><div className="gal-bar" aria-hidden="true"><i ref={barra} /></div><span className="gal-hint">{TX.desliza[lang]}</span></div>
      {caso.galeria.nota && <p className="fine rv">{caso.galeria.nota[lang]}</p>}
    </section>
  );
};

/* ── 8 · Lo que cambió ── */
const esPalabra = (cifra: string) => /[a-zA-ZÀ-ÿ]{3,}/.test(cifra);
export const Cambio = ({ caso, lang }: P) => (
  <section aria-labelledby="cs-s-cambio">
    <span className="eyebrow rv">{TX.cambio[lang]}</span>
    <h2 id="cs-s-cambio" className="rv">{caso.cambio.titulo[lang]}</h2>
    <div className="cambio">
      {caso.cambio.items.map((it, i) => {
        const txt = it.texto[lang];
        const sep = /^[\s,.:;]/.test(txt) ? "" : " ";
        const cifra = typeof it.cifra === "string" ? it.cifra : it.cifra[lang];
        return (
          <article key={i} className="rv">
            <span className={`num${esPalabra(cifra) ? " palabra" : ""}`}>{cifra}</span>
            <p><b>{it.negrita[lang]}</b>{sep}{txt}</p>
          </article>
        );
      })}
    </div>
  </section>
);

/* ── 9 · Otros casos ── */
export const Otros = ({ caso, lang }: P) => {
  const otros = otrosCasos(caso.slug);
  if (!otros.length) return null;
  return (
    <section aria-labelledby="cs-s-otros">
      <span className="eyebrow rv">{TX.otros[lang]}</span>
      <h2 id="cs-s-otros" className="rv">{TX.sigueMirando[lang]}</h2>
      <div className="otros">
        {otros.map((o) => (
          <Link key={o.slug} className="otro rv" to={enlace(lang, `/work/${o.slug}`)}>
            <div className="om"><img src={o.tarjeta.imagen} alt="" loading="lazy" decoding="async" /></div>
            <div className="oi"><span className="ot">{o.tarjeta.etiqueta[lang]}</span><b>{o.nombre[lang]}</b><span className="og">{TX.verCaso[lang]}</span></div>
          </Link>
        ))}
      </div>
    </section>
  );
};

/* ── 10 · Cierre (negro: el rosa es de Sessions) ── */
export const Cierre = ({ caso, lang }: P) => {
  const { cierre } = caso;
  const mensaje = TX.waCaso[lang].replace("{n}", caso.nombre[lang]);
  const href = cierre.enlace.href;
  return (
    <section className="c-cierre" aria-labelledby="cs-s-cierre">
      <div className="cc-in">
        <span className="eyebrow rv">{(cierre.eyebrow ?? TX.hablemos)[lang]}</span>
        <h2 id="cs-s-cierre" className="rv">{cierre.titulo[lang]} <span className="box rosa-box">{cierre.resaltado[lang]}</span></h2>
        <p className="lede rv">{cierre.lede[lang]}</p>
        <div className="cc-acts rv">
          <a className="btn" href={whatsAppUrl(mensaje)} target="_blank" rel="noopener" onClick={() => trackContact("whatsapp", `caso_${caso.slug}`)}>
            <IconoWhatsApp />{TX.escribir[lang]}
          </a>
          {href.startsWith("/") && !href.includes("#")
            ? <Link className="lnk" to={enlace(lang, href)}>{cierre.enlace.texto[lang]}</Link>
            : <Enlace className="lnk" href={href.startsWith("/") ? enlace(lang, href) : href}>{cierre.enlace.texto[lang]}</Enlace>}
        </div>
      </div>
    </section>
  );
};
