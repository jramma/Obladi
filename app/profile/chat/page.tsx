import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { Menu } from "@/components/profile/menu";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function ChatPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <p>No estás autenticado</p>;

  const client = await clientPromise;
  const db = client.db();
  const userId = new ObjectId(session.user.id);

  // Reclamaciones del usuario
  const reclaimObjects = await db
    .collection("reclaimObject")
    .find({ claimedBy: userId })
    .toArray();

  // Posibles chats (con usuarios que han perdido objetos)
  const chatCandidates = await Promise.all(
    reclaimObjects.map(async (reclaim) => {
      const lost = await db
        .collection("lostObjects")
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
      participants: userId,
    })
    .toArray();

  return (
    <main className="container flex-grow flex flex-row justify-end py-20">
      <Menu />
      <section className="max-w-3/4 px-8 flex flex-grow flex-col gap-6">
        <h2 className="text-4xl font-light mb-6">Tus chats</h2>
        {userChats.length === 0 ? (
          <>
            <p className="text-gray-500">No hay chats disponibles</p>
            <p className="max-w-96">Se crearán salas de chat si hay coincidencias entre objetos que hayas perdido y objetos que se hayan encontrado y viceversa.</p>
          </>
        ) : (
          <ul className="space-y-4">
            {userChats.map((chat) => (
              <li key={chat._id.toString()} className="border-b py-2">
                <Link
                  href={`/profile/chat/${chat._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Ver conversación sobre objeto {chat.objectId.toString()}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
