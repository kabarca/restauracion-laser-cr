import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export const metadata: Metadata = {
  title: "Recursos",
  robots: { index: false, follow: false },
};

export default function RecursosPage() {
  return (
    <section className="flex flex-1 items-center justify-center py-32">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Recursos</span>
        <h1 className="max-w-xl text-3xl font-bold sm:text-4xl">Próximamente</h1>
        <p className="max-w-md text-text/70">
          Estamos preparando guías y contenido técnico sobre limpieza láser. Mientras tanto, escribinos por
          WhatsApp si tenés una pregunta puntual.
        </p>
        <WhatsAppButton>Hablar por WhatsApp</WhatsAppButton>
      </Container>
    </section>
  );
}
