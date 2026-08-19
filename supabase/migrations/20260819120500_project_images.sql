create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.construction_projects (id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order smallint not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

create index project_images_project_id_idx on public.project_images (project_id, sort_order);

create unique index project_images_one_cover_idx
  on public.project_images (project_id)
  where is_cover = true;
