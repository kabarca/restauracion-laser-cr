import { cn } from "@/lib/utils";

/** Low-opacity decorative wave layer for hero/footer/section backgrounds. Purely presentational. */
export function WaveBackground({
  className,
  color = "text-accent",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <svg
        className={cn("absolute left-1/2 top-1/2 h-auto w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]", color)}
        viewBox="0 0 600 120"
        fill="none"
      >
        <path
          d="M0,60 C50,0 100,0 150,60 C200,120 250,120 300,60 C350,0 400,0 450,60 C500,120 550,120 600,60"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
