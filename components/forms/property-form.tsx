"use client";

import { useActionState, useState } from "react";
import {
  AREA_UNIT_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_TYPES_BY_CATEGORY,
} from "@/features/properties/constants";
import { slugify } from "@/features/properties/validations";
import type { PropertyFormState } from "@/features/properties/actions";
import type { Database } from "@/types/database";

type Property = Database["public"]["Tables"]["properties"]["Row"];
type Action = (state: PropertyFormState, formData: FormData) => Promise<PropertyFormState>;

const inputClass =
  "rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900";
const labelClass = "text-sm font-medium";
const fieldClass = "flex flex-col gap-1.5";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="text-sm text-red-600 dark:text-red-400">{errors[0]}</p>;
}

export function PropertyForm({
  action,
  property,
}: {
  action: Action;
  property?: Property;
}) {
  const [state, formAction, pending] = useActionState<PropertyFormState, FormData>(
    action,
    undefined,
  );
  const [category, setCategory] = useState(property?.category ?? "residential");
  const [slugTouched, setSlugTouched] = useState(Boolean(property));
  const [slug, setSlug] = useState(property?.slug ?? "");
  const errors = state?.errors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state?.formError && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.formError}</p>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Basic Info</h2>

        <div className={fieldClass}>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            name="title"
            defaultValue={property?.title}
            className={inputClass}
            onChange={(e) => {
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            required
          />
          <FieldError errors={errors.title} />
        </div>

        <div className={fieldClass}>
          <label htmlFor="slug" className={labelClass}>
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className={inputClass}
            placeholder="10-marla-house-for-sale-chaklala-scheme-3"
            required
          />
          <FieldError errors={errors.slug} />
        </div>

        <div className={fieldClass}>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={property?.description ?? ""}
            rows={5}
            className={inputClass}
          />
          <FieldError errors={errors.description} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Classification</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className={fieldClass}>
            <label htmlFor="purpose" className={labelClass}>
              Purpose
            </label>
            <select
              id="purpose"
              name="purpose"
              defaultValue={property?.purpose ?? "buy"}
              className={inputClass}
            >
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
            <FieldError errors={errors.purpose} />
          </div>

          <div className={fieldClass}>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof category)}
              className={inputClass}
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="plot">Plot</option>
            </select>
            <FieldError errors={errors.category} />
          </div>

          <div className={fieldClass}>
            <label htmlFor="property_type" className={labelClass}>
              Property Type
            </label>
            <select
              id="property_type"
              name="property_type"
              defaultValue={property?.property_type}
              className={inputClass}
            >
              {PROPERTY_TYPES_BY_CATEGORY[category].map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <FieldError errors={errors.property_type} />
          </div>
        </div>

        <div className={fieldClass}>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={property?.status ?? "available"}
            className={`${inputClass} sm:max-w-xs`}
          >
            {PROPERTY_STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <FieldError errors={errors.status} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Pricing &amp; Area</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className={fieldClass}>
            <label htmlFor="price" className={labelClass}>
              Price (PKR)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              step="any"
              defaultValue={property?.price ?? ""}
              className={inputClass}
            />
            <FieldError errors={errors.price} />
          </div>

          <label className="flex items-center gap-2 self-end pb-2 text-sm">
            <input
              type="checkbox"
              name="price_is_visible"
              defaultChecked={property?.price_is_visible ?? true}
            />
            Show price publicly
          </label>

          <div className={fieldClass}>
            <label htmlFor="area" className={labelClass}>
              Area
            </label>
            <input
              id="area"
              name="area"
              type="number"
              min={0}
              step="any"
              defaultValue={property?.area ?? ""}
              className={inputClass}
            />
            <FieldError errors={errors.area} />
          </div>

          <div className={fieldClass}>
            <label htmlFor="area_unit" className={labelClass}>
              Area Unit
            </label>
            <select
              id="area_unit"
              name="area_unit"
              defaultValue={property?.area_unit ?? "marla"}
              className={inputClass}
            >
              {AREA_UNIT_OPTIONS.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className={fieldClass}>
            <label htmlFor="bedrooms" className={labelClass}>
              Bedrooms
            </label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              min={0}
              defaultValue={property?.bedrooms ?? ""}
              className={inputClass}
            />
            <FieldError errors={errors.bedrooms} />
          </div>
          <div className={fieldClass}>
            <label htmlFor="bathrooms" className={labelClass}>
              Bathrooms
            </label>
            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              min={0}
              defaultValue={property?.bathrooms ?? ""}
              className={inputClass}
            />
            <FieldError errors={errors.bathrooms} />
          </div>
          <div className={fieldClass}>
            <label htmlFor="parking_spaces" className={labelClass}>
              Parking Spaces
            </label>
            <input
              id="parking_spaces"
              name="parking_spaces"
              type="number"
              min={0}
              defaultValue={property?.parking_spaces ?? ""}
              className={inputClass}
            />
            <FieldError errors={errors.parking_spaces} />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Location</h2>
        <div className={fieldClass}>
          <label htmlFor="address" className={labelClass}>
            Address
          </label>
          <input
            id="address"
            name="address"
            defaultValue={property?.address ?? ""}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className={fieldClass}>
            <label htmlFor="city" className={labelClass}>
              City
            </label>
            <input
              id="city"
              name="city"
              defaultValue={property?.city ?? "Rawalpindi"}
              className={inputClass}
              required
            />
            <FieldError errors={errors.city} />
          </div>
          <div className={fieldClass}>
            <label htmlFor="neighborhood" className={labelClass}>
              Neighborhood
            </label>
            <input
              id="neighborhood"
              name="neighborhood"
              defaultValue={property?.neighborhood ?? "Chaklala Scheme 3"}
              className={inputClass}
              required
            />
            <FieldError errors={errors.neighborhood} />
          </div>
          <div className={fieldClass}>
            <label htmlFor="latitude" className={labelClass}>
              Latitude
            </label>
            <input
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              defaultValue={property?.latitude ?? ""}
              className={inputClass}
            />
          </div>
          <div className={fieldClass}>
            <label htmlFor="longitude" className={labelClass}>
              Longitude
            </label>
            <input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              defaultValue={property?.longitude ?? ""}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Contact</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className={fieldClass}>
            <label htmlFor="contact_name" className={labelClass}>
              Contact Name
            </label>
            <input
              id="contact_name"
              name="contact_name"
              defaultValue={property?.contact_name ?? ""}
              className={inputClass}
            />
          </div>
          <div className={fieldClass}>
            <label htmlFor="contact_phone" className={labelClass}>
              Contact Phone
            </label>
            <input
              id="contact_phone"
              name="contact_phone"
              defaultValue={property?.contact_phone ?? ""}
              className={inputClass}
            />
            <FieldError errors={errors.contact_phone} />
          </div>
          <div className={fieldClass}>
            <label htmlFor="contact_email" className={labelClass}>
              Contact Email
            </label>
            <input
              id="contact_email"
              name="contact_email"
              type="email"
              defaultValue={property?.contact_email ?? ""}
              className={inputClass}
            />
            <FieldError errors={errors.contact_email} />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">SEO</h2>
        <div className={fieldClass}>
          <label htmlFor="meta_title" className={labelClass}>
            Meta Title
          </label>
          <input
            id="meta_title"
            name="meta_title"
            defaultValue={property?.meta_title ?? ""}
            className={inputClass}
          />
        </div>
        <div className={fieldClass}>
          <label htmlFor="meta_description" className={labelClass}>
            Meta Description
          </label>
          <textarea
            id="meta_description"
            name="meta_description"
            defaultValue={property?.meta_description ?? ""}
            rows={3}
            className={inputClass}
          />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_published" defaultChecked={property?.is_published} />
          Published (visible on the public site)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_featured" defaultChecked={property?.is_featured} />
          Featured
        </label>
      </section>

      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-gray-100 dark:text-gray-900"
      >
        {pending ? "Saving..." : property ? "Save Changes" : "Create Property"}
      </button>
    </form>
  );
}
