"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../profile/Mode-toggle";
import { Logout } from "@/components/scaffolding/Logout";
import Link from "next/link";
import { Icons } from "../Icons";
import Hamburger from "hamburger-react";

export default function Navbar({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isloggedin = !!session;

  const menuItems = [
    {
      href: "/profile",
      label: "Perfil",
      icon: <Icons.profile className="w-6 h-6 transition" />,
      shadow: "shadow-primary",
    },
    {
      href: "/profile/objects",
      label: "Objetos",
      icon: <Icons.logo className="w-6 h-6 transition" />,
      shadow: "shadow-secondary",
    },
    {
      href: "/profile/account",
      label: "Cuenta",
      icon: <Icons.settings className="w-6 h-6 transition" />,
      shadow: "shadow-quaternary",
    },
    {
      href: "/profile/chat",
      label: "Chats",
      icon: <Icons.chat className="w-6 h-6 transition" />,
      shadow: "shadow-primary",
    },
    {
      href: "/profile/not",
      label: "Notificaciones",
      icon: <Icons.bell className="w-6 h-6 transition" />,
      shadow: "shadow-secondary",
    },
  ];


  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="max-w-full w-full flex fixed top-0 z-50 py-2 md:px-6 bg-white dark:bg-black transition-all">
      <div className="container flex flex-row items-center justify-between px-4 md:px-0">
        <Link
          href="/"
          className="font-extrabold gap-2 no-underline-effect py-3 text-2xl md:text-4xl md:pr-8 flex items-center"
        >
          <Icons.logo className="text-accent w-8 h-8  md:w-12 md:h-12" />
          Obladi
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex md:justify-normal gap-3 md:gap-8 items-center">
          <Link href="/about" className="font-bold ">
            About
          </Link>
          {isloggedin ? (
            <>
              <Link href="/profile" className="font-bold">
                Perfil
              </Link>
              <Logout />
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="text-sm md:text-base">
                Login
              </Link>
              <Link href="/auth/signup">Registrarse</Link>
            </>
          )}
          <ModeToggle />
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <Hamburger toggled={isOpen} toggle={setIsOpen} size={30} />
        </div>
      </div>

      {/* Mobile menu animado */}
      <div
        className={`absolute w-full px-6 bg-white dark:bg-black md:hidden flex flex-col gap-4 py-4 z-40 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "top-[64px] opacity-100 translate-y-0" : "top-0 opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <Link className="no-underline-effect" href="/about">About</Link>
        {isloggedin ? (
          <>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group ${item.shadow}  no-underline-effect rounded-md flex items-center gap-3`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <Logout />
          </>
        ) : (
          <>
            <Link href="/auth/signin">Login</Link>
            <Link href="/auth/signup">Registrarse</Link>
          </>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}
