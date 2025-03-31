"use client";

import { useEffect, useRef, useState } from "react";
import { IconCloudDemo } from "@/components/magicui/cloud";
import Image from "next/image";

export default function AboutPage() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHasScrolled(scrollTop > 300); // Puedes ajustar el valor umbral aquí
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.transform = hasScrolled
        ? "rotateX(24deg) rotateZ(0deg)"
        : "rotateX(51deg) rotateZ(43deg)";
    }
  }, [hasScrolled]);

  return (
    <div className="container flex flex-col self-center max-w-[1000px]">
      <section className="flex flex-row md:py-20 py-10 md:gap-10 gap-6 w-full">
        <div className="flex flex-col md:gap-10 gap-6">
          <h2 className="text-5xl font-light">¿Cómo funciona?</h2>
          <p className="text-xl max-w-72">
            Obladi nace de la necesidad de tener un espacio dónde se encuentren
            todos los objetos perdidos del mundo.
          </p>
          <p className="text-xl max-w-72">
            Si encuentras un objeto simplemente subelo aquí y si lo has perdido,
            busca en la lista de objetos perdidos.
          </p>
          <p className="text-2xl max-w-72 ">
            ¡Si en <span className="bg-tertiary text-black">dos años</span> no se reclama el objeto puedes quedartelo!
          </p>
        </div>
        <div className="flex w-1/2 flex-grow justify-center items-center relative">
          <IconCloudDemo />
        </div>
      </section>
      <section className="flex flex-row-reverse md:py-20 py-10 md:gap-10 gap-6 w-full">
        <div className="flex flex-col md:gap-10 gap-6 text-right items-end">
          <h2 className="text-5xl font-light">Sobre el proyecto</h2>
          <p className="text-xl max-w-72">
            El proyecto es el trabajo del Máster en Desarrollos web y apps de la
            UOC.
          </p>
          <p className="text-xl max-w-72">
            Lo tienes en GitHub y puedes hacer con él lo que quieras. Sus
            tecnologías son MongoDB y NextJS.
          </p>
        </div>
        <div className="pt-42">
          <Image
            ref={imageRef}
            src="/uoc.jpg"
            alt="UOC"
            width={600}
            height={300}
            className="rounded-lg transition-transform duration-500 card-style"
            style={{
              transform: "rotateX(51deg) rotateZ(43deg)",
            }}
          />
        </div>
      </section>
      <section className="flex flex-row md:py-20 py-10 md:gap-10 gap-6 w-full">
        <div className="flex flex-col md:gap-10 gap-6">
          <h2 className="text-5xl font-light">La idea</h2>
          <p className="text-xl max-w-72">
            Lo de encontrar objetos perdidos y que esten en un sitio hasta que
            aparezca el dueño no es algo nuevo.
          </p>
          <p className="text-xl max-w-72">
            Ya existe en otros paises y también si no aparece el dueño en dos
            años puedas quedartelo, como Austria. Pero son espacios físicos, no
            hay gestión online.
          </p>
        </div>
        <div className="pt-42 relative flex-1">
          <Image
            src="/strategy.svg"
            alt="Estrategia"
            fill
            className="text-primary"
          />
        </div>
      </section>
    </div>
  );
}
