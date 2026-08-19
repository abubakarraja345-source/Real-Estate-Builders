import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default async function ConstructionProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <PagePlaceholder
      title="Project Details"
      description={`Details for project "${slug}" will appear here once available.`}
    />
  );
}
