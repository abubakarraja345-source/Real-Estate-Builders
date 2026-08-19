import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { SITE_LOCATION, SITE_TAGLINE } from "@/lib/constants/site";

export function AboutSplit() {
  return (
    <section className="bg-ivory-dim py-24 lg:py-32">
      <Container>
        <Reveal className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <RevealItem>
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-navy">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, rgba(200,169,107,0.35), transparent 55%)",
                }}
              />
              <Image
                src="/images/logo-emblem-inverted.png"
                alt=""
                width={220}
                height={200}
                className="relative h-40 w-auto opacity-90"
              />
            </div>
          </RevealItem>

          <RevealItem>
            <div className="relative flex flex-col gap-5 pl-6">
              <span className="absolute top-1 left-0 h-full w-px bg-champagne" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-[0.2em] text-champagne uppercase">
                About Us
              </span>
              <h2 className="font-display text-3xl leading-tight font-semibold text-navy text-balance sm:text-4xl">
                Rayyan Real Estate &amp; Builders
              </h2>
              <p className="max-w-md text-base leading-relaxed text-site-slate">
                {SITE_TAGLINE}. Based in {SITE_LOCATION.area}, {SITE_LOCATION.city}, we work
                directly with clients across buying, selling, renting, and construction — combining
                property expertise with hands-on building experience under one roof.
              </p>
              <div className="mt-2">
                <Button href="/about" variant="outline">
                  Learn More About Us
                </Button>
              </div>
            </div>
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
