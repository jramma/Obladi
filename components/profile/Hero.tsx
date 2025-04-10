"use client";

import Image from "next/image";
import { loreleiNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useState } from "react";

export default function Hero({ user }: any) {
  const [description, setDescription] = useState(user.description || "");
  const [originalDescription, setOriginalDescription] = useState(user.description || "");
  const [picture, setPicture] = useState(user.picture || "");
  const [isEditing, setIsEditing] = useState(false);

  const avatarSvg = createAvatar(loreleiNeutral, {
    seed: user.name || "avatar",
  }).toDataUri();
  const imageSrc = picture || avatarSvg;

  const handleChangePicture = async () => {
    const newUrl = prompt("Introduce la URL de la nueva imagen:");
    if (newUrl) {
      setPicture(newUrl);
      await fetch("/api/user/profile", {
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
    await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        picture: "",
      }),
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (!isEditing) setIsEditing(true);
  };

  const handleCancel = () => {
    setDescription(originalDescription);
    setIsEditing(false);
  };

  const handleSave = async () => {
    await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        description,
      }),
    });
    setOriginalDescription(description);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-start gap-6 p-6">
      <p className="text-4xl font-light">
        {user.name} {user.surname}
      </p>

      <div className="flex flex-row items-center gap-6 md:gap-20 w-full md:px-6">
        <Image
          src={imageSrc}
          alt={user.name}
          width={150}
          height={150}
          className="rounded-full border-3 border-black dark:border-white"
        />
        <div className="flex flex-wrap gap-4 mt-2">
          <button
            onClick={handleChangePicture}
            className="card-style px-6 py-2 bg-secondary hover:shadow-secondary hover:bg-black hover:text-white transition font-bold"
          >
            Cambiar foto
          </button>
          <button
            onClick={handleRemovePicture}
            disabled={!picture}
            className={`px-4 py-2 font-bold transition ${
              picture
                ? "bg-primary hover:shadow-primary card-style hover:bg-black hover:text-white"
                : "bg-gray-300 text-gray-600 !cursor-not-allowed card-style1"
            }`}
          >
            Eliminar foto
          </button>
        </div>
      </div>

      <label htmlFor="bio" className="font-semibold">
        Biografía
      </label>
      <div className="w-full relative">
        <textarea
          id="bio"
          value={description}
          onChange={handleDescriptionChange}
          className="card-style w-full min-h-40 p-4 rounded resize-none"
          placeholder="Cuéntanos algo sobre ti..."
        />
        {isEditing && (
          <div className="flex gap-4 mt-2 absolute right-6 bottom-6">
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-tertiary card-style2 rounded font-bold  transition"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-primary card-style2 rounded font-bold  transition"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
}
