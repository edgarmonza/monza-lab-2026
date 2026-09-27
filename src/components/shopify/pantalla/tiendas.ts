/* Lo que muestra la pantalla del hero de /shopify: las tres tiendas, sus capturas y los
 * textos en los cuatro idiomas.
 *
 * soloio: el contrato (cláusula 8.5) pide autorización escrita para mostrar sus fotos;
 * la dio Alejandra el 26-sep-2026. Su web nueva todavía no está al aire, por eso lleva
 * el aviso «En construcción». Sin cifras, bases de datos ni información de sus clientes.
 *
 * Las capturas se rehacen con docs/internal/pantalla/ (capturar.mjs + codificar.sh). */
import type { Lang } from "@/i18n/types";
import type { Escena, TiendaId } from "./guion";

type L = Record<Lang, string>;
const igual = (s: string): L => ({ es: s, en: s, de: s, pt: s });

export type Formato = "movil" | "escritorio";

/** Ancho / alto de lo que se ve de la página dentro de la ventana. */
export const ASPECTO: Record<Formato, number> = { movil: 7 / 9, escritorio: 16 / 10 };
/** Cuándo se usan las capturas de escritorio. Es una media query de viewport y no del ancho de la
 *  ventana porque el navegador la tiene que resolver desde el HTML prerenderizado, antes de React:
 *  si no, el celular baja las dos versiones. 528 px de viewport = 480 px de ventana (24 px de
 *  margen a cada lado en el celular; desde 768 px la ventana ya mide más de 480). La misma regla
 *  vive en index.css (proporción de la ventana). */
export const MEDIA_ESCRITORIO = "(min-width: 528px)";

export interface Captura {
  avif: string;
  webp: string;
  /** px del archivo */
  ancho: number;
  alto: number;
  /** px CSS del sitio al capturar: 390 en celular, 1440 en escritorio */
  anchoSitio: number;
  /** hasta dónde baja la página, en px CSS del sitio */
  bajarA: number;
}

export interface Tienda {
  id: TiendaId;
  /** lo que se escribe en la barra de dirección */
  url: string;
  nombre: string;
  /** ícono de la pestaña; null = el globo del navegador (el sitio no tiene favicon) */
  icono: string | null;
  /** chapita junto a la dirección */
  aviso?: L;
  capturas: Record<Formato, Captura>;
}

const R = "/images/shopify/pantalla";
const captura = (id: TiendaId, f: "m" | "d", ancho: number, alto: number, bajarA: number): Captura => ({
  avif: `${R}/${id}-${f}.avif`,
  webp: `${R}/${id}-${f}.webp`,
  ancho,
  alto,
  anchoSitio: f === "m" ? 390 : 1440,
  bajarA,
});

export const TIENDAS: Tienda[] = [
  {
    id: "soloio",
    url: "soloio.com",
    nombre: "soloio",
    icono: `${R}/soloio-icono.png`,
    aviso: { es: "En construcción", en: "In the works", de: "Im Aufbau", pt: "Em construção" },
    // portada → categorías → «¿De qué color vienes hoy?»
    capturas: { movil: captura("soloio", "m", 1000, 4358, 1190), escritorio: captura("soloio", "d", 1280, 2000, 1340) },
  },
  {
    id: "eleonora",
    url: "eleonoramorales.com",
    nombre: "Eleonora",
    icono: `${R}/eleonora-icono.svg`,
    // celular: la foto → el nombre y «Comprar» · escritorio: portada → la tapa de Marie Claire
    capturas: { movil: captura("eleonora", "m", 1000, 2306, 380), escritorio: captura("eleonora", "d", 1280, 1572, 860) },
  },
  {
    id: "skinv",
    url: "skinv.com.co",
    nombre: "Skin V",
    icono: null,
    // celular: la foto → «El cuidado que le das a tu rostro…» · escritorio: portada → el catálogo con precios
    capturas: { movil: captura("skinv", "m", 1000, 2896, 620), escritorio: captura("skinv", "d", 1280, 2754, 2195) },
  },
];

/* ─────────────── el sistema, como lo estamos montando en soloio ─────────────── */

export type IconoChip =
  "meta" | "google" | "analytics" | "shopify" | "whatsapp" | "tiendas" | "base" | "correo" | "catalogo" | "inventario";

export interface LineaSistema {
  frase: L;
  /** lo que se conecta para que la frase sea verdad, de izquierda a derecha */
  chips: { icono: IconoChip; texto: L }[];
}

export const SISTEMA: LineaSistema[] = [
  {
    frase: { es: "Crece tus ventas.", en: "Grow your sales.", de: "Steigere deinen Umsatz.", pt: "Aumenta as tuas vendas." },
    chips: [
      { icono: "meta", texto: igual("Meta") },
      { icono: "google", texto: igual("Google") },
      { icono: "analytics", texto: igual("Analytics") },
      { icono: "shopify", texto: igual("Shopify") },
    ],
  },
  {
    frase: { es: "Configura tu CRM.", en: "Set up your CRM.", de: "Richte dein CRM ein.", pt: "Configura o teu CRM." },
    chips: [
      { icono: "tiendas", texto: { es: "Tiendas", en: "Stores", de: "Läden", pt: "Lojas" } },
      { icono: "shopify", texto: igual("Shopify") },
      { icono: "base", texto: { es: "Base única", en: "Customer base", de: "Kundenbasis", pt: "Uma só base" } },
      { icono: "correo", texto: { es: "Correo", en: "Email", de: "E-Mail", pt: "Email" } },
    ],
  },
  {
    frase: { es: "Crea agentes de WhatsApp.", en: "Build WhatsApp agents.", de: "Baue WhatsApp-Agenten.", pt: "Cria agentes de WhatsApp." },
    chips: [
      { icono: "catalogo", texto: { es: "Catálogo", en: "Catalog", de: "Katalog", pt: "Catálogo" } },
      { icono: "inventario", texto: { es: "Inventario", en: "Inventory", de: "Bestand", pt: "Stock" } },
      { icono: "whatsapp", texto: igual("WhatsApp") },
    ],
  },
];

export const COPY = {
  antetitulo: {
    es: "Así lo estamos montando en soloio",
    en: "How we're building it at soloio",
    de: "So bauen wir es gerade bei soloio",
    pt: "Assim o montamos na soloio",
  },
  cierre: { es: "¿Y la tuya?", en: "What about yours?", de: "Und deiner?", pt: "E a tua?" },
  placeholder: {
    es: "Pega el link de un producto tuyo",
    en: "Paste a link to your product",
    de: "Link zu deinem Produkt",
    pt: "Cola o link de um produto teu",
  },
  /** La etiqueta visible del cuarto capítulo (corta: en un celular de 360 px no cabe más) y
   *  cómo se anuncia el botón. */
  capituloSistema: { es: "Sistema", en: "System", de: "System", pt: "Sistema" },
  verSistema: { es: "Ver el sistema", en: "Show the system", de: "Zeige das System", pt: "Ver o sistema" },
  controles: { es: "Controles de la pantalla", en: "Screen controls", de: "Bildschirmsteuerung", pt: "Controlos do ecrã" },
  ver: { es: "Ver", en: "Show", de: "Zeige", pt: "Ver" },
  pausar: { es: "Pausar la animación", en: "Pause the animation", de: "Animation pausieren", pt: "Pausar a animação" },
  seguir: { es: "Seguir la animación", en: "Play the animation", de: "Animation fortsetzen", pt: "Continuar a animação" },
  descripcion: {
    es: "Una pantalla escribe las direcciones de tres tiendas que construimos, soloio.com, eleonoramorales.com y skinv.com.co, y recorre cada una. Después muestra el sistema como lo estamos montando en soloio. Crece tus ventas: Meta, Google y Analytics conectados a Shopify. Configura tu CRM: las tiendas físicas y Shopify en una sola base de clientes que alimenta el correo. Crea agentes de WhatsApp: leen el catálogo y el inventario.",
    en: "A screen types the addresses of three stores we built, soloio.com, eleonoramorales.com and skinv.com.co, and scrolls through each. Then it shows the system as we're building it at soloio. Grow your sales: Meta, Google and Analytics connected to Shopify. Set up your CRM: the physical stores and Shopify in one customer base that feeds email. Build WhatsApp agents: they read the catalog and the inventory.",
    de: "Ein Bildschirm tippt die Adressen von drei Stores, die wir gebaut haben, soloio.com, eleonoramorales.com und skinv.com.co, und scrollt durch jeden. Danach zeigt er das System, wie wir es gerade bei soloio aufbauen. Steigere deinen Umsatz: Meta, Google und Analytics an Shopify angebunden. Richte dein CRM ein: die Läden und Shopify in einer Kundenbasis, die die E-Mails speist. Baue WhatsApp-Agenten: Sie lesen Katalog und Bestand.",
    pt: "Um ecrã escreve os endereços de três lojas que construímos, soloio.com, eleonoramorales.com e skinv.com.co, e percorre cada uma. Depois mostra o sistema tal como o estamos a montar na soloio. Aumenta as tuas vendas: Meta, Google e Analytics ligados à Shopify. Configura o teu CRM: as lojas físicas e a Shopify numa só base de clientes que alimenta o email. Cria agentes de WhatsApp: leem o catálogo e o stock.",
  },
} satisfies Record<string, L>;

export const URL_MONZA = "monzalab.com";

export const escenasPara = (lang: Lang): Escena[] => [
  ...TIENDAS.map((t): Escena => ({ tipo: "tienda", id: t.id, url: t.url })),
  { tipo: "sistema", url: URL_MONZA, lineas: SISTEMA.map((l) => l.frase[lang]) },
  { tipo: "cierre", texto: COPY.cierre[lang] },
];
