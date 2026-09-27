/* El asesor en WhatsApp · /shopify.
 *
 * Edgar, 26-sep-2026: «mete video de un asesor en WhatsApp, que eso es clave» y «como el pantallazo
 * del chat… de un cliente hablando». El video es nuestro (docs/internal/asesor/: chat.html +
 * render.mjs, uno por idioma): un cliente escribe a las 3:12 a. m. y la venta queda cerrada a las
 * 3:14. Es una conversación de EJEMPLO con una tienda genérica, y la página lo dice.
 *
 * Primero el celular: texto y después el video a todo el ancho. El video no se baja hasta que la
 * sección se acerca, se reproduce mudo solo mientras se ve y se puede pausar. Con movimiento
 * reducido no arranca solo. */
import { useEffect, useRef, useState } from "react";
import { Check, Pause, Play } from "lucide-react";
import type { Lang } from "@/i18n/types";
import { VIDEO } from "./video";

type L = Record<Lang, string>;


const COPY = {
  antetitulo: { es: "WhatsApp", en: "WhatsApp", de: "WhatsApp", pt: "WhatsApp" } as L,
  titulo: {
    es: "Vende mientras tu equipo duerme.",
    en: "It sells while your team sleeps.",
    de: "Es verkauft, während dein Team schläft.",
    pt: "Vende enquanto a tua equipa dorme.",
  } as L,
  texto: {
    es: "Un cliente pregunta por una talla a las 3 de la mañana. El asesor le contesta, le aparta la prenda, le manda el link de pago y confirma el pedido. Cuando tu equipo llega, la venta ya está hecha.",
    en: "A customer asks about a size at 3 in the morning. The advisor answers, holds the piece, sends the payment link and confirms the order. By the time your team arrives, the sale is done.",
    de: "Ein Kunde fragt um 3 Uhr morgens nach einer Größe. Der Berater antwortet, reserviert das Teil, schickt den Zahlungslink und bestätigt die Bestellung. Wenn dein Team kommt, ist der Verkauf schon gemacht.",
    pt: "Um cliente pergunta por um tamanho às 3 da manhã. O assessor responde, reserva a peça, envia o link de pagamento e confirma a encomenda. Quando a tua equipa chega, a venda já está feita.",
  } as L,
  puntos: [
    { es: "Contesta en segundos, a cualquier hora.", en: "Replies in seconds, at any hour.", de: "Antwortet in Sekunden, zu jeder Uhrzeit.", pt: "Responde em segundos, a qualquer hora." },
    {
      es: "Conoce tu catálogo y tu inventario: nunca ofrece lo que no tienes.",
      en: "Knows your catalog and inventory: never offers what you don't have.",
      de: "Kennt deinen Katalog und Bestand: bietet nie an, was du nicht hast.",
      pt: "Conhece o teu catálogo e stock: nunca oferece o que não tens.",
    },
    {
      es: "Cuando hace falta una persona, se la pasa a tu equipo.",
      en: "When a person is needed, it hands over to your team.",
      de: "Wenn es einen Menschen braucht, übergibt er an dein Team.",
      pt: "Quando é precisa uma pessoa, passa à tua equipa.",
    },
  ] as L[],
  ejemplo: { es: "Conversación de ejemplo.", en: "Example conversation.", de: "Beispielgespräch.", pt: "Conversa de exemplo." } as L,
  resumen: {
    es: "Video: un cliente escribe por WhatsApp a las 3:12 de la mañana y pregunta si hay un hoodie rosa en talla M. El asesor confirma que queda uno, le promete la entrega antes del viernes, le aparta la prenda, le envía el link de pago y confirma el pedido a las 3:14.",
    en: "Video: a customer writes on WhatsApp at 3:12 in the morning asking for a pink hoodie in a medium. The advisor confirms one is left, promises delivery before Friday, holds the piece, sends the payment link and confirms the order at 3:14.",
    de: "Video: Ein Kunde schreibt um 3:12 Uhr nachts auf WhatsApp und fragt nach einem rosa Hoodie in M. Der Berater bestätigt, dass noch einer da ist, verspricht die Lieferung vor Freitag, reserviert das Teil, schickt den Zahlungslink und bestätigt die Bestellung um 3:14 Uhr.",
    pt: "Vídeo: um cliente escreve no WhatsApp às 3:12 da manhã a perguntar por um hoodie rosa no tamanho M. O assessor confirma que resta um, promete a entrega antes de sexta, reserva a peça, envia o link de pagamento e confirma a encomenda às 3:14.",
  } as L,
  pausar: { es: "Pausar el video", en: "Pause the video", de: "Video pausieren", pt: "Pausar o vídeo" } as L,
  reproducir: { es: "Reproducir el video", en: "Play the video", de: "Video abspielen", pt: "Reproduzir o vídeo" } as L,
};

const prefiereQuieto = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const AsesorWhatsApp = ({ lang }: { lang: Lang }) => {
  const [quieto] = useState(prefiereQuieto);
  const [cargar, setCargar] = useState(false);
  const [enVista, setEnVista] = useState(false);
  const [pausaUsuario, setPausaUsuario] = useState(quieto);
  const caja = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  // El video se baja cuando la sección se acerca y se reproduce solo mientras se ve.
  useEffect(() => {
    const el = caja.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const cerca = new IntersectionObserver(([e]) => e.isIntersecting && setCargar(true), { rootMargin: "400px 0px" });
    const vista = new IntersectionObserver(([e]) => setEnVista(e.isIntersecting), { threshold: 0.35 });
    cerca.observe(el);
    vista.observe(el);
    return () => {
      cerca.disconnect();
      vista.disconnect();
    };
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute("muted", "");
    const debe = cargar && enVista && !pausaUsuario;
    if (debe && typeof v.play === "function") v.play()?.catch(() => {});
    if (!debe && typeof v.pause === "function" && !v.paused) v.pause();
  }, [cargar, enVista, pausaUsuario]);

  return (
    <section className="relative py-16 md:py-28" aria-labelledby="asesor-titulo">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-10 lg:gap-16 items-center">
        <div>
          <p className="font-clash text-[11px] tracking-[0.35em] uppercase font-medium mb-4" style={{ color: "#F8B4D9c0" }}>
            {COPY.antetitulo[lang]}
          </p>
          <h2
            id="asesor-titulo"
            className="font-clash font-bold mb-5 max-w-[16ch] [text-wrap:balance]"
            style={{ fontSize: "clamp(28px, 4.4vw, 50px)", letterSpacing: "-0.02em", lineHeight: 1.06, color: "rgba(var(--text-rgb), 0.94)" }}
          >
            {COPY.titulo[lang]}
          </h2>
          <p className="font-clash text-[15px] md:text-lg max-w-xl leading-relaxed mb-7" style={{ color: "rgba(var(--text-rgb), 0.62)" }}>
            {COPY.texto[lang]}
          </p>
          <ul className="flex flex-col gap-3">
            {COPY.puntos.map((p, i) => (
              <li key={i} className="flex items-start gap-3 font-clash text-[15px] leading-snug" style={{ color: "rgba(var(--text-rgb), 0.82)" }}>
                <span className="asesor-check" aria-hidden="true">
                  <Check strokeWidth={2.6} />
                </span>
                {p[lang]}
              </li>
            ))}
          </ul>
        </div>

        <figure className="w-full max-w-[440px] mx-auto lg:mx-0 lg:justify-self-end">
          <div ref={caja} className="asesor-video relative">
            <video
              ref={video}
              className="block w-full h-auto"
              width={1080}
              height={1350}
              poster={VIDEO.poster(lang)}
              src={cargar || quieto ? VIDEO.mp4(lang) : undefined}
              muted
              loop
              playsInline
              preload="none"
              aria-describedby="asesor-resumen"
            />
            <button
              type="button"
              onClick={() => setPausaUsuario((p) => !p)}
              aria-pressed={pausaUsuario}
              aria-label={pausaUsuario ? COPY.reproducir[lang] : COPY.pausar[lang]}
              className="asesor-pausa"
            >
              {pausaUsuario ? <Play className="w-3.5 h-3.5 translate-x-[1px]" strokeWidth={2.2} /> : <Pause className="w-3.5 h-3.5" strokeWidth={2.2} />}
            </button>
          </div>
          <figcaption className="mt-3 font-clash text-[12px] tracking-[0.08em]" style={{ color: "rgba(var(--text-rgb), 0.45)" }}>
            {COPY.ejemplo[lang]}
          </figcaption>
          <p id="asesor-resumen" className="sr-only">
            {COPY.resumen[lang]}
          </p>
        </figure>
      </div>
    </section>
  );
};

export default AsesorWhatsApp;
