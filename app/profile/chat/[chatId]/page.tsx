import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import MessageInput from "@/components/profile/MessageInput";
import MessageList from "@/components/profile/MessageList";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { redirect } from "next/navigation";

export default async function ChatViewPage({
  params,
}: {
  params: { chatId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <p>No estás autenticado</p>;
  let client;
  try {
    client = await clientPromise;
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error);

    // 👇 Redirige al inicio si hay fallo de conexión
    redirect("/");
  }

  const db = client.db();
  const userId = new ObjectId(session.user.id);
  const chatObjectId = new ObjectId(params.chatId);

  const chat = await db.collection("chats").findOne({ _id: chatObjectId });
  if (!chat || !chat.participants.includes(userId.toString())) {
    return notFound();
  }

  const messages = await db
    .collection("messages")
    .find({ chatId: chatObjectId })
    .sort({ createdAt: 1 })
    .toArray();

  return (
    <div className=" pb-40 md:py-20 w-full relative flex flex-col gap-6">
      <section className="px-8 flex flex-col gap-6 flex-grow  w-full">
        <div className="flex flex-wrap gap-2">
          <BsFillInfoSquareFill className="w-6 h-6 text-primary border-2 border-black dark:border-white rounded-md" />
          <p className="max-w-96">
            Haz preguntas y cuestiones sobre el objeto perdido. Puedes hablar
            con el usuario que lo encontró o con otros usuarios que también lo
            han reclamado.
          </p>
        </div>
        <MessageList chatId={params.chatId} currentUserId={session.user.id} />
        <MessageInput chatId={params.chatId} />
      </section>
    </div>
  );
}
