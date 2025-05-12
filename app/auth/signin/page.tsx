"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!;

export default function SignIn() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Por favor verifica el CAPTCHA");
      return;
    }
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
    <div className="flex justify-center bg-[url(/topography.svg)] dark:bg-[url(/topodark.svg)] items-center flex-grow relative overflow-hidden w-full ">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 my-6 md:my-20 flex flex-col font-bold z-10 p-10 rounded-lg shadow-lg  w-auto h-auto bg-white dark:bg-black card-style"
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
            className="w-full p-2  card-style"
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
            className="w-full p-2  card-style"
            required
          />
        </div>

        <HCaptcha
          sitekey={HCAPTCHA_SITEKEY}
          onVerify={(token) => setCaptchaToken(token)}
        />
        {/* 👉 Botón para iniciar sesión con Google */}
        <button
          arial-label="Iniciar sesión con Google"
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full mt-2 flex items-center justify-center gap-2 py-2 border card-style2  bg-[#ffffff] text-gray-700"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          <span>Continuar con Google</span>
        </button>
        <button
          aria-label="Iniciar sesión"
          type="submit"
          className="bg-primary font-bold  card-style self-start px-8 py-2"
        >
          Iniciar sesión
        </button>
        {/* Enlace al registro */}
        <div className="flex justify-center mt-16">
          <Link
            href={"/auth/signup"}
            className="font-bold dark:text-primary text-xl"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
}
