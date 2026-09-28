/* Caso · Guardian of Speed. Sale de docs/internal/portada/prototipo/caso-guardian-of-speed.html.
 * Caso de marca y web: nada de la sociedad, contratos ni facturas. El fundador y su historia son
 * públicos en guardianofspeed.de. */
import type { Caso, T } from "./tipos";

const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });
const igual = (s: string): T => ({ es: s, en: s, de: s, pt: s });
const M = "/v2/caso-guardian-of-speed";

export const caso: Caso = {
  slug: "guardian-of-speed",
  nombre: igual("Guardian of Speed"),
  categoria: "venture",
  seo: {
    titulo: t(
      "Guardian of Speed: marca y web para coleccionistas de carros | Monza Lab",
      "Guardian of Speed: brand and website for car collectors | Monza Lab",
      "Guardian of Speed: Marke und Website für Autosammler | Monza Lab",
      "Guardian of Speed: marca e site para colecionadores de carros | Monza Lab",
    ),
    descripcion: t(
      "Una marca de lujo silencioso y una web en alemán e inglés para cuidar colecciones de carros en Europa, con cuatro décadas de historia del fundador al frente. Hecha por Monza Lab.",
      "A quiet luxury brand and a German and English website for looking after car collections in Europe, led by four decades of the founder's story. Made by Monza Lab.",
      "Eine Marke des stillen Luxus und eine Website auf Deutsch und Englisch für die Pflege von Autosammlungen in Europa, mit vier Jahrzehnten Geschichte des Gründers im Mittelpunkt. Gemacht von Monza Lab.",
      "Uma marca de luxo silencioso e um site em alemão e inglês para cuidar de coleções de carros na Europa, com quatro décadas da história do fundador à frente. Feito pela Monza Lab.",
    ),
  },
  hero: {
    linea1: igual("Guardian"),
    linea2: igual("of Speed"),
    frase: t(
      "Una marca de lujo silencioso para cuidar colecciones de carros en Europa, con la historia de su fundador al frente.",
      "A quiet luxury brand for looking after car collections in Europe, with its founder's story up front.",
      "Eine Marke des stillen Luxus für die Pflege von Autosammlungen in Europa, mit der Geschichte ihres Gründers im Mittelpunkt.",
      "Uma marca de luxo silencioso para cuidar de coleções de carros na Europa, com a história do seu fundador à frente.",
    ),
    pastillas: [
      t("Carros de colección", "Collector cars", "Sammlerautos", "Carros de coleção"),
      t("Múnich", "Munich", "München", "Munique"),
      t("Alemán e inglés", "German and English", "Deutsch und Englisch", "Alemão e inglês"),
    ],
    enlace: { href: "https://www.guardianofspeed.de", texto: t("Ver el sitio ↗", "See the site ↗", "Zur Website ↗", "Ver o site ↗") },
    web: { barra: "guardianofspeed.de", escritorio: `${M}/web-escritorio-larga.webp`, celular: `${M}/web-celular-larga.webp` },
    fantasma: "Guardian",
  },
  producimos: {
    titulo: t("Cuatro cosas, una sola marca.", "Four things, one brand.", "Vier Dinge, eine einzige Marke.", "Quatro coisas, uma só marca."),
    items: [
      {
        icono: "marca",
        nombre: t("Marca", "Brand", "Marke", "Marca"),
        texto: t(
          "Un sistema visual de lujo silencioso: blanco hueso, fotos en blanco y negro y un solo acento.",
          "A quiet luxury visual system: bone white, black and white photos and a single accent.",
          "Ein visuelles System des stillen Luxus: Knochenweiß, Schwarz-Weiß-Fotos und ein einziger Akzent.",
          "Um sistema visual de luxo silencioso: branco-osso, fotos a preto e branco e um só acento.",
        ),
      },
      {
        icono: "web",
        nombre: t("Website", "Website", "Website", "Website"),
        texto: t(
          "Una web en alemán e inglés, con una página para cada servicio y la historia del fundador.",
          "A website in German and English, with a page for each service and the founder's story.",
          "Eine Website auf Deutsch und Englisch, mit einer Seite pro Leistung und der Geschichte des Gründers.",
          "Um site em alemão e inglês, com uma página para cada serviço e a história do fundador.",
        ),
      },
      {
        icono: "contenido",
        nombre: t("Contenido", "Content", "Content", "Conteúdo"),
        texto: t(
          "El archivo de fotos, procesado en blanco y negro y preparado para pantallas grandes.",
          "The photo archive, processed in black and white and prepared for large screens.",
          "Das Fotoarchiv, in Schwarz-Weiß bearbeitet und für große Bildschirme vorbereitet.",
          "O arquivo de fotos, tratado a preto e branco e preparado para ecrãs grandes.",
        ),
      },
      {
        icono: "whatsapp",
        nombre: igual("WhatsApp"),
        texto: t(
          "Acceso privado por correo y una línea directa de concierge por WhatsApp.",
          "Private access by email and a direct concierge line on WhatsApp.",
          "Privater Zugang per E-Mail und eine direkte Concierge-Linie über WhatsApp.",
          "Acesso privado por email e uma linha direta de concierge pelo WhatsApp.",
        ),
      },
    ],
  },
  hace: {
    titulo: t(
      "Le damos a un oficio de cuatro décadas una marca a su nivel.",
      "We give a four-decade craft a brand that matches it.",
      "Wir geben einem Handwerk aus vier Jahrzehnten eine Marke auf seinem Niveau.",
      "Damos a um ofício de quatro décadas uma marca à sua altura.",
    ),
    items: [
      {
        verbo: t("Diseña", "Designs", "Gestaltet", "Desenha"),
        texto: t(
          "La marca y el sistema visual, con la calma que espera un coleccionista.",
          "The brand and the visual system, with the calm a collector expects.",
          "Die Marke und das visuelle System, mit der Ruhe, die ein Sammler erwartet.",
          "A marca e o sistema visual, com a calma que um colecionador espera.",
        ),
      },
      {
        verbo: t("Construye", "Builds", "Baut", "Constrói"),
        texto: t(
          "La web en alemán e inglés, con Custode, Legato y Atelier en páginas propias.",
          "The German and English website, with Custode, Legato and Atelier on their own pages.",
          "Die Website auf Deutsch und Englisch, mit Custode, Legato und Atelier auf eigenen Seiten.",
          "O site em alemão e inglês, com Custode, Legato e Atelier em páginas próprias.",
        ),
      },
      {
        verbo: t("Produce", "Produces", "Produziert", "Produz"),
        texto: t(
          "La fotografía de archivo, lista para verse nítida en cualquier pantalla.",
          "The archive photography, ready to look sharp on any screen.",
          "Die Archivfotografie, bereit, auf jedem Bildschirm scharf auszusehen.",
          "A fotografia de arquivo, pronta para se ver nítida em qualquer ecrã.",
        ),
      },
      {
        verbo: t("Conecta", "Connects", "Verbindet", "Liga"),
        texto: t(
          "El canal directo: acceso privado por correo y la línea de concierge por WhatsApp.",
          "The direct channel: private access by email and the concierge line on WhatsApp.",
          "Den direkten Kanal: privater Zugang per E-Mail und die Concierge-Linie über WhatsApp.",
          "O canal direto: acesso privado por email e a linha de concierge pelo WhatsApp.",
        ),
      },
    ],
  },
  reto: {
    titulo: t(
      "Cuarenta años de oficio que no se veían en ninguna parte.",
      "Forty years of craft that could not be seen anywhere.",
      "Vierzig Jahre Handwerk, die nirgends zu sehen waren.",
      "Quarenta anos de ofício que não se viam em lado nenhum.",
    ),
    items: [
      {
        titulo: t("La historia estaba en un archivo.", "The story sat in an archive.", "Die Geschichte lag in einem Archiv.", "A história estava num arquivo."),
        texto: t(
          "El Paris–Dakar de 1989 y décadas de restauración vivían en fotos viejas y en la memoria de Nicolas, no en la marca.",
          "The 1989 Paris–Dakar and decades of restoration lived in old photos and in Nicolas's memory, not in the brand.",
          "Die Rallye Paris–Dakar 1989 und Jahrzehnte der Restaurierung lebten in alten Fotos und in Nicolas' Erinnerung, nicht in der Marke.",
          "O Paris–Dakar de 1989 e décadas de restauro viviam em fotos antigas e na memória do Nicolas, não na marca.",
        ),
      },
      {
        titulo: t(
          "El cliente es exigente y discreto.",
          "The client is demanding and discreet.",
          "Der Kunde ist anspruchsvoll und diskret.",
          "O cliente é exigente e discreto.",
        ),
        texto: t(
          "Un coleccionista llega sin prisa y juzga rápido: la marca tenía que sentirse al nivel de los carros que cuida.",
          "A collector arrives without hurry and judges quickly: the brand had to feel on par with the cars it looks after.",
          "Ein Sammler kommt ohne Eile und urteilt schnell: Die Marke musste sich auf dem Niveau der Autos anfühlen, die sie betreut.",
          "Um colecionador chega sem pressa e julga depressa: a marca tinha de estar ao nível dos carros de que cuida.",
        ),
      },
      {
        titulo: t(
          "Dos idiomas, un público principal.",
          "Two languages, one main audience.",
          "Zwei Sprachen, ein Hauptpublikum.",
          "Duas línguas, um público principal.",
        ),
        texto: t(
          "Quien más contrata habla alemán; todo tenía que leerse natural en alemán y también en inglés.",
          "Most clients speak German; everything had to read naturally in German and in English too.",
          "Wer am meisten bucht, spricht Deutsch; alles musste sich auf Deutsch natürlich lesen und auch auf Englisch.",
          "Quem mais contrata fala alemão; tudo tinha de se ler com naturalidade em alemão e também em inglês.",
        ),
      },
    ],
  },
  piezas: {
    titulo: t("Seis piezas, una sola marca.", "Six pieces, one brand.", "Sechs Bausteine, eine einzige Marke.", "Seis peças, uma só marca."),
    lede: t(
      "Cada pieza hace su parte para que un coleccionista confíe antes de la primera llamada. Toca cualquiera para ver qué hace y qué resuelve.",
      "Each piece does its part so a collector trusts the brand before the first call. Tap any piece to see what it does and what it solves.",
      "Jeder Baustein trägt dazu bei, dass ein Sammler schon vor dem ersten Anruf vertraut. Tippe auf einen Baustein, um zu sehen, was er tut und was er löst.",
      "Cada peça faz a sua parte para que um colecionador confie antes da primeira chamada. Toca em qualquer peça para ver o que faz e o que resolve.",
    ),
    centro: igual("Guardian of Speed"),
    centroSub: t("marca y web", "brand and website", "Marke und Website", "marca e site"),
    items: [
      {
        pestana: t("Marca", "Brand", "Marke", "Marca"),
        clave: t("01 · Marca", "01 · Brand", "01 · Marke", "01 · Marca"),
        titulo: t(
          "Lujo silencioso: blanco hueso, fotos en blanco y negro y un solo acento.",
          "Quiet luxury: bone white, black and white photos and a single accent.",
          "Stiller Luxus: Knochenweiß, Schwarz-Weiß-Fotos und ein einziger Akzent.",
          "Luxo silencioso: branco-osso, fotos a preto e branco e um só acento.",
        ),
        texto: t(
          "Un sistema visual editorial y sin adornos, donde la fotografía es lo único que habla fuerte.",
          "An editorial visual system without ornament, where photography is the only thing that speaks loudly.",
          "Ein redaktionelles visuelles System ohne Schnörkel, in dem nur die Fotografie laut spricht.",
          "Um sistema visual editorial e sem adornos, onde a fotografia é a única coisa que fala alto.",
        ),
        resuelve: t(
          "La marca se siente al nivel de los carros que cuida.",
          "The brand feels on par with the cars it looks after.",
          "Die Marke fühlt sich auf dem Niveau der Autos an, die sie betreut.",
          "A marca sente-se ao nível dos carros de que cuida.",
        ),
        visual: { tipo: "cubre", src: `${M}/home.webp`, alt: t("La portada de Guardian of Speed", "The Guardian of Speed home page", "Die Startseite von Guardian of Speed", "A página inicial da Guardian of Speed") },
      },
      {
        pestana: t("Web", "Web", "Web", "Site"),
        clave: t("02 · Web en alemán e inglés", "02 · German and English website", "02 · Website auf Deutsch und Englisch", "02 · Site em alemão e inglês"),
        titulo: t(
          "Una web bilingüe, pensada primero para el público de habla alemana.",
          "A bilingual website, designed first for a German-speaking audience.",
          "Eine zweisprachige Website, zuerst für ein deutschsprachiges Publikum gedacht.",
          "Um site bilingue, pensado primeiro para o público de língua alemã.",
        ),
        texto: t(
          "Cada página existe en alemán y en inglés, con el trato formal que espera un coleccionista y la misma calma en los dos idiomas.",
          "Every page exists in German and in English, with the formal tone a collector expects and the same calm in both languages.",
          "Jede Seite gibt es auf Deutsch und auf Englisch, mit der förmlichen Ansprache, die ein Sammler erwartet, und derselben Ruhe in beiden Sprachen.",
          "Cada página existe em alemão e em inglês, com o trato formal que um colecionador espera e a mesma calma nas duas línguas.",
        ),
        resuelve: t(
          "El cliente principal lee en su idioma, sin sensación de traducción.",
          "The main client reads in their own language, with no sense of translation.",
          "Der wichtigste Kunde liest in seiner Sprache, ohne das Gefühl einer Übersetzung.",
          "O cliente principal lê na sua língua, sem sensação de tradução.",
        ),
        visual: { tipo: "cel", src: `${M}/home-m.webp`, alt: t("La web de Guardian of Speed en el celular", "The Guardian of Speed website on a phone", "Die Website von Guardian of Speed auf dem Handy", "O site da Guardian of Speed no telemóvel") },
      },
      {
        pestana: t("Servicios", "Services", "Leistungen", "Serviços"),
        clave: t("03 · Tres servicios", "03 · Three services", "03 · Drei Leistungen", "03 · Três serviços"),
        titulo: t(
          "Custode, Legato y Atelier: guardar, mover y asesorar.",
          "Custode, Legato and Atelier: storing, moving and advising.",
          "Custode, Legato und Atelier: aufbewahren, bewegen und beraten.",
          "Custode, Legato e Atelier: guardar, transportar e aconselhar.",
        ),
        texto: t(
          "Custode cuida el carro cuando no se usa; Legato se encarga de la logística de los grandes eventos, de Mille Miglia a Villa d'Este; Atelier acompaña la compra, la venta y la restauración.",
          "Custode looks after the car when it is not in use; Legato handles the logistics of the great events, from the Mille Miglia to Villa d'Este; Atelier guides buying, selling and restoration.",
          "Custode betreut das Auto, wenn es nicht gefahren wird; Legato übernimmt die Logistik der großen Veranstaltungen, von der Mille Miglia bis Villa d'Este; Atelier begleitet Kauf, Verkauf und Restaurierung.",
          "Custode cuida do carro quando não está a ser usado; Legato trata da logística dos grandes eventos, da Mille Miglia a Villa d'Este; Atelier acompanha a compra, a venda e o restauro.",
        ),
        resuelve: t(
          "Cada servicio tiene su página y se entiende en una lectura.",
          "Each service has its own page and is understood in one read.",
          "Jede Leistung hat ihre Seite und ist mit einem Blick verstanden.",
          "Cada serviço tem a sua página e percebe-se numa leitura.",
        ),
        visual: { tipo: "cubre", src: `${M}/custode.webp`, alt: t("La página de Custode", "The Custode page", "Die Seite von Custode", "A página de Custode") },
      },
      {
        pestana: t("Historia", "Story", "Geschichte", "História"),
        clave: t("04 · La historia del fundador", "04 · The founder's story", "04 · Die Geschichte des Gründers", "04 · A história do fundador"),
        titulo: t(
          "De un Paris–Dakar en 1989 a una oficina para coleccionistas.",
          "From a Paris–Dakar in 1989 to an office for collectors.",
          "Von einer Rallye Paris–Dakar 1989 zu einem Büro für Sammler.",
          "De um Paris–Dakar em 1989 a um escritório para colecionadores.",
        ),
        texto: t(
          "La trayectoria de Nicolas Navarro pasó del archivo a la marca: una sección de historia y una página sobre él cuentan cuatro décadas de restaurar, manejar y cuidar carros excepcionales.",
          "Nicolas Navarro's career moved from the archive into the brand: a history section and a page about him tell four decades of restoring, driving and looking after exceptional cars.",
          "Der Werdegang von Nicolas Navarro wanderte vom Archiv in die Marke: Ein Geschichtsteil und eine Seite über ihn erzählen von vier Jahrzehnten, in denen er außergewöhnliche Autos restauriert, gefahren und betreut hat.",
          "O percurso de Nicolas Navarro passou do arquivo para a marca: uma secção de história e uma página sobre ele contam quatro décadas a restaurar, conduzir e cuidar de carros excecionais.",
        ),
        resuelve: t(
          "La confianza se gana antes de la primera conversación.",
          "Trust is earned before the first conversation.",
          "Vertrauen entsteht schon vor dem ersten Gespräch.",
          "A confiança ganha-se antes da primeira conversa.",
        ),
        visual: { tipo: "cubre", src: `${M}/about.webp`, alt: t("La página sobre Nicolas Navarro", "The page about Nicolas Navarro", "Die Seite über Nicolas Navarro", "A página sobre Nicolas Navarro") },
      },
      {
        pestana: t("Fotos", "Photos", "Fotos", "Fotos"),
        clave: t("05 · Fotografía de archivo", "05 · Archive photography", "05 · Archivfotografie", "05 · Fotografia de arquivo"),
        titulo: t(
          "El archivo de fotos, preparado para pantallas grandes.",
          "The photo archive, prepared for large screens.",
          "Das Fotoarchiv, vorbereitet für große Bildschirme.",
          "O arquivo de fotos, preparado para ecrãs grandes.",
        ),
        texto: t(
          "Las fotos originales se procesan en blanco y negro y en varios tamaños, para que se vean nítidas en cualquier pantalla sin volver lenta la web.",
          "The original photos are processed in black and white and in several sizes, so they look sharp on any screen without slowing the website down.",
          "Die Originalfotos werden in Schwarz-Weiß und in mehreren Größen aufbereitet, damit sie auf jedem Bildschirm scharf aussehen, ohne die Website zu verlangsamen.",
          "As fotos originais são tratadas a preto e branco e em vários tamanhos, para que se vejam nítidas em qualquer ecrã sem tornar o site lento.",
        ),
        resuelve: t(
          "Un coleccionista ve los carros como son.",
          "A collector sees the cars as they are.",
          "Ein Sammler sieht die Autos, wie sie sind.",
          "Um colecionador vê os carros como são.",
        ),
        visual: { tipo: "cubre", src: `${M}/legato-2.webp`, alt: t("Fotografía en blanco y negro del archivo", "Black and white archive photograph", "Schwarz-Weiß-Foto aus dem Archiv", "Fotografia a preto e branco do arquivo") },
      },
      {
        pestana: t("Contacto", "Contact", "Kontakt", "Contacto"),
        clave: t("06 · Canal directo", "06 · Direct channel", "06 · Direkter Kanal", "06 · Canal direto"),
        titulo: t(
          "Acceso privado y una línea directa por WhatsApp.",
          "Private access and a direct line on WhatsApp.",
          "Privater Zugang und eine direkte Linie über WhatsApp.",
          "Acesso privado e uma linha direta pelo WhatsApp.",
        ),
        texto: t(
          "Sin formularios largos: quien quiere hablar pide acceso privado por correo o escribe directo a la línea de concierge.",
          "No long forms: anyone who wants to talk asks for private access by email or writes straight to the concierge line.",
          "Keine langen Formulare: Wer sprechen möchte, bittet per E-Mail um privaten Zugang oder schreibt direkt an die Concierge-Linie.",
          "Sem formulários longos: quem quer falar pede acesso privado por email ou escreve diretamente para a linha de concierge.",
        ),
        resuelve: t(
          "El primer contacto se siente personal, como el servicio.",
          "The first contact feels personal, like the service.",
          "Der erste Kontakt fühlt sich persönlich an, wie der Service.",
          "O primeiro contacto sente-se pessoal, como o serviço.",
        ),
        visual: { tipo: "grande", texto: "1:1", sub: t("Línea directa de concierge", "Direct concierge line", "Direkte Concierge-Linie", "Linha direta de concierge") },
      },
    ],
  },
  tecnologia: {
    titulo: t(
      "Una marca simple de usar, hecha con inteligencia artificial.",
      "A brand that is simple to use, made with artificial intelligence.",
      "Eine Marke, die einfach zu nutzen ist, gemacht mit künstlicher Intelligenz.",
      "Uma marca simples de usar, feita com inteligência artificial.",
    ),
    lede: t(
      "Aquí la tecnología no se ve: la web es rápida, bilingüe y directa. En rosa, donde trabajó la inteligencia artificial. Toca cualquiera.",
      "Here the technology stays out of sight: the website is fast, bilingual and direct. In pink, where artificial intelligence worked. Tap any of them.",
      "Hier bleibt die Technik unsichtbar: Die Website ist schnell, zweisprachig und direkt. In Rosa: wo künstliche Intelligenz gearbeitet hat. Tippe auf ein Element.",
      "Aqui a tecnologia não se vê: o site é rápido, bilingue e direto. A cor-de-rosa, onde trabalhou a inteligência artificial. Toca em qualquer uma.",
    ),
    centro: { titulo: igual("Guardian of Speed"), sub: t("marca y web", "brand and website", "Marke und Website", "marca e site") },
    nodos: [
      {
        id: "construccion",
        nombre: t("Construcción con IA", "Built with AI", "Mit KI gebaut", "Construção com IA"),
        corto: t("Hecha con IA", "Made with AI", "Mit KI gemacht", "Feita com IA"),
        tipo: "ia",
        hace: t(
          "La web se diseñó y se programó con herramientas de inteligencia artificial, con dirección de arte de una persona en cada decisión.",
          "The website was designed and coded with artificial intelligence tools, with a person's art direction in every decision.",
          "Die Website wurde mit KI-Werkzeugen gestaltet und programmiert, mit menschlicher Art Direction bei jeder Entscheidung.",
          "O site foi desenhado e programado com ferramentas de inteligência artificial, com direção de arte de uma pessoa em cada decisão.",
        ),
        con: ["web", "fotos", "servicios"],
      },
      {
        id: "web",
        nombre: t("Web bilingüe", "Bilingual website", "Zweisprachige Website", "Site bilingue"),
        corto: t("Web", "Web", "Web", "Site"),
        tipo: "herramienta",
        hace: t(
          "guardianofspeed.de: la marca, los servicios y la historia en dos idiomas.",
          "guardianofspeed.de: the brand, the services and the story in two languages.",
          "guardianofspeed.de: die Marke, die Leistungen und die Geschichte in zwei Sprachen.",
          "guardianofspeed.de: a marca, os serviços e a história em duas línguas.",
        ),
        con: [],
        img: `${M}/home.webp`,
      },
      {
        id: "servicios",
        nombre: t("Páginas de servicio", "Service pages", "Leistungsseiten", "Páginas de serviço"),
        corto: t("Servicios", "Services", "Leistungen", "Serviços"),
        tipo: "herramienta",
        hace: t(
          "Custode, Legato y Atelier, cada uno con su página y su galería.",
          "Custode, Legato and Atelier, each with its own page and gallery.",
          "Custode, Legato und Atelier, jeweils mit eigener Seite und Galerie.",
          "Custode, Legato e Atelier, cada um com a sua página e a sua galeria.",
        ),
        con: ["web"],
      },
      {
        id: "historia",
        nombre: t("Historia del fundador", "The founder's story", "Geschichte des Gründers", "História do fundador"),
        corto: t("Historia", "Story", "Geschichte", "História"),
        tipo: "herramienta",
        hace: t(
          "La sección de historia y la página sobre Nicolas, construidas desde su archivo.",
          "The history section and the page about Nicolas, built from his archive.",
          "Der Geschichtsteil und die Seite über Nicolas, aufgebaut aus seinem Archiv.",
          "A secção de história e a página sobre o Nicolas, construídas a partir do seu arquivo.",
        ),
        con: ["web", "fotos"],
        img: `${M}/about-2.webp`,
      },
      {
        id: "fotos",
        nombre: t("Fotos de alta resolución", "High-resolution photos", "Hochauflösende Fotos", "Fotos de alta resolução"),
        corto: t("Fotos", "Photos", "Fotos", "Fotos"),
        tipo: "herramienta",
        hace: t(
          "El archivo original, convertido a blanco y negro y a varios tamaños para cada pantalla.",
          "The original archive, converted to black and white and to several sizes for each screen.",
          "Das Originalarchiv, in Schwarz-Weiß und in mehrere Größen für jeden Bildschirm umgewandelt.",
          "O arquivo original, convertido a preto e branco e em vários tamanhos para cada ecrã.",
        ),
        con: ["web"],
      },
      {
        id: "whatsapp",
        nombre: igual("WhatsApp"),
        icono: "whatsapp",
        tipo: "herramienta",
        hace: t(
          "La línea directa de concierge, a un toque desde cualquier página.",
          "The direct concierge line, one tap away from any page.",
          "Die direkte Concierge-Linie, mit einem Tippen von jeder Seite aus erreichbar.",
          "A linha direta de concierge, a um toque de qualquer página.",
        ),
        con: ["web"],
      },
      {
        id: "correo",
        nombre: t("Acceso privado", "Private access", "Privater Zugang", "Acesso privado"),
        corto: t("Correo", "Email", "E-Mail", "Email"),
        tipo: "herramienta",
        hace: t(
          "Las solicitudes de acceso privado llegan directo al correo del fundador.",
          "Private access requests go straight to the founder's email.",
          "Anfragen für privaten Zugang gehen direkt an die E-Mail des Gründers.",
          "Os pedidos de acesso privado chegam diretamente ao email do fundador.",
        ),
        con: ["web"],
      },
    ],
  },
  galeria: {
    titulo: t(
      "La marca, los servicios y la historia.",
      "The brand, the services and the story.",
      "Die Marke, die Leistungen und die Geschichte.",
      "A marca, os serviços e a história.",
    ),
    items: [
      { src: `${M}/home.webp`, pie: t("La portada", "The home page", "Die Startseite", "A página inicial"), alt: t("La portada de Guardian of Speed", "The Guardian of Speed home page", "Die Startseite von Guardian of Speed", "A página inicial da Guardian of Speed") },
      { src: `${M}/home-m.webp`, forma: "alta", pie: t("En el celular", "On a phone", "Auf dem Handy", "No telemóvel"), alt: t("La web en el celular", "The website on a phone", "Die Website auf dem Handy", "O site no telemóvel") },
      { src: `${M}/about-m.webp`, forma: "alta", pie: t("La historia", "The story", "Die Geschichte", "A história"), alt: t("La página sobre Nicolas en el celular", "The page about Nicolas on a phone", "Die Seite über Nicolas auf dem Handy", "A página sobre o Nicolas no telemóvel") },
      { src: `${M}/legato-m.webp`, forma: "alta", pie: igual("Legato"), alt: t("La página de Legato en el celular", "The Legato page on a phone", "Die Seite von Legato auf dem Handy", "A página de Legato no telemóvel") },
      { src: `${M}/atelier-m.webp`, forma: "alta", pie: igual("Atelier"), alt: t("La página de Atelier en el celular", "The Atelier page on a phone", "Die Seite von Atelier auf dem Handy", "A página de Atelier no telemóvel") },
      { src: `${M}/custode.webp`, forma: "ancha", pie: igual("Custode"), alt: t("La página de Custode", "The Custode page", "Die Seite von Custode", "A página de Custode") },
    ],
  },
  cambio: {
    titulo: t(
      "Una marca a la altura de la colección.",
      "A brand that lives up to the collection.",
      "Eine Marke auf der Höhe der Sammlung.",
      "Uma marca à altura da coleção.",
    ),
    items: [
      {
        cifra: "2",
        negrita: t("Idiomas,", "Languages,", "Sprachen,", "Línguas,"),
        texto: t("con el alemán primero.", "with German first.", "Deutsch zuerst.", "com o alemão primeiro."),
      },
      {
        cifra: "3",
        negrita: t("Servicios,", "Services,", "Leistungen,", "Serviços,"),
        texto: t("cada uno con su página.", "each with its own page.", "jede mit eigener Seite.", "cada um com a sua página."),
      },
      {
        cifra: "1989",
        negrita: t("El año", "The year", "Das Jahr,", "O ano"),
        texto: t(
          "en que empieza la historia que ahora cuenta la marca.",
          "the story the brand now tells begins.",
          "in dem die Geschichte beginnt, die die Marke heute erzählt.",
          "em que começa a história que agora a marca conta.",
        ),
      },
    ],
  },
  cierre: {
    titulo: t("¿Te imaginas tu marca", "Can you picture your brand", "Wie wäre es, wenn deine Marke", "Imaginas a tua marca"),
    resaltado: t("contada así?", "told like this?", "so erzählt würde?", "contada assim?"),
    lede: t(
      "Cuéntame qué haces y te digo por dónde empezaría.",
      "Tell me what you do and I'll tell you where I'd start.",
      "Erzähl mir, was du machst, und ich sage dir, wo ich anfangen würde.",
      "Conta-me o que fazes e digo-te por onde começaria.",
    ),
    enlace: { href: "https://www.guardianofspeed.de", texto: t("Ver el sitio ↗", "See the site ↗", "Zur Website ↗", "Ver o site ↗") },
  },
  tarjeta: {
    etiqueta: t(
      "Concierge de colecciones en Europa",
      "Collection concierge in Europe",
      "Concierge für Sammlungen in Europa",
      "Concierge de coleções na Europa",
    ),
    imagen: "/v2/portafolio/guardian.jpg",
    imagenCel: "/v2/portafolio/guardian-m.jpg",
  },
};
