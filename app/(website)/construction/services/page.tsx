import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Construction Services" };

export default function ConstructionServicesPage() {
  return (
    <PagePlaceholder
      title="Construction Services"
      description="Details of our construction services will appear here."
    />
  );
}
