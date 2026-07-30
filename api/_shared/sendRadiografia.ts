import { Resend } from "resend";

export interface RadiografiaInput {
  /** URL de un producto de la tienda del prospecto. Único campo imprescindible. */
  productUrl: string;
  email: string;
  whatsapp: string;
  /** Rango de facturación mensual (opcional). Desbloquea la matemática de plata. */
  revenue?: string;
  brand?: string;
  lang?: string;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Extrae el dominio para titular el correo sin depender de que llenen "marca". */
export const domainOf = (url: string): string => {
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace(/^www\./, "");
  } catch {
    return url.slice(0, 60);
  }
};

const PINK = "#F8B4D9";
const INK = "#2B1F1F";

const CONFIRM_SUBJECT: Record<string, string> = {
  es: "Recibimos tu tienda — Monza Lab",
  en: "We got your store — Monza Lab",
  de: "Wir haben deinen Store erhalten — Monza Lab",
  pt: "Recebemos a tua loja — Monza Lab",
};

/** Cuerpo de la confirmación al prospecto. Fija expectativa: qué llega y cuándo. */
const confirmBody = (lang: string, domain: string) => {
  const copy: Record<string, { h: string; p1: string; li: string[]; p2: string; p3: string }> = {
    es: {
      h: "Recibimos tu tienda.",
      p1: `Vamos a abrir <strong>${esc(domain)}</strong> nosotros mismos — no un robot leyendo metadatos. La recorremos hasta la pantalla de pago, la medimos en móvil real, y capturamos evidencia de cada cosa que encontremos.`,
      li: [
        "Un índice de 0 a 100 en seis frentes, con los pesos a la vista y la evidencia de cada punto que descontamos.",
        "Una de tus fichas de producto reconstruida por nosotros — funcionando, al lado de la tuya.",
        "Lo que no se puede ver desde afuera, dicho como lo que es: no visto, no adivinado.",
      ],
      p2: "Te llega un link privado en <strong>72 horas</strong>. Sin costo y sin compromiso.",
      p3: "Hacemos tres al mes. Si esta semana ya está llena, te avisamos con fecha — no te dejamos esperando.",
    },
    en: {
      h: "We got your store.",
      p1: `We'll open <strong>${esc(domain)}</strong> ourselves — not a bot reading metadata. We walk it through to the payment screen, measure it on a real mobile profile, and capture evidence for everything we find.`,
      li: [
        "A 0–100 index across six fronts, with the weights visible and evidence for every point deducted.",
        "One of your product pages rebuilt by us — live, side by side with yours.",
        "What can't be seen from outside, stated as exactly that: not seen, not guessed.",
      ],
      p2: "You'll get a private link within <strong>72 hours</strong>. Free, no strings.",
      p3: "We do three a month. If this week is full we'll tell you the date — we won't leave you waiting.",
    },
    de: {
      h: "Wir haben deinen Store erhalten.",
      p1: `Wir öffnen <strong>${esc(domain)}</strong> selbst — kein Bot, der Metadaten liest. Wir gehen bis zur Bezahlseite durch, messen auf einem echten Mobilprofil und dokumentieren jeden Fund.`,
      li: [
        "Ein Index von 0–100 über sechs Bereiche, mit sichtbarer Gewichtung und Belegen für jeden Abzug.",
        "Eine deiner Produktseiten, von uns neu gebaut — live, direkt neben deiner.",
        "Was von außen nicht sichtbar ist, wird genau so benannt: nicht gesehen, nicht geraten.",
      ],
      p2: "Du bekommst innerhalb von <strong>72 Stunden</strong> einen privaten Link. Kostenlos, unverbindlich.",
      p3: "Wir machen drei pro Monat. Wenn diese Woche voll ist, nennen wir dir ein Datum.",
    },
    pt: {
      h: "Recebemos a tua loja.",
      p1: `Vamos abrir <strong>${esc(domain)}</strong> nós mesmos — não um robô a ler metadados. Percorremo-la até ao ecrã de pagamento, medimos em móvel real e capturamos evidência de tudo o que encontrarmos.`,
      li: [
        "Um índice de 0 a 100 em seis frentes, com os pesos à vista e evidência de cada ponto descontado.",
        "Uma das tuas fichas de produto reconstruída por nós — a funcionar, ao lado da tua.",
        "O que não se vê de fora, dito como é: não visto, não adivinhado.",
      ],
      p2: "Recebes um link privado em <strong>72 horas</strong>. Sem custo e sem compromisso.",
      p3: "Fazemos três por mês. Se esta semana estiver cheia, avisamos com data.",
    },
  };
  return copy[lang] || copy.es;
};

export async function sendRadiografia(
  body: RadiografiaInput,
): Promise<{ ok: boolean; fallback?: "whatsapp" }> {
  const productUrl = (body.productUrl || "").trim().slice(0, 500);
  const email = (body.email || "").trim().slice(0, 160);
  const whatsapp = (body.whatsapp || "").trim().slice(0, 40);
  const revenue = (body.revenue || "").trim().slice(0, 80);
  const brand = (body.brand || "").trim().slice(0, 160);
  const lang = ["es", "en", "de", "pt"].includes(body.lang || "") ? body.lang! : "es";

  if (!process.env.RESEND_API_KEY) return { ok: false, fallback: "whatsapp" };

  const resend = new Resend(process.env.RESEND_API_KEY);
  const domain = domainOf(productUrl);
  const from = process.env.RESEND_FROM || "Monza Lab <upload@monzalab.com>";

  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:4px 16px 4px 0;color:#6b6b6b;font-size:13px;white-space:nowrap;">${label}</td><td style="font-size:14px;"><strong>${esc(value)}</strong></td></tr>`
      : "";

  // 1) Aviso interno a Edgar. Si esto falla, el lead se pierde → se reporta.
  try {
    await resend.emails.send({
      from,
      to: [process.env.NOTIFY_EMAIL || "edgar@monzalab.com"],
      replyTo: email,
      subject: `🔍 Radiografía solicitada — ${domain}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Public Sans',sans-serif;color:${INK};max-width:560px;">
          <h2 style="margin:0 0 4px 0;font-weight:600;font-size:20px;">Nueva radiografía — ${esc(domain)}</h2>
          <p style="margin:0 0 18px 0;font-size:13px;color:#9b8b80;">Vertical e-commerce · lead magnet</p>
          <table style="border-collapse:collapse;line-height:1.7;margin-bottom:18px;">
            ${row("Producto", productUrl)}
            ${row("Marca", brand)}
            ${row("Email", email)}
            ${row("WhatsApp", whatsapp)}
            ${row("Facturación", revenue || "no la dijo — usar benchmarks y decirlo")}
          </table>
          <p style="font-size:13px;line-height:1.7;border-left:3px solid ${PINK};padding-left:12px;margin:0 0 18px 0;">
            <strong>Antes de empezar:</strong> crear la fila en Notion (base "monza lab. Clientes", Vertical = e-commerce).<br>
            Rúbrica: <code>Commerce/00-Playbook/FRICCIONES.md</code> · Regla dura: fricción sin evidencia no entra al índice.<br>
            SLA prometido: 72 h. Cupos: 3 al mes.
          </p>
          <p style="margin-top:24px;font-size:12px;color:#9b8b80;">Responde directo — el reply-to es el prospecto.</p>
        </div>`,
    });
  } catch {
    return { ok: false, fallback: "whatsapp" };
  }

  // 2) Confirmación al prospecto. Si falla, el lead YA está a salvo: no se reporta error.
  const c = confirmBody(lang, domain);
  try {
    await resend.emails.send({
      from,
      to: [email],
      replyTo: process.env.NOTIFY_EMAIL || "edgar@monzalab.com",
      subject: CONFIRM_SUBJECT[lang] || CONFIRM_SUBJECT.es,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Public Sans',sans-serif;color:${INK};max-width:520px;line-height:1.65;">
          <div style="border-bottom:2px solid ${PINK};padding-bottom:14px;margin-bottom:26px;">
            <span style="font-size:15px;font-weight:700;letter-spacing:-0.02em;">MONZA LAB</span>
          </div>
          <h1 style="margin:0 0 18px 0;font-weight:700;font-size:24px;letter-spacing:-0.02em;">${c.h}</h1>
          <p style="margin:0 0 20px 0;font-size:15px;">${c.p1}</p>
          <ul style="margin:0 0 22px 0;padding-left:18px;font-size:15px;">
            ${c.li.map((x) => `<li style="margin-bottom:9px;">${x}</li>`).join("")}
          </ul>
          <p style="margin:0 0 14px 0;font-size:15px;">${c.p2}</p>
          <p style="margin:0 0 30px 0;font-size:14px;color:#6b6b6b;">${c.p3}</p>
          <p style="font-size:14px;margin:0 0 4px 0;">Edgar Navarro</p>
          <p style="font-size:13px;color:#9b8b80;margin:0;">Founder &amp; Creative Director · Monza Lab<br>
            <a href="https://monzalab.com" style="color:#9b8b80;">monzalab.com</a></p>
        </div>`,
    });
  } catch {
    /* El aviso interno ya salió: el lead no se pierde. */
  }

  return { ok: true };
}
