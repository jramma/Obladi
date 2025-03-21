"use client";
import React from "react";
import { Card } from "./card";
import Marquee from "react-fast-marquee";
import { useTheme } from "next-themes";

const Recently = () => {
  const { theme } = useTheme();

  const gradientColor =
    theme === "dark" ? "rgba(33, 33, 33)" : "rgba(239, 239, 239)"; // Ajusta los colores según el tema

  return (
    <section className=" container flex flex-col gap-6 py-10 md:py-20 px-4 md:px-0">
      <h3 className=" text-5xl font-light">Casos de éxito</h3>

      <Marquee
        speed={30}
        delay={0}
        loop={0}
        gradient={true}
        gradientColor={gradientColor}
        gradientWidth={200}
        direction="left"
      >
        <Card />
        <Card />
        <Card />
      </Marquee>
      <Marquee
        speed={30}
        delay={0}
        loop={0}
        gradient={true}
        gradientColor={gradientColor}
        gradientWidth={200}
        direction="right"
      >
        <Card />
        <Card />
        <Card />
      </Marquee>
      <Marquee
        speed={30}
        delay={0}
        gradient={true}
        loop={0}
        gradientColor={gradientColor}
        gradientWidth={200}
        direction="left"
      >
        <Card />
        <Card />
        <Card />
      </Marquee>
    </section>
  );
};

export default Recently;
