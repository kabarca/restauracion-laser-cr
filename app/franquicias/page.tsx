import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/ui/FaqList";
import { FranchiseHero } from "@/components/franchise/FranchiseHero";
import { BenefitsGrid } from "@/components/franchise/BenefitsGrid";
import { PricingComparisonTable } from "@/components/franchise/PricingComparisonTable";
import { TerritoryAvailabilityBoard } from "@/components/franchise/TerritoryAvailabilityBoard";
import { OnboardingTimeline } from "@/components/franchise/OnboardingTimeline";
import { FranchiseDirectory } from "@/components/franchise/FranchiseDirectory";
import { FranchiseApplicationForm } from "@/components/franchise/FranchiseApplicationForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { franchisees, territories, getFaqsByCategory } from "@/lib/content";
import { faqPageSchema, availableTerritoriesItemListSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Franquicias de limpieza láser",
  description:
    "Abrí tu propia franquicia Restauración Láser en Costa Rica: territorio exclusivo, equipo de marca propia y capacitación certificada desde $19,500 USD.",
};

export default function FranquiciasPage() {
  const faqs = getFaqsByCategory("franquicias");

  return (
    <>
      <JsonLd data={availableTerritoriesItemListSchema(territories)} />
      {faqs.length > 0 && <JsonLd data={faqPageSchema(faqs)} />}
      <FranchiseHero />
      <BenefitsGrid />
      <PricingComparisonTable />
      <TerritoryAvailabilityBoard />
      <OnboardingTimeline />

      <section className="py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Directorio" title="Encontrá tu franquicia Restauración Láser más cercana" />
          <FranchiseDirectory franchisees={franchisees} />
        </Container>
      </section>

      <section id="solicitud" className="scroll-mt-24 bg-secondary/5 py-24">
        <Container className="mx-auto flex max-w-2xl flex-col gap-10">
          <SectionHeading
            eyebrow="Aplicá ahora"
            title="Contanos sobre tu interés en una franquicia"
            align="center"
          />
          <Suspense fallback={null}>
            <FranchiseApplicationForm />
          </Suspense>
        </Container>
      </section>

      {faqs.length > 0 && (
        <section className="py-24">
          <Container className="flex flex-col gap-10">
            <SectionHeading eyebrow="Preguntas frecuentes" title="Dudas comunes sobre la franquicia" />
            <FaqList faqs={faqs} />
          </Container>
        </section>
      )}
    </>
  );
}
