import Image from "next/image";
import Link from "next/link";
import { AREA_UNIT_OPTIONS, PROPERTY_TYPES_BY_CATEGORY } from "@/features/properties/constants";
import type { AreaUnit, ListingPurpose, PropertyCategory } from "@/types/database";

export interface PropertyCardData {
  slug: string;
  title: string;
  property_type: string;
  purpose: ListingPurpose;
  category: PropertyCategory;
  price: number | null;
  price_is_visible: boolean;
  area: number | null;
  area_unit: AreaUnit;
  bedrooms: number | null;
  bathrooms: number | null;
  neighborhood: string;
  city: string;
  coverImageUrl: string | null;
}

function typeLabel(category: PropertyCategory, type: string) {
  return PROPERTY_TYPES_BY_CATEGORY[category].find((t) => t.value === type)?.label ?? type;
}

function areaLabel(unit: AreaUnit) {
  return AREA_UNIT_OPTIONS.find((u) => u.value === unit)?.label ?? unit;
}

function formatPrice(price: number) {
  if (price >= 10000000) return `PKR ${(price / 10000000).toFixed(1).replace(/\.0$/, "")} Crore`;
  if (price >= 100000) return `PKR ${(price / 100000).toFixed(1).replace(/\.0$/, "")} Lac`;
  return `PKR ${price.toLocaleString()}`;
}

export function PropertyCard({ property }: { property: PropertyCardData }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-navy/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-champagne/50 hover:shadow-[0_24px_48px_-24px_rgba(11,31,51,0.25)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
        {property.coverImageUrl ? (
          <Image
            src={property.coverImageUrl}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-navy/5 text-xs tracking-wide text-navy/30 uppercase">
            Photo coming soon
          </div>
        )}
        <span className="absolute top-4 left-4 rounded-sm bg-navy px-3 py-1 text-xs font-semibold tracking-wide text-ivory uppercase">
          {property.purpose === "buy" ? "For Sale" : "For Rent"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xs font-semibold tracking-[0.12em] text-champagne uppercase">
          {typeLabel(property.category, property.property_type)}
        </span>
        <h3 className="font-display text-lg leading-snug font-semibold text-navy text-balance">
          {property.title}
        </h3>
        <p className="text-sm text-site-slate">
          {property.neighborhood}, {property.city}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-site-slate">
          {property.bedrooms != null && <span>{property.bedrooms} Beds</span>}
          {property.bathrooms != null && <span>{property.bathrooms} Baths</span>}
          {property.area != null && (
            <span>
              {property.area} {areaLabel(property.area_unit)}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-navy/8 pt-4">
          <span className="font-display text-base font-semibold text-navy">
            {property.price_is_visible && property.price ? formatPrice(property.price) : "Price on Request"}
          </span>
          <span className="text-xs font-semibold tracking-wide text-navy/70 group-hover:text-champagne">
            View Property →
          </span>
        </div>
      </div>
    </Link>
  );
}
