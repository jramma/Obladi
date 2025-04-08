// app/profile/chat/layout.tsx
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { Menu } from "@/components/profile/Menu";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { IoChatboxSharp } from "react-icons/io5";

export default async function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <p>No estás autenticado</p>;

  const client = await clientPromise;
  const db = client.db();
  if (!session?.user?.id || !ObjectId.isValid(session.user.id)) {
    console.warn("❌ ID de usuario inválido:", session.user.id);
    return <p>No estás autenticado</p>;
  }
  const userId = new ObjectId(session.user.id);

  // Reclamaciones del usuario
  const reclaimObjects = await db
    .collection("objects")
    .find({ claimedBy: userId })
    .toArray();

  // Posibles chats (con usuarios que han perdido objetos)
  const chatCandidates = await Promise.all(
    reclaimObjects.map(async (reclaim) => {
      const lost = await db
        .collection("objects")
        .findOne({ _id: reclaim.objectId });

      if (!lost) return null;
      const otherUserId = lost.findBy.toString();
      if (otherUserId === userId.toString()) return null;

      return {
        objectId: reclaim.objectId,
        participants: [userId.toString(), otherUserId],
      };
    })
  );

  // Crear chats si no existen (opcional, puedes mover esto a otro lado)
  const validChats = chatCandidates.filter(Boolean);
  for (const chat of validChats) {
    const exists = await db.collection("chats").findOne({
      objectId: chat!.objectId,
      participants: { $all: chat!.participants },
    });

    if (!exists) {
      await db.collection("chats").insertOne({
        participants: chat!.participants,
        objectId: chat!.objectId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  // Cargar todos los chats del usuario
  const userChats = await db
    .collection("chats")
    .find({
      participants: { $in: [userId.toString()] },
    })
    .toArray();

  // Cargar títulos de los objetos, vengan de objects o reclaimObject
  const chatListWithTitles = await Promise.all(
    userChats.map(async (chat) => {
      const lost = await db
        .collection("objects")
        .findOne({ _id: chat.objectId });
      const reclaim = await db
        .collection("reclaimObject")
        .findOne({ _id: chat.objectId });

      const objectData = lost || reclaim;
      return {
        _id: chat._id,
        objectId: chat.objectId,
        title: objectData?.title || "Objeto sin título",
        type: lost ? "Perdido" : "Reclamado",
      };
    })
  );

  return (
    <main className="flex-grow pl-72 flex flex-row w-full overflow-hidden -mb-12">
      <Menu />
      <nav className="max-w-1/4 px-5 py-20 flex flex-grow flex-col gap-6 border-r-4 overflow-scroll">
        <h2 className="text-4xl font-light mb-6">Tus chats</h2>
        {userChats.length === 0 ? (
          <>
            <p className="text-gray-500">No hay chats disponibles</p>
            <p className="max-w-96">
              Se crearán salas de chat si hay coincidencias entre objetos que
              hayas perdido y objetos que se hayan encontrado y viceversa.
            </p>
          </>
        ) : (
          <ul className="flex flex-col gap-4 items-start max-w-full">
            {chatListWithTitles.map((chat) => (
              <li key={chat._id.toString()} className="group">
                <Link
                  href={`/profile/chat/${chat._id}`}
                  className=" no-underline-effect text-xl font-bold  p-2 flex gap-1 items-center"
                >
                  Conversación "{chat.title}" {chat.type.toLowerCase()}
                  <IoChatboxSharp
                    className={`w-12 bg-gray-300 shrink-0 p-2 aspect-square rounded-md h-12 group-hover:animate-bounce   group ${chat.type === "Perdido" ? " text-crimson" : " text-yellow"}`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
      <div className="max-w-3/4 flex flex-grow items-center justify-center">
        {children}
      </div>
    </main>
  );
}
