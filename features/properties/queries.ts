import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/features/auth/queries";
import { getPropertyImageUrl } from "@/lib/supabase/storage";
import type { ListingPurpose, PropertyCategory } from "@/types/database";

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

export interface PropertyListFilters {
  purpose?: ListingPurpose;
  category?: PropertyCategory;
  location?: string;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
}

// `.or()` takes a raw PostgREST filter expression, so strip the characters
// that would let a search term break out of it (there's no legitimate use
// for them in a free-text location search anyway).
function sanitizeForOrFilter(value: string) {
  return value.replace(/[,()]/g, "").trim();
}

export const PROPERTIES_PAGE_SIZE = 9;

export async function listPublishedProperties(filters: PropertyListFilters = {}, page = 1) {
  const supabase = await createClient();

  let query = supabase
    .from("properties")
    .select(PUBLIC_CARD_COLUMNS, { count: "exact" })
    .eq("is_published", true);

  if (filters.purpose) query = query.eq("purpose", filters.purpose);
  if (filters.category) query = query.eq("category", filters.category);
  if (filters.bedrooms) query = query.gte("bedrooms", filters.bedrooms);
  if (filters.minPrice) query = query.gte("price", filters.minPrice);
  if (filters.maxPrice) query = query.lte("price", filters.maxPrice);
  if (filters.location) {
    const term = sanitizeForOrFilter(filters.location);
    if (term) query = query.or(`neighborhood.ilike.%${term}%,city.ilike.%${term}%`);
  }

  const from = (page - 1) * PROPERTIES_PAGE_SIZE;
  const to = from + PROPERTIES_PAGE_SIZE - 1;

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) return { properties: [], total: 0, error: true };

  const properties = await withCoverImages(supabase, data ?? []);
  return { properties, total: count ?? 0, error: false };
}

export async function getPublicPropertyBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

export async function getPublicPropertyImages(propertyId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("property_images")
    .select("*")
    .eq("property_id", propertyId)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data.map((img) => ({ ...img, url: getPropertyImageUrl(img.storage_path) }));
}
