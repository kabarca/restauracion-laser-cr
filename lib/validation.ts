import { z } from "zod";

/** Always 3 letters (e.g. "crc") so a franchisee path segment never collides with the .cr TLD. */
const countryCodeSchema = z.string().regex(/^[a-z]{3}$/, "countryCode must be a 3-letter lowercase code");

export const franchiseeSchema = z.object({
  id: z.string(),
  countryCode: countryCodeSchema,
  countryName: z.string(),
  citySlug: z.string(),
  cityName: z.string(),
  status: z.enum(["activo", "proximamente", "disponible"]),
  isHeadquarters: z.boolean(),
  geo: z.object({ lat: z.number(), lng: z.number() }),
  address: z.string(),
  whatsapp: z.string().nullable(),
  email: z.string().email().nullable(),
  serviceArea: z.array(z.string()),
  description: z.string(),
  heroImagePlaceholderId: z.string(),
  gallery: z.array(z.string()),
});
export const franchiseesSchema = z.array(franchiseeSchema);

export const territorySchema = z.object({
  id: z.string(),
  countryCode: countryCodeSchema,
  name: z.string(),
  regions: z.array(z.string()),
  status: z.enum(["reservado", "disponible"]),
  franchiseeId: z.string().nullable(),
});
export const territoriesSchema = z.array(territorySchema);

export const machineSpecSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  valueEn: z.string(),
});
export const machineSpecsSchema = z.array(machineSpecSchema);

export const serviceSchema = z.object({
  slug: z.string(),
  name: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  icon: z.string(),
  keywords: z.array(z.string()),
  beforeAfterPlaceholderId: z.string(),
});
export const servicesSchema = z.array(serviceSchema);

export const faqSchema = z.object({
  id: z.string(),
  category: z.enum(["general", "servicios", "franquicias"]),
  question: z.string(),
  answer: z.string(),
});
export const faqsSchema = z.array(faqSchema);

export const franchiseComparisonRowSchema = z.object({
  feature: z.string(),
  equipo: z.union([z.boolean(), z.string()]),
  franquicia: z.union([z.boolean(), z.string()]),
});
export const franchiseComparisonSchema = z.array(franchiseComparisonRowSchema);

export const onboardingStepSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  duration: z.string(),
  description: z.string(),
});
export const onboardingStepsSchema = z.array(onboardingStepSchema);

export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.enum(["cliente", "franquiciado"]),
  location: z.string(),
  franchiseeId: z.string().nullable(),
  quote: z.string(),
  avatarPlaceholderId: z.string(),
});
export const testimonialsSchema = z.array(testimonialSchema);

/** Shared shape for the contact and franchise-application form handlers. */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Ingresá tu nombre completo"),
  email: z.string().email("Ingresá un correo válido"),
  phone: z.string().min(8, "Ingresá un número de teléfono válido"),
  message: z.string().min(10, "Contanos un poco más"),
  /**
   * Deliberately permissive: the route inspects this and fakes a success response
   * so a bot never learns it was caught. Rejecting a filled trap here instead would
   * return a validation error — which tells the bot exactly what tripped it.
   */
  honeypot: z.string().optional(),
});

export const franchiseApplicationSchema = z.object({
  name: z.string().min(2, "Ingresá tu nombre completo"),
  email: z.string().email("Ingresá un correo válido"),
  phone: z.string().min(8, "Ingresá un número de teléfono válido"),
  territorioDeInteres: z.string().min(1, "Seleccioná un territorio"),
  message: z.string().min(10, "Contanos un poco más sobre tu interés").optional().or(z.literal("")),
  /** See the note on contactFormSchema.honeypot — the route, not the schema, handles the trap. */
  honeypot: z.string().optional(),
});
