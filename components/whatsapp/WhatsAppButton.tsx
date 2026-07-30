import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/site-config";

export function WhatsAppButton({
  message,
  number,
  children = "Hablar por WhatsApp",
  variant = "primary",
  className,
}: {
  message?: string;
  /** Overrides the site-wide WhatsApp number — e.g. a franchisee's own line. */
  number?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}) {
  return (
    <ButtonLink href={buildWhatsAppLink(message, number)} variant={variant} className={className}>
      <WhatsAppIcon className="h-5 w-5" />
      {children}
    </ButtonLink>
  );
}
