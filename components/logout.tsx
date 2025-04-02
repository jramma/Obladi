"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-primary font-bold px-4 py-2 hover:underline"
      >
        Cerrar sesión
      </button>
    </>
  );
};

export { Logout };
