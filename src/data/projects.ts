export type LangText = { es: string; en: string; de: string };

export type Layer = {
  label: string;
  detail: LangText;
};

export type PressLink = {
  name: string;
  href: string;
};

export type ProjectVisual = {
  gradient: string;
  letter: string;
  letterSize: string;
  letterPos: string;
  accent: string;
  decorLine: boolean;
  number: string;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  tag: string;
  desc: LangText;
  image: string | null;
  video: string;
  mobileVideo: string;
  color: string;
  url: string | null;
  caseStudy?: {
    role: string;
    location: string;
    year: string;
    headline: LangText;
    story: LangText;
    pillars: Layer[];
    press: PressLink[];
  };
  gallery?: string[];
  gridClass: string;
  aspect: string;
  visual: ProjectVisual;
};

export const PROJECTS: Project[] = [
  {
    id: "bavarian",
    slug: "bavarian-econs",
    name: "Bavarian Econs",
    tag: "0→1 × LUXURY",
    desc: {
      es: "Marca de lujo automotriz. Branding, web global y sistema de ventas. Featured in Forbes.",
      en: "Automotive luxury brand. Branding, global web & sales system. Featured in Forbes.",
      de: "Automotive Luxusmarke. Branding, globale Web & Vertriebssystem. Featured in Forbes.",
    },
    image: null,
    video: "/videos/bavarian-econs-reel.mp4",
    mobileVideo: "/videos/bavarian-econs-mobile.mp4",
    color: "#C4A35A",
    url: "https://www.bavarianecons.com",
    caseStudy: {
      role: "Co-Founder & Creative Director",
      location: "Europa · USA",
      year: "2022–present",
      headline: {
        es: "De idea a marca de lujo global en un mercado que nadie había tocado.",
        en: "From idea to global luxury brand in a market no one had touched.",
        de: "Von der Idee zur globalen Luxusmarke in einem Markt, den niemand berührt hatte.",
      },
      story: {
        es: "Validé el MVP, estructuré el pitch de financiación y construí el sistema digital completo — desde la identidad de marca hasta el ecosistema de ventas. El BMW 2002 es hoy uno de los clásicos más cotizados del mundo. Bavarian Econs lo electrifica para coleccionistas en Europa y Estados Unidos.",
        en: "I validated the MVP, structured the funding pitch and built the complete digital system — from brand identity to the sales ecosystem. The BMW 2002 is one of the most sought-after classics in the world today. Bavarian Econs electrifies it for collectors in Europe and the United States.",
        de: "Ich validierte das MVP, strukturierte den Finanzierungs-Pitch und baute das komplette digitale System — von der Markenidentität bis zum Vertriebs-Ökosystem. Der BMW 2002 ist heute einer der begehrtesten Klassiker der Welt. Bavarian Econs elektrifiziert ihn für Sammler in Europa und den USA.",
      },
      pillars: [
        { label: "Strategy", detail: { es: "Validación de mercado, MVP y modelo de negocio", en: "Market validation, MVP & business model", de: "Marktvalidierung, MVP & Geschäftsmodell" } },
        { label: "Brand", detail: { es: "Identidad, naming, sistema visual completo", en: "Identity, naming, complete visual system", de: "Identität, Naming, komplettes visuelles System" } },
        { label: "Digital", detail: { es: "Web global, SEO y ecosistema de ventas", en: "Global web, SEO & sales ecosystem", de: "Globale Web, SEO & Vertriebs-Ökosystem" } },
        { label: "Capital", detail: { es: "Pitch deck y ronda de financiación", en: "Pitch deck & funding round", de: "Pitch Deck & Finanzierungsrunde" } },
      ],
      press: [
        { name: "Forbes Colombia", href: "https://forbes.co/2024/09/10/editors-picks/estos-colombianos-estan-electrificando-clasicos-de-bmw-para-coleccionistas-en-europa-y-estados-unidos" },
        { name: "Motor Trend", href: "https://www.motortrend.com/reviews/bmw-2002-bavarian-econs-2002te-ev-swap-first-drive-review" },
        { name: "The Org", href: "https://theorg.com/iterate/bavarian-econs-how-two-colombians-are-reviving-germanys-iconic-auto-industry" },
      ],
    },
    gallery: [
      "/images/projects/bavarian-econs/coast-frontal.jpeg",
      "/images/projects/bavarian-econs/bmw-welt-charging.jpeg",
      "/images/projects/bavarian-econs/badge-detail.jpeg",
      "/images/projects/bavarian-econs/interior-leather.jpeg",
    ],
    gridClass: "md:col-span-2 md:row-span-2",
    aspect: "aspect-[16/10] md:aspect-auto",
    visual: {
      gradient: "radial-gradient(ellipse at 20% 30%, #C4A35A22 0%, transparent 45%), radial-gradient(ellipse at 80% 70%, #C4A35A12 0%, transparent 40%), linear-gradient(135deg, #0D0D14 0%, #141418 100%)",
      letter: "B",
      letterSize: "clamp(120px, 20vw, 320px)",
      letterPos: "bottom-[-5%] right-[-3%]",
      accent: "#C4A35A",
      decorLine: true,
      number: "01",
    },
  },
  {
    id: "spectro",
    slug: "spectro",
    name: "Spectro",
    tag: "PARTNER × GLOBAL CONTENT",
    desc: {
      es: "Plataforma global de entretenimiento deportivo. Socio en Spectro Legends — llevar el contenido audiovisual de Colombia al mundo.",
      en: "Global sports entertainment platform. Partner in Spectro Legends — taking Colombia's audiovisual content to the world.",
      de: "Globale Sport-Entertainment-Plattform. Partner bei Spectro Legends — Kolumbiens audiovisuelle Inhalte in die Welt tragen.",
    },
    image: null,
    video: "/videos/spectro-reel.mp4",
    mobileVideo: "/videos/spectro-mobile.mp4",
    color: "#8B5CF6",
    url: null,
    caseStudy: {
      role: "Partner & Creative Director",
      location: "Colombia · Global",
      year: "2025–present",
      headline: {
        es: "Llevar el contenido audiovisual que se hace en Colombia a cada rincón del planeta.",
        en: "Taking Colombia's audiovisual content to every corner of the planet.",
        de: "Kolumbiens audiovisuelle Inhalte in jeden Winkel der Welt bringen.",
      },
      story: {
        es: "Soy socio en Spectro Legends. Construí el branding completo, la línea gráfica, las landing pages, el sponsor pitch y la estrategia de go-to-market global. Todo el ecosistema digital desde cero. Spectro × Monza para escalar contenido deportivo de Colombia al mundo.",
        en: "I'm a partner in Spectro Legends. I built the complete branding, graphic identity, landing pages, sponsor pitch and global go-to-market strategy. The entire digital ecosystem from scratch. Spectro × Monza to scale Colombia's sports content globally.",
        de: "Ich bin Partner bei Spectro Legends. Ich habe das komplette Branding, die grafische Identität, Landing Pages, den Sponsor-Pitch und die globale Go-to-Market-Strategie aufgebaut. Das gesamte digitale Ökosystem von Grund auf. Spectro × Monza, um Kolumbiens Sportinhalte global zu skalieren.",
      },
      pillars: [
        { label: "Brand", detail: { es: "Identidad visual, logo, línea gráfica completa", en: "Visual identity, logo, complete graphic system", de: "Visuelle Identität, Logo, komplettes Grafiksystem" } },
        { label: "Digital", detail: { es: "Landing pages, sponsor pitch, ecosistema web", en: "Landing pages, sponsor pitch, web ecosystem", de: "Landing Pages, Sponsor-Pitch, Web-Ökosystem" } },
        { label: "Content", detail: { es: "Contenido audiovisual deportivo global", en: "Global sports audiovisual content", de: "Globaler Sport-audiovisueller Content" } },
        { label: "Growth", detail: { es: "Go-to-market global y estrategia de partnerships", en: "Global go-to-market & partnership strategy", de: "Globale Go-to-Market- & Partnerschaftsstrategie" } },
      ],
      press: [],
    },
    gallery: [
      "/images/projects/spectro/camiseta-copa.jpg",
    ],
    gridClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5] md:aspect-auto",
    visual: {
      gradient: "conic-gradient(from 180deg at 50% 50%, #8B5CF608 0deg, #8B5CF620 120deg, #8B5CF608 240deg, #8B5CF600 360deg), linear-gradient(180deg, #0E0D16 0%, #12111A 100%)",
      letter: "S",
      letterSize: "clamp(100px, 18vw, 200px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#8B5CF6",
      decorLine: false,
      number: "02",
    },
  },
  {
    id: "pacho",
    slug: "pacho-alvarez",
    name: "Pacho Alvarez",
    tag: "STUDIO 1:1 × COMPANY BUILDER",
    desc: {
      es: "Piloto del Dakar Rally. Web inmersiva, estructura de negocio, conferencias, pricing y go-to-market.",
      en: "Dakar Rally driver. Immersive web, business structure, conferences, pricing & go-to-market.",
      de: "Dakar-Rally-Fahrer. Immersive Web, Geschäftsstruktur, Konferenzen, Pricing & Go-to-Market.",
    },
    image: null,
    video: "/videos/pacho-alvarez-reel.mp4",
    mobileVideo: "/videos/pacho-alvarez-mobile.mp4",
    color: "#F8B4D9",
    url: null,
    gallery: [],
    gridClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5] md:aspect-auto",
    visual: {
      gradient: "radial-gradient(circle at 70% 20%, #F8B4D918 0%, transparent 50%), radial-gradient(circle at 30% 80%, #F8B4D90C 0%, transparent 40%), linear-gradient(160deg, #110F16 0%, #0D0D14 100%)",
      letter: "PA",
      letterSize: "clamp(60px, 12vw, 140px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#F8B4D9",
      decorLine: false,
      number: "03",
    },
  },
  {
    id: "guardian",
    slug: "guardian-of-speed",
    name: "Guardian of Speed",
    tag: "0→1 × COMPANY BUILDER",
    desc: {
      es: "Transporte de lujo para autos de alta gama en Europa. Experiencia digital hiperpersonalizada, pitch de inversión y go-to-market.",
      en: "Luxury transport for high-end cars in Europe. Hyper-personalized digital experience, investment pitch & go-to-market.",
      de: "Luxus-Transport für High-End-Autos in Europa. Hyperpersonalisierte Digital Experience, Investoren-Pitch & Go-to-Market.",
    },
    image: null,
    video: "/videos/guardian-speed-reel.mp4",
    mobileVideo: "/videos/guardian-speed-mobile.mp4",
    color: "#C4A35A",
    url: null,
    caseStudy: {
      role: "Co-Founder & Creative Director",
      location: "München · Europa",
      year: "2025–present",
      headline: {
        es: "Logística de lujo para los autos más exclusivos del mundo.",
        en: "Luxury logistics for the most exclusive cars in the world.",
        de: "Luxus-Logistik für die exklusivsten Autos der Welt.",
      },
      story: {
        es: "Construí la marca, el sistema digital hiperpersonalizado para clientes y la estructura de crecimiento con inversores. Guardian of Speed transporta autos de alta gama por toda Europa con una experiencia que iguala el nivel de los vehículos que mueve.",
        en: "I built the brand, the hyper-personalized digital system for clients and the growth structure with investors. Guardian of Speed transports high-end cars across Europe with an experience that matches the level of the vehicles it moves.",
        de: "Ich baute die Marke, das hyperpersonalisierte digitale System für Kunden und die Wachstumsstruktur mit Investoren. Guardian of Speed transportiert High-End-Autos durch ganz Europa mit einer Erfahrung, die dem Niveau der Fahrzeuge entspricht.",
      },
      pillars: [
        { label: "Brand", detail: { es: "Identidad premium y sistema visual", en: "Premium identity & visual system", de: "Premium-Identität & visuelles System" } },
        { label: "Digital", detail: { es: "Web y experiencia hiperpersonalizada", en: "Web & hyper-personalized experience", de: "Web & hyperpersonalisierte Erfahrung" } },
        { label: "Capital", detail: { es: "Pitch deck y ronda de inversión", en: "Pitch deck & investment round", de: "Pitch Deck & Investitionsrunde" } },
        { label: "Growth", detail: { es: "Go-to-market y estrategia comercial", en: "Go-to-market & commercial strategy", de: "Go-to-Market & kommerzielle Strategie" } },
      ],
      press: [],
    },
    gallery: [],
    gridClass: "md:col-span-2 md:row-span-1",
    aspect: "aspect-[4/5] md:aspect-auto",
    visual: {
      gradient: "radial-gradient(ellipse at 10% 50%, #C4A35A15 0%, transparent 40%), radial-gradient(ellipse at 90% 50%, #C4A35A10 0%, transparent 40%), linear-gradient(90deg, #14100F 0%, #0D0D14 50%, #14100F 100%)",
      letter: "GS",
      letterSize: "clamp(60px, 12vw, 180px)",
      letterPos: "top-[50%] right-[8%] -translate-y-1/2",
      accent: "#C4A35A",
      decorLine: true,
      number: "04",
    },
  },
  {
    id: "monzahaus",
    slug: "monza-haus",
    name: "Monza Haus",
    tag: "0→1 × PRODUCT",
    desc: {
      es: "El Bloomberg de los carros. Base de datos, frontend, UI y modelo de negocio. En construcción.",
      en: "The Bloomberg of cars. Database, frontend, UI & business model. Under construction.",
      de: "Das Bloomberg der Autos. Datenbank, Frontend, UI & Geschäftsmodell. Im Aufbau.",
    },
    image: null,
    video: "/videos/monza-haus-reel.mp4",
    mobileVideo: "/videos/monza-haus-mobile.mp4",
    color: "#F8B4D9",
    url: null,
    caseStudy: {
      role: "Founder & Product Lead",
      location: "Global",
      year: "2026–present",
      headline: {
        es: "El Bloomberg de los carros.",
        en: "The Bloomberg of cars.",
        de: "Das Bloomberg der Autos.",
      },
      story: {
        es: "Base de datos en tiempo real, configuración de frontend y UI desde cero, y diseño del modelo de negocio. Monza Haus centraliza toda la inteligencia del mercado automotriz en una sola plataforma.",
        en: "Real-time database, frontend and UI configuration from scratch, and business model design. Monza Haus centralizes all automotive market intelligence in a single platform.",
        de: "Echtzeit-Datenbank, Frontend- und UI-Konfiguration von Grund auf und Geschäftsmodell-Design. Monza Haus zentralisiert die gesamte Automotive-Marktintelligenz auf einer einzigen Plattform.",
      },
      pillars: [
        { label: "Database", detail: { es: "Arquitectura de datos en tiempo real", en: "Real-time data architecture", de: "Echtzeit-Datenarchitektur" } },
        { label: "Frontend", detail: { es: "UI/UX desde cero", en: "UI/UX from scratch", de: "UI/UX von Grund auf" } },
        { label: "Product", detail: { es: "Modelo de negocio y go-to-market", en: "Business model & go-to-market", de: "Geschäftsmodell & Go-to-Market" } },
        { label: "AI", detail: { es: "Inteligencia de mercado automotriz", en: "Automotive market intelligence", de: "Automotive-Marktintelligenz" } },
      ],
      press: [],
    },
    gallery: [],
    gridClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5] md:aspect-auto",
    visual: {
      gradient: "radial-gradient(circle at 30% 40%, #F8B4D918 0%, transparent 50%), radial-gradient(circle at 70% 70%, #F8B4D90C 0%, transparent 40%), linear-gradient(160deg, #110F16 0%, #0D0D14 100%)",
      letter: "MH",
      letterSize: "clamp(60px, 12vw, 140px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#F8B4D9",
      decorLine: false,
      number: "05",
    },
  },
];
