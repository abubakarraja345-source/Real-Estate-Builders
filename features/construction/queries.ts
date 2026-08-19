import { createClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";

const CARD_COLUMNS =
  "id, slug, title, description, location, city, project_type, status, completion_percentage, is_featured";

export async function listFeaturedConstructionProjects(limit = 3) {
  const supabase = await createClient();

  const { data: featured } = await supabase
    .from("construction_projects")
    .select(CARD_COLUMNS)
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  let rows = featured ?? [];

  if (rows.length < limit) {
    const { data: rest } = await supabase
      .from("construction_projects")
      .select(CARD_COLUMNS)
      .eq("is_published", true)
      .eq("is_featured", false)
      .order("created_at", { ascending: false })
      .limit(limit - rows.length);
    rows = [...rows, ...(rest ?? [])];
  }

  if (rows.length === 0) return [];

  const { data: covers } = await supabase
    .from("project_images")
    .select("project_id, storage_path")
    .eq("is_cover", true)
    .in(
      "project_id",
      rows.map((r) => r.id),
    );

  const coverByProjectId = new Map((covers ?? []).map((c) => [c.project_id, c.storage_path]));

  return rows.map((r) => ({
    ...r,
    coverImageUrl: coverByProjectId.has(r.id)
      ? getPublicStorageUrl("projects", coverByProjectId.get(r.id)!)
      : null,
  }));
}
