import { Resend } from "resend";
import type { ChatMessage } from "../../src/lib/agent/types.js";

/* Registro de las conversaciones del agente por correo — un hilo por conversación.
 *
 * Cada turno se manda como un correo a AGENT_LOG_EMAIL con el mismo asunto y una
 * cabecera References estable por sesión, así Gmail agrupa todos los turnos de la
 * misma conversación en un solo hilo. El último correo del hilo trae la
 * conversación completa; los anteriores, el intercambio de su momento.
 *
 * Es best-effort: nunca rompe la respuesta al visitante. Sin RESEND_API_KEY o sin
 * AGENT_LOG_EMAIL no hace nada. */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");

export type AgentLogInput = {
  sessionId: string;
  lang: string;
  page?: string;
  model: string;
  messages: ChatMessage[]; // historial que llegó (incluye el último mensaje del visitante)
  reply: string;
  tools: Array<{ name: string; input: unknown; ok: boolean }>;
};

export function agentLogSubject(sessionId: string, page?: string): string {
  const short = sessionId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8) || "sesion";
  return `[Agente Monza] conversación ${short}${page ? ` · ${page}` : ""}`;
}

export async function sendAgentLog(input: AgentLogInput): Promise<{ ok: boolean }> {
  const to = process.env.AGENT_LOG_EMAIL;
  if (!process.env.RESEND_API_KEY || !to) return { ok: false };

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM || "Monza Lab <upload@monzalab.com>";
  const turn = input.messages.filter((m) => m.role === "user").length;
  const lastUser = [...input.messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const threadId = `<agente-${input.sessionId.replace(/[^a-zA-Z0-9-]/g, "").slice(0, 48)}@monzalab.com>`;

  const toolsHtml = input.tools.length
    ? `<p style="margin:0 0 12px 0;font-size:12px;color:#9b8b80;">Herramientas: ${input.tools
        .map((t) => `${esc(t.name)}${t.ok ? "" : " (falló)"}`)
        .join(" · ")}</p>`
    : "";

  const transcript = input.messages
    .concat([{ role: "assistant", content: input.reply }])
    .map(
      (m) =>
        `<p style="margin:0 0 10px 0;"><strong style="color:${m.role === "user" ? "#2B1F1F" : "#b5407f"}">${
          m.role === "user" ? "Visitante" : "Agente"
        }:</strong> ${esc(m.content)}</p>`,
    )
    .join("");

  try {
    await resend.emails.send({
      from,
      to: [to],
      subject: agentLogSubject(input.sessionId, input.page),
      headers: {
        // Mismo References en todos los turnos → Gmail agrupa la conversación en un hilo.
        References: threadId,
        "In-Reply-To": threadId,
      },
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Public Sans',sans-serif;color:#2B1F1F;max-width:640px;">
          <p style="margin:0 0 4px 0;font-size:12px;color:#9b8b80;">Turno ${turn} · ${input.lang} · ${esc(input.page || "/")} · ${esc(input.model)}</p>
          ${toolsHtml}
          <div style="border-left:3px solid #F8B4D9;padding-left:12px;margin:0 0 20px 0;">
            <p style="margin:0 0 8px 0;"><strong>Visitante:</strong> ${esc(lastUser)}</p>
            <p style="margin:0;"><strong style="color:#b5407f">Agente:</strong> ${esc(input.reply)}</p>
          </div>
          <details>
            <summary style="cursor:pointer;font-size:13px;color:#9b8b80;">Conversación completa hasta ahora (${turn} turnos)</summary>
            <div style="margin-top:12px;font-size:14px;line-height:1.55;">${transcript}</div>
          </details>
        </div>`,
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
