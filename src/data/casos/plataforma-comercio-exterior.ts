/* Caso confidencial: plataforma de comercio exterior (/work/plataforma-comercio-exterior).
 * Sale de docs/internal/portada/prototipo/caso-comercio-exterior.html. SIN nombre del cliente, de
 * personas ni de países que lo identifiquen (lo vigila src/confidentiality.guard.test.ts). Solo
 * pantallazos ya neutralizados. Las cifras son las que ya están públicas en /work. */
import type { Caso, T } from "./tipos";

const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });
const igual = (s: string): T => ({ es: s, en: s, de: s, pt: s });
const M = "/v2/caso-comercio-exterior";

export const caso: Caso = {
  slug: "plataforma-comercio-exterior",
  nombre: t("Comercio exterior", "Foreign trade", "Außenhandel", "Comércio exterior"),
  categoria: "plataforma",
  confidencial: true,
  seo: {
    titulo: t(
      "Plataforma de comercio exterior con IA · Caso confidencial | Monza Lab",
      "AI foreign trade platform · Confidential case | Monza Lab",
      "KI-Plattform für Außenhandel · Vertraulicher Fall | Monza Lab",
      "Plataforma de comércio exterior com IA · Caso confidencial | Monza Lab",
    ),
    descripcion: t(
      "Una importadora que pasó de operar en correos y hojas de cálculo a operar como plataforma: cinco herramientas de IA sobre su ERP, portal del equipo y una web con asesor de compras.",
      "An importer that went from running on emails and spreadsheets to running as a platform: five AI tools on its ERP, a team portal and a website with a purchasing advisor.",
      "Ein Importeur, der von E-Mails und Tabellen zu einer Plattform wurde: fünf KI-Werkzeuge auf seinem ERP, ein Teamportal und eine Website mit Einkaufsberater.",
      "Uma importadora que passou de operar em emails e folhas de cálculo a operar como plataforma: cinco ferramentas de IA sobre o seu ERP, portal da equipa e um site com assessor de compras.",
    ),
  },
  hero: {
    linea1: t("Comercio", "Foreign", "Außenhandel", "Comércio"),
    linea2: t("exterior", "trade", "als Plattform", "exterior"),
    frase: t(
      "Una importadora que pasó de operar en correos y hojas de cálculo a operar como plataforma.",
      "An importer that went from running on emails and spreadsheets to running as a platform.",
      "Ein Importeur, der nicht mehr über E-Mails und Tabellen arbeitet, sondern als Plattform.",
      "Uma importadora que passou de operar em emails e folhas de cálculo a operar como plataforma.",
    ),
    pastillas: [
      t("Plataforma con IA", "AI platform", "KI-Plattform", "Plataforma com IA"),
      t("Importación", "Importing", "Import", "Importação"),
      t("Confidencial", "Confidential", "Vertraulich", "Confidencial"),
    ],
    enlace: { href: "#tecnologia", texto: t("Ver la tecnología ↓", "See the technology ↓", "Zur Technologie ↓", "Ver a tecnologia ↓") },
    web: {
      barra: "plataforma °01 · confidencial",
      escritorio: `${M}/larga.webp`,
      flota: { img: `${M}/asesor.webp`, sello: t("Asesor de compras", "Purchasing advisor", "Einkaufsberater", "Assessor de compras") },
    },
    fantasma: "Plataforma",
    reserva: t(
      "El nombre del cliente se mantiene en reserva.",
      "The client's name is kept private.",
      "Der Name des Kunden bleibt vertraulich.",
      "O nome do cliente mantém-se em reserva.",
    ),
  },
  producimos: {
    titulo: t("Cuatro cosas, sobre el mismo ERP.", "Four things, on the same ERP.", "Vier Dinge auf demselben ERP.", "Quatro coisas, sobre o mesmo ERP."),
    items: [
      { icono: "plataforma", nombre: t("Plataforma", "Platform", "Plattform", "Plataforma"), texto: t(
        "Un solo portal donde el equipo cotiza, valida proveedores y costea importaciones, en vez de correos y hojas de cálculo.",
        "A single portal where the team quotes, vets suppliers and costs imports, instead of emails and spreadsheets.",
        "Ein einziges Portal, in dem das Team kalkuliert, Lieferanten prüft und Importe durchrechnet, statt E-Mails und Tabellen.",
        "Um só portal onde a equipa orçamenta, valida fornecedores e calcula o custo das importações, em vez de emails e folhas de cálculo.") },
      { icono: "agente", nombre: t("Agentes de IA", "AI agents", "KI-Agenten", "Agentes de IA"), texto: t(
        "Cinco herramientas con inteligencia artificial: ficha técnica, comparador de proveedores, costo puesto en destino, contratos y coach comercial.",
        "Five artificial intelligence tools: product sheet, supplier comparison, landed cost, contracts and sales coach.",
        "Fünf Werkzeuge mit künstlicher Intelligenz: Datenblatt, Lieferantenvergleich, Kosten frei Bestimmungsort, Verträge und Vertriebscoach.",
        "Cinco ferramentas com inteligência artificial: ficha técnica, comparador de fornecedores, custo posto no destino, contratos e coach comercial.") },
      { icono: "web", nombre: igual("Website"), texto: t(
        "Una web nueva que cuenta el ciclo completo de una importación, con un asesor de compras de IA que conversa con el cliente.",
        "A new website that tells the full cycle of an import, with an AI purchasing advisor that talks with the client.",
        "Eine neue Website, die den ganzen Ablauf eines Imports erzählt, mit einem KI-Einkaufsberater, der mit dem Kunden spricht.",
        "Um site novo que conta o ciclo completo de uma importação, com um assessor de compras de IA que conversa com o cliente.") },
      { icono: "datos", nombre: t("Conexión con el ERP", "ERP connection", "ERP-Anbindung", "Ligação ao ERP"), texto: t(
        "Todo trabaja con los datos que la empresa ya tenía, en modo lectura y sin cambiarle nada.",
        "Everything works with the data the company already had, read-only and without changing anything.",
        "Alles arbeitet mit den Daten, die das Unternehmen schon hatte, nur lesend und ohne etwas zu ändern.",
        "Tudo trabalha com os dados que a empresa já tinha, em modo de leitura e sem lhe mudar nada.") },
    ],
  },
  hace: {
    titulo: t("La diseñamos, la construimos y la conectamos.", "We design it, build it and connect it.", "Wir gestalten, bauen und verbinden sie.", "Desenhamos, construímos e ligamos."),
    items: [
      { verbo: t("Diseña", "Designs", "Gestaltet", "Desenha"), texto: t(
        "La plataforma y la web, para que la empresa se presente como una plataforma de comercio exterior.",
        "The platform and the website, so the company presents itself as a foreign trade platform.",
        "Die Plattform und die Website, damit sich das Unternehmen als Außenhandelsplattform zeigt.",
        "A plataforma e o site, para que a empresa se apresente como uma plataforma de comércio exterior.") },
      { verbo: t("Construye", "Builds", "Baut", "Constrói"), texto: t(
        "Las cinco herramientas con inteligencia artificial y el asesor de compras de la web.",
        "The five artificial intelligence tools and the website's purchasing advisor.",
        "Die fünf KI-Werkzeuge und den Einkaufsberater der Website.",
        "As cinco ferramentas com inteligência artificial e o assessor de compras do site.") },
      { verbo: t("Conecta", "Connects", "Verbindet", "Liga"), texto: t(
        "El ERP, en modo lectura: las herramientas usan los datos que ya estaban.",
        "The ERP, read-only: the tools use the data that was already there.",
        "Das ERP, nur lesend: Die Werkzeuge nutzen die Daten, die schon da waren.",
        "O ERP, em modo de leitura: as ferramentas usam os dados que já existiam.") },
      { verbo: t("Entrega", "Delivers", "Liefert", "Entrega"), texto: t(
        "Cada semana, con el equipo, sobre su trabajo real.",
        "Every week, with the team, on their real work.",
        "Jede Woche, mit dem Team, an seiner echten Arbeit.",
        "Todas as semanas, com a equipa, sobre o seu trabalho real.") },
    ],
  },
  reto: {
    titulo: t(
      "Cada importación vivía repartida entre correos, hojas de cálculo y la memoria de alguien.",
      "Every import was scattered across emails, spreadsheets and someone's memory.",
      "Jeder Import war verteilt auf E-Mails, Tabellen und das Gedächtnis von jemandem.",
      "Cada importação vivia repartida entre emails, folhas de cálculo e a memória de alguém.",
    ),
    items: [
      { titulo: t("La información estaba en muchos lugares.", "The information was in many places.", "Die Informationen lagen an vielen Orten.", "A informação estava em muitos lugares."), texto: t(
        "Productos, proveedores y costos vivían en el ERP, en correos y en hojas de cálculo distintas.",
        "Products, suppliers and costs lived in the ERP, in emails and in different spreadsheets.",
        "Produkte, Lieferanten und Kosten lagen im ERP, in E-Mails und in verschiedenen Tabellen.",
        "Produtos, fornecedores e custos viviam no ERP, em emails e em folhas de cálculo diferentes.") },
      { titulo: t("Cotizar era trabajo manual, cada vez.", "Quoting was manual work, every time.", "Kalkulieren war jedes Mal Handarbeit.", "Orçamentar era trabalho manual, de cada vez."), texto: t(
        "Comparar fábricas, calcular el costo real de traer un producto y armar su ficha se hacía a mano para cada cliente.",
        "Comparing factories, calculating the real cost of bringing in a product and building its sheet was done by hand for every client.",
        "Fabriken vergleichen, die echten Kosten eines Imports berechnen und das Datenblatt erstellen: alles von Hand, für jeden Kunden.",
        "Comparar fábricas, calcular o custo real de trazer um produto e montar a sua ficha fazia-se à mão para cada cliente.") },
      { titulo: t("Hacia afuera parecía una empresa de servicios.", "From the outside it looked like a services firm.", "Nach außen wirkte es wie ein Dienstleister.", "Para fora parecia uma empresa de serviços."), texto: t(
        "La web no contaba que la empresa ya resolvía el ciclo completo de una importación.",
        "The website did not show that the company already handled the full cycle of an import.",
        "Die Website zeigte nicht, dass das Unternehmen den ganzen Ablauf eines Imports schon löste.",
        "O site não contava que a empresa já resolvia o ciclo completo de uma importação.") },
    ],
  },
  piezas: {
    titulo: t("Cinco herramientas y una web, sobre el mismo ERP.", "Five tools and a website, on the same ERP.", "Fünf Werkzeuge und eine Website auf demselben ERP.", "Cinco ferramentas e um site, sobre o mesmo ERP."),
    lede: t(
      "Todas trabajan con los datos que la empresa ya tenía, sin cambiarle nada. Toca cualquiera para ver qué hace y qué le resuelve.",
      "All of them work with the data the company already had, without changing anything. Tap any of them to see what it does and what it solves.",
      "Alle arbeiten mit den Daten, die das Unternehmen schon hatte, ohne etwas zu ändern. Tippe auf eines, um zu sehen, was es tut und was es löst.",
      "Todas trabalham com os dados que a empresa já tinha, sem lhe mudar nada. Toca em qualquer uma para ver o que faz e o que resolve.",
    ),
    centro: t("Un solo portal", "One portal", "Ein Portal", "Um só portal"),
    centroSub: t("sobre el ERP de la empresa", "on the company's ERP", "auf dem ERP des Unternehmens", "sobre o ERP da empresa"),
    items: [
      {
        pestana: igual("Web"),
        clave: t("01 · Web y asesor de compras", "01 · Website and purchasing advisor", "01 · Website und Einkaufsberater", "01 · Site e assessor de compras"),
        titulo: t("La empresa se presenta como plataforma.", "The company presents itself as a platform.", "Das Unternehmen zeigt sich als Plattform.", "A empresa apresenta-se como plataforma."),
        texto: t(
          "Una web nueva que cuenta el ciclo completo de una importación, con un asesor de inteligencia artificial que conversa con el cliente: qué quiere importar, qué conviene validar y cuánto le cuesta puesto en destino.",
          "A new website that tells the full cycle of an import, with an artificial intelligence advisor that talks with the client: what they want to import, what should be vetted and what it costs landed.",
          "Eine neue Website, die den ganzen Ablauf eines Imports erzählt, mit einem KI-Berater, der mit dem Kunden spricht: was er importieren will, was zu prüfen ist und was es frei Bestimmungsort kostet.",
          "Um site novo que conta o ciclo completo de uma importação, com um assessor de inteligência artificial que conversa com o cliente: o que quer importar, o que convém validar e quanto custa posto no destino."),
        resuelve: t("El cliente entiende su importación antes de hablar con una persona.", "The client understands their import before talking to a person.", "Der Kunde versteht seinen Import, bevor er mit einem Menschen spricht.", "O cliente entende a sua importação antes de falar com uma pessoa."),
        visual: { tipo: "cubre", src: `${M}/web.webp`, alt: t("La web pública de la plataforma, con el asesor de compras", "The platform's public website, with the purchasing advisor", "Die öffentliche Website der Plattform, mit dem Einkaufsberater", "O site público da plataforma, com o assessor de compras") },
      },
      {
        pestana: t("Ficha", "Sheet", "Datenblatt", "Ficha"),
        clave: t("02 · Ficha técnica automática", "02 · Automatic product sheet", "02 · Automatisches Datenblatt", "02 · Ficha técnica automática"),
        titulo: t("La ficha de cada producto, armada sola.", "Every product's sheet, built by itself.", "Das Datenblatt jedes Produkts, von selbst erstellt.", "A ficha de cada produto, montada sozinha."),
        texto: t(
          "Toma los datos del producto y del proveedor que ya están en el ERP y arma la ficha con especificaciones, certificaciones y contacto, lista para enviar o publicar.",
          "It takes the product and supplier data already in the ERP and builds the sheet with specifications, certifications and contact, ready to send or publish.",
          "Es nimmt die Produkt- und Lieferantendaten aus dem ERP und erstellt das Datenblatt mit Spezifikationen, Zertifizierungen und Kontakt, bereit zum Senden oder Veröffentlichen.",
          "Pega nos dados do produto e do fornecedor que já estão no ERP e monta a ficha com especificações, certificações e contacto, pronta para enviar ou publicar."),
        resuelve: t("Cada producto sale documentado igual, sin rehacer la ficha a mano.", "Every product comes out documented the same way, without redoing the sheet by hand.", "Jedes Produkt ist gleich dokumentiert, ohne das Datenblatt von Hand neu zu machen.", "Cada produto sai documentado da mesma forma, sem refazer a ficha à mão."),
        visual: { tipo: "cubre", src: `${M}/ficha.webp`, posicion: "center 18%", alt: t("Ficha técnica de producto generada por la plataforma, con datos de ejemplo", "Product sheet generated by the platform, with sample data", "Von der Plattform erstelltes Datenblatt, mit Beispieldaten", "Ficha técnica de produto gerada pela plataforma, com dados de exemplo") },
      },
      {
        pestana: t("Proveedores", "Suppliers", "Lieferanten", "Fornecedores"),
        clave: t("03 · Comparador de proveedores", "03 · Supplier comparison", "03 · Lieferantenvergleich", "03 · Comparador de fornecedores"),
        titulo: t("Las fábricas, comparadas con los mismos criterios.", "Factories, compared on the same criteria.", "Fabriken, nach denselben Kriterien verglichen.", "As fábricas, comparadas com os mesmos critérios."),
        texto: t(
          "El equipo sube las cotizaciones de varios proveedores y la herramienta los compara por precio, especificaciones y confiabilidad, con un puntaje para cada uno.",
          "The team uploads quotes from several suppliers and the tool compares them on price, specifications and reliability, with a score for each.",
          "Das Team lädt Angebote mehrerer Lieferanten hoch, und das Werkzeug vergleicht sie nach Preis, Spezifikation und Zuverlässigkeit, mit einer Bewertung für jeden.",
          "A equipa carrega os orçamentos de vários fornecedores e a ferramenta compara-os por preço, especificações e fiabilidade, com uma pontuação para cada um."),
        resuelve: t("Se escoge proveedor con información, no por intuición.", "Suppliers are chosen with information, not by gut feeling.", "Lieferanten werden mit Informationen gewählt, nicht aus dem Bauch.", "Escolhe-se o fornecedor com informação, não por intuição."),
        visual: { tipo: "cubre", src: `${M}/portal.webp`, posicion: "center 82%", alt: t("El portal de herramientas, con el comparador, la calculadora y la ficha", "The tools portal, with the comparison, the calculator and the sheet", "Das Werkzeugportal mit Vergleich, Rechner und Datenblatt", "O portal de ferramentas, com o comparador, a calculadora e a ficha") },
      },
      {
        pestana: t("Costeo", "Costing", "Kosten", "Custeio"),
        clave: t("04 · Costo puesto en destino", "04 · Landed cost", "04 · Kosten frei Bestimmungsort", "04 · Custo posto no destino"),
        titulo: t("El costo real de traer un producto, antes de comprarlo.", "The real cost of bringing in a product, before buying it.", "Die echten Kosten eines Imports, bevor man kauft.", "O custo real de trazer um produto, antes de o comprar."),
        texto: t(
          "Suma flete, aranceles, impuestos y gastos para mostrar cuánto cuesta el producto puesto en la bodega del cliente.",
          "It adds freight, duties, taxes and fees to show what the product costs delivered to the client's warehouse.",
          "Es addiert Fracht, Zölle, Steuern und Gebühren und zeigt, was das Produkt im Lager des Kunden kostet.",
          "Soma frete, taxas alfandegárias, impostos e despesas para mostrar quanto custa o produto posto no armazém do cliente."),
        resuelve: t("Nadie compra sin saber cuánto le va a costar de verdad.", "Nobody buys without knowing what it will really cost.", "Niemand kauft, ohne zu wissen, was es wirklich kostet.", "Ninguém compra sem saber quanto lhe vai custar de verdade."),
        visual: { tipo: "fuentes", fuentes: [t("Flete", "Freight", "Fracht", "Frete"), t("Aranceles", "Duties", "Zölle", "Taxas"), t("Impuestos", "Taxes", "Steuern", "Impostos")], total: t("Costo real puesto en destino", "Real landed cost", "Echte Kosten frei Bestimmungsort", "Custo real posto no destino") },
      },
      {
        pestana: t("Contratos", "Contracts", "Verträge", "Contratos"),
        clave: t("05 · Generador de contratos", "05 · Contract generator", "05 · Vertragsgenerator", "05 · Gerador de contratos"),
        titulo: t("Contratos de compra armados con los datos reales.", "Purchase contracts built from the real data.", "Kaufverträge aus den echten Daten erstellt.", "Contratos de compra montados com os dados reais."),
        texto: t(
          "Con la información del producto, del proveedor y de la negociación, la herramienta arma el borrador del contrato de compra. El equipo lo revisa y lo firma.",
          "With the product, supplier and negotiation information, the tool drafts the purchase contract. The team reviews it and signs it.",
          "Mit den Informationen zu Produkt, Lieferant und Verhandlung erstellt das Werkzeug den Entwurf des Kaufvertrags. Das Team prüft und unterschreibt ihn.",
          "Com a informação do produto, do fornecedor e da negociação, a ferramenta monta o rascunho do contrato de compra. A equipa revê-o e assina-o."),
        resuelve: t("Menos riesgo en cada compra y menos tiempo redactando.", "Less risk in every purchase and less time drafting.", "Weniger Risiko bei jedem Kauf und weniger Zeit fürs Schreiben.", "Menos risco em cada compra e menos tempo a redigir."),
        visual: { tipo: "fuentes", fuentes: [t("Producto", "Product", "Produkt", "Produto"), t("Proveedor", "Supplier", "Lieferant", "Fornecedor"), t("Condiciones", "Terms", "Konditionen", "Condições")], total: t("Contrato listo para revisar", "Contract ready to review", "Vertrag zur Prüfung bereit", "Contrato pronto para rever") },
      },
      {
        pestana: igual("Coach"),
        clave: t("06 · Coach comercial", "06 · Sales coach", "06 · Vertriebscoach", "06 · Coach comercial"),
        titulo: t("Alguien que mira las ventas en curso todos los días.", "Someone who looks at open deals every day.", "Jemand, der sich jeden Tag die laufenden Verkäufe ansieht.", "Alguém que olha para as vendas em curso todos os dias."),
        texto: t(
          "Lee las oportunidades de venta que están en el ERP y sugiere el siguiente paso de cada una.",
          "It reads the sales opportunities in the ERP and suggests the next step for each one.",
          "Es liest die Verkaufschancen im ERP und schlägt für jede den nächsten Schritt vor.",
          "Lê as oportunidades de venda que estão no ERP e sugere o passo seguinte de cada uma."),
        resuelve: t("El equipo sabe qué mover primero.", "The team knows what to move first.", "Das Team weiß, was zuerst dran ist.", "A equipa sabe o que mexer primeiro."),
        visual: { tipo: "fuentes", fuentes: [t("Oportunidades", "Opportunities", "Chancen", "Oportunidades"), t("Estado", "Status", "Stand", "Estado"), t("Tiempos", "Timing", "Zeiten", "Tempos")], total: t("Qué mover primero", "What to move first", "Was zuerst dran ist", "O que mexer primeiro") },
      },
    ],
  },
  tecnologia: {
    titulo: t("La inteligencia artificial, sobre el ERP que ya tenían.", "Artificial intelligence, on the ERP they already had.", "Künstliche Intelligenz auf dem ERP, das sie schon hatten.", "A inteligência artificial, sobre o ERP que já tinham."),
    lede: t(
      "La plataforma lee el ERP de la empresa en modo lectura: no cambia nada de lo que el equipo ya usa. En rosa, donde trabaja la inteligencia artificial. Toca cualquiera.",
      "The platform reads the company's ERP read-only: it changes nothing the team already uses. In pink, where artificial intelligence works. Tap any of them.",
      "Die Plattform liest das ERP des Unternehmens nur lesend: Sie ändert nichts an dem, was das Team schon nutzt. In Rosa: wo künstliche Intelligenz arbeitet. Tippe auf eines.",
      "A plataforma lê o ERP da empresa em modo de leitura: não muda nada do que a equipa já usa. Em rosa, onde trabalha a inteligência artificial. Toca em qualquer uma.",
    ),
    centro: { titulo: t("La plataforma", "The platform", "Die Plattform", "A plataforma"), sub: t("sobre su ERP", "on its ERP", "auf ihrem ERP", "sobre o seu ERP") },
    nodos: [
      { id: "asesor", nombre: t("Asesor de compras", "Purchasing advisor", "Einkaufsberater", "Assessor de compras"), corto: t("Asesor", "Advisor", "Berater", "Assessor"), tipo: "ia",
        hace: t(
          "Conversa con el cliente en la web: qué quiere importar, qué fábrica conviene validar y cuánto le cuesta puesto en destino.",
          "Talks with the client on the website: what they want to import, which factory should be vetted and what it costs landed.",
          "Spricht auf der Website mit dem Kunden: was er importieren will, welche Fabrik zu prüfen ist und was es frei Bestimmungsort kostet.",
          "Conversa com o cliente no site: o que quer importar, que fábrica convém validar e quanto custa posto no destino."),
        con: ["web", "erp"], img: `${M}/asesor.webp` },
      { id: "ficha", nombre: t("Ficha técnica", "Product sheet", "Datenblatt", "Ficha técnica"), corto: t("Ficha", "Sheet", "Datenblatt", "Ficha"), tipo: "ia",
        hace: t(
          "Arma la ficha de cada producto con los datos del ERP: especificaciones, certificaciones y proveedor.",
          "Builds each product's sheet from the ERP data: specifications, certifications and supplier.",
          "Erstellt das Datenblatt jedes Produkts aus den ERP-Daten: Spezifikationen, Zertifizierungen und Lieferant.",
          "Monta a ficha de cada produto com os dados do ERP: especificações, certificações e fornecedor."),
        con: ["erp", "docs"], img: `${M}/ficha.webp` },
      { id: "comparador", nombre: t("Comparador", "Comparison", "Vergleich", "Comparador"), tipo: "ia",
        hace: t(
          "Compara las cotizaciones de varias fábricas por precio, especificaciones y confiabilidad, y le pone puntaje a cada una.",
          "Compares quotes from several factories on price, specifications and reliability, and scores each one.",
          "Vergleicht Angebote mehrerer Fabriken nach Preis, Spezifikation und Zuverlässigkeit und bewertet jede.",
          "Compara os orçamentos de várias fábricas por preço, especificações e fiabilidade, e dá uma pontuação a cada uma."),
        con: ["erp", "portal"] },
      { id: "costeo", nombre: t("Costo en destino", "Landed cost", "Kosten am Ziel", "Custo no destino"), corto: t("Costeo", "Costing", "Kosten", "Custeio"), tipo: "ia",
        hace: t(
          "Suma flete, aranceles, impuestos y gastos para mostrar el costo real antes de comprar.",
          "Adds freight, duties, taxes and fees to show the real cost before buying.",
          "Addiert Fracht, Zölle, Steuern und Gebühren und zeigt die echten Kosten vor dem Kauf.",
          "Soma frete, taxas, impostos e despesas para mostrar o custo real antes de comprar."),
        con: ["erp", "portal"] },
      { id: "contratos", nombre: t("Contratos", "Contracts", "Verträge", "Contratos"), tipo: "ia",
        hace: t(
          "Arma el borrador del contrato de compra con los datos reales, para que el equipo lo revise y lo firme.",
          "Drafts the purchase contract from the real data, for the team to review and sign.",
          "Erstellt den Entwurf des Kaufvertrags aus den echten Daten, damit das Team ihn prüft und unterschreibt.",
          "Monta o rascunho do contrato de compra com os dados reais, para a equipa o rever e assinar."),
        con: ["erp", "docs"] },
      { id: "coach", nombre: t("Coach comercial", "Sales coach", "Vertriebscoach", "Coach comercial"), corto: igual("Coach"), tipo: "ia",
        hace: t(
          "Lee las oportunidades de venta y sugiere el siguiente paso de cada una.",
          "Reads the sales opportunities and suggests the next step for each one.",
          "Liest die Verkaufschancen und schlägt für jede den nächsten Schritt vor.",
          "Lê as oportunidades de venda e sugere o passo seguinte de cada uma."),
        con: ["erp", "portal"] },
      { id: "erp", nombre: t("ERP de la empresa", "The company's ERP", "ERP des Unternehmens", "ERP da empresa"), corto: igual("ERP"), icono: "odoo", tipo: "herramienta",
        hace: t(
          "Productos, proveedores, clientes y ventas, como el equipo ya los tenía. La plataforma los lee en vivo y no cambia nada.",
          "Products, suppliers, clients and sales, as the team already had them. The platform reads them live and changes nothing.",
          "Produkte, Lieferanten, Kunden und Verkäufe, so wie das Team sie schon hatte. Die Plattform liest sie live und ändert nichts.",
          "Produtos, fornecedores, clientes e vendas, como a equipa já os tinha. A plataforma lê-os em tempo real e não muda nada."),
        con: [] },
      { id: "portal", nombre: t("Portal del equipo", "Team portal", "Teamportal", "Portal da equipa"), corto: igual("Portal"), tipo: "herramienta",
        hace: t(
          "Un solo lugar, con acceso para el equipo, donde viven las herramientas.",
          "A single place, with access for the team, where the tools live.",
          "Ein einziger Ort mit Zugang für das Team, an dem die Werkzeuge liegen.",
          "Um só lugar, com acesso para a equipa, onde vivem as ferramentas."),
        con: ["web"], img: `${M}/portal.webp` },
      { id: "web", nombre: t("Web pública", "Public website", "Öffentliche Website", "Site público"), corto: igual("Web"), icono: "vercel", tipo: "herramienta",
        hace: t(
          "La cara hacia afuera: presenta la empresa como plataforma de comercio exterior y recibe a los clientes con el asesor.",
          "The public face: it presents the company as a foreign trade platform and welcomes clients with the advisor.",
          "Das Gesicht nach außen: Es zeigt das Unternehmen als Außenhandelsplattform und empfängt Kunden mit dem Berater.",
          "A cara para fora: apresenta a empresa como plataforma de comércio exterior e recebe os clientes com o assessor."),
        con: [], img: `${M}/web.webp` },
      { id: "docs", nombre: t("Documentos listos", "Ready documents", "Fertige Dokumente", "Documentos prontos"), corto: t("Documentos", "Documents", "Dokumente", "Documentos"), tipo: "herramienta",
        hace: t(
          "Fichas técnicas y contratos listos para revisar, enviar o firmar.",
          "Product sheets and contracts ready to review, send or sign.",
          "Datenblätter und Verträge, bereit zum Prüfen, Senden oder Unterschreiben.",
          "Fichas técnicas e contratos prontos para rever, enviar ou assinar."),
        con: [] },
    ],
  },
  galeria: {
    titulo: t("La web, el asesor y las herramientas por dentro.", "The website, the advisor and the tools inside.", "Die Website, der Berater und die Werkzeuge von innen.", "O site, o assessor e as ferramentas por dentro."),
    items: [
      { src: `${M}/web.webp`, forma: "web", pie: t("La web pública", "The public website", "Die öffentliche Website", "O site público"), alt: t("La web pública de la plataforma", "The platform's public website", "Die öffentliche Website der Plattform", "O site público da plataforma") },
      { src: `${M}/asesor.webp`, forma: "alta", pie: t("El asesor de compras", "The purchasing advisor", "Der Einkaufsberater", "O assessor de compras"), alt: t("El asesor de compras conversando con un cliente", "The purchasing advisor talking with a client", "Der Einkaufsberater im Gespräch mit einem Kunden", "O assessor de compras a conversar com um cliente") },
      { src: `${M}/ficha.webp`, forma: "alta", posicion: "center 12%", pie: t("La ficha técnica", "The product sheet", "Das Datenblatt", "A ficha técnica"), alt: t("Una ficha técnica generada con datos de ejemplo", "A product sheet generated with sample data", "Ein mit Beispieldaten erstelltes Datenblatt", "Uma ficha técnica gerada com dados de exemplo") },
      { src: `${M}/portal.webp`, forma: "completa", pie: t("El portal de herramientas", "The tools portal", "Das Werkzeugportal", "O portal de ferramentas"), alt: t("El portal de herramientas por dentro", "Inside the tools portal", "Das Werkzeugportal von innen", "O portal de ferramentas por dentro") },
    ],
  },
  cambio: {
    titulo: t("De correos y hojas de cálculo a una sola plataforma.", "From emails and spreadsheets to one platform.", "Von E-Mails und Tabellen zu einer Plattform.", "De emails e folhas de cálculo a uma só plataforma."),
    items: [
      { cifra: "5", negrita: t("Herramientas de IA", "AI tools", "KI-Werkzeuge", "Ferramentas de IA"), texto: t(" en uso real, sobre el ERP de la empresa.", " in real use, on the company's ERP.", " im echten Einsatz, auf dem ERP des Unternehmens.", " em uso real, sobre o ERP da empresa.") },
      { cifra: "1", negrita: t("Lugar", "Place", "Ort", "Lugar"), texto: t(
        " para cotizar, validar proveedores y costear, en vez de correos y hojas de cálculo.",
        " to quote, vet suppliers and cost imports, instead of emails and spreadsheets.",
        " zum Kalkulieren, Prüfen von Lieferanten und Durchrechnen, statt E-Mails und Tabellen.",
        " para orçamentar, validar fornecedores e calcular custos, em vez de emails e folhas de cálculo.") },
      { cifra: t("Semanas", "Weeks", "Wochen", "Semanas"), negrita: t("Del arranque al piloto en uso:", "From kickoff to pilot in use:", "Vom Start bis zum Pilot im Einsatz:", "Do arranque ao piloto em uso:"), texto: t(" semanas, no años.", " weeks, not years.", " Wochen, nicht Jahre.", " semanas, não anos.") },
    ],
  },
  cierre: {
    eyebrow: t("Tu empresa", "Your company", "Dein Unternehmen", "A tua empresa"),
    titulo: t("¿Qué haría tu operación", "What would your operation do", "Was würde dein Betrieb", "O que faria a tua operação"),
    resaltado: t("con una plataforma así?", "with a platform like this?", "mit so einer Plattform machen?", "com uma plataforma assim?"),
    lede: t(
      "Cuéntame cómo trabaja tu equipo hoy y te digo qué conectaría primero.",
      "Tell me how your team works today and I'll tell you what I'd connect first.",
      "Erzähl mir, wie dein Team heute arbeitet, und ich sage dir, was ich zuerst verbinden würde.",
      "Conta-me como trabalha a tua equipa hoje e digo-te o que ligaria primeiro.",
    ),
    enlace: { href: "/#proyectos", texto: t("Ver más proyectos →", "See more projects →", "Mehr Projekte →", "Ver mais projetos →") },
  },
  tarjeta: {
    etiqueta: t("Plataforma con IA para una importadora", "AI platform for an importer", "KI-Plattform für einen Importeur", "Plataforma com IA para uma importadora"),
    imagen: "/v2/portafolio/comercio.jpg",
    inserto: "/v2/portafolio/comercio-i.jpg",
  },
};
