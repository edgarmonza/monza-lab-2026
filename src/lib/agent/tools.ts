import type Anthropic from "@anthropic-ai/sdk";
import { CRITERIO_KEYS } from "./criterio.js";

/* Herramientas del agente comercial.
 *  - consultar_criterio y leer_sitio se resuelven en el servidor (api/chat.ts) y
 *    su resultado vuelve al modelo como tool_result: el visitante no las ve.
 *  - capturar_lead y abrir_whatsapp producen acciones hacia el widget (SSE). */
export const AGENT_TOOLS: Anthropic.Tool[] = [
  {
    name: "consultar_criterio",
    description:
      "Consulta el criterio de Edgar sobre un tema antes de responder algo de fondo: cómo se cobra, pauta y margen, imagen y contenido, el sistema de e-commerce y su orden, plataformas AI-first, agentes, web/branding, formación (Sessions), a quién sí/no, objeciones, marca personal. Devuelve texto que debes traducir a tus palabras y al idioma del visitante. Úsala como máximo una vez por respuesta salvo necesidad real.",
    input_schema: {
      type: "object",
      properties: {
        tema: {
          type: "string",
          description: `Clave del tema o palabras clave. Claves: ${CRITERIO_KEYS.join(", ")}.`,
        },
        pregunta: {
          type: "string",
          description: "Opcional: la pregunta o situación concreta del visitante, para afinar la búsqueda.",
        },
      },
      required: ["tema"],
    },
  },
  {
    name: "leer_sitio",
    description:
      "Lee la web del visitante (una página + conteo de productos si es Shopify) y devuelve hechos: qué vende, plataforma, si hay WhatsApp visible, catálogo, titulares y un extracto. Úsala UNA vez por sitio cuando te den una URL. Instagram/TikTok/Facebook no se pueden leer: pide la web. Antes de llamarla puedes decir una frase breve ('dame un segundo, la miro').",
    input_schema: {
      type: "object",
      properties: {
        url: { type: "string", description: "URL de la web del visitante (con o sin https)." },
      },
      required: ["url"],
    },
  },
  {
    name: "capturar_lead",
    description:
      "Captura un lead cuando el visitante está interesado pero explorando. Llama esto SOLO cuando ya tengas nombre, correo y marca del visitante, pedidos de forma natural en la conversación (no como formulario).",
    input_schema: {
      type: "object",
      properties: {
        nombre: { type: "string", description: "Nombre del visitante" },
        email: { type: "string", description: "Correo del visitante" },
        marca: { type: "string", description: "Marca o empresa del visitante" },
        caso: {
          type: "string",
          description:
            "Caso de uso detectado: sistema e-commerce (Studio), plataforma AI-first, agentes, web, branding, formación (Sessions), marca personal, consultoría",
        },
        necesidad: {
          type: "string",
          description: "Dos o tres frases: quién es, qué negocio tiene (qué vende, dónde, tamaño), qué busca y en qué punto está.",
        },
      },
      required: ["nombre", "email", "marca", "caso", "necesidad"],
    },
  },
  {
    name: "abrir_whatsapp",
    description:
      "Pasa al visitante a WhatsApp con Edgar cuando está caliente y quiere hablar ya, tiene urgencia o pide a Edgar directo. Úsalo en vez de capturar_lead en ese caso.",
    input_schema: {
      type: "object",
      properties: {
        resumen: {
          type: "string",
          description:
            "Resumen de 1-2 frases: quién es, qué negocio (qué vende, dónde), qué busca — para que Edgar entre en contexto",
        },
        caso: { type: "string", description: "Caso de uso detectado" },
      },
      required: ["resumen", "caso"],
    },
  },
];
