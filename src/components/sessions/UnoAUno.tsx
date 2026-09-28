/* Sessions 1:1: tres meses sobre tu rol. A la izquierda el mapa (lo que entra a tu espacio y lo que
 * sale), a la derecha los meses. En el celular se ve un mes a la vez con «Siguiente mes»; en el
 * computador el mes que está en el centro de la pantalla enciende su parte del mapa. */
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/i18n/types";
import { UNO } from "./datos";
import { quieto } from "./comun";

type F = "1" | "2" | "3" | "all";

/* las cajas de arriba y de abajo: x del centro y el mes que las enciende */
const ARRIBA = [{ x: 43, f: "1" }, { x: 129, f: "2" }, { x: 215, f: "3" }, { x: 301, f: "3" }] as const;
const ABAJO = [{ x: 43, f: "1" }, { x: 129, f: "2" }, { x: 215, f: "3" }, { x: 301, f: "3" }] as const;
const ENTRA = [
  { d: "M43 56 C43 96 134 92 134 130", f: "1" },
  { d: "M129 56 C129 96 158 92 158 130", f: "2" },
  { d: "M215 56 C215 96 184 92 184 130", f: "3" },
  { d: "M301 56 C301 96 208 92 208 130", f: "3" },
  { d: "M134 206 C134 240 43 236 43 272", f: "1" },
  { d: "M158 206 C158 240 129 236 129 272", f: "2" },
  { d: "M184 206 C184 240 215 236 215 272", f: "3" },
  { d: "M208 206 C208 240 301 236 301 272", f: "3" },
] as const;

const UnoAUno = ({ L }: { L: Lang }) => {
  const raiz = useRef<HTMLDivElement>(null);
  const mapa = useRef<HTMLDivElement>(null);
  const [f, setF] = useState<F>("1");
  const [js, setJs] = useState(false);
  const meses = UNO.meses[L];
  const nodos = UNO.nodos[L];
  const tabs = UNO.tabs[L];

  useEffect(() => { setJs(true); }, []);

  // en el computador, el mes que llega al centro de la pantalla se enciende solo
  useEffect(() => {
    const el = raiz.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const ancho = window.matchMedia("(min-width: 960px)");
    const io = new IntersectionObserver(
      (es) => { if (!ancho.matches) return; es.forEach((e) => { if (e.isIntersecting) setF((e.target as HTMLElement).dataset.f as F); }); },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    el.querySelectorAll<HTMLElement>(".ss-fase").forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [L]);

  const siguiente = (i: number) => {
    setF(i < 2 ? (String(i + 2) as F) : "all");
    if (!window.matchMedia("(min-width: 960px)").matches) mapa.current?.scrollIntoView({ behavior: quieto() ? "auto" : "smooth", block: "start" });
  };

  return (
    <section id="uno-a-uno" aria-labelledby="ss-plan">
      <span className="eyebrow rv">{UNO.eyebrow[L]}</span>
      <h2 id="ss-plan" className="rv">{UNO.titulo[L]}</h2>
      <p className="lede rv">{UNO.lede[L]}</p>

      <div className="ss-fases" data-f={f} data-js={js ? "" : undefined} ref={raiz}>
        <div className="ss-fasesmap rv" ref={mapa} style={{ scrollMarginTop: 80 }}>
          <div className="ss-tabs" role="group" aria-label={UNO.verMes[L]}>
            {(["1", "2", "3", "all"] as F[]).map((k, i) => (
              <button type="button" key={k} aria-pressed={f === k} onClick={() => setF(k)}>{tabs[i]}</button>
            ))}
          </div>
          <svg className="ss-map" viewBox="0 0 340 330" role="img" aria-label={UNO.mapaAria[L]}>
            {ENTRA.map((e, i) => <path key={i} className={`ss-edge ss-f${e.f}`} d={e.d} />)}
            {ARRIBA.map((n, i) => (
              <g className={`ss-node ss-f${n.f}`} key={`a${i}`}>
                <rect x={n.x - 39} y={12} width={78} height={44} rx={10} />
                <text x={n.x} y={39}>{nodos.arriba[i]}</text>
              </g>
            ))}
            <g className="ss-hub">
              <rect x={104} y={130} width={132} height={76} rx={14} />
              <text className="ss-ht" x={170} y={164}>{nodos.centro[0]}</text>
              <text className="ss-hs" x={170} y={184}>{nodos.centro[1]}</text>
            </g>
            {ABAJO.map((n, i) => (
              <g className={`ss-node ss-f${n.f}`} key={`b${i}`}>
                <rect x={n.x - 39} y={272} width={78} height={44} rx={10} />
                <text x={n.x} y={299}>{nodos.abajo[i]}</text>
              </g>
            ))}
          </svg>
          <p className="ss-maplegend">{UNO.leyenda[L]}</p>
        </div>

        <div className="ss-faseslist">
          {meses.map((m, i) => {
            const k = String(i + 1);
            return (
              <article className={`ss-fase${f === k ? " ss-on" : ""}`} data-f={k} key={k} onClick={() => setF(k as F)}>
                <span className="ss-k">{m.clave}</span>
                <h3>{m.titulo}</h3>
                <ol className="ss-ent">
                  {m.entregables.map((e) => (
                    <li key={e.n}><span className="ss-n">{e.n}</span><span><b>{e.b}</b> {e.t}</span></li>
                  ))}
                </ol>
                {m.nota && <p className="ss-dep">{m.nota}</p>}
                <p className="ss-queda"><b>{UNO.queda[L]}</b>{m.queda}</p>
                <button className="ss-next" type="button" onClick={(ev) => { ev.stopPropagation(); siguiente(i); }}>{m.siguiente}</button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UnoAUno;
