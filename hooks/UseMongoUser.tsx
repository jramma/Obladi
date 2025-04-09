"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { PlainUser } from "@/lib/utils";

export function useMongoUser() {
  const { status } = useSession();
  const [mongoUser, setMongoUser] = useState<PlainUser | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user/profile")
        .then((res) => res.json())
        .then((data) => setMongoUser(data));
    }
  }, [status]);

  return mongoUser;
}
