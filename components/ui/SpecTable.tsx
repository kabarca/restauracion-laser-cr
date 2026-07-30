import type { MachineSpec } from "@/types/content";

export function SpecTable({ specs }: { specs: MachineSpec[] }) {
  return (
    <div className="overflow-hidden rounded-brand border border-text/10">
      <dl className="divide-y divide-text/10">
        {specs.map((spec, i) => (
          <div
            key={spec.id}
            className={`grid grid-cols-2 gap-4 px-5 py-4 ${i % 2 === 1 ? "bg-secondary/5" : "bg-bg"}`}
          >
            <dt className="text-sm font-semibold uppercase tracking-wide text-secondary">{spec.label}</dt>
            <dd className="text-sm text-text/80">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
