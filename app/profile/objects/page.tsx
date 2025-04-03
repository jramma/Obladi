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

  useEffect(() => {
    if (!user) return;

    const fetchObjects = async () => {
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
    };

    fetchObjects();
  }, [user]);

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main className="container self-center flex flex-row flex-grow justify-end py-20">
      <Menu />
      {objects.lost.length === 0 &&
        objects.found.length === 0 &&
        objects.reclaimed.length === 0 && (
          <section className=" w-3/4 flex flex-col gap-4 p-6 flex-grow items-center justify-center">
            <h2 className="text-xl font-semibold">
              No tienes objetos perdidos, encontrados o reclamados
            </h2>
            <p className="">
              ¡Puedes empezar a buscar objetos perdidos o encontrados!
            </p>
          </section>
        )}
      :
      {
        <section className="w-3/4 flex flex-col gap-8 relative">
          <nav className="fixed w-full bg-[#ffffff] flex items-center justify-start gap-4 p-4 card-style z-20">
            <a href="#lost">Objetos perdidos</a>|
            <a href="#found">Objetos encontrados</a>|
            <a href="#reclaimed">Objetos reclamados</a>
          </nav>
          <h1 className="text-2xl font-bold mb-4">Objetos de {user.name}</h1>
          <div className="flex flex-col max-w-[700px] gap-4">
            <h2 id="lost" className="text-xl font-semibold ">
              Objetos perdidos
            </h2>
            <ul className="pl-6 flex-col flex gap-6">
              {objects.lost &&
                objects.lost.map((obj: any) => (
                  <Object obj={obj} key={obj._id} />
                ))}
            </ul>

            <h2 id="found" className="text-xl font-semibold ">
              Objetos encontrados
            </h2>
            <ul className="pl-6 flex-col flex gap-6">
              {objects.found &&
                objects.found.map((obj: any) => (
                  <Object obj={obj} key={obj._id} />
                ))}
            </ul>

            <h2 id="reclaimed" className="text-xl font-semibold">
              Objetos reclamados
            </h2>
            <ul className="pl-6 flex-col flex gap-6">
              {objects.reclaimed &&
                objects.reclaimed.map((obj) => (
                  <Object obj={obj} key={obj._id} />
                ))}
            </ul>
          </div>
        </section>
      }
    </main>
  );
}
