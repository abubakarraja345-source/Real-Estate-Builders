import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <PagePlaceholder
      title="Blog"
      description="Articles and updates will appear here once published."
    />
  );
}
