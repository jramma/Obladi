import Link from "next/link";
import { Icons } from "../Icons";
const menuItems = [
  {
    href: "/profile",
    label: "Perfil",
    icon: <Icons.profile className="w-6 h-6  transition" />,
    shadow: "shadow-primary",
  },
  {
    href: "/profile/objects",
    label: "Objetos",
    icon: <Icons.logo className="w-6 h-6  transition" />,
    shadow: "shadow-secondary",
  },
  {
    href: "/profile/account",
    label: "Cuenta",
    icon: <Icons.settings className="w-6 h-6  transition" />,
    shadow: "shadow-quaternary",
  },
  {
    href: "/profile/chat",
    label: "Chat",
    icon: <Icons.chat className="w-6 h-6 transition" />,
    shadow: "shadow-primary",
  },
  {
    href: "/profile/not",
    label: "Notificaciones",
    icon: <Icons.bell className="w-6 h-6  transition" />,
    shadow: "shadow-secondary",
  },
];

const Menu = () => {
  return (
    <>
      <nav
        className="sticky hidden md:flex top-20 left-0 z-40  w-72 bg-white dark:bg-black transform transition-transform duration-300"
      >
        <div className="flex flex-col gap-6 py-20 pl-6 pr-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group  no-underline-effect px-8 py-2 card-style ${item.shadow} rounded-md flex items-center gap-3`}
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
