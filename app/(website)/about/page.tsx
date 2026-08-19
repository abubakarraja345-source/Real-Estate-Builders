import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { SITE_BRAND } from "@/lib/constants/site";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <PagePlaceholder
      title="About Us"
      description={`Information about ${SITE_BRAND} will appear here once provided.`}
    />
  );
}
