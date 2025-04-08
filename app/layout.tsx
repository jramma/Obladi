import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/scaffolding/Navbar";
import Footer from "@/components/scaffolding/Footer";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Ob-la-di, Ob-la-da",
  description: "Encuentra objetos perdidos",
};

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen max-w-screen flex flex-col  items-center w-full bg-white dark:bg-black md:pt-18 overflow-x-hidden relative">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              
              {children}
              <Footer />
            </ThemeProvider>
      </body>
    </html>
  );
}
