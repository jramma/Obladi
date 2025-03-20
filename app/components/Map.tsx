"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapComponent = () => {
  const [LeafletComponents, setLeafletComponents] = useState<any>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Solo importamos Leaflet cuando el componente se monta en el navegador
    import("react-leaflet").then((L) => {
      setLeafletComponents(L);
    });

    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  if (!LeafletComponents || !position) return <p>Cargando mapa...</p>;

  const { MapContainer, TileLayer, Marker, Popup } = LeafletComponents;

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden">
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://maps.openfreemap.org/m1/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>¡Aquí estás!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });
