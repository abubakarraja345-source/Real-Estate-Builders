-- Three public buckets, one per content type, each holding files under an
-- {entity_id}/ prefix (e.g. "properties/<property_id>/1.jpg"). Public so
-- the website can render images via plain public URLs with no signing;
-- writes are restricted to staff below.
insert into storage.buckets (id, name, public)
values
  ('properties', 'properties', true),
  ('projects', 'projects', true),
  ('blog', 'blog', true)
on conflict (id) do nothing;

create policy "public_read_media_buckets"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('properties', 'projects', 'blog'));

create policy "staff_insert_media_buckets"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('properties', 'projects', 'blog') and public.is_staff());

create policy "staff_update_media_buckets"
  on storage.objects for update
  to authenticated
  using (bucket_id in ('properties', 'projects', 'blog') and public.is_staff())
  with check (bucket_id in ('properties', 'projects', 'blog') and public.is_staff());

create policy "staff_delete_media_buckets"
  on storage.objects for delete
  to authenticated
  using (bucket_id in ('properties', 'projects', 'blog') and public.is_staff());
