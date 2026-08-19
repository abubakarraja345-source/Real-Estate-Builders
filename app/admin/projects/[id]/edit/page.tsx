import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PagePlaceholder
      title="Edit Construction Project"
      description={`The edit form for project "${id}" will appear here once connected to Supabase.`}
    />
  );
}
