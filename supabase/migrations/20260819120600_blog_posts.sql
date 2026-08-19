create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  -- Path inside the `blog` storage bucket.
  cover_image_path text,
  author_id uuid references public.profiles (id) on delete set null,
  is_published boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blog_posts_published_idx on public.blog_posts (is_published, published_at desc);

create trigger set_blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();
