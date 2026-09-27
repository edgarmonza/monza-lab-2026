/* El ecosistema de /shopify: la tienda en el centro y las ocho piezas alrededor, conectadas.
 *
 * Primero el celular: la órbita es un cuadrado que llena el ancho y debajo va el relato, en letra
 * grande. El diagrama se recorre solo, pieza por pieza, contando lo que gana la tienda con cada
 * una; si alguien toca una pieza, el recorrido se queda ahí y se sigue con el botón. Fuera de
 * pantalla se detiene. Con movimiento reducido no hay recorrido ni luz en los cables. */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Camera, LayoutGrid, Pause, Play, Store, UsersRound } from "lucide-react";
import type { Lang } from "@/i18n/types";
import { GlifoMarca } from "../pantalla/iconos";
import { CENTRO, COPY_ECO, PIEZAS, orbita, type IdPieza } from "./piezas";

const PASO = 3600; // ms que se queda cada pieza en el recorrido
const RADIO = 38; // % del cuadro

const ICONO: Record<IdPieza, ReactNode> = {
  whatsapp: <GlifoMarca marca="whatsapp" />,
  instagram: <GlifoMarca marca="instagram" />,
  pauta: <GlifoMarca marca="meta" />,
  numeros: <GlifoMarca marca="analytics" />,
  clientes: <UsersRound strokeWidth={1.7} aria-hidden="true" />,
  fotos: <Camera strokeWidth={1.7} aria-hidden="true" />,
  catalogo: <LayoutGrid strokeWidth={1.7} aria-hidden="true" />,
  tiendas: <Store strokeWidth={1.7} aria-hidden="true" />,
};

const prefiereQuieto = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const Ecosistema = ({ lang }: { lang: Lang }) => {
  const [quieto] = useState(prefiereQuieto);
  const [activa, setActiva] = useState(0);
  const [pausa, setPausa] = useState(false);
  const [enVista, setEnVista] = useState(false);
  const seccion = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  // Solo corre mientras se ve.
  useEffect(() => {
    const el = seccion.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setEnVista(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setEnVista(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const corriendo = !quieto && !pausa && enVista;

  useEffect(() => {
    if (!corriendo) return;
    const id = window.setInterval(() => setActiva((a) => (a + 1) % PIEZAS.length), PASO);
    return () => window.clearInterval(id);
  }, [corriendo, activa]);

  // La luz de los cables (SMIL) se detiene con el recorrido.
  useEffect(() => {
    const s = svg.current;
    if (!s || typeof s.pauseAnimations !== "function") return;
    if (corriendo) s.unpauseAnimations();
    else s.pauseAnimations();
  }, [corriendo]);

  const elegir = (i: number) => {
    setActiva(i);
    setPausa(true);
  };

  const pieza = PIEZAS[activa];

  return (
    <section ref={seccion} className="relative py-16 md:py-28" aria-labelledby="eco-titulo">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p className="font-clash text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-medium mb-4" style={{ color: "#F8B4D9c0" }}>
          {COPY_ECO.antetitulo[lang]}
        </p>
        <h2
          id="eco-titulo"
          className="font-clash font-bold mb-5 max-w-[18ch] [text-wrap:balance]"
          style={{ fontSize: "clamp(28px, 4.4vw, 50px)", letterSpacing: "-0.02em", lineHeight: 1.06, color: "rgba(var(--text-rgb), 0.94)" }}
        >
          {COPY_ECO.titulo[lang]}
        </h2>
        <p className="font-clash text-[15px] md:text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(var(--text-rgb), 0.6)" }}>
          {COPY_ECO.sub[lang]}
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] gap-8 lg:gap-16 items-center">
          <div className="eco-orbita relative mx-auto w-full max-w-[470px] aspect-square" role="group" aria-label={COPY_ECO.piezas[lang]}>
            <svg ref={svg} viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true" focusable="false">
              <circle cx="50" cy="50" r={RADIO} className="eco-anillo" />
              {PIEZAS.map((p, i) => {
                const { x, y } = orbita(i, PIEZAS.length, RADIO);
                return (
                  <g key={p.id}>
                    <line x1="50" y1="50" x2={x} y2={y} className={`eco-cable ${i === activa ? "is-on" : ""}`} />
                    {!quieto && (
                      <>
                        <circle r="0.85" className="eco-pulso">
                          <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${(i * 0.33).toFixed(2)}s`} path={`M50,50 L${x.toFixed(2)},${y.toFixed(2)}`} />
                        </circle>
                        <circle r="0.6" className="eco-pulso eco-pulso--vuelta">
                          <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${(i * 0.33 + 1.3).toFixed(2)}s`} path={`M${x.toFixed(2)},${y.toFixed(2)} L50,50`} />
                        </circle>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            <div className="eco-centro" aria-hidden="true">
              <span className="eco-centro-icono">
                <GlifoMarca marca="shopify" />
              </span>
              <span className="eco-centro-nombre">{CENTRO.nombre[lang]}</span>
            </div>

            {PIEZAS.map((p, i) => {
              const { x, y } = orbita(i, PIEZAS.length, RADIO);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => elegir(i)}
                  aria-label={`${p.nombre[lang]}: ${p.titulo[lang]}`}
                  aria-pressed={i === activa}
                  className={`eco-pieza ${i === activa ? "is-on" : ""}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span className="eco-pieza-icono">{ICONO[p.id]}</span>
                  <span className="eco-pieza-nombre">{p.nombre[lang]}</span>
                </button>
              );
            })}
          </div>

          <div className="eco-relato">
            <p className="eco-kicker">
              {String(activa + 1).padStart(2, "0")} / {String(PIEZAS.length).padStart(2, "0")} · {pieza.nombre[lang]}
            </p>
            <div key={activa} className="eco-entra">
              <h3 className="eco-titulo">{pieza.titulo[lang]}</h3>
              <p className="eco-texto">{pieza.texto[lang]}</p>
            </div>
            {!quieto && (
              <div className="flex items-center gap-3 mt-7">
                <button
                  type="button"
                  onClick={() => setPausa((v) => !v)}
                  aria-pressed={pausa}
                  aria-label={pausa ? COPY_ECO.seguir[lang] : COPY_ECO.pausar[lang]}
                  className="pantalla-pausa shrink-0 grid place-items-center w-11 h-11 rounded-full"
                >
                  {pausa ? <Play className="w-3.5 h-3.5 translate-x-[1px]" strokeWidth={2.2} /> : <Pause className="w-3.5 h-3.5" strokeWidth={2.2} />}
                </button>
                <div className="eco-segmentos" aria-hidden="true">
                  {PIEZAS.map((p, i) => (
                    <span key={p.id} className={i < activa ? "is-lleno" : ""}>
                      {i === activa && <i key={`${activa}-${pausa}`} className={corriendo ? "" : "is-quieto"} style={{ animationDuration: `${PASO}ms` }} />}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Todo el texto, para buscadores y lectores de pantalla */}
        <ul className="sr-only">
          {PIEZAS.map((p) => (
            <li key={p.id}>
              {p.nombre[lang]}: {p.titulo[lang]}. {p.texto[lang]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Ecosistema;
