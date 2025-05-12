import React from "react";
import Cabecera from "@/components/sections/Cabecera";
import Products from "@/components/Products";
import How from "@/components/How";
import Reviews from "@/components/sections/Reviews";
import { Hr } from "@/components/ui/Hr";
import InstallPhone from "@/components/sections/InstallPhone";

export default function GuestView() {
  return (
    <>
      <Cabecera />
      <Products />
      <Hr />
      <How />
      <Hr />
      <InstallPhone />
      <Hr />
      <Reviews />
    </>
  );
}
