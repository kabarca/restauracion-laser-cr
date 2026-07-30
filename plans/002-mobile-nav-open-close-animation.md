# 002 — Animate the mobile nav open/close

- **Status**: DONE (executed 2026-07-26; used the `EASE_OUT_EXPO` import from plan 006 instead of the literal, since 006 ran first)
- **Commit**: c55b14a
- **Severity**: HIGH
- **Category**: Missed opportunity / Interruptibility
- **Estimated scope**: 1 file (`components/layout/MobileNav.tsx`)

## Problem

The mobile navigation panel mounts and unmounts with a bare JSX conditional — no animation library involvement at all, despite `motion/react` (`AnimatePresence`, `motion.div`) already being used for equivalent panel/overlay reveals elsewhere in this exact codebase (`components/home/TestimonialScrollCard.tsx`, `components/tecnologia/LaserPhysicsDiagram.tsx`). This is the most visually abrupt moment on the entire site: the menu snaps into existence and disappears instantly, which reads as broken on a site that is otherwise carefully animated everywhere else. It's also a "occasional, per-session" interaction (opening the mobile menu), which per the purpose/frequency table warrants standard animation, not the current zero.

```tsx
// components/layout/MobileNav.tsx — current, full file
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-[var(--header-h,72px)] z-40 flex flex-col gap-1 bg-bg px-6 py-6 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-brand px-3 py-3 text-lg font-semibold text-text hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {link.label}
            </Link>
          ))}
          <WhatsAppButton className="mt-4 w-full" />
        </div>
      )}
    </div>
  );
}
```

## Target

```tsx
// components/layout/MobileNav.tsx — target, full file
"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[var(--header-h,72px)] z-40 flex flex-col gap-1 bg-bg px-6 py-6 shadow-lg"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-brand px-3 py-3 text-lg font-semibold text-text hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </Link>
            ))}
            <WhatsAppButton className="mt-4 w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

## Repo conventions to follow

- `AnimatePresence` + `motion.div` with `initial`/`animate`/`exit`/`transition` is the established pattern for conditionally-rendered panels — copy the shape from `components/home/TestimonialScrollCard.tsx:59-65`.
- The shared easing curve `[0.16, 1, 0.3, 1]` is used for every entrance transition in this repo (`ScrollReveal.tsx:47`, `Header.tsx:44`, `TestimonialScrollCard.tsx:65`) — use the same literal here.
- No `scale(0)` or center-anchored scale — this panel drops down from under the header, so a small `y` offset (not a scale) is the correct physicality per `AUDIT.md` §3, matching how `TestimonialScrollCard.tsx` and `LaserPhysicsDiagram.tsx`'s tooltip both use directional `y` offsets rather than scale for non-popover panel motion.
- Duration 250ms sits inside the audit's "Dropdowns, selects: 150-250ms" budget — appropriate since this is a lightweight nav panel, not a full-screen modal (which would budget 200-500ms).

## Steps

1. Add `AnimatePresence, motion, useReducedMotion` to a new `from "motion/react"` import line, placed after the existing `import { useState } from "react";` line and before `import Link from "next/link";` (matching the import ordering style already used in `components/tecnologia/LaserPhysicsDiagram.tsx`: react hooks, then `motion/react`, then other libs, then local imports).
2. Add `const shouldReduceMotion = useReducedMotion();` immediately after the `const [open, setOpen] = useState(false);` line.
3. Wrap the existing `{open && (<div ...>...</div>)}` block in `<AnimatePresence>...</AnimatePresence>`.
4. Change the inner `<div>` to `<motion.div>`, keeping its existing `className` unchanged, and add the `initial`, `animate`, `exit`, and `transition` props exactly as shown in Target.
5. Change the closing `</div>` to `</motion.div>`.

## Boundaries

- Do NOT change the trigger `<button>`'s markup, icon swap logic, or `aria-expanded`/`aria-label` handling — those are correct as-is.
- Do NOT change the `links.map(...)` body, the `WhatsAppButton` usage, or any `className` values other than converting the panel wrapper element from `div` to `motion.div`.
- Do NOT add a backdrop/overlay element — that's a structural addition out of scope for a motion-only plan; if the user wants a backdrop, that should be a separate follow-up.
- Do NOT touch `components/layout/Header.tsx` or any other file — this plan is scoped to `MobileNav.tsx` only.
- This plan does not change any text, links, or DOM content — only how the existing panel enters/exits — so it has no effect on SEO or LLM-readable content (the nav links are already in the DOM before/during animation, not conditionally rendered based on animation state).
- If the current file content doesn't match the "current" block above (drift since commit `c55b14a`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` (expect no errors), `npx eslint components/layout/MobileNav.tsx` (expect no errors), `npx next build` (expect a clean build).
- **Feel check**: resize the browser (or use DevTools device toolbar) to a mobile width (<768px).
  - Click the hamburger icon: confirm the panel fades and slides down from just under the header, not appearing instantly.
  - Click a nav link: confirm the panel fades/slides back out before the route changes (or at least begins its exit — Next.js navigation itself is separate).
  - Click the hamburger again to close without navigating: confirm the same exit animation plays.
  - Rapidly double-click the hamburger (open, then close before the entrance finishes): confirm `AnimatePresence` handles the interruption smoothly (no visual jump or flash) — this is Framer Motion's built-in interruption handling, no extra code needed for it.
  - In DevTools Animations panel, set playback to 10% and confirm the panel moves only on `opacity`/`transform` (no layout shift).
  - Toggle `prefers-reduced-motion` (Rendering panel) to "reduce" and confirm the panel still fades in/out but with no vertical movement, and the duration is visibly shorter.
- **Done when**: opening and closing the mobile menu is animated in both directions, the reduced-motion variant drops the `y` movement, and `tsc`/`eslint`/`build` are clean.
