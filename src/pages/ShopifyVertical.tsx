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
  es: "Construimos tu e-commerce sobre Shopify y le montamos encima el motor de agentes que opera el negocio: vende por WhatsApp, produce tu catálogo, lee tu pauta y calcula tu margen real.",
  en: "We build your e-commerce on Shopify and layer on the agent engine that runs the business: sells over WhatsApp, produces your catalog, reads your ad spend and computes your real margin.",
  de: "Wir bauen deinen E-Commerce auf Shopify und setzen die Agenten-Engine darauf, die das Geschäft betreibt: verkauft per WhatsApp, produziert deinen Katalog, liest deine Ads und berechnet deine echte Marge.",
  pt: "Construímos o teu e-commerce sobre Shopify e montamos por cima o motor de agentes que opera o negócio: vende por WhatsApp, produz o teu catálogo, lê a tua pauta e calcula a tua margem real.",
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
  es: "Eleonora Morales — moda circular y lujo pre-owned. Shopify por debajo, storefront propio por encima, y una pasarela que sí cobra en Colombia, que es donde se cae la mayoría de las tiendas del país.",
  en: "Eleonora Morales — circular fashion and pre-owned luxury. Shopify underneath, a custom storefront on top, and a checkout that actually charges in Colombia, which is where most stores here break.",
  de: "Eleonora Morales — zirkuläre Mode und Pre-owned-Luxus. Shopify darunter, eigener Storefront darüber und ein Checkout, der in Kolumbien wirklich abrechnet — genau daran scheitern dort die meisten Stores.",
  pt: "Eleonora Morales — moda circular e luxo pre-owned. Shopify por baixo, storefront próprio por cima, e uma gateway que cobra mesmo na Colômbia, que é onde a maioria das lojas do país cai.",
};
const PROOF_STATS: { n: L; l: L }[] = [
  {
    n: { es: "143", en: "143", de: "143", pt: "143" },
    l: { es: "piezas vivas en catálogo", en: "live catalog pieces", de: "Artikel im Live-Katalog", pt: "peças vivas em catálogo" },
  },
  {
    n: { es: "100%", en: "100%", de: "100%", pt: "100%" },
    l: { es: "del catálogo fotografiado con IA", en: "of the catalog shot with AI", de: "des Katalogs mit KI fotografiert", pt: "do catálogo fotografado com IA" },
  },
  {
    n: { es: "24/7", en: "24/7", de: "24/7", pt: "24/7" },
    l: { es: "asesora de WhatsApp respondiendo", en: "WhatsApp advisor answering", de: "WhatsApp-Beraterin antwortet", pt: "assessora de WhatsApp a responder" },
  },
];
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

const LAYERS_H2: L = {
  es: "Shopify corre la transacción. Nuestros agentes corren el negocio.",
  en: "Shopify runs the transaction. Our agents run the business.",
  de: "Shopify betreibt die Transaktion. Unsere Agenten betreiben das Geschäft.",
  pt: "A Shopify corre a transação. Os nossos agentes correm o negócio.",
};
const LAYERS: { t: L; b: L; who: L }[] = [
  {
    t: { es: "La transacción", en: "The transaction", de: "Die Transaktion", pt: "A transação" },
    b: {
      es: "Catálogo, carrito, checkout, pagos, inventario, envíos. Es commodity y Shopify lo hace mejor que nadie. No la peleamos: montarle una capa encima para replicar lo que ya hace es trabajo que se paga dos veces y que además se rompe.",
      en: "Catalog, cart, checkout, payments, inventory, shipping. It's commodity and Shopify does it better than anyone. We don't fight it: building a layer on top to replicate what it already does is work you pay for twice — and it breaks.",
      de: "Katalog, Warenkorb, Checkout, Zahlungen, Bestand, Versand. Commodity — und Shopify kann das am besten. Wir kämpfen nicht dagegen: eine Schicht darüber zu bauen, die das Gleiche nachbaut, zahlst du doppelt — und sie geht kaputt.",
      pt: "Catálogo, carrinho, checkout, pagamentos, stock, envios. É commodity e a Shopify fá-lo melhor que ninguém. Não a combatemos: montar uma camada por cima para replicar o que já faz é trabalho pago a dobrar — e que parte.",
    },
    who: { es: "SHOPIFY", en: "SHOPIFY", de: "SHOPIFY", pt: "SHOPIFY" },
  },
  {
    t: { es: "La operación", en: "The operation", de: "Der Betrieb", pt: "A operação" },
    b: {
      es: "Vender, responder, catalogar, fotografiar, pautar, retener, medir margen. Eso nadie lo tiene resuelto y no se copia instalando un tema. Un tema de Shopify se reemplaza en una semana; la operación, no.",
      en: "Selling, answering, cataloging, shooting, running ads, retaining, measuring margin. Nobody has that solved, and you can't copy it by installing a theme. A Shopify theme is replaced in a week; the operation isn't.",
      de: "Verkaufen, antworten, katalogisieren, fotografieren, Ads fahren, binden, Marge messen. Das hat niemand gelöst, und man kopiert es nicht mit einem Theme. Ein Shopify-Theme ersetzt du in einer Woche; den Betrieb nicht.",
      pt: "Vender, responder, catalogar, fotografar, pautar, reter, medir margem. Isso ninguém resolveu e não se copia instalando um tema. Um tema de Shopify substitui-se numa semana; a operação, não.",
    },
    who: { es: "MONZA", en: "MONZA", de: "MONZA", pt: "MONZA" },
  },
];

const AGENTS_H2: L = {
  es: "Siete agentes. Cada uno sirve solo.",
  en: "Seven agents. Each one works on its own.",
  de: "Sieben Agenten. Jeder funktioniert für sich.",
  pt: "Sete agentes. Cada um serve sozinho.",
};
const AGENTS_SUB: L = {
  es: "Empiezas por uno y sumas. No hay que comprar el sistema completo para que algo cambie.",
  en: "Start with one and add. You don't have to buy the whole system for something to change.",
  de: "Fang mit einem an und ergänze. Du musst nicht das ganze System kaufen, damit sich etwas ändert.",
  pt: "Começas por um e somas. Não é preciso comprar o sistema todo para algo mudar.",
};
const AGENTS: { t: L; b: L; tag?: L }[] = [
  {
    t: { es: "Ventas por WhatsApp", en: "WhatsApp sales", de: "WhatsApp-Verkauf", pt: "Vendas por WhatsApp" },
    b: {
      es: "Asesora, resuelve la talla, arma el carrito y cierra. Lee tu catálogo y tu inventario en vivo, así que nunca ofrece lo que no tienes.",
      en: "Advises, resolves sizing, builds the cart and closes. Reads your catalog and inventory live, so it never offers what you don't have.",
      de: "Berät, klärt die Größe, baut den Warenkorb und schließt ab. Liest Katalog und Bestand live — bietet nie an, was du nicht hast.",
      pt: "Aconselha, resolve o tamanho, monta o carrinho e fecha. Lê o teu catálogo e stock em direto, por isso nunca oferece o que não tens.",
    },
    tag: { es: "VIVO EN PRODUCCIÓN", en: "LIVE IN PRODUCTION", de: "LIVE IM EINSATZ", pt: "VIVO EM PRODUÇÃO" },
  },
  {
    t: { es: "Imagen", en: "Imagery", de: "Bild", pt: "Imagem" },
    b: {
      es: "Foto cruda a set editorial completo. Cambiamos la escena — fondo, luz, contexto — nunca el producto: una foto que miente dispara las devoluciones.",
      en: "Raw shot to a full editorial set. We change the scene — background, light, context — never the product: a photo that lies drives returns.",
      de: "Vom Rohfoto zum kompletten Editorial-Set. Wir ändern die Szene — Hintergrund, Licht, Kontext — nie das Produkt: ein Foto, das lügt, treibt Retouren.",
      pt: "Foto crua a set editorial completo. Mudamos a cena — fundo, luz, contexto — nunca o produto: uma foto que mente dispara devoluções.",
    },
  },
  {
    t: { es: "Catálogo", en: "Catalog", de: "Katalog", pt: "Catálogo" },
    b: {
      es: "Del set de fotos a la ficha publicada: título, descripción, tags, variantes y el canal correcto. Es la tarea que más horas se come y la que menos criterio necesita.",
      en: "From photo set to published page: title, description, tags, variants and the right channel. The task that eats the most hours and needs the least judgment.",
      de: "Vom Foto-Set zur veröffentlichten Seite: Titel, Beschreibung, Tags, Varianten und der richtige Kanal. Die Aufgabe, die am meisten Zeit frisst und am wenigsten Urteil braucht.",
      pt: "Do set de fotos à ficha publicada: título, descrição, tags, variantes e o canal certo. A tarefa que mais horas come e menos critério exige.",
    },
  },
  {
    t: { es: "Pauta", en: "Paid media", de: "Ads", pt: "Pauta" },
    b: {
      es: "Lee tus campañas de Meta y dice qué escalar, qué pausar y qué creativo rotar. Con el número de margen al lado, no a ciegas.",
      en: "Reads your Meta campaigns and says what to scale, pause and rotate. With the margin number beside it, not blind.",
      de: "Liest deine Meta-Kampagnen und sagt, was zu skalieren, zu pausieren und zu rotieren ist. Mit der Margenzahl daneben, nicht blind.",
      pt: "Lê as tuas campanhas de Meta e diz o que escalar, pausar e rodar. Com o número da margem ao lado, não às cegas.",
    },
  },
  {
    t: { es: "Retención", en: "Retention", de: "Retention", pt: "Retenção" },
    b: {
      es: "Carrito abandonado, post-compra y reactivación de la base que ya tienes. Casi siempre hay más plata en la lista vieja que en la pauta nueva.",
      en: "Abandoned cart, post-purchase and reactivating the list you already have. There's almost always more money in the old list than in new ads.",
      de: "Abgebrochener Warenkorb, Post-Purchase und Reaktivierung deiner bestehenden Liste. Fast immer steckt mehr Geld in der alten Liste als in neuen Ads.",
      pt: "Carrinho abandonado, pós-compra e reativação da base que já tens. Quase sempre há mais dinheiro na lista antiga do que na pauta nova.",
    },
  },
  {
    t: { es: "Post-venta", en: "Post-purchase", de: "Nachkauf", pt: "Pós-venda" },
    b: {
      es: "Estado del pedido, guía, devoluciones y la reseña. Lo que hoy le come el día a alguien de tu equipo respondiendo lo mismo.",
      en: "Order status, tracking, returns and the review. What currently eats someone's whole day answering the same thing.",
      de: "Bestellstatus, Sendungsverfolgung, Retouren und die Bewertung. Das, was heute jemandem den Tag frisst.",
      pt: "Estado da encomenda, guia, devoluções e a avaliação. O que hoje come o dia a alguém da tua equipa.",
    },
  },
  {
    t: { es: "Margen", en: "Margin", de: "Marge", pt: "Margem" },
    b: {
      es: "Costo por producto, margen real, cuánto te cuesta una clienta y cuánto vale con el tiempo. Es el único que produce el número que los otros seis necesitan.",
      en: "Cost per product, real margin, what a customer costs you and what she's worth over time. The only one producing the number the other six need.",
      de: "Kosten pro Produkt, echte Marge, was eine Kundin kostet und über die Zeit wert ist. Der Einzige, der die Zahl liefert, die die anderen sechs brauchen.",
      pt: "Custo por produto, margem real, quanto te custa uma cliente e quanto vale ao longo do tempo. É o único que produz o número que os outros seis precisam.",
    },
    tag: { es: "LA PIEDRA ANGULAR", en: "THE KEYSTONE", de: "DER SCHLUSSSTEIN", pt: "A PEDRA ANGULAR" },
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
        {/* Hero */}
        <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-2 md:pb-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <p className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-5" style={{ color: `${PINK}c0` }}>
              {HERO_EYEBROW[lang]}
            </p>
            <h1
              className="font-clash font-bold leading-[1.04] mb-6 max-w-[16ch]"
              style={{ fontSize: "clamp(34px, 6.2vw, 74px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.94)" }}
            >
              {HERO_H1[lang]}
            </h1>
            <p className="font-clash text-base md:text-xl max-w-2xl leading-relaxed mb-10" style={{ color: "rgba(var(--text-rgb), 0.6)" }}>
              {HERO_SUB[lang]}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
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
        </section>

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
          </div>
        </Section>

        {/* Reparto de capas */}
        <Section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <h2
              className="font-clash font-bold mb-10 md:mb-14 max-w-[22ch]"
              style={{ fontSize: "clamp(26px, 4.2vw, 46px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "rgba(var(--text-rgb), 0.93)" }}
            >
              {LAYERS_H2[lang]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {LAYERS.map((l, i) => {
                const ours = i === 1;
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-7 md:p-10"
                    style={{
                      border: ours ? `1px solid ${PINK}44` : "1px solid rgba(var(--text-rgb), 0.08)",
                      background: ours ? `${PINK}08` : "rgba(var(--text-rgb), 0.02)",
                    }}
                  >
                    <span
                      className="font-clash text-[10px] tracking-[0.3em] uppercase font-semibold block mb-5"
                      style={{ color: ours ? PINK : "rgba(var(--text-rgb), 0.35)" }}
                    >
                      {l.who[lang]}
                    </span>
                    <h3
                      className="font-clash font-bold text-xl md:text-2xl mb-4"
                      style={{ letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}
                    >
                      {l.t[lang]}
                    </h3>
                    <p className="font-clash text-sm md:text-[15px] leading-relaxed" style={{ color: "rgba(var(--text-rgb), 0.55)" }}>
                      {l.b[lang]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* Los 7 agentes */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
