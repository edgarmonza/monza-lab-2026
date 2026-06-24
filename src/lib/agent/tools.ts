import type Anthropic from "@anthropic-ai/sdk";

export const AGENT_TOOLS: Anthropic.Tool[] = [
  {
    name: "capturar_lead",
    description:
      "Captura un lead cuando el visitante está interesado pero explorando. Llama esto SOLO cuando ya tengas nombre, correo y marca del visitante.",
    input_schema: {
      type: "object",
      properties: {
        nombre: { type: "string", description: "Nombre del visitante" },
        email: { type: "string", description: "Correo del visitante" },
        marca: { type: "string", description: "Marca o empresa del visitante" },
        caso: {
          type: "string",
          description:
            "Caso de uso detectado: AI-first, e-commerce, agentes, web, branding o consultoría",
        },
        necesidad: {
          type: "string",
          description: "Una frase con lo que el visitante necesita",
        },
      },
      required: ["nombre", "email", "marca", "caso", "necesidad"],
    },
  },
  {
    name: "abrir_whatsapp",
    description:
      "Pasa al visitante a WhatsApp con Edgar cuando está caliente y quiere hablar ya. Úsalo en vez de capturar_lead cuando hay urgencia o pide hablar directo.",
    input_schema: {
      type: "object",
      properties: {
        resumen: {
          type: "string",
          description:
            "Resumen de 1-2 frases del caso, marca y necesidad, para que Edgar entre en contexto",
        },
        caso: { type: "string", description: "Caso de uso detectado" },
      },
      required: ["resumen", "caso"],
    },
  },
];
