"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { UserProvider, PlainUser } from "@/context/UserContext";

export function UserWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<PlainUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "authenticated" && session?.user?.email) {
        const res = await fetch(`/api/user?email=${session.user.email}`);
        const data = await res.json();
        setUser(data);
      }
    };

    fetchUser();
  }, [session, status]);

  if (status === "loading") return null; // o un loading spinner
  if (status === "authenticated" && !user) return null;

  return user ? <UserProvider user={user}>{children}</UserProvider> : <>{children}</>;
}
