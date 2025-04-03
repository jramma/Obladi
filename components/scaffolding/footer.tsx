import { Icons } from "../icons";
import Image from "next/image";
import Link from "next/link";
import SubscribeForm from "./subscribeform";

const Footer: React.FC = () => {
  const links = [
    { label: "Inicio", href: "/" },
    {
      label: "Documentación",
      href: "https://uoc-tfm.netlify.app/",
      external: true,
    },
    { label: "Autor", href: "https://jramma.com/info", external: true },
    {
      label: "Máster - UOC",
      href: "https://www.uoc.edu/es/estudios/masters/master-universitario-desarrollo-sitios-aplicaciones-web?esl-k=google-ads|nx|c123456|m|k|p|t|dc|a15234411733|g15234411733&gad_source=1",
      external: true,
    },
    {
      label: "Contribuir",
      href: "https://github.com/jramma/Ob-la-di",
      external: true,
    },
  ];

  return (
    <footer className="md:p-6 w-full flex justify-center text-xl pb-20 md:pb-10 z-30">
      <div className=" bg-red-100 flex flex-col gap-16 items-start w-full md:m-6 card-style !border-primary-400 !border-4 ">
        <div className="container grid grid-cols-1 p-6 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="flex flex-col gap-4 text-primary-400 col-span-3">
            <h4 className="font-bold text-3xl">Sobre la web</h4>
            <ul className="flex flex-col gap-3 text-primary-300">
              {links.map(({ label, href, external }, i) =>
                external ? (
                  <li key={i}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  </li>
                ) : (
                  <li key={i}>
                    <Link href={href}>{label}</Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <SubscribeForm />
          <div className="flex flex-col gap-4 flex-grow w-full h-full col-span-4">
            <div className="flex  relative aspect-square flex-grow md:h-full md:w-auto w-full">
              <Image
                src="/hero.png"
                fill
                alt="hero"
                className="object-cover  object-center md:mb-16 rounded-2xl border-3 border-primary-400"
              />
            </div>
            <a
              href="https://buymeacoffee.com/jramma"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded-xl shadow-md flex items-center gap-2 transition duration-200"
            >
              ☕ Invítame a un café
            </a>
          </div>
        </div>
        <div className=" w-full text-black bg-tertiary  rounded-b-3xl border-t-4 border-primary-400 ">
          <div className="container flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center">
            <div className="p-3">
              <div className="flex gap-4">
                <a href="https://github.com/jramma" target="_blank" className="no-underline-effect">
                  {" "}
                  <Icons.github className="h-8 w-8" />
                </a>
                <a href="https://www.linkedin.com/in/jramma/" className="no-underline-effect" target="_blank">
                  <Icons.linkedin className="h-8 w-8" />
                </a>
              </div>
            </div>
            <p className="flex gap-2 flex-wrap items-baseline ">
              Made with
              <Icons.heart className="h-5 w-5 text-primary-400 animate-pulse font-bold" />
              by{" "}
              <a className="link" href="https://jramma.com">
                Jramma
              </a>
            </p>
            <div className="flex items-center gap-4 pb-6 md:pb-0">
              <Link className="link" href={"/terms"}>
                Terms
              </Link>{" "}
              |{" "}
              <Link className="link" href={"/privacy"}>
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
