import Link from "next/link";
import type { PropertyListFilters } from "@/features/properties/queries";

const fieldClass =
  "w-full appearance-none rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus:border-champagne focus:outline-none";
const labelClass = "flex flex-col gap-2 text-xs font-semibold tracking-wide text-navy/70 uppercase";

export function PropertyFilterBar({ filters }: { filters: PropertyListFilters }) {
  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== "");

  return (
    <form
      method="get"
      action="/properties"
      className="grid grid-cols-1 gap-4 rounded-sm border border-navy/10 bg-white p-6 shadow-[0_24px_48px_-32px_rgba(11,31,51,0.15)] sm:grid-cols-2 lg:grid-cols-6 lg:items-end lg:gap-3 lg:p-8"
    >
      <label className={labelClass}>
        Purpose
        <select name="purpose" className={fieldClass} defaultValue={filters.purpose ?? ""}>
          <option value="">Any</option>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>
      </label>

      <label className={labelClass}>
        Property Type
        <select name="category" className={fieldClass} defaultValue={filters.category ?? ""}>
          <option value="">Any Type</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="plot">Plot</option>
        </select>
      </label>

      <label className={labelClass}>
        Location
        <input
          type="text"
          name="location"
          defaultValue={filters.location ?? ""}
          placeholder="e.g. Chaklala Scheme 3"
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        Bedrooms
        <select name="bedrooms" className={fieldClass} defaultValue={filters.bedrooms ?? ""}>
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        Min Price (PKR)
        <input
          type="number"
          name="minPrice"
          min={0}
          defaultValue={filters.minPrice ?? ""}
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        Max Price (PKR)
        <input
          type="number"
          name="maxPrice"
          min={0}
          defaultValue={filters.maxPrice ?? ""}
          className={fieldClass}
        />
      </label>

      <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-6">
        <button
          type="submit"
          className="rounded-sm bg-navy px-6 py-3 text-sm font-semibold tracking-wide text-ivory transition-colors hover:bg-navy-light"
        >
          Search Properties
        </button>
        {hasActiveFilters && (
          <Link href="/properties" className="text-sm font-medium text-site-slate underline hover:text-navy">
            Clear Filters
          </Link>
        )}
      </div>
    </form>
  );
}
