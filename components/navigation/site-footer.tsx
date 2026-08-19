import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import {
  BUSINESS_HOURS,
  CONTACT_INFO,
  SITE_BRAND,
  SITE_LOCATION,
  SITE_SLOGAN,
} from "@/lib/constants/site";

const FOOTER_LINKS = {
  Properties: [
    { href: "/properties/buy", label: "Buy" },
    { href: "/properties/rent", label: "Rent" },
    { href: "/properties/commercial", label: "Commercial" },
    { href: "/properties/plots", label: "Plots" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/construction", label: "Construction" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export function SiteFooter() {
  return (
    <footer className="bg-navy text-ivory">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo-emblem-inverted.png"
              alt={SITE_BRAND}
              width={36}
              height={33}
              className="h-8 w-auto"
            />
            <span className="font-display text-lg font-semibold">{SITE_BRAND}</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-ivory/70">{SITE_SLOGAN}.</p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading} className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold tracking-[0.15em] text-champagne uppercase">
              {heading}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/75 transition-colors hover:text-champagne"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold tracking-[0.15em] text-champagne uppercase">Contact</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-ivory/75">
            <li>
              {SITE_LOCATION.area}, {SITE_LOCATION.city}
            </li>
            <li>
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`} className="hover:text-champagne">
                {CONTACT_INFO.phone}
              </a>
            </li>
            <li>
              <a
                href={`tel:${CONTACT_INFO.phoneSecondary.replace(/\s/g, "")}`}
                className="hover:text-champagne"
              >
                {CONTACT_INFO.phoneSecondary}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-champagne">
                {CONTACT_INFO.email}
              </a>
            </li>
          </ul>
          <div className="mt-2 flex flex-col gap-1 border-t border-ivory/10 pt-4 text-xs text-ivory/60">
            {BUSINESS_HOURS.slice(0, 2).map((h) => (
              <div key={h.day} className="flex justify-between gap-6">
                <span>{h.day}</span>
                <span>{h.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-ivory/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-ivory/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_BRAND}. All rights reserved.
          </p>
          <p>
            {SITE_LOCATION.area}, {SITE_LOCATION.city}, {SITE_LOCATION.country}
          </p>
        </Container>
      </div>
    </footer>
  );
}
