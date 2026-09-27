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
import { encuadrar, patronPara, quietasPara } from "./colocar";

const VIDA = 1600; // ms de cada foto en pantalla
const PASO_MOUSE = 110; // px que hay que mover el mouse para que salga otra
const PASO_DEDO = 80;

const prefiereQuieto = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const conMouse = () => typeof window !== "undefined" && !!window.matchMedia?.("(pointer: fine)").matches;
/** Desde 1024 px el collage va sobre toda la sala, a la derecha del texto (misma regla que index.css). */
const esAncha = () => typeof window !== "undefined" && !!window.matchMedia?.("(min-width: 1024px)").matches;

const EstelaContenido = ({ lang }: { lang: Lang }) => {
  const [quieto] = useState(prefiereQuieto);
  const [mouse] = useState(conMouse);
  const [ancha] = useState(esAncha);
  const [quietas] = useState(() => quietasPara(ancha, typeof window !== "undefined" ? window.innerWidth : 1440));
  const seccion = useRef<HTMLElement>(null);
  const pista = useRef<HTMLDivElement>(null);
  const cartas = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sec = seccion.current;
    const franja = pista.current;
    if (quieto || !sec || !franja) return;
    let idx = 0;
    let z = 10;
    let ultimo: { x: number; y: number } | null = null;
    let timers: number[] = [];

    const soltar = (x: number, y: number, queda = false) => {
      const el = cartas.current[idx % FOTOS.length];
      idx++;
      if (!el || typeof el.animate !== "function") return;
      const giro = (Math.random() * 8 - 4).toFixed(1);
      // Las que se quedan, enteras dentro de su franja: ni cortadas por el borde ni encima del texto.
      const p = queda ? encuadrar(x, y, franja.offsetWidth, franja.offsetHeight, el.offsetWidth, el.offsetHeight) : { x, y };
      el.style.left = `${p.x}px`;
      el.style.top = `${p.y}px`;
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
    // Las fotos se ubican dentro de la franja, así que el dedo se mide contra ella.
    const aLocal = (cx: number, cy: number) => {
      const r = franja.getBoundingClientRect();
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
      const w = franja.offsetWidth;
      const h = franja.offsetHeight;
      patronPara(ancha, w).forEach((p, i) => {
        // Las que se quedan se mueven poco al azar: la cascada del celular está medida para que se
        // lean las tres etiquetas (colocar.test.ts).
        const azar = p.queda ? 6 : 15;
        timers.push(
          window.setTimeout(() => soltar(w * p.x + (Math.random() * 2 - 1) * azar, h * p.y + (Math.random() * 2 - 1) * azar, p.queda), i * 650),
        );
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
  }, [quieto, ancha]);

  return (
    <section ref={seccion} className="estela" aria-labelledby="estela-titulo">
      <div className="estela-fondo" aria-hidden="true" />

      <p className="estela-marca" aria-hidden="true">
        M
        <HelmetIcon shellColor="#F8B4D9" visorColor="#0B0B10" className="estela-marca-casco" />
        NZA
      </p>

      <div ref={pista} className="estela-pista" aria-hidden="true">
        {FOTOS.map((f, i) => {
          const q = quieto ? quietas.find((c) => c.i === i) : undefined;
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
