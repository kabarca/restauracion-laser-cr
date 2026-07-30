import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: `Aviso legal y condiciones de uso del sitio web de ${SITE_NAME}.`,
};

export default function AvisoLegalPage() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <Container className="mx-auto flex max-w-3xl flex-col gap-8">
        <h1 className="text-4xl font-bold">Aviso Legal</h1>

        <div className="flex flex-col gap-6 text-text/80">
          <p>
            Este sitio web ({SITE_URL}) es operado por {SITE_NAME}, en adelante &ldquo;la empresa&rdquo;,
            con domicilio en Costa Rica. El acceso y uso de este sitio implica la aceptación de las
            condiciones descritas en este aviso legal.
          </p>

          <div>
            <h2 className="mb-2 text-xl font-bold">Objeto del sitio</h2>
            <p>
              Este sitio tiene como finalidad informar sobre los servicios de limpieza láser industrial y
              la oportunidad de franquicia de {SITE_NAME}, así como facilitar el contacto de clientes y
              prospectos de franquicia a través de WhatsApp y formularios web.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold">Propiedad intelectual</h2>
            <p>
              El contenido de este sitio — textos, gráficos, logotipos, fotografías y el diseño en general
              — es propiedad de {SITE_NAME} o se utiliza con la autorización correspondiente, y está
              protegido por la legislación de propiedad intelectual aplicable en Costa Rica. Queda
              prohibida su reproducción total o parcial sin autorización previa por escrito.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold">Limitación de responsabilidad</h2>
            <p>
              La información publicada en este sitio tiene fines informativos y comerciales.{" "}
              {SITE_NAME} procura que la información sea exacta y esté actualizada, pero no garantiza la
              ausencia de errores. Los precios, condiciones de franquicia y disponibilidad de territorios
              pueden variar — la información vigente será siempre la confirmada directamente con nuestro
              equipo.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold">Enlaces a terceros</h2>
            <p>
              Este sitio incluye enlaces a servicios de terceros, como WhatsApp y Google Maps, cuyo uso se
              rige por los términos y políticas propias de cada proveedor.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold">Legislación aplicable</h2>
            <p>
              Este aviso legal se rige por las leyes de la República de Costa Rica. Cualquier disputa
              relacionada con el uso de este sitio se someterá a los tribunales competentes de Costa Rica.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
