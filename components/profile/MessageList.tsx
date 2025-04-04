"use client";

import { useEffect, useState, useRef } from "react";

export default function MessageList({
  chatId,
  currentUserId,
}: {
  chatId: string;
  currentUserId: string;
}) {
  const [messages, setMessages] = useState<any[]>([]);

  const fetchMessages = async () => {
    const res = await fetch(`/api/messages?chatId=${chatId}`);
    const data = await res.json();
    setMessages(data.messages);
  };

  useEffect(() => {
    fetchMessages(); // primer fetch
    const interval = setInterval(fetchMessages, 100000); // refresco cada 5s
    return () => clearInterval(interval);
  }, [chatId]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight; // ⬇️ scroll hasta abajo
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col gap-1  max-h-[60vh] max-w-[700px] overflow-y-auto  p-4 border-3 rounded-md bg-gray-300"
    >
      {messages.map((msg, idx) => (
        <div
          className={`max-w-[75%] ${
            msg.sender === currentUserId ? "self-end " : "self-start"
          }`}
          key={idx}
        >
          <div
            className={`px-4 py-2 border-3 rounded-full ${
              msg.sender === currentUserId ? " bg-tertiary " : " bg-white"
            }`}
          >
            <p>{msg.text}</p>
          </div>
          <p
            className={`text-xs  text-right mt-1  ${
              msg.sender === currentUserId ? "  self-end " : "self-start "
            }`}
          >
            {new Date(msg.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
