import { Dock, DockIcon } from "../animation/dock";
import { ModeToggle } from "../profile/mode-toggle";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { Logout } from "@/components/scaffolding/logout";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";
import { DATA } from "../../lib/text";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Navbar() {
  var isloggedin = false;
  const session = await getServerSession(authOptions);
  if (session) {
    isloggedin = true;
  }

  return (
    <TooltipProvider>
      {/* Header para pantallas grandes */}
      <div className="hidden md:flex border-b-4 fixed inset-x-0 top-0 z-30 mx-auto py-2 px-6 bg-[#ffffff] dark:bg-[#000000]">
        <div className="container">
          <div className="w-full flex items-center justify-between ">
            <div className="flex gap-8 items-center">
              <Link
                href={"/"}
                className="font-extrabold no-underline-effect text-3xl text-primary "
              >
                Ob-La-Di
              </Link>
              <Link
                href={"/about"}
                className="flex cursor-pointer group font-bold transition  items-center gap-2"
              >
                <p>About</p>
              </Link>
              {isloggedin ? (
                <Link
                  href="/profile"
                  className="flex cursor-pointer group font-bold transition items-center gap-2"
                >
                  <p>Profile</p>
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="no-underline-effect flex cursor-pointer card-style py-2 px-5 my-3"
                  >
                    <p>Login</p>
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="no-underline-effect flex cursor-pointer card-style py-2 px-5 my-3"
                  >
                    <p>Registrarse</p>
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center gap-6">
              {isloggedin && <Logout />}

              <ModeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Dock para pantallas pequeñas */}
      <div className="md:hidden z-40 pointer-events-none fixed inset-x-0 bottom-0  mx-auto mb-4 flex origin-bottom h-full max-h-14">
        <div className="fixed bottom-0 inset-x-0 h-16 w-full"></div>
        <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-[#ffffff] dark:bg-[#000000] ">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 no-underline-effect"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 no-underline-effect"
                      )}
                    >
                      <social.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          <Separator orientation="vertical" className="h-full py-2 " />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </div>
    </TooltipProvider>
  );
}
