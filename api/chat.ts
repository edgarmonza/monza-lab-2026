import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, buildContextNote } from "../src/lib/agent/persona.js";
import { AGENT_TOOLS } from "../src/lib/agent/tools.js";
import { consultarCriterio } from "../src/lib/agent/criterio.js";
import { sendLeadEmail } from "./_shared/sendLead.js";
import { leerSitio, describeSite } from "./_shared/leerSitio.js";
import type {
  AgentLang,
  ChatMessage,
  SSEEvent,
  CapturarLeadInput,
  AbrirWhatsappInput,
  ConsultarCriterioInput,
  LeerSitioInput,
} from "../src/lib/agent/types.js";

// Runtime Node.js (NO edge): el SDK @anthropic-ai/sdk referencia node:fs/node:path,
// que no existen en el Edge Runtime. En Node el SDK y el streaming SSE funcionan bien.
export const config = { runtime: "nodejs", maxDuration: 60 };

const MAX_TURNS = 40;
const MAX_LEN = 2000;
// Descubrimiento real: leer_sitio + consultar_criterio + capturar/abrir pueden encadenarse.
const MAX_TOOL_ROUNDS = 4;

// El modelo de frontera para el vendedor (regla de casa: frontier-first). Adaptive
// thinking a esfuerzo medio: criterio sin latencia de más. Si el clasificador de
// seguridad declina algo (rarísimo en una charla comercial), cae a Opus 4.8 del
// lado del servidor en la misma llamada.
const MODEL = "claude-opus-5";
const FALLBACK_MODEL = "claude-opus-4-8";

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

type ToolLog = { name: string; input: unknown; ok: boolean };

/** Registro best-effort de la conversación (si hay webhook configurado). No bloquea ni rompe. */
async function logConversation(payload: {
  lang: AgentLang;
  page?: string;
  messages: ChatMessage[];
  reply: string;
  tools: ToolLog[];
  model: string;
}) {
  const url = process.env.AGENT_LOG_WEBHOOK;
  if (!url) return;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 2500);
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ts: new Date().toISOString(), source: "monzalab.com/agente", ...payload }),
      signal: ctrl.signal,
    });
    clearTimeout(t);
  } catch {
    /* best-effort */
  }
}

// Vercel runtime Node: handler web por método (NO `export default`, que en Node
// se interpreta como el formato clásico (req,res) y deja la respuesta colgada).
export async function POST(request: Request): Promise<Response> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "no_agent", fallback: "whatsapp" }, { status: 503 });
  }

  let payload: { messages?: unknown; lang?: unknown; page?: unknown };
  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return Response.json({ error: "Bad JSON" }, { status: 400 });
  }

  const messages = sanitizeMessages(payload.messages);
  const lang: AgentLang = LANGS.includes(payload.lang as AgentLang)
    ? (payload.lang as AgentLang)
    : "es";
  const page = typeof payload.page === "string" ? payload.page.slice(0, 120) : undefined;
  if (messages.length === 0) {
    return Response.json({ error: "Sin mensajes" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const encoder = new TextEncoder();

  // Bloque estable (cacheado) + contexto variable aparte, después del breakpoint.
  const contextNote = buildContextNote(page);
  const system: Anthropic.Beta.BetaTextBlockParam[] = [
    { type: "text", text: buildSystemPrompt(lang), cache_control: { type: "ephemeral" } },
    ...(contextNote ? [{ type: "text" as const, text: contextNote }] : []),
  ];

  const stream = new ReadableStream({
    async start(controller) {
      const send = (ev: SSEEvent) =>
        controller.enqueue(encoder.encode(sseLine(ev)));

      // Historial en el formato de la API; se va ampliando con las rondas de tools.
      const apiMessages: Anthropic.Beta.BetaMessageParam[] = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const toolLog: ToolLog[] = [];
      let replyText = "";
      let servedBy = MODEL;

      try {
        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
          const ms = client.beta.messages.stream({
            model: MODEL,
            max_tokens: 6000,
            betas: ["server-side-fallback-2026-06-01"],
            fallbacks: [{ model: FALLBACK_MODEL }],
            thinking: { type: "adaptive", display: "omitted" },
            output_config: { effort: "medium" },
            system,
            tools: AGENT_TOOLS as unknown as Anthropic.Beta.BetaToolUnion[],
            messages: apiMessages,
          });

          for await (const event of ms) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              replyText += event.delta.text;
              send({ type: "text", value: event.delta.text });
            }
          }

          const final = await ms.finalMessage();
          servedBy = final.model || servedBy;

          if (final.stop_reason === "refusal") {
            send({ type: "text", value: lang === "es" ? "Eso no lo puedo tratar aquí — te paso con Edgar." : "" });
            send({ type: "action", action: "whatsapp", resumen: "Visitante web — conversación derivada." });
            break;
          }
          if (final.stop_reason !== "tool_use") break;

          const toolResults: Anthropic.Beta.BetaToolResultBlockParam[] = [];
          for (const block of final.content) {
            if (block.type !== "tool_use") continue;

            if (block.name === "consultar_criterio") {
              const input = block.input as ConsultarCriterioInput;
              const text = consultarCriterio(String(input.tema ?? ""), input.pregunta ? String(input.pregunta) : undefined);
              toolLog.push({ name: block.name, input, ok: true });
              toolResults.push({ type: "tool_result", tool_use_id: block.id, content: text });
            } else if (block.name === "leer_sitio") {
              const input = block.input as LeerSitioInput;
              const facts = await leerSitio(String(input.url ?? ""));
              toolLog.push({ name: block.name, input, ok: facts.ok });
              toolResults.push({
                type: "tool_result",
                tool_use_id: block.id,
                content: describeSite(facts),
                is_error: !facts.ok,
              });
            } else if (block.name === "abrir_whatsapp") {
              const input = block.input as AbrirWhatsappInput;
              send({ type: "action", action: "whatsapp", resumen: input.resumen });
              toolLog.push({ name: block.name, input, ok: true });
              toolResults.push({
                type: "tool_result",
                tool_use_id: block.id,
                content: "ok: link de WhatsApp mostrado al visitante",
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
              toolLog.push({ name: block.name, input, ok: r.ok });
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
            } else {
              toolResults.push({
                type: "tool_result",
                tool_use_id: block.id,
                content: "herramienta desconocida",
                is_error: true,
              });
            }
          }

          apiMessages.push({ role: "assistant", content: final.content });
          apiMessages.push({ role: "user", content: toolResults });
        }
        send({ type: "done" });
      } catch (err) {
        console.error("[agente] fallo", err instanceof Error ? err.message : err);
        send({ type: "error", message: "fallo del agente" });
      } finally {
        await logConversation({ lang, page, messages, reply: replyText, tools: toolLog, model: servedBy });
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
