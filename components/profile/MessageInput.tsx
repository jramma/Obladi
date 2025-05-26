"use client";

import { useState } from "react";
import { showGlobalModal } from "@/components/GlobalModal";
export default function MessageInput({ chatId }: { chatId: string }) {
  const [text, setText] = useState("");
  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await fetch("/api/chats/messages", {
      method: "POST",
      body: JSON.stringify({ chatId, text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) setText("");
    else showGlobalModal("Error al enviar mensaje");
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
        className="w-full p-2 border rounded-md resize-none bg-white  dark:bg-black "
      />
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          arial-label="Descartar mensaje"
          onClick={discardMessage}
          className="bg-violet font-semibold card-style px-4 py-2 rounded-md"
        >
          Descartar
        </button>
        <button
          type="submit"
          arial-label="Enviar mensaje"
          onClick={sendMessage}
          className="bg-primary  font-bold card-style px-4 py-2 rounded-md"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
