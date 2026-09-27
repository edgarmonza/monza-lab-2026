import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { getPillarBySlug } from "@/data/pillars";
import type { Lang } from "@/i18n/types";
import PremiumBackground from "@/components/layout/PremiumBackground";
import FooterMinimal from "@/components/FooterMinimal";
import SEO from "@/components/SEO";
import RadiografiaForm from "@/components/shopify/RadiografiaForm";
import PantallaQueEscribe from "@/components/shopify/pantalla/PantallaQueEscribe";
import Ecosistema from "@/components/shopify/ecosistema/Ecosistema";
import AsesorWhatsApp from "@/components/shopify/asesor/AsesorWhatsApp";
import EstelaContenido from "@/components/shopify/estela/EstelaContenido";
import { whatsAppUrl } from "@/lib/pixel";

const EASE = [0.16, 1, 0.3, 1] as const;
const PINK = "#F8B4D9";

type L = Record<Lang, string>;

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className={`relative py-16 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
};

/* ─────────────────────────── copy ─────────────────────────── */

const HERO_EYEBROW: L = {
  es: "SHOPIFY · MODA Y BEAUTY",
  en: "SHOPIFY · FASHION & BEAUTY",
  de: "SHOPIFY · MODE & BEAUTY",
  pt: "SHOPIFY · MODA E BEAUTY",
};
const HERO_H1: L = {
  es: "El problema casi nunca es el producto. Es la tienda que lo frena.",
  en: "The problem is almost never the product. It's the store slowing it down.",
  de: "Das Problem ist fast nie das Produkt. Es ist der Store, der es bremst.",
  pt: "O problema quase nunca é o produto. É a loja que o trava.",
};
const HERO_SUB: L = {
  es: "Conectamos tu tienda, tu pauta, tus clientas y tu WhatsApp en un solo sistema. Vendes más y lo operas más barato y con más eficiencia que con una agencia tradicional.",
  en: "We connect your store, your ads, your customers and your WhatsApp into one system. You sell more, and it costs less and runs more efficiently than a traditional agency.",
  de: "Wir verbinden deinen Store, deine Ads, deine Kundinnen und dein WhatsApp zu einem System. Du verkaufst mehr und betreibst es günstiger und effizienter als mit einer klassischen Agentur.",
  pt: "Ligamos a tua loja, os teus anúncios, as tuas clientes e o teu WhatsApp num só sistema. Vendes mais e operas mais barato e com mais eficiência do que com uma agência tradicional.",
};
const CTA_PRIMARY: L = {
  es: "Ver mi tienda por dentro",
  en: "See inside my store",
  de: "In meinen Store schauen",
  pt: "Ver a minha loja por dentro",
};
const CTA_WA: L = { es: "WhatsApp directo", en: "Direct WhatsApp", de: "Direkt per WhatsApp", pt: "WhatsApp direto" };
const WA_MSG: L = {
  es: "Hola Edgar, vengo de monzalab.com y quiero hablar de mi tienda Shopify.",
  en: "Hi Edgar, coming from monzalab.com — I'd like to talk about my Shopify store.",
  de: "Hallo Edgar, ich komme von monzalab.com und möchte über meinen Shopify-Store sprechen.",
  pt: "Olá Edgar, venho do monzalab.com e quero falar da minha loja Shopify.",
};

const PROOF_EYEBROW: L = { es: "CASO REAL", en: "REAL CASE", de: "ECHTER CASE", pt: "CASO REAL" };
const PROOF_H2: L = {
  es: "Esto lo construimos nosotros. Está vendiendo hoy.",
  en: "We built this. It's selling today.",
  de: "Das haben wir gebaut. Es verkauft heute.",
  pt: "Isto construímos nós. Está a vender hoje.",
};
const PROOF_BODY: L = {
  es: "Eleonora Morales, moda circular y lujo pre-owned. Tienda, catálogo, clientas y WhatsApp conectados en una sola operación: la asesora contesta a cualquier hora, cada pieza nueva sale publicada sin esperar una sesión de fotos y el equipo sabe qué se vende.",
  en: "Eleonora Morales, circular fashion and pre-owned luxury. Store, catalog, customers and WhatsApp connected into one operation: the advisor answers at any hour, every new piece goes live without waiting for a shoot, and the team knows what's selling.",
  de: "Eleonora Morales, zirkuläre Mode und Pre-owned-Luxus. Store, Katalog, Kundinnen und WhatsApp in einem Betrieb verbunden: Die Beraterin antwortet zu jeder Uhrzeit, jedes neue Teil geht ohne Shooting online, und das Team weiß, was sich verkauft.",
  pt: "Eleonora Morales, moda circular e luxo pre-owned. Loja, catálogo, clientes e WhatsApp ligados numa só operação: a assessora responde a qualquer hora, cada peça nova é publicada sem esperar por uma sessão de fotos e a equipa sabe o que se vende.",
};
const PROOF_STATS: { n: L; l: L }[] = [
  {
    n: { es: "24/7", en: "24/7", de: "24/7", pt: "24/7" },
    l: {
      es: "alguien contesta en WhatsApp, también de madrugada",
      en: "someone answers on WhatsApp, even at dawn",
      de: "jemand antwortet auf WhatsApp, auch mitten in der Nacht",
      pt: "alguém responde no WhatsApp, até de madrugada",
    },
  },
  {
    n: { es: "4–5", en: "4–5", de: "4–5", pt: "4–5" },
    l: {
      es: "personas: el trabajo que hacía un equipo así, hoy lo hacen los agentes, y con más eficiencia",
      en: "people: the work a team like that used to do, the agents now do, and more efficiently",
      de: "Personen: Die Arbeit, die so ein Team gemacht hat, erledigen heute die Agenten, und effizienter",
      pt: "pessoas: o trabalho que fazia uma equipa assim, hoje fazem-no os agentes, e com mais eficiência",
    },
  },
  {
    n: { es: "1", en: "1", de: "1", pt: "1" },
    l: {
      es: "equipo responde por toda la operación",
      en: "team answers for the whole operation",
      de: "Team steht für den ganzen Betrieb gerade",
      pt: "equipa responde por toda a operação",
    },
  },
];
// Segunda marca de la vertical. El contrato con soloio (cláusula 8.5, «Referencia
// comercial», firmado el 8-sep-2026) autoriza a mencionar la relación y a mostrar
// los desarrollos entregados. NO autoriza cifras, bases de datos ni información de
// sus clientes, y sus fotos de producto no entran a portafolio sin permiso escrito
// previo. Ese permiso llegó el 26-sep-2026 (la web nueva en la pantalla del hero; la
// campaña, en la estela de contenido); los números siguen fuera: aquí va una línea y no un caso.
const ALSO_EYEBROW: L = { es: "EN CONSTRUCCIÓN AHORA", en: "IN THE WORKS NOW", de: "GERADE IM AUFBAU", pt: "EM CONSTRUÇÃO AGORA" };
const ALSO_BODY: L = {
  es: "soloio. Lino estampado, cuatro tiendas propias y tienda en línea. Estamos montando su operación digital completa.",
  en: "soloio. Printed linen, four stores of its own and an online shop. We are building its full digital operation.",
  de: "soloio. Bedrucktes Leinen, vier eigene Läden und ein Onlineshop. Wir bauen den gesamten digitalen Betrieb auf.",
  pt: "soloio. Linho estampado, quatro lojas próprias e loja online. Estamos a montar toda a sua operação digital.",
};
const PROOF_LINK: L = { es: "Ver el caso completo", en: "See the full case", de: "Ganzen Case ansehen", pt: "Ver o caso completo" };
const SHOT_DESKTOP_ALT: L = {
  es: "Portada de la tienda Eleonora Morales en escritorio",
  en: "Eleonora Morales storefront home on desktop",
  de: "Startseite des Eleonora-Morales-Stores auf dem Desktop",
  pt: "Página inicial da loja Eleonora Morales em desktop",
};
const SHOT_MOBILE_ALT: L = {
  es: "Catálogo de la tienda Eleonora Morales en móvil",
  en: "Eleonora Morales store catalog on mobile",
  de: "Katalog des Eleonora-Morales-Stores auf dem Handy",
  pt: "Catálogo da loja Eleonora Morales em telemóvel",
};

const AGENTS_H2: L = {
  es: "Cuatro turnos cubiertos. Un solo responsable.",
  en: "Four shifts covered. One person accountable.",
  de: "Vier Schichten abgedeckt. Ein Verantwortlicher.",
  pt: "Quatro turnos cobertos. Um só responsável.",
};
const AGENTS_SUB: L = {
  es: "Una tienda necesita a alguien contestando, alguien en las redes, alguien corriendo la pauta y alguien mirando qué es rentable. Contratados por separado son cuatro personas o cuatro proveedores. Conectados en un sistema, los cuatro turnos quedan cubiertos por menos, y un solo equipo responde por el conjunto.",
  en: "A store needs someone answering, someone on social, someone running the ads and someone watching what's profitable. Hired separately, that's four people or four vendors. Connected in one system, all four shifts are covered for less, and one team answers for the whole.",
  de: "Ein Store braucht jemanden, der antwortet, jemanden für Social, jemanden für die Ads und jemanden, der im Blick hat, was sich rechnet. Einzeln eingekauft sind das vier Leute oder vier Dienstleister. In einem System verbunden sind alle vier Schichten günstiger abgedeckt, und ein Team steht für das Ganze gerade.",
  pt: "Uma loja precisa de alguém a responder, alguém nas redes, alguém a correr os anúncios e alguém a ver o que é rentável. Contratados à parte, são quatro pessoas ou quatro fornecedores. Ligados num sistema, os quatro turnos ficam cobertos por menos, e uma só equipa responde pelo conjunto.",
};
/* Los turnos — se cuentan las sillas que quedan cubiertas, no los agentes. */
const AGENTS: { t: L; b: L; tag?: L }[] = [
  {
    t: { es: "Quien contesta", en: "Who answers", de: "Wer antwortet", pt: "Quem responde" },
    b: {
      es: "Ninguna venta se enfría esperando. Asesora, resuelve la talla, arma el carrito y cierra por WhatsApp con la voz de tu marca, a cualquier hora. Después de la compra sigue: pedido, envío, cambios y reseña.",
      en: "No sale goes cold while someone waits. It advises, sorts out the size, builds the cart and closes on WhatsApp in your brand's voice, at any hour. After the purchase it keeps going: order, shipping, exchanges and the review.",
      de: "Kein Verkauf kühlt beim Warten ab. Berät, klärt die Größe, baut den Warenkorb und schließt per WhatsApp in der Stimme deiner Marke ab, zu jeder Uhrzeit. Nach dem Kauf geht es weiter: Bestellung, Versand, Umtausch und Bewertung.",
      pt: "Nenhuma venda arrefece à espera. Aconselha, resolve o tamanho, monta o carrinho e fecha por WhatsApp com a voz da tua marca, a qualquer hora. Depois da compra continua: encomenda, envio, trocas e avaliação.",
    },
    tag: { es: "YA FUNCIONA", en: "ALREADY LIVE", de: "LÄUFT BEREITS", pt: "JÁ FUNCIONA" },
  },
  {
    t: { es: "Quien atiende las redes", en: "Who tends social", de: "Wer die Social-Kanäle betreut", pt: "Quem cuida das redes" },
    b: {
      es: "El interés de un post no se pierde. Cada comentario tiene respuesta y la conversación pasa al mensaje directo cuando toca. Lo probamos primero en nuestra propia marca.",
      en: "The interest a post creates never slips away. Every comment gets an answer and the conversation moves to DMs when it's time. We run it on our own brand first.",
      de: "Das Interesse an einem Post geht nicht verloren. Jeder Kommentar bekommt eine Antwort, und das Gespräch wandert in die DMs, wenn es so weit ist. Wir testen es zuerst an unserer eigenen Marke.",
      pt: "O interesse de um post não se perde. Cada comentário tem resposta e a conversa passa para a mensagem direta quando é altura. Testamos primeiro na nossa própria marca.",
    },
  },
  {
    t: { es: "Quien corre la pauta", en: "Who runs the ads", de: "Wer die Ads fährt", pt: "Quem corre os anúncios" },
    b: {
      es: "El presupuesto de pauta va a lo que vende. Se revisa todos los días con las ventas reales y el margen al lado, no con los likes, y la decisión final la toma Edgar.",
      en: "Your ad budget goes to what sells. It's reviewed every day against real sales with the margin beside it, not likes, and Edgar makes the final call.",
      de: "Dein Werbebudget fließt in das, was verkauft. Es wird täglich mit echten Verkäufen und der Marge daneben geprüft, nicht mit Likes, und die letzte Entscheidung trifft Edgar.",
      pt: "O orçamento dos anúncios vai para o que vende. É revisto todos os dias com as vendas reais e a margem ao lado, não com os likes, e a decisão final é do Edgar.",
    },
  },
  {
    t: { es: "Quien mira los números", en: "Who watches the numbers", de: "Wer auf die Zahlen schaut", pt: "Quem olha para os números" },
    b: {
      es: "Sabes qué es rentable antes de fin de mes: margen real, qué se agota, qué cliente se enfría y cuánto vale con el tiempo. Es el tablero, y lo abres tú.",
      en: "You know what's profitable before month-end: real margin, what's running out, which customers are going cold and what they're worth over time. It's the dashboard, and you open it.",
      de: "Du weißt vor Monatsende, was sich rechnet: echte Marge, was ausgeht, welche Kunden abkühlen und was sie über die Zeit wert sind. Das ist das Dashboard, und du öffnest es.",
      pt: "Sabes o que é rentável antes do fim do mês: margem real, o que se esgota, que clientes estão a arrefecer e quanto valem com o tempo. É o painel, e abres tu.",
    },
    tag: { es: "EL TABLERO", en: "THE DASHBOARD", de: "DAS DASHBOARD", pt: "O PAINEL" },
  },
];
const CLOSING_H2: L = {
  es: "Empieza por ver tu tienda como la ve tu clienta.",
  en: "Start by seeing your store the way your customer sees it.",
  de: "Fang damit an, deinen Store so zu sehen, wie deine Kundin ihn sieht.",
  pt: "Começa por ver a tua loja como a tua cliente a vê.",
};

/* ─────────────────────────── página ─────────────────────────── */

const ShopifyVertical = () => {
  const { language } = useLanguage();
  const lang = (language as Lang) || "es";
  const langPrefix = lang === "es" ? "" : `/${lang}`;
  const p = getPillarBySlug("shopify")!;

  // Mismo contrato de schema que la página pilar: no se pierde el SEO ya indexado.
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.h1[lang],
    description: p.seoDescription[lang],
    provider: { "@type": "Organization", name: "Monza Lab", url: "https://monzalab.com" },
    areaServed: ["Latin America", "Colombia", "Spain", "Europe", "United States"],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map((f) => ({
      "@type": "Question",
      name: f.q[lang],
      acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
    })),
  };

  const scrollToForm = () => {
    document.getElementById("radiografia")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PremiumBackground>
      <SEO path="/shopify" title={p.seoTitle} description={p.seoDescription} jsonLd={[serviceLd, faqLd]} />
      <main id="main" className="pt-32 md:pt-40">
        {/* Hero — en el celular: título, pantalla, párrafo y botón; desde xl, el texto a la
            izquierda y la pantalla a la derecha. Un solo DOM con áreas de grilla. */}
        <section className="mx-auto max-w-[1200px] px-6 md:px-10 pb-2 md:pb-6">
          <div className="grid [grid-template-areas:'texto'_'pantalla'_'accion'] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] xl:[grid-template-areas:'texto_pantalla'_'accion_pantalla'] xl:gap-x-14 xl:items-center">
            <motion.div
              className="[grid-area:texto] xl:self-end"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-5" style={{ color: `${PINK}c0` }}>
                {HERO_EYEBROW[lang]}
              </p>
              <h1
                className="font-clash font-bold leading-[1.04] mb-8 xl:mb-6 max-w-[16ch] [text-wrap:balance] text-[length:clamp(34px,6.2vw,74px)] xl:text-[length:clamp(40px,3.8vw,58px)]"
                style={{ letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.94)" }}
              >
                {HERO_H1[lang]}
              </h1>
            </motion.div>
            <motion.div
              className="[grid-area:pantalla] w-full max-w-[760px] mb-10 xl:mb-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
            >
              <PantallaQueEscribe lang={lang} onPedir={scrollToForm} />
            </motion.div>
            <motion.div
              className="[grid-area:accion] xl:self-start"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            >
              <p className="font-clash text-base md:text-xl xl:text-lg max-w-2xl leading-relaxed mb-10" style={{ color: "rgba(var(--text-rgb), 0.6)" }}>
                {HERO_SUB[lang]}
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-x-6">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="font-clash text-[12px] tracking-[0.2em] uppercase font-semibold rounded-full px-8 py-4 transition-all duration-300 hover:scale-[1.03] w-full sm:w-auto"
                  style={{ background: PINK, color: "#0B0B10", boxShadow: `0 0 40px ${PINK}30` }}
                >
                  {CTA_PRIMARY[lang]} →
                </button>
                <a
                  href={whatsAppUrl(WA_MSG[lang])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-clash text-[12px] tracking-[0.2em] uppercase font-medium inline-flex items-center justify-center sm:justify-start min-h-[44px] px-2 -mx-2"
                  style={{ color: "rgba(var(--text-rgb), 0.55)" }}
                >
                  {CTA_WA[lang]}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* El ecosistema: la tienda en el centro y lo que gana con cada pieza */}
        <Ecosistema lang={lang} />

        {/* El asesor en WhatsApp: el video */}
        <AsesorWhatsApp lang={lang} />

        {/* Contenido: la estela, a todo el ancho (el efecto de la web de Eleonora) */}
        <EstelaContenido lang={lang} />

        {/* Prueba — capturas de una tienda real */}
        <Section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <p className="font-clash text-[10px] tracking-[0.35em] uppercase font-medium mb-4" style={{ color: `${PINK}c0` }}>
              {PROOF_EYEBROW[lang]}
            </p>
            <h2
              className="font-clash font-bold mb-5 max-w-[20ch]"
              style={{ fontSize: "clamp(26px, 4.2vw, 46px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "rgba(var(--text-rgb), 0.93)" }}
            >
              {PROOF_H2[lang]}
            </h2>
            <p className="font-clash text-[15px] md:text-lg max-w-2xl leading-relaxed mb-10 md:mb-14" style={{ color: "rgba(var(--text-rgb), 0.55)" }}>
              {PROOF_BODY[lang]}
            </p>

            {/* Capturas: en móvil manda la captura móvil; el desktop se apila debajo. */}
            {/* La captura móvil es ~3x más alta que la de escritorio. Se limita su ancho
                en lg para que su altura natural quede cerca de la otra, y se centran:
                sin eso queda un hueco muerto debajo de la de escritorio. */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.75fr_1fr] gap-5 md:gap-7 items-start lg:items-center">
              <div
                className="order-2 lg:order-1 rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(var(--text-rgb), 0.08)", boxShadow: "0 24px 48px -12px rgba(0,0,0,0.5)" }}
              >
                <img
                  src="/images/shopify/vitrina-desktop.webp"
                  alt={SHOT_DESKTOP_ALT[lang]}
                  loading="lazy"
                  width={1400}
                  height={972}
                  className="w-full h-auto block"
                />
              </div>
              <div
                className="order-1 lg:order-2 rounded-2xl overflow-hidden mx-auto w-full max-w-[300px] lg:max-w-[252px]"
                style={{ border: "1px solid rgba(var(--text-rgb), 0.08)", boxShadow: "0 24px 48px -12px rgba(0,0,0,0.5)" }}
              >
                <img
                  src="/images/shopify/catalogo-movil.webp"
                  alt={SHOT_MOBILE_ALT[lang]}
                  loading="lazy"
                  width={390}
                  height={844}
                  className="w-full h-auto block"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8 mt-10 md:mt-14">
              {PROOF_STATS.map((s, i) => (
                <div key={i} className="pt-5" style={{ borderTop: `1px solid ${PINK}33` }}>
                  <p className="font-clash font-bold mb-1.5" style={{ fontSize: "clamp(30px, 3.4vw, 44px)", letterSpacing: "-0.02em", color: PINK }}>
                    {s.n[lang]}
                  </p>
                  <p className="font-clash text-[13px] md:text-sm leading-snug" style={{ color: "rgba(var(--text-rgb), 0.5)" }}>
                    {s.l[lang]}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to={`${langPrefix}/work/eleonora-morales`}
              className="font-clash text-[11px] tracking-[0.25em] uppercase font-semibold inline-flex items-center min-h-[44px] mt-6 transition-transform duration-300 hover:translate-x-1"
              style={{ color: PINK }}
            >
              {PROOF_LINK[lang]} →
            </Link>

            <div className="mt-10 md:mt-14 pt-6" style={{ borderTop: "1px solid rgba(var(--text-rgb), 0.08)" }}>
              <p className="font-clash text-[10px] tracking-[0.35em] uppercase font-medium mb-3" style={{ color: `${PINK}c0` }}>
                {ALSO_EYEBROW[lang]}
              </p>
              <p className="font-clash text-[15px] md:text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(var(--text-rgb), 0.55)" }}>
                {ALSO_BODY[lang]}
              </p>
            </div>
          </div>
        </Section>

        {/* Los cuatro turnos */}
        <Section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <h2
              className="font-clash font-bold mb-4"
              style={{ fontSize: "clamp(26px, 4.2vw, 46px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.93)" }}
            >
              {AGENTS_H2[lang]}
            </h2>
            <p className="font-clash text-[15px] md:text-lg max-w-2xl leading-relaxed mb-10 md:mb-14" style={{ color: "rgba(var(--text-rgb), 0.55)" }}>
              {AGENTS_SUB[lang]}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AGENTS.map((a, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 md:p-7 flex flex-col"
                  style={{
                    border: a.tag ? `1px solid ${PINK}33` : "1px solid rgba(var(--text-rgb), 0.08)",
                    background: a.tag ? `${PINK}06` : "rgba(var(--text-rgb), 0.02)",
                  }}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-4">
                    <span className="font-mono text-[10px] tracking-[0.25em]" style={{ color: `${PINK}b0` }}>
                      0{i + 1}
                    </span>
                    {a.tag && (
                      <span className="font-clash text-[9px] tracking-[0.2em] uppercase font-semibold text-right" style={{ color: PINK }}>
                        {a.tag[lang]}
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-clash font-semibold text-lg md:text-xl mb-3"
                    style={{ letterSpacing: "-0.015em", color: "rgba(var(--text-rgb), 0.9)" }}
                  >
                    {a.t[lang]}
                  </h3>
                  <p className="font-clash text-[13px] md:text-sm leading-relaxed" style={{ color: "rgba(var(--text-rgb), 0.5)" }}>
                    {a.b[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Lead magnet */}
        <Section>
          <div className="mx-auto max-w-[1100px] px-6 md:px-10">
            <RadiografiaForm />
          </div>
        </Section>

        {/* FAQ — visible, indexable */}
        <Section>
          <div className="mx-auto max-w-[900px] px-6 md:px-10">
            <h2
              className="font-clash font-bold mb-10 md:mb-14"
              style={{ fontSize: "clamp(24px, 3.6vw, 40px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}
            >
              {p.faqHeading[lang]}
            </h2>
            <div>
              {p.faq.map((f, i) => (
                <div key={i} className="py-7 md:py-8" style={{ borderTop: "1px solid rgba(var(--text-rgb), 0.08)" }}>
                  <h3
                    className="font-clash font-semibold text-lg md:text-xl mb-3"
                    style={{ letterSpacing: "-0.015em", color: "rgba(var(--text-rgb), 0.9)" }}
                  >
                    {f.q[lang]}
                  </h3>
                  <p className="font-clash text-sm md:text-base leading-relaxed" style={{ color: "rgba(var(--text-rgb), 0.55)" }}>
                    {f.a[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Cierre */}
        <Section className="pb-28 md:pb-36">
          <div className="mx-auto max-w-[900px] px-6 md:px-10 text-center">
            <h2
              className="font-clash font-bold leading-[1.05] mb-9"
              style={{ fontSize: "clamp(28px, 5vw, 54px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}
            >
              {CLOSING_H2[lang]}
            </h2>
            <button
              type="button"
              onClick={scrollToForm}
              className="font-clash text-[12px] tracking-[0.2em] uppercase font-semibold rounded-full px-8 py-4 transition-all duration-300 hover:scale-[1.03]"
              style={{ background: PINK, color: "#0B0B10", boxShadow: `0 0 40px ${PINK}30` }}
            >
              {CTA_PRIMARY[lang]} →
            </button>
          </div>
        </Section>
      </main>
      <FooterMinimal />
    </PremiumBackground>
  );
};

export default ShopifyVertical;
