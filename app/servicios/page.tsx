import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/ui/FaqList";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { services, getFaqsByCategory } from "@/lib/content";
import { servicesItemListSchema, faqPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Servicios de limpieza láser",
  description:
    "Remoción de óxido, pintura, grafiti, moho, grasa y más — limpieza láser industrial sin químicos ni abrasivos en Costa Rica.",
};

export default function ServiciosPage() {
  const faqs = getFaqsByCategory("servicios");

  return (
    <>
      <JsonLd data={servicesItemListSchema(services)} />
      {faqs.length > 0 && <JsonLd data={faqPageSchema(faqs)} />}
      <section className="bg-bg pb-16 pt-32 sm:pt-40">
        <Container className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            eyebrow="Servicios"
            title="Un método, muchas aplicaciones"
            subtitle="La misma tecnología láser, calibrada para cada tipo de superficie y contaminante. Sin químicos, sin abrasivos, sin dañar el material base."
            align="center"
          />
        </Container>
        <WaveDivider className="mx-auto mt-12 max-w-3xl" />
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} variant={i % 2 === 0 ? "slide-right" : "slide-left"} delay={(i % 2) * 0.1}>
                <ServiceDetail service={service} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {faqs.length > 0 && (
        <section className="bg-secondary/5 py-24">
          <Container className="flex flex-col gap-10">
            <SectionHeading eyebrow="Preguntas frecuentes" title="Dudas comunes sobre nuestros servicios" />
            <FaqList faqs={faqs} />
          </Container>
        </section>
      )}

      <section className="py-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">¿Tenés una superficie que necesita restauración?</h2>
          <WhatsAppButton message="Hola, quiero cotizar un servicio de limpieza láser.">
            Cotizar por WhatsApp
          </WhatsAppButton>
        </Container>
      </section>
    </>
  );
}
