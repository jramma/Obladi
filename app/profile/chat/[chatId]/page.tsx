import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { Menu } from "@/components/profile/menu";

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
        <h2 className="text-4xl font-light mb-6">Conversación</h2>

        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto p-4 border rounded-md">
          {messages.map((msg: any, idx: number) => (
            <div
              key={idx}
              className={`p-2 rounded-md max-w-[75%] ${
                msg.sender === session.user.id
                  ? "bg-primary-100 self-end"
                  : "bg-secondary-100 self-start"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs text-gray-400 text-right mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
