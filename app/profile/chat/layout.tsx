"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { useMongoUser } from "@/hooks/UseMongoUser";
interface ChatItem {
  _id: string;
  title: string;
  type: string;
}

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  const user = useMongoUser();
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const pathname = usePathname();
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const chats = chatList;
  useEffect(() => {
    const fetchChats = async () => {
      if (!user?.chats || user.chats.length === 0) return;
  
      const res = await fetch("/api/chats/byIds", {
        method: "POST",
        body: JSON.stringify({ ids: user.chats }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (res.ok) {
        const { chats } = await res.json();
        setChatList(chats);
      }
    };
  
    fetchChats();
  }, [user]);
  
  const isMobileChatVisible = mobileChatOpen && pathname !== "/profile/chat";

  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      {/* Sidebar de chats */}
      <nav
        className={`md:max-w-72 w-full md:w-72 bg-background p-5 md:py-20 flex flex-col gap-6 overflow-auto h-full md:relative z-10 
        ${isMobileChatVisible ? "hidden md:block" : "block"}`}
      >
        <h2 className="text-4xl font-light mb-6 py-4">Tus chats</h2>

        {chats.length === 0 ? (
          <>
            <p className="text-gray-500">No hay chats disponibles</p>
            <p className="max-w-96 pb-40">
              Se crearán salas de chat si hay coincidencias entre objetos que
              hayas perdido y objetos que se hayan encontrado y viceversa.
            </p>
          </>
        ) : (
          <ul className="flex flex-col gap-4 items-start max-w-full pb-40">
            {chats.map((chat) => (
              <li
                key={chat._id}
                className="group rounded-3xl border-3 border-solid border-black dark:border-white bg-gray-600 text-white w-full"
              >
                <Link
                  href={`/profile/chat/${chat._id}`}
                  onClick={() => setMobileChatOpen(true)}
                  className="no-underline-effect text-2xl justify-between font-bold px-5 p-2 flex items-start"
                >
                  <p className="pt-2">
                    Conversación {chat.title}
                  </p>
                  <FaArrowRight
                    className={`w-12 shrink-0 p-2 aspect-square rounded-md h-12 transition group-hover:translate-x-2 ${
                      chat.type === "Perdido" ? "text-crimson" : "text-yellow"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Contenido del chat */}
      <section
        className={`relative flex-grow h-full bg-white dark:bg-black transition-all duration-300 ${
          isMobileChatVisible ? "block" : "hidden md:block"
        }`}
      >
        {isMobileChatVisible && (
          <button
          aria-label="Cerrar chat"
          className="absolute top-4 right-4 z-20 p-2 bg-gray-200 dark:bg-gray-800 rounded-full md:hidden"
            onClick={() => setMobileChatOpen(false)}
          >
            <FaTimes className="text-xl" />
          </button>
        )}
        <div className="h-full w-full p-4 md:p-8 overflow-auto">{children}</div>
      </section>
    </div>
  );
}
