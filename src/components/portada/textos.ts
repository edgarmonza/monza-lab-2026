/* Los textos de la portada v2 (28-sep-2026), en los cuatro idiomas.
 * Sale del prototipo aprobado por Edgar: docs/internal/portada/prototipo/index.html.
 * Reglas: sin guiones largos, sin «laboratorio» en el hero, sin nada contractual. */
import type { LangText } from "@/i18n/types";

type T = LangText;
const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });

export const SEO_HOME = {
  titulo: t(
    "Monza Lab · Hacemos crecer marcas con inteligencia artificial",
    "Monza Lab · We grow brands with artificial intelligence",
    "Monza Lab · Wir lassen Marken mit künstlicher Intelligenz wachsen",
    "Monza Lab · Fazemos crescer marcas com inteligência artificial",
  ),
  descripcion: t(
    "Hacemos crecer marcas con inteligencia artificial y con buen gusto: tiendas, plataformas, agentes de WhatsApp y contenido, conectados en un solo sistema.",
    "We grow brands with artificial intelligence and good taste: stores, platforms, WhatsApp agents and content, connected in one system.",
    "Wir lassen Marken mit künstlicher Intelligenz und gutem Geschmack wachsen: Shops, Plattformen, WhatsApp-Agenten und Content, verbunden in einem System.",
    "Fazemos crescer marcas com inteligência artificial e bom gosto: lojas, plataformas, agentes de WhatsApp e conteúdo, ligados num só sistema.",
  ),
};

export const HERO = {
  h1: t(
    "Monza Lab. Hacemos crecer marcas con inteligencia artificial. Y con buen gusto.",
    "Monza Lab. We grow brands with artificial intelligence. And with good taste.",
    "Monza Lab. Wir lassen Marken mit künstlicher Intelligenz wachsen. Und mit gutem Geschmack.",
    "Monza Lab. Fazemos crescer marcas com inteligência artificial. E com bom gosto.",
  ),
  lineaA: t(
    "Hacemos crecer marcas con inteligencia artificial.",
    "We grow brands with artificial intelligence.",
    "Wir lassen Marken mit künstlicher Intelligenz wachsen.",
    "Fazemos crescer marcas com inteligência artificial.",
  ),
  lineaB: t("Y con buen gusto.", "And with good taste.", "Und mit gutem Geschmack.", "E com bom gosto."),
  toca: t("Toca la pantalla", "Tap the screen", "Tippe auf den Bildschirm", "Toca no ecrã"),
  cta: t("Ver proyectos", "See projects", "Projekte ansehen", "Ver projetos"),
};

export const PROYECTOS = {
  eyebrow: t("Lo que hemos construido", "What we've built", "Was wir gebaut haben", "O que construímos"),
  titulo: t("Algunos de nuestros proyectos.", "Some of our projects.", "Einige unserer Projekte.", "Alguns dos nossos projetos."),
  lede: t(
    "Marcas, tiendas, plataformas con inteligencia artificial y productos propios. Toca cualquiera para ver el caso.",
    "Brands, stores, AI platforms and products of our own. Tap any of them to see the case.",
    "Marken, Shops, Plattformen mit künstlicher Intelligenz und eigene Produkte. Tippe auf eines, um den Case zu sehen.",
    "Marcas, lojas, plataformas com inteligência artificial e produtos próprios. Toca em qualquer um para ver o caso.",
  ),
  verCaso: t("Ver el caso →", "See the case →", "Zum Case →", "Ver o caso →"),
  producimos: t("Lo que producimos", "What we produced", "Was wir gemacht haben", "O que produzimos"),
  desliza: t("Desliza", "Swipe", "Wischen", "Desliza"),
};

export const CRITERIO = {
  pistaMouse: t("Mueve el mouse", "Move your mouse", "Bewege die Maus", "Move o rato"),
  pistaDedo: t("Desliza el dedo", "Swipe your finger", "Wische mit dem Finger", "Desliza o dedo"),
  eyebrow: t("Criterio", "Taste", "Stil", "Critério"),
  titulo: t("Que tu marca crezca ", "Let your brand grow ", "Lass deine Marke wachsen, ", "Que a tua marca cresça "),
  resaltado: t("sin verse genérica.", "without looking generic.", "ohne generisch auszusehen.", "sem parecer genérica."),
  lede: t(
    "La inteligencia artificial hace el volumen: fotos, piezas y pantallas todas las semanas. Cada una pasa por dirección creativa antes de salir. Si no se ve como tu marca, no sale.",
    "Artificial intelligence does the volume: photos, pieces and screens every week. Each one goes through creative direction before it ships. If it doesn't look like your brand, it doesn't go out.",
    "Künstliche Intelligenz liefert das Volumen: Fotos, Assets und Screens, jede Woche. Jedes Stück geht durch die Creative Direction, bevor es rausgeht. Wenn es nicht nach deiner Marke aussieht, geht es nicht raus.",
    "A inteligência artificial faz o volume: fotos, peças e ecrãs todas as semanas. Cada uma passa pela direção criativa antes de sair. Se não parecer a tua marca, não sai.",
  ),
  pieSoloio: t("soloio · campaña", "soloio · campaign", "soloio · Kampagne", "soloio · campanha"),
  pieMonza: t("Monza · Instagram", "Monza · Instagram", "Monza · Instagram", "Monza · Instagram"),
};

export const HACEMOS = {
  eyebrow: t("Lo que hacemos", "What we do", "Was wir machen", "O que fazemos"),
  titulo: t(
    "Innovación que se pone a andar rápido.",
    "Innovation that gets moving fast.",
    "Innovation, die schnell ins Laufen kommt.",
    "Inovação que arranca depressa.",
  ),
};

export const EDGAR = {
  eyebrow: t("Quién está detrás del casco", "Who's behind the helmet", "Wer hinter dem Helm steckt", "Quem está por trás do capacete"),
  alt: t(
    "Edgar Navarro con gafas oscuras y audífonos",
    "Edgar Navarro with dark sunglasses and earphones",
    "Edgar Navarro mit dunkler Sonnenbrille und Kopfhörern",
    "Edgar Navarro com óculos escuros e auriculares",
  ),
  rol: t(
    "Founder & Creative Director · Monza Lab",
    "Founder & Creative Director · Monza Lab",
    "Founder & Creative Director · Monza Lab",
    "Founder & Creative Director · Monza Lab",
  ),
  frase: t(
    "Lo que funciona en una, sirve para todas.",
    "What works for one works for all.",
    "Was bei einer funktioniert, funktioniert bei allen.",
    "O que funciona numa serve para todas.",
  ),
  /* La bio va en tres tramos para poner las dos marcas en negrita. */
  bioA: t(
    "Soy ingeniero industrial. En KPMG lideré la adopción de inteligencia artificial en empresas grandes. Hoy construyo marcas, tiendas y plataformas, enseño a equipos a trabajar con inteligencia artificial y tengo mis propias marcas: ",
    "I'm an industrial engineer. At KPMG I led the adoption of artificial intelligence in large companies. Today I build brands, stores and platforms, teach teams to work with artificial intelligence and have brands of my own: ",
    "Ich bin Wirtschaftsingenieur. Bei KPMG habe ich die Einführung künstlicher Intelligenz in großen Unternehmen geleitet. Heute baue ich Marken, Shops und Plattformen, bringe Teams bei, mit künstlicher Intelligenz zu arbeiten, und habe eigene Marken: ",
    "Sou engenheiro industrial. Na KPMG liderei a adoção de inteligência artificial em grandes empresas. Hoje construo marcas, lojas e plataformas, ensino equipas a trabalhar com inteligência artificial e tenho as minhas próprias marcas: ",
  ),
  bioY: t(" y ", " and ", " und ", " e "),
  porque: t("¿Y el casco?", "And the helmet?", "Und der Helm?", "E o capacete?"),
  casco: t(
    " Monza viene de las pistas: carros de pista, F1, rápido. Lab, de laboratorio. Junto: un laboratorio rápido, porque itero rápido.",
    " Monza comes from the racetrack: race cars, F1, speed. Lab, as in laboratory. Together: a fast lab, because I iterate fast.",
    " Monza kommt von der Rennstrecke: Rennwagen, Formel 1, Tempo. Lab steht für Labor. Zusammen: ein schnelles Labor, weil ich schnell iteriere.",
    " Monza vem das pistas: carros de corrida, F1, rapidez. Lab, de laboratório. Junto: um laboratório rápido, porque itero depressa.",
  ),
  escenario: t("En escenario →", "On stage →", "Auf der Bühne →", "Em palco →"),
  credenciales: [
    {
      k: t("Antes", "Before", "Vorher", "Antes"),
      b: t("KPMG", "KPMG", "KPMG", "KPMG"),
      s: t(
        "Lideré la adopción de inteligencia artificial en empresas grandes.",
        "I led the adoption of artificial intelligence in large companies.",
        "Ich habe die Einführung künstlicher Intelligenz in großen Unternehmen geleitet.",
        "Liderei a adoção de inteligência artificial em grandes empresas.",
      ),
    },
    {
      k: t("Prensa", "Press", "Presse", "Imprensa"),
      b: t("Forbes", "Forbes", "Forbes", "Forbes"),
      s: t(
        "Bavarian Econs, mi marca de BMW clásicos eléctricos, en Forbes.",
        "Bavarian Econs, my brand of electric classic BMWs, in Forbes.",
        "Bavarian Econs, meine Marke für elektrische BMW-Klassiker, in Forbes.",
        "Bavarian Econs, a minha marca de BMW clássicos elétricos, na Forbes.",
      ),
    },
    {
      k: t("Hoy", "Today", "Heute", "Hoje"),
      b: t("EAFIT", "EAFIT", "EAFIT", "EAFIT"),
      s: t(
        "Mentor de startups en la Universidad EAFIT.",
        "Startup mentor at Universidad EAFIT.",
        "Startup-Mentor an der Universidad EAFIT.",
        "Mentor de startups na Universidad EAFIT.",
      ),
    },
    {
      k: t("Clientes", "Clients", "Kunden", "Clientes"),
      b: t("5 países", "5 countries", "5 Länder", "5 países"),
      s: t(
        "Colombia, España, Portugal, Alemania y Estados Unidos.",
        "Colombia, Spain, Portugal, Germany and the United States.",
        "Kolumbien, Spanien, Portugal, Deutschland und die USA.",
        "Colômbia, Espanha, Portugal, Alemanha e Estados Unidos.",
      ),
    },
  ],
};

export const SPEAKER = {
  eyebrow: t("Speaker", "Speaker", "Speaker", "Speaker"),
  titulo: t("No hablo de IA. ", "I don't talk about AI. ", "Ich rede nicht über KI. ", "Não falo de IA. "),
  resaltado: t("La uso.", "I use it.", "Ich nutze sie.", "Uso-a."),
  lede: t(
    "Conferencias para empresas, gremios y universidades. No doy la misma charla dos veces: cada una se diseña para su público, su industria y lo que necesitan llevarse.",
    "Talks for companies, industry associations and universities. I never give the same talk twice: each one is designed for its audience, its industry and what they need to take away.",
    "Vorträge für Unternehmen, Verbände und Universitäten. Ich halte nie zweimal denselben Vortrag: Jeder wird für sein Publikum, seine Branche und das gestaltet, was es mitnehmen soll.",
    "Conferências para empresas, associações e universidades. Não dou a mesma palestra duas vezes: cada uma é desenhada para o seu público, a sua indústria e o que precisam de levar.",
  ),
  cifra: t("1.200+", "1,200+", "1.200+", "1.200+"),
  cifraTexto: t("personas en escenario", "people in the audience", "Menschen im Publikum", "pessoas na plateia"),
  invitar: t("Invítame a tu evento", "Invite me to your event", "Lade mich zu deinem Event ein", "Convida-me para o teu evento"),
  mensaje: t(
    "Hola Edgar, me interesa tenerte como speaker en mi evento.",
    "Hi Edgar, I'd like to have you as a speaker at my event.",
    "Hallo Edgar, ich würde dich gern als Speaker für mein Event gewinnen.",
    "Olá Edgar, gostaria de te ter como orador no meu evento.",
  ),
  pagina: t("Ver la página de speaker →", "See the speaker page →", "Zur Speaker-Seite →", "Ver a página de orador →"),
  lentes: [
    {
      i: t("IA × Empresa", "AI × Business", "KI × Unternehmen", "IA × Empresa"),
      b: t("La empresa que se compila.", "The company that compiles itself.", "Das Unternehmen, das sich selbst kompiliert.", "A empresa que se compila."),
      s: t("CEOs · founders · juntas directivas", "CEOs · founders · boards", "CEOs · Gründer · Vorstände", "CEOs · founders · conselhos de administração"),
    },
    {
      i: t("IA × Velocidad", "AI × Speed", "KI × Tempo", "IA × Velocidade"),
      b: t("Mover rápido sin romper nada.", "Move fast without breaking anything.", "Schnell sein, ohne etwas kaputt zu machen.", "Andar depressa sem partir nada."),
      s: t("Emprendedores · equipos de alto rendimiento", "Entrepreneurs · high-performance teams", "Gründer · Hochleistungsteams", "Empreendedores · equipas de alto rendimento"),
    },
    {
      i: t("IA × Experiencia", "AI × Experience", "KI × Erlebnis", "IA × Experiência"),
      b: t("Cada punto de contacto cuenta.", "Every touchpoint counts.", "Jeder Kontaktpunkt zählt.", "Cada ponto de contacto conta."),
      s: t("Directores de marketing · líderes de marca", "Marketing directors · brand leaders", "Marketingleiter · Markenverantwortliche", "Diretores de marketing · líderes de marca"),
    },
    {
      i: t("IA × Construcción", "AI × Building", "KI × Aufbau", "IA × Construção"),
      b: t("De cero a marca global.", "From zero to global brand.", "Von null zur globalen Marke.", "Do zero a marca global."),
      s: t("Founders · producto · innovación", "Founders · product · innovation", "Gründer · Produkt · Innovation", "Founders · produto · inovação"),
    },
  ],
  fotosAria: t("Fotos de Edgar dando charlas", "Photos of Edgar giving talks", "Fotos von Edgar bei Vorträgen", "Fotos do Edgar a dar palestras"),
  fotos: [
    { src: "/v2/edgar/escenario-kpmg.jpg", pie: t("KPMG · Bogotá", "KPMG · Bogotá", "KPMG · Bogotá", "KPMG · Bogotá"), alt: t("Edgar en un auditorio lleno", "Edgar in a full auditorium", "Edgar in einem vollen Saal", "Edgar num auditório cheio") },
    { src: "/v2/edgar/escenario-keynote.jpg", pie: t("Keynote", "Keynote", "Keynote", "Keynote"), alt: t("Edgar dando una charla", "Edgar giving a talk", "Edgar bei einem Vortrag", "Edgar a dar uma palestra") },
    { src: "/v2/edgar/escenario-sala.jpg", pie: t("Sala llena · IA en vivo", "Full room · AI live", "Voller Saal · KI live", "Sala cheia · IA ao vivo"), alt: t("Sala llena en una charla sobre inteligencia artificial", "A full room at a talk on artificial intelligence", "Voller Saal bei einem Vortrag über künstliche Intelligenz", "Sala cheia numa palestra sobre inteligência artificial") },
    { src: "/v2/edgar/escenario-panel.jpg", pie: t("Panel · innovación", "Panel · innovation", "Panel · Innovation", "Painel · inovação"), alt: t("Edgar en un panel", "Edgar on a panel", "Edgar auf einem Panel", "Edgar num painel") },
    { src: "/v2/edgar/escenario-demoday.jpg", pie: t("University Demo Day", "University Demo Day", "University Demo Day", "University Demo Day"), alt: t("Edgar en un demo day universitario", "Edgar at a university demo day", "Edgar bei einem Uni-Demo-Day", "Edgar num demo day universitário") },
  ],
};

export const CIERRE = {
  eyebrow: t("Hablemos", "Let's talk", "Lass uns reden", "Vamos falar"),
  titulo: t("Si te dio curiosidad, ", "If you're curious, ", "Wenn du neugierig bist, ", "Se ficaste com curiosidade, "),
  resaltado: t("escríbeme.", "write to me.", "schreib mir.", "escreve-me."),
  lede: t("Cuéntame qué estás construyendo.", "Tell me what you're building.", "Erzähl mir, was du baust.", "Conta-me o que estás a construir."),
  whatsapp: t("Escribir por WhatsApp", "Write on WhatsApp", "Auf WhatsApp schreiben", "Escrever por WhatsApp"),
  mensaje: t(
    "Hola Edgar, vengo de monzalab.com",
    "Hi Edgar, I'm coming from monzalab.com",
    "Hallo Edgar, ich komme von monzalab.com",
    "Olá Edgar, venho de monzalab.com",
  ),
  agente: t("O habla con el agente →", "Or talk to the agent →", "Oder sprich mit dem Agenten →", "Ou fala com o agente →"),
};
