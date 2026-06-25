import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAgentChat } from "@/hooks/useAgentChat";
import { WIDGET_COPY, CHIP_LABELS } from "@/lib/agent/widgetCopy";
import { USE_CASE_KEYS, type AgentLang } from "@/lib/agent/types";
import { whatsAppUrl } from "@/lib/pixel";
import HelmetIcon from "./HelmetIcon";

const PINK = "#F8B4D9";
const GREEN = "#25D366";

// Ritmo del "tecleo" del agente. Más chars o menos ms = más rápido.
const TYPE_CHARS = 2; // caracteres revelados por tick
const TYPE_SPEED_MS = 18; // milisegundos entre ticks

const WHATSAPP_GREETING = "Hola Edgar, vengo de monzalab.com";

// Avatar: mini casco al lado de cada mensaje del agente (da sensación de "persona").
const HelmetAvatar = () => (
  <div
    style={{
      flexShrink: 0,
      width: 28,
      height: 28,
      borderRadius: 9999,
      background: "rgba(248,180,217,0.10)",
      border: "1px solid rgba(248,180,217,0.30)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <HelmetIcon style={{ width: 17, height: 17 }} shellColor={PINK} />
  </div>
);

// "Escribiendo…": tres puntos que rebotan, como en WhatsApp/iMessage.
const TypingDots = () => (
  <span style={{ display: "inline-flex", gap: 4, alignItems: "center", padding: "3px 2px" }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: 7,
          height: 7,
          borderRadius: 9999,
          background: "rgba(255,252,247,0.6)",
          animation: `monzaTypeBounce 1.2s ${i * 0.18}s infinite ease-in-out`,
        }}
      />
    ))}
  </span>
);

const WhatsAppGlyph = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill={GREEN} aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.2 4.79 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24zm4.52 10.49c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42-.14 0-.31-.02-.47-.02s-.43.06-.66.31c-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.25 3.75.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
  </svg>
);

const MonzaAgent = () => {
  const { language } = useLanguage();
  const lang = language as AgentLang;
  const copy = WIDGET_COPY[lang];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, status, whatsappUrlValue, leadDone, send } = useAgentChat(lang);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Efecto máquina de escribir: revelamos el texto del ÚLTIMO mensaje del agente
  // de a pocos caracteres, para que se sienta escrito en vivo (no de golpe).
  const lastIdx = messages.length - 1;
  const last = messages[lastIdx];
  const lastIsAssistant = last?.role === "assistant";
  const fullText = lastIsAssistant ? last.content : "";
  const [revealed, setRevealed] = useState(0);

  // Reinicia el tecleo cuando arranca un turno nuevo (el contenido vuelve a vacío).
  useEffect(() => {
    if (fullText.length < revealed) setRevealed(0);
  }, [fullText.length, revealed]);

  // Avanza el tecleo carácter a carácter.
  useEffect(() => {
    if (revealed >= fullText.length) return;
    const t = setTimeout(
      () => setRevealed((r) => Math.min(fullText.length, r + TYPE_CHARS)),
      TYPE_SPEED_MS,
    );
    return () => clearTimeout(t);
  }, [revealed, fullText]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, revealed, whatsappUrlValue, leadDone]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
    setInput("");
  };

  return (
    <>
      <style>{`
        @keyframes monzaTypeBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes monzaCaret { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      {/* Botones flotantes: WhatsApp (arriba) + casco/agente (abajo) */}
      {!open && (
        <div
          className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[60]"
          style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}
        >
          {/* WhatsApp directo */}
          <a
            href={whatsAppUrl(WHATSAPP_GREETING)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            style={{
              width: 54,
              height: 54,
              borderRadius: 9999,
              background: "rgba(11,11,16,0.92)",
              border: `1px solid ${GREEN}80`,
              boxShadow: "0 8px 28px rgba(37,211,102,0.32)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WhatsAppGlyph />
          </a>

          {/* Casco → abre el agente */}
          <button
            onClick={() => setOpen(true)}
            aria-label={copy.openLabel}
            style={{
              width: 60,
              height: 60,
              borderRadius: 9999,
              background: "rgba(11,11,16,0.92)",
              border: `1px solid rgba(248,180,217,0.55)`,
              boxShadow: "0 8px 28px rgba(248,180,217,0.40)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HelmetIcon style={{ width: 34, height: 34 }} shellColor={PINK} />
          </button>
        </div>
      )}

      {/* Panel del chat */}
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
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(248,180,217,0.18)" }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <HelmetAvatar />
              <span style={{ color: "rgba(255,252,247,0.92)", fontSize: 14, fontWeight: 600 }}>
                Monza · Agente
              </span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label={copy.closeLabel}
              style={{ color: "rgba(255,252,247,0.55)", fontSize: 20, lineHeight: 1 }}
            >
              ✕
            </button>
          </div>

          {/* Cuerpo */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3"
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            {/* Saludo + chips solo al inicio */}
            {messages.length === 0 && (
              <>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <HelmetAvatar />
                  <p
                    style={{
                      color: "rgba(255,252,247,0.92)",
                      fontSize: 14,
                      lineHeight: 1.5,
                      padding: "9px 12px",
                      borderRadius: 12,
                      background: "rgba(255,252,247,0.06)",
                    }}
                  >
                    {copy.greeting}
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4, marginLeft: 36 }}>
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

            {messages.map((m, i) => {
              const isLast = i === lastIdx;
              if (m.role === "assistant") {
                const text = isLast ? m.content.slice(0, revealed) : m.content;
                const typing = isLast && status === "streaming" && revealed === 0;
                const caret = isLast && status === "streaming" && revealed > 0 && revealed < m.content.length;
                return (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", alignSelf: "flex-start", maxWidth: "90%" }}>
                    <HelmetAvatar />
                    <div
                      style={{
                        fontSize: 14,
                        lineHeight: 1.5,
                        padding: "9px 12px",
                        borderRadius: 12,
                        color: "rgba(255,252,247,0.92)",
                        background: "rgba(255,252,247,0.06)",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {typing ? (
                        <TypingDots />
                      ) : (
                        <>
                          {text}
                          {caret && (
                            <span
                              style={{
                                display: "inline-block",
                                width: 7,
                                height: 15,
                                marginLeft: 1,
                                verticalAlign: "text-bottom",
                                background: PINK,
                                animation: "monzaCaret 0.9s infinite",
                              }}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              }
              // Mensaje del usuario
              return (
                <div
                  key={i}
                  style={{
                    alignSelf: "flex-end",
                    maxWidth: "85%",
                    fontSize: 14,
                    lineHeight: 1.5,
                    padding: "9px 12px",
                    borderRadius: 12,
                    color: "#0B0B10",
                    background: PINK,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.content}
                </div>
              );
            })}

            {/* Acción: WhatsApp */}
            {whatsappUrlValue && (
              <a
                href={whatsappUrlValue}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignSelf: "flex-start",
                  marginLeft: 36,
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
              <p style={{ alignSelf: "flex-start", marginLeft: 36, fontSize: 13, color: "rgba(248,180,217,0.9)" }}>
                {copy.leadConfirmed}
              </p>
            )}

            {status === "error" && (
              <>
                <p style={{ fontSize: 13, color: "rgba(255,180,180,0.9)" }}>{copy.error}</p>
                <a
                  href={whatsAppUrl(WHATSAPP_GREETING)}
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
          <form
            onSubmit={submit}
            className="px-3 py-3"
            style={{ borderTop: "1px solid rgba(248,180,217,0.18)", display: "flex", gap: 8 }}
          >
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
