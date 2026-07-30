import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { franchisees } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribinos por WhatsApp o dejanos un mensaje — te respondemos a la brevedad.",
};

export default function ContactoPage() {
  const headquarters = franchisees.find((f) => f.isHeadquarters) ?? franchisees[0];

  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos"
          subtitle="La forma más rápida de contactarnos es por WhatsApp. También podés escribirnos por este formulario."
        />

        <div className="grid gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <WhatsAppButton className="w-fit">Hablar por WhatsApp</WhatsAppButton>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">Sede central</h2>
              <p className="mt-2 text-text/80">{headquarters.address}</p>
            </div>
            <MapEmbed lat={headquarters.geo.lat} lng={headquarters.geo.lng} label={headquarters.cityName} />
          </div>
        </div>
      </Container>
    </section>
  );
}
