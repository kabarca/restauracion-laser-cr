import { buildWhatsAppLink } from "@/lib/site-config";

const WHATSAPP_HREF = buildWhatsAppLink("Hola, quiero información sobre las máquinas de limpieza láser que tienen a la venta.");

export function AnnouncementBar() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 bg-accent px-4 py-3.5 text-center text-base font-extrabold uppercase tracking-wide text-surface transition-[filter] hover:brightness-110 sm:text-xl"
    >
      <span className="hidden sm:inline" aria-hidden="true">
        🔥
      </span>
      Máquinas de limpieza láser a la venta
      <span className="hidden underline underline-offset-4 sm:inline">· Consultá ahora →</span>
    </a>
  );
}
