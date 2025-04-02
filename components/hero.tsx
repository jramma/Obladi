"use client";

import Image from "next/image";
import { notionistsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useState, useEffect } from "react";

export default function Hero({ user }: any) {
  const [description, setDescription] = useState(user.description || "");
  const [picture, setPicture] = useState(user.picture || "");

  const avatarSvg = createAvatar(notionistsNeutral, {
    seed: user.name || "avatar",
  }).toDataUri();
  const imageSrc = picture || avatarSvg;

  // 👉 Debounce: espera 1s después de teclear antes de guardar
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          description,
        }),
      });
    }, 1000); // espera 1s sin cambios

    return () => clearTimeout(timeout); // limpia si vuelve a teclear
  }, [description]);

  const handleChangePicture = async () => {
    const newUrl = prompt("Introduce la URL de la nueva imagen:");
    if (newUrl) {
      setPicture(newUrl);
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          picture: newUrl,
        }),
      });
    }
  };

  const handleRemovePicture = async () => {
    setPicture("");
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        picture: "",
      }),
    });
  };

  return (
    <div className="flex flex-col items-start gap-6 p-6">
      <p className="text-4xl font-light">
        {user.name} {user.surname}
      </p>

      <div className="flex flex-row items-center gap-20 w-full px-6">
        <Image
          src={imageSrc}
          alt={user.name}
          width={150}
          height={150}
          className="rounded-full border-3 border-black dark:border-white"
        />
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleChangePicture}
            className="card-style2 px-6 py-2 bg-secondary hover:shadow-secondary hover:bg-black hover:text-white transition font-bold"
          >
            Cambiar foto
          </button>
          <button
            onClick={handleRemovePicture}
            disabled={!picture}
            className={`card-style2 px-4 py-2 font-bold transition ${
              picture
                ? "bg-primary hover:shadow-primary hover:bg-black hover:text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Eliminar foto
          </button>
        </div>
      </div>

      <label htmlFor="bio" className="font-semibold">
        Biografía
      </label>
      <textarea
        id="bio"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="card-style w-full min-h-40 p-4 rounded resize-none"
        placeholder="Cuéntanos algo sobre ti..."
      />
    </div>
  );
}
