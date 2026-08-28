import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContractAcceptanceForm } from "@/components/contract/ContractAcceptanceForm";

export const metadata: Metadata = {
  title: "Contrato de Aceptación y Resguardo",
  description:
    "Términos, condiciones, alcance del servicio y matriz de responsabilidades de Restauración Láser.",
};

const RESPONSIBILITY_ROWS = [
  {
    aspect: "Alcance de la Intervención",
    company: "Trabajar únicamente sobre la superficie, pieza o área especificada en la cotización.",
    client: "Indicar con precisión la zona a intervenir y abstenerse de solicitar tareas adicionales al personal en sitio.",
  },
  {
    aspect: "Preparación del Área y Mover Objetos",
    company: "Operar el equipo láser y ejecutar la limpieza/restauración de la superficie contratada.",
    client:
      "Despejar el área por completo, retirar objetos frágiles, muebles o piezas ajenas al servicio antes de la llegada de los técnicos. El personal no realiza mudanza ni reubicación de bienes.",
  },
  {
    aspect: "Puntos de Electricidad y Acceso",
    company: "Conectar y operar los equipos láser y de extracción de humos.",
    client:
      "Garantizar el acceso a la toma de corriente acordada (con el voltaje especificado) y un camino libre para el traslado del equipo.",
  },
  {
    aspect: "Delimitación de Seguridad",
    company: "Colocar la señalización y protecciones requeridas para el uso seguro del láser.",
    client: "Mantener a personas no autorizadas, niños y mascotas fuera del perímetro de trabajo durante todo el proceso.",
  },
  {
    aspect: "Protección de Materiales Adyacentes",
    company: "Proteger con enmascarado adecuado las zonas inmediatas a la pieza a trabajar.",
    client: "Informar con anterioridad sobre materiales delicados o instalaciones sensibles cercanas a la zona de trabajo.",
  },
];

export default function ContratoPage() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Términos, condiciones y alcance del servicio"
          title="Contrato de Aceptación y Resguardo"
          subtitle="Con el objetivo de brindar un servicio seguro, eficiente y enfocado exclusivamente en la máxima calidad del resultado, nuestro personal se limitará estrictamente al alcance contratado."
        />

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Matriz de Responsabilidades</h2>
          <div className="overflow-x-auto rounded-brand border border-text/10">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-text/10 bg-text/5">
                  <th className="px-4 py-3 font-semibold">Aspecto del Servicio</th>
                  <th className="px-4 py-3 font-semibold">Responsabilidad de Restauración Láser</th>
                  <th className="px-4 py-3 font-semibold">Responsabilidad del Cliente</th>
                </tr>
              </thead>
              <tbody>
                {RESPONSIBILITY_ROWS.map((row) => (
                  <tr key={row.aspect} className="border-b border-text/10 align-top last:border-b-0">
                    <td className="px-4 py-3 font-semibold">{row.aspect}</td>
                    <td className="px-4 py-3 text-text/80">{row.company}</td>
                    <td className="px-4 py-3 text-text/80">{row.client}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-brand border border-text/10 bg-text/5 p-6">
          <h2 className="mb-2 text-xl font-bold">Aceptación del Servicio</h2>
          <p className="italic text-text/80">
            &ldquo;El cliente comprende y acepta que la labor del personal técnico se limita de manera
            estricta a la remoción y restauración en el material contratado. La empresa no se hace
            responsable por retrasos o imposibilidad de ejecutar el trabajo si el área o el objeto no se
            encuentran despejados, accesibles y listos para su intervención a la hora acordada.&rdquo;
          </p>
        </div>

        <div className="flex flex-col gap-4 max-w-2xl">
          <h2 className="text-xl font-bold">Firma de Conformidad</h2>
          <ContractAcceptanceForm />
        </div>
      </Container>
    </section>
  );
}
