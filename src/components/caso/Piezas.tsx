/* «Pieza por pieza»: pestañas + diagrama de nodos alrededor de un centro + un panel por pieza.
 * Se recorre sola mientras se ve y nadie la toca; en el prerender queda quieta en la primera.
 * Todos los paneles quedan en el HTML (solo se ve el activo), así Google y los asistentes leen todo. */
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { Caso, Visual } from "@/data/casos/tipos";
import type { Lang } from "@/i18n/types";
import { enPrerender } from "@/lib/prerender";
import { cablesFuentes, HUB_PIEZAS, LIENZO, layoutPiezas } from "./diagrama";
import { TX } from "./textos";

const quieto = () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const VisualPieza = ({ v, lang }: { v: Visual; lang: Lang }) => {
  switch (v.tipo) {
    case "cubre":
      return <img className="cubre" src={v.src} alt={v.alt[lang]} loading="lazy" decoding="async" style={v.posicion ? { objectPosition: v.posicion } : undefined} />;
    case "cel":
      return <img className="cel" src={v.src} alt={v.alt[lang]} loading="lazy" decoding="async" />;
    case "par":
      return (
        <>
          <img className="look b" src={v.atras} alt="" loading="lazy" decoding="async" />
          <img className="look" src={v.frente} alt={v.alt[lang]} loading="lazy" decoding="async" />
        </>
      );
    case "grande":
      return <div className="grande" aria-hidden="true">{v.texto}<small>{v.sub[lang]}</small></div>;
    case "fuentes":
      return (
        <div className="fuentes" aria-hidden="true">
          <div className="fila">{v.fuentes.map((f, i) => <span key={i}>{f[lang]}</span>)}</div>
          <svg viewBox="0 0 120 34" fill="none" stroke="#F8B4D9" strokeWidth={1.6} strokeDasharray="4 4">
            {cablesFuentes(v.fuentes.length).map((d, i) => <path key={i} d={d} />)}
          </svg>
          <b>{v.total[lang]}</b>
        </div>
      );
    default:
      return null;
  }
};

/** «01 · Tienda en línea»; si el dato ya trae el número, no se repite. */
const clave = (k: number, texto: string) => (/^\d{2}\s·/.test(texto) ? texto : `${String(k + 1).padStart(2, "0")} · ${texto}`);

const Piezas = ({ caso, lang }: { caso: Caso; lang: Lang }) => {
  const { items, centro, centroSub } = caso.piezas;
  const N = items.length;
  const nodos = useMemo(() => layoutPiezas(N), [N]);
  const [actual, setActual] = useState(0);
  const [tocado, setTocado] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const pestanas = useRef<HTMLDivElement>(null);
  const mapa = useRef<HTMLDivElement>(null);

  const ver = (i: number, desdeUsuario = false) => {
    setActual(((i % N) + N) % N);
    if (desdeUsuario) setTocado(true);
  };

  // la pestaña activa se asoma en la barra (en el celular la barra se desliza)
  useEffect(() => {
    const barra = pestanas.current;
    const tab = barra?.children[actual] as HTMLElement | undefined;
    if (barra && tab && barra.scrollWidth > barra.clientWidth) barra.scrollTo({ left: Math.max(0, tab.offsetLeft - barra.offsetLeft - 8), behavior: quieto() ? "auto" : "smooth" });
  }, [actual]);

  // mientras nadie la toque, recorre las piezas sola cuando se ve
  useEffect(() => {
    if (tocado || N < 2 || enPrerender() || quieto() || !("IntersectionObserver" in window) || !raiz.current) return;
    let reloj: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(reloj);
      if (e.isIntersecting) reloj = window.setInterval(() => setActual((a) => (a + 1) % N), 4200);
    }, { threshold: 0.45 });
    io.observe(raiz.current);
    return () => { io.disconnect(); window.clearInterval(reloj); };
  }, [tocado, N]);

  const teclas = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const sig = (actual + (e.key === "ArrowRight" ? 1 : -1) + N) % N;
    ver(sig, true);
    (pestanas.current?.children[sig] as HTMLElement | undefined)?.focus();
  };

  const irDesdePanel = (paso: number) => {
    ver(actual + paso, true);
    if (window.innerWidth < 960) mapa.current?.scrollIntoView({ behavior: quieto() ? "auto" : "smooth", block: "start" });
  };

  const cx = LIENZO.ancho / 2;
  return (
    <div className="sis rv" id="sis" data-i={actual} ref={raiz}>
      <div className="sis-mapa" ref={mapa}>
        <div className="sis-tabs" role="tablist" aria-label={TX.piezasSistema[lang]} ref={pestanas} onKeyDown={teclas}>
          {items.map((it, k) => (
            <button key={k} type="button" role="tab" id={`cs-pt-${k}`} aria-selected={k === actual} aria-controls={`cs-pp-${k}`} tabIndex={k === actual ? 0 : -1} onClick={() => ver(k, true)}>
              {it.pestana[lang]}
            </button>
          ))}
        </div>
        <svg className="mapa" viewBox={`0 0 ${LIENZO.ancho} ${LIENZO.alto}`} aria-hidden="true">
          {nodos.map((n, k) => <path key={`a${k}`} className={`arista${k === actual ? " on" : ""}`} d={n.arista} />)}
          <g className="hub">
            <rect x={HUB_PIEZAS.x} y={HUB_PIEZAS.y} width={HUB_PIEZAS.ancho} height={HUB_PIEZAS.alto} rx={16} />
            <text className="ht" x={cx} y={153}>{centro[lang]}</text>
            <text className="hs" x={cx} y={172}>{centroSub[lang]}</text>
          </g>
          {nodos.map((n, k) => (
            <g key={`n${k}`} className={`nodo${k === actual ? " on" : ""}`} onClick={() => ver(k, true)}>
              <rect x={n.x} y={n.y} width={n.ancho} height={n.alto} rx={12} />
              <text x={n.cx} y={n.cy}>{items[k].pestana[lang]}</text>
            </g>
          ))}
        </svg>
        <p className="sis-leyenda">{TX.leyendaPiezas[lang]}</p>
      </div>

      <div className="sis-paneles">
        {items.map((it, k) => (
          <article key={k} className={`panel${k === actual ? " on" : ""}`} id={`cs-pp-${k}`} role="tabpanel" aria-labelledby={`cs-pt-${k}`}>
            <div className="pa-vis"><VisualPieza v={it.visual} lang={lang} /></div>
            <div className="pa-txt">
              <span className="k">{clave(k, it.clave[lang])}</span>
              <h3>{it.titulo[lang]}</h3>
              <p>{it.texto[lang]}</p>
              <p className="resuelve"><b>{TX.leResuelve[lang]}</b>{it.resuelve[lang]}</p>
              <div className="pa-nav">
                <button type="button" onClick={() => irDesdePanel(-1)}>{TX.anterior[lang]}</button>
                <button type="button" onClick={() => irDesdePanel(1)}>{k === N - 1 ? TX.otraVez[lang] : TX.siguiente[lang]}</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Piezas;
