"use client";

import { useState } from "react";

type ToggleProps = {
  label: string;
  initial?: boolean;
  onToggle?: (value: boolean) => void;
};

export default function Toggle({ label, initial = false, onToggle }: ToggleProps) {
  const [enabled, setEnabled] = useState(initial);

  const handleToggle = () => {
    setEnabled(!enabled);
    onToggle?.(!enabled);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between w-full  p-4 rounded-xl card-style">
      <span className="text-xl font-medium ">{label}</span>
      <button
        onClick={handleToggle}
        className={`relative border-2 inline-flex h-8 w-16 items-center rounded-full transition-colors ${
          enabled ? "bg-primary" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-8" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
