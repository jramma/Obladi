// components/Cabecera.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import DesktopHeader from "@/components/scaffolding/DesktopHeader";

export default function Cabecera() {
  const isMobile = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    if (isMobile) {
      router.push("/auth/signin");
    }
  }, [isMobile, router]);

  // Puedes mostrar un spinner mientras redirige
  if (isMobile) return null;

  return <DesktopHeader />;
}
