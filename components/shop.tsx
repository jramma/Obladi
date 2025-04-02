"use client";

import Image from "next/image";

const products = [
  {
    id: 1,
    title: "Pin del valor",
    price: 10,
    description: "Este pin representa la valentía.",
    bg: "bg-primary",
    image: "/hero.png",
  },
  {
    id: 2,
    title: "Pin de la sabiduría",
    price: 12,
    description: "Sabiduría y estrategia en uno.",
    bg: "bg-secondary",
    image: "/hero.png",
  },
  {
    id: 3,
    title: "Pin del honor",
    price: 8,
    description: "Un símbolo de respeto y dignidad.",
    bg: "bg-tertiary",
    image: "/hero.png",
  },
];

export default function Shop({ user }: any) {
  return (
    <div className="p-6 flex flex-col gap-6 w-full overflow-visible">
      <h2 className="text-4xl font-light mt-12">Tienda de Pines</h2>

      {/* Contenedor deslizable en móviles */}
      <div className="overflow-visible -mx-10">
        <div className="w-full flex gap-6 overflow-scroll py-4 p-8" >
          {products.map((product) => (
            <div
              key={product.id}
              className={`card-style flex-shrink-0 flex flex-col ${product.bg} overflow-hidden relative w-[90%] sm:w-[80%] md:w-1/3 max-w-[300px] mx-auto rounded-xl`}
            >
              <div className="w-full pt-6 px-6 pb-2 overflow-hidden">
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
                <p className="font-semibold text-primary">
                  💎 {product.price} pines
                </p>
                <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                  Canjear pines
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
