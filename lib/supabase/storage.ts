// Public Storage URLs are deterministic (no signing needed for public
// buckets), so this is plain string-building rather than a network call —
// safe to use from Server or Client Components without a Supabase client.
export function getPublicStorageUrl(bucket: string, path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

export function getPropertyImageUrl(storagePath: string): string {
  return getPublicStorageUrl("properties", storagePath);
}
