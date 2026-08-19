import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";

const selectClass =
  "w-full appearance-none rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus:border-champagne focus:outline-none";

export function PropertySearch() {
  return (
    <section className="bg-ivory-dim py-16 lg:py-20">
      <Container>
        <Reveal>
          <RevealItem>
            <form
              method="get"
              action="/properties"
              className="grid grid-cols-1 gap-4 rounded-sm border border-navy/10 bg-white p-6 shadow-[0_32px_64px_-32px_rgba(11,31,51,0.15)] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr_1fr_auto] lg:items-end lg:gap-3 lg:p-8"
            >
              <label className="flex flex-col gap-2 text-xs font-semibold tracking-wide text-navy/70 uppercase">
                Purpose
                <select name="purpose" className={selectClass} defaultValue="buy">
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-xs font-semibold tracking-wide text-navy/70 uppercase">
                Property Type
                <select name="category" className={selectClass} defaultValue="">
                  <option value="">Any Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="plot">Plot</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-xs font-semibold tracking-wide text-navy/70 uppercase">
                Location
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Chaklala Scheme 3"
                  className={selectClass}
                />
              </label>

              <label className="flex flex-col gap-2 text-xs font-semibold tracking-wide text-navy/70 uppercase">
                Bedrooms
                <select name="bedrooms" className={selectClass} defaultValue="">
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </label>

              <button
                type="submit"
                className="rounded-sm bg-navy px-6 py-3 text-sm font-semibold tracking-wide text-ivory transition-colors hover:bg-navy-light"
              >
                Search Properties
              </button>
            </form>
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
