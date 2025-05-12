"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Menu } from "@/components/profile/Menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <main className="w-full flex ">
        <Menu />
        {children}
      </main>
    </SessionProvider>
  );
}
