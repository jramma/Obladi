"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 41.3874, // Barcelona
  lng: 2.1686,
};

// Definimos los colores personalizados

const Map = () => {
  // Logica de ubicación
  const [center, setCenter] = useState(defaultCenter);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
  
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("⚠️ El usuario denegó el acceso a la ubicación.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("⚠️ No se pudo obtener la ubicación. Intenta activar el GPS o revisar la configuración.");
              break;
            case error.TIMEOUT:
              console.error("⚠️ El tiempo de espera para obtener la ubicación expiró.");
              break;
            default:
              console.error("⚠️ Error desconocido al obtener la ubicación:", error);
              break;
          }
        },
        {
          enableHighAccuracy: true, // Fuerza GPS si está disponible
          timeout: 10000, // Máximo 10s para obtener la ubicación
          maximumAge: 0, // No usar caché
        }
      );
    } else {
      console.error("⚠️ Geolocalización no es compatible con este navegador.");
    }
  }, []);
  

  // Logica del tema del mapa
  const { theme } = useTheme();
  const [mapStyle, setMapStyle] = useState(snazzyMapStyle); // Estado para el estilo del mapa

  useEffect(() => {
    setMapStyle(theme === "dark" ? darkMode : snazzyMapStyle);
  }, [theme]); // Se actualiza cuando cambia el tema

  if (!apiKey) {
    console.error(
      "⚠️ Falta la API key de Google Maps. Agrega NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en .env.local"
    );
    return <p>Error: API Key no configurada</p>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{ styles: mapStyle }} // Usa el estado mapStyle
      />
    </LoadScript>
  );
};

export default Map;
const snazzyMapStyle = [
  {
    featureType: "administrative.locality",
    elementType: "all",
    stylers: [
      {
        hue: "#ff0200",
      },
      {
        saturation: 7,
      },
      {
        lightness: 19,
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
      {
        saturation: "-3",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#748ca3",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        hue: "#ff0200",
      },
      {
        saturation: -100,
      },
      {
        lightness: 100,
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        hue: "#ff0200",
      },
      {
        saturation: "23",
      },
      {
        lightness: "20",
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.school",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffdbda",
      },
      {
        saturation: "0",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        hue: "#ff0200",
      },
      {
        saturation: "100",
      },
      {
        lightness: 31,
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#f39247",
      },
      {
        saturation: "0",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        hue: "#008eff",
      },
      {
        saturation: -93,
      },
      {
        lightness: 31,
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#ffe5e5",
      },
      {
        saturation: "0",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels",
    stylers: [
      {
        hue: "#bbc0c4",
      },
      {
        saturation: -93,
      },
      {
        lightness: -2,
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        hue: "#ff0200",
      },
      {
        saturation: -90,
      },
      {
        lightness: -8,
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        hue: "#e9ebed",
      },
      {
        saturation: 10,
      },
      {
        lightness: 69,
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        hue: "#e9ebed",
      },
      {
        saturation: -78,
      },
      {
        lightness: 67,
      },
      {
        visibility: "simplified",
      },
    ],
  },
];
const darkMode = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#000000",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#c4c4c4",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#707070",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 21,
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#be2026",
      },
      {
        lightness: "0",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
      {
        hue: "#ff000a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#575757",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#999999",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.stroke",
    stylers: [
      {
        saturation: "-52",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
    ],
  },
];
