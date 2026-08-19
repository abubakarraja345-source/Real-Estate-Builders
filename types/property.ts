// Shape is provisional until the Supabase `properties` table is defined
// in supabase/migrations/.

export type PropertyPurpose = "buy" | "rent";
export type PropertyCategory = "residential" | "commercial" | "plot";

export interface Property {
  id: string;
  slug: string;
  title: string;
  purpose: PropertyPurpose;
  category: PropertyCategory;
  description: string;
  price: number;
  location: string;
  createdAt: string;
  updatedAt: string;
}
