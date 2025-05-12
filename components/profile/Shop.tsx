"use client";

import Image from "next/image";
import { GiBottleCap } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Icons } from "../Icons";

const products = [
  {
    id: 1,
    title: "Taza ObLaDi",
    price: 5,
    description: "La taza que te hará sentir como un rey con cada sorbo.",
    bg: "bg-secondary",
    image: "/taza.png",
  },
  {
    id: 2,
    title: "Gorra ObLaDa",
    price: 12,
    description: "Los reyes lleban corona, las buenas personas gorra.",
    bg: "bg-tertiary",
    image: "/gorra.png",
  },
  {
    id: 3,
    title: "Camiseta ObLaDi",
    price: 30,
    description:
      "Lleva tu barrio cerca de tu corazón, mejor que cualquier bandera.",
    bg: "bg-primary",
    image: "/camiseta.png",
  },
];

export default function Shop({ user }: any) {
  return (
    <div className="p-6 py-10 pb-40 flex flex-col gap-6 w-full overflow-hidden relative">
      <Icons.topography className="absolute top-0 opacity-40 scale-150 text-accent" />

      <h2 className="text-4xl font-semibold mt-12 z-20">Tienda de Pines</h2>

      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full !overflow-visible flex items-start"
      >
        {products.map((product) => (
          <SwiperSlide key={product.title} className="flex py-10 !h-[600px] ">
            <div
              className={`card-style flex flex-col justify-between h-full max-h-[600px] w-full max-w-xs mx-auto rounded-xl overflow-hidden ${product.bg}`}
            >
              <div className="pt-6 px-6 pb-2">
                <div className="border-3 border-black dark:border-white relative rounded-2xl aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between border-t-3 bg-white dark:bg-black p-4 gap-2 flex-grow">
                <p className="text-lg font-bold">{product.title}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">
                  {product.description}
                </p>
                <p className="font-semibold flex gap-2 items-center text-primary mt-auto bg-black self-start rounded-md p-1">
                  <GiBottleCap /> {product.price} pines
                </p>
                <button
                  aria-label="canjear-pines"
                  className={` ${product.bg} px-4 py-2 text-black font-bold rounded hover:bg-black dark:hover:border-white border-2 hover:text-white transition`}
                >
                  Canjear pines
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
