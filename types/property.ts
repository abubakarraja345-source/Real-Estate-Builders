// Mirrors the `properties` table defined in supabase/migrations/.
import type {
  AreaUnit,
  ListingPurpose,
  PropertyCategory,
  PropertyStatus,
} from "@/types/database";

export type { ListingPurpose, PropertyCategory, PropertyStatus, AreaUnit };

// Kept as aliases so existing imports of the old names keep working.
export type PropertyPurpose = ListingPurpose;

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  propertyType: string;
  purpose: ListingPurpose;
  category: PropertyCategory;
  status: PropertyStatus;
  price: number | null;
  priceIsVisible: boolean;
  area: number | null;
  areaUnit: AreaUnit;
  bedrooms: number | null;
  bathrooms: number | null;
  parkingSpaces: number | null;
  address: string | null;
  city: string;
  neighborhood: string;
  latitude: number | null;
  longitude: number | null;
  isFeatured: boolean;
  isPublished: boolean;
  contactName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  storagePath: string;
  altText: string | null;
  sortOrder: number;
  isCover: boolean;
  createdAt: string;
}
