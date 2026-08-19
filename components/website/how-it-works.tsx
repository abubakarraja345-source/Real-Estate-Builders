import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealItem } from "@/components/ui/reveal";

const BUYING_STEPS = [
  { title: "Tell Us What You Need", description: "Share your budget, purpose, and preferred location." },
  { title: "Explore Suitable Properties", description: "We shortlist listings that actually match your criteria." },
  { title: "Visit & Evaluate", description: "See the properties in person, with honest guidance along the way." },
  { title: "Make Your Decision", description: "We support you through negotiation and closing." },
] as const;

const CONSTRUCTION_STEPS = [
  { title: "Consultation", description: "We discuss your vision, budget, and site." },
  { title: "Planning", description: "Design and scope are finalized before any work begins." },
  { title: "Construction", description: "Build proceeds under active project management." },
  { title: "Completion", description: "Final walkthrough and handover of your finished space." },
] as const;

function StepTrack({ title, steps }: { title: string; steps: readonly { title: string; description: string }[] }) {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-xs font-semibold tracking-[0.2em] text-champagne uppercase">{title}</h3>
      <ol className="flex flex-col gap-6">
        {steps.map((step, i) => (
          <RevealItem key={step.title}>
            <li className="flex gap-5">
              <span className="font-display shrink-0 text-2xl font-semibold text-navy/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-medium text-navy">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-site-slate">{step.description}</p>
              </div>
            </li>
          </RevealItem>
        ))}
      </ol>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Process"
          title="How It Works"
          align="center"
          description="A straightforward path, whether you're finding a property or building one."
        />

        <Reveal className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <StepTrack title="Buying a Property" steps={BUYING_STEPS} />
          <StepTrack title="Building With Us" steps={CONSTRUCTION_STEPS} />
        </Reveal>
      </Container>
    </section>
  );
}
