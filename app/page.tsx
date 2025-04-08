import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import GuestView from "@/components/sections/GuestView";
import LoggedInView from "@/components/sections/LoggedInView";

export default async function AboutPage() {
  const session = await getServerSession(authOptions);

  const client = await clientPromise;
  const db = client.db();

  const user = session?.user?.email
    ? await db.collection("users").findOne({ email: session.user.email })
    : null;

  const isLoggedIn = !!user?.email;

  return (
    <div className="flex flex-col items-center w-full">
      {!isLoggedIn ? <GuestView /> : <LoggedInView />}
    </div>
  );
}
