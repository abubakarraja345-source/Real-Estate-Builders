import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Container } from "@/components/ui/container";

// No verified performance figures exist yet (years active, deals closed,
// etc.), so this shows what's actually true about the business rather
// than invented statistics.
const TRUST_POINTS = [
  "Local Market Knowledge",
  "Personal Guidance",
  "Property & Construction",
  "Client-Focused Service",
] as const;

export function TrustStrip() {
  return (
    <section className="border-b border-navy/8 bg-ivory py-10">
      <Container>
        <Reveal className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {TRUST_POINTS.map((point) => (
            <RevealItem key={point} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" aria-hidden="true" />
              <span className="text-sm font-medium tracking-wide text-navy/80">{point}</span>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
