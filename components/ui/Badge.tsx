import { cn } from "@/lib/utils";

type BadgeTone = "accent" | "secondary" | "muted";

const toneClasses: Record<BadgeTone, string> = {
  accent: "bg-accent text-surface",
  secondary: "bg-secondary text-ink",
  muted: "bg-text/10 text-text/70",
};

export function Badge({
  tone = "accent",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
