create table public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties (id) on delete cascade,
  -- Path inside the `properties` storage bucket, e.g. "{property_id}/1.jpg".
  -- The public URL is derived from this, never stored redundantly.
  storage_path text not null,
  alt_text text,
  sort_order smallint not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

create index property_images_property_id_idx on public.property_images (property_id, sort_order);

-- Enforce at most one cover image per property.
create unique index property_images_one_cover_idx
  on public.property_images (property_id)
  where is_cover = true;
