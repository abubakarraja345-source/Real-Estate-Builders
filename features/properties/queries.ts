import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/features/auth/queries";
import { getPropertyImageUrl } from "@/lib/supabase/storage";

const PUBLIC_CARD_COLUMNS =
  "id, slug, title, property_type, purpose, category, price, price_is_visible, area, area_unit, bedrooms, bathrooms, neighborhood, city, is_featured";

export async function listPropertiesForAdmin() {
  await requireStaff();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("id, title, slug, purpose, category, status, price, is_published, is_featured, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getPropertyById(id: string) {
  await requireStaff();
  const supabase = await createClient();
  const { data, error } = await supabase.from("properties").select("*").eq("id", id).single();

  if (error) return null;
  return data;
}

// --- Public reads (no auth required — RLS already restricts these to
// published rows for anonymous/non-staff callers). ---

async function withCoverImages<T extends { id: string }>(
  supabase: Awaited<ReturnType<typeof createClient>>,
  rows: T[],
) {
  if (rows.length === 0) return rows.map((r) => ({ ...r, coverImageUrl: null as string | null }));

  const { data: covers } = await supabase
    .from("property_images")
    .select("property_id, storage_path")
    .eq("is_cover", true)
    .in(
      "property_id",
      rows.map((r) => r.id),
    );

  const coverByPropertyId = new Map((covers ?? []).map((c) => [c.property_id, c.storage_path]));

  return rows.map((r) => ({
    ...r,
    coverImageUrl: coverByPropertyId.has(r.id) ? getPropertyImageUrl(coverByPropertyId.get(r.id)!) : null,
  }));
}

export async function listFeaturedProperties(limit = 6) {
  const supabase = await createClient();

  const { data: featured } = await supabase
    .from("properties")
    .select(PUBLIC_CARD_COLUMNS)
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  let rows = featured ?? [];

  if (rows.length < limit) {
    const { data: rest } = await supabase
      .from("properties")
      .select(PUBLIC_CARD_COLUMNS)
      .eq("is_published", true)
      .eq("is_featured", false)
      .order("created_at", { ascending: false })
      .limit(limit - rows.length);
    rows = [...rows, ...(rest ?? [])];
  }

  return withCoverImages(supabase, rows);
}

export async function getPropertyImages(propertyId: string) {
  await requireStaff();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("property_images")
    .select("*")
    .eq("property_id", propertyId)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}
