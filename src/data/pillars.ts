import type { LangText } from "@/i18n/types";

/* Páginas pilar SEO/GEO: /shopify y /agentes.
 * Todo el copy vive aquí; el template es src/pages/Pillar.tsx.
 * Regla: sin cifras de precio (PRICING.md es la fuente canónica y cambia). */

export type PillarItem = { title: LangText; body: LangText };
export type PillarStep = { n: string; title: LangText; body: LangText };
export type PillarFaq = { q: LangText; a: LangText };

export type Pillar = {
  slug: "shopify" | "agentes";
  accent: string;
  seoTitle: LangText;
  seoDescription: LangText;
  eyebrow: LangText;
  h1: LangText;
  sub: LangText;
  /** Bloque demo viva (solo agentes): abre el agente de la web. */
  demo?: { heading: LangText; body: LangText; cta: LangText };
  deliverablesHeading: LangText;
  deliverables: PillarItem[];
  caseBlock: {
    eyebrow: LangText;
    heading: LangText;
    body: LangText;
    linkLabel: LangText;
    href: string;
    image: string;
    imageAlt: LangText;
  };
  processHeading: LangText;
  process: PillarStep[];
  faqHeading: LangText;
  faq: PillarFaq[];
  closingHeading: LangText;
  closingSub: LangText;
};

export const PILLARS: Pillar[] = [
  {
    slug: "shopify",
    accent: "#F8B4D9",
    /* 27-sep-2026 · Edgar: que /shopify aparezca a «toda la gente que esté buscando agencias de
     * marketing». Título ≤ 60 y descripción ≤ 160 caracteres (lo protege ShopifyVertical.copy.test.ts). */
    seoTitle: {
      es: "Agencia de marketing para tiendas Shopify | Monza Lab",
      en: "Shopify Marketing Agency for Fashion & Beauty | Monza Lab",
      de: "Shopify-Marketingagentur für Mode & Beauty | Monza Lab",
      pt: "Agência de marketing para lojas Shopify | Monza Lab",
    },
    seoDescription: {
      es: "Conectamos tu tienda Shopify, tu pauta, tu CRM y un asesor de WhatsApp en un solo sistema. Vendes más y lo operas por menos que con una agencia tradicional.",
      en: "We connect your Shopify store, ads, CRM and a WhatsApp advisor into one system. You sell more and run it for less than with a traditional agency.",
      de: "Wir verbinden Shopify-Store, Ads, CRM und einen WhatsApp-Berater zu einem System. Du verkaufst mehr und zahlst weniger als bei einer klassischen Agentur.",
      pt: "Ligamos a tua loja Shopify, os anúncios, o CRM e um assessor de WhatsApp num só sistema. Vendes mais e operas por menos do que com uma agência tradicional.",
    },
    eyebrow: { es: "SHOPIFY CON IA", en: "SHOPIFY WITH AI", de: "SHOPIFY MIT KI", pt: "SHOPIFY COM IA" },
    h1: {
      es: "Tu tienda Shopify, operada con inteligencia artificial.",
      en: "Your Shopify store, operated with artificial intelligence.",
      de: "Dein Shopify-Store, betrieben mit künstlicher Intelligenz.",
      pt: "A tua loja Shopify, operada com inteligência artificial.",
    },
    sub: {
      es: "No una plantilla bonita: un sistema de ventas completo. Tienda, catálogo con fotos editoriales generadas con IA, agente de ventas por WhatsApp y pauta — construido en 12 semanas y operado en loop.",
      en: "Not a pretty template: a complete sales system. Store, AI-photographed editorial catalog, WhatsApp sales agent and paid media — built in 12 weeks and operated in loop.",
      de: "Keine hübsche Vorlage: ein komplettes Verkaufssystem. Store, Editorial-Katalog mit KI-Fotos, WhatsApp-Verkaufsagent und Paid Media — gebaut in 12 Wochen, betrieben im Loop.",
      pt: "Não é um template bonito: é um sistema de vendas completo. Loja, catálogo editorial com fotos de IA, agente de vendas no WhatsApp e paid media — construído em 12 semanas e operado em loop.",
    },
    deliverablesHeading: { es: "Lo que construimos", en: "What we build", de: "Was wir bauen", pt: "O que construímos" },
    deliverables: [
      {
        title: { es: "Tienda Shopify completa", en: "Complete Shopify store", de: "Kompletter Shopify-Store", pt: "Loja Shopify completa" },
        body: {
          es: "Storefront a la medida de tu marca, checkout, pagos y envíos configurados para tu mercado. Lista para vender, no para decorar.",
          en: "Storefront built for your brand, checkout, payments and shipping configured for your market. Built to sell, not to decorate.",
          de: "Storefront für deine Marke, Checkout, Zahlungen und Versand für deinen Markt konfiguriert. Gebaut zum Verkaufen.",
          pt: "Storefront à medida da tua marca, checkout, pagamentos e envios configurados para o teu mercado. Pronta para vender.",
        },
      },
      {
        title: { es: "Catálogo editorial con IA", en: "AI editorial catalog", de: "KI-Editorial-Katalog", pt: "Catálogo editorial com IA" },
        body: {
          es: "Cada producto fotografiado con calidad de revista — sin estudio, sin logística de shooting. Tu catálogo completo puede verse como una campaña.",
          en: "Every product photographed at magazine quality — no studio, no shoot logistics. Your entire catalog can look like a campaign.",
          de: "Jedes Produkt in Magazin-Qualität fotografiert — ohne Studio, ohne Shooting-Logistik. Dein ganzer Katalog wie eine Kampagne.",
          pt: "Cada produto fotografado com qualidade de revista — sem estúdio, sem logística de shooting. O teu catálogo inteiro como uma campanha.",
        },
      },
      {
        title: { es: "Agente de ventas por WhatsApp", en: "WhatsApp sales agent", de: "WhatsApp-Verkaufsagent", pt: "Agente de vendas no WhatsApp" },
        body: {
          es: "Un agente de IA que atiende, asesora y cierra ventas 24/7 con el criterio de tu marca. Tu equipo entra cuando de verdad aporta.",
          en: "An AI agent that serves, advises and closes sales 24/7 with your brand's judgment. Your team steps in when it truly adds value.",
          de: "Ein KI-Agent, der 24/7 berät und verkauft — mit dem Urteil deiner Marke. Dein Team übernimmt, wenn es wirklich zählt.",
          pt: "Um agente de IA que atende, aconselha e fecha vendas 24/7 com o critério da tua marca. A tua equipa entra quando realmente soma.",
        },
      },
      {
        title: { es: "Growth operado", en: "Operated growth", de: "Betriebenes Growth", pt: "Growth operado" },
        body: {
          es: "Pauta en Meta y contenido editorial que sale del mismo sistema. Después del lanzamiento, un motor mensual mantiene la marca corriendo.",
          en: "Meta ads and editorial content from the same system. After launch, a monthly engine keeps the brand running.",
          de: "Meta Ads und Editorial-Content aus demselben System. Nach dem Launch hält ein monatlicher Motor die Marke am Laufen.",
          pt: "Paid media na Meta e conteúdo editorial do mesmo sistema. Depois do lançamento, um motor mensal mantém a marca a correr.",
        },
      },
    ],
    caseBlock: {
      eyebrow: { es: "CASO REAL", en: "REAL CASE", de: "ECHTER CASE", pt: "CASO REAL" },
      heading: {
        es: "Seis marcas, una tienda, un ecosistema vivo.",
        en: "Six brands, one store, one live ecosystem.",
        de: "Sechs Marken, ein Store, ein lebendes Ökosystem.",
        pt: "Seis marcas, uma loja, um ecossistema vivo.",
      },
      body: {
        es: "Para Eleonora Morales — empresaria con 350K seguidores en TikTok — construimos el ecosistema completo: seis sub-marcas en una sola tienda Shopify, catálogo fotografiado con IA, agente de ventas por WhatsApp y pauta sobre contenido editorial.",
        en: "For Eleonora Morales — entrepreneur with 350K TikTok followers — we built the complete ecosystem: six sub-brands in one Shopify store, AI-photographed catalog, WhatsApp sales agent and paid media on editorial content.",
        de: "Für Eleonora Morales — Unternehmerin mit 350K TikTok-Followern — bauten wir das komplette Ökosystem: sechs Sub-Marken in einem Shopify-Store, KI-fotografierter Katalog, WhatsApp-Verkaufsagent und Paid Media.",
        pt: "Para Eleonora Morales — empresária com 350K seguidores no TikTok — construímos o ecossistema completo: seis sub-marcas numa só loja Shopify, catálogo fotografado com IA, agente de vendas no WhatsApp e paid media.",
      },
      linkLabel: { es: "Ver el caso completo", en: "View the full case", de: "Ganzen Case ansehen", pt: "Ver o caso completo" },
      href: "/work/eleonora-morales",
      image: "/images/brands/eleonora/eleonora-portrait.jpg",
      imageAlt: {
        es: "Eleonora Morales — caso Shopify con IA de Monza Lab",
        en: "Eleonora Morales — Monza Lab Shopify with AI case",
        de: "Eleonora Morales — Monza Lab Shopify-mit-KI-Case",
        pt: "Eleonora Morales — caso Shopify com IA da Monza Lab",
      },
    },
    processHeading: { es: "Cómo funciona", en: "How it works", de: "So funktioniert es", pt: "Como funciona" },
    process: [
      {
        n: "01",
        title: { es: "Criterio", en: "Judgment", de: "Kriterium", pt: "Critério" },
        body: {
          es: "Qué vendes, a quién y cómo se ve tu marca al nivel que merece. Estrategia y sistema visual antes de una sola línea de código.",
          en: "What you sell, to whom, and how your brand looks at the level it deserves. Strategy and visual system before a single line of code.",
          de: "Was du verkaufst, an wen, und wie deine Marke aussieht. Strategie und visuelles System vor der ersten Zeile Code.",
          pt: "O que vendes, a quem e como a tua marca se apresenta. Estratégia e sistema visual antes de uma linha de código.",
        },
      },
      {
        n: "02",
        title: { es: "Build", en: "Build", de: "Build", pt: "Build" },
        body: {
          es: "Tienda, catálogo con IA y agente de ventas — construidos en paralelo, con revisiones tuyas cada semana.",
          en: "Store, AI catalog and sales agent — built in parallel, with your reviews every week.",
          de: "Store, KI-Katalog und Verkaufsagent — parallel gebaut, mit deinen Reviews jede Woche.",
          pt: "Loja, catálogo com IA e agente de vendas — construídos em paralelo, com as tuas revisões semanais.",
        },
      },
      {
        n: "03",
        title: { es: "Lanzamiento", en: "Launch", de: "Launch", pt: "Lançamento" },
        body: {
          es: "Sales al aire vendiendo: pauta encendida, contenido editorial corriendo, agente atendiendo. Semana 12.",
          en: "You go live selling: ads on, editorial content running, agent serving. Week 12.",
          de: "Du gehst live und verkaufst: Ads an, Content läuft, Agent bedient. Woche 12.",
          pt: "Entras no ar a vender: ads ligados, conteúdo a correr, agente a atender. Semana 12.",
        },
      },
      {
        n: "04",
        title: { es: "Motor mensual", en: "Monthly engine", de: "Monatlicher Motor", pt: "Motor mensal" },
        body: {
          es: "La tienda no se entrega y se abandona: contenido, agentes y pauta operados mes a mes, con data.",
          en: "The store isn't delivered and abandoned: content, agents and ads operated month by month, with data.",
          de: "Der Store wird nicht abgegeben und vergessen: Content, Agenten und Ads laufen Monat für Monat, mit Daten.",
          pt: "A loja não é entregue e abandonada: conteúdo, agentes e ads operados mês a mês, com dados.",
        },
      },
    ],
    faqHeading: { es: "Preguntas frecuentes", en: "Frequently asked questions", de: "Häufige Fragen", pt: "Perguntas frequentes" },
    /* Las preguntas que hace quien busca una agencia de marketing, contestadas con lo que gana la
     * tienda (Edgar, 26-sep: «muy orientados a los beneficios»). La primera frase de cada respuesta
     * contesta sola: es la que citan Google y los asistentes. Sin cifras de precio (PRICING.md manda):
     * «varios miles de dólares» es la misma referencia que ya publicaba esta página. */
    faq: [
      {
        q: {
          es: "¿Qué hace una agencia de marketing para tiendas Shopify?",
          en: "What does a Shopify marketing agency do?",
          de: "Was macht eine Marketingagentur für Shopify-Stores?",
          pt: "O que faz uma agência de marketing para lojas Shopify?",
        },
        a: {
          es: "Hace que la tienda venda más. En Monza Lab eso quiere decir conectar todo lo que mueve una venta: tu tienda Shopify, la pauta en Meta y Google, tu base de clientas, el catálogo y un asesor de WhatsApp que contesta a cualquier hora. Lo operamos como un solo sistema, mes a mes, y respondemos por el resultado.",
          en: "It makes the store sell more. At Monza Lab that means connecting everything that moves a sale: your Shopify store, ads on Meta and Google, your customer base, the catalog and a WhatsApp advisor that answers at any hour. We run it as one system, month to month, and we answer for the result.",
          de: "Sie sorgt dafür, dass der Store mehr verkauft. Bei Monza Lab heißt das: alles verbinden, was einen Verkauf bewegt, also deinen Shopify-Store, die Ads auf Meta und Google, deine Kundenbasis, den Katalog und einen WhatsApp-Berater, der zu jeder Uhrzeit antwortet. Wir betreiben das als ein System, Monat für Monat, und stehen für das Ergebnis gerade.",
          pt: "Faz a loja vender mais. Na Monza Lab, isso quer dizer ligar tudo o que move uma venda: a tua loja Shopify, os anúncios na Meta e no Google, a tua base de clientes, o catálogo e um assessor de WhatsApp que responde a qualquer hora. Operamos tudo como um só sistema, mês a mês, e respondemos pelo resultado.",
        },
      },
      {
        q: {
          es: "¿En qué se diferencia de una agencia de marketing tradicional?",
          en: "How is it different from a traditional marketing agency?",
          de: "Was ist anders als bei einer klassischen Marketingagentur?",
          pt: "Em que é diferente de uma agência de marketing tradicional?",
        },
        a: {
          es: "En que todo trabaja conectado. Una agencia tradicional suele entregar por separado los posts, las campañas y los informes. Aquí tu tienda, tu pauta, tus clientas y tu WhatsApp se hablan entre sí, y los agentes hacen el trabajo que antes pedía un equipo de cuatro o cinco personas. Por eso vendes más y lo operas por menos.",
          en: "Everything works connected. A traditional agency usually delivers posts, campaigns and reports separately. Here your store, your ads, your customers and your WhatsApp talk to each other, and the agents do the work that used to take a team of four or five people. That's why you sell more and it costs less to run.",
          de: "Alles arbeitet verbunden. Eine klassische Agentur liefert Posts, Kampagnen und Reports meist getrennt. Hier sprechen Store, Ads, Kundinnen und WhatsApp miteinander, und die Agenten erledigen die Arbeit, für die früher ein Team von vier oder fünf Leuten nötig war. Deshalb verkaufst du mehr und zahlst weniger für den Betrieb.",
          pt: "Em que tudo trabalha ligado. Uma agência tradicional costuma entregar em separado os posts, as campanhas e os relatórios. Aqui a tua loja, os teus anúncios, as tuas clientes e o teu WhatsApp falam entre si, e os agentes fazem o trabalho que antes pedia uma equipa de quatro ou cinco pessoas. Por isso vendes mais e operas por menos.",
        },
      },
      {
        q: {
          es: "¿Cuánto cuesta una agencia de marketing para Shopify?",
          en: "How much does a Shopify marketing agency cost?",
          de: "Was kostet eine Marketingagentur für Shopify?",
          pt: "Quanto custa uma agência de marketing para Shopify?",
        },
        a: {
          es: "Depende de lo que haya que conectar: cuántos productos tienes, en qué mercados vendes y qué ya funciona. Hay un montaje con fecha de entrega y después una operación mes a mes, sin permanencia, con una parte atada a lo que vende el sistema. Como referencia, los proyectos arrancan en varios miles de dólares; el número lo cierras con Edgar después de ver tu tienda.",
          en: "It depends on what needs connecting: how many products you have, which markets you sell in and what already works. There's a build with a delivery date, then month-to-month operation with no lock-in, with part of the fee tied to what the system sells. As a reference, projects start in the thousands of dollars; you settle the number with Edgar after we see your store.",
          de: "Das hängt davon ab, was verbunden werden muss: wie viele Produkte du hast, in welchen Märkten du verkaufst und was schon funktioniert. Es gibt einen Aufbau mit festem Liefertermin und danach den Betrieb Monat für Monat, ohne Mindestlaufzeit, mit einem Teil, der an die Verkäufe des Systems gekoppelt ist. Als Richtwert starten Projekte bei einigen tausend Dollar; die genaue Zahl klärst du mit Edgar, nachdem wir deinen Store gesehen haben.",
          pt: "Depende do que for preciso ligar: quantos produtos tens, em que mercados vendes e o que já funciona. Há uma montagem com data de entrega e depois uma operação mês a mês, sem fidelização, com uma parte ligada ao que o sistema vende. Como referência, os projetos começam em vários milhares de dólares; o número fechas com o Edgar depois de vermos a tua loja.",
        },
      },
      {
        q: {
          es: "¿Cuánto tarda en estar funcionando?",
          en: "How long until it's up and running?",
          de: "Wie lange dauert es, bis alles läuft?",
          pt: "Quanto tempo demora até estar a funcionar?",
        },
        a: {
          es: "El montaje completo toma doce semanas y tiene fecha de entrega desde el primer día. Empezamos por el asesor de WhatsApp y tu base de clientas, que son lo que antes devuelve la inversión; después vienen la tienda, el catálogo y la pauta.",
          en: "The full build takes twelve weeks and has a delivery date from day one. We start with the WhatsApp advisor and your customer base, which pay back fastest; then come the store, the catalog and the ads.",
          de: "Der komplette Aufbau dauert zwölf Wochen und hat vom ersten Tag an einen Liefertermin. Wir beginnen mit dem WhatsApp-Berater und deiner Kundenbasis, weil sie sich am schnellsten auszahlen; danach kommen Store, Katalog und Ads.",
          pt: "A montagem completa leva doze semanas e tem data de entrega desde o primeiro dia. Começamos pelo assessor de WhatsApp e pela tua base de clientes, que são o que primeiro devolve o investimento; depois vêm a loja, o catálogo e os anúncios.",
        },
      },
      {
        q: {
          es: "¿Pueden atender a mis clientas por WhatsApp a cualquier hora?",
          en: "Can you answer my customers on WhatsApp at any hour?",
          de: "Könnt ihr meine Kundinnen zu jeder Uhrzeit per WhatsApp betreuen?",
          pt: "Podem atender as minhas clientes no WhatsApp a qualquer hora?",
        },
        a: {
          es: "Sí. El asesor contesta con la voz de tu marca, resuelve la talla, arma el carrito y cierra la venta, también de madrugada. Lee tu inventario en vivo, así que nunca vende lo que no tienes. Después de la compra sigue con el pedido, el envío y los cambios. Cuando una conversación necesita a una persona, la toma tu equipo.",
          en: "Yes. The advisor answers in your brand's voice, sorts out the size, builds the cart and closes the sale, even at dawn. It reads your live inventory, so it never sells what you don't have. After the purchase it follows up on the order, shipping and exchanges. When a conversation needs a person, your team takes it.",
          de: "Ja. Der Berater antwortet in der Stimme deiner Marke, klärt die Größe, baut den Warenkorb und schließt den Verkauf ab, auch mitten in der Nacht. Er liest dein Lager live und verkauft nie, was du nicht hast. Nach dem Kauf kümmert er sich um Bestellung, Versand und Umtausch. Braucht ein Gespräch einen Menschen, übernimmt dein Team.",
          pt: "Sim. O assessor responde com a voz da tua marca, resolve o tamanho, monta o carrinho e fecha a venda, até de madrugada. Lê o teu inventário em tempo real, por isso nunca vende o que não tens. Depois da compra, acompanha a encomenda, o envio e as trocas. Quando uma conversa precisa de uma pessoa, a tua equipa assume-a.",
        },
      },
      {
        q: {
          es: "¿Necesito tener mi tienda en Shopify?",
          en: "Do I need my store on Shopify?",
          de: "Muss mein Store auf Shopify laufen?",
          pt: "Preciso de ter a loja na Shopify?",
        },
        a: {
          es: "Trabajamos sobre Shopify. Si ya vendes ahí, conectamos lo que tienes sin tocar tus pedidos, tu inventario ni tus pagos. Si todavía no, montamos la tienda como parte del sistema.",
          en: "We work on Shopify. If you already sell there, we connect what you have without touching your orders, inventory or payments. If not yet, we build the store as part of the system.",
          de: "Wir arbeiten mit Shopify. Wenn du dort schon verkaufst, verbinden wir, was du hast, ohne Bestellungen, Lager oder Zahlungen anzufassen. Wenn noch nicht, bauen wir den Store als Teil des Systems.",
          pt: "Trabalhamos sobre a Shopify. Se já vendes lá, ligamos o que tens sem mexer nas encomendas, no inventário nem nos pagamentos. Se ainda não, montamos a loja como parte do sistema.",
        },
      },
      {
        q: {
          es: "¿Trabajan con marcas fuera de Colombia?",
          en: "Do you work with brands outside Colombia?",
          de: "Arbeitet ihr mit Marken außerhalb Kolumbiens?",
          pt: "Trabalham com marcas fora da Colômbia?",
        },
        a: {
          es: "Sí. Tenemos clientes en Colombia, España, Portugal, Alemania y Estados Unidos, y el sistema funciona igual en cualquier mercado. Esta web está en cuatro idiomas.",
          en: "Yes. We have clients in Colombia, Spain, Portugal, Germany and the United States, and the system works the same in any market. This site runs in four languages.",
          de: "Ja. Wir haben Kunden in Kolumbien, Spanien, Portugal, Deutschland und den USA, und das System funktioniert in jedem Markt gleich. Diese Website läuft in vier Sprachen.",
          pt: "Sim. Temos clientes na Colômbia, Espanha, Portugal, Alemanha e Estados Unidos, e o sistema funciona igual em qualquer mercado. Este site está em quatro línguas.",
        },
      },
      {
        q: {
          es: "¿Usan inteligencia artificial?",
          en: "Do you use artificial intelligence?",
          de: "Nutzt ihr künstliche Intelligenz?",
          pt: "Usam inteligência artificial?",
        },
        a: {
          es: "Sí, donde abarata y acelera: el asesor de WhatsApp, las fotos del catálogo y la lectura diaria de la pauta. Lo que te llevas es el resultado, no la herramienta: las decisiones de marca y de presupuesto las revisa una persona, y la última la toma Edgar.",
          en: "Yes, where it makes things cheaper and faster: the WhatsApp advisor, the catalog photos and the daily read of the ads. What you get is the result, not the tool: brand and budget decisions are reviewed by a person, and Edgar makes the final call.",
          de: "Ja, dort, wo sie günstiger und schneller macht: beim WhatsApp-Berater, bei den Katalogfotos und beim täglichen Blick auf die Ads. Was du bekommst, ist das Ergebnis, nicht das Werkzeug: Entscheidungen über Marke und Budget prüft ein Mensch, und die letzte trifft Edgar.",
          pt: "Sim, onde torna tudo mais barato e mais rápido: o assessor de WhatsApp, as fotos do catálogo e a leitura diária dos anúncios. O que levas é o resultado, não a ferramenta: as decisões de marca e de orçamento são revistas por uma pessoa, e a última é do Edgar.",
        },
      },
    ],
    closingHeading: {
      es: "Tu marca puede vender así.",
      en: "Your brand can sell like this.",
      de: "Deine Marke kann so verkaufen.",
      pt: "A tua marca pode vender assim.",
    },
    closingSub: {
      es: "Cuéntale al agente qué vendes y te decimos cómo se vería tu tienda operada con IA.",
      en: "Tell the agent what you sell and we'll tell you what your AI-operated store would look like.",
      de: "Erzähl dem Agenten, was du verkaufst, und wir sagen dir, wie dein KI-betriebener Store aussähe.",
      pt: "Conta ao agente o que vendes e dizemos-te como seria a tua loja operada com IA.",
    },
  },
  {
    slug: "agentes",
    accent: "#7DD3C0",
    seoTitle: {
      es: "Agentes de IA para empresas — Monza Lab · Ventas por WhatsApp, ERP y operación",
      en: "AI Agents for business — Monza Lab · WhatsApp sales, ERP and operations",
      de: "KI-Agenten für Unternehmen — Monza Lab · WhatsApp-Vertrieb, ERP und Betrieb",
      pt: "Agentes de IA para empresas — Monza Lab · Vendas no WhatsApp, ERP e operação",
    },
    seoDescription: {
      es: "Construimos agentes de IA que venden y operan: agentes de ventas por WhatsApp, asesores sobre tu ERP o catálogo real y agentes de pauta. Habla con nuestra demo viva. Prototipo en semanas.",
      en: "We build AI agents that sell and operate: WhatsApp sales agents, advisors on your live ERP or catalog, and paid-media agents. Talk to our live demo. Prototype in weeks.",
      de: "Wir bauen KI-Agenten, die verkaufen und arbeiten: WhatsApp-Verkaufsagenten, Berater auf deinem ERP und Paid-Media-Agenten. Sprich mit unserer Live-Demo.",
      pt: "Construímos agentes de IA que vendem e operam: agentes de vendas no WhatsApp, assessores sobre o teu ERP real e agentes de paid media. Fala com a nossa demo viva.",
    },
    eyebrow: { es: "AGENTES DE IA", en: "AI AGENTS", de: "KI-AGENTEN", pt: "AGENTES DE IA" },
    h1: {
      es: "Agentes de IA que venden y operan. No chatbots.",
      en: "AI agents that sell and operate. Not chatbots.",
      de: "KI-Agenten, die verkaufen und arbeiten. Keine Chatbots.",
      pt: "Agentes de IA que vendem e operam. Não são chatbots.",
    },
    sub: {
      es: "Un chatbot responde preguntas. Un agente trabaja: vende por WhatsApp, asesora a tus clientes sobre tu data real y opera procesos de tu empresa. Construimos agentes que se ganan su puesto.",
      en: "A chatbot answers questions. An agent works: it sells on WhatsApp, advises your customers on your real data and runs processes in your company. We build agents that earn their seat.",
      de: "Ein Chatbot beantwortet Fragen. Ein Agent arbeitet: verkauft über WhatsApp, berät deine Kunden auf deinen echten Daten und betreibt Prozesse. Wir bauen Agenten, die sich ihren Platz verdienen.",
      pt: "Um chatbot responde a perguntas. Um agente trabalha: vende no WhatsApp, aconselha os teus clientes sobre os teus dados reais e opera processos. Construímos agentes que merecem o seu lugar.",
    },
    demo: {
      heading: {
        es: "¿Quieres saber qué es un agente? Habla con uno.",
        en: "Want to know what an agent is? Talk to one.",
        de: "Willst du wissen, was ein Agent ist? Sprich mit einem.",
        pt: "Queres saber o que é um agente? Fala com um.",
      },
      body: {
        es: "El agente de esta página lo construimos nosotros: entiende tu caso, te muestra evidencia real y agenda con Edgar. No te lo contamos — pruébalo.",
        en: "We built the agent on this page: it understands your case, shows you real evidence and books time with Edgar. We won't just tell you — try it.",
        de: "Den Agenten auf dieser Seite haben wir gebaut: Er versteht deinen Fall, zeigt echte Evidenz und bucht Zeit mit Edgar. Probier ihn aus.",
        pt: "O agente desta página fomos nós que o construímos: entende o teu caso, mostra evidência real e agenda com o Edgar. Experimenta-o.",
      },
      cta: { es: "Hablar con el agente", en: "Talk to the agent", de: "Mit dem Agenten sprechen", pt: "Falar com o agente" },
    },
    deliverablesHeading: { es: "Agentes que construimos", en: "Agents we build", de: "Agenten, die wir bauen", pt: "Agentes que construímos" },
    deliverables: [
      {
        title: { es: "Agente de ventas por WhatsApp", en: "WhatsApp sales agent", de: "WhatsApp-Verkaufsagent", pt: "Agente de vendas no WhatsApp" },
        body: {
          es: "Atiende, asesora y cierra donde tus clientes ya están. Conoce tu catálogo, habla con la voz de tu marca y escala a tu equipo cuando toca.",
          en: "Serves, advises and closes where your customers already are. It knows your catalog, speaks in your brand's voice and escalates to your team when it should.",
          de: "Bedient, berät und schließt ab, wo deine Kunden schon sind. Kennt deinen Katalog, spricht mit deiner Markenstimme.",
          pt: "Atende, aconselha e fecha onde os teus clientes já estão. Conhece o teu catálogo e fala com a voz da tua marca.",
        },
      },
      {
        title: { es: "Asesor sobre tu data real", en: "Advisor on your real data", de: "Berater auf deinen echten Daten", pt: "Assessor sobre os teus dados reais" },
        body: {
          es: "Un agente conectado a tu ERP o catálogo que asesora a clientes y equipo: fichas técnicas automáticas, comparación de proveedores, costeos. Sobre tu operación viva, no demos.",
          en: "An agent connected to your ERP or catalog that advises customers and your team: automatic spec sheets, supplier comparison, costing. On your live operation, not demos.",
          de: "Ein Agent an deinem ERP oder Katalog, der Kunden und Team berät: automatische Datenblätter, Lieferantenvergleich, Kalkulation. Auf deinem echten Betrieb.",
          pt: "Um agente ligado ao teu ERP ou catálogo que aconselha clientes e equipa: fichas técnicas automáticas, comparação de fornecedores, custeios. Sobre a tua operação viva.",
        },
      },
      {
        title: { es: "Agentes de operación", en: "Operations agents", de: "Betriebs-Agenten", pt: "Agentes de operação" },
        body: {
          es: "Generación de contratos, costeo de importaciones, coach del pipeline comercial: el trabajo repetitivo de tu operación, hecho con criterio y sin cansancio.",
          en: "Contract generation, import costing, sales-pipeline coaching: the repetitive work of your operation, done with judgment and without fatigue.",
          de: "Vertragserstellung, Importkalkulation, Pipeline-Coaching: die repetitive Arbeit deines Betriebs, mit Urteil und ohne Ermüdung.",
          pt: "Geração de contratos, custeio de importações, coach do pipeline comercial: o trabalho repetitivo da tua operação, feito com critério.",
        },
      },
      {
        title: { es: "Agentes de growth", en: "Growth agents", de: "Growth-Agenten", pt: "Agentes de growth" },
        body: {
          es: "Pauta en Meta y contenido operados con IA: análisis, decisiones y reporting que normalmente consumen a un equipo entero.",
          en: "Meta ads and content operated with AI: analysis, decisions and reporting that normally consume an entire team.",
          de: "Meta Ads und Content mit KI betrieben: Analyse, Entscheidungen und Reporting, die sonst ein ganzes Team binden.",
          pt: "Paid media na Meta e conteúdo operados com IA: análise, decisões e reporting que normalmente consomem uma equipa inteira.",
        },
      },
    ],
    caseBlock: {
      eyebrow: { es: "CASO REAL", en: "REAL CASE", de: "ECHTER CASE", pt: "CASO REAL" },
      heading: {
        es: "Cinco agentes sobre el ERP vivo de una importadora.",
        en: "Five agents on an importer's live ERP.",
        de: "Fünf Agenten auf dem laufenden ERP eines Importeurs.",
        pt: "Cinco agentes sobre o ERP vivo de uma importadora.",
      },
      body: {
        es: "Para una importadora con operación en Colombia, Panamá y Estados Unidos construimos una plataforma con cinco herramientas de IA sobre su ERP real: ficha técnica automática, comparador de proveedores, generador de contratos, costeo DDP y coach del pipeline. Del kickoff al piloto en uso: semanas. El proyecto está en confidencialidad — el caso completo, sin nombres, está publicado.",
        en: "For an importer operating across Colombia, Panama and the US we built a platform with five AI tools on their live ERP: automatic spec sheets, supplier comparison, contract generation, DDP costing and a pipeline coach. Kickoff to pilot in use: weeks. The project is under NDA — the full case, without names, is published.",
        de: "Für einen Importeur mit Betrieb in Kolumbien, Panama und den USA bauten wir eine Plattform mit fünf KI-Tools auf dem echten ERP: automatische Datenblätter, Lieferantenvergleich, Vertragsgenerator, DDP-Kalkulation und Pipeline-Coach. Vom Kickoff zum genutzten Piloten: Wochen.",
        pt: "Para uma importadora com operação na Colômbia, Panamá e EUA construímos uma plataforma com cinco ferramentas de IA sobre o ERP real: ficha técnica automática, comparação de fornecedores, gerador de contratos, custeio DDP e coach do pipeline. Do kickoff ao piloto em uso: semanas.",
      },
      linkLabel: { es: "Ver el caso completo", en: "View the full case", de: "Ganzen Case ansehen", pt: "Ver o caso completo" },
      href: "/work/plataforma-comercio-exterior",
      image: "/images/projects/plataforma-comercio-exterior/portal-herramientas.png",
      imageAlt: {
        es: "Portal de herramientas de IA sobre ERP — caso de Monza Lab",
        en: "AI tools portal on a live ERP — Monza Lab case",
        de: "KI-Tool-Portal auf einem ERP — Monza Lab Case",
        pt: "Portal de ferramentas de IA sobre ERP — caso da Monza Lab",
      },
    },
    processHeading: { es: "Cómo funciona", en: "How it works", de: "So funktioniert es", pt: "Como funciona" },
    process: [
      {
        n: "01",
        title: { es: "Mapear", en: "Map", de: "Mappen", pt: "Mapear" },
        body: {
          es: "Qué proceso duele, qué data existe y dónde un agente paga su puesto desde el primer mes.",
          en: "Which process hurts, what data exists and where an agent pays for its seat from month one.",
          de: "Welcher Prozess schmerzt, welche Daten existieren und wo ein Agent sich ab Monat eins bezahlt macht.",
          pt: "Que processo dói, que dados existem e onde um agente paga o seu lugar desde o primeiro mês.",
        },
      },
      {
        n: "02",
        title: { es: "Prototipo", en: "Prototype", de: "Prototyp", pt: "Protótipo" },
        body: {
          es: "En semanas, sobre tu data real — no un demo con datos inventados. Ver para creer.",
          en: "In weeks, on your real data — not a demo with made-up numbers. Seeing is believing.",
          de: "In Wochen, auf deinen echten Daten — keine Demo mit erfundenen Zahlen.",
          pt: "Em semanas, sobre os teus dados reais — não uma demo com dados inventados.",
        },
      },
      {
        n: "03",
        title: { es: "Piloto", en: "Pilot", de: "Pilot", pt: "Piloto" },
        body: {
          es: "Tu equipo lo usa en la operación real. Se afina con el uso, no en un documento.",
          en: "Your team uses it in the real operation. It's tuned by usage, not in a document.",
          de: "Dein Team nutzt ihn im echten Betrieb. Er wird durch Nutzung geschärft, nicht im Dokument.",
          pt: "A tua equipa usa-o na operação real. Afina-se com o uso, não num documento.",
        },
      },
      {
        n: "04",
        title: { es: "Operación", en: "Operation", de: "Betrieb", pt: "Operação" },
        body: {
          es: "El agente queda trabajando — y aprendiendo — como parte de tu empresa. Con guardas claras sobre qué puede y qué no.",
          en: "The agent stays working — and learning — as part of your company. With clear guardrails on what it can and cannot do.",
          de: "Der Agent bleibt arbeiten — und lernen — als Teil deines Unternehmens. Mit klaren Leitplanken.",
          pt: "O agente fica a trabalhar — e a aprender — como parte da tua empresa. Com guardas claras.",
        },
      },
    ],
    faqHeading: { es: "Preguntas frecuentes", en: "Frequently asked questions", de: "Häufige Fragen", pt: "Perguntas frequentes" },
    faq: [
      {
        q: { es: "¿Qué es un agente de IA y en qué se diferencia de un chatbot?", en: "What is an AI agent and how is it different from a chatbot?", de: "Was ist ein KI-Agent und was unterscheidet ihn von einem Chatbot?", pt: "O que é um agente de IA e em que difere de um chatbot?" },
        a: {
          es: "Un chatbot sigue un guion. Un agente entiende el contexto, usa herramientas (tu catálogo, tu ERP, WhatsApp, tu agenda) y ejecuta trabajo de verdad: cotiza, compara, genera documentos, agenda, vende. La diferencia práctica: el chatbot te ahorra preguntas; el agente te produce resultados.",
          en: "A chatbot follows a script. An agent understands context, uses tools (your catalog, your ERP, WhatsApp, your calendar) and executes real work: it quotes, compares, generates documents, schedules, sells. The practical difference: a chatbot saves you questions; an agent produces results.",
          de: "Ein Chatbot folgt einem Skript. Ein Agent versteht Kontext, nutzt Werkzeuge (Katalog, ERP, WhatsApp, Kalender) und erledigt echte Arbeit: kalkuliert, vergleicht, erstellt Dokumente, verkauft. Der Unterschied: Ein Chatbot spart Fragen; ein Agent produziert Ergebnisse.",
          pt: "Um chatbot segue um guião. Um agente entende o contexto, usa ferramentas (o teu catálogo, o teu ERP, WhatsApp, a tua agenda) e executa trabalho real: cota, compara, gera documentos, agenda, vende. Na prática: o chatbot poupa perguntas; o agente produz resultados.",
        },
      },
      {
        q: { es: "¿Un agente puede trabajar con los datos de mi empresa (ERP, CRM, catálogo)?", en: "Can an agent work with my company's data (ERP, CRM, catalog)?", de: "Kann ein Agent mit den Daten meines Unternehmens arbeiten (ERP, CRM, Katalog)?", pt: "Um agente pode trabalhar com os dados da minha empresa (ERP, CRM, catálogo)?" },
        a: {
          es: "Sí — ahí es donde un agente vale de verdad. Hemos construido agentes que operan sobre el ERP vivo de una importadora: leen su catálogo real, comparan sus proveedores reales y costean sus importaciones reales. El agente se conecta con acceso mínimo (solo lectura donde se puede) y guardas claras.",
          en: "Yes — that's where an agent is truly worth it. We've built agents operating on an importer's live ERP: they read the real catalog, compare the real suppliers and cost the real imports. The agent connects with minimal access (read-only where possible) and clear guardrails.",
          de: "Ja — genau da lohnt sich ein Agent wirklich. Wir haben Agenten gebaut, die auf dem laufenden ERP eines Importeurs arbeiten: echter Katalog, echte Lieferanten, echte Kalkulationen. Mit minimalem Zugriff und klaren Leitplanken.",
          pt: "Sim — é aí que um agente vale mesmo. Construímos agentes que operam sobre o ERP vivo de uma importadora: leem o catálogo real, comparam fornecedores reais e custeiam importações reais. Com acesso mínimo e guardas claras.",
        },
      },
      {
        q: { es: "¿Cuánto cuesta un agente de IA?", en: "How much does an AI agent cost?", de: "Was kostet ein KI-Agent?", pt: "Quanto custa um agente de IA?" },
        a: {
          es: "Depende de qué trabajo hace y a qué se conecta. Los proyectos serios arrancan en varios miles de dólares; el número fino se cierra con Edgar según el alcance. La pregunta útil es al revés: ¿cuánto te cuesta hoy el proceso que el agente haría?",
          en: "It depends on what work it does and what it connects to. Serious projects start in the thousands of dollars; the exact number is closed with Edgar based on scope. The useful question is the reverse: what does the process the agent would do cost you today?",
          de: "Das hängt davon ab, welche Arbeit er macht und womit er verbunden ist. Ernsthafte Projekte starten bei mehreren tausend Dollar. Die nützliche Frage ist umgekehrt: Was kostet dich der Prozess heute?",
          pt: "Depende do trabalho que faz e ao que se liga. Projetos sérios começam em vários milhares de dólares; o número exato fecha-se com o Edgar. A pergunta útil é ao contrário: quanto te custa hoje o processo que o agente faria?",
        },
      },
      {
        q: { es: "¿Cuánto tarda en estar funcionando?", en: "How long until it's working?", de: "Wie lange bis er läuft?", pt: "Quanto tempo até estar a funcionar?" },
        a: {
          es: "Prototipo sobre tu data real en semanas, no meses. Piloto con tu equipo justo después. Nuestros propios casos pasaron de kickoff a piloto en uso en menos de dos meses.",
          en: "Prototype on your real data in weeks, not months. Pilot with your team right after. Our own cases went from kickoff to pilot-in-use in under two months.",
          de: "Prototyp auf deinen echten Daten in Wochen, nicht Monaten. Pilot direkt danach. Unsere eigenen Cases: vom Kickoff zum genutzten Piloten in unter zwei Monaten.",
          pt: "Protótipo sobre os teus dados reais em semanas, não meses. Piloto logo depois. Os nossos casos passaram do kickoff ao piloto em uso em menos de dois meses.",
        },
      },
      {
        q: { es: "¿Qué pasa con la confidencialidad de mi información?", en: "What about the confidentiality of my information?", de: "Was ist mit der Vertraulichkeit meiner Daten?", pt: "E a confidencialidade da minha informação?" },
        a: {
          es: "Tu data no sale de tu operación: accesos mínimos, solo lectura donde aplica y guardas explícitas sobre lo que el agente puede decir. Así tratamos a nuestros clientes: nuestros casos de plataforma se publican bajo NDA, sin nombres — puedes verlos en la página de casos.",
          en: "Your data doesn't leave your operation: minimal access, read-only where applicable and explicit guardrails on what the agent can say. That's how we treat our clients: our platform cases are published under NDA, without names — you can see them on the work page.",
          de: "Deine Daten verlassen deinen Betrieb nicht: minimaler Zugriff, Read-only wo möglich, explizite Leitplanken. So behandeln wir Kunden: unsere Cases erscheinen unter NDA, ohne Namen.",
          pt: "Os teus dados não saem da tua operação: acessos mínimos, só leitura onde aplica e guardas explícitas. É assim que tratamos os clientes: os nossos casos publicam-se sob NDA, sem nomes.",
        },
      },
      {
        q: { es: "¿Sirve para mi industria?", en: "Does it work for my industry?", de: "Funktioniert das für meine Branche?", pt: "Serve para a minha indústria?" },
        a: {
          es: "Hemos construido agentes para comercio exterior, moda, turismo y ventas B2C — y la respuesta corta es: si tu operación tiene procesos repetitivos con data, hay un agente que paga su puesto. La forma más rápida de saberlo: cuéntale tu caso al agente de esta página.",
          en: "We've built agents for foreign trade, fashion, travel and B2C sales — and the short answer is: if your operation has repetitive processes with data, there's an agent that pays for its seat. The fastest way to know: tell your case to the agent on this page.",
          de: "Wir haben Agenten für Außenhandel, Mode, Tourismus und B2C-Vertrieb gebaut. Kurz: Wenn dein Betrieb repetitive Prozesse mit Daten hat, gibt es einen Agenten, der sich bezahlt macht. Am schnellsten: Erzähl deinen Fall dem Agenten dieser Seite.",
          pt: "Construímos agentes para comércio exterior, moda, turismo e vendas B2C. Resposta curta: se a tua operação tem processos repetitivos com dados, há um agente que paga o seu lugar. Conta o teu caso ao agente desta página.",
        },
      },
    ],
    closingHeading: {
      es: "¿Qué haría un agente en tu empresa?",
      en: "What would an agent do in your company?",
      de: "Was würde ein Agent in deinem Unternehmen tun?",
      pt: "O que faria um agente na tua empresa?",
    },
    closingSub: {
      es: "Pregúntaselo a uno. El de esta página está en línea.",
      en: "Ask one. The one on this page is online.",
      de: "Frag einen. Der auf dieser Seite ist online.",
      pt: "Pergunta a um. O desta página está online.",
    },
  },
];

export const getPillarBySlug = (slug: string): Pillar | undefined =>
  PILLARS.find((p) => p.slug === slug);
