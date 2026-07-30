import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WaveBackground } from "@/components/decor/WaveBackground";
import { getTerritoryCounts } from "@/lib/content";
import { FRANCHISE_ENTRY_FEE_USD } from "@/lib/site-config";

export function FranchiseTeaser() {
  const { reservadas, total, disponibles } = getTerritoryCounts();

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-surface">
      <WaveBackground color="text-surface" />
      <Container className="relative flex flex-col items-center gap-8 text-center">
        <ScrollReveal variant="scale-in">
          <Badge tone="accent">
            {reservadas} de {total} territorios reservados · {disponibles} disponibles
          </Badge>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={0.1}>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Abrí tu propia franquicia de limpieza láser con territorio exclusivo
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={0.2}>
          <p className="max-w-xl text-lg text-surface/70">
            Equipo de marca propia, capacitación certificada y soporte continuo — desde{" "}
            ${FRANCHISE_ENTRY_FEE_USD.toLocaleString("es-CR")} USD.
          </p>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={0.3}>
          <ButtonLink href="/franquicias" variant="primary">
            Ver oportunidad de franquicia
          </ButtonLink>
        </ScrollReveal>
      </Container>
    </section>
  );
}
