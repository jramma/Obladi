import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { Menu } from "@/components/profile/Menu";
import Hero from "@/components/profile/Hero";
import Pines from "@/components/profile/Pines";
import Shop from "@/components/profile/Shop";
import { PlainUser } from "@/lib/utils";

export default async function ProfilePage() {
  const safeUser = await getProfile();

  return (
    <main className="container self-center flex flex-row justify-end py-10 md:py-20">
      <Menu />
      <section className="w-full md:w-3/4 flex flex-col items-start ">
        <Hero user={safeUser} />
        <Pines user={safeUser} />
        <Shop user={safeUser} />
      </section>
    </main>
  );
}
export async function getProfile() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  const client = await clientPromise;
  const db = client.db();
  const user = await db
    .collection("users")
    .findOne({ email: session.user?.email });

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
    time:
      user?.time instanceof Date
        ? user?.time.toISOString()
        : new Date().toISOString(),
    pines: (user?.pines || []).map((id: any) => id.toString()),
    contributor:
      typeof user?.contributor === "number" ? user?.contributor : 0.0,
    location: user?.location ? user?.location.toString() : null,
    rewardPins: typeof user?.rewardPins === "number" ? user?.rewardPins : 0.0,
    gender: user?.gender || "",
    objects: JSON.parse(JSON.stringify(user?.objects || {})),
    notifications: {
      mailing: user?.notifications?.mailing ?? true,
      chat: user?.notifications?.chat ?? true,
      reclaimed: user?.notifications?.reclaimed ?? true,
      found: user?.notifications?.found ?? true,
      lostNearby: user?.notifications?.lostNearby ?? true,
    },
  };
  return safeUser;
}
