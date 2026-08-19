import Link from "next/link";
import {
  archiveProperty,
  deleteProperty,
  toggleFeatured,
  togglePublished,
} from "@/features/properties/actions";
import { listPropertiesForAdmin } from "@/features/properties/queries";
import { ConfirmSubmitButton } from "@/components/forms/confirm-submit-button";

const linkButtonClass = "text-sm hover:underline";

export default async function AdminPropertiesPage() {
  const properties = await listPropertiesForAdmin();

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Properties</h1>
        <Link
          href="/admin/properties/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white dark:bg-gray-100 dark:text-gray-900"
        >
          Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No properties yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <tr>
                <th className="py-2 pr-4 font-medium">Title</th>
                <th className="py-2 pr-4 font-medium">Purpose / Category</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 pr-4 font-medium">Price</th>
                <th className="py-2 pr-4 font-medium">Published</th>
                <th className="py-2 pr-4 font-medium">Featured</th>
                <th className="py-2 pr-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-2 pr-4">
                    <Link href={`/admin/properties/${p.id}/edit`} className="hover:underline">
                      {p.title}
                    </Link>
                  </td>
                  <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                    {p.purpose} / {p.category}
                  </td>
                  <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">{p.status}</td>
                  <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                    {p.price ? p.price.toLocaleString() : "—"}
                  </td>
                  <td className="py-2 pr-4">
                    <form action={togglePublished.bind(null, p.id, !p.is_published)}>
                      <button type="submit" className={linkButtonClass}>
                        {p.is_published ? "Yes" : "No"}
                      </button>
                    </form>
                  </td>
                  <td className="py-2 pr-4">
                    <form action={toggleFeatured.bind(null, p.id, !p.is_featured)}>
                      <button type="submit" className={linkButtonClass}>
                        {p.is_featured ? "Yes" : "No"}
                      </button>
                    </form>
                  </td>
                  <td className="py-2 pr-4">
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/admin/properties/${p.id}/edit`} className={linkButtonClass}>
                        Edit
                      </Link>
                      {p.status !== "archived" && (
                        <form action={archiveProperty.bind(null, p.id)}>
                          <ConfirmSubmitButton
                            confirmText="Archive this property? It will be unpublished and hidden from active listings."
                            className={linkButtonClass}
                          >
                            Archive
                          </ConfirmSubmitButton>
                        </form>
                      )}
                      <form action={deleteProperty.bind(null, p.id)}>
                        <ConfirmSubmitButton
                          confirmText="Permanently delete this property? This cannot be undone."
                          className={`${linkButtonClass} text-red-600 dark:text-red-400`}
                        >
                          Delete
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
