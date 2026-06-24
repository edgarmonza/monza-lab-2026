export type AgentLang = "es" | "en" | "de" | "pt";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type UseCaseKey =
  | "ai_first"
  | "ecommerce"
  | "agents"
  | "web"
  | "branding"
  | "consulting";

export const USE_CASE_KEYS: UseCaseKey[] = [
  "ai_first",
  "ecommerce",
  "agents",
  "web",
  "branding",
  "consulting",
];

export interface CapturarLeadInput {
  nombre: string;
  email: string;
  marca: string;
  caso: string;
  necesidad: string;
}

export interface AbrirWhatsappInput {
  resumen: string;
  caso: string;
}

export type SSEEvent =
  | { type: "text"; value: string }
  | { type: "action"; action: "whatsapp"; resumen: string }
  | { type: "action"; action: "lead_captured" }
  | { type: "done" }
  | { type: "error"; message: string };
