import type { MetadataRoute } from "next";
import { franchisees } from "@/lib/content";
import { FRANCHISES_ENABLED, SITE_URL } from "@/lib/site-config";

const STATIC_ROUTES = [
  "",
  "/servicios",
  "/tecnologia",
  ...(FRANCHISES_ENABLED ? ["/franquicias"] : []),
  "/sobre-nosotros",
  "/contacto",
  "/aviso-legal",
  "/politica-de-privacidad",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
  }));

  const franchiseeEntries: MetadataRoute.Sitemap = (FRANCHISES_ENABLED ? franchisees : []).map((f) => ({
    url: `${SITE_URL}/${f.countryCode}/${f.citySlug}`,
    lastModified,
  }));

  return [...staticEntries, ...franchiseeEntries];
}
