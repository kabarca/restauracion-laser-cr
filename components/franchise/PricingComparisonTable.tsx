import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { franchiseComparison } from "@/lib/content";
import { FRANCHISE_ENTRY_FEE_USD } from "@/lib/site-config";

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 text-accent" aria-label="Incluido" />
    ) : (
      <X className="h-5 w-5 text-text/30" aria-label="No incluido" />
    );
  }
  return <span className="text-sm text-text/80">{value}</span>;
}

export function PricingComparisonTable() {
  return (
    <section className="bg-secondary/5 py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Inversión"
          title="Equipo solo vs. franquicia completa"
          subtitle="Comprar el equipo te da la máquina. La franquicia te da un negocio."
        />
        <div className="overflow-x-auto rounded-brand border border-text/10">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-ink text-surface">
                <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide">Incluye</th>
                <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide text-surface/60">Equipo ($6,500 USD)</th>
                <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide text-accent">
                  Franquicia (desde ${FRANCHISE_ENTRY_FEE_USD.toLocaleString("es-CR")} USD)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-text/10">
              {franchiseComparison.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 1 ? "bg-secondary/5" : "bg-bg"}>
                  <td className="px-5 py-4 text-sm font-semibold">{row.feature}</td>
                  <td className="px-5 py-4">
                    <Cell value={row.equipo} />
                  </td>
                  <td className="bg-accent/5 px-5 py-4">
                    <Cell value={row.franquicia} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
