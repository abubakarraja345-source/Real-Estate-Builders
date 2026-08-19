create type public.listing_purpose as enum ('buy', 'rent');
create type public.property_category as enum ('residential', 'commercial', 'plot');
create type public.property_status as enum ('available', 'under_offer', 'sold', 'rented', 'archived');
create type public.area_unit as enum ('marla', 'kanal', 'sqft', 'sqyd');

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  -- Free-text (not enum) so new listing types (e.g. "farmhouse") don't need
  -- a migration; validated against a curated list at the app layer.
  property_type text not null,
  purpose public.listing_purpose not null,
  category public.property_category not null,
  status public.property_status not null default 'available',
  price numeric(14, 2),
  price_is_visible boolean not null default true,
  area numeric(10, 2),
  area_unit public.area_unit not null default 'marla',
  bedrooms smallint,
  bathrooms smallint,
  parking_spaces smallint,
  address text,
  city text not null default 'Rawalpindi',
  neighborhood text not null default 'Chaklala Scheme 3',
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  is_featured boolean not null default false,
  is_published boolean not null default false,
  contact_name text,
  contact_phone text,
  contact_email text,
  meta_title text,
  meta_description text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint properties_price_check check (price is null or price >= 0),
  constraint properties_area_check check (area is null or area >= 0),
  constraint properties_bedrooms_check check (bedrooms is null or bedrooms >= 0),
  constraint properties_bathrooms_check check (bathrooms is null or bathrooms >= 0),
  constraint properties_parking_check check (parking_spaces is null or parking_spaces >= 0)
);

create index properties_purpose_category_idx on public.properties (purpose, category);
create index properties_status_idx on public.properties (status);
create index properties_published_idx on public.properties (is_published) where is_published = true;
create index properties_featured_idx on public.properties (is_featured) where is_featured = true;
create index properties_city_idx on public.properties (city);
create index properties_price_idx on public.properties (price);
create index properties_created_at_idx on public.properties (created_at desc);

create trigger set_properties_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();
