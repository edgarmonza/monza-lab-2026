/* El hero rosa de Sessions: el titular con el bloque negro y el celular con el reel
 * («toca para escuchar»). El video se reproduce mudo solo mientras se ve; en el prerender no arranca. */
import { Fragment, useEffect, useRef, useState } from "react";
import type { Lang } from "@/i18n/types";
import { enPrerender } from "@/lib/prerender";
import { HERO } from "./datos";
import { FlechaAbajo, irA, quieto } from "./comun";

const REEL = "/v2/video/sessions-reel.mp4";
const POSTER = "/v2/video/sessions-reel.jpg";

const SonidoApagado = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H2v6h4l5 4z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);
const SonidoPrendido = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H2v6h4l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M19 5a9 9 0 0 1 0 14" />
  </svg>
);

/** Las palabras con guion («KI-Videos») no se parten en dos líneas. */
const sinCorte = (t: string) =>
  t.split(/(\S*-\S*)/).map((p, i) => (i % 2 ? <span key={i} style={{ whiteSpace: "nowrap" }}>{p}</span> : p));

const HeroSessions = ({ L }: { L: Lang }) => {
  const pantalla = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [sonido, setSonido] = useState(false);

  // mudo y en bucle mientras se ve
  useEffect(() => {
    const v = video.current, p = pantalla.current;
    if (!v || !p) return;
    v.muted = true;
    if (enPrerender() || quieto() || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); },
      { threshold: 0.35 },
    );
    io.observe(p);
    return () => io.disconnect();
  }, []);

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    const prender = v.muted;
    v.muted = !prender;
    if (prender) { v.volume = 1; v.play().catch(() => {}); }
    setSonido(prender);
  };

  const franja = HERO.franja[L];

  return (
    <header className="ss-hero rosa grano" aria-labelledby="ss-h1">
      <div className="ss-ghost" aria-hidden="true">Sessions</div>
      <div className="ss-hbody">
        <div className="ss-hcopy">
          <span className="ss-heyebrow">{HERO.eyebrow[L]}</span>
          <h1 id="ss-h1">
            {sinCorte(HERO.h1[L])} <span className="box">{HERO.h1Box[L]}</span>
          </h1>
          <p className="ss-hlede">{HERO.lede[L]}</p>
          <div className="ss-hacts">
            <a className="btn dark" href="#formatos" onClick={irA("formatos")}>
              {HERO.verFormatos[L]} <FlechaAbajo />
            </a>
            <a className="lnk" href="#empezar" onClick={irA("empezar")}>{HERO.porDonde[L]}</a>
          </div>
        </div>

        <div className="ss-device">
          <div className="ss-phone">
            <button
              ref={pantalla}
              type="button"
              className={`ss-screen${sonido ? " ss-sound" : ""}`}
              onClick={alternar}
              aria-label={HERO.sonido[L]}
              aria-pressed={sonido}
            >
              <img src={POSTER} alt="" aria-hidden="true" width={540} height={960} />
              <video ref={video} muted loop playsInline preload="metadata" poster={POSTER} aria-label={HERO.asi[L]}>
                <source src={REEL} type="video/mp4" />
              </video>
              <span className="ss-hint" aria-hidden="true">{HERO.toca[L]}</span>
              <span className="ss-snd" aria-hidden="true">{sonido ? <SonidoPrendido /> : <SonidoApagado />}</span>
            </button>
          </div>
          <p className="ss-dcap">{HERO.asi[L]}</p>
        </div>
      </div>

      <div className="band" aria-hidden="true">
        <div className="band-in">
          {[0, 1].map((vuelta) =>
            franja.map((t, i) => (
              <Fragment key={`${vuelta}-${i}`}>
                <span>{t}</span><i>✦</i>
              </Fragment>
            )),
          )}
        </div>
      </div>
    </header>
  );
};

export default HeroSessions;
