import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "@/theme/ThemeContext";
import { useLanguage } from "@/i18n/LanguageContext";
import FooterMinimal from "@/components/FooterMinimal";
import PremiumBackground from "@/components/layout/PremiumBackground";
import SEO from "@/components/SEO";
import { whatsAppUrl, trackContact } from "@/lib/pixel";

/* Lazy autoplay video — loads & plays when near viewport */
const LazyShootVideo = ({ src, className }: { src: string; className?: string }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(src);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "300px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [src]);

  const videoCallback = (node: HTMLVideoElement | null) => {
    if (!node) return;
    const tryPlay = () => {
      node.play().catch(() => {});
    };
    node.addEventListener("canplay", tryPlay, { once: true });
    tryPlay();
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else node.pause();
      },
      { threshold: 0.15 },
    );
    obs.observe(node);
  };

  return (
    <div ref={sentinelRef} className={className}>
      {activeSrc && (
        <video
          ref={videoCallback}
          key={activeSrc}
          src={activeSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

const EASE = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#f074aa";
const ACCENT_DEEP = "#d461c1";

type Lang = "es" | "en" | "de" | "pt";
type LT = { es: string; en: string; de: string; pt: string };
const t = (obj: LT, lang: Lang) => obj[lang] ?? obj.es;

/* ──────────────────────────────────────────
   Section wrapper with in-view animation
   ────────────────────────────────────────── */
const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

/* ──────────────────────────────────────────
   HERO — collage parallax + headline
   ────────────────────────────────────────── */
const Hero = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = {
    es: "MONZA STUDIO · VENTURE 03",
    en: "MONZA STUDIO · VENTURE 03",
    de: "MONZA STUDIO · VENTURE 03", pt: "MONZA STUDIO · VENTURE 03",
  };
  const headline: LT = {
    es: "No delego marcas. Las construyo.",
    en: "I don't delegate brands. I build them.",
    de: "Ich delegiere keine Marken. Ich baue sie.",
    pt: "Não delego marcas. Construo-as.",
  };
  const sub: LT = {
    es: "Atiendo cada una personalmente — estrategia, branding, producto, contenido y growth. Criterio editorial. IA como palanca.",
    en: "I attend each one personally — strategy, branding, product, content and growth. Editorial criterion. AI as leverage.",
    de: "Ich betreue jede persönlich — Strategie, Branding, Produkt, Content und Growth. Redaktionelles Urteil. KI als Hebel.",
    pt: "Acompanho cada uma pessoalmente — estratégia, branding, produto, conteúdo e growth. Critério editorial. IA como alavanca.",
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
        {/* ── Copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="md:col-span-7"
        >
          <p
            className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
            style={{ color: `${ACCENT}cc` }}
          >
            {t(eyebrow, lang)}
          </p>
          <h1
            className="font-clash font-bold leading-[0.95] mb-6"
            style={{
              fontSize: "clamp(40px, 7.5vw, 96px)",
              letterSpacing: "-0.03em",
              color: "rgba(var(--text-rgb), 0.92)",
            }}
          >
            {t(headline, lang)}
          </h1>
          <p
            className="font-clash text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "rgba(var(--text-rgb), 0.55)" }}
          >
            {t(sub, lang)}
          </p>
        </motion.div>

        {/* ── Collage parallax ── */}
        <div className="md:col-span-5 relative h-[420px] md:h-[560px]">
          {/* Frame 1 — Eleonora portrait (top-right) */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
            className="absolute top-0 right-0 w-[58%] h-[58%] rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${ACCENT}33`,
              boxShadow: `0 30px 80px -30px ${ACCENT}22`,
            }}
          >
            <img
              src="/images/brands/eleonora/eleonora-portrait.jpg"
              alt="Eleonora Morales — editorial"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(140deg, transparent 50%, ${ACCENT}22 100%)`,
              }}
            />
          </motion.div>

          {/* Frame 2 — Santi editorial (left, mid) */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
            className="absolute top-[28%] left-0 w-[52%] h-[48%] rounded-2xl overflow-hidden"
            style={{
              border: `1px solid rgba(255,252,247,0.10)`,
              boxShadow: `0 30px 80px -30px rgba(0,0,0,0.55)`,
            }}
          >
            <img
              src="/images/people/santi/santi-clubmaster.png"
              alt="Editorial portrait — gafas"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>

          {/* Frame 3 — Automotive hero (bottom-right) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
            className="absolute bottom-0 right-[8%] w-[50%] h-[40%] rounded-2xl overflow-hidden"
            style={{
              border: `1px solid rgba(255,252,247,0.08)`,
              boxShadow: `0 30px 80px -30px rgba(0,0,0,0.55)`,
            }}
          >
            <img
              src="/images/studio/automotive/01-wheel-hero.jpg"
              alt="Automotive editorial — wheel hero"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>

          {/* Tag — number in corner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="absolute top-2 left-2 font-mono text-[11px] tracking-[0.2em]"
            style={{ color: `${ACCENT}80` }}
          >
            03 / STUDIO
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          className="font-clash text-[9px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(var(--text-rgb), 0.35)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: `linear-gradient(to bottom, rgba(var(--text-rgb), 0.35), transparent)`,
          }}
        />
      </motion.div>
    </section>
  );
};

/* ──────────────────────────────────────────
   PURPOSE
   ────────────────────────────────────────── */
const Purpose = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "PROPÓSITO", en: "PURPOSE", de: "ZWECK", pt: "PROPÓSITO" };
  const head: LT = {
    es: "Para marcas con presencia que quieren vender más sin sumar gente.",
    en: "For brands with presence that want to sell more without adding headcount.",
    de: "Für Marken mit Präsenz, die mehr verkaufen wollen, ohne Leute einzustellen.",
    pt: "Para marcas com presença que querem vender mais sem somar gente.",
  };
  const body: LT = {
    es: "No vendemos servicios sueltos. Instalamos el sistema completo con el que una marca vende, contesta, se acuerda de sus clientas y mide — la página, la operación, la base y el tablero — y lo operamos contigo, mes a mes. El sistema y el look van juntos: la dirección estética entra en el mismo paquete.",
    en: "We don't sell loose services. We install the complete system a brand sells with — one that sells, answers, remembers its customers and measures: the page, the operation, the customer base and the dashboard — and we run it with you, month by month. System and look come together: creative direction is part of the same package.",
    de: "Wir verkaufen keine losen Services. Wir installieren das komplette System, mit dem eine Marke verkauft, antwortet, sich an ihre Kundinnen erinnert und misst — die Seite, den Betrieb, die Kundenbasis und das Dashboard — und betreiben es mit dir, Monat für Monat. System und Look gehören zusammen: die ästhetische Leitung ist Teil desselben Pakets.",
    pt: "Não vendemos serviços soltos. Instalamos o sistema completo com que uma marca vende, responde, se lembra das suas clientes e mede — a página, a operação, a base e o painel — e operamos contigo, mês a mês. O sistema e o look vão juntos: a direção estética entra no mesmo pacote.",
  };

  return (
    <Section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-8"
          style={{
            fontSize: "clamp(28px, 4.4vw, 56px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p
          className="font-clash text-lg md:text-xl max-w-3xl leading-relaxed"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {t(body, lang)}
        </p>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   EL SISTEMA — el circuito de seis estaciones
   Copy base: la articulación del sistema Studio (agosto 2026):
   una agencia vende piezas; esto es un circuito cerrado que
   devuelve un solo número — cuánto pagar por la siguiente clienta.
   Sin precios (PRICING.md manda), sin nombres de clientes bajo NDA.
   ────────────────────────────────────────── */
type Station = { num: string; name: LT; kicker: LT; body: LT };

const STATIONS: Station[] = [
  {
    num: "01",
    name: { es: "Redes", en: "Social", de: "Social", pt: "Redes" },
    kicker: { es: "Alguien te descubre", en: "Someone discovers you", de: "Jemand entdeckt dich", pt: "Alguém te descobre" },
    body: {
      es: "Contenido y pauta conectados a tu tienda. Lo que casi nunca falta es contenido: lo que falta es saber cuánto vale cada persona que llega.",
      en: "Content and paid media wired to your store. What's rarely missing is content — what's missing is knowing what each person who arrives is worth.",
      de: "Content und Ads, verbunden mit deinem Shop. Woran es selten fehlt, ist Content — woran es fehlt, ist zu wissen, was jede Person wert ist, die ankommt.",
      pt: "Conteúdo e anúncios ligados à tua loja. O que quase nunca falta é conteúdo: o que falta é saber quanto vale cada pessoa que chega.",
    },
  },
  {
    num: "02",
    name: { es: "La página", en: "The page", de: "Die Seite", pt: "A página" },
    kicker: { es: "Y llega de verdad", en: "And actually arrives", de: "Und kommt wirklich an", pt: "E chega mesmo" },
    body: {
      es: "Una página nueva sobre tu mismo Shopify. Pedidos, inventario y cobro no se tocan; cambia solo lo que la clienta ve — que es la parte lenta.",
      en: "A new page on top of your same Shopify. Orders, inventory and checkout stay untouched; only what the customer sees changes — which is the slow part.",
      de: "Eine neue Seite auf deinem bestehenden Shopify. Bestellungen, Bestand und Bezahlung bleiben unberührt; es ändert sich nur, was die Kundin sieht — der langsame Teil.",
      pt: "Uma página nova sobre o teu mesmo Shopify. Encomendas, stock e cobrança não se tocam; muda só o que a cliente vê — que é a parte lenta.",
    },
  },
  {
    num: "03",
    name: { es: "Quien contesta", en: "Who answers", de: "Wer antwortet", pt: "Quem responde" },
    kicker: { es: "Alguien le responde", en: "Someone replies", de: "Jemand antwortet ihr", pt: "Alguém lhe responde" },
    body: {
      es: "WhatsApp con la voz de tu marca, conectado a tu inventario en tiempo real: resuelve la talla, reconoce la prenda por foto y cierra. Es la única estación que no duerme.",
      en: "WhatsApp in your brand's voice, connected to your inventory in real time: it resolves sizing, recognises the piece from a photo and closes. The only station that never sleeps.",
      de: "WhatsApp mit der Stimme deiner Marke, in Echtzeit mit deinem Bestand verbunden: klärt die Größe, erkennt das Teil vom Foto und schließt ab. Die einzige Station, die nie schläft.",
      pt: "WhatsApp com a voz da tua marca, ligado ao teu stock em tempo real: resolve o tamanho, reconhece a peça pela foto e fecha. É a única estação que não dorme.",
    },
  },
  {
    num: "04",
    name: { es: "La venta", en: "The sale", de: "Der Kauf", pt: "A venda" },
    kicker: { es: "Compra", en: "She buys", de: "Sie kauft", pt: "Compra" },
    body: {
      es: "El cobro es lo único que ya está resuelto. Shopify y tu pasarela siguen donde están: no los tocamos.",
      en: "Checkout is the one thing already solved. Shopify and your payment gateway stay where they are: we don't touch them.",
      de: "Das Bezahlen ist das Einzige, was schon gelöst ist. Shopify und dein Zahlungsanbieter bleiben, wo sie sind: wir fassen sie nicht an.",
      pt: "A cobrança é a única coisa que já está resolvida. O Shopify e o teu gateway ficam onde estão: não lhes tocamos.",
    },
  },
  {
    num: "05",
    name: { es: "El CRM", en: "The CRM", de: "Das CRM", pt: "O CRM" },
    kicker: { es: "Y ahora sabemos quién es", en: "And now we know who she is", de: "Und jetzt wissen wir, wer sie ist", pt: "E agora sabemos quem é" },
    body: {
      es: "Deja de ser un pedido y pasa a ser una persona: historia, talla, gusto y fecha de cumpleaños. La base ordenada y segmentada, con flujos de correo y WhatsApp corriendo solos — bienvenida, carrito abandonado, post-compra, reactivación, preventa a las de siempre.",
      en: "She stops being an order and becomes a person: history, size, taste and birthday. The base cleaned and segmented, with email and WhatsApp flows running on their own — welcome, abandoned cart, post-purchase, reactivation, pre-sale to the regulars.",
      de: "Sie ist keine Bestellung mehr, sondern eine Person: Historie, Größe, Geschmack und Geburtstag. Die Basis geordnet und segmentiert, mit E-Mail- und WhatsApp-Flows, die von allein laufen — Willkommen, abgebrochener Warenkorb, Nachkauf, Reaktivierung, Vorverkauf an die Stammkundinnen.",
      pt: "Deixa de ser uma encomenda e passa a ser uma pessoa: história, tamanho, gosto e data de aniversário. A base ordenada e segmentada, com fluxos de e-mail e WhatsApp a correr sozinhos — boas-vindas, carrinho abandonado, pós-compra, reativação, pré-venda às de sempre.",
    },
  },
  {
    num: "06",
    name: { es: "La recompra", en: "The repeat", de: "Der Wiederkauf", pt: "A recompra" },
    kicker: { es: "Vuelve — y sin pauta", en: "She comes back — no ads needed", de: "Sie kommt zurück — ohne Ads", pt: "Regressa — e sem anúncios" },
    body: {
      es: "La segunda venta no cuesta pauta. Es la que cambia el flujo de caja y la que casi ninguna marca está cobrando.",
      en: "The second sale costs no ad spend. It's the one that changes cash flow and the one almost no brand is collecting.",
      de: "Der zweite Verkauf kostet keine Werbung. Er verändert den Cashflow — und fast keine Marke holt ihn sich.",
      pt: "A segunda venda não custa anúncios. É a que muda o fluxo de caixa e a que quase nenhuma marca está a cobrar.",
    },
  },
];

const SystemCircuit = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = {
    es: "EL SISTEMA QUE INSTALAMOS",
    en: "THE SYSTEM WE INSTALL",
    de: "DAS SYSTEM, DAS WIR INSTALLIEREN",
    pt: "O SISTEMA QUE INSTALAMOS",
  };
  const head: LT = {
    es: "Una agencia vende piezas. Esto es un circuito.",
    en: "An agency sells pieces. This is a circuit.",
    de: "Eine Agentur verkauft Einzelteile. Das hier ist ein Rundkurs.",
    pt: "Uma agência vende peças. Isto é um circuito.",
  };
  const intro: LT = {
    es: "En una agencia cada pieza es un servicio con su proveedor, la flecha va en una sola dirección y todo termina en la venta: la clienta que ya compró vuelve a ser una desconocida el mes siguiente. Aquí el recorrido se cierra. Seis estaciones son el camino de la clienta; cada una le entrega un dato al modelo del centro, y ese modelo devuelve una sola cosa: cuánto se puede pagar por traer a la siguiente.",
    en: "In an agency every piece is a service with its own vendor, the arrow points one way and everything ends at the sale: the customer who just bought is a stranger again next month. Here the loop closes. Six stations are the customer's path; each hands a data point to the model at the centre, and that model returns one thing: how much you can pay to bring in the next one.",
    de: "In einer Agentur ist jedes Teil ein Service mit eigenem Anbieter, der Pfeil zeigt in eine Richtung und alles endet beim Verkauf: die Kundin, die gerade gekauft hat, ist im nächsten Monat wieder eine Fremde. Hier schließt sich der Kreis. Sechs Stationen sind der Weg der Kundin; jede liefert dem Modell in der Mitte einen Datenpunkt, und das Modell gibt genau eine Sache zurück: wie viel man zahlen kann, um die nächste zu gewinnen.",
    pt: "Numa agência cada peça é um serviço com o seu fornecedor, a seta vai numa só direção e tudo termina na venda: a cliente que acabou de comprar torna-se de novo uma desconhecida no mês seguinte. Aqui o percurso fecha-se. Seis estações são o caminho da cliente; cada uma entrega um dado ao modelo do centro, e esse modelo devolve uma só coisa: quanto se pode pagar para trazer a seguinte.",
  };
  const modelLabel: LT = { es: "EL CENTRO · EL MODELO", en: "THE CENTRE · THE MODEL", de: "DIE MITTE · DAS MODELL", pt: "O CENTRO · O MODELO" };
  const modelHead: LT = {
    es: "Lo que ninguna estación hace sola.",
    en: "What no station does alone.",
    de: "Was keine Station allein schafft.",
    pt: "O que nenhuma estação faz sozinha.",
  };
  const modelBody: LT = {
    es: "Cada estación entrega un dato — qué costó traerla, qué preguntó, qué compró, si volvió — y de ahí salen los cuatro números que gobiernan el negocio: cuánto deja cada prenda, cuánto cuesta traer una clienta, cuánto deja esa clienta con el tiempo y hasta cuánto se puede pagar por la siguiente. Una agencia puede correrte la pauta; nadie te construye esos números.",
    en: "Each station hands over a data point — what it cost to bring her, what she asked, what she bought, whether she came back — and out of that come the four numbers that govern the business: what each piece leaves, what it costs to bring a customer, what that customer leaves over time and how much you can pay for the next one. An agency can run your ads; nobody builds you those numbers.",
    de: "Jede Station liefert einen Datenpunkt — was es gekostet hat, sie zu gewinnen, was sie gefragt, was sie gekauft hat, ob sie zurückkam — und daraus entstehen die vier Zahlen, die das Geschäft steuern: was jedes Teil übrig lässt, was eine Kundin kostet, was diese Kundin über die Zeit bringt und wie viel man für die nächste zahlen kann. Eine Agentur kann deine Ads fahren; diese Zahlen baut dir niemand.",
    pt: "Cada estação entrega um dado — o que custou trazê-la, o que perguntou, o que comprou, se voltou — e daí saem os quatro números que governam o negócio: quanto deixa cada peça, quanto custa trazer uma cliente, quanto deixa essa cliente ao longo do tempo e até quanto se pode pagar pela seguinte. Uma agência pode correr-te os anúncios; ninguém te constrói esses números.",
  };
  const modelClose: LT = {
    es: "Sin esa vuelta hay seis herramientas. Con ella hay un sistema.",
    en: "Without that loop you have six tools. With it, you have a system.",
    de: "Ohne diese Rückkopplung hast du sechs Werkzeuge. Mit ihr ein System.",
    pt: "Sem esse retorno há seis ferramentas. Com ele há um sistema.",
  };

  return (
    <Section className="py-24 md:py-32" id="capabilities">
      <div id="sistema" className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-8"
          style={{
            fontSize: "clamp(28px, 4.4vw, 56px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p
          className="font-clash text-base md:text-lg max-w-3xl leading-relaxed mb-14 md:mb-20"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {t(intro, lang)}
        </p>

        {/* Las seis estaciones — el anillo, leído de izquierda a derecha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {STATIONS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              className="rounded-2xl p-6 md:p-7 flex flex-col"
              style={{
                background: "rgba(var(--text-rgb), 0.02)",
                border: "1px solid rgba(var(--text-rgb), 0.06)",
              }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-4">
                <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: `${ACCENT}80` }}>
                  {s.num}
                </span>
                <span
                  className="font-clash text-[10px] tracking-[0.2em] uppercase font-medium text-right"
                  style={{ color: "rgba(var(--text-rgb), 0.4)" }}
                >
                  {t(s.kicker, lang)}
                </span>
              </div>
              <h3
                className="font-clash font-bold text-xl md:text-2xl mb-3"
                style={{ letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}
              >
                {t(s.name, lang)}
              </h3>
              <p className="font-clash text-[14px] md:text-[15px] leading-relaxed" style={{ color: "rgba(var(--text-rgb), 0.58)" }}>
                {t(s.body, lang)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* El modelo — la flecha que una agencia no tiene */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-4 md:mt-5 rounded-2xl p-7 md:p-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-6 lg:gap-12"
          style={{ background: `${ACCENT}0a`, border: `1px solid ${ACCENT}40` }}
        >
          <div>
            <p className="font-clash text-[10px] tracking-[0.35em] uppercase font-medium mb-4" style={{ color: ACCENT }}>
              {t(modelLabel, lang)}
            </p>
            <h3
              className="font-clash font-bold leading-[1.08]"
              style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}
            >
              {t(modelHead, lang)}
            </h3>
          </div>
          <div>
            <p className="font-clash text-[15px] md:text-base leading-relaxed mb-5" style={{ color: "rgba(var(--text-rgb), 0.62)" }}>
              {t(modelBody, lang)}
            </p>
            <p className="font-clash font-semibold text-base md:text-lg" style={{ color: "rgba(var(--text-rgb), 0.9)" }}>
              {t(modelClose, lang)}
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   LA OPERACIÓN — cuatro turnos, un solo responsable
   Regla de casa: no se cuentan agentes; se cuentan las sillas
   que quedan cubiertas. El tablero es la cuarta silla.
   ────────────────────────────────────────── */
type Shift = { title: LT; body: LT; tag?: LT };

const SHIFTS: Shift[] = [
  {
    title: { es: "Quien contesta", en: "Who answers", de: "Wer antwortet", pt: "Quem responde" },
    body: {
      es: "WhatsApp con la voz de la marca, leyendo tu inventario en vivo: resuelve la talla, reconoce la prenda por foto y cierra. Y después de la compra: estado del pedido, guía, cambios. Es el turno de la madrugada — el que hoy no existe.",
      en: "WhatsApp in the brand's voice, reading your live inventory: resolves sizing, recognises the piece from a photo and closes. And after the purchase: order status, tracking, exchanges. It's the 3 a.m. shift — the one that doesn't exist today.",
      de: "WhatsApp mit der Stimme der Marke, mit Blick auf deinen Live-Bestand: klärt die Größe, erkennt das Teil vom Foto und schließt ab. Und nach dem Kauf: Bestellstatus, Sendungsverfolgung, Umtausch. Die Nachtschicht — die, die es heute nicht gibt.",
      pt: "WhatsApp com a voz da marca, a ler o teu stock em direto: resolve o tamanho, reconhece a peça pela foto e fecha. E depois da compra: estado da encomenda, guia, trocas. É o turno da madrugada — o que hoje não existe.",
    },
    tag: { es: "VIVO EN PRODUCCIÓN", en: "LIVE IN PRODUCTION", de: "LIVE IM EINSATZ", pt: "VIVO EM PRODUÇÃO" },
  },
  {
    title: { es: "Quien atiende las redes", en: "Who tends social", de: "Wer die Social-Kanäle betreut", pt: "Quem cuida das redes" },
    body: {
      es: "Responde los comentarios uno por uno y lleva la conversación al DM cuando toca. Un post se vuelve viral y no se queda ninguno sin la información. Corre en nuestra propia marca antes que en la tuya.",
      en: "Replies to comments one by one and takes the conversation to DMs when it's time. A post goes viral and nobody is left without the info. It runs on our own brand before it runs on yours.",
      de: "Beantwortet Kommentare einzeln und zieht das Gespräch in die DMs, wenn es so weit ist. Ein Post geht viral, und niemand bleibt ohne Antwort. Läuft in unserer eigenen Marke, bevor es in deiner läuft.",
      pt: "Responde aos comentários um a um e leva a conversa para o DM quando é altura. Um post torna-se viral e ninguém fica sem a informação. Corre na nossa própria marca antes de correr na tua.",
    },
  },
  {
    title: { es: "Quien corre la pauta", en: "Who runs the ads", de: "Wer die Ads fährt", pt: "Quem corre os anúncios" },
    body: {
      es: "Lee la cuenta de Meta todos los días y dice qué escalar, qué rotar y qué apagar — cruzado con lo que dejó plata, no con lo que tuvo más likes. La decisión la toma Edgar con eso en la mano.",
      en: "Reads the Meta account every day and says what to scale, what to rotate and what to switch off — cross-checked against what made money, not what got the most likes. Edgar makes the call with that in hand.",
      de: "Liest das Meta-Konto jeden Tag und sagt, was skalieren, was rotieren, was abschalten — abgeglichen mit dem, was Geld gebracht hat, nicht mit dem, was die meisten Likes hatte. Die Entscheidung trifft Edgar mit dieser Zahl in der Hand.",
      pt: "Lê a conta de Meta todos os dias e diz o que escalar, o que rodar e o que desligar — cruzado com o que deixou dinheiro, não com o que teve mais likes. A decisão toma-a o Edgar com isso na mão.",
    },
  },
  {
    title: { es: "Quien mira los números", en: "Who watches the numbers", de: "Wer auf die Zahlen schaut", pt: "Quem olha para os números" },
    body: {
      es: "Vigila la tienda y el margen: qué talla se está agotando, qué prenda deja plata de verdad, cuáles clientas se están enfriando. Ese turno es el tablero — y lo abres tú, no nosotros.",
      en: "Watches the store and the margin: which size is running out, which piece really makes money, which customers are going cold. That shift is the dashboard — and you open it, not us.",
      de: "Behält Shop und Marge im Blick: welche Größe ausgeht, welches Teil wirklich Geld bringt, welche Kundinnen kalt werden. Diese Schicht ist das Dashboard — und du öffnest es, nicht wir.",
      pt: "Vigia a loja e a margem: que tamanho se está a esgotar, que peça deixa dinheiro a sério, que clientes estão a arrefecer. Esse turno é o painel — e abres tu, não nós.",
    },
    tag: { es: "EL TABLERO", en: "THE DASHBOARD", de: "DAS DASHBOARD", pt: "O PAINEL" },
  },
];

const FOUR_NUMBERS: { label: LT; meaning: LT }[] = [
  {
    label: { es: "Cuánto deja cada prenda", en: "What each piece leaves", de: "Was jedes Teil übrig lässt", pt: "Quanto deixa cada peça" },
    meaning: { es: "promedio, ya con costos", en: "average, after costs", de: "im Schnitt, nach Kosten", pt: "em média, já com custos" },
  },
  {
    label: { es: "Cuánto cuesta traer una clienta", en: "What it costs to bring a customer", de: "Was eine Kundin kostet", pt: "Quanto custa trazer uma cliente" },
    meaning: { es: "de pauta, por venta nueva", en: "in ads, per new sale", de: "an Ads, pro Neuverkauf", pt: "de anúncios, por venda nova" },
  },
  {
    label: { es: "Cuánto deja esa clienta", en: "What that customer leaves", de: "Was diese Kundin bringt", pt: "Quanto deixa essa cliente" },
    meaning: { es: "sumando sus compras en el tiempo", en: "adding up her purchases over time", de: "alle Käufe über die Zeit", pt: "somando as compras ao longo do tempo" },
  },
  {
    label: { es: "Hasta cuánto se puede pagar", en: "How much you can pay", de: "Wie viel man zahlen kann", pt: "Até quanto se pode pagar" },
    meaning: { es: "por traer la siguiente — ahí se decide la pauta", en: "to bring the next one — that's where ads get decided", de: "für die nächste — hier entscheidet sich die Werbung", pt: "para trazer a seguinte — aí decidem-se os anúncios" },
  },
];

const Operation = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "LA OPERACIÓN", en: "THE OPERATION", de: "DER BETRIEB", pt: "A OPERAÇÃO" };
  const head: LT = {
    es: "Cuatro turnos. Un solo responsable.",
    en: "Four shifts. One person accountable.",
    de: "Vier Schichten. Ein Verantwortlicher.",
    pt: "Quatro turnos. Um só responsável.",
  };
  const intro: LT = {
    es: "Una operación como la tuya necesita a alguien contestando, a alguien atendiendo las redes, a alguien corriendo la pauta y a alguien mirando qué se agota y qué dejó plata. Son cuatro turnos — y casi siempre son dos personas, o una. No vendemos una cantidad de agentes: montamos la operación completa y respondemos por el conjunto.",
    en: "An operation like yours needs someone answering, someone tending social, someone running the ads and someone watching what's running out and what made money. That's four shifts — and almost always two people, or one. We don't sell a number of agents: we set up the whole operation and answer for the whole.",
    de: "Ein Betrieb wie deiner braucht jemanden, der antwortet, jemanden, der die Social-Kanäle betreut, jemanden, der die Ads fährt, und jemanden, der im Blick hat, was ausgeht und was Geld gebracht hat. Das sind vier Schichten — und fast immer zwei Leute, oder eine. Wir verkaufen keine Anzahl an Agenten: wir bauen den kompletten Betrieb auf und stehen für das Ganze gerade.",
    pt: "Uma operação como a tua precisa de alguém a responder, alguém a cuidar das redes, alguém a correr os anúncios e alguém a olhar para o que se esgota e o que deixou dinheiro. São quatro turnos — e quase sempre são duas pessoas, ou uma. Não vendemos uma quantidade de agentes: montamos a operação completa e respondemos pelo conjunto.",
  };
  const botHead: LT = {
    es: "Ya probaste un bot y lo apagaste. Tenías razón.",
    en: "You already tried a bot and switched it off. You were right.",
    de: "Du hast schon einen Bot probiert und ihn abgeschaltet. Zu Recht.",
    pt: "Já experimentaste um bot e desligaste-o. Tinhas razão.",
  };
  const botBody: LT = {
    es: "Eso pasa cuando se conecta un bot genérico a un catálogo y se espera que entienda un negocio. El nuestro va conectado directo a tu tienda, con la voz de la marca aprobada por ti. Si no sabe si hay stock, no se lo inventa: lo dice. Y donde dos prendas se parecen demasiado, no adivina — ofrece las opciones. Esa es la diferencia entre un sistema que sabe lo que no sabe y uno que alucina.",
    en: "That's what happens when a generic bot is plugged into a catalog and expected to understand a business. Ours is wired straight into your store, with the brand's voice approved by you. If it doesn't know whether something is in stock, it doesn't make it up: it says so. And where two pieces look too alike, it doesn't guess — it offers the options. That's the difference between a system that knows what it doesn't know and one that hallucinates.",
    de: "Das passiert, wenn man einen generischen Bot an einen Katalog hängt und erwartet, dass er ein Geschäft versteht. Unserer ist direkt mit deinem Shop verbunden, mit der von dir freigegebenen Markenstimme. Weiß er nicht, ob etwas auf Lager ist, erfindet er nichts: er sagt es. Und wo zwei Teile sich zu ähnlich sehen, rät er nicht — er bietet die Optionen an. Das ist der Unterschied zwischen einem System, das weiß, was es nicht weiß, und einem, das halluziniert.",
    pt: "É o que acontece quando se liga um bot genérico a um catálogo e se espera que perceba um negócio. O nosso vai ligado diretamente à tua loja, com a voz da marca aprovada por ti. Se não sabe se há stock, não inventa: diz. E onde duas peças se parecem demasiado, não adivinha — oferece as opções. É a diferença entre um sistema que sabe o que não sabe e um que alucina.",
  };
  const numbersLabel: LT = {
    es: "EL TABLERO · LOS CUATRO NÚMEROS QUE GOBIERNAN EL NEGOCIO",
    en: "THE DASHBOARD · THE FOUR NUMBERS THAT GOVERN THE BUSINESS",
    de: "DAS DASHBOARD · DIE VIER ZAHLEN, DIE DAS GESCHÄFT STEUERN",
    pt: "O PAINEL · OS QUATRO NÚMEROS QUE GOVERNAM O NEGÓCIO",
  };
  const numbersNote: LT = {
    es: "Qué post vendió, no cuál gustó. Qué prenda deja plata de verdad. Cuáles clientas se están enfriando. Eso no sale de ninguna aplicación: hay que construirlo — y queda a tu nombre y con tus accesos.",
    en: "Which post sold, not which one people liked. Which piece really makes money. Which customers are going cold. That doesn't come out of any app: it has to be built — and it stays in your name, with your access.",
    de: "Welcher Post verkauft hat, nicht welcher gefallen hat. Welches Teil wirklich Geld bringt. Welche Kundinnen kalt werden. Das kommt aus keiner App: das muss gebaut werden — und es bleibt auf deinen Namen, mit deinen Zugängen.",
    pt: "Que post vendeu, não qual agradou. Que peça deixa dinheiro a sério. Que clientes estão a arrefecer. Isso não sai de nenhuma aplicação: tem de se construir — e fica em teu nome e com os teus acessos.",
  };

  return (
    <Section className="py-24 md:py-32" id="operacion">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-8"
          style={{
            fontSize: "clamp(28px, 4.4vw, 56px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p
          className="font-clash text-base md:text-lg max-w-3xl leading-relaxed mb-14 md:mb-20"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {t(intro, lang)}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {SHIFTS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="rounded-2xl p-7 md:p-9"
              style={{
                background: s.tag ? `${ACCENT}08` : "rgba(var(--text-rgb), 0.02)",
                border: s.tag ? `1px solid ${ACCENT}38` : "1px solid rgba(var(--text-rgb), 0.06)",
              }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-4">
                <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: `${ACCENT}80` }}>
                  0{i + 1}
                </span>
                {s.tag && (
                  <span className="font-clash text-[9px] tracking-[0.22em] uppercase font-semibold text-right" style={{ color: ACCENT }}>
                    {t(s.tag, lang)}
                  </span>
                )}
              </div>
              <h3
                className="font-clash font-bold text-2xl md:text-3xl mb-4"
                style={{ letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}
              >
                {t(s.title, lang)}
              </h3>
              <p className="font-clash text-[15px] md:text-base leading-relaxed" style={{ color: "rgba(var(--text-rgb), 0.6)" }}>
                {t(s.body, lang)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* La objeción que trae casi toda marca que ya probó un bot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-4 md:mt-5 rounded-2xl p-7 md:p-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-6 lg:gap-12"
          style={{ background: "rgba(var(--text-rgb), 0.02)", border: "1px solid rgba(var(--text-rgb), 0.08)" }}
        >
          <h3
            className="font-clash font-bold leading-[1.08]"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}
          >
            {t(botHead, lang)}
          </h3>
          <p className="font-clash text-[15px] md:text-base leading-relaxed" style={{ color: "rgba(var(--text-rgb), 0.62)" }}>
            {t(botBody, lang)}
          </p>
        </motion.div>

        {/* El tablero — los cuatro números */}
        <div className="mt-16 md:mt-24">
          <p className="font-clash text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-medium mb-6" style={{ color: `${ACCENT}b3` }}>
            {t(numbersLabel, lang)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {FOUR_NUMBERS.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
                className="rounded-2xl p-6 md:p-7 flex flex-col justify-between min-h-[168px]"
                style={{ background: "rgba(var(--text-rgb), 0.025)", border: "1px solid rgba(var(--text-rgb), 0.07)" }}
              >
                <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: `${ACCENT}80` }}>
                  0{i + 1}
                </span>
                <div>
                  <p
                    className="font-clash font-bold text-lg md:text-xl leading-tight mb-2"
                    style={{ letterSpacing: "-0.015em", color: "rgba(var(--text-rgb), 0.9)" }}
                  >
                    {t(n.label, lang)}
                  </p>
                  <p className="font-clash text-[13px] leading-snug" style={{ color: "rgba(var(--text-rgb), 0.5)" }}>
                    {t(n.meaning, lang)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="font-clash text-[14px] md:text-[15px] leading-relaxed max-w-3xl mt-6" style={{ color: "rgba(var(--text-rgb), 0.55)" }}>
            {t(numbersNote, lang)}
          </p>
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   CONTENIDO — la regla de imagen
   ────────────────────────────────────────── */
const ImageRule = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "CONTENIDO", en: "CONTENT", de: "CONTENT", pt: "CONTEÚDO" };
  const head: LT = {
    es: "La IA cambia la escena. Jamás el producto.",
    en: "AI changes the scene. Never the product.",
    de: "KI verändert die Szene. Nie das Produkt.",
    pt: "A IA muda a cena. Nunca o produto.",
  };
  const body: LT = {
    es: "De una foto real de cada prenda salen las escenas, los fondos y los formatos: de 100 fotos salen 300, sin sesión, sin estudio y sin volver a citar a la modelo. Ni el color, ni el corte, ni la textura, ni el estampado se tocan — una foto que miente dispara las devoluciones. En producción cada pieza se ancla contra el arte original y se valida una por una antes de publicarse, con una regla de imagen firmada por ti antes de generar nada. Ese control es el trabajo; generar es lo fácil.",
    en: "From one real photo of each piece come the scenes, the backgrounds and the formats: 100 photos become 300, with no shoot, no studio and no calling the model back. Colour, cut, texture and print are never touched — a photo that lies drives returns. In production every image is anchored to the original artwork and validated one by one before it's published, under an image rule you sign off before anything is generated. That control is the work; generating is the easy part.",
    de: "Aus einem echten Foto jedes Teils entstehen die Szenen, Hintergründe und Formate: aus 100 Fotos werden 300 — ohne Shooting, ohne Studio, ohne das Model erneut zu buchen. Farbe, Schnitt, Textur und Muster werden nie angefasst — ein Foto, das lügt, treibt die Retouren. In der Produktion wird jedes Bild am Originalentwurf verankert und einzeln geprüft, bevor es online geht, nach einer Bildregel, die du freigibst, bevor irgendetwas generiert wird. Diese Kontrolle ist die Arbeit; das Generieren ist der leichte Teil.",
    pt: "De uma foto real de cada peça saem as cenas, os fundos e os formatos: de 100 fotos saem 300, sem sessão, sem estúdio e sem voltar a chamar a modelo. Nem a cor, nem o corte, nem a textura, nem a estampa se tocam — uma foto que mente dispara devoluções. Em produção cada peça é ancorada à arte original e validada uma a uma antes de ser publicada, com uma regra de imagem assinada por ti antes de gerar o que quer que seja. Esse controlo é o trabalho; gerar é a parte fácil.",
  };
  const proof: LT = {
    es: "Eleonora Morales — el catálogo completo fotografiado así, vendiendo hoy en eleonoramorales.com",
    en: "Eleonora Morales — the entire catalog photographed this way, selling today at eleonoramorales.com",
    de: "Eleonora Morales — der komplette Katalog so fotografiert, verkauft heute auf eleonoramorales.com",
    pt: "Eleonora Morales — o catálogo inteiro fotografado assim, a vender hoje em eleonoramorales.com",
  };

  return (
    <Section className="py-20 md:py-28" id="contenido">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-8 lg:gap-16">
          <div>
            <p
              className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
              style={{ color: `${ACCENT}b3` }}
            >
              {t(eyebrow, lang)}
            </p>
            <h2
              className="font-clash font-bold leading-[1.05]"
              style={{
                fontSize: "clamp(28px, 3.8vw, 48px)",
                letterSpacing: "-0.025em",
                color: "rgba(var(--text-rgb), 0.92)",
              }}
            >
              {t(head, lang)}
            </h2>
          </div>
          <div>
            <p className="font-clash text-[15px] md:text-base leading-relaxed mb-6" style={{ color: "rgba(var(--text-rgb), 0.62)" }}>
              {t(body, lang)}
            </p>
            <a
              href="https://eleonoramorales.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-clash text-[11px] tracking-[0.2em] uppercase font-medium inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{ color: ACCENT }}
            >
              {t(proof, lang)} ↗
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   EL ORDEN Y EL MODELO — qué primero, cómo se paga,
   de quién queda cada cosa. Sin cifras: PRICING.md manda.
   ────────────────────────────────────────── */
type PlanStep = { when: LT; title: LT; body: LT };

const PLAN: PlanStep[] = [
  {
    when: { es: "Primeras semanas", en: "First weeks", de: "Erste Wochen", pt: "Primeiras semanas" },
    title: { es: "Quien contesta, y la base", en: "Who answers, and the base", de: "Wer antwortet, und die Basis", pt: "Quem responde, e a base" },
    body: {
      es: "Se enciende el turno de WhatsApp conectado a tu inventario — se deja de perder la venta de la madrugada — y en paralelo se ordena y segmenta la base de clientas. Va primero porque es lo que cobra más rápido y no depende de nada más.",
      en: "The WhatsApp shift goes live, wired to your inventory — the 3 a.m. sale stops being lost — and in parallel the customer base is cleaned and segmented. It goes first because it pays back fastest and depends on nothing else.",
      de: "Die WhatsApp-Schicht geht live, verbunden mit deinem Bestand — der Verkauf um drei Uhr nachts geht nicht mehr verloren — und parallel wird die Kundenbasis geordnet und segmentiert. Das kommt zuerst, weil es sich am schnellsten bezahlt macht und von nichts anderem abhängt.",
      pt: "Liga-se o turno de WhatsApp ligado ao teu stock — deixa de se perder a venda da madrugada — e em paralelo ordena-se e segmenta-se a base de clientes. Vai primeiro porque é o que paga mais depressa e não depende de mais nada.",
    },
  },
  {
    when: { es: "Siguiente", en: "Next", de: "Als Nächstes", pt: "A seguir" },
    title: { es: "La página y la ficha", en: "The page and the product listing", de: "Die Seite und die Produktseite", pt: "A página e a ficha" },
    body: {
      es: "La página nueva sobre tu mismo Shopify, para que la clienta vea la prenda en segundos y no en veinte. Y a los productos que hoy tienen una sola foto se les generan las que faltan, partiendo de esa misma.",
      en: "The new page on top of your same Shopify, so the customer sees the piece in seconds, not twenty. And products that have a single photo today get the missing ones generated from that same shot.",
      de: "Die neue Seite auf deinem bestehenden Shopify, damit die Kundin das Teil in Sekunden sieht statt in zwanzig. Und Produkte, die heute nur ein Foto haben, bekommen die fehlenden — generiert aus genau diesem.",
      pt: "A página nova sobre o teu mesmo Shopify, para que a cliente veja a peça em segundos e não em vinte. E aos produtos que hoje têm uma só foto geram-se as que faltam, a partir dessa mesma.",
    },
  },
  {
    when: { es: "Después", en: "Then", de: "Danach", pt: "Depois" },
    title: { es: "Margen, y ahí sí pauta", en: "Margin — and only then, ads", de: "Marge — und erst dann Ads", pt: "Margem, e aí sim anúncios" },
    body: {
      es: "Cuándo meterle pauta no es opinión: son dos números — cuánto cuesta traer una clienta y cuánto deja con el tiempo. Mientras el segundo sea mayor, se pauta; cuando deja de serlo, se para. Por eso va aquí y no antes.",
      en: "When to put money into ads isn't an opinion: it's two numbers — what it costs to bring a customer and what she leaves over time. While the second is bigger, you advertise; when it stops being, you stop. That's why it comes here and not earlier.",
      de: "Wann man Geld in Werbung steckt, ist keine Meinung: es sind zwei Zahlen — was eine Kundin kostet und was sie über die Zeit bringt. Solange die zweite größer ist, wird geworben; wenn nicht mehr, wird gestoppt. Deshalb kommt es hier und nicht früher.",
      pt: "Quando meter dinheiro em anúncios não é opinião: são dois números — quanto custa trazer uma cliente e quanto deixa ao longo do tempo. Enquanto o segundo for maior, anuncia-se; quando deixa de ser, pára-se. Por isso vem aqui e não antes.",
    },
  },
  {
    when: { es: "Cuando la caja lo permita", en: "When cash allows", de: "Wenn die Kasse es zulässt", pt: "Quando a caixa o permitir" },
    title: { es: "Mercados nuevos", en: "New markets", de: "Neue Märkte", pt: "Mercados novos" },
    body: {
      es: "Un mercado a la vez, con presupuesto chico, y solo si convierte se invierte en serio. Monza Lab tiene entidad en Estados Unidos y el cobro internacional ya está resuelto con otra marca colombiana de moda.",
      en: "One market at a time, on a small budget, and only if it converts do you invest seriously. Monza Lab has a US entity, and international payments are already solved for another Colombian fashion brand.",
      de: "Ein Markt nach dem anderen, mit kleinem Budget — und nur wenn er konvertiert, wird ernsthaft investiert. Monza Lab hat eine US-Gesellschaft, und das internationale Bezahlen ist für eine andere kolumbianische Modemarke bereits gelöst.",
      pt: "Um mercado de cada vez, com orçamento pequeno, e só se converter se investe a sério. A Monza Lab tem entidade nos Estados Unidos e a cobrança internacional já está resolvida com outra marca colombiana de moda.",
    },
  },
];

const PHASE_BUILD: LT[] = [
  { es: "La página, sobre tu mismo Shopify.", en: "The page, on your same Shopify.", de: "Die Seite, auf deinem bestehenden Shopify.", pt: "A página, sobre o teu mesmo Shopify." },
  { es: "La operación, montada y entrenada.", en: "The operation, set up and trained.", de: "Der Betrieb, aufgebaut und trainiert.", pt: "A operação, montada e treinada." },
  { es: "La base de clientas ordenada, con los flujos corriendo.", en: "The customer base cleaned, with flows running.", de: "Die Kundenbasis geordnet, mit laufenden Flows.", pt: "A base de clientes ordenada, com os fluxos a correr." },
  {
    es: "El criterio escrito: a quién se le habla, cuándo, con qué voz y con qué números se decide.",
    en: "The judgment, written down: who gets spoken to, when, in what voice and with which numbers decisions get made.",
    de: "Das Urteil, schriftlich: wer angesprochen wird, wann, mit welcher Stimme und mit welchen Zahlen entschieden wird.",
    pt: "O critério escrito: a quem se fala, quando, com que voz e com que números se decide.",
  },
  { es: "El tablero.", en: "The dashboard.", de: "Das Dashboard.", pt: "O painel." },
  { es: "La primera campaña de contenido, con tu regla de imagen.", en: "The first content campaign, under your image rule.", de: "Die erste Content-Kampagne, nach deiner Bildregel.", pt: "A primeira campanha de conteúdo, com a tua regra de imagem." },
];

const PHASE_RUN: LT[] = [
  {
    es: "La pauta la corremos nosotros — campañas, creativos y la decisión de escalar o parar, con los números del negocio.",
    en: "We run the ads — campaigns, creatives and the call to scale or stop, on the business's numbers.",
    de: "Die Ads fahren wir — Kampagnen, Creatives und die Entscheidung, zu skalieren oder zu stoppen, anhand der Geschäftszahlen.",
    pt: "Os anúncios corremos nós — campanhas, criativos e a decisão de escalar ou parar, com os números do negócio.",
  },
  {
    es: "Funcionalidades nuevas cada mes: el sistema aprende de tus conversaciones y ventas reales.",
    en: "New capabilities every month: the system learns from your real conversations and sales.",
    de: "Neue Funktionen jeden Monat: das System lernt aus deinen echten Gesprächen und Verkäufen.",
    pt: "Funcionalidades novas todos os meses: o sistema aprende com as tuas conversas e vendas reais.",
  },
  {
    es: "La página viva: cambios, lanzamientos y páginas nuevas sin cotizar cada cosa.",
    en: "The page, alive: changes, launches and new pages without a quote for each.",
    de: "Die Seite bleibt lebendig: Änderungen, Launches und neue Seiten ohne Einzelangebot.",
    pt: "A página viva: alterações, lançamentos e páginas novas sem orçamentar cada coisa.",
  },
  {
    es: "Contenido generado con el sistema de imagen a partir de tus fotos.",
    en: "Content generated with the image system from your photos.",
    de: "Content, generiert mit dem Bildsystem aus deinen Fotos.",
    pt: "Conteúdo gerado com o sistema de imagem a partir das tuas fotos.",
  },
  {
    es: "Soporte directo por WhatsApp, sin ejecutivo de cuenta en el medio.",
    en: "Direct support over WhatsApp, no account manager in between.",
    de: "Direkter Support per WhatsApp, ohne Account-Manager dazwischen.",
    pt: "Suporte direto por WhatsApp, sem gestor de conta pelo meio.",
  },
  {
    es: "Una lectura semanal del tablero para decidir el mes siguiente.",
    en: "A weekly read of the dashboard to decide the next month.",
    de: "Ein wöchentlicher Blick aufs Dashboard, um den nächsten Monat zu entscheiden.",
    pt: "Uma leitura semanal do painel para decidir o mês seguinte.",
  },
];

const OWNERSHIP: LT[] = [
  {
    es: "La cuenta de WhatsApp Business queda a nombre de tu marca, en tu portafolio de Meta. Nosotros la operamos con un usuario de sistema. Si Meta algún día nos bloquea a nosotros, tu línea sigue viva.",
    en: "The WhatsApp Business account stays in your brand's name, in your Meta portfolio. We operate it with a system user. If Meta ever blocks us, your line stays alive.",
    de: "Der WhatsApp-Business-Account bleibt auf den Namen deiner Marke, in deinem Meta-Portfolio. Wir betreiben ihn mit einem Systemnutzer. Sollte Meta uns eines Tages sperren, bleibt deine Leitung am Leben.",
    pt: "A conta de WhatsApp Business fica em nome da tua marca, no teu portefólio de Meta. Nós operamo-la com um utilizador de sistema. Se um dia a Meta nos bloquear a nós, a tua linha continua viva.",
  },
  {
    es: "La página, la base y el tablero, a tu nombre y con tus accesos desde el día uno. La base vive en una herramienta estándar, justamente para que te la puedas llevar.",
    en: "The page, the base and the dashboard, in your name and with your access from day one. The base lives in a standard tool precisely so you can take it with you.",
    de: "Seite, Basis und Dashboard laufen ab Tag eins auf deinen Namen und mit deinen Zugängen. Die Basis liegt in einem Standardwerkzeug — genau damit du sie mitnehmen kannst.",
    pt: "A página, a base e o painel, em teu nome e com os teus acessos desde o primeiro dia. A base vive numa ferramenta padrão, justamente para que a possas levar.",
  },
  {
    es: "El criterio queda escrito: las reglas de quien contesta, la voz de la marca y la lógica de segmentación son tuyas. No viven en nuestra cabeza.",
    en: "The judgment is written down: the rules of who answers, the brand's voice and the segmentation logic are yours. They don't live in our heads.",
    de: "Das Urteil ist schriftlich: die Regeln dessen, der antwortet, die Markenstimme und die Segmentierungslogik gehören dir. Sie leben nicht in unseren Köpfen.",
    pt: "O critério fica escrito: as regras de quem responde, a voz da marca e a lógica de segmentação são tuas. Não vivem na nossa cabeça.",
  },
  {
    es: "Sin permanencia. La construcción tiene fecha de entrega; la operación es mes a mes, con un mes de aviso. Nos quedamos porque funciona, no porque firmaste.",
    en: "No lock-in. Construction has a delivery date; operation is month to month, with a month's notice. We stay because it works, not because you signed.",
    de: "Keine Bindung. Der Aufbau hat einen Liefertermin; der Betrieb läuft monatlich, mit einem Monat Kündigungsfrist. Wir bleiben, weil es funktioniert — nicht, weil du unterschrieben hast.",
    pt: "Sem permanência. A construção tem data de entrega; a operação é mês a mês, com um mês de aviso. Ficamos porque funciona, não porque assinaste.",
  },
];

const PlanAndModel = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "EL ORDEN Y EL MODELO", en: "THE ORDER AND THE MODEL", de: "REIHENFOLGE UND MODELL", pt: "A ORDEM E O MODELO" };
  const head: LT = {
    es: "Qué primero, y por qué en ese orden.",
    en: "What comes first, and why in that order.",
    de: "Was zuerst kommt — und warum in dieser Reihenfolge.",
    pt: "O que primeiro, e porquê nessa ordem.",
  };
  const intro: LT = {
    es: "No se hace todo el mes uno. Primero lo que empieza a devolver plata, y esa plata paga lo siguiente.",
    en: "Not everything happens in month one. First what starts paying back — and that money pays for what comes next.",
    de: "Nicht alles passiert im ersten Monat. Zuerst das, was anfängt, Geld zurückzubringen — und dieses Geld bezahlt das Nächste.",
    pt: "Não se faz tudo no mês um. Primeiro o que começa a devolver dinheiro, e esse dinheiro paga o seguinte.",
  };
  const modelHead: LT = {
    es: "Se construye con fecha de entrega. Se opera mes a mes.",
    en: "Built with a delivery date. Operated month by month.",
    de: "Gebaut mit Liefertermin. Betrieben Monat für Monat.",
    pt: "Constrói-se com data de entrega. Opera-se mês a mês.",
  };
  const buildLabel: LT = { es: "Fase 1 · Construcción", en: "Phase 1 · Construction", de: "Phase 1 · Aufbau", pt: "Fase 1 · Construção" };
  const buildSub: LT = { es: "Se entrega y queda hecho", en: "Delivered, and done", de: "Wird geliefert und ist erledigt", pt: "Entrega-se e fica feito" };
  const runLabel: LT = { es: "Fase 2 · Operación", en: "Phase 2 · Operation", de: "Phase 2 · Betrieb", pt: "Fase 2 · Operação" };
  const runSub: LT = { es: "Todos los meses, sin cotizar aparte", en: "Every month, no separate quotes", de: "Jeden Monat, ohne Einzelangebot", pt: "Todos os meses, sem orçamentar à parte" };
  const payShape: LT = {
    es: "La construcción se paga como trabajo con fecha de entrega. En la operación, el fijo baja y parte de lo nuestro queda atado a lo que venda el sistema — solo a lo que pasa por lo que construimos, no a lo que la marca ya trae. Si el sistema no vende, ese porcentaje es cero. El número exacto se cierra con Edgar en la primera conversación.",
    en: "Construction is paid as work with a delivery date. In operation, the fixed fee comes down and part of our pay is tied to what the system sells — only what passes through what we built, not what the brand already brings in. If the system sells nothing, that percentage is zero. The exact number is settled with Edgar in the first conversation.",
    de: "Der Aufbau wird als Arbeit mit Liefertermin bezahlt. Im Betrieb sinkt die Pauschale, und ein Teil unserer Vergütung hängt daran, was das System verkauft — nur an dem, was durch das läuft, was wir gebaut haben, nicht an dem, was die Marke ohnehin bringt. Verkauft das System nichts, ist dieser Anteil null. Die genaue Zahl wird mit Edgar im ersten Gespräch festgelegt.",
    pt: "A construção paga-se como trabalho com data de entrega. Na operação, o fixo baixa e parte do nosso fica atado ao que o sistema vender — só ao que passa pelo que construímos, não ao que a marca já traz. Se o sistema não vender, essa percentagem é zero. O número exato fecha-se com o Edgar na primeira conversa.",
  };
  const ownHead: LT = { es: "De quién queda cada cosa", en: "Who owns what", de: "Wem was gehört", pt: "De quem fica cada coisa" };
  const ownSub: LT = { es: "Todo, tuyo. Nosotros lo operamos.", en: "All of it, yours. We operate it.", de: "Alles deins. Wir betreiben es.", pt: "Tudo teu. Nós operamos." };
  const ctaAgent: LT = {
    es: "Hablemos del sistema para tu marca",
    en: "Let's talk about the system for your brand",
    de: "Sprechen wir über das System für deine Marke",
    pt: "Falemos do sistema para a tua marca",
  };
  const ctaWa: LT = { es: "WhatsApp directo", en: "Direct WhatsApp", de: "Direkt per WhatsApp", pt: "WhatsApp direto" };
  const waMsg: LT = {
    es: "Hola Edgar — vi el sistema de Monza Studio en monzalab.com y quiero hablar de mi marca.",
    en: "Hi Edgar — I saw the Monza Studio system on monzalab.com and want to talk about my brand.",
    de: "Hallo Edgar — ich habe das Monza-Studio-System auf monzalab.com gesehen und möchte über meine Marke sprechen.",
    pt: "Olá Edgar — vi o sistema da Monza Studio em monzalab.com e quero falar da minha marca.",
  };

  const List = ({ items }: { items: LT[] }) => (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 font-clash text-[14px] md:text-[15px] leading-relaxed" style={{ color: "rgba(var(--text-rgb), 0.62)" }}>
          <span aria-hidden className="mt-[0.55em] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
          <span>{t(it, lang)}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <Section className="py-24 md:py-32" id="plan">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-6"
          style={{
            fontSize: "clamp(28px, 4.4vw, 56px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p className="font-clash text-base md:text-lg max-w-3xl leading-relaxed mb-14 md:mb-20" style={{ color: "rgba(var(--text-rgb), 0.6)" }}>
          {t(intro, lang)}
        </p>

        {/* El orden */}
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {PLAN.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="rounded-2xl p-6 md:p-7 flex flex-col"
              style={{ background: "rgba(var(--text-rgb), 0.02)", border: "1px solid rgba(var(--text-rgb), 0.06)" }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-4">
                <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: `${ACCENT}80` }}>
                  0{i + 1}
                </span>
                <span className="font-clash text-[10px] tracking-[0.2em] uppercase font-medium text-right" style={{ color: "rgba(var(--text-rgb), 0.4)" }}>
                  {t(p.when, lang)}
                </span>
              </div>
              <h3 className="font-clash font-bold text-xl md:text-2xl mb-3" style={{ letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}>
                {t(p.title, lang)}
              </h3>
              <p className="font-clash text-[14px] md:text-[15px] leading-relaxed" style={{ color: "rgba(var(--text-rgb), 0.58)" }}>
                {t(p.body, lang)}
              </p>
            </motion.li>
          ))}
        </ol>

        {/* El modelo — dos fases, sin cifras */}
        <div className="mt-16 md:mt-24">
          <h3
            className="font-clash font-bold leading-[1.08] mb-8 md:mb-10"
            style={{ fontSize: "clamp(24px, 3.2vw, 40px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}
          >
            {t(modelHead, lang)}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
            <div className="rounded-2xl p-7 md:p-9" style={{ background: "rgba(var(--text-rgb), 0.02)", border: "1px solid rgba(var(--text-rgb), 0.06)" }}>
              <p className="font-clash text-[10px] tracking-[0.3em] uppercase font-medium mb-1" style={{ color: ACCENT }}>
                {t(buildLabel, lang)}
              </p>
              <p className="font-clash text-[13px] mb-6" style={{ color: "rgba(var(--text-rgb), 0.45)" }}>
                {t(buildSub, lang)}
              </p>
              <List items={PHASE_BUILD} />
            </div>
            <div className="rounded-2xl p-7 md:p-9" style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}38` }}>
              <p className="font-clash text-[10px] tracking-[0.3em] uppercase font-medium mb-1" style={{ color: ACCENT }}>
                {t(runLabel, lang)}
              </p>
              <p className="font-clash text-[13px] mb-6" style={{ color: "rgba(var(--text-rgb), 0.45)" }}>
                {t(runSub, lang)}
              </p>
              <List items={PHASE_RUN} />
            </div>
          </div>
          <p className="font-clash text-[14px] md:text-[15px] leading-relaxed max-w-3xl mt-6" style={{ color: "rgba(var(--text-rgb), 0.55)" }}>
            {t(payShape, lang)}
          </p>
        </div>

        {/* De quién queda cada cosa */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-6 lg:gap-12">
          <div>
            <h3 className="font-clash font-bold leading-[1.08] mb-3" style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.02em", color: "rgba(var(--text-rgb), 0.92)" }}>
              {t(ownHead, lang)}
            </h3>
            <p className="font-clash text-base" style={{ color: `${ACCENT}` }}>
              {t(ownSub, lang)}
            </p>
          </div>
          <List items={OWNERSHIP} />
        </div>

        {/* CTA */}
        <div className="mt-14 md:mt-20 flex flex-col sm:flex-row gap-3 sm:items-center">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("monza:open-agent"))}
            className="font-clash font-semibold text-sm tracking-[0.05em] px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "#F8B4D9", color: "#0B0B10" }}
          >
            {t(ctaAgent, lang)} →
          </button>
          <a
            href={whatsAppUrl(t(waMsg, lang))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("whatsapp", "monzastudio-sistema")}
            className="font-clash font-medium text-sm tracking-[0.05em] px-7 py-3.5 rounded-full transition-all duration-300 hover:opacity-80"
            style={{ border: "1px solid rgba(var(--text-rgb), 0.18)", color: "rgba(var(--text-rgb), 0.85)" }}
          >
            {t(ctaWa, lang)}
          </a>
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   GLOBAL SHOOT INFRASTRUCTURE — videos BTS
   ────────────────────────────────────────── */
const SHOOT_VIDEOS = [
  "/videos/reel/IMG_8331.mp4",
  "/videos/reel/IMG_8737.mp4",
  "/videos/reel/IMG_3633.mp4",
  "/videos/reel/IMG_3593.mp4",
  "/videos/reel/IMG_3811.mp4",
  "/videos/reel/IMG_0080.mp4",
];

const ShootInfrastructure = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = {
    es: "INFRAESTRUCTURA GLOBAL DE SHOOTS",
    en: "GLOBAL SHOOT INFRASTRUCTURE",
    de: "GLOBALE SHOOT-INFRASTRUKTUR", pt: "INFRAESTRUCTURA GLOBAL DE SHOOTS",
  };
  const head: LT = {
    es: "Fotógrafos en cualquier ciudad. Sin viajar.",
    en: "Photographers in any city. Without traveling.",
    de: "Fotografen in jeder Stadt. Ohne zu reisen.", pt: "Fotógrafos en cualquier ciudad. Sin viajar.",
  };
  const body: LT = {
    es: "Trabajo con una red de fotógrafos y videógrafos en Europa, Estados Unidos y Japón — en las ciudades principales. Una marca que opera global no puede esperar al avión: hago shoot donde la audiencia está, con dirección creativa remota, en una semana.",
    en: "I work with a network of photographers and videographers across Europe, the US and Japan — in the main cities. A brand operating globally can't wait for a flight: I shoot where the audience is, with remote creative direction, in a week.",
    de: "Ich arbeite mit einem Netzwerk aus Fotografen und Videografen in Europa, den USA und Japan — in den Hauptstädten. Eine global operierende Marke kann nicht aufs Flugzeug warten: Ich produziere dort, wo die Audience ist, mit Fern-Kreativdirektion, in einer Woche.", pt: "Trabajo con una red de fotógrafos y videógrafos en Europa, Estados Unidos y Japón — en las ciudades principales. Una marca que opera global no puede esperar al avión: hago shoot donde la audiencia está, con dirección creativa remota, en una semana.",
  };
  const cities: LT = {
    es: "EUROPA · ESTADOS UNIDOS · JAPÓN — EN LAS CIUDADES PRINCIPALES",
    en: "EUROPE · UNITED STATES · JAPAN — IN THE MAIN CITIES",
    de: "EUROPA · USA · JAPAN — IN DEN HAUPTSTÄDTEN", pt: "EUROPA · ESTADOS UNIDOS · JAPÓN — EN LAS CIUDADES PRINCIPALES",
  };

  return (
    <Section className="py-24 md:py-32" id="shoots">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-6 max-w-3xl"
          style={{
            fontSize: "clamp(28px, 4.4vw, 56px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p
          className="font-clash text-base md:text-lg max-w-3xl leading-relaxed mb-10"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {t(body, lang)}
        </p>
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-medium mb-12 md:mb-16"
          style={{ color: `${ACCENT}99` }}
        >
          {t(cities, lang)}
        </p>

        {/* Video grid — 3 cols desktop, 2 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {SHOOT_VIDEOS.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden group"
              style={{ border: `1px solid ${ACCENT}1f` }}
            >
              <LazyShootVideo src={src} className="w-full h-full" />
              {/* Subtle vignette + index */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.55) 100%)",
                }}
                aria-hidden
              />
              <span
                className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.2em] pointer-events-none"
                style={{ color: `${ACCENT}cc` }}
              >
                0{i + 1}
              </span>
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 80px -10px ${ACCENT}30` }}
                aria-hidden
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   FLAGSHIP — Eleonora Morales (case detallado)
   ────────────────────────────────────────── */
const ELEONORA_BLOCKS: { label: LT; detail: LT }[] = [
  {
    label: { es: "E-commerce Shopify", en: "Shopify E-commerce", de: "Shopify E-Commerce", pt: "E-commerce Shopify" },
    detail: {
      es: "Storefront API custom. 4 mundos en una sola tienda: Garage Sale (vintage), Luxe (deadstock colombiano), Mundo Lujo (investment), Parisienne (contemporáneo).",
      en: "Custom Storefront API. 4 worlds in one store: Garage Sale (vintage), Luxe (Colombian deadstock), Mundo Lujo (investment), Parisienne (contemporary).",
      de: "Custom Storefront API. 4 Welten in einem Store: Garage Sale (Vintage), Luxe (kolumbianischer Deadstock), Mundo Lujo (Investment), Parisienne (Contemporary).", pt: "Storefront API custom. 4 mundos en una sola tienda: Garage Sale (vintage), Luxe (deadstock colombiano), Mundo Lujo (investment), Parisienne (contemporáneo).",
    },
  },
  {
    label: { es: "Content Engine", en: "Content Engine", de: "Content Engine", pt: "Content Engine" },
    detail: {
      es: "Pipeline IA para editorials, carouseles de IG, reels y posts diarios. Conectado al calendario editorial.",
      en: "AI pipeline for editorials, IG carousels, reels and daily posts. Connected to the editorial calendar.",
      de: "KI-Pipeline für Editorials, IG-Karussells, Reels und tägliche Posts. An den redaktionellen Kalender angebunden.", pt: "Pipeline IA para editorials, carouseles de IG, reels y posts diarios. Conectado al calendario editorial.",
    },
  },
  {
    label: { es: "Drops & Waitlist", en: "Drops & Waitlist", de: "Drops & Waitlist", pt: "Drops & Waitlist" },
    detail: {
      es: "Sistema 'Coming Soon' para anticipación controlada de pieces nuevas. Gatekeeping editorial para la comunidad fashion.",
      en: "‘Coming Soon’ system for controlled anticipation on new pieces. Editorial gatekeeping for the fashion community.",
      de: "‚Coming Soon‘-System für kontrollierte Vorfreude auf neue Pieces. Editoriales Gatekeeping für die Fashion-Community.", pt: "Sistema 'Coming Soon' para anticipación controlada de pieces nuevas. Gatekeeping editorial para la comunidad fashion.",
    },
  },
  {
    label: { es: "Klaviyo Automatizado", en: "Klaviyo Automation", de: "Klaviyo-Automation", pt: "Klaviyo Automatizado" },
    detail: {
      es: "Flows de email/SMS conectados a la base de datos del e-commerce. Segmentación por mundo, comportamiento y cohorte.",
      en: "Email/SMS flows wired to the e-commerce database. Segmentation by world, behaviour and cohort.",
      de: "E-Mail/SMS-Flows, an die E-Commerce-Datenbank angebunden. Segmentierung nach Welt, Verhalten und Kohorte.", pt: "Flows de email/SMS conectados a la base de datos del e-commerce. Segmentación por mundo, comportamiento y cohorte.",
    },
  },
  {
    label: { es: "Brand System", en: "Brand System", de: "Brand-System", pt: "Brand System" },
    detail: {
      es: "Identidad completa, sistema visual y manual de marca interactivo. Voz editorial consistente entre los 4 mundos.",
      en: "Full identity, visual system and interactive brand manual. Editorial voice consistent across the 4 worlds.",
      de: "Komplette Identität, visuelles System und interaktives Brand Manual. Redaktionelle Stimme konsistent über die 4 Welten.", pt: "Identidad completa, sistema visual y manual de marca interactivo. Voz editorial consistente entre los 4 mundos.",
    },
  },
  {
    label: { es: "Casco · Cápsula collab", en: "Helmet · Capsule Collab", de: "Helm · Kapsel-Collab", pt: "Casco · Cápsula collab" },
    detail: {
      es: "Cápsula limited Eleonora × Monza Studio: el casco rosa metálico — pieza física que sella la collab y vive como halo de la marca.",
      en: "Limited capsule Eleonora × Monza Studio: the rose-gold helmet — physical piece that seals the collab and lives as a halo for the brand.",
      de: "Limitierte Kapsel Eleonora × Monza Studio: der roségoldene Helm — physisches Stück, das die Collab besiegelt und als Halo der Marke dient.", pt: "Cápsula limited Eleonora × Monza Studio: el casco rosa metálico — pieza física que sella la collab y vive como halo de la marca.",
    },
  },
];

const ELEONORA_GALLERY = [
  "/images/brands/eleonora/gallery/eleonora-1.jpeg",
  "/images/brands/eleonora/casco-eleonora.png",
  "/images/brands/eleonora/gallery/eleonora-7.jpeg",
  "/images/brands/eleonora/casco-neon.png",
  "/images/brands/eleonora/gallery/eleonora-12.jpeg",
  "/images/brands/eleonora/gallery/eleonora-8.jpeg",
];

const FlagshipEleonora = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "CASO FLAGSHIP", en: "FLAGSHIP CASE", de: "FLAGSHIP-CASE", pt: "CASO FLAGSHIP" };
  const tagline: LT = { es: "La Moda es Magia", en: "La Moda es Magia", de: "La Moda es Magia", pt: "La Moda es Magia" };
  const subtitle: LT = {
    es: "Lujo circular · Colombia · 4 mundos · live e-commerce",
    en: "Circular luxury · Colombia · 4 worlds · live e-commerce",
    de: "Zirkulärer Luxus · Kolumbien · 4 Welten · Live-E-Commerce", pt: "Lujo circular · Colombia · 4 mundos · live e-commerce",
  };
  const story: LT = {
    es: "Construimos el ecosistema digital desde cero — branding, e-commerce con 4 mundos, pipeline de contenido y automatizaciones. Hoy Eleonora opera 350K+ seguidores y un e-commerce activo bajo una sola sombrilla.",
    en: "We built the digital ecosystem from scratch — branding, 4-world e-commerce, content pipeline and automations. Today Eleonora operates 350K+ followers and a live e-commerce under a single umbrella.",
    de: "Wir haben das digitale Ökosystem von Grund auf gebaut — Branding, 4-Welten-E-Commerce, Content-Pipeline und Automationen. Heute betreibt Eleonora 350K+ Follower und einen Live-E-Commerce unter einem Dach.", pt: "Construimos el ecosistema digital desde cero — branding, e-commerce con 4 mundos, pipeline de contenido y automatizaciones. Hoy Eleonora opera 350K+ seguidores y un e-commerce activo bajo una sola sombrilla.",
  };
  const buildLabel: LT = { es: "CONSTRUCCIÓN", en: "CONSTRUCTION", de: "AUFBAU", pt: "CONSTRUCCIÓN" };
  const proofLabel: LT = { es: "EL OUTPUT", en: "THE OUTPUT", de: "DAS ERGEBNIS", pt: "EL OUTPUT" };
  const cta: LT = {
    es: "Ver eleonoramorales.com",
    en: "Visit eleonoramorales.com",
    de: "Besuche eleonoramorales.com", pt: "Ver eleonoramorales.com",
  };
  const press: LT = {
    es: "Vogue · El Espectador · Forbes",
    en: "Vogue · El Espectador · Forbes",
    de: "Vogue · El Espectador · Forbes", pt: "Vogue · El Espectador · Forbes",
  };

  return (
    <Section className="py-24 md:py-36" id="eleonora">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Header */}
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `${ACCENT}b3` }}
        >
          {t(eyebrow, lang)}
        </p>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="md:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${ACCENT}33`,
              boxShadow: `0 30px 80px -30px ${ACCENT}33`,
            }}
          >
            <img
              src="/images/brands/eleonora/eleonora-portrait.jpg"
              alt="Eleonora Morales — portrait"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            <div className="absolute bottom-5 left-5 right-5">
              <p
                className="font-clash text-[9px] tracking-[0.3em] uppercase mb-2"
                style={{ color: `${ACCENT}cc` }}
              >
                ELEONORA MORALES
              </p>
              <p
                className="font-mono text-[10px]"
                style={{ color: "rgba(255,252,247,0.55)" }}
              >
                {t(press, lang)}
              </p>
            </div>
          </motion.div>

          {/* Copy */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <h2
              className="font-clash font-bold leading-[1.05] mb-3"
              style={{
                fontSize: "clamp(36px, 5.5vw, 72px)",
                letterSpacing: "-0.025em",
                color: "rgba(var(--text-rgb), 0.92)",
              }}
            >
              {t(tagline, lang)}
            </h2>
            <p
              className="font-clash text-sm md:text-base mb-6"
              style={{ color: `${ACCENT}cc`, letterSpacing: "0.02em" }}
            >
              {t(subtitle, lang)}
            </p>
            <p
              className="font-clash text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
              style={{ color: "rgba(var(--text-rgb), 0.65)" }}
            >
              {t(story, lang)}
            </p>
            <a
              href="https://www.eleonoramorales.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-clash text-xs tracking-[0.25em] uppercase font-medium self-start py-3 px-5 rounded-full transition-all duration-300"
              style={{
                color: ACCENT,
                border: `1px solid ${ACCENT}55`,
                background: `${ACCENT}10`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${ACCENT}25`;
                e.currentTarget.style.borderColor = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${ACCENT}10`;
                e.currentTarget.style.borderColor = `${ACCENT}55`;
              }}
            >
              {t(cta, lang)} <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        {/* Construction blocks */}
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `rgba(var(--text-rgb), 0.4)` }}
        >
          {t(buildLabel, lang)}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16 md:mb-20">
          {ELEONORA_BLOCKS.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-xl p-6"
              style={{
                background: "rgba(var(--text-rgb), 0.025)",
                border: "1px solid rgba(var(--text-rgb), 0.06)",
              }}
            >
              <p
                className="font-clash text-[10px] tracking-[0.3em] uppercase font-bold mb-3"
                style={{ color: ACCENT }}
              >
                {t(b.label, lang)}
              </p>
              <p
                className="font-clash text-[14px] leading-relaxed"
                style={{ color: "rgba(var(--text-rgb), 0.6)" }}
              >
                {t(b.detail, lang)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Output gallery */}
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `rgba(var(--text-rgb), 0.4)` }}
        >
          {t(proofLabel, lang)}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {ELEONORA_GALLERY.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden group"
              style={{ border: "1px solid rgba(var(--text-rgb), 0.06)" }}
            >
              <img
                src={src}
                alt={`Eleonora editorial ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   12-WEEK PROGRAM — Consultoras Boutique 1:1
   Caso flagship: Musgo (Juanita López)
   ────────────────────────────────────────── */
type Phase = { num: string; weeks: LT; label: LT; detail: LT };

const PROGRAM_PHASES: Phase[] = [
  {
    num: "01",
    weeks: { es: "Semanas 1–4", en: "Weeks 1–4", de: "Wochen 1–4", pt: "Semanas 1–4" },
    label: { es: "Foundations", en: "Foundations", de: "Foundations", pt: "Foundations" },
    detail: {
      es: "Discovery 1:1, posicionamiento, tesis de la consultora, modelo de negocio y pricing. Salimos con la hoja de ruta de los próximos 8 semanas.",
      en: "1:1 discovery, positioning, consultancy thesis, business model and pricing. We leave with the roadmap for the next 8 weeks.",
      de: "1:1 Discovery, Positionierung, Beratungs-These, Geschäftsmodell und Pricing. Wir verlassen die Phase mit der Roadmap für die nächsten 8 Wochen.", pt: "Discovery 1:1, posicionamiento, tesis de la consultora, modelo de negocio y pricing. Salimos con la hoja de ruta de los próximos 8 semanas.",
    },
  },
  {
    num: "02",
    weeks: { es: "Semanas 5–8", en: "Weeks 5–8", de: "Wochen 5–8", pt: "Semanas 5–8" },
    label: { es: "Brand & Product", en: "Brand & Product", de: "Brand & Produkt", pt: "Brand & Product" },
    detail: {
      es: "Identidad completa, sistema visual, manual, web propia y arquitectura de servicios. La consultora se vuelve tangible.",
      en: "Full identity, visual system, brand manual, dedicated website and service architecture. The consultancy becomes tangible.",
      de: "Komplette Identität, visuelles System, Manual, eigene Website und Service-Architektur. Die Beratung wird greifbar.", pt: "Identidad completa, sistema visual, manual, web propia y arquitectura de servicios. La consultora se vuelve tangible.",
    },
  },
  {
    num: "03",
    weeks: { es: "Semanas 9–12", en: "Weeks 9–12", de: "Wochen 9–12", pt: "Semanas 9–12" },
    label: { es: "Launch & Operate", en: "Launch & Operate", de: "Launch & Operate", pt: "Launch & Operate" },
    detail: {
      es: "Lanzamiento público, motor de contenido, primeros clientes y operación lista para correr sola. La consultora opera en loop sin Edgar.",
      en: "Public launch, content engine, first clients and operation ready to run on its own. The consultancy operates in loop without Edgar.",
      de: "Öffentlicher Launch, Content-Engine, erste Klienten und Operation läuft eigenständig. Die Beratung operiert im Loop ohne Edgar.", pt: "Lanzamiento público, motor de contenido, primeros clientes y operación lista para correr sola. La consultora opera en loop sin Edgar.",
    },
  },
];

const ProgramFlagship = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = {
    es: "1:1 PROGRAM · 12 SEMANAS",
    en: "1:1 PROGRAM · 12 WEEKS",
    de: "1:1 PROGRAMM · 12 WOCHEN", pt: "1:1 PROGRAM · 12 SEMANAS",
  };
  const head: LT = {
    es: "Consultoras boutique en doce semanas.",
    en: "Boutique consultancies in twelve weeks.",
    de: "Boutique-Beratungen in zwölf Wochen.", pt: "Consultoras boutique en doce semanas.",
  };
  const body: LT = {
    es: "Un programa 1:1 para fundadores que quieren montar su consultora boutique como un sistema, no como una freelance personal. Branding, web, modelo, contenido y go-to-market — entregados como operación, lista para escalar.",
    en: "A 1:1 program for founders who want to build their boutique consultancy as a system, not as a personal freelance. Branding, web, model, content and go-to-market — delivered as an operation, ready to scale.",
    de: "Ein 1:1-Programm für Gründer, die ihre Boutique-Beratung als System aufbauen wollen — nicht als persönliche Freelance. Branding, Web, Modell, Content und Go-to-Market — als Operation geliefert, bereit zu skalieren.", pt: "Un programa 1:1 para fundadores que quieren montar su consultora boutique como un sistema, no como una freelance personal. Branding, web, modelo, contenido y go-to-market — entregados como operación, lista para escalar.",
  };
  const phasesLabel: LT = {
    es: "ESTRUCTURA",
    en: "STRUCTURE",
    de: "STRUKTUR", pt: "ESTRUCTURA",
  };
  const caseLabel: LT = {
    es: "CASO FLAGSHIP",
    en: "FLAGSHIP CASE",
    de: "FLAGSHIP CASE", pt: "CASO FLAGSHIP",
  };
  const caseHead: LT = {
    es: "Musgo · Juanita López",
    en: "Musgo · Juanita López",
    de: "Musgo · Juanita López", pt: "Musgo · Juanita López",
  };
  const caseSub: LT = {
    es: "Transiciones regenerativas · Bogotá",
    en: "Regenerative transitions · Bogotá",
    de: "Regenerative Übergänge · Bogotá", pt: "Transiciones regenerativas · Bogotá",
  };
  const caseStory: LT = {
    es: "Construimos Musgo desde cero — la consultora boutique de Juanita López sobre transiciones regenerativas. En 12 semanas pasamos del concepto a una operación con identidad, web, contenido y primer pipeline de clientes. Sin equipo. Sin agencia tradicional.",
    en: "We built Musgo from scratch — Juanita López's boutique consultancy on regenerative transitions. In 12 weeks we went from concept to a running operation with identity, web, content and first client pipeline. No team. No traditional agency.",
    de: "Wir haben Musgo von Grund auf gebaut — die Boutique-Beratung von Juanita López zu regenerativen Übergängen. In 12 Wochen vom Konzept zu einer laufenden Operation mit Identität, Website, Content und ersten Kunden-Pipeline. Ohne Team. Ohne klassische Agentur.", pt: "Construimos Musgo desde cero — la consultora boutique de Juanita López sobre transiciones regenerativas. En 12 semanas pasamos del concepto a una operación con identidad, web, contenido y primer pipeline de clientes. Sin equipo. Sin agencia tradicional.",
  };
  const cta: LT = {
    es: "Aplicar al programa",
    en: "Apply to the program",
    de: "Zum Programm bewerben", pt: "Aplicar al programa",
  };

  const PROGRAM_ACCENT = "#7fb878";

  return (
    <Section className="py-24 md:py-36" id="program">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Header */}
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `${PROGRAM_ACCENT}cc` }}
        >
          {t(eyebrow, lang)}
        </p>
        <h2
          className="font-clash font-bold leading-[1.05] mb-6 max-w-3xl"
          style={{
            fontSize: "clamp(28px, 4.4vw, 56px)",
            letterSpacing: "-0.025em",
            color: "rgba(var(--text-rgb), 0.92)",
          }}
        >
          {t(head, lang)}
        </h2>
        <p
          className="font-clash text-base md:text-lg max-w-3xl leading-relaxed mb-14 md:mb-20"
          style={{ color: "rgba(var(--text-rgb), 0.6)" }}
        >
          {t(body, lang)}
        </p>

        {/* 3 phases */}
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `rgba(var(--text-rgb), 0.4)` }}
        >
          {t(phasesLabel, lang)}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-16 md:mb-20">
          {PROGRAM_PHASES.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl p-7 md:p-8 relative"
              style={{
                background: "rgba(var(--text-rgb), 0.025)",
                border: `1px solid ${PROGRAM_ACCENT}1a`,
              }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-5">
                <span
                  className="font-mono text-[11px] tracking-[0.25em]"
                  style={{ color: `${PROGRAM_ACCENT}cc` }}
                >
                  {p.num}
                </span>
                <span
                  className="font-clash text-[10px] tracking-[0.25em] uppercase font-medium"
                  style={{ color: `rgba(var(--text-rgb), 0.45)` }}
                >
                  {t(p.weeks, lang)}
                </span>
              </div>
              <h3
                className="font-clash font-bold text-xl md:text-2xl mb-3"
                style={{
                  letterSpacing: "-0.02em",
                  color: "rgba(var(--text-rgb), 0.92)",
                }}
              >
                {t(p.label, lang)}
              </h3>
              <p
                className="font-clash text-[14px] md:text-[15px] leading-relaxed"
                style={{ color: "rgba(var(--text-rgb), 0.6)" }}
              >
                {t(p.detail, lang)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Flagship case Musgo / Juanita */}
        <p
          className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: `rgba(var(--text-rgb), 0.4)` }}
        >
          {t(caseLabel, lang)}
        </p>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="md:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${PROGRAM_ACCENT}33`,
              boxShadow: `0 30px 80px -30px ${PROGRAM_ACCENT}33`,
            }}
          >
            <img
              src="/images/brands/musgo/juanita-lopez-portrait.jpeg"
              alt="Juanita López — Musgo"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            <div className="absolute bottom-5 left-5 right-5">
              <p
                className="font-clash text-[9px] tracking-[0.3em] uppercase mb-1.5"
                style={{ color: `${PROGRAM_ACCENT}dd` }}
              >
                MUSGO
              </p>
              <p
                className="font-mono text-[10px]"
                style={{ color: "rgba(255,252,247,0.55)" }}
              >
                Juanita López · Founder
              </p>
            </div>
          </motion.div>

          <div className="md:col-span-7 flex flex-col">
            <h3
              className="font-clash font-bold leading-[1.05] mb-3"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.02em",
                color: "rgba(var(--text-rgb), 0.92)",
              }}
            >
              {t(caseHead, lang)}
            </h3>
            <p
              className="font-clash text-sm md:text-base mb-6"
              style={{ color: `${PROGRAM_ACCENT}cc`, letterSpacing: "0.02em" }}
            >
              {t(caseSub, lang)}
            </p>
            <p
              className="font-clash text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
              style={{ color: "rgba(var(--text-rgb), 0.65)" }}
            >
              {t(caseStory, lang)}
            </p>
            <a
              href="mailto:edgar@monzalab.com?subject=Monza%20Studio%20—%2012-Week%20Program"
              className="inline-flex items-center gap-3 font-clash text-xs tracking-[0.25em] uppercase font-medium self-start py-3 px-5 rounded-full transition-all duration-300"
              style={{
                color: PROGRAM_ACCENT,
                border: `1px solid ${PROGRAM_ACCENT}55`,
                background: `${PROGRAM_ACCENT}10`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${PROGRAM_ACCENT}25`;
                e.currentTarget.style.borderColor = PROGRAM_ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${PROGRAM_ACCENT}10`;
                e.currentTarget.style.borderColor = `${PROGRAM_ACCENT}55`;
              }}
            >
              {t(cta, lang)} <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* More program cases — additional consultoras */}
        <ProgramCases lang={lang} />
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   PROGRAM CASES — Samuel · Roberto · Felipe
   ────────────────────────────────────────── */
type ProgramCase = {
  name: string;
  cover: string;
  consultancy: string;
  desc: LT;
};

const PROGRAM_CASES: ProgramCase[] = [
  {
    name: "Samuel Cordero",
    cover: "/images/brands/program-cases/samuel-cordero.jpg",
    consultancy: "El Estratega",
    desc: {
      es: "Reestructuración empresarial. Entrega su consultoría como sistema, no como consejo suelto.",
      en: "Business restructuring. Delivers his consultancy as a system, not loose advice.",
      de: "Unternehmensrestrukturierung. Liefert seine Beratung als System, nicht als loser Rat.", pt: "Reestructuración empresarial. Entrega su consultoría como sistema, no como consejo suelto.",
    },
  },
  {
    name: "Roberto Caballero",
    cover: "/images/brands/program-cases/roberto-caballero.png",
    consultancy: "Vida, Claridad, Propósito",
    desc: {
      es: "Acompañamiento ejecutivo. Construimos su práctica privada para C-suite y founders en transición.",
      en: "Executive coaching. We built his private practice for C-suite and founders in transition.",
      de: "Executive-Coaching. Wir bauten seine Privatpraxis für C-Suite und Gründer im Übergang.", pt: "Acompañamiento ejecutivo. Construimos su práctica privada para C-suite y founders en transición.",
    },
  },
  {
    name: "Luis Felipe Hernández",
    cover: "/images/brands/program-cases/felipe-hernandez.png",
    consultancy: "Sightline Advisory",
    desc: {
      es: "Estrategia en ejecución. Consultora boutique enfocada en cerrar la brecha entre plan y resultado.",
      en: "Strategy in execution. Boutique advisory focused on closing the gap between plan and result.",
      de: "Strategie in der Ausführung. Boutique-Beratung, die die Lücke zwischen Plan und Ergebnis schließt.", pt: "Estrategia en ejecución. Consultora boutique enfocada en cerrar la brecha entre plan y resultado.",
    },
  },
];

const ProgramCases = ({ lang }: { lang: Lang }) => {
  const PROGRAM_ACCENT = "#7fb878";
  const eyebrow: LT = {
    es: "MÁS CASOS DEL PROGRAMA",
    en: "MORE PROGRAM CASES",
    de: "WEITERE PROGRAMM-CASES", pt: "MÁS CASOS DEL PROGRAMA",
  };
  const head: LT = {
    es: "Otras consultoras construidas en 12 semanas.",
    en: "Other consultancies built in 12 weeks.",
    de: "Weitere Beratungen, in 12 Wochen gebaut.", pt: "Otras consultoras construidas en 12 semanas.",
  };

  return (
    <div className="mt-20 md:mt-28 pt-14 md:pt-20" style={{ borderTop: "1px solid rgba(var(--text-rgb), 0.06)" }}>
      <p
        className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-5"
        style={{ color: `${PROGRAM_ACCENT}cc` }}
      >
        {t(eyebrow, lang)}
      </p>
      <h3
        className="font-clash font-bold leading-[1.05] mb-12 max-w-3xl"
        style={{
          fontSize: "clamp(22px, 3vw, 36px)",
          letterSpacing: "-0.02em",
          color: "rgba(var(--text-rgb), 0.92)",
        }}
      >
        {t(head, lang)}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
        {PROGRAM_CASES.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(var(--text-rgb), 0.08)" }}
          >
            <img
              src={c.cover}
              alt={c.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              style={{ opacity: 0.92 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.92) 100%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
              <p
                className="font-clash text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-medium mb-2"
                style={{ color: `${PROGRAM_ACCENT}dd` }}
              >
                {c.consultancy}
              </p>
              <h4
                className="font-clash font-bold text-lg md:text-2xl mb-2.5"
                style={{
                  letterSpacing: "-0.02em",
                  color: "rgba(255,252,247,0.95)",
                }}
              >
                {c.name}
              </h4>
              <p
                className="font-clash text-[12px] md:text-[13px] leading-relaxed"
                style={{ color: "rgba(255,252,247,0.65)" }}
              >
                {t(c.desc, lang)}
              </p>
            </div>
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              style={{ boxShadow: `inset 0 0 80px -10px ${PROGRAM_ACCENT}30` }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────
   BRANDS WE'VE GROWN — strip
   ────────────────────────────────────────── */
type GrownBrand = {
  name: string;
  slug: string | null;
  desc: LT;
  accent: string;
  cover: string;
};

const GROWN_BRANDS: GrownBrand[] = [
  {
    name: "Eleonora Morales",
    slug: "eleonora-morales",
    desc: {
      es: "Plataforma de moda preowned de lujo, curada pieza por pieza.",
      en: "Preowned luxury fashion platform, curated piece by piece.",
      de: "Plattform für Preowned-Luxusmode, kuratiert Stück für Stück.", pt: "Plataforma de moda preowned de lujo, curada pieza por pieza.",
    },
    accent: "#f074aa",
    cover: "/images/brands/eleonora/eleonora-portrait.jpg",
  },
  {
    name: "Garage Advisory",
    slug: null,
    desc: {
      es: "Concierge de carros exóticos para coleccionistas en Europa.",
      en: "Exotic-car concierge for collectors across Europe.",
      de: "Exotic-Car-Concierge für Sammler in Europa.", pt: "Concierge de carros exóticos para coleccionistas en Europa.",
    },
    accent: "#C4A35A",
    cover: "/images/brands/garage-advisory/aston-front.jpg",
  },
  {
    name: "Guardian of Speed",
    slug: null,
    desc: {
      es: "Atelier y comunidad para coleccionistas de carros clásicos.",
      en: "Atelier and community for classic-car collectors.",
      de: "Atelier und Community für Sammler klassischer Autos.", pt: "Atelier y comunidad para coleccionistas de carros clásicos.",
    },
    accent: "#B8B5AD",
    cover: "/images/brands/guardian-of-speed/hero-runway.jpg",
  },
  {
    name: "Pacho Alvarez",
    slug: "pacho-alvarez",
    desc: {
      es: "Piloto colombiano del Dakar Rally 2026.",
      en: "Colombian driver in the 2026 Dakar Rally.",
      de: "Kolumbianischer Fahrer der Dakar Rally 2026.", pt: "Piloto colombiano del Dakar Rally 2026.",
    },
    accent: "#D9A468",
    cover: "/images/projects/pacho-alvarez/dakar-2026-dunas.jpg",
  },
  {
    name: "Musgo",
    slug: null,
    desc: {
      es: "Consultora boutique de transiciones regenerativas.",
      en: "Boutique consultancy on regenerative transitions.",
      de: "Boutique-Beratung für regenerative Transformationen.", pt: "Consultora boutique de transiciones regenerativas.",
    },
    accent: "#7fb878",
    cover: "/images/brands/musgo/juanita-lopez-portrait.jpeg",
  },
  {
    name: "Bavarian Econs",
    slug: "bavarian-econs",
    desc: {
      es: "BMW 2002 EV · Forbes · global luxury",
      en: "BMW 2002 EV · Forbes · global luxury",
      de: "BMW 2002 EV · Forbes · Global Luxury", pt: "BMW 2002 EV · Forbes · global luxury",
    },
    accent: "#A8A29E",
    cover: "/images/projects/bavarian-econs/coast-frontal.jpeg",
  },
];

const BrandsStrip = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = {
    es: "BRANDS WE'VE GROWN",
    en: "BRANDS WE'VE GROWN",
    de: "BRANDS WE'VE GROWN", pt: "BRANDS WE'VE GROWN",
  };
  const head: LT = {
    es: "Marcas que crecimos juntos.",
    en: "Brands we grew together.",
    de: "Marken — gemeinsam gewachsen.", pt: "Marcas que crecimos juntos.",
  };
  const langPrefix = lang === "es" ? "" : `/${lang}`;

  return (
    <Section className="py-24 md:py-32" id="brands">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex items-baseline justify-between mb-12 md:mb-16 gap-6 flex-wrap">
          <div>
            <p
              className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-4"
              style={{ color: `${ACCENT}b3` }}
            >
              {t(eyebrow, lang)}
            </p>
            <h2
              className="font-clash font-bold leading-[1.05]"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.025em",
                color: "rgba(var(--text-rgb), 0.92)",
              }}
            >
              {t(head, lang)}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {GROWN_BRANDS.map((brand, i) => {
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
                style={{ border: "1px solid rgba(var(--text-rgb), 0.06)" }}
              >
                <img
                  src={brand.cover}
                  alt={brand.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  style={{ opacity: 0.78 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)`,
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                  <span
                    className="font-mono text-[10px] tracking-[0.2em] mb-2"
                    style={{ color: `${brand.accent}cc` }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="font-clash font-bold text-xl md:text-2xl mb-1"
                    style={{
                      letterSpacing: "-0.02em",
                      color: "rgba(255,252,247,0.95)",
                    }}
                  >
                    {brand.name}
                  </h3>
                  <p
                    className="font-clash text-[12px] md:text-sm"
                    style={{ color: "rgba(255,252,247,0.55)" }}
                  >
                    {t(brand.desc, lang)}
                  </p>
                </div>
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 80px -10px ${brand.accent}30` }}
                />
              </motion.div>
            );
            return brand.slug ? (
              <Link key={brand.name} to={`${langPrefix}/work/${brand.slug}`}>
                {inner}
              </Link>
            ) : (
              <div key={brand.name}>{inner}</div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   CRITERIA / CTA
   ────────────────────────────────────────── */
const CriteriaCTA = ({ lang }: { lang: Lang }) => {
  const eyebrow: LT = { es: "CRITERIO", en: "CRITERIA", de: "KRITERIUM", pt: "CRITERIO" };
  const head: LT = {
    es: "No tomamos a todos.",
    en: "We don't take on everyone.",
    de: "Wir nehmen nicht jeden.", pt: "No tomamos a todos.",
  };
  const body: LT = {
    es: "Solo trabajamos con marcas que ya tienen presencia. Si la tuya la tiene, hablemos.",
    en: "We only work with brands that already have presence. If yours does, let's talk.",
    de: "Wir arbeiten nur mit Marken, die bereits Präsenz haben. Wenn deine das tut, lass uns reden.", pt: "Solo trabajamos con marcas que ya tienen presencia. Si la tuya la tiene, hablemos.",
  };
  const cta: LT = { es: "Hablemos", en: "Let's talk", de: "Lass uns reden", pt: "Hablemos" };

  return (
    <Section className="py-32 md:py-40">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div
          className="rounded-3xl p-10 md:p-16 lg:p-20 relative overflow-hidden"
          style={{
            border: `1px solid ${ACCENT}33`,
            background: `radial-gradient(ellipse at 30% 20%, ${ACCENT}14 0%, transparent 60%), rgba(var(--text-rgb), 0.02)`,
          }}
        >
          <p
            className="font-clash text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
            style={{ color: `${ACCENT}b3` }}
          >
            {t(eyebrow, lang)}
          </p>
          <h2
            className="font-clash font-bold leading-[1.02] mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              letterSpacing: "-0.03em",
              color: "rgba(var(--text-rgb), 0.92)",
            }}
          >
            {t(head, lang)}
          </h2>
          <p
            className="font-clash text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
            style={{ color: "rgba(var(--text-rgb), 0.6)" }}
          >
            {t(body, lang)}
          </p>
          <a
            href="mailto:edgar@monzalab.com?subject=Monza%20Studio%20—%20Hablemos"
            className="inline-flex items-center gap-3 font-clash text-sm tracking-[0.2em] uppercase font-medium py-4 px-7 rounded-full transition-all duration-300"
            style={{
              color: "#0B0B10",
              background: ACCENT,
              boxShadow: `0 20px 60px -20px ${ACCENT}99`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ACCENT_DEEP;
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = ACCENT;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t(cta, lang)} <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </Section>
  );
};

/* ──────────────────────────────────────────
   PAGE
   ────────────────────────────────────────── */
const MonzaStudio = () => {
  const { language } = useLanguage();
  const lang = language as Lang;

  return (
    <PremiumBackground>
      <SEO
        path="/monzastudio"
        type="website"
        title={{
          es: "Monza Studio — No delego marcas. Las construyo. · Monza Lab",
          en: "Monza Studio — I don't delegate brands. I build them. · Monza Lab",
          de: "Monza Studio — Ich delegiere keine Marken. Ich baue sie. · Monza Lab",
          pt: "Monza Studio — Não delego marcas. Construo-as. · Monza Lab",
        }}
        description={{
          es: "Monza Studio instala y opera el sistema con el que una marca vende: la página sobre tu Shopify, quien contesta por WhatsApp, la base de clientas, la pauta y el tablero. Un circuito, no piezas sueltas. Caso vivo: Eleonora Morales.",
          en: "Monza Studio installs and operates the system a brand sells with: the page on your Shopify, who answers on WhatsApp, the customer base, the ads and the dashboard. A circuit, not loose parts. Live case: Eleonora Morales.",
          de: "Monza Studio installiert und betreibt das System, mit dem eine Marke verkauft: die Seite auf deinem Shopify, wer auf WhatsApp antwortet, die Kundenbasis, die Ads und das Dashboard. Ein Rundkurs, keine Einzelteile. Live-Case: Eleonora Morales.",
          pt: "A Monza Studio instala e opera o sistema com que uma marca vende: a página sobre o teu Shopify, quem responde no WhatsApp, a base de clientes, os anúncios e o painel. Um circuito, não peças soltas. Caso vivo: Eleonora Morales.",
        }}
        ogPage="monzastudio"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Monza Studio",
          provider: {
            "@type": "Organization",
            name: "Monza Lab",
            url: "https://monzalab.com",
          },
          serviceType: "E-commerce operating system on Shopify: storefront, WhatsApp sales agent, CRM flows, AI product imagery, paid media and dashboard — built and operated",
          areaServed: "Global",
        }}
      />

      <main id="main" aria-label="Monza Studio">
        <Hero lang={lang} />
        <Purpose lang={lang} />
        <SystemCircuit lang={lang} />
        <Operation lang={lang} />
        <ImageRule lang={lang} />
        <PlanAndModel lang={lang} />
        <ShootInfrastructure lang={lang} />
        <FlagshipEleonora lang={lang} />
        <ProgramFlagship lang={lang} />
        <BrandsStrip lang={lang} />
        <CriteriaCTA lang={lang} />
      </main>

      <FooterMinimal />
    </PremiumBackground>
  );
};

export default MonzaStudio;
