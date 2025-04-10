"use client";

import { useEffect, useState, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import Avatar from "@/components/ui/Avatar";

export default function MessageList({
  chatId,
  currentUserId,
}: {
  chatId: string;
  currentUserId: string;
}) {
  const [messages, setMessages] = useState<any[]>([]);

  const fetchMessages = async () => {
    const res = await fetch(`/api/chat/messages?chatId=${chatId}`);
    const data = await res.json();
    setMessages(data.messages);
  };

  useEffect(() => {
    fetchMessages(); // primer fetch
    const interval = setInterval(fetchMessages, 5000); // refresco cada 5s
    return () => clearInterval(interval);
  }, [chatId]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col gap-2 max-h-[60vh] max-w-[700px] overflow-y-auto p-4"
    >
      {messages.map((msg, idx) => {
        const isOwnMessage = msg.sender === currentUserId;
        return (
          <div
            key={idx}
            className={`flex pt-2 gap-3 flex-row ${isOwnMessage ? "self-end items-end" : "self-start items-start"}`}
          >
            {!isOwnMessage && (
              <Avatar
                seed={msg.senderName || "Usuario"} // asegúrate de tener `senderName` en el mensaje
                userImage={msg.senderAvatarUrl} // o puedes usar Dicebear aquí
              />
            )}
            <div className="flex flex-col items-center gap-2 mb-1">
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(msg.createdAt), {
                  addSuffix: true,
                })}
              </span>
              <div
                className={`px-4 py-2  ${isOwnMessage ? "bg-blue-100 text-black rounded-lg" : ""}`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
