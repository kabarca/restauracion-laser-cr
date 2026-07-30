"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import type { Testimonial } from "@/types/content";

const AUTO_ADVANCE_MS = 6500;

export function TestimonialScrollCard({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % testimonials.length) + testimonials.length) % testimonials.length);
    },
    [testimonials.length],
  );

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, testimonials.length]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  }

  const current = testimonials[index];
  if (!current) return null;

  return (
    <div
      role="region"
      aria-label="Testimonios"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      className="absolute inset-x-4 bottom-4 flex items-end gap-3 outline-none sm:inset-x-auto sm:bottom-8 sm:left-8 sm:right-16"
    >
      <div className="w-full max-w-sm rounded-brand border border-white/10 bg-black/40 p-5 text-surface shadow-xl backdrop-blur-md sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            aria-live="polite"
          >
            <p className="text-sm leading-relaxed text-surface/95">&ldquo;{current.quote}&rdquo;</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-accent/80" aria-hidden="true" />
              <div className="text-xs">
                <p className="font-semibold">{current.name}</p>
                <p className="text-surface/70">
                  {current.role === "franquiciado" ? "Franquiciado" : "Cliente"} · {current.location}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {testimonials.length > 1 && (
        <div className="hidden flex-col items-center gap-3 pb-2 sm:flex">
          <button
            type="button"
            aria-label="Testimonio anterior"
            onClick={() => goTo(index - 1)}
            className="text-surface/70 transition-colors hover:text-surface"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <div className="flex flex-col gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Ir al testimonio ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  i === index ? "bg-accent" : "bg-surface/40 hover:bg-surface/70",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Siguiente testimonio"
            onClick={() => goTo(index + 1)}
            className="text-surface/70 transition-colors hover:text-surface"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
