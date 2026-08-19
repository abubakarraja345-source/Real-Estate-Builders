import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicPropertyBySlug, getPublicPropertyImages } from "@/features/properties/queries";
import { AREA_UNIT_OPTIONS, PROPERTY_TYPES_BY_CATEGORY } from "@/features/properties/constants";
import { PropertyGallery } from "@/components/property/property-gallery";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { CONTACT_INFO, SITE_BRAND } from "@/lib/constants/site";

const getProperty = cache(async (slug: string) => getPublicPropertyBySlug(slug));

function toWhatsAppDigits(phone: string) {
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.startsWith("92")) return digits;
  if (digits.startsWith("0")) return `92${digits.slice(1)}`;
  return digits;
}

function formatPrice(price: number) {
  if (price >= 10000000) return `PKR ${(price / 10000000).toFixed(1).replace(/\.0$/, "")} Crore`;
  if (price >= 100000) return `PKR ${(price / 100000).toFixed(1).replace(/\.0$/, "")} Lac`;
  return `PKR ${price.toLocaleString()}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) return { title: "Property Not Found" };

  const title = `${property.title} | ${SITE_BRAND}`;
  const description =
    property.meta_description ||
    property.description ||
    `${property.title} in ${property.neighborhood}, ${property.city}.`;

  return {
    title,
    description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) notFound();

  const images = await getPublicPropertyImages(property.id);

  const typeLabel =
    PROPERTY_TYPES_BY_CATEGORY[property.category].find((t) => t.value === property.property_type)?.label ??
    property.property_type;
  const areaLabel = AREA_UNIT_OPTIONS.find((u) => u.value === property.area_unit)?.label ?? property.area_unit;

  const contactPhone = property.contact_phone || CONTACT_INFO.phone;
  const contactName = property.contact_name || SITE_BRAND;
  const whatsappDigits = toWhatsAppDigits(contactPhone);

  const specs = [
    property.bedrooms != null && { label: "Bedrooms", value: property.bedrooms },
    property.bathrooms != null && { label: "Bathrooms", value: property.bathrooms },
    property.parking_spaces != null && { label: "Parking", value: property.parking_spaces },
    property.area != null && { label: "Area", value: `${property.area} ${areaLabel}` },
  ].filter(Boolean) as { label: string; value: string | number }[];

  return (
    <main className="bg-ivory">
      <Container className="py-12 lg:py-16">
        <Reveal className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <RevealItem>
            <div className="flex flex-col gap-8">
              <PropertyGallery
                images={images.map((img) => ({ id: img.id, url: img.url, alt_text: img.alt_text }))}
                title={property.title}
              />

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-sm bg-navy px-3 py-1 text-xs font-semibold tracking-wide text-ivory uppercase">
                    {property.purpose === "buy" ? "For Sale" : "For Rent"}
                  </span>
                  <span className="text-xs font-semibold tracking-[0.12em] text-champagne uppercase">
                    {typeLabel}
                  </span>
                </div>
                <h1 className="font-display text-3xl leading-tight font-semibold text-navy text-balance sm:text-4xl">
                  {property.title}
                </h1>
                <p className="text-sm text-site-slate">
                  {property.address ? `${property.address}, ` : ""}
                  {property.neighborhood}, {property.city}
                </p>
              </div>

              {specs.length > 0 && (
                <div className="grid grid-cols-2 gap-4 border-y border-navy/8 py-6 sm:grid-cols-4">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex flex-col gap-1">
                      <span className="font-display text-xl font-semibold text-navy">{spec.value}</span>
                      <span className="text-xs tracking-wide text-site-slate uppercase">{spec.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {property.description && (
                <div className="flex flex-col gap-3">
                  <h2 className="font-display text-xl font-semibold text-navy">Description</h2>
                  <p className="leading-relaxed whitespace-pre-line text-site-slate">{property.description}</p>
                </div>
              )}
            </div>
          </RevealItem>

          <RevealItem>
            <div className="sticky top-28 flex flex-col gap-6 rounded-sm border border-navy/10 bg-white p-6 shadow-[0_24px_48px_-32px_rgba(11,31,51,0.2)]">
              <div>
                <span className="text-xs font-semibold tracking-wide text-site-slate uppercase">Price</span>
                <p className="font-display text-2xl font-semibold text-navy">
                  {property.price_is_visible && property.price ? formatPrice(property.price) : "Price on Request"}
                </p>
              </div>

              <div className="flex flex-col gap-1 border-t border-navy/8 pt-4 text-sm text-site-slate">
                <span className="font-medium text-navy">{contactName}</span>
                <span>{contactPhone}</span>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
                    `Hi, I'm interested in "${property.title}" (${property.slug}).`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-sm bg-navy px-6 py-3 text-sm font-semibold tracking-wide text-ivory transition-colors hover:bg-navy-light"
                >
                  WhatsApp Us
                </a>
                <a
                  href={`tel:${contactPhone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center rounded-sm border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-champagne hover:text-champagne"
                >
                  Call Now
                </a>
                <a
                  href="/contact"
                  className="text-center text-sm font-medium text-navy/70 underline decoration-champagne/60 decoration-2 underline-offset-4 hover:text-champagne"
                >
                  Send an Inquiry
                </a>
              </div>
            </div>
          </RevealItem>
        </Reveal>
      </Container>
    </main>
  );
}
