import { Icons } from "../components/icons";
import { HomeIcon, UserRound } from "lucide-react";

export const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/about", icon: Icons.location, label: "About" },
    { href: "/profile", icon: UserRound, label: "Profile" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/jramma",
        icon: Icons.github,
        targer: "_blank",
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/jramma/",
        icon: Icons.linkedin,
        targer: "_blank",
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
} as const;
