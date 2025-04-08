"use client";

import Image from "next/image";
import Welcome from "@/components/sections/Welcome";
import Recently from "@/components/Marquee";
import Report from "@/components/sections/Report";
import Reviews from "@/components/sections/Reviews";
import How from "@/components/How";
import Reclaim from "@/components/sections/Reclaim";
import Finder from "@/components/sections/Finder";
import { SessionProvider } from "next-auth/react";
import { useUser } from "@/context/UserContext";
import Cabecera from "@/components/sections/Cabecera";
import Videos from "@/components/sections/Videos";
import { Hr } from "@/components/ui/Hr";
export default function AboutPage() {
  const user = useUser();

  return (
    <SessionProvider>
      <div className="flex flex-col items-center w-full">
        {/* Renderizar solo si el usuario está logueado */}
        {!user?.email && (
          <>
            <Cabecera />
            <Hr />
            <Videos />
            <Hr />
            <Recently />

            <Hr />

            <How />

            <Hr />

            {/* Sección user reviews (visible siempre) */}

            <Reviews />
          </>
        )}

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

        {/* Solo si el usuario está logueado */}
        {user?.email && (
          <>
            <Report />
            <Hr />

            <Finder />
            <Hr />

            <Reclaim />
          </>
        )}
      </div>
    </SessionProvider>
  );
}
