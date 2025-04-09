"use client";

import Image from "next/image";
import { GiBottleCap } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
    <div className="p-6 flex flex-col gap-6 w-full overflow-hidden">
      <h2 className="text-4xl font-light mt-12">Tienda de Pines</h2>

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
        className="w-full !overflow-visible flex items-stretch "
      >
        {products.map((product) => (
          <SwiperSlide key={product.title} className="flex flex-grow py-8">
            <div
              className={`card-style m-6 flex flex-grow  flex-col ${product.bg} overflow-hidden relative w-full max-w-xs mx-auto rounded-xl`}
            >
              <div className="w-full pt-6 px-6 pb-2 overflow-hidden ">
                <div className="border-3 border-black overflow-hidden relative rounded-2xl aspect-square">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col border-t-3 bg-white dark:bg-black p-4 gap-2">
                <p className="text-lg font-bold">{product.title}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {product.description}
                </p>
                <p className="font-semibold flex gap-2 items-center text-primary">
                  <GiBottleCap /> {product.price} pines
                </p>
                <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
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
