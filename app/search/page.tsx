"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { LostObject } from "@/types/types";
import ObjectCard from "@/components/search/ObjectCard";
import Image from "next/image";
import { useMemo } from "react";
import { Icons } from "@/components/Icons";
import { useMongoUser } from "@/hooks/UseMongoUser";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const user = useMongoUser();
  const { query, tags, location } = useMemo(() => {
    if (!searchParams) return { query: "", tags: [], location: "" };

    return {
      query: searchParams.get("query")?.toLowerCase() || "",
      tags: searchParams.getAll("tags").flatMap((t) => t.split(",")),
      location: searchParams.get("location")?.toLowerCase() || "",
    };
  }, [searchParams]);
  const [results, setResults] = useState<LostObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return; // 🧠 Espera a que el email esté disponible
  
    const isQueryValid = query && query.trim() !== "";
    const areTagsValid = tags && tags.length > 0 && tags.some((t) => t.trim() !== "");
    const isLocationValid = location && location.trim() !== "";
  
    if (!isQueryValid && !areTagsValid && !isLocationValid) {
      setResults([]);
      setLoading(false);
      return;
    }
  
    const fetchResults = async () => {
      setLoading(true);
  
      try {
        const res = await fetch("/api/objects/filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            tags,
            location,
            email: user.email, // ✅ Ahora sí
          }),
        });
  
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Error buscando objetos perdidos:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchResults();
  }, [query, tags.join(","), location, user?.email]);
  
  
  return (
      <section className="max-w-full py-20 flex flex-col gap-10 overflow-hidden">
        <h2 className="text-4xl font-light z-20  dark:bg-black p-3">
          Resultados de búsqueda
        </h2>
        {loading ? (
          <p className="p-5">Cargando resultados...</p>
        ) : results.length === 0 ? (
          <>
            <p className=" z-20 bg-white dark:bg-black p-3 text-xl">
              No se han encontrado objetos perdidos.
            </p>
            <Image
              src={"/noObjects.svg"}
              alt="No hay objetos perdidos"
              width={300}
              height={300}
              className="mx-auto dark:bg-white rounded-full z-20"
            />
            <Icons.topography className="absolute -z-10 opacity-30 aniamte-pulse" />
          </>
        ) : (
          <div className="flex flex-col md:min-w-[700px] gap-12 pb-40">
            {results.map((obj) => (
              <ObjectCard obj={obj} objectKey={obj._id} />
            ))}
          </div>
        )}
      </section>
  );
}
