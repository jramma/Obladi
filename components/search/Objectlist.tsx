import { useUser } from "@/hooks/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ObjectList({ obj, objectKey }: any) {
  const user = useUser();
  const router = useRouter();

  const handleReclaim = async () => {
    const res = await fetch("/api/chats/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        objectId: obj._id,
        ownerEmail: obj.email,
      }),
    });

    if (res.ok) {
      alert("✅ Chat creado o ya existente. Redirigiendo...");
      router.push("/profile/chat");
    } else {
      alert("❌ No se pudo crear el chat.");
    }
  };

  return (
    <Link href={"/profile/objects/"+obj._id} key={objectKey} className="no-underline-effect flex flex-col gap-2 mx-2 bg-black/10 dark:bg-white/10 p-2 rounded-lg hover:bg-black/30 hover:dark:bg-white/30 transition-all duration-200">
      <div className=" flex flex-wrap gap-2 ">
        <p className="font-bold">Objeto:</p>
        <h3 className="text-xl font-bold ">{obj.title}</h3>
      </div>
      <div className=" flex flex-col gap-2 ">
        <p className="font-bold">Descripción:</p>
        <p className="border-2 rounded-md p-2">{obj.description}</p>
      </div>
      <div className=" flex flex-wrap gap-2 ">
        <p className="font-bold">Ubicación:</p>
        <p className="">{obj.location}</p>
      </div>

      <div className="flex gap-2 mt-2 flex-wrap">
        {obj.tags.length > 1 &&
          obj.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="bg-tertiary text-sm px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
      </div>
    </Link>
  );
}
