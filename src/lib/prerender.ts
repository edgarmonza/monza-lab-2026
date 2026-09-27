/* El HTML de cada ruta se prerenderiza (scripts/prerender.mjs) y el navegador lo pinta antes de
 * que llegue el JavaScript. Las páginas necesitan saber dos cosas:
 *
 *  - Si están DENTRO del prerender: entonces una animación se congela en un cuadro elegido, para
 *    que lo que queda escrito en el HTML sea siempre el mismo.
 *  - Si esta visita llegó con el HTML prerenderizado de su ruta en pantalla: entonces el primer
 *    render sigue desde lo que ya se ve, en vez de borrarlo y animarlo otra vez.
 *
 * main.tsx importa este módulo primero, así la ruta se lee al abrir la página y no después de una
 * navegación interna. */

declare global {
  interface Window {
    __PRERENDER__?: boolean;
  }
}

export const enPrerender = () => typeof window !== "undefined" && window.__PRERENDER__ === true;

export const RUTA_PRERENDERIZADA: string | null =
  typeof document !== "undefined" && document.querySelector('meta[name="x-prerendered"]') ? window.location.pathname : null;

const yaUsadas = new Set<string>();

/** true solo la primera vez que una página pregunta por la ruta que llegó prerenderizada. Si
 *  después se sale y se vuelve a entrar, anima normal. */
export const llegoPrerenderizada = (ruta: string) => {
  if (RUTA_PRERENDERIZADA !== ruta || yaUsadas.has(ruta)) return false;
  yaUsadas.add(ruta);
  return true;
};
