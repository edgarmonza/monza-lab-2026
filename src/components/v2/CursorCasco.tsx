/* El cursor de toda la web: el casquito de Monza (pedido de Edgar, 28-sep-2026).
 * Solo con mouse. Crece sobre lo que se toca; sobre el rosa se invierte, como el logo.
 * En el celular no existe: ahí manda el dedo. */
import { useEffect, useRef } from "react";
import "./chrome.css";

const CursorCasco = () => {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;
    const c = el.current;
    if (!c) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("cursor-casco");
    let x = -100, y = -100, cx = -100, cy = -100, vivo = false, raf = 0;
    const mover = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (!vivo) { cx = x; cy = y; vivo = true; }
      c.classList.add("on");
      const t = e.target instanceof Element ? e.target : null;
      c.classList.toggle("sobre-rosa", !!t?.closest(".rosa, .v2-menu"));
      c.classList.toggle("activo", !!t?.closest("a, button, [role='button'], [data-cursor='activo'], label, summary"));
    };
    const salir = () => c.classList.remove("on");
    const abajo = () => c.classList.add("clic");
    const arriba = () => c.classList.remove("clic");
    const k = reduce ? 1 : 0.38;
    const loop = () => { cx += (x - cx) * k; cy += (y - cy) * k; c.style.transform = `translate(${cx}px,${cy}px)`; raf = requestAnimationFrame(loop); };
    addEventListener("mousemove", mover, { passive: true });
    document.addEventListener("mouseleave", salir);
    addEventListener("mousedown", abajo);
    addEventListener("mouseup", arriba);
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("mousemove", mover);
      document.removeEventListener("mouseleave", salir);
      removeEventListener("mousedown", abajo);
      removeEventListener("mouseup", arriba);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-casco");
    };
  }, []);

  return (
    <div ref={el} className="v2-chrome v2-cursor" aria-hidden="true">
      <svg viewBox="0 0 120 121">
        <path className="h-shell" d="M60 3C36 3 12 18 7 40C2 57 2 72 6 86L15 103C23 113 38 118 57 118L60 118L63 118C82 118 97 113 105 103L114 86C118 72 118 57 113 40C108 18 84 3 60 3Z" />
        <path className="h-visor" d="M14 46C14 36 33 30 60 30C87 30 106 36 106 46L106 68C105 77 86 83 60 83C34 83 15 77 14 68Z" />
      </svg>
    </div>
  );
};

export default CursorCasco;
