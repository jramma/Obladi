import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/scaffolding/navbar";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/scaffolding/footer";
import { UserProvider } from "@/context/UserContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
import clientPromise from "@/lib/mongodb";

export const metadata: Metadata = {
  title: "Ob-la-di, Ob-la-da",
  description: "Encuentra objetos perdidos",
};

export default async function RootLayout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);
  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection("users").findOne({
    email: session?.user?.email,
  });

  const safeUser = {
    email: user?.email,
    name: user?.name || "",
    surname: user?.surname || "",
    authProvider: user?.authProvider || "credentials",
    role: user?.role || "user?",
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
    lost: user?.lost ?? false,
    location: user?.location ? user?.location.toString() : null,
    rewardPins: typeof user?.rewardPins === "number" ? user?.rewardPins : 0.0,
    objects: (user?.objects || []).map((id: any) => id.toString()),
    gender: user?.gender || "",
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col items-center w-full bg-white dark:bg-black md:pt-18 overflow-x-hidden">
        <UserProvider user={safeUser}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
