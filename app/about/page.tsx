"use client";
import { CollapsibleSection } from "@/components/sections/CollapsibleSection";
import { useEffect, useRef, useState } from "react";
import { IconCloudDemo } from "@/components/animation/Cloud";
import Image from "next/image";
import { Hr } from "@/components/ui/Hr";
import { Icons } from "@/components/Icons";
import { HiOutlineLightBulb } from "react-icons/hi";
export default function AboutPage() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHasScrolled(scrollTop > 500); // Puedes ajustar el valor umbral aquí
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
    <div className="md:max-w-[1000px] container flex flex-col self-center  max-w-full overflow-hidden pb-40">
      <section className="flex flex-col md:py-20 py-10 md:gap-10 gap-6 w-full relative bg-white/70 dark:bg-black/70 md:bg-transparent">
        <h2 className="text-5xl font-light self-center ">¿Cómo funciona?</h2>
        <div className="md:flex-row flex-col-reverse flex ">
          <div className="flex flex-col md:gap-10 gap-6 md:w-1/2 ">
            <p className="text-xl max-w-72">
              Obladi nace de la necesidad de tener un espacio dónde se
              encuentren todos los objetos perdidos del mundo.
            </p>
            <p className="text-xl max-w-72">
              Si encuentras un objeto simplemente subelo aquí y si lo has
              perdido, busca en la lista de objetos perdidos.
            </p>
            <p className="text-2xl max-w-72 ">
              ¡Si en <span className="bg-tertiary text-black">dos años</span> no
              se reclama el objeto puedes quedartelo!
            </p>
          </div>
          <div className="flex md:w-1/2 flex-grow justify-center items-center -z-10 md:relative absolute top-0">
            <IconCloudDemo />
          </div>
        </div>
      </section>
      <Hr />

      <CollapsibleSection id="project" title="Sobre el proyecto">
        <Icons.topography className=" hidden md:absolute md:block -z-10 top-0 left-0 opacity-30" />
        <div className="flex flex-col md: md:gap-10 gap-6 text-right items-end pb-20 p-6">
          <p className="text-xl max-w-72">
            El proyecto es el trabajo del Máster en Desarrollo web y APPs de la
            UOC.
          </p>
          <p className="text-xl max-w-72">
            Lo tienes en GitHub y puedes hacer con él lo que quieras. Sus
            tecnologías son MongoDB y NextJS.
          </p>
        </div>
        <div className="md:pb-20">
          <Image
            ref={imageRef}
            src="/uoc.jpg"
            alt="UOC"
            width={600}
            height={300}
            className="transition-transform duration-500 card-style"
            style={{
              transform: "rotateX(51deg) rotateZ(43deg)",
            }}
          />
        </div>
      </CollapsibleSection>
      <Hr />
      <CollapsibleSection id="soluciones" title="Soluciones a medida">
        <div className="flex flex-col md:flex-row md:gap-10 gap-6 pb-20">
          <div className="flex flex-col md:gap-6 gap-4 md:w-2/3 md:pl-6">
            <p className="text-xl max-w-prose">
              Ofrecemos soluciones personalizadas para gestionar objetos
              perdidos en diferentes entornos:
            </p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>
                <strong>Aeropuertos:</strong> manejo automatizado de objetos
                perdidos con filtros por terminal o compañía.
              </li>
              <li>
                <strong>Estaciones de tren:</strong> control por trayectos,
                horarios y zonas de paso.
              </li>
              <li>
                <strong>Entornos naturales:</strong> geolocalización avanzada
                para objetos encontrados en montañas, parques o caminos rurales.
              </li>
            </ul>
            <p className="text-xl max-w-prose mt-4">
              Podemos adaptar los filtros y el acceso según el perfil del
              usuario, ya sea cliente o equipo interno.
            </p>
            <p className="text-xl max-w-prose">
              Si tienes un espacio físico con objetos perdidos o necesitas una
              plataforma para gestionarlos,{" "}
              <span className="font-semibold">¡contáctanos!</span>
            </p>
            <a
              href="mailto:jrammas@uoc.edu"
              className="mt-4 w-fit px-4 py-2 bg-accent text-black  rounded-full border-3 border-black shadow hover:scale-105 transition"
            >
              Habla con nosotros
            </a>
          </div>
          <div className="md:w-1/3 hidden md:flex justify-center items-center">
            <Image
              src="/help.png"
              alt="Soluciones personalizadas"
              width={400}
              height={300}
              className="card-style"
            />
          </div>
        </div>
      </CollapsibleSection>
      <Hr />
      <CollapsibleSection title="La idea" id="idea">
        <Icons.topography className="md:block hidden absolute animate-pulse text-accent -z-10 top-0 left-0 opacity-30" />
        <div className="flex w-full">
          <div className="flex flex-col md:gap-10 gap-6 pb-20 md:w-1/2 p-6">
            <p className="text-xl max-w-72">
              La idea de reunir objetos perdidos en un lugar físico hasta que
              aparezca su dueño no es nueva, ya se aplica en muchos países.
            </p>
            <p className="text-xl max-w-72">
              En lugares como Austria, si tras dos años nadie reclama el objeto,
              puedes quedártelo legalmente. Pero todo esto sucede en oficinas
              físicas, sin una solución digital moderna.
            </p>
            <p className="text-xl max-w-72">
              Ob-La-Di lleva esa misma lógica al mundo online, conectando a
              quienes pierden y encuentran objetos, estés donde estés.
            </p>
          </div>
          <div className="relative  hidden md:flex items-center justify-center">
            <HiOutlineLightBulb className="w-20 h-20 animate-pulse" />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
