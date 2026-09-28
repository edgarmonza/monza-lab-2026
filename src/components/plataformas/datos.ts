/* /plataformas · los textos y datos de la página, en los cuatro idiomas (28-sep-2026).
 * Es la puerta para empresas con operación (no e-commerce): plataformas y agentes con IA.
 * Absorbe /agentes (que redirige aquí): sus preguntas, su demo en vivo y su SEO.
 * Reglas: sin guiones largos, sin jerga, sin precios, sin nombres de clientes ni de prospectos. */
import type { LangText } from "@/i18n/types";
import type { Caso, IconoEntregable, NodoTecnologia } from "@/data/casos/tipos";

type T = LangText;
const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });

export const SEO_PL = {
  titulo: t(
    "Plataformas y agentes de IA para empresas | Monza Lab",
    "AI platforms and AI agents for companies | Monza Lab",
    "KI-Plattformen und KI-Agenten für Unternehmen | Monza Lab",
    "Plataformas e agentes de IA para empresas | Monza Lab",
  ),
  descripcion: t(
    "Construimos plataformas con inteligencia artificial y agentes de IA sobre la operación real de tu empresa: tu ERP, tu CRM y tu WhatsApp. Un piloto en uso en semanas, y todo a nombre de tu empresa.",
    "We build artificial intelligence platforms and AI agents on your company's real operation: your ERP, your CRM and your WhatsApp. A pilot in use within weeks, and everything in your company's name.",
    "Wir bauen Plattformen mit künstlicher Intelligenz und KI-Agenten auf dem echten Betrieb deines Unternehmens: dein ERP, dein CRM und dein WhatsApp. Ein Pilot im Einsatz in wenigen Wochen, und alles auf den Namen deines Unternehmens.",
    "Construímos plataformas com inteligência artificial e agentes de IA sobre a operação real da tua empresa: o teu ERP, o teu CRM e o teu WhatsApp. Um piloto em uso em semanas, e tudo em nome da tua empresa.",
  ),
  servicio: t("Plataformas y agentes de IA para empresas", "AI platforms and agents for companies", "KI-Plattformen und KI-Agenten für Unternehmen", "Plataformas e agentes de IA para empresas"),
};

export const HERO = {
  miga: t("Plataformas", "Platforms", "Plattformen", "Plataformas"),
  linea1: t("Plataformas y agentes con IA", "AI platforms and agents", "KI-Plattformen und Agenten", "Plataformas e agentes com IA"),
  linea2: t("para tu operación.", "for your operation.", "für deinen Betrieb.", "para a tua operação."),
  frase: t(
    "La herramienta que tu empresa necesita, construida sobre lo que ya usa: tu ERP, tu CRM y tu WhatsApp. En uso en semanas, no en años.",
    "The tool your company needs, built on what it already uses: your ERP, your CRM and your WhatsApp. In use within weeks, not years.",
    "Das Werkzeug, das dein Unternehmen braucht, gebaut auf dem, was es schon nutzt: dein ERP, dein CRM und dein WhatsApp. Im Einsatz in Wochen, nicht in Jahren.",
    "A ferramenta de que a tua empresa precisa, construída sobre o que já usa: o teu ERP, o teu CRM e o teu WhatsApp. Em uso em semanas, não em anos.",
  ),
  pastillas: [
    t("Plataformas internas", "Internal platforms", "Interne Plattformen", "Plataformas internas"),
    t("Agentes de IA", "AI agents", "KI-Agenten", "Agentes de IA"),
    t("Sobre tu ERP", "On your ERP", "Auf deinem ERP", "Sobre o teu ERP"),
    t("Tableros", "Dashboards", "Dashboards", "Painéis"),
  ],
  comoSeArma: t("Cómo se arma", "How it's built", "So entsteht es", "Como se monta"),
  hablarAgente: t("Habla con el agente", "Talk to the agent", "Sprich mit dem Agenten", "Fala com o agente"),
  escena: t(
    "Una plataforma de comercio exterior hecha por Monza, en escritorio, con su asesor de compras.",
    "A foreign-trade platform built by Monza, on desktop, with its purchasing advisor.",
    "Eine Außenhandelsplattform von Monza, am Desktop, mit ihrem Einkaufsberater.",
    "Uma plataforma de comércio exterior feita pela Monza, no computador, com o seu assessor de compras.",
  ),
};

export const CONSTRUIMOS: { eyebrow: T; titulo: T; items: { icono: IconoEntregable; nombre: T; texto: T }[] } = {
  eyebrow: t("Qué construimos", "What we build", "Was wir bauen", "O que construímos"),
  titulo: t(
    "Cinco formas de poner la IA a trabajar en tu empresa.",
    "Five ways to put AI to work in your company.",
    "Fünf Wege, KI in deinem Unternehmen arbeiten zu lassen.",
    "Cinco formas de pôr a IA a trabalhar na tua empresa.",
  ),
  items: [
    {
      icono: "plataforma",
      nombre: t("Plataforma interna", "Internal platform", "Interne Plattform", "Plataforma interna"),
      texto: t(
        "Un solo lugar donde tu equipo cotiza, consulta, aprueba y hace seguimiento, en vez de correos y hojas de cálculo.",
        "One place where your team quotes, looks things up, approves and follows up, instead of emails and spreadsheets.",
        "Ein Ort, an dem dein Team kalkuliert, nachschlägt, freigibt und nachverfolgt, statt E-Mails und Tabellen.",
        "Um só lugar onde a tua equipa cota, consulta, aprova e acompanha, em vez de e-mails e folhas de cálculo.",
      ),
    },
    {
      icono: "agente",
      nombre: t("Agentes sobre tu ERP o CRM", "Agents on your ERP or CRM", "Agenten auf deinem ERP oder CRM", "Agentes sobre o teu ERP ou CRM"),
      texto: t(
        "Leen tus datos reales y hacen el trabajo repetitivo: fichas técnicas, comparaciones de proveedores, costeos y documentos.",
        "They read your real data and do the repetitive work: spec sheets, supplier comparisons, costing and documents.",
        "Sie lesen deine echten Daten und erledigen die Routinearbeit: Datenblätter, Lieferantenvergleiche, Kalkulationen und Dokumente.",
        "Leem os teus dados reais e fazem o trabalho repetitivo: fichas técnicas, comparações de fornecedores, custeios e documentos.",
      ),
    },
    {
      icono: "whatsapp",
      nombre: t("Web y WhatsApp con asesor", "Website and WhatsApp with an advisor", "Website und WhatsApp mit Berater", "Site e WhatsApp com assessor"),
      texto: t(
        "Un asesor que conoce tu producto, atiende a cualquier hora con la voz de tu marca y le pasa el cliente a tu equipo cuando hace falta.",
        "An advisor who knows your product, answers at any hour in your brand's voice and hands the customer to your team when needed.",
        "Ein Berater, der dein Produkt kennt, zu jeder Uhrzeit in deiner Markenstimme antwortet und den Kunden bei Bedarf an dein Team übergibt.",
        "Um assessor que conhece o teu produto, atende a qualquer hora com a voz da tua marca e passa o cliente à tua equipa quando é preciso.",
      ),
    },
    {
      icono: "tablero",
      nombre: t("Tableros", "Dashboards", "Dashboards", "Painéis"),
      texto: t(
        "Lo que importa de tu operación en una pantalla: ventas, tiempos, pendientes y alertas, sin armar informes a mano.",
        "What matters in your operation on one screen: sales, times, open items and alerts, without building reports by hand.",
        "Das Wichtige deines Betriebs auf einem Bildschirm: Umsatz, Zeiten, Offenes und Warnungen, ohne Berichte von Hand zu bauen.",
        "O que importa da tua operação num só ecrã: vendas, tempos, pendentes e alertas, sem montar relatórios à mão.",
      ),
    },
    {
      icono: "pauta",
      nombre: t("Agentes de crecimiento", "Growth agents", "Wachstums-Agenten", "Agentes de crescimento"),
      texto: t(
        "La pauta y el contenido leídos y operados con IA: el análisis y las decisiones que normalmente ocupan a un equipo entero.",
        "Ads and content read and operated with AI: the analysis and decisions that usually take up an entire team.",
        "Anzeigen und Content, mit KI gelesen und betrieben: die Analyse und die Entscheidungen, die sonst ein ganzes Team binden.",
        "A publicidade e o conteúdo lidos e operados com IA: a análise e as decisões que normalmente ocupam uma equipa inteira.",
      ),
    },
  ],
};

export const FASES: { eyebrow: T; titulo: T; lede: T; queda: T; items: { n: string; titulo: T; texto: T; queda: T }[] } = {
  eyebrow: t("Cómo se arma", "How it's built", "So entsteht es", "Como se monta"),
  titulo: t(
    "Por fases, y cada una deja algo andando.",
    "In phases, and each one leaves something running.",
    "In Phasen, und jede hinterlässt etwas, das läuft.",
    "Por fases, e cada uma deixa algo a funcionar.",
  ),
  lede: t(
    "Funciona como una agencia de tecnología: un fee mensual por un periodo, con entregables que quedan a nombre de tu empresa.",
    "It works like a technology agency: a monthly fee for a set period, with deliverables that stay in your company's name.",
    "Es funktioniert wie eine Technologie-Agentur: eine monatliche Gebühr für einen festen Zeitraum, mit Ergebnissen, die auf den Namen deines Unternehmens laufen.",
    "Funciona como uma agência de tecnologia: um fee mensal por um período, com entregáveis que ficam em nome da tua empresa.",
  ),
  queda: t("Queda andando", "Left running", "Läuft danach", "Fica a funcionar"),
  items: [
    {
      n: "01",
      titulo: t("Diagnóstico", "Diagnosis", "Diagnose", "Diagnóstico"),
      texto: t(
        "Qué proceso duele, qué datos existen y dónde la IA paga su puesto desde el primer mes.",
        "Which process hurts, what data exists and where AI pays for its seat from the first month.",
        "Welcher Prozess schmerzt, welche Daten es gibt und wo sich KI ab dem ersten Monat bezahlt macht.",
        "Que processo dói, que dados existem e onde a IA paga o seu lugar desde o primeiro mês.",
      ),
      queda: t("El mapa de tu operación y qué conectar primero.", "The map of your operation and what to connect first.", "Die Karte deines Betriebs und was zuerst verbunden wird.", "O mapa da tua operação e o que ligar primeiro."),
    },
    {
      n: "02",
      titulo: t("Piloto en uso", "Pilot in use", "Pilot im Einsatz", "Piloto em uso"),
      texto: t(
        "En semanas y sobre tus datos reales, no una demo con números inventados. Tu equipo lo usa en la operación de verdad.",
        "Within weeks and on your real data, not a demo with made-up numbers. Your team uses it in the real operation.",
        "In wenigen Wochen und auf deinen echten Daten, keine Demo mit erfundenen Zahlen. Dein Team nutzt ihn im echten Betrieb.",
        "Em semanas e sobre os teus dados reais, não uma demo com números inventados. A tua equipa usa-o na operação a sério.",
      ),
      queda: t("La primera herramienta, funcionando.", "The first tool, working.", "Das erste Werkzeug, in Betrieb.", "A primeira ferramenta, a funcionar."),
    },
    {
      n: "03",
      titulo: t("Conectar lo demás", "Connect the rest", "Den Rest verbinden", "Ligar o resto"),
      texto: t(
        "Se suman el ERP, el CRM, el WhatsApp, el correo y los tableros, cada pieza hablando con las otras.",
        "The ERP, the CRM, WhatsApp, email and dashboards join in, each piece talking to the others.",
        "ERP, CRM, WhatsApp, E-Mail und Dashboards kommen dazu, und jedes Teil spricht mit den anderen.",
        "Juntam-se o ERP, o CRM, o WhatsApp, o e-mail e os painéis, cada peça a falar com as outras.",
      ),
      queda: t("Un solo sistema, no piezas sueltas.", "One system, not loose pieces.", "Ein System, keine Einzelteile.", "Um só sistema, não peças soltas."),
    },
    {
      n: "04",
      titulo: t("Operar", "Operate", "Betreiben", "Operar"),
      texto: t(
        "Lo operamos contigo: se afina con el uso, se mide cada mes y cada agente tiene reglas claras sobre qué puede hacer.",
        "We operate it with you: it gets tuned through use, measured every month, and each agent has clear rules on what it can do.",
        "Wir betreiben es mit dir: Es wird im Einsatz geschärft, jeden Monat gemessen, und jeder Agent hat klare Regeln, was er darf.",
        "Operamo-lo contigo: afina-se com o uso, mede-se todos os meses e cada agente tem regras claras sobre o que pode fazer.",
      ),
      queda: t("Todo a nombre de tu empresa, documentado.", "Everything in your company's name, documented.", "Alles auf den Namen deines Unternehmens, dokumentiert.", "Tudo em nome da tua empresa, documentado."),
    },
  ],
};

/* El mapa de tecnología genérico: las herramientas de una empresa alrededor, la IA al centro. */
const NODOS: NodoTecnologia[] = [
  {
    id: "agentes",
    nombre: t("Agentes de IA", "AI agents", "KI-Agenten", "Agentes de IA"),
    corto: t("Agentes", "Agents", "Agenten", "Agentes"),
    tipo: "ia",
    hace: t(
      "Leen, comparan, cotizan y redactan sobre tus datos reales, y le pasan a una persona lo que necesita criterio.",
      "They read, compare, quote and draft on your real data, and hand to a person whatever needs judgment.",
      "Sie lesen, vergleichen, kalkulieren und formulieren auf deinen echten Daten und geben an einen Menschen weiter, was Urteilsvermögen braucht.",
      "Leem, comparam, cotam e redigem sobre os teus dados reais, e passam a uma pessoa o que precisa de critério.",
    ),
    con: ["erp", "crm", "docs", "tableros"],
  },
  {
    id: "asesor",
    nombre: t("Asesor", "Advisor", "Berater", "Assessor"),
    tipo: "ia",
    hace: t(
      "Atiende a tus clientes en la web y en WhatsApp con el conocimiento de tu producto, a cualquier hora.",
      "It serves your customers on the website and on WhatsApp with knowledge of your product, at any hour.",
      "Er betreut deine Kunden auf der Website und auf WhatsApp mit dem Wissen über dein Produkt, zu jeder Uhrzeit.",
      "Atende os teus clientes no site e no WhatsApp com o conhecimento do teu produto, a qualquer hora.",
    ),
    con: ["web", "whatsapp", "crm"],
  },
  {
    id: "erp",
    nombre: t("Tu ERP", "Your ERP", "Dein ERP", "O teu ERP"),
    corto: t("ERP", "ERP", "ERP", "ERP"),
    tipo: "herramienta",
    hace: t(
      "Donde vive tu operación: inventario, compras y facturación. Se conecta en modo lectura donde se puede, sin cambiarle nada.",
      "Where your operation lives: inventory, purchasing and invoicing. It connects read-only wherever possible, without changing anything.",
      "Wo dein Betrieb lebt: Lager, Einkauf und Rechnungen. Wird wo möglich nur lesend angebunden, ohne etwas zu ändern.",
      "Onde vive a tua operação: inventário, compras e faturação. Liga-se só em leitura onde é possível, sem lhe mudar nada.",
    ),
    con: ["tableros"],
  },
  {
    id: "crm",
    nombre: t("CRM", "CRM", "CRM", "CRM"),
    tipo: "herramienta",
    hace: t(
      "Tus clientes y oportunidades en un solo lugar, con lo que cada uno pidió, compró y preguntó.",
      "Your customers and opportunities in one place, with what each one asked for, bought and asked about.",
      "Deine Kunden und Chancen an einem Ort, mit dem, was jeder angefragt, gekauft und gefragt hat.",
      "Os teus clientes e oportunidades num só lugar, com o que cada um pediu, comprou e perguntou.",
    ),
    con: ["correo"],
  },
  {
    id: "whatsapp",
    nombre: t("WhatsApp Business", "WhatsApp Business", "WhatsApp Business", "WhatsApp Business"),
    corto: t("WhatsApp", "WhatsApp", "WhatsApp", "WhatsApp"),
    icono: "whatsapp",
    tipo: "herramienta",
    hace: t(
      "Donde tus clientes ya escriben. La cuenta es de tu empresa; nosotros la operamos contigo.",
      "Where your customers already write. The account belongs to your company; we operate it with you.",
      "Wo deine Kunden schon schreiben. Das Konto gehört deinem Unternehmen; wir betreiben es mit dir.",
      "Onde os teus clientes já escrevem. A conta é da tua empresa; nós operamo-la contigo.",
    ),
    con: [],
  },
  {
    id: "web",
    nombre: t("Tu web", "Your website", "Deine Website", "O teu site"),
    corto: t("Web", "Web", "Web", "Site"),
    tipo: "herramienta",
    hace: t(
      "La cara pública de tu empresa, con un asesor que entiende lo que vendes y agenda con tu equipo.",
      "Your company's public face, with an advisor who understands what you sell and books time with your team.",
      "Das öffentliche Gesicht deines Unternehmens, mit einem Berater, der versteht, was du verkaufst, und Termine mit deinem Team bucht.",
      "A cara pública da tua empresa, com um assessor que entende o que vendes e agenda com a tua equipa.",
    ),
    con: [],
  },
  {
    id: "correo",
    nombre: t("Correo", "Email", "E-Mail", "E-mail"),
    icono: "gmail",
    tipo: "herramienta",
    hace: t(
      "Los seguimientos y avisos que salen solos, con el tono de tu empresa.",
      "Follow-ups and notices that go out on their own, in your company's tone.",
      "Nachfassen und Hinweise, die von selbst rausgehen, im Ton deines Unternehmens.",
      "Os seguimentos e avisos que saem sozinhos, com o tom da tua empresa.",
    ),
    con: [],
  },
  {
    id: "docs",
    nombre: t("Documentos", "Documents", "Dokumente", "Documentos"),
    icono: "googledocs",
    tipo: "herramienta",
    hace: t(
      "Fichas técnicas, cotizaciones y contratos listos para revisar y enviar, armados con tus datos.",
      "Spec sheets, quotes and contracts ready to review and send, built from your data.",
      "Datenblätter, Angebote und Verträge, fertig zum Prüfen und Versenden, aus deinen Daten erstellt.",
      "Fichas técnicas, cotações e contratos prontos a rever e enviar, montados com os teus dados.",
    ),
    con: [],
  },
  {
    id: "tableros",
    nombre: t("Tableros", "Dashboards", "Dashboards", "Painéis"),
    tipo: "herramienta",
    hace: t(
      "Lo que pasa en tu operación, en una pantalla que se actualiza sola, con alertas cuando algo se atrasa.",
      "What happens in your operation, on a screen that updates itself, with alerts when something falls behind.",
      "Was in deinem Betrieb passiert, auf einem Bildschirm, der sich selbst aktualisiert, mit Warnungen, wenn etwas zurückfällt.",
      "O que acontece na tua operação, num ecrã que se atualiza sozinho, com alertas quando algo se atrasa.",
    ),
    con: [],
  },
];

export const MAPA = {
  eyebrow: t("La tecnología", "The technology", "Die Technik", "A tecnologia"),
  titulo: t(
    "Tus herramientas, hablando entre sí. La IA, al centro.",
    "Your tools, talking to each other. AI at the center.",
    "Deine Werkzeuge sprechen miteinander. Die KI in der Mitte.",
    "As tuas ferramentas, a falar entre si. A IA, ao centro.",
  ),
  lede: t(
    "No reemplazamos lo que tu empresa ya usa: lo conectamos. En rosa, donde trabaja la inteligencia artificial. Toca cualquiera.",
    "We don't replace what your company already uses: we connect it. In pink, where artificial intelligence works. Tap any of them.",
    "Wir ersetzen nicht, was dein Unternehmen schon nutzt: Wir verbinden es. In Rosa: wo künstliche Intelligenz arbeitet. Tippe auf ein Element.",
    "Não substituímos o que a tua empresa já usa: ligamo-lo. A cor-de-rosa, onde trabalha a inteligência artificial. Toca em qualquer uma.",
  ),
  /** Tecnologia (del molde de caso) solo lee `tecnologia`. */
  caso: {
    tecnologia: {
      titulo: t("", "", "", ""),
      lede: t("", "", "", ""),
      centro: { titulo: t("Tu operación", "Your operation", "Dein Betrieb", "A tua operação"), sub: t("un solo sistema", "one system", "ein System", "um só sistema") },
      nodos: NODOS,
    },
  } as Pick<Caso, "tecnologia"> as Caso,
};

export const CASOS_PL = {
  eyebrow: t("Casos", "Cases", "Fälle", "Casos"),
  titulo: t("Plataformas que ya construimos.", "Platforms we've already built.", "Plattformen, die wir schon gebaut haben.", "Plataformas que já construímos."),
  lede: t(
    "Los de clientes se publican sin su nombre. Toca cualquiera para ver qué se hizo, pieza por pieza.",
    "Client cases are published without their name. Tap any of them to see what was done, piece by piece.",
    "Kundenfälle erscheinen ohne Namen. Tippe auf einen, um Stück für Stück zu sehen, was gemacht wurde.",
    "Os de clientes publicam-se sem o nome. Toca em qualquer um para ver o que se fez, peça a peça.",
  ),
  slugs: ["plataforma-comercio-exterior", "plataforma-turismo", "ia-index"],
  verCaso: t("Ver el caso →", "See the case →", "Fall ansehen →", "Ver o caso →"),
};

export const DEMO = {
  eyebrow: t("Demo en vivo", "Live demo", "Live-Demo", "Demo ao vivo"),
  titulo: t("¿Quieres saber qué es un agente? Habla con uno.", "Want to know what an agent is? Talk to one.", "Willst du wissen, was ein Agent ist? Sprich mit einem.", "Queres saber o que é um agente? Fala com um."),
  texto: t(
    "El agente de esta página lo construimos nosotros: entiende tu caso, te muestra trabajo real y agenda con Edgar. No te lo contamos: pruébalo.",
    "We built the agent on this page: it understands your case, shows you real work and books time with Edgar. We won't just tell you: try it.",
    "Den Agenten auf dieser Seite haben wir gebaut: Er versteht deinen Fall, zeigt dir echte Arbeit und bucht Zeit mit Edgar. Wir erzählen es nicht nur: Probier ihn aus.",
    "O agente desta página fomos nós que o construímos: entende o teu caso, mostra-te trabalho real e agenda com o Edgar. Não te contamos: experimenta.",
  ),
  boton: t("Hablar con el agente", "Talk to the agent", "Mit dem Agenten sprechen", "Falar com o agente"),
  enLinea: t("En línea", "Online", "Online", "Online"),
  nombre: t("Agente de Monza", "Monza agent", "Monza-Agent", "Agente da Monza"),
  saludo: t(
    "Hola. Cuéntame qué hace tu empresa y te digo qué haría un agente en ella.",
    "Hi. Tell me what your company does and I'll tell you what an agent would do there.",
    "Hallo. Erzähl mir, was dein Unternehmen macht, und ich sage dir, was ein Agent dort tun würde.",
    "Olá. Conta-me o que faz a tua empresa e digo-te o que faria um agente nela.",
  ),
  preguntas: [
    t("¿Qué haría un agente en mi empresa?", "What would an agent do in my company?", "Was würde ein Agent in meinem Unternehmen tun?", "O que faria um agente na minha empresa?"),
    t("¿Se conecta con mi ERP?", "Does it connect to my ERP?", "Verbindet er sich mit meinem ERP?", "Liga-se ao meu ERP?"),
    t("¿Cuánto tarda en estar funcionando?", "How long until it's working?", "Wie lange, bis er läuft?", "Quanto tempo até estar a funcionar?"),
  ],
  nota: t("Ejemplo: las preguntas abren el agente real.", "Example: the questions open the real agent.", "Beispiel: Die Fragen öffnen den echten Agenten.", "Exemplo: as perguntas abrem o agente real."),
};

export const FAQ: { eyebrow: T; titulo: T; items: { q: T; a: T }[] } = {
  eyebrow: t("Preguntas frecuentes", "Frequently asked questions", "Häufige Fragen", "Perguntas frequentes"),
  titulo: t("Lo que casi todos preguntan antes de empezar.", "What almost everyone asks before starting.", "Was fast alle vor dem Start fragen.", "O que quase todos perguntam antes de começar."),
  items: [
    {
      q: t("¿Qué es un agente de IA y en qué se diferencia de un chatbot?", "What is an AI agent and how is it different from a chatbot?", "Was ist ein KI-Agent und was unterscheidet ihn von einem Chatbot?", "O que é um agente de IA e em que difere de um chatbot?"),
      a: t(
        "Un chatbot sigue un guion. Un agente entiende el contexto, usa herramientas (tu catálogo, tu ERP, WhatsApp, tu agenda) y hace trabajo de verdad: cotiza, compara, arma documentos, agenda y vende. En la práctica, el chatbot te ahorra preguntas y el agente te produce resultados.",
        "A chatbot follows a script. An agent understands context, uses tools (your catalog, your ERP, WhatsApp, your calendar) and does real work: it quotes, compares, builds documents, schedules and sells. In practice, a chatbot saves you questions and an agent produces results.",
        "Ein Chatbot folgt einem Skript. Ein Agent versteht den Kontext, nutzt Werkzeuge (Katalog, ERP, WhatsApp, Kalender) und erledigt echte Arbeit: Er kalkuliert, vergleicht, erstellt Dokumente, bucht Termine und verkauft. Praktisch spart dir ein Chatbot Fragen, ein Agent liefert Ergebnisse.",
        "Um chatbot segue um guião. Um agente entende o contexto, usa ferramentas (o teu catálogo, o teu ERP, o WhatsApp, a tua agenda) e faz trabalho a sério: cota, compara, monta documentos, agenda e vende. Na prática, o chatbot poupa-te perguntas e o agente produz resultados.",
      ),
    },
    {
      q: t("¿Qué es una plataforma con IA?", "What is an AI platform?", "Was ist eine KI-Plattform?", "O que é uma plataforma com IA?"),
      a: t(
        "Una herramienta hecha a la medida de tu operación, donde tu equipo trabaja todos los días, con agentes de IA adentro que hacen la parte repetitiva. No es un software genérico que hay que aprender: se construye sobre cómo trabaja tu empresa.",
        "A tool built to fit your operation, where your team works every day, with AI agents inside doing the repetitive part. It isn't generic software you have to learn: it's built around how your company works.",
        "Ein Werkzeug nach Maß für deinen Betrieb, in dem dein Team jeden Tag arbeitet, mit KI-Agenten darin, die den Routineteil erledigen. Keine Standardsoftware, die man lernen muss: Sie wird um die Arbeitsweise deines Unternehmens herum gebaut.",
        "Uma ferramenta feita à medida da tua operação, onde a tua equipa trabalha todos os dias, com agentes de IA lá dentro a fazer a parte repetitiva. Não é um software genérico que é preciso aprender: constrói-se sobre a forma como a tua empresa trabalha.",
      ),
    },
    {
      q: t("¿Un agente puede trabajar con los datos de mi empresa (ERP, CRM, catálogo)?", "Can an agent work with my company's data (ERP, CRM, catalog)?", "Kann ein Agent mit den Daten meines Unternehmens arbeiten (ERP, CRM, Katalog)?", "Um agente pode trabalhar com os dados da minha empresa (ERP, CRM, catálogo)?"),
      a: t(
        "Sí, y ahí es donde un agente vale de verdad. Hemos construido agentes que trabajan sobre el ERP vivo de una importadora: leen su catálogo real, comparan sus proveedores reales y costean sus importaciones reales. Se conectan con el acceso mínimo, solo lectura donde se puede, y reglas claras.",
        "Yes, and that's where an agent is truly worth it. We've built agents that work on an importer's live ERP: they read its real catalog, compare its real suppliers and cost its real imports. They connect with minimal access, read-only wherever possible, and clear rules.",
        "Ja, und genau da lohnt sich ein Agent wirklich. Wir haben Agenten gebaut, die auf dem laufenden ERP eines Importeurs arbeiten: Sie lesen den echten Katalog, vergleichen echte Lieferanten und kalkulieren echte Importe. Mit minimalem Zugriff, wo möglich nur lesend, und klaren Regeln.",
        "Sim, e é aí que um agente vale mesmo. Construímos agentes que trabalham sobre o ERP vivo de uma importadora: leem o catálogo real, comparam fornecedores reais e custeiam importações reais. Ligam-se com o acesso mínimo, só em leitura onde é possível, e regras claras.",
      ),
    },
    {
      q: t("¿Cuánto cuesta?", "How much does it cost?", "Was kostet das?", "Quanto custa?"),
      a: t(
        "Depende de qué se construye y a qué se conecta. Se trabaja con un fee mensual por un periodo, con entregables que quedan a nombre de tu empresa, y el número se cierra con Edgar según el alcance. La pregunta útil es al revés: ¿cuánto te cuesta hoy el proceso que haría el agente?",
        "It depends on what gets built and what it connects to. We work with a monthly fee for a set period, with deliverables that stay in your company's name, and the number is agreed with Edgar based on scope. The useful question is the reverse: what does the process the agent would do cost you today?",
        "Das hängt davon ab, was gebaut wird und womit es verbunden ist. Wir arbeiten mit einer monatlichen Gebühr für einen festen Zeitraum, mit Ergebnissen auf den Namen deines Unternehmens, und die Zahl wird mit Edgar nach Umfang festgelegt. Die nützliche Frage ist umgekehrt: Was kostet dich heute der Prozess, den der Agent übernehmen würde?",
        "Depende do que se constrói e ao que se liga. Trabalha-se com um fee mensal por um período, com entregáveis que ficam em nome da tua empresa, e o número fecha-se com o Edgar conforme o âmbito. A pergunta útil é ao contrário: quanto te custa hoje o processo que o agente faria?",
      ),
    },
    {
      q: t("¿Cuánto tarda en estar funcionando?", "How long until it's working?", "Wie lange dauert es, bis es läuft?", "Quanto tempo até estar a funcionar?"),
      a: t(
        "Un piloto sobre tus datos reales en semanas, no en meses, y tu equipo usándolo justo después. Nuestros propios casos pasaron del arranque al piloto en uso en menos de dos meses.",
        "A pilot on your real data within weeks, not months, with your team using it right after. Our own cases went from kickoff to a pilot in use in under two months.",
        "Ein Pilot auf deinen echten Daten in Wochen, nicht Monaten, und dein Team nutzt ihn direkt danach. Unsere eigenen Fälle gingen in weniger als zwei Monaten vom Start zum genutzten Piloten.",
        "Um piloto sobre os teus dados reais em semanas, não em meses, e a tua equipa a usá-lo logo a seguir. Os nossos próprios casos passaram do arranque ao piloto em uso em menos de dois meses.",
      ),
    },
    {
      q: t("¿Qué pasa con la confidencialidad de mi información?", "What about the confidentiality of my information?", "Was ist mit der Vertraulichkeit meiner Informationen?", "E a confidencialidade da minha informação?"),
      a: t(
        "Tu información no sale de tu operación: accesos mínimos, solo lectura donde aplica y reglas explícitas sobre lo que el agente puede decir. Por eso nuestros casos de plataforma se publican sin el nombre del cliente.",
        "Your information doesn't leave your operation: minimal access, read-only where it applies and explicit rules on what the agent can say. That's why our platform cases are published without the client's name.",
        "Deine Informationen verlassen deinen Betrieb nicht: minimaler Zugriff, nur lesend, wo es passt, und ausdrückliche Regeln, was der Agent sagen darf. Deshalb erscheinen unsere Plattform-Fälle ohne den Namen des Kunden.",
        "A tua informação não sai da tua operação: acessos mínimos, só leitura onde se aplica e regras explícitas sobre o que o agente pode dizer. Por isso os nossos casos de plataforma publicam-se sem o nome do cliente.",
      ),
    },
    {
      q: t("¿De quién queda lo que se construye?", "Who owns what gets built?", "Wem gehört, was gebaut wird?", "De quem fica o que se constrói?"),
      a: t(
        "De tu empresa. La plataforma, los datos, las cuentas y la documentación quedan a su nombre. Nosotros lo construimos y lo operamos contigo.",
        "Your company. The platform, the data, the accounts and the documentation stay in its name. We build it and operate it with you.",
        "Deinem Unternehmen. Plattform, Daten, Konten und Dokumentation laufen auf seinen Namen. Wir bauen es und betreiben es mit dir.",
        "Da tua empresa. A plataforma, os dados, as contas e a documentação ficam em nome dela. Nós construímo-la e operamo-la contigo.",
      ),
    },
    {
      q: t("¿Sirve para mi industria?", "Does it work for my industry?", "Funktioniert das für meine Branche?", "Serve para a minha indústria?"),
      a: t(
        "Hemos construido para comercio exterior, turismo, moda y ventas directas. La respuesta corta: si tu operación tiene procesos repetitivos con datos, hay un agente que paga su puesto. La forma más rápida de saberlo es contarle tu caso al agente de esta página.",
        "We've built for foreign trade, travel, fashion and direct sales. The short answer: if your operation has repetitive processes with data, there's an agent that pays for its seat. The fastest way to find out is to tell your case to the agent on this page.",
        "Wir haben für Außenhandel, Tourismus, Mode und Direktvertrieb gebaut. Kurz gesagt: Wenn dein Betrieb Routineprozesse mit Daten hat, gibt es einen Agenten, der sich bezahlt macht. Am schnellsten findest du es heraus, wenn du deinen Fall dem Agenten auf dieser Seite erzählst.",
        "Construímos para comércio exterior, turismo, moda e vendas diretas. A resposta curta: se a tua operação tem processos repetitivos com dados, há um agente que paga o seu lugar. A forma mais rápida de saber é contar o teu caso ao agente desta página.",
      ),
    },
  ],
};

export const CIERRE = {
  eyebrow: t("Hablemos", "Let's talk", "Sprechen wir", "Falemos"),
  titulo: t("¿Qué haría la IA", "What would AI do", "Was würde KI", "O que faria a IA"),
  resaltado: t("en tu empresa?", "in your company?", "in deinem Unternehmen tun?", "na tua empresa?"),
  lede: t(
    "Cuéntame qué hace tu equipo todos los días y te digo qué conectaría primero.",
    "Tell me what your team does every day and I'll tell you what I'd connect first.",
    "Erzähl mir, was dein Team jeden Tag macht, und ich sage dir, was ich zuerst verbinden würde.",
    "Conta-me o que a tua equipa faz todos os dias e digo-te o que ligaria primeiro.",
  ),
  whatsapp: t("Escribir por WhatsApp", "Message on WhatsApp", "Auf WhatsApp schreiben", "Escrever no WhatsApp"),
  mensaje: t(
    "Hola Edgar, vengo de la página de plataformas de monzalab.com",
    "Hi Edgar, I'm coming from the platforms page on monzalab.com",
    "Hallo Edgar, ich komme von der Plattform-Seite auf monzalab.com",
    "Olá Edgar, venho da página de plataformas de monzalab.com",
  ),
  agente: t("O habla con el agente →", "Or talk to the agent →", "Oder sprich mit dem Agenten →", "Ou fala com o agente →"),
};
