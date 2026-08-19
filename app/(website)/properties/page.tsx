import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Properties" };

export default function PropertiesPage() {
  return (
    <PagePlaceholder
      title="Properties"
      description="Browse residential, commercial, and plot listings. Property listings will appear here once available."
    />
  );
}
