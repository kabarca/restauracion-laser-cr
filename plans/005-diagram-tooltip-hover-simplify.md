# 005 — Simplify the hover-triggered diagram tooltip animation

- **Status**: DONE, with one deviation from Target found during the feel check (executed 2026-07-26): removing `mode="wait"` caused the outgoing and incoming tooltips to render simultaneously at two different screen positions (each step's tooltip is positioned via `left`/`top`/`bottom` tied to that step's own hotspot coordinates, so they don't overlap in place — the crossfade reads as two distinct boxes visible at once, confirmed via screenshot on `/tecnologia`). `mode="wait"` was restored; the opacity-only motion and shortened 0.12s duration from this plan were kept. Net effect: still snappier and less over-animated than the original (0.25s with scale+translate), just without the double-exposure regression.
- **Commit**: c55b14a
- **Severity**: MEDIUM
- **Category**: Interruptibility / Purpose & frequency
- **Estimated scope**: 1 file (`components/tecnologia/LaserPhysicsDiagram.tsx`)

## Problem

The step-detail tooltip re-triggers on every `onMouseEnter`/`onFocus` as a user moves their cursor across the step list (`activate(i)` is called from both the text-list buttons at lines 53/55 and the hotspot buttons at lines 94/95). Per `AUDIT.md` §1 (Purpose & frequency), hover-driven list navigation like this sits in the "tens of times per session" tier, where the guidance is to "remove or drastically reduce" — not run a full scale+translate entrance/exit on every single hover switch. Per §4 (Interruptibility), `AnimatePresence mode="wait"` forces the outgoing tooltip to fully exit before the next one enters, which adds latency exactly where responsiveness matters most (someone scanning quickly across the list).

```tsx
// components/tecnologia/LaserPhysicsDiagram.tsx:117-142 — current
<AnimatePresence mode="wait">
  {(() => {
    const step = steps[activeIndex];
    const flipBelow = step.dot.y < 22;
    return (
      <motion.div
        key={step.title}
        initial={{ opacity: 0, scale: 0.92, y: flipBelow ? -6 : 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: flipBelow ? -6 : 6 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute z-10 w-max max-w-[220px] -translate-x-1/2"
        style={{
          left: `clamp(112px, ${step.dot.x}%, calc(100% - 112px))`,
          ...(flipBelow
            ? { top: `calc(${step.dot.y}% + 14px)` }
            : { bottom: `calc(${100 - step.dot.y}% + 14px)` }),
        }}
      >
        <div className="rounded-lg border border-secondary/30 bg-ink/95 px-3 py-2 shadow-lg backdrop-blur-sm">
          <span className="block text-xs font-semibold text-surface">{step.title}</span>
        </div>
      </motion.div>
    );
  })()}
</AnimatePresence>
```

## Target

```tsx
// components/tecnologia/LaserPhysicsDiagram.tsx:117-142 — target
<AnimatePresence>
  {(() => {
    const step = steps[activeIndex];
    const flipBelow = step.dot.y < 22;
    return (
      <motion.div
        key={step.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
        className="pointer-events-none absolute z-10 w-max max-w-[220px] -translate-x-1/2"
        style={{
          left: `clamp(112px, ${step.dot.x}%, calc(100% - 112px))`,
          ...(flipBelow
            ? { top: `calc(${step.dot.y}% + 14px)` }
            : { bottom: `calc(${100 - step.dot.y}% + 14px)` }),
        }}
      >
        <div className="rounded-lg border border-secondary/30 bg-ink/95 px-3 py-2 shadow-lg backdrop-blur-sm">
          <span className="block text-xs font-semibold text-surface">{step.title}</span>
        </div>
      </motion.div>
    );
  })()}
</AnimatePresence>
```

Three changes from current: `mode="wait"` removed (so the incoming tooltip can start fading in while the outgoing one is still fading out — no blocking), `scale`/`y` removed from `initial`/`animate`/`exit` (opacity-only), and `transition` shortened from `duration: 0.25` with the marketing-tier `[0.16, 1, 0.3, 1]` curve to `duration: 0.12` with a plain `easeOut` — inside the audit's "Tooltips, small popovers: 125-200ms" budget, using the audit's default hover/UI easing tier rather than the longer entrance curve reserved for section-level reveals.

## Repo conventions to follow

- This is the one place in the file where a per-hover UI element was using the same easing/duration budget as a once-per-page-load section reveal (`ScrollReveal.tsx` uses `duration: 0.7` + `[0.16, 1, 0.3, 1]` for scroll entrances) — tooltips get their own, snappier budget per `AUDIT.md` §2's duration table.
- `flipBelow` positioning logic (via `top`/`bottom` inline styles) is untouched — that's the correct mechanism for indicating *where* the tooltip points, independent of the entrance animation style; removing the `y` transform doesn't lose that information since the position is already set by `top`/`bottom`, not by the animated `y` offset.

## Steps

1. Remove `mode="wait"` from the `<AnimatePresence>` opening tag (line 117), leaving plain `<AnimatePresence>`.
2. Change `initial={{ opacity: 0, scale: 0.92, y: flipBelow ? -6 : 6 }}` to `initial={{ opacity: 0 }}`.
3. Change `animate={{ opacity: 1, scale: 1, y: 0 }}` to `animate={{ opacity: 1 }}`.
4. Change `exit={{ opacity: 0, scale: 0.92, y: flipBelow ? -6 : 6 }}` to `exit={{ opacity: 0 }}`.
5. Change `transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}` to `transition={{ duration: 0.12, ease: "easeOut" }}`.

## Boundaries

- Do NOT touch the `flipBelow` calculation, the `style={{ left, top/bottom }}` positioning object, or the inner `<div>`'s content/classes.
- Do NOT touch the hotspot pulse block above this one in the same file — that's plan 004, not this one.
- Do NOT touch the step-list buttons (`onMouseEnter`/`onFocus`/`onBlur` handlers) or their `transition-colors` classes — those are simple color transitions already within budget, not part of this finding.
- This changes only the timing/transform of an already-rendered tooltip element — no text, links, or structural content changes — so it has no effect on SEO or LLM-readable content.
- If the current code doesn't match what's shown above (drift since commit `c55b14a`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` (expect no errors), `npx eslint components/tecnologia/LaserPhysicsDiagram.tsx` (expect no errors), `npx next build` (expect a clean build).
- **Feel check**:
  - Visit `/tecnologia`, move the mouse quickly across all the step-list buttons in succession. Confirm the tooltip now feels snappy and keeps up with the cursor, rather than visibly lagging behind while each one fully exits before the next enters.
  - Confirm the tooltip still fades in/out (not an abrupt cut) — just faster and without the pop/slide.
  - Confirm the tooltip still appears above or below the hotspot correctly depending on `flipBelow` (this is unaffected, driven by `top`/`bottom`, not by the removed `y` transform) — check both a step near the top of the diagram and one lower down.
  - In DevTools Animations panel, set playback to 10% and confirm the tooltip only animates `opacity`.
- **Done when**: hovering across the step list feels immediate and non-blocking, the tooltip still communicates direction correctly via its position, and `tsc`/`eslint`/`build` are clean.
