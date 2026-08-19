import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealItem } from "@/components/ui/reveal";

const FEATURES = [
  {
    title: "Local Market Expertise",
    description:
      "Years of on-the-ground familiarity with Chaklala Scheme 3 and the surrounding Rawalpindi market — the kind of detail you only get from working the area directly.",
    icon: (
      <path
        d="M4 21V9l8-6 8 6v12M9 21v-7h6v7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Personalized Guidance",
    description:
      "Every client's needs are different. We take the time to understand what you're actually looking for before recommending anything.",
    icon: (
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-4 3.5-7 8-7s8 3 8 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Property & Construction Expertise",
    description:
      "One team for both sides of the transaction — buying and selling as well as building and renovating.",
    icon: (
      <path
        d="M3 21h18M6 21V8l6-4 6 4v13M10 21v-6h4v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "End-to-End Support",
    description:
      "From the first conversation to handover, we stay involved — not just until the paperwork is signed.",
    icon: (
      <path
        d="m5 13 4 4L19 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
] as const;

export function WhyRayyan() {
  return (
    <section className="bg-ivory-dim py-24 lg:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Why Rayyan"
          title="Local Knowledge. Clear Advice. Better Decisions."
          align="center"
          description="Buying, selling, renting, or building a property is a significant decision. We're here to make it a straightforward one."
        />

        <Reveal className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <RevealItem key={feature.title} className="flex flex-col items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/40 text-navy">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  {feature.icon}
                </svg>
              </span>
              <h3 className="font-display text-lg font-semibold text-navy">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-site-slate">{feature.description}</p>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
