-- ============================================================================
-- Monza Lab — Upload page setup
-- Ejecutar 1 vez en Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================================

-- 1. Storage bucket público para uploads de clientes
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'uploads',
  'uploads',
  true,
  5368709120, -- 5 GB por archivo
  array['image/jpeg','image/png','image/webp','image/heic','image/heif','image/gif',
        'video/mp4','video/quicktime','video/webm','video/mov']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 2. Tabla para metadatos de uploads (reemplaza el Google Sheet de ecommerce)
create table if not exists public.client_uploads (
  id            uuid primary key default gen_random_uuid(),
  uploader_name text        not null,
  project       text        not null,
  file_path     text        not null,
  file_url      text        not null,
  file_size     bigint      not null,
  mime_type     text        not null,
  original_name text        not null,
  created_at    timestamptz not null default now()
);

create index if not exists idx_client_uploads_project    on public.client_uploads(project);
create index if not exists idx_client_uploads_created_at on public.client_uploads(created_at desc);

-- 3. RLS: nadie puede leer/escribir desde el cliente.
--    El servidor usa service_role key (bypassa RLS), así que solo queda activado
--    como capa extra de defensa.
alter table public.client_uploads enable row level security;
