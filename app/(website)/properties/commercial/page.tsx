import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Commercial Properties" };

export default function CommercialPropertiesPage() {
  return (
    <PagePlaceholder
      title="Commercial Properties"
      description="Commercial property listings will appear here once available."
    />
  );
}
