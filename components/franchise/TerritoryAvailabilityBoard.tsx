import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  getCostaRicaTerritories,
  getInternationalTerritory,
  getTerritoryCounts,
  getFranchiseeById,
} from "@/lib/content";

export function TerritoryAvailabilityBoard() {
  const { reservadas, total, disponibles } = getTerritoryCounts();
  const crTerritories = getCostaRicaTerritories();
  const internationalTerritory = getInternationalTerritory();

  return (
    <section className="py-24">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionHeading eyebrow="Disponibilidad de territorios" title="7 territorios en Costa Rica" align="center" />
          <Badge tone="accent" className="text-sm">
            {reservadas} de {total} territorios reservados · {disponibles} disponibles
          </Badge>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {crTerritories.map((territory, i) => {
            const franchisee = territory.franchiseeId ? getFranchiseeById(territory.franchiseeId) : undefined;
            const isReserved = territory.status === "reservado";

            return (
              <ScrollReveal key={territory.id} variant="fade-up" delay={i * 0.05}>
                <div
                  className={
                    isReserved
                      ? "flex h-full flex-col gap-4 rounded-brand border border-text/10 bg-text/5 p-6 opacity-70"
                      : "flex h-full flex-col gap-4 rounded-brand border-2 border-accent bg-accent/5 p-6"
                  }
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold">{territory.name}</h3>
                    <Badge tone={isReserved ? "muted" : "accent"}>{isReserved ? "Reservado" : "Disponible"}</Badge>
                  </div>
                  <p className="text-sm text-text/60">{territory.regions.join(", ")}</p>

                  <div className="mt-auto pt-2">
                    {isReserved && franchisee ? (
                      <Link
                        href={`/${franchisee.countryCode}/${franchisee.citySlug}`}
                        className="rounded-sm text-sm font-semibold text-accent-link hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        Ya operando — ver caso de éxito →
                      </Link>
                    ) : (
                      <ButtonLink href={`/franquicias?territorio=${territory.id}#solicitud`} variant="primary" className="w-full">
                        Reservar este territorio
                      </ButtonLink>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

          {internationalTerritory && (
            <ScrollReveal variant="fade-up" delay={crTerritories.length * 0.05} className="sm:col-span-2 lg:col-span-2">
              <div className="flex h-full flex-col gap-4 rounded-brand border-2 border-dashed border-secondary bg-secondary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold">{internationalTerritory.name}</h3>
                    <Badge tone="secondary">Latinoamérica</Badge>
                  </div>
                  <p className="text-sm text-text/60">{internationalTerritory.regions.join(", ")}</p>
                </div>
                <ButtonLink
                  href={`/franquicias?territorio=${internationalTerritory.id}#solicitud`}
                  variant="secondary"
                  className="shrink-0"
                >
                  Reservar mi país
                </ButtonLink>
              </div>
            </ScrollReveal>
          )}
        </div>
      </Container>
    </section>
  );
}
