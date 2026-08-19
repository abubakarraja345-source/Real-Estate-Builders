import { createClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";

export async function listLatestBlogPosts(limit = 3) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image_path, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((post) => ({
    ...post,
    coverImageUrl: post.cover_image_path ? getPublicStorageUrl("blog", post.cover_image_path) : null,
  }));
}
