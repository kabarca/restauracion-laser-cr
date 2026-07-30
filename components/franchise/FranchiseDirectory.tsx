"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FranchiseCard } from "@/components/franchise/FranchiseCard";
import type { Franchisee } from "@/types/content";

export function FranchiseDirectory({ franchisees }: { franchisees: Franchisee[] }) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("todos");
  const [status, setStatus] = useState("todos");

  const countries = useMemo(
    () => [...new Set(franchisees.map((f) => f.countryName))],
    [franchisees],
  );
  const statuses = useMemo(() => [...new Set(franchisees.map((f) => f.status))], [franchisees]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return franchisees.filter((f) => {
      const matchesQuery =
        q.length === 0 || f.cityName.toLowerCase().includes(q) || f.countryName.toLowerCase().includes(q);
      const matchesCountry = country === "todos" || f.countryName === country;
      const matchesStatus = status === "todos" || f.status === status;
      return matchesQuery && matchesCountry && matchesStatus;
    });
  }, [franchisees, query, country, status]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por ciudad o país..."
            className="w-full rounded-brand border border-text/20 bg-bg py-3 pl-11 pr-4 text-sm outline-none focus:border-accent"
          />
        </div>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="rounded-brand border border-text/20 bg-bg px-4 py-3 text-sm outline-none focus:border-accent"
        >
          <option value="todos">Todos los países</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-brand border border-text/20 bg-bg px-4 py-3 text-sm outline-none focus:border-accent"
        >
          <option value="todos">Todos los estados</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === "activo" ? "Activo" : s === "proximamente" ? "Próximamente" : "Disponible"}
            </option>
          ))}
        </select>
      </div>

      {results.length === 0 ? (
        <p className="py-12 text-center text-text/60">No encontramos franquicias que coincidan con tu búsqueda.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((f) => (
            <FranchiseCard key={f.id} franchisee={f} />
          ))}
        </div>
      )}
    </div>
  );
}
