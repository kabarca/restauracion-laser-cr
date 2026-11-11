export function AnnouncementBar() {
  return (
    <div className="flex items-center justify-center gap-3 bg-accent px-4 py-3.5 text-center text-base font-extrabold uppercase tracking-wide text-surface sm:text-xl">
      <span className="hidden sm:inline" aria-hidden="true">
        🔥
      </span>
      Máquinas de limpieza láser a la venta
      <span className="hidden underline underline-offset-4 sm:inline">· Consultá ahora →</span>
    </div>
  );
}
