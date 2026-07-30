import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { TestimonialScrollCard } from "@/components/home/TestimonialScrollCard";
import { testimonials } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-bg">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-8 px-6 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-0 lg:pt-0">
          <div className="flex flex-col gap-6">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Limpieza láser · Costa Rica &amp; Latinoamérica
            </span>
            <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Restauramos superficies con láser de alta precisión.
            </h1>
            <p className="max-w-lg text-lg text-text/70">
              Eliminamos óxido, pintura, grafiti, hongos, suciedad y más sin químicos ni abrasivos, en
              todo Costa Rica.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <WhatsAppButton message="Hola, quiero más información sobre los servicios de limpieza láser.">
              Hablar por WhatsApp
            </WhatsAppButton>
            <ButtonLink href="/tecnologia" variant="outline">
              Conocer la tecnología
            </ButtonLink>
          </div>
        </div>

        <div className="relative min-h-[60vh] lg:min-h-screen">
          <ImagePlaceholder
            id="home-hero"
            src="/images/home-hero.png"
            alt="Técnico de Restauración Láser limpiando la superficie de una mesa de madera con la máquina de limpieza láser"
            size="full-bleed"
            objectPosition="left"
            priority
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" aria-hidden="true" />
          <TestimonialScrollCard testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
