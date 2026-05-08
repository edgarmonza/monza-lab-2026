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
  video: string | null;
  mobileVideo: string | null;
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
    /** Names to auto-link inside story text (LinkedIn, website, etc.) */
    teamLinks?: Array<{ name: string; url: string }>;
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
      de: "Automotive Luxusmarke. Branding, globale Web & Vertriebssystem. Featured in Forbes.", pt: "Marca de lujo automotriz. Branding, web global y sistema de ventas. Featured in Forbes.",
    },
    image: null,
    video: "/videos/bavarian-econs-reel.mp4",
    mobileVideo: "/videos/bavarian-econs-mobile.mp4",
    color: "#A8A29E",
    url: "https://www.bavarianecons.com",
    caseStudy: {
      role: "Co-Founder & Creative Director",
      location: "Europa · USA",
      year: "2022–present",
      headline: {
        es: "De idea a marca de lujo global en un mercado que nadie había tocado.",
        en: "From idea to global luxury brand in a market no one had touched.",
        de: "Von der Idee zur globalen Luxusmarke in einem Markt, den niemand berührt hatte.", pt: "De idea a marca de lujo global en un mercado que nadie había tocado.",
      },
      story: {
        es: "Validé el MVP, estructuré el pitch de financiación y construí el sistema digital completo — desde la identidad de marca hasta el ecosistema de ventas. El BMW 2002 es hoy uno de los clásicos más cotizados del mundo. Bavarian Econs lo electrifica para coleccionistas en Europa y Estados Unidos.",
        en: "I validated the MVP, structured the funding pitch and built the complete digital system — from brand identity to the sales ecosystem. The BMW 2002 is one of the most sought-after classics in the world today. Bavarian Econs electrifies it for collectors in Europe and the United States.",
        de: "Ich validierte das MVP, strukturierte den Finanzierungs-Pitch und baute das komplette digitale System — von der Markenidentität bis zum Vertriebs-Ökosystem. Der BMW 2002 ist heute einer der begehrtesten Klassiker der Welt. Bavarian Econs elektrifiziert ihn für Sammler in Europa und den USA.", pt: "Validé el MVP, estructuré el pitch de financiación y construí el sistema digital completo — desde la identidad de marca hasta el ecosistema de ventas. El BMW 2002 es hoy uno de los clásicos más cotizados del mundo. Bavarian Econs lo electrifica para coleccionistas en Europa y Estados Unidos.",
      },
      pillars: [
        { label: "Strategy", detail: { es: "Validación de mercado, MVP y modelo de negocio", en: "Market validation, MVP & business model", de: "Marktvalidierung, MVP & Geschäftsmodell", pt: "Validación de mercado, MVP y modelo de negocio" } },
        { label: "Brand", detail: { es: "Identidad, naming, sistema visual completo", en: "Identity, naming, complete visual system", de: "Identität, Naming, komplettes visuelles System", pt: "Identidad, naming, sistema visual completo" } },
        { label: "Digital", detail: { es: "Web global, SEO y ecosistema de ventas", en: "Global web, SEO & sales ecosystem", de: "Globale Web, SEO & Vertriebs-Ökosystem", pt: "Web global, SEO y ecosistema de ventas" } },
        { label: "Capital", detail: { es: "Pitch deck y ronda de financiación", en: "Pitch deck & funding round", de: "Pitch Deck & Finanzierungsrunde", pt: "Pitch deck y ronda de financiación" } },
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
      gradient: "radial-gradient(ellipse at 20% 30%, #A8A29E22 0%, transparent 45%), radial-gradient(ellipse at 80% 70%, #A8A29E12 0%, transparent 40%), linear-gradient(135deg, #0D0D14 0%, #141418 100%)",
      letter: "B",
      letterSize: "clamp(120px, 20vw, 320px)",
      letterPos: "bottom-[-5%] right-[-3%]",
      accent: "#A8A29E",
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
      de: "Globale Sport-Entertainment-Plattform. Partner bei Spectro Legends — Kolumbiens audiovisuelle Inhalte in die Welt tragen.", pt: "Plataforma global de entretenimiento deportivo. Socio en Spectro Legends — llevar el contenido audiovisual de Colombia al mundo.",
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
        de: "Kolumbiens audiovisuelle Inhalte in jeden Winkel der Welt bringen.", pt: "Llevar el contenido audiovisual que se hace en Colombia a cada rincón del planeta.",
      },
      story: {
        es: "Soy socio en Spectro Legends. Construí el branding completo, la línea gráfica, las landing pages, el sponsor pitch y la estrategia de go-to-market global. Todo el ecosistema digital desde cero. Spectro × Monza para escalar contenido deportivo de Colombia al mundo.",
        en: "I'm a partner in Spectro Legends. I built the complete branding, graphic identity, landing pages, sponsor pitch and global go-to-market strategy. The entire digital ecosystem from scratch. Spectro × Monza to scale Colombia's sports content globally.",
        de: "Ich bin Partner bei Spectro Legends. Ich habe das komplette Branding, die grafische Identität, Landing Pages, den Sponsor-Pitch und die globale Go-to-Market-Strategie aufgebaut. Das gesamte digitale Ökosystem von Grund auf. Spectro × Monza, um Kolumbiens Sportinhalte global zu skalieren.", pt: "Soy socio en Spectro Legends. Construí el branding completo, la línea gráfica, las landing pages, el sponsor pitch y la estrategia de go-to-market global. Todo el ecosistema digital desde cero. Spectro × Monza para escalar contenido deportivo de Colombia al mundo.",
      },
      pillars: [
        { label: "Brand", detail: { es: "Identidad visual, logo, línea gráfica completa", en: "Visual identity, logo, complete graphic system", de: "Visuelle Identität, Logo, komplettes Grafiksystem", pt: "Identidad visual, logo, línea gráfica completa" } },
        { label: "Digital", detail: { es: "Landing pages, sponsor pitch, ecosistema web", en: "Landing pages, sponsor pitch, web ecosystem", de: "Landing Pages, Sponsor-Pitch, Web-Ökosystem", pt: "Landing pages, sponsor pitch, ecosistema web" } },
        { label: "Content", detail: { es: "Contenido audiovisual deportivo global", en: "Global sports audiovisual content", de: "Globaler Sport-audiovisueller Content", pt: "Contenido audiovisual deportivo global" } },
        { label: "Growth", detail: { es: "Go-to-market global y estrategia de partnerships", en: "Global go-to-market & partnership strategy", de: "Globale Go-to-Market- & Partnerschaftsstrategie", pt: "Go-to-market global y estrategia de partnerships" } },
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
      de: "Dakar-Rally-Fahrer. Immersive Web, Geschäftsstruktur, Konferenzen, Pricing & Go-to-Market.", pt: "Piloto del Dakar Rally. Web inmersiva, estructura de negocio, conferencias, pricing y go-to-market.",
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
      de: "Luxus-Transport für High-End-Autos in Europa. Hyperpersonalisierte Digital Experience, Investoren-Pitch & Go-to-Market.", pt: "Transporte de lujo para autos de alta gama en Europa. Experiencia digital hiperpersonalizada, pitch de inversión y go-to-market.",
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
        de: "Luxus-Logistik für die exklusivsten Autos der Welt.", pt: "Logística de lujo para los autos más exclusivos del mundo.",
      },
      story: {
        es: "Construí la marca, el sistema digital hiperpersonalizado para clientes y la estructura de crecimiento con inversores. Guardian of Speed transporta autos de alta gama por toda Europa con una experiencia que iguala el nivel de los vehículos que mueve.",
        en: "I built the brand, the hyper-personalized digital system for clients and the growth structure with investors. Guardian of Speed transports high-end cars across Europe with an experience that matches the level of the vehicles it moves.",
        de: "Ich baute die Marke, das hyperpersonalisierte digitale System für Kunden und die Wachstumsstruktur mit Investoren. Guardian of Speed transportiert High-End-Autos durch ganz Europa mit einer Erfahrung, die dem Niveau der Fahrzeuge entspricht.", pt: "Construí la marca, el sistema digital hiperpersonalizado para clientes y la estructura de crecimiento con inversores. Guardian of Speed transporta autos de alta gama por toda Europa con una experiencia que iguala el nivel de los vehículos que mueve.",
      },
      pillars: [
        { label: "Brand", detail: { es: "Identidad premium y sistema visual", en: "Premium identity & visual system", de: "Premium-Identität & visuelles System", pt: "Identidad premium y sistema visual" } },
        { label: "Digital", detail: { es: "Web y experiencia hiperpersonalizada", en: "Web & hyper-personalized experience", de: "Web & hyperpersonalisierte Erfahrung", pt: "Web y experiencia hiperpersonalizada" } },
        { label: "Capital", detail: { es: "Pitch deck y ronda de inversión", en: "Pitch deck & investment round", de: "Pitch Deck & Investitionsrunde", pt: "Pitch deck y ronda de inversión" } },
        { label: "Growth", detail: { es: "Go-to-market y estrategia comercial", en: "Go-to-market & commercial strategy", de: "Go-to-Market & kommerzielle Strategie", pt: "Go-to-market y estrategia comercial" } },
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
    name: "MonzaHaus",
    tag: "VENTURE × AI-NATIVE PLATFORM",
    desc: {
      es: "La plataforma AI-native del ecosistema Porsche. Más de 35,000 Porsches agregados en tiempo real de Japón, la Unión Europea y Estados Unidos para que dealers, coleccionistas y compradores tomen decisiones informadas.",
      en: "The AI-native platform for the Porsche ecosystem. 35,000+ Porsches aggregated in real time from Japan, the EU and the United States so dealers, collectors and buyers can make informed decisions.",
      de: "Die AI-native Plattform für das Porsche-Ökosystem. 35.000+ Porsche in Echtzeit aus Japan, der EU und den USA aggregiert — damit Händler, Sammler und Käufer informierte Entscheidungen treffen.", pt: "La plataforma AI-native del ecosistema Porsche. Más de 35,000 Porsches agregados en tiempo real de Japón, la Unión Europea y Estados Unidos para que dealers, coleccionistas y compradores tomen decisiones informadas.",
    },
    image: "/images/projects/monza-haus/917-rear-pure.png",
    video: null,
    mobileVideo: null,
    color: "#E1CCE5",
    url: "https://www.monzahaus.com",
    caseStudy: {
      role: "Founder & Product Lead",
      location: "Global",
      year: "2026–present",
      headline: {
        es: "Una sola plataforma para que todo el ecosistema Porsche decida con información real.",
        en: "One platform for the entire Porsche ecosystem to decide with real information.",
        de: "Eine Plattform, auf der das gesamte Porsche-Ökosystem mit echten Informationen entscheidet.", pt: "Una sola plataforma para que todo el ecosistema Porsche decida con información real.",
      },
      story: {
        es: "MonzaHaus es una venture AI-native desarrollada por Monza Lab para transformar la forma en que la industria automotriz hace las cosas. Agregamos en tiempo real más de 35,000 Porsches de Japón, la Unión Europea y Estados Unidos — pricing por mercado, market overview por generación y listings con acceso directo — para que dealers, coleccionistas y compradores globales tomen decisiones informadas. Lideré arquitectura de datos, UI desde cero con un user experience diferencial, modelo de negocio (Reports, packs one-time, suscripción y visión Salon premium) y un go-to-market completamente automatizado: el contenido editorial para redes (captions, listing cards, reels) se genera con AI a partir de los listings reales de la plataforma.",
        en: "MonzaHaus is an AI-native venture by Monza Lab built to transform how the automotive industry operates. We aggregate 35,000+ Porsches in real time from Japan, the EU and the United States — per-market pricing, per-generation market overview and listings with direct access — so global dealers, collectors and buyers can make informed decisions. I led the data architecture, the UI from scratch with a differential user experience, the business model (Reports, one-time packs, subscription and the premium Salon vision) and a fully automated go-to-market: editorial social content (captions, listing cards, reels) is AI-generated directly from live platform listings.",
        de: "MonzaHaus ist ein AI-natives Venture von Monza Lab, das die Arbeitsweise der Automotive-Industrie transformiert. Wir aggregieren in Echtzeit 35.000+ Porsche aus Japan, der EU und den USA — Pricing pro Markt, Market Overview pro Generation und Listings mit Direktzugriff — damit globale Händler, Sammler und Käufer informierte Entscheidungen treffen. Ich führte die Datenarchitektur, die UI von Grund auf mit differenziertem User Experience, das Geschäftsmodell (Reports, One-Time-Packs, Subscription und die Premium Salon Vision) und einen voll automatisierten Go-to-Market: Editorial-Content für Social (Captions, Listing Cards, Reels) wird AI-generiert direkt aus den Live-Listings der Plattform.", pt: "MonzaHaus es una venture AI-native desarrollada por Monza Lab para transformar la forma en que la industria automotriz hace las cosas. Agregamos en tiempo real más de 35,000 Porsches de Japón, la Unión Europea y Estados Unidos — pricing por mercado, market overview por generación y listings con acceso directo — para que dealers, coleccionistas y compradores globales tomen decisiones informadas. Lideré arquitectura de datos, UI desde cero con un user experience diferencial, modelo de negocio (Reports, packs one-time, suscripción y visión Salon premium) y un go-to-market completamente automatizado: el contenido editorial para redes (captions, listing cards, reels) se genera con AI a partir de los listings reales de la plataforma.",
      },
      pillars: [
        { label: "Data", detail: { es: "35,000+ Porsches agregados en tiempo real de Japón, UE y EEUU", en: "35,000+ Porsches aggregated in real time from Japan, EU and the US", de: "35.000+ Porsche in Echtzeit aus Japan, EU und den USA aggregiert", pt: "35,000+ Porsches agregados en tiempo real de Japón, UE y EEUU" } },
        { label: "Product", detail: { es: "UI editorial, user experience diferencial y market intelligence por modelo", en: "Editorial UI, differential user experience and per-model market intelligence", de: "Editorial-UI, differenzierte UX und Market Intelligence pro Modell", pt: "UI editorial, user experience diferencial y market intelligence por modelo" } },
        { label: "Monetization", detail: { es: "Reports, packs one-time y suscripción — visión Salon premium", en: "Reports, one-time packs and subscription — premium Salon vision", de: "Reports, One-Time-Packs und Subscription — Premium Salon Vision", pt: "Reports, packs one-time y suscripción — visión Salon premium" } },
        { label: "Go-to-Market", detail: { es: "Contenido editorial de redes generado con AI desde los listings reales", en: "Editorial social content AI-generated from live platform listings", de: "Editorial-Social-Content AI-generiert aus den Live-Listings", pt: "Contenido editorial de redes generado con AI desde los listings reales" } },
      ],
      press: [],
    },
    gallery: [
      "/images/projects/monza-haus/post-gt3-992.png",
      "/images/projects/monza-haus/post-targa-4-gts.png",
      "/images/projects/monza-haus/post-930-turbo.png",
    ],
    gridClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5] md:aspect-auto",
    visual: {
      gradient: "radial-gradient(circle at 30% 40%, #E1CCE518 0%, transparent 50%), radial-gradient(circle at 70% 70%, #E1CCE50C 0%, transparent 40%), linear-gradient(160deg, #110F16 0%, #0D0D14 100%)",
      letter: "MH",
      letterSize: "clamp(60px, 12vw, 140px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#E1CCE5",
      decorLine: false,
      number: "05",
    },
  },
  {
    id: "iaindex",
    slug: "ia-index",
    name: "IA Index",
    tag: "VENTURE × MARKET INTELLIGENCE",
    desc: {
      es: "El primer índice que mide la penetración real de la inteligencia artificial en empresas y personas. Co-creamos reportes con empresas líderes y generamos data de valor para todo el ecosistema.",
      en: "The first index measuring real AI penetration across companies and people. We co-create reports with leading companies and generate valuable data for the entire ecosystem.",
      de: "Der erste Index, der die echte KI-Penetration in Unternehmen und Personen misst. Wir co-kreieren Reports mit führenden Unternehmen und generieren wertvolle Daten für das gesamte Ökosystem.", pt: "El primer índice que mide la penetración real de la inteligencia artificial en empresas y personas. Co-creamos reportes con empresas líderes y generamos data de valor para todo el ecosistema.",
    },
    image: "/images/projects/ia-index-cover.jpg",
    video: null,
    mobileVideo: null,
    color: "#C4A35A",
    url: "https://www.monzaindex.ai",
    caseStudy: {
      role: "Co-Founder",
      location: "Colombia · LATAM · Global",
      year: "Beta live · Launch público Agosto 2026",
      headline: {
        es: "Midiendo la revolución de la IA — dato por dato, sector por sector.",
        en: "Measuring the AI revolution — data by data, sector by sector.",
        de: "Wir messen die KI-Revolution — Datenpunkt für Datenpunkt, Sektor für Sektor.", pt: "Midiendo la revolución de la IA — dato por dato, sector por sector.",
      },
      story: {
        es: "Venture co-fundado con Guillermo Jaramillo y Giovanni Stella. IA Index es el primer índice que cuantifica la penetración real de inteligencia artificial en empresas y personas, a través de 6 dimensiones clave: Explorer, Talento, Herramientas, Startups, Macro y Reportes. Cada reporte se co-crea con empresas líderes — el dato que entregan se vuelve parte de un pool de inteligencia compartida para todo el ecosistema. Beta en vivo en monzaindex.ai con score en tiempo real. Lanzamiento público agosto 2026, expansión multi-país desde LATAM.",
        en: "Venture co-founded with Guillermo Jaramillo and Giovanni Stella. IA Index is the first index quantifying real AI penetration in companies and people, through 6 key dimensions: Explorer, Talent, Tools, Startups, Macro and Reports. Each report is co-created with leading companies — the data they contribute becomes part of a shared intelligence pool for the entire ecosystem. Beta live on monzaindex.ai with real-time score. Public launch August 2026, multi-country expansion from LATAM.",
        de: "Venture mitgegründet mit Guillermo Jaramillo und Giovanni Stella. IA Index ist der erste Index, der die echte KI-Penetration in Unternehmen und Personen durch 6 Schlüsseldimensionen quantifiziert: Explorer, Talent, Tools, Startups, Macro und Reports. Jeder Report wird mit führenden Unternehmen co-kreiert — die Daten werden Teil eines geteilten Intelligence-Pools für das gesamte Ökosystem. Beta live auf monzaindex.ai mit Echtzeit-Score. Öffentlicher Launch August 2026, Multi-Country-Expansion aus LATAM.", pt: "Venture co-fundado con Guillermo Jaramillo y Giovanni Stella. IA Index es el primer índice que cuantifica la penetración real de inteligencia artificial en empresas y personas, a través de 6 dimensiones clave: Explorer, Talento, Herramientas, Startups, Macro y Reportes. Cada reporte se co-crea con empresas líderes — el dato que entregan se vuelve parte de un pool de inteligencia compartida para todo el ecosistema. Beta en vivo en monzaindex.ai con score en tiempo real. Lanzamiento público agosto 2026, expansión multi-país desde LATAM.",
      },
      pillars: [
        { label: "Intelligence", detail: { es: "6 dimensiones: Explorer, Talento, Herramientas, Startups, Macro, Reportes", en: "6 dimensions: Explorer, Talent, Tools, Startups, Macro, Reports", de: "6 Dimensionen: Explorer, Talent, Tools, Startups, Macro, Reports", pt: "6 dimensiones: Explorer, Talento, Herramientas, Startups, Macro, Reportes" } },
        { label: "Co-creation", detail: { es: "Reportes construidos junto a empresas líderes", en: "Reports built together with leading companies", de: "Reports gemeinsam mit führenden Unternehmen erstellt", pt: "Reportes construidos junto a empresas líderes" } },
        { label: "Product", detail: { es: "Plataforma AI-native, score en tiempo real — beta live en monzaindex.ai", en: "AI-native platform, real-time score — beta live on monzaindex.ai", de: "AI-native Plattform, Echtzeit-Score — Beta live auf monzaindex.ai", pt: "Plataforma AI-native, score en tiempo real — beta live en monzaindex.ai" } },
        { label: "Network", detail: { es: "Data compartida para el ecosistema, expansión multi-país", en: "Shared ecosystem data, multi-country expansion", de: "Geteilte Ökosystem-Daten, Multi-Country-Expansion", pt: "Data compartida para el ecosistema, expansión multi-país" } },
      ],
      press: [],
      teamLinks: [
        { name: "Guillermo Jaramillo", url: "https://www.linkedin.com/in/guillermojaramillo/" },
        { name: "Giovanni Stella", url: "https://www.linkedin.com/in/giovanni-stella/?locale=en" },
      ],
    },
    gallery: [],
    gridClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5] md:aspect-auto",
    visual: {
      gradient: "radial-gradient(circle at 20% 30%, #C4A35A20 0%, transparent 50%), radial-gradient(circle at 80% 70%, #C4A35A10 0%, transparent 40%), linear-gradient(135deg, #110F0C 0%, #0D0D14 100%)",
      letter: "IA",
      letterSize: "clamp(70px, 13vw, 160px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#C4A35A",
      decorLine: true,
      number: "06",
    },
  },
  {
    id: "eleonora",
    slug: "eleonora-morales",
    name: "Eleonora Morales",
    tag: "STUDIO × DIGITAL ECOSYSTEM",
    desc: {
      es: "Ecosistema digital 360° para una coleccionista de belleza con 350K seguidores en TikTok. Seis mundos bajo una sombrilla, e-commerce en vivo, pipeline de fotos con IA y growth multi-canal.",
      en: "360° digital ecosystem for a beauty collector with 350K TikTok followers. Six worlds under one umbrella, live e-commerce, AI-powered photo pipeline and multi-channel growth.",
      de: "360° digitales Ökosystem für eine Beauty-Collectorin mit 350K TikTok-Followern. Sechs Welten unter einem Dach, Live-E-Commerce, KI-gestützte Foto-Pipeline und Multi-Channel-Growth.", pt: "Ecosistema digital 360° para una coleccionista de belleza con 350K seguidores en TikTok. Seis mundos bajo una sombrilla, e-commerce en vivo, pipeline de fotos con IA y growth multi-canal.",
    },
    image: "/images/projects/eleonora-cover.jpg",
    video: null,
    mobileVideo: null,
    color: "#f074aa",
    url: "https://eleonora-morales.vercel.app",
    caseStudy: {
      role: "Creative Director & Tech Partner",
      location: "Colombia · Global",
      year: "2026–present",
      headline: {
        es: "Lujo circular, seis mundos, un ecosistema en vivo.",
        en: "Circular luxury, six worlds, one live ecosystem.",
        de: "Zirkulärer Luxus, sechs Welten, ein Live-Ökosystem.", pt: "Lujo circular, seis mundos, un ecosistema en vivo.",
      },
      story: {
        es: "Ecosistema digital completo para Eleonora Morales — empresaria colombiana con 350K seguidores en TikTok. Sistema de marca con manual live, tipografías custom (Midashi Min, Telidon), color firma #F074AA y casco rosa-gold como signature. Seis sub-brands bajo una sombrilla: Garage Sale (second-hand curado, 54 productos activos de Johanna Ortiz, Kika Vargas, Kenzo, Bimba y Lola), Luxe, Mundo Lujo, Parisienne, Mayoristas y Segundas Oportunidades. Frontend HTML custom sobre Shopify Storefront API, tema Horizon 3.5.1, PayU para pagos y Coordinadora para envíos. Pipeline de producción de fotos con Gemini AI para fondo blanco editorial. Growth multi-canal: pauta Meta + orgánico. Go-live abril 2026, escalamiento hacia Día de la Madre.",
        en: "Complete digital ecosystem for Eleonora Morales — Colombian entrepreneur with 350K TikTok followers. Brand system with live manual, custom typography (Midashi Min, Telidon), signature color #F074AA and a pink-gold helmet as the signature element. Six sub-brands under one umbrella: Garage Sale (curated second-hand with 54 active products from Johanna Ortiz, Kika Vargas, Kenzo, Bimba y Lola), Luxe, Mundo Lujo, Parisienne, Mayoristas and Segundas Oportunidades. Custom HTML frontend on Shopify Storefront API, Horizon 3.5.1 theme, PayU for payments and Coordinadora for shipping. AI-powered product photo pipeline (Gemini) for editorial white-background shots. Multi-channel growth: Meta ads + organic. Live April 2026, ramp-up toward Mother's Day.",
        de: "Komplettes digitales Ökosystem für Eleonora Morales — kolumbianische Unternehmerin mit 350K TikTok-Followern. Brand-System mit Live-Manual, Custom-Typografie (Midashi Min, Telidon), Signature-Farbe #F074AA und einem rosa-goldenen Helm als Signature. Sechs Sub-Brands: Garage Sale (kuratiertes Second-Hand mit 54 aktiven Produkten von Johanna Ortiz, Kika Vargas, Kenzo, Bimba y Lola), Luxe, Mundo Lujo, Parisienne, Mayoristas und Segundas Oportunidades. Custom HTML Frontend auf Shopify Storefront API, Horizon 3.5.1 Theme, PayU für Payments, Coordinadora für Versand. KI-gestützte Produktfoto-Pipeline (Gemini). Multi-Channel-Growth: Meta Ads + Organic. Live April 2026, Ramp-Up bis Muttertag.", pt: "Ecosistema digital completo para Eleonora Morales — empresaria colombiana con 350K seguidores en TikTok. Sistema de marca con manual live, tipografías custom (Midashi Min, Telidon), color firma #F074AA y casco rosa-gold como signature. Seis sub-brands bajo una sombrilla: Garage Sale (second-hand curado, 54 productos activos de Johanna Ortiz, Kika Vargas, Kenzo, Bimba y Lola), Luxe, Mundo Lujo, Parisienne, Mayoristas y Segundas Oportunidades. Frontend HTML custom sobre Shopify Storefront API, tema Horizon 3.5.1, PayU para pagos y Coordinadora para envíos. Pipeline de producción de fotos con Gemini AI para fondo blanco editorial. Growth multi-canal: pauta Meta + orgánico. Go-live abril 2026, escalamiento hacia Día de la Madre.",
      },
      pillars: [
        { label: "Brand", detail: { es: "6 sub-brands, manual live, casco rosa-gold como signature", en: "6 sub-brands, live manual, pink-gold helmet as signature", de: "6 Sub-Brands, Live-Manual, rosa-goldener Helm als Signature", pt: "6 sub-brands, manual live, casco rosa-gold como signature" } },
        { label: "E-commerce", detail: { es: "Shopify Horizon + Storefront API custom, PayU + Coordinadora, 54 productos activos", en: "Shopify Horizon + custom Storefront API, PayU + Coordinadora, 54 active products", de: "Shopify Horizon + Custom Storefront API, PayU + Coordinadora, 54 aktive Produkte", pt: "Shopify Horizon + Storefront API custom, PayU + Coordinadora, 54 productos activos" } },
        { label: "Content", detail: { es: "Pipeline de fotos con Gemini AI, dirección creativa editorial", en: "Gemini AI photo pipeline, editorial creative direction", de: "Gemini-AI-Foto-Pipeline, editoriale Kreativdirektion", pt: "Pipeline de fotos con Gemini AI, dirección creativa editorial" } },
        { label: "Growth", detail: { es: "Base 350K en TikTok, pauta Meta + orgánico multi-canal", en: "350K TikTok base, Meta ads + organic multi-channel", de: "350K TikTok-Basis, Meta Ads + Organic Multi-Channel", pt: "Base 350K en TikTok, pauta Meta + orgánico multi-canal" } },
      ],
      press: [],
    },
    gallery: [],
    gridClass: "md:col-span-1 md:row-span-1",
    aspect: "aspect-[4/5] md:aspect-auto",
    visual: {
      gradient: "radial-gradient(circle at 30% 30%, #f074aa18 0%, transparent 50%), radial-gradient(circle at 70% 80%, #f074aa0C 0%, transparent 40%), linear-gradient(160deg, #15101A 0%, #0D0D14 100%)",
      letter: "EM",
      letterSize: "clamp(70px, 13vw, 160px)",
      letterPos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      accent: "#f074aa",
      decorLine: false,
      number: "07",
    },
  },
];
