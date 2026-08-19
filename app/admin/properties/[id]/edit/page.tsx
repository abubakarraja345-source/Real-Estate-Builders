import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PagePlaceholder
      title="Edit Property"
      description={`The edit form for property "${id}" will appear here once connected to Supabase.`}
    />
  );
}
