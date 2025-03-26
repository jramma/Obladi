'use client';
import Image from "next/image";

import Welcome from "@/components/sections/Welcome";
import Recently from "@/components/marquee";
import Report from "@/components/report";
import Reviews from "./components/reviews";
import How from "./components/how";
import Reclaim from "./components/reclaim";
import Finder from "./components/finder";
import { SessionProvider } from "next-auth/react";

export default function AboutPage() {
  return (
    <SessionProvider>
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
        <div className="container">
          <hr className="h-2 w-full " />
        </div>

        {/* Seccion objetos recientemente encontrados */}
        <Recently />

        <div className="container">
          <hr className="h-2 w-full " />
        </div>
        <How />
        <div className="container">
          <hr className="h-2 w-full " />
        </div>

        {/* Sección reportar objeto perdido  */}
        <Report />
        <div className="container">
          <hr className="h-2 w-full " />
        </div>

        {/* Seccion user reviews */}
        <Reviews />
        <div className="container">
          <hr className="h-2 w-full " />
        </div>

        {/* Sección buscador de artículos */}
        <Finder />
        <div className="container">
          <hr className="h-2 w-full " />
        </div>

        {/* Sección Reclamar artículo */}
        <Reclaim />
       
      </div>
    </SessionProvider>
  );
}
