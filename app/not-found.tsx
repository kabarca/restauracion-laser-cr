import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WaveBackground } from "@/components/decor/WaveBackground";

export default function NotFound() {
  return (
    <section className="relative flex flex-1 items-center overflow-hidden bg-bg py-24">
      <WaveBackground />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <span className="font-display text-6xl font-bold text-accent/30 sm:text-7xl">404</span>
        <h1 className="max-w-lg text-3xl font-bold leading-tight sm:text-4xl">
          No encontramos esa página
        </h1>
        <p className="max-w-md text-lg text-text/70">
          El enlace puede estar roto o la página se movió. Volvé al inicio o escribinos por WhatsApp
          si buscabas algo puntual.
        </p>
        <ButtonLink href="/" variant="primary">
          Volver al inicio
        </ButtonLink>
      </Container>
    </section>
  );
}
