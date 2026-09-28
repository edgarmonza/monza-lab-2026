/* /speaker · todo el texto de la página, en los cuatro idiomas (v2, 28-sep-2026).
 * Sale de la Speaker.tsx anterior (hero, números, líneas, charlas, statement) más lo que Edgar
 * decidió ese día: ANDI, Andigraf y Turismo de Portugal fueron CONFERENCIAS (no talleres); en KPMG
 * lideró la adopción de IA en empresas grandes (nunca «renunció» ni «salió»); Forbes con Bavarian
 * Econs; mentor de startups en EAFIT. Sin guiones largos en ningún idioma. */
import type { LangText } from "@/i18n/types";

const t = (es: string, en: string, de: string, pt: string): LangText => ({ es, en, de, pt });
const igual = (s: string): LangText => ({ es: s, en: s, de: s, pt: s });

export const HERO = {
  eyebrow: igual("Edgar Navarro · Speaker"),
  titulo: t("No habla de IA. ", "He doesn't talk about AI. ", "Er redet nicht über KI. ", "Não fala de IA. "),
  resaltado: t("La usa.", "He uses it.", "Er nutzt sie.", "Usa-a."),
  lede: t(
    "Conferencias sobre inteligencia artificial para empresas, gremios y universidades. Cada una se diseña para su público y sale de lo que está construyendo hoy.",
    "Talks on artificial intelligence for companies, industry associations and universities. Each one is designed for its audience and comes from what he is building today.",
    "Vorträge über künstliche Intelligenz für Unternehmen, Verbände und Universitäten. Jeder wird für sein Publikum gestaltet und kommt aus dem, was er heute baut.",
    "Conferências sobre inteligência artificial para empresas, associações e universidades. Cada uma é desenhada para o seu público e nasce do que está a construir hoje.",
  ),
  invitar: t("Invítame a tu evento", "Invite me to your event", "Lade mich zu deinem Event ein", "Convida-me para o teu evento"),
  lineas: t("Ver las conferencias ↓", "See the talks ↓", "Zu den Vorträgen ↓", "Ver as conferências ↓"),
  fondoAlt: t(
    "Edgar Navarro en escenario frente a un auditorio lleno",
    "Edgar Navarro on stage in front of a full auditorium",
    "Edgar Navarro auf der Bühne vor einem vollen Saal",
    "Edgar Navarro em palco perante um auditório cheio",
  ),
};

export const MENSAJE_WA = t(
  "Hola Edgar, me interesa tenerte como speaker en mi evento.",
  "Hi Edgar, I'd like to have you as a speaker at my event.",
  "Hallo Edgar, ich würde dich gern als Speaker für mein Event gewinnen.",
  "Olá Edgar, gostaria de te ter como orador no meu evento.",
);

export const NUMEROS: { n: LangText; label: LangText }[] = [
  { n: igual("15+"), label: t("años construyendo", "years building", "Jahre am Bauen", "anos a construir") },
  { n: igual("6"), label: t("años en KPMG", "years at KPMG", "Jahre bei KPMG", "anos na KPMG") },
  { n: t("1.200+", "1,200+", "1.200+", "1.200+"), label: t("personas en escenario", "people in the audience", "Menschen im Publikum", "pessoas na plateia") },
  { n: igual("2"), label: t("empresas fundadas", "companies founded", "Unternehmen gegründet", "empresas fundadas") },
];

export const QUIEN = {
  eyebrow: t("El speaker", "The speaker", "Der Speaker", "O orador"),
  titulo: t("No viene a hablar de lo que estudió. ", "He doesn't come to talk about what he studied. ", "Er kommt nicht, um über Studiertes zu reden. ", "Não vem falar do que estudou. "),
  resaltado: t("Viene a mostrar lo que hace.", "He comes to show what he builds.", "Er zeigt, was er baut.", "Vem mostrar o que faz."),
  bio: t(
    "Ingeniero industrial. En KPMG lideró la adopción de inteligencia artificial en empresas grandes. Hoy construye empresas con inteligencia artificial desde el primer día, no como herramienta sino como sistema operativo. No habla desde la teoría: habla desde lo que está corriendo hoy.",
    "Industrial engineer. At KPMG he led the adoption of artificial intelligence in large companies. Today he builds companies with artificial intelligence from day one, not as a tool but as an operating system. He doesn't speak from theory: he speaks from what is running today.",
    "Wirtschaftsingenieur. Bei KPMG leitete er die Einführung künstlicher Intelligenz in großen Unternehmen. Heute baut er Unternehmen mit künstlicher Intelligenz vom ersten Tag an, nicht als Werkzeug, sondern als Betriebssystem. Er spricht nicht aus der Theorie, sondern aus dem, was heute läuft.",
    "Engenheiro industrial. Na KPMG liderou a adoção de inteligência artificial em grandes empresas. Hoje constrói empresas com inteligência artificial desde o primeiro dia, não como ferramenta mas como sistema operativo. Não fala a partir da teoria: fala a partir do que está a correr hoje.",
  ),
  retratoAlt: t("Edgar Navarro con gafas oscuras", "Edgar Navarro wearing dark sunglasses", "Edgar Navarro mit dunkler Sonnenbrille", "Edgar Navarro com óculos escuros"),
  rol: igual("Founder & Creative Director · Monza Lab"),
};

export const CREDENCIALES: { k: LangText; b: LangText; s: LangText }[] = [
  {
    k: t("Antes", "Before", "Vorher", "Antes"),
    b: igual("KPMG"),
    s: t(
      "Lideró la adopción de inteligencia artificial en empresas grandes.",
      "Led the adoption of artificial intelligence in large companies.",
      "Leitete die Einführung künstlicher Intelligenz in großen Unternehmen.",
      "Liderou a adoção de inteligência artificial em grandes empresas.",
    ),
  },
  {
    k: t("Prensa", "Press", "Presse", "Imprensa"),
    b: igual("Forbes"),
    s: t(
      "Bavarian Econs, su marca de BMW clásicos eléctricos, en Forbes.",
      "Bavarian Econs, his electric classic BMW brand, in Forbes.",
      "Bavarian Econs, seine Marke für elektrische BMW-Klassiker, in Forbes.",
      "Bavarian Econs, a sua marca de BMW clássicos elétricos, na Forbes.",
    ),
  },
  {
    k: t("Hoy", "Today", "Heute", "Hoje"),
    b: igual("EAFIT"),
    s: t(
      "Mentor de startups en la Universidad EAFIT.",
      "Startup mentor at Universidad EAFIT.",
      "Startup-Mentor an der Universidad EAFIT.",
      "Mentor de startups na Universidade EAFIT.",
    ),
  },
  {
    k: t("Conferencias", "Talks", "Vorträge", "Conferências"),
    b: igual("3"),
    s: t(
      "En ANDI, Andigraf y Turismo de Portugal.",
      "At ANDI, Andigraf and Turismo de Portugal.",
      "Bei ANDI, Andigraf und Turismo de Portugal.",
      "Na ANDI, na Andigraf e no Turismo de Portugal.",
    ),
  },
];

export const STATEMENT = {
  a: t("No da la misma charla dos veces. ", "He never gives the same talk twice. ", "Er hält nie denselben Vortrag zweimal. ", "Nunca dá a mesma palestra duas vezes. "),
  resaltado: t(
    "Diseña cada conferencia como una experiencia",
    "He designs every talk as an experience",
    "Er gestaltet jeden Vortrag als Erlebnis",
    "Desenha cada conferência como uma experiência",
  ),
  b: t(
    " y cruza mundos que nadie más conecta.",
    " and crosses worlds no one else connects.",
    " und verbindet Welten, die sonst niemand zusammenbringt.",
    " e cruza mundos que mais ninguém junta.",
  ),
};

export const ESCENARIOS = {
  eyebrow: t("Conferencias", "Talks", "Vorträge", "Conferências"),
  titulo: t("Lo que ya está en escenario.", "What's already been on stage.", "Was schon auf der Bühne war.", "O que já esteve em palco."),
  items: [
    {
      lugar: igual("Andigraf · Barranquilla"),
      meta: igual("2026"),
      tema: t("La industria gráfica, reinventada con IA", "The printing industry, reinvented with AI", "Die grafische Industrie, neu erfunden mit KI", "A indústria gráfica, reinventada com IA"),
      formato: t("Keynote · presentada por Heidelberg", "Keynote · presented by Heidelberg", "Keynote · präsentiert von Heidelberg", "Keynote · apresentada pela Heidelberg"),
      href: "https://andigraf.monzalab.com",
    },
    {
      lugar: igual("Turismo de Portugal · Lisboa"),
      meta: igual("2026"),
      tema: t("Inteligencia artificial aplicada al turismo", "Artificial intelligence applied to tourism", "Künstliche Intelligenz im Tourismus", "Inteligência artificial aplicada ao turismo"),
      formato: t("Conferencia", "Talk", "Vortrag", "Conferência"),
    },
    {
      lugar: igual("ANDI · Colombia"),
      meta: igual(""),
      tema: t("Conferencia sobre inteligencia artificial", "Talk on artificial intelligence", "Vortrag über künstliche Intelligenz", "Conferência sobre inteligência artificial"),
      formato: t("Gremio empresarial", "Business association", "Unternehmerverband", "Associação empresarial"),
    },
    {
      lugar: igual("Universidad EAFIT · Medellín"),
      meta: t("Hoy", "Today", "Heute", "Hoje"),
      tema: t("Mentoría de startups con inteligencia artificial", "Startup mentoring with artificial intelligence", "Startup-Mentoring mit künstlicher Intelligenz", "Mentoria de startups com inteligência artificial"),
      formato: t("Mentor", "Mentor", "Mentor", "Mentor"),
    },
  ],
  ver: t("Ver la conferencia ↗", "See the talk ↗", "Zum Vortrag ↗", "Ver a conferência ↗"),
};

export const LINEAS = {
  eyebrow: t("Cómo funciona", "How it works", "Wie es funktioniert", "Como funciona"),
  titulo: t("Cada escenario es diferente. ", "Every stage is different. ", "Jede Bühne ist anders. ", "Cada palco é diferente. "),
  resaltado: t("Cada conferencia también.", "Every talk too.", "Jeder Vortrag auch.", "Cada conferência também."),
  lede: t(
    "No repite charlas. Diseña cada experiencia según el público, la industria y lo que necesitan llevarse. Estos son los cuatro mundos que cruza:",
    "He doesn't repeat talks. Each experience is designed for the audience, the industry and what they need to take away. These are the four worlds he crosses:",
    "Er wiederholt keine Vorträge. Jedes Erlebnis wird für das Publikum, die Branche und das gestaltet, was es mitnehmen soll. Das sind die vier Welten, die er verbindet:",
    "Não repete palestras. Cada experiência é desenhada para o público, a indústria e o que precisam de levar. Estes são os quatro mundos que cruza:",
  ),
  items: [
    {
      lente: t("IA × Empresa", "AI × Business", "KI × Unternehmen", "IA × Empresa"),
      titulo: t("La empresa que se compila.", "The company that compiles itself.", "Das Unternehmen, das sich selbst kompiliert.", "A empresa que se compila."),
      texto: t(
        "Construir un negocio donde la IA no es un departamento: es el sistema operativo. Cómo mover más rápido, contratar menos y producir a escala de equipo grande con un equipo pequeño.",
        "Building a business where AI isn't a department: it's the operating system. How to move faster, hire less and produce at big-team scale with a small team.",
        "Ein Unternehmen bauen, in dem KI keine Abteilung ist, sondern das Betriebssystem. Wie man schneller wird, weniger einstellt und mit einem kleinen Team im großen Maßstab produziert.",
        "Construir um negócio onde a IA não é um departamento: é o sistema operativo. Como avançar mais depressa, contratar menos e produzir à escala de uma equipa grande com uma equipa pequena.",
      ),
      para: t("CEOs · founders · juntas directivas", "CEOs · founders · boards", "CEOs · Gründer · Vorstände", "CEOs · founders · conselhos de administração"),
    },
    {
      lente: t("IA × Velocidad", "AI × Speed", "KI × Tempo", "IA × Velocidade"),
      titulo: t("Mover rápido sin romper nada.", "Move fast without breaking anything.", "Schnell sein, ohne etwas kaputt zu machen.", "Andar depressa sem partir nada."),
      texto: t(
        "La velocidad de una startup sin perder la calidad que construye marca. Del automovilismo a varias empresas en paralelo: cómo ejecutar a otro ritmo sin sacrificar lo que importa.",
        "Startup speed without losing the quality that builds a brand. From motorsport to several companies in parallel: how to execute at another pace without sacrificing what matters.",
        "Startup-Tempo, ohne die Qualität zu verlieren, die eine Marke aufbaut. Vom Motorsport bis zu mehreren Unternehmen parallel: wie man in einem anderen Rhythmus umsetzt, ohne das Wichtige zu opfern.",
        "Velocidade de startup sem perder a qualidade que constrói marca. Do automobilismo a várias empresas em paralelo: como executar a outro ritmo sem sacrificar o que importa.",
      ),
      para: t("Emprendedores · equipos de alto rendimiento", "Entrepreneurs · high-performance teams", "Gründer · Hochleistungsteams", "Empreendedores · equipas de alto rendimento"),
    },
    {
      lente: t("IA × Experiencia", "AI × Experience", "KI × Erlebnis", "IA × Experiência"),
      titulo: t("Cada punto de contacto cuenta.", "Every touchpoint counts.", "Jeder Kontaktpunkt zählt.", "Cada ponto de contacto conta."),
      texto: t(
        "No es solo el logo: es toda la experiencia digital, desde que alguien te ve en redes hasta que navega tu web. Las empresas que van a ganar son las que hacen sentir algo en cada interacción, con la IA como amplificador.",
        "It's not just the logo: it's the whole digital experience, from the moment someone sees you on social media to when they browse your website. The companies that will win make people feel something in every interaction, with AI as the amplifier.",
        "Es geht nicht nur um das Logo, sondern um das ganze digitale Erlebnis: vom ersten Blick in den sozialen Medien bis zum Besuch der Website. Gewinnen werden die Unternehmen, die bei jeder Interaktion etwas fühlen lassen, mit KI als Verstärker.",
        "Não é só o logótipo: é toda a experiência digital, desde que alguém te vê nas redes até navegar no teu site. As empresas que vão ganhar são as que fazem sentir algo em cada interação, com a IA como amplificador.",
      ),
      para: t("Directores de marketing · líderes de marca", "Marketing directors · brand leaders", "Marketingleiter · Markenverantwortliche", "Diretores de marketing · líderes de marca"),
    },
    {
      lente: t("IA × Construcción", "AI × Building", "KI × Aufbau", "IA × Construção"),
      titulo: t("De cero a marca global.", "From zero to global brand.", "Von null zur globalen Marke.", "Do zero a marca global."),
      texto: t(
        "Cómo llevar un proyecto de la idea a un producto real con estética global desde Latinoamérica. El proceso completo: validación, marca, tecnología y salida al mercado, con IA desde el primer día.",
        "How to take a project from idea to real product with global aesthetics from Latin America. The whole process: validation, brand, technology and go-to-market, with AI from day one.",
        "Wie man ein Projekt aus Lateinamerika von der Idee zum echten Produkt mit globaler Ästhetik bringt. Der ganze Prozess: Validierung, Marke, Technologie und Markteintritt, mit KI vom ersten Tag an.",
        "Como levar um projeto da ideia a um produto real com estética global a partir da América Latina. O processo completo: validação, marca, tecnologia e entrada no mercado, com IA desde o primeiro dia.",
      ),
      para: t("Founders · producto · innovación", "Founders · product · innovation", "Gründer · Produkt · Innovation", "Founders · produto · inovação"),
    },
  ],
  nota: t(
    "No son temas fijos. El formato, el idioma y el ángulo se definen juntos.",
    "These aren't fixed topics. Format, language and angle are defined together.",
    "Das sind keine festen Themen. Format, Sprache und Blickwinkel werden gemeinsam festgelegt.",
    "Não são temas fixos. O formato, a língua e o ângulo definem-se em conjunto.",
  ),
};

export const FOTOS = {
  eyebrow: t("En escenario", "On stage", "Auf der Bühne", "Em palco"),
  aria: t("Fotos de Edgar dando conferencias", "Photos of Edgar giving talks", "Fotos von Edgar bei Vorträgen", "Fotos do Edgar a dar conferências"),
  items: [
    { src: "/v2/edgar/escenario-kpmg.jpg", pie: igual("KPMG · Bogotá"), alt: t("Edgar en un auditorio lleno", "Edgar in a full auditorium", "Edgar in einem vollen Saal", "Edgar num auditório cheio") },
    { src: "/v2/edgar/escenario-keynote.jpg", pie: igual("Keynote"), alt: t("Edgar dando una conferencia", "Edgar giving a talk", "Edgar bei einem Vortrag", "Edgar a dar uma conferência") },
    { src: "/v2/edgar/escenario-sala.jpg", pie: t("Sala llena · IA en vivo", "Full room · AI live", "Voller Saal · KI live", "Sala cheia · IA ao vivo"), alt: t("Sala llena en una conferencia sobre inteligencia artificial", "A full room at a talk on artificial intelligence", "Voller Saal bei einem Vortrag über künstliche Intelligenz", "Sala cheia numa conferência sobre inteligência artificial") },
    { src: "/v2/edgar/escenario-panel.jpg", pie: t("Panel · innovación", "Panel · innovation", "Panel · Innovation", "Painel · inovação"), alt: t("Edgar en un panel", "Edgar on a panel", "Edgar auf einem Panel", "Edgar num painel") },
    { src: "/v2/edgar/escenario-demoday.jpg", pie: igual("University Demo Day"), alt: t("Edgar en un demo day universitario", "Edgar at a university demo day", "Edgar bei einem Uni-Demo-Day", "Edgar num demo day universitário") },
  ],
};

export const LO_QUE_CONSTRUYE = {
  eyebrow: t("Lo que construye", "What he builds", "Was er baut", "O que constrói"),
  titulo: t("Habla desde estas empresas.", "He speaks from these companies.", "Er spricht aus diesen Unternehmen.", "Fala a partir destas empresas."),
  items: [
    { nombre: "MonzaHaus", desc: t("Porsche de colección", "Collector Porsches", "Sammler-Porsches", "Porsche de coleção"), to: "/work/monza-haus" },
    { nombre: "Bavarian Econs", desc: t("BMW clásicos eléctricos", "Electric classic BMWs", "Elektrische BMW-Klassiker", "BMW clássicos elétricos"), to: "/work/bavarian-econs" },
    { nombre: "Monza Index", desc: t("Adopción de IA en Colombia", "AI adoption in Colombia", "KI-Einführung in Kolumbien", "Adoção de IA na Colômbia"), to: "/work/ia-index" },
    { nombre: "Guardian of Speed", desc: t("Colecciones de carros en Europa", "Car collections in Europe", "Autosammlungen in Europa", "Coleções de carros na Europa"), to: "/work/guardian-of-speed" },
  ],
};

export const CIERRE = {
  eyebrow: t("Tu evento", "Your event", "Dein Event", "O teu evento"),
  titulo: t("¿Quieres traer ", "Want to bring ", "Willst du ", "Queres trazer "),
  resaltado: t("a Monza a tu escenario?", "Monza to your stage?", "Monza auf deine Bühne holen?", "a Monza ao teu palco?"),
  lede: t(
    "Cuéntame el público, la fecha y el formato. El ángulo lo definimos juntos.",
    "Tell me the audience, the date and the format. We define the angle together.",
    "Erzähl mir Publikum, Datum und Format. Den Blickwinkel legen wir gemeinsam fest.",
    "Conta-me o público, a data e o formato. O ângulo definimos juntos.",
  ),
  whatsapp: t("Escribir por WhatsApp", "Write on WhatsApp", "Auf WhatsApp schreiben", "Escrever por WhatsApp"),
};

export const SEO_TEXTOS = {
  titulo: t(
    "Edgar Navarro · Keynote speaker de inteligencia artificial | Monza Lab",
    "Edgar Navarro · Artificial intelligence keynote speaker | Monza Lab",
    "Edgar Navarro · Keynote Speaker für künstliche Intelligenz | Monza Lab",
    "Edgar Navarro · Keynote speaker de inteligência artificial | Monza Lab",
  ),
  descripcion: t(
    "Keynote speaker sobre inteligencia artificial, innovación y company building. En KPMG lideró la adopción de IA en empresas grandes. Conferencias para empresas, gremios y universidades en Latinoamérica, Europa y Estados Unidos.",
    "Keynote speaker on artificial intelligence, innovation and company building. At KPMG he led AI adoption in large companies. Talks for companies, industry associations and universities in Latin America, Europe and the US.",
    "Keynote Speaker für künstliche Intelligenz, Innovation und Company Building. Bei KPMG leitete er die KI-Einführung in großen Unternehmen. Vorträge für Unternehmen, Verbände und Universitäten in Lateinamerika, Europa und den USA.",
    "Keynote speaker sobre inteligência artificial, inovação e company building. Na KPMG liderou a adoção de IA em grandes empresas. Conferências para empresas, associações e universidades na América Latina, Europa e EUA.",
  ),
};
