import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Franchisee } from "@/types/content";

const STATUS_LABEL: Record<Franchisee["status"], string> = {
  activo: "Activo",
  proximamente: "Próximamente",
  disponible: "Disponible",
};

export function FranchiseCard({ franchisee }: { franchisee: Franchisee }) {
  return (
    <Link
      href={`/${franchisee.countryCode}/${franchisee.citySlug}`}
      className="group flex h-full flex-col gap-3 rounded-brand border border-text/10 bg-bg p-6 transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">{franchisee.cityName}</h3>
          <p className="text-sm text-text/60">{franchisee.countryName}</p>
        </div>
        <Badge tone={franchisee.status === "activo" ? "accent" : "muted"}>{STATUS_LABEL[franchisee.status]}</Badge>
      </div>
      <p className="text-sm text-text/70">{franchisee.description}</p>
      <span className="mt-auto text-sm font-semibold text-accent-link group-hover:underline">Ver ubicación →</span>
    </Link>
  );
}
