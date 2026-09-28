/* El formato de un caso (/work/<slug>) en la web v2. Sale del molde del prototipo
 * (docs/internal/portada/prototipo/caso-*.html + caso.css + caso.js). Cada caso es un archivo
 * de esta carpeta que exporta `caso`; el registro (index.ts) los junta en el orden de la portada.
 * Todo texto visible va en los cuatro idiomas. Reglas: sin guiones largos, sin jerga técnica,
 * sin nada contractual ni etiquetas de estado; los confidenciales, sin nombre del cliente. */
import type { LangText } from "@/i18n/types";

export type T = LangText;

/** Los íconos de «Lo que producimos» (y de las tarjetas de la portada). */
export type IconoEntregable =
  | "web" | "agente" | "whatsapp" | "crm" | "contenido" | "pauta"
  | "plataforma" | "tablero" | "correo" | "catalogo" | "marca" | "datos";

/** Lo que se ve arriba del texto de cada pieza. Las rutas de imagen son del sitio: "/v2/caso-…/x.webp". */
export type Visual =
  | { tipo: "cubre"; src: string; alt: T; posicion?: string }        // captura que llena el panel
  | { tipo: "cel"; src: string; alt: T }                             // captura de celular, inclinada
  | { tipo: "par"; atras: string; frente: string; alt: T }           // dos fotos superpuestas
  | { tipo: "grande"; texto: string; sub: T }                        // un número o una palabra gigante
  | { tipo: "fuentes"; fuentes: T[]; total: T };                     // varias fuentes que llegan a una

export interface NodoTecnologia {
  id: string;
  nombre: T;
  /** Nombre corto para el celular. */
  corto?: T;
  /** Slug de simple-icons (shopify, whatsapp, meta, google, odoo…). Sin ícono: salen las iniciales. */
  icono?: string;
  tipo: "herramienta" | "ia";
  hace: T;
  /** ids con los que se conecta (un cable por par). */
  con: string[];
  img?: string;
}

export interface Caso {
  /** La URL: /work/<slug>. */
  slug: string;
  nombre: T;
  categoria: "studio" | "plataforma" | "venture";
  confidencial?: boolean;
  seo: { titulo: T; descripcion: T };
  hero: {
    /** El título en dos líneas; la segunda va en rosa. */
    linea1: T;
    linea2: T;
    frase: T;
    pastillas: T[];
    /** «Ver la tienda ↗», «Ver la web ↗»… (opcional; los confidenciales no llevan). */
    enlace?: { href: string; texto: T };
    /** La web que se recorre sola: lo que se lee en la barra y dos capturas largas. */
    web: { barra: string; escritorio: string; celular?: string;
      /** Plataformas: una tarjeta que flota sobre el navegador en vez del celular (con su sello). */
      flota?: { img: string; sello: T } };
    /** La palabra gigante de fondo. */
    fantasma: string;
    /** Confidenciales: una sola línea corta, sin lenguaje legal. */
    reserva?: T;
  };
  producimos: { titulo: T; items: { icono: IconoEntregable; nombre: T; texto: T }[] };
  hace: { titulo: T; items: { verbo: T; texto: T }[] };
  reto: { titulo: T; items: { titulo: T; texto: T }[] };
  piezas: {
    titulo: T;
    lede: T;
    centro: T;
    centroSub: T;
    items: { pestana: T; clave: T; titulo: T; texto: T; resuelve: T; visual: Visual }[];
  };
  tecnologia: { titulo: T; lede: T; centro: { titulo: T; sub: T }; nodos: NodoTecnologia[] };
  /** forma: web (grande, 2×2) · alta (1×2) · ancha (2×2) · cel (alta, en marco de celular) · completa (todo el ancho, 2 filas) · tira (todo el ancho, 1 fila). posicion = object-position. */
  galeria: { titulo: T; items: { src: string; pie: T; alt: T; forma?: "web" | "alta" | "ancha" | "cel" | "completa" | "tira"; posicion?: string }[]; nota?: T };
  /** `cifra` va como texto fijo («24/7», «751») o traducida cuando es palabra («Décadas»). */
  cambio: { titulo: T; items: { cifra: string | T; negrita: T; texto: T }[] };
  /** eyebrow: «Tu marca», «Tu empresa»… (si falta, «Hablemos»). */
  cierre: { eyebrow?: T; titulo: T; resaltado: T; lede: T; enlace: { href: string; texto: T } };
  /** Para la tarjeta de la portada y de «otros casos». */
  tarjeta: { etiqueta: T; imagen: string; imagenCel?: string; inserto?: string };
}
