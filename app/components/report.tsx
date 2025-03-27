"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSession } from "next-auth/react"; // Verificamos la sesión
import { useTheme } from "next-themes";
import ProtectedForm from "./ProtectedForm"; // Importamos el nuevo componente
import Form from "next/form";

const categories = ["Electrónica", "Ropa", "Documentos", "Accesorios", "Otros"];

export default function Report() {
  const { register, handleSubmit } = useForm();
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.006 });
  const { theme } = useTheme();
  const { data: session } = useSession(); // Comprobamos la sesión del usuario
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Estado para mostrar el popup de login

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error(
      "⚠️ Falta la API key de Google Maps. Agrega NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en .env.local"
    );
    return <p>Error: API Key no configurada</p>;
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  const handleReportSubmit = (data: any) => {
    if (!session) {
      setIsLoginModalOpen(true); // Mostrar el popup si no está logueado
    } else {
      // Aquí iría el código para enviar el reporte
      console.log("Reporte enviado:", data);
    }
  };

  return (
    <section className="py-20 flex w-full">
      <div className="container flex flex-col gap-10">
        <h3 className="text-5xl font-light w-full md:mb-8 leading-11">
          Reportar objeto perdido
        </h3>

        {/* Usamos ProtectedForm para manejar el estado del modal */}
        <ProtectedForm
          isOpen={isLoginModalOpen}
          closeLoginModal={() => setIsLoginModalOpen(false)}
        />

        {/* Formulario de Reporte */}
        <Form
          action="/report"
          onSubmit={handleSubmit(handleReportSubmit)} // Envío del formulario
          className="space-y-6 text-[#000000] md:flex-row gap-6 items-stretch flex-col-reverse flex bg-primary text-xl w-full rounded-2xl p-6 card-style"
        >
          <div className="flex-col flex md:w-1/2 gap-6">
            <div className="flex-col flex gap-3">
              <label className="block font-bold">Título</label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="bg-white card-style2 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex-col flex gap-3">
              <label className="block font-bold">Descripción</label>
              <textarea
                {...register("description", { required: true })}
                className="card-style2 mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex-col flex gap-3">
              <label className="block font-bold">Tags</label>
              <input
                type="text"
                {...register("tags")}
                className="card-style2 mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
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
              <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={location}
                  zoom={15}
                  onClick={(e) => {
                    if (e.latLng) {
                      setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                    } else {
                      console.warn("e.latLng es null");
                    }
                  }}
                >
                  <Marker position={location} />
                </GoogleMap>
              </LoadScript>
              <button
                type="button"
                onClick={handleLocationClick}
                className="absolute top-2 right-2 bg-primary text-white p-2 rounded-md shadow-md"
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
