# 008 — Gate the floating WhatsApp CTA's hover scale to fine pointers

- **Status**: DONE (executed 2026-07-26; verified the arbitrary media-query variant compiled correctly into the production CSS bundle)
- **Commit**: c55b14a
- **Severity**: LOW
- **Category**: Accessibility
- **Estimated scope**: 1 file (`components/whatsapp/WhatsAppFloatingCTA.tsx`)

## Problem

The floating WhatsApp button's `hover:scale-105` is an unconditional Tailwind hover utility, not gated to devices that actually have hover capability:

```tsx
// components/whatsapp/WhatsAppFloatingCTA.tsx:9-17 — current
<a
  href={buildWhatsAppLink()}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Hablar por WhatsApp"
  className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-surface shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-105"
>
  <WhatsAppIcon className="h-7 w-7" />
</a>
```

Per `AUDIT.md` §6: "`@media (hover: hover) and (pointer: fine) { .element:hover { transform: scale(1.05); } } /* touch fires false hovers on tap */". On touch devices, tapping this fixed, always-visible button can leave it in a "stuck" enlarged `:hover` state until the user taps elsewhere — a visible, low-severity glitch given this button is present on every page and is a primary conversion CTA.

## Target

```tsx
// components/whatsapp/WhatsAppFloatingCTA.tsx:9-17 — target
<a
  href={buildWhatsAppLink()}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Hablar por WhatsApp"
  className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-surface shadow-lg shadow-black/20 transition-transform duration-300 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-105"
>
  <WhatsAppIcon className="h-7 w-7" />
</a>
```

Tailwind v4 supports arbitrary media-query variants via the `[@media(...)]:` syntax (this project is on Tailwind v4 per `package.json`'s `"tailwindcss": "^4"` and `app/globals.css`'s `@import "tailwindcss"` + `@theme` v4 syntax) — no config changes or new dependencies needed.

## Repo conventions to follow

- This file already uses Tailwind arbitrary-value syntax elsewhere in the codebase (e.g. `rounded-brand`, `bg-[#232019]` in `ImagePlaceholder.tsx`) — the bracketed variant syntax here follows the same established comfort with Tailwind's arbitrary-value escape hatch, not a new pattern for this codebase.
- No other file in this repo has a transform-based `:hover` utility that needs the same gate — `ServiceCard.tsx`'s `group-hover:translate-x-0.5` and similar are triggered by a parent `group` hover, not a direct `hover:` on a persistently-visible fixed element, so they're lower risk and out of scope (the "stuck hover" problem is specific to always-visible, frequently-tapped elements like this floating CTA).

## Steps

1. In `components/whatsapp/WhatsAppFloatingCTA.tsx`, replace `hover:scale-105` in the `<a>` tag's `className` with `[@media(hover:hover)_and_(pointer:fine)]:hover:scale-105`, keeping every other class unchanged.

## Boundaries

- Do NOT touch `MagneticButton` (the wrapping component) — its cursor-follow spring behavior is a separate concern (covered by plan 001's reduced-motion gate), not this hover-scale finding.
- Do NOT touch any other `hover:` class in this file or elsewhere — this plan is scoped to the one transform-based hover utility identified above.
- This changes only a CSS hover-trigger condition — no text, structure, or content — so it has no effect on SEO or LLM-readable content.
- If the current `className` doesn't match what's shown above (drift since commit `c55b14a`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` (expect no errors — this is a className string change only), `npx eslint components/whatsapp/WhatsAppFloatingCTA.tsx` (expect no errors), `npx next build` (expect a clean build, and confirm Tailwind compiles the arbitrary media-query variant into the generated CSS without warnings).
- **Feel check**:
  - On desktop (mouse), hover the floating WhatsApp button: confirm it still scales up to 105% as before.
  - In DevTools device toolbar, switch to a touch-emulated mobile device and tap the button: confirm it does not visibly "stick" in an enlarged state after the tap (best verified on an actual touch device if available, since some emulators don't fully replicate `:hover` touch behavior).
- **Done when**: hover-scale still works on mouse/trackpad devices, is excluded via the `(hover: hover) and (pointer: fine)` media condition on touch-only devices, and `tsc`/`eslint`/`build` are clean.
