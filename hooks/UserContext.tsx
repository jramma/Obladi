// hooks/UserContext.tsx
"use client";

import { createContext, useContext } from "react";
import type { PlainUser } from "@/lib/utils";

const UserContext = createContext<PlainUser | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserServerProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: PlainUser;
}) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
