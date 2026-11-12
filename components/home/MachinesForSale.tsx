import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const POWER_OPTIONS = ["120W", "300W", "500W"];

const HIGHLIGHTS = [
  "Equipo de marca propia Restauración Láser",
  "Sin químicos ni abrasivos",
  "Consultá cuál potencia te conviene, disponibilidad y precio por WhatsApp",
];

export function MachinesForSale() {
  return (
    <>
      <div className="bg-accent px-6 py-6 text-center text-surface">
        <p className="font-display text-2xl font-extrabold uppercase tracking-wide sm:text-4xl">
          ¡Nuestras máquinas de limpieza láser están a la venta!
        </p>
      </div>

      <section id="maquinas-a-la-venta" className="scroll-mt-24 bg-secondary/5 py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal variant="fade-up">
            <div className="flex flex-col gap-5">
              <span className="text-base font-bold uppercase tracking-[0.2em] text-secondary">A la venta</span>
              <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Llevá la limpieza láser a tu propio negocio
              </h2>
              <p className="max-w-xl text-lg text-text/70">
                Nuestras máquinas de limpieza láser, las mismas que usamos en cada proyecto, ahora están
                disponibles para la venta en tres potencias.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-wide text-text/60">Potencias:</span>
                {POWER_OPTIONS.map((power) => (
                  <span
                    key={power}
                    className="rounded-brand border-2 border-accent px-5 py-2 font-display text-2xl font-extrabold text-accent"
                  >
                    {power}
                  </span>
                ))}
              </div>
              <ul className="flex flex-col gap-2 text-text/80">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-accent" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4 pt-2">
                <WhatsAppButton
                  message="Hola, quiero información sobre las máquinas de limpieza láser que tienen a la venta."
                  className="px-8 py-4 text-base font-bold"
                >
                  Consultar por WhatsApp
                </WhatsAppButton>
                <ButtonLink href="/tecnologia" variant="outline">
                  Conocer la tecnología
                </ButtonLink>
              </div>
            </div>
          </ScrollReveal>

          <ImagePlaceholder
            id="home-machines-for-sale"
            src="/images/home-hero.png"
            alt="Máquina de limpieza láser Restauración Láser en operación"
            size="large"
            objectPosition="left"
          />
        </Container>
      </section>
    </>
  );
}
