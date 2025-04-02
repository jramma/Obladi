import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import Hero from "@/components/hero";
import Pines  from "@/components/pines";
import  Shop  from "@/components/shop";
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
    time:
      user?.time instanceof Date
        ? user?.time.toISOString()
        : new Date().toISOString(),
    pines: (user?.pines || []).map((id: any) => id.toString()),
    contributor:
      typeof user?.contributor === "number" ? user?.contributor : 0.0,
    lost: user?.lost ?? false,
    location: user?.location ? user?.location.toString() : null,
    rewardPins: typeof user?.rewardPins === "number" ? user?.rewardPins : 0.0,
    foundObjects: user?.foundObjects || {},
  };
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main className="container self-center flex flex-row justify-end py-10 md:py-20 !overflow-visible">
      <Menu />

      <section className="w-full md:w-3/4 flex flex-col items-start">
        <Hero user={safeUser} />
        <Pines user={safeUser} />
        <Shop user={safeUser} />
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
