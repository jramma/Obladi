"use client";

import { useEffect, useState } from "react";
import ObjectList from "@/components/search/Objectlist";
import { FaChevronUp } from "react-icons/fa6";
import type { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

import { useMongoUser } from "@/hooks/UseMongoUser";
type Obj = {
  _id: string;
  title: string;
  description?: string;
  type: "lost" | "reclaim" | "solved";
  solved?: boolean;
};
export default function ObjectLayout({ children }: { children: ReactNode }) {
  const user = useMongoUser();
  const router = useRouter();
  const pathname = usePathname();

  const isObjectOpen = pathname?.match(/^\/profile\/objects\/.+/);

  const [loading, setLoading] = useState(true);
  const [objects, setObjects] = useState<{
    lost: Obj[];
    solved: Obj[];
    reclaimed: Obj[];
  }>({ lost: [], solved: [], reclaimed: [] });

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    lost: false,
    solved: false,
    reclaimed: false,
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
        // 👇 Autoabrir solo si hay objetos
        setOpenSections({
          lost: data.lost?.length > 0,
          solved: data.solved?.length > 0,
          reclaimed: data.reclaimed?.length > 0,
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
    { key: "lost", label: "Objetos encontrados sin dueño" },
    { key: "solved", label: "Objetos resueltos" },
    { key: "reclaimed", label: "Objetos reclamados" },
  ];

  return (
    <main className="max-w-full w-full flex flex-col-reverse md:flex-row flex-grow overflow-hidden telative">
      <section className=" max-w-96 min-h-full bg-white dark:bg-black h-full flex-grow flex flex-col py-20 px-6">
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
          <div className="flex flex-col  gap-10 pt-5 transition-all duration-500 ease-in-out ">
            {sections &&
              sections.map(({ key, label }) => (
                <div key={key} className="card-style dark:bg-slate-600">
                  <button
                    aria-label="toggle-section"
                    onClick={() => toggleSection(key)}
                    className="w-full flex items-center  px-3 py-4 text-left   justify-between text-xl font-semibold"
                  >
                    {label}
                    <FaChevronUp
                      className={`transition-transform duration-300 ${
                        openSections[key] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSections[key] && (
                    <ul className="dark:bg-black rounded-b-3xl flex flex-col gap-6  py-5">
                      {objects[key as keyof typeof objects].length >= 1 ? (
                        objects[key as keyof typeof objects].map((obj) => (
                          <ObjectList
                            key={obj._id}
                            obj={obj}
                            objectKey={obj._id}
                          />
                        ))
                      ) : (
                        <p className="p-4">{`No tienes ${label} todavía.`}</p>
                      )}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        )}
      </section>
      {isObjectOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/70 dark:bg-black/70 backdrop-blur-lg z-40 flex pt-20 flex-col">
          <div className="flex justify-end p-4">
            <button
              arial-label="Cerrar objetos"
              onClick={() => router.push("/profile/objects")}
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              <FaTimes className="text-black dark:text-white text-xl" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4">{children}</div>
        </div>
      )}
    </main>
  );
}
