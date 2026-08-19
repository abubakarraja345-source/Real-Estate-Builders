import type { Metadata } from "next";
import { Hero } from "@/components/website/hero";
import { TrustStrip } from "@/components/website/trust-strip";
import { FeaturedProperties } from "@/components/website/featured-properties";
import { PropertySearch } from "@/components/website/property-search";
import { WhyRayyan } from "@/components/website/why-rayyan";
import { ConstructionServices } from "@/components/website/construction-services";
import { FeaturedProjects } from "@/components/website/featured-projects";
import { AboutSplit } from "@/components/website/about-split";
import { HowItWorks } from "@/components/website/how-it-works";
import { LocalArea } from "@/components/website/local-area";
import { BlogInsights } from "@/components/website/blog-insights";
import { CtaSection } from "@/components/website/cta-section";
import { SITE_LOCATION } from "@/lib/constants/site";

const TITLE = "Rayyan Real Estate & Builders | Real Estate & Construction in Rawalpindi";
const DESCRIPTION = `Buy, sell, rent, and build in ${SITE_LOCATION.area}, ${SITE_LOCATION.city}. Rayyan Real Estate & Builders offers local property expertise and construction services from one team.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <FeaturedProperties />
      <PropertySearch />
      <WhyRayyan />
      <ConstructionServices />
      <FeaturedProjects />
      <AboutSplit />
      <HowItWorks />
      <LocalArea />
      <BlogInsights />
      <CtaSection />
    </main>
  );
}
