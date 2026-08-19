import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <PagePlaceholder
      title="Property Details"
      description={`Details for property "${slug}" will appear here once available.`}
    />
  );
}
