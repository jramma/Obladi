"use client";
import ImageList from "@/components/search/imageList";

export default function Object({ obj, key }: any) {
  return (
    <div key={key} className="card-style w-full flex flex-col gap-4 p-6">
      <div className="flex gap-4 w-full justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold mb-2">{obj.title}</h3>
          <p className="">{obj.description}</p>
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
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold mb-2">{obj.email}</h3>
          <button className="bg-tertiary font-bold  text-xl self-end px-8  py-3 card-style hover:shadow-tertiary">
            Reclamar
          </button>
        </div>
      </div>

      {obj.imgs && (
        <>
          <hr />
          <ImageList imgs={obj.imgs} title={obj.title} />
        </>
      )}
    </div>
  );
}
