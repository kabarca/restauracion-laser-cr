import { Resend } from "resend";

/**
 * Instantiated lazily inside each request handler — a missing RESEND_API_KEY
 * becomes a clean caught error at request time, not a landmine at import time.
 */
export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY no está configurada.");
  }
  return new Resend(apiKey);
}

export function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
}

export function getContactToEmail() {
  return process.env.CONTACT_TO_EMAIL ?? "onboarding@resend.dev";
}
