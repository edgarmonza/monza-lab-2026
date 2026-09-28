/* «La tecnología»: el mapa de herramientas (anillo de afuera) y la IA (en rosa, arriba y abajo del
 * centro), con un cable por cada par que se habla y luces que viajan por los cables de la IA.
 * Tocar un nodo lo enciende con sus vecinos y lo explica en el panel. Se recorre solo mientras se
 * ve y nadie lo toca; en el prerender queda quieto en el primero y sin luces. */
import { useEffect, useMemo, useRef, useState } from "react";
import type { Caso } from "@/data/casos/tipos";
import type { Lang } from "@/i18n/types";
import { enPrerender } from "@/lib/prerender";
import { aroIA, cablesTecnologia, iniciales, ordenRecorrido, posicionesTecnologia, radioFuera, vecinos } from "./diagrama";
import { CascoMini, Chispa } from "./iconos";
import { TX } from "./textos";

const quieto = () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esAngosto = () => typeof window !== "undefined" && window.innerWidth < 640;
const ICONO = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${slug}.svg`;

const Tecnologia = ({ caso, lang }: { caso: Caso; lang: Lang }) => {
  const { nodos, centro } = caso.tecnologia;
  const ia = nodos.filter((n) => n.tipo === "ia");
  const [angosto, setAngosto] = useState(esAngosto);
  useEffect(() => {
    const f = () => setAngosto(esAngosto());
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  const pos = useMemo(() => posicionesTecnologia(nodos, angosto), [nodos, angosto]);
  const cables = useMemo(() => cablesTecnologia(nodos, pos), [nodos, pos]);
  const orden = useMemo(() => ordenRecorrido(nodos), [nodos]);
  const [sel, setSel] = useState<string>(orden[0]);
  const [tocado, setTocado] = useState(false);
  const [sinIcono, setSinIcono] = useState<Record<string, boolean>>({});
  const [luces, setLuces] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => { setLuces(!enPrerender() && !quieto()); }, []);

  useEffect(() => {
    if (tocado || orden.length < 2 || enPrerender() || quieto() || !("IntersectionObserver" in window) || !raiz.current) return;
    let reloj: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(reloj);
      if (e.isIntersecting) reloj = window.setInterval(() => setSel((s) => orden[(orden.indexOf(s) + 1) % orden.length]), 3600);
    }, { threshold: 0.4 });
    io.observe(raiz.current);
    return () => { io.disconnect(); window.clearInterval(reloj); };
  }, [tocado, orden]);

  const elegir = (id: string) => { setSel(id); setTocado(true); };
  const cerca = useMemo(() => new Set(vecinos(nodos, sel)), [nodos, sel]);
  const nodoSel = nodos.find((n) => n.id === sel) ?? nodos[0];
  const esIA = nodoSel?.tipo === "ia";

  return (
    <div className="tec rv" id="tec" data-sel={sel} ref={raiz}>
      <div>
        <div className="tec-mapa">
          <svg className="tec-svg" viewBox="0 0 100 100" aria-hidden="true">
            <circle className="aro" cx={50} cy={50} r={radioFuera(angosto)} />
            <ellipse className="aro" cx={50} cy={50} rx={aroIA(ia.length).rx} ry={aroIA(ia.length).ry} />
            {ia.map((n) => <path key={`r-${n.id}`} className="rayo" d={`M50 50 L${pos[n.id].x.toFixed(2)} ${pos[n.id].y.toFixed(2)}`} />)}
            {cables.map((c) => <path key={`${c.a}|${c.b}`} className={`ar${c.a === sel || c.b === sel ? " on" : ""}`} d={c.d} />)}
            {luces && cables.filter((c) => c.conIA).map((c, i) => (
              <circle key={`l-${c.a}|${c.b}`} className="luz" r={0.75}>
                <animateMotion dur={`${(2 + (i % 5) * 0.35).toFixed(2)}s`} begin={`${((i * 0.37) % 2).toFixed(2)}s`} repeatCount="indefinite" path={c.d} />
              </circle>
            ))}
          </svg>
          <div className="tec-centro"><CascoMini /><b>{centro.titulo[lang]}</b><small>{centro.sub[lang]}</small></div>
          {nodos.map((n) => {
            const p = pos[n.id];
            return (
              <button
                key={n.id}
                type="button"
                className={`tec-nodo${n.tipo === "ia" ? " ia" : ""}${n.id === sel ? " on" : ""}${cerca.has(n.id) ? " cerca" : ""}`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                aria-pressed={n.id === sel}
                onClick={() => elegir(n.id)}
              >
                <span className="ic">
                  {n.tipo === "ia" ? <Chispa /> : n.icono && !sinIcono[n.id]
                    ? <img src={ICONO(n.icono)} alt="" loading="lazy" onError={() => setSinIcono((s) => ({ ...s, [n.id]: true }))} />
                    : <span className="ini">{iniciales(n.nombre[lang])}</span>}
                </span>
                <span className="largo">{n.nombre[lang]}</span>
                <span className="corto">{(n.corto ?? n.nombre)[lang]}</span>
              </button>
            );
          })}
        </div>
        <p className="tec-leyenda"><span><i />{TX.herramienta[lang]}</span><span><i className="ia" />{TX.ia[lang]}</span></p>
      </div>

      <aside className="tec-panel" aria-live="polite">
        {nodoSel?.img && <div className="tp-img"><img src={nodoSel.img} alt="" loading="lazy" decoding="async" /></div>}
        {nodoSel && (
          <div className="tp-in" key={nodoSel.id}>
            <span className={`tp-k${esIA ? " ia" : ""}`}>{esIA ? `✦ ${TX.ia[lang]}` : TX.herramienta[lang]}</span>
            <h3>{nodoSel.nombre[lang]}</h3>
            <p>{nodoSel.hace[lang]}</p>
            {cerca.size > 0 && (
              <div className="tp-con">
                <b>{TX.seConecta[lang]}</b>
                {[...cerca].map((o) => {
                  const otro = nodos.find((n) => n.id === o);
                  return otro ? <button key={o} type="button" onClick={() => elegir(o)}>{otro.nombre[lang]}</button> : null;
                })}
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};

export default Tecnologia;
