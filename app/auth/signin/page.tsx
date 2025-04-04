"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
export default function SignIn() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (res?.error) {
      alert("Credenciales inválidas");
    } else {
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center items-center flex-grow">
      <div className="absolute w-full h-full max-h-screen">
        <Boxes />
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 flex flex-col font-bold z-10 p-10 rounded-lg shadow-lg aspect-square w-auto h-auto bg-[#ffffff] dark:bg-[#000000] card-style my-6"
      >
        <h2 className="text-4xl font-bold">Iniciar sesión</h2>
        <div>
          <label htmlFor="email" className="block">
            Correo
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            className="w-full p-2  card-style2"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full p-2  card-style2"
            required
          />
        </div>

        {/* 👉 Botón para iniciar sesión con Google */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full mt-2 flex items-center justify-center gap-2 py-2 border card-style2  bg-[#ffffff] text-gray-700"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          <span>Continuar con Google</span>
        </button>
        <button
          type="submit"
          className="bg-primary font-bold text-black card-style2 self-start px-8 py-2"
        >
          Iniciar sesión
        </button>
        {/* Enlace al registro */}
        <div className="flex justify-center mt-16">
          <Link href={"/auth/signup"} className="font-bold text-primary">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
}
