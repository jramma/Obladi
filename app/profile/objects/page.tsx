"use client";

import { redirect } from "next/navigation";
import { Menu } from "@/components/menu";
import { useUser } from "@/context/UserContext";

export default function ObjPage() {
  const user = useUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main className="container self-center flex flex-row flex-grow justify-end py-20">
      <Menu />
      <section className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">Perfil de {user.name}</h1>
        <ul className="space-y-2">
          <li>
            <strong>Nombre:</strong> {user.name}
          </li>
          <li>
            <strong>Apellidos:</strong> {user.surname}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Rol:</strong> {user.role}
          </li>
          <li>
            <strong>Teléfono:</strong> {user.phone || "No asignado"}
          </li>
          <li>
            <strong>Pines:</strong> {user.pines?.length || 0}
          </li>
          <li>
            <strong>Descripción:</strong>{" "}
            {user.description || "Sin descripción"}
          </li>
          <li>
            <strong>Contribuciones:</strong> {user.contributor}
          </li>
          <li>
            <strong>Ubicación:</strong>{" "}
            {user.location ? user.location.toString() : "No asignada"}
          </li>
          <li>
            {new Date(user.time).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </li>
        </ul>
      </section>
    </main>
  );
}
