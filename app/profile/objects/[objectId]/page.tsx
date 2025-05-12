"use client";

import { useEffect, useState } from "react";
import Object from "@/components/search/Object";

export default function ObjectPage({ params }: { params: { objectId: string } }) {
  const [object, setObject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.objectId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/objects/details?id=${params.objectId}`);
        const json = await res.json();

        if (!res.ok || !json?.object) {
          setError("Objeto no encontrado.");
        } else {
          setObject(json.object);
        }
      } catch (err) {
        console.error("Error al cargar el objeto:", err);
        setError("Error al cargar el objeto.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.objectId]);

  if (loading) return <p className="p-4">Cargando objeto...</p>;
  if (error) return <p className="p-4">{error}</p>;

  return (
    <div className="w-full p-6">
      <Object obj={object} objectKey={params.objectId} />
    </div>
  );
}
