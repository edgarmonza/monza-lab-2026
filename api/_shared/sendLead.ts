import { Resend } from "resend";

export interface LeadEmailInput {
  name: string;
  email: string;
  brand: string;
  handle?: string;
  need?: string;
  budget?: string;
  message?: string;
  source?: string;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function sendLeadEmail(
  body: LeadEmailInput,
): Promise<{ ok: boolean; fallback?: "whatsapp" }> {
  const name = (body.name || "").trim().slice(0, 120);
  const email = (body.email || "").trim().slice(0, 160);
  const brand = (body.brand || "").trim().slice(0, 160);
  const handle = (body.handle || "").trim().slice(0, 160);
  const need = (body.need || "").trim().slice(0, 120);
  const budget = (body.budget || "").trim().slice(0, 80);
  const message = (body.message || "").trim().slice(0, 2000);
  const source = (body.source || "web").trim().slice(0, 80);

  if (!process.env.RESEND_API_KEY) {
    return { ok: false, fallback: "whatsapp" };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:4px 16px 4px 0;color:#6b6b6b;font-size:13px;white-space:nowrap;">${label}</td><td style="font-size:14px;"><strong>${esc(value)}</strong></td></tr>`
      : "";

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || "Monza Lab <upload@monzalab.com>",
      to: [process.env.NOTIFY_EMAIL || "edgar@monzalab.com"],
      replyTo: email,
      subject: `🔥 Nuevo lead — ${name} · ${brand} (${source})`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Public Sans',sans-serif;color:#2B1F1F;max-width:560px;">
          <h2 style="margin:0 0 4px 0;font-weight:600;font-size:20px;">Nuevo lead desde monzalab.com</h2>
          <p style="margin:0 0 18px 0;font-size:13px;color:#9b8b80;">Fuente: ${esc(source)}</p>
          <table style="border-collapse:collapse;line-height:1.7;margin-bottom:18px;">
            ${row("Nombre", name)}
            ${row("Email", email)}
            ${row("Marca / Empresa", brand)}
            ${row("Instagram / Web", handle)}
            ${row("Necesita", need)}
            ${row("Presupuesto", budget)}
          </table>
          ${message ? `<p style="font-size:14px;line-height:1.6;border-left:3px solid #F8B4D9;padding-left:12px;margin:0 0 18px 0;">${esc(message)}</p>` : ""}
          <p style="margin-top:24px;font-size:12px;color:#9b8b80;">Responde directo a este correo — el reply-to es el lead.</p>
        </div>
      `,
    });
    return { ok: true };
  } catch {
    return { ok: false, fallback: "whatsapp" };
  }
}
