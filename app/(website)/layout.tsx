import Link from "next/link";
import { SiteLogo } from "@/components/layout/site-logo";
import { CONTACT_INFO, SITE_BRAND, SITE_LOCATION } from "@/lib/constants/site";

const NAV_LINKS = [
  { href: "/properties", label: "Properties" },
  { href: "/construction", label: "Construction" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <SiteLogo />
          <nav className="flex flex-wrap gap-5 text-sm">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t border-gray-200 px-6 py-8 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
        <div className="mx-auto flex max-w-5xl flex-col gap-2">
          <p className="font-medium text-gray-900 dark:text-gray-100">{SITE_BRAND}</p>
          <p>
            {SITE_LOCATION.area}, {SITE_LOCATION.city}, {SITE_LOCATION.country}
          </p>
          <p>
            {CONTACT_INFO.phone} · {CONTACT_INFO.phoneSecondary} · {CONTACT_INFO.email}
          </p>
        </div>
      </footer>
    </div>
  );
}
