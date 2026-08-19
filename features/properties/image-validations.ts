export const MAX_IMAGE_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
export const ALLOWED_IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_MIME_TYPES)[number])) {
    return `"${file.name}" is not a supported format. Use JPEG, PNG, or WebP.`;
  }
  if (file.size === 0) {
    return `"${file.name}" appears to be empty.`;
  }
  if (file.size > MAX_IMAGE_FILE_SIZE_BYTES) {
    return `"${file.name}" is too large. Maximum size is 8MB.`;
  }
  return null;
}
