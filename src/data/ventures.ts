import type { LangText } from "@/i18n/types";

/* Fuente ÚNICA de las ventures. La consumen VenturesGrid (home) y Navbar
 * (dropdown). Un texto que cambie aquí cambia en todas partes. */

export type Venture = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  /** Orden editorial mostrado en la card ("01".."04") — no es el orden del array. */
  number: string;
  url: string | null;
  /** Color de acento en la grid de la home. */
  accent: string;
  /** Color de acento en el dropdown del navbar (a veces difiere del de la grid). */
  navAccent: string;
  cover: string;
  tagline: LangText;
  oneLiner: LangText;
  /** Descripción corta usada solo en el dropdown del navbar. */
  navOneLiner: LangText;
};

export const VENTURES: Venture[] = [
  {
    id: "monzastudio",
    slug: "monzastudio",
    name: "Monza Studio",
    shortName: "Studio",
    number: "03",
    url: null,
    accent: "#f074aa",
    navAccent: "#f074aa",
    cover: "/images/people/santi/santi-clubmaster.png",
    tagline: {
      es: "Una agencia vende piezas. Esto es un circuito.",
      en: "An agency sells pieces. This is a circuit.",
      de: "Eine Agentur verkauft Einzelteile. Das hier ist ein Rundkurs.",
      pt: "Uma agência vende peças. Isto é um circuito.",
    },
    oneLiner: {
      es: "El sistema con el que una marca vende, contesta, se acuerda de sus clientas y mide — instalado y operado contigo.",
      en: "The system a brand sells, answers, remembers its customers and measures with — installed and operated with you.",
      de: "Das System, mit dem eine Marke verkauft, antwortet, sich an ihre Kundinnen erinnert und misst — installiert und mit dir betrieben.",
      pt: "O sistema com que uma marca vende, responde, se lembra das suas clientes e mede — instalado e operado contigo.",
    },
    navOneLiner: {
      es: "El sistema con el que una marca vende — página, WhatsApp que contesta, base de clientas, pauta y tablero — instalado y operado.",
      en: "The system a brand sells with — page, WhatsApp that answers, customer base, ads and dashboard — installed and operated.",
      de: "Das System, mit dem eine Marke verkauft — Seite, WhatsApp, das antwortet, Kundenbasis, Ads und Dashboard — installiert und betrieben.",
      pt: "O sistema com que uma marca vende — página, WhatsApp que responde, base de clientes, anúncios e painel — instalado e operado.",
    },
  },
  {
    id: "monzahaus",
    slug: "monzahaus",
    name: "MonzaHaus",
    shortName: "Haus",
    number: "01",
    url: "https://www.monzahaus.com",
    accent: "#E1CCE5",
    navAccent: "#F8B4D9",
    cover: "/images/projects/monza-haus/917-rear-pure.png",
    tagline: {
      es: "Compra el Porsche correcto, al precio justo.",
      en: "Buy the right Porsche, at the right price.",
      de: "Kauf den richtigen Porsche zum fairen Preis.",
      pt: "Compra o Porsche certo, ao preço justo.",
    },
    oneLiner: {
      es: "Inteligencia de mercado de Porsche en una sola plataforma.",
      en: "Porsche market intelligence on a single platform.",
      de: "Porsche-Marktintelligenz auf einer Plattform.",
      pt: "Inteligência de mercado de Porsche numa única plataforma.",
    },
    navOneLiner: {
      es: "Plataforma para comprar el Porsche correcto al precio justo.",
      en: "Platform to buy the right Porsche at the right price.",
      de: "Plattform, um den richtigen Porsche zum fairen Preis zu kaufen.",
      pt: "Plataforma para comprar o Porsche certo ao preço justo.",
    },
  },
  {
    id: "monzaindex",
    slug: "monzaindex",
    name: "Monza Index",
    shortName: "Index",
    number: "02",
    url: "https://www.monzaindex.ai",
    accent: "#FFFCF7",
    navAccent: "#FFFCF7",
    cover: "/images/projects/ia-index-cover.jpg",
    tagline: {
      es: "Mide qué tan adoptada está la IA.",
      en: "Measures how adopted AI really is.",
      de: "Misst, wie weit KI wirklich verbreitet ist.",
      pt: "Mede o nível real de adoção da IA.",
    },
    oneLiner: {
      es: "Compara países y empresas en adopción real de IA.",
      en: "Compares countries and companies on real AI adoption.",
      de: "Vergleicht Länder und Unternehmen bei echter KI-Adoption.",
      pt: "Compara países e empresas na adoção real da IA.",
    },
    navOneLiner: {
      es: "Mide qué tan adoptada está la IA — país por país, empresa por empresa.",
      en: "Measures real AI adoption — country by country, company by company.",
      de: "Misst echte KI-Adoption — Land für Land, Unternehmen für Unternehmen.",
      pt: "Mede o nível real de adoção da IA — país a país, empresa a empresa.",
    },
  },
  {
    id: "bavarianecons",
    slug: "bavarianecons",
    name: "Bavarian Econs",
    shortName: "Bavarian",
    number: "04",
    url: "https://www.bavarianecons.com",
    accent: "#A8A29E",
    navAccent: "#A8A29E",
    cover: "/images/projects/bavarian-econs/coast-frontal.jpeg",
    tagline: {
      es: "BMW clásicos, ahora eléctricos.",
      en: "Classic BMWs, now electric.",
      de: "Klassische BMWs, jetzt elektrisch.",
      pt: "BMWs clássicos, agora elétricos.",
    },
    oneLiner: {
      es: "Convertimos íconos de los 70 en autos modernos. Hecho a mano en Munich.",
      en: "We turn 70s icons into modern cars. Hand-built in Munich.",
      de: "Wir verwandeln 70er-Ikonen in moderne Autos. Handgefertigt in München.",
      pt: "Convertemos ícones dos anos 70 em carros modernos. Feito à mão em Munique.",
    },
    navOneLiner: {
      es: "Convertimos BMW clásicos de los 70 en autos eléctricos modernos. Hecho a mano en Munich.",
      en: "We turn 70s classic BMWs into modern electric cars. Hand-built in Munich.",
      de: "Wir verwandeln klassische BMWs der 70er in moderne Elektroautos. Handgefertigt in München.",
      pt: "Convertemos BMWs clássicos dos anos 70 em carros elétricos modernos. Feito à mão em Munique.",
    },
  },
];

export const getVentureBySlug = (slug: string): Venture | undefined =>
  VENTURES.find((v) => v.slug === slug);
