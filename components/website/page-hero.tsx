import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative -mt-20 overflow-hidden bg-navy pt-40 pb-20 text-ivory">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 15% 20%, rgba(200,169,107,0.3), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal className="flex max-w-2xl flex-col gap-5">
          <RevealItem>
            <span className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-champagne uppercase">
              <span className="h-px w-10 bg-champagne" />
              {eyebrow}
            </span>
          </RevealItem>
          <RevealItem>
            <h1 className="font-display text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
              {title}
            </h1>
          </RevealItem>
          {description && (
            <RevealItem>
              <p className="max-w-lg text-base leading-relaxed text-ivory/75">{description}</p>
            </RevealItem>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
