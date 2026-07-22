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
    seoTitle: {
      es: "Tiendas Shopify con IA — Monza Lab · Agencia Shopify Colombia y LATAM",
      en: "Shopify Stores with AI — Monza Lab · AI-first Shopify agency",
      de: "Shopify-Stores mit KI — Monza Lab · AI-first Shopify-Agentur",
      pt: "Lojas Shopify com IA — Monza Lab · Agência Shopify com IA",
    },
    seoDescription: {
      es: "Construimos tu tienda Shopify operada con IA: catálogo con fotos editoriales generadas con IA, agente de ventas por WhatsApp y pauta. De la idea a vender en 12 semanas. Colombia, España, Europa y USA.",
      en: "We build your Shopify store operated with AI: AI-photographed editorial catalog, WhatsApp sales agent and paid media. From idea to selling in 12 weeks. LATAM, Spain, Europe and the US.",
      de: "Wir bauen deinen Shopify-Store, betrieben mit KI: Editorial-Katalog mit KI-Fotos, WhatsApp-Verkaufsagent und Paid Media. Von der Idee zum Verkauf in 12 Wochen.",
      pt: "Construímos a tua loja Shopify operada com IA: catálogo editorial com fotos de IA, agente de vendas no WhatsApp e paid media. Da ideia à venda em 12 semanas.",
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
    faq: [
      {
        q: { es: "¿Cuánto cuesta una tienda Shopify con IA?", en: "How much does a Shopify store with AI cost?", de: "Was kostet ein Shopify-Store mit KI?", pt: "Quanto custa uma loja Shopify com IA?" },
        a: {
          es: "Depende del alcance: número de productos, mercados y qué tanto motor de operación quieres desde el día uno. Los proyectos serios arrancan en varios miles de dólares y el número fino se cierra con Edgar según tu caso. Lo que sí cambia con IA: el catálogo editorial y la operación cuestan una fracción de lo tradicional.",
          en: "It depends on scope: number of products, markets, and how much operating engine you want from day one. Serious projects start in the thousands of dollars; the exact number is closed with Edgar for your case. What changes with AI: the editorial catalog and the operation cost a fraction of the traditional way.",
          de: "Das hängt vom Umfang ab: Produkte, Märkte, und wie viel Betriebs-Motor du ab Tag eins willst. Ernsthafte Projekte starten im Bereich mehrerer tausend Dollar; die genaue Zahl klärst du mit Edgar. Mit KI kosten Katalog und Betrieb einen Bruchteil des Traditionellen.",
          pt: "Depende do alcance: número de produtos, mercados e quanto motor de operação queres desde o dia um. Projetos sérios começam em vários milhares de dólares; o número exato fecha-se com o Edgar. Com IA, o catálogo e a operação custam uma fração do tradicional.",
        },
      },
      {
        q: { es: "¿Cuánto tarda?", en: "How long does it take?", de: "Wie lange dauert es?", pt: "Quanto tempo demora?" },
        a: {
          es: "Doce semanas de la idea a vender: criterio, build, lanzamiento. Después, el motor mensual mantiene la marca corriendo.",
          en: "Twelve weeks from idea to selling: judgment, build, launch. Then the monthly engine keeps the brand running.",
          de: "Zwölf Wochen von der Idee zum Verkauf: Kriterium, Build, Launch. Danach hält der monatliche Motor die Marke am Laufen.",
          pt: "Doze semanas da ideia à venda: critério, build, lançamento. Depois, o motor mensal mantém a marca a correr.",
        },
      },
      {
        q: { es: "¿Qué son las fotos de producto con IA?", en: "What is AI product photography?", de: "Was ist KI-Produktfotografie?", pt: "O que são fotos de produto com IA?" },
        a: {
          es: "Tu producto real, fotografiado digitalmente con dirección editorial: luz, escenario y calidad de revista, generados con IA a partir de tus prendas. Sin estudio ni logística de shooting — y el catálogo completo mantiene una sola estética.",
          en: "Your real product, digitally photographed with editorial direction: light, set and magazine quality, AI-generated from your garments. No studio, no shoot logistics — and the entire catalog keeps one aesthetic.",
          de: "Dein echtes Produkt, digital fotografiert mit redaktioneller Direktion: Licht, Set und Magazin-Qualität, KI-generiert aus deinen Teilen. Ohne Studio — und der ganze Katalog behält eine Ästhetik.",
          pt: "O teu produto real, fotografado digitalmente com direção editorial: luz, cenário e qualidade de revista, gerados com IA a partir das tuas peças. Sem estúdio — e o catálogo inteiro mantém uma só estética.",
        },
      },
      {
        q: { es: "¿El agente de WhatsApp reemplaza a mi equipo?", en: "Does the WhatsApp agent replace my team?", de: "Ersetzt der WhatsApp-Agent mein Team?", pt: "O agente de WhatsApp substitui a minha equipa?" },
        a: {
          es: "Lo multiplica. El agente atiende, asesora y cierra 24/7 con el criterio de tu marca; tu equipo entra en las conversaciones donde una persona de verdad aporta. Nadie pierde tiempo en preguntas repetidas.",
          en: "It multiplies it. The agent serves, advises and closes 24/7 with your brand's judgment; your team steps into the conversations where a person truly adds value. Nobody wastes time on repeated questions.",
          de: "Er multipliziert es. Der Agent bedient und verkauft 24/7 mit dem Urteil deiner Marke; dein Team übernimmt, wo ein Mensch wirklich zählt.",
          pt: "Multiplica-a. O agente atende e fecha 24/7 com o critério da tua marca; a tua equipa entra nas conversas onde uma pessoa realmente soma.",
        },
      },
      {
        q: { es: "¿Trabajan fuera de Colombia?", en: "Do you work outside Colombia?", de: "Arbeitet ihr außerhalb Kolumbiens?", pt: "Trabalham fora da Colômbia?" },
        a: {
          es: "Sí. Clientes en Colombia, España, Portugal, Alemania y Estados Unidos. Las marcas se construyen globales desde el día uno — la web que estás leyendo corre en cuatro idiomas.",
          en: "Yes. Clients in Colombia, Spain, Portugal, Germany and the United States. Brands are built global from day one — this very site runs in four languages.",
          de: "Ja. Kunden in Kolumbien, Spanien, Portugal, Deutschland und den USA. Marken werden ab Tag eins global gebaut.",
          pt: "Sim. Clientes na Colômbia, Espanha, Portugal, Alemanha e Estados Unidos. As marcas constroem-se globais desde o dia um.",
        },
      },
      {
        q: { es: "¿Qué pasa después del lanzamiento?", en: "What happens after launch?", de: "Was passiert nach dem Launch?", pt: "O que acontece depois do lançamento?" },
        a: {
          es: "El motor mensual: contenido editorial, agentes afinándose con data real y pauta operada. Una tienda sin operación es una tienda muerta — por eso no entregamos y desaparecemos.",
          en: "The monthly engine: editorial content, agents tuning with real data and operated ads. A store without operation is a dead store — that's why we don't deliver and disappear.",
          de: "Der monatliche Motor: Editorial-Content, Agenten, die mit echten Daten besser werden, und betriebene Ads. Ein Store ohne Betrieb ist ein toter Store.",
          pt: "O motor mensal: conteúdo editorial, agentes a afinar com dados reais e ads operados. Uma loja sem operação é uma loja morta.",
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
