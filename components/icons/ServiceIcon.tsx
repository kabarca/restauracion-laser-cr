const INNER_PATHS: Record<string, string> = {
  rust: "M12 8c-2 2.2-3.4 3.8-3.4 5.6a3.4 3.4 0 0 0 6.8 0c0-1.8-1.4-3.4-3.4-5.6Z",
  "paint-coatings": "M8 8h6M9 8v3a2 2 0 0 0 2 2h0a2 2 0 0 1 2 2v3",
  graffiti: "M8 15c1-2 1.5-3.5 1-5s-2-2-1-4M13 16c1.5-1.5 2-3 1.5-4.5S13 9 14 7",
  "mold-biofilm": "M9 10.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM15 10.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM12 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",
  "grease-oil": "M12 7c-1.8 2.4-3 4.2-3 5.8a3 3 0 0 0 6 0c0-1.6-1.2-3.4-3-5.8Z",
  "injection-molds": "M9 9h6v6H9z",
  "wood-teak": "M8 9.5h8M8 12h8M8 14.5h8",
  soot: "M12 7c-1.6 2-2.6 3.4-2.6 5a2.6 2.6 0 0 0 5.2 0c0-.7-.2-1.3-.6-2 .1 1-.4 1.6-1 1.6.4-1.6-.2-2.9-1-4.6Z",
  "heritage-restoration": "M8 16h8M9 16V9.5M15 16V9.5M8 9.5h8L12 7Z",
};

/** Shared circular frame + category glyph — single-line 2px stroke, matching the logo's line style. */
export function ServiceIcon({ icon, className }: { icon: string; className?: string }) {
  const inner = INNER_PATHS[icon];
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
      <circle cx="12" cy="12" r="9.5" />
      {inner && <path d={inner} />}
    </svg>
  );
}
