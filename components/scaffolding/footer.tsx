import { Icons } from "../icons";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="md:p-6 w-full flex justify-center text-xl pb-20 md:pb-10 z-30">
      <div className=" bg-red-100 flex flex-col gap-16 items-start w-full md:m-6 card-style !border-primary-400 !border-4 ">
        <div className="container grid grid-cols-1 p-6 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="flex flex-col gap-4 text-primary-400 col-span-3">
            <h4 className="font-bold text-3xl">Sobre la web</h4>
            <ul className="flex flex-col gap-3 text-primary-300">
              <li>
                <Link href={"/"}>Inicio</Link>
              </li>
              <li>
                <a target="_blank" href={"https://uoc-tfm.netlify.app/"}>Documentación</a>
              </li>
              <li>
                <Link href={"/"}>Autor</Link>
              </li>
              <li>
                <Link href={"/"}>Máster - uoc</Link>
              </li>
              <li>
                <Link href={"/"}>Contribuir</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-primary-400 col-span-5">
            <h4 className="font-bold text-3xl">Buscar contenido</h4>
            <div className="flex flex-col gap-3 text-primary-300">
              <input
                type="text"
                className="bg-[#ffffff] card-style2 mt-1 block w-full p-2 border border-primary-400 rounded-md shadow-sm"
              />
            </div>
            <button className="bg-primary-400 text-white p-2 justify-center !rounded-full self-start px-8 card-style2 flex items-center gap-2">
              Buscar
            </button>
          </div>
          <a href="https://jramma.com" target="_blank" className="flex no-underline-effect relative aspect-square flex-grow md:h-full md:w-auto w-full">
            <Image
              src="/hero.png"
              fill
              alt="hero"
              className="object-cover  object-top md:mb-16 rounded-2xl border-3 border-primary-400"
            />
          </a>
        </div>
        <div className=" w-full text-black bg-tertiary  rounded-b-3xl border-t-4 border-primary-400 ">
          <div className="container flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center">
            <div className="p-3">
              <div className="flex gap-4">
                <Icons.github className="h-8 w-8" />
                <Icons.linkedin className="h-8 w-8" />
                <Icons.x className="h-8 w-8" />
              </div>
            </div>
            <p className="flex gap-2 flex-wrap items-baseline ">
              Made with
              <Icons.heart className="h-5 w-5 text-primary-400 animate-pulse font-bold" />
              by <a  className="link"  href="https://jramma.com">Jramma</a>
            </p>
            <div className="flex items-center gap-4 pb-6 md:pb-0">
              <Link className="link" href={"/terms"}>Terms</Link>{" "}|{" "}
              <Link className="link"  href={"/privacy"}>Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
