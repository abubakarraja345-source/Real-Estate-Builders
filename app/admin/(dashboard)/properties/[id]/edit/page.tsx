import { notFound } from "next/navigation";
import { updateProperty } from "@/features/properties/actions";
import { getPropertyById, getPropertyImages } from "@/features/properties/queries";
import { PropertyForm } from "@/components/forms/property-form";
import { PropertyImageManager } from "@/components/forms/property-image-manager";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  const images = await getPropertyImages(id);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-10">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">Edit Property</h1>
        <PropertyForm action={updateProperty.bind(null, id)} property={property} />
      </div>

      <div className="flex flex-col gap-4 border-t border-gray-200 pt-8 dark:border-gray-800">
        <h2 className="text-lg font-medium">Photos</h2>
        <PropertyImageManager propertyId={id} initialImages={images} />
      </div>
    </main>
  );
}
