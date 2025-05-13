import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/scaffolding/Navbar";
import Footer from "@/components/scaffolding/Footer";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GlobalModal } from "@/components/GlobalModal";

export const metadata: Metadata = {
  title: "Obladi",
  description: "Encuentra objetos perdidos",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  icons: [
    { rel: "apple-touch-icon", url: "/favicon/icon-192x192.png" },
    { rel: "icon", url: "/favicon/icon-192x192.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

type LayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen max-w-screen flex flex-col items-center w-full  bg-white dark:bg-black pt-18 overflow-x-hidden relative">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlobalModal />
          <Navbar session={session} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
