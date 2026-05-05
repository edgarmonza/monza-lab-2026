export type LangText = { es: string; en: string; de: string };

export type Venture = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  url: string | null;
  accent: string;
  tagline: LangText;
  oneLiner: LangText;
  cover: string;
};

export const VENTURES: Venture[] = [
  {
    id: "monzastudio",
    slug: "monzastudio",
    name: "Monza Studio",
    shortName: "Studio",
    url: null,
    accent: "#f074aa",
    tagline: {
      es: "Hacemos crecer marcas globales con IA.",
      en: "We grow global brands with AI.",
      de: "Wir lassen globale Marken mit KI wachsen.", pt: "Hacemos crecer marcas globales con IA.",
    },
    oneLiner: {
      es: "Branding, contenido y growth para marcas con presencia.",
      en: "Branding, content and growth for brands with presence.",
      de: "Branding, Content und Growth für Marken mit Präsenz.", pt: "Branding, contenido y growth para marcas con presencia.",
    },
    cover: "/images/brands/eleonora/eleonora-portrait.jpg",
  },
  {
    id: "monzahaus",
    slug: "monzahaus",
    name: "MonzaHaus",
    shortName: "Haus",
    url: "https://www.monzahaus.com",
    accent: "#F8B4D9",
    tagline: {
      es: "Decisiones inteligentes para el ecosistema Porsche.",
      en: "Intelligent decisions for the Porsche ecosystem.",
      de: "Intelligente Entscheidungen für das Porsche-Ökosystem.", pt: "Decisiones inteligentes para el ecosistema Porsche.",
    },
    oneLiner: {
      es: "35.000+ Porsches de Japón, EU y EE.UU. en una sola plataforma AI-native.",
      en: "35,000+ Porsches from Japan, EU and the US on a single AI-native platform.",
      de: "35.000+ Porsche aus Japan, EU und den USA auf einer AI-nativen Plattform.", pt: "35.000+ Porsches de Japón, EU y EE.UU. en una sola plataforma AI-native.",
    },
    cover: "/images/projects/monza-haus-cover.png",
  },
  {
    id: "monzaindex",
    slug: "monzaindex",
    name: "Monza Index",
    shortName: "Index",
    url: "https://www.monzaindex.ai",
    accent: "#C4A35A",
    tagline: {
      es: "Medir la IA no basta. Hay que entenderla.",
      en: "Measuring AI is not enough. You have to understand it.",
      de: "KI zu messen reicht nicht. Man muss sie verstehen.", pt: "Medir la IA no basta. Hay que entenderla.",
    },
    oneLiner: {
      es: "Mide cómo está LATAM frente al mundo en adopción de inteligencia artificial.",
      en: "Measures how LATAM compares to the world in AI adoption.",
      de: "Misst, wie LATAM weltweit bei der KI-Adoption abschneidet.", pt: "Mide cómo está LATAM frente al mundo en adopción de inteligencia artificial.",
    },
    cover: "/images/projects/ia-index-cover.jpg",
  },
];

export const getVentureBySlug = (slug: string): Venture | undefined =>
  VENTURES.find((v) => v.slug === slug);
