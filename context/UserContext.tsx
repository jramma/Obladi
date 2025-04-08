"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type PlainUser = {
  email: string;
  name: string;
  surname: string;
  authProvider: string;
  role: string;
  phone: string;
  mail: string;
  picture: string;
  description: string;
  time: string;
  pines: string[];
  contributor: number;
  location: string | null;
  rewardPins: number;
  gender: string;
  objects: string[]; // ← Nuevos campos
};

const UserContext = createContext<PlainUser | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ user, children }: { user: PlainUser; children: React.ReactNode }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
