interface GoogleMapEmbedProps {
  lat: number;
  lng: number;
  zoom?: number;
}

export function GoogleMapEmbed({ lat, lng, zoom = 15 }: GoogleMapEmbedProps) {
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${lat},${lng}&zoom=${zoom}`;

  return (
    <div className="w-full h-full">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        className="border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
        allow="fullscreen"
      />
    </div>
  );
}
