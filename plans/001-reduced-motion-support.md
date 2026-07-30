# 001 — Add prefers-reduced-motion support across the motion system

- **Status**: DONE (executed 2026-07-26; the `LaserPhysicsDiagram.tsx` pulse guard was folded into plan 004's CSS conversion instead of a JS `useReducedMotion` check — see plan 004's status note)
- **Commit**: c55b14a
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 5 files (`components/layout/SmoothScrollProvider.tsx`, `components/motion/ScrollReveal.tsx`, `components/motion/MagneticButton.tsx`, `components/franchise/OnboardingTimeline.tsx`, `components/tecnologia/LaserPhysicsDiagram.tsx`, plus `app/globals.css`)

## Problem

Zero occurrences of `prefers-reduced-motion` or `useReducedMotion` exist anywhere in the codebase (verified via repo-wide grep). This matters here specifically because the site uses an unusually large motion budget for a marketing site:

- `components/layout/SmoothScrollProvider.tsx` mounts a global Lenis inertial smooth-scroll instance that changes how *every* scroll interaction on the site feels — inertial/momentum scrolling is one of the most common vestibular-disorder triggers.
- `components/motion/ScrollReveal.tsx` wraps nearly every content block on every page (home, servicios, tecnologia, franquicias, sobre-nosotros, city pages) — a reduced-motion user sees translate/scale animation dozens of times per page load.
- `components/motion/MagneticButton.tsx` continuously re-positions the floating WhatsApp CTA under the cursor.
- `components/franchise/OnboardingTimeline.tsx` runs two infinite CSS keyframe loops (`wave-dot-a`, `wave-dot-b`) the entire time that section is visible.
- `components/tecnologia/LaserPhysicsDiagram.tsx` runs an infinite `scale`/`opacity` pulse loop on the active hotspot.

None of this is gated. WCAG 2.3.3 (AAA) and general reduced-motion best practice require honoring the OS-level preference; this codebase currently ignores it entirely.

Current code, file by file:

```tsx
// components/layout/SmoothScrollProvider.tsx:8-25 — current
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

```tsx
// components/motion/ScrollReveal.tsx:30-53 — current
export function ScrollReveal({
  variant = "fade-up",
  delay = 0,
  className,
  children,
}: {
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants[variant]}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

```tsx
// components/motion/MagneticButton.tsx:22-35 — current
function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
  const bounds = ref.current?.getBoundingClientRect();
  if (!bounds) return;
  const relX = event.clientX - bounds.left - bounds.width / 2;
  const relY = event.clientY - bounds.top - bounds.height / 2;
  x.set(relX * strength);
  y.set(relY * strength);
}

function handleMouseLeave() {
  x.set(0);
  y.set(0);
}
```

```tsx
// components/franchise/OnboardingTimeline.tsx:39-51 — current
function WaveDotsLine({ opacityClass, dotSizeClass, keyframe, duration, delayStep }: {...}) {
  return (
    <div className={cn("pointer-events-none absolute inset-x-0 z-0 flex justify-between", opacityClass)} style={{ top: WAVE_BASELINE }} aria-hidden="true">
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <span
          key={i}
          className={cn("shrink-0 rounded-full bg-accent", dotSizeClass)}
          style={{
            animation: `${keyframe} ${duration} ease-in-out infinite`,
            animationDelay: `${i * delayStep}ms`,
          }}
        />
      ))}
    </div>
  );
}
```

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

## Target

```tsx
// components/layout/SmoothScrollProvider.tsx — target
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Buttery momentum scroll (Awwwards-tier feel) — mounted once at the root layout. */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

```tsx
// components/motion/ScrollReveal.tsx — target (imports + component body)
"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

// ...variants object unchanged...

export function ScrollReveal({
  variant = "fade-up",
  delay = 0,
  className,
  children,
}: {
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();
  const activeVariants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : variants[variant];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={activeVariants}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.7,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

```tsx
// components/motion/MagneticButton.tsx — target (imports + handlers)
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

// inside the component, after the existing useSpring calls:
const shouldReduceMotion = useReducedMotion();

function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
  if (shouldReduceMotion) return;
  const bounds = ref.current?.getBoundingClientRect();
  if (!bounds) return;
  const relX = event.clientX - bounds.left - bounds.width / 2;
  const relY = event.clientY - bounds.top - bounds.height / 2;
  x.set(relX * strength);
  y.set(relY * strength);
}

function handleMouseLeave() {
  x.set(0);
  y.set(0);
}
```

```css
/* app/globals.css — add this rule near the existing @keyframes block */
@media (prefers-reduced-motion: reduce) {
  .wave-dot {
    animation: none !important;
  }
}
```

```tsx
// components/franchise/OnboardingTimeline.tsx:42 — target (add className, keep inline animation)
<span
  key={i}
  className={cn("wave-dot shrink-0 rounded-full bg-accent", dotSizeClass)}
  style={{
    animation: `${keyframe} ${duration} ease-in-out infinite`,
    animationDelay: `${i * delayStep}ms`,
  }}
/>
```

```tsx
// components/tecnologia/LaserPhysicsDiagram.tsx — target (import + guard)
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// inside the component:
const shouldReduceMotion = useReducedMotion();

// ...
{isActive && !shouldReduceMotion && (
  <motion.span
    className="absolute h-4 w-4 rounded-full bg-accent"
    animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
  />
)}
```

## Repo conventions to follow

- The `motion` package (imported as `motion/react`, not `framer-motion`) is the established library — `useReducedMotion` is exported from the same `motion/react` package already imported in every file listed here.
- `ScrollReveal.tsx:47` is the exemplar for the `ease: [0.16, 1, 0.3, 1]` curve — keep it unchanged, only branch duration/delay/variants on `shouldReduceMotion`.
- `cn()` from `@/lib/utils` is the established classnames helper — use it for the new `wave-dot` class merge in `OnboardingTimeline.tsx`, exactly as every other `className` prop in that file already does.
- Media-query checks in this repo use `window.matchMedia` directly (see `components/layout/Header.tsx`'s `useMotionValueEvent` pattern for the general style of imperative browser-state checks) — the `SmoothScrollProvider` check should follow the same direct-DOM-API style since it runs once inside `useEffect`, not on every render.

## Steps

1. **`components/layout/SmoothScrollProvider.tsx`**: add the `if (window.matchMedia(...).matches) return;` guard as the first line inside the `useEffect` callback, before `const lenis = new Lenis(...)`. No import changes needed (`window` is available — this code already only runs client-side inside `useEffect`).
2. **`components/motion/ScrollReveal.tsx`**: add `useReducedMotion` to the `motion/react` import. Inside the component, compute `shouldReduceMotion` and `activeVariants` as shown in Target, and use `activeVariants` in place of `variants[variant]` on the `variants` prop. Update the `transition` prop's `duration` and `delay` to branch on `shouldReduceMotion` as shown. Leave the `ease` value untouched.
3. **`components/motion/MagneticButton.tsx`**: add `useReducedMotion` to the `motion/react` import. Add `const shouldReduceMotion = useReducedMotion();` after the existing `useSpring` declarations. Add the early `if (shouldReduceMotion) return;` as the first line of `handleMouseMove`. Leave `handleMouseLeave` unchanged — it already just resets to 0.
4. **`app/globals.css`**: add the `@media (prefers-reduced-motion: reduce) { .wave-dot { animation: none !important; } }` block. Place it directly after the existing `@keyframes wave-dot-b` block at the end of the file.
5. **`components/franchise/OnboardingTimeline.tsx`**: in `WaveDotsLine`, change the `<span>`'s `className` from `cn("shrink-0 rounded-full bg-accent", dotSizeClass)` to `cn("wave-dot shrink-0 rounded-full bg-accent", dotSizeClass)`. Do not touch the `style` prop — the CSS `!important` in step 4 overrides the inline `animation` at the `reduce` breakpoint.
6. **`components/tecnologia/LaserPhysicsDiagram.tsx`**: add `useReducedMotion` to the existing `motion/react` import (which already includes `AnimatePresence, motion`). Add `const shouldReduceMotion = useReducedMotion();` near the top of the component body (alongside the existing `activeIndex`/`isPausedRef` state). Change the pulse's render condition from `{isActive && (` to `{isActive && !shouldReduceMotion && (`.

## Boundaries

- Do NOT touch the tooltip `AnimatePresence`/`motion.div` block in `LaserPhysicsDiagram.tsx` (lines ~117-142) — that's covered by plan 005, not this one.
- Do NOT touch the `[0.16, 1, 0.3, 1]` easing literal itself — that's covered by plan 006. If plan 006 has already run, `ScrollReveal.tsx`'s `ease` value will appear as an imported `EASE_OUT_EXPO` constant instead of the literal array shown above — leave whichever form is present untouched; only add the `useReducedMotion` branching around it.
- Do NOT add a global CSS reset that disables all animations/transitions site-wide (e.g. a blanket `* { animation: none }`) — that's a blunt approach the audit explicitly warns against ("fewer and gentler, not zero"); every change here is a targeted, per-component branch.
- Do NOT change any text content, DOM structure, or `<head>`/metadata — this plan is motion-logic only, so it does not affect SEO indexing or LLM-readable content.
- Do NOT add new dependencies — `useReducedMotion` ships with the already-installed `motion` package.
- If a step doesn't match the code you find (drift since commit `c55b14a`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` (expect no errors), `npx eslint components/layout/SmoothScrollProvider.tsx components/motion/ScrollReveal.tsx components/motion/MagneticButton.tsx components/franchise/OnboardingTimeline.tsx components/tecnologia/LaserPhysicsDiagram.tsx` (expect no errors), `npx next build` (expect a clean build).
- **Feel check**:
  - In Chrome DevTools, open the Rendering panel → set "Emulate CSS media feature prefers-reduced-motion" to "reduce".
  - Reload the homepage: confirm scrolling is now native/instant (no inertial overshoot) — this proves Lenis didn't initialize.
  - Confirm each `ScrollReveal`-wrapped section (stats bar, value props, services teaser, etc.) still fades in on scroll but with no vertical/scale movement, and noticeably faster (~200ms vs 700ms).
  - Hover the floating WhatsApp button and move the cursor around it: confirm it no longer follows/offsets toward the cursor.
  - Visit `/franquicias`, scroll to the onboarding timeline: confirm the two rows of dots are static (not bobbing).
  - Visit `/tecnologia`, hover a diagram step: confirm the hotspot dot no longer shows the pulsing ring (the small solid dot itself should still be visible).
  - Turn "prefers-reduced-motion" back to "no preference" and repeat all five checks — confirm every animation is back to its original behavior (Lenis scroll, reveal transforms, magnetic pull, bobbing dots, pulse ring).
- **Done when**: all five reduced-motion behaviors above are confirmed off under "reduce" and on under "no preference", `tsc`/`eslint`/`build` are clean, and no other files changed.
