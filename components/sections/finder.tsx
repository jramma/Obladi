"use client";

import { useState } from "react";
import { Icons } from "../icons";
import TagsQuery from "@/components/tagsquery";

export default function Finder() {
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  const handleGeolocate = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
      );
      const data = await res.json();
      const locationName =
        data.address.city || data.address.town || data.display_name;

      setLocation(locationName);
    });
  };

  function showTags() {
    const tagsElement = document.getElementById("tags");
    if (tagsElement) {
      tagsElement.classList.toggle("hidden");
    }
  }

  return (
    <section id="find" className="py-20 md:py-72 flex flex-col w-full bg-secondary/30">
      <div className="container flex flex-col gap-8 md:gap-20 items-center">
        <h2 className="w-full text-5xl font-light text-center">
          Encuentra tu objeto perdido
        </h2>
       <form action="/search" method="GET"
          className="relative w-full flex flex-col gap-6 max-w-[700px] "
        >
          <input
            name="query"
            type="text"
            placeholder="Buscar..."
            className="w-full p-2 backdrop-blur-xl pb-20 outline-none text-lg text-gray-700 dark:text-gray-200 card-style bg-white dark:bg-black border-2 border-black"
          />

          {/* Inputs ocultos */}
          <input type="hidden" name="tags" value={tags.join(",")} />
          <input type="hidden" name="location" value={location} />

          <div className="flex items-center justify-between absolute p-2 top-14 w-full">
            <div className="flex items-center gap-2 ">
              <button
                type="button"
                className=" text-white group rounded-full bg-primary border-2 p-1 border-black"
                onClick={handleGeolocate}
              >
                <span className="absolute -top-6 -left-10 bg-primary rounded-md px-2 font-bold group-hover:block hidden transition-all duration-300 ease-in-out">
                  Obtener Localización
                </span>
                <Icons.location className="w-8 h-8 group-hover:rotate-180 transition" />
              </button>

              <button
                type="button"
                onClick={() => {
                  showTags();
                }}
                className="bg-secondary text-black hover:pr-20 transition border-black border-2 rounded-full py-1 px-3 flex items-center gap-1 group"
              >
                <Icons.plus className="w-8 h-8 group-hover:rotate-180 transition" />
                Tags
              </button>
            </div>

            <button
              type="submit"
              className="bg-tertiary/70 hover:bg-tertiary group transition rounded-full p-1 border-2 pr-10 group cursor-pointer"
            >
              <span className="absolute -top-6 bg-tertiary text-black rounded-md px-2 font-bold group-hover:block hidden transition-all duration-500 ease-in-out">
                Buscar
              </span>
              <Icons.arrow className="w-8 h-8 group-hover:translate-x-10 transition" />
            </button>
          </div>
          <div id="tags" className="hidden transition left-2 -bottom-40  w-full max-w-[600px]">
            <TagsQuery value={tags} onChange={setTags} />
          </div>
        </form>
      </div>
    </section>
  );
}
