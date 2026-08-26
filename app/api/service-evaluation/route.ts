import { NextResponse } from "next/server";
import { serviceEvaluationSchema } from "@/lib/validation";
import { getResendClient, getFromEmail, getContactToEmail } from "@/lib/resend";
import {
  MATERIAL_TYPES,
  SURFACE_CONDITIONS,
  COATINGS,
  PAINT_AGES,
  COATING_THICKNESS,
  HAS_DETAILS_OPTIONS,
  ELECTRICAL_ACCESS_OPTIONS,
  VENTILATION_OPTIONS,
  labelFor,
} from "@/lib/service-evaluation-options";

const MAX_FILES = 6;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const raw = {
    name: formData.get("name"),
    location: formData.get("location"),
    materialType: formData.get("materialType"),
    materialTypeOther: formData.get("materialTypeOther") ?? undefined,
    surfaceCondition: formData.get("surfaceCondition"),
    coatingToRemove: formData.getAll("coatingToRemove"),
    coatingOtherText: formData.get("coatingOtherText") ?? undefined,
    paintAge: formData.get("paintAge") ?? undefined,
    coatingThickness: formData.get("coatingThickness"),
    dimensions: formData.get("dimensions"),
    hasDetails: formData.get("hasDetails"),
    electricalAccess: formData.get("electricalAccess"),
    ventilation: formData.get("ventilation"),
    honeypot: formData.get("honeypot") ?? undefined,
  };

  const parsed = serviceEvaluationSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisá los datos del formulario e intentá de nuevo." }, { status: 400 });
  }

  const data = parsed.data;
  if (data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const fileEntries = formData
    .getAll("files")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (fileEntries.length > MAX_FILES) {
    return NextResponse.json({ error: `Adjuntá un máximo de ${MAX_FILES} archivos.` }, { status: 400 });
  }
  for (const file of fileEntries) {
    const isImageOrVideo = file.type.startsWith("image/") || file.type.startsWith("video/");
    if (!isImageOrVideo || file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Uno de los archivos adjuntos no es válido (formato o tamaño)." },
        { status: 400 },
      );
    }
  }

  const attachments = await Promise.all(
    fileEntries.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    })),
  );

  const materialLabel =
    data.materialType === "otro" && data.materialTypeOther
      ? `Otro: ${data.materialTypeOther}`
      : labelFor(MATERIAL_TYPES, data.materialType);

  const coatingLabels = data.coatingToRemove.map((value) => {
    if (value === "otro" && data.coatingOtherText) return `Otro: ${data.coatingOtherText}`;
    if (value === "pintura" && data.paintAge) return `Pintura (${labelFor(PAINT_AGES, data.paintAge)})`;
    return labelFor(COATINGS, value);
  });

  const emailText = `Nombre / Empresa: ${data.name}
Ubicación del trabajo: ${data.location}

Material a restaurar: ${materialLabel}
Estado de la superficie: ${labelFor(SURFACE_CONDITIONS, data.surfaceCondition)}

Revestimiento a remover: ${coatingLabels.join(", ")}
Grosor / capas: ${labelFor(COATING_THICKNESS, data.coatingThickness)}

Dimensiones aproximadas: ${data.dimensions}
Detalles o relieves: ${labelFor(HAS_DETAILS_OPTIONS, data.hasDetails)}

Acceso eléctrico: ${labelFor(ELECTRICAL_ACCESS_OPTIONS, data.electricalAccess)}
Ventilación: ${labelFor(VENTILATION_OPTIONS, data.ventilation)}

Archivos adjuntos: ${attachments.length > 0 ? attachments.map((a) => a.filename).join(", ") : "(ninguno)"}`;

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: getFromEmail(),
      to: getContactToEmail(),
      subject: `Nueva evaluación de proyecto — ${data.name}`,
      text: emailText,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("service-evaluation route error", error);
    return NextResponse.json(
      { error: "No pudimos enviar tu formulario en este momento. Escribinos por WhatsApp mientras tanto." },
      { status: 500 },
    );
  }
}
