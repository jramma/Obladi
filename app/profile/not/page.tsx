"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { Menu } from "@/components/profile/menu";
import { useUser } from "@/context/UserContext";
import Toggle from "@/components/form/toggle";

export default function NotPages() {
  const user = useUser();

  const [notifications, setNotifications] = useState({
    mailing: true,
    chat: true,
    reclaimed: true,
    found: true,
    lostNearby: true,
  });

  if (!user) {
    redirect("/auth/signin");
  }

  const handleToggle = (key: keyof typeof notifications, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    // 👉 Aquí podés hacer un fetch a la API para guardar preferencia
  };

  return (
    <main className="container self-center flex flex-row flex-grow justify-end py-20">
      <Menu />
      <section className="md:w-3/4">
        <h1 className="text-2xl font-bold mb-4">Desactivar notificaciones</h1>
        <ul className="space-y-4">
          <Toggle
            label="Notificaciones por correo"
            initial={notifications.mailing}
            onToggle={(value) => handleToggle("mailing", value)}
          />
          <Toggle
            label="Notificaciones de chat"
            initial={notifications.chat}
            onToggle={(value) => handleToggle("chat", value)}
          />
          <Toggle
            label="Cuando alguien reclama un objeto tuyo"
            initial={notifications.reclaimed}
            onToggle={(value) => handleToggle("reclaimed", value)}
          />
          <Toggle
            label="Cuando alguien encuentra un objeto perdido tuyo"
            initial={notifications.found}
            onToggle={(value) => handleToggle("found", value)}
          />
          <Toggle
            label="Cuando hay objetos perdidos en tu zona"
            initial={notifications.lostNearby}
            onToggle={(value) => handleToggle("lostNearby", value)}
          />
        </ul>
      </section>
    </main>
  );
}
