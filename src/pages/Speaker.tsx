import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FooterMinimal from "@/components/FooterMinimal";
import PremiumBackground from "@/components/layout/PremiumBackground";
import { useTheme } from "@/theme/ThemeContext";
import { useLanguage } from "@/i18n/LanguageContext";
import edgarEditorial from "@/assets/edgar-editorial-pink.png";
import CTAButton from "@/components/ui/CTAButton";
import SEO from "@/components/SEO";

const SPEAKER_PHOTOS = [
  { src: "/images/Speaker/8565b51b-2338-4737-958b-042761b06ceb.jpg", aspect: "landscape", label: "KPMG · Bogota" },
  { src: "/images/Speaker/15474a8a-40f8-4533-b39d-20a91fb73992.jpg", aspect: "portrait",  label: "Keynote · En escenario" },
  { src: "/images/Speaker/772cff2c-09c9-454b-8870-aae7ff4dab43.jpg", aspect: "landscape", label: "Sala llena · IA en vivo" },
  { src: "/images/Speaker/816b944b-0546-4c9b-aef5-6554e532cf52.jpg", aspect: "portrait",  label: "Panel · Director Innovacion" },
  { src: "/images/Speaker/448c3893-58da-466f-8e0c-5022330ff37c.jpg", aspect: "landscape", label: "University Demo Day" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const content = {
  es: {
    hero: {
      eyebrow: "Edgar Navarro · Speaker",
      headline1: "No habla de IA.",
      headlineAccent: "La usa.",
      cta: "Trae a Edgar a tu evento",
      readMore: "Leer más ↓",
    },
    numbers: [
      { n: "15+", label: "años construyendo" },
      { n: "6", label: "años en KPMG" },
      { n: "1.200+", label: "en escenario" },
      { n: "2", label: "empresas fundadas" },
    ],
    who: {
      eyebrow: "El speaker",
      headline1: "No viene a hablar",
      headline2: "de lo que estudió.",
      headlineAccent1: "Viene a mostrar",
      headlineAccent2: "lo que hace.",
      bio: "Consultor de Big Four. Fundador de múltiples ventures en paralelo. Construye con IA desde el día uno — no como herramienta, sino como sistema operativo. No habla desde la teoría. Habla desde la obra que está corriendo hoy.",
    },
    ventures: [
      { name: "Monza Lab",      href: null,                              desc: "AI-native company builder · Colombia" },
      { name: "Monza Haus",     href: null,                              desc: "Plataforma · US/UK/EU/Japan" },
      { name: "Bavarian Econs", href: "https://www.bavarianecons.com/",  desc: "Electrificación de BMW clásicos" },
      { name: "Guardian Speed", href: "https://www.guardianofspeed.de",  desc: "Logistics · München" },
    ],
    statement: {
      part1: "\u201CNo da la misma charla dos veces. ",
      accent: "Diseña cada conferencia como una experiencia",
      part2: " — cruza mundos que nadie más conecta.\u201D",
    },
    themes: {
      eyebrow: "Cómo funciona",
      headline1: "Cada escenario es diferente.",
      headline2: "Cada conferencia también.",
      description: "No repito charlas. Diseño cada experiencia según tu público, tu industria y lo que necesitan llevarse. Cruzo mundos que normalmente no se tocan — y desde ahí construyo el ángulo.",
      cards: [
        {
          lente: "IA × Empresa",
          titulo: "La empresa que se compila.",
          sub: "Construir un negocio donde la IA no es un departamento — es el sistema operativo. Cómo mover más rápido, contratar menos y producir a escala de equipo grande con equipo pequeño.",
          para: "CEOs · Founders · Directorios",
        },
        {
          lente: "IA × Velocidad",
          titulo: "Mover rápido sin romper nada.",
          sub: "La paradoja del constructor moderno: velocidad de startup sin perder la calidad que construye marca. Desde el automovilismo hasta escalar ventures en paralelo — cómo ejecutar a otro ritmo sin sacrificar lo que importa.",
          para: "Entrepreneurs · Equipos de alto rendimiento",
        },
        {
          lente: "IA × Experiencia",
          titulo: "Cada punto de contacto cuenta.",
          sub: "No es solo el logo — es toda la experiencia digital: desde que alguien te ve en redes hasta que navega tu web. Las empresas que van a dominar van a ganar porque cada interacción hace sentir algo. IA como amplificador de esa visión completa.",
          para: "CMOs · Brand leaders · Founders de marca",
        },
        {
          lente: "IA × Construcción",
          titulo: "De cero a marca global.",
          sub: "Cómo llevar un proyecto de idea a producto real con estética global desde Latinoamérica. El proceso completo: validación, marca, tech, go-to-market — todo con IA integrada desde el primer día.",
          para: "Founders · Product leaders · Innovación",
        },
      ],
      note: "Estos son los mundos que cruzo — no temas fijos. Cada conferencia se diseña desde cero para tu audiencia. El formato, el idioma y el ángulo se definen juntos.",
    },
    cta: {
      headline1: "¿Quieres traer",
      headlineAccent: "a Monza?",
      button: "Hablemos por WhatsApp",
    },
  },
  en: {
    hero: {
      eyebrow: "Edgar Navarro · Speaker",
      headline1: "He doesn\u2019t talk about AI.",
      headlineAccent: "He uses it.",
      cta: "Bring Edgar to your event",
      readMore: "Read more \u2193",
    },
    numbers: [
      { n: "15+", label: "years building" },
      { n: "6", label: "years at KPMG" },
      { n: "1,200+", label: "on stage" },
      { n: "2", label: "companies founded" },
    ],
    who: {
      eyebrow: "The speaker",
      headline1: "He doesn\u2019t come to talk",
      headline2: "about what he studied.",
      headlineAccent1: "He comes to show",
      headlineAccent2: "what he builds.",
      bio: "Big Four consultant. Founder of multiple ventures in parallel. Builds with AI from day one — not as a tool, but as an operating system. He doesn\u2019t speak from theory. He speaks from the work that\u2019s running today.",
    },
    ventures: [
      { name: "Monza Lab",      href: null,                              desc: "AI-native company builder · Colombia" },
      { name: "Monza Haus",     href: null,                              desc: "Platform · US/UK/EU/Japan" },
      { name: "Bavarian Econs", href: "https://www.bavarianecons.com/",  desc: "Classic BMW electrification" },
      { name: "Guardian Speed", href: "https://www.guardianofspeed.de",  desc: "Logistics · München" },
    ],
    statement: {
      part1: "\u201CHe never gives the same talk twice. ",
      accent: "He designs every conference as an experience",
      part2: " — crossing worlds no one else connects.\u201D",
    },
    themes: {
      eyebrow: "How it works",
      headline1: "Every stage is different.",
      headline2: "Every conference too.",
      description: "I don\u2019t repeat talks. I design each experience based on your audience, your industry, and what they need to take away. I cross worlds that normally don\u2019t touch — and build the angle from there.",
      cards: [
        {
          lente: "AI × Business",
          titulo: "The company that compiles itself.",
          sub: "Building a business where AI isn't a department — it's the operating system. How to move faster, hire less, and produce at big-team scale with a small team.",
          para: "CEOs · Founders · Board members",
        },
        {
          lente: "AI × Speed",
          titulo: "Move fast without breaking things.",
          sub: "The modern builder's paradox: startup speed without losing the quality that builds brand. From motorsport to scaling ventures in parallel — how to execute at a different pace without sacrificing what matters.",
          para: "Entrepreneurs · High-performance teams",
        },
        {
          lente: "AI × Experience",
          titulo: "Every touchpoint counts.",
          sub: "It's not just the logo — it's the entire digital experience: from when someone sees you on social media to when they browse your web. Companies that will dominate will win because every interaction makes people feel something. AI as the amplifier of that complete vision.",
          para: "CMOs · Brand leaders · Brand founders",
        },
        {
          lente: "AI × Building",
          titulo: "From zero to global brand.",
          sub: "How to take a project from idea to real product with global aesthetics from Latin America. The complete process: validation, brand, tech, go-to-market — all with AI integrated from day one.",
          para: "Founders · Product leaders · Innovation",
        },
      ],
      note: "These are the worlds I cross — not fixed topics. Every conference is designed from scratch for your audience. The format, language, and angle are defined together.",
    },
    cta: {
      headline1: "Want to bring",
      headlineAccent: "Monza?",
      button: "Let\u2019s talk on WhatsApp",
    },
  },
  de: {
    hero: {
      eyebrow: "Edgar Navarro · Speaker",
      headline1: "Er redet nicht \u00FCber KI.",
      headlineAccent: "Er nutzt sie.",
      cta: "Edgar f\u00FCr dein Event buchen",
      readMore: "Weiterlesen ↓",
    },
    numbers: [
      { n: "15+", label: "Jahre am Bauen" },
      { n: "6", label: "Jahre bei KPMG" },
      { n: "1.200+", label: "auf der Bühne" },
      { n: "2", label: "Unternehmen gegründet" },
    ],
    who: {
      eyebrow: "Der Speaker",
      headline1: "Er kommt nicht, um",
      headline2: "über Studiertes zu reden.",
      headlineAccent1: "Er kommt, um zu zeigen,",
      headlineAccent2: "was er baut.",
      bio: "Big-Four-Berater. Gründer mehrerer Ventures parallel. Baut mit KI vom ersten Tag — nicht als Tool, sondern als Betriebssystem. Er spricht nicht aus der Theorie. Er spricht aus dem Werk, das heute läuft.",
    },
    ventures: [
      { name: "Monza Lab",      href: null,                              desc: "AI-native Company Builder · Kolumbien" },
      { name: "Monza Haus",     href: null,                              desc: "Plattform · US/UK/EU/Japan" },
      { name: "Bavarian Econs", href: "https://www.bavarianecons.com/",  desc: "Elektrifizierung klassischer BMWs" },
      { name: "Guardian Speed", href: "https://www.guardianofspeed.de",  desc: "Logistik · München" },
    ],
    statement: {
      part1: "\u201EEr hält nie denselben Vortrag zweimal. ",
      accent: "Er designt jede Konferenz als Erlebnis",
      part2: " — und verbindet Welten, die sonst niemand zusammenbringt.\u201C",
    },
    themes: {
      eyebrow: "Wie es funktioniert",
      headline1: "Jede Bühne ist anders.",
      headline2: "Jede Konferenz auch.",
      description: "Ich wiederhole keine Vorträge. Ich designe jedes Erlebnis nach deinem Publikum, deiner Branche und dem, was sie mitnehmen sollen. Ich kreuze Welten, die sich normalerweise nicht berühren — und baue den Winkel von dort.",
      cards: [
        {
          lente: "KI × Unternehmen",
          titulo: "Das Unternehmen, das sich selbst kompiliert.",
          sub: "Ein Business bauen, in dem KI keine Abteilung ist — sondern das Betriebssystem. Wie man schneller agiert, weniger einstellt und im großen Maßstab produziert mit einem kleinen Team.",
          para: "CEOs · Founders · Aufsichtsräte",
        },
        {
          lente: "KI × Geschwindigkeit",
          titulo: "Schnell bewegen, ohne etwas zu zerstören.",
          sub: "Das Paradox des modernen Builders: Startup-Speed ohne die Qualität zu verlieren, die Marke aufbaut. Vom Motorsport bis zur Skalierung paralleler Ventures — wie man in einem anderen Rhythmus umsetzt.",
          para: "Entrepreneurs · High-Performance Teams",
        },
        {
          lente: "KI × Experience",
          titulo: "Jeder Touchpoint zählt.",
          sub: "Es geht nicht nur um das Logo — es geht um die gesamte digitale Experience: vom ersten Social-Media-Kontakt bis zur Website. Unternehmen, die dominieren werden, gewinnen, weil jede Interaktion etwas fühlen lässt. KI als Verstärker dieser kompletten Vision.",
          para: "CMOs · Brand Leaders · Marken-Gründer",
        },
        {
          lente: "KI × Aufbau",
          titulo: "Von null zur globalen Marke.",
          sub: "Wie man ein Projekt von der Idee zum realen Produkt mit globaler Ästhetik aus Lateinamerika bringt. Der komplette Prozess: Validierung, Marke, Tech, Go-to-Market — alles mit KI integriert vom ersten Tag.",
          para: "Founders · Product Leaders · Innovation",
        },
      ],
      note: "Das sind die Welten, die ich kreuze — keine festen Themen. Jede Konferenz wird von Grund auf für dein Publikum designt. Format, Sprache und Winkel werden gemeinsam definiert.",
    },
    cta: {
      headline1: "Willst du",
      headlineAccent: "Monza einladen?",
      button: "Per WhatsApp kontaktieren",
    },
  },
};

const Speaker = () => {
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isModena = theme === "modena";

  const t = content[language];

  // Theme-aware colors
  const textPrimary = isModena ? "#0B0B10" : "#FFFCF7";
  const textMuted = (opacity: number) => isModena ? `rgba(11,11,16,${opacity})` : `rgba(255,252,247,${opacity})`;
  const borderColor = (opacity: number) => isModena ? `rgba(11,11,16,${opacity})` : `rgba(255,255,255,${opacity})`;
  const bgFade = isModena ? "#F5F0EB" : "#0B0B10";

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PremiumBackground>
      <SEO
        path="/speaker"
        image="/images/Speaker/15474a8a-40f8-4533-b39d-20a91fb73992.jpg"
        type="profile"
        title={{
          es: "Edgar Navarro · Keynote Speaker IA — Monza Lab",
          en: "Edgar Navarro · AI Keynote Speaker — Monza Lab",
          de: "Edgar Navarro · KI Keynote Speaker — Monza Lab",
        }}
        description={{
          es: "Keynote speaker sobre inteligencia artificial, innovación y company building. Ex-Director de Innovación KPMG. Conferencias para empresas, universidades y eventos en LATAM, Europa y USA.",
          en: "Keynote speaker on artificial intelligence, innovation and company building. Former KPMG Innovation Director. Talks for companies, universities and events across LATAM, Europe and the US.",
          de: "Keynote Speaker für Künstliche Intelligenz, Innovation und Company Building. Ehem. KPMG-Innovationsdirektor. Vorträge für Unternehmen, Universitäten und Events in LATAM, Europa und USA.",
        }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Edgar Navarro",
          jobTitle: "AI Keynote Speaker & Founder",
          worksFor: { "@type": "Organization", name: "Monza Lab" },
          url: "https://monzalab.com/speaker",
          image: "https://monzalab.com/images/Speaker/15474a8a-40f8-4533-b39d-20a91fb73992.jpg",
          sameAs: [
            "https://www.linkedin.com/in/edgarnavarrosoto/",
            "https://www.instagram.com/monza.lab/",
          ],
          knowsAbout: [
            "Artificial Intelligence",
            "AI Adoption Strategy",
            "Company Building",
            "Innovation",
            "Luxury Branding",
            "Go-to-Market Strategy",
          ],
          hasOccupation: [
            { "@type": "Occupation", name: "Keynote Speaker", occupationalCategory: "Public Speaking" },
            { "@type": "Occupation", name: "AI Specialist", occupationalCategory: "Artificial Intelligence" },
            { "@type": "Occupation", name: "Company Builder", occupationalCategory: "Entrepreneurship" },
          ],
        }}
      />

      {/* -- HERO -- full height editorial -- */}
      <section className="relative h-[100svh] w-full overflow-hidden">

        {/* Photo with Ken Burns */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${SPEAKER_PHOTOS[0].src})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            filter: "brightness(0.38) saturate(0.80)",
            animation: "kenburns-hero 20s ease-in-out infinite alternate",
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: 0.055,
          }}
        />

        {/* Bottom fade */}
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: `linear-gradient(to top, ${bgFade}f2, ${bgFade}1a, transparent)` }} />

        {/* Eyebrow -- top left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-28 left-6 sm:left-8 lg:left-12 z-10"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#F8B4D9]/40">
            {t.hero.eyebrow}
          </p>
        </motion.div>

        {/* Main headline -- bottom left */}
        <div className="absolute bottom-16 md:bottom-20 left-6 sm:left-8 lg:left-12 z-10 max-w-[900px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
            className="font-clash leading-[1.0] tracking-[-0.025em] mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)", color: textPrimary }}
          >
            {t.hero.headline1}<br />
            <span className="text-[#F8B4D9]">{t.hero.headlineAccent}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            className="flex items-center gap-8"
          >
            <CTAButton
              href="https://wa.me/573208496241?text=Hola%20Edgar%2C%20me%20interesa%20tenerte%20como%20speaker%20en%20mi%20evento."
              size="md"
            >
              {t.hero.cta}
            </CTAButton>
            <a href="#quien" className="text-[10px] uppercase tracking-[0.3em] transition-colors" style={{ color: textMuted(0.30) }}
              onMouseEnter={e => e.currentTarget.style.color = textMuted(0.60)}
              onMouseLeave={e => e.currentTarget.style.color = textMuted(0.30)}>
              {t.hero.readMore}
            </a>
          </motion.div>
        </div>

        <style>{`
          @keyframes kenburns-hero {
            from { transform: scale(1.0); }
            to   { transform: scale(1.07) translateY(-6px); }
          }
        `}</style>
      </section>

      {/* -- NUMEROS -- strip -- */}
      <section className="py-14 md:py-16" style={{ borderBottom: `1px solid ${borderColor(0.05)}` }}>
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.numbers.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                className="text-center md:text-left"
              >
                <p className="font-clash text-4xl md:text-5xl text-[#F8B4D9] mb-2 leading-none">{s.n}</p>
                <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: textMuted(0.30) }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -- QUIEN ES -- editorial split -- */}
      <section id="quien" className="py-32 md:py-44 relative">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_400px] gap-20 lg:gap-28 items-center">

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#F8B4D9]/40 mb-10">{t.who.eyebrow}</p>
              <h2
                className="font-clash leading-[1.08] tracking-[-0.02em] mb-10"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", color: textPrimary }}
              >
                {t.who.headline1}<br />
                {t.who.headline2}<br />
                <span className="text-[#F8B4D9]">{t.who.headlineAccent1}<br />{t.who.headlineAccent2}</span>
              </h2>
              {/* Credencial pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {["Big Four backup", "Startup velocity", "Global aesthetics"].map((tag) => (
                  <span key={tag} className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-[#F8B4D9]/20 text-[#F8B4D9]/80">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-lg leading-[1.85] max-w-[500px] mb-14" style={{ color: textMuted(0.45) }}>
                {t.who.bio}
              </p>

              {/* Ventures list */}
              <div className="space-y-0" style={{ borderTop: `1px solid ${borderColor(0.06)}` }}>
                {t.ventures.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                    className="flex items-center justify-between py-4 group"
                    style={{ borderBottom: `1px solid ${borderColor(0.06)}` }}
                  >
                    {v.href ? (
                      <a href={v.href} target="_blank" rel="noopener noreferrer"
                        className="font-clash text-sm md:text-base group-hover:text-[#F8B4D9] transition-colors underline-offset-4 hover:underline"
                        style={{ color: textMuted(0.80) }}>
                        {v.name}
                      </a>
                    ) : (
                      <span className="font-clash text-sm md:text-base transition-colors" style={{ color: textMuted(0.80) }}>{v.name}</span>
                    )}
                    <span className="text-[10px] uppercase tracking-[0.18em] group-hover:text-[#F8B4D9]/50 transition-colors text-right" style={{ color: textMuted(0.25) }}>{v.desc}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden"
              style={{ border: `1px solid ${borderColor(0.06)}` }}
            >
              <img
                src={edgarEditorial}
                alt="Edgar Navarro"
                className="w-full h-full object-cover object-top"
                style={{ filter: "saturate(0.85)" }}
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bgFade}80, transparent)` }} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* -- STATEMENT -- full width -- */}
      <section className="py-24 md:py-32" style={{ borderTop: `1px solid ${borderColor(0.05)}`, borderBottom: `1px solid ${borderColor(0.05)}` }}>
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-clash leading-[1.15] tracking-[-0.015em] max-w-4xl"
            style={{ fontSize: "clamp(1.6rem, 3.8vw, 3.2rem)", color: textMuted(0.70) }}
          >
            {t.statement.part1}
            <span className="text-[#F8B4D9]">{t.statement.accent}</span>
            {t.statement.part2}
          </motion.blockquote>
        </div>
      </section>

      {/* -- GALERIA -- film strip -- */}
      <section className="py-0 overflow-hidden">
        <div
          className="flex gap-3 overflow-x-auto scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SPEAKER_PHOTOS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="relative flex-shrink-0 overflow-hidden group"
              style={{
                width: p.aspect === "portrait" ? "280px" : "440px",
                height: "360px",
              }}
            >
              <img
                src={p.src}
                alt={p.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "brightness(0.80) saturate(0.85)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.3em] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {p.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* -- TEMAS -- minimal list -- */}
      <section className="py-32 md:py-44 relative">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-20"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#F8B4D9]/40 mb-5">{t.themes.eyebrow}</p>
            <h2
              className="font-clash leading-[1.08] tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: textPrimary }}
            >
              {t.themes.headline1}<br />
              <span style={{ color: textMuted(0.35) }}>{t.themes.headline2}</span>
            </h2>
            <p className="text-base leading-[1.8] max-w-[600px]" style={{ color: textMuted(0.35) }}>
              {t.themes.description}
            </p>
          </motion.div>

          {/* Lentes / angulos -- grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {t.themes.cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="group rounded-xl p-7 md:p-8 cursor-default transition-all duration-500"
                style={{
                  background: isModena ? "rgba(11,11,16,0.03)" : "rgba(255,252,247,0.02)",
                  border: `1px solid ${borderColor(0.06)}`,
                }}
              >
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#F8B4D9]/50 group-hover:text-[#F8B4D9]/80 transition-colors">{card.lente}</span>
                <h3
                  className="font-clash leading-[1.15] tracking-[-0.01em] mt-4 mb-4 transition-colors"
                  style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)", color: textMuted(0.85) }}
                >
                  {card.titulo}
                </h3>
                <p className="text-sm leading-[1.75] mb-5" style={{ color: textMuted(0.30) }}>
                  {card.sub}
                </p>
                <span className="text-[9px] uppercase tracking-[0.2em]" style={{ color: textMuted(0.20) }}>{card.para}</span>
              </motion.div>
            ))}
          </div>

          {/* Nota de cierre */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-start gap-4 rounded-lg p-6"
            style={{ background: isModena ? "rgba(248,180,217,0.06)" : "rgba(248,180,217,0.04)", border: `1px solid rgba(248,180,217,0.10)` }}
          >
            <span className="text-[#F8B4D9]/60 text-lg mt-0.5">{"\u2726"}</span>
            <div>
              <p className="text-sm leading-[1.75]" style={{ color: textMuted(0.50) }}>
                {t.themes.note}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* -- CTA FINAL -- */}
      <section className="py-32 md:py-44 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 90% 80% at 50% 100%, rgba(248,180,217,0.09) 0%, transparent 65%)" }}
        />
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <h2
              className="font-clash leading-[1.0] tracking-[-0.025em] mb-12"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: textPrimary }}
            >
              {t.cta.headline1}<br />
              <span className="text-[#F8B4D9]">{t.cta.headlineAccent}</span>
            </h2>
            <CTAButton
              href="https://wa.me/573208496241?text=Hola%20Edgar%2C%20me%20interesa%20tenerte%20como%20speaker%20en%20mi%20evento."
              size="lg"
            >
              {t.cta.button}
            </CTAButton>
            <p className="text-xs mt-8 tracking-[0.15em]" style={{ color: textMuted(0.18) }}>
              edgar@monzalab.com
            </p>
          </motion.div>
        </div>
      </section>

      <FooterMinimal />
    </PremiumBackground>
  );
};

export default Speaker;
