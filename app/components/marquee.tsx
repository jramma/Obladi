"use client";
import React from "react";
import { Card } from "./card";
import Marquee from "react-fast-marquee";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Recently = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // o un loading state, si prefieres

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const gradientColor =
    currentTheme === "dark" ? "#121212" : "#efefef";

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
      <div className="hidden md:block">
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
      </div>
      <div className="hidden md:block">
        <Marquee
          speed={30}
          delay={0}
          gradient={true}
          loop={0}
          gradientColor={gradientColor}
          gradientWidth={200}
          direction="left"
          className="hidden md:block"
        >
          <Card />
          <Card />
          <Card />
        </Marquee>
      </div>
    </section>
  );
};

export default Recently;
