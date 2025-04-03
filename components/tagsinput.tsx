"use client";
import { useState } from "react";
const suggestedTags = ["teléfono", "negro", "Samsung", "mochila", "llaves", "cartera"];

export default function TagsInput({ register, setValue }: any) {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (tag: string) => {
    const newTag = tag.trim().replace(/,$/, ""); // quita espacios y coma final
    if (newTag && !tags.includes(newTag)) {
      const updated = [...tags, newTag];
      setTags(updated);
      setValue("tags", updated); // actualiza el form
    }
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", " ", ","].includes(e.key)) {
      e.preventDefault();
      handleAddTag(inputValue);
    }
  };

  const removeTag = (tag: string) => {
    const updated = tags.filter((t) => t !== tag);
    setTags(updated);
    setValue("tags", updated);
  };

  return (
    <div className="flex-col flex gap-3">
      <label className="block font-bold">Tags</label>

      {/* Tag pills */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-red-600 hover:text-red-800"
            >
              ❌
            </button>
          </span>
        ))}
      </div>

      {/* Input para escribir */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe y pulsa Enter o ,"
        className="card-style2 mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md shadow-sm"
      />

      {/* Tags sugeridos */}
      <div className="flex flex-wrap gap-2 mt-2">
        {suggestedTags.map((tag, i) => (
          <button
            type="button"
            key={i}
            onClick={() => handleAddTag(tag)}
            className="bg-tertiary border-2 text-black text-sm px-3 py-1 rounded-full hover:bg-black hover:text-white transition"
          >
            {tag}
          </button>
        ))}
      </div>
    

      {/* Input oculto real que se registra en el form */}
      <input type="hidden" value={tags.join(",")} {...register("tags")} />
    </div>
  );
}
