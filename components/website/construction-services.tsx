import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

const SERVICES = [
  { title: "Residential Construction", description: "Homes built to last, from foundation to finish." },
  { title: "Commercial Construction", description: "Offices, shops, and buildings suited to your business." },
  { title: "Renovation & Remodeling", description: "Refreshing existing spaces without starting from scratch." },
  { title: "Project Management", description: "One point of contact overseeing your build from start to end." },
] as const;

export function ConstructionServices() {
  return (
    <section className="bg-navy py-24 text-ivory lg:py-32">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Construction"
            title="From Land to Living."
            tone="ivory"
            description="Beyond real estate, Rayyan Builders delivers construction services across Rawalpindi — from a single renovation to a full build."
          />
          <div className="shrink-0">
            <Button href="/construction" tone="on-navy" variant="outline">
              Explore Construction Services
            </Button>
          </div>
        </div>

        <Reveal className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <RevealItem key={service.title}>
              <div className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-sm border border-ivory/10 p-6">
                <div
                  className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-light to-navy transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `linear-gradient(${140 + i * 20}deg, #14304d, #0b1f33)` }}
                />
                <span className="absolute top-6 left-6 font-display text-3xl font-semibold text-champagne/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold text-ivory">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/65">{service.description}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
