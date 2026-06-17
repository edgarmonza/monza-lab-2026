import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SEO from "@/components/SEO";
import FooterMinimal from "@/components/FooterMinimal";
import LeadForm from "@/components/LeadForm";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackContact, whatsAppUrl } from "@/lib/pixel";

type Lang = "es" | "en" | "de" | "pt";
/* es es obligatorio; en/de/pt caen a es hasta traducir (paso 2). */
type LT = { es: string; en?: string; de?: string; pt?: string };
const t = (o: LT, l: Lang) => o[l] ?? o.es;

const EASE = [0.16, 1, 0.3, 1] as const;
const PINK = "rgba(248,180,217,0.95)";
const PINK_SOFT = "rgba(248,180,217,0.85)";
const CREAM = "rgba(255,252,247,0.92)";
const CREAM_60 = "rgba(255,252,247,0.6)";
const CREAM_55 = "rgba(255,252,247,0.55)";
const CARD = "rgba(255,252,247,0.035)";
const CARD_BORDER = "rgba(255,252,247,0.08)";

/* ------------------------------------------------------------------ copy --- */

const COPY = {
  eyebrow: { es: "MONZA SESSIONS · EDUCACIÓN AI-NATIVE" },
  h1a: { es: "Aprende a construir con AI." },
  h1b: { es: "No solo a usarla." },
  sub: {
    es: "La formación de Monza Lab. Empiezas con una tarde presencial y profundizas con un bootcamp de ocho semanas. En las dos sales construyendo — no tomando notas.",
  },
  ctaPrimary: { es: "Quiero entrar" },
  ctaWhats: { es: "Hablar por WhatsApp" },
  trust: { es: "Lo enseña Edgar Navarro — founder de Monza Lab, que construye empresas con AI todos los días." },

  eraTitle: { es: "No es el futuro. Es el presente — y se mueve exponencial." },
  eraBody: {
    es: "Tú aprendes lineal: estudias, practicas, mejoras con los años. La máquina aprende exponencial. La distancia entre quien construye con AI y quien solo la mira se abre cada semana. La buena noticia: el que gana no es el que tiene la mejor herramienta. Es el que tiene mejor criterio.",
  },

  pathsTitle: { es: "Dos caminos. La misma escuela." },
  pathsSub: { es: "Aprender haciendo, de principio a fin. Empieza por donde estés." },

  forWhoTitle: { es: "Para quien tiene algo que construir — o ganas de tenerlo." },
  forWhoSub: { es: "No necesitas saber código. Necesitas criterio y ganas de construir." },

  edgarTitle: { es: "Quién lo enseña" },
  edgarLead: {
    es: "Edgar Navarro — Founder & Creative Director de Monza Lab, un company builder AI-native. No un infoproductor: alguien que construye plataformas desde código, estructura marcas y las lanza al mercado. Lo que ves en clase es lo que construye todos los días.",
  },
  edgarBody: {
    es: "El diferencial no es saber de AI. Es hacer el circuito completo — prototipar, validar, marcar, lanzar y crecer — con AI como infraestructura. Por eso Monza Sessions no enseña tips: enseña criterio, demostrado en vivo, desde lo construido.",
  },

  investTitle: { es: "Inversión" },
  investSub: { es: "Empieza por una tarde. Sube cuando tengas hambre de más." },

  faqTitle: { es: "Preguntas directas" },

  formTitle: { es: "Entra a la próxima edición" },
  formSub: { es: "Escríbenos y te confirmamos fechas, sede y el paso a paso. Sin llamadas eternas: cuéntanos qué quieres construir y te respondemos con criterio." },
} satisfies Record<string, LT>;

/* Los dos caminos (paraguas) */
const PATHS: Array<{ tag: LT; name: LT; meta: LT; price: string; body: LT; href: string }> = [
  {
    tag: { es: "Para empezar" },
    name: { es: "La tarde presencial" },
    meta: { es: "Tarde 2–6 p.m. + diagnóstico 1:1 previo" },
    price: "$150 USD",
    body: { es: "Una tarde intensiva. Dejas de leer sobre AI y sales con tu primer agente funcionando y un plan de 30 días." },
    href: "#sessions",
  },
  {
    tag: { es: "Para construir en serio" },
    name: { es: "El Bootcamp" },
    meta: { es: "8 semanas · en vivo · cohorte" },
    price: "$400 USD",
    body: { es: "Ocho semanas para pasar de usar AI a construir con AI. Terminas con un proyecto real construido y lanzado." },
    href: "#bootcamp",
  },
];

/* La tarde — 4 bloques */
const BLOQUES: Array<{ time: string; title: LT; tag: LT; out: LT }> = [
  {
    time: "2:00 – 3:00 p.m.",
    title: { es: "El cambio de era" },
    tag: { es: "Mentalidad + criterio" },
    out: { es: "Sales con: tu stack de arranque listo." },
  },
  {
    time: "3:00 – 4:00 p.m.",
    title: { es: "Tu copiloto" },
    tag: { es: "Prompting con criterio" },
    out: { es: "Sales con: una prompt library de arranque y 5 prompts que usas esta semana." },
  },
  {
    time: "4:00 – 5:15 p.m.",
    title: { es: "Crea tu primer agente" },
    tag: { es: "En vivo, sin código" },
    out: { es: "Sales con: tu primer agente funcionando." },
  },
  {
    time: "5:15 – 6:00 p.m.",
    title: { es: "Automatiza + tu plan" },
    tag: { es: "Lo que sigue" },
    out: { es: "Sales con: un plan concreto de 30 días." },
  },
];

/* El Bootcamp — 8 semanas */
const SEMANAS: Array<{ n: string; title: LT; focus: LT }> = [
  { n: "01", title: { es: "El cambio de era" }, focus: { es: "Mentalidad AI-native + monta tu stack." } },
  { n: "02", title: { es: "Hablar con la máquina" }, focus: { es: "Prompting con criterio." } },
  { n: "03", title: { es: "Crear agentes" }, focus: { es: "Cómo entras al 1%." } },
  { n: "04", title: { es: "Automatización real" }, focus: { es: "Tu operación corriendo sola." } },
  { n: "05", title: { es: "Creatividad desde código" }, focus: { es: "Branding, imagen, video y web con AI." } },
  { n: "06", title: { es: "Construir el producto" }, focus: { es: "De idea a MVP, validado." } },
  { n: "07", title: { es: "Marca y distribución" }, focus: { es: "Posicionamiento y go-to-market global." } },
  { n: "08", title: { es: "Lanzar" }, focus: { es: "Tu proyecto al mundo. Demo Day." } },
];

/* Para quién */
const FOR_WHO: Array<{ n: string; title: LT; body: LT }> = [
  { n: "01", title: { es: "Founders y emprendedores" }, body: { es: "Que quieren construir con AI como infraestructura, no como novelty." } },
  { n: "02", title: { es: "Profesionales que no quieren quedarse atrás" }, body: { es: "Y volverse el que sabe construir dentro de su empresa." } },
  { n: "03", title: { es: "Equipos" }, body: { es: "Que quieren un arranque común con criterio. Versión in-company disponible." } },
  { n: "04", title: { es: "Curiosos con criterio" }, body: { es: "Cansados de tutoriales sueltos que no llevan a nada." } },
];

/* Credenciales Edgar */
const CREDS: Array<{ lab: LT; val: LT }> = [
  { lab: { es: "Founder & Creative Director" }, val: { es: "Monza Lab — AI-Native Company Builder" } },
  { lab: { es: "Ventures construidas con AI" }, val: { es: "MonzaHaus · Monza Index · Portimar" } },
  { lab: { es: "Capacitaciones" }, val: { es: "ANDI · Andigraf · Turismo Portugal" } },
  { lab: { es: "Enfoque" }, val: { es: "Criterio sobre capital · Global desde día uno" } },
];

const FAQS: Array<{ q: LT; a: LT }> = [
  {
    q: { es: "¿Necesito saber programar?" },
    a: { es: "No. En las dos modalidades aprendes a montar agentes y automatizaciones sin escribir código — y entiendes cuándo el código suma, sin depender de él. Necesitas criterio y ganas de construir." },
  },
  {
    q: { es: "¿Cuál es la diferencia entre la tarde y el bootcamp?" },
    a: { es: "La tarde (Monza Sessions, 2:00–6:00 p.m. presencial, más una hora de diagnóstico 1:1 previo conmigo) es la puerta de entrada: sales con tu primer agente. El Bootcamp (8 semanas en vivo) es profundidad: construyes y lanzas un proyecto real con acompañamiento de cohorte." },
  },
  {
    q: { es: "¿La tarde es presencial y el bootcamp digital?" },
    a: { es: "Sí. La tarde es presencial, en grupo reducido. El Bootcamp es en vivo por video, una sesión por semana durante ocho semanas, con grabaciones y comunidad." },
  },
  {
    q: { es: "¿Salgo con algo real?" },
    a: { es: "Esa es la promesa. En la tarde sales con tu primer agente y un plan de 30 días. En el Bootcamp terminas con un proyecto construido y lanzado en el Demo Day. Nunca con apuntes." },
  },
  {
    q: { es: "Si hago la tarde, ¿me sirve para el bootcamp?" },
    a: { es: "Sí. El valor de tu Monza Session se abona al Bootcamp si decides entrar. La escalera está pensada para que subas sin pagar dos veces lo mismo." },
  },
  {
    q: { es: "¿Y si quiero que lo construyan conmigo?" },
    a: { es: "Para eso está Monza Studio, donde construimos tu empresa contigo, 1:1. Quien termina el Bootcamp con un proyecto serio es candidato natural." },
  },
];

/* ------------------------------------------------------------- component --- */

const Section = ({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

/* Reel vertical 9:16. Autoplay muted (regla de navegadores); un toque activa el sonido. */
const SessionReel = () => {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const enableSound = () => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    setMuted(false);
    v.play().catch(() => {});
  };
  const toggle = () => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px]">
      <div
        className="relative rounded-[28px] overflow-hidden cursor-pointer"
        style={{ aspectRatio: "9 / 16", background: "#0B0B10", border: "1px solid rgba(248,180,217,0.22)", boxShadow: "0 30px 70px -24px rgba(0,0,0,0.65), 0 0 50px rgba(248,180,217,0.08)" }}
        onClick={() => { if (muted) enableSound(); }}
      >
        <video
          ref={vidRef}
          src="/media/monza-sessions.mp4"
          poster="/media/monza-sessions-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-contain"
        />
        {/* Hint visible solo en silencio */}
        {muted && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center pb-7 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(11,11,16,0.55), transparent 40%)" }}>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-clash tracking-[0.04em] animate-pulse" style={{ background: "rgba(11,11,16,0.62)", backdropFilter: "blur(8px)", border: "1px solid rgba(248,180,217,0.38)", color: "#F8B4D9" }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
              Toca para escuchar
            </span>
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggle(); }}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
          style={{ background: "rgba(11,11,16,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(248,180,217,0.3)", color: "#F8B4D9" }}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M19 5a9 9 0 0 1 0 14" /></svg>
          )}
        </button>
      </div>
    </div>
  );
};

const MonzaSessions = () => {
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
      name: t(f.q, L),
      acceptedAnswer: { "@type": "Answer", text: t(f.a, L) },
    })),
  };

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Monza Sessions — Educación AI-native",
    description: "Formación de Monza Lab para construir con AI: una tarde presencial (Monza Sessions) y un bootcamp de 8 semanas (Monza Bootcamp).",
    provider: { "@type": "Organization", name: "Monza Lab", url: "https://monzalab.com" },
    hasCourseInstance: [
      { "@type": "CourseInstance", name: "Monza Sessions — tarde presencial", courseMode: "onsite", offers: { "@type": "Offer", price: "150", priceCurrency: "USD" } },
      { "@type": "CourseInstance", name: "Monza Bootcamp — 8 semanas", courseMode: "online", offers: { "@type": "Offer", price: "400", priceCurrency: "USD" } },
    ],
  };

  return (
    <main id="main" className="relative min-h-screen" style={{ color: CREAM }}>
      <SEO
        title={{
          es: "Monza Sessions — Aprende a construir con AI | Monza Lab",
          en: "Monza Sessions — Learn to build with AI | Monza Lab",
          de: "Monza Sessions — Mit AI bauen lernen | Monza Lab",
          pt: "Monza Sessions — Aprende a construir com AI | Monza Lab",
        }}
        description={{
          es: "La formación de Monza Lab. Una tarde presencial 2–6 p.m. con diagnóstico 1:1 ($150 USD) o un bootcamp de 8 semanas ($400 USD) para pasar de usar AI a construir con ella. Lo enseña Edgar Navarro.",
          en: "Monza Lab's training. A 4-hour onsite session or an 8-week bootcamp to go from using AI to building with it. Taught by Edgar Navarro.",
          de: "Die Ausbildung von Monza Lab. Eine Präsenz-Session oder ein 8-Wochen-Bootcamp, um mit AI zu bauen. Von Edgar Navarro.",
          pt: "A formação da Monza Lab. Uma tarde presencial ou um bootcamp de 8 semanas para construir com AI. Ensinado por Edgar Navarro.",
        }}
        path="/sessions"
        jsonLd={[faqJsonLd, courseJsonLd]}
      />

      {/* ------------------------------------------------------------- HERO --- */}
      <section className="relative pt-28 md:pt-44 pb-16 md:pb-28 px-6">
        <div className="mx-auto max-w-[980px] text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-clash text-[11px] md:text-[12px] tracking-[0.35em] mb-8"
            style={{ color: PINK_SOFT }}
          >
            {t(COPY.eyebrow, L)}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="font-clash font-bold leading-[1.04] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.15rem, 8vw, 4.8rem)" }}
          >
            {t(COPY.h1a, L)}
            <br />
            <span style={{ color: PINK }}>{t(COPY.h1b, L)}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="mt-8 text-[16px] md:text-[18px] leading-relaxed max-w-[660px] mx-auto"
            style={{ color: "rgba(255,252,247,0.65)" }}
          >
            {t(COPY.sub, L)}
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
              {t(COPY.ctaPrimary, L)}
            </button>
            <a
              href={whatsAppUrl("Hola Edgar, vengo de monzalab.com/sessions y quiero información de Monza Sessions.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp", "sessions_hero")}
              className="font-clash font-medium tracking-wide rounded-full px-9 py-4 text-[15px] transition-colors duration-300"
              style={{ border: "1px solid rgba(255,252,247,0.25)", color: "rgba(255,252,247,0.85)" }}
            >
              {t(COPY.ctaWhats, L)}
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="mt-10 text-[13px] tracking-wide max-w-[520px] mx-auto"
            style={{ color: "rgba(255,252,247,0.4)" }}
          >
            {t(COPY.trust, L)}
          </motion.p>
        </div>
      </section>

      {/* ------------------------------------------------------- VIDEO REEL --- */}
      <Section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <SessionReel />
            <div>
              <p className="font-clash text-[11px] tracking-[0.3em] uppercase mb-5" style={{ color: PINK_SOFT }}>En vivo</p>
              <h2 className="font-clash font-bold tracking-[-0.02em] mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                Así se vive una Monza Session.
              </h2>
              <p className="text-[16px] leading-relaxed mb-8" style={{ color: CREAM_60 }}>
                No es una charla ni un webinar. Es una sala llena de gente construyendo con AI en vivo, guiada. Esto es lo que se siente.
              </p>
              <ul className="space-y-3">
                {[
                  "Grupo reducido, energía de taller",
                  "Construyes en vivo, con tu laptop",
                  "Sales con algo funcionando, no con apuntes",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3 text-[15px]" style={{ color: CREAM_60 }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F8B4D9" }} />
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <button
                  onClick={scrollToForm}
                  className="font-clash font-semibold tracking-wide rounded-full px-8 py-3.5 text-[15px] transition-transform duration-300 hover:scale-[1.04]"
                  style={{ background: "#F8B4D9", color: "#0B0B10" }}
                >
                  Quiero entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------- EL CAMBIO DE ERA --- */}
      <Section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <p className="font-clash text-[11px] tracking-[0.3em] mb-6" style={{ color: PINK_SOFT }}>
            EL MOMENTO
          </p>
          <h2 className="font-clash font-semibold tracking-[-0.02em] mb-8" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)" }}>
            {t(COPY.eraTitle, L)}
          </h2>
          <p className="text-[17px] md:text-[20px] leading-relaxed max-w-[860px]" style={{ color: "rgba(255,252,247,0.7)" }}>
            {t(COPY.eraBody, L)}
          </p>
        </div>
      </Section>

      {/* --------------------------------------------------------- 2 CAMINOS --- */}
      <Section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-clash font-bold text-center tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            {t(COPY.pathsTitle, L)}
          </h2>
          <p className="text-center text-[15px] mb-14 md:mb-16 max-w-[520px] mx-auto" style={{ color: CREAM_55 }}>
            {t(COPY.pathsSub, L)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PATHS.map((p, i) => (
              <a
                key={i}
                href={p.href}
                className="rounded-3xl p-8 md:p-10 transition-transform duration-300 hover:-translate-y-1 block"
                style={{ background: "rgba(248,180,217,0.05)", border: "1px solid rgba(248,180,217,0.16)" }}
              >
                <p className="font-clash text-[11px] tracking-[0.28em] uppercase mb-5" style={{ color: PINK_SOFT }}>{t(p.tag, L)}</p>
                <h3 className="font-clash font-bold text-[26px] md:text-[30px] mb-2">{t(p.name, L)}</h3>
                <p className="text-[13px] mb-6" style={{ color: CREAM_55 }}>{t(p.meta, L)}</p>
                <p className="text-[15px] leading-relaxed mb-8" style={{ color: CREAM_60 }}>{t(p.body, L)}</p>
                <div className="flex items-center justify-between">
                  <span className="font-clash font-semibold text-[20px]" style={{ color: PINK }}>{p.price}</span>
                  <span className="font-clash text-[13px] tracking-[0.1em]" style={{ color: CREAM_55 }}>Ver más →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------- LA TARDE (SESSIONS) --- */}
      <Section id="sessions" className="px-6 py-16 md:py-24 scroll-mt-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="max-w-[760px] mb-12 md:mb-16">
            <p className="font-clash text-[11px] tracking-[0.3em] uppercase mb-5" style={{ color: PINK_SOFT }}>
              La tarde presencial · 2:00–6:00 p.m. · $150 USD
            </p>
            <h2 className="font-clash font-bold tracking-[-0.02em] mb-5" style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.2rem)" }}>
              Una tarde. Sales con tu primer agente funcionando.
            </h2>
            <p className="text-[16px] leading-relaxed" style={{ color: CREAM_60 }}>
              De 2:00 a 6:00 p.m., presencial, grupo reducido, tu laptop. Cuatro bloques, y cada uno deja algo construido. No es una charla — es construir en vivo, guiado. Y empieza antes: con un diagnóstico 1:1 conmigo para personalizar la sesión a ti.
            </p>
          </div>
          {/* Diagnóstico previo 1:1 incluido */}
          <div className="rounded-2xl p-6 md:p-7 mb-5 flex flex-col sm:flex-row items-start gap-4" style={{ background: "rgba(248,180,217,0.06)", border: "1px solid rgba(248,180,217,0.2)" }}>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(248,180,217,0.1)", border: "1px solid rgba(248,180,217,0.25)", color: PINK }}>Incluido · antes</span>
            <div>
              <h3 className="font-clash font-semibold text-[18px] mb-1">Diagnóstico 1:1 con Edgar · 1 hora</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: CREAM_60 }}>Antes de la tarde nos sentamos una hora, uno a uno, a entender tu negocio y tus objetivos. Con eso personalizo la sesión para que cada bloque trabaje sobre lo tuyo — no sobre ejemplos genéricos.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BLOQUES.map((b, i) => (
              <div key={i} className="rounded-2xl p-7" style={{ background: CARD, border: `1px solid ${CARD_BORDER}` }}>
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-mono text-[12px] tracking-[0.1em]" style={{ color: PINK_SOFT }}>{b.time}</span>
                </div>
                <h3 className="font-clash font-semibold text-[20px] mb-1">{t(b.title, L)}</h3>
                <p className="text-[13px] mb-4" style={{ color: PINK_SOFT }}>{t(b.tag, L)}</p>
                <p className="text-[14px] leading-relaxed pt-4" style={{ color: CREAM_60, borderTop: `1px solid ${CARD_BORDER}` }}>{t(b.out, L)}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={scrollToForm}
              className="font-clash font-semibold tracking-wide rounded-full px-8 py-3.5 text-[15px] transition-transform duration-300 hover:scale-[1.04]"
              style={{ background: "#F8B4D9", color: "#0B0B10" }}
            >
              Reservar mi lugar
            </button>
            <span className="font-mono text-[13px]" style={{ color: CREAM_55 }}>
              $150 USD · incluye diagnóstico 1:1
            </span>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------- EL BOOTCAMP (★) --- */}
      <Section id="bootcamp" className="px-6 py-16 md:py-24 scroll-mt-24">
        <div className="mx-auto max-w-[1100px] rounded-[28px] p-8 md:p-14" style={{ background: "rgba(248,180,217,0.05)", border: "1px solid rgba(248,180,217,0.16)" }}>
          <div className="max-w-[760px] mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ background: "rgba(248,180,217,0.08)", border: "1px solid rgba(248,180,217,0.22)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#F8B4D9", boxShadow: "0 0 8px #F8B4D9" }} />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: PINK }}>Monza Bootcamp · 8 semanas · cohorte en vivo</span>
            </div>
            <h2 className="font-clash font-bold tracking-[-0.02em] mb-5" style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.2rem)" }}>
              Ocho semanas para construir y lanzar con AI.
            </h2>
            <p className="text-[16px] leading-relaxed" style={{ color: CREAM_60 }}>
              Una sesión en vivo por semana, en cohorte. Cada semana mezcla creatividad desde código y construcción de empresa — tu proyecto avanza con cada sesión hasta que lo lanzas en el Demo Day. No es un curso grabado que nunca terminas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SEMANAS.map((s) => (
              <div key={s.n} className="rounded-2xl p-6" style={{ background: "rgba(11,11,16,0.35)", border: `1px solid ${CARD_BORDER}` }}>
                <p className="font-clash font-bold text-[28px] leading-none mb-4" style={{ color: "rgba(248,180,217,0.55)" }}>{s.n}</p>
                <h3 className="font-clash font-semibold text-[16px] mb-2 leading-snug">{t(s.title, L)}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: CREAM_55 }}>{t(s.focus, L)}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ul className="space-y-2.5">
              {[
                "Tu stack de AI montado y funcionando",
                "Agentes y automatizaciones corriendo en tu negocio",
                "Un proyecto real construido y lanzado",
                "Prompt library completa + grabaciones",
                "Comunidad de tu cohorte",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px]" style={{ color: CREAM_60 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F8B4D9" }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-start md:items-end gap-4">
              <span className="font-clash font-bold text-[38px] leading-none" style={{ color: PINK }}>$400 <span className="text-[16px]" style={{ color: CREAM_55 }}>USD</span></span>
              <button
                onClick={scrollToForm}
                className="font-clash font-semibold tracking-wide rounded-full px-8 py-3.5 text-[15px] transition-transform duration-300 hover:scale-[1.04]"
                style={{ background: "#F8B4D9", color: "#0B0B10" }}
              >
                Reservar mi cupo
              </button>
              <span className="font-mono text-[12px]" style={{ color: CREAM_55 }}>El valor de tu Session se abona aquí.</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- MÉTODO --- */}
      <Section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-clash text-[11px] tracking-[0.3em] uppercase mb-6 text-center" style={{ color: PINK_SOFT }}>El método</p>
          <h2 className="font-clash font-bold text-center tracking-[-0.02em] mb-14 md:mb-16" style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.6rem)" }}>
            Aprender haciendo. Cada sesión deja algo construido.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { n: "01", t: "Teoría mínima" },
              { n: "02", t: "Demo en vivo" },
              { n: "03", t: "Build guiado" },
              { n: "04", t: "Tu turno" },
              { n: "05", t: "Te lo llevas" },
            ].map((step) => (
              <div key={step.n} className="rounded-2xl p-6 text-center" style={{ background: CARD, border: `1px solid ${CARD_BORDER}` }}>
                <p className="font-mono text-[12px] mb-3" style={{ color: PINK_SOFT }}>{step.n}</p>
                <p className="font-clash font-semibold text-[15px]">{step.t}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------- PARA QUIÉN --- */}
      <Section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="max-w-[640px] mb-12">
            <p className="font-clash text-[11px] tracking-[0.3em] uppercase mb-5" style={{ color: PINK_SOFT }}>Para quién es</p>
            <h2 className="font-clash font-bold tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.6rem)" }}>
              {t(COPY.forWhoTitle, L)}
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: CREAM_60 }}>{t(COPY.forWhoSub, L)}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
            {FOR_WHO.map((f) => (
              <div key={f.n} className="flex items-start gap-5 py-5" style={{ borderTop: `1px solid ${CARD_BORDER}` }}>
                <span className="font-mono text-[12px] pt-1" style={{ color: PINK_SOFT }}>{f.n}</span>
                <div>
                  <h3 className="font-clash font-semibold text-[17px] mb-1">{t(f.title, L)}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: CREAM_55 }}>{t(f.body, L)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------------- EDGAR --- */}
      <Section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <p className="font-clash text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: PINK_SOFT }}>{t(COPY.edgarTitle, L)}</p>
          <h2 className="font-clash font-bold tracking-[-0.02em] mb-8" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>Edgar Navarro</h2>
          <p className="text-[17px] md:text-[19px] leading-relaxed max-w-[840px] mb-6" style={{ color: "rgba(255,252,247,0.78)" }}>
            {t(COPY.edgarLead, L)}
          </p>
          <p className="text-[15px] leading-relaxed max-w-[840px] mb-12" style={{ color: CREAM_60 }}>
            {t(COPY.edgarBody, L)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CREDS.map((c, i) => (
              <div key={i} className="rounded-xl p-5" style={{ background: CARD, border: `1px solid ${CARD_BORDER}` }}>
                <p className="font-mono text-[10px] tracking-[0.14em] uppercase mb-2" style={{ color: PINK_SOFT }}>{t(c.lab, L)}</p>
                <p className="font-clash font-semibold text-[15px]">{t(c.val, L)}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------- INVERSIÓN --- */}
      <Section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center max-w-[560px] mx-auto mb-14">
            <p className="font-clash text-[11px] tracking-[0.3em] uppercase mb-5" style={{ color: PINK_SOFT }}>{t(COPY.investTitle, L)}</p>
            <h2 className="font-clash font-bold tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>{t(COPY.investSub, L)}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-9" style={{ background: CARD, border: `1px solid ${CARD_BORDER}` }}>
              <h3 className="font-clash font-semibold text-[20px] mb-1">Monza Sessions</h3>
              <p className="text-[13px] mb-6" style={{ color: CREAM_55 }}>Tarde 2–6 p.m. + diagnóstico 1:1</p>
              <p className="font-clash font-bold text-[32px] sm:text-[40px] leading-none mb-6" style={{ color: PINK }}>$150 <span className="text-[15px]" style={{ color: CREAM_55 }}>USD</span></p>
              <button onClick={scrollToForm} className="font-clash font-medium tracking-wide rounded-full px-7 py-3 text-[14px] transition-colors" style={{ border: "1px solid rgba(255,252,247,0.25)", color: CREAM }}>
                Reservar lugar
              </button>
            </div>
            <div className="rounded-3xl p-9" style={{ background: "rgba(248,180,217,0.06)", border: "1px solid rgba(248,180,217,0.2)" }}>
              <h3 className="font-clash font-semibold text-[20px] mb-1">Monza Bootcamp</h3>
              <p className="text-[13px] mb-6" style={{ color: CREAM_55 }}>8 semanas · cohorte en vivo</p>
              <p className="font-clash font-bold text-[32px] sm:text-[40px] leading-none mb-6" style={{ color: PINK }}>$400 <span className="text-[15px]" style={{ color: CREAM_55 }}>USD</span></p>
              <button onClick={scrollToForm} className="font-clash font-semibold tracking-wide rounded-full px-7 py-3 text-[14px] transition-transform duration-300 hover:scale-[1.04]" style={{ background: "#F8B4D9", color: "#0B0B10" }}>
                Reservar cupo
              </button>
            </div>
          </div>
          <p className="text-center text-[13px] mt-8 max-w-[600px] mx-auto" style={{ color: CREAM_55 }}>
            Precio honrado: quien entra a precio de lanzamiento lo mantiene. ¿Vas más en serio? El siguiente paso es <span style={{ color: PINK_SOFT }}>Monza Studio</span>, donde construimos tu empresa contigo.
          </p>
        </div>
      </Section>

      {/* --------------------------------------------------------------- FAQ --- */}
      <Section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-clash font-bold text-center tracking-[-0.02em] mb-12" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
            {t(COPY.faqTitle, L)}
          </h2>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <details key={i} className="group rounded-xl px-6 py-5" style={{ background: CARD, border: `1px solid ${CARD_BORDER}` }}>
                <summary className="font-clash font-medium text-[15px] cursor-pointer list-none flex items-center justify-between gap-4">
                  {t(f.q, L)}
                  <span className="transition-transform duration-300 group-open:rotate-45 text-[18px]" style={{ color: PINK_SOFT }}>+</span>
                </summary>
                <p className="mt-4 text-[14px] leading-relaxed" style={{ color: CREAM_60 }}>{t(f.a, L)}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------------- FORM --- */}
      <Section className="px-6 py-16 md:py-28">
        <div id="lead-form" className="mx-auto max-w-[760px] scroll-mt-28">
          <h2 className="font-clash font-bold text-center tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            {t(COPY.formTitle, L)}
          </h2>
          <p className="text-center text-[14px] mb-12 max-w-[520px] mx-auto leading-relaxed" style={{ color: CREAM_55 }}>
            {t(COPY.formSub, L)}
          </p>
          <LeadForm source="sessions_landing" />
        </div>
      </Section>

      <FooterMinimal />
    </main>
  );
};

export default MonzaSessions;
