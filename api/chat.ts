import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "../src/lib/agent/persona.js";
import { AGENT_TOOLS } from "../src/lib/agent/tools.js";
import { sendLeadEmail } from "./_shared/sendLead.js";
import type {
  AgentLang,
  ChatMessage,
  SSEEvent,
  CapturarLeadInput,
  AbrirWhatsappInput,
} from "../src/lib/agent/types.js";

// Runtime Node.js (NO edge): el SDK @anthropic-ai/sdk referencia node:fs/node:path,
// que no existen en el Edge Runtime. En Node el SDK y el streaming SSE funcionan bien.
export const config = { runtime: "nodejs" };

const MAX_TURNS = 40;
const MAX_LEN = 2000;
const MAX_TOOL_ROUNDS = 3;

export function sseLine(ev: SSEEvent): string {
  return `data: ${JSON.stringify(ev)}\n\n`;
}

export function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  const cleaned: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string")
      continue;
    cleaned.push({ role, content: content.slice(0, MAX_LEN) });
  }
  return cleaned.slice(-MAX_TURNS);
}

const LANGS: AgentLang[] = ["es", "en", "de", "pt"];

// Vercel runtime Node: handler web por método (NO `export default`, que en Node
// se interpreta como el formato clásico (req,res) y deja la respuesta colgada).
export async function POST(request: Request): Promise<Response> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "no_agent", fallback: "whatsapp" }, { status: 503 });
  }

  let payload: { messages?: unknown; lang?: unknown };
  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return Response.json({ error: "Bad JSON" }, { status: 400 });
  }

  const messages = sanitizeMessages(payload.messages);
  const lang: AgentLang = LANGS.includes(payload.lang as AgentLang)
    ? (payload.lang as AgentLang)
    : "es";
  if (messages.length === 0) {
    return Response.json({ error: "Sin mensajes" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (ev: SSEEvent) =>
        controller.enqueue(encoder.encode(sseLine(ev)));

      // Historial en el formato de la API; se va ampliando con las rondas de tools.
      const apiMessages: Anthropic.MessageParam[] = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
          const ms = client.messages.stream({
            model: "claude-opus-4-8",
            max_tokens: 2048,
            thinking: { type: "adaptive", display: "omitted" },
            output_config: { effort: "low" },
            system: [
              {
                type: "text",
                text: buildSystemPrompt(lang),
                cache_control: { type: "ephemeral" },
              },
            ],
            tools: AGENT_TOOLS,
            messages: apiMessages,
          });

          for await (const event of ms) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              send({ type: "text", value: event.delta.text });
            }
          }

          const final = await ms.finalMessage();

          if (final.stop_reason !== "tool_use") break;

          const toolResults: Anthropic.ToolResultBlockParam[] = [];
          for (const block of final.content) {
            if (block.type !== "tool_use") continue;
            if (block.name === "abrir_whatsapp") {
              const input = block.input as AbrirWhatsappInput;
              send({ type: "action", action: "whatsapp", resumen: input.resumen });
              toolResults.push({
                type: "tool_result",
                tool_use_id: block.id,
                content: "ok: link de WhatsApp mostrado al usuario",
              });
            } else if (block.name === "capturar_lead") {
              const input = block.input as CapturarLeadInput;
              const r = await sendLeadEmail({
                name: input.nombre,
                email: input.email,
                brand: input.marca,
                need: input.caso,
                message: input.necesidad,
                source: "agente",
              });
              if (r.ok) {
                send({ type: "action", action: "lead_captured" });
              } else {
                // El correo no salió: no se pierde el lead, se ofrece WhatsApp.
                send({
                  type: "action",
                  action: "whatsapp",
                  resumen: `Soy ${input.nombre} de ${input.marca}. ${input.necesidad}`,
                });
              }
              toolResults.push({
                type: "tool_result",
                tool_use_id: block.id,
                content: JSON.stringify(r),
              });
            }
          }

          apiMessages.push({ role: "assistant", content: final.content });
          apiMessages.push({ role: "user", content: toolResults });
        }
        send({ type: "done" });
      } catch {
        send({ type: "error", message: "fallo del agente" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
