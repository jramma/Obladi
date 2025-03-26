'use client'  // Asegura que el código se ejecute solo en el cliente
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";  // Verificamos la sesión
import { useRouter } from "next/navigation";  // Importamos useRouter para la redirección
import { useEffect } from "react";  // Importamos useEffect

export default function ProfilePage() {
  return (
    <SessionProvider>
      <ProfileContent />
    </SessionProvider>
  );
}

function ProfileContent() {
  const { data: session } = useSession();  // Usamos useSession para obtener la sesión
  const router = useRouter();  // Usamos useRouter para redirigir a la página de login si no está logueado

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");  // Redirige a la página de login
    }
  }, [session, router]);  // Dependencias para ejecutar el efecto cuando la sesión cambie

  // Si no hay sesión, no se renderiza nada
  if (!session) {
    return null;  // Evitamos que se renderice el contenido mientras redirige
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {session.user?.name}!</p>
    </div>
  );
}
