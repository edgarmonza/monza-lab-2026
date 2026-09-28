/* Monza Sessions v2 · todo el texto de la página, en los cuatro idiomas.
 * Sale del prototipo docs/internal/portada/prototipo/sessions.html (rosa, gramática de las
 * propuestas de Sessions). Sin precios: la inversión se confirma por WhatsApp. Sin guiones largos,
 * sin nombres de clientes. Alemán con «du»; portugués de Portugal con «tu», como el resto del sitio. */
import type { LangText } from "@/i18n/types";

type T = LangText;
type L<X> = Record<"es" | "en" | "de" | "pt", X>;

const NB = " ";

/* ── hero ── */
export const HERO = {
  eyebrow: { es: "Monza Sessions · Aprender con IA", en: "Monza Sessions · Learning with AI", de: "Monza Sessions · Lernen mit KI", pt: "Monza Sessions · Aprender com IA" } as T,
  h1: { es: `Deja de ver videos de${NB}IA.`, en: `Stop watching AI${NB}videos.`, de: `Hör auf, KI-Videos zu${NB}schauen.`, pt: `Deixa de ver vídeos de${NB}IA.` } as T,
  h1Box: { es: `Ponla a${NB}trabajar.`, en: `Put it to${NB}work.`, de: `Lass sie${NB}arbeiten.`, pt: `Põe-na a${NB}trabalhar.` } as T,
  lede: {
    es: "Talleres, bootcamp y acompañamiento uno a uno para la gente que quiere aprender. En vivo, sobre tu trabajo y con alguien al lado. Sales con algo tuyo funcionando, no con apuntes.",
    en: "Workshops, a bootcamp and one-on-one coaching for people who want to learn. Live, on your own work, with someone beside you. You leave with something of yours running, not with notes.",
    de: "Workshops, ein Bootcamp und Einzelbegleitung für Menschen, die lernen wollen. Live, an deiner eigenen Arbeit und mit jemandem an deiner Seite. Du gehst mit etwas Eigenem, das läuft, nicht mit Notizen.",
    pt: "Workshops, bootcamp e acompanhamento individual para quem quer aprender. Ao vivo, sobre o teu trabalho e com alguém ao lado. Sais com algo teu a funcionar, não com apontamentos.",
  } as T,
  verFormatos: { es: "Ver los formatos", en: "See the formats", de: "Formate ansehen", pt: "Ver os formatos" } as T,
  porDonde: { es: "Por dónde empiezo →", en: "Where do I start →", de: "Wo fange ich an →", pt: "Por onde começo →" } as T,
  toca: { es: "Toca para escuchar", en: "Tap to listen", de: "Tippen zum Anhören", pt: "Toca para ouvir" } as T,
  asi: { es: "Así se vive una Monza Session", en: "This is what a Monza Session feels like", de: "So fühlt sich eine Monza Session an", pt: "Assim se vive uma Monza Session" } as T,
  sonido: { es: "Activar o silenciar el sonido", en: "Turn the sound on or off", de: "Ton ein- oder ausschalten", pt: "Ligar ou silenciar o som" } as T,
  franja: {
    es: ["Monza Sessions", "Aprender haciendo", "En vivo", "Sobre tu trabajo", "WhatsApp abierto", "Nada de apuntes"],
    en: ["Monza Sessions", "Learning by doing", "Live", "On your own work", "WhatsApp open", "No notes"],
    de: ["Monza Sessions", "Lernen durch Tun", "Live", "An deiner Arbeit", "WhatsApp offen", "Keine Notizen"],
    pt: ["Monza Sessions", "Aprender fazendo", "Ao vivo", "Sobre o teu trabalho", "WhatsApp aberto", "Nada de apontamentos"],
  } as L<string[]>,
};

/* ── para quién ── */
export const QUIEN = {
  eyebrow: { es: "Para quién", en: "Who it's for", de: "Für wen", pt: "Para quem" } as T,
  titulo: { es: "Para la gente que quiere aprender.", en: "For people who want to learn.", de: "Für Menschen, die lernen wollen.", pt: "Para quem quer aprender." } as T,
  lede: {
    es: "No necesitas saber programar. Necesitas ganas de construir y algo tuyo sobre qué hacerlo.",
    en: "You don't need to know how to code. You need the drive to build and something of your own to build on.",
    de: "Du musst nicht programmieren können. Du brauchst Lust zu bauen und etwas Eigenes, woran du arbeitest.",
    pt: "Não precisas de saber programar. Precisas de vontade de construir e de algo teu sobre o qual o fazer.",
  } as T,
  items: [
    {
      titulo: { es: "Founders y emprendedores", en: "Founders and entrepreneurs", de: "Founder und Unternehmer", pt: "Founders e empreendedores" } as T,
      texto: { es: "Que quieren construir con IA como parte de su negocio, no como un juguete.", en: "Who want to build with AI as part of their business, not as a toy.", de: "Die mit KI als Teil ihres Geschäfts bauen wollen, nicht als Spielzeug.", pt: "Que querem construir com IA como parte do negócio, não como um brinquedo." } as T,
    },
    {
      titulo: { es: "Profesionales que no quieren quedarse atrás", en: "Professionals who don't want to fall behind", de: "Profis, die nicht zurückbleiben wollen", pt: "Profissionais que não querem ficar para trás" } as T,
      texto: { es: "Y quieren ser quien sabe hacerlo dentro de su empresa.", en: "And want to be the one who knows how inside their company.", de: "Und diejenigen sein wollen, die es in ihrer Firma können.", pt: "E querem ser quem sabe fazê-lo dentro da empresa." } as T,
    },
    {
      titulo: { es: "Equipos y directivos", en: "Teams and leaders", de: "Teams und Führungskräfte", pt: "Equipas e diretores" } as T,
      texto: { es: "Que quieren un arranque común, con los casos de su propia empresa.", en: "Who want a shared start, with their own company's cases.", de: "Die gemeinsam starten wollen, mit Fällen aus der eigenen Firma.", pt: "Que querem um arranque comum, com os casos da própria empresa." } as T,
    },
    {
      titulo: { es: "Curiosos con criterio", en: "Curious people with judgment", de: "Neugierige mit Urteilsvermögen", pt: "Curiosos com critério" } as T,
      texto: { es: "Cansados de tutoriales sueltos que no llevan a ningún lado.", en: "Tired of scattered tutorials that lead nowhere.", de: "Müde von losen Tutorials, die nirgendwo hinführen.", pt: "Cansados de tutoriais soltos que não levam a lado nenhum." } as T,
    },
  ],
};

/* ── hoy / después ── (b = [antes, resaltado, después]) */
export const SEMANA = {
  eyebrow: { es: "Lo que cambia", en: "What changes", de: "Was sich ändert", pt: "O que muda" } as T,
  titulo: { es: "Tu semana, hoy y después de Sessions.", en: "Your week, today and after Sessions.", de: "Deine Woche, heute und nach Sessions.", pt: "A tua semana, hoje e depois das Sessions." } as T,
  hoy: { es: "Hoy", en: "Today", de: "Heute", pt: "Hoje" } as T,
  despues: { es: "Después", en: "After", de: "Danach", pt: "Depois" } as T,
  comparar: { es: "Comparar", en: "Compare", de: "Vergleichen", pt: "Comparar" } as T,
  filas: [
    {
      a: { es: "Ves videos de IA y no sabes por dónde empezar.", en: "You watch AI videos and don't know where to start.", de: "Du schaust KI-Videos und weißt nicht, wo du anfangen sollst.", pt: "Vês vídeos de IA e não sabes por onde começar." } as T,
      b: {
        es: ["Sabes ", "qué herramienta sirve para qué", ", y cuáles no necesitas."],
        en: ["You know ", "which tool is for what", ", and which ones you don't need."],
        de: ["Du weißt, ", "welches Tool wofür taugt", ", und welche du nicht brauchst."],
        pt: ["Sabes ", "que ferramenta serve para quê", ", e quais não precisas."],
      } as L<[string, string, string]>,
    },
    {
      a: { es: "Le pides cosas sueltas a ChatGPT y la mitad no te sirve.", en: "You ask ChatGPT for random things and half of it is useless.", de: "Du fragst ChatGPT nach losen Dingen, und die Hälfte hilft dir nicht.", pt: "Pedes coisas soltas ao ChatGPT e metade não te serve." } as T,
      b: {
        es: ["", "Tu asistente ya conoce", " tu trabajo, tus documentos y tu forma de escribir."],
        en: ["", "Your assistant already knows", " your work, your documents and the way you write."],
        de: ["", "Dein Assistent kennt schon", " deine Arbeit, deine Dokumente und deinen Schreibstil."],
        pt: ["", "O teu assistente já conhece", " o teu trabalho, os teus documentos e a tua forma de escrever."],
      } as L<[string, string, string]>,
    },
    {
      a: { es: "Sales de una reunión y los pendientes dependen de tu memoria.", en: "You leave a meeting and the to-dos depend on your memory.", de: "Du verlässt ein Meeting, und die To-dos hängen an deinem Gedächtnis.", pt: "Sais de uma reunião e os pendentes dependem da tua memória." } as T,
      b: {
        es: ["Cada reunión sale con ", "acta, pendientes y el correo", " de seguimiento."],
        en: ["Every meeting ends with ", "minutes, to-dos and the follow-up email", "."],
        de: ["Jedes Meeting endet mit ", "Protokoll, To-dos und der Follow-up-Mail", "."],
        pt: ["Cada reunião sai com ", "ata, pendentes e o email", " de seguimento."],
      } as L<[string, string, string]>,
    },
    {
      a: { es: "Una presentación te toma una tarde entera.", en: "A presentation takes you a whole afternoon.", de: "Eine Präsentation kostet dich einen ganzen Nachmittag.", pt: "Uma apresentação leva-te uma tarde inteira." } as T,
      b: {
        es: ["Metes los datos y ", "la presentación sale con tu estilo", "."],
        en: ["You put in the data and ", "the deck comes out in your style", "."],
        de: ["Du gibst die Daten ein, und ", "die Präsentation kommt in deinem Stil", "."],
        pt: ["Metes os dados e ", "a apresentação sai com o teu estilo", "."],
      } as L<[string, string, string]>,
    },
    {
      a: { es: "Contestas las mismas preguntas todos los días.", en: "You answer the same questions every day.", de: "Du beantwortest jeden Tag dieselben Fragen.", pt: "Respondes às mesmas perguntas todos os dias." } as T,
      b: {
        es: ["Un asistente ", "te redacta las respuestas", " con tu tono, y tú decides cuándo enviarlas."],
        en: ["An assistant ", "drafts the replies", " in your tone, and you decide when to send them."],
        de: ["Ein Assistent ", "schreibt die Antworten vor", " in deinem Ton, und du entscheidest, wann sie rausgehen."],
        pt: ["Um assistente ", "redige-te as respostas", " com o teu tom, e tu decides quando enviá-las."],
      } as L<[string, string, string]>,
    },
  ],
};

/* ── formatos ── */
export const SALES_CON: T = { es: "Sales con", en: "You leave with", de: "Du gehst mit", pt: "Sais com" };

export type Formato = {
  clave: T;
  titulo: T;
  meta: L<string[]>;
  texto: T;
  sale: T;
  cta: T;
  destacado?: boolean;
  /** Un mensaje de WhatsApp o un ancla de esta página. */
  wa?: T;
  ancla?: string;
  fuente: string;
};

export const FORMATOS = {
  eyebrow: { es: "Los formatos", en: "The formats", de: "Die Formate", pt: "Os formatos" } as T,
  titulo: { es: "Cuatro formatos. Una sola manera de enseñar.", en: "Four formats. One way of teaching.", de: "Vier Formate. Eine Art zu lehren.", pt: "Quatro formatos. Uma só maneira de ensinar." } as T,
  lede: {
    es: "Empieza por donde estés. Todos arrancan conociéndote y todos terminan con algo tuyo funcionando.",
    en: "Start wherever you are. They all begin by getting to know you and all end with something of yours running.",
    de: "Fang an, wo du stehst. Alle beginnen damit, dich kennenzulernen, und alle enden mit etwas Eigenem, das läuft.",
    pt: "Começa por onde estiveres. Todos arrancam por te conhecer e todos terminam com algo teu a funcionar.",
  } as T,
  items: [
    {
      clave: { es: "Para empezar", en: "To get started", de: "Zum Einstieg", pt: "Para começar" },
      titulo: { es: "La tarde", en: "The afternoon", de: "Der Nachmittag", pt: "A tarde" },
      meta: { es: ["4 horas", "Presencial", "Grupo pequeño"], en: ["4 hours", "In person", "Small group"], de: ["4 Stunden", "Vor Ort", "Kleine Gruppe"], pt: ["4 horas", "Presencial", "Grupo pequeno"] },
      texto: {
        es: "Una tarde intensiva, de 2 a 6 p.m., con una hora de diagnóstico uno a uno antes. Dejas de leer sobre IA y la pones a trabajar ahí mismo.",
        en: "An intensive afternoon, 2 to 6 p.m., with a one-hour one-on-one diagnosis beforehand. You stop reading about AI and put it to work right there.",
        de: "Ein intensiver Nachmittag von 14 bis 18 Uhr, vorher eine Stunde Diagnose im Einzelgespräch. Du hörst auf, über KI zu lesen, und setzt sie direkt ein.",
        pt: "Uma tarde intensiva, das 14h às 18h, com uma hora de diagnóstico individual antes. Deixas de ler sobre IA e pões-na a trabalhar ali mesmo.",
      },
      sale: { es: "Tu primer agente funcionando y un plan de treinta días.", en: "Your first agent running and a thirty-day plan.", de: "Deinem ersten laufenden Agenten und einem Plan für dreißig Tage.", pt: "O teu primeiro agente a funcionar e um plano de trinta dias." },
      cta: { es: "Quiero la tarde →", en: "I want the afternoon →", de: "Ich will den Nachmittag →", pt: "Quero a tarde →" },
      wa: { es: "Hola Edgar, me interesa la tarde de Monza Sessions", en: "Hi Edgar, I'm interested in the Monza Sessions afternoon", de: "Hallo Edgar, mich interessiert der Monza-Sessions-Nachmittag", pt: "Olá Edgar, interessa-me a tarde da Monza Sessions" },
      fuente: "sessions_tarde",
    },
    {
      clave: { es: "Para construir en serio", en: "To build for real", de: "Um ernsthaft zu bauen", pt: "Para construir a sério" },
      titulo: { es: "El Bootcamp", en: "The Bootcamp", de: "Das Bootcamp", pt: "O Bootcamp" },
      meta: { es: ["8 semanas", "En vivo", "Cohorte o grupo privado"], en: ["8 weeks", "Live", "Cohort or private group"], de: ["8 Wochen", "Live", "Kohorte oder private Gruppe"], pt: ["8 semanas", "Ao vivo", "Coorte ou grupo privado"] },
      texto: {
        es: "Una sesión en vivo cada semana, entre teoría y práctica, un ejercicio sobre tu trabajo y WhatsApp abierto para todas las preguntas.",
        en: "One live session a week, between theory and practice, an exercise on your own work and WhatsApp open for every question.",
        de: "Eine Live-Session pro Woche, zwischen Theorie und Praxis, eine Übung an deiner Arbeit und WhatsApp offen für alle Fragen.",
        pt: "Uma sessão ao vivo por semana, entre teoria e prática, um exercício sobre o teu trabalho e WhatsApp aberto para todas as perguntas.",
      },
      sale: { es: "Tu asistente andando y un plan para seguir por tu cuenta.", en: "Your assistant running and a plan to keep going on your own.", de: "Deinem laufenden Assistenten und einem Plan, um allein weiterzumachen.", pt: "O teu assistente a andar e um plano para continuares por tua conta." },
      cta: { es: "Ver el programa →", en: "See the program →", de: "Programm ansehen →", pt: "Ver o programa →" },
      destacado: true,
      ancla: "programa",
      fuente: "sessions_bootcamp",
    },
    {
      clave: { es: "Para tu rol", en: "For your role", de: "Für deine Rolle", pt: "Para o teu papel" },
      titulo: { es: "Sessions 1:1", en: "Sessions 1:1", de: "Sessions 1:1", pt: "Sessions 1:1" },
      meta: { es: ["3 meses", "Uno a uno", "WhatsApp directo"], en: ["3 months", "One-on-one", "Direct WhatsApp"], de: ["3 Monate", "Eins zu eins", "Direkter WhatsApp"], pt: ["3 meses", "Individual", "WhatsApp direto"] },
      texto: {
        es: "Tres meses sobre tu trabajo. Lo construimos juntos, con tus proyectos reales, y lo aprendes haciendo. Lo que funcione en ti se lleva después a tu equipo.",
        en: "Three months on your own work. We build it together, with your real projects, and you learn by doing. What works for you is then taken to your team.",
        de: "Drei Monate an deiner Arbeit. Wir bauen es zusammen, mit deinen echten Projekten, und du lernst es beim Machen. Was bei dir funktioniert, bringen wir danach in dein Team.",
        pt: "Três meses sobre o teu trabalho. Construímo-lo juntos, com os teus projetos reais, e aprendes fazendo. O que funcionar contigo leva-se depois à tua equipa.",
      },
      sale: { es: "Tu día ordenado, tu tablero y todo documentado a tu nombre.", en: "Your day in order, your dashboard and everything documented in your name.", de: "Einem geordneten Tag, deinem Dashboard und allem, auf deinen Namen dokumentiert.", pt: "O teu dia arrumado, o teu painel e tudo documentado em teu nome." },
      cta: { es: "Ver cómo son los tres meses →", en: "See how the three months work →", de: "So laufen die drei Monate →", pt: "Ver como são os três meses →" },
      ancla: "uno-a-uno",
      fuente: "sessions_1a1",
    },
    {
      clave: { es: "Para tu empresa", en: "For your company", de: "Für deine Firma", pt: "Para a tua empresa" },
      titulo: { es: "In-company", en: "In-company", de: "In-company", pt: "In-company" },
      meta: { es: ["Una o dos tardes", "Presencial", "10 a 16 personas"], en: ["One or two afternoons", "In person", "10 to 16 people"], de: ["Ein oder zwei Nachmittage", "Vor Ort", "10 bis 16 Personen"], pt: ["Uma ou duas tardes", "Presencial", "10 a 16 pessoas"] },
      texto: {
        es: "Para tu equipo directivo: qué es la IA hoy, qué cambia en tu industria y un taller con los casos de tu propia empresa. Diagnóstico antes de empezar e informe por persona al final.",
        en: "For your leadership team: what AI is today, what changes in your industry and a workshop with your own company's cases. A diagnosis before starting and a report per person at the end.",
        de: "Für dein Führungsteam: was KI heute ist, was sich in deiner Branche ändert, und ein Workshop mit Fällen aus deiner eigenen Firma. Diagnose vor dem Start und ein Bericht pro Person am Ende.",
        pt: "Para a tua equipa de direção: o que é a IA hoje, o que muda na tua indústria e um workshop com os casos da tua própria empresa. Diagnóstico antes de começar e relatório por pessoa no fim.",
      },
      sale: { es: "Los casos de uso de tu empresa, priorizados, y un equipo que sabe por dónde arrancar.", en: "Your company's use cases, prioritized, and a team that knows where to start.", de: "Den Anwendungsfällen deiner Firma, priorisiert, und einem Team, das weiß, wo es anfangen soll.", pt: "Os casos de uso da tua empresa, priorizados, e uma equipa que sabe por onde arrancar." },
      cta: { es: "Llevarlo a mi empresa →", en: "Bring it to my company →", de: "In meine Firma holen →", pt: "Levar à minha empresa →" },
      wa: { es: "Hola Edgar, me interesa una Monza Session para mi empresa", en: "Hi Edgar, I'm interested in a Monza Session for my company", de: "Hallo Edgar, mich interessiert eine Monza Session für meine Firma", pt: "Olá Edgar, interessa-me uma Monza Session para a minha empresa" },
      fuente: "sessions_incompany",
    },
  ] as Formato[],
};

/* ── cómo funciona ── */
export const COMO = {
  eyebrow: { es: "Cómo funciona", en: "How it works", de: "So funktioniert es", pt: "Como funciona" } as T,
  titulo: { es: "Cien por ciento personalizado.", en: "One hundred percent personalized.", de: "Hundert Prozent persönlich.", pt: "Cem por cento personalizado." } as T,
  lede: {
    es: "Nada es genérico: cada sesión, cada ejercicio y cada respuesta salen de lo que haces tú.",
    en: "Nothing is generic: every session, every exercise and every answer come from what you do.",
    de: "Nichts ist generisch: jede Session, jede Übung und jede Antwort kommt aus dem, was du machst.",
    pt: "Nada é genérico: cada sessão, cada exercício e cada resposta saem do que tu fazes.",
  } as T,
  pasos: [
    {
      titulo: { es: "Te conozco primero", en: "I get to know you first", de: "Erst lerne ich dich kennen", pt: "Primeiro conheço-te" } as T,
      tag: { es: "Antes de empezar · uno a uno", en: "Before starting · one-on-one", de: "Vor dem Start · eins zu eins", pt: "Antes de começar · individual" } as T,
      texto: { es: "Una conversación sobre tu trabajo, tu día y lo que más tiempo te quita. Con eso armo las sesiones.", en: "A conversation about your work, your day and what takes most of your time. I build the sessions from that.", de: "Ein Gespräch über deine Arbeit, deinen Tag und das, was dich am meisten Zeit kostet. Daraus baue ich die Sessions.", pt: "Uma conversa sobre o teu trabalho, o teu dia e o que mais tempo te tira. Com isso monto as sessões." } as T,
    },
    {
      titulo: { es: "En vivo, sobre lo tuyo", en: "Live, on your own work", de: "Live, an deinem Material", pt: "Ao vivo, sobre o que é teu" } as T,
      tag: { es: "Entre teoría y práctica", en: "Between theory and practice", de: "Zwischen Theorie und Praxis", pt: "Entre teoria e prática" } as T,
      texto: { es: "Te explico la herramienta y la aplicamos ahí mismo, sobre tus casos. Nunca con ejemplos de otros.", en: "I explain the tool and we apply it right there, to your cases. Never with other people's examples.", de: "Ich erkläre das Tool, und wir wenden es sofort an, auf deine Fälle. Nie mit Beispielen von anderen.", pt: "Explico-te a ferramenta e aplicamo-la ali mesmo, sobre os teus casos. Nunca com exemplos de outros." } as T,
    },
    {
      titulo: { es: "Un ejercicio que se revisa", en: "An exercise that gets reviewed", de: "Eine Übung, die besprochen wird", pt: "Um exercício que se revê" } as T,
      tag: { es: "Sobre tu propio trabajo", en: "On your own work", de: "An deiner eigenen Arbeit", pt: "Sobre o teu próprio trabalho" } as T,
      texto: { es: "Después de cada sesión te dejo algo para aplicar en lo tuyo, y lo revisamos en la siguiente.", en: "After each session I leave you something to apply to your work, and we review it in the next one.", de: "Nach jeder Session gebe ich dir etwas für deine Arbeit mit, und wir besprechen es in der nächsten.", pt: "Depois de cada sessão deixo-te algo para aplicares no que é teu, e revemo-lo na seguinte." } as T,
    },
    {
      titulo: { es: "WhatsApp abierto", en: "WhatsApp open", de: "WhatsApp offen", pt: "WhatsApp aberto" } as T,
      tag: { es: "Toda la semana", en: "All week", de: "Die ganze Woche", pt: "Toda a semana" } as T,
      texto: { es: "Todas las preguntas y todo lo que necesites, sin esperar a la siguiente sesión.", en: "Every question and everything you need, without waiting for the next session.", de: "Alle Fragen und alles, was du brauchst, ohne auf die nächste Session zu warten.", pt: "Todas as perguntas e tudo o que precisares, sem esperar pela sessão seguinte." } as T,
    },
  ],
};

/* ── el Bootcamp, semana a semana ── */
export type SemanaBootcamp = { k: string; t: string; l: string[]; e: string; s: string };

export const PROGRAMA = {
  eyebrow: { es: "El Bootcamp, semana a semana", en: "The Bootcamp, week by week", de: "Das Bootcamp, Woche für Woche", pt: "O Bootcamp, semana a semana" } as T,
  titulo: { es: "Ocho semanas. Cada una deja algo funcionando.", en: "Eight weeks. Each one leaves something running.", de: "Acht Wochen. Jede hinterlässt etwas, das läuft.", pt: "Oito semanas. Cada uma deixa algo a funcionar." } as T,
  semana: { es: "Semana", en: "Week", de: "Woche", pt: "Semana" } as T,
  escoger: { es: "Escoger una semana", en: "Choose a week", de: "Woche wählen", pt: "Escolher uma semana" } as T,
  ejercicio: { es: "El ejercicio de la semana", en: "This week's exercise", de: "Die Übung der Woche", pt: "O exercício da semana" } as T,
  anterior: { es: "Anterior", en: "Previous", de: "Zurück", pt: "Anterior" } as T,
  siguiente: { es: "Siguiente", en: "Next", de: "Weiter", pt: "Seguinte" } as T,
  nota: {
    es: "El programa se ajusta a cada grupo: los ejemplos salen de la conversación del inicio con cada persona.",
    en: "The program adapts to each group: the examples come from the initial conversation with each person.",
    de: "Das Programm passt sich jeder Gruppe an: Die Beispiele kommen aus dem Anfangsgespräch mit jeder Person.",
    pt: "O programa ajusta-se a cada grupo: os exemplos saem da conversa inicial com cada pessoa.",
  } as T,
  semanas: {
    es: [
      { k: "El mapa", t: "Qué es realmente la IA hoy, sin humo", l: ["Qué herramienta sirve para qué: ChatGPT, Claude, Gemini y las pocas que vale la pena conocer.", "Lo que ya se puede hacer en un trabajo como el tuyo, en vivo.", "Dejamos listas tus cuentas y tus herramientas."], e: "Escoger las tres tareas de tu semana que más tiempo te quitan.", s: "Tus herramientas listas y claridad sobre para qué sirve cada cosa." },
      { k: "Hablarle bien", t: "Que te conteste como alguien que conoce tu trabajo", l: ["Contexto, criterio y cómo pedirle y corregirle hasta que la respuesta sirva.", "Proyectos con tus documentos y tu forma de escribir.", "Tu biblioteca de instrucciones empieza aquí."], e: "Cargar tres documentos tuyos y usarlo en una tarea real de la semana.", s: "Tu ChatGPT o tu Claude con tus documentos y tu forma de escribir." },
      { k: "Reuniones y correo", t: "Ninguna reunión sin acta", l: ["Grabar, resumir y sacar los pendientes de cada reunión.", "Correos y seguimientos en minutos, con tu tono.", "Que lo acordado no dependa de tu memoria."], e: "Pasar una reunión real por el proceso: acta, pendientes y correo de seguimiento.", s: "Tus reuniones con acta y pendientes, sin tomar notas." },
      { k: "Investigar", t: "Llegar a la reunión sabiendo más", l: ["Investigación de mercado y de competencia, con fuentes.", "Resumir en minutos un informe o un documento largo.", "Leer tus números y encontrar lo que no se ve a simple vista."], e: "Una investigación sobre un tema de tu trabajo, con sus fuentes.", s: "Tu primera investigación hecha con IA." },
      { k: "Presentar", t: "Una presentación en minutos, no en una tarde", l: ["Presentaciones y plantillas que se llenan con tres datos.", "Imágenes y piezas visuales hechas con IA.", "Tu estilo en todo lo que sale."], e: "Rehacer una presentación tuya de esta semana.", s: "Una presentación hecha en minutos, con tu estilo." },
      { k: "Tu trabajo en orden", t: "Cada cosa en su lugar", l: ["Un espacio por proyecto o cliente, con pendientes y decisiones.", "Que la IA te encuentre lo que buscas en tus propios archivos.", "Tu semana priorizada en cinco minutos."], e: "Pasar tus pendientes de hoy a tu nuevo espacio.", s: "Tu trabajo organizado en un solo lugar." },
      { k: "Tu asistente", t: "Algo que trabaja por ti", l: ["Qué puede hacer un asistente solo y cuándo vale la pena.", "Cada persona arma el suyo, para la tarea que más tiempo le quita.", "Lo ajustamos por WhatsApp durante la semana."], e: "Dejar tu asistente andando en tu trabajo real.", s: "Tu asistente funcionando." },
      { k: "El día de mostrar", t: "Tu semana con todo andando, y lo muestras", l: ["El resumen de tu semana, que te llega solo.", "Cada persona muestra lo que construyó.", "Qué sigue: tu plan para los próximos treinta días."], e: "Tu plan de los próximos treinta días.", s: "Tu asistente andando y un plan para seguir por tu cuenta." },
    ],
    en: [
      { k: "The map", t: "What AI really is today, without the hype", l: ["Which tool is for what: ChatGPT, Claude, Gemini and the few worth knowing.", "What can already be done in a job like yours, live.", "We set up your accounts and your tools."], e: "Pick the three tasks of your week that take up the most time.", s: "Your tools ready and clarity on what each thing is for." },
      { k: "Talking to it well", t: "Answers like from someone who knows your work", l: ["Context, judgment and how to ask and correct it until the answer is useful.", "Projects with your documents and your writing style.", "Your library of instructions starts here."], e: "Upload three of your documents and use it on a real task this week.", s: "Your ChatGPT or Claude with your documents and your writing style." },
      { k: "Meetings and email", t: "No meeting without minutes", l: ["Record, summarize and pull the to-dos out of every meeting.", "Emails and follow-ups in minutes, in your tone.", "So what was agreed doesn't depend on your memory."], e: "Run a real meeting through the process: minutes, to-dos and follow-up email.", s: "Your meetings with minutes and to-dos, without taking notes." },
      { k: "Research", t: "Walking into the meeting knowing more", l: ["Market and competitor research, with sources.", "Summarize a long report or document in minutes.", "Read your numbers and find what isn't visible at first glance."], e: "A piece of research on a topic from your work, with its sources.", s: "Your first research done with AI." },
      { k: "Presenting", t: "A presentation in minutes, not an afternoon", l: ["Decks and templates that fill themselves with three data points.", "Images and visual pieces made with AI.", "Your style in everything that goes out."], e: "Redo one of your presentations from this week.", s: "A presentation made in minutes, in your style." },
      { k: "Your work in order", t: "Everything in its place", l: ["One space per project or client, with to-dos and decisions.", "AI that finds what you're looking for in your own files.", "Your week prioritized in five minutes."], e: "Move today's to-dos into your new space.", s: "Your work organized in one place." },
      { k: "Your assistant", t: "Something that works for you", l: ["What an assistant can do on its own and when it's worth it.", "Each person builds their own, for the task that takes most of their time.", "We fine-tune it over WhatsApp during the week."], e: "Leave your assistant running in your real work.", s: "Your assistant running." },
      { k: "Show day", t: "Your week with everything running, and you show it", l: ["Your weekly summary, which arrives on its own.", "Each person shows what they built.", "What's next: your plan for the next thirty days."], e: "Your plan for the next thirty days.", s: "Your assistant running and a plan to keep going on your own." },
    ],
    de: [
      { k: "Die Landkarte", t: "Was KI heute wirklich ist, ohne Hype", l: ["Welches Tool wofür taugt: ChatGPT, Claude, Gemini und die wenigen, die sich lohnen.", "Was in einem Job wie deinem heute schon geht, live.", "Wir richten deine Konten und Tools ein."], e: "Wähle die drei Aufgaben deiner Woche, die dich am meisten Zeit kosten.", s: "Deinen fertigen Tools und Klarheit, wofür was gut ist." },
      { k: "Richtig mit ihr reden", t: "Antworten wie von jemandem, der deine Arbeit kennt", l: ["Kontext, Urteilsvermögen und wie du fragst und korrigierst, bis die Antwort passt.", "Projekte mit deinen Dokumenten und deinem Schreibstil.", "Deine Bibliothek an Anweisungen beginnt hier."], e: "Lade drei deiner Dokumente hoch und nutze es für eine echte Aufgabe der Woche.", s: "Deinem ChatGPT oder Claude mit deinen Dokumenten und deinem Schreibstil." },
      { k: "Meetings und Mails", t: "Kein Meeting ohne Protokoll", l: ["Jedes Meeting aufnehmen, zusammenfassen und die To-dos herausziehen.", "Mails und Follow-ups in Minuten, in deinem Ton.", "Damit das Vereinbarte nicht an deinem Gedächtnis hängt."], e: "Ein echtes Meeting durch den Prozess schicken: Protokoll, To-dos und Follow-up-Mail.", s: "Deinen Meetings mit Protokoll und To-dos, ohne Notizen zu machen." },
      { k: "Recherchieren", t: "Mit mehr Wissen ins Meeting", l: ["Markt- und Wettbewerbsrecherche, mit Quellen.", "Einen langen Bericht oder ein Dokument in Minuten zusammenfassen.", "Deine Zahlen lesen und finden, was man auf den ersten Blick nicht sieht."], e: "Eine Recherche zu einem Thema aus deiner Arbeit, mit Quellen.", s: "Deiner ersten mit KI gemachten Recherche." },
      { k: "Präsentieren", t: "Eine Präsentation in Minuten, nicht an einem Nachmittag", l: ["Präsentationen und Vorlagen, die sich mit drei Angaben füllen.", "Bilder und visuelle Stücke, mit KI gemacht.", "Dein Stil in allem, was rausgeht."], e: "Eine deiner Präsentationen dieser Woche neu machen.", s: "Einer Präsentation in Minuten, in deinem Stil." },
      { k: "Deine Arbeit in Ordnung", t: "Alles an seinem Platz", l: ["Ein Raum pro Projekt oder Kunde, mit To-dos und Entscheidungen.", "KI, die in deinen eigenen Dateien findet, was du suchst.", "Deine Woche in fünf Minuten priorisiert."], e: "Deine heutigen To-dos in deinen neuen Raum übertragen.", s: "Deiner Arbeit, an einem Ort organisiert." },
      { k: "Dein Assistent", t: "Etwas, das für dich arbeitet", l: ["Was ein Assistent allein kann und wann es sich lohnt.", "Jede Person baut ihren eigenen, für die Aufgabe, die sie am meisten Zeit kostet.", "Wir justieren ihn unter der Woche per WhatsApp."], e: "Deinen Assistenten in deiner echten Arbeit zum Laufen bringen.", s: "Deinem laufenden Assistenten." },
      { k: "Der Tag zum Zeigen", t: "Deine Woche mit allem, was läuft, und du zeigst es", l: ["Die Zusammenfassung deiner Woche, die von selbst kommt.", "Jede Person zeigt, was sie gebaut hat.", "Wie es weitergeht: dein Plan für die nächsten dreißig Tage."], e: "Dein Plan für die nächsten dreißig Tage.", s: "Deinem laufenden Assistenten und einem Plan, um allein weiterzumachen." },
    ],
    pt: [
      { k: "O mapa", t: "O que é realmente a IA hoje, sem fumo", l: ["Que ferramenta serve para quê: ChatGPT, Claude, Gemini e as poucas que vale a pena conhecer.", "O que já se pode fazer num trabalho como o teu, ao vivo.", "Deixamos prontas as tuas contas e as tuas ferramentas."], e: "Escolher as três tarefas da tua semana que mais tempo te tiram.", s: "As tuas ferramentas prontas e clareza sobre para que serve cada coisa." },
      { k: "Falar-lhe bem", t: "Que te responda como alguém que conhece o teu trabalho", l: ["Contexto, critério e como lhe pedir e corrigir até a resposta servir.", "Projetos com os teus documentos e a tua forma de escrever.", "A tua biblioteca de instruções começa aqui."], e: "Carregar três documentos teus e usá-lo numa tarefa real da semana.", s: "O teu ChatGPT ou o teu Claude com os teus documentos e a tua forma de escrever." },
      { k: "Reuniões e email", t: "Nenhuma reunião sem ata", l: ["Gravar, resumir e tirar os pendentes de cada reunião.", "Emails e seguimentos em minutos, com o teu tom.", "Que o que se combinou não dependa da tua memória."], e: "Passar uma reunião real pelo processo: ata, pendentes e email de seguimento.", s: "As tuas reuniões com ata e pendentes, sem tirar notas." },
      { k: "Investigar", t: "Chegar à reunião a saber mais", l: ["Pesquisa de mercado e de concorrência, com fontes.", "Resumir em minutos um relatório ou um documento longo.", "Ler os teus números e encontrar o que não se vê à primeira vista."], e: "Uma pesquisa sobre um tema do teu trabalho, com as suas fontes.", s: "A tua primeira pesquisa feita com IA." },
      { k: "Apresentar", t: "Uma apresentação em minutos, não numa tarde", l: ["Apresentações e modelos que se preenchem com três dados.", "Imagens e peças visuais feitas com IA.", "O teu estilo em tudo o que sai."], e: "Refazer uma apresentação tua desta semana.", s: "Uma apresentação feita em minutos, com o teu estilo." },
      { k: "O teu trabalho em ordem", t: "Cada coisa no seu lugar", l: ["Um espaço por projeto ou cliente, com pendentes e decisões.", "Que a IA te encontre o que procuras nos teus próprios ficheiros.", "A tua semana priorizada em cinco minutos."], e: "Passar os teus pendentes de hoje para o teu novo espaço.", s: "O teu trabalho organizado num só lugar." },
      { k: "O teu assistente", t: "Algo que trabalha por ti", l: ["O que um assistente pode fazer sozinho e quando vale a pena.", "Cada pessoa monta o seu, para a tarefa que mais tempo lhe tira.", "Ajustamo-lo por WhatsApp durante a semana."], e: "Deixar o teu assistente a andar no teu trabalho real.", s: "O teu assistente a funcionar." },
      { k: "O dia de mostrar", t: "A tua semana com tudo a andar, e mostras", l: ["O resumo da tua semana, que te chega sozinho.", "Cada pessoa mostra o que construiu.", "O que se segue: o teu plano para os próximos trinta dias."], e: "O teu plano para os próximos trinta dias.", s: "O teu assistente a andar e um plano para continuares por tua conta." },
    ],
  } as L<SemanaBootcamp[]>,
};

/* ── Sessions 1:1: el mapa por meses ── */
export type Entregable = { n: string; b: string; t: string };
export type Mes = { clave: string; titulo: string; entregables: Entregable[]; nota?: string; queda: string; siguiente: string };

export const UNO = {
  eyebrow: { es: "Sessions 1:1", en: "Sessions 1:1", de: "Sessions 1:1", pt: "Sessions 1:1" } as T,
  titulo: { es: "Tres meses sobre tu rol, todo conectado.", en: "Three months on your role, all connected.", de: "Drei Monate an deiner Rolle, alles verbunden.", pt: "Três meses sobre o teu papel, tudo ligado." } as T,
  lede: {
    es: "Cada mes conecta una parte de tu trabajo y deja algo andando. Toca un mes para ver qué se conecta.",
    en: "Each month connects one part of your work and leaves something running. Tap a month to see what gets connected.",
    de: "Jeder Monat verbindet einen Teil deiner Arbeit und lässt etwas laufen. Tippe auf einen Monat, um zu sehen, was verbunden wird.",
    pt: "Cada mês liga uma parte do teu trabalho e deixa algo a andar. Toca num mês para ver o que se liga.",
  } as T,
  tabs: { es: ["Mes 1", "Mes 2", "Mes 3", "Todo"], en: ["Month 1", "Month 2", "Month 3", "All"], de: ["Monat 1", "Monat 2", "Monat 3", "Alles"], pt: ["Mês 1", "Mês 2", "Mês 3", "Tudo"] } as L<string[]>,
  verMes: { es: "Ver un mes", en: "See a month", de: "Monat ansehen", pt: "Ver um mês" } as T,
  mapaAria: {
    es: "Tus notas, tus datos, las redes y el mercado entran a tu espacio de trabajo; de ahí salen tus pendientes, tu tablero, tus informes y los insights",
    en: "Your notes, your data, social media and the market flow into your workspace; out of it come your to-dos, your dashboard, your reports and the insights",
    de: "Deine Notizen, deine Daten, Social Media und der Markt fließen in deinen Arbeitsraum; heraus kommen deine To-dos, dein Dashboard, deine Berichte und die Insights",
    pt: "As tuas notas, os teus dados, as redes e o mercado entram no teu espaço de trabalho; daí saem os teus pendentes, o teu painel, os teus relatórios e os insights",
  } as T,
  /** arriba (4), el centro (título y subtítulo), abajo (4) */
  nodos: {
    es: { arriba: ["Tus notas", "Tus datos", "Redes", "Mercado"], centro: ["Tu espacio", "un lugar por proyecto"], abajo: ["Pendientes", "Tablero", "Informes", "Insights"] },
    en: { arriba: ["Your notes", "Your data", "Social", "Market"], centro: ["Your space", "one place per project"], abajo: ["To-dos", "Dashboard", "Reports", "Insights"] },
    de: { arriba: ["Notizen", "Daten", "Social", "Markt"], centro: ["Dein Raum", "ein Ort pro Projekt"], abajo: ["To-dos", "Dashboard", "Berichte", "Insights"] },
    pt: { arriba: ["Notas", "Dados", "Redes", "Mercado"], centro: ["O teu espaço", "um lugar por projeto"], abajo: ["Pendentes", "Painel", "Relatórios", "Insights"] },
  } as L<{ arriba: string[]; centro: [string, string]; abajo: string[] }>,
  leyenda: { es: "En rosado, lo que se conecta ese mes.", en: "In pink, what gets connected that month.", de: "In Rosa, was in diesem Monat verbunden wird.", pt: "A rosa, o que se liga nesse mês." } as T,
  queda: { es: "Queda andando", en: "Left running", de: "Läuft danach", pt: "Fica a andar" } as T,
  meses: {
    es: [
      { clave: "Mes 1 · Ordenar", titulo: "Tu día y tus proyectos, en un solo lugar", entregables: [
        { n: "01", b: "Sesión exploratoria.", t: "Me cuentas tu rol y miramos juntos las herramientas que ya usas." },
        { n: "02", b: "El mapa de tu rol.", t: "Dónde se te va el tiempo y qué se puede automatizar primero." },
        { n: "03", b: "Tu asistente, bien armado.", t: "ChatGPT o Claude con tus proyectos, tus documentos y tu forma de escribir." },
        { n: "04", b: "Tus proyectos en un solo lugar.", t: "Un espacio por proyecto con pendientes, tareas y decisiones." },
      ], queda: "Tu espacio de trabajo y tu asistente.", siguiente: "Siguiente mes" },
      { clave: "Mes 2 · Medir sin perseguir", titulo: "Lo que pasa en tu equipo, sin estar encima", entregables: [
        { n: "05", b: "Tu tablero.", t: "Lo que importa de tu trabajo en una sola vista, con un semáforo que te dice dónde mirar." },
        { n: "06", b: "Los avisos.", t: "Si algo se atrasa, te llega un aviso antes de que sea un problema." },
        { n: "07", b: "El correo del lunes.", t: "Lo urgente de cada proyecto, en un solo correo." },
      ], nota: "Lo que se conecta solo depende de los accesos que den tus herramientas. Si solo hay una exportación, el tablero se actualiza cada semana.", queda: "Tu tablero con el primer proyecto, listo para sumar el siguiente.", siguiente: "Siguiente mes" },
      { clave: "Mes 3 · Llegar con criterio", titulo: "Menos tiempo armando, más tiempo pensando", entregables: [
        { n: "08", b: "Tus plantillas.", t: "Metes los números y sale la presentación, con tu marca." },
        { n: "09", b: "Insights de mercado.", t: "Redes, pauta y ventas cruzadas, para llegar a la reunión sabiendo qué funciona y dónde." },
        { n: "10", b: "El manual.", t: "Cómo está hecha cada pieza, para llevarla a tu equipo." },
      ], queda: "Todo documentado y a tu nombre.", siguiente: "Ver todo conectado" },
    ],
    en: [
      { clave: "Month 1 · Order", titulo: "Your day and your projects, in one place", entregables: [
        { n: "01", b: "Discovery session.", t: "You tell me about your role and we look together at the tools you already use." },
        { n: "02", b: "The map of your role.", t: "Where your time goes and what can be automated first." },
        { n: "03", b: "Your assistant, properly set up.", t: "ChatGPT or Claude with your projects, your documents and your writing style." },
        { n: "04", b: "Your projects in one place.", t: "One space per project with to-dos, tasks and decisions." },
      ], queda: "Your workspace and your assistant.", siguiente: "Next month" },
      { clave: "Month 2 · Measure without chasing", titulo: "What happens in your team, without hovering", entregables: [
        { n: "05", b: "Your dashboard.", t: "What matters in your work in a single view, with a traffic light that tells you where to look." },
        { n: "06", b: "The alerts.", t: "If something falls behind, you get an alert before it becomes a problem." },
        { n: "07", b: "The Monday email.", t: "What's urgent in each project, in a single email." },
      ], nota: "What connects automatically depends on the access your tools allow. If there's only an export, the dashboard updates every week.", queda: "Your dashboard with the first project, ready to add the next.", siguiente: "Next month" },
      { clave: "Month 3 · Arrive with judgment", titulo: "Less time assembling, more time thinking", entregables: [
        { n: "08", b: "Your templates.", t: "You put in the numbers and the presentation comes out, with your brand." },
        { n: "09", b: "Market insights.", t: "Social, ads and sales cross-referenced, so you walk into the meeting knowing what works and where." },
        { n: "10", b: "The manual.", t: "How each piece is built, so you can take it to your team." },
      ], queda: "Everything documented and in your name.", siguiente: "See it all connected" },
    ],
    de: [
      { clave: "Monat 1 · Ordnen", titulo: "Dein Tag und deine Projekte, an einem Ort", entregables: [
        { n: "01", b: "Kennenlern-Session.", t: "Du erzählst mir von deiner Rolle, und wir schauen uns gemeinsam die Tools an, die du schon nutzt." },
        { n: "02", b: "Die Landkarte deiner Rolle.", t: "Wo deine Zeit hingeht und was sich zuerst automatisieren lässt." },
        { n: "03", b: "Dein Assistent, richtig aufgesetzt.", t: "ChatGPT oder Claude mit deinen Projekten, deinen Dokumenten und deinem Schreibstil." },
        { n: "04", b: "Deine Projekte an einem Ort.", t: "Ein Raum pro Projekt mit To-dos, Aufgaben und Entscheidungen." },
      ], queda: "Dein Arbeitsraum und dein Assistent.", siguiente: "Nächster Monat" },
      { clave: "Monat 2 · Messen ohne hinterherzulaufen", titulo: "Was in deinem Team passiert, ohne danebenzustehen", entregables: [
        { n: "05", b: "Dein Dashboard.", t: "Was in deiner Arbeit zählt, in einer Ansicht, mit einer Ampel, die dir sagt, wo du hinschauen musst." },
        { n: "06", b: "Die Warnungen.", t: "Wenn sich etwas verzögert, bekommst du eine Warnung, bevor es ein Problem wird." },
        { n: "07", b: "Die Montagsmail.", t: "Das Dringende jedes Projekts, in einer einzigen Mail." },
      ], nota: "Was sich automatisch verbindet, hängt von den Zugängen deiner Tools ab. Gibt es nur einen Export, aktualisiert sich das Dashboard jede Woche.", queda: "Dein Dashboard mit dem ersten Projekt, bereit für das nächste.", siguiente: "Nächster Monat" },
      { clave: "Monat 3 · Mit Urteilsvermögen ankommen", titulo: "Weniger Zeit fürs Zusammenbauen, mehr Zeit zum Denken", entregables: [
        { n: "08", b: "Deine Vorlagen.", t: "Du gibst die Zahlen ein, und die Präsentation kommt heraus, mit deiner Marke." },
        { n: "09", b: "Markt-Insights.", t: "Social Media, Werbung und Verkäufe verknüpft, damit du ins Meeting gehst und weißt, was wo funktioniert." },
        { n: "10", b: "Das Handbuch.", t: "Wie jedes Teil gebaut ist, damit du es in dein Team bringen kannst." },
      ], queda: "Alles dokumentiert und auf deinen Namen.", siguiente: "Alles verbunden ansehen" },
    ],
    pt: [
      { clave: "Mês 1 · Ordenar", titulo: "O teu dia e os teus projetos, num só lugar", entregables: [
        { n: "01", b: "Sessão exploratória.", t: "Contas-me o teu papel e vemos juntos as ferramentas que já usas." },
        { n: "02", b: "O mapa do teu papel.", t: "Onde se te vai o tempo e o que se pode automatizar primeiro." },
        { n: "03", b: "O teu assistente, bem montado.", t: "ChatGPT ou Claude com os teus projetos, os teus documentos e a tua forma de escrever." },
        { n: "04", b: "Os teus projetos num só lugar.", t: "Um espaço por projeto com pendentes, tarefas e decisões." },
      ], queda: "O teu espaço de trabalho e o teu assistente.", siguiente: "Mês seguinte" },
      { clave: "Mês 2 · Medir sem perseguir", titulo: "O que se passa na tua equipa, sem estar em cima", entregables: [
        { n: "05", b: "O teu painel.", t: "O que importa no teu trabalho numa só vista, com um semáforo que te diz onde olhar." },
        { n: "06", b: "Os avisos.", t: "Se algo se atrasa, chega-te um aviso antes de ser um problema." },
        { n: "07", b: "O email de segunda-feira.", t: "O urgente de cada projeto, num só email." },
      ], nota: "O que se liga sozinho depende dos acessos que as tuas ferramentas derem. Se só houver uma exportação, o painel atualiza-se todas as semanas.", queda: "O teu painel com o primeiro projeto, pronto para somar o seguinte.", siguiente: "Mês seguinte" },
      { clave: "Mês 3 · Chegar com critério", titulo: "Menos tempo a montar, mais tempo a pensar", entregables: [
        { n: "08", b: "Os teus modelos.", t: "Metes os números e sai a apresentação, com a tua marca." },
        { n: "09", b: "Insights de mercado.", t: "Redes, anúncios e vendas cruzados, para chegares à reunião a saber o que funciona e onde." },
        { n: "10", b: "O manual.", t: "Como está feita cada peça, para a levares à tua equipa." },
      ], queda: "Tudo documentado e em teu nome.", siguiente: "Ver tudo ligado" },
    ],
  } as L<Mes[]>,
};

/* ── por qué así ── */
export const PORQUE = {
  eyebrow: { es: "Por qué así", en: "Why this way", de: "Warum so", pt: "Porquê assim" } as T,
  manifiesto: {
    es: ["Información sobre IA sobra. Lo que falta es ", "alguien que te diga cuál te sirve a ti."],
    en: ["There's more than enough information about AI. What's missing is ", "someone who tells you which of it works for you."],
    de: ["Informationen über KI gibt es genug. Was fehlt, ist ", "jemand, der dir sagt, was davon dir hilft."],
    pt: ["Informação sobre IA não falta. O que falta é ", "alguém que te diga qual te serve a ti."],
  } as L<[string, string]>,
  tablaAria: { es: "Un curso grabado frente a Monza Sessions", en: "A recorded course versus Monza Sessions", de: "Ein aufgezeichneter Kurs im Vergleich zu Monza Sessions", pt: "Um curso gravado frente à Monza Sessions" } as T,
  encabezado: { es: ["Un curso grabado", "Monza Sessions"], en: ["A recorded course", "Monza Sessions"], de: ["Ein aufgezeichneter Kurs", "Monza Sessions"], pt: ["Um curso gravado", "Monza Sessions"] } as L<[string, string]>,
  filas: {
    es: [["Videos que nunca terminas", "En vivo, con alguien al lado"], ["Ejemplos de otros", "Tus casos, de principio a fin"], ["Ver y olvidar", "Un ejercicio cada semana, sobre lo tuyo"], ["Apuntes", "Algo tuyo funcionando"], ["Solo frente a la pantalla", "WhatsApp abierto toda la semana"]],
    en: [["Videos you never finish", "Live, with someone beside you"], ["Other people's examples", "Your cases, start to finish"], ["Watch and forget", "An exercise every week, on your own work"], ["Notes", "Something of yours running"], ["Alone in front of the screen", "WhatsApp open all week"]],
    de: [["Videos, die du nie zu Ende schaust", "Live, mit jemandem an deiner Seite"], ["Beispiele von anderen", "Deine Fälle, von Anfang bis Ende"], ["Anschauen und vergessen", "Jede Woche eine Übung, an deiner Arbeit"], ["Notizen", "Etwas Eigenes, das läuft"], ["Allein vor dem Bildschirm", "WhatsApp offen, die ganze Woche"]],
    pt: [["Vídeos que nunca acabas", "Ao vivo, com alguém ao lado"], ["Exemplos de outros", "Os teus casos, do início ao fim"], ["Ver e esquecer", "Um exercício por semana, sobre o que é teu"], ["Apontamentos", "Algo teu a funcionar"], ["Sozinho em frente ao ecrã", "WhatsApp aberto toda a semana"]],
  } as L<[string, string][]>,
};

/* ── quién lo enseña ── */
export const EDGAR = {
  eyebrow: { es: "Quién lo enseña", en: "Who teaches it", de: "Wer es unterrichtet", pt: "Quem ensina" } as T,
  rol: "Founder & Creative Director · Monza Lab",
  frase: { es: "No enseño a usar IA. Enseño a trabajar con ella.", en: "I don't teach how to use AI. I teach how to work with it.", de: "Ich bringe nicht bei, KI zu benutzen. Ich bringe bei, mit ihr zu arbeiten.", pt: "Não ensino a usar IA. Ensino a trabalhar com ela." } as T,
  /** [antes, "Bavarian Econs", entre, "MonzaHaus", después] */
  bio: {
    es: ["Soy ingeniero industrial. En KPMG lideré la adopción de inteligencia artificial en empresas grandes. Hoy doy talleres de inteligencia artificial para empresas y gremios, y tengo marcas propias, ", "Bavarian Econs", " y ", "MonzaHaus", ", donde uso todos los días lo que enseño. Lo que ves en una sesión es lo que construyo cada semana."],
    en: ["I'm an industrial engineer. At KPMG I led the adoption of artificial intelligence in large companies. Today I run AI workshops for companies and industry associations, and I have my own brands, ", "Bavarian Econs", " and ", "MonzaHaus", ", where I use every day what I teach. What you see in a session is what I build every week."],
    de: ["Ich bin Wirtschaftsingenieur. Bei KPMG habe ich die Einführung von künstlicher Intelligenz in großen Unternehmen geleitet. Heute gebe ich KI-Workshops für Unternehmen und Verbände und habe eigene Marken, ", "Bavarian Econs", " und ", "MonzaHaus", ", in denen ich jeden Tag nutze, was ich unterrichte. Was du in einer Session siehst, baue ich jede Woche."],
    pt: ["Sou engenheiro industrial. Na KPMG liderei a adoção de inteligência artificial em grandes empresas. Hoje dou workshops de inteligência artificial para empresas e associações, e tenho marcas próprias, ", "Bavarian Econs", " e ", "MonzaHaus", ", onde uso todos os dias o que ensino. O que vês numa sessão é o que construo todas as semanas."],
  } as L<[string, string, string, string, string]>,
  casco: {
    es: ["¿Y el casco?", " Monza viene de las pistas: carros de pista, F1, rápido. Lab, de laboratorio. Junto: un laboratorio rápido, porque itero rápido."],
    en: ["And the helmet?", " Monza comes from the racetrack: race cars, F1, speed. Lab, from laboratory. Together: a fast lab, because I iterate fast."],
    de: ["Und der Helm?", " Monza kommt von der Rennstrecke: Rennwagen, F1, Tempo. Lab von Labor. Zusammen: ein schnelles Labor, weil ich schnell iteriere."],
    pt: ["E o capacete?", " Monza vem das pistas: carros de corrida, F1, rápido. Lab, de laboratório. Junto: um laboratório rápido, porque itero rápido."],
  } as L<[string, string]>,
  chips: {
    es: ["Ingeniero industrial", "Innovación en KPMG", "Talleres para empresas", "Marcas propias"],
    en: ["Industrial engineer", "Innovation at KPMG", "Workshops for companies", "Own brands"],
    de: ["Wirtschaftsingenieur", "Innovation bei KPMG", "Workshops für Unternehmen", "Eigene Marken"],
    pt: ["Engenheiro industrial", "Inovação na KPMG", "Workshops para empresas", "Marcas próprias"],
  } as L<string[]>,
  escenario: { es: "En escenario →", en: "On stage →", de: "Auf der Bühne →", pt: "Em palco →" } as T,
  retratoAlt: { es: "Edgar Navarro con el casco rosa de Monza", en: "Edgar Navarro wearing the pink Monza helmet", de: "Edgar Navarro mit dem rosa Monza-Helm", pt: "Edgar Navarro com o capacete rosa da Monza" } as T,
  salaTitulo: { es: "En sala, en escenario y en la empresa de cada quien.", en: "In the room, on stage and inside each company.", de: "Im Raum, auf der Bühne und in jeder Firma.", pt: "Em sala, em palco e na empresa de cada um." } as T,
  gremiosAria: { es: "Donde he dado conferencias", en: "Where I've given talks", de: "Wo ich Vorträge gehalten habe", pt: "Onde dei conferências" } as T,
  gremiosTitulo: { es: "Conferencias", en: "Talks", de: "Vorträge", pt: "Conferências" } as T,
  gremios: ["ANDI", "Andigraf", "Turismo de Portugal"],
  desliza: { es: "Desliza", en: "Swipe", de: "Wischen", pt: "Desliza" } as T,
  fotos: [
    { src: "/v2/sessions/sala.jpg", w: 1100, h: 825,
      pie: { es: "Sala llena · IA en vivo", en: "Full room · AI live", de: "Voller Saal · KI live", pt: "Sala cheia · IA ao vivo" } as T,
      alt: { es: "Edgar en escenario frente a una sala llena, hablando de inteligencia artificial", en: "Edgar on stage in front of a full room, talking about artificial intelligence", de: "Edgar auf der Bühne vor einem vollen Saal, spricht über künstliche Intelligenz", pt: "Edgar em palco perante uma sala cheia, a falar de inteligência artificial" } as T },
    { src: "/v2/sessions/keynote.jpg", w: 619, h: 1100,
      pie: { es: "Keynote", en: "Keynote", de: "Keynote", pt: "Keynote" } as T,
      alt: { es: "Edgar dando una charla, con su imagen en la pantalla de fondo", en: "Edgar giving a talk, with his image on the screen behind", de: "Edgar hält einen Vortrag, im Hintergrund sein Bild auf der Leinwand", pt: "Edgar a dar uma palestra, com a sua imagem no ecrã ao fundo" } as T },
    { src: "/v2/sessions/escenario.jpg", w: 1100, h: 825,
      pie: { es: "En escenario", en: "On stage", de: "Auf der Bühne", pt: "Em palco" } as T,
      alt: { es: "Un escenario grande con la presentación de Edgar en tres pantallas", en: "A large stage with Edgar's presentation on three screens", de: "Eine große Bühne mit Edgars Präsentation auf drei Leinwänden", pt: "Um palco grande com a apresentação de Edgar em três ecrãs" } as T },
    { src: "/v2/sessions/panel.jpg", w: 1100, h: 825,
      pie: { es: "Panel · innovación", en: "Panel · innovation", de: "Panel · Innovation", pt: "Painel · inovação" } as T,
      alt: { es: "Edgar en un panel sobre innovación", en: "Edgar on a panel about innovation", de: "Edgar in einem Panel über Innovation", pt: "Edgar num painel sobre inovação" } as T },
    { src: "/v2/sessions/demoday.jpg", w: 1024, h: 684,
      pie: { es: "Demo Day universitario", en: "University Demo Day", de: "Uni-Demo-Day", pt: "Demo Day universitário" } as T,
      alt: { es: "Edgar en el panel de un Demo Day universitario", en: "Edgar on the panel of a university Demo Day", de: "Edgar im Panel eines Uni-Demo-Days", pt: "Edgar no painel de um Demo Day universitário" } as T },
  ],
};

/* ── preguntas ── (la última lleva un enlace a Monza Studio: [antes, enlace, después]) */
export type Pregunta = { q: T; a: T; enlace?: { href: string; partes: L<[string, string, string]> } };

export const PREGUNTAS = {
  eyebrow: { es: "Preguntas directas", en: "Straight questions", de: "Direkte Fragen", pt: "Perguntas diretas" } as T,
  titulo: { es: "Lo que casi todos preguntan antes de entrar.", en: "What almost everyone asks before joining.", de: "Was fast alle fragen, bevor sie einsteigen.", pt: "O que quase todos perguntam antes de entrar." } as T,
  items: [
    {
      q: { es: "¿Necesito saber programar?", en: "Do I need to know how to code?", de: "Muss ich programmieren können?", pt: "Preciso de saber programar?" },
      a: {
        es: "No. En todos los formatos aprendes a montar asistentes y automatizaciones sin escribir código, y entiendes cuándo el código suma sin depender de él. Necesitas criterio y ganas de construir.",
        en: "No. In every format you learn to set up assistants and automations without writing code, and you understand when code adds value without depending on it. You need judgment and the drive to build.",
        de: "Nein. In allen Formaten lernst du, Assistenten und Automatisierungen ohne Code aufzusetzen, und verstehst, wann Code etwas bringt, ohne davon abzuhängen. Du brauchst Urteilsvermögen und Lust zu bauen.",
        pt: "Não. Em todos os formatos aprendes a montar assistentes e automações sem escrever código, e percebes quando o código acrescenta sem depender dele. Precisas de critério e vontade de construir.",
      },
    },
    {
      q: { es: "¿Qué formato me sirve a mí?", en: "Which format is right for me?", de: "Welches Format passt zu mir?", pt: "Que formato me serve a mim?" },
      a: {
        es: "La tarde es la puerta de entrada: sales con tu primer agente. El Bootcamp es profundidad: ocho semanas construyendo sobre tu trabajo. Sessions 1:1 es para tu rol, tres meses uno a uno. Y el in-company es para llevarlo a un equipo entero. Si no sabes, escríbeme y te digo por dónde empezar.",
        en: "The afternoon is the way in: you leave with your first agent. The Bootcamp is depth: eight weeks building on your own work. Sessions 1:1 is for your role, three months one-on-one. And in-company is for taking it to a whole team. If you're not sure, write to me and I'll tell you where to start.",
        de: "Der Nachmittag ist der Einstieg: Du gehst mit deinem ersten Agenten. Das Bootcamp ist Tiefe: acht Wochen Bauen an deiner Arbeit. Sessions 1:1 ist für deine Rolle, drei Monate eins zu eins. Und In-company bringt es in ein ganzes Team. Wenn du unsicher bist, schreib mir, und ich sage dir, wo du anfangen sollst.",
        pt: "A tarde é a porta de entrada: sais com o teu primeiro agente. O Bootcamp é profundidade: oito semanas a construir sobre o teu trabalho. Sessions 1:1 é para o teu papel, três meses individuais. E o in-company é para levar a uma equipa inteira. Se não sabes, escreve-me e digo-te por onde começar.",
      },
    },
    {
      q: { es: "¿Es presencial o virtual?", en: "Is it in person or online?", de: "Vor Ort oder online?", pt: "É presencial ou online?" },
      a: {
        es: "La tarde y el in-company son presenciales, en grupo reducido. El Bootcamp y Sessions 1:1 son en vivo por videollamada, con WhatsApp abierto entre sesiones.",
        en: "The afternoon and in-company are in person, in small groups. The Bootcamp and Sessions 1:1 are live by video call, with WhatsApp open between sessions.",
        de: "Der Nachmittag und In-company finden vor Ort statt, in kleinen Gruppen. Das Bootcamp und Sessions 1:1 laufen live per Videocall, mit WhatsApp offen zwischen den Sessions.",
        pt: "A tarde e o in-company são presenciais, em grupo reduzido. O Bootcamp e as Sessions 1:1 são ao vivo por videochamada, com WhatsApp aberto entre sessões.",
      },
    },
    {
      q: { es: "¿Salgo con algo real?", en: "Do I leave with something real?", de: "Gehe ich mit etwas Echtem raus?", pt: "Saio com algo real?" },
      a: {
        es: "Esa es la promesa. En la tarde sales con tu primer agente y un plan de treinta días. En el Bootcamp y en el 1:1 terminas con algo tuyo funcionando en tu trabajo. Nunca con apuntes.",
        en: "That's the promise. In the afternoon you leave with your first agent and a thirty-day plan. In the Bootcamp and the 1:1 you end with something of yours running in your work. Never with notes.",
        de: "Das ist das Versprechen. Am Nachmittag gehst du mit deinem ersten Agenten und einem Plan für dreißig Tage. Im Bootcamp und im 1:1 endest du mit etwas Eigenem, das in deiner Arbeit läuft. Nie mit Notizen.",
        pt: "Essa é a promessa. Na tarde sais com o teu primeiro agente e um plano de trinta dias. No Bootcamp e no 1:1 terminas com algo teu a funcionar no teu trabalho. Nunca com apontamentos.",
      },
    },
    {
      q: { es: "Si hago la tarde, ¿me sirve para el Bootcamp?", en: "If I do the afternoon, does it count toward the Bootcamp?", de: "Wenn ich den Nachmittag mache, zählt das fürs Bootcamp?", pt: "Se fizer a tarde, conta para o Bootcamp?" },
      a: {
        es: "Sí. Lo que invertiste en la tarde se abona al Bootcamp si decides entrar. Está pensado para que subas sin pagar dos veces lo mismo.",
        en: "Yes. What you invested in the afternoon is credited to the Bootcamp if you decide to join. It's designed so you move up without paying twice for the same thing.",
        de: "Ja. Was du in den Nachmittag investiert hast, wird dir beim Bootcamp angerechnet, wenn du einsteigst. So steigst du auf, ohne zweimal dasselbe zu bezahlen.",
        pt: "Sim. O que investiste na tarde é abatido no Bootcamp se decidires entrar. Está pensado para subires sem pagar duas vezes o mesmo.",
      },
    },
    {
      q: { es: "¿Y si quiero que lo construyan conmigo?", en: "What if I want you to build it with me?", de: "Und wenn ich will, dass ihr es mit mir baut?", pt: "E se eu quiser que o construam comigo?" },
      a: {
        es: "Para eso está Monza Studio, para las empresas que se quieren ver creciendo con inteligencia artificial: lo construimos contigo y lo operamos.",
        en: "That's what Monza Studio is for, for companies that want to see themselves growing with artificial intelligence: we build it with you and we run it.",
        de: "Dafür gibt es Monza Studio, für Unternehmen, die sich mit künstlicher Intelligenz wachsen sehen wollen: Wir bauen es mit dir und betreiben es.",
        pt: "Para isso existe o Monza Studio, para as empresas que se querem ver a crescer com inteligência artificial: construímo-lo contigo e operamo-lo.",
      },
      enlace: {
        href: "/shopify",
        partes: {
          es: ["Para eso está ", "Monza Studio", ", para las empresas que se quieren ver creciendo con inteligencia artificial: lo construimos contigo y lo operamos."],
          en: ["That's what ", "Monza Studio", " is for, for companies that want to see themselves growing with artificial intelligence: we build it with you and we run it."],
          de: ["Dafür gibt es ", "Monza Studio", ", für Unternehmen, die sich mit künstlicher Intelligenz wachsen sehen wollen: Wir bauen es mit dir und betreiben es."],
          pt: ["Para isso existe o ", "Monza Studio", ", para as empresas que se querem ver a crescer com inteligência artificial: construímo-lo contigo e operamo-lo."],
        },
      },
    },
  ] as Pregunta[],
};

/* ── cierre ── */
export const CIERRE = {
  eyebrow: { es: "Por dónde empiezo", en: "Where do I start", de: "Wo fange ich an", pt: "Por onde começo" } as T,
  titulo: {
    es: ["Cuéntame qué quieres ", "aprender."],
    en: ["Tell me what you want to ", "learn."],
    de: ["Erzähl mir, was du ", "lernen willst."],
    pt: ["Conta-me o que queres ", "aprender."],
  } as L<[string, string]>,
  lede: {
    es: "La inversión depende del formato y del tamaño del grupo. Escríbeme, te hago dos preguntas y te la confirmo por WhatsApp.",
    en: "The investment depends on the format and the size of the group. Write to me, I'll ask you two questions and confirm it on WhatsApp.",
    de: "Die Investition hängt vom Format und von der Gruppengröße ab. Schreib mir, ich stelle dir zwei Fragen und bestätige sie dir per WhatsApp.",
    pt: "O investimento depende do formato e do tamanho do grupo. Escreve-me, faço-te duas perguntas e confirmo-to por WhatsApp.",
  } as T,
  boton: { es: "Escribir por WhatsApp", en: "Write on WhatsApp", de: "Auf WhatsApp schreiben", pt: "Escrever no WhatsApp" } as T,
  wa: { es: "Hola Edgar, quiero aprender con Monza Sessions", en: "Hi Edgar, I want to learn with Monza Sessions", de: "Hallo Edgar, ich möchte mit Monza Sessions lernen", pt: "Olá Edgar, quero aprender com a Monza Sessions" } as T,
  paso: { es: "Paso", en: "Step", de: "Schritt", pt: "Passo" } as T,
  pasos: {
    es: ["Me escribes qué haces y qué quieres aprender.", "Te digo qué formato te sirve y cuánto es.", "Hacemos la conversación uno a uno y arrancamos."],
    en: ["You write me what you do and what you want to learn.", "I tell you which format fits you and what it costs.", "We have the one-on-one conversation and we start."],
    de: ["Du schreibst mir, was du machst und was du lernen willst.", "Ich sage dir, welches Format zu dir passt und was es kostet.", "Wir führen das Einzelgespräch und legen los."],
    pt: ["Escreves-me o que fazes e o que queres aprender.", "Digo-te que formato te serve e quanto custa.", "Fazemos a conversa individual e arrancamos."],
  } as L<string[]>,
  formulario: { es: "O déjame tus datos y te escribo yo.", en: "Or leave your details and I'll write to you.", de: "Oder hinterlass deine Daten, und ich melde mich.", pt: "Ou deixa os teus dados e eu escrevo-te." } as T,
};

/* ── SEO ── */
export const SEO_SESSIONS = {
  titulo: {
    es: "Monza Sessions: aprende a trabajar con IA | Monza Lab",
    en: "Monza Sessions: learn to work with AI | Monza Lab",
    de: "Monza Sessions: lerne, mit KI zu arbeiten | Monza Lab",
    pt: "Monza Sessions: aprende a trabalhar com IA | Monza Lab",
  } as T,
  descripcion: {
    es: "Talleres, bootcamp de ocho semanas, acompañamiento uno a uno e in-company para aprender a trabajar con IA sobre tu trabajo. En vivo, con Edgar Navarro.",
    en: "Workshops, an eight-week bootcamp, one-on-one coaching and in-company sessions to learn to work with AI on your own work. Live, with Edgar Navarro.",
    de: "Workshops, ein achtwöchiges Bootcamp, Einzelbegleitung und In-Company-Sessions, um mit KI an deiner eigenen Arbeit zu arbeiten. Live, mit Edgar Navarro.",
    pt: "Workshops, bootcamp de oito semanas, acompanhamento individual e in-company para aprender a trabalhar com IA no teu trabalho. Ao vivo, com Edgar Navarro.",
  } as T,
};
