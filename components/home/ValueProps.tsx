import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ValuePropIcon } from "@/components/icons/ValuePropIcon";

const VALUE_PROPS = [
  {
    icon: "no-chemicals",
    title: "Sin químicos ni abrasivos",
    description: "El láser vaporiza el contaminante sin sandblasting, solventes ni residuo tóxico que desechar.",
  },
  {
    icon: "precision",
    title: "Precisión milimétrica",
    description: "Controlamos exactamente qué capa se remueve, preservando el material base intacto.",
  },
  {
    icon: "certified",
    title: "Operadores certificados",
    description: "Certificación de seguridad láser Clase IV en cada proyecto, sin importar el tamaño.",
  },
  {
    icon: "on-site",
    title: "Servicio en sitio, sin desmontaje",
    description: "Trabajamos directamente sobre tu equipo, fachada o pieza, sin desarmar ni trasladar nada, minimizando el tiempo de inactividad.",
  },
];

export function ValueProps() {
  return (
    <section className="py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Por qué Restauración Láser"
          title="Tecnología que respeta la superficie, ya sea madera, metal o concreto"
        />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((prop, i) => (
            <ScrollReveal key={prop.title} variant="fade-up" delay={i * 0.1}>
              <div className="flex flex-col gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-secondary">
                  <ValuePropIcon icon={prop.icon} className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="text-lg font-bold">{prop.title}</h3>
                <p className="text-sm text-text/70">{prop.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
