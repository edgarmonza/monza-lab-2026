import { sendLeadEmail } from "./_shared/sendLead";

export const config = { runtime: "edge" };

interface LeadBody {
  name?: string;
  email?: string;
  brand?: string;
  handle?: string;
  need?: string;
  budget?: string;
  message?: string;
  source?: string;
  lang?: string;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return Response.json({ error: "Bad JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const brand = (body.brand || "").trim();

  if (!name || !email || !brand) {
    return Response.json({ error: "Faltan datos" }, { status: 400 });
  }

  const result = await sendLeadEmail({ ...body, name, email, brand });
  return Response.json(result);
}
