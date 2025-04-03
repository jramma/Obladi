"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  imgs: string[];
  title: string;
};

export default function ImageList({ imgs, title }: Props) {
  const [signedUrls, setSignedUrls] = useState<string[]>([]);

  // 🔑 Cliente: obtiene la URL firmada desde la API
  const getSignedImageUrl = async (key: string): Promise<string> => {
    const res = await fetch(`/api/image-url?key=${encodeURIComponent(key)}`);
    const data = await res.json();
    return data.url;
  };

  useEffect(() => {
    const fetchUrls = async () => {
      const urls = await Promise.all(imgs.map((img) => getSignedImageUrl(img)));
      setSignedUrls(urls);
    };

    if (imgs?.length > 0) {
      fetchUrls();
    }
  }, [imgs]);

  return (
    <div className="flex flex-wrap gap-4">
      {signedUrls.map((url, i) => (
        <Image
          key={i}
          src={url}
          alt={`Imagen ${i + 1} de ${title}`}
          className="rounded-lg"
          width={200}
          height={200}
        />
      ))}
    </div>
  );
}
