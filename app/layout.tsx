import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "next-themes"; // Importar ThemeProvider

export const metadata: Metadata = {
  title: "Ob-la-di, Ob-la-da",
  description: "Encuentra objetos perdidos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex flex-col items-center w-full bg-white dark:bg-black md:pt-20">
        <ThemeProvider attribute="class">
          {children}
          <Navbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
