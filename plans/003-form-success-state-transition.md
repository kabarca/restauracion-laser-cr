# 003 — Animate the contact/application form success states

- **Status**: DONE (executed 2026-07-26; used `EASE_OUT_EXPO` from plan 006 instead of the literal in both files)
- **Commit**: c55b14a
- **Severity**: MEDIUM
- **Category**: Missed opportunity
- **Estimated scope**: 2 files (`components/contact/ContactForm.tsx`, `components/franchise/FranchiseApplicationForm.tsx`)

## Problem

Both forms replace themselves with a confirmation block the instant `state === "success"` — a hard React conditional-return swap with zero transition. This is exactly the "state change that teleports" pattern the audit calls out, and it's the single rarest, highest-emotion moment in either form's lifecycle (a successful lead/application submission) — currently rendered with none of the delight budget the audit explicitly allows for that category.

```tsx
// components/contact/ContactForm.tsx:40-47 — current
if (state === "success") {
  return (
    <div className="rounded-brand border border-accent bg-accent/5 p-8 text-center">
      <h3 className="text-xl font-bold">¡Mensaje enviado!</h3>
      <p className="mt-2 text-text/70">Te responderemos pronto.</p>
    </div>
  );
}
```

```tsx
// components/franchise/FranchiseApplicationForm.tsx:46-52 — current
if (state === "success") {
  return (
    <div className="rounded-brand border border-accent bg-accent/5 p-8 text-center">
      <h3 className="text-xl font-bold">¡Solicitud enviada!</h3>
      <p className="mt-2 text-text/70">Nos pondremos en contacto pronto para conversar sobre tu franquicia.</p>
    </div>
  );
}
```

## Target

```tsx
// components/contact/ContactForm.tsx:40-49 — target
if (state === "success") {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-brand border border-accent bg-accent/5 p-8 text-center"
    >
      <h3 className="text-xl font-bold">¡Mensaje enviado!</h3>
      <p className="mt-2 text-text/70">Te responderemos pronto.</p>
    </motion.div>
  );
}
```

```tsx
// components/franchise/FranchiseApplicationForm.tsx:46-54 — target
if (state === "success") {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-brand border border-accent bg-accent/5 p-8 text-center"
    >
      <h3 className="text-xl font-bold">¡Solicitud enviada!</h3>
      <p className="mt-2 text-text/70">Nos pondremos en contacto pronto para conversar sobre tu franquicia.</p>
    </motion.div>
  );
}
```

Both files also need a new import:

```tsx
import { motion } from "motion/react";
```

## Repo conventions to follow

- `scale: 0.96 → 1` combined with `opacity: 0 → 1` matches the audit's physicality rule ("never `scale(0)`; target `scale(0.9–0.97)`") and is the same shape already used in `components/motion/ScrollReveal.tsx`'s `scale-in` variant (`hidden: { opacity: 0, scale: 0.92 }`) — this plan uses `0.96` (a slightly subtler pop, appropriate since this is a confirmation message, not a decorative section entrance).
- The shared `ease: [0.16, 1, 0.3, 1]` curve and `duration: 0.4` match `components/layout/Header.tsx:44` and `components/home/TestimonialScrollCard.tsx:65` — both mid-length UI-adjacent entrances, the right budget tier for a "rare, high-emotion moment" per the audit's purpose/frequency table.
- Both forms currently import only `useState` from `"react"` (`ContactForm.tsx:3`, `FranchiseApplicationForm.tsx:3`) — add the `motion/react` import as a new line directly after that, matching the import ordering used elsewhere in this repo (react/next imports first, then `motion/react`, then local imports).

## Steps

1. **`components/contact/ContactForm.tsx`**: add `import { motion } from "motion/react";` after the existing `import { useState } from "react";` line (line 3). Change the success block's outer `<div ...>` to `<motion.div ...>` with the `initial`, `animate`, and `transition` props shown in Target, keeping the existing `className` value unchanged. Change the closing `</div>` to `</motion.div>`.
2. **`components/franchise/FranchiseApplicationForm.tsx`**: add `import { motion } from "motion/react";` after the existing `import { useState } from "react";` line (line 3). Apply the identical change to its success block (lines 46-52 in the current file) as shown in Target.

## Boundaries

- Do NOT add an `AnimatePresence`/exit transition for the form-to-success swap — the form is fully unmounted on success (the user can't go back to it in this flow, `form.reset()` already ran), so there's nothing to exit-animate; only the entrance of the success block needs motion.
- Do NOT touch the `state === "error"` branch, the submitting/disabled button state, or any form field markup in either file.
- Do NOT change the confirmation copy ("¡Mensaje enviado!", "¡Solicitud enviada!", etc.) — that's content, not motion, and changing it would affect what's shown to users and any LLM/crawler reading the page; out of scope for this plan.
- If the current success-block code doesn't match what's shown above (drift since commit `c55b14a`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` (expect no errors), `npx eslint components/contact/ContactForm.tsx components/franchise/FranchiseApplicationForm.tsx` (expect no errors), `npx next build` (expect a clean build).
- **Feel check**:
  - Go to `/contacto`, fill in valid values for all required fields, submit. Confirm the success message fades and scales in (starts very slightly smaller and fully transparent, ends at normal size and fully opaque) rather than snapping into place.
  - Go to `/franquicias`, scroll to the application form, submit a valid application. Confirm the same fade+scale behavior.
  - In DevTools Animations panel, set playback to 10% and confirm the motion is smooth (no jump/flash at the very start).
  - Toggle `prefers-reduced-motion` (Rendering panel) to "reduce": Framer Motion's `useReducedMotion` is not used in this plan, so confirm whether the transition still plays — if plan 001 has already been executed and a project-wide reduced-motion convention exists, note it, but this plan does not require adding that here since a single 0.4s opacity+scale fade on a rare, once-per-session success event is within the audit's "keep transitions that aid comprehension" carve-out.
- **Done when**: both success confirmations animate in on submission, and `tsc`/`eslint`/`build` are clean.
