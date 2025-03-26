import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "next-themes"; // Importar ThemeProvider
import Footer from "@/components/scaffolding/footer";
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
        <body className="min-h-screen  flex flex-col items-center w-full bg-white dark:bg-black md:pt-18">
          <ThemeProvider attribute="class">
            {children}
            <Navbar />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
  );
}
