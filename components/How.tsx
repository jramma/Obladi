import React from "react";
import Image from "next/image";
import { Icons } from "./Icons";

const cardsData = [
  {
    bgColor: "bg-primary",
    icon: <Icons.location className="w-20 h-20 -ml-4  -mt-4  absolute -right-4 -top-2 dark:text-green-200" />,
    title: "Todos <b>perdemos</b> objetos",
    description:
      "Gracias a la localización y esta red social no ocurrirá más. También es una gran solución a <b>maletas</b> y objetos que puedas perder durante un viaje, mudanza, de camino al trabajo o en el <b>transporte público</b>.",
    imageSrc: "/7.svg",
  },
  {
    bgColor: "bg-secondary",
    icon: <Icons.location className="w-20 h-20 -ml-4  -mt-4  absolute -right-4 -top-2 dark:text-green-200" />,
    title: "Encuentra <b>fácilmente</b> tus objetos",
    description:
      "Utiliza nuestra plataforma para localizar tus pertenencias. Si un objeto coincide con tu descripción <b>te lo notificaremos!</b>",
    imageSrc: "/22.svg",
  },
  {
    bgColor: "bg-tertiary",
    icon: <Icons.location className="w-20 h-20 -ml-4  -mt-4  absolute -right-4 -top-2 dark:text-green-200" />,
    title: "Conéctate con <b>otros</b> usuarios",
    description:
      "Comparte información y ayuda a otros a encontrar sus objetos. <b>Consigue así pines</b> que podrás conajear por regalos!",
    imageSrc: "/27.svg",
  },
];

export default function How() {
  return (
    <section className="py-10 md:py-20 flex flex-col container px-4 md:px-0 gap-6 md:gap-10 ">
      <h3 className="text-5xl font-light">Como funcionamos</h3>
      <div className="grid md:grid-cols-3 max-w-[1000px] grid-cols-1 gap-10 w-full h-auto px-6 md:px-0 text-[#000000] ">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className={`relative card-style ${card.bgColor} flex flex-col gap-6 p-6 md:max-w-72 `}
          >
            {card.icon}
            {card.title && (
              <h3
                className="text-4xl"
                dangerouslySetInnerHTML={{ __html: card.title }}
              />
            )}
            {card.description && (
              <p className="pb-20 md:pb-0" dangerouslySetInnerHTML={{ __html: card.description }} />
            )}
            <Image
              className="md:mt-auto absolute md:relative  w-40 h-40 md:w-auto md:h-auto -right-6 bottom-0"
              src={card.imageSrc}
              alt={`Step ${index + 1}`}
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
