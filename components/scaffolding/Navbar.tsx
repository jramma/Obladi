import { ModeToggle } from "../profile/Mode-toggle";
import { Logout } from "@/components/scaffolding/Logout";
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
    <>
      <nav className="max-w-full flex border-b-4 fixed inset-x-0 top-0 z-50 mx-auto py-2 md:px-6  bg-[#ffffff] dark:bg-[#000000] ">
        <div className="container">
          <div className=" w-full flex items-center justify-between">
            <div className=" flex w-full justify-between md:justify-normal md:gap-8 items-center">
              <Link
                href={"/"}
                className="font-extrabold no-underline-effect py-4 text-2xl md:text-3xl text-primary md:pr-8"
              >
                Ob-La-Di
              </Link>

              <Link
                href={"/about"}
                className="md:flex hidden cursor-pointer group font-bold transition  items-center "
              >
                <p>About</p>
              </Link>
              {isloggedin ? (
                <Link
                  href="/profile"
                  className="flex text-xl cursor-pointer group font-bold transition items-center "
                >
                  <p>Perfil</p>
                </Link>
              ) : (
                <div className="md:gap-8 gap-3  flex flex-row items-center">
                  <Link
                    href="/auth/signin"
                    className="flex cursor-pointer  my-3 text-sm md:text-base"
                  >
                    <p>Login</p>
                  </Link>
                  <Link
                    href="/auth/signup"
                    className=" flex cursor-pointer  my-3"
                  >
                    <p>Registrarse</p>
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center gap-6 ml-4">
              {isloggedin && <Logout />}
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
