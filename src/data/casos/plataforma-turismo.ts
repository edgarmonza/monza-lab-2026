/* Caso · Turismo (plataforma confidencial). Sale de docs/internal/portada/prototipo/caso-turismo.html.
 * CONFIDENCIAL: sin nombre del cliente, de sus marcas, de sus proveedores ni de personas. «Portugal» y
 * «Lisboa» solo aparecen en las capturas ya neutralizadas, igual que en /work. */
import type { Caso, T } from "./tipos";

const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });
const igual = (s: string): T => ({ es: s, en: s, de: s, pt: s });
const M = "/v2/caso-turismo";

export const caso: Caso = {
  slug: "plataforma-turismo",
  nombre: t("Turismo", "Tourism", "Tourismus", "Turismo"),
  categoria: "plataforma",
  confidencial: true,
  seo: {
    titulo: t(
      "Plataforma de viajes con IA para turismo | Monza Lab",
      "AI travel platform for a tour operator | Monza Lab",
      "KI-Reiseplattform für einen Reiseveranstalter | Monza Lab",
      "Plataforma de viagens com IA para turismo | Monza Lab",
    ),
    descripcion: t(
      "Décadas de conocimiento de un operador de turismo europeo, convertidas en un planificador de viajes con IA y un catálogo de 751 experiencias.",
      "Decades of a European tour operator's knowledge, turned into an AI trip planner and a catalog of 751 experiences.",
      "Jahrzehnte Wissen eines europäischen Reiseveranstalters, verwandelt in einen KI-Reiseplaner und einen Katalog mit 751 Erlebnissen.",
      "Décadas de conhecimento de um operador turístico europeu, transformadas num planeador de viagens com IA e num catálogo de 751 experiências.",
    ),
  },
  hero: {
    linea1: t("Turismo", "Tourism", "Tourismus", "Turismo"),
    linea2: igual("AI-native"),
    frase: t(
      "Décadas de conocimiento local de un operador de turismo, convertidas en un planificador de viajes con inteligencia artificial.",
      "Decades of local knowledge from a tour operator, turned into an artificial intelligence trip planner.",
      "Jahrzehnte lokalen Wissens eines Reiseveranstalters, verwandelt in einen Reiseplaner mit künstlicher Intelligenz.",
      "Décadas de conhecimento local de um operador turístico, transformadas num planeador de viagens com inteligência artificial.",
    ),
    pastillas: [
      t("Plataforma con IA", "AI platform", "KI-Plattform", "Plataforma com IA"),
      t("Turismo receptivo", "Inbound tourism", "Incoming-Tourismus", "Turismo recetivo"),
      t("Europa", "Europe", "Europa", "Europa"),
      t("Confidencial", "Confidential", "Vertraulich", "Confidencial"),
    ],
    web: { barra: "plataforma °02", escritorio: `${M}/larga.webp` },
    fantasma: "Viajes",
    reserva: t(
      "El nombre del cliente se mantiene en reserva.",
      "The client's name is kept confidential.",
      "Der Name des Kunden bleibt vertraulich.",
      "O nome do cliente mantém-se reservado.",
    ),
  },
  producimos: {
    titulo: t("Cinco cosas, un solo viaje.", "Five things, one trip.", "Fünf Dinge, eine einzige Reise.", "Cinco coisas, uma só viagem."),
    items: [
      {
        icono: "agente",
        nombre: t("Agente de IA", "AI agent", "KI-Agent", "Agente de IA"),
        texto: t(
          "Un planificador de viajes: el viajero cuenta qué le gusta y recibe su viaje armado, a cualquier hora.",
          "A trip planner: travelers say what they like and get their trip put together, at any hour.",
          "Ein Reiseplaner: Reisende erzählen, was sie mögen, und bekommen ihre fertige Reise, zu jeder Uhrzeit.",
          "Um planeador de viagens: o viajante conta o que gosta e recebe a viagem montada, a qualquer hora.",
        ),
      },
      {
        icono: "datos",
        nombre: t("Catálogo", "Catalog", "Katalog", "Catálogo"),
        texto: t(
          "751 experiencias reales del operador, convertidas en datos que usa el planificador.",
          "751 real experiences from the operator, turned into data the planner uses.",
          "751 echte Erlebnisse des Veranstalters, in Daten verwandelt, die der Planer nutzt.",
          "751 experiências reais do operador, transformadas em dados que o planeador usa.",
        ),
      },
      {
        icono: "marca",
        nombre: t("Marca", "Brand", "Marke", "Marca"),
        texto: t(
          "La identidad del producto, pensada para el viajero que llega por su cuenta.",
          "The product's identity, designed for travelers who arrive on their own.",
          "Die Identität des Produkts, gedacht für Reisende, die auf eigene Faust kommen.",
          "A identidade do produto, pensada para o viajante que chega por conta própria.",
        ),
      },
      {
        icono: "web",
        nombre: t("Website", "Website", "Website", "Website"),
        texto: t(
          "La web para el viajero, que planea desde el celular.",
          "The website for travelers, who plan from their phone.",
          "Die Website für Reisende, die vom Handy aus planen.",
          "O site para o viajante, que planeia a partir do telemóvel.",
        ),
      },
      {
        icono: "plataforma",
        nombre: t("Reservas", "Bookings", "Buchungen", "Reservas"),
        texto: t(
          "La conexión con el sistema de reservas del operador, con disponibilidad y precios reales.",
          "The connection to the operator's booking system, with real availability and prices.",
          "Die Verbindung zum Buchungssystem des Veranstalters, mit echter Verfügbarkeit und echten Preisen.",
          "A ligação ao sistema de reservas do operador, com disponibilidade e preços reais.",
        ),
      },
    ],
  },
  hace: {
    titulo: t(
      "Convertimos lo que sabe el operador en un producto.",
      "We turn what the operator knows into a product.",
      "Wir verwandeln das Wissen des Veranstalters in ein Produkt.",
      "Transformamos o que o operador sabe num produto.",
    ),
    items: [
      {
        verbo: t("Diseña", "Designs", "Gestaltet", "Desenha"),
        texto: t(
          "La marca y el producto, pensados para el viajero que planea desde el celular.",
          "The brand and the product, designed for travelers who plan from their phone.",
          "Die Marke und das Produkt, gedacht für Reisende, die vom Handy aus planen.",
          "A marca e o produto, pensados para o viajante que planeia a partir do telemóvel.",
        ),
      },
      {
        verbo: t("Construye", "Builds", "Baut", "Constrói"),
        texto: t(
          "El planificador con inteligencia artificial y la web para el viajero.",
          "The artificial intelligence planner and the website for travelers.",
          "Den Planer mit künstlicher Intelligenz und die Website für Reisende.",
          "O planeador com inteligência artificial e o site para o viajante.",
        ),
      },
      {
        verbo: t("Convierte", "Converts", "Verwandelt", "Converte"),
        texto: t(
          "Décadas de conocimiento del operador en un catálogo de datos que el planificador usa.",
          "Decades of the operator's knowledge into a data catalog the planner uses.",
          "Jahrzehnte Wissen des Veranstalters in einen Datenkatalog, den der Planer nutzt.",
          "Décadas de conhecimento do operador num catálogo de dados que o planeador usa.",
        ),
      },
      {
        verbo: t("Conecta", "Connects", "Verbindet", "Liga"),
        texto: t(
          "La plataforma con el sistema de reservas que el operador ya usa.",
          "The platform to the booking system the operator already uses.",
          "Die Plattform mit dem Buchungssystem, das der Veranstalter bereits nutzt.",
          "A plataforma ao sistema de reservas que o operador já usa.",
        ),
      },
    ],
  },
  reto: {
    titulo: t(
      "El conocimiento estaba en la cabeza de la gente, no en un producto.",
      "The knowledge lived in people's heads, not in a product.",
      "Das Wissen steckte in den Köpfen der Leute, nicht in einem Produkt.",
      "O conhecimento estava na cabeça das pessoas, não num produto.",
    ),
    items: [
      {
        titulo: t("Décadas de saber local.", "Decades of local know-how.", "Jahrzehnte lokales Wissen.", "Décadas de saber local."),
        texto: t(
          "El operador conoce hoteles, experiencias y lugares que no salen en ninguna guía, pero ese saber vivía en su equipo.",
          "The operator knows hotels, experiences and places that appear in no guidebook, but that know-how lived only in its team.",
          "Der Veranstalter kennt Hotels, Erlebnisse und Orte, die in keinem Reiseführer stehen, aber dieses Wissen lebte nur in seinem Team.",
          "O operador conhece hotéis, experiências e lugares que não aparecem em nenhum guia, mas esse saber vivia na sua equipa.",
        ),
      },
      {
        titulo: t(
          "El viajero quiere armar su viaje solo.",
          "Travelers want to plan their trip on their own.",
          "Reisende wollen ihre Reise selbst planen.",
          "O viajante quer montar a viagem sozinho.",
        ),
        texto: t(
          "Hoy se planea desde el celular, a cualquier hora, y se espera una respuesta a la medida, no un catálogo.",
          "Today people plan from their phone, at any hour, and expect a tailored answer, not a catalog.",
          "Heute plant man vom Handy aus, zu jeder Uhrzeit, und erwartet eine maßgeschneiderte Antwort, keinen Katalog.",
          "Hoje planeia-se a partir do telemóvel, a qualquer hora, e espera-se uma resposta à medida, não um catálogo.",
        ),
      },
      {
        titulo: t(
          "Vender directo sin perder el toque local.",
          "Selling direct without losing the local touch.",
          "Direkt verkaufen, ohne den lokalen Charakter zu verlieren.",
          "Vender diretamente sem perder o toque local.",
        ),
        texto: t(
          "Llegar al viajero final sin que la experiencia se vuelva genérica.",
          "Reaching the end traveler without the experience turning generic.",
          "Den Reisenden direkt erreichen, ohne dass das Erlebnis beliebig wird.",
          "Chegar ao viajante final sem que a experiência se torne genérica.",
        ),
      },
    ],
  },
  piezas: {
    titulo: t("Cuatro piezas, un solo viaje.", "Four pieces, one trip.", "Vier Bausteine, eine einzige Reise.", "Quatro peças, uma só viagem."),
    lede: t(
      "Del conocimiento del operador a un viaje armado a la medida. Toca cualquiera para ver qué hace y qué le resuelve.",
      "From the operator's knowledge to a tailor-made trip. Tap any piece to see what it does and what it solves.",
      "Vom Wissen des Veranstalters zur maßgeschneiderten Reise. Tippe auf einen Baustein, um zu sehen, was er tut und was er löst.",
      "Do conhecimento do operador a uma viagem montada à medida. Toca em qualquer peça para ver o que faz e o que resolve.",
    ),
    centro: t("Un solo viaje", "One trip", "Eine einzige Reise", "Uma só viagem"),
    centroSub: t("armado a la medida", "tailor-made", "maßgeschneidert", "montada à medida"),
    items: [
      {
        pestana: t("Planificador", "Planner", "Planer", "Planeador"),
        clave: t("01 · Planificador de viajes con IA", "01 · AI trip planner", "01 · KI-Reiseplaner", "01 · Planeador de viagens com IA"),
        titulo: t(
          "El viajero cuenta qué le gusta y recibe su viaje armado.",
          "Travelers say what they like and get their trip put together.",
          "Reisende erzählen, was sie mögen, und bekommen ihre fertige Reise.",
          "O viajante conta o que gosta e recebe a viagem montada.",
        ),
        texto: t(
          "Una conversación con inteligencia artificial: cuántos días, qué le gusta, cuánto quiere gastar. Con eso arma el viaje completo, con hoteles, experiencias y lugares que solo conoce un local.",
          "A conversation with artificial intelligence: how many days, what they like, how much they want to spend. With that it builds the whole trip, with hotels, experiences and places only a local knows.",
          "Ein Gespräch mit künstlicher Intelligenz: wie viele Tage, was man mag, wie viel man ausgeben will. Daraus entsteht die ganze Reise, mit Hotels, Erlebnissen und Orten, die nur Einheimische kennen.",
          "Uma conversa com inteligência artificial: quantos dias, o que gosta, quanto quer gastar. Com isso monta a viagem completa, com hotéis, experiências e lugares que só um local conhece.",
        ),
        resuelve: t(
          "Cada viajero recibe un viaje a la medida, a cualquier hora.",
          "Every traveler gets a tailor-made trip, at any hour.",
          "Jeder Reisende bekommt eine maßgeschneiderte Reise, zu jeder Uhrzeit.",
          "Cada viajante recebe uma viagem à medida, a qualquer hora.",
        ),
        visual: {
          tipo: "cubre",
          src: `${M}/hero.webp`,
          alt: t(
            "El planificador de viajes: el viajero escribe qué le gusta",
            "The trip planner: the traveler writes what they like",
            "Der Reiseplaner: Reisende schreiben, was sie mögen",
            "O planeador de viagens: o viajante escreve o que gosta",
          ),
          posicion: "center 42%",
        },
      },
      {
        pestana: t("Catálogo", "Catalog", "Katalog", "Catálogo"),
        clave: t("02 · Catálogo de experiencias", "02 · Experience catalog", "02 · Erlebniskatalog", "02 · Catálogo de experiências"),
        titulo: t(
          "751 experiencias reales, convertidas en datos.",
          "751 real experiences, turned into data.",
          "751 echte Erlebnisse, in Daten verwandelt.",
          "751 experiências reais, transformadas em dados.",
        ),
        texto: t(
          "Hoteles, restaurantes, barrios y experiencias del operador, organizados por zona y por tipo, para que el planificador los use al armar cada viaje.",
          "The operator's hotels, restaurants, neighborhoods and experiences, organized by area and by type, so the planner can use them to build each trip.",
          "Hotels, Restaurants, Viertel und Erlebnisse des Veranstalters, geordnet nach Gegend und Art, damit der Planer sie für jede Reise nutzen kann.",
          "Hotéis, restaurantes, bairros e experiências do operador, organizados por zona e por tipo, para que o planeador os use ao montar cada viagem.",
        ),
        resuelve: t(
          "El conocimiento del operador queda en un producto, no solo en su equipo.",
          "The operator's knowledge lives in a product, not only in its team.",
          "Das Wissen des Veranstalters steckt in einem Produkt, nicht nur in seinem Team.",
          "O conhecimento do operador fica num produto, não só na sua equipa.",
        ),
        visual: {
          tipo: "cubre",
          src: `${M}/experiencias.webp`,
          alt: t(
            "El catálogo por destino: hoteles, experiencias, restaurantes y barrios",
            "The catalog by destination: hotels, experiences, restaurants and neighborhoods",
            "Der Katalog nach Reiseziel: Hotels, Erlebnisse, Restaurants und Viertel",
            "O catálogo por destino: hotéis, experiências, restaurantes e bairros",
          ),
        },
      },
      {
        pestana: t("Marca y web", "Brand and web", "Marke und Web", "Marca e site"),
        clave: t("03 · Marca y web", "03 · Brand and website", "03 · Marke und Website", "03 · Marca e site"),
        titulo: t(
          "Un canal propio para vender directo.",
          "A channel of its own to sell direct.",
          "Ein eigener Kanal, um direkt zu verkaufen.",
          "Um canal próprio para vender diretamente.",
        ),
        texto: t(
          "La identidad y la web del producto, pensadas para el viajero que llega por su cuenta y planea desde el celular.",
          "The product's identity and website, designed for travelers who arrive on their own and plan from their phone.",
          "Die Identität und die Website des Produkts, gedacht für Reisende, die auf eigene Faust kommen und vom Handy aus planen.",
          "A identidade e o site do produto, pensados para o viajante que chega por conta própria e planeia a partir do telemóvel.",
        ),
        resuelve: t(
          "El operador tiene un canal propio para llegar al viajero final.",
          "The operator has its own channel to reach the end traveler.",
          "Der Veranstalter hat einen eigenen Kanal, um Reisende direkt zu erreichen.",
          "O operador tem um canal próprio para chegar ao viajante final.",
        ),
        visual: {
          tipo: "fuentes",
          fuentes: [t("Marca", "Brand", "Marke", "Marca"), t("Web", "Web", "Web", "Site"), t("Celular", "Phone", "Handy", "Telemóvel")],
          total: t("Pensada para el viajero", "Designed for the traveler", "Gedacht für Reisende", "Pensada para o viajante"),
        },
      },
      {
        pestana: t("Reservas", "Bookings", "Buchungen", "Reservas"),
        clave: t("04 · Conexión con reservas", "04 · Booking connection", "04 · Anbindung an Buchungen", "04 · Ligação às reservas"),
        titulo: t(
          "Del viaje armado a la reserva.",
          "From the planned trip to the booking.",
          "Von der geplanten Reise zur Buchung.",
          "Da viagem montada à reserva.",
        ),
        texto: t(
          "La plataforma se conecta con el sistema de reservas que el operador ya usa, para mostrar disponibilidad y precios reales.",
          "The platform connects to the booking system the operator already uses, to show real availability and prices.",
          "Die Plattform verbindet sich mit dem Buchungssystem, das der Veranstalter bereits nutzt, um echte Verfügbarkeit und echte Preise zu zeigen.",
          "A plataforma liga-se ao sistema de reservas que o operador já usa, para mostrar disponibilidade e preços reais.",
        ),
        resuelve: t(
          "Lo que el viajero ve, lo puede reservar.",
          "What the traveler sees, they can book.",
          "Was Reisende sehen, können sie buchen.",
          "O que o viajante vê, pode reservar.",
        ),
        visual: {
          tipo: "fuentes",
          fuentes: [t("Hoteles", "Hotels", "Hotels", "Hotéis"), t("Disponibilidad", "Availability", "Verfügbarkeit", "Disponibilidade"), t("Precios", "Prices", "Preise", "Preços")],
          total: t("Reserva en vivo", "Live booking", "Live-Buchung", "Reserva em direto"),
        },
      },
    ],
  },
  tecnologia: {
    titulo: t(
      "El saber del operador, con inteligencia artificial adentro.",
      "The operator's know-how, with artificial intelligence inside.",
      "Das Wissen des Veranstalters, mit künstlicher Intelligenz im Inneren.",
      "O saber do operador, com inteligência artificial lá dentro.",
    ),
    lede: t(
      "El planificador trabaja sobre el catálogo del operador y sobre su sistema de reservas. En rosa, donde trabaja la inteligencia artificial. Toca cualquiera.",
      "The planner works on top of the operator's catalog and its booking system. In pink, where artificial intelligence works. Tap any of them.",
      "Der Planer arbeitet mit dem Katalog des Veranstalters und seinem Buchungssystem. In Rosa: wo künstliche Intelligenz arbeitet. Tippe auf ein Element.",
      "O planeador trabalha sobre o catálogo do operador e sobre o seu sistema de reservas. A cor-de-rosa, onde trabalha a inteligência artificial. Toca em qualquer uma.",
    ),
    centro: {
      titulo: t("La plataforma de viajes", "The travel platform", "Die Reiseplattform", "A plataforma de viagens"),
      sub: t("del operador", "of the operator", "des Veranstalters", "do operador"),
    },
    nodos: [
      {
        id: "planificador",
        nombre: t("Planificador de viajes", "Trip planner", "Reiseplaner", "Planeador de viagens"),
        corto: t("Planificador", "Planner", "Planer", "Planeador"),
        tipo: "ia",
        hace: t(
          "Conversa con el viajero, entiende qué le gusta y arma el viaje completo con hoteles, experiencias y lugares del catálogo.",
          "Talks with the traveler, understands what they like and builds the whole trip with hotels, experiences and places from the catalog.",
          "Spricht mit den Reisenden, versteht, was sie mögen, und stellt die ganze Reise mit Hotels, Erlebnissen und Orten aus dem Katalog zusammen.",
          "Conversa com o viajante, percebe o que gosta e monta a viagem completa com hotéis, experiências e lugares do catálogo.",
        ),
        con: ["web", "catalogo", "mapas", "reservas"],
        img: `${M}/hero.webp`,
      },
      {
        id: "catalogo",
        nombre: t("Catálogo de experiencias", "Experience catalog", "Erlebniskatalog", "Catálogo de experiências"),
        corto: t("Catálogo", "Catalog", "Katalog", "Catálogo"),
        tipo: "herramienta",
        hace: t(
          "751 experiencias reales del operador, organizadas por zona y por tipo.",
          "751 real experiences from the operator, organized by area and by type.",
          "751 echte Erlebnisse des Veranstalters, geordnet nach Gegend und Art.",
          "751 experiências reais do operador, organizadas por zona e por tipo.",
        ),
        con: ["mapas"],
        img: `${M}/experiencias.webp`,
      },
      {
        id: "mapas",
        nombre: igual("Google Maps"),
        corto: t("Mapas", "Maps", "Karten", "Mapas"),
        icono: "googlemaps",
        tipo: "herramienta",
        hace: t(
          "Lugares, fotos y ubicación de cada hotel y cada experiencia.",
          "Places, photos and location of every hotel and every experience.",
          "Orte, Fotos und Lage jedes Hotels und jedes Erlebnisses.",
          "Lugares, fotos e localização de cada hotel e de cada experiência.",
        ),
        con: [],
      },
      {
        id: "reservas",
        nombre: t("Sistema de reservas", "Booking system", "Buchungssystem", "Sistema de reservas"),
        corto: t("Reservas", "Bookings", "Buchungen", "Reservas"),
        tipo: "herramienta",
        hace: t(
          "El sistema de reservas que el operador ya usa: disponibilidad y precios reales de hoteles.",
          "The booking system the operator already uses: real hotel availability and prices.",
          "Das Buchungssystem, das der Veranstalter bereits nutzt: echte Verfügbarkeit und echte Preise der Hotels.",
          "O sistema de reservas que o operador já usa: disponibilidade e preços reais dos hotéis.",
        ),
        con: [],
      },
      {
        id: "web",
        nombre: t("Web del viajero", "Traveler website", "Website für Reisende", "Site do viajante"),
        corto: t("Web", "Web", "Web", "Site"),
        icono: "vercel",
        tipo: "herramienta",
        hace: t(
          "Donde el viajero cuenta qué quiere y recibe su viaje, desde el celular.",
          "Where travelers say what they want and get their trip, from their phone.",
          "Wo Reisende sagen, was sie wollen, und ihre Reise bekommen, vom Handy aus.",
          "Onde o viajante conta o que quer e recebe a sua viagem, a partir do telemóvel.",
        ),
        con: [],
      },
    ],
  },
  galeria: {
    titulo: t(
      "El planificador y el destino por dentro.",
      "The planner and the destination, inside.",
      "Der Planer und das Reiseziel von innen.",
      "O planeador e o destino por dentro.",
    ),
    items: [
      { src: `${M}/hero.webp`, pie: t("El planificador", "The planner", "Der Planer", "O planeador"), alt: t("El planificador de viajes", "The trip planner", "Der Reiseplaner", "O planeador de viagens") },
      { src: `${M}/experiencias.webp`, forma: "ancha", pie: t("El catálogo por destino", "The catalog by destination", "Der Katalog nach Reiseziel", "O catálogo por destino"), alt: t("El catálogo de un destino por zonas", "A destination's catalog by area", "Der Katalog eines Reiseziels nach Gegenden", "O catálogo de um destino por zonas") },
      { src: `${M}/planner.webp`, forma: "ancha", pie: t("Qué le gusta al viajero", "What the traveler likes", "Was Reisende mögen", "O que o viajante gosta"), alt: t("La barra donde el viajero cuenta qué le gusta", "The bar where the traveler says what they like", "Die Leiste, in der Reisende schreiben, was sie mögen", "A barra onde o viajante conta o que gosta") },
    ],
  },
  cambio: {
    titulo: t(
      "Lo que el operador sabía, ahora está en un producto.",
      "What the operator knew is now in a product.",
      "Was der Veranstalter wusste, steckt jetzt in einem Produkt.",
      "O que o operador sabia está agora num produto.",
    ),
    items: [
      {
        cifra: "751",
        negrita: t("Experiencias reales", "Real experiences", "Echte Erlebnisse", "Experiências reais"),
        texto: t(
          "del operador, convertidas en datos que usa el planificador.",
          "from the operator, turned into data the planner uses.",
          "des Veranstalters, in Daten verwandelt, die der Planer nutzt.",
          "do operador, transformadas em dados que o planeador usa.",
        ),
      },
      {
        cifra: "1",
        negrita: t("Conversación", "Conversation", "Gespräch", "Conversa"),
        texto: t(
          "para pasar de «qué me gusta» a un viaje armado.",
          "to go from «what I like» to a planned trip.",
          "um von «was mir gefällt» zu einer fertigen Reise zu kommen.",
          "para passar de «o que eu gosto» a uma viagem montada.",
        ),
      },
      {
        // `cifra` es texto fijo (sin idiomas): aquí es una palabra. Traducción si el tipo pasa a LangText:
        // en «Decades» · de «Jahrzehnte» · pt «Décadas».
        cifra: t("Décadas", "Decades", "Jahrzehnte", "Décadas"),
        negrita: t("De conocimiento local,", "Of local knowledge,", "Lokales Wissen,", "De conhecimento local,"),
        texto: t(
          "ahora dentro de un producto.",
          "now inside a product.",
          "jetzt in einem Produkt.",
          "agora dentro de um produto.",
        ),
      },
    ],
  },
  cierre: {
    titulo: t(
      "¿Qué sabe tu empresa que todavía",
      "What does your company know that still",
      "Was weiß dein Unternehmen, das noch",
      "O que sabe a tua empresa que ainda",
    ),
    resaltado: t("no es un producto?", "isn't a product?", "kein Produkt ist?", "não é um produto?"),
    lede: t(
      "Cuéntame qué hace tu equipo mejor que nadie y te digo cómo se vuelve plataforma.",
      "Tell me what your team does better than anyone and I'll tell you how it becomes a platform.",
      "Erzähl mir, was dein Team besser kann als alle anderen, und ich sage dir, wie daraus eine Plattform wird.",
      "Conta-me o que a tua equipa faz melhor do que ninguém e digo-te como se torna plataforma.",
    ),
    enlace: { href: "/#proyectos", texto: t("Ver más proyectos →", "See more projects →", "Weitere Projekte →", "Ver mais projetos →") },
  },
  tarjeta: {
    etiqueta: t(
      "Planeador de viajes con IA para un operador europeo",
      "AI trip planner for a European operator",
      "KI-Reiseplaner für einen europäischen Veranstalter",
      "Planeador de viagens com IA para um operador europeu",
    ),
    imagen: "/v2/portafolio/turismo.jpg",
    inserto: "/v2/portafolio/turismo-i.jpg",
  },
};
