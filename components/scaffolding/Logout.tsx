"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className=" bg-primary card-style my-3 font-bold px-2 md:px-4 py-2 hover:shadow-primary  "
      >
        <span className="md:block hidden text-nowrap"> Cerrar sesión</span>
        <span className="md:hidden">Logout</span>
      </button>
    </>
  );
};

export { Logout };
