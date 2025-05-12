"use client";

import { useState } from "react";

interface NicknameProps {
  email: string;
  initialNickname: string;
}

export default function Nickname({ email, initialNickname }: NicknameProps) {
  const [nickname, setNickname] = useState(initialNickname || "");
  const [originalNickname, setOriginalNickname] = useState(
    initialNickname || ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(
    null
  );

  const checkNicknameAvailability = async (nick: string) => {
    const res = await fetch(`/api/user/check-nickname?nickname=${nick}`);
    const { available } = await res.json();
    return available;
  };

  const handleSave = async () => {
    if (nickname === originalNickname) {
      setIsEditing(false);
      return;
    }

    const available = await checkNicknameAvailability(nickname);
    setNicknameAvailable(available);

    if (!available) return;

    await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        nickname,
        nicknameEditedAt: new Date().toISOString(),
      }),
    });

    setOriginalNickname(nickname);
    setIsEditing(false);
    setNicknameAvailable(true);
  };

  const handleCancel = () => {
    setNickname(originalNickname);
    setIsEditing(false);
    setNicknameAvailable(null);
  };

  return (
    <div className="w-full z-10">
      <label htmlFor="nickname" className="font-semibold text-xl">
        Nickname
      </label>
      <div className="relative w-full flex gap-2 items-center mt-1">
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => {
            if (isEditing) {
              setNickname(e.target.value);
              setNicknameAvailable(null);
            }
          }}
          readOnly={!isEditing}
          className={`card-style w-full p-4 rounded ${isEditing ? "" : "opacity-60"}`}
          placeholder="@nickname"
        />

        {!isEditing ? (
          <button
            arial-label="Editar nickname"  
          onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-slate-500 rounded-full font-bold text-white"
          >
            Editar
          </button>
        ) : (
          <>
            <button
              arial-label="Guardar nickname"
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 rounded-full font-bold text-white"
            >
              Guardar
            </button>
            <button
              arial-label="Cancelar edición de nickname"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 rounded-full font-bold text-white"
            >
              Cancelar
            </button>
          </>
        )}
      </div>
      {nicknameAvailable === false && (
        <p className="text-sm text-red-500 mt-1">
          Este nickname ya está en uso.
        </p>
      )}
      {nicknameAvailable === true && (
        <p className="text-sm text-green-600 mt-1">¡Nickname actualizado!</p>
      )}
    </div>
  );
}
