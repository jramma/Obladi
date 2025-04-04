"use client";

import Image from "next/image";
import Welcome from "@/components/sections/welcome";
import Recently from "@/components/marquee";
import Report from "@/components/sections/report";
import Reviews from "@/components/sections/reviews";
import How from "@/components/how";
import Reclaim from "@/components/sections/reclaim";
import Finder from "@/components/sections/finder";
import { SessionProvider } from "next-auth/react";
import { useUser } from "@/context/UserContext";
import Cabecera from "@/components/sections/cabecera";
import Videos from "@/components/sections/videos";
import { Hr } from "@/components/ui/hr";
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
