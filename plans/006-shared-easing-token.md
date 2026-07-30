# 006 — Extract the shared easing curve into a single token

- **Status**: DONE (executed 2026-07-26, first — as recommended in `plans/README.md`)
- **Commit**: c55b14a
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 6 files (new `lib/motion.ts`, plus edits to `components/layout/Header.tsx`, `components/motion/ScrollReveal.tsx`, `components/home/TestimonialScrollCard.tsx`, `components/tecnologia/LaserPhysicsDiagram.tsx`, `components/decor/WaveDivider.tsx`)

## Problem

The cubic-bezier `[0.16, 1, 0.3, 1]` (a strong ease-out) is hand-typed as an identical literal array in five separate files. It's applied consistently today, which is good, but there's no single source of truth — a future edit to one occurrence won't propagate to the others, and nothing enforces they stay in sync. This is exactly `AUDIT.md` §7's "curves and durations should live as shared tokens" finding.

```tsx
// components/layout/Header.tsx:44 — current
transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
```

```tsx
// components/motion/ScrollReveal.tsx:47 — current
transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
```

```tsx
// components/home/TestimonialScrollCard.tsx:65 — current
transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
```

```tsx
// components/tecnologia/LaserPhysicsDiagram.tsx:127 — current
transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
```

```tsx
// components/decor/WaveDivider.tsx:28 — current
transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
```

## Target

```ts
// lib/motion.ts — new file
/** Strong ease-out used for every entrance/reveal transition in this app. Do not hand-type the literal elsewhere — import this. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
```

```tsx
// components/layout/Header.tsx:44 — target
transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
```

```tsx
// components/motion/ScrollReveal.tsx:47 — target
transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
```

```tsx
// components/home/TestimonialScrollCard.tsx:65 — target
transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
```

```tsx
// components/tecnologia/LaserPhysicsDiagram.tsx:127 — target
transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
```

```tsx
// components/decor/WaveDivider.tsx:28 — target
transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
```

## Repo conventions to follow

- `lib/` already holds small, single-purpose shared modules following this exact export style — `lib/site-config.ts` exports plain constants (`SITE_NAME`, `WHATSAPP_NUMBER`, etc.) with no default export, and `lib/utils.ts` exports one small named helper (`cn`). `lib/motion.ts` should match that shape: one named export, no class, no default export.
- Import as `import { EASE_OUT_EXPO } from "@/lib/motion";` — this repo uses the `@/` path alias throughout (see every existing `@/lib/...` and `@/components/...` import in these same files).

## Steps

1. Create `lib/motion.ts` with the content shown in Target.
2. In `components/layout/Header.tsx`: add `import { EASE_OUT_EXPO } from "@/lib/motion";` alongside the existing imports (after the `@/lib/utils` import, matching this file's existing import grouping). Replace the literal `[0.16, 1, 0.3, 1]` at line 44 with `EASE_OUT_EXPO`.
3. In `components/motion/ScrollReveal.tsx`: add the same import. Replace the literal at line 47 with `EASE_OUT_EXPO`.
4. In `components/home/TestimonialScrollCard.tsx`: add the same import. Replace the literal at line 65 with `EASE_OUT_EXPO`.
5. In `components/tecnologia/LaserPhysicsDiagram.tsx`: add the same import. Replace the literal at line 127 with `EASE_OUT_EXPO`. Do not touch the other `ease: "easeInOut"` (hotspot pulse, line 104) or `ease-in-out` Tailwind/CSS occurrences in this file — those are a different, intentionally distinct curve for the infinite pulse loop, not this token.
6. In `components/decor/WaveDivider.tsx`: add the same import. Replace the literal at line 28 with `EASE_OUT_EXPO`.

## Boundaries

- Do NOT change any `duration` or `delay` values in any of the five files — only the `ease` value changes, from a literal array to the imported constant.
- Do NOT touch any other easing value in the codebase that is *not* `[0.16, 1, 0.3, 1]` — e.g. `ease-in-out` in `OnboardingTimeline.tsx`'s inline animation, `easeInOut` in `LaserPhysicsDiagram.tsx`'s pulse — those are deliberately different curves for different motion types, not instances of this token.
- Do NOT modify `app/globals.css` or any Tailwind `ease-*` utility classes (e.g. `ease-out` in `Header.tsx`'s `className`, `ease-in-out` in `OnboardingTimeline.tsx`'s inline style) — this plan only consolidates the Framer Motion `transition.ease` prop literal, not Tailwind CSS transition-timing-function utilities, which are a separate mechanism.
- This is a pure refactor (identical values, different source) — no visual, text, or DOM change, so it has no effect on SEO or LLM-readable content.
- If any of the five `ease: [0.16, 1, 0.3, 1]` occurrences don't match what's shown above (drift since commit `c55b14a`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` (expect no errors — the `as const` tuple type must be assignable to Framer Motion's `Easing` prop type; if TypeScript complains about the array not being assignable, check that `as const` was included exactly as shown), `npx eslint lib/motion.ts components/layout/Header.tsx components/motion/ScrollReveal.tsx components/home/TestimonialScrollCard.tsx components/tecnologia/LaserPhysicsDiagram.tsx components/decor/WaveDivider.tsx` (expect no errors), `npx next build` (expect a clean build).
- **Feel check**: this is a refactor with no intended visual change — spot-check that the header still shrinks smoothly on scroll, the homepage sections still fade up identically, the testimonial card crossfade is unchanged, the tecnologia diagram tooltip entrance is unchanged, and the wave divider still draws in on scroll. Nothing should look or feel different from before this plan.
- **Done when**: `lib/motion.ts` exists with the single `EASE_OUT_EXPO` export, all five files import and use it instead of the literal, no other easing value in the codebase was touched, and `tsc`/`eslint`/`build` are clean.
