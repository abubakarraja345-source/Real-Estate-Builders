-- `source` and `lead_type` are deliberately granular now so the same table
-- can absorb WhatsApp/Facebook/Instagram-originated leads once the n8n/AI
-- automation layer is wired up later, without a schema change.
create type public.lead_source as enum ('website', 'whatsapp', 'facebook', 'instagram', 'phone', 'walk_in', 'other');
create type public.lead_type as enum ('buy', 'rent', 'sell', 'construction', 'consultation', 'general');
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'viewing', 'negotiation', 'closed', 'lost');

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  message text,
  source public.lead_source not null default 'website',
  lead_type public.lead_type not null default 'general',
  property_id uuid references public.properties (id) on delete set null,
  project_id uuid references public.construction_projects (id) on delete set null,
  status public.lead_status not null default 'new',
  assigned_to uuid references public.profiles (id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index leads_status_idx on public.leads (status);
create index leads_created_at_idx on public.leads (created_at desc);
create index leads_property_id_idx on public.leads (property_id);
create index leads_source_idx on public.leads (source);

create trigger set_leads_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();
