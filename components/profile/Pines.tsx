"use client";

import { useEffect, useState } from "react";
import { Icons } from "@/components/Icons";
import Avatar from "@/components/ui/Avatar";



type Props = {
  user: {
    pines: string[];
    chats?: string[];
  };
};
import Link from "next/link";

export default function Pines({ user }: Props) {
  const [pinDetails, setPinDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const avatars = Array.from({ length: user.chats?.length || 0 }, (_, index) => ({
    id: index + 1,
    chat: user.chats?.[index],
    seed: `chat-${Math.random().toString(36).substring(2, 15)}`,
  }));

  useEffect(() => {
    async function fetchPines() {
      try {
        const res = await fetch("/api/user/pines");
        const data = await res.json();
        setPinDetails(data);
      } catch (error) {
        console.error("Error fetching pines:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPines();
  }, []);

  const hasChats = user.chats && user.chats.length > 0;
  console.log("pins", user.pines);
  console.log("pin details", pinDetails);
  return (
    <div className="w-full flex flex-col md:flex-row py-10 md:py-20">
      {/* Sección de Pines */}
      <div className="p-6 flex flex-col gap-6">
        <h2 className="text-4xl mb-4 font-semibold">Tus Pines</h2>

        <div className="card-style max-h-20 md:min-w-96 md:p-6 flex justify-between gap-6 items-center group shadow-primary hover:text-primary hover:bg-white dark:hover:bg-black">
          <p className="text-5xl font-bold font-serif px-6">
            {user.pines.length || 0}
          </p>
          <Icons.pines
            className=" w-20 h-20 p-4 text-primary-content animate-spin"
            style={{ animationDuration: "20s" }}
          />
        </div>

        {!loading && pinDetails.length > 0 && (
          <div className="space-y-4">
            {pinDetails.map((pin, index) => (
              <div
                key={index}
                className="text-sm border-l-4 pl-4 border-primary"
              > 
                <p className="font-bold">{pin.icon}</p>
                <p className="font-medium">{pin.description}</p>
                <p className="text-xs text-muted">
                  {new Date(pin.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sección de Chats */}
      {hasChats && (
        <div className="p-6 flex flex-col gap-6">
          <h1 className="text-4xl font-light mb-4">Tus chats</h1>
          <div className="bg-secondary  card-style p-6 flex gap-2 w-full items-start group hover:shadow-secondary hover:text-secondary hover:bg-white dark:hover:bg-black">
            {avatars.map((avatar) => (
              <Link href={`/profile/chat/${avatar.chat}`}  key={avatar.id} className="flex no-underline-effect justify-center items-center">
                <Avatar seed={avatar.seed} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
