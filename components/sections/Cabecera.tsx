import { Icons } from "../Icons";
import Btns from "@/components/Btns";
export default function Cabecera() {
  return (
    <>
      <section className=" container  relative overflow-hidden  pb-10 pt-10 w-full self-center  md:flex flex-col md:gap-10 gap-6">
        <div className="w-full flex flex-col gap-6 ">
          <div className="text-6xl md:text-9xl flex pt-10 md:pt-40 items-center md:justify-center font-extrabold  md:pr-40 md:p-8  relative">
            <Icons.topography className=" absolute top-0 right-0 -z-10 opacity-20 " />
            <div className="flex gap-2 self-center md:pl-14">
            <Icons.logo className=" rounded-full text-accent md:w-32 md:h-32 w-16 h-16" />
            <span className=" rounded-3xl ">Obladi</span></div>
          </div>
          <h1 className="text-3xl  md:self-center px-6">Objetos perdidos</h1>
        </div>
        <Btns />
      </section>
    </>
  );
}
