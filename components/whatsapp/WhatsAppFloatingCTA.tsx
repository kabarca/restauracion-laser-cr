import { MagneticButton } from "@/components/motion/MagneticButton";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/site-config";

export function WhatsAppFloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <MagneticButton strength={0.25}>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hablar por WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-surface shadow-lg shadow-black/20 transition-transform duration-300 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-105"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      </MagneticButton>
    </div>
  );
}
