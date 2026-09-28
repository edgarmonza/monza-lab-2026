/* Caso Eleonora Morales (/work/eleonora-morales). Sale de docs/internal/portada/prototipo/caso-eleonora.html.
 * Fotos: solo el set que ella aprobó y que ya está publicado, y solo looks cubiertos
 * (Studio Builder/Monza Studio/Clientes/Eleonora-EM/REGLA-IMAGEN-ELEONORA.md). */
import type { Caso, T } from "./tipos";

const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });
const igual = (s: string): T => ({ es: s, en: s, de: s, pt: s });
const M = "/v2/caso-eleonora";

export const caso: Caso = {
  slug: "eleonora-morales",
  nombre: igual("Eleonora Morales"),
  categoria: "studio",
  seo: {
    titulo: t(
      "Caso Eleonora Morales · Tienda en línea, asesora de IA y contenido | Monza Lab",
      "Eleonora Morales case · Online store, AI advisor and content | Monza Lab",
      "Fall Eleonora Morales · Onlineshop, KI-Beraterin und Content | Monza Lab",
      "Caso Eleonora Morales · Loja online, assessora de IA e conteúdo | Monza Lab",
    ),
    descripcion: t(
      "Una casa de moda que atiende a cualquier hora y publica cada pieza sin esperar una sesión de fotos: website, agente de IA en WhatsApp, CRM y contenido, construidos y operados por Monza Lab.",
      "A fashion house that answers at any hour and publishes every piece without waiting for a photo shoot: website, AI agent on WhatsApp, CRM and content, built and run by Monza Lab.",
      "Ein Modehaus, das rund um die Uhr antwortet und jedes Stück ohne Fotoshooting veröffentlicht: Website, KI-Agent auf WhatsApp, CRM und Content, gebaut und betrieben von Monza Lab.",
      "Uma casa de moda que atende a qualquer hora e publica cada peça sem esperar por uma sessão fotográfica: website, agente de IA no WhatsApp, CRM e conteúdo, construídos e operados pela Monza Lab.",
    ),
  },
  hero: {
    linea1: igual("Eleonora"),
    linea2: igual("Morales"),
    frase: t(
      "Una casa de moda que atiende a cualquier hora y publica cada pieza sin esperar una sesión de fotos.",
      "A fashion house that answers at any hour and publishes every piece without waiting for a photo shoot.",
      "Ein Modehaus, das rund um die Uhr antwortet und jedes Stück ohne Fotoshooting veröffentlicht.",
      "Uma casa de moda que atende a qualquer hora e publica cada peça sem esperar por uma sessão fotográfica.",
    ),
    pastillas: [
      t("Moda circular", "Circular fashion", "Zirkuläre Mode", "Moda circular"),
      t("Lujo pre-owned", "Pre-owned luxury", "Pre-owned Luxus", "Luxo pre-owned"),
      igual("Colombia"),
    ],
    enlace: { href: "https://www.eleonoramorales.com", texto: t("Ver la tienda ↗", "See the store ↗", "Zum Shop ↗", "Ver a loja ↗") },
    web: { barra: "eleonoramorales.com", escritorio: `${M}/web-escritorio-larga.webp`, celular: `${M}/web-celular-larga.webp` },
    fantasma: "Eleonora",
  },
  producimos: {
    titulo: t("Cinco cosas, funcionando juntas.", "Five things, working together.", "Fünf Dinge, die zusammenarbeiten.", "Cinco coisas, a funcionar juntas."),
    items: [
      { icono: "web", nombre: igual("Website"), texto: t(
        "La tienda en línea de la casa, hecha a la medida con su estética y conectada al catálogo.",
        "The house's online store, made to measure with its aesthetic and connected to the catalog.",
        "Der Onlineshop des Hauses, maßgeschneidert in seiner Ästhetik und mit dem Katalog verbunden.",
        "A loja online da casa, feita à medida com a sua estética e ligada ao catálogo.") },
      { icono: "agente", nombre: t("Agente de IA", "AI agent", "KI-Agent", "Agente de IA"), texto: t(
        "Una asesora de moda que contesta a cualquier hora, conoce el inventario y arma el look.",
        "A fashion advisor who answers at any hour, knows the inventory and puts the look together.",
        "Eine Modeberaterin, die rund um die Uhr antwortet, den Bestand kennt und den Look zusammenstellt.",
        "Uma assessora de moda que responde a qualquer hora, conhece o inventário e monta o look.") },
      { icono: "whatsapp", nombre: igual("WhatsApp"), texto: t(
        "La línea de la marca, con un portal para que el equipo vea cada conversación y tome las que necesitan a una persona.",
        "The brand's line, with a portal where the team sees every conversation and takes the ones that need a person.",
        "Die Leitung der Marke, mit einem Portal, in dem das Team jedes Gespräch sieht und die übernimmt, die einen Menschen brauchen.",
        "A linha da marca, com um portal onde a equipa vê cada conversa e assume as que precisam de uma pessoa.") },
      { icono: "crm", nombre: igual("CRM"), texto: t(
        "Una sola base de clientas, de la tienda, del WhatsApp y del correo, con lo que cada una compra.",
        "A single customer base, from the store, WhatsApp and email, with what each one buys.",
        "Eine einzige Kundinnenbasis aus Shop, WhatsApp und E-Mail, mit allem, was jede kauft.",
        "Uma única base de clientes, da loja, do WhatsApp e do email, com o que cada uma compra.") },
      { icono: "contenido", nombre: t("Contenido", "Content", "Content", "Conteúdo"), texto: t(
        "Fotos de producto con IA para cada pieza nueva y piezas para redes, con la dirección creativa de la marca.",
        "AI product photos for every new piece and posts for social media, with the brand's creative direction.",
        "KI-Produktfotos für jedes neue Stück und Beiträge für Social Media, mit der Creative Direction der Marke.",
        "Fotos de produto com IA para cada peça nova e conteúdos para redes, com a direção criativa da marca.") },
    ],
  },
  hace: {
    titulo: t("Lo diseñamos, lo construimos y lo operamos.", "We design it, build it and run it.", "Wir gestalten, bauen und betreiben es.", "Desenhamos, construímos e operamos."),
    items: [
      { verbo: t("Diseña", "Designs", "Gestaltet", "Desenha"), texto: t(
        "La tienda, la experiencia de compra y la voz de la asesora, con la estética de la casa.",
        "The store, the shopping experience and the advisor's voice, with the house's aesthetic.",
        "Den Shop, das Einkaufserlebnis und die Stimme der Beraterin, in der Ästhetik des Hauses.",
        "A loja, a experiência de compra e a voz da assessora, com a estética da casa.") },
      { verbo: t("Construye", "Builds", "Baut", "Constrói"), texto: t(
        "La web, la asesora de WhatsApp, la base de clientas y el portal del equipo, conectados entre sí.",
        "The website, the WhatsApp advisor, the customer base and the team portal, all connected.",
        "Die Website, die WhatsApp-Beraterin, die Kundinnenbasis und das Teamportal, miteinander verbunden.",
        "O site, a assessora de WhatsApp, a base de clientes e o portal da equipa, ligados entre si.") },
      { verbo: t("Produce", "Produces", "Produziert", "Produz"), texto: t(
        "Las fotos de cada pieza nueva y el contenido para redes, sin montar una sesión cada vez.",
        "The photos of every new piece and the social content, without setting up a shoot every time.",
        "Die Fotos jedes neuen Stücks und den Social Content, ohne jedes Mal ein Shooting aufzubauen.",
        "As fotos de cada peça nova e o conteúdo para redes, sem montar uma sessão de cada vez.") },
      { verbo: t("Opera", "Runs", "Betreibt", "Opera"), texto: t(
        "La asesora y el WhatsApp todos los días, y vigila que contesten bien.",
        "The advisor and WhatsApp every day, and makes sure they answer well.",
        "Die Beraterin und WhatsApp jeden Tag, und achtet darauf, dass gut geantwortet wird.",
        "A assessora e o WhatsApp todos os dias, e garante que respondem bem.") },
      { verbo: t("Mide", "Measures", "Misst", "Mede"), texto: t(
        "Qué se vende, qué preguntan las clientas y qué conversaciones necesitan a una persona.",
        "What sells, what customers ask and which conversations need a person.",
        "Was sich verkauft, was Kundinnen fragen und welche Gespräche einen Menschen brauchen.",
        "O que se vende, o que as clientes perguntam e que conversas precisam de uma pessoa.") },
    ],
  },
  reto: {
    titulo: t(
      "Vender piezas únicas sin que cada venta dependa de alguien disponible.",
      "Selling one-of-a-kind pieces without every sale depending on someone being available.",
      "Einzelstücke verkaufen, ohne dass jeder Verkauf davon abhängt, dass gerade jemand da ist.",
      "Vender peças únicas sem que cada venda dependa de alguém disponível.",
    ),
    items: [
      { titulo: t("Cada pieza es única.", "Every piece is unique.", "Jedes Stück ist einzigartig.", "Cada peça é única."), texto: t(
        "En moda circular y pre-owned no hay repetición: cada prenda necesita su foto, su ficha y su precio antes de poder venderse.",
        "In circular and pre-owned fashion nothing repeats: every garment needs its photo, its product page and its price before it can sell.",
        "In zirkulärer und Pre-owned Mode wiederholt sich nichts: Jedes Teil braucht Foto, Produktseite und Preis, bevor es sich verkaufen kann.",
        "Na moda circular e pre-owned não há repetição: cada peça precisa da sua foto, da sua ficha e do seu preço antes de se poder vender.") },
      { titulo: t("Las clientas preguntan a cualquier hora.", "Customers ask at any hour.", "Kundinnen fragen zu jeder Uhrzeit.", "As clientes perguntam a qualquer hora."), texto: t(
        "La conversación vive en WhatsApp, y una pregunta de talla a medianoche también es una venta.",
        "The conversation lives on WhatsApp, and a size question at midnight is also a sale.",
        "Das Gespräch findet auf WhatsApp statt, und eine Größenfrage um Mitternacht ist auch ein Verkauf.",
        "A conversa vive no WhatsApp, e uma pergunta de tamanho à meia-noite também é uma venda.") },
      { titulo: t("Varias líneas, una sola marca.", "Several lines, one brand.", "Mehrere Linien, eine Marke.", "Várias linhas, uma só marca."), texto: t(
        "Circular, pre-owned, diseño colombiano y piezas de París tenían que sentirse como una misma casa.",
        "Circular, pre-owned, Colombian design and pieces from Paris had to feel like one house.",
        "Zirkulär, Pre-owned, kolumbianisches Design und Stücke aus Paris mussten sich wie ein Haus anfühlen.",
        "Circular, pre-owned, design colombiano e peças de Paris tinham de parecer uma mesma casa.") },
    ],
  },
  piezas: {
    titulo: t("Seis piezas, una sola operación.", "Six pieces, one operation.", "Sechs Teile, ein Betrieb.", "Seis peças, uma só operação."),
    lede: t(
      "Cada pieza sirve sola, y conectadas se hablan entre sí. Toca cualquiera para ver qué hace y qué le resuelve al negocio.",
      "Each piece works on its own, and connected they talk to each other. Tap any of them to see what it does and what it solves for the business.",
      "Jedes Teil funktioniert allein, und verbunden sprechen sie miteinander. Tippe auf eines, um zu sehen, was es tut und was es dem Geschäft löst.",
      "Cada peça funciona sozinha e, ligadas, falam entre si. Toca em qualquer uma para ver o que faz e o que resolve ao negócio.",
    ),
    centro: t("Una sola operación", "One operation", "Ein Betrieb", "Uma só operação"),
    centroSub: t("todo conectado", "all connected", "alles verbunden", "tudo ligado"),
    items: [
      {
        pestana: t("Tienda", "Store", "Shop", "Loja"),
        clave: t("01 · Tienda en línea", "01 · Online store", "01 · Onlineshop", "01 · Loja online"),
        titulo: t("Todas las líneas de la marca en una sola tienda.", "Every line of the brand in one store.", "Alle Linien der Marke in einem Shop.", "Todas as linhas da marca numa só loja."),
        texto: t(
          "La web de la casa, con su voz y su estética, donde cada pieza se puede ver, pagar y enviar en la misma compra.",
          "The house's website, with its voice and its aesthetic, where every piece can be seen, paid for and shipped in the same purchase.",
          "Die Website des Hauses, mit ihrer Stimme und Ästhetik, in der jedes Stück im selben Kauf angesehen, bezahlt und versendet werden kann.",
          "O site da casa, com a sua voz e a sua estética, onde cada peça se pode ver, pagar e enviar na mesma compra."),
        resuelve: t("Las clientas compran solas, desde el celular, a la hora que quieran.", "Customers buy on their own, from their phone, whenever they want.", "Kundinnen kaufen selbst ein, vom Handy aus, wann sie wollen.", "As clientes compram sozinhas, pelo telemóvel, à hora que quiserem."),
        visual: { tipo: "cubre", src: `${M}/vitrina-desktop.webp`, alt: t("Portada de la tienda de Eleonora Morales", "Eleonora Morales store homepage", "Startseite des Shops von Eleonora Morales", "Página inicial da loja de Eleonora Morales") },
      },
      {
        pestana: t("Catálogo", "Catalog", "Katalog", "Catálogo"),
        clave: t("02 · Catálogo con fotos de IA", "02 · Catalog with AI photos", "02 · Katalog mit KI-Fotos", "02 · Catálogo com fotos de IA"),
        titulo: t("Cada pieza entra con su foto editorial.", "Every piece comes in with its editorial photo.", "Jedes Stück kommt mit seinem Editorial-Foto.", "Cada peça entra com a sua foto editorial."),
        texto: t(
          "Las fotos de producto se hacen con inteligencia artificial y con dirección de arte, siguiendo las reglas de imagen de la marca. El equipo carga la pieza y sale lista para vender.",
          "Product photos are made with artificial intelligence and art direction, following the brand's image rules. The team uploads the piece and it goes out ready to sell.",
          "Produktfotos entstehen mit künstlicher Intelligenz und Art Direction, nach den Bildregeln der Marke. Das Team lädt das Stück hoch, und es ist bereit zum Verkauf.",
          "As fotos de produto fazem-se com inteligência artificial e direção de arte, seguindo as regras de imagem da marca. A equipa carrega a peça e ela sai pronta para vender."),
        resuelve: t("Una pieza nueva sale publicada sin esperar una sesión de fotos.", "A new piece goes live without waiting for a photo shoot.", "Ein neues Stück geht online, ohne auf ein Fotoshooting zu warten.", "Uma peça nova é publicada sem esperar por uma sessão fotográfica."),
        visual: { tipo: "cel", src: `${M}/catalogo-movil.webp`, alt: t("El catálogo de la tienda en el celular", "The store catalog on a phone", "Der Shopkatalog auf dem Handy", "O catálogo da loja no telemóvel") },
      },
      {
        pestana: t("Asesora", "Advisor", "Beraterin", "Assessora"),
        clave: t("03 · Asesora de WhatsApp", "03 · WhatsApp advisor", "03 · WhatsApp-Beraterin", "03 · Assessora de WhatsApp"),
        titulo: t("Una asesora de moda que contesta con el criterio de la casa.", "A fashion advisor who answers with the house's judgment.", "Eine Modeberaterin, die mit dem Stilgefühl des Hauses antwortet.", "Uma assessora de moda que responde com o critério da casa."),
        texto: t(
          "Responde con el método de estilo de la marca, ayuda a armar el look y recomienda piezas de la tienda. Cuando una conversación necesita a una persona, la toma el equipo.",
          "She answers with the brand's styling method, helps put the look together and recommends pieces from the store. When a conversation needs a person, the team takes over.",
          "Sie antwortet mit der Stilmethode der Marke, hilft beim Zusammenstellen des Looks und empfiehlt Stücke aus dem Shop. Wenn ein Gespräch einen Menschen braucht, übernimmt das Team.",
          "Responde com o método de estilo da marca, ajuda a montar o look e recomenda peças da loja. Quando uma conversa precisa de uma pessoa, a equipa assume."),
        resuelve: t("Siempre hay alguien que contesta, también de madrugada.", "There is always someone answering, even in the middle of the night.", "Es antwortet immer jemand, auch mitten in der Nacht.", "Há sempre alguém a responder, também de madrugada."),
        visual: { tipo: "grande", texto: "24/7", sub: t("Asesora de estilo en WhatsApp", "Style advisor on WhatsApp", "Stilberaterin auf WhatsApp", "Assessora de estilo no WhatsApp") },
      },
      {
        pestana: t("Clientas", "Customers", "Kundinnen", "Clientes"),
        clave: t("04 · Base de clientas", "04 · Customer base", "04 · Kundinnenbasis", "04 · Base de clientes"),
        titulo: t("Las clientas, en un solo lugar.", "Every customer, in one place.", "Alle Kundinnen an einem Ort.", "As clientes, num só lugar."),
        texto: t(
          "Las que compran en la tienda, las que escriben por WhatsApp y las que reciben correo quedan en una misma base, con lo que cada una ha comprado y preguntado.",
          "Those who buy in the store, those who write on WhatsApp and those who get emails end up in the same base, with what each has bought and asked.",
          "Wer im Shop kauft, wer auf WhatsApp schreibt und wer E-Mails bekommt, landet in derselben Basis, mit allem, was jede gekauft und gefragt hat.",
          "As que compram na loja, as que escrevem pelo WhatsApp e as que recebem email ficam numa mesma base, com o que cada uma comprou e perguntou."),
        resuelve: t("El equipo sabe quién compra y qué se vende.", "The team knows who buys and what sells.", "Das Team weiß, wer kauft und was sich verkauft.", "A equipa sabe quem compra e o que se vende."),
        visual: { tipo: "fuentes", fuentes: [t("Tienda", "Store", "Shop", "Loja"), igual("WhatsApp"), t("Correo", "Email", "E-Mail", "Email")], total: t("Una sola base de clientas", "One customer base", "Eine Kundinnenbasis", "Uma só base de clientes") },
      },
      {
        pestana: t("Contenido", "Content", "Content", "Conteúdo"),
        clave: t("05 · Contenido para redes", "05 · Social content", "05 · Social Content", "05 · Conteúdo para redes"),
        titulo: t("Campañas y piezas para redes, del mismo sistema.", "Campaigns and social posts, from the same system.", "Kampagnen und Social-Beiträge aus demselben System.", "Campanhas e conteúdos para redes, do mesmo sistema."),
        texto: t(
          "Las fotos y los looks que se usan en redes salen del mismo material que alimenta la tienda, con la dirección creativa de la marca.",
          "The photos and looks used on social media come from the same material that feeds the store, with the brand's creative direction.",
          "Die Fotos und Looks für Social Media kommen aus demselben Material, das den Shop speist, mit der Creative Direction der Marke.",
          "As fotos e os looks usados nas redes saem do mesmo material que alimenta a loja, com a direção criativa da marca."),
        resuelve: t("La marca publica al ritmo que necesita, sin montar una producción cada vez.", "The brand publishes at the pace it needs, without staging a production every time.", "Die Marke veröffentlicht in ihrem Tempo, ohne jedes Mal eine Produktion aufzuziehen.", "A marca publica ao ritmo de que precisa, sem montar uma produção de cada vez."),
        visual: { tipo: "par", atras: `${M}/look-chanel.webp`, frente: `${M}/look-rojo.webp`, alt: t("Eleonora con vestido rojo, contenido para redes", "Eleonora in a red dress, social content", "Eleonora im roten Kleid, Social Content", "Eleonora com vestido vermelho, conteúdo para redes") },
      },
      {
        pestana: t("Equipo", "Team", "Team", "Equipa"),
        clave: t("06 · Portal del equipo", "06 · Team portal", "06 · Teamportal", "06 · Portal da equipa"),
        titulo: t("Un tablero para que el equipo vea todo.", "A dashboard so the team sees everything.", "Ein Dashboard, damit das Team alles sieht.", "Um painel para a equipa ver tudo."),
        texto: t(
          "Desde un portal el equipo carga las piezas nuevas, ve cada conversación de WhatsApp y toma las que necesitan una persona.",
          "From a portal the team uploads new pieces, sees every WhatsApp conversation and takes the ones that need a person.",
          "In einem Portal lädt das Team neue Stücke hoch, sieht jedes WhatsApp-Gespräch und übernimmt die, die einen Menschen brauchen.",
          "A partir de um portal a equipa carrega as peças novas, vê cada conversa de WhatsApp e assume as que precisam de uma pessoa."),
        resuelve: t("Un solo equipo responde por toda la operación.", "One team answers for the whole operation.", "Ein Team verantwortet den ganzen Betrieb.", "Uma só equipa responde por toda a operação."),
        visual: { tipo: "grande", texto: "1", sub: t("Un solo equipo", "One team", "Ein Team", "Uma só equipa") },
      },
    ],
  },
  tecnologia: {
    titulo: t("Todo conectado, con inteligencia artificial adentro.", "Everything connected, with artificial intelligence inside.", "Alles verbunden, mit künstlicher Intelligenz im Inneren.", "Tudo ligado, com inteligência artificial lá dentro."),
    lede: t(
      "Cada herramienta hace lo suyo; el sistema las hace hablar entre sí. En rosa, donde trabaja la inteligencia artificial. Toca cualquiera.",
      "Each tool does its job; the system makes them talk to each other. In pink, where artificial intelligence works. Tap any of them.",
      "Jedes Werkzeug macht seine Arbeit; das System lässt sie miteinander sprechen. In Rosa: wo künstliche Intelligenz arbeitet. Tippe auf eines.",
      "Cada ferramenta faz o seu; o sistema põe-nas a falar entre si. Em rosa, onde trabalha a inteligência artificial. Toca em qualquer uma.",
    ),
    centro: { titulo: t("La operación de Eleonora", "Eleonora's operation", "Eleonoras Betrieb", "A operação de Eleonora"), sub: t("un solo sistema", "one system", "ein System", "um só sistema") },
    nodos: [
      { id: "asesora", nombre: t("Asesora de moda", "Fashion advisor", "Modeberaterin", "Assessora de moda"), corto: t("Asesora", "Advisor", "Beraterin", "Assessora"), tipo: "ia",
        hace: t(
          "Contesta en WhatsApp a cualquier hora con el criterio de estilo de la casa, conoce el inventario en vivo y ayuda a armar el look. Cuando una conversación necesita a una persona, se la pasa al equipo.",
          "Answers on WhatsApp at any hour with the house's sense of style, knows the live inventory and helps put the look together. When a conversation needs a person, she hands it to the team.",
          "Antwortet rund um die Uhr auf WhatsApp mit dem Stilgefühl des Hauses, kennt den Live-Bestand und hilft beim Look. Braucht ein Gespräch einen Menschen, gibt sie es ans Team weiter.",
          "Responde no WhatsApp a qualquer hora com o critério de estilo da casa, conhece o inventário em tempo real e ajuda a montar o look. Quando uma conversa precisa de uma pessoa, passa-a à equipa."),
        con: ["whatsapp", "shopify", "base", "portal"] },
      { id: "fotos", nombre: t("Fotos con IA", "AI photos", "KI-Fotos", "Fotos com IA"), corto: t("Fotos IA", "AI photos", "KI-Fotos", "Fotos IA"), tipo: "ia",
        hace: t(
          "Cada pieza nueva sale con foto editorial, con dirección de arte y siguiendo las reglas de imagen de la marca. No hay que esperar una sesión de fotos para publicar.",
          "Every new piece goes out with an editorial photo, with art direction and following the brand's image rules. No need to wait for a shoot to publish.",
          "Jedes neue Stück erscheint mit Editorial-Foto, mit Art Direction und nach den Bildregeln der Marke. Kein Warten auf ein Shooting.",
          "Cada peça nova sai com foto editorial, com direção de arte e seguindo as regras de imagem da marca. Não é preciso esperar por uma sessão para publicar."),
        con: ["shopify", "web"], img: `${M}/catalogo-movil.webp` },
      { id: "shopify", nombre: igual("Shopify"), icono: "shopify", tipo: "herramienta",
        hace: t(
          "El catálogo, el inventario y los pedidos. Todo lo que se vende sale de aquí, y la asesora lo lee en vivo para no ofrecer lo que ya no está.",
          "The catalog, inventory and orders. Everything that sells comes from here, and the advisor reads it live so she never offers what is gone.",
          "Katalog, Bestand und Bestellungen. Alles, was verkauft wird, kommt von hier, und die Beraterin liest es live, um nichts anzubieten, was weg ist.",
          "O catálogo, o inventário e as encomendas. Tudo o que se vende sai daqui, e a assessora lê-o em tempo real para não oferecer o que já não existe."),
        con: ["web"] },
      { id: "web", nombre: t("Web de la marca", "Brand website", "Website der Marke", "Site da marca"), corto: igual("Web"), icono: "vercel", tipo: "herramienta",
        hace: t(
          "La tienda que ven las clientas, hecha a la medida con la estética de la casa y conectada al catálogo.",
          "The store customers see, made to measure with the house's aesthetic and connected to the catalog.",
          "Der Shop, den Kundinnen sehen, maßgeschneidert in der Ästhetik des Hauses und mit dem Katalog verbunden.",
          "A loja que as clientes veem, feita à medida com a estética da casa e ligada ao catálogo."),
        con: ["google", "meta"], img: `${M}/vitrina-desktop.webp` },
      { id: "whatsapp", nombre: igual("WhatsApp Business"), corto: igual("WhatsApp"), icono: "whatsapp", tipo: "herramienta",
        hace: t(
          "Donde las clientas preguntan, piden su talla y compran. La cuenta es de la marca; nosotros la operamos.",
          "Where customers ask, request their size and buy. The account belongs to the brand; we run it.",
          "Wo Kundinnen fragen, ihre Größe anfragen und kaufen. Das Konto gehört der Marke; wir betreiben es.",
          "Onde as clientes perguntam, pedem o seu tamanho e compram. A conta é da marca; nós operamo-la."),
        con: ["meta"] },
      { id: "meta", nombre: t("Instagram y Meta", "Instagram and Meta", "Instagram und Meta", "Instagram e Meta"), corto: igual("Meta"), icono: "meta", tipo: "herramienta",
        hace: t(
          "Las redes y la pauta de la marca, que llevan gente a la tienda y al WhatsApp.",
          "The brand's social media and ads, which bring people to the store and to WhatsApp.",
          "Social Media und Anzeigen der Marke, die Menschen in den Shop und zu WhatsApp bringen.",
          "As redes e a publicidade da marca, que levam pessoas à loja e ao WhatsApp."),
        con: [] },
      { id: "google", nombre: t("Google y ChatGPT", "Google and ChatGPT", "Google und ChatGPT", "Google e ChatGPT"), corto: igual("Google"), icono: "google", tipo: "herramienta",
        hace: t(
          "La tienda está preparada para que la encuentren cuando alguien busca lo que vende, en Google y en los asistentes de inteligencia artificial.",
          "The store is ready to be found when someone searches for what it sells, on Google and in AI assistants.",
          "Der Shop ist darauf vorbereitet, gefunden zu werden, wenn jemand sucht, was er verkauft: bei Google und in KI-Assistenten.",
          "A loja está preparada para ser encontrada quando alguém procura o que vende, no Google e nos assistentes de inteligência artificial."),
        con: [] },
      { id: "klaviyo", nombre: igual("Klaviyo"), icono: "klaviyo", tipo: "herramienta",
        hace: t(
          "Los correos a las clientas: la bienvenida, las piezas nuevas y la recompra.",
          "The emails to customers: the welcome, new pieces and repeat purchases.",
          "Die E-Mails an Kundinnen: Willkommen, neue Stücke und Wiederkauf.",
          "Os emails às clientes: as boas-vindas, as peças novas e a recompra."),
        con: ["base"] },
      { id: "base", nombre: t("Base de clientas", "Customer base", "Kundinnenbasis", "Base de clientes"), corto: t("Clientas", "Customers", "Kundinnen", "Clientes"), tipo: "herramienta",
        hace: t(
          "Las clientas de la tienda, del WhatsApp y del correo en un solo lugar, con lo que cada una ha comprado y preguntado.",
          "Customers from the store, WhatsApp and email in one place, with what each has bought and asked.",
          "Kundinnen aus Shop, WhatsApp und E-Mail an einem Ort, mit allem, was jede gekauft und gefragt hat.",
          "As clientes da loja, do WhatsApp e do email num só lugar, com o que cada uma comprou e perguntou."),
        con: ["shopify"] },
      { id: "portal", nombre: t("Portal del equipo", "Team portal", "Teamportal", "Portal da equipa"), corto: igual("Portal"), tipo: "herramienta",
        hace: t(
          "Donde el equipo carga las piezas nuevas, ve cada conversación de WhatsApp y toma las que necesitan una persona.",
          "Where the team uploads new pieces, sees every WhatsApp conversation and takes the ones that need a person.",
          "Wo das Team neue Stücke hochlädt, jedes WhatsApp-Gespräch sieht und die übernimmt, die einen Menschen brauchen.",
          "Onde a equipa carrega as peças novas, vê cada conversa de WhatsApp e assume as que precisam de uma pessoa."),
        con: ["whatsapp", "shopify"] },
    ],
  },
  galeria: {
    titulo: t("La tienda, el catálogo y el contenido.", "The store, the catalog and the content.", "Der Shop, der Katalog und der Content.", "A loja, o catálogo e o conteúdo."),
    items: [
      { src: `${M}/portada.webp`, forma: "web", posicion: "74% 28%", pie: t("La portada", "The homepage", "Die Startseite", "A página inicial"), alt: t("Portada de la tienda con Eleonora", "Store homepage with Eleonora", "Startseite des Shops mit Eleonora", "Página inicial da loja com Eleonora") },
      { src: `${M}/vitrina-movil.webp`, forma: "cel", pie: t("En el celular", "On mobile", "Auf dem Handy", "No telemóvel"), alt: t("La tienda en el celular", "The store on a phone", "Der Shop auf dem Handy", "A loja no telemóvel") },
      { src: `${M}/catalogo-movil.webp`, forma: "cel", pie: t("El catálogo", "The catalog", "Der Katalog", "O catálogo"), alt: t("El catálogo con filtros por línea", "The catalog with filters by line", "Der Katalog mit Filtern nach Linie", "O catálogo com filtros por linha") },
      { src: `${M}/look-chanel.webp`, forma: "alta", pie: t("Contenido", "Content", "Content", "Conteúdo"), alt: t("Look de chaqueta clara", "Look with a light jacket", "Look mit heller Jacke", "Look de casaco claro") },
      { src: `${M}/look-gucci.webp`, forma: "alta", pie: t("Contenido", "Content", "Content", "Conteúdo"), alt: t("Look estampado", "Printed look", "Gemusterter Look", "Look estampado") },
      { src: `${M}/vitrina-desktop.webp`, forma: "ancha", pie: t("En escritorio", "On desktop", "Auf dem Desktop", "No computador"), alt: t("La tienda en escritorio", "The store on desktop", "Der Shop auf dem Desktop", "A loja no computador") },
    ],
  },
  cambio: {
    titulo: t("Más atención, menos manos, un solo responsable.", "More attention, fewer hands, one owner.", "Mehr Aufmerksamkeit, weniger Hände, eine Verantwortung.", "Mais atenção, menos mãos, um só responsável."),
    items: [
      { cifra: "24/7", negrita: t("Alguien contesta en WhatsApp", "Someone answers on WhatsApp", "Jemand antwortet auf WhatsApp", "Alguém responde no WhatsApp"), texto: t(", también de madrugada.", ", even in the middle of the night.", ", auch mitten in der Nacht.", ", também de madrugada.") },
      { cifra: "4–5", negrita: t("Personas:", "People:", "Personen:", "Pessoas:"), texto: t(
        " el trabajo que hacía un equipo así, hoy lo hacen los agentes, y con más eficiencia.",
        " the work a team that size used to do is now done by the agents, and more efficiently.",
        " die Arbeit, die ein solches Team machte, erledigen heute die Agenten, und effizienter.",
        " o trabalho que uma equipa assim fazia é hoje feito pelos agentes, e com mais eficiência.") },
      { cifra: "1", negrita: t("Equipo", "Team", "Team", "Equipa"), texto: t(" responde por toda la operación.", " answers for the whole operation.", " verantwortet den ganzen Betrieb.", " responde por toda a operação.") },
    ],
  },
  cierre: {
    eyebrow: t("Tu marca", "Your brand", "Deine Marke", "A tua marca"),
    titulo: t("¿Te imaginas tu marca", "Can you picture your brand", "Kannst du dir deine Marke", "Imaginas a tua marca"),
    resaltado: t("funcionando así?", "working like this?", "so vorstellen?", "a funcionar assim?"),
    lede: t("Cuéntame qué vendes y te digo qué conectaría primero.", "Tell me what you sell and I'll tell you what I'd connect first.", "Erzähl mir, was du verkaufst, und ich sage dir, was ich zuerst verbinden würde.", "Conta-me o que vendes e digo-te o que ligaria primeiro."),
    enlace: { href: "/shopify", texto: t("Ver cómo funciona Studio →", "See how Studio works →", "So funktioniert Studio →", "Ver como funciona o Studio →") },
  },
  tarjeta: {
    etiqueta: t("Moda circular · tienda en línea", "Circular fashion · online store", "Zirkuläre Mode · Onlineshop", "Moda circular · loja online"),
    imagen: "/v2/portafolio/eleonora.jpg",
    imagenCel: "/v2/portafolio/eleonora-m.jpg",
  },
};
