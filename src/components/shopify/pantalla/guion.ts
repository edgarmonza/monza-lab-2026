/* El guion de la pantalla del hero de /shopify: qué se ve en cada instante.
 *
 * Puro y determinista. El componente (PantallaQueEscribe) solo lo pinta, así que el
 * tiempo se puede pausar, adelantar o congelar sin que nada se desincronice, y el
 * guion se prueba sin navegador.
 *
 * La historia: se escriben las direcciones de tres tiendas que construimos, cada una
 * carga y baja sola; después se escribe monzalab.com y la pantalla cuenta el sistema
 * como lo estamos montando en soloio, frase por frase; cierra con «¿Y la tuya?». */

export type TiendaId = "soloio" | "eleonora" | "skinv";

export type Escena =
  { tipo: "tienda"; id: TiendaId; url: string } | { tipo: "sistema"; url: string; lineas: string[] } | { tipo: "cierre"; texto: string };

/** Duraciones en milisegundos. */
export interface Ritmo {
  arranque: number; // barra vacía con el cursor, antes de la primera letra
  tecla: number; // promedio por letra en la barra de dirección
  teclaFrase: number; // promedio por letra en las frases grandes
  seleccion: number; // la dirección anterior queda seleccionada antes de reescribirla
  enter: number;
  carga: number;
  portada: number; // quieta arriba antes de bajar
  bajada: number;
  abajo: number; // quieta abajo
  entrada: number; // pantalla de Monza recién cargada, antes de la primera frase
  chips: number; // lo que tarda en encenderse el sistema de una frase
  respiro: number; // entre una frase y la siguiente
  sosten: number; // el sistema completo, quieto
  cierre: number; // «¿Y la tuya?» escrito, esperando el link
  salida: number; // fundido al final del bucle, antes de volver a empezar
}

/** El arranque es corto a propósito: la primera captura es lo más grande de la página y el
 *  LCP la mide cuando aparece (≈1,1 s después de montar). */
export const RITMO: Ritmo = {
  arranque: 250,
  tecla: 48,
  teclaFrase: 46,
  seleccion: 380,
  enter: 150,
  carga: 420,
  portada: 700,
  bajada: 1600,
  abajo: 350,
  entrada: 300,
  chips: 650,
  respiro: 320,
  sosten: 1200,
  cierre: 2800,
  salida: 450,
};

export interface Tramo {
  escena: Escena;
  capitulo: number;
  inicio: number;
  fin: number;
  /** Instantes absolutos de cada fase (ms desde el inicio del guion). */
  marcas: Record<string, number>;
}

export interface Guion {
  ritmo: Ritmo;
  tramos: Tramo[];
  total: number;
  capitulos: { inicio: number; fin: number }[];
}

export interface CapaPagina {
  id: TiendaId;
  opacidad: number;
  bajada: number; // 0 = portada, 1 = hasta donde baja esa tienda
}

export interface Cuadro {
  tramo: number;
  capitulo: number;
  avanceCapitulo: number;
  barra: { texto: string; seleccionado: boolean; escribiendo: boolean };
  pestana: { id: TiendaId | "monza" | null; cargando: boolean };
  carga: number | null;
  /** La página que se ve encima y, mientras la nueva aparece, la anterior debajo. */
  pagina: CapaPagina | null;
  fondo: CapaPagina | null;
  sistema: { visible: number; lineas: { escrito: number; chips: number }[] } | null;
  cierre: { escrito: number; foco: boolean } | null;
}

/* ─────────────── tecleo ─────────────── */

const ruido = (n: number) => {
  const x = Math.sin(n * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
};
const PAUSA_DESPUES = /[.,?!:]/;

/** Instante (ms desde que empieza a escribir) en que aparece cada letra. Ritmo de persona:
 *  cada tecla entre 70 % y 130 % del promedio, y una pausa después de la puntuación.
 *  En milisegundos enteros: con decimales, el bucle y los capítulos caen una fracción
 *  antes de donde deben y la barra salta de capítulo. */
export const tecleo = (texto: string, base: number): number[] => {
  const tiempos: number[] = [];
  let t = 0;
  for (let i = 0; i < texto.length; i++) {
    t += Math.round(base * (0.7 + 0.6 * ruido(i * 7 + texto.charCodeAt(i))));
    if (i > 0 && PAUSA_DESPUES.test(texto[i - 1])) t += Math.round(base * 1.4);
    tiempos.push(t);
  }
  return tiempos;
};

const escritoEn = (tiempos: number[], transcurrido: number) => {
  let n = 0;
  while (n < tiempos.length && tiempos[n] <= transcurrido) n++;
  return n;
};

const dur = (tiempos: number[]) => (tiempos.length ? tiempos[tiempos.length - 1] : 0);

/* ─────────────── curvas ─────────────── */

const acotar = (x: number) => Math.min(1, Math.max(0, x));
const salida = (x: number) => 1 - Math.pow(1 - acotar(x), 3);
const suave = (x: number) => {
  const v = acotar(x);
  return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
};

/* ─────────────── armar ─────────────── */

export const armarGuion = (escenas: Escena[], ritmo: Ritmo = RITMO): Guion => {
  const tramos: Tramo[] = [];
  let t = 0;
  let capitulo = -1;

  escenas.forEach((escena, i) => {
    if (escena.tipo !== "cierre") capitulo++;
    const inicio = t;
    const marcas: Record<string, number> = { inicio };

    if (escena.tipo === "tienda" || escena.tipo === "sistema") {
      marcas.escribe = inicio + (i === 0 ? ritmo.arranque : ritmo.seleccion);
      marcas.escrito = marcas.escribe + dur(tecleo(escena.url, ritmo.tecla));
      marcas.carga = marcas.escrito + ritmo.enter;
      marcas.aparece = marcas.carga + Math.round(ritmo.carga * 0.55);
      marcas.portada = marcas.carga + ritmo.carga;
    }

    if (escena.tipo === "tienda") {
      marcas.baja = marcas.portada + ritmo.portada;
      marcas.bajado = marcas.baja + ritmo.bajada;
      t = marcas.bajado + ritmo.abajo;
    } else if (escena.tipo === "sistema") {
      let l = marcas.portada + ritmo.entrada;
      escena.lineas.forEach((linea, k) => {
        marcas[`linea${k}`] = l;
        marcas[`escrita${k}`] = l + dur(tecleo(linea, ritmo.teclaFrase));
        marcas[`encendida${k}`] = marcas[`escrita${k}`] + ritmo.chips;
        l = marcas[`encendida${k}`] + ritmo.respiro;
      });
      const ultima = escena.lineas.length - 1;
      t = marcas[`encendida${ultima}`] + ritmo.sosten;
    } else {
      marcas.escribe = inicio + ritmo.respiro;
      marcas.escrito = marcas.escribe + dur(tecleo(escena.texto, ritmo.teclaFrase));
      t = marcas.escrito + ritmo.cierre;
      marcas.sale = t - ritmo.salida;
    }

    tramos.push({ escena, capitulo, inicio, fin: t, marcas });
  });

  const capitulos: { inicio: number; fin: number }[] = [];
  for (const tr of tramos) {
    const c = capitulos[tr.capitulo];
    if (c) c.fin = tr.fin;
    else capitulos[tr.capitulo] = { inicio: tr.inicio, fin: tr.fin };
  }
  return { ritmo, tramos, total: t, capitulos };
};

/* ─────────────── leer un instante ─────────────── */

const urlDe = (e: Escena | undefined) => (e && e.tipo !== "cierre" ? e.url : "");
const idPestana = (e: Escena | undefined): TiendaId | "monza" | null => (!e ? null : e.tipo === "tienda" ? e.id : "monza");

const lineasCompletas = (lineas: string[]) => lineas.map((l) => ({ escrito: l.length, chips: 1 }));

export const inicioCapitulo = (g: Guion, k: number) => g.capitulos[k]?.inicio ?? 0;

export const cuadroEn = (g: Guion, tiempo: number): Cuadro => {
  let t = tiempo % g.total;
  if (t < 0) t += g.total;
  let i = g.tramos.findIndex((tr) => t < tr.fin);
  if (i < 0) i = g.tramos.length - 1;
  const tr = g.tramos[i];
  const m = tr.marcas;
  const e = tr.escena;
  const cap = g.capitulos[tr.capitulo];
  const anterior = g.tramos[i - 1]?.escena;

  const cuadro: Cuadro = {
    tramo: i,
    capitulo: tr.capitulo,
    avanceCapitulo: acotar((t - cap.inicio) / (cap.fin - cap.inicio)),
    barra: { texto: "", seleccionado: false, escribiendo: false },
    pestana: { id: idPestana(anterior?.tipo === "cierre" ? undefined : anterior), cargando: false },
    carga: null,
    pagina: null,
    fondo: null,
    sistema: null,
    cierre: null,
  };

  // La página con la que se termina la escena anterior: sigue ahí hasta que cargue la nueva.
  const paginaAnterior: CapaPagina | null = anterior?.tipo === "tienda" ? { id: anterior.id, opacidad: 1, bajada: 1 } : null;

  if (e.tipo === "tienda" || e.tipo === "sistema") {
    // Barra de dirección.
    if (t < m.escribe) {
      const vieja = urlDe(anterior);
      cuadro.barra = { texto: vieja, seleccionado: vieja !== "", escribiendo: false };
    } else if (t < m.escrito) {
      const n = escritoEn(tecleo(e.url, g.ritmo.tecla), t - m.escribe);
      cuadro.barra = { texto: e.url.slice(0, n), seleccionado: false, escribiendo: true };
    } else {
      cuadro.barra = { texto: e.url, seleccionado: false, escribiendo: false };
    }

    // Carga.
    if (t >= m.carga) cuadro.pestana = { id: idPestana(e), cargando: t < m.portada };
    if (t >= m.carga && t < m.portada) cuadro.carga = salida((t - m.carga) / (m.portada - m.carga));

    // Lo que se ve dentro.
    const entra = salida((t - m.aparece) / (m.portada - m.aparece));
    if (t < m.aparece) cuadro.pagina = paginaAnterior;
    else if (t < m.portada) cuadro.fondo = paginaAnterior;

    if (e.tipo === "tienda") {
      if (t >= m.aparece) {
        const bajada = t < m.baja ? 0 : suave((t - m.baja) / (m.bajado - m.baja));
        cuadro.pagina = { id: e.id, opacidad: t < m.portada ? entra : 1, bajada };
      }
    } else if (t >= m.aparece) {
      cuadro.sistema = {
        visible: t < m.portada ? entra : 1,
        lineas: e.lineas.map((linea, k) => {
          const desde = m[`linea${k}`];
          if (t < desde) return { escrito: 0, chips: 0 };
          const escrito = escritoEn(tecleo(linea, g.ritmo.teclaFrase), t - desde);
          const chips = t < m[`escrita${k}`] ? 0 : salida((t - m[`escrita${k}`]) / (m[`encendida${k}`] - m[`escrita${k}`]));
          return { escrito, chips };
        }),
      };
    }
  } else {
    // Cierre: el sistema queda completo y la barra se vacía para recibir el link.
    const sistema = g.tramos[i - 1]?.escena;
    cuadro.pestana = { id: "monza", cargando: false };
    const visible = t < m.sale ? 1 : 1 - salida((t - m.sale) / (tr.fin - m.sale));
    cuadro.sistema = { visible, lineas: sistema?.tipo === "sistema" ? lineasCompletas(sistema.lineas) : [] };
    cuadro.cierre = {
      escrito: t < m.escribe ? 0 : escritoEn(tecleo(e.texto, g.ritmo.teclaFrase), t - m.escribe),
      foco: t >= m.escrito,
    };
  }

  return cuadro;
};

/** La primera tienda cargada y quieta en su portada. Es el cuadro que queda escrito en el HTML
 *  prerenderizado y desde donde sigue el navegador, para que la pantalla no se rebobine delante de
 *  quien acaba de llegar (auditoría móvil, 27-sep-2026). */
export const portadaInicial = (g: Guion) => g.tramos.find((tr) => tr.escena.tipo === "tienda")?.marcas.portada ?? 0;

/** Para quien pide menos movimiento: cada capítulo como una foto. La tienda, cargada y en
 *  su portada; el sistema, completo y con el cierre escrito. */
export const cuadroQuieto = (g: Guion, k: number): Cuadro => {
  const tramosDelCapitulo = g.tramos.filter((tr) => tr.capitulo === k);
  const primero = tramosDelCapitulo[0];
  if (primero?.escena.tipo === "tienda") return cuadroEn(g, primero.marcas.portada);
  const ultimo = tramosDelCapitulo[tramosDelCapitulo.length - 1] ?? g.tramos[g.tramos.length - 1];
  // Justo antes del fundido de salida: todo escrito y a plena luz.
  return cuadroEn(g, (ultimo.marcas.sale ?? ultimo.fin) - 1);
};
