import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PagePlaceholder
      title="Edit Blog Post"
      description={`The edit form for post "${id}" will appear here once connected to Supabase.`}
    />
  );
}
