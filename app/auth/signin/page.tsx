"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Map from "../../../components/map";
import Link from "next/link";
export default function SignIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });

    if (res?.error) {
      alert("Invalid credentials");
    } else {
      router.push("/dashboard"); // Redirige al dashboard o página principal
    }
  };

  return (
    <div className="flex justify-center items-center flex-grow">
      <div className="absolute w-full h-full -z-10 transform scale-120 opacity-80">
        <Map />
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-10 rounded-lg shadow-lg aspect-square w-auto h-auto bg-[#ffffff] dark:bg-[#000000] card-style"
      >
        <h2 className="text-2xl font-bold">Login</h2>
        <div>
          <label htmlFor="username" className="block">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded"
        >
          Sign In
        </button>

        {/* Botón para redirigir a la página de Sign Up */}
        <div className="flex justify-center mt-4">
          <Link
            href={"/auth/signup"}
            className="text-blue-500 "
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
}
