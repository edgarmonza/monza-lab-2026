/* Caso Bavarian Econs · /work/bavarian-econs
 * Fuente: docs/internal/portada/prototipo/caso-bavarian-econs.html (28-sep-2026). */
import type { Caso, T } from "./tipos";

const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });
const B = "/v2/caso-bavarian-econs";

export const caso: Caso = {
  slug: "bavarian-econs",
  nombre: t("Bavarian Econs", "Bavarian Econs", "Bavarian Econs", "Bavarian Econs"),
  categoria: "venture",
  seo: {
    titulo: t(
      "Bavarian Econs: marca y web para BMW eléctricos | Monza Lab",
      "Bavarian Econs: brand and web for electric BMWs | Monza Lab",
      "Bavarian Econs: Marke und Web für Elektro-BMW | Monza Lab",
      "Bavarian Econs: marca e site para BMW elétricos | Monza Lab",
    ),
    descripcion: t(
      "Marca, web global, leads y contenido para BMW clásicos convertidos a eléctricos en Múnich. Construido por Monza Lab.",
      "Brand, global website, leads and content for classic BMWs converted to electric in Munich. Built by Monza Lab.",
      "Marke, globale Website, Leads und Content für klassische BMW, in München auf Elektro umgebaut. Gebaut von Monza Lab.",
      "Marca, site global, leads e conteúdo para BMW clássicos convertidos em elétricos em Munique. Construído pela Monza Lab.",
    ),
  },
  hero: {
    linea1: t("Bavarian", "Bavarian", "Bavarian", "Bavarian"),
    linea2: t("Econs", "Econs", "Econs", "Econs"),
    frase: t(
      "BMW clásicos convertidos en eléctricos a mano en Múnich, con una marca a la altura del carro.",
      "Classic BMWs converted to electric by hand in Munich, with a brand that lives up to the car.",
      "Klassische BMW, in München von Hand auf Elektro umgebaut, mit einer Marke, die dem Auto gerecht wird.",
      "BMW clássicos convertidos em elétricos à mão em Munique, com uma marca à altura do carro.",
    ),
    pastillas: [
      t("BMW clásicos eléctricos", "Electric classic BMWs", "Elektrische BMW-Klassiker", "BMW clássicos elétricos"),
      t("Atelier en Múnich", "Atelier in Munich", "Atelier in München", "Atelier em Munique"),
      t("Marca propia", "Our own brand", "Eigene Marke", "Marca própria"),
    ],
    enlace: {
      href: "https://bavarianecons.com",
      texto: t("Ver la marca ↗", "See the brand ↗", "Zur Marke ↗", "Ver a marca ↗"),
    },
    web: { barra: "bavarianecons.com", escritorio: `${B}/web-escritorio-larga.webp`, celular: `${B}/web-celular-larga.webp` },
    fantasma: "Econs",
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
        icono: "marca",
        nombre: t("Marca", "Brand", "Marke", "Marca"),
        texto: t(
          "El nombre, la identidad y el sistema visual de la marca.",
          "The brand's name, identity and visual system.",
          "Name, Identität und visuelles System der Marke.",
          "O nome, a identidade e o sistema visual da marca.",
        ),
      },
      {
        icono: "web",
        nombre: t("Website", "Website", "Website", "Website"),
        texto: t(
          "La web global en inglés, con los modelos, el atelier, la tecnología y la prensa.",
          "The global website in English, with the models, the atelier, the technology and the press.",
          "Die globale Website auf Englisch, mit den Modellen, dem Atelier, der Technik und der Presse.",
          "A web global em inglês, com os modelos, o atelier, a tecnologia e a imprensa.",
        ),
      },
      {
        icono: "crm",
        nombre: t("CRM", "CRM", "CRM", "CRM"),
        texto: t(
          "Cada consulta de la web llega como aviso y entra al CRM con quién es y en qué va.",
          "Every enquiry from the website arrives as an alert and goes into the CRM with who it is and where it stands.",
          "Jede Anfrage von der Website kommt als Benachrichtigung an und landet im CRM, mit wer es ist und wie der Stand ist.",
          "Cada pedido da web chega como alerta e entra no CRM com quem é e em que ponto está.",
        ),
      },
      {
        icono: "contenido",
        nombre: t("Contenido", "Content", "Content", "Conteúdo"),
        texto: t(
          "Textos, carruseles y fotos de los clásicos con IA, en la voz de la marca.",
          "Copy, carousels and AI photos of the classics, in the brand's voice.",
          "Texte, Karussells und KI-Fotos der Klassiker, in der Stimme der Marke.",
          "Textos, carrosséis e fotos dos clássicos com IA, na voz da marca.",
        ),
      },
      {
        icono: "pauta",
        nombre: t("Pauta", "Ads", "Werbung", "Anúncios"),
        texto: t(
          "La pauta en Meta, leída con datos antes de decidir qué escalar.",
          "Meta ads, read with data before deciding what to scale.",
          "Die Werbung auf Meta, mit Daten gelesen, bevor entschieden wird, was skaliert wird.",
          "Os anúncios na Meta, lidos com dados antes de decidir o que escalar.",
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
          "La marca, su sistema visual y la web.",
          "The brand, its visual system and the website.",
          "Die Marke, ihr visuelles System und die Website.",
          "A marca, o seu sistema visual e a web.",
        ),
      },
      {
        verbo: t("Construye", "Builds", "Baut", "Constrói"),
        texto: t(
          "La web global y el camino de cada consulta hasta el CRM.",
          "The global website and the path of every enquiry into the CRM.",
          "Die globale Website und den Weg jeder Anfrage bis ins CRM.",
          "A web global e o caminho de cada pedido até ao CRM.",
        ),
      },
      {
        verbo: t("Produce", "Produces", "Produziert", "Produz"),
        texto: t(
          "Los textos, los carruseles y las fotos de los clásicos, todas las semanas.",
          "The copy, the carousels and the photos of the classics, every week.",
          "Die Texte, die Karussells und die Fotos der Klassiker, jede Woche.",
          "Os textos, os carrosséis e as fotos dos clássicos, todas as semanas.",
        ),
      },
      {
        verbo: t("Opera", "Runs", "Betreibt", "Opera"),
        texto: t(
          "La pauta en Meta y el seguimiento de cada lead.",
          "The Meta ads and the follow-up on every lead.",
          "Die Werbung auf Meta und die Nachverfolgung jedes Leads.",
          "Os anúncios na Meta e o acompanhamento de cada lead.",
        ),
      },
      {
        verbo: t("Mide", "Measures", "Misst", "Mede"),
        texto: t(
          "Qué pauta funciona y quién lleva un día o más esperando respuesta.",
          "Which ads work and who has been waiting a day or more for an answer.",
          "Welche Werbung funktioniert und wer seit einem Tag oder länger auf eine Antwort wartet.",
          "Que anúncios funcionam e quem está há um dia ou mais à espera de resposta.",
        ),
      },
    ],
  },
  reto: {
    titulo: t(
      "Una marca de lujo en un mercado que nadie había tocado.",
      "A luxury brand in a market nobody had touched.",
      "Eine Luxusmarke in einem Markt, den noch niemand angefasst hatte.",
      "Uma marca de luxo num mercado em que ninguém tinha tocado.",
    ),
    items: [
      {
        titulo: t("Un producto sin categoría.", "A product with no category.", "Ein Produkt ohne Kategorie.", "Um produto sem categoria."),
        texto: t(
          "Un BMW clásico eléctrico, hecho a mano, no se parece a nada que el comprador ya conozca. Había que explicarlo sin que perdiera el lujo.",
          "A handmade electric classic BMW is not like anything the buyer already knows. It had to be explained without losing the luxury.",
          "Ein handgefertigter elektrischer BMW-Klassiker ähnelt nichts, was der Käufer schon kennt. Er musste erklärt werden, ohne den Luxus zu verlieren.",
          "Um BMW clássico elétrico, feito à mão, não se parece com nada que o comprador já conheça. Era preciso explicá-lo sem perder o luxo.",
        ),
      },
      {
        titulo: t("Coleccionistas lejos.", "Collectors far away.", "Sammler in der Ferne.", "Colecionadores longe."),
        texto: t(
          "El atelier está en Múnich y los compradores, en Europa y Estados Unidos. La venta empieza sin que nadie se vea.",
          "The atelier is in Munich and the buyers are in Europe and the United States. The sale starts without anyone meeting.",
          "Das Atelier ist in München, die Käufer sind in Europa und den USA. Der Verkauf beginnt, ohne dass man sich sieht.",
          "O atelier fica em Munique e os compradores, na Europa e nos Estados Unidos. A venda começa sem que ninguém se veja.",
        ),
      },
      {
        titulo: t("Cada consulta vale mucho.", "Every enquiry is worth a lot.", "Jede Anfrage ist viel wert.", "Cada pedido vale muito."),
        texto: t(
          "Detrás de un mensaje puede haber un carro. Ninguno se puede quedar en un buzón sin respuesta.",
          "Behind a single message there may be a car. None of them can sit unanswered in an inbox.",
          "Hinter einer Nachricht kann ein Auto stehen. Keine darf unbeantwortet im Postfach liegen bleiben.",
          "Por trás de uma mensagem pode estar um carro. Nenhuma pode ficar numa caixa de entrada sem resposta.",
        ),
      },
    ],
  },
  piezas: {
    titulo: t("Cinco piezas, una sola marca.", "Five pieces, one brand.", "Fünf Teile, eine Marke.", "Cinco peças, uma só marca."),
    lede: t(
      "Cada pieza sirve sola, y conectadas se hablan entre sí. Toca cualquiera para ver qué hace y qué le resuelve al negocio.",
      "Each piece works on its own, and connected they talk to each other. Tap any of them to see what it does and what it solves for the business.",
      "Jedes Teil funktioniert allein, und verbunden sprechen sie miteinander. Tippe auf eines, um zu sehen, was es macht und was es dem Geschäft löst.",
      "Cada peça funciona sozinha, e ligadas falam entre si. Toca em qualquer uma para ver o que faz e o que resolve ao negócio.",
    ),
    centro: t("Una sola marca", "One brand", "Eine Marke", "Uma só marca"),
    centroSub: t("todo conectado", "all connected", "alles verbunden", "tudo ligado"),
    items: [
      {
        pestana: t("Marca", "Brand", "Marke", "Marca"),
        clave: t("01 · Marca", "01 · Brand", "01 · Marke", "01 · Marca"),
        titulo: t(
          "Una marca de lujo para un carro que no tenía categoría.",
          "A luxury brand for a car that had no category.",
          "Eine Luxusmarke für ein Auto, das keine Kategorie hatte.",
          "Uma marca de luxo para um carro que não tinha categoria.",
        ),
        texto: t(
          "Nombre, identidad y sistema visual: negro, un solo acento de color y una idea que lo resume todo, German Engineering. Latin Soul.",
          "Name, identity and visual system: black, a single accent color and one idea that sums it all up, German Engineering. Latin Soul.",
          "Name, Identität und visuelles System: Schwarz, ein einziger Farbakzent und eine Idee, die alles zusammenfasst, German Engineering. Latin Soul.",
          "Nome, identidade e sistema visual: preto, um só acento de cor e uma ideia que resume tudo, German Engineering. Latin Soul.",
        ),
        resuelve: t(
          "Se siente de lujo desde el primer segundo, en Europa y en Estados Unidos.",
          "It feels like luxury from the first second, in Europe and in the United States.",
          "Es wirkt vom ersten Moment an luxuriös, in Europa und in den USA.",
          "Sente-se o luxo desde o primeiro segundo, na Europa e nos Estados Unidos.",
        ),
        visual: {
          tipo: "cubre",
          src: `${B}/costa.webp`,
          posicion: "50% 60%",
          alt: t(
            "Un BMW 2002 amarillo de Bavarian Econs frente al mar",
            "A yellow Bavarian Econs BMW 2002 by the sea",
            "Ein gelber BMW 2002 von Bavarian Econs am Meer",
            "Um BMW 2002 amarelo da Bavarian Econs junto ao mar",
          ),
        },
      },
      {
        pestana: t("Web", "Web", "Web", "Web"),
        clave: t("02 · Web global", "02 · Global website", "02 · Globale Website", "02 · Web global"),
        titulo: t(
          "Una web para coleccionistas de cualquier país.",
          "A website for collectors from any country.",
          "Eine Website für Sammler aus jedem Land.",
          "Uma web para colecionadores de qualquer país.",
        ),
        texto: t(
          "En inglés, con los modelos, el atelier, la tecnología y la prensa. El coleccionista entiende el carro y deja su consulta sin necesidad de una llamada.",
          "In English, with the models, the atelier, the technology and the press. The collector understands the car and leaves an enquiry without needing a call.",
          "Auf Englisch, mit den Modellen, dem Atelier, der Technik und der Presse. Der Sammler versteht das Auto und hinterlässt seine Anfrage, ohne anrufen zu müssen.",
          "Em inglês, com os modelos, o atelier, a tecnologia e a imprensa. O colecionador entende o carro e deixa o seu pedido sem precisar de uma chamada.",
        ),
        resuelve: t(
          "La venta empieza aunque el comprador esté a un océano de distancia.",
          "The sale starts even when the buyer is an ocean away.",
          "Der Verkauf beginnt, auch wenn der Käufer einen Ozean entfernt ist.",
          "A venda começa mesmo que o comprador esteja a um oceano de distância.",
        ),
        visual: {
          tipo: "cubre",
          src: `${B}/modelos-desktop.webp`,
          alt: t(
            "La página de modelos de la web de Bavarian Econs",
            "The models page of the Bavarian Econs website",
            "Die Modellseite der Website von Bavarian Econs",
            "A página de modelos da web da Bavarian Econs",
          ),
        },
      },
      {
        pestana: t("Leads", "Leads", "Leads", "Leads"),
        clave: t("03 · Leads y CRM", "03 · Leads and CRM", "03 · Leads und CRM", "03 · Leads e CRM"),
        titulo: t("Cada consulta tiene dueño.", "Every enquiry has an owner.", "Jede Anfrage hat einen Verantwortlichen.", "Cada pedido tem dono."),
        texto: t(
          "La consulta de la web llega como aviso al instante y entra al CRM con quién es, qué quiere y en qué va. Una vista muestra quién lleva un día o más esperando respuesta.",
          "The website enquiry arrives instantly as an alert and goes into the CRM with who it is, what they want and where it stands. One view shows who has been waiting a day or more for an answer.",
          "Die Anfrage von der Website kommt sofort als Benachrichtigung an und landet im CRM, mit wer es ist, was die Person will und wie der Stand ist. Eine Ansicht zeigt, wer seit einem Tag oder länger auf eine Antwort wartet.",
          "O pedido da web chega na hora como alerta e entra no CRM com quem é, o que quer e em que ponto está. Uma vista mostra quem está há um dia ou mais à espera de resposta.",
        ),
        resuelve: t(
          "Un lead que puede valer un carro no se pierde en un buzón.",
          "A lead that could be worth a car does not get lost in an inbox.",
          "Ein Lead, der ein Auto wert sein kann, geht nicht im Postfach verloren.",
          "Um lead que pode valer um carro não se perde numa caixa de entrada.",
        ),
        visual: {
          tipo: "cubre",
          src: `${B}/formulario.webp`,
          alt: t(
            "El formulario de contacto de la web",
            "The website's contact form",
            "Das Kontaktformular der Website",
            "O formulário de contacto da web",
          ),
        },
      },
      {
        pestana: t("Contenido", "Content", "Content", "Conteúdo"),
        clave: t("04 · Contenido y pauta", "04 · Content and ads", "04 · Content und Werbung", "04 · Conteúdo e anúncios"),
        titulo: t(
          "La voz de la marca, todas las semanas.",
          "The brand's voice, every week.",
          "Die Stimme der Marke, jede Woche.",
          "A voz da marca, todas as semanas.",
        ),
        texto: t(
          "El calendario, los textos y los carruseles para Instagram y LinkedIn salen de un sistema que conoce la voz de la marca. La pauta en Meta se lee con datos antes de decidir qué escalar.",
          "The calendar, the copy and the carousels for Instagram and LinkedIn come from a system that knows the brand's voice. Meta ads are read with data before deciding what to scale.",
          "Der Kalender, die Texte und die Karussells für Instagram und LinkedIn kommen aus einem System, das die Stimme der Marke kennt. Die Werbung auf Meta wird mit Daten gelesen, bevor entschieden wird, was skaliert wird.",
          "O calendário, os textos e os carrosséis para o Instagram e o LinkedIn saem de um sistema que conhece a voz da marca. Os anúncios na Meta são lidos com dados antes de decidir o que escalar.",
        ),
        resuelve: t(
          "La marca publica con constancia y el presupuesto de pauta va a lo que funciona.",
          "The brand posts consistently and the ad budget goes to what works.",
          "Die Marke postet regelmäßig, und das Werbebudget geht in das, was funktioniert.",
          "A marca publica com constância e o orçamento de anúncios vai para o que funciona.",
        ),
        visual: {
          tipo: "par",
          atras: `${B}/insignia.webp`,
          frente: `${B}/welt.webp`,
          alt: t(
            "Un BMW 2002 eléctrico cargando frente a la torre de BMW en Múnich",
            "An electric BMW 2002 charging in front of the BMW tower in Munich",
            "Ein elektrischer BMW 2002 lädt vor dem BMW-Turm in München",
            "Um BMW 2002 elétrico a carregar em frente à torre da BMW em Munique",
          ),
        },
      },
      {
        pestana: t("Fotos", "Photos", "Fotos", "Fotos"),
        clave: t("05 · Fotos con IA", "05 · AI photos", "05 · KI-Fotos", "05 · Fotos com IA"),
        titulo: t(
          "Fotos editoriales sin cambiar un detalle del carro.",
          "Editorial photos without changing a single detail of the car.",
          "Editorial-Fotos, ohne ein Detail des Autos zu verändern.",
          "Fotos editoriais sem mudar um detalhe do carro.",
        ),
        texto: t(
          "Fotos de los clásicos para campañas, hechas con inteligencia artificial a partir de fotos reales del carro, para que ningún detalle cambie.",
          "Campaign photos of the classics, made with artificial intelligence from real photos of the car, so that no detail changes.",
          "Kampagnenfotos der Klassiker, mit künstlicher Intelligenz aus echten Fotos des Autos erstellt, damit sich kein Detail verändert.",
          "Fotos dos clássicos para campanhas, feitas com inteligência artificial a partir de fotos reais do carro, para que nenhum detalhe mude.",
        ),
        resuelve: t(
          "La marca tiene imágenes nuevas sin montar una sesión de fotos cada vez.",
          "The brand gets new images without setting up a photo shoot every time.",
          "Die Marke bekommt neue Bilder, ohne jedes Mal ein Fotoshooting zu organisieren.",
          "A marca tem imagens novas sem montar uma sessão de fotos de cada vez.",
        ),
        visual: {
          tipo: "cubre",
          src: `${B}/welt-panel.webp`,
          alt: t(
            "Un BMW 2002 eléctrico cargando frente a la torre de BMW en Múnich",
            "An electric BMW 2002 charging in front of the BMW tower in Munich",
            "Ein elektrischer BMW 2002 lädt vor dem BMW-Turm in München",
            "Um BMW 2002 elétrico a carregar em frente à torre da BMW em Munique",
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
    centro: {
      titulo: t("Bavarian Econs", "Bavarian Econs", "Bavarian Econs", "Bavarian Econs"),
      sub: t("marca y ventas", "brand and sales", "Marke und Verkauf", "marca e vendas"),
    },
    nodos: [
      {
        id: "contenido",
        nombre: t("Contenido con IA", "AI content", "KI-Content", "Conteúdo com IA"),
        corto: t("Contenido", "Content", "Content", "Conteúdo"),
        tipo: "ia",
        hace: t(
          "El calendario, los textos y los carruseles salen de un sistema que conoce la voz de la marca y sus reglas. Una persona revisa antes de publicar.",
          "The calendar, the copy and the carousels come from a system that knows the brand's voice and its rules. A person reviews before anything is posted.",
          "Der Kalender, die Texte und die Karussells kommen aus einem System, das die Stimme der Marke und ihre Regeln kennt. Ein Mensch prüft vor dem Posten.",
          "O calendário, os textos e os carrosséis saem de um sistema que conhece a voz da marca e as suas regras. Uma pessoa revê antes de publicar.",
        ),
        con: ["instagram", "linkedin"],
      },
      {
        id: "fotos",
        nombre: t("Fotos con IA", "AI photos", "KI-Fotos", "Fotos com IA"),
        corto: t("Fotos", "Photos", "Fotos", "Fotos"),
        tipo: "ia",
        hace: t(
          "Fotos editoriales de los clásicos para campañas, partiendo de fotos reales del carro para que no cambie ni un detalle.",
          "Editorial campaign photos of the classics, starting from real photos of the car so not a single detail changes.",
          "Editorial-Fotos der Klassiker für Kampagnen, ausgehend von echten Fotos des Autos, damit sich kein Detail verändert.",
          "Fotos editoriais dos clássicos para campanhas, a partir de fotos reais do carro para que não mude nem um detalhe.",
        ),
        con: ["instagram", "web"],
        img: `${B}/welt-panel.webp`,
      },
      {
        id: "pauta",
        nombre: t("Lectura de la pauta", "Reading the ads", "Werbung auswerten", "Leitura dos anúncios"),
        corto: t("Pauta", "Ads", "Werbung", "Anúncios"),
        tipo: "ia",
        hace: t(
          "Lee los resultados de la pauta en Meta y recomienda qué seguir, qué pausar y qué escalar. La decisión final la toma una persona.",
          "Reads the Meta ad results and recommends what to keep, what to pause and what to scale. A person makes the final call.",
          "Liest die Ergebnisse der Werbung auf Meta und empfiehlt, was weiterläuft, was pausiert und was skaliert wird. Die letzte Entscheidung trifft ein Mensch.",
          "Lê os resultados dos anúncios na Meta e recomenda o que manter, o que pausar e o que escalar. A decisão final é de uma pessoa.",
        ),
        con: ["meta"],
      },
      {
        id: "web",
        nombre: t("Web de la marca", "Brand website", "Website der Marke", "Web da marca"),
        corto: t("Web", "Web", "Web", "Web"),
        icono: "vercel",
        tipo: "herramienta",
        hace: t(
          "La web global en inglés, con los modelos, el atelier, la tecnología y la prensa. Es la puerta para coleccionistas de cualquier país.",
          "The global website in English, with the models, the atelier, the technology and the press. It is the door for collectors from any country.",
          "Die globale Website auf Englisch, mit den Modellen, dem Atelier, der Technik und der Presse. Die Tür für Sammler aus jedem Land.",
          "A web global em inglês, com os modelos, o atelier, a tecnologia e a imprensa. É a porta para colecionadores de qualquer país.",
        ),
        con: ["avisos", "google"],
        img: `${B}/modelos-desktop.webp`,
      },
      {
        id: "avisos",
        nombre: t("Avisos por correo", "Email alerts", "E-Mail-Benachrichtigungen", "Alertas por email"),
        corto: t("Avisos", "Alerts", "Alerts", "Alertas"),
        icono: "gmail",
        tipo: "herramienta",
        hace: t(
          "Cada consulta de la web llega al instante como aviso por correo, con los datos de quien escribe.",
          "Every website enquiry arrives instantly as an email alert, with the details of whoever wrote.",
          "Jede Anfrage von der Website kommt sofort als E-Mail-Benachrichtigung an, mit den Daten der Person, die schreibt.",
          "Cada pedido da web chega na hora como alerta por email, com os dados de quem escreve.",
        ),
        con: ["notion"],
        img: `${B}/formulario.webp`,
      },
      {
        id: "notion",
        nombre: t("CRM en Notion", "CRM in Notion", "CRM in Notion", "CRM no Notion"),
        corto: t("CRM", "CRM", "CRM", "CRM"),
        icono: "notion",
        tipo: "herramienta",
        hace: t(
          "Cada lead tiene su fila: quién es, qué quiere, en qué va y quién le responde. Una vista muestra a quien lleva un día o más esperando.",
          "Every lead has its row: who they are, what they want, where it stands and who is answering. One view shows who has been waiting a day or more.",
          "Jeder Lead hat seine Zeile: wer es ist, was die Person will, wie der Stand ist und wer antwortet. Eine Ansicht zeigt, wer seit einem Tag oder länger wartet.",
          "Cada lead tem a sua linha: quem é, o que quer, em que ponto está e quem lhe responde. Uma vista mostra quem está há um dia ou mais à espera.",
        ),
        con: [],
      },
      {
        id: "meta",
        nombre: t("Pauta en Meta", "Meta ads", "Werbung auf Meta", "Anúncios na Meta"),
        corto: t("Meta", "Meta", "Meta", "Meta"),
        icono: "meta",
        tipo: "herramienta",
        hace: t(
          "La pauta que lleva coleccionistas de Europa y Estados Unidos a la web.",
          "The ads that bring collectors from Europe and the United States to the website.",
          "Die Werbung, die Sammler aus Europa und den USA auf die Website bringt.",
          "Os anúncios que levam colecionadores da Europa e dos Estados Unidos à web.",
        ),
        con: ["web"],
      },
      {
        id: "instagram",
        nombre: t("Instagram", "Instagram", "Instagram", "Instagram"),
        icono: "instagram",
        tipo: "herramienta",
        hace: t(
          "Donde vive la marca todos los días: el carro, el atelier y la historia.",
          "Where the brand lives every day: the car, the atelier and the story.",
          "Wo die Marke jeden Tag lebt: das Auto, das Atelier und die Geschichte.",
          "Onde a marca vive todos os dias: o carro, o atelier e a história.",
        ),
        con: ["web"],
      },
      {
        id: "linkedin",
        nombre: t("LinkedIn", "LinkedIn", "LinkedIn", "LinkedIn"),
        icono: "linkedin",
        tipo: "herramienta",
        hace: t(
          "Los posts técnicos y de industria, para el mundo del automóvil.",
          "The technical and industry posts, for the automotive world.",
          "Die technischen und Branchen-Posts, für die Autowelt.",
          "Os posts técnicos e de indústria, para o mundo automóvel.",
        ),
        con: [],
      },
      {
        id: "google",
        nombre: t("Google", "Google", "Google", "Google"),
        icono: "google",
        tipo: "herramienta",
        hace: t(
          "La web está preparada para aparecer cuando alguien busca un BMW clásico eléctrico.",
          "The website is ready to show up when someone searches for an electric classic BMW.",
          "Die Website ist so vorbereitet, dass sie erscheint, wenn jemand nach einem elektrischen BMW-Klassiker sucht.",
          "A web está preparada para aparecer quando alguém procura um BMW clássico elétrico.",
        ),
        con: [],
      },
    ],
  },
  galeria: {
    titulo: t("La marca, la web y el carro.", "The brand, the website and the car.", "Die Marke, die Website und das Auto.", "A marca, a web e o carro."),
    items: [
      {
        src: `${B}/motor.webp`,
        pie: t("La tecnología", "The technology", "Die Technik", "A tecnologia"),
        alt: t(
          "El motor eléctrico de un BMW 2002, con la batería y la insignia de BMW",
          "The electric motor of a BMW 2002, with the battery and the BMW badge",
          "Der Elektromotor eines BMW 2002, mit der Batterie und dem BMW-Emblem",
          "O motor elétrico de um BMW 2002, com a bateria e o emblema da BMW",
        ),
        forma: "ancha",
      },
      {
        src: `${B}/modelos-movil.webp`,
        pie: t("En el celular", "On the phone", "Auf dem Handy", "No telemóvel"),
        alt: t("Los modelos en el celular", "The models on a phone", "Die Modelle auf dem Handy", "Os modelos no telemóvel"),
        forma: "alta",
      },
      {
        src: `${B}/insignia.webp`,
        pie: t("El detalle", "The detail", "Das Detail", "O detalhe"),
        alt: t("Detalle de la cola de un BMW 2002", "Detail of the rear of a BMW 2002", "Detail des Hecks eines BMW 2002", "Detalhe da traseira de um BMW 2002"),
        forma: "alta",
      },
      {
        src: `${B}/interior.webp`,
        pie: t("El interior", "The interior", "Der Innenraum", "O interior"),
        alt: t("Interior de cuero de un BMW 2002", "Leather interior of a BMW 2002", "Lederinnenraum eines BMW 2002", "Interior em pele de um BMW 2002"),
        forma: "alta",
      },
      {
        src: `${B}/welt.webp`,
        pie: t("Múnich", "Munich", "München", "Munique"),
        alt: t(
          "Un BMW 2002 eléctrico cargando en Múnich",
          "An electric BMW 2002 charging in Munich",
          "Ein elektrischer BMW 2002 lädt in München",
          "Um BMW 2002 elétrico a carregar em Munique",
        ),
        forma: "alta",
      },
      {
        src: `${B}/costa.webp`,
        pie: t("El 2002te", "The 2002te", "Der 2002te", "O 2002te"),
        alt: t(
          "Un BMW 2002 amarillo frente al mar",
          "A yellow BMW 2002 by the sea",
          "Ein gelber BMW 2002 am Meer",
          "Um BMW 2002 amarelo junto ao mar",
        ),
        forma: "ancha",
      },
    ],
  },
  cambio: {
    titulo: t(
      "De una idea a una marca que la prensa encontró.",
      "From an idea to a brand the press found.",
      "Von einer Idee zu einer Marke, die die Presse entdeckt hat.",
      "De uma ideia a uma marca que a imprensa encontrou.",
    ),
    items: [
      {
        cifra: "0→1",
        negrita: t("De idea a marca", "From idea to brand", "Von der Idee zur Marke", "De ideia a marca"),
        texto: t(
          "de lujo, con coleccionistas en Europa y Estados Unidos.",
          "of luxury, with collectors in Europe and the United States.",
          "im Luxussegment, mit Sammlern in Europa und den USA.",
          "de luxo, com colecionadores na Europa e nos Estados Unidos.",
        ),
      },
      {
        cifra: "2",
        negrita: t("Medios", "Outlets", "Medien", "Meios"),
        texto: t(
          "escribieron de ella: Forbes Colombia y MotorTrend.",
          "wrote about it: Forbes Colombia and MotorTrend.",
          "haben über sie geschrieben: Forbes Colombia und MotorTrend.",
          "escreveram sobre ela: Forbes Colombia e MotorTrend.",
        ),
      },
      {
        cifra: "1",
        negrita: t("Un solo lugar", "One single place", "Ein einziger Ort", "Um só lugar"),
        texto: t(
          "donde vive cada lead, de la web al CRM.",
          "where every lead lives, from the website to the CRM.",
          "an dem jeder Lead lebt, von der Website bis ins CRM.",
          "onde vive cada lead, da web ao CRM.",
        ),
      },
    ],
  },
  cierre: {
    titulo: t("¿Te imaginas tu marca", "Can you picture your brand", "Kannst du dir deine Marke", "Imaginas a tua marca"),
    resaltado: t("contada así?", "told like this?", "so erzählt vorstellen?", "contada assim?"),
    lede: t(
      "Cuéntame qué construyes y te digo qué armaría primero.",
      "Tell me what you are building and I will tell you what I would set up first.",
      "Erzähl mir, was du baust, und ich sage dir, was ich zuerst aufsetzen würde.",
      "Conta-me o que estás a construir e eu digo-te o que montaria primeiro.",
    ),
    enlace: { href: "/shopify", texto: t("Ver cómo funciona Studio →", "See how Studio works →", "So funktioniert Studio →", "Ver como funciona o Studio →") },
  },
  tarjeta: {
    etiqueta: t(
      "BMW clásicos eléctricos · marca propia",
      "Electric classic BMWs · our own brand",
      "Elektrische BMW-Klassiker · eigene Marke",
      "BMW clássicos elétricos · marca própria",
    ),
    imagen: "/v2/portafolio/bavarian.jpg",
    imagenCel: "/v2/portafolio/bavarian-m.jpg",
  },
};
