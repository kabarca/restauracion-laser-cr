"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { onboardingSteps } from "@/lib/content";
import { cn } from "@/lib/utils";

const BLOCK_WIDTH = 600;
const DOT_SPACING = 14;
const TOTAL_WIDTH = onboardingSteps.length * BLOCK_WIDTH;
const DOT_COUNT = Math.floor(TOTAL_WIDTH / DOT_SPACING);
const WAVE_BASELINE = 62;

/**
 * One continuous row of dots spanning the full scrollable content, sitting behind every
 * card — not regenerated per-card, so it reads as a single uninterrupted line.
 */
function WaveDotsLine({
  opacityClass,
  dotSizeClass,
  keyframe,
  duration,
  delayStep,
}: {
  opacityClass: string;
  dotSizeClass: string;
  keyframe: string;
  duration: string;
  delayStep: number;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 z-0 flex justify-between", opacityClass)}
      style={{ top: WAVE_BASELINE }}
      aria-hidden="true"
    >
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <span
          key={i}
          className={cn("wave-dot shrink-0 rounded-full bg-accent", dotSizeClass)}
          style={{
            animation: `${keyframe} ${duration} ease-in-out infinite`,
            animationDelay: `${i * delayStep}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function OnboardingTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function updateScrollEdges() {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  }

  useEffect(() => {
    updateScrollEdges();
  }, []);

  function scrollByAmount(amount: number) {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  function onMouseDown(event: React.MouseEvent) {
    if (!scrollRef.current) return;
    isDragging.current = true;
    dragStart.current = { x: event.pageX, scrollLeft: scrollRef.current.scrollLeft };
  }

  function onMouseMove(event: React.MouseEvent) {
    if (!isDragging.current || !scrollRef.current) return;
    const delta = event.pageX - dragStart.current.x;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - delta;
  }

  function endDrag() {
    isDragging.current = false;
  }

  return (
    <section className="overflow-hidden bg-secondary/5 py-24">
      <Container className="flex flex-col gap-4">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Del sí a la apertura
        </span>
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          Aproximadamente <span className="italic text-accent">un mes</span>, sin tiempo muerto
        </h2>
        <p className="max-w-2xl text-lg text-text/70">
          Mientras se produce y transporta el equipo internacionalmente, ya estás capacitándote — no vas
          a esperar sin hacer nada.
        </p>
      </Container>

      {/* Full viewport width so slides can travel freely — only the initial inset matches Container. */}
      <div className="relative mt-14">
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-secondary/5 to-transparent transition-opacity duration-300 sm:w-24",
            atStart ? "opacity-0" : "opacity-100",
          )}
          aria-hidden="true"
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-secondary/5 to-transparent transition-opacity duration-300 sm:w-24",
            atEnd ? "opacity-0" : "opacity-100",
          )}
          aria-hidden="true"
        />

        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onScroll={updateScrollEdges}
          tabIndex={0}
          role="group"
          aria-label="Línea de tiempo de apertura de franquicia — desplazable horizontalmente"
          className="container-aligned-inset scrollbar-hide flex cursor-grab overflow-x-auto pb-4 pr-6 outline-none active:cursor-grabbing sm:pr-8 lg:pr-12"
        >
          <div className="relative flex" style={{ width: TOTAL_WIDTH }}>
            <WaveDotsLine opacityClass="opacity-30" dotSizeClass="h-1.5 w-1.5" keyframe="wave-dot-a" duration="2.2s" delayStep={55} />
            <WaveDotsLine opacityClass="opacity-60" dotSizeClass="h-1 w-1" keyframe="wave-dot-b" duration="1.3s" delayStep={35} />

            {onboardingSteps.map((step, i) => (
              <div key={step.id} className="relative z-10 flex w-[600px] shrink-0 gap-8 pr-10">
                <ImagePlaceholder
                  id={`onboarding-${step.id}`}
                  alt={step.title}
                  size="card"
                  className="h-72 w-48 shrink-0"
                />
                <div className="flex max-w-[240px] flex-col">
                  <div className="flex h-14 items-center">
                    <span className="font-display text-5xl font-bold text-accent/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="h-8" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    {step.duration}
                  </span>
                  <h3 className="mt-1 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-text/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Container className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByAmount(-BLOCK_WIDTH)}
          aria-label="Paso anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-text/20 text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(BLOCK_WIDTH)}
          aria-label="Paso siguiente"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-text/20 text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </Container>
    </section>
  );
}
