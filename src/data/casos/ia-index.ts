/* Caso · Monza Index (producto propio). Sale de docs/internal/portada/prototipo/caso-monza-index.html.
 * Solo nombra lo que ya está en la web pública del índice (monzaindex.ai). */
import type { Caso, T } from "./tipos";

const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });
const igual = (s: string): T => ({ es: s, en: s, de: s, pt: s });
const M = "/v2/caso-monza-index";

export const caso: Caso = {
  slug: "ia-index",
  nombre: igual("Monza Index"),
  categoria: "venture",
  seo: {
    titulo: t(
      "Monza Index: cuánto se usa la IA en Colombia | Monza Lab",
      "Monza Index: how much AI Colombia really uses | Monza Lab",
      "Monza Index: wie viel KI Kolumbien nutzt | Monza Lab",
      "Monza Index: quanto se usa a IA na Colômbia | Monza Lab",
    ),
    descripcion: t(
      "Un índice de 0 a 100 que mide la adopción de inteligencia artificial en Colombia con datos públicos y una encuesta con IA. Hecho por Monza Lab.",
      "A 0 to 100 index measuring artificial intelligence adoption in Colombia with public data and an AI-led survey. Built by Monza Lab.",
      "Ein Index von 0 bis 100, der die Nutzung künstlicher Intelligenz in Kolumbien misst, mit öffentlichen Daten und einer KI-Umfrage. Von Monza Lab.",
      "Um índice de 0 a 100 que mede a adoção de inteligência artificial na Colômbia com dados públicos e um inquérito com IA. Feito pela Monza Lab.",
    ),
  },
  hero: {
    linea1: igual("Monza"),
    linea2: igual("Index"),
    frase: t(
      "Un índice que mide cuánto se usa de verdad la inteligencia artificial en Colombia, con datos que cualquiera puede revisar.",
      "An index that measures how much artificial intelligence is really used in Colombia, with data anyone can check.",
      "Ein Index, der misst, wie viel künstliche Intelligenz in Kolumbien wirklich genutzt wird, mit Daten, die jeder prüfen kann.",
      "Um índice que mede quanto se usa de verdade a inteligência artificial na Colômbia, com dados que qualquer pessoa pode rever.",
    ),
    pastillas: [
      t("Producto propio", "Our own product", "Eigenes Produkt", "Produto próprio"),
      t("Inteligencia de mercado", "Market intelligence", "Marktintelligenz", "Inteligência de mercado"),
      t("Colombia", "Colombia", "Kolumbien", "Colômbia"),
    ],
    enlace: { href: "https://monzaindex.ai", texto: t("Ver el índice ↗", "See the index ↗", "Zum Index ↗", "Ver o índice ↗") },
    web: { barra: "monzaindex.ai", escritorio: `${M}/web-escritorio-larga.webp`, celular: `${M}/web-celular-larga.webp` },
    fantasma: "Index",
  },
  producimos: {
    titulo: t("Seis cosas, un solo índice.", "Six things, one index.", "Sechs Dinge, ein einziger Index.", "Seis coisas, um só índice."),
    items: [
      {
        icono: "marca",
        nombre: t("Índice", "Index", "Index", "Índice"),
        texto: t(
          "Un score de 0 a 100 en cinco pilares, con pesos, anclas y fuentes publicados.",
          "A 0 to 100 score across five pillars, with published weights, anchors and sources.",
          "Ein Score von 0 bis 100 in fünf Säulen, mit veröffentlichten Gewichten, Ankern und Quellen.",
          "Um score de 0 a 100 em cinco pilares, com pesos, âncoras e fontes publicados.",
        ),
      },
      {
        icono: "datos",
        nombre: t("Lectura de datos", "Data reading", "Datenerfassung", "Leitura de dados"),
        texto: t(
          "Un sistema que lee portales de empleo, búsquedas y datos abiertos, y los ordena por pilar.",
          "A system that reads job boards, searches and open data, and sorts them by pillar.",
          "Ein System, das Jobportale, Suchanfragen und offene Daten liest und nach Säulen ordnet.",
          "Um sistema que lê portais de emprego, pesquisas e dados abertos, e os organiza por pilar.",
        ),
      },
      {
        icono: "web",
        nombre: t("Website", "Website", "Website", "Website"),
        texto: t(
          "La web del índice, con un explorador de talento, herramientas, startups y contexto.",
          "The index website, with an explorer for talent, tools, startups and context.",
          "Die Website des Index, mit einem Explorer für Talente, Tools, Start-ups und Kontext.",
          "O site do índice, com um explorador de talento, ferramentas, startups e contexto.",
        ),
      },
      {
        icono: "agente",
        nombre: t("Encuesta con IA", "AI-led survey", "Umfrage mit KI", "Inquérito com IA"),
        texto: t(
          "Un entrevistador de inteligencia artificial que conduce la encuesta a empresas.",
          "An artificial intelligence interviewer that runs the company survey.",
          "Ein KI-Interviewer, der die Umfrage mit den Unternehmen führt.",
          "Um entrevistador de inteligência artificial que conduz o inquérito às empresas.",
        ),
      },
      {
        icono: "plataforma",
        nombre: t("Espacios para aliados", "Partner spaces", "Bereiche für Partner", "Espaços para parceiros"),
        texto: t(
          "Un espacio privado por aliado, con un asistente que responde sobre sus datos.",
          "A private space for each partner, with an assistant that answers questions about its data.",
          "Ein privater Bereich pro Partner, mit einem Assistenten, der Fragen zu seinen Daten beantwortet.",
          "Um espaço privado por parceiro, com um assistente que responde sobre os seus dados.",
        ),
      },
      {
        icono: "tablero",
        nombre: t("Reportes", "Reports", "Berichte", "Relatórios"),
        texto: t(
          "Reportes trimestrales para decidir con datos.",
          "Quarterly reports to decide with data.",
          "Quartalsberichte, um mit Daten zu entscheiden.",
          "Relatórios trimestrais para decidir com dados.",
        ),
      },
    ],
  },
  hace: {
    titulo: t("Lo construimos de principio a fin.", "We built it from start to finish.", "Wir haben es von Anfang bis Ende gebaut.", "Construímo-lo do princípio ao fim."),
    items: [
      {
        verbo: t("Diseña", "Designs", "Gestaltet", "Desenha"),
        texto: t(
          "El producto: el índice, la metodología y cómo se ve en pantalla.",
          "The product: the index, the methodology and how it looks on screen.",
          "Das Produkt: den Index, die Methodik und wie alles auf dem Bildschirm aussieht.",
          "O produto: o índice, a metodologia e como se vê no ecrã.",
        ),
      },
      {
        verbo: t("Construye", "Builds", "Baut", "Constrói"),
        texto: t(
          "La web, el explorador y los espacios de los aliados.",
          "The website, the explorer and the partner spaces.",
          "Die Website, den Explorer und die Bereiche für Partner.",
          "O site, o explorador e os espaços dos parceiros.",
        ),
      },
      {
        verbo: t("Calcula", "Calculates", "Berechnet", "Calcula"),
        texto: t(
          "La lectura de las fuentes y el score de cada pilar.",
          "The reading of the sources and the score of each pillar.",
          "Die Auswertung der Quellen und den Score jeder Säule.",
          "A leitura das fontes e o score de cada pilar.",
        ),
      },
      {
        verbo: t("Conversa", "Talks", "Spricht", "Conversa"),
        texto: t(
          "Con cada empresa, por medio de un entrevistador de IA, y con cada aliado, por medio de su asistente.",
          "With each company, through an AI interviewer, and with each partner, through its assistant.",
          "Mit jedem Unternehmen über einen KI-Interviewer und mit jedem Partner über seinen Assistenten.",
          "Com cada empresa, através de um entrevistador de IA, e com cada parceiro, através do seu assistente.",
        ),
      },
    ],
  },
  reto: {
    titulo: t(
      "Todos hablan de inteligencia artificial. Casi nadie la mide.",
      "Everyone talks about artificial intelligence. Almost no one measures it.",
      "Alle reden über künstliche Intelligenz. Kaum jemand misst sie.",
      "Todos falam de inteligência artificial. Quase ninguém a mede.",
    ),
    items: [
      {
        titulo: t("Faltaba un número.", "A number was missing.", "Es fehlte eine Zahl.", "Faltava um número."),
        texto: t(
          "La conversación sobre IA estaba llena de opiniones y encuestas sueltas; faltaba un indicador que se pudiera seguir en el tiempo.",
          "The conversation about AI was full of opinions and one-off surveys; what was missing was an indicator you could follow over time.",
          "Die Debatte über KI war voller Meinungen und einzelner Umfragen; es fehlte ein Indikator, den man über die Zeit verfolgen kann.",
          "A conversa sobre IA estava cheia de opiniões e inquéritos soltos; faltava um indicador que se pudesse acompanhar ao longo do tempo.",
        ),
      },
      {
        titulo: t("Los datos estaban regados.", "The data was scattered.", "Die Daten waren verstreut.", "Os dados estavam dispersos."),
        texto: t(
          "Ofertas de empleo, búsquedas, registros de empresas y cifras de la economía vivían en fuentes distintas y nadie las cruzaba.",
          "Job offers, searches, company registries and economic figures lived in different sources, and no one was cross-checking them.",
          "Stellenangebote, Suchanfragen, Unternehmensregister und Wirtschaftszahlen lagen in verschiedenen Quellen, und niemand führte sie zusammen.",
          "Ofertas de emprego, pesquisas, registos de empresas e números da economia viviam em fontes diferentes e ninguém os cruzava.",
        ),
      },
      {
        titulo: t("Tenía que ser auditable.", "It had to be auditable.", "Es musste nachprüfbar sein.", "Tinha de ser auditável."),
        texto: t(
          "Un índice que va a citarse en empresas y gremios necesita la fórmula a la vista, no una caja negra.",
          "An index that companies and industry groups will quote needs its formula in plain sight, not a black box.",
          "Ein Index, den Unternehmen und Verbände zitieren werden, braucht eine offene Formel, keine Blackbox.",
          "Um índice que vai ser citado por empresas e associações precisa da fórmula à vista, não de uma caixa negra.",
        ),
      },
    ],
  },
  piezas: {
    titulo: t("Seis piezas, un solo índice.", "Six pieces, one index.", "Sechs Bausteine, ein einziger Index.", "Seis peças, um só índice."),
    lede: t(
      "Del dato público al score, y del score a la conversación con cada empresa. Toca cualquiera para ver qué hace y qué resuelve.",
      "From public data to the score, and from the score to the conversation with each company. Tap any piece to see what it does and what it solves.",
      "Von öffentlichen Daten zum Score und vom Score zum Gespräch mit jedem Unternehmen. Tippe auf einen Baustein, um zu sehen, was er tut und was er löst.",
      "Do dado público ao score, e do score à conversa com cada empresa. Toca em qualquer peça para ver o que faz e o que resolve.",
    ),
    centro: igual("Monza Index"),
    centroSub: t("score de 0 a 100", "0 to 100 score", "Score von 0 bis 100", "score de 0 a 100"),
    items: [
      {
        pestana: t("Índice", "Index", "Index", "Índice"),
        clave: t("01 · El índice", "01 · The index", "01 · Der Index", "01 · O índice"),
        titulo: t(
          "Un número de 0 a 100, con la fórmula a la vista.",
          "A number from 0 to 100, with the formula in plain sight.",
          "Eine Zahl von 0 bis 100, mit offener Formel.",
          "Um número de 0 a 100, com a fórmula à vista.",
        ),
        texto: t(
          "El score resume la adopción de inteligencia artificial en cinco pilares con peso explícito: empresas, talento, ecosistema, consumidores y regulación. Pesos, anclas y fuentes están publicados.",
          "The score sums up artificial intelligence adoption across five pillars with explicit weights: companies, talent, ecosystem, consumers and regulation. Weights, anchors and sources are published.",
          "Der Score fasst die Nutzung künstlicher Intelligenz in fünf Säulen mit ausdrücklicher Gewichtung zusammen: Unternehmen, Talente, Ökosystem, Konsumenten und Regulierung. Gewichte, Anker und Quellen sind veröffentlicht.",
          "O score resume a adoção de inteligência artificial em cinco pilares com peso explícito: empresas, talento, ecossistema, consumidores e regulação. Pesos, âncoras e fontes estão publicados.",
        ),
        resuelve: t(
          "Un dato que se puede citar y revisar, no una opinión.",
          "A figure you can quote and check, not an opinion.",
          "Eine Zahl, die man zitieren und prüfen kann, keine Meinung.",
          "Um dado que se pode citar e rever, não uma opinião.",
        ),
        visual: { tipo: "cubre", src: `${M}/home.webp`, alt: t("El score del Monza Index en la portada", "The Monza Index score on the home page", "Der Score des Monza Index auf der Startseite", "O score do Monza Index na página inicial") },
      },
      {
        pestana: t("Datos", "Data", "Daten", "Dados"),
        clave: t("02 · Datos de fuentes públicas", "02 · Data from public sources", "02 · Daten aus öffentlichen Quellen", "02 · Dados de fontes públicas"),
        titulo: t(
          "Empleo, búsquedas y datos abiertos, leídos por el sistema.",
          "Jobs, searches and open data, read by the system.",
          "Stellen, Suchanfragen und offene Daten, vom System gelesen.",
          "Emprego, pesquisas e dados abertos, lidos pelo sistema.",
        ),
        texto: t(
          "El sistema lee portales de empleo, Google Trends, los datos abiertos del Estado y las cifras del Banco Mundial y del FMI, y los ordena por pilar.",
          "The system reads job boards, Google Trends, government open data and figures from the World Bank and the IMF, and sorts them by pillar.",
          "Das System liest Jobportale, Google Trends, offene Daten des Staates sowie Zahlen der Weltbank und des IWF und ordnet sie nach Säulen.",
          "O sistema lê portais de emprego, o Google Trends, os dados abertos do Estado e os números do Banco Mundial e do FMI, e organiza-os por pilar.",
        ),
        resuelve: t(
          "Nadie tiene que armar la base a mano cada vez que se actualiza.",
          "No one has to rebuild the database by hand every time it updates.",
          "Niemand muss die Datenbasis bei jeder Aktualisierung von Hand zusammenstellen.",
          "Ninguém tem de montar a base à mão sempre que é atualizada.",
        ),
        visual: { tipo: "cubre", src: `${M}/talento.webp`, alt: t("La página de talento con las ofertas de trabajo en IA", "The talent page with AI job offers", "Die Talentseite mit KI-Stellenangeboten", "A página de talento com as ofertas de emprego em IA") },
      },
      {
        pestana: t("Explorador", "Explorer", "Explorer", "Explorador"),
        clave: t("03 · El explorador", "03 · The explorer", "03 · Der Explorer", "03 · O explorador"),
        titulo: t(
          "Talento, herramientas, startups y contexto, en páginas propias.",
          "Talent, tools, startups and context, each on its own page.",
          "Talente, Tools, Start-ups und Kontext, jeweils auf eigenen Seiten.",
          "Talento, ferramentas, startups e contexto, em páginas próprias.",
        ),
        texto: t(
          "Cada dimensión se puede recorrer: qué habilidades se piden, qué herramientas se usan, qué startups de IA existen y en qué contexto económico.",
          "Every dimension can be explored: which skills are in demand, which tools are used, which AI startups exist and in what economic context.",
          "Jede Dimension lässt sich erkunden: welche Fähigkeiten gefragt sind, welche Tools genutzt werden, welche KI-Start-ups es gibt und in welchem wirtschaftlichen Umfeld.",
          "Cada dimensão pode ser percorrida: que competências se pedem, que ferramentas se usam, que startups de IA existem e em que contexto económico.",
        ),
        resuelve: t(
          "Una empresa o un inversionista encuentra el dato que necesita sin pedirlo.",
          "A company or an investor finds the figure they need without asking for it.",
          "Ein Unternehmen oder ein Investor findet die Zahl, die er braucht, ohne danach zu fragen.",
          "Uma empresa ou um investidor encontra o dado de que precisa sem o pedir.",
        ),
        visual: { tipo: "cubre", src: `${M}/startups.webp`, alt: t("El directorio de startups de IA en Colombia", "The directory of AI startups in Colombia", "Das Verzeichnis der KI-Start-ups in Kolumbien", "O diretório de startups de IA na Colômbia") },
      },
      {
        pestana: t("Encuesta", "Survey", "Umfrage", "Inquérito"),
        clave: t("04 · La encuesta con IA", "04 · The AI-led survey", "04 · Die Umfrage mit KI", "04 · O inquérito com IA"),
        titulo: t(
          "Una encuesta a empresas que conduce un entrevistador de inteligencia artificial.",
          "A company survey run by an artificial intelligence interviewer.",
          "Eine Unternehmensumfrage, die ein KI-Interviewer führt.",
          "Um inquérito a empresas conduzido por um entrevistador de inteligência artificial.",
        ),
        texto: t(
          "En alianza con Colombia Fintech, cada empresa entra a su espacio, responde en unos nueve minutos con su equipo y recibe su score privado de madurez. Solo se publican agregados del sector.",
          "In partnership with Colombia Fintech, each company enters its own space, answers in about nine minutes with its team and gets its private maturity score. Only sector-level aggregates are published.",
          "In Partnerschaft mit Colombia Fintech betritt jedes Unternehmen seinen Bereich, antwortet mit seinem Team in etwa neun Minuten und erhält seinen privaten Reifegrad-Score. Veröffentlicht werden nur zusammengefasste Werte der Branche.",
          "Em parceria com a Colombia Fintech, cada empresa entra no seu espaço, responde em cerca de nove minutos com a sua equipa e recebe o seu score privado de maturidade. Só se publicam agregados do setor.",
        ),
        resuelve: t(
          "Datos de primera mano que ningún portal público tiene.",
          "First-hand data that no public portal has.",
          "Daten aus erster Hand, die kein öffentliches Portal hat.",
          "Dados em primeira mão que nenhum portal público tem.",
        ),
        visual: { tipo: "cel", src: `${M}/encuesta-m.webp`, alt: t("La encuesta de madurez en IA en el celular", "The AI maturity survey on a phone", "Die KI-Reifegrad-Umfrage auf dem Handy", "O inquérito de maturidade em IA no telemóvel") },
      },
      {
        pestana: t("Aliados", "Partners", "Partner", "Parceiros"),
        clave: t("05 · Espacios para aliados", "05 · Partner spaces", "05 · Bereiche für Partner", "05 · Espaços para parceiros"),
        titulo: t(
          "Un espacio privado por aliado, con un asistente que responde sobre los datos.",
          "A private space for each partner, with an assistant that answers questions about the data.",
          "Ein privater Bereich pro Partner, mit einem Assistenten, der Fragen zu den Daten beantwortet.",
          "Um espaço privado por parceiro, com um assistente que responde sobre os dados.",
        ),
        texto: t(
          "Las empresas aliadas tienen su propio espacio dentro del índice, con sus datos y un asistente de inteligencia artificial que contesta preguntas sobre ellos.",
          "Partner companies have their own space inside the index, with their data and an artificial intelligence assistant that answers questions about it.",
          "Partnerunternehmen haben ihren eigenen Bereich im Index, mit ihren Daten und einem KI-Assistenten, der Fragen dazu beantwortet.",
          "As empresas parceiras têm o seu próprio espaço dentro do índice, com os seus dados e um assistente de inteligência artificial que responde a perguntas sobre eles.",
        ),
        resuelve: t(
          "El dato llega a quien decide, en sus propias palabras.",
          "The data reaches the decision maker, in their own words.",
          "Die Daten erreichen die Entscheider, in ihren eigenen Worten.",
          "O dado chega a quem decide, nas suas próprias palavras.",
        ),
        visual: { tipo: "grande", texto: "IA", sub: t("Un asistente por aliado", "One assistant per partner", "Ein Assistent pro Partner", "Um assistente por parceiro") },
      },
      {
        pestana: t("Reportes", "Reports", "Berichte", "Relatórios"),
        clave: t("06 · Reportes", "06 · Reports", "06 · Berichte", "06 · Relatórios"),
        titulo: t(
          "Reportes trimestrales para decidir con datos.",
          "Quarterly reports to decide with data.",
          "Quartalsberichte, um mit Daten zu entscheiden.",
          "Relatórios trimestrais para decidir com dados.",
        ),
        texto: t(
          "Cada reporte trae el score, el mapa de adopción empresarial y los resultados de la encuesta a un sector.",
          "Each report brings the score, the map of business adoption and the results of the survey of one sector.",
          "Jeder Bericht bringt den Score, die Karte der Nutzung in Unternehmen und die Ergebnisse der Umfrage in einer Branche.",
          "Cada relatório traz o score, o mapa de adoção empresarial e os resultados do inquérito a um setor.",
        ),
        resuelve: t(
          "Una cita periódica con el estado de la IA en el país.",
          "A regular check-in on the state of AI in the country.",
          "Ein regelmäßiger Blick auf den Stand der KI im Land.",
          "Um encontro periódico com o estado da IA no país.",
        ),
        visual: { tipo: "cubre", src: `${M}/reportes.webp`, alt: t("La página de reportes del Monza Index", "The Monza Index reports page", "Die Berichtsseite des Monza Index", "A página de relatórios do Monza Index") },
      },
    ],
  },
  tecnologia: {
    titulo: t(
      "Datos públicos conectados, con inteligencia artificial adentro.",
      "Public data, connected, with artificial intelligence inside.",
      "Öffentliche Daten, verbunden, mit künstlicher Intelligenz im Inneren.",
      "Dados públicos ligados, com inteligência artificial lá dentro.",
    ),
    lede: t(
      "Las fuentes alimentan una sola base; de ahí salen el score, el explorador y los reportes. En rosa, donde trabaja la inteligencia artificial. Toca cualquiera.",
      "The sources feed a single database; the score, the explorer and the reports come out of it. In pink, where artificial intelligence works. Tap any of them.",
      "Die Quellen speisen eine einzige Datenbasis; daraus entstehen der Score, der Explorer und die Berichte. In Rosa: wo künstliche Intelligenz arbeitet. Tippe auf ein Element.",
      "As fontes alimentam uma só base; daí saem o score, o explorador e os relatórios. A cor-de-rosa, onde trabalha a inteligência artificial. Toca em qualquer uma.",
    ),
    centro: { titulo: igual("Monza Index"), sub: t("score de 0 a 100", "0 to 100 score", "Score von 0 bis 100", "score de 0 a 100") },
    nodos: [
      {
        id: "entrevistador",
        nombre: t("Entrevistador de la encuesta", "Survey interviewer", "Interviewer der Umfrage", "Entrevistador do inquérito"),
        corto: t("Entrevista", "Interview", "Interview", "Entrevista"),
        tipo: "ia",
        hace: t(
          "Conduce la encuesta de madurez con cada empresa, pregunta por pregunta, y deja las respuestas ordenadas para su score privado y para los agregados del sector.",
          "Runs the maturity survey with each company, question by question, and leaves the answers organized for its private score and for the sector aggregates.",
          "Führt die Reifegrad-Umfrage mit jedem Unternehmen, Frage für Frage, und ordnet die Antworten für den privaten Score und für die Werte der Branche.",
          "Conduz o inquérito de maturidade com cada empresa, pergunta a pergunta, e deixa as respostas organizadas para o seu score privado e para os agregados do setor.",
        ),
        con: ["web", "base"],
        img: `${M}/encuesta.webp`,
      },
      {
        id: "asistente",
        nombre: t("Asistente de los datos", "Data assistant", "Daten-Assistent", "Assistente dos dados"),
        corto: t("Asistente", "Assistant", "Assistent", "Assistente"),
        tipo: "ia",
        hace: t(
          "Responde preguntas sobre los datos del índice dentro del espacio privado de cada empresa aliada.",
          "Answers questions about the index data inside each partner company's private space.",
          "Beantwortet Fragen zu den Daten des Index im privaten Bereich jedes Partnerunternehmens.",
          "Responde a perguntas sobre os dados do índice dentro do espaço privado de cada empresa parceira.",
        ),
        con: ["base", "espacios"],
      },
      {
        id: "empleo",
        nombre: t("Portales de empleo", "Job boards", "Jobportale", "Portais de emprego"),
        corto: t("Empleo", "Jobs", "Jobs", "Emprego"),
        tipo: "herramienta",
        hace: t(
          "Las ofertas de trabajo que piden inteligencia artificial: cuántas hay, en qué ciudades y qué habilidades piden.",
          "Job offers that ask for artificial intelligence: how many there are, in which cities and which skills they ask for.",
          "Stellenangebote, die künstliche Intelligenz verlangen: wie viele es gibt, in welchen Städten und welche Fähigkeiten gefragt sind.",
          "As ofertas de emprego que pedem inteligência artificial: quantas há, em que cidades e que competências pedem.",
        ),
        con: ["base"],
      },
      {
        id: "trends",
        nombre: igual("Google Trends"),
        corto: igual("Trends"),
        icono: "google",
        tipo: "herramienta",
        hace: t(
          "Qué herramientas de inteligencia artificial busca la gente en Colombia y cómo cambia ese interés.",
          "Which artificial intelligence tools people in Colombia search for, and how that interest changes.",
          "Nach welchen KI-Tools die Menschen in Kolumbien suchen und wie sich dieses Interesse verändert.",
          "Que ferramentas de inteligência artificial as pessoas procuram na Colômbia e como muda esse interesse.",
        ),
        con: ["base"],
      },
      {
        id: "abiertos",
        nombre: t("Datos abiertos", "Open data", "Offene Daten", "Dados abertos"),
        corto: t("Datos", "Data", "Daten", "Dados"),
        tipo: "herramienta",
        hace: t(
          "Los datos públicos del Estado y el registro de empresas, para contar las startups de IA y sus sectores.",
          "Government public data and the company registry, to count AI startups and their sectors.",
          "Öffentliche Daten des Staates und das Unternehmensregister, um KI-Start-ups und ihre Branchen zu zählen.",
          "Os dados públicos do Estado e o registo de empresas, para contar as startups de IA e os seus setores.",
        ),
        con: ["base"],
      },
      {
        id: "macro",
        nombre: t("Banco Mundial y FMI", "World Bank and IMF", "Weltbank und IWF", "Banco Mundial e FMI"),
        corto: igual("Macro"),
        tipo: "herramienta",
        hace: t(
          "El contexto económico: tamaño de la economía, acceso a internet, empleo e inversión.",
          "The economic context: size of the economy, internet access, employment and investment.",
          "Der wirtschaftliche Kontext: Größe der Wirtschaft, Internetzugang, Beschäftigung und Investitionen.",
          "O contexto económico: dimensão da economia, acesso à internet, emprego e investimento.",
        ),
        con: ["base"],
      },
      {
        id: "base",
        nombre: t("Base del índice", "Index database", "Datenbasis des Index", "Base do índice"),
        corto: t("Base", "Database", "Datenbasis", "Base"),
        icono: "postgresql",
        tipo: "herramienta",
        hace: t(
          "Donde se juntan y se normalizan todos los datos para calcular cada pilar del score.",
          "Where all the data comes together and is normalized to calculate each pillar of the score.",
          "Hier kommen alle Daten zusammen und werden vereinheitlicht, um jede Säule des Scores zu berechnen.",
          "Onde se juntam e se normalizam todos os dados para calcular cada pilar do score.",
        ),
        con: ["web", "reportes"],
      },
      {
        id: "web",
        nombre: t("Web del índice", "Index website", "Website des Index", "Site do índice"),
        corto: t("Web", "Web", "Web", "Site"),
        icono: "vercel",
        tipo: "herramienta",
        hace: t(
          "monzaindex.ai: el score, el explorador y la metodología, abiertos a cualquiera.",
          "monzaindex.ai: the score, the explorer and the methodology, open to anyone.",
          "monzaindex.ai: der Score, der Explorer und die Methodik, für alle offen.",
          "monzaindex.ai: o score, o explorador e a metodologia, abertos a qualquer pessoa.",
        ),
        con: [],
        img: `${M}/home.webp`,
      },
      {
        id: "espacios",
        nombre: t("Espacios de aliados", "Partner spaces", "Partner-Bereiche", "Espaços de parceiros"),
        corto: t("Aliados", "Partners", "Partner", "Parceiros"),
        tipo: "herramienta",
        hace: t(
          "Un espacio privado por empresa aliada, con sus datos y su asistente.",
          "A private space for each partner company, with its data and its assistant.",
          "Ein privater Bereich pro Partnerunternehmen, mit seinen Daten und seinem Assistenten.",
          "Um espaço privado por empresa parceira, com os seus dados e o seu assistente.",
        ),
        con: ["web"],
      },
      {
        id: "reportes",
        nombre: t("Reportes", "Reports", "Berichte", "Relatórios"),
        corto: t("Reportes", "Reports", "Berichte", "Relatórios"),
        tipo: "herramienta",
        hace: t(
          "Los reportes trimestrales que se preparan con el índice y la encuesta.",
          "The quarterly reports prepared with the index and the survey.",
          "Die Quartalsberichte, die mit dem Index und der Umfrage erstellt werden.",
          "Os relatórios trimestrais preparados com o índice e o inquérito.",
        ),
        con: [],
      },
    ],
  },
  galeria: {
    titulo: t("El score, los datos y la encuesta.", "The score, the data and the survey.", "Der Score, die Daten und die Umfrage.", "O score, os dados e o inquérito."),
    items: [
      { src: `${M}/home.webp`, pie: t("El score", "The score", "Der Score", "O score"), alt: t("La portada del Monza Index con el score", "The Monza Index home page with the score", "Die Startseite des Monza Index mit dem Score", "A página inicial do Monza Index com o score") },
      { src: `${M}/home-m.webp`, forma: "alta", pie: t("En el celular", "On a phone", "Auf dem Handy", "No telemóvel"), alt: t("El índice en el celular", "The index on a phone", "Der Index auf dem Handy", "O índice no telemóvel") },
      { src: `${M}/encuesta-m.webp`, forma: "alta", pie: t("La encuesta", "The survey", "Die Umfrage", "O inquérito"), alt: t("La encuesta de madurez en el celular", "The maturity survey on a phone", "Die Reifegrad-Umfrage auf dem Handy", "O inquérito de maturidade no telemóvel") },
      { src: `${M}/talento-m.webp`, forma: "alta", pie: t("Talento", "Talent", "Talente", "Talento"), alt: t("La página de talento en el celular", "The talent page on a phone", "Die Talentseite auf dem Handy", "A página de talento no telemóvel") },
      { src: `${M}/herramientas-m.webp`, forma: "alta", pie: t("Herramientas", "Tools", "Tools", "Ferramentas"), alt: t("La página de herramientas en el celular", "The tools page on a phone", "Die Tool-Seite auf dem Handy", "A página de ferramentas no telemóvel") },
      { src: `${M}/metodologia.webp`, forma: "ancha", pie: t("La metodología", "The methodology", "Die Methodik", "A metodologia"), alt: t("La metodología publicada del índice", "The index's published methodology", "Die veröffentlichte Methodik des Index", "A metodologia publicada do índice") },
    ],
  },
  cambio: {
    titulo: t(
      "Un índice que cualquiera puede revisar.",
      "An index anyone can check.",
      "Ein Index, den jeder prüfen kann.",
      "Um índice que qualquer pessoa pode rever.",
    ),
    items: [
      {
        cifra: "0–100",
        negrita: t("Score", "Score", "Score", "Score"),
        texto: t(
          "que resume la adopción de IA en Colombia.",
          "that sums up AI adoption in Colombia.",
          "der die Nutzung von KI in Kolumbien zusammenfasst.",
          "que resume a adoção de IA na Colômbia.",
        ),
      },
      {
        cifra: "5",
        negrita: t("Pilares", "Pillars", "Säulen", "Pilares"),
        texto: t(
          "con peso explícito y la fórmula publicada.",
          "with explicit weights and a published formula.",
          "mit ausdrücklicher Gewichtung und veröffentlichter Formel.",
          "com peso explícito e a fórmula publicada.",
        ),
      },
      {
        cifra: "6",
        negrita: t("Fuentes públicas", "Public sources", "Öffentliche Quellen", "Fontes públicas"),
        texto: t(
          "que el sistema lee y ordena.",
          "that the system reads and sorts.",
          "die das System liest und ordnet.",
          "que o sistema lê e organiza.",
        ),
      },
    ],
  },
  cierre: {
    titulo: t("¿Te imaginas tus datos", "Can you picture your data", "Wie wäre es, wenn deine Daten", "Imaginas os teus dados"),
    resaltado: t("trabajando así?", "working like this?", "so arbeiten würden?", "a trabalhar assim?"),
    lede: t(
      "Cuéntame qué quieres medir y te digo qué conectaría primero.",
      "Tell me what you want to measure and I'll tell you what I'd connect first.",
      "Erzähl mir, was du messen willst, und ich sage dir, was ich zuerst verbinden würde.",
      "Conta-me o que queres medir e digo-te o que ligaria primeiro.",
    ),
    enlace: { href: "https://monzaindex.ai", texto: t("Ver el índice ↗", "See the index ↗", "Zum Index ↗", "Ver o índice ↗") },
  },
  tarjeta: {
    etiqueta: t(
      "Índice de adopción de IA · producto propio",
      "AI adoption index · our own product",
      "KI-Adoptionsindex · eigenes Produkt",
      "Índice de adoção de IA · produto próprio",
    ),
    imagen: "/v2/portafolio/index.jpg",
    imagenCel: "/v2/portafolio/index-m.jpg",
  },
};
