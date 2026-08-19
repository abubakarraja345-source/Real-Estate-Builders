import type { Metadata } from "next";
import { CONTACT_PLACEHOLDER } from "@/lib/constants/site";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold">Contact Us</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Reach out with any questions about buying, selling, renting, or
        construction. Contact details below are placeholders pending the
        real business information.
      </p>
      <dl className="mt-2 flex flex-col gap-1 text-gray-700 dark:text-gray-300">
        <div>
          <dt className="inline font-medium">Address: </dt>
          <dd className="inline">{CONTACT_PLACEHOLDER.address}</dd>
        </div>
        <div>
          <dt className="inline font-medium">Phone: </dt>
          <dd className="inline">{CONTACT_PLACEHOLDER.phone}</dd>
        </div>
        <div>
          <dt className="inline font-medium">Email: </dt>
          <dd className="inline">{CONTACT_PLACEHOLDER.email}</dd>
        </div>
      </dl>
    </main>
  );
}
