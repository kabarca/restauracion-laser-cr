# 007 — Add press feedback to the two hand-rolled form submit buttons

- **Status**: DONE (executed 2026-07-26)
- **Commit**: c55b14a
- **Severity**: LOW
- **Category**: Physicality
- **Estimated scope**: 2 files (`components/contact/ContactForm.tsx`, `components/franchise/FranchiseApplicationForm.tsx`)

## Problem

`components/ui/Button.tsx`'s shared `baseClasses` includes `active:scale-[0.98]` press feedback (added in a prior pass) plus `transition-[background-color,color,border-color,transform]` so the scale animates smoothly. `ContactForm.tsx` and `FranchiseApplicationForm.tsx` each hand-roll their own `<button type="submit">` markup instead of using the shared `Button` component, so they never inherited that press feedback — they only have a color transition on hover.

```tsx
// components/contact/ContactForm.tsx:99-105 — current
<button
  type="submit"
  disabled={state === "submitting"}
  className="inline-flex items-center justify-center gap-2 rounded-brand bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-surface transition-colors hover:brightness-110 disabled:opacity-60"
>
  {state === "submitting" ? "Enviando..." : "Enviar mensaje"}
</button>
```

```tsx
// components/franchise/FranchiseApplicationForm.tsx:130-136 — current
<button
  type="submit"
  disabled={state === "submitting"}
  className="inline-flex items-center justify-center gap-2 rounded-brand bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-surface transition-colors hover:brightness-110 disabled:opacity-60"
>
  {state === "submitting" ? "Enviando..." : "Enviar solicitud"}
</button>
```

Per `AUDIT.md` §3: "Press feedback: `transform: scale(0.97)` on `:active` with `transition: transform 160ms ease-out`. Keep it subtle (0.95–0.98)." This plan matches the value already established in `components/ui/Button.tsx` (`0.98`) rather than introducing a third value.

## Target

```tsx
// components/contact/ContactForm.tsx:99-105 — target
<button
  type="submit"
  disabled={state === "submitting"}
  className="inline-flex items-center justify-center gap-2 rounded-brand bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-surface transition-[background-color,transform] duration-300 ease-out active:scale-[0.98] hover:brightness-110 disabled:opacity-60"
>
  {state === "submitting" ? "Enviando..." : "Enviar mensaje"}
</button>
```

```tsx
// components/franchise/FranchiseApplicationForm.tsx:130-136 — target
<button
  type="submit"
  disabled={state === "submitting"}
  className="inline-flex items-center justify-center gap-2 rounded-brand bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-surface transition-[background-color,transform] duration-300 ease-out active:scale-[0.98] hover:brightness-110 disabled:opacity-60"
>
  {state === "submitting" ? "Enviando..." : "Enviar solicitud"}
</button>
```

Only the `className` string changes: `transition-colors` → `transition-[background-color,transform] duration-300 ease-out`, and `active:scale-[0.98]` is added — copied directly from `components/ui/Button.tsx`'s current `baseClasses` string.

## Repo conventions to follow

- `components/ui/Button.tsx`'s `baseClasses` is the source of truth for this value: `"...transition-[background-color,color,border-color,transform] duration-300 ease-out active:scale-[0.98]..."`. This plan reuses the `background-color`/`transform` + `duration-300 ease-out` + `active:scale-[0.98]` portion (omitting `color`/`border-color` since these two buttons don't transition text or border color, only background via `hover:brightness-110`).

## Steps

1. In `components/contact/ContactForm.tsx`, in the submit `<button>`'s `className`, replace `transition-colors` with `transition-[background-color,transform] duration-300 ease-out active:scale-[0.98]`, keeping every other class in the string unchanged and in place.
2. In `components/franchise/FranchiseApplicationForm.tsx`, apply the identical `className` change to its submit `<button>`.

## Boundaries

- Do NOT refactor either form to use the shared `<Button>`/`<ButtonLink>` component — these buttons have a `disabled`/loading-text pattern (`state === "submitting"`) that would need to be verified against `Button`'s prop support before such a swap; that's a larger structural change out of scope for this motion-only plan.
- Do NOT change the `disabled` logic, button text, or any other className token in either file.
- This changes only a `className` string on a submit button — no text or structural change — so it has no effect on SEO or LLM-readable content.
- If either button's current `className` doesn't match what's shown above (drift since commit `c55b14a`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` (expect no errors), `npx eslint components/contact/ContactForm.tsx components/franchise/FranchiseApplicationForm.tsx` (expect no errors), `npx next build` (expect a clean build).
- **Feel check**:
  - On `/contacto`, mouse-down (and hold) on the submit button: confirm it visibly shrinks slightly (98% scale) while held, and springs back on release.
  - Repeat on `/franquicias`'s application form submit button.
  - Confirm the `disabled` (submitting) state still shows the dimmed `opacity-60` styling and does not additionally shrink on click (browsers don't fire `:active` on disabled buttons, so this should already be correct with no extra code).
- **Done when**: both submit buttons show the same press feedback as the shared `Button` component, and `tsc`/`eslint`/`build` are clean.
