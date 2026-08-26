import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WaveBackground } from "@/components/decor/WaveBackground";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { FACEBOOK_URL, INSTAGRAM_URL, SITE_NAME } from "@/lib/site-config";

const SOCIAL_LINKS = [
  { href: FACEBOOK_URL, label: "Facebook", Icon: FacebookIcon },
  { href: INSTAGRAM_URL, label: "Instagram", Icon: InstagramIcon },
];

const FOOTER_NAV = [
  { href: "/servicios", label: "Servicios" },
  { href: "/tecnologia", label: "Tecnología" },
  { href: "/franquicias", label: "Franquicias" },
  { href: "/sobre-nosotros", label: "Sobre Nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/form/servicio", label: "Evaluar mi Proyecto" },
];

const LEGAL_NAV = [
  { href: "/aviso-legal", label: "Aviso Legal" },
  { href: "/politica-de-privacidad", label: "Política de Privacidad" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-text/10 bg-bg">
      <WaveBackground />
      <Container className="relative flex flex-col gap-12 py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-4">
            <Image src="/logo/logo-full.png" alt={SITE_NAME} width={180} height={140} className="w-36 object-contain object-left" />
            <p className="max-w-xs text-sm text-text/70">
              Limpieza láser profesional y franquicias en Costa Rica y Latinoamérica.
            </p>
            <WhatsAppButton className="w-fit" />
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-text/20 text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-16">
            <nav className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Navegación</span>
              {FOOTER_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit rounded-sm text-sm text-text/80 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Legal</span>
              {LEGAL_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit rounded-sm text-sm text-text/80 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-text/10 pt-6 text-xs text-text/60 sm:flex-row">
          <span>© {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.</span>
          <span>Costa Rica</span>
        </div>
      </Container>
    </footer>
  );
}
