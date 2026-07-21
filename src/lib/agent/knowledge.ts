import type { AgentLang } from "./types.js";

/* Conocimiento curado a mano: controla EXACTAMENTE qué expone el agente.
 * Los agentes a la medida se citan por vertical, nunca con el nombre del cliente. */

const ES = `CASOS DE USO Y EVIDENCIA (lo que Monza Lab hace y puede replicar):

1. EMPRESA QUE QUIERE SER AI-FIRST
   Pitch: rediseñamos cómo opera tu empresa con IA en el centro — no IA encima de lo viejo.
   Evidencia: Monza Index (mide adopción de IA en LATAM), IA-Index, Spectro (contenido a escala con IA).

2. MARCA DE ROPA QUE QUIERE E-COMMERCE (Shopify)
   Pitch: marca + tienda + sistema de ventas que de verdad vende, no solo un catálogo bonito.
   Evidencia: Pacho Álvarez, Bavarian Econs (web global y ecosistema de ventas).

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
- Monza Studio: branding, contenido y growth para marcas con presencia.
- MonzaHaus: plataforma AI-native con 35.000+ Porsches de Japón, EU y EE.UU.
- Monza Index: mide la adopción de IA de LATAM frente al mundo.`;

const EN = `USE CASES AND EVIDENCE (what Monza Lab does and can replicate):

1. COMPANY THAT WANTS TO BE AI-FIRST
   Pitch: we redesign how your company operates with AI at the core — not AI bolted onto old processes.
   Evidence: Monza Index (measures AI adoption in LATAM), IA-Index, Spectro (content at scale with AI).

2. CLOTHING BRAND THAT WANTS E-COMMERCE (Shopify)
   Pitch: brand + store + a sales system that actually sells, not just a pretty catalog.
   Evidence: Pacho Álvarez, Bavarian Econs (global web and sales ecosystem).

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
- Monza Studio: branding, content and growth for brands with presence.
- MonzaHaus: AI-native platform with 35,000+ Porsches from Japan, EU and the US.
- Monza Index: measures LATAM's AI adoption against the world.`;

export function buildKnowledge(lang: AgentLang): string {
  // de y pt reutilizan EN como base; el modelo responde en el idioma pedido (instruido en persona.ts).
  return lang === "es" ? ES : EN;
}
