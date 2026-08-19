import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants/site";

function whatsappHref() {
  const digits = CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}`;
}

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 85% 30%, rgba(200,169,107,0.25), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <RevealItem>
            <span className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-champagne uppercase">
              <span className="h-px w-8 bg-champagne" />
              Get Started
              <span className="h-px w-8 bg-champagne" />
            </span>
          </RevealItem>
          <RevealItem>
            <h2 className="font-display max-w-2xl text-3xl leading-tight font-semibold text-ivory text-balance sm:text-4xl">
              Looking for the Right Property?
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-md text-base text-ivory/70">
              Let&apos;s make your next property decision simpler.
            </p>
          </RevealItem>
          <RevealItem>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
              <Button href="/properties" tone="on-navy" variant="primary">
                Explore Properties
              </Button>
              <Button href="/contact" tone="on-navy" variant="outline">
                Contact Rayyan
              </Button>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ivory/70 underline decoration-champagne/60 decoration-2 underline-offset-4 hover:text-champagne"
              >
                WhatsApp
              </a>
            </div>
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
