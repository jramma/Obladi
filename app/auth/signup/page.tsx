"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!;

export default function SignUp() {
  const [emailSent, setEmailSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Por favor verifica el CAPTCHA");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, token: captchaToken }),
    });
    if (res.ok) {
      setEmailSent(true);
    } else {
      const error = await res.json();
      alert(error.error || "Ocurrió un error");
    }
  };

  const labels: Record<string, string> = {
    name: "Nombre",
    surname: "Apellidos",
    email: "Correo electrónico",
    password: "Contraseña",
  };

  return (
    <div className="flex bg-[url(/topography.svg)] flex-col dark:bg-[url(/topodark.svg)] justify-center items-center flex-grow overflow-hidden relative w-full">
      <p className="mt-20 bg-white dark:bg-black text-2xl max-w-96 card-style shadow-red-500 p-6 font-bold rounded-4xl">
        {" "}
        Como esta en <span className="text-red-500">fase beta</span> solo se
        permite el registro a los usarios de los que dispongamos el mail
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex  my-6  md:my-20 z-10 flex-col space-y-6 p-10 rounded-lg shadow-lg w-auto h-auto bg-[#ffffff] dark:bg-black card-style"
      >
        <h2 className="text-4xl font-bold">Registro</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(labels).map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block">
                {labels[field]}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className="w-full p-2 card-style border min-w-72 border-gray-300 bg-[#ffffff] rounded"
                required
              />
            </div>
          ))}
        </div>

        <HCaptcha
          sitekey={HCAPTCHA_SITEKEY}
          onVerify={(token) => setCaptchaToken(token)}
        />

        <div className="flex flex-row gap-6 items-center">
          <button
            arial-label="Crear cuenta"
            type="submit"
            className="px-8 py-2 bg-primary  font-bold card-style rounded self-start"
          >
            Crear cuenta
          </button>

          <button
            arial-label="Iniciar sesión con Google"
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex  items-center gap-2 px-8 py-[1.3rem] md:py-2 card-style2 border rounded no-underline-effect !bg-white"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            <span className="font-medium text-gray-700"> Google</span>
          </button>
        </div>

        <div className="flex justify-center mt-16 text-xl">
          <Link href={"/auth/signin"} className="font-bold dark:text-primary">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </div>
      </form>
      {/* modal */}
      {emailSent && (
        <div className="fixed inset-0 flex items-center justify-center z-50  backdrop-blur-lg bg-opacity-50">
          <div className="bg-white dark:bg-black card-style p-8  text-center space-y-4">
            <h3 className="text-2xl font-bold">¡Revisa tu correo!</h3>
            <p>Te hemos enviado un enlace para verificar tu cuenta.</p>
            <button
              arial-label="Ir a iniciar sesión"
              className="mt-4 px-6 py-2 bg-primary  rounded font-semibold"
              onClick={() => router.push("/auth/signin")}
            >
              Ir a iniciar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
