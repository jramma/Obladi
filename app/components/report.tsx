"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ProtectedForm from "./ProtectedForm";
import Form from "next/form";

const categories = ["Electrónica", "Ropa", "Documentos", "Accesorios", "Otros"];
const DEFAULT_LOCATION = { lat: 41.3874, lng: 2.1686 }; // Barcelona

export default function Report() {
  const { register, handleSubmit } = useForm();
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const { data: session } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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

    const marker = new mapboxgl.Marker({ color: "#1E3A8A" })
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

  const handleReportSubmit = (data: any) => {
    if (!session) {
      setIsLoginModalOpen(true);
    } else {
      console.log("Reporte enviado:", {
        ...data,
        location,
      });
      // Aquí iría la lógica para guardar el reporte
    }
  };

  if (!mapboxToken) {
    return <p className="text-red-600">❌ Falta el Mapbox Access Token.</p>;
  }

  return (
    <section className="py-20 flex w-full">
      <div className="container flex flex-col gap-10">
        <h3 className="text-5xl font-light w-full md:mb-8 leading-11">
          Reportar objeto perdido
        </h3>

        <ProtectedForm
          isOpen={isLoginModalOpen}
          closeLoginModal={() => setIsLoginModalOpen(false)}
        />

        <Form
          action="/report"
          onSubmit={handleSubmit(handleReportSubmit)}
          className="space-y-6 text-[#000000] md:flex-row gap-6 items-stretch flex-col-reverse flex bg-primary text-xl w-full rounded-2xl p-6 card-style"
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

            {/* Coordenadas ocultas */}
            <input
              type="hidden"
              {...register("latitude")}
              value={location.lat}
            />
            <input
              type="hidden"
              {...register("longitude")}
              value={location.lng}
            />

            <button
              type="submit"
              className="card-style2 py-2 self-start px-6 cursor-pointer bg-tertiary"
            >
              Reportar
            </button>
          </div>

          <div className="flex flex-grow flex-col flex-1">
            <label className="block font-bold">Localización</label>
            <div className="relative flex aspect-square rounded-xl overflow-hidden card-style2">
              <div ref={mapContainerRef} className="w-full h-full" />
              <button
                type="button"
                onClick={handleLocationClick}
                className="absolute font-bold top-2 right-2 bg-tertiary text-black p-2 rounded-md shadow-md"
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
