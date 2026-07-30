"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type PhysicsStep = {
  title: string;
  description: string;
  /** Position of the hotspot on the diagram, as a percentage of its width/height. */
  dot: { x: number; y: number };
};

const AUTOPLAY_MS = 2800;

export function LaserPhysicsDiagram({
  steps,
  imageSrc,
  imageAlt,
}: {
  steps: PhysicsStep[];
  imageSrc: string;
  imageAlt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (isPausedRef.current) return;
      setActiveIndex((i) => (i + 1) % steps.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [steps.length]);

  function activate(i: number) {
    isPausedRef.current = true;
    setActiveIndex(i);
  }

  function release() {
    isPausedRef.current = false;
  }

  return (
    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
      <ol className="flex flex-col gap-1">
        {steps.map((step, i) => (
          <li key={step.title}>
            <button
              type="button"
              onMouseEnter={() => activate(i)}
              onMouseLeave={release}
              onFocus={() => activate(i)}
              onBlur={release}
              className={cn(
                "flex w-full gap-4 rounded-brand px-3 py-3 text-left transition-colors",
                i === activeIndex ? "bg-secondary/10" : "hover:bg-secondary/5",
              )}
            >
              <span
                className={cn(
                  "font-display text-lg font-bold transition-colors",
                  i === activeIndex ? "text-accent" : "text-accent/40",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className={cn("text-sm font-semibold transition-colors", i === activeIndex ? "text-text" : "text-text/80")}>
                  {step.title}
                </span>
                <span className="text-sm text-text/60">{step.description}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="relative aspect-[3/2] w-full" onMouseLeave={release}>
        <div className="absolute inset-0 overflow-hidden rounded-brand">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>

        <div className="absolute inset-0">
          {steps.map((step, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={step.title}
                type="button"
                aria-label={step.title}
                onMouseEnter={() => activate(i)}
                onFocus={() => activate(i)}
                onBlur={release}
                className="absolute flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${step.dot.x}%`, top: `${step.dot.y}%` }}
              >
                {isActive && (
                  <span
                    className="hotspot-pulse absolute h-4 w-4 rounded-full bg-accent"
                    style={{ animation: "hotspot-pulse 1.8s ease-in-out infinite" }}
                  />
                )}
                <span
                  className={cn(
                    "h-2 w-2 rounded-full border transition-colors",
                    isActive ? "border-accent bg-accent" : "border-surface/70 bg-surface/30",
                  )}
                />
              </button>
            );
          })}

          <AnimatePresence mode="wait">
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
        </div>
      </div>
    </div>
  );
}
