/* La pantalla que escribe · hero de /shopify.
 *
 * Una ventana de navegador escribe las direcciones de tres tiendas que construimos; cada
 * una carga y baja sola. Después escribe monzalab.com y cuenta el sistema como lo estamos
 * montando en soloio: cada frase enciende lo que conecta. Cierra con «¿Y la tuya?» y la
 * barra esperando el link (tocarla baja a la Radiografía).
 *
 * El tiempo lo manda guion.ts (puro). Aquí hay un reloj virtual que se pausa solo (fuera
 * de pantalla, pestaña oculta) o a mano. Lo continuo (opacidades, scroll, barras de
 * progreso) se escribe directo al DOM en cada cuadro; React solo vuelve a pintar cuando
 * cambia algo discreto (una letra, un chip, un capítulo). Con movimiento reducido no hay
 * reloj: cada capítulo es una foto y se cambia con los controles. */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Globe, Pause, Play, Search } from "lucide-react";
import HelmetIcon from "@/components/HelmetIcon";
import type { Lang } from "@/i18n/types";
import { trackCta } from "@/lib/pixel";
import { armarGuion, cuadroEn, cuadroQuieto, inicioCapitulo, type Cuadro } from "./guion";
import { COPY, MEDIA_ESCRITORIO, SISTEMA, TIENDAS, escenasPara, type Formato } from "./tiendas";
import { IconoChip } from "./iconos";

interface Props {
  lang: Lang;
  /** Lleva al formulario de la Radiografía (el cierre de la pantalla lo pide). */
  onPedir: () => void;
}

const PINK = "#F8B4D9";

const prefiereQuieto = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const formatoActual = (): Formato =>
  typeof window !== "undefined" && window.matchMedia?.(MEDIA_ESCRITORIO).matches ? "escritorio" : "movil";

/** Cuántos chips de una frase están encendidos: el primero apenas termina de escribirse. */
const encendidos = (avance: number, n: number) => (avance <= 0 ? 0 : Math.min(n, Math.floor(avance * n) + 1));

/** Lo discreto de un cuadro: si no cambia, React no vuelve a pintar. */
const firma = (c: Cuadro) =>
  [
    c.tramo,
    c.capitulo,
    c.barra.texto,
    c.barra.seleccionado ? 1 : 0,
    c.barra.escribiendo ? 1 : 0,
    c.pestana.id,
    c.pestana.cargando ? 1 : 0,
    c.sistema
      ? c.sistema.lineas.map((l, k) => `${l.escrito}:${encendidos(l.chips, SISTEMA[k].chips.length)}:${l.chips >= 1 ? 1 : 0}`).join(",")
      : "-",
    c.cierre ? `${c.cierre.escrito}:${c.cierre.foco ? 1 : 0}` : "-",
  ].join("|");

const PantallaQueEscribe = ({ lang, onPedir }: Props) => {
  const guion = useMemo(() => armarGuion(escenasPara(lang)), [lang]);

  const [quieto, setQuieto] = useState(prefiereQuieto);
  const [pausa, setPausa] = useState(false);
  const [enVista, setEnVista] = useState(true);
  const [capituloQuieto, setCapituloQuieto] = useState(0);
  const [formato, setFormato] = useState<Formato>(formatoActual);
  const [cuadroVivo, setCuadroVivo] = useState<Cuadro>(() => cuadroEn(guion, 0));

  const cuadro = quieto ? cuadroQuieto(guion, capituloQuieto) : cuadroVivo;

  const reloj = useRef(0);
  const ultimaFirma = useRef("");
  const ultimoCuadro = useRef<Cuadro>(cuadro);
  const figura = useRef<HTMLDivElement>(null);
  const marco = useRef<HTMLDivElement>(null);
  const contenido = useRef<HTMLDivElement>(null);
  const capas = useRef<Partial<Record<string, HTMLDivElement | null>>>({});
  const sistemaEl = useRef<HTMLDivElement>(null);
  const cargaEl = useRef<HTMLSpanElement>(null);
  const barritas = useRef<(HTMLSpanElement | null)[]>([]);
  const formatoRef = useRef(formato);
  formatoRef.current = formato;

  /* ── lo continuo, directo al DOM ── */
  const pintar = useCallback(
    (c: Cuadro) => {
      ultimoCuadro.current = c;
      const caja = contenido.current;
      const ancho = caja?.clientWidth ?? 0;
      const alto = caja?.clientHeight ?? 0;
      for (const t of TIENDAS) {
        const el = capas.current[t.id];
        if (!el) continue;
        const capa = c.pagina?.id === t.id ? c.pagina : c.fondo?.id === t.id ? c.fondo : null;
        el.style.opacity = capa ? String(capa.opacidad) : "0";
        el.style.visibility = capa ? "visible" : "hidden";
        el.style.zIndex = c.pagina?.id === t.id ? "2" : c.fondo?.id === t.id ? "1" : "0";
        const cap = t.capturas[formatoRef.current];
        const escala = ancho / cap.anchoSitio;
        const tope = Math.max(0, ancho * (cap.alto / cap.ancho) - alto);
        const y = capa ? Math.min(tope, cap.bajarA * escala * capa.bajada) : 0;
        const img = el.firstElementChild as HTMLElement | null;
        if (img) img.style.transform = `translate3d(0, ${(-y).toFixed(2)}px, 0)`;
      }
      if (sistemaEl.current) {
        sistemaEl.current.style.opacity = String(c.sistema?.visible ?? 0);
        sistemaEl.current.style.visibility = c.sistema ? "visible" : "hidden";
      }
      if (cargaEl.current) {
        cargaEl.current.style.transform = `scaleX(${c.carga ?? 0})`;
        cargaEl.current.style.opacity = c.carga == null ? "0" : "1";
      }
      barritas.current.forEach((b, k) => {
        if (!b) return;
        const lleno = quieto ? (k === c.capitulo ? 1 : 0) : k < c.capitulo ? 1 : k === c.capitulo ? c.avanceCapitulo : 0;
        b.style.transform = `scaleX(${lleno})`;
      });
    },
    [quieto],
  );

  const actualizar = useCallback(
    (t: number) => {
      const c = cuadroEn(guion, t);
      pintar(c);
      const f = firma(c);
      if (f !== ultimaFirma.current) {
        ultimaFirma.current = f;
        setCuadroVivo(c);
      }
    },
    [guion, pintar],
  );

  // Cada vez que React pinta (o cambia el formato), lo continuo se vuelve a poner encima.
  useLayoutEffect(() => {
    pintar(quieto ? cuadro : ultimoCuadro.current);
  });

  /* ── el reloj ── */
  const corriendo = !quieto && !pausa && enVista;
  useEffect(() => {
    if (!corriendo || typeof requestAnimationFrame !== "function") return;
    let raf = 0;
    let antes: number | null = null;
    const tic = (ahora: number) => {
      if (antes !== null) reloj.current += Math.min(ahora - antes, 100);
      antes = ahora;
      actualizar(reloj.current);
      raf = requestAnimationFrame(tic);
    };
    raf = requestAnimationFrame(tic);
    return () => cancelAnimationFrame(raf);
  }, [corriendo, actualizar]);

  // Movimiento reducido: se respeta si cambia con la página abierta.
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq?.addEventListener) return;
    const cambio = () => setQuieto(mq.matches);
    mq.addEventListener("change", cambio);
    return () => mq.removeEventListener("change", cambio);
  }, []);

  // Fuera de pantalla o con la pestaña oculta, se detiene (y retoma donde iba).
  useEffect(() => {
    const el = figura.current;
    let visibleEnPagina = true;
    let enViewport = true;
    const sync = () => setEnVista(visibleEnPagina && enViewport);
    const alCambiarPestana = () => {
      visibleEnPagina = document.visibilityState !== "hidden";
      sync();
    };
    document.addEventListener("visibilitychange", alCambiarPestana);
    let io: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([e]) => {
          enViewport = e.isIntersecting;
          sync();
        },
        { threshold: 0.15 },
      );
      io.observe(el);
    }
    return () => {
      document.removeEventListener("visibilitychange", alCambiarPestana);
      io?.disconnect();
    };
  }, []);

  // Celular o escritorio: la misma media query con la que el <picture> elige la captura.
  useEffect(() => {
    const mq = window.matchMedia?.(MEDIA_ESCRITORIO);
    if (!mq?.addEventListener) return;
    const cambio = () => setFormato(mq.matches ? "escritorio" : "movil");
    mq.addEventListener("change", cambio);
    return () => mq.removeEventListener("change", cambio);
  }, []);

  // Si la ventana cambia de tamaño, el scroll de la captura se recalcula.
  useEffect(() => {
    const el = marco.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => pintar(ultimoCuadro.current));
    ro.observe(el);
    return () => ro.disconnect();
  }, [pintar]);

  // Si los chips de una frase no caben en una fila, el primero de la fila nueva no lleva cable.
  // Va en data-fila y no en className: React reescribe className cada vez que un chip se enciende.
  const marcarFilas = useCallback(() => {
    for (const ul of sistemaEl.current?.querySelectorAll<HTMLElement>(".pantalla-chips") ?? []) {
      let arriba = -1;
      for (const li of Array.from(ul.children) as HTMLElement[]) {
        if (arriba >= 0 && li.offsetTop > arriba + 2) li.dataset.fila = "nueva";
        else delete li.dataset.fila;
        arriba = li.offsetTop;
      }
    }
  }, []);
  useLayoutEffect(() => {
    marcarFilas();
  }, [marcarFilas, lang, formato]);
  useEffect(() => {
    // Las fuentes de marca cambian el ancho de cada chip: se vuelve a medir cuando cargan.
    const fuentes = typeof document !== "undefined" ? document.fonts : undefined;
    fuentes?.ready.then(marcarFilas).catch(() => {});
    fuentes?.addEventListener?.("loadingdone", marcarFilas);
    const el = sistemaEl.current;
    const ro = el && typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => marcarFilas()) : undefined;
    if (el) ro?.observe(el);
    return () => {
      fuentes?.removeEventListener?.("loadingdone", marcarFilas);
      ro?.disconnect();
    };
  }, [marcarFilas]);

  // Decodificar las capturas antes de que se vean: la primera aparición no da tirón.
  useEffect(() => {
    for (const t of TIENDAS) {
      const img = capas.current[t.id]?.querySelector("img");
      if (!img) continue;
      const decodificar = () => img.decode?.().catch(() => {});
      if (img.complete) decodificar();
      else img.addEventListener("load", decodificar, { once: true });
    }
  }, [formato]);

  // Un poco de profundidad con el mouse (solo con puntero fino y si hay movimiento).
  useEffect(() => {
    const f = figura.current;
    const m = marco.current;
    if (!f || !m || quieto || !window.matchMedia?.("(pointer: fine)").matches) return;
    // La perspectiva solo existe mientras el mouse está encima: en reposo, sin transformación 3D,
    // Safari no rasteriza la ventana y el texto de las capturas queda nítido.
    const mover = (e: PointerEvent) => {
      const r = f.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      m.style.transform = `perspective(1400px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
    };
    const salir = () => {
      m.style.transform = "";
    };
    f.addEventListener("pointermove", mover);
    f.addEventListener("pointerleave", salir);
    return () => {
      f.removeEventListener("pointermove", mover);
      f.removeEventListener("pointerleave", salir);
    };
  }, [quieto]);

  /* ── controles ── */
  const capitulos = [...TIENDAS.map((t) => t.nombre), COPY.capituloSistema[lang]];
  const ir = (k: number) => {
    trackCta(`pantalla_${k < TIENDAS.length ? TIENDAS[k].id : "sistema"}`, "shopify_hero");
    if (quieto) {
      setCapituloQuieto(k);
      return;
    }
    reloj.current = inicioCapitulo(guion, k);
    actualizar(reloj.current);
  };
  const pedir = () => {
    trackCta("pantalla_y_la_tuya", "shopify_hero");
    onPedir();
  };

  /* ── lo que se ve ── */
  const { barra, pestana, sistema, cierre } = cuadro;
  const tienda = TIENDAS.find((t) => t.id === pestana.id);
  const mostrarAviso = !!tienda?.aviso && !pestana.cargando && !barra.escribiendo && !barra.seleccionado;
  const esperando = !!cierre?.foco;
  const cursorEnBarra = barra.escribiendo || barra.texto === "" || esperando;
  const accesoEncendido = barra.escribiendo && barra.texto ? TIENDAS.find((t) => t.url.startsWith(barra.texto))?.id : undefined;

  const iconoPestana = pestana.cargando ? (
    <span className="pantalla-giro" />
  ) : pestana.id === "monza" ? (
    <HelmetIcon className="w-[15px] h-[15px]" />
  ) : tienda ? (
    tienda.icono ? (
      <img src={tienda.icono} alt="" width={16} height={16} className="w-4 h-4 rounded-[4px]" />
    ) : (
      <Globe className="w-[14px] h-[14px]" strokeWidth={1.8} style={{ color: "rgba(255,252,247,0.55)" }} />
    )
  ) : (
    <Search className="w-[13px] h-[13px]" strokeWidth={2} style={{ color: "rgba(255,252,247,0.45)" }} />
  );

  return (
    <div ref={figura} className="pantalla relative">
      <p className="sr-only">{COPY.descripcion[lang]}</p>

      <div className="relative">
        {/* Resplandor detrás de la ventana */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-6 -bottom-4 -z-10 rounded-[40px] blur-2xl"
          style={{ background: "radial-gradient(60% 55% at 60% 45%, rgba(248,180,217,0.16), transparent 70%)" }}
        />

        <div ref={marco} data-pantalla aria-hidden="true" className="pantalla-marco relative rounded-[18px] overflow-hidden">
          {/* Barra del navegador */}
          <div className="pantalla-barra flex items-center gap-2.5 px-3 md:px-3.5 h-11">
            <span className="flex gap-1.5 shrink-0" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <i key={i} className="block w-[9px] h-[9px] rounded-full" style={{ background: "rgba(255,252,247,0.14)" }} />
              ))}
            </span>
            <div
              className={`pantalla-direccion relative flex items-center gap-2 flex-1 min-w-0 h-[30px] rounded-full pl-2.5 pr-2 ${esperando ? "is-esperando" : ""}`}
            >
              <span className="grid place-items-center w-4 h-4 shrink-0">{iconoPestana}</span>
              <span data-barra className="pantalla-url flex items-center min-w-0 truncate">
                <span className={barra.seleccionado ? "pantalla-seleccion" : undefined}>{barra.texto}</span>
                {cursorEnBarra && <span className={`pantalla-cursor ${barra.escribiendo ? "" : "is-parpadeo"}`} />}
                {esperando && barra.texto === "" && <span className="pantalla-marcador truncate">{COPY.placeholder[lang]}</span>}
              </span>
              {mostrarAviso && tienda?.aviso && <span className="pantalla-aviso ml-auto shrink-0">{tienda.aviso[lang]}</span>}
              <span ref={cargaEl} className="pantalla-carga" />
            </div>
          </div>

          {/* Lo que se ve dentro */}
          <div ref={contenido} className="pantalla-contenido relative overflow-hidden">
            {/* Pestaña nueva: el casco y las tres tiendas como accesos; se enciende la que se escribe. */}
            <div className="pantalla-nueva absolute inset-0 grid place-items-center">
              <div className="flex flex-col items-center gap-[7cqw]">
                <HelmetIcon shellColor="rgba(248,180,217,0.32)" visorColor="#0B0B10" className="w-[10cqw] max-w-[46px] h-auto" />
                <ul className="flex gap-[5cqw]">
                  {TIENDAS.map((t) => (
                    <li key={t.id} className={`pantalla-acceso ${accesoEncendido === t.id ? "is-on" : ""}`}>
                      <span className="pantalla-acceso-icono">
                        {t.icono ? <img src={t.icono} alt="" width={20} height={20} /> : <Globe strokeWidth={1.6} />}
                      </span>
                      {t.nombre}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {TIENDAS.map((t, i) => {
              const { movil, escritorio } = t.capturas;
              return (
                <div
                  key={t.id}
                  ref={(el) => {
                    capas.current[t.id] = el;
                  }}
                  className="absolute inset-0 opacity-0 invisible"
                >
                  {/* Las dos versiones en el mismo <picture>: el navegador elige por media query ya desde
                      el HTML prerenderizado, así el celular nunca baja las de escritorio. */}
                  <picture className="block will-change-transform">
                    <source media={MEDIA_ESCRITORIO} type="image/avif" srcSet={escritorio.avif} />
                    <source media={MEDIA_ESCRITORIO} type="image/webp" srcSet={escritorio.webp} />
                    <source type="image/avif" srcSet={movil.avif} />
                    <img
                      src={movil.webp}
                      alt=""
                      width={movil.ancho}
                      height={movil.alto}
                      decoding="async"
                      draggable={false}
                      className="block w-full h-auto select-none"
                      {...{ fetchpriority: i === 0 ? "high" : "low" }}
                    />
                  </picture>
                </div>
              );
            })}

            {/* El sistema, como lo estamos montando en soloio */}
            <div ref={sistemaEl} className="pantalla-sistema absolute inset-0 z-[3] opacity-0 invisible flex flex-col justify-center">
              <span className="pantalla-fantasma" aria-hidden="true">
                soloio
              </span>
              <p className="pantalla-antetitulo">{COPY.antetitulo[lang]}</p>
              {SISTEMA.map((linea, k) => {
                const estado = sistema?.lineas[k] ?? { escrito: 0, chips: 0 };
                const frase = linea.frase[lang];
                const on = encendidos(estado.chips, linea.chips.length);
                const escribiendo = estado.escrito > 0 && estado.escrito < frase.length;
                const vivo = estado.chips >= 1;
                return (
                  <div key={k} className={`pantalla-linea ${vivo ? "is-vivo" : ""}`}>
                    <p className="pantalla-frase">
                      {frase.slice(0, estado.escrito)}
                      {escribiendo && <span className="pantalla-cursor pantalla-cursor--frase" />}
                    </p>
                    <ul className="pantalla-chips">
                      {linea.chips.map((chip, j) => (
                        <li key={j} className={`pantalla-chip ${j < on ? "is-on" : ""}`} style={{ ["--i" as string]: j }}>
                          <span className="pantalla-chip-icono">
                            <IconoChip icono={chip.icono} />
                          </span>
                          {chip.texto[lang]}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              <p className="pantalla-frase pantalla-frase--cierre" style={{ color: PINK }}>
                {COPY.cierre[lang].slice(0, cierre?.escrito ?? 0)}
                {cierre && cierre.escrito > 0 && cierre.escrito < COPY.cierre[lang].length && (
                  <span className="pantalla-cursor pantalla-cursor--frase" />
                )}
              </p>
            </div>
          </div>
        </div>

        {/* En el cierre, la ventana entera lleva a la Radiografía (el botón de la página hace lo mismo). */}
        {esperando && (
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={pedir}
            className="absolute inset-0 z-10 cursor-pointer rounded-[18px] bg-transparent"
          />
        )}
      </div>

      {/* La pausa va a la izquierda, como en un reproductor: a la derecha, en el celular, quedan
          los botones flotantes del sitio (WhatsApp y el agente) y la tapan. */}
      <div role="group" aria-label={COPY.controles[lang]} className="pantalla-controles flex items-center gap-1 sm:gap-2 mt-3">
        {!quieto && (
          <button
            type="button"
            onClick={() => setPausa((p) => !p)}
            aria-pressed={pausa}
            aria-label={pausa ? COPY.seguir[lang] : COPY.pausar[lang]}
            className="pantalla-pausa shrink-0 grid place-items-center w-11 h-11 rounded-full mr-1 sm:mr-2"
          >
            {pausa ? (
              <Play className="w-3.5 h-3.5 translate-x-[1px]" strokeWidth={2.2} />
            ) : (
              <Pause className="w-3.5 h-3.5" strokeWidth={2.2} />
            )}
          </button>
        )}
        {capitulos.map((nombre, k) => (
          <button
            key={nombre}
            type="button"
            onClick={() => ir(k)}
            aria-label={k < TIENDAS.length ? `${COPY.ver[lang]} ${nombre}` : COPY.verSistema[lang]}
            aria-current={k === cuadro.capitulo ? "step" : undefined}
            className={`pantalla-capitulo group flex-auto min-w-0 min-h-[44px] flex flex-col justify-center gap-2 px-1 text-left ${k === cuadro.capitulo ? "is-actual" : ""}`}
          >
            <span className="truncate">{nombre}</span>
            <span className="pantalla-barrita">
              <span
                ref={(el) => {
                  barritas.current[k] = el;
                }}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PantallaQueEscribe;
