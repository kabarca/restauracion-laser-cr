import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const STEPS = [
  { title: "Escríbenos por WhatsApp", description: "Contanos qué superficie querés tratar y mandanos fotos del estado actual." },
  { title: "Cotización y visita técnica", description: "Evaluamos el material y te damos un estimado de tiempo y costo." },
  { title: "Limpieza láser", description: "Realizamos el trabajo en sitio o en taller, sin químicos ni abrasivos." },
  { title: "Resultado garantizado", description: "Revisamos el resultado juntos antes de dar el proyecto por terminado." },
];

export function HowItWorks() {
  return (
    <section className="py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Cómo funciona" title="De WhatsApp a superficie restaurada" align="center" />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.title} variant="fade-up" delay={i * 0.1}>
              <div className="flex flex-col gap-3">
                <span className="font-display text-4xl font-bold text-accent/30">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="text-sm text-text/70">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
