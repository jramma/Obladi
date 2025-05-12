import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import GuestView from "@/components/sections/GuestView";
import LoggedInView from "@/components/sections/LoggedInView";

export default async function AboutPage() {
  const session = await getServerSession(authOptions);

  // Si no hay sesión, no consultamos la DB
  if (!session?.user?.email) {
    return (
      <div className="flex flex-col items-center w-full">
        <GuestView />
      </div>
    );
  }

  const client = await clientPromise;
  const db = client.db();

  const user = await db
    .collection("users")
    .findOne({ email: session.user.email }, { projection: { _id: 1, email: 1 } });

  const isLoggedIn = !!user?.email;

  return (
    <div className="flex flex-col items-center w-full">
      {isLoggedIn ? <LoggedInView /> : <GuestView />}
    </div>
  );
}
