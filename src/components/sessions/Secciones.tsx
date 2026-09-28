/* Las secciones del medio de Sessions: para quién, hoy / después, los formatos, cómo funciona
 * y por qué así. */
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/i18n/types";
import { enPrerender } from "@/lib/prerender";
import { trackContact, whatsAppUrl } from "@/lib/pixel";
import { COMO, FORMATOS, PORQUE, QUIEN, SALES_CON, SEMANA } from "./datos";
import { irA, quieto } from "./comun";

const dos = (n: number) => String(n).padStart(2, "0");

export const ParaQuien = ({ L }: { L: Lang }) => (
  <section aria-labelledby="ss-quien">
    <span className="eyebrow rv">{QUIEN.eyebrow[L]}</span>
    <h2 id="ss-quien" className="rv">{QUIEN.titulo[L]}</h2>
    <p className="lede rv">{QUIEN.lede[L]}</p>
    <div className="ss-quien">
      {QUIEN.items.map((q, i) => (
        <article className="ss-qn rv" key={i}>
          <span className="ss-n">{dos(i + 1)}</span>
          <h3>{q.titulo[L]}</h3>
          <p>{q.texto[L]}</p>
        </article>
      ))}
    </div>
  </section>
);

/** Hoy / Después: la primera vez que se ve, cambia sola a «Después» (si nadie la tocó). */
export const HoyDespues = ({ L }: { L: Lang }) => {
  const caja = useRef<HTMLDivElement>(null);
  const tocado = useRef(false);
  const [lado, setLado] = useState<"hoy" | "luego">("hoy");

  useEffect(() => {
    const el = caja.current;
    if (!el || enPrerender() || quieto() || !("IntersectionObserver" in window)) return;
    let t = 0;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        t = window.setTimeout(() => { if (!tocado.current) setLado("luego"); }, 2600);
      }),
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  const poner = (s: "hoy" | "luego") => () => { tocado.current = true; setLado(s); };

  return (
    <section aria-labelledby="ss-semana">
      <span className="eyebrow rv">{SEMANA.eyebrow[L]}</span>
      <h2 id="ss-semana" className="rv">{SEMANA.titulo[L]}</h2>
      <div className="ss-swap rv" data-s={lado} ref={caja}>
        <div className="ss-swbtns" role="group" aria-label={SEMANA.comparar[L]}>
          <span className="ss-pill" aria-hidden="true" />
          <button type="button" aria-pressed={lado === "hoy"} onClick={poner("hoy")}>{SEMANA.hoy[L]}</button>
          <button type="button" aria-pressed={lado === "luego"} onClick={poner("luego")}>{SEMANA.despues[L]}</button>
        </div>
        <ul className="ss-swlist" aria-live="polite">
          {SEMANA.filas.map((f, i) => {
            const [antes, fuerte, despues] = f.b[L];
            return (
              <li key={i}>
                <span className="ss-n">{dos(i + 1)}</span>
                <span className="ss-swcell">
                  <span className="ss-a" aria-hidden={lado === "luego"}>{f.a[L]}</span>
                  <span className="ss-b" aria-hidden={lado === "hoy"}>{antes}<em>{fuerte}</em>{despues}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export const Formatos = ({ L }: { L: Lang }) => (
  <section id="formatos" aria-labelledby="ss-formatos">
    <span className="eyebrow rv">{FORMATOS.eyebrow[L]}</span>
    <h2 id="ss-formatos" className="rv">{FORMATOS.titulo[L]}</h2>
    <p className="lede rv">{FORMATOS.lede[L]}</p>
    <div className="ss-formatos">
      {FORMATOS.items.map((f, i) => (
        <article className={`ss-fm rv${f.destacado ? " ss-hi" : ""}`} key={i}>
          <span className="ss-fmn" aria-hidden="true">{dos(i + 1)}</span>
          <span className="ss-k">{f.clave[L]}</span>
          <h3>{f.titulo[L]}</h3>
          <div className="ss-fmmeta">{f.meta[L].map((m) => <span key={m}>{m}</span>)}</div>
          <p>{f.texto[L]}</p>
          <p className="ss-fmsale"><b>{SALES_CON[L]}</b><span>{f.sale[L]}</span></p>
          {f.wa ? (
            <a className="lnk" href={whatsAppUrl(f.wa[L])} target="_blank" rel="noopener noreferrer" onClick={() => trackContact("whatsapp", f.fuente)}>
              {f.cta[L]}
            </a>
          ) : (
            <a className="lnk" href={`#${f.ancla}`} onClick={irA(f.ancla ?? "")}>{f.cta[L]}</a>
          )}
        </article>
      ))}
    </div>
  </section>
);

export const ComoFunciona = ({ L }: { L: Lang }) => (
  <section aria-labelledby="ss-como">
    <span className="eyebrow rv">{COMO.eyebrow[L]}</span>
    <h2 id="ss-como" className="rv">{COMO.titulo[L]}</h2>
    <p className="lede rv">{COMO.lede[L]}</p>
    <ol className="ss-path">
      {COMO.pasos.map((p, i) => (
        <li className="rv" key={i}>
          <span className="ss-dotn">{i}</span>
          <div>
            <h3>{p.titulo[L]}</h3>
            <span className="ss-tag">{p.tag[L]}</span>
            <p>{p.texto[L]}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export const PorQue = ({ L }: { L: Lang }) => {
  const [antes, fuerte] = PORQUE.manifiesto[L];
  const [col1, col2] = PORQUE.encabezado[L];
  return (
    <section aria-labelledby="ss-porque">
      <span className="eyebrow rv">{PORQUE.eyebrow[L]}</span>
      <p id="ss-porque" className="ss-manif rv">{antes}<em>{fuerte}</em></p>
      <div className="ss-cmp rv" role="table" aria-label={PORQUE.tablaAria[L]}>
        <div className="ss-h" role="row"><s role="columnheader">{col1}</s><span role="columnheader">{col2}</span></div>
        {PORQUE.filas[L].map(([a, b]) => (
          <div role="row" key={a}><s role="cell">{a}</s><span role="cell">{b}</span></div>
        ))}
      </div>
    </section>
  );
};
