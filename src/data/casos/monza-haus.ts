/* Caso MonzaHaus · /work/monza-haus
 * Fuente: docs/internal/portada/prototipo/caso-monzahaus.html (28-sep-2026). */
import type { Caso, T } from "./tipos";

const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });
const M = "/v2/caso-monzahaus";

export const caso: Caso = {
  slug: "monza-haus",
  nombre: t("MonzaHaus", "MonzaHaus", "MonzaHaus", "MonzaHaus"),
  categoria: "venture",
  seo: {
    titulo: t(
      "MonzaHaus · Caso · Monza Lab",
      "MonzaHaus · Case study · Monza Lab",
      "MonzaHaus · Case Study · Monza Lab",
      "MonzaHaus · Caso · Monza Lab",
    ),
    descripcion: t(
      "Caso MonzaHaus: la plataforma de inteligencia de mercado Porsche. Datos de cuatro mercados, reportes, asesor con IA y contenido automático.",
      "MonzaHaus case study: the Porsche market intelligence platform. Data from four markets, reports, an AI advisor and automatic content.",
      "Case Study MonzaHaus: die Plattform für Porsche-Marktdaten. Daten aus vier Märkten, Reports, ein KI-Berater und automatischer Content.",
      "Caso MonzaHaus: a plataforma de inteligência de mercado Porsche. Dados de quatro mercados, relatórios, assessor com IA e conteúdo automático.",
    ),
  },
  hero: {
    linea1: t("Monza", "Monza", "Monza", "Monza"),
    linea2: t("Haus", "Haus", "Haus", "Haus"),
    frase: t(
      "Una plataforma para que todo el ecosistema Porsche decida con información real.",
      "A platform so the whole Porsche ecosystem can decide with real information.",
      "Eine Plattform, damit die ganze Porsche-Welt mit echten Informationen entscheidet.",
      "Uma plataforma para que todo o ecossistema Porsche decida com informação real.",
    ),
    pastillas: [
      t("Porsche de colección", "Collector Porsche", "Porsche-Klassiker", "Porsche de coleção"),
      t("Inteligencia de mercado", "Market intelligence", "Marktintelligenz", "Inteligência de mercado"),
      t("Producto propio", "Our own product", "Eigenes Produkt", "Produto próprio"),
    ],
    enlace: {
      href: "https://www.monzahaus.com",
      texto: t("Ver la plataforma ↗", "See the platform ↗", "Zur Plattform ↗", "Ver a plataforma ↗"),
    },
    web: { barra: "monzahaus.com", escritorio: `${M}/web-escritorio-larga.webp`, celular: `${M}/web-celular-larga.webp` },
    fantasma: "Haus",
  },
  producimos: {
    titulo: t(
      "Cinco cosas, funcionando juntas.",
      "Five things, working together.",
      "Fünf Dinge, die zusammen funktionieren.",
      "Cinco coisas, a funcionar juntas.",
    ),
    items: [
      {
        icono: "plataforma",
        nombre: t("Plataforma", "Platform", "Plattform", "Plataforma"),
        texto: t(
          "Donde se busca, se compara y se lee el reporte de cada Porsche, con cobros y suscripción.",
          "Where you search, compare and read the report on every Porsche, with payments and subscription.",
          "Hier wird jeder Porsche gesucht, verglichen und sein Report gelesen, mit Zahlungen und Abo.",
          "Onde se procura, se compara e se lê o relatório de cada Porsche, com pagamentos e subscrição.",
        ),
      },
      {
        icono: "datos",
        nombre: t("Datos", "Data", "Daten", "Dados"),
        texto: t(
          "Los Porsche en venta de cuatro mercados, leídos y ordenados en un solo lugar.",
          "The Porsches for sale in four markets, read and organized in one place.",
          "Die Porsche, die in vier Märkten zum Verkauf stehen, gelesen und an einem Ort sortiert.",
          "Os Porsche à venda em quatro mercados, lidos e organizados num só lugar.",
        ),
      },
      {
        icono: "agente",
        nombre: t("Agente de IA", "AI agent", "KI-Agent", "Agente de IA"),
        texto: t(
          "Un asesor que responde preguntas del mercado Porsche con los datos de la plataforma.",
          "An advisor that answers questions about the Porsche market with the platform's data.",
          "Ein Berater, der Fragen zum Porsche-Markt mit den Daten der Plattform beantwortet.",
          "Um assessor que responde a perguntas sobre o mercado Porsche com os dados da plataforma.",
        ),
      },
      {
        icono: "tablero",
        nombre: t("Reportes e índices", "Reports and indices", "Reports und Indizes", "Relatórios e índices"),
        texto: t(
          "El reporte de cada carro frente a sus comparables y los índices de cada familia.",
          "The report on each car against its comparables, and the indices for each model family.",
          "Der Report zu jedem Auto im Vergleich zu seinen Vergleichsfahrzeugen und die Indizes jeder Modellfamilie.",
          "O relatório de cada carro face aos seus comparáveis e os índices de cada família.",
        ),
      },
      {
        icono: "contenido",
        nombre: t("Contenido", "Content", "Content", "Conteúdo"),
        texto: t(
          "Piezas para Instagram que salen de los carros reales de la plataforma.",
          "Instagram posts made from the real cars on the platform.",
          "Instagram-Posts, die aus den echten Autos der Plattform entstehen.",
          "Peças para o Instagram feitas a partir dos carros reais da plataforma.",
        ),
      },
    ],
  },
  hace: {
    titulo: t(
      "La diseñamos, la construimos y la operamos.",
      "We design it, build it and run it.",
      "Wir gestalten sie, bauen sie und betreiben sie.",
      "Desenhamo-la, construímo-la e operamo-la.",
    ),
    items: [
      {
        verbo: t("Diseña", "Designs", "Gestaltet", "Desenha"),
        texto: t(
          "La experiencia de la plataforma y la marca, con su estética de galería.",
          "The platform experience and the brand, with its gallery look.",
          "Das Erlebnis der Plattform und die Marke, mit ihrer Galerie-Ästhetik.",
          "A experiência da plataforma e a marca, com a sua estética de galeria.",
        ),
      },
      {
        verbo: t("Construye", "Builds", "Baut", "Constrói"),
        texto: t(
          "La plataforma, los datos de cuatro mercados, los reportes, los índices y el asesor.",
          "The platform, the data from four markets, the reports, the indices and the advisor.",
          "Die Plattform, die Daten aus vier Märkten, die Reports, die Indizes und den Berater.",
          "A plataforma, os dados de quatro mercados, os relatórios, os índices e o assessor.",
        ),
      },
      {
        verbo: t("Produce", "Produces", "Produziert", "Produz"),
        texto: t(
          "El contenido para Instagram a partir de los carros reales.",
          "The Instagram content, made from the real cars.",
          "Den Instagram-Content, aus den echten Autos.",
          "O conteúdo para o Instagram a partir dos carros reais.",
        ),
      },
      {
        verbo: t("Opera", "Runs", "Betreibt", "Opera"),
        texto: t(
          "La plataforma, la lectura de cada carro que entra y la publicación en redes.",
          "The platform, the reading of every car that comes in and the posting on social media.",
          "Die Plattform, das Lesen jedes neuen Autos und das Posten in den sozialen Netzwerken.",
          "A plataforma, a leitura de cada carro que entra e a publicação nas redes.",
        ),
      },
      {
        verbo: t("Mide", "Measures", "Misst", "Mede"),
        texto: t(
          "Hacia dónde va cada familia Porsche, con los índices del mercado.",
          "Where each Porsche family is heading, with the market indices.",
          "Wohin sich jede Porsche-Familie entwickelt, mit den Marktindizes.",
          "Para onde vai cada família Porsche, com os índices do mercado.",
        ),
      },
    ],
  },
  reto: {
    titulo: t(
      "Que todo el ecosistema Porsche decida con información real.",
      "Getting the whole Porsche ecosystem to decide with real information.",
      "Die ganze Porsche-Welt soll mit echten Informationen entscheiden.",
      "Que todo o ecossistema Porsche decida com informação real.",
    ),
    items: [
      {
        titulo: t("El mercado está disperso.", "The market is scattered.", "Der Markt ist verstreut.", "O mercado está disperso."),
        texto: t(
          "El mismo Porsche se vende en subastas y concesionarios de varios países, cada uno con su precio, su moneda y su forma de mostrarlo.",
          "The same Porsche is sold at auctions and dealers in several countries, each with its own price, currency and way of showing it.",
          "Derselbe Porsche wird auf Auktionen und bei Händlern in mehreren Ländern verkauft, jeweils mit eigenem Preis, eigener Währung und eigener Darstellung.",
          "O mesmo Porsche vende-se em leilões e concessionários de vários países, cada um com o seu preço, a sua moeda e a sua forma de o mostrar.",
        ),
      },
      {
        titulo: t("El precio es una intuición.", "Price is a hunch.", "Der Preis ist ein Bauchgefühl.", "O preço é uma intuição."),
        texto: t(
          "Sin comparables a la mano, comprar o vender un clásico depende de a quién le preguntes.",
          "Without comparables at hand, buying or selling a classic depends on who you ask.",
          "Ohne Vergleichsfahrzeuge zur Hand hängt der Kauf oder Verkauf eines Klassikers davon ab, wen man fragt.",
          "Sem comparáveis à mão, comprar ou vender um clássico depende de a quem perguntas.",
        ),
      },
      {
        titulo: t(
          "Una marca que tiene que publicar siempre.",
          "A brand that always has to post.",
          "Eine Marke, die ständig posten muss.",
          "Uma marca que tem de publicar sempre.",
        ),
        texto: t(
          "El mundo Porsche vive en Instagram, y producir contenido a mano, carro por carro, no alcanza.",
          "The Porsche world lives on Instagram, and making content by hand, car by car, is not enough.",
          "Die Porsche-Welt lebt auf Instagram, und Content von Hand, Auto für Auto, reicht nicht.",
          "O mundo Porsche vive no Instagram, e produzir conteúdo à mão, carro a carro, não chega.",
        ),
      },
    ],
  },
  piezas: {
    titulo: t("Cinco piezas, una sola plataforma.", "Five pieces, one platform.", "Fünf Teile, eine Plattform.", "Cinco peças, uma só plataforma."),
    lede: t(
      "Cada pieza sirve sola, y conectadas se hablan entre sí. Toca cualquiera para ver qué hace y qué le resuelve a quien compra o vende.",
      "Each piece works on its own, and connected they talk to each other. Tap any of them to see what it does and what it solves for buyers and sellers.",
      "Jedes Teil funktioniert allein, und verbunden sprechen sie miteinander. Tippe auf eines, um zu sehen, was es macht und was es Käufern und Verkäufern löst.",
      "Cada peça funciona sozinha, e ligadas falam entre si. Toca em qualquer uma para ver o que faz e o que resolve a quem compra ou vende.",
    ),
    centro: t("Una sola plataforma", "One platform", "Eine Plattform", "Uma só plataforma"),
    centroSub: t("todo conectado", "all connected", "alles verbunden", "tudo ligado"),
    items: [
      {
        pestana: t("Datos", "Data", "Daten", "Dados"),
        clave: t("01 · Datos de cuatro mercados", "01 · Data from four markets", "01 · Daten aus vier Märkten", "01 · Dados de quatro mercados"),
        titulo: t(
          "Todos los Porsche en venta, en un solo lugar.",
          "Every Porsche for sale, in one place.",
          "Alle Porsche zum Verkauf, an einem Ort.",
          "Todos os Porsche à venda, num só lugar.",
        ),
        texto: t(
          "La plataforma lee subastas y anuncios de Estados Unidos, Reino Unido, Europa y Japón, y ordena cada carro con su precio, su historia y su mercado. El anuncio se queda en su plataforma original.",
          "The platform reads auctions and listings from the United States, the United Kingdom, Europe and Japan, and organizes each car with its price, its history and its market. The listing stays on its original platform.",
          "Die Plattform liest Auktionen und Inserate aus den USA, Großbritannien, Europa und Japan und ordnet jedes Auto mit Preis, Geschichte und Markt. Das Inserat bleibt auf seiner ursprünglichen Plattform.",
          "A plataforma lê leilões e anúncios dos Estados Unidos, do Reino Unido, da Europa e do Japão, e organiza cada carro com o seu preço, a sua história e o seu mercado. O anúncio fica na sua plataforma original.",
        ),
        resuelve: t(
          "Nadie tiene que abrir seis sitios para saber qué hay en venta y a qué precio.",
          "Nobody has to open six sites to find out what is for sale and at what price.",
          "Niemand muss sechs Seiten öffnen, um zu wissen, was zu welchem Preis angeboten wird.",
          "Ninguém tem de abrir seis sites para saber o que está à venda e a que preço.",
        ),
        visual: {
          tipo: "cubre",
          src: `${M}/datos-desktop.webp`,
          alt: t(
            "Porsche en venta de varios mercados, ordenados en la plataforma",
            "Porsches for sale from several markets, organized on the platform",
            "Porsche zum Verkauf aus mehreren Märkten, auf der Plattform sortiert",
            "Porsche à venda de vários mercados, organizados na plataforma",
          ),
        },
      },
      {
        pestana: t("Reportes", "Reports", "Reports", "Relatórios"),
        clave: t("02 · El reporte de cada carro", "02 · The report on each car", "02 · Der Report zu jedem Auto", "02 · O relatório de cada carro"),
        titulo: t("Qué vale un carro, y por qué.", "What a car is worth, and why.", "Was ein Auto wert ist, und warum.", "Quanto vale um carro, e porquê."),
        texto: t(
          "Cada carro tiene su reporte: el rango de valor frente a sus comparables, las señales que lo respaldan y lo que conviene revisar antes de comprar.",
          "Each car has its report: the value range against its comparables, the signals behind it and what is worth checking before buying.",
          "Jedes Auto hat seinen Report: die Wertspanne im Vergleich zu ähnlichen Autos, die Signale dahinter und was man vor dem Kauf prüfen sollte.",
          "Cada carro tem o seu relatório: o intervalo de valor face aos comparáveis, os sinais que o sustentam e o que convém verificar antes de comprar.",
        ),
        resuelve: t(
          "Comprar o vender con un número que se puede defender, no con una intuición.",
          "Buying or selling with a number you can defend, not with a hunch.",
          "Kaufen oder verkaufen mit einer Zahl, die man vertreten kann, nicht mit einem Bauchgefühl.",
          "Comprar ou vender com um número que se pode defender, não com uma intuição.",
        ),
        visual: {
          tipo: "cel",
          src: `${M}/reporte-movil.webp`,
          alt: t("El reporte de un Porsche en el celular", "A Porsche report on a phone", "Der Report eines Porsche auf dem Handy", "O relatório de um Porsche no telemóvel"),
        },
      },
      {
        pestana: t("Asesor", "Advisor", "Berater", "Assessor"),
        clave: t("03 · Asesor con IA", "03 · AI advisor", "03 · KI-Berater", "03 · Assessor com IA"),
        titulo: t(
          "Un asesor que responde preguntas del mercado.",
          "An advisor that answers questions about the market.",
          "Ein Berater, der Fragen zum Markt beantwortet.",
          "Um assessor que responde a perguntas sobre o mercado.",
        ),
        texto: t(
          "Se le pregunta como a un experto, en palabras normales: qué vale un modelo, cómo se compara con otro, en qué mercado conviene comprar. Responde con los datos de la plataforma.",
          "You ask it like you would ask an expert, in plain words: what a model is worth, how it compares with another, in which market it makes sense to buy. It answers with the platform's data.",
          "Man fragt ihn wie einen Experten, in ganz normalen Worten: was ein Modell wert ist, wie es sich mit einem anderen vergleicht, in welchem Markt sich der Kauf lohnt. Er antwortet mit den Daten der Plattform.",
          "Pergunta-se como a um especialista, em palavras normais: quanto vale um modelo, como se compara com outro, em que mercado compensa comprar. Responde com os dados da plataforma.",
        ),
        resuelve: t(
          "Una respuesta con criterio a cualquier hora, sin esperar a un experto.",
          "A well-judged answer at any hour, without waiting for an expert.",
          "Eine fundierte Antwort zu jeder Uhrzeit, ohne auf einen Experten zu warten.",
          "Uma resposta com critério a qualquer hora, sem esperar por um especialista.",
        ),
        visual: {
          tipo: "cel",
          src: `${M}/asesor-movil.webp`,
          alt: t("El asesor de MonzaHaus en el celular", "The MonzaHaus advisor on a phone", "Der MonzaHaus-Berater auf dem Handy", "O assessor da MonzaHaus no telemóvel"),
        },
      },
      {
        pestana: t("Índices", "Indices", "Indizes", "Índices"),
        clave: t("04 · Índices del mercado", "04 · Market indices", "04 · Marktindizes", "04 · Índices do mercado"),
        titulo: t(
          "Hacia dónde va cada generación.",
          "Where each generation is heading.",
          "Wohin sich jede Generation entwickelt.",
          "Para onde vai cada geração.",
        ),
        texto: t(
          "Índices del mercado Porsche por familia, como los 911 refrigerados por aire, los Turbo o los GT, armados con resultados reales de subastas.",
          "Porsche market indices by family, such as the air-cooled 911s, the Turbos or the GTs, built from real auction results.",
          "Indizes des Porsche-Markts nach Modellfamilie, etwa die luftgekühlten 911, die Turbo oder die GT, erstellt aus echten Auktionsergebnissen.",
          "Índices do mercado Porsche por família, como os 911 arrefecidos a ar, os Turbo ou os GT, construídos com resultados reais de leilões.",
        ),
        resuelve: t(
          "Ver la tendencia de una familia entera, no solo el precio de un carro.",
          "Seeing the trend of an entire family, not just the price of one car.",
          "Den Trend einer ganzen Familie sehen, nicht nur den Preis eines Autos.",
          "Ver a tendência de uma família inteira, não só o preço de um carro.",
        ),
        visual: {
          tipo: "cubre",
          src: `${M}/indices-desktop.webp`,
          alt: t(
            "Los índices del mercado Porsche por familia",
            "The Porsche market indices by family",
            "Die Indizes des Porsche-Markts nach Modellfamilie",
            "Os índices do mercado Porsche por família",
          ),
        },
      },
      {
        pestana: t("Contenido", "Content", "Content", "Conteúdo"),
        clave: t("05 · Contenido automático", "05 · Automatic content", "05 · Automatischer Content", "05 · Conteúdo automático"),
        titulo: t(
          "Contenido que sale de los carros reales.",
          "Content made from real cars.",
          "Content, der aus echten Autos entsteht.",
          "Conteúdo feito a partir dos carros reais.",
        ),
        texto: t(
          "El sistema toma carros reales de la plataforma, escoge la mejor foto, escribe el texto con el dato del mercado y deja la pieza lista para Instagram, con la estética de la marca.",
          "The system takes real cars from the platform, picks the best photo, writes the text with the market data and leaves the post ready for Instagram, in the brand's look.",
          "Das System nimmt echte Autos von der Plattform, wählt das beste Foto, schreibt den Text mit der Marktzahl und macht den Post fertig für Instagram, im Look der Marke.",
          "O sistema pega em carros reais da plataforma, escolhe a melhor foto, escreve o texto com o dado do mercado e deixa a peça pronta para o Instagram, com a estética da marca.",
        ),
        resuelve: t(
          "La marca publica sin montar una producción, y cada pieza lleva de vuelta a la plataforma.",
          "The brand posts without setting up a production, and every post leads back to the platform.",
          "Die Marke postet ohne eigene Produktion, und jeder Post führt zurück zur Plattform.",
          "A marca publica sem montar uma produção, e cada peça reconduz as pessoas à plataforma.",
        ),
        visual: {
          tipo: "par",
          atras: `${M}/post-930-turbo.webp`,
          frente: `${M}/post-gt3-992.webp`,
          alt: t(
            "Pieza de Instagram de MonzaHaus con un Porsche 911 real de la plataforma",
            "A MonzaHaus Instagram post with a real Porsche 911 from the platform",
            "Ein Instagram-Post von MonzaHaus mit einem echten Porsche 911 von der Plattform",
            "Peça de Instagram da MonzaHaus com um Porsche 911 real da plataforma",
          ),
        },
      },
    ],
  },
  tecnologia: {
    titulo: t(
      "Todo conectado, con inteligencia artificial adentro.",
      "Everything connected, with artificial intelligence inside.",
      "Alles verbunden, mit künstlicher Intelligenz im Inneren.",
      "Tudo ligado, com inteligência artificial lá dentro.",
    ),
    lede: t(
      "Cada herramienta hace lo suyo; el sistema las hace hablar entre sí. En rosa, donde trabaja la inteligencia artificial. Toca cualquiera.",
      "Each tool does its own job; the system gets them talking to each other. In pink, where artificial intelligence is at work. Tap any of them.",
      "Jedes Tool macht seinen Teil; das System bringt sie dazu, miteinander zu sprechen. In Rosa: wo künstliche Intelligenz arbeitet. Tippe auf eines.",
      "Cada ferramenta faz a sua parte; o sistema põe-nas a falar entre si. A rosa, onde trabalha a inteligência artificial. Toca em qualquer uma.",
    ),
    centro: { titulo: t("MonzaHaus", "MonzaHaus", "MonzaHaus", "MonzaHaus"), sub: t("inteligencia Porsche", "Porsche intelligence", "Porsche-Intelligenz", "inteligência Porsche") },
    nodos: [
      {
        id: "asesor",
        nombre: t("Asesor Porsche", "Porsche advisor", "Porsche-Berater", "Assessor Porsche"),
        corto: t("Asesor", "Advisor", "Berater", "Assessor"),
        tipo: "ia",
        hace: t(
          "Responde en palabras normales cualquier pregunta del mercado Porsche con los datos de la plataforma: qué vale un carro, cómo se compara y en qué mercado conviene.",
          "Answers any question about the Porsche market in plain words, with the platform's data: what a car is worth, how it compares and in which market it makes sense.",
          "Beantwortet jede Frage zum Porsche-Markt in normalen Worten, mit den Daten der Plattform: was ein Auto wert ist, wie es sich vergleicht und in welchem Markt es sich lohnt.",
          "Responde em palavras normais a qualquer pergunta sobre o mercado Porsche com os dados da plataforma: quanto vale um carro, como se compara e em que mercado compensa.",
        ),
        con: ["base", "web"],
      },
      {
        id: "lectura",
        nombre: t("Lectura de cada carro", "Reading every car", "Jedes Auto lesen", "Leitura de cada carro"),
        corto: t("Lectura", "Reading", "Lesen", "Leitura"),
        tipo: "ia",
        hace: t(
          "Cada carro que entra se lee y se resume: qué es, cuánto vale frente a sus comparables y qué señales tiene. De ahí sale su reporte.",
          "Every car that comes in is read and summarized: what it is, what it is worth against its comparables and what signals it shows. Its report comes from there.",
          "Jedes neue Auto wird gelesen und zusammengefasst: was es ist, was es im Vergleich wert ist und welche Signale es zeigt. Daraus entsteht sein Report.",
          "Cada carro que entra é lido e resumido: o que é, quanto vale face aos comparáveis e que sinais tem. Daí sai o seu relatório.",
        ),
        con: ["base", "fuentes"],
        img: `${M}/reporte-desktop.webp`,
      },
      {
        id: "contenido",
        nombre: t("Contenido automático", "Automatic content", "Automatischer Content", "Conteúdo automático"),
        corto: t("Contenido", "Content", "Content", "Conteúdo"),
        tipo: "ia",
        hace: t(
          "Escoge carros reales de la plataforma y su mejor foto, escribe el texto con el dato del mercado y deja la pieza lista para Instagram.",
          "Picks real cars from the platform and their best photo, writes the text with the market data and leaves the post ready for Instagram.",
          "Wählt echte Autos von der Plattform und ihr bestes Foto, schreibt den Text mit der Marktzahl und macht den Post fertig für Instagram.",
          "Escolhe carros reais da plataforma e a sua melhor foto, escreve o texto com o dado do mercado e deixa a peça pronta para o Instagram.",
        ),
        con: ["instagram", "base"],
        img: `${M}/post-gt3-992.webp`,
      },
      {
        id: "fuentes",
        nombre: t("Subastas y anuncios", "Auctions and listings", "Auktionen und Inserate", "Leilões e anúncios"),
        corto: t("Fuentes", "Sources", "Quellen", "Fontes"),
        tipo: "herramienta",
        hace: t(
          "Los carros se leen donde se publican, en plataformas como Bring a Trailer, Elferspot o AutoScout24, en cuatro mercados. Cada anuncio se queda en su sitio original.",
          "Cars are read where they are published, on platforms such as Bring a Trailer, Elferspot or AutoScout24, in four markets. Each listing stays on its original site.",
          "Die Autos werden dort gelesen, wo sie veröffentlicht werden, auf Plattformen wie Bring a Trailer, Elferspot oder AutoScout24, in vier Märkten. Jedes Inserat bleibt auf seiner ursprünglichen Seite.",
          "Os carros são lidos onde são publicados, em plataformas como Bring a Trailer, Elferspot ou AutoScout24, em quatro mercados. Cada anúncio fica no seu site original.",
        ),
        con: ["base"],
      },
      {
        id: "base",
        nombre: t("Base de datos", "Database", "Datenbank", "Base de dados"),
        corto: t("Datos", "Data", "Daten", "Dados"),
        icono: "supabase",
        tipo: "herramienta",
        hace: t(
          "Todos los carros, sus precios y su historia en un solo lugar. Es la memoria de la plataforma: de aquí leen el asesor, los reportes y el contenido.",
          "Every car, its prices and its history in one place. It is the platform's memory: the advisor, the reports and the content all read from here.",
          "Alle Autos, ihre Preise und ihre Geschichte an einem Ort. Das Gedächtnis der Plattform: Berater, Reports und Content lesen von hier.",
          "Todos os carros, os seus preços e a sua história num só lugar. É a memória da plataforma: é daqui que leem o assessor, os relatórios e o conteúdo.",
        ),
        con: ["web"],
      },
      {
        id: "web",
        nombre: t("La plataforma", "The platform", "Die Plattform", "A plataforma"),
        corto: t("Web", "Web", "Web", "Web"),
        icono: "nextdotjs",
        tipo: "herramienta",
        hace: t(
          "Donde se busca, se compara y se lee el reporte de cada carro, con la estética de galería de la marca.",
          "Where you search, compare and read the report on each car, in the brand's gallery look.",
          "Hier wird jedes Auto gesucht, verglichen und sein Report gelesen, in der Galerie-Ästhetik der Marke.",
          "Onde se procura, se compara e se lê o relatório de cada carro, com a estética de galeria da marca.",
        ),
        con: ["stripe", "google"],
        img: `${M}/modelo-desktop.webp`,
      },
      {
        id: "stripe",
        nombre: t("Stripe", "Stripe", "Stripe", "Stripe"),
        icono: "stripe",
        tipo: "herramienta",
        hace: t(
          "Los pagos de los reportes y de la suscripción.",
          "Payments for reports and the subscription.",
          "Die Zahlungen für Reports und das Abo.",
          "Os pagamentos dos relatórios e da subscrição.",
        ),
        con: [],
      },
      {
        id: "instagram",
        nombre: t("Instagram", "Instagram", "Instagram", "Instagram"),
        icono: "instagram",
        tipo: "herramienta",
        hace: t(
          "Donde la marca publica los carros reales de la plataforma y lleva a la gente de vuelta a ella.",
          "Where the brand posts the platform's real cars and brings people back to it.",
          "Hier postet die Marke die echten Autos der Plattform und führt die Leute zu ihr zurück.",
          "Onde a marca publica os carros reais da plataforma e reconduz as pessoas até ela.",
        ),
        con: ["web"],
      },
      {
        id: "google",
        nombre: t("Google y ChatGPT", "Google and ChatGPT", "Google und ChatGPT", "Google e ChatGPT"),
        corto: t("Google", "Google", "Google", "Google"),
        icono: "google",
        tipo: "herramienta",
        hace: t(
          "Cada modelo y cada carro tienen su página, preparada para que los encuentren en Google y en los asistentes de inteligencia artificial.",
          "Every model and every car has its own page, ready to be found on Google and in AI assistants.",
          "Jedes Modell und jedes Auto hat eine eigene Seite, bereit, bei Google und in KI-Assistenten gefunden zu werden.",
          "Cada modelo e cada carro têm a sua página, preparada para serem encontrados no Google e nos assistentes de inteligência artificial.",
        ),
        con: [],
      },
    ],
  },
  galeria: {
    titulo: t(
      "La plataforma, el reporte y el contenido.",
      "The platform, the report and the content.",
      "Die Plattform, der Report und der Content.",
      "A plataforma, o relatório e o conteúdo.",
    ),
    items: [
      {
        src: `${M}/modelo-desktop.webp`,
        pie: t("Cada modelo", "Every model", "Jedes Modell", "Cada modelo"),
        alt: t(
          "La página de un modelo Porsche con su valor por mercado",
          "A Porsche model page with its value by market",
          "Die Seite eines Porsche-Modells mit seinem Wert je Markt",
          "A página de um modelo Porsche com o seu valor por mercado",
        ),
        forma: "ancha",
      },
      {
        src: `${M}/datos-movil.webp`,
        pie: t("En el celular", "On the phone", "Auf dem Handy", "No telemóvel"),
        alt: t("La plataforma en el celular", "The platform on a phone", "Die Plattform auf dem Handy", "A plataforma no telemóvel"),
        forma: "alta",
      },
      {
        src: `${M}/reporte-movil.webp`,
        pie: t("El reporte", "The report", "Der Report", "O relatório"),
        alt: t("El reporte de un carro en el celular", "A car report on a phone", "Der Report eines Autos auf dem Handy", "O relatório de um carro no telemóvel"),
        forma: "alta",
      },
      {
        src: `${M}/post-930-turbo.webp`,
        pie: t("Contenido", "Content", "Content", "Conteúdo"),
        alt: t(
          "Pieza de Instagram con un Porsche 930 Turbo",
          "An Instagram post with a Porsche 930 Turbo",
          "Ein Instagram-Post mit einem Porsche 930 Turbo",
          "Peça de Instagram com um Porsche 930 Turbo",
        ),
        forma: "alta",
      },
      {
        src: `${M}/post-targa-4-gts.webp`,
        pie: t("Contenido", "Content", "Content", "Conteúdo"),
        alt: t(
          "Pieza de Instagram con un Porsche 911 Targa 4 GTS",
          "An Instagram post with a Porsche 911 Targa 4 GTS",
          "Ein Instagram-Post mit einem Porsche 911 Targa 4 GTS",
          "Peça de Instagram com um Porsche 911 Targa 4 GTS",
        ),
        forma: "alta",
      },
      {
        src: `${M}/indices-desktop.webp`,
        pie: t("Los índices", "The indices", "Die Indizes", "Os índices"),
        alt: t("Los índices del mercado Porsche", "The Porsche market indices", "Die Indizes des Porsche-Markts", "Os índices do mercado Porsche"),
        forma: "ancha",
      },
    ],
  },
  cambio: {
    titulo: t(
      "Un mercado disperso, leído en un solo lugar.",
      "A scattered market, read in one place.",
      "Ein verstreuter Markt, an einem Ort gelesen.",
      "Um mercado disperso, lido num só lugar.",
    ),
    items: [
      {
        cifra: "4",
        negrita: t("Mercados", "Markets", "Märkte", "Mercados"),
        texto: t(
          "en una sola lectura: Estados Unidos, Reino Unido, Europa y Japón.",
          "in a single read: the United States, the United Kingdom, Europe and Japan.",
          "in einer einzigen Übersicht: USA, Großbritannien, Europa und Japan.",
          "numa só leitura: Estados Unidos, Reino Unido, Europa e Japão.",
        ),
      },
      {
        cifra: "6",
        negrita: t("Plataformas", "Platforms", "Plattformen", "Plataformas"),
        texto: t(
          "de subastas y anuncios reunidas, sin sacar a nadie de la suya.",
          "of auctions and listings brought together, without pulling anyone off their own.",
          "für Auktionen und Inserate zusammengeführt, ohne jemanden von seiner eigenen wegzuholen.",
          "de leilões e anúncios reunidas, sem tirar ninguém da sua.",
        ),
      },
      {
        cifra: "24/7",
        negrita: t("El asesor", "The advisor", "Der Berater", "O assessor"),
        texto: t(
          "responde preguntas del mercado a cualquier hora.",
          "answers market questions at any hour.",
          "beantwortet Marktfragen zu jeder Uhrzeit.",
          "responde a perguntas do mercado a qualquer hora.",
        ),
      },
    ],
  },
  cierre: {
    titulo: t("¿Tu mercado necesita", "Does your market need", "Braucht dein Markt", "O teu mercado precisa de"),
    resaltado: t("una plataforma así?", "a platform like this?", "eine Plattform wie diese?", "uma plataforma assim?"),
    lede: t(
      "Cuéntame qué mercado quieres ordenar y te digo por dónde empezaría.",
      "Tell me which market you want to bring order to and I will tell you where I would start.",
      "Erzähl mir, welchen Markt du ordnen willst, und ich sage dir, wo ich anfangen würde.",
      "Conta-me que mercado queres organizar e eu digo-te por onde começaria.",
    ),
    enlace: { href: "/plataformas", texto: t("Ver plataformas →", "See platforms →", "Plattformen ansehen →", "Ver plataformas →") },
  },
  tarjeta: {
    etiqueta: t(
      "Porsche de colección · producto propio",
      "Collector Porsche · our own product",
      "Porsche-Klassiker · eigenes Produkt",
      "Porsche de coleção · produto próprio",
    ),
    imagen: "/v2/portafolio/monzahaus.jpg",
    imagenCel: "/v2/portafolio/monzahaus-m.jpg",
  },
};
