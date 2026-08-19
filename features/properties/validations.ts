import { z } from "zod";
import { ALL_PROPERTY_TYPE_VALUES } from "@/features/properties/constants";

const emptyToUndefined = (val: unknown) => (val === "" ? undefined : val);

const optionalTrimmedString = z.preprocess(
  emptyToUndefined,
  z.string().trim().optional(),
);

const optionalNonNegativeNumber = z.preprocess(
  emptyToUndefined,
  z.coerce.number({ error: "Must be a number." }).min(0, { error: "Must be 0 or more." }).optional(),
);

const optionalNonNegativeInt = z.preprocess(
  emptyToUndefined,
  z.coerce
    .number({ error: "Must be a whole number." })
    .int({ error: "Must be a whole number." })
    .min(0, { error: "Must be 0 or more." })
    .optional(),
);

const checkbox = z.preprocess((val) => val === "on" || val === "true", z.boolean());

export const propertySchema = z.object({
  title: z.string().trim().min(3, { error: "Title must be at least 3 characters." }),
  slug: z
    .string()
    .trim()
    .min(3, { error: "Slug must be at least 3 characters." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      error: "Slug must be lowercase, hyphen-separated (e.g. 10-marla-house-chaklala-scheme-3).",
    }),
  description: optionalTrimmedString,
  property_type: z.enum(ALL_PROPERTY_TYPE_VALUES, { error: "Select a property type." }),
  purpose: z.enum(["buy", "rent"], { error: "Select a purpose." }),
  category: z.enum(["residential", "commercial", "plot"], { error: "Select a category." }),
  status: z
    .enum(["available", "under_offer", "sold", "rented", "archived"])
    .default("available"),
  price: optionalNonNegativeNumber,
  price_is_visible: checkbox,
  area: optionalNonNegativeNumber,
  area_unit: z.enum(["marla", "kanal", "sqft", "sqyd"]).default("marla"),
  bedrooms: optionalNonNegativeInt,
  bathrooms: optionalNonNegativeInt,
  parking_spaces: optionalNonNegativeInt,
  address: optionalTrimmedString,
  city: z.string().trim().min(1, { error: "City is required." }),
  neighborhood: z.string().trim().min(1, { error: "Neighborhood is required." }),
  latitude: optionalNonNegativeNumber,
  longitude: optionalNonNegativeNumber,
  is_featured: checkbox,
  is_published: checkbox,
  contact_name: optionalTrimmedString,
  contact_phone: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .regex(/^[0-9+()\-\s]{7,20}$/, { error: "Enter a valid phone number." })
      .optional(),
  ),
  contact_email: z.preprocess(
    emptyToUndefined,
    z.email({ error: "Enter a valid email." }).optional(),
  ),
  meta_title: optionalTrimmedString,
  meta_description: optionalTrimmedString,
});

export type PropertyFormValues = z.infer<typeof propertySchema>;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
