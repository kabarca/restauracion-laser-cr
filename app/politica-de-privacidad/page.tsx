import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Cómo ${SITE_NAME} recopila, usa y protege tus datos personales, conforme a la Ley 8968 de Costa Rica.`,
};

export default function PoliticaDePrivacidadPage() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <Container className="mx-auto flex max-w-3xl flex-col gap-8">
        <h1 className="text-4xl font-bold">Política de Privacidad</h1>

        <div className="flex flex-col gap-6 text-text/80">
          <p>
            En {SITE_NAME} respetamos tu privacidad y tratamos tus datos personales conforme a la Ley
            N.º 8968, Ley de Protección de la Persona Frente al Tratamiento de sus Datos Personales, y su
            reglamento, bajo la supervisión de la Agencia de Protección de Datos de los Habitantes
            (PRODHAB) de Costa Rica.
          </p>

          <div>
            <h2 className="mb-2 text-xl font-bold">Datos que recopilamos</h2>
            <p>
              Cuando completás el formulario de contacto o de solicitud de franquicia recopilamos: nombre,
              correo electrónico, teléfono y el contenido del mensaje que nos enviás — incluyendo, en el
              caso de la solicitud de franquicia, el territorio de tu interés.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold">Finalidad del tratamiento</h2>
            <p>
              Usamos estos datos exclusivamente para responder tu consulta, dar seguimiento a tu solicitud
              de franquicia o coordinar un servicio. No vendemos ni compartimos tus datos con terceros con
              fines publicitarios.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold">Terceros involucrados en el tratamiento</h2>
            <p>
              Utilizamos Resend como proveedor de envío de correo electrónico para procesar los mensajes de
              los formularios, y Google Maps para mostrar la ubicación de nuestra sede — ambos servicios
              pueden procesar datos técnicos de tu visita conforme a sus propias políticas de privacidad.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold">Tus derechos (Derechos ARCO)</h2>
            <p>
              Conforme a la Ley 8968, tenés derecho a acceder, rectificar, cancelar y oponerte al
              tratamiento de tus datos personales. Para ejercer cualquiera de estos derechos, escribinos por
              WhatsApp o a través del formulario de contacto de este sitio.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold">Conservación de datos</h2>
            <p>
              Conservamos tus datos únicamente durante el tiempo necesario para atender tu consulta o
              solicitud, o mientras exista una relación comercial activa.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold">Cookies</h2>
            <p>
              Este sitio no utiliza cookies de seguimiento publicitario ni analítica de terceros. El mapa
              embebido de Google Maps puede establecer sus propias cookies técnicas conforme a la política
              de privacidad de Google.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
