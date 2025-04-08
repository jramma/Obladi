"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Menu } from "@/components/profile/Menu";

export default function AccountPage() {
  const user = useUser();
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [form, setForm] = useState({
    email: user?.email || "",
    name: user?.name || "",
    surname: user?.surname || "",
    phone: user?.phone || "",
    description: user?.description || "",
    location: user?.location || "",
    gender: user?.gender || "",
  });

  const handleChange = (e:any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("✅ Perfil actualizado con éxito");
    } else {
      alert("❌ Hubo un error al actualizar");
    }
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert("La geolocalización no está soportada en este navegador.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          const locationName =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.display_name;

          setForm((prev) => ({
            ...prev,
            location: locationName,
          }));
        } catch (err) {
          console.error("Error al obtener la localidad:", err);
          alert("No se pudo obtener la ubicación.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Error al obtener tu ubicación.");
        setLoadingLocation(false);
      }
    );
  };

  if (!user) return <p>Cargando perfil...</p>;

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, location: value }));

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(async () => {
        if (value.length < 2) {
          setSuggestions([]);
          return;
        }

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              value
            )}&limit=5`
          );
          const data = await res.json();

          const names = data.map((place: any) => place.display_name);
          setSuggestions(names);
        } catch (err) {
          console.error("Error buscando localidades:", err);
        }
      }, 400)
    );
  };

  const handleSuggestionClick = (suggestion: string) => {
    setForm((prev) => ({ ...prev, location: suggestion }));
    setSuggestions([]);
  };

  return (
    <main className="container self-center flex flex-row justify-end py-10 md:py-20">
      <Menu />
      <section className="w-full md:w-3/4 flex flex-col items-start py-10 md:py-20">
        <h1 className="text-4xl font-light mb-12">Editar perfil</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-96">
          <p>Email: {form.email}</p>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="card-style px-3 py-1 w-full"
          />
          <input
            name="surname"
            value={form.surname}
            onChange={handleChange}
            placeholder="Apellidos"
            className="card-style px-3 py-1 w-full"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            className="card-style px-3 py-1 w-full"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  name="location"
                  value={form.location}
                  onChange={handleLocationChange}
                  placeholder="Ubicación"
                  className="card-style px-3 py-1 w-full"
                  autoComplete="off"
                />
                {suggestions.length > 0 && (
                  <ul className="absolute bg-white dark:bg-black card-style w-full z-10 rounded shadow max-h-40 overflow-auto">
                    {suggestions.map((s, i) => (
                      <li
                        key={i}
                        onClick={() => handleSuggestionClick(s)}
                        className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer text-sm"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="button"
                onClick={handleGeolocate}
                disabled={loadingLocation}
                className="px-5 py-1 bg-gray-200 card-style rounded hover:bg-gray-300 text-sm"
              >
                {loadingLocation ? "..." : "📍"}
              </button>
            </div>
          </div>
          <input
            name="gender"
            value={form.gender}
            onChange={handleChange}
            placeholder="Género"
            className="card-style px-3 py-1 w-full"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="card-style px-3 py-2 w-full"
          />
          <div className="flex flex-wrap gap-6">
            <button
              type="submit"
              className="card-style bg-secondary  font-bold hover:bg-white dark:bg-black hover:shadow-secondary hover:text-secondary transition px-4 py-2  self-start"
            >
              Guardar cambios
            </button>
            <button
              type="submit"
              className="card-style bg-primary  font-bold hover:bg-white dark:bg-black hover:shadow-primary hover:text-primary transition px-4 py-2  self-start"
            >
              Eliminar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
