export type Language = 'es' | 'en' | 'de';

export const translations = {
  // ===== NAVIGATION =====
  nav: {
    metodo: { es: 'MÉTODO', en: 'METHOD', de: 'METHODE' },
    sobreMi: { es: 'SOBRE MÍ', en: 'ABOUT', de: 'ÜBER UNS' },
  },

  // ===== HOME PAGE =====
  home: {
    hero: {
      tag: { es: 'MONZA LAB | EXECUTION STUDIO', en: 'MONZA LAB | EXECUTION STUDIO', de: 'MONZA LAB | EXECUTION STUDIO' },
      title1: { es: 'Ejecución Impecable.', en: 'Flawless Execution.', de: 'Makellose Umsetzung.' },
      title2: { es: 'High-Performance Assets.', en: 'High-Performance Assets.', de: 'High-Performance Assets.' },
      subtitle: {
        es: 'No entregamos teoría. Hacemos Deployment de Activos de Negocio. Velocidad de Startup con rigor Corporate para líderes que exigen excelencia.',
        en: 'We don\'t deliver theory. We deploy Business Assets. Venture velocity with Corporate Governance for leaders who demand excellence.',
        de: 'Keine Theorie. Wir deployen Business Assets. Startup-Geschwindigkeit mit Corporate Governance für Führungskräfte, die Exzellenz fordern.',
      },
      cta: { es: 'Agendar Monza Session', en: 'Book Monza Session', de: 'Monza Session buchen' },
    },
    metodo: {
      tag: { es: 'METODOLOGÍA', en: 'METHODOLOGY', de: 'METHODIK' },
      title: { es: 'The Monza', en: 'The Monza', de: 'The Monza' },
      titleAccent: { es: 'OS', en: 'OS', de: 'OS' },
      subtitle: {
        es: 'Un sistema operativo de ejecución. Loop infinito de mejora continua.',
        en: 'An operating system for execution. Infinite loop of continuous improvement.',
        de: 'Ein Betriebssystem für Umsetzung. Endloser Loop der kontinuierlichen Verbesserung.',
      },
      loopItems: {
        criterio: { es: 'Criterio', en: 'Judgment', de: 'Urteil' },
        oferta: { es: 'Oferta', en: 'Offer', de: 'Angebot' },
        sistemas: { es: 'Sistemas', en: 'Systems', de: 'Systeme' },
        branding: { es: 'Branding', en: 'Branding', de: 'Branding' },
        growth: { es: 'Growth', en: 'Growth', de: 'Growth' },
      },
    },
    aboutEdgar: {
      tag: { es: 'SOBRE MÍ', en: 'ABOUT', de: 'ÜBER MICH' },
      title: { es: 'Edgar', en: 'Edgar', de: 'Edgar' },
      titleAccent: { es: 'Navarro', en: 'Navarro', de: 'Navarro' },
      pillar1: {
        title: { es: 'Ex-Director de Innovación', en: 'Former Innovation Director', de: 'Ehem. Innovationsdirektor' },
        subtitle: { es: 'KPMG', en: 'KPMG', de: 'KPMG' },
        desc: { es: 'Governance y gestión de riesgo en Big Four.', en: 'Big Four governance & risk management.', de: 'Big Four Governance & Risikomanagement.' },
      },
      pillar2: {
        title: { es: 'Serial Entrepreneur & Operator', en: 'Serial Entrepreneur & Operator', de: 'Serial Entrepreneur & Operator' },
        subtitle: { es: '', en: '', de: '' },
        desc: { es: 'Escalado y ejecución en el mundo real.', en: 'Real-world scaling & execution.', de: 'Skalierung & Umsetzung in der Praxis.' },
      },
      pillar3: {
        title: { es: 'Co-Founder', en: 'Co-Founder', de: 'Co-Founder' },
        subtitle: { es: 'Bavarian Econs', en: 'Bavarian Econs', de: 'Bavarian Econs' },
        desc: { es: 'Ingeniería alemana. Diseño italiano.', en: 'German engineering. Italian design.', de: 'Deutsche Ingenieurskunst. Italienisches Design.' },
      },
      tagPractica: { es: 'EN PRÁCTICA', en: 'IN PRACTICE', de: 'IN DER PRAXIS' },
      verMenciones: { es: 'Ver menciones →', en: 'View mentions →', de: 'Erwähnungen ansehen →' },
      closing: {
        es: 'Ejecución impecable. Sin teorías. Solo activos de negocio.',
        en: 'Flawless execution. No theories. Only business assets.',
        de: 'Makellose Umsetzung. Keine Theorien. Nur Business Assets.',
      },
    },
  },

  // ===== FOOTER =====
  footer: {
    copyright: { es: '© 2026 Monza Lab. Todos los derechos reservados.', en: '© 2026 Monza Lab. All rights reserved.', de: '© 2026 Monza Lab. Alle Rechte vorbehalten.' },
    contact: { es: 'Contacto', en: 'Contact', de: 'Kontakt' },
    newsletter: {
      title: { es: 'Newsletter', en: 'Newsletter', de: 'Newsletter' },
      placeholder: { es: 'Tu email', en: 'Your email', de: 'Deine E-Mail' },
      cta: { es: 'Suscribir', en: 'Subscribe', de: 'Abonnieren' },
    },
    links: {
      hablar: { es: 'Quiero hablar contigo', en: 'Let\'s talk', de: 'Lass uns reden' },
    },
  },

  // ===== COMMON =====
  common: {
    learnMore: { es: 'Conocer más', en: 'Learn More', de: 'Mehr erfahren' },
    book: { es: 'Agendar', en: 'Book', de: 'Buchen' },
    apply: { es: 'Aplicar', en: 'Apply', de: 'Bewerben' },
    contact: { es: 'Contactar', en: 'Contact', de: 'Kontakt' },
    backHome: { es: 'Volver al inicio', en: 'Back to Home', de: 'Zur Startseite' },
  },
} as const;

export type TranslationKey = keyof typeof translations;
