# Rayyan Real Estate & Builders

Website and admin dashboard for Rayyan Real Estate and Builders, a real
estate and construction business based in Chaklala Scheme 3, Rawalpindi,
Pakistan.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

- `app/(website)/` &mdash; the public website (properties, construction, about, contact, blog).
- `app/admin/` &mdash; the admin dashboard for managing content.
- `app/api/` &mdash; route handlers (leads intake, on-demand revalidation).
- `components/` &mdash; reusable UI, grouped by domain (`ui`, `layout`, `navigation`, `property`, `construction`, `forms`, `blog`, `shared`).
- `features/` &mdash; business logic per domain (`actions.ts`, `queries.ts`, `validations.ts`, `types.ts`).
- `lib/supabase/` &mdash; Supabase client helpers for the browser, server, and middleware.
- `lib/constants/` &mdash; shared site constants (brand name, placeholder contact info, services list).
- `types/database.ts` &mdash; hand-written to match `supabase/migrations/`; regenerate with the Supabase CLI once the project is linked.
- `supabase/migrations/` &mdash; SQL migrations: schema for `profiles`, `properties`, `property_images`, `construction_projects`, `project_images`, `blog_posts`, `leads`, Row Level Security policies, and storage buckets.
- `proxy.ts` &mdash; Next.js 16 Proxy (formerly `middleware.ts`); refreshes the Supabase auth session cookie on every request.

## Status

The database schema and RLS policies are designed and written as SQL
migrations, but no live Supabase project is connected yet &mdash; that
requires manual setup (see below). No business content has been entered,
and property/blog/lead CRUD is not implemented yet. Contact details
throughout the site are placeholders &mdash; see `lib/constants/site.ts`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in real values once a Supabase
project exists.

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard's SQL Editor, run each file in
   `supabase/migrations/` **in filename order** (they're timestamp-prefixed).
   This creates the schema, RLS policies, and storage buckets.
3. In Project Settings &gt; API, copy the Project URL and `anon public` key
   into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Create your own admin login: Authentication &gt; Users &gt; Add user
   (email + password). This auto-creates a matching `profiles` row via
   trigger, defaulted to the `editor` role.
5. Promote that account to `admin` by running in the SQL Editor:
   ```sql
   update public.profiles set role = 'admin' where email = 'your@email.com';
   ```
6. Once you have the CLI linked, regenerate `types/database.ts` from the
   live schema:
   ```bash
   npx supabase gen types typescript --project-id <project-id> > types/database.ts
   ```
