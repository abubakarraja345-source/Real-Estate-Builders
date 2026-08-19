"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/features/auth/queries";
import type { Database } from "@/types/database";

type PropertyImage = Database["public"]["Tables"]["property_images"]["Row"];
export type ImageActionResult<T = undefined> =
  | { error: string }
  | { success: true; data: T };

export async function addPropertyImage(
  propertyId: string,
  storagePath: string,
  altText: string,
): Promise<ImageActionResult<PropertyImage>> {
  await requireStaff();
  const supabase = await createClient();

  const [{ count }, { data: existingCover }] = await Promise.all([
    supabase
      .from("property_images")
      .select("id", { count: "exact", head: true })
      .eq("property_id", propertyId),
    supabase
      .from("property_images")
      .select("id")
      .eq("property_id", propertyId)
      .eq("is_cover", true)
      .maybeSingle(),
  ]);

  const { data, error } = await supabase
    .from("property_images")
    .insert({
      property_id: propertyId,
      storage_path: storagePath,
      alt_text: altText || null,
      sort_order: count ?? 0,
      is_cover: !existingCover,
    })
    .select("*")
    .single();

  if (error || !data) {
    // Don't leave an orphaned file in Storage if the DB insert failed.
    await supabase.storage.from("properties").remove([storagePath]);
    return { error: error?.message ?? "Could not save the image." };
  }

  revalidatePath(`/admin/properties/${propertyId}/edit`);
  return { success: true, data };
}

export async function deletePropertyImage(
  propertyId: string,
  imageId: string,
): Promise<ImageActionResult> {
  await requireStaff();
  const supabase = await createClient();

  const { data: image } = await supabase
    .from("property_images")
    .select("storage_path, is_cover")
    .eq("id", imageId)
    .single();

  if (!image) return { error: "Image not found." };

  const { error: deleteError } = await supabase.from("property_images").delete().eq("id", imageId);
  if (deleteError) return { error: deleteError.message };

  await supabase.storage.from("properties").remove([image.storage_path]);

  if (image.is_cover) {
    const { data: next } = await supabase
      .from("property_images")
      .select("id")
      .eq("property_id", propertyId)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (next) {
      await supabase.from("property_images").update({ is_cover: true }).eq("id", next.id);
    }
  }

  revalidatePath(`/admin/properties/${propertyId}/edit`);
  return { success: true, data: undefined };
}

export async function setCoverPropertyImage(
  propertyId: string,
  imageId: string,
): Promise<ImageActionResult> {
  await requireStaff();
  const supabase = await createClient();

  await supabase
    .from("property_images")
    .update({ is_cover: false })
    .eq("property_id", propertyId)
    .eq("is_cover", true);

  const { error } = await supabase.from("property_images").update({ is_cover: true }).eq("id", imageId);
  if (error) return { error: error.message };

  revalidatePath(`/admin/properties/${propertyId}/edit`);
  return { success: true, data: undefined };
}

export async function reorderPropertyImages(
  propertyId: string,
  orderedImageIds: string[],
): Promise<ImageActionResult> {
  await requireStaff();
  const supabase = await createClient();

  const results = await Promise.all(
    orderedImageIds.map((id, index) =>
      supabase.from("property_images").update({ sort_order: index }).eq("id", id).eq("property_id", propertyId),
    ),
  );

  const failed = results.find((r) => r.error);
  if (failed?.error) return { error: failed.error.message };

  revalidatePath(`/admin/properties/${propertyId}/edit`);
  return { success: true, data: undefined };
}

export async function updatePropertyImageAlt(
  imageId: string,
  altText: string,
): Promise<ImageActionResult> {
  await requireStaff();
  const supabase = await createClient();
  const { error } = await supabase
    .from("property_images")
    .update({ alt_text: altText || null })
    .eq("id", imageId);

  if (error) return { error: error.message };
  return { success: true, data: undefined };
}
