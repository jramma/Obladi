import Image from "next/image";

import Welcome from "@/components/sections/Welcome";
import Recently from "./components/marquee";

export default function AboutPage() {
  return (
    <div className="flex flex-col  items-center w-full">
      {/* Seccion welcome */}
      <Welcome
        title="Welcome to About Page!"
        subtitle="Here is some information about us."
      />
      {/* imagen ciudad */}

      <div className="relative w-full h-[500px] container">
        <Image
          src="/kaspars-upmanis-nD2WzCZrlLE-unsplash.jpg"
          alt="Picture of the Barcelonma"
          fill={true}
          className="object-cover"
        />
      </div>
      {/* Seccion objetos recientemente encontrados */}

      <Recently />
      {/* Sección reportar objeto perdido  */}

      {/* Seccion user reviews */}

      {/* Sección buscador de artículos */}

      {/* Sección Reclamar artículo */}
    </div>
  );
}
