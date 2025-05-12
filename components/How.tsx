"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { LuCircleChevronDown } from "react-icons/lu";
import { Icons } from "@/components/Icons";
const cardsData = [
  {
    bgColor: "shadow-primary",
    title: "Todos <b>perdemos</b> objetos",
    description:
      "Gracias a la localización y esta red social no ocurrirá más. También es una gran solución a <b>maletas</b> y objetos que puedas perder durante un viaje, mudanza, de camino al trabajo o en el <b>transporte público</b>.",
    imageSrc: "/7.svg",
  },
  {
    bgColor: "shadow-secondary",
    title: "Encuentra <b>fácilmente</b> tus objetos",
    description:
      "Utiliza nuestra plataforma para localizar tus pertenencias. Si un objeto coincide con tu descripción <b>te lo notificaremos!</b>",
    imageSrc: "/22.svg",
  },
  {
    bgColor: "shadow-tertiary",
    title: "Conéctate con <b>otros</b> usuarios",
    description:
      "Comparte información y ayuda a otros a encontrar sus objetos. <b>Consigue así pines</b> que podrás canjear por regalos!",
    imageSrc: "/27.svg",
  },
];

export default function How() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setOpenIndex(index); // Abre el acordeón al entrar en vista
              observer.disconnect();
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section
      id="report"
      className="py-10 relative w-full md:py-20 flex flex-col  px-4 md:px-0 gap-6 md:gap-10 max-w-full overflow-hidden"
    >
      <Icons.topography className="absolute top-0 scale-150 opacity-30 text-primary" />
      <div className="container flex items-start flex-col gap-10">
        <h2 className="text-5xl font-semibold z-10">Como funcionamos</h2>

        {/* Desktop layout */}
        <div className="hidden  md:grid grid-cols-3 gap-10 h-auto px-6 md:px-0">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-black card-style ${card.bgColor} flex flex-grow flex-col gap-6 p-6 h-full`}
            >
              <h3
                className="text-4xl max-w-96"
                dangerouslySetInnerHTML={{ __html: card.title }}
              />
              <div className="flex flex-col gap-6 p-6 mb-auto">
                <p
                  className="pb-20 md:pb-0 max-w-72"
                  dangerouslySetInnerHTML={{ __html: card.description }}
                />
                <Image
                  className=" bg-white rounded-full mx-auto md:relative -right-6 bottom-0"
                  src={card.imageSrc}
                  alt={`Step ${index + 1}`}
                  width={400}
                  height={400}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col gap-4 w-full z-10">
        {cardsData.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              refs.current[index] = el;
            }}
            className={`card-style ${card.bgColor} bg-white dark:bg-black rounded-lg overflow-hidden`}
          >
            <button
              aria-label="toggle-accordion"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-4 text-left"
            >
              <h3
                className="text-xl font-semibold"
                dangerouslySetInnerHTML={{ __html: card.title }}
              />
              <LuCircleChevronDown
                className={`text-2xl transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="flex flex-col gap-4 p-4 pt-0 bg-white dark:bg-black">
                <p
                  className="text-base"
                  dangerouslySetInnerHTML={{ __html: card.description }}
                />
                <Image
                  className="bg-white rounded-full mx-auto"
                  src={card.imageSrc}
                  alt={`Step ${index + 1}`}
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
