"use client";

import CircularText from "@/components/ui/CircularText";
import Btns from "@/components/Btns";
import { LuBaggageClaim } from "react-icons/lu";
import { FaSearchLocation } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { Boxes } from "@/components/ui/Background-boxes";
export default function Cabecera() {
  return (
    <section className="relative overflow-hidden md:py-80 py-40 w-full justify-center self-center md:flex-row flex flex-col md:gap-10 gap-20  items-center">
      <Boxes />
      <div className="flex flex-col gap-10 items-center relative">
        <div className="text-4xl md:text-9xl flex items-center font-extrabold">
          <CircularText
            text="MALETAS*MOVILES*PELUCHES*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class hidden md:block"
          />
          <span className="text-5xl text-primary md:hidden">O</span>b-La-Di
        </div>
        <div className="flex items-center text-3xl gap-2 font-bold">
          Encontramos<h1>Objetos perdidos</h1>
        </div>
        <div className="pt-32 md:pt-0 pl-5 md:pl-0">
          <Btns />
        </div>
        {/* Icono maleta */}
        <motion.div
          className="absolute -top-30 left-0  md:-left-20 bg-primary rounded-full p-2 border-3 card-style"
          initial={{ opacity: 1, y: -30 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          whileHover={{
            scale: 1.2,
            rotate: -10,
            transition: { type: "spring", stiffness: 300 },
          }}
        >
          <LuBaggageClaim className="w-20 h-20" />
        </motion.div>

        {/* Icono SVG central */}
        <motion.div
          className="absolute top-36 md:top-30 md:-right-50 w-30 h-30 md:w-auto md:h-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          whileHover={{
            scale: 1.05,
            rotate: 5,
            transition: { type: "spring", stiffness: 300 },
          }}
        >
          <Image
            src={"/noObjects.svg"}
            alt="No hay objetos perdidos"
            width={200}
            height={200}
            className="mx-auto bg-secondary !rounded-full z-20 card-style"
          />
        </motion.div>

        {/* Icono localización */}
        <motion.div
          className="absolute  -top-20 right-0  bg-tertiary !rounded-full p-2 border-3 card-style"
          initial={{ opacity: 1, x: 30 }}
          animate={{ opacity: 1, x: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          whileHover={{
            scale: 1.2,
            rotate: 10,
            transition: { type: "spring", stiffness: 300 },
          }}
        >
          <FaSearchLocation className="w-20 h-20" />
        </motion.div>
      </div>
    </section>
  );
}
