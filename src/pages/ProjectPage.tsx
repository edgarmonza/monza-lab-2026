import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/theme/ThemeContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { PROJECTS } from "@/data/projects";
import type { Project, LangText } from "@/data/projects";
import FooterMinimal from "@/components/FooterMinimal";
import PremiumBackground from "@/components/layout/PremiumBackground";
import SEO from "@/components/SEO";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Lazy Video ── */
const LazyVideo = ({ src, className }: { src: string; className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.play().catch(() => {});
  }, [src]);
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      className={className}
    />
  );
};

/* ── Story text with auto-linked team member names ── */
const renderStoryWithLinks = (
  text: string,
  teamLinks: Array<{ name: string; url: string }> | undefined,
  accentColor: string,
): React.ReactNode => {
  if (!teamLinks || teamLinks.length === 0) return text;

  // Escape regex specials so names with punctuation still match
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(${teamLinks.map((t) => escape(t.name)).join("|")})`, "g");
  const byName = new Map(teamLinks.map((t) => [t.name, t.url]));

  return text.split(pattern).map((chunk, i) => {
    const url = byName.get(chunk);
    if (!url) return <span key={i}>{chunk}</span>;
    return (
      <a
        key={i}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-[6px] decoration-[1.5px] transition-colors duration-300"
        style={{ color: accentColor, textDecorationColor: `${accentColor}55` }}
        onMouseEnter={(e) => (e.currentTarget.style.textDecorationColor = accentColor)}
        onMouseLeave={(e) => (e.currentTarget.style.textDecorationColor = `${accentColor}55`)}
      >
        {chunk}
      </a>
    );
  });
};

/* ── Section wrapper ── */
const Section = ({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className={`relative py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isModena = theme === "modena";
  const [loaded, setLoaded] = useState(false);

  const project = PROJECTS.find((p) => p.slug === slug);
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  useEffect(() => {
    setLoaded(true);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-clash text-lg" style={{ color: "rgba(var(--text-rgb), 0.5)" }}>
          Project not found.
        </p>
      </div>
    );
  }

  const cs = project.caseStudy;
  const accent = project.visual.accent;
  const textMain = "rgba(var(--text-rgb), 0.85)";
  const textMid = "rgba(var(--text-rgb), 0.50)";
  const textDim = "rgba(var(--text-rgb), 0.30)";
  const borderColor = "rgba(var(--text-rgb), 0.06)";

  const t = (obj: LangText) => obj[language];

  const langPrefix = language === "es" ? "" : `/${language}`;

  const seoTitle: { es: string; en: string; de: string } = cs
    ? {
        es: `${project.name} — Caso de estudio · Monza Lab`,
        en: `${project.name} — Case study · Monza Lab`,
        de: `${project.name} — Case Study · Monza Lab`,
      }
    : {
        es: `${project.name} — Monza Lab`,
        en: `${project.name} — Monza Lab`,
        de: `${project.name} — Monza Lab`,
      };

  return (
    <PremiumBackground>
      <SEO
        path={`/work/${project.slug}`}
        image={project.image ?? undefined}
        type="article"
        title={seoTitle}
        description={project.desc}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.name,
          headline: cs ? cs.headline[language] : project.name,
          description: project.desc[language],
          url: `https://monzalab.com${langPrefix}/work/${project.slug}`,
          image: project.image ? `https://monzalab.com${project.image}` : undefined,
          author: {
            "@type": "Organization",
            name: "Monza Lab",
            url: "https://monzalab.com",
          },
          creator: {
            "@type": "Person",
            name: "Edgar Navarro",
            url: "https://monzalab.com/speaker",
          },
          ...(cs && {
            keywords: cs.pillars.map((p) => p.label).join(", "),
          }),
        }}
      />
      {/* ── HERO ── */}
      <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">
        {/* Video / image bg */}
        <div className="absolute inset-0 z-0">
          {project.video ? (
            <LazyVideo
              src={project.video}
              className="w-full h-full object-cover"
            />
          ) : project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : null}
          <div
            className="absolute inset-0"
            style={{
              background: isModena
                ? "linear-gradient(to top, #F5F0EB 0%, rgba(245,240,235,0.7) 30%, rgba(245,240,235,0.2) 60%, transparent 100%)"
                : "linear-gradient(to top, #0B0B10 0%, rgba(11,11,16,0.7) 30%, rgba(11,11,16,0.2) 60%, transparent 100%)",
            }}
          />
        </div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute top-8 left-6 md:left-10 z-20"
        >
          <button
            onClick={() => navigate(langPrefix + "/#work")}
            className="flex items-center gap-2 font-clash text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: textMid }}
            onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = textMid)}
          >
            <span className="text-lg leading-none">←</span>
            {{ es: "Volver", en: "Back", de: "Zurück", pt: "Volver" }[language]}
          </button>
        </motion.div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-16 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          >
            <p
              className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ color: `${accent}90` }}
            >
              {project.visual.number} — {project.tag}
            </p>
            <h1
              className="font-clash text-[12vw] md:text-[8vw] lg:text-[6vw] font-bold leading-[0.95]"
              style={{ color: textMain, letterSpacing: "-0.02em" }}
            >
              {project.name}
            </h1>
            {cs && (
              <p
                className="font-clash text-base md:text-xl mt-4 max-w-2xl leading-relaxed"
                style={{ color: textMid }}
              >
                {t(cs.headline)}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      {cs && (
        <section
          className="py-6 md:py-8 overflow-hidden"
          style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}` }}
        >
          <div className="mx-auto max-w-[1200px] px-6 md:px-16 flex flex-wrap gap-8 md:gap-16">
            {[
              { label: { es: "Rol", en: "Role", de: "Rolle", pt: "Rol" }, value: cs.role },
              { label: { es: "Ubicación", en: "Location", de: "Standort", pt: "Ubicación" }, value: cs.location },
              { label: { es: "Año", en: "Year", de: "Jahr", pt: "Año" }, value: cs.year },
              ...(project.url
                ? [{ label: { es: "Sitio", en: "Site", de: "Seite", pt: "Sitio" }, value: "__link__" }]
                : []),
              ...(project.confidential
                ? [{ label: { es: "Estado", en: "Status", de: "Status", pt: "Estado" }, value: "__nda__" }]
                : []),
            ].map((stat) => (
              <div key={t(stat.label as LangText)}>
                <p className="font-mono text-[8px] md:text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: textDim }}>
                  {t(stat.label as LangText)}
                </p>
                {stat.value === "__link__" ? (
                  <a
                    href={project.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-clash text-xs md:text-sm font-medium transition-colors duration-300"
                    style={{ color: accent }}
                  >
                    {project.url!.replace("https://www.", "")} ↗
                  </a>
                ) : stat.value === "__nda__" ? (
                  <span className="inline-flex items-center gap-2 font-clash text-xs md:text-sm font-medium" style={{ color: accent }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} aria-hidden />
                    {{ es: "En confidencialidad", en: "Under NDA", de: "Unter NDA", pt: "Em confidencialidade" }[language]}
                  </span>
                ) : (
                  <p className="font-clash text-xs md:text-sm font-medium" style={{ color: textMain }}>
                    {stat.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── THE STORY ── */}
      {cs && (
        <Section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              <div>
                <p
                  className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
                  style={{ color: `${accent}70` }}
                >
                  {{ es: "LA HISTORIA", en: "THE STORY", de: "DIE GESCHICHTE", pt: "LA HISTORIA" }[language]}
                </p>
                <p
                  className="font-clash text-lg md:text-xl lg:text-2xl font-semibold leading-[1.4]"
                  style={{ color: textMain }}
                >
                  {renderStoryWithLinks(t(cs.story), cs.teamLinks, accent)}
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <p
                  className="font-clash text-sm md:text-base leading-relaxed"
                  style={{ color: textMid }}
                >
                  {t(project.desc)}
                </p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 font-clash text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300"
                    style={{ color: accent }}
                  >
                    {{ es: "Ver sitio", en: "Visit site", de: "Seite besuchen", pt: "Ver sitio" }[language]} <span>↗</span>
                  </a>
                )}
                {project.confidential && (
                  <span
                    className="mt-6 inline-flex items-center gap-2 font-clash text-[11px] tracking-[0.25em] uppercase font-medium rounded-full px-4 py-2 self-start"
                    style={{ color: accent, border: `1px solid ${accent}55`, background: `${accent}0d` }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: accent }} aria-hidden />
                    {{ es: "Proyecto en confidencialidad", en: "Project under NDA", de: "Projekt unter NDA", pt: "Projeto em confidencialidade" }[language]}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* ── REEL / VIDEO (post-story) ── */}
      {project.video && (
        <Section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-16">
            <p
              className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6 md:mb-8"
              style={{ color: `${accent}70` }}
            >
              {{ es: "EL REEL", en: "THE REEL", de: "DER REEL", pt: "EL REEL" }[language]}
            </p>
            <div
              className="relative w-full rounded-2xl overflow-hidden aspect-video"
              style={{
                border: `1px solid ${accent}33`,
                boxShadow: `0 30px 80px -30px ${accent}40`,
                background: "rgba(0,0,0,0.4)",
              }}
            >
              <LazyVideo
                src={project.video}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Section>
      )}

      {/* ── LAYERS / PILLARS ── */}
      {cs && cs.pillars.length > 0 && (
        <Section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-16">
            <p
              className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-10 md:mb-14"
              style={{ color: `${accent}70` }}
            >
              {{ es: "LO QUE CONSTRUÍ", en: "WHAT I BUILT", de: "WAS ICH GEBAUT HABE", pt: "LO QUE CONSTRUÍ" }[language]}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cs.pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="rounded-xl p-6"
                  style={{
                    background: isModena ? "rgba(11,11,16,0.03)" : "rgba(255,252,247,0.02)",
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <p
                    className="font-clash text-[10px] tracking-[0.3em] uppercase font-bold mb-3"
                    style={{ color: accent }}
                  >
                    {pillar.label}
                  </p>
                  <p className="font-clash text-sm leading-relaxed" style={{ color: textMid }}>
                    {t(pillar.detail)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── GALLERY ── */}
      {project.gallery && project.gallery.length > 0 && (
        <Section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-16">
            <p
              className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-10 md:mb-14"
              style={{ color: `${accent}70` }}
            >
              {{ es: "EL OUTPUT", en: "THE OUTPUT", de: "DAS ERGEBNIS", pt: "EL OUTPUT" }[language]}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {project.gallery.map((img, i) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="relative overflow-hidden rounded-lg aspect-[3/4]"
                  style={{ border: `1px solid ${borderColor}` }}
                >
                  <img
                    src={img}
                    alt={`${project.name} ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── PRESS ── */}
      {cs && cs.press.length > 0 && (
        <Section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-16">
            <p
              className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
              style={{ color: `${accent}70` }}
            >
              PRESS
            </p>
            <div className="flex flex-wrap gap-6">
              {cs.press.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-clash text-sm md:text-base font-medium transition-colors duration-300"
                  style={{ color: textMid }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = textMid)}
                >
                  {p.name} ↗
                </a>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── NEXT PROJECT ── */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ borderTop: `1px solid ${borderColor}` }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-16">
          <p
            className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
            style={{ color: textDim }}
          >
            {{ es: "SIGUIENTE PROYECTO", en: "NEXT PROJECT", de: "NÄCHSTES PROJEKT", pt: "SIGUIENTE PROYECTO" }[language]}
          </p>
          <Link
            to={`${langPrefix}/work/${nextProject.slug}`}
            className="group block"
          >
            <h2
              className="font-clash text-[10vw] md:text-[6vw] lg:text-[4vw] font-bold leading-[1] transition-colors duration-300"
              style={{ color: textMid }}
              onMouseEnter={(e) => (e.currentTarget.style.color = nextProject.visual.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = textMid)}
            >
              {nextProject.name}
            </h2>
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mt-2" style={{ color: textDim }}>
              {nextProject.tag}
            </p>
          </Link>
        </div>
      </section>

      <FooterMinimal />
    </PremiumBackground>
  );
};

export default ProjectPage;
