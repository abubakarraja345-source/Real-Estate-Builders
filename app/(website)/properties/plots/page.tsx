import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Plots & Land" };

export default function PlotsPage() {
  return (
    <PagePlaceholder
      title="Plots & Land"
      description="Plot and land listings will appear here once available."
    />
  );
}
