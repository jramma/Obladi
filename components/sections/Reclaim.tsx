"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapboxgl, MAPBOX_TOKEN } from "@/lib/mapbox";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import TagsInput from "../Tagsinput";
const categories = ["Electrónica", "Ropa", "Documentos", "Accesorios", "Otros"];
const DEFAULT_LOCATION = { lat: 41.3874, lng: 2.1686 }; // Barcelona
const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
const validTypes = ["image/jpeg", "image/png", "image/webp"];

export default function Reclaim() {
  const [previewImages, setPreviewImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setValue } = useForm();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const mapboxToken = MAPBOX_TOKEN;
  const user = useUser();
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

    mapRef.current = map;

    const marker = new mapboxgl.Marker({ color: "#1D4ED8" }) // azul (tailwind primary)
      .setLngLat([location.lng, location.lat])
      .addTo(map);

    markerRef.current = marker;

    map.on("click", (e) => {
      const newLocation = { lat: e.lngLat.lat, lng: e.lngLat.lng };
      setLocation(newLocation);
      marker.setLngLat([newLocation.lng, newLocation.lat]);
      setValue("latitude", newLocation.lat);
      setValue("longitude", newLocation.lng);
    });

    return () => map.remove();
  }, []);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
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
    }
  };

  if (!mapboxToken) {
    return <p className="text-red-600">❌ Falta la MAPBOX API Key.</p>;
  }

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

    const files = previewImages;

    if (files?.length > 3) {
      alert("❌ Máximo 3 imágenes");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!validTypes.includes(file.type)) {
        alert(`❌ El tipo de archivo "${file.name}" no está permitido.`);
        return;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        alert(`❌ La imagen "${file.name}" excede el límite de 1MB.`);
        return;
      }

      formData.append("images", file);
    }

    const res = await fetch("/api/reclaim", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("✅ Reporte enviado");
    } else {
      alert("❌ Error al enviar el reporte");
    }
  };

  return (
    <section
      id="reclaim"
      className="py-20 flex flex-col w-full items-center"
      onClick={handleSectionClick}
    >
      <div className="container flex flex-col gap-10">
        <h3 className="text-5xl font-light">Reclamar objeto perdido</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-[#000000] md:flex-row gap-6 items-stretch flex-col-reverse flex bg-tertiary text-xl w-full rounded-2xl p-6 card-style"
          noValidate
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
            <TagsInput register={register} setValue={setValue} />

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

            {user && (
              <div className="flex-col flex gap-3">
                <label className="block font-bold">Correo electrónico</label>
                <input
                  type="email"
                  {...register("email")}
                  readOnly
                  disabled
                  className="card-style2 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-600 cursor-not-allowed"
                  value={user?.email || ""}
                />
              </div>
            )}
            <div className="flex-col flex gap-3">
              <label className="block font-bold">
                Fecha en la que lo encontraste
              </label>
              <input
                type="date"
                {...register("foundAt", { required: true })}
                className="card-style2 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white"
              />
            </div>

            <div className="flex-col flex gap-3">
              <label className="block font-bold">Imágenes (máx. 3)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                className="bg-white border p-2 rounded card-style2"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  const allFiles = [...previewImages, ...files];

                  if (allFiles.length > 3) {
                    alert("❌ Solo puedes subir hasta 3 imágenes");
                    return;
                  }

                  setPreviewImages(allFiles);
                }}
              />

              {previewImages.length > 0 && (
                <div className="flex gap-4 mt-4 flex-wrap">
                  {previewImages.map((file, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <p className="text-xs mt-1 truncate">{file.name}</p>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Puedes incluir lat/lng ocultos en el form */}
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
              className="card-style2 py-2 self-start px-6 cursor-pointer bg-primary text-black font-bold text-xl"
            >
              Reclamar
            </button>
          </div>
          {/* <div className="flex flex-grow flex-col flex-1 bg-black dark:bg-white"></div> */}

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
        </form>
      </div>
    </section>
  );
}
