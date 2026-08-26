"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Tappable radio/checkbox card — a large mobile-friendly hit target wrapping a real
 * (visually hidden but focusable) input, so keyboard and screen-reader behavior stay native.
 */
export function OptionCard({
  type,
  name,
  value,
  label,
  checked,
  onChange,
  required,
  className,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-brand border border-text/20 bg-bg px-4 py-3 text-sm font-medium transition-colors duration-200 has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
        className,
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        required={required}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center border-2 border-text/30 text-transparent transition-colors duration-200 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-surface",
          type === "radio" ? "rounded-full" : "rounded-[6px]",
        )}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      <span className="text-text">{label}</span>
    </label>
  );
}
