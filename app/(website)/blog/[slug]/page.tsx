import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <PagePlaceholder
      title="Blog Post"
      description={`The post "${slug}" will appear here once published.`}
    />
  );
}
