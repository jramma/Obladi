import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import MessageInput from "@/components/profile/MessageInput";
import MessageList from "@/components/profile/MessageList";
import { BsFillInfoSquareFill } from "react-icons/bs";
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
    <div className=" flex-grow flex flex-row justify-end py-20">
      <section className="px-8 flex flex-col gap-6 flex-grow">
        <div className="flex flex-wrap gap-2">
          <BsFillInfoSquareFill className="w-6 h-6 text-primary border-2 border-black dark:border-white rounded-md" />
          <p className="max-w-96">
            Esta conversación esta guardada en una base de datos no relacional y
            la seguridad es toda la que pueda garantizar un cluster gratuito.
          </p>
        </div>
        <MessageList chatId={params.chatId} currentUserId={session.user.id} />
        <MessageInput chatId={params.chatId} />
      </section>
    </div>
  );
}
