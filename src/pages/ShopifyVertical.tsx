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
  es: "Cuatro turnos cubiertos. Un solo responsable.",
  en: "Four shifts covered. One person accountable.",
  de: "Vier Schichten abgedeckt. Ein Verantwortlicher.",
  pt: "Quatro turnos cobertos. Um só responsável.",
};
const AGENTS_SUB: L = {
  es: "Una tienda necesita a alguien contestando, a alguien atendiendo las redes, a alguien corriendo la pauta y a alguien mirando qué se agota y qué dejó plata. Son cuatro turnos — y casi siempre son dos personas, o una. No vendemos una cantidad de agentes: montamos la operación completa y respondemos por el conjunto.",
  en: "A store needs someone answering, someone tending social, someone running the ads and someone watching what's running out and what made money. That's four shifts — and almost always two people, or one. We don't sell a number of agents: we set up the whole operation and answer for the whole.",
  de: "Ein Shop braucht jemanden, der antwortet, jemanden, der die Social-Kanäle betreut, jemanden, der die Ads fährt, und jemanden, der im Blick hat, was ausgeht und was Geld gebracht hat. Das sind vier Schichten — und fast immer zwei Leute, oder eine. Wir verkaufen keine Anzahl an Agenten: wir bauen den kompletten Betrieb auf und stehen für das Ganze gerade.",
  pt: "Uma loja precisa de alguém a responder, alguém a cuidar das redes, alguém a correr os anúncios e alguém a olhar para o que se esgota e o que deixou dinheiro. São quatro turnos — e quase sempre são duas pessoas, ou uma. Não vendemos uma quantidade de agentes: montamos a operação completa e respondemos pelo conjunto.",
};
/* Los turnos — se cuentan las sillas que quedan cubiertas, no los agentes. */
const AGENTS: { t: L; b: L; tag?: L }[] = [
  {
    t: { es: "Quien contesta", en: "Who answers", de: "Wer antwortet", pt: "Quem responde" },
    b: {
      es: "WhatsApp con la voz de tu marca, leyendo tu catálogo y tu inventario en vivo: asesora, resuelve la talla, reconoce la prenda por foto, arma el carrito y cierra — y nunca ofrece lo que no tienes. Después de la compra: estado del pedido, guía, cambios y la reseña. Es el turno de la madrugada, el que hoy no existe.",
      en: "WhatsApp in your brand's voice, reading your catalog and inventory live: advises, resolves sizing, recognises the piece from a photo, builds the cart and closes — and never offers what you don't have. After the purchase: order status, tracking, exchanges and the review. It's the 3 a.m. shift, the one that doesn't exist today.",
      de: "WhatsApp mit der Stimme deiner Marke, mit Katalog und Bestand live: berät, klärt die Größe, erkennt das Teil vom Foto, baut den Warenkorb und schließt ab — und bietet nie an, was du nicht hast. Nach dem Kauf: Bestellstatus, Sendungsverfolgung, Umtausch und die Bewertung. Die Nachtschicht — die, die es heute nicht gibt.",
      pt: "WhatsApp com a voz da tua marca, a ler o teu catálogo e stock em direto: aconselha, resolve o tamanho, reconhece a peça pela foto, monta o carrinho e fecha — e nunca oferece o que não tens. Depois da compra: estado da encomenda, guia, trocas e a avaliação. É o turno da madrugada, o que hoje não existe.",
    },
    tag: { es: "VIVO EN PRODUCCIÓN", en: "LIVE IN PRODUCTION", de: "LIVE IM EINSATZ", pt: "VIVO EM PRODUÇÃO" },
  },
  {
    t: { es: "Quien atiende las redes", en: "Who tends social", de: "Wer die Social-Kanäle betreut", pt: "Quem cuida das redes" },
    b: {
      es: "Responde los comentarios de Instagram uno por uno y lleva la conversación al DM cuando toca. Un post se vuelve viral y no se queda ninguno sin la información. Corre en nuestra propia marca antes que en la tuya.",
      en: "Replies to Instagram comments one by one and takes the conversation to DMs when it's time. A post goes viral and nobody is left without the info. It runs on our own brand before it runs on yours.",
      de: "Beantwortet Instagram-Kommentare einzeln und zieht das Gespräch in die DMs, wenn es so weit ist. Ein Post geht viral, und niemand bleibt ohne Antwort. Läuft in unserer eigenen Marke, bevor es in deiner läuft.",
      pt: "Responde aos comentários de Instagram um a um e leva a conversa para o DM quando é altura. Um post torna-se viral e ninguém fica sem a informação. Corre na nossa própria marca antes de correr na tua.",
    },
  },
  {
    t: { es: "Quien corre la pauta", en: "Who runs the ads", de: "Wer die Ads fährt", pt: "Quem corre os anúncios" },
    b: {
      es: "Lee tus campañas de Meta todos los días y dice qué escalar, qué pausar y qué creativo rotar — cruzado con lo que dejó plata, no con lo que tuvo más likes. Con el número de margen al lado, no a ciegas. La decisión la toma Edgar con eso en la mano.",
      en: "Reads your Meta campaigns every day and says what to scale, what to pause and which creative to rotate — cross-checked against what made money, not what got the most likes. With the margin number beside it, not blind. Edgar makes the call with that in hand.",
      de: "Liest deine Meta-Kampagnen jeden Tag und sagt, was skalieren, was pausieren und welches Creative rotieren — abgeglichen mit dem, was Geld gebracht hat, nicht mit dem, was die meisten Likes hatte. Mit der Margenzahl daneben, nicht blind. Die Entscheidung trifft Edgar mit dieser Zahl in der Hand.",
      pt: "Lê as tuas campanhas de Meta todos os dias e diz o que escalar, o que pausar e que criativo rodar — cruzado com o que deixou dinheiro, não com o que teve mais likes. Com o número da margem ao lado, não às cegas. A decisão toma-a o Edgar com isso na mão.",
    },
  },
  {
    t: { es: "Quien mira los números", en: "Who watches the numbers", de: "Wer auf die Zahlen schaut", pt: "Quem olha para os números" },
    b: {
      es: "Costo por producto, margen real, cuánto te cuesta una clienta y cuánto vale con el tiempo. Qué talla se está agotando, qué prenda deja plata de verdad, cuáles clientas se están enfriando. Es el que produce el número que los otros tres necesitan — y ese turno es el tablero: lo abres tú, no nosotros.",
      en: "Cost per product, real margin, what a customer costs you and what she's worth over time. Which size is running out, which piece really makes money, which customers are going cold. It produces the number the other three need — and that shift is the dashboard: you open it, not us.",
      de: "Kosten pro Produkt, echte Marge, was eine Kundin kostet und über die Zeit wert ist. Welche Größe ausgeht, welches Teil wirklich Geld bringt, welche Kundinnen kalt werden. Sie liefert die Zahl, die die anderen drei brauchen — und diese Schicht ist das Dashboard: du öffnest es, nicht wir.",
      pt: "Custo por produto, margem real, quanto te custa uma cliente e quanto vale ao longo do tempo. Que tamanho se está a esgotar, que peça deixa dinheiro a sério, que clientes estão a arrefecer. É o que produz o número que os outros três precisam — e esse turno é o painel: abres tu, não nós.",
    },
    tag: { es: "EL TABLERO", en: "THE DASHBOARD", de: "DAS DASHBOARD", pt: "O PAINEL" },
  },
];
/* Lo que el sistema produce mientras los turnos corren. */
const PRODUCES_H3: L = {
  es: "Y lo que el sistema produce mientras los turnos corren",
  en: "And what the system produces while the shifts run",
  de: "Und was das System produziert, während die Schichten laufen",
  pt: "E o que o sistema produz enquanto os turnos correm",
};
const PRODUCES: { t: L; b: L }[] = [
  {
    t: { es: "Imagen", en: "Imagery", de: "Bild", pt: "Imagem" },
    b: {
      es: "De una foto real de cada prenda salen las escenas, los fondos y los formatos — de 100 fotos salen 300, sin sesión ni estudio. Cambiamos la escena, nunca el producto: una foto que miente dispara las devoluciones. Cada pieza se valida contra el original antes de publicarse.",
      en: "From one real photo of each piece come the scenes, backgrounds and formats — 100 photos become 300, no shoot, no studio. We change the scene, never the product: a photo that lies drives returns. Every image is validated against the original before it's published.",
      de: "Aus einem echten Foto jedes Teils entstehen Szenen, Hintergründe und Formate — aus 100 Fotos werden 300, ohne Shooting, ohne Studio. Wir ändern die Szene, nie das Produkt: ein Foto, das lügt, treibt Retouren. Jedes Bild wird vor der Veröffentlichung am Original geprüft.",
      pt: "De uma foto real de cada peça saem as cenas, os fundos e os formatos — de 100 fotos saem 300, sem sessão nem estúdio. Mudamos a cena, nunca o produto: uma foto que mente dispara devoluções. Cada peça é validada contra o original antes de ser publicada.",
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
    t: { es: "La base que se acuerda", en: "The base that remembers", de: "Die Basis, die sich erinnert", pt: "A base que se lembra" },
    b: {
      es: "Tus clientas ordenadas y segmentadas, con flujos que trabajan solos: carrito abandonado, bienvenida, post-compra, reactivación a los 90 días, cumpleaños y preventa a las de siempre. Casi siempre hay más plata en la lista vieja que en la pauta nueva.",
      en: "Your customers cleaned and segmented, with flows that work on their own: abandoned cart, welcome, post-purchase, 90-day reactivation, birthday and pre-sale to the regulars. There's almost always more money in the old list than in new ads.",
      de: "Deine Kundinnen geordnet und segmentiert, mit Flows, die von allein laufen: abgebrochener Warenkorb, Willkommen, Nachkauf, Reaktivierung nach 90 Tagen, Geburtstag und Vorverkauf an die Stammkundinnen. Fast immer steckt mehr Geld in der alten Liste als in neuen Ads.",
      pt: "As tuas clientes ordenadas e segmentadas, com fluxos que trabalham sozinhos: carrinho abandonado, boas-vindas, pós-compra, reativação aos 90 dias, aniversário e pré-venda às de sempre. Quase sempre há mais dinheiro na lista antiga do que nos anúncios novos.",
    },
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

        {/* Los cuatro turnos + lo que el sistema produce */}
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

            <h3
              className="font-clash font-semibold mt-14 md:mt-16 mb-6 md:mb-8"
              style={{ fontSize: "clamp(20px, 2.6vw, 28px)", letterSpacing: "-0.015em", color: "rgba(var(--text-rgb), 0.9)" }}
            >
              {PRODUCES_H3[lang]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PRODUCES.map((a, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 md:p-7 flex flex-col"
                  style={{ border: "1px solid rgba(var(--text-rgb), 0.08)", background: "rgba(var(--text-rgb), 0.02)" }}
                >
                  <span className="font-mono text-[10px] tracking-[0.25em] mb-4" style={{ color: `${PINK}b0` }}>
                    0{i + 1}
                  </span>
                  <h4
                    className="font-clash font-semibold text-lg md:text-xl mb-3"
                    style={{ letterSpacing: "-0.015em", color: "rgba(var(--text-rgb), 0.9)" }}
                  >
                    {a.t[lang]}
                  </h4>
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
