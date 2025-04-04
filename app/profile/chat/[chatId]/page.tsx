import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { Menu } from "@/components/profile/menu";
import MessageInput from "@/components/profile/MessageInput";
import MessageList from "@/components/profile/MessageList";

export default async function ChatViewPage({
  params,
}: {
  params: { chatId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <p>No estás autenticado</p>;

  const client = await clientPromise;
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
    <main className="container flex-grow flex flex-row justify-end py-20">
      <Menu />
      <section className="max-w-3/4 px-8 flex flex-col gap-6 flex-grow">
        <p className="max-w-96">Esta conversación esta guardada en una base de datos no relacional y la seguridad es toda la que pueda garantizar un cluster gratuito</p>        
        <MessageList chatId={params.chatId} currentUserId={session.user.id} />
        <MessageInput chatId={params.chatId} />
      </section>
    </main>
  );
}
