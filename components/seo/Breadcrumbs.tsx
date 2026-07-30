import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs({
  items,
  tone = "default",
}: {
  items: { label: string; href?: string }[];
  /** Use "inverted" over dark/photo backgrounds so the trail stays legible. */
  tone?: "default" | "inverted";
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-2 text-sm",
        tone === "inverted" ? "text-surface/70" : "text-text/60",
      )}
    >
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
          {item.href && i < items.length - 1 ? (
            <Link
              href={item.href}
              className={cn(
                "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                tone === "inverted" ? "hover:text-surface" : "hover:text-accent",
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className={tone === "inverted" ? "text-surface" : "text-text"}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
