export const runtime = "nodejs";
// /lib/mapbox.ts
import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

if (!MAPBOX_TOKEN) {
  throw new Error("❌ Mapbox token no definido en .env");
}

// Configura el token una vez para todo el proyecto
mapboxgl.accessToken = MAPBOX_TOKEN;

export { mapboxgl, MAPBOX_TOKEN };

/**
 * 🔄 Reverse geocoding: de coordenadas a nombre de lugar (ciudad, etc)
 */
export async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await res.json();

    const place =
      data?.address?.city ||
      data?.address?.town ||
      data?.address?.village ||
      data?.display_name;

    return place || null;
  } catch (err) {
    console.error("Error en reverseGeocode:", err);
    return null;
  }
}

/**
 * 📍 Geocoding: de nombre de lugar a coordenadas (lat/lng)
 */
export async function getCoordinatesFromPlace(placeName: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        placeName
      )}&format=json&limit=1`
    );
    const data = await res.json();

    if (data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  } catch (err) {
    console.error("Error en getCoordinatesFromPlace:", err);
    return null;
  }
}
