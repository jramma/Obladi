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
      <body className="container flex flex-col items-center bg-white dark:bg-black">
        <ThemeProvider attribute="class">
          {" "}
          {/* Envolver la aplicación con ThemeProvider */}
          {children}
          <Navbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
