"use client";
import { useState, useEffect } from "react";
const suggestedTags = [
  "teléfono",
  "negro",
  "Samsung",
  "mochila",
  "llaves",
  "cartera",
];

export default function TagsInput({
  register,
  setValue,
  resetTrigger,
}: {
  register: any;
  setValue: any;
  resetTrigger?: number; // o boolean si prefieres
}) {
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

  useEffect(() => {
    setTags([]);
    setValue("tags", []);
  }, [resetTrigger]);

  return (
    <div className="flex-col flex gap-3 ">
      <label className="block font-bold">Tags</label>

      {/* Tag pills */}
      <div className="flex flex-wrap gap-2 text-black">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1"
          >
            {tag}
            <button
              aria-label="Eliminar tag"
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
      <div className="flex md:flex-row flex-col gap-6 items-center text-black">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe una tag..."
          className="card-style2 mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />

        <button
          aria-label="Añadir tag"
          type="button"
          onClick={() => handleAddTag(inputValue)}
          disabled={!inputValue.trim()}
          className="bg-tertiary text-base card-style2 text-black font-bold self-start md:self-auto px-4 py-2 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Añadir
        </button>
      </div>

      {/* Tags sugeridos */}
      <div className="flex flex-wrap gap-2 mt-2">
        {suggestedTags.map((tag, i) => (
          <button
            aria-label="Añadir tag sugerido"
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
