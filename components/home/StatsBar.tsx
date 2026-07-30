import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { services, franchisees, getCostaRicaTerritories } from "@/lib/content";

const STATS = [
  { value: `${services.length}`, label: "Servicios especializados" },
  { value: `${franchisees.length}`, label: "Ubicaciones activas" },
  { value: `${getCostaRicaTerritories().length}`, label: "Territorios en Costa Rica" },
  { value: "300W", label: "Potencia del láser" },
];

export function StatsBar() {
  return (
    <section className="border-y border-text/10 bg-bg py-10">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} variant="fade-up" delay={i * 0.08}>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-text/60">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
