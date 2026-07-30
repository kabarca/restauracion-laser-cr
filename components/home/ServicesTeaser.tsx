import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/lib/content";

const TEASER_COUNT = 6;

export function ServicesTeaser() {
  const featured = services.slice(0, TEASER_COUNT);

  return (
    <section className="bg-secondary/5 py-24">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Servicios" title="Un método, nueve aplicaciones" />
          <ButtonLink href="/servicios" variant="outline">
            Ver todos los servicios
          </ButtonLink>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => (
            <ScrollReveal key={service.slug} variant="fade-up" delay={i * 0.06}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
