alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.construction_projects enable row level security;
alter table public.project_images enable row level security;
alter table public.blog_posts enable row level security;
alter table public.leads enable row level security;

-- ---------------------------------------------------------------------
-- profiles: a user can see/update their own row; staff can see everyone's.
-- Role changes (promoting to admin) are done manually via SQL, not through
-- the app, so there is no general-purpose update-role policy.
-- ---------------------------------------------------------------------
create policy "profiles_select_own_or_staff"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_staff());

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- ---------------------------------------------------------------------
-- properties: public can read published listings; staff (admin/editor)
-- can read/write everything, published or not.
-- ---------------------------------------------------------------------
create policy "properties_public_read_published"
  on public.properties for select
  to anon, authenticated
  using (is_published = true);

create policy "properties_staff_read_all"
  on public.properties for select
  to authenticated
  using (public.is_staff());

create policy "properties_staff_insert"
  on public.properties for insert
  to authenticated
  with check (public.is_staff());

create policy "properties_staff_update"
  on public.properties for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "properties_staff_delete"
  on public.properties for delete
  to authenticated
  using (public.is_staff());

-- ---------------------------------------------------------------------
-- property_images: readable when the parent property is published, or by
-- staff regardless of publish state. Only staff can write.
-- ---------------------------------------------------------------------
create policy "property_images_public_read"
  on public.property_images for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.properties p
      where p.id = property_images.property_id and p.is_published = true
    )
  );

create policy "property_images_staff_read_all"
  on public.property_images for select
  to authenticated
  using (public.is_staff());

create policy "property_images_staff_insert"
  on public.property_images for insert
  to authenticated
  with check (public.is_staff());

create policy "property_images_staff_update"
  on public.property_images for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "property_images_staff_delete"
  on public.property_images for delete
  to authenticated
  using (public.is_staff());

-- ---------------------------------------------------------------------
-- construction_projects: same pattern as properties.
-- ---------------------------------------------------------------------
create policy "construction_projects_public_read_published"
  on public.construction_projects for select
  to anon, authenticated
  using (is_published = true);

create policy "construction_projects_staff_read_all"
  on public.construction_projects for select
  to authenticated
  using (public.is_staff());

create policy "construction_projects_staff_insert"
  on public.construction_projects for insert
  to authenticated
  with check (public.is_staff());

create policy "construction_projects_staff_update"
  on public.construction_projects for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "construction_projects_staff_delete"
  on public.construction_projects for delete
  to authenticated
  using (public.is_staff());

-- ---------------------------------------------------------------------
-- project_images: same pattern as property_images.
-- ---------------------------------------------------------------------
create policy "project_images_public_read"
  on public.project_images for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.construction_projects cp
      where cp.id = project_images.project_id and cp.is_published = true
    )
  );

create policy "project_images_staff_read_all"
  on public.project_images for select
  to authenticated
  using (public.is_staff());

create policy "project_images_staff_insert"
  on public.project_images for insert
  to authenticated
  with check (public.is_staff());

create policy "project_images_staff_update"
  on public.project_images for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "project_images_staff_delete"
  on public.project_images for delete
  to authenticated
  using (public.is_staff());

-- ---------------------------------------------------------------------
-- blog_posts: same pattern as properties.
-- ---------------------------------------------------------------------
create policy "blog_posts_public_read_published"
  on public.blog_posts for select
  to anon, authenticated
  using (is_published = true);

create policy "blog_posts_staff_read_all"
  on public.blog_posts for select
  to authenticated
  using (public.is_staff());

create policy "blog_posts_staff_insert"
  on public.blog_posts for insert
  to authenticated
  with check (public.is_staff());

create policy "blog_posts_staff_update"
  on public.blog_posts for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "blog_posts_staff_delete"
  on public.blog_posts for delete
  to authenticated
  using (public.is_staff());

-- ---------------------------------------------------------------------
-- leads: anyone can submit a lead (contact/property/project forms), but
-- only staff can read or manage the pipeline. There is no public update or
-- delete policy, so a submitted lead cannot be altered by its submitter.
-- ---------------------------------------------------------------------
create policy "leads_public_insert"
  on public.leads for insert
  to anon, authenticated
  with check (true);

create policy "leads_staff_read"
  on public.leads for select
  to authenticated
  using (public.is_staff());

create policy "leads_staff_update"
  on public.leads for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "leads_staff_delete"
  on public.leads for delete
  to authenticated
  using (public.is_staff());
