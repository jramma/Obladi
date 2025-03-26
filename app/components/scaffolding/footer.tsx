import { Icons } from "@/components/icons";


const Footer: React.FC = () => {
  return (
    <footer className="p-6 w-full flex justify-center text-xl ">
      <div className="dark:bg-[#000000] bg-[#ffffff] flex flex-col items-center w-full m-6 card-style py-6">
       <div className="container flex p-6 flex-col gap-10">
          <div className="flex w-full justify-between md:flex-row flex-col gap-6 md:gap-0">
              <ul className="flex flex-col gap-6">
                <li className="text-2xl font-semibold text-primary">Ob-la-di, Ob-la-da</li>
                <li className="text-lg">Encuentra objetos perdidos</li>
              </ul>
              <ul className="flex flex-col gap-2 md:text-right">
                <li><a href="https://uoc-tfm.netlify.app/" className="text-blue-500 hover:text-secondary transition underline font-bold" target="_blank">Documentación</a></li>
                <li><a href="https://github.com/jramma/Ob-la-di" className="text-blue-500 hover:text-tertiary transition underline font-bold" target="_blank">Repositorio en Github</a></li>
              </ul>
          </div>
          <p className="flex items-center  gap-2 w-full text-left">
            Disegned and developed by <a href="https://www.jramma.com" target="_blank" rel="noopener noreferrer" className="text-purple-500 font-semibold text-3xl hover:underline transition">Jramma</a> with <Icons.heart className="w-4 h-4 text-primary animate-bounce" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
