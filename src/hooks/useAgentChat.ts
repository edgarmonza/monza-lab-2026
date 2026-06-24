import { useState, useRef, useCallback } from "react";
import { whatsAppUrl, trackContact, trackLead } from "@/lib/pixel";
import type { AgentLang, ChatMessage, SSEEvent } from "@/lib/agent/types";

export function parseSSE(
  chunk: string,
  buffer: string,
): { events: SSEEvent[]; rest: string } {
  const text = buffer + chunk;
  const parts = text.split("\n\n");
  const rest = parts.pop() ?? "";
  const events: SSEEvent[] = [];
  for (const part of parts) {
    const line = part.trim();
    if (!line.startsWith("data:")) continue;
    try {
      events.push(JSON.parse(line.slice(5).trim()) as SSEEvent);
    } catch {
      /* ignore malformed */
    }
  }
  return { events, rest };
}

export function useAgentChat(lang: AgentLang) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "streaming" | "error">("idle");
  const [whatsappUrlValue, setWhatsappUrlValue] = useState<string | null>(null);
  const [leadDone, setLeadDone] = useState(false);
  const historyRef = useRef<ChatMessage[]>([]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || status === "streaming") return;

      const userMsg: ChatMessage = { role: "user", content: trimmed };
      const next = [...historyRef.current, userMsg];
      historyRef.current = next;
      // Añade el turno del usuario + un turno vacío del asistente que se irá llenando.
      setMessages([...next, { role: "assistant", content: "" }]);
      setStatus("streaming");
      setWhatsappUrlValue(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next, lang }),
        });
        if (!res.ok || !res.body) throw new Error("no stream");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let assistantText = "";

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const { events, rest } = parseSSE(decoder.decode(value, { stream: true }), buffer);
          buffer = rest;
          for (const ev of events) {
            if (ev.type === "text") {
              assistantText += ev.value;
              setMessages([...next, { role: "assistant", content: assistantText }]);
            } else if (ev.type === "action" && ev.action === "whatsapp") {
              setWhatsappUrlValue(whatsAppUrl(ev.resumen));
              trackContact("whatsapp", "agente");
            } else if (ev.type === "action" && ev.action === "lead_captured") {
              setLeadDone(true);
              trackLead("agente");
            } else if (ev.type === "error") {
              throw new Error(ev.message);
            }
          }
        }

        historyRef.current = [...next, { role: "assistant", content: assistantText }];
        setStatus("idle");
      } catch {
        setStatus("error");
      }
    },
    [lang, status],
  );

  return { messages, status, whatsappUrlValue, leadDone, send };
}
