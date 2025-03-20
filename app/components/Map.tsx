"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 40.7128, // Nueva York
  lng: -74.006,
};

// Definimos los colores personalizados
const snazzyMapStyle = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#211111" }], // Color primario
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#212121" }], // Color secundario
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#F0523C" }], // Color terciario
  },
];

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const Map = () => {
  if (!apiKey) {
    console.error("⚠️ Falta la API key de Google Maps. Agrega NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en .env.local");
    return <p>Error: API Key no configurada</p>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{ styles: snazzyMapStyle }}
      />
    </LoadScript>
  );
};

export default Map;
