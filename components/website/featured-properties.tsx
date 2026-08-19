import { listFeaturedProperties } from "@/features/properties/queries";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property/property-card";

export async function FeaturedProperties() {
  const properties = await listFeaturedProperties(6);

  return (
    <section className="bg-ivory py-24 lg:py-32">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Listings"
            title="Properties Worth Exploring"
            description="A selection of homes, plots, and commercial spaces currently available through Rayyan Real Estate & Builders."
          />
          <div className="shrink-0">
            <Button href="/properties" variant="outline">
              View All Properties
            </Button>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-navy/15 bg-white/50 px-6 py-20 text-center">
            <span className="font-display text-xl text-navy">Listings are on their way</span>
            <p className="max-w-sm text-sm text-site-slate">
              Published properties will appear here automatically as soon as they&apos;re added
              in the admin dashboard.
            </p>
          </div>
        ) : (
          <Reveal className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <RevealItem key={property.id}>
                <PropertyCard property={property} />
              </RevealItem>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
