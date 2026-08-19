import Link from "next/link";
import {
  CORE_SERVICES,
  SITE_BRAND,
  SITE_LOCATION,
  SITE_TAGLINE,
} from "@/lib/constants/site";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
      <div>
        <h1 className="text-3xl font-semibold">{SITE_BRAND}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {SITE_TAGLINE} &mdash; serving {SITE_LOCATION.area},{" "}
          {SITE_LOCATION.city}.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-medium">Our Services</h2>
        <ul className="mt-2 grid grid-cols-1 gap-1 text-gray-700 dark:text-gray-300 sm:grid-cols-2">
          {CORE_SERVICES.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>

      <Link href="/contact" className="underline">
        Contact us
      </Link>
    </main>
  );
}
