import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import Hero from "@/components/hero";
import { Menu } from "@/components/menu";
export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
 
  
  if (!session) {
    redirect("/auth/signin");
  }

  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection("users").findOne({
    email: session.user?.email,
  });
  const safeUser: PlainUser = {
    email: user?.email,
    name: user?.name || "",
    surname: user?.surname || "",
    authProvider: user?.authProvider || "credentials",
    role: user?.role || "user",
    phone: user?.phone || "",
    mail: user?.mail || user?.email,
    picture: user?.picture || "",
    description: user?.description || "",
    time: user?.time instanceof Date ? user?.time.toISOString() : new Date().toISOString(),
    pines: (user?.pines || []).map((id: any) => id.toString()),
    contributor: typeof user?.contributor === "number" ? user?.contributor : 0.0,
    lost: user?.lost ?? false,
    location: user?.location ? user?.location.toString() : null,
    rewardPins: typeof user?.rewardPins === "number" ? user?.rewardPins : 0.0,
    foundObjects: user?.foundObjects || {},
  };
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main className="container self-center flex flex-row justify-end py-20">
      <Menu />

      <section className="w-3/4 flex flex-col items-start">
      <Hero user={safeUser} />

        



        <div>
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
        </div>
      </section>
    </main>
  );
}
type PlainUser = {
  email: string;
  name: string;
  surname: string;
  authProvider: string;
  role: string;
  phone: string;
  mail: string;
  picture: string;
  description: string;
  time: string; // ← ya convertido a ISO string
  pines: string[]; // ← si llegan como ObjectId, los convertimos a string
  contributor: number;
  lost: boolean;
  location: string | null; // ← si llega como ObjectId, lo convertimos
  rewardPins: number;
  foundObjects: Record<string, unknown>;
};