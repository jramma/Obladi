"use client";

import Image from "next/image";
import Welcome from "../components/sections/Welcome";
import Recently from "../components/marquee";
import Report from "../components/report";
import Reviews from "../components/reviews";
import How from "../components/how";
import Reclaim from "../components/reclaim";
import Finder from "../components/finder";
import { SessionProvider } from "next-auth/react";
import { useUser } from "@/context/UserContext";

export default function AboutPage() {
  const user = useUser();

  return (
    <SessionProvider>
      <div className="flex flex-col items-center w-full">
        {/* Renderizar solo si el usuario está logueado */}
        {user?.email && (
          <>
            <Welcome
              title="Welcome to About Page!"
              subtitle="Here is some information about us."
            />

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
          </>
        )}

        {/* Seccion objetos recientemente encontrados (siempre visible) */}
        <Recently />

        <div className="container">
          <hr className="h-2 w-full " />
        </div>

        <How />

        <div className="container">
          <hr className="h-2 w-full " />
        </div>

        {/* Solo si el usuario está logueado */}
        {user?.email && (
          <>
            <Report />
            <div className="container">
              <hr className="h-2 w-full " />
            </div>

            <Finder />
            <div className="container">
              <hr className="h-2 w-full " />
            </div>

            <Reclaim />
            <div className="container">
              <hr className="h-2 w-full " />
            </div>
          </>
        )}

        {/* Sección user reviews (visible siempre) */}

        <Reviews />
      </div>
    </SessionProvider>
  );
}
