import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-surface hover:brightness-110",
  secondary: "bg-secondary text-ink hover:brightness-110",
  outline: "border-2 border-text text-text hover:bg-text hover:text-bg",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-brand px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-[background-color,color,border-color,transform] duration-300 ease-out active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  external?: boolean;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick" | "disabled" | "name" | "value" | "form"> {}

export function ButtonLink({ variant = "primary", className, children, href, external }: ButtonAsLinkProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);
  const isExternal = external || href.startsWith("http") || href.startsWith("https://wa.me");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Button({ variant = "primary", className, children, ...buttonProps }: ButtonAsButtonProps) {
  return (
    <button className={cn(baseClasses, variantClasses[variant], className)} {...buttonProps}>
      {children}
    </button>
  );
}
