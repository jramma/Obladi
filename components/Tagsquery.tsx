"use client";

import { useState } from "react";

const suggestedTags = ["teléfono", "negro", "Samsung", "mochila", "llaves", "cartera"];

export default function TagsQuery({
  name = "tags",
  value,
  onChange,
}: {
  name?: string;
  value: string[];
  onChange: (tags: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = (tag: string) => {
    const newTag = tag.trim().replace(/,$/, "");
    if (newTag && !value.includes(newTag)) {
      onChange([...value, newTag]);
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
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="flex-col flex gap-3">
      <label className="block font-bold">Tags</label>

      {/* Pills */}
      <div className="flex flex-wrap gap-2">
        {value.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-200 text-black text-sm px-3 py-1 rounded-full flex items-center gap-1"
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

      {/* Input */}
      <input
        type="text"
        value={inputValue}
        placeholder="Escribe y pulsa Enter o ,"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="card-style2 mt-1 block bg-white text-black w-full p-2 border border-gray-300 rounded-md shadow-sm"
      />

      {/* Sugerencias */}
      <div className="flex flex-wrap gap-2 mt-2">
        {suggestedTags.map((tag, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleAddTag(tag)}
            className="bg-tertiary border-2 border-solid text-black text-sm px-3 py-1 rounded-full hover:bg-black hover:text-white transition"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Campo oculto para enviar con next/form */}
      <input type="hidden" name={name} value={value.join(",")} />
    </div>
  );
}
