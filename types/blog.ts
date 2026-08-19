// Mirrors the `blog_posts` table defined in supabase/migrations/.
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  coverImagePath: string | null;
  authorId: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
}
