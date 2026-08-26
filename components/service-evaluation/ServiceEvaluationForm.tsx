"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Upload, X } from "lucide-react";
import { OptionCard } from "@/components/ui/OptionCard";
import { Badge } from "@/components/ui/Badge";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/site-config";
import {
  MATERIAL_TYPES,
  SURFACE_CONDITIONS,
  COATINGS,
  PAINT_AGES,
  COATING_THICKNESS,
  HAS_DETAILS_OPTIONS,
  ELECTRICAL_ACCESS_OPTIONS,
  VENTILATION_OPTIONS,
} from "@/lib/service-evaluation-options";

type SubmitState = "idle" | "submitting" | "success" | "error";

const MAX_FILES = 6;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const fieldLabelClasses = "text-sm font-semibold";
const textInputClasses =
  "rounded-brand border border-text/20 bg-bg px-4 py-3 text-sm font-normal outline-none focus:border-accent";

const whatsappFallbackHref = buildWhatsAppLink(
  "Hola, quiero contarles sobre mi proyecto de restauración (formulario de evaluación).",
);

function SectionLegend({ step, title, helper }: { step: number; title: string; helper?: string }) {
  return (
    <legend className="mb-4 flex w-full flex-col gap-2">
      <span className="flex items-center gap-3">
        <Badge tone="secondary">{step}</Badge>
        <span className="text-lg font-bold text-text">{title}</span>
      </span>
      {helper && <span className="text-sm font-normal text-text/60">{helper}</span>}
    </legend>
  );
}

export function ServiceEvaluationForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [materialType, setMaterialType] = useState("");
  const [surfaceCondition, setSurfaceCondition] = useState("");
  const [coatingToRemove, setCoatingToRemove] = useState<string[]>([]);
  const [paintAge, setPaintAge] = useState("");
  const [coatingThickness, setCoatingThickness] = useState("");
  const [hasDetails, setHasDetails] = useState("");
  const [electricalAccess, setElectricalAccess] = useState("");
  const [ventilation, setVentilation] = useState("");

  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  function toggleCoating(value: string, checked: boolean) {
    setCoatingToRemove((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
    if (value === "pintura" && !checked) setPaintAge("");
  }

  function processFiles(fileList: FileList | File[]) {
    const selected = Array.from(fileList);

    const accepted: File[] = [];
    const rejected: string[] = [];

    for (const file of selected) {
      const isImageOrVideo = file.type.startsWith("image/") || file.type.startsWith("video/");
      if (!isImageOrVideo) {
        rejected.push(`${file.name} (formato no admitido)`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        rejected.push(`${file.name} (supera 5MB)`);
        continue;
      }
      accepted.push(file);
    }

    setFiles((prev) => [...prev, ...accepted].slice(0, MAX_FILES));
    setFileError(rejected.length > 0 ? `No se agregaron: ${rejected.join(", ")}` : "");
  }

  function handleFilesSelected(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) processFiles(event.target.files);
    event.target.value = "";
  }

  function handleDragOver(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length > 0) processFiles(event.dataTransfer.files);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (coatingToRemove.length === 0) {
      setErrorMessage("Seleccioná al menos un tipo de revestimiento a remover.");
      return;
    }
    if (files.length === 0) {
      setErrorMessage("Adjuntá al menos una foto del objeto o superficie.");
      return;
    }

    setState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    files.forEach((file) => formData.append("files", file, file.name));

    try {
      const res = await fetch("/api/service-evaluation", { method: "POST", body: formData });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "No pudimos enviar tu formulario. Intentá de nuevo.");
      }

      setState("success");
      form.reset();
      setMaterialType("");
      setSurfaceCondition("");
      setCoatingToRemove([]);
      setPaintAge("");
      setCoatingThickness("");
      setHasDetails("");
      setElectricalAccess("");
      setVentilation("");
      setFiles([]);
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
    }
  }

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        className="rounded-brand border border-accent bg-accent/5 p-8 text-center"
      >
        <h3 className="text-xl font-bold">¡Formulario enviado!</h3>
        <p className="mt-2 text-text/70">
          Vamos a revisar el detalle de tu proyecto y las fotos que compartiste, y te contactaremos pronto para
          coordinar la evaluación.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <p className="text-sm text-text/60">
        ¿Preferís contarnos todo por WhatsApp en vez de este formulario?{" "}
        <a
          href={whatsappFallbackHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent-link hover:underline"
        >
          Escribinos directamente
        </a>
        .
      </p>

      <fieldset className="flex flex-col gap-4">
        <SectionLegend step={1} title="Datos de contacto y ubicación" />

        <label className={cn("flex flex-col gap-2", fieldLabelClasses)}>
          Nombre completo / Empresa
          <input name="name" type="text" required minLength={2} className={textInputClasses} />
        </label>

        <label className={cn("flex flex-col gap-2", fieldLabelClasses)}>
          Ubicación del trabajo
          <span className="text-xs font-normal text-text/50">
            ¿Se realiza en tus instalaciones o debemos trasladar el equipo?
          </span>
          <textarea name="location" required minLength={3} rows={2} className={textInputClasses} />
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <SectionLegend step={2} title="Información del material base (sustrato)" />

        <div className="flex flex-col gap-3">
          <span className={fieldLabelClasses}>¿Qué tipo de material o superficie deseas restaurar?</span>
          <div className="flex flex-col gap-3">
            {MATERIAL_TYPES.map((option) => (
              <OptionCard
                key={option.value}
                type="radio"
                name="materialType"
                value={option.value}
                label={option.label}
                checked={materialType === option.value}
                onChange={(checked) => checked && setMaterialType(option.value)}
                required
              />
            ))}
          </div>
          {materialType === "otro" && (
            <input
              name="materialTypeOther"
              type="text"
              placeholder="Contanos qué material es"
              className={textInputClasses}
            />
          )}
        </div>

        <div className="flex flex-col gap-3">
          <span className={fieldLabelClasses}>¿En qué estado se encuentra la superficie?</span>
          <div className="grid gap-3 sm:grid-cols-2">
            {SURFACE_CONDITIONS.map((option) => (
              <OptionCard
                key={option.value}
                type="radio"
                name="surfaceCondition"
                value={option.value}
                label={option.label}
                checked={surfaceCondition === option.value}
                onChange={(checked) => checked && setSurfaceCondition(option.value)}
                required
              />
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <SectionLegend
          step={3}
          title="Revestimiento a remover"
          helper="¿Qué capa o residuo necesitas eliminar? Podés marcar varias opciones."
        />

        <div className="flex flex-col gap-3">
          {COATINGS.map((option) => (
            <div key={option.value} className="flex flex-col gap-3">
              <OptionCard
                type="checkbox"
                name="coatingToRemove"
                value={option.value}
                label={option.label}
                checked={coatingToRemove.includes(option.value)}
                onChange={(checked) => toggleCoating(option.value, checked)}
              />
              {option.value === "pintura" && coatingToRemove.includes("pintura") && (
                <div className="ml-4 flex flex-col gap-2 border-l-2 border-text/10 pl-4">
                  <span className="text-xs font-semibold text-text/60">¿Es pintura reciente o antigua?</span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {PAINT_AGES.map((age) => (
                      <OptionCard
                        key={age.value}
                        type="radio"
                        name="paintAge"
                        value={age.value}
                        label={age.label}
                        checked={paintAge === age.value}
                        onChange={(checked) => checked && setPaintAge(age.value)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {coatingToRemove.includes("otro") && (
          <input
            name="coatingOtherText"
            type="text"
            placeholder="Contanos qué otro revestimiento hay que remover"
            className={textInputClasses}
          />
        )}

        <div className="flex flex-col gap-3">
          <span className={fieldLabelClasses}>¿Conocés el grosor aproximado o el número de capas a remover?</span>
          <div className="flex flex-col gap-3">
            {COATING_THICKNESS.map((option) => (
              <OptionCard
                key={option.value}
                type="radio"
                name="coatingThickness"
                value={option.value}
                label={option.label}
                checked={coatingThickness === option.value}
                onChange={(checked) => checked && setCoatingThickness(option.value)}
                required
              />
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <SectionLegend step={4} title="Dimensiones y estado del área" />

        <label className={cn("flex flex-col gap-2", fieldLabelClasses)}>
          Dimensiones aproximadas
          <span className="text-xs font-normal text-text/50">Ejemplo: 2m x 3m, o las dimensiones de la pieza</span>
          <input name="dimensions" type="text" required className={textInputClasses} />
        </label>

        <div className="flex flex-col gap-3">
          <span className={fieldLabelClasses}>¿La superficie tiene grietas, relieves o detalles complejos?</span>
          <div className="grid gap-3 sm:grid-cols-2">
            {HAS_DETAILS_OPTIONS.map((option) => (
              <OptionCard
                key={option.value}
                type="radio"
                name="hasDetails"
                value={option.value}
                label={option.label}
                checked={hasDetails === option.value}
                onChange={(checked) => checked && setHasDetails(option.value)}
                required
              />
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <SectionLegend step={5} title="Condición del entorno de trabajo" />

        <div className="flex flex-col gap-3">
          <span className={fieldLabelClasses}>
            ¿El espacio cuenta con acceso a conexión eléctrica de alta potencia?
          </span>
          <span className="text-xs font-normal text-text/50">Si el servicio es a domicilio</span>
          <div className="grid gap-3 sm:grid-cols-2">
            {ELECTRICAL_ACCESS_OPTIONS.map((option) => (
              <OptionCard
                key={option.value}
                type="radio"
                name="electricalAccess"
                value={option.value}
                label={option.label}
                checked={electricalAccess === option.value}
                onChange={(checked) => checked && setElectricalAccess(option.value)}
                required
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className={fieldLabelClasses}>¿El área de trabajo es ventilada?</span>
          <div className="grid gap-3 sm:grid-cols-2">
            {VENTILATION_OPTIONS.map((option) => (
              <OptionCard
                key={option.value}
                type="radio"
                name="ventilation"
                value={option.value}
                label={option.label}
                checked={ventilation === option.value}
                onChange={(checked) => checked && setVentilation(option.value)}
                required
              />
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <SectionLegend
          step={6}
          title="Evidencia visual"
          helper="Adjuntá 2 a 3 fotos claras del objeto o superficie a restaurar, y un acercamiento al detalle del revestimiento."
        />

        <div className="flex flex-col gap-3">
          <label
            htmlFor="evidence-files"
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-brand border-2 border-dashed border-text/25 bg-bg px-4 py-8 text-center transition-colors duration-200 hover:border-accent",
              isDragging && "border-accent bg-accent/10",
            )}
          >
            <Upload className="h-6 w-6 text-secondary" aria-hidden="true" />
            <span className="text-sm font-semibold">
              {isDragging ? "Soltá los archivos aquí" : "Tocá o arrastrá fotos o video aquí"}
            </span>
            <span className="text-xs text-text/50">Máx. {MAX_FILES} archivos, 5MB cada uno</span>
            <input
              id="evidence-files"
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFilesSelected}
              className="sr-only"
            />
          </label>

          {fileError && <p className="text-sm text-accent-link">{fileError}</p>}

          {files.length > 0 && (
            <ul className="flex flex-col gap-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-3 rounded-brand border border-text/10 bg-bg px-4 py-2 text-sm"
                >
                  <span className="flex-1 truncate">{file.name}</span>
                  <span className="shrink-0 text-xs text-text/50">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    aria-label={`Quitar ${file.name}`}
                    className="shrink-0 text-text/50 transition-colors hover:text-accent-link"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </fieldset>

      <input name="honeypot" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {errorMessage && <p className="text-sm text-accent-link">{errorMessage}</p>}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-brand bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-surface transition-[background-color,transform] duration-300 ease-out active:scale-[0.98] hover:brightness-110 disabled:opacity-60"
      >
        {state === "submitting" ? "Enviando..." : "Enviar formulario"}
      </button>
    </form>
  );
}
