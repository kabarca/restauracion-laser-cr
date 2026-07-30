import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { franchisees, getFranchisee, testimonials } from "@/lib/content";
import { WHATSAPP_NUMBER } from "@/lib/site-config";
import { localBusinessSchema, breadcrumbListSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return franchisees.map((f) => ({ pais: f.countryCode, ciudad: f.citySlug }));
}

export const dynamicParams = false;

type FranchiseePageProps = {
  params: Promise<{ pais: string; ciudad: string }>;
};

export async function generateMetadata({ params }: FranchiseePageProps): Promise<Metadata> {
  const { pais, ciudad } = await params;
  const franchisee = getFranchisee(pais, ciudad);
  if (!franchisee) return {};

  return {
    title: `Limpieza láser en ${franchisee.cityName}`,
    description: franchisee.description,
  };
}

export default async function FranchiseePage({ params }: FranchiseePageProps) {
  const { pais, ciudad } = await params;
  const franchisee = getFranchisee(pais, ciudad);
  if (!franchisee) notFound();

  const relatedTestimonials = testimonials.filter((t) => t.franchiseeId === franchisee.id);
  const whatsappNumber = franchisee.whatsapp ?? WHATSAPP_NUMBER;
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Franquicias", href: "/franquicias" },
    { label: franchisee.cityName, href: `/${franchisee.countryCode}/${franchisee.citySlug}` },
  ];

  return (
    <>
      <JsonLd data={localBusinessSchema(franchisee)} />
      <JsonLd data={breadcrumbListSchema(breadcrumbItems)} />
      <section className="relative isolate min-h-[60vh] w-full overflow-hidden bg-ink text-surface">
        <ImagePlaceholder
          id={franchisee.heroImagePlaceholderId}
          alt={`Franquicia Restauración Láser en ${franchisee.cityName}`}
          size="full-bleed"
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" aria-hidden="true" />
        <Container className="relative flex min-h-[60vh] flex-col justify-end gap-4 pb-16 pt-32">
          <Breadcrumbs tone="inverted" items={breadcrumbItems} />
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold sm:text-5xl">
              Restauración Láser {franchisee.cityName}
            </h1>
            {franchisee.isHeadquarters && <Badge tone="accent">Sede central</Badge>}
          </div>
          <p className="max-w-xl text-surface/80">{franchisee.countryName}</p>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-14 lg:grid-cols-[3fr_2fr]">
          <div className="flex flex-col gap-6">
            <p className="text-lg text-text/70">{franchisee.description}</p>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">Zona de servicio</h2>
              <p className="mt-2 text-text/80">{franchisee.serviceArea.join(", ")}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">Dirección</h2>
              <p className="mt-2 text-text/80">{franchisee.address}</p>
            </div>

            <WhatsAppButton
              number={whatsappNumber}
              message={`Hola, quiero más información sobre los servicios en ${franchisee.cityName}.`}
              className="w-fit"
            >
              Hablar por WhatsApp
            </WhatsAppButton>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {franchisee.gallery.map((imageId) => (
              <ImagePlaceholder
                key={imageId}
                id={imageId}
                alt={`Trabajo realizado por Restauración Láser ${franchisee.cityName}`}
                size="card"
              />
            ))}
          </div>
        </Container>
      </section>

      {relatedTestimonials.length > 0 && (
        <section className="bg-secondary/5 py-24">
          <Container className="flex flex-col gap-10">
            <h2 className="text-3xl font-bold">Lo que dicen en {franchisee.cityName}</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedTestimonials.map((testimonial, i) => (
                <ScrollReveal key={testimonial.id} variant="fade-up" delay={i * 0.08}>
                  <div className="flex flex-col gap-4 rounded-brand border border-text/10 bg-bg p-6">
                    <p className="text-text/80">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                      <div className="text-sm">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-text/60">
                          {testimonial.role === "franquiciado" ? "Franquiciado" : "Cliente"} · {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
