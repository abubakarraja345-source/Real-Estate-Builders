import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Properties for Sale" };

export default function PropertiesBuyPage() {
  return (
    <PagePlaceholder
      title="Properties for Sale"
      description="Properties available for purchase will appear here once available."
    />
  );
}
