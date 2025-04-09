"use client";

import Link from "next/link";
import { Icons } from "../Icons";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
const menuItems = [
  {
    href: "/profile",
    label: "Perfil",
    icon: (
      <Icons.profile className="w-6 h-6 group-hover:text-primary transition" />
    ),
    shadow: "hover:shadow-primary",
  },
  {
    href: "/profile/objects",
    label: "Objetos",
    icon: (
      <Icons.location className="w-6 h-6 group-hover:text-secondary transition" />
    ),
    shadow: "hover:shadow-secondary",
  },
  {
    href: "/profile/account",
    label: "Cuenta",
    icon: (
      <Icons.settings className="w-6 h-6 group-hover:text-tertiary transition" />
    ),
    shadow: "hover:shadow-tertiary",
  },
  {
    href: "/profile/chat",
    label: "Chat",
    icon: (
      <Icons.chat className="w-6 h-6 group-hover:text-primary transition" />
    ),
    shadow: "hover:shadow-primary",
  },
  {
    href: "/profile/not",
    label: "Notificaciones",
    icon: (
      <Icons.bell className="w-6 h-6 group-hover:text-secondary transition" />
    ),
    shadow: "hover:shadow-secondary",
  },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false); // Solo para móvil

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón solo visible en móvil */}
      <button
        onClick={toggleMenu}
        className="md:hidden border-3 fixed top-24 left-6 bg-white dark:bg-black  rounded-md p-2 shadow-lg z-30"
      >
        <GiHamburgerMenu className="w-6 h-6" />
      </button>

      <nav
        className={`fixed top-20 md:top-28 left-0 z-40 h-screen w-72 bg-white dark:bg-black border-r-4 shadow-lg transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:block`}
      >
        {/* Botón para cerrar el menú solo en móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden absolute top-6 right-6 group card-style p-2"
        >
          <Icons.arrow className="w-6 h-6 group-hover:rotate-180 rotate-180 transition" />
        </button>

        <div className="flex flex-col gap-6 py-20 pl-6 pr-3">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group no-underline-effect px-8 py-2 card-style ${item.shadow} rounded-md flex items-center gap-3`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export { Menu };
