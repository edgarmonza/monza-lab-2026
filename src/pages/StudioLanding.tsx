import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SEO from "@/components/SEO";
import FooterMinimal from "@/components/FooterMinimal";
import LeadForm from "@/components/LeadForm";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackContact, whatsAppUrl } from "@/lib/pixel";

type Lang = "es" | "en" | "de" | "pt";
type LT = Record<Lang, string>;

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------- copy --- */

const COPY = {
  eyebrow: {
    es: "MONZA STUDIO — PROGRAMA 12 SEMANAS",
    en: "MONZA STUDIO — 12-WEEK PROGRAM",
    de: "MONZA STUDIO — 12-WOCHEN-PROGRAMM",
    pt: "MONZA STUDIO — PROGRAMA DE 12 SEMANAS",
  },
  h1a: {
    es: "Tu marca vendiendo en Shopify.",
    en: "Your brand selling on Shopify.",
    de: "Deine Marke verkauft auf Shopify.",
    pt: "A tua marca a vender em Shopify.",
  },
  h1b: {
    es: "Con contenido y agentes de IA.",
    en: "Powered by content and AI agents.",
    de: "Mit Content und KI-Agenten.",
    pt: "Com conteúdo e agentes de IA.",
  },
  sub: {
    es: "Para marcas que quieren crecer global: construimos tu tienda, tu motor de contenido y tus agentes de IA — incluida la pauta — en 12 semanas. Y después lo operamos contigo, mes a mes.",
    en: "For brands that want to grow globally: we build your store, your content engine and your AI agents — paid media included — in 12 weeks. Then we run it with you, month after month.",
    de: "Für Marken, die global wachsen wollen: wir bauen deinen Shop, deine Content-Engine und deine KI-Agenten — inklusive Ads — in 12 Wochen. Danach betreiben wir alles gemeinsam mit dir.",
    pt: "Para marcas que querem crescer global: construímos a tua loja, o teu motor de conteúdo e os teus agentes de IA — anúncios incluídos — em 12 semanas. Depois operamos tudo contigo, mês a mês.",
  },
  ctaPrimary: {
    es: "Cuéntanos de tu marca",
    en: "Tell us about your brand",
    de: "Erzähl uns von deiner Marke",
    pt: "Fala-nos da tua marca",
  },
  ctaWhats: {
    es: "Hablar por WhatsApp",
    en: "Chat on WhatsApp",
    de: "Auf WhatsApp schreiben",
    pt: "Falar no WhatsApp",
  },
  trust: {
    es: "Caso vivo: Eleonora Morales — 350K+ en TikTok, 6 marcas, una sola tienda.",
    en: "Live case: Eleonora Morales — 350K+ on TikTok, 6 brands, one store.",
    de: "Live-Case: Eleonora Morales — 350K+ auf TikTok, 6 Marken, ein Shop.",
    pt: "Caso vivo: Eleonora Morales — 350K+ no TikTok, 6 marcas, uma só loja.",
  },
  offerTitle: {
    es: "Un sistema completo. No piezas sueltas.",
    en: "One complete system. Not loose parts.",
    de: "Ein komplettes System. Keine Einzelteile.",
    pt: "Um sistema completo. Não peças soltas.",
  },
  caseTitle: {
    es: "Así se ve cuando está vivo",
    en: "This is what it looks like live",
    de: "So sieht es live aus",
    pt: "É assim que fica quando está vivo",
  },
  caseName: { es: "Eleonora Morales", en: "Eleonora Morales", de: "Eleonora Morales", pt: "Eleonora Morales" },
  caseDesc: {
    es: "Diseñadora de moda colombiana con ambición global. Construimos su ecosistema digital completo: 6 marcas en una sola tienda Shopify lista para vender en cualquier país, catálogo fotografiado con IA al nivel de las casas grandes, agente de WhatsApp atendiendo clientas y pauta corriendo sobre contenido editorial.",
    en: "Colombian fashion designer with global ambition. We built her complete digital ecosystem: 6 brands in one Shopify store ready to sell in any country, an AI-photographed catalog at big-house level, a WhatsApp agent serving customers, and paid media running on editorial content.",
    de: "Kolumbianische Modedesignerin mit globaler Ambition. Wir bauten ihr komplettes digitales Ökosystem: 6 Marken in einem Shopify-Shop, bereit für jeden Markt, KI-fotografierter Katalog auf Häuser-Niveau, WhatsApp-Agent und Ads auf Editorial-Content.",
    pt: "Designer de moda colombiana com ambição global. Construímos o seu ecossistema digital completo: 6 marcas numa só loja Shopify pronta a vender em qualquer país, catálogo fotografado com IA ao nível das grandes casas, agente de WhatsApp e anúncios sobre conteúdo editorial.",
  },
  howTitle: {
    es: "Cómo funciona",
    en: "How it works",
    de: "So funktioniert es",
    pt: "Como funciona",
  },
  investTitle: { es: "Inversión", en: "Investment", de: "Investition", pt: "Investimento" },
  investBody: {
    es: "Se paga en dos tiempos: la construcción, como trabajo con fecha de entrega; y la operación, mes a mes y sin permanencia, con parte de lo nuestro atado a lo que venda el sistema. El número exacto depende de tu marca — te lo decimos directo en la primera conversación, sin vueltas.",
    en: "Paid in two stages: construction, as work with a delivery date; and operation, month to month with no lock-in, with part of our pay tied to what the system sells. The exact number depends on your brand — we tell you straight in the first conversation.",
    de: "Bezahlt wird in zwei Schritten: der Aufbau als Arbeit mit Liefertermin; und der Betrieb monatlich, ohne Bindung, mit einem Teil unserer Vergütung gekoppelt an das, was das System verkauft. Die genaue Zahl hängt von deiner Marke ab — wir sagen sie dir direkt im ersten Gespräch.",
    pt: "Paga-se em dois tempos: a construção, como trabalho com data de entrega; e a operação, mês a mês e sem permanência, com parte do nosso atada ao que o sistema vender. O número exato depende da tua marca — dizemos-te diretamente na primeira conversa.",
  },
  faqTitle: { es: "Preguntas directas", en: "Straight answers", de: "Klare Antworten", pt: "Respostas diretas" },
  formTitle: {
    es: "Cuéntanos de tu marca",
    en: "Tell us about your brand",
    de: "Erzähl uns von deiner Marke",
    pt: "Fala-nos da tua marca",
  },
  formSub: {
    es: "Sin llamadas de descubrimiento eternas. Escribes, Edgar lee, y te responde con criterio en menos de 24 horas.",
    en: "No endless discovery calls. You write, Edgar reads, and replies with real judgment within 24 hours.",
    de: "Keine endlosen Discovery-Calls. Du schreibst, Edgar liest und antwortet mit echtem Urteil innerhalb von 24 Stunden.",
    pt: "Sem chamadas de descoberta intermináveis. Escreves, o Edgar lê e responde com critério em menos de 24 horas.",
  },
} satisfies Record<string, LT>;

const PILLARS: Array<{ n: string; title: LT; body: LT }> = [
  {
    n: "01",
    title: { es: "Ecommerce Shopify", en: "Shopify Ecommerce", de: "Shopify E-Commerce", pt: "Ecommerce Shopify" },
    body: {
      es: "Tienda premium lista para vender: diseño editorial, drops, pagos locales (PayU, MercadoPago), Klaviyo y analítica desde el día uno.",
      en: "A premium store ready to sell: editorial design, drops, local payments, Klaviyo and analytics from day one.",
      de: "Ein Premium-Shop, bereit zu verkaufen: Editorial-Design, Drops, lokale Zahlungen, Klaviyo und Analytics ab Tag eins.",
      pt: "Uma loja premium pronta a vender: design editorial, drops, pagamentos locais, Klaviyo e analítica desde o primeiro dia.",
    },
  },
  {
    n: "02",
    title: { es: "Motor de contenido con IA", en: "AI Content Engine", de: "KI-Content-Engine", pt: "Motor de conteúdo com IA" },
    body: {
      es: "Fotografía editorial generada con IA, carruseles, reels y catálogo — un pipeline que produce todas las semanas sin estudio ni producción gigante.",
      en: "AI-generated editorial photography, carousels, reels and catalog — a pipeline that produces every week without a studio or massive production.",
      de: "KI-generierte Editorial-Fotografie, Carousels, Reels und Katalog — eine Pipeline, die jede Woche produziert, ohne Studio.",
      pt: "Fotografia editorial gerada com IA, carrosséis, reels e catálogo — um pipeline que produz todas as semanas sem estúdio.",
    },
  },
  {
    n: "03",
    title: { es: "La operación, con agentes de IA", en: "The operation, run by AI agents", de: "Der Betrieb, mit KI-Agenten", pt: "A operação, com agentes de IA" },
    body: {
      es: "Cuatro turnos cubiertos: quien contesta por WhatsApp 24/7 leyendo tu inventario, quien atiende las redes, quien corre la pauta con los números del negocio y quien mira qué se agota y qué dejó plata — el tablero, que abres tú. No vendemos una cantidad de agentes: montamos la operación completa y respondemos por el conjunto.",
      en: "Four shifts covered: who answers on WhatsApp 24/7 reading your inventory, who tends social, who runs the ads on the business's numbers, and who watches what's running out and what made money — the dashboard, which you open. We don't sell a number of agents: we set up the whole operation and answer for the whole.",
      de: "Vier Schichten abgedeckt: wer auf WhatsApp rund um die Uhr antwortet und deinen Bestand liest, wer die Social-Kanäle betreut, wer die Ads anhand der Geschäftszahlen fährt, und wer im Blick hat, was ausgeht und was Geld gebracht hat — das Dashboard, das du öffnest. Wir verkaufen keine Anzahl an Agenten: wir bauen den kompletten Betrieb auf und stehen für das Ganze gerade.",
      pt: "Quatro turnos cobertos: quem responde no WhatsApp 24/7 a ler o teu stock, quem cuida das redes, quem corre os anúncios com os números do negócio e quem olha para o que se esgota e o que deixou dinheiro — o painel, que abres tu. Não vendemos uma quantidade de agentes: montamos a operação completa e respondemos pelo conjunto.",
    },
  },
];

const CASE_STATS: Array<{ value: string; label: LT }> = [
  { value: "350K+", label: { es: "seguidores en TikTok", en: "TikTok followers", de: "TikTok-Follower", pt: "seguidores no TikTok" } },
  { value: "6", label: { es: "marcas en un solo ecosistema", en: "brands in one ecosystem", de: "Marken in einem Ökosystem", pt: "marcas num só ecossistema" } },
  { value: "140+", label: { es: "productos vivos en la tienda", en: "live products in the store", de: "Produkte live im Shop", pt: "produtos vivos na loja" } },
  { value: "24/7", label: { es: "agente de WhatsApp vendiendo", en: "WhatsApp agent selling", de: "WhatsApp-Agent im Einsatz", pt: "agente de WhatsApp a vender" } },
];

const PHASES: Array<{ weeks: LT; title: LT; body: LT }> = [
  {
    weeks: { es: "Semanas 1–4", en: "Weeks 1–4", de: "Wochen 1–4", pt: "Semanas 1–4" },
    title: { es: "Marca + tienda", en: "Brand + store", de: "Marke + Shop", pt: "Marca + loja" },
    body: {
      es: "Sistema de identidad, arquitectura de la tienda y catálogo inicial. La base queda sólida.",
      en: "Identity system, store architecture and initial catalog. The foundation is solid.",
      de: "Identitätssystem, Shop-Architektur und erster Katalog. Das Fundament steht.",
      pt: "Sistema de identidade, arquitetura da loja e catálogo inicial. A base fica sólida.",
    },
  },
  {
    weeks: { es: "Semanas 5–8", en: "Weeks 5–8", de: "Wochen 5–8", pt: "Semanas 5–8" },
    title: { es: "Contenido + catálogo IA", en: "Content + AI catalog", de: "Content + KI-Katalog", pt: "Conteúdo + catálogo IA" },
    body: {
      es: "Pipeline de fotografía y contenido con IA produciendo. Tu marca empieza a verse como las grandes.",
      en: "AI photo and content pipeline producing. Your brand starts looking like the big ones.",
      de: "KI-Foto- und Content-Pipeline läuft. Deine Marke sieht aus wie die Großen.",
      pt: "Pipeline de fotografia e conteúdo com IA a produzir. A tua marca começa a parecer-se com as grandes.",
    },
  },
  {
    weeks: { es: "Semanas 9–12", en: "Weeks 9–12", de: "Wochen 9–12", pt: "Semanas 9–12" },
    title: { es: "Agentes + pauta + launch", en: "Agents + ads + launch", de: "Agenten + Ads + Launch", pt: "Agentes + anúncios + lançamento" },
    body: {
      es: "Agente de WhatsApp activo, campañas corriendo con reglas de optimización, y lanzamiento.",
      en: "WhatsApp agent live, campaigns running with optimisation rules, and launch.",
      de: "WhatsApp-Agent live, Kampagnen mit Optimierungsregeln und Launch.",
      pt: "Agente de WhatsApp ativo, campanhas com regras de otimização e lançamento.",
    },
  },
  {
    weeks: { es: "Después", en: "After", de: "Danach", pt: "Depois" },
    title: { es: "Engine mensual", en: "Monthly engine", de: "Monatliche Engine", pt: "Engine mensal" },
    body: {
      es: "Operamos contigo: contenido nuevo, agentes afinados y pauta optimizada cada semana. Tu marca no se apaga.",
      en: "We operate with you: fresh content, tuned agents and optimised ads every week. Your brand never goes dark.",
      de: "Wir betreiben mit dir: neuer Content, optimierte Agenten und Ads — jede Woche.",
      pt: "Operamos contigo: conteúdo novo, agentes afinados e anúncios otimizados todas as semanas.",
    },
  },
];

const FAQS: Array<{ q: LT; a: LT }> = [
  {
    q: { es: "¿Qué es exactamente Monza Studio?", en: "What exactly is Monza Studio?", de: "Was genau ist Monza Studio?", pt: "O que é exatamente o Monza Studio?" },
    a: {
      es: "El estudio de Monza Lab, el company builder AI-native de Edgar Navarro. Construimos el sistema digital completo de tu marca — ecommerce Shopify, contenido con IA y agentes — con el mismo stack con el que construimos nuestras propias empresas.",
      en: "The studio arm of Monza Lab, Edgar Navarro's AI-native company builder. We build your brand's complete digital system — Shopify ecommerce, AI content and agents — with the same stack we use to build our own companies.",
      de: "Das Studio von Monza Lab, dem AI-native Company Builder von Edgar Navarro. Wir bauen das komplette digitale System deiner Marke mit demselben Stack, mit dem wir unsere eigenen Unternehmen bauen.",
      pt: "O estúdio do Monza Lab, o company builder AI-native de Edgar Navarro. Construímos o sistema digital completo da tua marca com o mesmo stack com que construímos as nossas próprias empresas.",
    },
  },
  {
    q: { es: "¿Cuánto cuesta?", en: "How much does it cost?", de: "Was kostet es?", pt: "Quanto custa?" },
    a: {
      es: "Depende del alcance: cuántos productos, qué turnos hay que cubrir y desde cuándo. Se paga en dos tiempos — construcción con fecha de entrega y operación mes a mes, sin permanencia — y el número exacto se cierra con Edgar en la primera conversación. Sin letra pequeña.",
      en: "It depends on scope: how many products, which shifts need covering and from when. It's paid in two stages — construction with a delivery date and month-to-month operation, no lock-in — and the exact number is settled with Edgar in the first conversation. No fine print.",
      de: "Das hängt vom Umfang ab: wie viele Produkte, welche Schichten abzudecken sind und ab wann. Bezahlt wird in zwei Schritten — Aufbau mit Liefertermin und monatlicher Betrieb ohne Bindung — und die genaue Zahl wird mit Edgar im ersten Gespräch festgelegt. Ohne Kleingedrucktes.",
      pt: "Depende do alcance: quantos produtos, que turnos há que cobrir e desde quando. Paga-se em dois tempos — construção com data de entrega e operação mês a mês, sem permanência — e o número exato fecha-se com o Edgar na primeira conversa. Sem letras pequenas.",
    },
  },
  {
    q: { es: "¿En cuánto tiempo está mi marca vendiendo?", en: "How fast is my brand selling?", de: "Wie schnell verkauft meine Marke?", pt: "Em quanto tempo a minha marca está a vender?" },
    a: {
      es: "El programa completo dura 12 semanas: tienda en las primeras 4, contenido en las siguientes 4, agentes y pauta en las últimas 4. Hay versiones más cortas si ya tienes tienda.",
      en: "The full program takes 12 weeks: store in the first 4, content in the next 4, agents and ads in the last 4. Shorter versions exist if you already have a store.",
      de: "Das volle Programm dauert 12 Wochen. Kürzere Versionen gibt es, wenn du bereits einen Shop hast.",
      pt: "O programa completo dura 12 semanas. Existem versões mais curtas se já tiveres loja.",
    },
  },
  {
    q: { es: "¿Trabajan con marcas fuera de Colombia?", en: "Do you work with brands outside Colombia?", de: "Arbeitet ihr mit Marken außerhalb Kolumbiens?", pt: "Trabalham com marcas fora da Colômbia?" },
    a: {
      es: "Sí. Operamos con clientes en Colombia, España, Portugal, Alemania y Estados Unidos. Facturamos en COP, EUR o USD según tu país.",
      en: "Yes. We operate with clients in Colombia, Spain, Portugal, Germany and the United States. We invoice in COP, EUR or USD depending on your country.",
      de: "Ja. Wir arbeiten mit Kunden in Kolumbien, Spanien, Portugal, Deutschland und den USA.",
      pt: "Sim. Operamos com clientes na Colômbia, Espanha, Portugal, Alemanha e Estados Unidos.",
    },
  },
  {
    q: { es: "¿Qué es un agente de pauta?", en: "What is a paid-media agent?", de: "Was ist ein Ads-Agent?", pt: "O que é um agente de anúncios?" },
    a: {
      es: "Un agente de IA que lanza tus campañas en Meta, las revisa a diario contra reglas de decisión probadas (qué escalar, qué pausar) y te reporta en lenguaje claro. Tú apruebas, él ejecuta.",
      en: "An AI agent that launches your Meta campaigns, reviews them daily against proven decision rules (what to scale, what to pause) and reports in plain language. You approve, it executes.",
      de: "Ein KI-Agent, der deine Meta-Kampagnen startet, täglich nach erprobten Regeln prüft und klar berichtet. Du genehmigst, er führt aus.",
      pt: "Um agente de IA que lança as tuas campanhas na Meta, revê-as diariamente contra regras comprovadas e reporta em linguagem clara.",
    },
  },
];

/* ------------------------------------------------------------ component --- */

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const StudioLanding = () => {
  const { language } = useLanguage();
  const L = language as Lang;

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q[L],
      acceptedAnswer: { "@type": "Answer", text: f.a[L] },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Monza Studio — Shopify + AI Content + AI Agents",
    provider: { "@type": "Organization", name: "Monza Lab", url: "https://monzalab.com" },
    serviceType: ["Shopify Ecommerce Development", "AI Content Production", "AI Agents", "Paid Media Management"],
    areaServed: ["Colombia", "Spain", "Portugal", "Germany", "United States"],
    offers: {
      "@type": "Offer",
      description: "12-week program: Shopify store + AI content engine + AI agents (WhatsApp sales agent, paid-media agents). Monthly operating engine available after launch.",
    },
  };

  return (
    <main id="main" className="relative min-h-screen" style={{ color: "rgba(255,252,247,0.92)" }}>
      <SEO
        title={{
          es: "Monza Studio — Tu marca vendiendo en Shopify con contenido y agentes de IA",
          en: "Monza Studio — Your brand selling on Shopify with AI content and agents",
          de: "Monza Studio — Deine Marke auf Shopify mit KI-Content und Agenten",
          pt: "Monza Studio — A tua marca a vender em Shopify com conteúdo e agentes de IA",
        }}
        description={{
          es: "Programa de 12 semanas: ecommerce Shopify + motor de contenido con IA + agentes de IA (ventas y pauta). Caso vivo: Eleonora Morales, 350K+ TikTok.",
          en: "12-week program: Shopify ecommerce + AI content engine + AI agents (sales and paid media). Live case: Eleonora Morales, 350K+ TikTok.",
          de: "12-Wochen-Programm: Shopify + KI-Content-Engine + KI-Agenten (Vertrieb und Ads). Live-Case: Eleonora Morales, 350K+ TikTok.",
          pt: "Programa de 12 semanas: Shopify + motor de conteúdo IA + agentes de IA (vendas e anúncios). Caso vivo: Eleonora Morales, 350K+ TikTok.",
        }}
        path="/studio"
        ogPage="monzastudio"
        jsonLd={[faqJsonLd, serviceJsonLd]}
      />

      {/* ------------------------------------------------------- HERO --- */}
      <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 px-6">
        <div className="mx-auto max-w-[980px] text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-clash text-[11px] md:text-[12px] tracking-[0.35em] mb-8"
            style={{ color: "rgba(248,180,217,0.85)" }}
          >
            {COPY.eyebrow[L]}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="font-clash font-bold leading-[1.04] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 4.8rem)" }}
          >
            {COPY.h1a[L]}
            <br />
            <span style={{ color: "rgba(248,180,217,0.95)" }}>{COPY.h1b[L]}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="mt-8 text-[16px] md:text-[18px] leading-relaxed max-w-[640px] mx-auto"
            style={{ color: "rgba(255,252,247,0.65)" }}
          >
            {COPY.sub[L]}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={scrollToForm}
              className="font-clash font-semibold tracking-wide rounded-full px-9 py-4 text-[15px] transition-transform duration-300 hover:scale-[1.04]"
              style={{ background: "#F8B4D9", color: "#0B0B10" }}
            >
              {COPY.ctaPrimary[L]}
            </button>
            <a
              href={whatsAppUrl("Hola Edgar, vengo de monzalab.com/studio y quiero hablar de mi marca.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp", "studio_hero")}
              className="font-clash font-medium tracking-wide rounded-full px-9 py-4 text-[15px] transition-colors duration-300"
              style={{ border: "1px solid rgba(255,252,247,0.25)", color: "rgba(255,252,247,0.85)" }}
            >
              {COPY.ctaWhats[L]}
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="mt-10 text-[13px] tracking-wide"
            style={{ color: "rgba(255,252,247,0.4)" }}
          >
            {COPY.trust[L]}
          </motion.p>
        </div>
      </section>

      {/* ------------------------------------------------------ OFERTA --- */}
      <Section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-clash font-bold text-center tracking-[-0.02em] mb-14 md:mb-20" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            {COPY.offerTitle[L]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div
                key={p.n}
                className="rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1"
                style={{ background: "rgba(255,252,247,0.035)", border: "1px solid rgba(255,252,247,0.08)" }}
              >
                <p className="font-clash text-[12px] tracking-[0.3em] mb-5" style={{ color: "rgba(248,180,217,0.8)" }}>{p.n}</p>
                <h3 className="font-clash font-semibold text-[20px] mb-4">{p.title[L]}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,252,247,0.6)" }}>{p.body[L]}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------- CASO ELEONORA --- */}
      <Section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] rounded-3xl p-10 md:p-16" style={{ background: "rgba(248,180,217,0.05)", border: "1px solid rgba(248,180,217,0.15)" }}>
          <p className="font-clash text-[11px] tracking-[0.35em] mb-4" style={{ color: "rgba(248,180,217,0.85)" }}>
            {COPY.caseTitle[L].toUpperCase()}
          </p>
          <h2 className="font-clash font-bold tracking-[-0.02em] mb-6" style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)" }}>
            {COPY.caseName[L]}
          </h2>
          <p className="text-[15px] md:text-[16px] leading-relaxed max-w-[680px] mb-12" style={{ color: "rgba(255,252,247,0.68)" }}>
            {COPY.caseDesc[L]}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {CASE_STATS.map((s) => (
              <div key={s.value}>
                <p className="font-clash font-bold text-[34px] md:text-[42px] leading-none mb-2" style={{ color: "rgba(248,180,217,0.95)" }}>
                  {s.value}
                </p>
                <p className="text-[12px] md:text-[13px] leading-snug" style={{ color: "rgba(255,252,247,0.55)" }}>
                  {s.label[L]}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a
              href="https://eleonoramorales.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-clash text-[13px] tracking-[0.1em] underline underline-offset-8 transition-colors"
              style={{ color: "rgba(255,252,247,0.6)" }}
            >
              eleonoramorales.com →
            </a>
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------- PROCESO --- */}
      <Section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-clash font-bold text-center tracking-[-0.02em] mb-14 md:mb-20" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            {COPY.howTitle[L]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PHASES.map((ph, i) => (
              <div key={i} className="rounded-2xl p-7" style={{ background: "rgba(255,252,247,0.03)", border: "1px solid rgba(255,252,247,0.08)" }}>
                <p className="font-clash text-[11px] tracking-[0.25em] mb-3" style={{ color: "rgba(248,180,217,0.8)" }}>
                  {ph.weeks[L].toUpperCase()}
                </p>
                <h3 className="font-clash font-semibold text-[17px] mb-3">{ph.title[L]}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,252,247,0.55)" }}>{ph.body[L]}</p>
              </div>
            ))}
          </div>
          {/* Inversión */}
          <div className="mt-16 text-center max-w-[560px] mx-auto">
            <h3 className="font-clash font-semibold text-[20px] mb-4" style={{ color: "rgba(248,180,217,0.9)" }}>
              {COPY.investTitle[L]}
            </h3>
            <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,252,247,0.6)" }}>
              {COPY.investBody[L]}
            </p>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- FAQ --- */}
      <Section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-clash font-bold text-center tracking-[-0.02em] mb-12" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
            {COPY.faqTitle[L]}
          </h2>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl px-6 py-5"
                style={{ background: "rgba(255,252,247,0.03)", border: "1px solid rgba(255,252,247,0.08)" }}
              >
                <summary className="font-clash font-medium text-[15px] cursor-pointer list-none flex items-center justify-between gap-4">
                  {f.q[L]}
                  <span className="transition-transform duration-300 group-open:rotate-45 text-[18px]" style={{ color: "rgba(248,180,217,0.8)" }}>+</span>
                </summary>
                <p className="mt-4 text-[14px] leading-relaxed" style={{ color: "rgba(255,252,247,0.6)" }}>
                  {f.a[L]}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------- FORM --- */}
      <Section className="px-6 py-16 md:py-28">
        <div id="lead-form" className="mx-auto max-w-[760px] scroll-mt-28">
          <h2 className="font-clash font-bold text-center tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            {COPY.formTitle[L]}
          </h2>
          <p className="text-center text-[14px] mb-12 max-w-[480px] mx-auto leading-relaxed" style={{ color: "rgba(255,252,247,0.55)" }}>
            {COPY.formSub[L]}
          </p>
          <LeadForm source="studio_landing" />
        </div>
      </Section>

      <FooterMinimal />
    </main>
  );
};

export default StudioLanding;
