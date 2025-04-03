"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Menu } from "@/components/menu";
import { useUser } from "@/context/UserContext";
import Object from "@/components/search/object";

type Obj = { _id: string; title: string; description?: string };

export default function ObjPage() {
  const user = useUser();
  const [objects, setObjects] = useState<{
    lost: Obj[];
    found: Obj[];
    reclaimed: Obj[];
  }>({ lost: [], found: [], reclaimed: [] });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchObjects = async () => {
      try {
        const res = await fetch("/api/user/objects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lostObjects: user.lostObjects || [],
            foundObjects: user.foundObjects || [],
            reclaimedObjects: user.reclaimedObjects || [],
          }),
        });

        const data = await res.json();
        setObjects(data);
      } catch (error) {
        console.error("Error fetching objects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchObjects();
  }, [user]);

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main className="container self-center flex flex-row flex-grow justify-end py-20">
      <Menu />

      {loading ? (
        <section className="w-3/4 flex flex-col gap-4 p-6 flex-grow items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800" />
          <p className="mt-4 text-lg font-medium">Cargando objetos...</p>
        </section>
      ) : objects.lost.length === 0 &&
        objects.found.length === 0 &&
        objects.reclaimed.length === 0 ? (
        <section className="w-3/4 flex flex-col gap-4 p-6 flex-grow items-center justify-center">
          <h2 className="text-xl font-semibold">
            No tienes objetos perdidos, encontrados o reclamados
          </h2>
          <p className="">
            ¡Puedes empezar a buscar objetos perdidos o encontrados!
          </p>
        </section>
      ) : (
        <section className="md:w-3/4 flex flex-col gap-8 relative w-full">
          <nav className="fixed w-full bg-[#ffffff] flex items-center justify-start gap-4 p-4 card-style z-10">
            <a href="#lost">Objetos perdidos</a>|
            <a href="#found">Objetos encontrados</a>|
            <a href="#reclaimed">Objetos reclamados</a>
          </nav>

          <h1 className="text-2xl font-bold  pt-40 md:pt-8">
            Tus objetos, {user.name}
          </h1>
          <div className="flex flex-col max-w-[700px] gap-4">
            <h2 id="lost" className="text-xl font-semibold">
              Objetos perdidos
            </h2>
            <ul className="md:pl-6 flex-col flex gap-6">
              {objects.lost.map((obj) => (
                <Object key={obj._id} obj={obj} objectKey={obj._id} />
              ))}
            </ul>

            <h2 id="found" className="text-xl font-semibold">
              Objetos encontrados
            </h2>
            <ul className="md:pl-6 flex-col flex gap-6">
              {objects.found.map((obj) => (
                <Object key={obj._id} obj={obj} objectKey={obj._id} />
              ))}
            </ul>

            <h2 id="reclaimed" className="text-xl font-semibold">
              Objetos reclamados
            </h2>
            <ul className="md:pl-6 flex-col flex gap-6">
              {objects.reclaimed.map((obj) => (
                <Object key={obj._id} obj={obj} objectKey={obj._id} />
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
