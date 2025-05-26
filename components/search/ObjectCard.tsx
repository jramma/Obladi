"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMongoUser } from "@/hooks/UseMongoUser";
import { showGlobalModal } from "@/components/GlobalModal";

export default function ObjectCard({ obj, objectKey }: any) {
  const user = useMongoUser();
  const router = useRouter();
  const [signedImage, setSignedImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchSignedImage = async () => {
      if (obj.imgs?.[0]) {
        const res = await fetch(
          `/api/image-url?key=${encodeURIComponent(obj.imgs[0])}`
        );
        const data = await res.json();
        setSignedImage(data.url);
      }
    };
    fetchSignedImage();
  }, [obj.imgs]);

  const handleReclaim = async () => {
    const res = await fetch("/api/chats/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        objectId: obj._id,
        ownerEmail: obj.email,
      }),
    });

    if (res.ok) {
      showGlobalModal("✅ Chat creado o ya existente. Redirigiendo...");
      router.push("/profile/chat");
    } else {
      showGlobalModal("❌ No se pudo crear el chat.");
    }
  };

  const handleMarkAsFound = async () => {
    const res = await fetch("/api/objects/solved", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ objectId: obj._id }),
    });

    if (res.ok) {
      showGlobalModal("✅ Objeto marcado como entregado");
      router.refresh();
    } else {
      showGlobalModal("❌ No se pudo actualizar el objeto");
    }
  };

  return (
    <div
      key={objectKey}
      className="card-style w-full flex flex-col gap-4 p-4 md:p-6 max-w-full"
    >
      {/* 📱 MOBILE: desplegable con título + imagen */}
      <div className="block md:hidden">
        <button
          type="button"
          aria-label="Desplegar objeto"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex flex-col gap-4 justify-center md:flex-row items-center font-bold text-3xl transition"
        >
          <span>{obj.title}</span>
          {signedImage && (
            <Image
              src={signedImage}
              alt={`Imagen principal de ${obj.title}`}
              width={100}
              height={100}
              className="rounded-lg max-w-full h-auto"
            />
          )}
          <div className="w-full rounded-xl bg-gray-600 text-white flex justify-center">
            {isOpen ? (
              <ChevronUp className="w-10 h-10" />
            ) : (
              <ChevronDown className="w-10 h-10" />
            )}
          </div>
        </button>

        {isOpen && (
          <div className="mt-2 flex flex-col gap-4">
            <p className="font-bold">Descripción:</p>
            <p className="border-2 rounded-md p-2">{obj.description}</p>

            <p className="font-bold">Ubicación:</p>
            <p>{obj.location}</p>

            <div className="flex gap-2 mt-2 flex-wrap">
              {obj.tags.length > 1 &&
                obj.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="bg-tertiary text-sm px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
            </div>

            {user?.email !== obj.email ? (
              <button
                type="button"
                aria-label="Reclamar objeto"
                onClick={handleReclaim}
                className="bg-tertiary font-bold text-lg self-start px-6 py-2 card-style hover:shadow-tertiary"
              >
                Reclamar
              </button>
            ) : obj.type !== "solved" ? (
              <button
                type="button"
                aria-label="Objeto entregado"
                onClick={handleMarkAsFound}
                className="bg-primary font-semibold text-lg self-start px-6 py-2 card-style hover:shadow-primary"
              >
                Objeto entregado
              </button>
            ) : (
              <span className="italic text-gray-500">
                Este objeto ya fue entregado
              </span>
            )}
          </div>
        )}
      </div>

      {/* 🖥️ DESKTOP: diseño original sin cambios */}
      <div className="hidden md:flex flex-col gap-4">
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-4 w-full justify-between">
            <div className="flex flex-col gap-2 flex-1">
              <p className="font-bold">Objeto:</p>
              <h3 className="text-xl font-bold mb-2">{obj.title}</h3>
              <p className="font-bold">Descripción:</p>
              <p className="border-2 rounded-md p-2 min-h-20">
                {obj.description}
              </p>
              <p className="font-bold">Ubicación:</p>
              <p>{obj.location}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {obj.tags.length > 1 &&
                  obj.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="bg-tertiary text-sm px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {signedImage && (
            <Image
              src={signedImage}
              alt={`Imagen principal de ${obj.title}`}
              width={100}
              height={100}
              className="rounded-lg max-w-full h-auto"
            />
          )}
        </div>

        <div className="flex flex-col gap-4 items-end">
          {user?.email !== obj.email ? (
            <button
              type="button"
              aria-label="Reclamar objeto"
              onClick={handleReclaim}
              className="bg-tertiary font-bold text-xl px-8 py-3 card-style hover:shadow-tertiary"
            >
              Reclamar
            </button>
          ) : obj.type !== "solved" ? (
            <button
              type="button"
              aria-label="Objeto entregado"
              onClick={handleMarkAsFound}
              className="bg-primary font-semibold text-xl px-8 py-3 card-style hover:shadow-primary"
            >
              Objeto entregado
            </button>
          ) : (
            <span className="italic text-gray-500">
              Este objeto ya fue entregado
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
