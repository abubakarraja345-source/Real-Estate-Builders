import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Properties for Rent" };

export default function PropertiesRentPage() {
  return (
    <PagePlaceholder
      title="Properties for Rent"
      description="Properties available for rent will appear here once available."
    />
  );
}
