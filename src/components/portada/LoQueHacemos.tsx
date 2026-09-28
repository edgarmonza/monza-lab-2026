/* «Lo que hacemos»: cuatro líneas a todo el ancho (Studio · Plataformas · Sessions · Ventures).
 * En el celular cada línea trae su foto adentro; con mouse y desde 900 px, la foto de la línea
 * sigue al cursor. */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { enlace } from "@/lib/enlace";
import { FILAS, type Fila } from "./datos";
import { HACEMOS } from "./textos";

const LoQueHacemos = () => {
  const { language } = useLanguage();
  const lista = useRef<HTMLUListElement>(null);
  const vista = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ul = lista.current, v = vista.current;
    if (!ul || !v) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || !window.matchMedia("(min-width: 900px)").matches) return;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const imgs = [...v.querySelectorAll("img")];
    const filas = [...ul.querySelectorAll<HTMLElement>(".fila")];
    let x = 0, y = 0, cx = 0, cy = 0, vivo = false, raf = 0;
    const loop = () => {
      cx += (x - cx) * (quieto ? 1 : 0.14);
      cy += (y - cy) * (quieto ? 1 : 0.14);
      const g = Math.max(-6, Math.min(6, (x - cx) * 0.05));
      v.style.transform = `translate(${cx + 28}px,${cy - 110}px) rotate(${g}deg)`;
      if (vivo) raf = requestAnimationFrame(loop);
    };
    const quitar: (() => void)[] = [];
    filas.forEach((f, i) => {
      const entra = (e: MouseEvent) => {
        imgs.forEach((im, k) => im.classList.toggle("on", k === i));
        if (!vivo) { cx = x = e.clientX; cy = y = e.clientY; vivo = true; raf = requestAnimationFrame(loop); }
        v.classList.add("on");
      };
      const mueve = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
      const sale = () => v.classList.remove("on");
      f.addEventListener("mouseenter", entra);
      f.addEventListener("mousemove", mueve);
      f.addEventListener("mouseleave", sale);
      quitar.push(() => { f.removeEventListener("mouseenter", entra); f.removeEventListener("mousemove", mueve); f.removeEventListener("mouseleave", sale); });
    });
    const fuera = () => { vivo = false; };
    ul.addEventListener("mouseleave", fuera);
    return () => { quitar.forEach((q) => q()); ul.removeEventListener("mouseleave", fuera); cancelAnimationFrame(raf); };
  }, []);

  const contenido = (f: Fila) => (
    <>
      <span className="f-meta"><b>{f.n}</b>{f.meta[language]}</span>
      <span className="f-titulo">{f.titulo[language]}</span>
      <span className="f-cuerpo">
        <span className="f-texto">{f.texto[language]}</span>
        <span className="f-ej">
          {f.ejemplos.map((e) => <span key={e.t.es} className={e.reserva ? "conf" : undefined}>{e.t[language]}</span>)}
        </span>
      </span>
      <span className="f-foto" aria-hidden="true"><img src={f.foto} alt="" loading="lazy" decoding="async" /></span>
      <span className="f-ir" aria-hidden="true">→<span className="t"> {f.ir[language]}</span></span>
    </>
  );

  return (
    <section className="hacemos" id="que-hacemos" aria-labelledby="s-hacemos">
      <div className="hc-cab">
        <span className="eyebrow rv">{HACEMOS.eyebrow[language]}</span>
        <h2 id="s-hacemos" className="rv">{HACEMOS.titulo[language]}</h2>
      </div>
      <ul className="filas" ref={lista}>
        {FILAS.map((f) => (
          <li key={f.id}>
            {f.href.startsWith("#")
              ? <a className="fila rv" id={f.id} href={f.href}>{contenido(f)}</a>
              : <Link className="fila rv" id={f.id} to={enlace(language, f.href)}>{contenido(f)}</Link>}
          </li>
        ))}
      </ul>
      <div className="hc-vista" ref={vista} aria-hidden="true">
        {FILAS.map((f) => <img key={f.id} src={f.foto} alt="" loading="lazy" decoding="async" />)}
      </div>
    </section>
  );
};

export default LoQueHacemos;
