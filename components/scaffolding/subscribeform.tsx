"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pathname?.includes("subscribirse") && inputRef.current) {
      inputRef.current.focus();
    }
  }, [pathname]);

  const handleSubscribe = async () => {
    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } else {
      setStatus("error");
      setMessage(data.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-primary-400 col-span-5">
      <h4 className="font-bold text-3xl">
        Subscríbete al mailing de Obladi
      </h4>
      <div className="flex flex-col gap-3 text-primary-300">
        <input
          ref={inputRef}
          type="text"
          placeholder="Escribe tu email..."
          className="bg-[#ffffff] card-style2 mt-1 block w-full p-2 border border-primary-400 rounded-md shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        onClick={handleSubscribe}
        className="bg-primary-400 text-white p-2 justify-center !rounded-full self-start px-8 card-style2 flex items-center gap-2"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Subscribiendo..." : "Subscribirse"}
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
