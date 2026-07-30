import { FACEBOOK_URL, INSTAGRAM_URL, SITE_NAME, SITE_URL, WHATSAPP_NUMBER } from "@/lib/site-config";
import type { Faq, Franchisee, Service, Territory } from "@/types/content";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/logo-full.png`,
    telephone: WHATSAPP_NUMBER,
    areaServed: "CR",
    sameAs: [FACEBOOK_URL, INSTAGRAM_URL],
  };
}

export function localBusinessSchema(franchisee: Franchisee) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE_NAME} ${franchisee.cityName}`,
    description: franchisee.description,
    url: `${SITE_URL}/${franchisee.countryCode}/${franchisee.citySlug}`,
    telephone: franchisee.whatsapp ?? WHATSAPP_NUMBER,
    address: {
      "@type": "PostalAddress",
      streetAddress: franchisee.address,
      addressCountry: franchisee.countryCode === "crc" ? "CR" : franchisee.countryCode.toUpperCase(),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: franchisee.geo.lat,
      longitude: franchisee.geo.lng,
    },
    areaServed: franchisee.serviceArea,
  };
}

export function servicesItemListSchema(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.shortDescription,
        url: `${SITE_URL}/servicios#${service.slug}`,
      },
    })),
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbListSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function availableTerritoriesItemListSchema(territories: Territory[]) {
  const available = territories.filter((t) => t.status === "disponible");
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Territorios disponibles para franquicia en Costa Rica",
    itemListElement: available.map((territory, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: territory.name,
      description: `Regiones cubiertas: ${territory.regions.join(", ")}`,
    })),
  };
}
