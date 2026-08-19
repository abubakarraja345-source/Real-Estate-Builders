import type { Metadata } from "next";
import Link from "next/link";
import {
  listPublishedProperties,
  PROPERTIES_PAGE_SIZE,
  type PropertyListFilters,
} from "@/features/properties/queries";
import { PageHero } from "@/components/website/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyFilterBar } from "@/components/property/property-filter-bar";
import { PropertyPagination } from "@/components/property/property-pagination";
import type { ListingPurpose, PropertyCategory } from "@/types/database";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse published residential, commercial, and plot listings from Rayyan Real Estate & Builders in Rawalpindi.",
  alternates: { canonical: "/properties" },
};

const VALID_PURPOSE: ListingPurpose[] = ["buy", "rent"];
const VALID_CATEGORY: PropertyCategory[] = ["residential", "commercial", "plot"];

function parseFilters(sp: Record<string, string | string[] | undefined>): PropertyListFilters {
  const get = (key: string) => {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const purpose = get("purpose");
  const category = get("category");
  const location = get("location");
  const bedrooms = get("bedrooms");
  const minPrice = get("minPrice");
  const maxPrice = get("maxPrice");

  return {
    purpose: purpose && VALID_PURPOSE.includes(purpose as ListingPurpose) ? (purpose as ListingPurpose) : undefined,
    category:
      category && VALID_CATEGORY.includes(category as PropertyCategory)
        ? (category as PropertyCategory)
        : undefined,
    location: location || undefined,
    bedrooms: bedrooms ? Number(bedrooms) || undefined : undefined,
    minPrice: minPrice ? Number(minPrice) || undefined : undefined,
    maxPrice: maxPrice ? Number(maxPrice) || undefined : undefined,
  };
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const pageParam = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const page = Math.max(1, Number(pageParam) || 1);

  const { properties, total, error } = await listPublishedProperties(filters, page);
  const totalPages = Math.max(1, Math.ceil(total / PROPERTIES_PAGE_SIZE));

  const urlSearchParams = new URLSearchParams(
    Object.entries(sp).flatMap(([k, v]) => (v == null ? [] : [[k, Array.isArray(v) ? v[0] : v]])) as [
      string,
      string,
    ][],
  );

  return (
    <main>
      <PageHero
        eyebrow="Properties"
        title="Find Your Next Property"
        description="Explore available residential, commercial, and plot listings from Rayyan Real Estate & Builders."
      />

      <section className="bg-ivory-dim py-16 lg:py-20">
        <Container>
          <PropertyFilterBar filters={filters} />
        </Container>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <Container className="flex flex-col gap-10">
          {error ? (
            <div className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-navy/15 bg-white/50 px-6 py-20 text-center">
              <span className="font-display text-xl text-navy">Something went wrong</span>
              <p className="max-w-sm text-sm text-site-slate">
                We couldn&apos;t load properties right now. Please try again shortly.
              </p>
            </div>
          ) : properties.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-sm border border-dashed border-navy/15 bg-white/50 px-6 py-20 text-center">
              <span className="font-display text-xl text-navy">No properties match your search.</span>
              <p className="max-w-sm text-sm text-site-slate">
                Try adjusting or clearing your filters to see more listings.
              </p>
              <Link
                href="/properties"
                className="mt-2 rounded-sm border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy hover:border-champagne hover:text-champagne"
              >
                Clear Filters
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-site-slate">
                {total} {total === 1 ? "property" : "properties"} found
              </p>
              <Reveal className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <RevealItem key={property.id}>
                    <PropertyCard property={property} />
                  </RevealItem>
                ))}
              </Reveal>
              <PropertyPagination page={page} totalPages={totalPages} searchParams={urlSearchParams} />
            </>
          )}
        </Container>
      </section>
    </main>
  );
}
