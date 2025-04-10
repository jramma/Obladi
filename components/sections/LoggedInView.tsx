"use client";

import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Report from "@/components/sections/Report";
import Reclaim from "@/components/sections/Reclaim";
import Finder from "@/components/sections/Finder";
import { Hr } from "@/components/ui/Hr";
import Welcome from "@/components/sections/Welcome";

export default function LoggedInView() {
  return (
    <SessionProvider>
      <Welcome />
      {/* <div className="bg-fixed relative w-full h-[500px] overflow-hidden parallax-container">
        <Image
          src="/kaspars-upmanis-nD2WzCZrlLE-unsplash.jpg"
          alt="Picture of Barcelona"
          fill
          className="object-cover parallax-image"
        />
      </div> */}
      <Hr />
      <Report />
      <Hr />
      <Finder />
      <Hr />
      <Reclaim />
    </SessionProvider>
  );
}
