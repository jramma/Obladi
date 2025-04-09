"use client";
import React from "react";
import { Card } from "./Card";
import Marquee from "react-fast-marquee";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { successStories } from "@/lib/home";

const Recently = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // o un loading state, si prefieres

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const gradientColor = currentTheme === "dark" ? "#121212" : "#efefef";

  return (
    <section id="find"  className=" container flex flex-col gap-6 py-10 md:py-20 px-4 md:px-0">
      <h3 className=" text-5xl font-light">Casos de éxito</h3>

      <Marquee
        speed={40}
        delay={0}
        gradient={true}
        gradientColor={gradientColor}
        gradientWidth={200}
        direction="left"
        pauseOnHover={true}
      >
        {successStories.slice(0, 4).map((story, idx) => (
          <Card key={idx} title={story.title} description={story.description} />
        ))}
      </Marquee>
      <div className="hidden md:block">
        <Marquee
          speed={40}
          delay={0}
          pauseOnHover={true}
          gradient={true}
          gradientColor={gradientColor}
          gradientWidth={200}
          direction="right"
        >
          {successStories.slice(3, 8).map((story, idx) => (
            <Card
              key={idx}
              title={story.title}
              description={story.description}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Recently;
