"use client";

import { Button } from "../ui/Button";
import { LuMoonStar, LuSun } from "react-icons/lu";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      aria-label="Toggle theme"
    variant="ghost"
      type="button"
      size="icon"
      className="self-end md:self-auto cursor-pointer hover:scale-150 transition"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <LuSun className="h-6 w-6 text-neutral-800 dark:hidden dark:text-neutral-200" />
      <LuMoonStar className="hidden h-6 w-6 text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
}