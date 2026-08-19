import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE_LOCATION } from "@/lib/constants/site";

export function LocalArea() {
  return (
    <section className="bg-navy py-24 text-ivory lg:py-32">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <RevealItem>
          <SectionHeading
            eyebrow="Where We Work"
            title="Rooted in Rawalpindi"
            tone="ivory"
            description={`Based in ${SITE_LOCATION.area}, ${SITE_LOCATION.city}, and working with clients across the surrounding area. Being local means faster visits, real neighborhood knowledge, and a team that's easy to reach.`}
          />
          <a
            href={SITE_LOCATION.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-champagne underline decoration-champagne/50 decoration-2 underline-offset-4 hover:text-champagne-light"
          >
            Get Directions →
          </a>
        </RevealItem>

        <Reveal>
          <RevealItem>
            <div className="overflow-hidden rounded-sm border border-ivory/10">
              <iframe
                title={`${SITE_LOCATION.area} map`}
                src={`https://www.google.com/maps?q=${SITE_LOCATION.latitude},${SITE_LOCATION.longitude}&z=16&output=embed`}
                className="h-80 w-full grayscale-[0.3] sm:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
