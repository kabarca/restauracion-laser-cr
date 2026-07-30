import { NextResponse } from "next/server";
import { services, territories, faqs, getTerritoryCounts } from "@/lib/content";
import { SITE_NAME, SITE_URL, FRANCHISE_ENTRY_FEE_USD, FRANCHISE_MONTHLY_FEE_USD } from "@/lib/site-config";

/** Composed from data/*.json at request time so it can never go stale like a hand-maintained file. */
export async function GET() {
  const { reservadas, total, disponibles } = getTerritoryCounts();

  const lines = [
    `# ${SITE_NAME}`,
    "",
    "> Limpieza láser industrial y franquicias en Costa Rica y Latinoamérica.",
    "",
    `Sitio web: ${SITE_URL}`,
    "",
    "## Servicios",
    ...services.map((s) => `- ${s.name}: ${s.shortDescription}`),
    "",
    "## Franquicias",
    `Inversión inicial: desde $${FRANCHISE_ENTRY_FEE_USD.toLocaleString("en-US")} USD + $${FRANCHISE_MONTHLY_FEE_USD} USD/mes.`,
    `Territorios en Costa Rica: ${reservadas} de ${total} reservados, ${disponibles} disponibles.`,
    ...territories.map((t) => `- ${t.name} (${t.status}): ${t.regions.join(", ")}`),
    "",
    "## Preguntas frecuentes",
    ...faqs.map((f) => `- ${f.question} ${f.answer}`),
    "",
    "## Enlaces",
    `- Servicios: ${SITE_URL}/servicios`,
    `- Tecnología: ${SITE_URL}/tecnologia`,
    `- Franquicias: ${SITE_URL}/franquicias`,
    `- Contacto: ${SITE_URL}/contacto`,
  ];

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
