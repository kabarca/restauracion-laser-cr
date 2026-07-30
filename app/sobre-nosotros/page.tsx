import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Restauración Láser combina tecnología láser de marca propia con un modelo de franquicia pensado para Costa Rica y Latinoamérica.",
};

const VALUES = [
  {
    title: "Precisión sobre atajos",
    description: "Preferimos un proceso más lento y controlado antes que dañar la superficie del cliente.",
  },
  {
    title: "Transparencia técnica",
    description: "Mostramos la ficha técnica real de nuestro equipo — no promesas vagas de marketing.",
  },
  {
    title: "Franquiciados, no solo clientes de equipo",
    description: "Cada franquiciado recibe soporte continuo, no solo una máquina y un manual.",
  },
];

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="relative isolate min-h-[55vh] w-full overflow-hidden bg-ink text-surface">
        <ImagePlaceholder
          id="sobre-nosotros-hero"
          alt="Equipo de Restauración Láser trabajando en taller"
          size="full-bleed"
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" aria-hidden="true" />
        <Container className="relative flex min-h-[55vh] flex-col justify-end gap-4 pb-16 pt-32">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Sobre nosotros</span>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Nuestra experiencia en remodelación residencial nos llevó a ver la necesidad.
          </h1>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-5">
            <SectionHeading title="De buscar soluciones a liderar la innovación" />
            <p className="text-text/70">
              Soy Alejandra, «ColombiaTica», diseñadora de interiores y apasionada por la
              transformación de espacios. Tras años ejecutando proyectos residenciales, gestionando
              materiales, proveedores, aciertos y aprendizajes en el camino, entendí que el diseño no
              solo se trata de crear, sino de preservar y restaurar.
            </p>
            <p className="text-text/70">
              Cuando conocí la tecnología de limpieza láser, supe que era el futuro. Sin embargo, no
              quería traer cualquier máquina: necesitaba un equipo construido con las especificaciones
              exactas para responder a los sustratos (superficies) y condiciones de América Latina.
            </p>
            <p className="text-text/70">
              Luego de meses de intensa investigación, comparaciones técnicas y conversaciones directas
              con fabricantes en China, encontramos el equipo perfecto y la tecnología ideal para dar
              este gran paso.
            </p>
            <p className="text-text/70">
              Así nace Restauración Láser: una marca pionera con la que iniciamos operaciones en Costa
              Rica para luego llevar este modelo de vanguardia al resto de Latinoamérica.
            </p>
          </div>
          <ImagePlaceholder
            id="sobre-nosotros-taller"
            alt="Detalle de la máquina de limpieza láser Restauración Láser"
            size="large"
          />
        </Container>
      </section>

      <section className="bg-secondary/5 py-24">
        <Container className="flex flex-col gap-14">
          <SectionHeading eyebrow="Cómo trabajamos" title="Tres principios detrás de cada proyecto" />
          <div className="grid gap-8 sm:grid-cols-3">
            {VALUES.map((value, i) => (
              <ScrollReveal key={value.title} variant="fade-up" delay={i * 0.1}>
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-bold">{value.title}</h3>
                  <p className="text-sm text-text/70">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">¿Querés conocer más sobre cómo trabajamos?</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <WhatsAppButton>Hablar por WhatsApp</WhatsAppButton>
            <ButtonLink href="/franquicias" variant="outline">
              Ver oportunidad de franquicia
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
