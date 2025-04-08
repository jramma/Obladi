"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Menu } from "@/components/profile/Menu";
import { useUser } from "@/hooks/UserContext";
import ObjectList from "@/components/search/Objectlist";
import { FaChevronUp } from "react-icons/fa6";
import type { ReactNode } from "react";

type Obj = {
  _id: string;
  title: string;
  description?: string;
  type: "lost" | "reclaim" | "solved";
  solved?: boolean;
};
export default function ObjectLayout({ children }: { children: ReactNode }) {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [objects, setObjects] = useState<{
    lost: Obj[];
    solved: Obj[];
    reclaimed: Obj[];
  }>({ lost: [], solved: [], reclaimed: [] });

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    lost: true,
    solved: true,
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
            objects: user.objects || [],
          }),
        });

        const data = await res.json();

        setObjects({
          lost: data.lost || [],
          reclaimed: data.reclaimed || [],
          solved: data.solved || [],
        });
      } catch (error) {
        console.error("Error fetching objects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchObjects();
  }, [user]);

  const sections = [
    { key: "lost", label: "Objetos encontrados" },
    { key: "solved", label: "Objetos resueltos" },
    { key: "reclaimed", label: "Objetos reclamados" },
  ];

  return (
    <main className="w-full pl-72 flex flex-row flex-grow py-20">
      <Menu />
      <section className="md:w-72 w-full pl-6 text-left">
        <h1 className="text-2xl font-bold mb-6">Los objetos de {user?.name}</h1>

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
                    className="w-full flex items-center text-left pb-3 px-3 justify-between text-xl font-semibold"
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

      <div className="flex-grow justify-center items-center flex px-4">
        {children}
      </div>
    </main>
  );
}
