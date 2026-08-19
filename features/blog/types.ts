// Shape is provisional until the Supabase `posts` table is defined in
// supabase/migrations/.
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
