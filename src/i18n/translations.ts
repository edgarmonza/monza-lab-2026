export type Language = 'es' | 'en';

export const translations = {
  // ===== NAVIGATION =====
  nav: {
    metodo: { es: 'MÉTODO', en: 'METHOD' },
    sobreMi: { es: 'SOBRE MÍ', en: 'ABOUT' },
    sistemas: { es: 'SISTEMAS', en: 'SYSTEMS' },
    quantum: { es: 'QUANTUM', en: 'QUANTUM' },
    activarMonza: { es: 'ACTIVAR MONZA', en: 'ACTIVATE MONZA' },
    // Dropdown
    sessions: {
      title: { es: 'Monza Sessions', en: 'Monza Sessions' },
      desc: { es: 'Inmersión de 4 horas con entregable real', en: '4-hour immersion with tangible deliverable' },
      tag: { es: 'INTENSIVO', en: 'INTENSIVE' },
    },
    studio: {
      title: { es: 'Monza Studio 1:1', en: 'Monza Studio 1:1' },
      desc: { es: '12 semanas. Llave en mano', en: '12-week turnkey execution' },
      tag: { es: 'FLAGSHIP', en: 'FLAGSHIP' },
    },
    studioPro: {
      title: { es: 'Monza Studio Pro', en: 'Monza Studio Pro' },
      desc: { es: 'Velocidad IA en tu operación', en: 'AI velocity for your operation' },
      tag: { es: 'ENTERPRISE', en: 'ENTERPRISE' },
    },
  },

  // ===== HOME PAGE =====
  home: {
    hero: {
      tag: { es: 'MONZA LAB | EXECUTION STUDIO', en: 'MONZA LAB | EXECUTION STUDIO' },
      title1: { es: 'Ejecución Impecable.', en: 'Flawless Execution.' },
      title2: { es: 'High-Performance Assets.', en: 'High-Performance Assets.' },
      subtitle: {
        es: 'No entregamos teoría. Hacemos Deployment de Activos de Negocio. Velocidad de Startup con rigor Corporate para líderes que exigen excelencia.',
        en: 'We don\'t deliver theory. We deploy Business Assets. Venture velocity with Corporate Governance for leaders who demand excellence.',
      },
      cta: { es: 'Agendar Monza Session', en: 'Book Monza Session' },
    },
    eligeTuLinea: {
      tag: { es: 'SISTEMAS DE EJECUCIÓN', en: 'EXECUTION SYSTEMS' },
      title: { es: 'Elige tu sistema', en: 'Choose your system' },
      titleAccent: { es: 'Monza', en: 'Monza' },
      sessions: {
        title: { es: 'SESSIONS', en: 'SESSIONS' },
        desc: { es: 'Inmersión de 4 horas. Un problema. Un entregable real.', en: '4-hour immersion. One problem. One tangible deliverable.' },
        chip: { es: 'INTENSIVO', en: 'INTENSIVE' },
        cta: { es: 'Reservar', en: 'Book Now' },
      },
      studio: {
        title: { es: 'STUDIO 1:1', en: 'STUDIO 1:1' },
        desc: { es: '12 semanas. Llave en mano. Oferta, Web, Brand y Sistema de Ventas.', en: '12 weeks. Turnkey. Offer, Web, Brand & Sales System.' },
        chip: { es: 'FLAGSHIP', en: 'FLAGSHIP' },
        cta: { es: 'Aplicar', en: 'Apply' },
      },
      studioPro: {
        title: { es: 'STUDIO PRO', en: 'STUDIO PRO' },
        desc: { es: 'Velocidad IA en tu operación. Automatización y sistemas inteligentes.', en: 'AI velocity for your operation. Automation & intelligent systems.' },
        chip: { es: 'ENTERPRISE', en: 'ENTERPRISE' },
        cta: { es: 'Contactar', en: 'Contact' },
      },
    },
    quantumVip: {
      tag: { es: 'ACCESO EXCLUSIVO', en: 'EXCLUSIVE ACCESS' },
      title: { es: 'Monza', en: 'Monza' },
      titleAccent: { es: 'Quantum', en: 'Quantum' },
      subtitle: {
        es: 'Asesoría estratégica para Boards, C-Levels y Family Offices. Decisiones de alto impacto con visión de largo plazo.',
        en: 'Strategic advisory for Boards, C-Levels & Family Offices. High-impact decisions with long-term vision.',
      },
      cta: { es: 'Solicitar Acceso', en: 'Request Access' },
    },
    metodo: {
      tag: { es: 'METODOLOGÍA', en: 'METHODOLOGY' },
      title: { es: 'The Monza', en: 'The Monza' },
      titleAccent: { es: 'OS', en: 'OS' },
      subtitle: {
        es: 'Un sistema operativo de ejecución. Loop infinito de mejora continua.',
        en: 'An operating system for execution. Infinite loop of continuous improvement.',
      },
      loopItems: {
        criterio: { es: 'Criterio', en: 'Judgment' },
        oferta: { es: 'Oferta', en: 'Offer' },
        sistemas: { es: 'Sistemas', en: 'Systems' },
        branding: { es: 'Branding', en: 'Branding' },
        growth: { es: 'Growth', en: 'Growth' },
      },
    },
    aboutEdgar: {
      tag: { es: 'SOBRE MÍ', en: 'ABOUT' },
      title: { es: 'Edgar', en: 'Edgar' },
      titleAccent: { es: 'Navarro', en: 'Navarro' },
      pillar1: {
        title: { es: 'Ex-Director de Innovación', en: 'Former Innovation Director' },
        subtitle: { es: 'KPMG', en: 'KPMG' },
        desc: { es: 'Governance y gestión de riesgo en Big Four.', en: 'Big Four governance & risk management.' },
      },
      pillar2: {
        title: { es: 'Serial Entrepreneur & Operator', en: 'Serial Entrepreneur & Operator' },
        subtitle: { es: '', en: '' },
        desc: { es: 'Escalado y ejecución en el mundo real.', en: 'Real-world scaling & execution.' },
      },
      pillar3: {
        title: { es: 'Co-Founder', en: 'Co-Founder' },
        subtitle: { es: 'Bavarian Econs', en: 'Bavarian Econs' },
        desc: { es: 'Ingeniería alemana. Diseño italiano.', en: 'German engineering. Italian design.' },
      },
      tagPractica: { es: 'EN PRÁCTICA', en: 'IN PRACTICE' },
      verMenciones: { es: 'Ver menciones →', en: 'View mentions →' },
      closing: {
        es: 'Ejecución impecable. Sin teorías. Solo activos de negocio.',
        en: 'Flawless execution. No theories. Only business assets.',
      },
    },
  },

  // ===== STUDIO PAGE =====
  studio: {
    hero: {
      tag: { es: 'STUDIO 1:1 | 12 SEMANAS', en: 'STUDIO 1:1 | 12 WEEKS' },
      title1: { es: 'Tu Oferta Premium.', en: 'Your Premium Offer.' },
      title2: { es: 'Ejecutada.', en: 'Executed.' },
      subtitle: {
        es: 'De idea a activo de negocio operativo. Branding, web, sistema comercial y stack de IA. Todo listo para vender.',
        en: 'From idea to operative business asset. Branding, web, sales system & AI stack. Ready to sell.',
      },
      cta: { es: 'Agendar Monza Session', en: 'Book Monza Session' },
    },
    context: {
      tag: { es: 'EL CONTEXTO', en: 'THE CONTEXT' },
      title: { es: 'No es otro curso.', en: 'Not another course.' },
      titleAccent: { es: 'Es ejecución real.', en: 'It\'s real execution.' },
    },
    assetStack: {
      tag: { es: 'ASSET STACK', en: 'ASSET STACK' },
      title: { es: 'Reemplaza 4 proveedores', en: 'Replace 4 vendors' },
      titleAccent: { es: 'con uno solo.', en: 'with one.' },
      item1: {
        title: { es: 'Investment-Grade Branding', en: 'Investment-Grade Branding' },
        desc: { es: 'Identidad visual que comunica autoridad.', en: 'Visual identity that communicates authority.' },
      },
      item2: {
        title: { es: 'Signature Offer Architecture', en: 'Signature Offer Architecture' },
        desc: { es: 'Oferta estructurada para alto ticket.', en: 'Offer structured for high-ticket.' },
      },
      item3: {
        title: { es: 'High-Performance Web', en: 'High-Performance Web' },
        desc: { es: 'Landing que convierte. Optimizada para velocidad.', en: 'Landing that converts. Optimized for speed.' },
      },
      item4: {
        title: { es: 'Commercial OS & AI', en: 'Commercial OS & AI' },
        desc: { es: 'Sistema comercial con automatizaciones IA.', en: 'Commercial system with AI automations.' },
      },
    },
    methodology: {
      tag: { es: 'METODOLOGÍA', en: 'METHODOLOGY' },
      title: { es: 'El Journey de', en: 'The' },
      titleAccent: { es: '12 Semanas', en: '12-Week Journey' },
      phase1: {
        title: { es: 'Rapid Deployment', en: 'Rapid Deployment' },
        weeks: { es: 'Semanas 1-3', en: 'Weeks 1-3' },
        output: { es: 'Output: Live Landing Page', en: 'Output: Live Landing Page' },
      },
      phase2: {
        title: { es: 'Market Signals', en: 'Market Signals' },
        weeks: { es: 'Semanas 4-6', en: 'Weeks 4-6' },
        output: { es: 'Output: Real Market Data', en: 'Output: Real Market Data' },
      },
      phase3: {
        title: { es: 'Iteration & Fit', en: 'Iteration & Fit' },
        weeks: { es: 'Semanas 7-9', en: 'Weeks 7-9' },
        output: { es: 'Output: Validated Offer', en: 'Output: Validated Offer' },
      },
      phase4: {
        title: { es: 'System & AI Workflow', en: 'System & AI Workflow' },
        weeks: { es: 'Semanas 10-12', en: 'Weeks 10-12' },
        output: { es: 'Output: Notion OS + AI Toolkit', en: 'Output: Notion OS + AI Toolkit' },
      },
    },
    deliverables: {
      tag: { es: 'ENTREGABLES', en: 'DELIVERABLES' },
      title: { es: 'Sales con una oferta vendible.', en: 'You leave with a sellable offer.' },
      subtitle: { es: 'Y si ya vendes, la vuelves premium.', en: 'And if you already sell, you make it premium.' },
      cta: { es: 'Agendar Monza Session', en: 'Book Monza Session' },
      microcopy: { es: 'Si no eres fit, te lo digo de frente en la llamada.', en: 'If you\'re not a fit, I\'ll tell you straight on the call.' },
    },
  },

  // ===== STUDIO PRO PAGE =====
  studioPro: {
    hero: {
      tag: { es: 'STUDIO PRO | ENTERPRISE', en: 'STUDIO PRO | ENTERPRISE' },
      title1: { es: 'Velocidad IA.', en: 'AI Velocity.' },
      title2: { es: 'En tu Operación.', en: 'In Your Operation.' },
      subtitle: {
        es: 'Automatizaciones inteligentes y sistemas de productividad para equipos corporativos. Más output. Menos fricción.',
        en: 'Intelligent automations & productivity systems for corporate teams. More output. Less friction.',
      },
      cta: { es: 'Agendar Consultoría', en: 'Book Consultation' },
    },
  },

  // ===== SESSIONS PAGE =====
  sessions: {
    hero: {
      tag: { es: 'MONZA SESSIONS | INTENSIVO', en: 'MONZA SESSIONS | INTENSIVE' },
      title1: { es: '4 Horas.', en: '4 Hours.' },
      title2: { es: 'Un Entregable Real.', en: 'One Tangible Deliverable.' },
      subtitle: {
        es: 'Inmersión enfocada en resolver un problema específico. Sales con un activo listo para usar, no con tareas pendientes.',
        en: 'Focused immersion to solve one specific problem. You leave with a ready-to-use asset, not pending tasks.',
      },
      cta: { es: 'Reservar Session', en: 'Book Session' },
    },
    faq: {
      tag: { es: 'PREGUNTAS FRECUENTES', en: 'FREQUENTLY ASKED QUESTIONS' },
      title: { es: 'Todo lo que necesitas', en: 'Everything you need' },
      titleAccent: { es: 'saber', en: 'to know' },
    },
  },

  // ===== QUANTUM PAGE =====
  quantum: {
    hero: {
      tag: { es: 'MONZA QUANTUM | ADVISORY', en: 'MONZA QUANTUM | ADVISORY' },
      title1: { es: 'Estrategia de Alto Nivel.', en: 'High-Level Strategy.' },
      title2: { es: 'Para Quienes Deciden.', en: 'For Decision Makers.' },
      subtitle: {
        es: 'Asesoría estratégica para Boards, C-Levels y Family Offices. Visión de largo plazo. Decisiones de alto impacto.',
        en: 'Strategic advisory for Boards, C-Levels & Family Offices. Long-term vision. High-impact decisions.',
      },
      cta: { es: 'Solicitar Acceso', en: 'Request Access' },
    },
    accelerationLoop: {
      tag: { es: 'ACCELERATION LOOP', en: 'ACCELERATION LOOP' },
      title: { es: 'El Framework de', en: 'The' },
      titleAccent: { es: 'Aceleración', en: 'Acceleration Framework' },
      card1: {
        title: { es: 'Next-Gen Revenue Engines', en: 'Next-Gen Revenue Engines' },
        desc: { es: 'Validación de modelos de negocio futuros.', en: 'Validating future business models.' },
      },
      card2: {
        title: { es: 'AI Governance & Control', en: 'AI Governance & Control' },
        desc: { es: 'Adopción segura de IA.', en: 'Safe AI adoption.' },
      },
      card3: {
        title: { es: 'Inorganic Growth & Venture', en: 'Inorganic Growth & Venture' },
        desc: { es: 'Estrategias de CVC y M&A.', en: 'CVC and M&A strategies.' },
      },
    },
  },

  // ===== FOOTER =====
  footer: {
    copyright: { es: '© 2026 Monza Lab. Todos los derechos reservados.', en: '© 2026 Monza Lab. All rights reserved.' },
    contact: { es: 'Contacto', en: 'Contact' },
    newsletter: {
      title: { es: 'Newsletter', en: 'Newsletter' },
      placeholder: { es: 'Tu email', en: 'Your email' },
      cta: { es: 'Suscribir', en: 'Subscribe' },
    },
    links: {
      hablar: { es: 'Quiero hablar contigo', en: 'Let\'s talk' },
    },
  },

  // ===== COMMON =====
  common: {
    learnMore: { es: 'Conocer más', en: 'Learn More' },
    book: { es: 'Agendar', en: 'Book' },
    apply: { es: 'Aplicar', en: 'Apply' },
    contact: { es: 'Contactar', en: 'Contact' },
    backHome: { es: 'Volver al inicio', en: 'Back to Home' },
  },
} as const;

export type TranslationKey = keyof typeof translations;
