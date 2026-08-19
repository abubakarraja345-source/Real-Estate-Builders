"use client";

import { createClient } from "@/lib/supabase/client";
import { validateImageFile } from "@/features/properties/image-validations";

function extensionFromFile(file: File): string {
  const fromName = file.name.split(".").pop();
  if (fromName && fromName.length <= 5 && /^[a-z0-9]+$/i.test(fromName)) {
    return fromName.toLowerCase();
  }
  return file.type.split("/")[1] ?? "jpg";
}

// Uploads directly from the browser to Supabase Storage (not proxied
// through a Server Action) so large files never hit the Next.js server's
// body-size limit. The existing storage RLS policies (staff-only writes)
// authorize this using the caller's own session — no service role needed.
export async function uploadPropertyImageFile(
  propertyId: string,
  file: File,
): Promise<{ storagePath: string } | { error: string }> {
  const validationError = validateImageFile(file);
  if (validationError) return { error: validationError };

  const supabase = createClient();
  const path = `${propertyId}/${crypto.randomUUID()}.${extensionFromFile(file)}`;

  const { error } = await supabase.storage.from("properties").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) return { error: error.message };
  return { storagePath: path };
}
