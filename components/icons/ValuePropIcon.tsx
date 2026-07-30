const INNER_PATHS: Record<string, string> = {
  "no-chemicals": "M12 4 6 12a4.2 4.2 0 1 0 6 6M8 16 16 8M18 12l2 2",
  precision: "M12 5v2.2M12 16.8V19M5 12h2.2M16.8 12H19M12 9.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Z",
  certified: "M12 4.5 17.5 7v5c0 3.6-2.3 6-5.5 7.5C9 18 6.5 15.6 6.5 12V7L12 4.5Zm-2.4 7 1.7 1.7 3.6-3.6",
  "on-site": "M12 4a5 5 0 0 1 5 5c0 3.5-5 10-5 10S7 12.5 7 9a5 5 0 0 1 5-5Zm0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
};

/** Matches ServiceIcon's single-line 1.5 stroke language — used inside ValueProps' bordered circles. */
export function ValuePropIcon({ icon, className }: { icon: string; className?: string }) {
  const inner = INNER_PATHS[icon];
  if (!inner) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={inner} />
    </svg>
  );
}
