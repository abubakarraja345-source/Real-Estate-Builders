import { createProperty } from "@/features/properties/actions";
import { PropertyForm } from "@/components/forms/property-form";

export default function NewPropertyPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold">Add Property</h1>
      <PropertyForm action={createProperty} />
    </main>
  );
}
