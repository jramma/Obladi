import React from "react";
import Cabecera from "@/components/sections/Cabecera";
import Recently from "@/components/Marquee";
import How from "@/components/How";
import Reviews from "@/components/sections/Reviews";
import { Hr } from "@/components/ui/Hr";

export default function GuestView() {
  return (
    <>
      <Cabecera />


      {/* <Hr />
      <Videos /> */}
      <Hr />
      <Recently />
      <Hr />
      <How />
      <Hr />
      <Reviews />
    </>
  );
}
