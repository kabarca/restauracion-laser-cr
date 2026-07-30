import { NextResponse } from "next/server";
import { franchiseApplicationSchema } from "@/lib/validation";
import { getResendClient, getFromEmail, getContactToEmail } from "@/lib/resend";
import { getAvailableTerritories } from "@/lib/content";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = franchiseApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisá los datos del formulario e intentá de nuevo." }, { status: 400 });
  }

  const { name, email, phone, territorioDeInteres, message, honeypot } = parsed.data;
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const territory = getAvailableTerritories().find((t) => t.id === territorioDeInteres);
  if (!territory) {
    return NextResponse.json({ error: "El territorio seleccionado ya no está disponible." }, { status: 400 });
  }

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: getFromEmail(),
      to: getContactToEmail(),
      replyTo: email,
      subject: `Nueva solicitud de franquicia — ${territory.name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\nTerritorio de interés: ${territory.name}\n\nMensaje:\n${message ?? "(sin mensaje adicional)"}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("franchise-application route error", error);
    return NextResponse.json(
      { error: "No pudimos enviar tu solicitud en este momento. Escribinos por WhatsApp mientras tanto." },
      { status: 500 },
    );
  }
}
