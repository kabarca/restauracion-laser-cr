"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

type SubmitState = "idle" | "submitting" | "success" | "error";

const textInputClasses =
  "rounded-brand border border-text/20 bg-bg px-4 py-3 text-sm font-normal outline-none focus:border-accent";

export function ContractAcceptanceForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contract", { method: "POST", body: formData });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "No pudimos registrar tu aceptación. Intentá de nuevo.");
      }

      setState("success");
      form.reset();
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
        <h3 className="text-xl font-bold">¡Contrato aceptado!</h3>
        <p className="mt-2 text-text/70">
          Registramos tu aceptación de los términos y condiciones del servicio. Te enviaremos una copia por
          correo si es necesario.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2 text-sm font-semibold">
        Nombre del cliente
        <input name="name" type="text" required minLength={2} className={textInputClasses} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Cédula / NIT
          <input name="idNumber" type="text" required minLength={5} className={textInputClasses} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Correo electrónico
          <input name="email" type="email" required className={textInputClasses} />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-text/80">
        <input name="accepted" type="checkbox" value="true" required className="mt-1 h-4 w-4 accent-accent" />
        <span>
          He leído y acepto los términos, condiciones y alcance del servicio descritos arriba, incluyendo la
          matriz de responsabilidades y la cláusula de aceptación del servicio. Marcar esta casilla y enviar
          el formulario equivale a mi firma de conformidad.
        </span>
      </label>

      <input name="honeypot" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {state === "error" && <p className="text-sm text-accent-link">{errorMessage}</p>}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-brand bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-surface transition-[background-color,transform] duration-300 ease-out active:scale-[0.98] hover:brightness-110 disabled:opacity-60"
      >
        {state === "submitting" ? "Enviando..." : "Aceptar y firmar"}
      </button>
    </form>
  );
}
