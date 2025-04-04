import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { Menu } from "@/components/profile/menu";
import Hero from "@/components/profile/hero";
import Pines from "@/components/profile/pines";
import Shop from "@/components/profile/shop";
import { PlainUser } from "@/context/UserContext";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection("users").findOne({ email: session.user?.email });

  if (!user) redirect("/auth/signin");

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
    gender: user?.gender || "",
    lostObjects: user?.lostObjects || {},
    reclaimedObjects: user?.reclaimedObjects || {},
  };

  return (
    <main className="container self-center flex flex-row justify-end py-10 md:py-20">
      <Menu />
        <section className="w-full md:w-3/4 flex flex-col items-start">
          <Hero user={safeUser} />
          <Pines user={safeUser} />
          <Shop user={safeUser} />
        </section>
    </main>
  );
}
