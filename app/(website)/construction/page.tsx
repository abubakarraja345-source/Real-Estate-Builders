import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Construction" };

export default function ConstructionPage() {
  return (
    <PagePlaceholder
      title="Construction"
      description="An overview of our construction services and projects will appear here."
    />
  );
}
