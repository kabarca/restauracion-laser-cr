import { BeforeAfterSlider } from "@/components/media/BeforeAfterSlider";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { Badge } from "@/components/ui/Badge";
import type { Service } from "@/types/content";

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <article
      id={service.slug}
      className="flex scroll-mt-28 flex-col gap-6 rounded-brand border border-text/10 bg-bg p-6 sm:p-8"
    >
      <BeforeAfterSlider
        placeholderId={service.beforeAfterPlaceholderId}
        alt={`${service.name} — antes y después`}
        hoverScrub
      />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <ServiceIcon icon={service.icon} className="h-9 w-9 text-secondary" />
          <h3 className="text-2xl font-bold">{service.name}</h3>
        </div>
        <p className="text-text/70">{service.description}</p>
        <div className="flex flex-wrap gap-2">
          {service.keywords.slice(0, 3).map((keyword) => (
            <Badge key={keyword} tone="muted">
              {keyword}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
