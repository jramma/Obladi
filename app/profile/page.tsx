import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin"); // Redirección instantánea (ni se carga el componente)
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {session.user?.name}!</p>
    </div>
  );
}
