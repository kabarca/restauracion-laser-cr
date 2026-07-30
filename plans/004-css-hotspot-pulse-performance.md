# 004 — Convert the diagram hotspot pulse from Framer Motion shorthand to CSS

- **Status**: DONE (executed 2026-07-26; also absorbed plan 001's reduced-motion requirement for this element — `.hotspot-pulse` was added to the same `@media (prefers-reduced-motion: reduce)` rule as `.wave-dot` in `app/globals.css`, rather than a separate JS `useReducedMotion` gate, since this plan already removes the element from Framer Motion entirely)
- **Commit**: c55b14a
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 2 files (`components/tecnologia/LaserPhysicsDiagram.tsx`, `app/globals.css`)

## Problem

The active hotspot's pulse ring is driven by Framer Motion's `animate` prop using the `scale` shorthand as a keyframe array, running with `repeat: Infinity`:

```tsx
// components/tecnologia/LaserPhysicsDiagram.tsx:100-106 — current
{isActive && (
  <motion.span
    className="absolute h-4 w-4 rounded-full bg-accent"
    animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
  />
)}
```

Per `AUDIT.md` §5 (Performance): "Framer Motion `x`/`y`/`scale` shorthands are not hardware-accelerated — they run on the main thread and drop frames under load." This is a continuous, infinitely-repeating loop (not a one-shot entrance), so any main-thread cost is sustained for as long as the `/tecnologia` page's diagram is visible — exactly the case the audit flags as worth fixing. It's also predetermined, non-gesture-driven motion, which the audit says CSS handles better than JS: "CSS (and WAAPI) beat rAF-based JS under load — use CSS for predetermined motion."

This codebase already has the correct pattern for infinite decorative CSS loops, in `app/globals.css`'s `wave-dot-a`/`wave-dot-b` keyframes and their inline-style usage in `components/franchise/OnboardingTimeline.tsx` — this plan applies that same pattern here instead of inventing a new one.

## Target

```css
/* app/globals.css — add after the existing wave-dot-b keyframe block */
@keyframes hotspot-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(2.2);
    opacity: 0;
  }
}
```

```tsx
// components/tecnologia/LaserPhysicsDiagram.tsx:100-106 — target
{isActive && (
  <span
    className="absolute h-4 w-4 rounded-full bg-accent"
    style={{ animation: "hotspot-pulse 1.8s ease-in-out infinite" }}
  />
)}
```

## Repo conventions to follow

- `app/globals.css:61-79` (`wave-dot-a`, `wave-dot-b`) is the exemplar: two-keyframe (`0%,100%` / `50%`) transform+opacity loops, applied via an inline `animation` style string on the element rather than a Tailwind utility class, exactly like the target above.
- Keep the exact same visual parameters as the current Framer Motion version — `scale: [1, 2.2, 1]`, `opacity: [0.5, 0, 0.5]`, `duration: 1.8s`, `ease-in-out` — this is a performance/implementation-technique change only, not a visual redesign.
- The `motion.span` becomes a plain `<span>` since it no longer needs any Framer Motion prop — `motion` and `AnimatePresence` are still needed elsewhere in this same file (the tooltip block), so the `motion/react` import itself is not removed, only this one element's `motion.span` usage changes to `span`.

## Steps

1. In `app/globals.css`, add the `@keyframes hotspot-pulse { ... }` block shown in Target, placed immediately after the existing `@keyframes wave-dot-b { ... }` block (end of file).
2. In `components/tecnologia/LaserPhysicsDiagram.tsx`, change the `<motion.span className="absolute h-4 w-4 rounded-full bg-accent" animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />` element to `<span className="absolute h-4 w-4 rounded-full bg-accent" style={{ animation: "hotspot-pulse 1.8s ease-in-out infinite" }} />`.

## Boundaries

- Do NOT remove the `motion`/`AnimatePresence` import from `LaserPhysicsDiagram.tsx` — they're still used by the tooltip block later in the same file (out of scope here, covered by plan 005).
- Do NOT change the `isActive &&` condition, the hotspot dot's own `<span>` (the small solid indicator dot, separate element from the pulse ring), or any other part of this file.
- Do NOT touch `OnboardingTimeline.tsx` or its existing `wave-dot-a`/`wave-dot-b` keyframes — only add a new, separate keyframe block.
- This is a pure implementation-technique swap (same visual animation, different engine) — no DOM structure, text, or attribute changes beyond `motion.span` → `span`, so it has no effect on SEO or LLM-readable content.
- If the current code doesn't match what's shown above (drift since commit `c55b14a`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` (expect no errors), `npx eslint components/tecnologia/LaserPhysicsDiagram.tsx` (expect no errors), `npx next build` (expect a clean build).
- **Feel check**:
  - Visit `/tecnologia`, hover/focus a diagram step to activate its hotspot. Confirm the pulse ring animation looks visually identical to before — same speed, same size, same fade.
  - In DevTools Performance panel, record a few seconds while a hotspot is pulsing: confirm the animation now shows up under "Composite" rather than triggering "Recalculate Style"/"Layout" on the main thread per frame (open the "Rendering" tab → "Paint flashing" to sanity-check there's no unexpected repaint outside the pulse element).
  - Confirm switching between hotspots (hover a different step) still correctly starts/stops the pulse on the newly active one only.
- **Done when**: the pulse renders identically to before, is implemented as a CSS `@keyframes` animation instead of a Framer Motion `scale` shorthand, and `tsc`/`eslint`/`build` are clean.
