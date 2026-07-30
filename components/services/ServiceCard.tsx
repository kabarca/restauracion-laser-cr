import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import type { Service } from "@/types/content";

/** Compact icon-led teaser card — used on Home's services grid. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/servicios#${service.slug}`}
      className="group flex h-full flex-col gap-4 rounded-brand border border-text/10 bg-bg p-6 transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <ServiceIcon icon={service.icon} className="h-10 w-10 text-secondary" />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-lg font-bold">{service.name}</h3>
        <p className="text-sm text-text/70">{service.shortDescription}</p>
      </div>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-link">
        Ver más
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
