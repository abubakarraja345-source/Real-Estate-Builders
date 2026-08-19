import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Construction Projects" };

export default function ConstructionProjectsPage() {
  return (
    <PagePlaceholder
      title="Construction Projects"
      description="Our construction projects will appear here once available."
    />
  );
}
