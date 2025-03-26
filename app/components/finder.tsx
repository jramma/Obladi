"use client";

import Form from "next/form";
import { Icons } from "@/components/icons";

export default function Finder() {
  return (
    <section className="py-20 md:py-72 flex flex-col w-full bg-secondary/30">
      <div className="container flex flex-col gap-8 md:gap-20 items-center">
        <h2 className="w-full text-5xl font-light text-center">
          Encuentra tu objeto perdido
        </h2>
        <Form action="/search" className="relative w-full max-w-[700px] ">
          <input
            name="query"
            type="text"
            placeholder="Buscar..."
            className="w-full p-2 backdrop-blur-xl pb-20 outline-none text-lg text-gray-700 dark:text-gray-200  card-style bg-white dark:bg-black border-2 border-black"
          />

          <div className="flex items-center justify-between absolute p-2 bottom-0 w-full">
            <div className="flex items-center gap-2 ">
              <button
                type="button"
                className=" text-white group rounded-full bg-primary border-2 p-1 border-black "
                onClick={() => {
                  // Implementar lógica para obtener la ubicación del usuario
                  console.log("Obteniendo localización...");
                }}
              >
                <Icons.location className="w-8 h-8 group-hover:rotate-180 transition" />
              </button>

              <button
                type="button"
                className="bg-secondary text-black hover:pr-20 ease-in-out transition-all duration-500 border-black border-2 rounded-full py-1 px-3  flex items-center gap-1 group "
                onClick={() => {
                  // Implementar lógica para mostrar o agregar tags
                  console.log("Añadir etiquetas...");
                }}
              >
                <Icons.plus className="w-8 h-8 group-hover:rotate-180 transition " />
                Tags
              </button>
            </div>
            <button type="submit" className="bg-tertiary/70 hover:bg-tertiary transition rounded-full p-1 border-2 pr-10 group cursor-pointer">
              <Icons.arrow className="w-8 h-8  group-hover:translate-x-10 transition" />
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
}
