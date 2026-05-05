import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'edge' };

const BUCKET = 'uploads';
const MAX_BYTES = 5 * 1024 * 1024 * 1024;
const ALLOWED_PREFIXES = ['image/', 'video/'];

const slugify = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'sin-nombre';

const safeFileName = (name: string) => {
  const lastDot = name.lastIndexOf('.');
  const base = lastDot > 0 ? name.slice(0, lastDot) : name;
  const ext = lastDot > 0 ? name.slice(lastDot).toLowerCase() : '';
  return `${slugify(base)}-${Math.random().toString(36).slice(2, 8)}${ext}`;
};

interface RequestBody {
  uploaderName?: string;
  project?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return Response.json({ error: 'Server not configured' }, { status: 500 });
  }

  const body = (await request.json()) as RequestBody;
  const uploaderName = (body.uploaderName || '').trim();
  const project = (body.project || '').trim();
  const fileName = (body.fileName || '').trim();
  const fileType = (body.fileType || '').trim();
  const fileSize = Number(body.fileSize || 0);

  if (!uploaderName || !project || !fileName) {
    return Response.json({ error: 'Faltan datos' }, { status: 400 });
  }
  if (!ALLOWED_PREFIXES.some((p) => fileType.startsWith(p))) {
    return Response.json({ error: 'Tipo de archivo no permitido' }, { status: 400 });
  }
  if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > MAX_BYTES) {
    return Response.json({ error: 'Tamaño inválido' }, { status: 400 });
  }

  const datePrefix = new Date().toISOString().slice(0, 10);
  const path = `${slugify(project)}/${datePrefix}-${slugify(uploaderName)}/${safeFileName(fileName)}`;

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUploadUrl(path);

  if (error || !data) {
    return Response.json({ error: error?.message || 'No se pudo firmar URL' }, { status: 500 });
  }

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return Response.json({
    signedUrl: data.signedUrl,
    token: data.token,
    path,
    publicUrl: pub.publicUrl,
  });
}
