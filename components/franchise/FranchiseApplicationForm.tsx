"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { getAvailableTerritories } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function FranchiseApplicationForm() {
  const searchParams = useSearchParams();
  const preselectedTerritory = searchParams.get("territorio") ?? "";
  const availableTerritories = getAvailableTerritories();

  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/franchise-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "No pudimos enviar tu solicitud. Intentá de nuevo.");
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
        <h3 className="text-xl font-bold">¡Solicitud enviada!</h3>
        <p className="mt-2 text-text/70">Nos pondremos en contacto pronto para conversar sobre tu franquicia.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Nombre completo
          <input
            name="name"
            type="text"
            required
            minLength={2}
            className="rounded-brand border border-text/20 bg-bg px-4 py-3 text-sm font-normal outline-none focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Correo electrónico
          <input
            name="email"
            type="email"
            required
            className="rounded-brand border border-text/20 bg-bg px-4 py-3 text-sm font-normal outline-none focus:border-accent"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Teléfono
          <input
            name="phone"
            type="tel"
            required
            minLength={8}
            className="rounded-brand border border-text/20 bg-bg px-4 py-3 text-sm font-normal outline-none focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Territorio de interés
          <select
            name="territorioDeInteres"
            required
            defaultValue={preselectedTerritory}
            className="rounded-brand border border-text/20 bg-bg px-4 py-3 text-sm font-normal outline-none focus:border-accent"
          >
            <option value="" disabled>
              Seleccioná un territorio
            </option>
            {availableTerritories.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-semibold">
        Contanos sobre tu interés (opcional)
        <textarea
          name="message"
          rows={4}
          className="rounded-brand border border-text/20 bg-bg px-4 py-3 text-sm font-normal outline-none focus:border-accent"
        />
      </label>

      <input
        name="honeypot"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {state === "error" && <p className="text-sm text-accent-link">{errorMessage}</p>}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-brand bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-surface transition-[background-color,transform] duration-300 ease-out active:scale-[0.98] hover:brightness-110 disabled:opacity-60"
      >
        {state === "submitting" ? "Enviando..." : "Enviar solicitud"}
      </button>
    </form>
  );
}
