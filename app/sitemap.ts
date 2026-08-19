import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/properties",
    "/properties/buy",
    "/properties/rent",
    "/properties/commercial",
    "/properties/plots",
    "/construction",
    "/construction/services",
    "/construction/projects",
    "/about",
    "/contact",
    "/blog",
  ];

  return staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
