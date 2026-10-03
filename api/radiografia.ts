import { sendRadiografia } from "./_shared/sendRadiografia";

export const config = { runtime: "edge" };

interface Body {
  productUrl?: string;
  email?: string;
  whatsapp?: string;
  revenue?: string;
  brand?: string;
  lang?: string;
  requestId?: string;
  offer?: string;
  attribution?: Record<string, unknown>;
}

/** Acepta "tienda.com/p/x" o "https://tienda.com/p/x". Rechaza lo que no sea una URL http(s). */
const normalizeUrl = (raw: string): string | null => {
  const s = raw.trim();
  if (!s) return null;
  const withScheme = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(withScheme);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (!u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
};

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "Bad JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Bad JSON" }, { status: 400 });
  }
  const productUrl = normalizeUrl(typeof body.productUrl === "string" ? body.productUrl : "");
  const email = (typeof body.email === "string" ? body.email : "").trim();
  const whatsapp = (typeof body.whatsapp === "string" ? body.whatsapp : "").trim();

  if (!productUrl) {
    return Response.json({ error: "invalid_url" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }
  if (whatsapp.replace(/\D/g, "").length < 7) {
    return Response.json({ error: "invalid_whatsapp" }, { status: 400 });
  }

  const rawContext = body.attribution && typeof body.attribution === "object" ? body.attribution : {};
  const attribution: Record<string, string> = {};
  for (const key of ["landing", "source", "medium", "campaign", "content", "campaignId", "adId"]) {
    const value = rawContext[key];
    if (typeof value === "string") attribution[key] = value.replace(/[\r\n]/g, " ").slice(0, 160);
  }
  const isTest = rawContext.qa === true && /@monzalab\.com$/i.test(email);
  const requestId = typeof body.requestId === "string" && /^[a-f0-9-]{36}$/i.test(body.requestId)
    ? body.requestId : crypto.randomUUID();
  const result = await sendRadiografia({
    productUrl,
    email,
    whatsapp,
    revenue: body.revenue,
    brand: body.brand,
    lang: body.lang,
    requestId,
    offer: body.offer === "radiografia-v2" ? "radiografia-v2" : "radiografia",
    attribution,
    isTest,
  });

  return Response.json({ ...result, requestId, isTest }, { status: result.ok ? 200 : 502 });
}
