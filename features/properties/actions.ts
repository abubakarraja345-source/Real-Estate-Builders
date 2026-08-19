"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/features/auth/queries";
import { propertySchema } from "@/features/properties/validations";
import type { Database } from "@/types/database";

export type PropertyFormState =
  | { errors: Record<string, string[]>; formError?: string }
  | undefined;

function parseProperty(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  return propertySchema.safeParse(raw);
}

type PropertyInsert = Database["public"]["Tables"]["properties"]["Insert"];

export async function createProperty(
  _prevState: PropertyFormState,
  formData: FormData,
): Promise<PropertyFormState> {
  const profile = await requireStaff();
  const parsed = parseProperty(formData);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();
  const payload: PropertyInsert = { ...parsed.data, created_by: profile.id };
  const { data, error } = await supabase
    .from("properties")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    return {
      errors: {},
      formError: error.code === "23505" ? "That slug is already in use." : error.message,
    };
  }

  revalidatePath("/admin/properties");
  redirect(`/admin/properties/${data.id}/edit`);
}

export async function updateProperty(
  id: string,
  _prevState: PropertyFormState,
  formData: FormData,
): Promise<PropertyFormState> {
  await requireStaff();
  const parsed = parseProperty(formData);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("properties").update(parsed.data).eq("id", id);

  if (error) {
    return {
      errors: {},
      formError: error.code === "23505" ? "That slug is already in use." : error.message,
    };
  }

  revalidatePath("/admin/properties");
  revalidatePath(`/admin/properties/${id}/edit`);
  redirect("/admin/properties");
}

export async function archiveProperty(id: string) {
  await requireStaff();
  const supabase = await createClient();
  await supabase.from("properties").update({ status: "archived", is_published: false }).eq("id", id);
  revalidatePath("/admin/properties");
}

export async function deleteProperty(id: string) {
  await requireStaff();
  const supabase = await createClient();
  await supabase.from("properties").delete().eq("id", id);
  revalidatePath("/admin/properties");
}

export async function togglePublished(id: string, next: boolean) {
  await requireStaff();
  const supabase = await createClient();
  await supabase.from("properties").update({ is_published: next }).eq("id", id);
  revalidatePath("/admin/properties");
}

export async function toggleFeatured(id: string, next: boolean) {
  await requireStaff();
  const supabase = await createClient();
  await supabase.from("properties").update({ is_featured: next }).eq("id", id);
  revalidatePath("/admin/properties");
}
