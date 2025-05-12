"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export const CollapsibleSection = ({ id, title, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("open") === id) {
      setIsOpen(true);
    }
  }, [searchParams, id]);

  return (
    <section
      id={id}
      className="w-full border-b relative border-gray-300 py-6 md:py-20 px-4 md:px-0 overflow-hidden "
    >
      <div
        className="flex items-center justify-between md:justify-start cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-3xl md:text-5xl md:pl-6 font-semibold">{title}</h2>
        <span
          className="md:hidden ml-4 transition-transform"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <FaChevronDown />
        </span>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden  ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        } md:max-h-none md:opacity-100`}
      >
        <div className="mt-4 overflow-hidden">{children}</div>
      </div>
    </section>
  );
};
