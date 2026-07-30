"use client";

import { ReactCompareSlider } from "react-compare-slider";
import { cn } from "@/lib/utils";

function Panel({ id, label, alt, tone }: { id: string; label: string; alt: string; tone: "before" | "after" }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        tone === "before" ? "bg-secondary/15" : "bg-accent/10",
      )}
    >
      <svg
        className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary opacity-20"
        viewBox="0 0 600 120"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C50,0 100,0 150,60 C200,120 250,120 300,60 C350,0 400,0 450,60 C500,120 550,120 600,60"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
        {label}
      </span>
      {process.env.NODE_ENV !== "production" && (
        <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 font-mono text-[10px] text-white">
          [placeholder: {id}]
        </span>
      )}
    </div>
  );
}

/** Large-format before/after comparison — the primary visual proof on /servicios, not a small thumbnail. */
export function BeforeAfterSlider({
  placeholderId,
  alt,
  hoverScrub = false,
  className,
}: {
  placeholderId: string;
  alt: string;
  /** Slider follows the pointer on hover instead of requiring a click-drag — the signature /servicios card interaction. */
  hoverScrub?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("aspect-[16/10] overflow-hidden rounded-brand", className)}>
      <ReactCompareSlider
        style={{ height: "100%", width: "100%" }}
        changePositionOnHover={hoverScrub}
        itemOne={<Panel id={`${placeholderId}-before`} label="Antes" alt={`Antes — ${alt}`} tone="before" />}
        itemTwo={<Panel id={`${placeholderId}-after`} label="Después" alt={`Después — ${alt}`} tone="after" />}
      />
    </div>
  );
}
