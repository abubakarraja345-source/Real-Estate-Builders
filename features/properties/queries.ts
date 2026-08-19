import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/features/auth/queries";

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
