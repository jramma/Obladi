"use client";

import Image from "next/image";
import { loreleiNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

export default function Hero({ user }: any) {
  const [description, setDescription] = useState(user.description || "");
  const [originalDescription, setOriginalDescription] = useState(
    user.description || ""
  );
  const [picture, setPicture] = useState(user.picture || "");
  const [signedUrl, setSignedUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const avatarSvg = createAvatar(loreleiNeutral, {
    seed: user.name || "avatar",
  }).toDataUri();

  // 🔁 Obtiene la URL firmada al cargar o cambiar `picture`
  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (picture?.startsWith("profile/")) {
        try {
          const res = await fetch(`/api/signed-url?key=${picture}`);
          const data = await res.json();
          setSignedUrl(data.url);
        } catch (err) {
          console.error("No se pudo obtener la URL firmada", err);
        }
      } else {
        setSignedUrl(picture || avatarSvg);
      }
    };

    fetchSignedUrl();
  }, [picture]);

  const handleChangePicture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 512,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("email", user.email);

      const upload = await fetch("/api/user/upload", {
        method: "POST",
        body: formData,
      });

      const { imageUrl } = await upload.json();

      setPicture(imageUrl);

      await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          picture: imageUrl,
        }),
      });
    } catch (err) {
      console.error("Error al procesar la imagen:", err);
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

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
    <div className="flex flex-col gap-6 p-6 w-full">
      <p className="text-4xl  self-center font-semibold">
        {user.name} {user.surname}
      </p>
      <div className="flex w-full  flex-col items-center gap-6 md:gap-20 md:px-6">
        <Image
          src={signedUrl || avatarSvg}
          alt={user.name}
          width={150}
          height={150}
          className="rounded-full border-3 border-black dark:border-white"
        />

        <div className="flex flex-wrap self-center items-center gap-4 mt-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleChangePicture}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="card-style px-6 py-2 shadow-secondary hover:bg-black hover:text-white transition font-bold cursor-pointer"
          >
            Cambiar
          </label>

          <button
            type="button"
            arial-label="Eliminar foto de perfil"
            onClick={handleRemovePicture}
            disabled={!picture}
            className={`px-4 py-2 font-bold transition ${
              picture
                ? "shadow-primary card-style hover:bg-black hover:text-white"
                : "bg-gray-300 text-gray-600 !cursor-not-allowed card-style1"
            }`}
          >
            Eliminar
          </button>
        </div>
      </div>
      {/* <Nickname email={user.email} initialNickname={user.nickname} /> */}
      <label htmlFor="bio" className="font-semibold text-xl">
        Nickname
      </label>
      <p>{user.nickname || "No nickname"}</p>
      <label htmlFor="bio" className="font-semibold text-xl">
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
              arial-label="Guardar cambios"
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-tertiary card-style2 rounded font-bold  transition"
            >
              Guardar
            </button>
            <button
              arial-label="Cancelar cambios"
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
