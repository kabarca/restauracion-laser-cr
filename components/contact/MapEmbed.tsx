export function MapEmbed({ lat, lng, label }: { lat: number; lng: number; label: string }) {
  return (
    <div className="overflow-hidden rounded-brand border border-text/10">
      <iframe
        title={`Mapa — ${label}`}
        src={`https://www.google.com/maps?q=${lat},${lng}&output=embed`}
        className="h-80 w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
