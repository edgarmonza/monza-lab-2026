/* Las tarjetas de «Algunos de nuestros proyectos» y las líneas de «Lo que hacemos».
 * Cada tarjeta lleva a su caso (/work/<slug>) y muestra los íconos de lo que se produjo.
 * Los confidenciales van sin nombre del cliente (repo público: ver confidentiality.guard.test.ts). */
import type { LangText } from "@/i18n/types";
import type { IconoEntregable } from "@/data/casos/tipos";

type T = LangText;
const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });
const igual = (s: string): T => ({ es: s, en: s, de: s, pt: s });

/* Los nombres de los entregables (para el título y la lectura de pantalla de cada ícono). */
const E = {
  web: igual("Website"),
  agente: t("Agente de IA", "AI agent", "KI-Agent", "Agente de IA"),
  agentes: t("Agentes de IA", "AI agents", "KI-Agenten", "Agentes de IA"),
  whatsapp: igual("WhatsApp"),
  crm: igual("CRM"),
  contenido: t("Contenido", "Content", "Content", "Conteúdo"),
  catalogo: t("Catálogo", "Catalog", "Katalog", "Catálogo"),
  correo: t("Correo", "Email", "E-Mail", "Email"),
  pauta: t("Pauta", "Paid media", "Werbung", "Publicidade"),
  plataforma: t("Plataforma", "Platform", "Plattform", "Plataforma"),
  erp: t("Conexión con el ERP", "ERP connection", "ERP-Anbindung", "Ligação ao ERP"),
  datos: t("Datos", "Data", "Daten", "Dados"),
  reportesIndices: t("Reportes e índices", "Reports and indices", "Reports und Indizes", "Relatórios e índices"),
  marca: t("Marca", "Brand", "Marke", "Marca"),
  lineas: t("Líneas de negocio", "Business lines", "Geschäftsbereiche", "Linhas de negócio"),
  indice: t("Índice", "Index", "Index", "Índice"),
  lectura: t("Lectura de datos", "Data reading", "Datenauswertung", "Leitura de dados"),
  encuesta: t("Encuesta con IA", "AI survey", "KI-Umfrage", "Inquérito com IA"),
  aliados: t("Espacios para aliados", "Partner spaces", "Partnerbereiche", "Espaços para parceiros"),
  reportes: t("Reportes", "Reports", "Reports", "Relatórios"),
  reservas: t("Reservas", "Bookings", "Buchungen", "Reservas"),
};

export interface Entregable { icono: IconoEntregable; nombre: T }
export interface Proyecto {
  slug: string;
  nombre: T;
  etiqueta: T;
  alt: T;
  escritorio: string;
  /** Captura de celular encima (inclinada) … */
  celular?: string;
  /** … o una segunda captura de escritorio (las plataformas). */
  inserto?: string;
  producido: Entregable[];
}

const e = (icono: IconoEntregable, nombre: T): Entregable => ({ icono, nombre });

export const PROYECTOS: Proyecto[] = [
  {
    slug: "soloio",
    nombre: igual("soloio"),
    etiqueta: t("Moda de lino · el website nuevo y su operación", "Linen fashion · the new website and its operation", "Leinenmode · die neue Website und ihr Betrieb", "Moda de linho · o novo website e a sua operação"),
    alt: t("La web nueva de soloio", "The new soloio website", "Die neue Website von soloio", "O novo website da soloio"),
    escritorio: "/v2/portafolio/soloio.jpg",
    celular: "/v2/portafolio/soloio-m.jpg",
    producido: [e("catalogo", E.catalogo), e("crm", E.crm), e("correo", E.correo), e("pauta", E.pauta), e("contenido", E.contenido), e("web", E.web), e("agente", E.agente)],
  },
  {
    slug: "eleonora-morales",
    nombre: igual("Eleonora Morales"),
    etiqueta: t("Moda circular · tienda en línea", "Circular fashion · online store", "Zirkuläre Mode · Onlineshop", "Moda circular · loja online"),
    alt: igual("Eleonora Morales"),
    escritorio: "/v2/portafolio/eleonora.jpg",
    celular: "/v2/portafolio/eleonora-m.jpg",
    producido: [e("web", E.web), e("agente", E.agente), e("whatsapp", E.whatsapp), e("crm", E.crm), e("contenido", E.contenido)],
  },
  {
    slug: "plataforma-comercio-exterior",
    nombre: t("Comercio exterior", "Foreign trade", "Außenhandel", "Comércio externo"),
    etiqueta: t("Plataforma con IA para una importadora", "AI platform for an importer", "KI-Plattform für einen Importeur", "Plataforma com IA para uma importadora"),
    alt: t("Plataforma de comercio exterior", "Foreign trade platform", "Außenhandelsplattform", "Plataforma de comércio externo"),
    escritorio: "/v2/portafolio/comercio.jpg",
    inserto: "/v2/portafolio/comercio-i.jpg",
    producido: [e("plataforma", E.plataforma), e("agente", E.agentes), e("web", E.web), e("datos", E.erp)],
  },
  {
    slug: "monza-haus",
    nombre: igual("MonzaHaus"),
    etiqueta: t("Porsche de colección · producto propio", "Collector Porsche · our own product", "Sammler-Porsche · eigenes Produkt", "Porsche de coleção · produto próprio"),
    alt: igual("MonzaHaus"),
    escritorio: "/v2/portafolio/monzahaus.jpg",
    celular: "/v2/portafolio/monzahaus-m.jpg",
    producido: [e("plataforma", E.plataforma), e("datos", E.datos), e("agente", E.agente), e("tablero", E.reportesIndices), e("contenido", E.contenido)],
  },
  {
    slug: "bavarian-econs",
    nombre: igual("Bavarian Econs"),
    etiqueta: t("BMW clásicos eléctricos · marca propia", "Electric classic BMWs · our own brand", "Elektrische BMW-Klassiker · eigene Marke", "BMW clássicos elétricos · marca própria"),
    alt: igual("Bavarian Econs"),
    escritorio: "/v2/portafolio/bavarian.jpg",
    celular: "/v2/portafolio/bavarian-m.jpg",
    producido: [e("marca", E.marca), e("web", E.web), e("crm", E.crm), e("contenido", E.contenido), e("pauta", E.pauta)],
  },
  {
    slug: "pacho-alvarez",
    nombre: igual("Pacho Álvarez"),
    etiqueta: t("Piloto del Dakar · marca personal", "Dakar rider · personal brand", "Dakar-Fahrer · Personal Brand", "Piloto do Dakar · marca pessoal"),
    alt: igual("Pacho Álvarez"),
    escritorio: "/v2/portafolio/pacho.jpg",
    celular: "/v2/portafolio/pacho-m.jpg",
    producido: [e("web", E.web), e("marca", E.marca), e("tablero", E.lineas), e("whatsapp", E.whatsapp)],
  },
  {
    slug: "ia-index",
    nombre: igual("Monza Index"),
    etiqueta: t("Índice de adopción de IA · producto propio", "AI adoption index · our own product", "KI-Adoptionsindex · eigenes Produkt", "Índice de adoção de IA · produto próprio"),
    alt: igual("Monza Index"),
    escritorio: "/v2/portafolio/index.jpg",
    celular: "/v2/portafolio/index-m.jpg",
    producido: [e("marca", E.indice), e("datos", E.lectura), e("web", E.web), e("agente", E.encuesta), e("plataforma", E.aliados), e("tablero", E.reportes)],
  },
  {
    slug: "plataforma-turismo",
    nombre: t("Turismo", "Travel", "Tourismus", "Turismo"),
    etiqueta: t("Planeador de viajes con IA para un operador europeo", "AI trip planner for a European operator", "KI-Reiseplaner für einen europäischen Anbieter", "Planeador de viagens com IA para um operador europeu"),
    alt: t("Plataforma de turismo", "Travel platform", "Tourismusplattform", "Plataforma de turismo"),
    escritorio: "/v2/portafolio/turismo.jpg",
    inserto: "/v2/portafolio/turismo-i.jpg",
    producido: [e("agente", E.agente), e("datos", E.catalogo), e("marca", E.marca), e("web", E.web), e("plataforma", E.reservas)],
  },
  {
    slug: "guardian-of-speed",
    nombre: igual("Guardian of Speed"),
    etiqueta: t("Concierge de colecciones en Europa", "Collection concierge in Europe", "Sammlungs-Concierge in Europa", "Concierge de coleções na Europa"),
    alt: igual("Guardian of Speed"),
    escritorio: "/v2/portafolio/guardian.jpg",
    celular: "/v2/portafolio/guardian-m.jpg",
    producido: [e("marca", E.marca), e("web", E.web), e("contenido", E.contenido), e("whatsapp", E.whatsapp)],
  },
];

/* La estela de «Criterio»: la campaña de soloio y el Instagram de Monza, alternados.
 * Las de Eleonora quedan fuera mientras se revisan contra su regla de imagen. */
export const ESTELA: { src: string; marca: "soloio" | "monza" }[] = [
  { src: "/v2/estela/soloio-terraza.webp", marca: "soloio" },
  { src: "/v2/estela/monza-casco.webp", marca: "monza" },
  { src: "/v2/estela/soloio-jardin.webp", marca: "soloio" },
  { src: "/v2/estela/monza-gorra.webp", marca: "monza" },
  { src: "/v2/estela/soloio-cena.webp", marca: "soloio" },
  { src: "/v2/estela/monza-burbuja.webp", marca: "monza" },
  { src: "/v2/estela/soloio-iglesia.webp", marca: "soloio" },
  { src: "/v2/estela/monza-tacon.webp", marca: "monza" },
  { src: "/v2/estela/soloio-cartas.webp", marca: "soloio" },
  { src: "/v2/estela/monza-luz-rosa.webp", marca: "monza" },
  { src: "/v2/estela/soloio-boda.webp", marca: "soloio" },
  { src: "/v2/estela/monza-flow.webp", marca: "monza" },
];

export interface Fila {
  id: string;
  n: string;
  meta: T;
  titulo: T;
  texto: T;
  ejemplos: { t: T; reserva?: boolean }[];
  /** Ruta interna sin idioma («/shopify») o ancla de esta página («#proyectos»). */
  href: string;
  ir: T;
  foto: string;
}

export const FILAS: Fila[] = [
  {
    id: "studio",
    n: "01",
    meta: igual("E-commerce"),
    titulo: igual("Studio"),
    texto: t(
      "Tu tienda, tu pauta, tus clientes y tu WhatsApp, conectados en un solo sistema que vende todos los días.",
      "Your store, your ads, your customers and your WhatsApp, connected in one system that sells every day.",
      "Dein Shop, deine Werbung, deine Kunden und dein WhatsApp, verbunden in einem System, das jeden Tag verkauft.",
      "A tua loja, a tua publicidade, os teus clientes e o teu WhatsApp, ligados num só sistema que vende todos os dias.",
    ),
    ejemplos: [{ t: igual("soloio") }, { t: igual("Eleonora Morales") }],
    href: "/shopify",
    ir: t("Ver Studio", "See Studio", "Zu Studio", "Ver Studio"),
    foto: "/v2/portafolio/soloio.jpg",
  },
  {
    id: "plataformas",
    n: "02",
    meta: t("Empresas", "Companies", "Unternehmen", "Empresas"),
    titulo: t("Plataformas", "Platforms", "Plattformen", "Plataformas"),
    texto: t(
      "El sistema que tu operación necesita, con inteligencia artificial adentro: cotizar, vender, atender y medir en un solo lugar.",
      "The system your operation needs, with artificial intelligence inside: quote, sell, serve and measure in one place.",
      "Das System, das dein Betrieb braucht, mit künstlicher Intelligenz im Kern: anbieten, verkaufen, betreuen und messen an einem Ort.",
      "O sistema de que a tua operação precisa, com inteligência artificial lá dentro: orçamentar, vender, atender e medir num só lugar.",
    ),
    ejemplos: [
      { t: t("Comercio exterior", "Foreign trade", "Außenhandel", "Comércio externo"), reserva: true },
      { t: t("Turismo", "Travel", "Tourismus", "Turismo"), reserva: true },
    ],
    href: "/work/plataforma-comercio-exterior",
    ir: t("Ver plataformas", "See platforms", "Plattformen ansehen", "Ver plataformas"),
    foto: "/v2/portafolio/comercio.jpg",
  },
  {
    id: "sessions",
    n: "03",
    meta: t("Aprender", "Learn", "Lernen", "Aprender"),
    titulo: igual("Sessions"),
    texto: t(
      "Talleres, bootcamp y acompañamiento uno a uno para trabajar con inteligencia artificial sobre lo tuyo.",
      "Workshops, bootcamp and one-on-one coaching to work with artificial intelligence on your own work.",
      "Workshops, Bootcamp und Eins-zu-eins-Begleitung, um mit künstlicher Intelligenz an deiner eigenen Arbeit zu arbeiten.",
      "Workshops, bootcamp e acompanhamento individual para trabalhar com inteligência artificial sobre o que é teu.",
    ),
    ejemplos: [{ t: t("La tarde", "The afternoon", "Der Nachmittag", "A tarde") }, { t: igual("Bootcamp") }, { t: igual("1:1") }, { t: igual("In-company") }],
    href: "/sessions",
    ir: t("Ver Sessions", "See Sessions", "Zu Sessions", "Ver Sessions"),
    foto: "/v2/video/sessions-reel.jpg",
  },
  {
    id: "ventures",
    n: "04",
    meta: t("Lo propio", "Our own", "Eigenes", "O nosso"),
    titulo: igual("Ventures"),
    texto: t(
      "Marcas y productos propios. Ahí se prueba primero lo que después llega a los clientes.",
      "Brands and products of our own. That's where we first test what later reaches clients.",
      "Eigene Marken und Produkte. Dort testen wir zuerst, was später bei Kunden ankommt.",
      "Marcas e produtos próprios. É aí que se testa primeiro o que depois chega aos clientes.",
    ),
    ejemplos: [{ t: igual("MonzaHaus") }, { t: igual("Bavarian Econs") }, { t: igual("Monza Index") }],
    href: "#proyectos",
    ir: t("Ver proyectos", "See projects", "Projekte ansehen", "Ver projetos"),
    foto: "/v2/portafolio/monzahaus.jpg",
  },
];
