"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/navigation";
import TagsInput from "./tagsinput";

const categories = ["Electrónica", "Ropa", "Documentos", "Accesorios", "Otros"];
const DEFAULT_LOCATION = { lat: 41.3874, lng: 2.1686 };

export default function ReportLost() {
  const { register, handleSubmit, setValue } = useForm();
  const user = useUser();
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const router = useRouter();
  const handleSectionClick = () => {
    if (!user?.email) {
      router.push("/auth/signup");
    }
  };

  useEffect(() => {
    if (!mapboxToken || !mapContainerRef.current) return;
    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [location.lng, location.lat],
      zoom: 15,
    });

    const marker = new mapboxgl.Marker({ color: "#1E3A8A" })
      .setLngLat([location.lng, location.lat])
      .addTo(map);

    map.on("click", (e) => {
      const newLoc = { lat: e.lngLat.lat, lng: e.lngLat.lng };
      setLocation(newLoc);
      marker.setLngLat([newLoc.lng, newLoc.lat]);
      setValue("latitude", newLoc.lat);
      setValue("longitude", newLoc.lng);
    });

    mapRef.current = map;
    markerRef.current = marker;

    return () => map.remove();
  }, []);

  const handleLocationClick = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const newLoc = { lat: coords.latitude, lng: coords.longitude };
      setLocation(newLoc);
      setValue("latitude", newLoc.lat);
      setValue("longitude", newLoc.lng);
      if (mapRef.current && markerRef.current) {
        mapRef.current.flyTo({ center: [newLoc.lng, newLoc.lat], zoom: 15 });
        markerRef.current.setLngLat([newLoc.lng, newLoc.lat]);
      }
    });
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", data.tags);
    formData.append("category", data.category);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("email", data.email);
    formData.append("lostAt", data.lostAt);
    formData.append("post_date", new Date().toISOString());

    const files = data.images;
    if (files?.length > 3) {
      alert("❌ Máximo 3 imágenes");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    const res = await fetch("/api/lost", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("✅ Reporte enviado");
    } else {
      alert("❌ Error al enviar el reporte");
    }
  };

  if (!mapboxToken) {
    return <p className="text-red-600">❌ Falta el token de MAPBOX</p>;
  }

  return (
    <section
      onClick={handleSectionClick}
      className="py-20 flex flex-col w-full items-center"
    >
      <div className="container flex flex-col gap-10">
        <h3 className="text-5xl font-light">Reportar objeto perdido</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-[#000000] md:flex-row gap-6 items-stretch flex-col-reverse flex bg-primary text-xl w-full rounded-2xl p-6 card-style"
        >
          <div className="flex-col flex md:w-1/2 gap-6">
            <label className="block font-bold">Título</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="bg-white card-style2 p-2 border rounded-md"
            />

            <label className="block font-bold">Descripción</label>
            <textarea
              {...register("description", { required: true })}
              className="bg-white card-style2 p-2 border rounded-md"
            />

            <TagsInput register={register} setValue={setValue} />

            <label className="block font-bold">Categoría</label>
            <select
              {...register("category", { required: true })}
              className="bg-white card-style2 p-2 border rounded-md"
            >
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="block font-bold">Fecha en la que se perdió</label>
            <input
              type="date"
              {...register("lostAt", { required: true })}
              className="bg-white card-style2 p-2 border rounded-md"
            />

            {user?.email && (
              <>
                <label className="block font-bold">Correo electrónico</label>
                <input
                  type="email"
                  {...register("email")}
                  value={user.email}
                  readOnly
                  disabled
                  className="card-style2 p-2 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
                />
              </>
            )}

            <label className="block font-bold">Imágenes (máx. 3)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images")}
              className="bg-white card-style2 p-2 border rounded-md"
            />

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
              className="card-style2 py-2 self-start px-6 bg-tertiary font-bold"
            >
              Reportar
            </button>
          </div>

          <div className="flex flex-col flex-1">
            <label className="block font-bold">Localización</label>
            <div className="relative aspect-square rounded-xl overflow-hidden card-style2">
              <div ref={mapContainerRef} className="w-full h-full" />
              <button
                type="button"
                onClick={handleLocationClick}
                className="absolute top-2 right-2 bg-white text-black p-2 rounded-md shadow"
              >
                Usar ubicación actual
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
