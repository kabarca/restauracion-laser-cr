"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

const WAVE_PATH =
  "M0,60 C50,0 100,0 150,60 C200,120 250,120 300,60 C350,0 400,0 450,60 C500,120 550,120 600,60";

/** Section-break wave that draws itself in as it scrolls into view — the signature motion moment for /tecnologia. */
export function WaveDivider({ className, color = "text-accent" }: { className?: string; color?: string }) {
  return (
    <svg
      className={cn("h-16 w-full", color, className)}
      viewBox="0 0 600 120"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={WAVE_PATH}
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
      />
    </svg>
  );
}
