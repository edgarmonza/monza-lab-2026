/* El hero de la portada: el casco y la cara.
 *
 * La foto del casco llena la pantalla; donde pasa el cursor (o el dedo) se abre un círculo suave
 * y aparece la cara con gafas, y el MONZA de encima pasa de lleno a contorno. La frase se escribe
 * una vez en dos tiempos («Hacemos crecer marcas con IA.» · «Y con buen gusto.») y al terminar la
 * cara aparece sola una vez.
 *
 * Prerender (lib/prerender.ts): dentro del prerender no hay animaciones y la frase va completa;
 * si esta visita llegó con el HTML prerenderizado, no se vuelve a escribir ni a animar la entrada
 * (así no parpadea en el celular). El círculo va imperativo, por refs: React no repinta por cuadro. */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import HelmetIcon from "@/components/HelmetIcon";
import { useLanguage } from "@/i18n/LanguageContext";
import { enPrerender, llegoPrerenderizada } from "@/lib/prerender";
import { HERO } from "./textos";

/* La cara con gafas. El tamaño y la posición de las dos fotos van en portada.css. */
const GAFAS = "/v2/edgar/gafas.webp";

const prefiereQuieto = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Fase = "escribe" | "listo" | "quieto";

const HeroCasco = () => {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  /* Se decide una sola vez al montar. */
  const [animar] = useState(() => !enPrerender() && !prefiereQuieto() && !llegoPrerenderizada(pathname));
  const [fase, setFase] = useState<Fase>(animar ? "escribe" : "quieto");
  const [paso, setPaso] = useState<{ k: 0 | 1; i: number } | null>(animar ? { k: 0, i: 0 } : null);

  const a = HERO.lineaA[language];
  const b = HERO.lineaB[language];
  const textos = useRef({ a, b });
  textos.current = { a, b };

  const heroRef = useRef<HTMLElement>(null);
  const fotosRef = useRef<HTMLDivElement>(null);
  const revelaRef = useRef<HTMLDivElement>(null);
  const gafasRef = useRef<HTMLDivElement>(null);
  const mRef = useRef<HTMLSpanElement>(null);
  const nzaRef = useRef<HTMLSpanElement>(null);
  const llenoRef = useRef<HTMLSpanElement>(null);
  const huecoRef = useRef<HTMLSpanElement>(null);
  const tocaRef = useRef<HTMLDivElement>(null);

  /* La frase, letra por letra, en dos tiempos. */
  useEffect(() => {
    if (!animar) return;
    let k: 0 | 1 = 0;
    let i = 0;
    let t = 0;
    const tecla = () => {
      const txt = k === 0 ? textos.current.a : textos.current.b;
      i += 1;
      setPaso({ k, i });
      if (i < txt.length) { t = window.setTimeout(tecla, 40); return; }
      if (k === 0) { k = 1; i = 0; t = window.setTimeout(tecla, 650); return; }
      setPaso(null);
      setFase("listo");
    };
    t = window.setTimeout(tecla, 1150);
    return () => window.clearTimeout(t);
  }, [animar]);

  /* El círculo que revela la cara, el MONZA que pasa a contorno y la intro. */
  useEffect(() => {
    const hero = heroRef.current, fotos = fotosRef.current, revela = revelaRef.current, gafas = gafasRef.current;
    if (!hero || !fotos || !revela || !gafas) return;
    const letras = [mRef.current, nzaRef.current].filter((x): x is HTMLSpanElement => !!x);
    const quieto = prefiereQuieto();
    let ojos = { x: 0, y: 0 };
    let radio = 260;
    const meta = { x: -9999, y: -9999 };
    const pos = { x: -9999, y: -9999 };
    let op = 0;
    let activo = false;
    let corriendo = false;
    let raf = 0;
    let tIntro = 0;
    let tocado = false;
    let vivo = true;

    /* Dónde quedan los ojos y qué tan grande es el círculo: la misma cuenta de portada.css. */
    const alinear = () => {
      const cw = fotos.clientWidth, ch = fotos.clientHeight;
      const S = Math.min(ch * 0.84, cw * 1.25);
      ojos = { x: cw * 0.5, y: ch * 0.705 };
      radio = Math.round(Math.max(150, Math.min(330, S * 0.36)));
    };

    const pintar = () => {
      if (op <= 0.01) {
        revela.style.opacity = "0";
        revela.style.webkitMaskImage = revela.style.maskImage = "none";
      } else {
        const m = `radial-gradient(circle ${radio}px at ${pos.x}px ${pos.y}px, rgba(0,0,0,${op}) 0%, rgba(0,0,0,${op}) 42%, rgba(0,0,0,${op * 0.55}) 68%, transparent 100%)`;
        revela.style.opacity = "1";
        revela.style.webkitMaskImage = revela.style.maskImage = m;
      }
      const f = (0.86 * (1 - op)).toFixed(3), s = (op * 0.75).toFixed(3);
      letras.forEach((l) => {
        l.style.color = op > 0.99 ? "transparent" : `rgba(255,252,247,${f})`;
        l.style.webkitTextStroke = `2px rgba(255,252,247,${s})`;
      });
      if (llenoRef.current) llenoRef.current.style.opacity = String(1 - op);
      if (huecoRef.current) huecoRef.current.style.opacity = String(op);
    };

    const paso = () => {
      const k = quieto ? 1 : 0.1;
      pos.x += (meta.x - pos.x) * k;
      pos.y += (meta.y - pos.y) * k;
      op += ((activo ? 1 : 0) - op) * (quieto ? 1 : activo ? 0.07 : 0.045);
      pintar();
      if (op > 0.005 || activo) raf = requestAnimationFrame(paso);
      else { corriendo = false; op = 0; pintar(); }
    };
    const mover = () => { if (!corriendo) { corriendo = true; raf = requestAnimationFrame(paso); } };
    const local = (e: PointerEvent) => { const r = hero.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const saltar = (p: { x: number; y: number }) => { if (op < 0.02) { pos.x = p.x; pos.y = p.y; } meta.x = p.x; meta.y = p.y; };

    const alMover = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || e.buttons) { tocado = true; window.clearTimeout(tIntro); saltar(local(e)); activo = true; mover(); }
    };
    const alTocar = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") { tocado = true; window.clearTimeout(tIntro); saltar(local(e)); activo = true; tocaRef.current?.classList.add("fuera"); mover(); }
    };
    const alSoltar = (e: PointerEvent) => { if (e.pointerType !== "mouse") { activo = false; mover(); } };
    const alSalir = (e: PointerEvent) => { if (e.pointerType === "mouse") { activo = false; mover(); } };

    alinear();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(alinear) : null;
    ro?.observe(fotos);
    if (enPrerender()) return () => ro?.disconnect();

    /* La cara solo se ve con el círculo: se pide cuando ya cargó el código, para que no le quite red
     * a la foto del casco (que es lo que mide Google al cargar). La intro espera a tenerla. */
    const cara = new Image();
    cara.src = GAFAS;
    gafas.style.backgroundImage = `url(${GAFAS})`;

    hero.addEventListener("pointermove", alMover);
    hero.addEventListener("pointerdown", alTocar);
    hero.addEventListener("pointerup", alSoltar);
    hero.addEventListener("pointercancel", alSoltar);
    hero.addEventListener("pointerleave", alSalir);

    /* Al cargar, una vez: la cara aparece sobre los ojos y se vuelve a ir. Si la frase se está
     * escribiendo, espera a que termine. */
    if (!quieto) {
      const t0 = performance.now();
      const intro = () => {
        if (!vivo || tocado) return;
        tIntro = window.setTimeout(() => {
          pos.x = meta.x = ojos.x; pos.y = meta.y = ojos.y; activo = true; mover();
          tIntro = window.setTimeout(() => { activo = false; mover(); }, 2300);
        }, Math.max(0, (animar ? 5200 : 1800) - (performance.now() - t0)));
      };
      cara.decode().then(intro, intro);
    }

    return () => {
      vivo = false;
      ro?.disconnect();
      window.clearTimeout(tIntro);
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", alMover);
      hero.removeEventListener("pointerdown", alTocar);
      hero.removeEventListener("pointerup", alSoltar);
      hero.removeEventListener("pointercancel", alSoltar);
      hero.removeEventListener("pointerleave", alSalir);
    };
  }, [animar]);

  /* Lo que se ve de la frase según el paso del tecleo. */
  let ta = a, tb = b;
  let tecla: "a" | "b" | null = fase === "listo" ? "b" : null;
  if (paso) {
    if (paso.k === 0) { ta = a.slice(0, paso.i); tb = ""; tecla = "a"; }
    else { tb = b.slice(0, paso.i); tecla = "b"; }
  }
  const claseLinea = `h-linea${fase === "escribe" ? " escribiendo" : fase === "listo" ? " escribiendo listo" : ""}`;

  return (
    <section ref={heroRef} className={`hero${animar ? " pt-entra" : ""}`} id="top" aria-labelledby="h1">
      <h1 id="h1" className="sr">{HERO.h1[language]}</h1>
      <div className="h-halo" aria-hidden="true" />
      <div className="h-fotos" ref={fotosRef} aria-hidden="true">
        <div className="h-capa h-base" style={{ backgroundImage: "url(/v2/edgar/casco.webp)" }} />
        <div className="h-capa h-revela" ref={revelaRef}>
          <div className="h-gafas" ref={gafasRef} />
        </div>
      </div>
      <div className="h-grano" aria-hidden="true" />
      <div className="h-fondo" aria-hidden="true" />

      <div className="h-centro">
        <div className="h-marca" aria-hidden="true">
          <span className="l" ref={mRef}>M</span>
          <span className="h-casco">
            <span ref={llenoRef}><HelmetIcon variant="solid" shellColor="#F8B4D9" visorColor="#1a1a2a" /></span>
            <span className="hueco" ref={huecoRef}><HelmetIcon variant="ghost" shellColor="rgba(255,252,247,0.72)" visorColor="#F8B4D9" /></span>
          </span>
          <span className="l" ref={nzaRef}>NZA</span>
        </div>
        <p className={claseLinea} aria-hidden="true">
          <span className={`a${tecla === "a" ? " tecla" : ""}`}>{ta}</span>
          <span className={`b${tecla === "b" ? " tecla" : ""}`}>{tb}</span>
        </p>
      </div>
      <div className="h-toca" ref={tocaRef} aria-hidden="true"><span /><b>{HERO.toca[language]}</b></div>

      <a className="h-cta" href="#proyectos">{HERO.cta[language]} <i aria-hidden="true" /></a>
    </section>
  );
};

export default HeroCasco;
