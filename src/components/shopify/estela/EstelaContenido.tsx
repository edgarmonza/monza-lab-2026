/* La estela de contenido · /shopify.
 *
 * El efecto de la sección «AI Atelier» de la web de Eleonora, en Monza: una sala oscura donde las
 * fotos salen al paso del mouse (o del dedo), crecen, se quedan un momento y se desvanecen, como
 * tarjetas que caen con un leve giro. Cada tarjeta dice de quién es.
 *
 * Primero el celular: sin mouse, la sala se enciende sola con una ráfaga al entrar (menos de 5 s,
 * así no necesita botón de pausa) y después responde al dedo. Con movimiento reducido queda un
 * collage quieto. Todo es imperativo (Web Animations): React no vuelve a pintar por cada foto. */
import { useEffect, useRef, useState } from "react";
import HelmetIcon from "@/components/HelmetIcon";
import type { Lang } from "@/i18n/types";
import { COPY_ESTELA, FOTOS, PIE } from "./fotos";

const VIDA = 1600; // ms de cada foto en pantalla
const PASO_MOUSE = 110; // px que hay que mover el mouse para que salga otra
const PASO_DEDO = 80;

/** El collage de quien pide menos movimiento: índice de la foto, posición en % y giro. */
const QUIETAS = [
  { i: 0, x: 20, y: 24, r: -5 },
  { i: 1, x: 50, y: 16, r: 3 },
  { i: 2, x: 80, y: 27, r: -3 },
  { i: 5, x: 34, y: 42, r: 4 },
  { i: 4, x: 66, y: 44, r: -4 },
];

/** La ráfaga con que se enciende la sala al entrar, en fracciones del ancho y del alto. Las tres
 *  últimas se quedan quietas: sin foto de fondo (la de Eleonora sí la tiene), la sala se vería
 *  vacía cuando nadie la toca. */
type Punto = { x: number; y: number; queda?: boolean };
/** Celular: el texto ocupa todo el ancho, así que el collage queda en la franja de arriba. */
const RAFAGA_ANGOSTA: Punto[] = [
  { x: 0.3, y: 0.3 },
  { x: 0.72, y: 0.24 },
  { x: 0.5, y: 0.4 },
  { x: 0.2, y: 0.24, queda: true },
  { x: 0.52, y: 0.17, queda: true },
  { x: 0.82, y: 0.3, queda: true },
];
/** Escritorio: el texto va a la izquierda, así que el collage queda en la mitad derecha. */
const RAFAGA_ANCHA: Punto[] = [
  { x: 0.34, y: 0.22 },
  { x: 0.7, y: 0.5 },
  { x: 0.5, y: 0.3 },
  { x: 0.6, y: 0.3, queda: true },
  { x: 0.76, y: 0.2, queda: true },
  { x: 0.9, y: 0.38, queda: true },
];

const prefiereQuieto = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const conMouse = () => typeof window !== "undefined" && !!window.matchMedia?.("(pointer: fine)").matches;

const EstelaContenido = ({ lang }: { lang: Lang }) => {
  const [quieto] = useState(prefiereQuieto);
  const [mouse] = useState(conMouse);
  const seccion = useRef<HTMLElement>(null);
  const cartas = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sec = seccion.current;
    if (quieto || !sec) return;
    let idx = 0;
    let z = 10;
    let ultimo: { x: number; y: number } | null = null;
    let timers: number[] = [];

    const soltar = (x: number, y: number, queda = false) => {
      const el = cartas.current[idx % FOTOS.length];
      idx++;
      if (!el || typeof el.animate !== "function") return;
      const giro = (Math.random() * 8 - 4).toFixed(1);
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.zIndex = String(++z);
      el.getAnimations().forEach((a) => a.cancel());
      const entra = { opacity: 0, transform: `translate(-50%, -50%) scale(0.62) rotate(${giro}deg)` };
      const esta = { opacity: 1, transform: `translate(-50%, -50%) scale(1) rotate(${giro}deg)` };
      el.animate(
        queda
          ? [entra, { ...esta, offset: 0.4 }, esta]
          : [entra, { ...esta, offset: 0.14 }, { ...esta, offset: 0.62 }, { opacity: 0, transform: `translate(-50%, -50%) scale(1.06) rotate(${giro}deg)` }],
        { duration: queda ? 900 : VIDA, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", fill: "forwards" },
      );
    };
    const aLocal = (cx: number, cy: number) => {
      const r = sec.getBoundingClientRect();
      return { x: cx - r.left, y: cy - r.top };
    };
    const seguir = (p: { x: number; y: number }, paso: number) => {
      if (!ultimo || Math.hypot(p.x - ultimo.x, p.y - ultimo.y) > paso) {
        ultimo = p;
        soltar(p.x, p.y);
      }
    };
    const alMover = (e: PointerEvent) => {
      if (e.pointerType === "mouse") seguir(aLocal(e.clientX, e.clientY), PASO_MOUSE);
    };
    const alTocar = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) seguir(aLocal(t.clientX, t.clientY), PASO_DEDO);
    };
    const rafaga = () => {
      const w = sec.offsetWidth;
      const h = sec.offsetHeight;
      (w >= 768 ? RAFAGA_ANCHA : RAFAGA_ANGOSTA).forEach((p, i) => {
        timers.push(window.setTimeout(() => soltar(w * p.x + (Math.random() * 30 - 15), h * p.y + (Math.random() * 24 - 12), p.queda), i * 650));
      });
    };

    let dentro = false;
    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting && !dentro) {
            dentro = true;
            rafaga();
          } else if (!e.isIntersecting) {
            dentro = false;
            timers.forEach(clearTimeout);
            timers = [];
          }
        },
        { threshold: 0.3 },
      );
      io.observe(sec);
    }
    sec.addEventListener("pointermove", alMover, { passive: true });
    sec.addEventListener("touchmove", alTocar, { passive: true });
    return () => {
      io?.disconnect();
      sec.removeEventListener("pointermove", alMover);
      sec.removeEventListener("touchmove", alTocar);
      timers.forEach(clearTimeout);
    };
  }, [quieto]);

  return (
    <section ref={seccion} className="estela" aria-labelledby="estela-titulo">
      <div className="estela-fondo" aria-hidden="true" />

      <p className="estela-marca" aria-hidden="true">
        M
        <HelmetIcon shellColor="#F8B4D9" visorColor="#0B0B10" className="estela-marca-casco" />
        NZA
      </p>

      <div className="estela-pista" aria-hidden="true">
        {FOTOS.map((f, i) => {
          const q = quieto ? QUIETAS.find((c) => c.i === i) : undefined;
          return (
            <div
              key={f.id}
              ref={(el) => {
                cartas.current[i] = el;
              }}
              className={`estela-carta ${q ? "is-quieta" : ""}`}
              style={q ? { left: `${q.x}%`, top: `${q.y}%`, transform: `translate(-50%, -50%) rotate(${q.r}deg)` } : undefined}
            >
              <picture>
                <source type="image/avif" srcSet={f.avif} />
                <img src={f.webp} alt="" width={440} height={550} loading="lazy" decoding="async" draggable={false} />
              </picture>
              <span className="estela-pie">{PIE[f.marca][lang]}</span>
            </div>
          );
        })}
      </div>

      {!quieto && (
        <p className="estela-pista-texto" aria-hidden="true">
          <i />
          {mouse ? COPY_ESTELA.pistaMouse[lang] : COPY_ESTELA.pistaDedo[lang]}
        </p>
      )}

      <div className="estela-contenido">
        <p className="estela-antetitulo">{COPY_ESTELA.antetitulo[lang]}</p>
        <h2 id="estela-titulo" className="estela-titulo">
          {COPY_ESTELA.titulo[lang]}
        </h2>
        <p className="estela-sub">{COPY_ESTELA.sub[lang]}</p>
      </div>

      <p className="sr-only">{COPY_ESTELA.resumen[lang]}</p>
    </section>
  );
};

export default EstelaContenido;
