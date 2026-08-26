import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceEvaluationForm } from "@/components/service-evaluation/ServiceEvaluationForm";

export const metadata: Metadata = {
  title: "Evaluación de Proyecto",
  description: "Contanos sobre tu proyecto de restauración láser para poder evaluarlo y cotizarlo.",
};

export default function ServiceEvaluationPage() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Evaluación de proyecto"
          title="Contanos sobre tu proyecto"
          subtitle="Completá este formulario con el mayor detalle posible — mientras más información y fotos nos compartas, más precisa será nuestra evaluación."
        />
        <div className="max-w-2xl">
          <ServiceEvaluationForm />
        </div>
      </Container>
    </section>
  );
}
