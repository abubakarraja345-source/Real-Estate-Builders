-- Defense-in-depth: property images upload directly from the browser to
-- Storage (not proxied through a server route), so the app-level file
-- type/size validation needs a server-side backstop. Config only — no
-- table changes.
update storage.buckets
set file_size_limit = 8388608, -- 8 MB
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'properties';
