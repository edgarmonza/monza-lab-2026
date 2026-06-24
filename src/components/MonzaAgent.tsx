import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAgentChat } from "@/hooks/useAgentChat";
import { WIDGET_COPY, CHIP_LABELS } from "@/lib/agent/widgetCopy";
import { USE_CASE_KEYS, type AgentLang } from "@/lib/agent/types";
import { whatsAppUrl } from "@/lib/pixel";

const PINK = "#F8B4D9";

const MonzaAgent = () => {
  const { language } = useLanguage();
  const lang = language as AgentLang;
  const copy = WIDGET_COPY[lang];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, status, whatsappUrlValue, leadDone, send } = useAgentChat(lang);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, whatsappUrlValue, leadDone]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
    setInput("");
  };

  return (
    <>
      {/* Burbuja */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label={copy.openLabel}
          className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[60] group"
          style={{
            width: 54,
            height: 54,
            borderRadius: "9999px",
            background: "rgba(11,11,16,0.92)",
            border: `1px solid rgba(248,180,217,0.55)`,
            boxShadow: "0 8px 28px rgba(248,180,217,0.40)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={PINK} strokeWidth="2" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.6-.8L3 21l1.9-5.4A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[60] flex flex-col"
          style={{
            width: "min(380px, calc(100vw - 2.5rem))",
            height: "min(560px, calc(100vh - 4rem))",
            borderRadius: 18,
            background: "rgba(11,11,16,0.96)",
            border: `1px solid rgba(248,180,217,0.35)`,
            boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
            backdropFilter: "blur(12px)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(248,180,217,0.18)" }}>
            <span style={{ color: "rgba(255,252,247,0.92)", fontSize: 14, fontWeight: 600 }}>Monza · Agente</span>
            <button onClick={() => setOpen(false)} aria-label={copy.closeLabel} style={{ color: "rgba(255,252,247,0.55)", fontSize: 20, lineHeight: 1 }}>
              ✕
            </button>
          </div>

          {/* Cuerpo */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Saludo + chips solo al inicio */}
            {messages.length === 0 && (
              <>
                <p style={{ color: "rgba(255,252,247,0.85)", fontSize: 14, lineHeight: 1.5 }}>{copy.greeting}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                  {USE_CASE_KEYS.map((k) => (
                    <button
                      key={k}
                      onClick={() => send(CHIP_LABELS[lang][k])}
                      style={{
                        fontSize: 13,
                        padding: "7px 12px",
                        borderRadius: 9999,
                        color: PINK,
                        background: "rgba(248,180,217,0.08)",
                        border: "1px solid rgba(248,180,217,0.35)",
                      }}
                    >
                      {CHIP_LABELS[lang][k]}
                    </button>
                  ))}
                </div>
              </>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  fontSize: 14,
                  lineHeight: 1.5,
                  padding: "9px 12px",
                  borderRadius: 12,
                  color: m.role === "user" ? "#0B0B10" : "rgba(255,252,247,0.92)",
                  background: m.role === "user" ? PINK : "rgba(255,252,247,0.06)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content || (status === "streaming" && m.role === "assistant" ? "…" : "")}
              </div>
            ))}

            {/* Acción: WhatsApp */}
            {whatsappUrlValue && (
              <a
                href={whatsappUrlValue}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignSelf: "flex-start",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "10px 16px",
                  borderRadius: 9999,
                  background: PINK,
                  color: "#0B0B10",
                }}
              >
                {copy.whatsappBtn} →
              </a>
            )}

            {/* Acción: lead capturado */}
            {leadDone && (
              <p style={{ alignSelf: "flex-start", fontSize: 13, color: "rgba(248,180,217,0.9)" }}>
                {copy.leadConfirmed}
              </p>
            )}

            {status === "error" && (
              <>
                <p style={{ fontSize: 13, color: "rgba(255,180,180,0.9)" }}>{copy.error}</p>
                <a
                  href={whatsAppUrl("Hola Edgar, vengo de monzalab.com")}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 14,
                    fontWeight: 600,
                    padding: "10px 16px",
                    borderRadius: 9999,
                    background: PINK,
                    color: "#0B0B10",
                  }}
                >
                  {copy.whatsappBtn} →
                </a>
              </>
            )}
          </div>

          {/* Input */}
          <form onSubmit={submit} className="px-3 py-3" style={{ borderTop: "1px solid rgba(248,180,217,0.18)", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={copy.placeholder}
              maxLength={2000}
              aria-label={copy.placeholder}
              style={{
                flex: 1,
                background: "rgba(255,252,247,0.04)",
                border: "1px solid rgba(255,252,247,0.12)",
                color: "rgba(255,252,247,0.92)",
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={status === "streaming" || !input.trim()}
              aria-label={copy.sendLabel}
              style={{
                background: PINK,
                color: "#0B0B10",
                borderRadius: 10,
                padding: "0 14px",
                fontWeight: 700,
                opacity: status === "streaming" || !input.trim() ? 0.5 : 1,
              }}
            >
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default MonzaAgent;
