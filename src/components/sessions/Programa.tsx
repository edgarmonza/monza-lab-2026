/* El Bootcamp, semana a semana: ocho pestañas y un panel que cambia. En el prerender queda en la
 * semana 1 (los títulos de las ocho quedan en las pestañas). */
import { useState } from "react";
import type { Lang } from "@/i18n/types";
import { PROGRAMA, SALES_CON } from "./datos";

const Programa = ({ L }: { L: Lang }) => {
  const semanas = PROGRAMA.semanas[L];
  const [cur, setCur] = useState(0);
  const w = semanas[cur];
  const ir = (i: number) => setCur(Math.min(semanas.length - 1, Math.max(0, i)));

  return (
    <section id="programa" aria-labelledby="ss-prog">
      <span className="eyebrow rv">{PROGRAMA.eyebrow[L]}</span>
      <h2 id="ss-prog" className="rv">{PROGRAMA.titulo[L]}</h2>
      <div className="ss-prog rv">
        <div className="ss-wktabs" role="group" aria-label={PROGRAMA.escoger[L]}>
          {semanas.map((s, i) => (
            <button type="button" key={i} aria-pressed={i === cur} onClick={() => ir(i)}>
              <span>{PROGRAMA.semana[L]} {i + 1}</span>
              <b>{s.k}</b>
            </button>
          ))}
          <div className="ss-wkbar" aria-hidden="true"><i style={{ width: `${((cur + 1) / semanas.length) * 100}%` }} /></div>
        </div>
        <article className="ss-wkpanel ss-swapin" key={cur} aria-live="polite">
          <span className="ss-k">{PROGRAMA.semana[L]} {cur + 1} · {w.k}</span>
          <h3>{w.t}</h3>
          <ul>{w.l.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="ss-ejer"><b>{PROGRAMA.ejercicio[L]}</b><span>{w.e}</span></p>
          <p className="ss-sale"><b>{SALES_CON[L]}</b><span>{w.s}</span></p>
          <div className="ss-wknav">
            <button type="button" disabled={cur === 0} onClick={() => ir(cur - 1)}>{PROGRAMA.anterior[L]}</button>
            <button type="button" disabled={cur === semanas.length - 1} onClick={() => ir(cur + 1)}>{PROGRAMA.siguiente[L]}</button>
          </div>
        </article>
      </div>
      <p className="fine rv">{PROGRAMA.nota[L]}</p>
    </section>
  );
};

export default Programa;
