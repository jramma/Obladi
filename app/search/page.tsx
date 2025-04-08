"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LostObject } from "@/types/types";
import Object from "@/components/search/Object";
import Image from "next/image";
import Waves from "@/components/animation/Waves";


export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const tags = searchParams.getAll("tags").flatMap((t) => t.split(",")).filter(Boolean);
  const location = searchParams.get("location")?.toLowerCase() || "";

  const [results, setResults] = useState<LostObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, tags, location }),
        });

        const data = await res.json();
        setResults(data.results);
      } catch (err) {
        console.error("Error buscando objetos perdidos:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, tags.join(","), location]);

  return (
    <section className="container py-20 flex flex-col gap-10">
      <h2 className="text-4xl font-light z-20 bg-white rounded-full card-style dark:bg-black p-3">Resultados de búsqueda</h2>
      {loading ? (
        <p>Cargando resultados...</p>
      ) : results.length === 0 ? (
        <>
          <p className=" z-20 bg-white dark:bg-black p-3 card-style">
            No se han encontrado objetos perdidos.
          </p>
          <Image
            src={"/noObjects.svg"}
            alt="No hay objetos perdidos"
            width={300}
            height={300}
            className="mx-auto bg-white rounded-full z-20"
          />
          <Waves
            lineColor="currentColor"
            backgroundColor="rgba(255, 255, 255, 0.2)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </>
      ) : (
        <div className="flex flex-col min-w-[700px] gap-12">
          {results.map((obj) => (
            <Object obj={obj} objectKey={obj._id} />
          ))}
        </div>
      )}
    </section>
  );
}
