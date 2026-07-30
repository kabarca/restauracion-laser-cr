import Image from "next/image";
import { cn } from "@/lib/utils";

type PlaceholderSize = "card" | "large" | "full-bleed";

const sizeClasses: Record<PlaceholderSize, string> = {
  card: "aspect-[4/3] rounded-brand",
  large: "aspect-[16/10] rounded-brand",
  "full-bleed": "aspect-[21/9] w-full sm:aspect-[3/1]",
};

/**
 * Fixed-aspect image slot. Renders a real <Image> when `src` is provided, otherwise a
 * wave-motif placeholder box — so swapping in real photography later is a one-line change.
 */
const objectPositionClasses = {
  center: "object-center",
  left: "object-left",
  right: "object-right",
  top: "object-top",
  bottom: "object-bottom",
} as const;

export function ImagePlaceholder({
  id,
  alt,
  src,
  size = "card",
  className,
  priority,
  objectPosition = "center",
}: {
  id: string;
  alt: string;
  src?: string;
  size?: PlaceholderSize;
  className?: string;
  priority?: boolean;
  objectPosition?: keyof typeof objectPositionClasses;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", sizeClasses[size], className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn("object-cover", objectPositionClasses[objectPosition])}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        // Solid, not bg-secondary/10 — a translucent placeholder would let anything
        // positioned behind it (e.g. the onboarding timeline's wave-dot line) show through.
        "relative flex items-center justify-center overflow-hidden bg-[#232019]",
        sizeClasses[size],
        className,
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
      {process.env.NODE_ENV !== "production" && (
        <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 font-mono text-[10px] text-white">
          [placeholder: {id}]
        </span>
      )}
    </div>
  );
}
