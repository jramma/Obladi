"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <>
      <button
        arial-label="Cerrar sesión"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="  card-style my-3  font-bold px-2  py-1 hover:shadow-primary  "
      >
        <span className="md:block hidden text-nowrap"> Cerrar sesión</span>
        <span className="md:hidden">Logout</span>
        
      </button>
    </>
  );
};

export { Logout };
