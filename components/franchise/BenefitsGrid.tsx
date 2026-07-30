import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const BENEFITS = [
  {
    title: "Territorio exclusivo",
    description: "Operás sin competencia interna de otra franquicia Restauración Láser en tu zona.",
    span: "lg:col-span-2",
  },
  {
    title: "Equipo de marca propia",
    description: "Tu máquina sale de fábrica con tu logo — no un import genérico.",
    span: "",
  },
  {
    title: "Capacitación certificada",
    description: "24 horas de capacitación práctica, incluyendo certificación de seguridad Clase IV.",
    span: "",
  },
  {
    title: "Base de conocimientos",
    description: "Acceso inmediato a presets, protocolos y guías técnicas desde el día uno.",
    span: "",
  },
  {
    title: "Comunidad de operadores",
    description: "Una red privada de franquiciados para resolver dudas y compartir buenas prácticas.",
    span: "",
  },
  {
    title: "Motor de leads y oportunidades B2B",
    description: "Generación de leads de tu zona y acceso a oportunidades comerciales entre franquiciados.",
    span: "lg:col-span-2",
  },
];

export function BenefitsGrid() {
  return (
    <section className="py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Beneficios" title="Todo lo que necesitás para operar desde el día uno" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, i) => (
            <ScrollReveal key={benefit.title} variant="fade-up" delay={i * 0.06} className={benefit.span}>
              <div className="flex h-full flex-col gap-3 rounded-brand border border-text/10 bg-secondary/5 p-6">
                <h3 className="text-lg font-bold">{benefit.title}</h3>
                <p className="text-sm text-text/70">{benefit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
