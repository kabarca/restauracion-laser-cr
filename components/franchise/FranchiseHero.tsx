import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { FRANCHISE_ENTRY_FEE_USD, FRANCHISE_MONTHLY_FEE_USD } from "@/lib/site-config";
import { getCostaRicaTerritories } from "@/lib/content";

export function FranchiseHero() {
  return (
    <section className="bg-bg pb-16 pt-32 sm:pt-40">
      <Container className="grid gap-14 lg:grid-cols-[3fr_2fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Franquicias</span>
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Tu propio negocio de limpieza láser, con territorio exclusivo
          </h1>
          <p className="max-w-xl text-lg text-text/70">
            Equipo de marca propia, capacitación certificada de 24 horas y soporte continuo desde la
            sede central — abrí en aproximadamente 1 mes.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <WhatsAppButton message="Hola, quiero información sobre la franquicia de Restauración Láser.">
              Hablar por WhatsApp
            </WhatsAppButton>
            <ButtonLink href="#solicitud" variant="outline">
              Aplicar ahora
            </ButtonLink>
          </div>
        </div>

        <div className="relative flex flex-col gap-4">
          <ScrollReveal variant="scale-in">
            <div className="rounded-brand border border-ink/10 bg-secondary p-6 text-ink shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/70">Inversión inicial</p>
              <p className="mt-1 text-3xl font-bold">desde ${FRANCHISE_ENTRY_FEE_USD.toLocaleString("es-CR")} USD</p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="scale-in" delay={0.1}>
            <div className="ml-8 rounded-brand border border-ink/10 bg-secondary p-6 text-ink shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/70">Cuota mensual</p>
              <p className="mt-1 text-3xl font-bold">${FRANCHISE_MONTHLY_FEE_USD.toLocaleString("es-CR")} USD</p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="scale-in" delay={0.2}>
            <div className="rounded-brand border border-ink/10 bg-secondary p-6 text-ink shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/70">Territorios en Costa Rica</p>
              <p className="mt-1 text-3xl font-bold">{getCostaRicaTerritories().length}</p>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
