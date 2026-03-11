import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FooterMinimal from "@/components/FooterMinimal";
import PremiumBackground from "@/components/layout/PremiumBackground";
import { useTheme } from "@/theme/ThemeContext";
import edgarEditorial from "@/assets/edgar-editorial-pink.png";

const SPEAKER_PHOTOS = [
  { src: "/images/Speaker/8565b51b-2338-4737-958b-042761b06ceb.jpg", aspect: "landscape", label: "KPMG · Bogotá" },
  { src: "/images/Speaker/15474a8a-40f8-4533-b39d-20a91fb73992.jpg", aspect: "portrait",  label: "Keynote · En escenario" },
  { src: "/images/Speaker/772cff2c-09c9-454b-8870-aae7ff4dab43.jpg", aspect: "landscape", label: "Sala llena · IA en vivo" },
  { src: "/images/Speaker/816b944b-0546-4c9b-aef5-6554e532cf52.jpg", aspect: "portrait",  label: "Panel · Director Innovación" },
  { src: "/images/Speaker/448c3893-58da-466f-8e0c-5022330ff37c.jpg", aspect: "landscape", label: "University Demo Day" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const Speaker = () => {
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();
  const isModena = theme === "modena";

  // Theme-aware colors
  const textPrimary = isModena ? "#0B0B10" : "#FFFCF7";
  const textMuted = (opacity: number) => isModena ? `rgba(11,11,16,${opacity})` : `rgba(255,252,247,${opacity})`;
  const borderColor = (opacity: number) => isModena ? `rgba(11,11,16,${opacity})` : `rgba(255,255,255,${opacity})`;
  const bgFade = isModena ? "#F5F0EB" : "#0B0B10";

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <PremiumBackground>

      {/* ── HERO — full height editorial ── */}
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

        {/* Eyebrow — top left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-28 left-6 sm:left-8 lg:left-12 z-10"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#F8B4D9]/40">
            Edgar Navarro · Speaker
          </p>
        </motion.div>

        {/* Main headline — bottom left */}
        <div className="absolute bottom-16 md:bottom-20 left-6 sm:left-8 lg:left-12 z-10 max-w-[900px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
            className="font-clash leading-[1.0] tracking-[-0.025em] mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)", color: textPrimary }}
          >
            No habla de IA.<br />
            <span className="text-[#F8B4D9]">La usa.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            className="flex items-center gap-8"
          >
            <a
              href="https://wa.me/573208496241?text=Hola%20Edgar%2C%20me%20interesa%20tenerte%20como%20speaker%20en%20mi%20evento."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase bg-[#F8B4D9] text-[#0b0b10] hover:bg-[#f4cbde] shadow-[0_6px_24px_-6px_rgba(248,180,217,0.4)] hover:shadow-[0_10px_36px_-6px_rgba(248,180,217,0.55)] hover:-translate-y-[1px] transition-all duration-300"
            >
              Trae a Edgar a tu evento
            </a>
            <a href="#quien" className="text-[10px] uppercase tracking-[0.3em] transition-colors" style={{ color: textMuted(0.30) }}
              onMouseEnter={e => e.currentTarget.style.color = textMuted(0.60)}
              onMouseLeave={e => e.currentTarget.style.color = textMuted(0.30)}>
              Leer más ↓
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

      {/* ── NÚMEROS — strip ── */}
      <section className="py-14 md:py-16" style={{ borderBottom: `1px solid ${borderColor(0.05)}` }}>
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: "15+", label: "años construyendo" },
              { n: "6", label: "años en KPMG" },
              { n: "1.200+", label: "en escenario" },
              { n: "2", label: "empresas fundadas" },
            ].map((s, i) => (
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

      {/* ── QUIÉN ES — editorial split ── */}
      <section id="quien" className="py-32 md:py-44 relative">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_400px] gap-20 lg:gap-28 items-center">

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#F8B4D9]/40 mb-10">El speaker</p>
              <h2
                className="font-clash leading-[1.08] tracking-[-0.02em] mb-10"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", color: textPrimary }}
              >
                No viene a hablar<br />
                de lo que estudió.<br />
                <span className="text-[#F8B4D9]">Viene a mostrar<br />lo que hace.</span>
              </h2>
              {/* Credencial pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {["Big Four backup", "Startup velocity", "Global aesthetics"].map((tag) => (
                  <span key={tag} className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-[#F8B4D9]/20 text-[#F8B4D9]/50">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-lg leading-[1.85] max-w-[500px] mb-14" style={{ color: textMuted(0.45) }}>
                Consultor de Big Four. Fundador de múltiples ventures en paralelo. Construye con IA desde el día uno — no como herramienta, sino como sistema operativo. No habla desde la teoría. Habla desde la obra que está corriendo hoy.
              </p>

              {/* Ventures list */}
              <div className="space-y-0" style={{ borderTop: `1px solid ${borderColor(0.06)}` }}>
                {[
                  { name: "Monza Lab",      href: null,                          desc: "AI-native creative studio · Colombia" },
                  { name: "Monza Haus",     href: null,                          desc: "Plataforma · US/UK/EU/Japan" },
                  { name: "Bavarian Econs", href: "https://www.bavarianecons.com/", desc: "Electrificación de BMW clásicos" },
                  { name: "Guardian Speed", href: "https://www.guardianofspeed.de", desc: "Logistics · München" },
                ].map((v, i) => (
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

      {/* ── STATEMENT — full width ── */}
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
            "No da la misma charla dos veces.{" "}
            <span className="text-[#F8B4D9]">Diseña cada conferencia como una experiencia</span>{" "}
            — cruza mundos que nadie más conecta."
          </motion.blockquote>
        </div>
      </section>

      {/* ── GALERÍA — film strip ── */}
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

      {/* ── TEMAS — minimal list ── */}
      <section className="py-32 md:py-44 relative">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-20"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#F8B4D9]/40 mb-5">Cómo funciona</p>
            <h2
              className="font-clash leading-[1.08] tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: textPrimary }}
            >
              Cada escenario es diferente.<br />
              <span style={{ color: textMuted(0.35) }}>Cada conferencia también.</span>
            </h2>
            <p className="text-base leading-[1.8] max-w-[600px]" style={{ color: textMuted(0.35) }}>
              No repito charlas. Diseño cada experiencia según tu público, tu industria y lo que necesitan llevarse. Cruzo mundos que normalmente no se tocan — y desde ahí construyo el ángulo.
            </p>
          </motion.div>

          {/* Lentes / ángulos — grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {[
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
            ].map((t, i) => (
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
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#F8B4D9]/50 group-hover:text-[#F8B4D9]/80 transition-colors">{t.lente}</span>
                <h3
                  className="font-clash leading-[1.15] tracking-[-0.01em] mt-4 mb-4 transition-colors"
                  style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)", color: textMuted(0.85) }}
                >
                  {t.titulo}
                </h3>
                <p className="text-sm leading-[1.75] mb-5" style={{ color: textMuted(0.30) }}>
                  {t.sub}
                </p>
                <span className="text-[9px] uppercase tracking-[0.2em]" style={{ color: textMuted(0.20) }}>{t.para}</span>
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
            <span className="text-[#F8B4D9]/60 text-lg mt-0.5">✦</span>
            <div>
              <p className="text-sm leading-[1.75]" style={{ color: textMuted(0.50) }}>
                Estos son los mundos que cruzo — no temas fijos. Cada conferencia se diseña desde cero para tu audiencia. El formato, el idioma y el ángulo se definen juntos.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
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
              ¿Quieres traer<br />
              <span className="text-[#F8B4D9]">a Monza?</span>
            </h2>
            <a
              href="https://wa.me/573208496241?text=Hola%20Edgar%2C%20me%20interesa%20tenerte%20como%20speaker%20en%20mi%20evento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.2em] bg-[#F8B4D9] text-[#0b0b10] hover:bg-[#f4cbde] shadow-[0_6px_28px_-6px_rgba(248,180,217,0.4)] hover:shadow-[0_14px_44px_-8px_rgba(248,180,217,0.55)] hover:-translate-y-[2px] transition-all duration-300"
            >
              Hablemos por WhatsApp
            </a>
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
