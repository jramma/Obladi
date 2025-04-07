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

  const discardMessage = () => {
    setText(""); // Limpia el contenido del textarea
  };

  return (
    <div className="mt-6 flex flex-col gap-2 w-full max-w-2xl">
      <textarea
        placeholder="Escribe un mensaje..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="w-full p-2 border rounded-md resize-none bg-white text-black dark:bg-black dark:text-white"
      />
      <div className="flex justify-end gap-4">
        <button
          onClick={discardMessage}
          className="bg-violet text-white font-semibold card-style px-4 py-2 rounded-md"
        >
          Descartar
        </button>
        <button
          onClick={sendMessage}
          className="bg-primary text-black font-bold card-style px-4 py-2 rounded-md"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
