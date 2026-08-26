/**
 * Shared option lists for the service-evaluation form (app/form/servicio) — used by both
 * the client form (to render choices) and the API route (to turn submitted codes back into
 * human-readable labels for the notification email). Single source of truth so the two never drift.
 */

export const MATERIAL_TYPES = [
  { value: "metal", label: "Metal / Hierro / Acero" },
  { value: "madera", label: "Madera" },
  { value: "piedra-concreto-pared", label: "Piedra / Concreto / Pared" },
  { value: "escultura-valor", label: "Escultura o pieza de valor histórico/artístico" },
  { value: "otro", label: "Otro" },
] as const;

export const SURFACE_CONDITIONS = [
  { value: "fragil", label: "Frágil / Delicada / Antigua" },
  { value: "buen-estado", label: "En buen estado / Resistente" },
] as const;

export const COATINGS = [
  { value: "oxido", label: "Óxido o corrosión" },
  { value: "pintura", label: "Pintura" },
  { value: "barniz", label: "Barniz, laca o sellador" },
  { value: "grasas", label: "Grasas, aceites o hollín" },
  { value: "suciedad", label: "Suciedad acumulada / Moho" },
  { value: "otro", label: "Otro" },
] as const;

export const PAINT_AGES = [
  { value: "reciente", label: "Reciente" },
  { value: "antigua", label: "Vieja / antigua" },
] as const;

export const COATING_THICKNESS = [
  { value: "ligera", label: "Capa ligera / Superficial" },
  { value: "media", label: "Capa media" },
  { value: "gruesa", label: "Varias capas / Revestimiento muy grueso o incrustado" },
] as const;

export const HAS_DETAILS_OPTIONS = [
  { value: "si", label: "Sí, es una superficie con detalles/relieves" },
  { value: "no", label: "No, es totalmente plana/lisa" },
] as const;

export const ELECTRICAL_ACCESS_OPTIONS = [
  { value: "si", label: "Sí (Monofásica / Trifásica)" },
  { value: "no-seguro", label: "No estoy seguro / No hay luz en la zona" },
] as const;

export const VENTILATION_OPTIONS = [
  { value: "abierto", label: "Sí, al aire libre o espacio muy abierto" },
  { value: "cerrado", label: "Espacio cerrado / Interiores" },
] as const;

/** Looks up a label from one of the option lists above; falls back to the raw value. */
export function labelFor(options: ReadonlyArray<{ value: string; label: string }>, value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}
