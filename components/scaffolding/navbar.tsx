import { Dock, DockIcon } from "../animation/dock";
import { ModeToggle } from "../mode-toggle";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";
import { DATA } from "../../lib/text";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { authOptions } from "../../lib/auth";
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
                className="font-extrabold text-3xl text-primary "
              >
                Ob-La-Di
              </Link>
              <Link
                href={"/about"}
                className="flex cursor-pointer group hover:font-bold transition  items-center gap-2"
              >
                <p>About</p>
              </Link>
              <Link
                href={isloggedin ? "/profile" : "/auth/signin"}
                className="flex cursor-pointer group hover:font-bold transition  items-center gap-2"
              >
                <p>Profile</p>
              </Link>
            </div>
            <div className="flex items-center gap-6">
              {Object.entries(DATA.contact.social)
                .filter(([_, social]) => social.navbar)
                .map(([name, social]) => (
                  <DockIcon key={name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={social.url}
                          target="_blank"
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "size-12"
                          )}
                        >
                          <social.icon className="size-6" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </DockIcon>
                ))}
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Dock para pantallas pequeñas */}
      <div className="md:hidden z-40 pointer-events-none fixed inset-x-0 bottom-0  mx-auto mb-4 flex origin-bottom h-full max-h-14">
        <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
        <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-[#ffffff] dark:bg-[#000000] [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12"
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
                        "size-12"
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
