"use client";

import { useEffect, useState } from "react";
import Object from "@/components/search/object";

export default function ObjectPage({
  params,
}: {
  params: { objectId: string };
}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.objectId) return;

    const fetchData = async () => {
      const res = await fetch(`/api/object?id=${params.objectId}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    };

    fetchData();
  }, [params.objectId]);

  if (loading) return <p className="p-4">Cargando objeto...</p>;
  if (!data || !data.object)
    return <p className="p-4">Objeto no encontrado.</p>;

  return (
    <div className="w-full p-6 ">
      <Object obj={data.object} objectKey={params.objectId} />
    </div>
  );
}
