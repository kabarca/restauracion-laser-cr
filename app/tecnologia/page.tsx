import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { LaserPhysicsDiagram, type PhysicsStep } from "@/components/tecnologia/LaserPhysicsDiagram";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Tecnología",
  description:
    "Conocé la tecnología detrás de Restauración Láser: un sistema láser pulsado de 300W de marca propia, con ficha técnica completa.",
};

const LASER_PHYSICS_STEPS: PhysicsStep[] = [
  {
    title: "Pulso infrarrojo",
    description: "El láser emite pulsos cortos de luz infrarroja sobre la superficie.",
    dot: { x: 66, y: 22 },
  },
  {
    title: "Absorción selectiva",
    description: "El contaminante absorbe la energía del láser; el material base no.",
    dot: { x: 50, y: 68 },
  },
  {
    title: "Calentamiento instantáneo",
    description: "El contaminante se calienta muy rápidamente, en microsegundos.",
    dot: { x: 27, y: 72 },
  },
  {
    title: "Sustrato frío",
    description: "El material original se mantiene frío durante todo el proceso.",
    dot: { x: 78, y: 90 },
  },
  {
    title: "Vaporización o desprendimiento",
    description: "La diferencia de temperatura convierte el contaminante en gas, o la presión desprende partículas de la superficie.",
    dot: { x: 55, y: 58 },
  },
  {
    title: "Extracción por succión",
    description: "El residuo restante se extrae al instante, sin dejar rastro.",
    dot: { x: 35, y: 30 },
  },
  {
    title: "Resultado",
    description: "Una superficie limpia e intacta, restaurada a su condición original.",
    dot: { x: 82, y: 79 },
  },
];

const COMPARISON = [
  { label: "Daño al material base", laser: "Ninguno — proceso sin contacto", alternativa: "Desgaste y pérdida de tolerancia" },
  { label: "Residuo generado", laser: "Mínimo, capturado por extracción", alternativa: "Arena, químicos o solventes a desechar" },
  { label: "Precisión", laser: "Control por capa, milimétrico", alternativa: "Difícil de controlar la profundidad" },
  { label: "Seguridad del operador", laser: "Certificación Clase IV, protocolos claros", alternativa: "Exposición a polvo y químicos" },
];

export default function TecnologiaPage() {
  return (
    <>
      <section className="relative isolate min-h-[70vh] w-full overflow-hidden bg-ink text-surface">
        <ImagePlaceholder
          id="tecnologia-hero"
          alt="Primer plano de la limpieza láser: el punto de contacto brilla mientras el contaminante se evapora en una columna de humo"
          src="/images/tecnologia-hero.png"
          size="full-bleed"
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" aria-hidden="true" />
        <Container className="relative flex min-h-[70vh] flex-col justify-end gap-4 pb-16 pt-32">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Nuestra tecnología</span>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Nuestro equipo fue construido para las necesidades de Latinoamérica
          </h1>
          <p className="max-w-xl text-surface/80">
            Cada máquina Restauración Láser sale de fábrica con nuestras especificaciones y presets —
            la misma tecnología que operamos en nuestras sedes es la que reciben nuestros
            franquiciados.
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Cómo funciona" title="La física detrás de cada pulso" />
          <ScrollReveal variant="fade-up">
            <LaserPhysicsDiagram
              steps={LASER_PHYSICS_STEPS}
              imageSrc="/images/tecnologia-como-funciona-diagrama.png"
              imageAlt="Diagrama del proceso de limpieza láser: pulso infrarrojo, absorción del contaminante, plasma del material y extracción del residuo"
            />
          </ScrollReveal>
        </Container>
      </section>

      <WaveDivider className="mx-auto max-w-3xl" />

      <section className="bg-[#17140f] py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Láser vs. métodos tradicionales"
            title="¿Cómo el láser se compara con otros métodos de limpieza profunda?"
          />
          <div className="overflow-hidden rounded-brand border border-text/10">
            <div className="grid grid-cols-3 gap-4 bg-ink px-5 py-4 text-surface">
              <span className="text-sm font-semibold uppercase tracking-wide">Criterio</span>
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">Restauración Láser</span>
              <span className="text-sm font-semibold uppercase tracking-wide text-surface/60">Sandblasting / químicos</span>
            </div>
            <div className="divide-y divide-text/10">
              {COMPARISON.map((row, i) => (
                <div key={row.label} className={`grid grid-cols-3 gap-4 px-5 py-4 ${i % 2 === 1 ? "bg-secondary/5" : "bg-bg"}`}>
                  <span className="text-sm font-semibold">{row.label}</span>
                  <span className="text-sm text-text/80">{row.laser}</span>
                  <span className="text-sm text-text/50">{row.alternativa}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">
            Esta misma tecnología puede ser el corazón de tu propio negocio
          </h2>
          <p className="max-w-lg text-text/70">
            Cada franquiciado recibe un equipo de marca propia Restauración Láser, no un import genérico.
          </p>
          <ButtonLink href="/franquicias">Ver oportunidad de franquicia</ButtonLink>
        </Container>
      </section>
    </>
  );
}
