import type { PropertyCategory } from "@/types/property";

export const PROPERTY_TYPES_BY_CATEGORY: Record<
  PropertyCategory,
  { value: string; label: string }[]
> = {
  residential: [
    { value: "house", label: "House" },
    { value: "flat_apartment", label: "Flat / Apartment" },
    { value: "upper_portion", label: "Upper Portion" },
    { value: "lower_portion", label: "Lower Portion" },
    { value: "farm_house", label: "Farm House" },
    { value: "room", label: "Room" },
  ],
  commercial: [
    { value: "office", label: "Office" },
    { value: "shop", label: "Shop" },
    { value: "warehouse", label: "Warehouse" },
    { value: "building", label: "Building" },
    { value: "factory", label: "Factory" },
  ],
  plot: [
    { value: "residential_plot", label: "Residential Plot" },
    { value: "commercial_plot", label: "Commercial Plot" },
    { value: "agricultural_land", label: "Agricultural Land" },
  ],
};

export const ALL_PROPERTY_TYPE_VALUES = Object.values(PROPERTY_TYPES_BY_CATEGORY).flatMap(
  (types) => types.map((t) => t.value),
) as [string, ...string[]];

export const PROPERTY_STATUS_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "under_offer", label: "Under Offer" },
  { value: "sold", label: "Sold" },
  { value: "rented", label: "Rented" },
  { value: "archived", label: "Archived" },
] as const;

export const AREA_UNIT_OPTIONS = [
  { value: "marla", label: "Marla" },
  { value: "kanal", label: "Kanal" },
  { value: "sqft", label: "Sq. Ft." },
  { value: "sqyd", label: "Sq. Yd." },
] as const;
