-- Staff roles. Public site visitors never get a row here; only accounts
-- created for the business owner/admins/editors do.
create type public.app_role as enum ('admin', 'editor');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  role public.app_role not null default 'editor',
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row whenever a new Supabase Auth user is created,
-- so every authenticated user has a role (defaulting to the lowest
-- privilege, 'editor'). Promote to 'admin' manually via SQL — see the
-- setup notes.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- SECURITY DEFINER helpers used by RLS policies on every table below.
-- Querying `profiles` directly inside a policy defined ON `profiles` would
-- recurse; routing through a security-definer function avoids that and
-- keeps the "is this caller staff?" check in one place.
create or replace function public.is_staff()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;
