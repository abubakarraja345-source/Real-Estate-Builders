import { notFound } from "next/navigation";
import { updateProperty } from "@/features/properties/actions";
import { getPropertyById } from "@/features/properties/queries";
import { PropertyForm } from "@/components/forms/property-form";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold">Edit Property</h1>
      <PropertyForm action={updateProperty.bind(null, id)} property={property} />
    </main>
  );
}
