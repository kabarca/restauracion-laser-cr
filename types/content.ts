export type FranchiseeStatus = "activo" | "proximamente" | "disponible";

export interface Franchisee {
  id: string;
  countryCode: string;
  countryName: string;
  citySlug: string;
  cityName: string;
  status: FranchiseeStatus;
  isHeadquarters: boolean;
  geo: { lat: number; lng: number };
  address: string;
  whatsapp: string | null;
  email: string | null;
  serviceArea: string[];
  description: string;
  heroImagePlaceholderId: string;
  gallery: string[];
}

export type TerritoryStatus = "reservado" | "disponible";

export interface Territory {
  id: string;
  countryCode: string;
  name: string;
  regions: string[];
  status: TerritoryStatus;
  franchiseeId: string | null;
}

export interface MachineSpec {
  id: string;
  label: string;
  value: string;
  valueEn: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  keywords: string[];
  beforeAfterPlaceholderId: string;
}

export type FaqCategory = "general" | "servicios" | "franquicias";

export interface Faq {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export interface FranchiseComparisonRow {
  feature: string;
  equipo: boolean | string;
  franquicia: boolean | string;
}

export interface OnboardingStep {
  id: string;
  order: number;
  title: string;
  duration: string;
  description: string;
}

export type TestimonialRole = "cliente" | "franquiciado";

export interface Testimonial {
  id: string;
  name: string;
  role: TestimonialRole;
  location: string;
  franchiseeId: string | null;
  quote: string;
  avatarPlaceholderId: string;
}
