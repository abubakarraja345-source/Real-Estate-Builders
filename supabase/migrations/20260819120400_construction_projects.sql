create type public.construction_status as enum ('planned', 'ongoing', 'completed', 'on_hold');
create type public.construction_type as enum ('residential', 'commercial', 'renovation', 'interior', 'infrastructure', 'other');

create table public.construction_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  location text,
  city text not null default 'Rawalpindi',
  project_type public.construction_type not null default 'residential',
  status public.construction_status not null default 'planned',
  completion_percentage smallint not null default 0,
  start_date date,
  end_date date,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  meta_title text,
  meta_description text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint construction_projects_completion_check
    check (completion_percentage between 0 and 100)
);

create index construction_projects_status_idx on public.construction_projects (status);
create index construction_projects_published_idx on public.construction_projects (is_published) where is_published = true;
create index construction_projects_featured_idx on public.construction_projects (is_featured) where is_featured = true;

create trigger set_construction_projects_updated_at
  before update on public.construction_projects
  for each row execute function public.set_updated_at();
