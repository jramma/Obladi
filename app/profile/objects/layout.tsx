"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Menu } from "@/components/profile/menu";
import { useUser } from "@/context/UserContext";
import ObjectList from "@/components/search/objectlist";
import { FaChevronUp } from "react-icons/fa6";
import type { ReactNode } from "react";

type Obj = { _id: string; title: string; description?: string };

export default function ObjectLayout({ children }: { children: ReactNode }) {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [objects, setObjects] = useState<{
    lost: Obj[];
    found: Obj[];
    reclaimed: Obj[];
  }>({ lost: [], found: [], reclaimed: [] });

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    lost: true,
    found: true,
    reclaimed: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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

  if (!user) redirect("/auth/signin");

  const sections = [
    { key: "lost", label: "Objetos perdidos" },
    { key: "found", label: "Objetos encontrados" },
    { key: "reclaimed", label: "Objetos reclamados" },
  ];

  return (
    <main className="w-full pl-72 flex flex-row flex-grow py-20">
      <Menu />
      <section className="md:w-72 w-full px-6 text-left">
        <h1 className="text-2xl font-bold mb-6">Los objetos de {user.name}</h1>

        {loading ? (
          <div className="flex flex-col gap-4 items-center justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800" />
            <p className="mt-4 text-lg font-medium">Cargando objetos...</p>
          </div>
        ) : Object.values(objects).every((arr) => arr.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <h2 className="text-xl font-semibold">
              No tienes objetos perdidos, encontrados o reclamados
            </h2>
            <p>¡Puedes empezar a buscar objetos perdidos o encontrados!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 border-2 rounded-3xl pt-5   overflow-y-scroll transition-all duration-500 ease-in-out">
            {sections &&
              sections.map(({ key, label }) => (
                <div key={key}>
                  <button
                    onClick={() => toggleSection(key)}
                    className="w-full flex items-center text-left pb-3 px-2 justify-between text-xl font-semibold"
                  >
                    {label}
                    <FaChevronUp
                      className={`transition-transform duration-300 ${
                        openSections[key] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSections[key] && (
                    <ul className=" flex flex-col gap-6 mt-4 max-h-52 overflow-scroll py-5">
                      {objects[key as keyof typeof objects].length >= 1 ? (
                        objects[key as keyof typeof objects].map((obj) => (
                          <ObjectList
                            key={obj._id}
                            obj={obj}
                            objectKey={obj._id}
                          />
                        ))
                      ) : (
                        <p className="p-2">{`No tienes ${label} todavía.`}</p>
                      )}
                    </ul>
                  )}
                  <hr />
                </div>
              ))}
          </div>
        )}
      </section>

      <div className="flex-grow justify-center items-center flex px-4">{children}</div>
    </main>
  );
}
