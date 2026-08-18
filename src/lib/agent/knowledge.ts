import type { AgentLang } from "./types.js";

/* Conocimiento curado a mano: controla EXACTAMENTE qué expone el agente.
 * Los agentes a la medida se citan por vertical, nunca con el nombre del cliente. */

const ES = `CASOS DE USO Y EVIDENCIA (lo que Monza Lab hace y puede replicar):

1. EMPRESA QUE QUIERE SER AI-FIRST
   Pitch: rediseñamos cómo opera tu empresa con IA en el centro — no IA encima de lo viejo.
   Evidencia: Monza Index (mide adopción de IA en LATAM), IA-Index, Spectro (contenido a escala con IA).

2. MARCA DE MODA / BEAUTY QUE VENDE (o quiere vender) EN SHOPIFY — MONZA STUDIO
   Pitch: no vendemos piezas sueltas, instalamos EL SISTEMA con el que la marca vende — un circuito
   cerrado, no una lista de servicios. Shopify y la pasarela no se tocan (corren la transacción);
   nosotros montamos la operación encima:
   - La página: nueva, sobre su mismo Shopify, rápida (la clienta ve la prenda en segundos).
   - Quien contesta: WhatsApp con la voz de la marca, leyendo el inventario en vivo — resuelve la
     talla, reconoce la prenda por foto, arma el carrito y cierra; si no sabe si hay stock, lo dice,
     no se lo inventa. Es el turno de la madrugada. Vivo en producción hoy.
   - Quien atiende las redes: responde comentarios de Instagram uno por uno y lleva al DM.
   - Quien corre la pauta: lee Meta a diario y decide escalar/rotar/apagar cruzado con margen.
   - Quien mira los números: el tablero (lo abre la clienta) con los cuatro números que gobiernan
     el negocio — cuánto deja cada prenda, cuánto cuesta traer una clienta, cuánto deja esa clienta
     con el tiempo, y hasta cuánto se puede pagar por la siguiente (ahí se decide la pauta).
   - La base que se acuerda: clientas ordenadas y segmentadas, flujos de correo y WhatsApp corriendo
     solos (bienvenida, carrito abandonado, post-compra, reactivación, cumpleaños, preventa).
   - Contenido: la IA cambia la escena, JAMÁS el producto — de una foto real salen ~3x imágenes,
     validadas una por una. Sin sesión ni estudio.
   REGLA DE CASA: NO se cuentan agentes ("uno, dos, tres agentes"). Se cuentan los TURNOS que quedan
   cubiertos (cuatro) y se responde por el conjunto. Si preguntan "¿cuántos agentes?", reencuadra.
   ORDEN: primero quien contesta + la base (cobra más rápido), luego la página y la ficha, luego
   margen y ahí sí pauta, y mercados nuevos cuando la caja lo permita.
   MODELO: se construye con fecha de entrega y se opera mes a mes SIN permanencia; parte de lo
   nuestro queda atado a lo que venda el sistema. Todo queda del cliente: la cuenta de WhatsApp
   Business en SU portafolio de Meta, la página/base/tablero a su nombre, las reglas escritas.
   OBJECIÓN FRECUENTE — "ya probé un bot y alucinaba": tenía razón en apagarlo; un bot genérico
   sobre un catálogo alucina. El nuestro va conectado directo a la tienda, con la voz de la marca
   aprobada por la dueña, y dice lo que no sabe.
   Evidencia (por vertical, sin nombre de cliente): una marca colombiana de moda circular y lujo
   pre-owned — página propia sobre Shopify, 140+ piezas fotografiadas con el sistema de imagen y
   agente de WhatsApp vivo en su número real (el caso completo, con nombre, está publicado en
   monzalab.com/work y en monzalab.com/shopify — remite ahí). También Bavarian Econs (nuestra
   propia marca: ahí corre primero lo que después se instala en clientes).
   PUERTA DE ENTRADA GRATIS: la "radiografía" en monzalab.com/shopify — mandan el link de UN
   producto de su tienda y les devolvemos esa página reconstruida, con un índice 0-100 y evidencia.
   Ofrécela cuando la marca ya vende en Shopify y está evaluando.
   Página del sistema: monzalab.com/monzastudio · vertical Shopify: monzalab.com/shopify

3. AGENTES DE IA A LA MEDIDA
   Pitch: agentes que trabajan por ti — venden por WhatsApp, asesoran, operan procesos.
   Evidencia (por vertical, sin nombre de cliente): una asesora de moda con IA; agentes para
   comercio exterior; agentes de venta por WhatsApp. Y este mismo agente con el que hablas
   ahora es uno nuestro: la demo viva del servicio.

4. SOLO PÁGINA WEB
   Pitch: web premium, rápida, global y pensada para convertir, no para decorar.
   Evidencia: Guardian of Speed, Bavarian Econs (web global + SEO multi-idioma).

5. SOLO BRANDING
   Pitch: identidad de marca de nivel internacional, de 0 a 1.
   Evidencia: Bavarian Econs — identidad, naming y sistema visual completo; salió en Forbes y Motor Trend.

6. CONSULTORÍA
   Pitch: criterio de estrategia, validación de MVP y estructura de capital. Pensamos contigo.
   Evidencia: transversal — rol de estrategia, validación de MVP y pitch de financiación en proyectos como Bavarian Econs.

7. PLATAFORMA AI-FIRST PARA TU INDUSTRIA
   Pitch: construimos la plataforma con IA de tu industria — producto, data e inteligencia
   sobre tu operación real — en semanas, no años. Modelos flexibles: desarrollo por hitos,
   y donde hay match, participación en el revenue.
   Evidencia (por vertical, sin nombre de cliente): plataforma de comercio exterior con cinco
   herramientas de IA sobre el ERP vivo de una importadora (ficha técnica automática,
   comparador de proveedores, contratos, costeo DDP, coach de pipeline); plataforma de viajes
   AI-native para un operador turístico europeo con AI Trip Planner sobre 751 experiencias
   reales. Casos completos en monzalab.com/work.

NUESTROS PRODUCTOS (ventures propios, prueba de que vivimos lo que vendemos):
- Monza Studio: instala y opera el sistema con el que una marca vende (caso 2 arriba). También marca personal y consultoras boutique en 12 semanas.
- MonzaHaus: plataforma AI-native con 35.000+ Porsches de Japón, EU y EE.UU.
- Monza Index: mide la adopción de IA de LATAM frente al mundo.`;

const EN = `USE CASES AND EVIDENCE (what Monza Lab does and can replicate):

1. COMPANY THAT WANTS TO BE AI-FIRST
   Pitch: we redesign how your company operates with AI at the core — not AI bolted onto old processes.
   Evidence: Monza Index (measures AI adoption in LATAM), IA-Index, Spectro (content at scale with AI).

2. FASHION / BEAUTY BRAND SELLING (OR WANTING TO SELL) ON SHOPIFY — MONZA STUDIO
   Pitch: we don't sell loose pieces, we install THE SYSTEM the brand sells with — a closed circuit,
   not a list of services. Shopify and the payment gateway stay untouched (they run the transaction);
   we build the operation on top:
   - The page: new, on top of their same Shopify, fast (the customer sees the piece in seconds).
   - Who answers: WhatsApp in the brand's voice, reading live inventory — resolves sizing, recognises
     the piece from a photo, builds the cart and closes; if it doesn't know whether something is in
     stock, it says so, it doesn't make it up. The 3 a.m. shift. Live in production today.
   - Who tends social: replies to Instagram comments one by one and takes it to DMs.
   - Who runs the ads: reads Meta daily and decides scale/rotate/pause against margin.
   - Who watches the numbers: the dashboard (the client opens it) with the four numbers that govern
     the business — what each piece leaves, what it costs to bring a customer, what that customer
     leaves over time, and how much can be paid for the next one (that decides the ads).
   - The base that remembers: customers cleaned and segmented, email + WhatsApp flows running on
     their own (welcome, abandoned cart, post-purchase, reactivation, birthday, pre-sale).
   - Content: AI changes the scene, NEVER the product — from one real photo, ~3x images, validated
     one by one. No shoot, no studio.
   HOUSE RULE: we do NOT count agents ("one, two, three agents"). We count the SHIFTS covered (four)
   and answer for the whole. If asked "how many agents?", reframe.
   ORDER: first who answers + the base (fastest payback), then the page and listings, then margin
   and only then ads, then new markets when cash allows.
   MODEL: built with a delivery date, then operated month to month with NO lock-in; part of our pay
   is tied to what the system sells. Everything stays owned by the client: WhatsApp Business account
   in THEIR Meta portfolio, page/base/dashboard in their name, rules written down.
   FREQUENT OBJECTION — "I tried a bot and it hallucinated": they were right to switch it off; a
   generic bot on a catalog hallucinates. Ours is wired straight into the store, with the brand's
   voice approved by the owner, and says what it doesn't know.
   Evidence (by vertical, no client name): a Colombian circular-fashion / pre-owned luxury brand —
   own page on Shopify, 140+ pieces photographed with the image system and a WhatsApp agent live
   on her real number (the full case, with the name, is published at monzalab.com/work and
   monzalab.com/shopify — point there). Also Bavarian Econs (our own brand: things run there
   first, then get installed for clients).
   FREE ENTRY POINT: the store "radiografía" at monzalab.com/shopify — they send the link of ONE
   product and get that page rebuilt, with a 0-100 index and evidence. Offer it when the brand
   already sells on Shopify and is evaluating.
   System page: monzalab.com/monzastudio · Shopify vertical: monzalab.com/shopify

3. CUSTOM AI AGENTS
   Pitch: agents that work for you — sell over WhatsApp, advise, run processes.
   Evidence (by vertical, no client names): an AI fashion advisor; agents for foreign trade;
   sales agents over WhatsApp. And this very agent you're talking to is one of ours: the live demo.

4. WEBSITE ONLY
   Pitch: premium, fast, global web built to convert, not to decorate.
   Evidence: Guardian of Speed, Bavarian Econs (global web + multilingual SEO).

5. BRANDING ONLY
   Pitch: international-level brand identity, from 0 to 1.
   Evidence: Bavarian Econs — identity, naming and full visual system; featured in Forbes and Motor Trend.

6. CONSULTING
   Pitch: strategy judgment, MVP validation and capital structure. We think alongside you.
   Evidence: cross-cutting — strategy, MVP validation and funding pitch on projects like Bavarian Econs.

7. AI-FIRST PLATFORM FOR YOUR INDUSTRY
   Pitch: we build your industry's AI platform — product, data and intelligence on top of
   your real operation — in weeks, not years. Flexible models: milestone-based development,
   and where there's a match, revenue share.
   Evidence (by vertical, no client names): a foreign-trade platform with five AI tools on an
   importer's live ERP (automatic spec sheets, supplier comparison, contracts, DDP costing,
   pipeline coach); an AI-native travel platform for a European tour operator with an AI Trip
   Planner over 751 real experiences. Full cases at monzalab.com/work.

OUR OWN VENTURES (proof we live what we sell):
- Monza Studio: installs and operates the system a brand sells with (case 2 above). Also personal brands and boutique consultancies in 12 weeks.
- MonzaHaus: AI-native platform with 35,000+ Porsches from Japan, EU and the US.
- Monza Index: measures LATAM's AI adoption against the world.`;

export function buildKnowledge(lang: AgentLang): string {
  // de y pt reutilizan EN como base; el modelo responde en el idioma pedido (instruido en persona.ts).
  return lang === "es" ? ES : EN;
}
