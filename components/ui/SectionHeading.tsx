import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{eyebrow}</span>
      )}
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className="max-w-2xl text-lg text-text/70">{subtitle}</p>}
    </div>
  );
}
