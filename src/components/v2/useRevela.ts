import { useEffect, type RefObject } from "react";
import { enPrerender } from "@/lib/prerender";

/** La aparición al bajar de las páginas v2 (.rv → .rv.in).
 *  - En el prerender deja todo visible: el HTML queda completo para Google y para los asistentes.
 *  - En el navegador marca primero lo que ya está en pantalla y recién después prende data-revela,
 *    así lo que llegó prerenderizado no parpadea (ver lib/prerender.ts). */
export const useRevela = (ref: RefObject<HTMLElement | null>, deps: unknown[] = []) => {
  useEffect(() => {
    const raiz = ref.current;
    if (!raiz) return;
    const els = [...raiz.querySelectorAll<HTMLElement>(".rv")];
    const quieto = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (enPrerender() || quieto || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const alto = window.innerHeight;
    els.forEach((e) => {
      const r = e.getBoundingClientRect();
      if (r.top < alto && r.bottom > 0) e.classList.add("in");
    });
    raiz.setAttribute("data-revela", "");
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((e) => { if (!e.classList.contains("in")) io.observe(e); });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
