"use client";

import { useState } from "react";

export default function MessageInput({ chatId }: { chatId: string }) {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ chatId, text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) setText("");
    else alert("Error al enviar mensaje");
  };

  return (
    <div className="mt-6 flex items-center gap-4 self-start">
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow p-2 min-h-10 border md:min-w-72 rounded-md bg-white text-black dark:bg-black dark:text-white"
      />
      <button
        onClick={sendMessage}
        className="bg-primary text-black font-bold card-style px-4 py-2 rounded-md"
      >
        Enviar
      </button>
    </div>
  );
}
