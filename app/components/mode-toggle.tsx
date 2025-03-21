"use client";

import { Button } from "@/components/ui/button";
import { LuMoonStar, LuSun } from "react-icons/lu";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="px-2 cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <LuSun className="h-6 w-6 text-neutral-800 dark:hidden dark:text-neutral-200" />
      <LuMoonStar className="hidden h-6 w-6 text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
}