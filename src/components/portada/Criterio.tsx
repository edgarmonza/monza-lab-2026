/* «Criterio»: la estela. Donde pasa el mouse (o el dedo) sale una foto, crece, se queda un momento
 * y se va. Al entrar a la vista hay una ráfaga sola (menos de 5 s) y las tres últimas se quedan.
 * Demuestra la estética en vez de decirla. Con movimiento reducido queda un collage quieto; en el
 * prerender no se anima nada (las fotos van ocultas y el texto completo). Web Animations, sin
 * repintar React por cada foto (mismo método que components/shopify/estela). */
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { enPrerender } from "@/lib/prerender";
import { ESTELA } from "./datos";
import { CRITERIO } from "./textos";

const VIDA = 1600;
const PATRON_ANCHO: [number, number, number?][] = [[0.46, 0.26], [0.8, 0.52], [0.62, 0.3], [0.6, 0.34, 1], [0.76, 0.24, 1], [0.9, 0.4, 1]];
const PATRON_ANGOSTO: [number, number, number?][] = [[0.3, 0.35], [0.7, 0.3], [0.5, 0.55], [0.28, 0.3, 1], [0.7, 0.5, 1], [0.3, 0.74, 1]];
const QUIETAS: [number, number, number, number][] = [[0, 0.62, 0.32, -5], [1, 0.8, 0.3, 4], [2, 0.7, 0.62, -3]];

const encuadrar = (x: number, y: number, w: number, h: number, cw: number, ch: number, m = 10) => ({
  x: Math.min(Math.max(x, cw / 2 + m), Math.max(cw / 2 + m, w - cw / 2 - m)),
  y: Math.min(Math.max(y, ch / 2 + m), Math.max(ch / 2 + m, h - ch / 2 - m)),
});

const Criterio = () => {
  const { language } = useLanguage();
  const seccion = useRef<HTMLElement>(null);
  const sala = useRef<HTMLDivElement>(null);
  const cartas = useRef<(HTMLDivElement | null)[]>([]);
  const [conMouse, setConMouse] = useState(true);

  useEffect(() => {
    const sec = seccion.current, s = sala.current;
    if (!sec || !s || enPrerender()) return;
    setConMouse(window.matchMedia?.("(pointer: fine)").matches ?? true);
    const quieto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (quieto) {
      QUIETAS.forEach(([i, x, y, r]) => {
        const c = cartas.current[i];
        if (!c) return;
        c.classList.add("quieta");
        c.style.left = `${x * 100}%`; c.style.top = `${y * 100}%`;
        c.style.transform = `translate(-50%,-50%) rotate(${r}deg)`;
      });
      return;
    }
    const ancha = () => window.matchMedia("(min-width: 900px)").matches;
    let idx = 0, z = 10;
    let ultimo: { x: number; y: number } | null = null;
    let timers: number[] = [];
    const soltar = (x: number, y: number, queda = false) => {
      const el = cartas.current[idx % ESTELA.length];
      idx += 1;
      if (!el || typeof el.animate !== "function") return;
      const giro = (Math.random() * 8 - 4).toFixed(1);
      const p = queda ? encuadrar(x, y, s.offsetWidth, s.offsetHeight, el.offsetWidth, el.offsetHeight) : { x, y };
      el.style.left = `${p.x}px`; el.style.top = `${p.y}px`; el.style.zIndex = String(++z);
      el.getAnimations().forEach((a) => a.cancel());
      const entra = { opacity: 0, transform: `translate(-50%,-50%) scale(.62) rotate(${giro}deg)` };
      const esta = { opacity: 1, transform: `translate(-50%,-50%) scale(1) rotate(${giro}deg)` };
      el.animate(
        queda
          ? [entra, { ...esta, offset: 0.4 }, esta]
          : [entra, { ...esta, offset: 0.14 }, { ...esta, offset: 0.62 }, { opacity: 0, transform: `translate(-50%,-50%) scale(1.06) rotate(${giro}deg)` }],
        { duration: queda ? 900 : VIDA, easing: "cubic-bezier(.22,.61,.36,1)", fill: "forwards" },
      );
    };
    const local = (cx: number, cy: number) => { const r = s.getBoundingClientRect(); return { x: cx - r.left, y: cy - r.top }; };
    const seguir = (p: { x: number; y: number }, paso: number) => {
      if (!ultimo || Math.hypot(p.x - ultimo.x, p.y - ultimo.y) > paso) { ultimo = p; soltar(p.x, p.y); }
    };
    const rafaga = () => {
      const w = s.offsetWidth, h = s.offsetHeight;
      (ancha() ? PATRON_ANCHO : PATRON_ANGOSTO).forEach(([x, y, q], i) => {
        const azar = q ? 6 : 15;
        timers.push(window.setTimeout(() => soltar(w * x + (Math.random() * 2 - 1) * azar, h * y + (Math.random() * 2 - 1) * azar, !!q), i * 650));
      });
    };
    let dentro = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !dentro) { dentro = true; rafaga(); }
      else if (!e.isIntersecting) { dentro = false; timers.forEach(clearTimeout); timers = []; }
    }, { threshold: 0.3 });
    io.observe(sec);
    const alMover = (e: PointerEvent) => { if (e.pointerType === "mouse") seguir(local(e.clientX, e.clientY), 110); };
    const alTocar = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const p = local(t.clientX, t.clientY);
      if (p.y >= 0 && p.y <= s.offsetHeight) seguir(p, 80);
    };
    sec.addEventListener("pointermove", alMover, { passive: true });
    sec.addEventListener("touchmove", alTocar, { passive: true });
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      sec.removeEventListener("pointermove", alMover);
      sec.removeEventListener("touchmove", alTocar);
    };
  }, []);

  return (
    <section className="criterio" id="criterio" ref={seccion} aria-labelledby="s-criterio">
      <div className="cr-sala" ref={sala} aria-hidden="true">
        {ESTELA.map((f, i) => (
          <div key={f.src} className="cr-carta" ref={(el) => { cartas.current[i] = el; }}>
            <img src={f.src} alt="" width={440} height={550} loading="lazy" decoding="async" draggable={false} />
            <span>{(f.marca === "soloio" ? CRITERIO.pieSoloio : CRITERIO.pieMonza)[language]}</span>
          </div>
        ))}
      </div>
      <span className="cr-pista" aria-hidden="true">{(conMouse ? CRITERIO.pistaMouse : CRITERIO.pistaDedo)[language]}</span>
      <div className="cr-texto">
        <span className="eyebrow rv">{CRITERIO.eyebrow[language]}</span>
        <h2 id="s-criterio" className="rv">
          {CRITERIO.titulo[language]}<span className="box rosa-box">{CRITERIO.resaltado[language]}</span>
        </h2>
        <p className="lede rv">{CRITERIO.lede[language]}</p>
      </div>
    </section>
  );
};

export default Criterio;
