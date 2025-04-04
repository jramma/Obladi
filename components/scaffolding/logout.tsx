"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className=" bg-primary card-style my-3 font-bold px-4 py-2 hover:shadow-primary  "
      >
        Cerrar sesión
      </button>
    </>
  );
};

export { Logout };
