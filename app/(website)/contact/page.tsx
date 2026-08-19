import type { Metadata } from "next";
import { BUSINESS_HOURS, CONTACT_INFO } from "@/lib/constants/site";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Reach out with any questions about buying, selling, renting, or
          construction.
        </p>
        <dl className="mt-2 flex flex-col gap-1 text-gray-700 dark:text-gray-300">
          <div>
            <dt className="inline font-medium">Address: </dt>
            <dd className="inline">{CONTACT_INFO.address}</dd>
          </div>
          <div>
            <dt className="inline font-medium">Phone: </dt>
            <dd className="inline">
              {CONTACT_INFO.phone}, {CONTACT_INFO.phoneSecondary}
            </dd>
          </div>
          <div>
            <dt className="inline font-medium">WhatsApp: </dt>
            <dd className="inline">{CONTACT_INFO.whatsapp}</dd>
          </div>
          <div>
            <dt className="inline font-medium">Email: </dt>
            <dd className="inline">{CONTACT_INFO.email}</dd>
          </div>
        </dl>
      </div>

      <div>
        <h2 className="text-lg font-medium">Business Hours</h2>
        <dl className="mt-2 flex flex-col gap-1 text-gray-700 dark:text-gray-300">
          {BUSINESS_HOURS.map(({ day, hours }) => (
            <div key={day} className="flex justify-between gap-4 sm:max-w-xs">
              <dt>{day}</dt>
              <dd>{hours}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
