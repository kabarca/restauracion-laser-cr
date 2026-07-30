import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { getResendClient, getFromEmail, getContactToEmail } from "@/lib/resend";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisá los datos del formulario e intentá de nuevo." }, { status: 400 });
  }

  const { name, email, phone, message, honeypot } = parsed.data;
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: getFromEmail(),
      to: getContactToEmail(),
      replyTo: email,
      subject: `Nuevo mensaje de contacto — ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\n\nMensaje:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact route error", error);
    return NextResponse.json(
      { error: "No pudimos enviar tu mensaje en este momento. Escribinos por WhatsApp mientras tanto." },
      { status: 500 },
    );
  }
}
