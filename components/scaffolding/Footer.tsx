import { Icons } from "../Icons";
import Image from "next/image";
import Link from "next/link";
import SubscribeForm from "./Subscribeform";

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
      href: "mailto:jrammas@uoc.edu",
      external: true,
    },
  ];

  return (
      <footer className=" dark:bg-[#000] bg-white z-40 border-t-1 mt-auto  flex flex-col gap-16 items-start w-full pb-10">
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
          <div className="flex flex-col gap-4  mt-auto col-span-4 items-center">
            <div className="flex items-center gap-6">
              <Image
                src="/hero.png"
                width={100}
                height={100}
                alt="hero"
                className="object-cover  rounded-full   border-3 border-primary-400"
              />
              <a href="https://jramma.com" target="_blank" className="relative">jramma.com</a>
            </div>
            <a
              href="https://buymeacoffee.com/jramma"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded-xl shadow-md flex items-center gap-2 transition duration-200 no-underline-effect"
            >
              ☕ Invítame a un café
            </a>
          </div>
        </div>
        <div className=" w-full dark:text-violet-500   rounded-b-3xl border-t-4 border-primary-400 ">
          <div className="container flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center">
            <div className="p-3">
              <div className="flex gap-4">
                <a
                  href="https://github.com/jramma"
                  target="_blank"
                  className="no-underline-effect"
                >
                  {" "}
                  <Icons.github className="h-8 w-8" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jramma/"
                  className="no-underline-effect"
                  target="_blank"
                >
                  <Icons.linkedin className="h-8 w-8" />
                </a>
              </div>
            </div>
            <p className="flex gap-2 flex-wrap items-baseline ">
              Made with
              <Icons.heart className="h-5 w-5 text-red-500 animate-pulse font-bold" />
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
    </footer>
  );
};

export default Footer;
