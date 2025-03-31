"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import Form from "next/form";

const categories = ["Electrónica", "Ropa", "Documentos", "Accesorios", "Otros"];
const DEFAULT_LOCATION = { lat: 41.3874, lng: 2.1686 }; // Barcelona

export default function Reclaim() {
  const { register, handleSubmit } = useForm();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const { theme } = useTheme();

  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!mapboxToken || !mapContainerRef.current) return;

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [location.lng, location.lat],
      zoom: 15,
    });

    mapRef.current = map;

    const marker = new mapboxgl.Marker({ color: "#1D4ED8" }) // azul (tailwind primary)
      .setLngLat([location.lng, location.lat])
      .addTo(map);

    markerRef.current = marker;

    map.on("click", (e) => {
      const newLocation = { lat: e.lngLat.lat, lng: e.lngLat.lng };
      setLocation(newLocation);
      marker.setLngLat([newLocation.lng, newLocation.lat]);
    });

    return () => map.remove();
  }, []);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const newLoc = { lat: coords.latitude, lng: coords.longitude };
        setLocation(newLoc);
        if (mapRef.current && markerRef.current) {
          mapRef.current.flyTo({ center: [newLoc.lng, newLoc.lat], zoom: 15 });
          markerRef.current.setLngLat([newLoc.lng, newLoc.lat]);
        }
      });
    }
  };

  if (!mapboxToken) {
    return <p className="text-red-600">❌ Falta la MAPBOX API Key.</p>;
  }

  return (
    <section className="py-20 flex flex-col w-full items-center">
      <div className="container flex flex-col gap-10">
        <h3 className="text-5xl font-light">Reclamar objeto perdido</h3>

        <Form
          action="/reclaim"
          className="space-y-6 text-[#000000] md:flex-row gap-6 items-stretch flex-col-reverse flex bg-tertiary text-xl w-full rounded-2xl p-6 card-style"
        >
          <div className="flex-col flex md:w-1/2 gap-6">
            <div className="flex-col flex gap-3">
              <label className="block font-bold">Título</label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="bg-white card-style2 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex-col flex gap-3">
              <label className="block font-bold">Descripción</label>
              <textarea
                {...register("description", { required: true })}
                className="card-style2 mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex-col flex gap-3">
              <label className="block font-bold">Tags</label>
              <input
                type="text"
                {...register("tags")}
                className="card-style2 mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Ejemplo: teléfono, negro, Samsung"
              />
            </div>
            <div className="flex-col flex gap-3">
              <label className="block font-bold">Categoría</label>
              <select
                {...register("category", { required: true })}
                className="card-style2 mt-1 block w-full p-2 bg-white"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Puedes incluir lat/lng ocultos en el form */}
            <input type="hidden" {...register("latitude")} value={location.lat} />
            <input type="hidden" {...register("longitude")} value={location.lng} />

            <button
              type="submit"
              className="card-style2 py-2 self-start px-6 cursor-pointer bg-primary text-black font-bold text-xl"
            >
              Reclamar
            </button>
          </div>

          <div className="flex flex-grow flex-col flex-1">
            <label className="block font-bold">Localización</label>
            <div className="relative flex aspect-square rounded-xl overflow-hidden card-style2">
              <div ref={mapContainerRef} className="w-full h-full" />
              <button
                type="button"
                onClick={handleLocationClick}
                className="absolute font-bold top-2 right-2 bg-primary text-black p-2 rounded-md shadow-md"
              >
                Usar ubicación actual
              </button>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
}
