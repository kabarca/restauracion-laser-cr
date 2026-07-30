import franchiseesRaw from "@/data/franchisees.json";
import territoriesRaw from "@/data/territories.json";
import machineSpecsRaw from "@/data/machine-specs.json";
import servicesRaw from "@/data/services.json";
import faqRaw from "@/data/faq.json";
import franchiseComparisonRaw from "@/data/franchise-comparison.json";
import onboardingStepsRaw from "@/data/onboarding-steps.json";
import testimonialsRaw from "@/data/testimonials.json";
import {
  franchiseesSchema,
  territoriesSchema,
  machineSpecsSchema,
  servicesSchema,
  faqsSchema,
  franchiseComparisonSchema,
  onboardingStepsSchema,
  testimonialsSchema,
} from "@/lib/validation";
import type { FaqCategory } from "@/types/content";

// Parsing at module scope means a malformed data file fails `next build` loudly
// instead of breaking a page silently at runtime.
export const franchisees = franchiseesSchema.parse(franchiseesRaw);
export const territories = territoriesSchema.parse(territoriesRaw);
export const machineSpecs = machineSpecsSchema.parse(machineSpecsRaw);
export const services = servicesSchema.parse(servicesRaw);
export const faqs = faqsSchema.parse(faqRaw);
export const franchiseComparison = franchiseComparisonSchema.parse(franchiseComparisonRaw);
export const onboardingSteps = onboardingStepsSchema.parse(onboardingStepsRaw).sort((a, b) => a.order - b.order);
export const testimonials = testimonialsSchema.parse(testimonialsRaw);

export function getFranchisee(countryCode: string, citySlug: string) {
  return franchisees.find((f) => f.countryCode === countryCode && f.citySlug === citySlug);
}

export function getFranchiseeById(id: string) {
  return franchisees.find((f) => f.id === id);
}

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getFaqsByCategory(category: FaqCategory) {
  return faqs.filter((f) => f.category === category);
}

export function getAvailableTerritories() {
  return territories.filter((t) => t.status === "disponible");
}

export function getReservedTerritories() {
  return territories.filter((t) => t.status === "reservado");
}

/** The 7 fixed Costa Rica territories — excludes the open-ended international entry. */
export function getCostaRicaTerritories() {
  return territories.filter((t) => t.countryCode === "crc");
}

/** The open-ended "one concession per country" opportunity for the rest of Latin America. */
export function getInternationalTerritory() {
  return territories.find((t) => t.countryCode !== "crc");
}

export function getTerritoryCounts() {
  const crTerritories = getCostaRicaTerritories();
  const total = crTerritories.length;
  const reservadas = crTerritories.filter((t) => t.status === "reservado").length;
  return { total, reservadas, disponibles: total - reservadas };
}
