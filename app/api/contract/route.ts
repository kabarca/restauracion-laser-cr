import { NextResponse } from "next/server";
import { contractAcceptanceSchema } from "@/lib/validation";
import { getResendClient, getFromEmail, getContactToEmail } from "@/lib/resend";

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const raw = {
    name: formData.get("name"),
    idNumber: formData.get("idNumber"),
    email: formData.get("email"),
    accepted: formData.get("accepted"),
    honeypot: formData.get("honeypot") ?? undefined,
  };

  const parsed = contractAcceptanceSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisá los datos del formulario e intentá de nuevo." }, { status: 400 });
  }

  const data = parsed.data;
  if (data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const acceptedAt = new Date().toLocaleString("es-CR", { timeZone: "America/Costa_Rica" });

  const emailText = `Nombre del cliente: ${data.name}
Cédula / NIT: ${data.idNumber}
Correo electrónico: ${data.email}

Aceptación registrada: "El cliente comprende y acepta que la labor del personal técnico se limita de manera estricta a la remoción y restauración en el material contratado. La empresa no se hace responsable por retrasos o imposibilidad de ejecutar el trabajo si el área o el objeto no se encuentran despejados, accesibles y listos para su intervención a la hora acordada."

Fecha y hora de aceptación (Costa Rica): ${acceptedAt}`;

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: getFromEmail(),
      to: getContactToEmail(),
      subject: `Contrato aceptado — ${data.name}`,
      text: emailText,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contract route error", error);
    return NextResponse.json(
      { error: "No pudimos registrar tu aceptación en este momento. Escribinos por WhatsApp mientras tanto." },
      { status: 500 },
    );
  }
}
