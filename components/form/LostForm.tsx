"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { categories } from "@/lib/utils";
import TagsInput from "@/components/Tagsinput";
import { useMongoUser } from "@/hooks/UseMongoUser";
import imageCompression from "browser-image-compression";
import { showGlobalModal } from "@/components/GlobalModal";
const DEFAULT_LOCATION = { lat: 41.3874, lng: 2.1686 };
const validTypes = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
type LostFormProps = {
  title: string;
  submitEndpoint: string;
  submitButtonText: string;
  formBackgroundClass?: string;
  buttonClass?: string;
  dateFieldName: "lostAt" | "foundAt";
  dateLabel: string;
};
export default function LostForm({
  title,
  submitEndpoint,
  submitButtonText,
  formBackgroundClass = "bg-primary",
  buttonClass = "bg-tertiary text-black",
  dateFieldName,
  dateLabel,
}: LostFormProps) {
  const [previewImages, setPreviewImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagsResetCounter, setTagsResetCounter] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setValue, reset } = useForm();
  const user = useMongoUser();
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
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

    const marker = new mapboxgl.Marker({ color: "#1E3A8A" })
      .setLngLat([location.lng, location.lat])
      .addTo(map);

    mapRef.current = map;
    markerRef.current = marker;

    // Geolocalización inicial
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const newLoc = { lat: coords.latitude, lng: coords.longitude };
        setLocation(newLoc);
        setValue("latitude", newLoc.lat);
        setValue("longitude", newLoc.lng);
        map.flyTo({ center: [newLoc.lng, newLoc.lat], zoom: 15 });
        marker.setLngLat([newLoc.lng, newLoc.lat]);
      });
    }

    map.on("click", (e) => {
      const newLoc = { lat: e.lngLat.lat, lng: e.lngLat.lng };
      setLocation(newLoc);
      marker.setLngLat([newLoc.lng, newLoc.lat]);
      setValue("latitude", newLoc.lat);
      setValue("longitude", newLoc.lng);
    });

    return () => map.remove();
  }, []);

  const handleLocationClick = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const newLoc = { lat: coords.latitude, lng: coords.longitude };
        setLocation(newLoc);
        setValue("latitude", newLoc.lat);
        setValue("longitude", newLoc.lng);
        mapRef.current?.flyTo({ center: [newLoc.lng, newLoc.lat], zoom: 15 });
        markerRef.current?.setLngLat([newLoc.lng, newLoc.lat]);
      },
      (error) => {
        showGlobalModal("❌ No se pudo obtener tu ubicación.");
        console.error("Geolocation error:", error);
      }
    );
  };

  const removeImage = (index: number) => {
    const updated = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updated);
    fileInputRef.current!.value = "";
  };

  const onSubmit = async (data: any) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", data.tags);
    formData.append("category", data.category);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("email", data.email);
    formData.append(dateFieldName, data[dateFieldName]);
    formData.append("post_date", new Date().toISOString());

    for (const file of previewImages) {
      if (!validTypes.includes(file.type)) {
        showGlobalModal(
          `❌ El tipo de archivo "${file.name}" no está permitido.`
        );
        return;
      }

      const compressed = await imageCompression(file, {
        maxSizeMB: 5,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        initialQuality: 0.7,
        alwaysKeepResolution: true,
      });

      // Check tamaño tras compresión
      if (compressed.size > MAX_IMAGE_SIZE) {
        showGlobalModal(
          `❌ La imagen "${file.name}" es demasiado grande, comprimela porfavor.`
        );
        return;
      }

      formData.append("images", compressed);
    }

    const res = await fetch(submitEndpoint, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      reset();
      setPreviewImages([]);
      setTagsResetCounter((prev) => prev + 1);
      fileInputRef.current!.value = "";
      showGlobalModal("✅ Enviado correctamente");
    } else {
      showGlobalModal("❌ Error al enviar");
    }
  };

  if (!mapboxToken) {
    return <p className="text-red-600">❌ Falta el token de MAPBOX</p>;
  }

  return (
    <section className="py-20 mx-5 flex flex-col w-full items-center">
      <div className="max-w-full md:container flex flex-col gap-10">
        <h3 className="mx-5 text-5xl font-semibold">{title}</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`space-y-6 z-10 md:flex-row gap-6 items-stretch flex-col-reverse flex text-xl w-full rounded-2xl p-6 card-style ${formBackgroundClass}`}
          noValidate
        >
          <div className="flex-col flex md:w-1/2 gap-6">
            <label className="font-bold">Título</label>
            <input
              {...register("title", { required: true })}
              className="bg-white text-black  card-style2 p-2 border rounded-md"
            />

            <label className="font-bold">Descripción</label>
            <textarea
              {...register("description", { required: true })}
              className="bg-white text-black card-style2 p-2 border rounded-md"
            />

            <TagsInput
              register={register}
              setValue={setValue}
              resetTrigger={tagsResetCounter}
            />

            <label className="font-bold">Categoría</label>
            <select
              {...register("category", { required: true })}
              className="bg-white text-black card-style2 p-2 border rounded-md "
            >
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="font-bold">{dateLabel}</label>
            <input
              type="date"
              {...register(dateFieldName, { required: true })}
              className="bg-white card-style2 p-2 border rounded-md text-black"
            />

            {user?.email && (
              <>
                <label className="font-bold">Correo electrónico</label>
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

            <label className="font-bold">Imágenes (máx. 3)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              className="bg-white text-black border p-2 rounded card-style2"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const allFiles = [...previewImages, ...files];

                if (allFiles.length > 3) {
                  showGlobalModal("❌ Solo puedes subir hasta 3 imágenes");
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
                      type="submit"
                      aria-label="Eliminar imagen"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

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
              aria-label="Enviar formulario"
              type="submit"
              disabled={isSubmitting}
              className={`card-style2 py-2 self-start px-6 font-bold text-xl ${buttonClass} ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Enviando..." : submitButtonText}
            </button>
          </div>

          <div className="flex flex-col flex-1">
            <label className="font-bold">Localización</label>
            <div className="relative aspect-square rounded-xl overflow-hidden card-style2">
              <div ref={mapContainerRef} className="w-full h-full" />
              <button
                aria-label="Obtener ubicación"
                type="button"
                onClick={handleLocationClick}
                className="absolute top-2 right-2 bg-primary text-black p-2 rounded-md shadow"
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
