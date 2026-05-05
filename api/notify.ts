import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const config = { runtime: 'edge' };

interface UploadedFile {
  path: string;
  publicUrl: string;
  originalName: string;
  size: number;
  mimeType: string;
}

interface RequestBody {
  uploaderName?: string;
  project?: string;
  files?: UploadedFile[];
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const supaUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supaUrl || !serviceKey) {
    return Response.json({ error: 'Server not configured' }, { status: 500 });
  }

  const body = (await request.json()) as RequestBody;
  const uploaderName = (body.uploaderName || '').trim();
  const project = (body.project || '').trim();
  const files = Array.isArray(body.files) ? body.files : [];

  if (!uploaderName || !project || files.length === 0) {
    return Response.json({ error: 'Faltan datos' }, { status: 400 });
  }

  const supabase = createClient(supaUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const rows = files.map((f) => ({
    uploader_name: uploaderName,
    project,
    file_path: f.path,
    file_url: f.publicUrl,
    file_size: f.size,
    mime_type: f.mimeType,
    original_name: f.originalName,
  }));

  const { error: dbError } = await supabase.from('client_uploads').insert(rows);
  if (dbError) {
    return Response.json({ error: dbError.message }, { status: 500 });
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const totalSize = files.reduce((acc, f) => acc + f.size, 0);
    const fileList = files
      .map(
        (f) => `
          <tr>
            <td style="padding:6px 12px 6px 0;font-size:13px;">
              <a href="${f.publicUrl}" style="color:#2B1F1F;">${f.originalName}</a>
            </td>
            <td style="padding:6px 0;font-size:12px;color:#9b8b80;text-align:right;">
              ${formatSize(f.size)}
            </td>
          </tr>`
      )
      .join('');

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM || 'Monza Upload <upload@monzalab.com>',
        to: [process.env.NOTIFY_EMAIL || 'edgar@monzalab.com'],
        subject: `Nuevo upload — ${uploaderName} · ${project} (${files.length})`,
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Public Sans',sans-serif;color:#2B1F1F;max-width:560px;">
            <h2 style="margin:0 0 4px 0;font-weight:600;font-size:20px;">Nuevo upload recibido</h2>
            <p style="margin:0 0 18px 0;font-size:13px;color:#9b8b80;">${files.length} archivo${files.length === 1 ? '' : 's'} · ${formatSize(totalSize)}</p>
            <table style="border-collapse:collapse;font-size:14px;line-height:1.6;margin-bottom:18px;">
              <tr><td style="padding-right:16px;color:#6b6b6b;">De</td><td><strong>${uploaderName}</strong></td></tr>
              <tr><td style="padding-right:16px;color:#6b6b6b;">Proyecto</td><td><strong>${project}</strong></td></tr>
            </table>
            <table style="border-collapse:collapse;width:100%;border-top:1px solid #EFE3D5;">
              ${fileList}
            </table>
            <p style="margin-top:24px;font-size:12px;color:#9b8b80;">monzalab.com/upload</p>
          </div>
        `,
      });
    } catch {
      // no rompemos el flow si el email falla
    }
  }

  return Response.json({ ok: true, count: files.length });
}
