export const SITE_NAME = "Restauración Láser";
export const SITE_URL = "https://restauracionlaser.cr";

export const INSTAGRAM_URL = "https://www.instagram.com/restauracionlaser.cr/";
export const FACEBOOK_URL = "https://www.facebook.com/restauracionlaser.cr/";

/** Site-wide WhatsApp line (Santa Ana / sede central) — every generic WhatsApp CTA goes through here. */
export const WHATSAPP_NUMBER = "+50689019811";

export const FRANCHISE_ENTRY_FEE_USD = 19_500;
export const FRANCHISE_MONTHLY_FEE_USD = 550;

/**
 * Builds a wa.me deep link. Number is normalized to digits-only per wa.me's format.
 * Falls back to a generic greeting when no message is given, and to the site-wide
 * number when a franchisee has no WhatsApp of its own.
 */
export function buildWhatsAppLink(message?: string, number: string = WHATSAPP_NUMBER) {
  const digits = number.replace(/\D/g, "");
  const text = message ?? "Hola, me gustaría más información sobre Restauración Láser.";
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
