import { useUser } from "@/context/UserContext";
import ImageList from "@/components/search/ImageList";
import { useRouter } from "next/navigation";

export default function Object({ obj, objectKey }: any) {
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
    <div key={objectKey} className="card-style w-full flex flex-col gap-4 p-6">
      <div className="flex flex-col md:flex-wrap gap-4 w-full justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-bold">Objeto:</p>
          <h3 className="text-xl font-bold mb-2">{obj.title}</h3>
          <p className="font-bold">Descripción:</p>
          <p className="border-2 rounded-md p-2 min-h-20">{obj.description}</p>
          <p className="font-bold">Ubicación:</p>
          <p className="">{obj.location}</p>
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
        </div>
        <div className="md:hidden max-w-1/2 h-[3px] bg-black dark:bg-white"></div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Contacto:</p>
          <h3 className="text-xl font-bold mb-2">{obj.email}</h3>
          {user?.email !== obj.email && (
            <button
              onClick={handleReclaim}
              className="bg-tertiary font-bold text-xl self-end px-8 py-3 card-style hover:shadow-tertiary"
            >
              Reclamar
            </button>
          )}
        </div>
      </div>

      {obj.imgs && (
        <>
          <div className="md:hidden  h-[3px] bg-black dark:bg-white"></div>
          <ImageList imgs={obj.imgs} title={obj.title} />
        </>
      )}
    </div>
  );
}
