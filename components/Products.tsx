"use client";
import React, { useState } from "react";
import { FaPlaneDeparture, FaArrowRight } from "react-icons/fa";
import { LuTrainFront, LuMountain } from "react-icons/lu";
import type { IconType } from "react-icons";
import Link from "next/link";

const products: {
  icon: IconType;
  text: string;
  bgColor?: string;
  extra?: React.ReactNode;
}[] = [
  {
    icon: FaPlaneDeparture,
    text: "Objetos perdidos de los aeropuertos",
    extra:
      "Manejo automatizado de objetos perdidos con filtros por terminal o compañía",
  },
  {
    icon: LuTrainFront,
    text: "Control en las estaciones de trenes",
    extra: "Control por trayectos, horarios y zonas de paso",
  },
  {
    icon: LuMountain,
    text: "En cualquier lugar",
    extra:
      "Geolocalización avanzada para objetos encontrados en montañas, parques o caminos rurales",
  },
];

export default function Products() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container py-10 px-5 ">
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-10">
        {products.map(({ icon: Icon, text, extra }, index) => (
          <div
            key={index}
            className="product cursor-pointer card-style flex flex-col gap-6 items-start"
          >
            <div className="rounded-full w-20 h-20 flex items-center justify-center text-black bg-accent">
              <Icon className="text-5xl" />
            </div>
            <p className="max-w-72">{text}</p>
            <Link
              href={"/about#soluciones"}
              className="text-2xl mt-auto flex w-full justify-between items-center"
            >
              Ver más <FaArrowRight className="-rotate-45" />
            </Link>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex flex-col gap-4 md:hidden  w-full">
        {products.map(({ icon: Icon, text, extra }, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              aria-label="toggle-accordion"
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between px-4 py-3 bg-accent text-black"
            >
              <div className="flex items-center gap-4">
                <Icon className="text-2xl" />
                <span className="text-left text-sm font-semibold">{text}</span>
              </div>
              <FaArrowRight
                className={`transition-transform ${
                  openIndex === index ? "rotate-45" : "-rotate-45"
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-sm bg-white text-paragraph">
                {extra ? extra : <p>Más información próximamente</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
