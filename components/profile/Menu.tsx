"use client";

import Link from "next/link";
import { Icons } from "../Icons";
import { useState, useEffect } from "react";

const menuItems = [
  {
    href: "/profile",
    label: "Perfil",
    icon: (
      <Icons.profile className="w-6 h-6 group-hover:text-primary transition " />
    ),
    shadow: "hover:shadow-primary",
  },
  {
    href: "/profile/objects",
    label: "Objetos",
    icon: (
      <Icons.location className="w-6 h-6 group-hover:text-secondary transition " />
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
  const [isOpen, setIsOpen] = useState(true);

  // Detectar pantalla pequeña y cerrar el menú
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false); // 👈 cerramos si es móvil
      } else {
        setIsOpen(true); // 👈 abrimos en desktop
      }
    };

    handleResize(); // ejecutamos al cargar
    window.addEventListener("resize", handleResize); // escuchamos cambios

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón flotante para abrir el menú cuando está cerrado */}
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="fixed top-6 md:top-24 left-6 bg-white dark:bg-black border rounded-md p-2 shadow-lg z-30 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 17h18M3 12h18M3 7h18"
            />
          </svg>
        </button>
      )}

      <nav
        id="menu"
        className={`fixed top-0 md:top-20 flex flex-col items-start left-0 h-screen z-20 bg-white dark:bg-black border-r-4 shadow-lg w-72 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 group card-style p-2 cursor-pointer"
        >
          <Icons.arrow className="w-6 h-6 group-hover:rotate-180 rotate-180 md:rotate-0 transition" />
        </button>

        <div className="flex flex-col gap-6 py-20 pl-6">
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

