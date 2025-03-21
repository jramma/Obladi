import Image from "next/image";

import Welcome from "@/components/sections/Welcome";
import Recently from "@/components/marquee";
import Report from "@/components/report";
import Reviews from "./components/reviews";
import How from "./components/how";
import Reclaim from "./components/reclaim";
import Finder from "./components/finder";


export default function AboutPage() {
  return (
    <div className="flex flex-col  items-center w-full">
      {/* Seccion welcome */}
      <Welcome
        title="Welcome to About Page!"
        subtitle="Here is some information about us."
      />
      {/* imagen ciudad */}

      <div className="relative w-full h-[500px] overflow-hidden parallax-container">
        <Image
          src="/kaspars-upmanis-nD2WzCZrlLE-unsplash.jpg"
          alt="Picture of Barcelona"
          fill
          className="object-cover parallax-image"
        />
      </div>
      <hr className="h-2 w-full "/>

      {/* Seccion objetos recientemente encontrados */}
      <Recently />
      <hr className="h-2 w-full "/>
      <How />
      <hr className="h-2 w-full "/>

      {/* Sección reportar objeto perdido  */}
      <Report />
      <hr className="h-2 w-full "/>

      {/* Seccion user reviews */}
      <Reviews />
      <hr className="h-2 w-full "/>

      {/* Sección buscador de artículos */}
      <Finder/>
      <hr className="h-2 w-full "/>

      {/* Sección Reclamar artículo */}
      <Reclaim />
      <hr className="h-2 w-full "/>

    </div>
  );
}
