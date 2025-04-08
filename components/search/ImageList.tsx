"use client";

import { useEffect, useState } from "react";

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
        <img
          key={i}
          src={url}
          alt={`Imagen ${i + 1} de ${title}`}
          className="rounded-lg max-w-60 max-h-60"
        />
      ))}
    </div>
  );
}
