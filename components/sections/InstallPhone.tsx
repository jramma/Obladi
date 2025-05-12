import { Icons } from "@/components/Icons";
import Image from "next/image";
export default function InstallPhone() {
  return (
    <section
      id="find"
      className="container overflow-hidden py-10 md:py-20 self-center items-start gap-10"
    >
      <h2 className="text-5xl font-semibold">Obladi en tu teléfono</h2>

      <div className="flex text-xl flex-col md:flex-row w-full gap-10">
        <div className="md:w-1/2 md:pr-20">
          <div className=" flex flex-grow card-style shadow-primary p-6 gap-6 flex-col">
            <h3 className="text-3xl">Instala Ob-La-Di en tu teléfono</h3>
            <p>
              Lleva Ob-La-Di contigo a donde vayas. Accede fácilmente desde tu
              móvil en cualquier momento: nunca sabes cuándo lo vas a necesitar.
            </p>
            <p>
              Solo tienes que abrir nuestra web desde tu teléfono y pulsar en{" "}
              <span className="bg-primary text-black font-bold px-1 rounded">
                Instalar
              </span>{" "}
              cuando aparezca la opción.
            </p>
            <Icons.social className="flex gap-4 w-60 self-end border-3 rounded-4xl" />
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center perspective-1000 flex-col">
          <div className="relative transform rotate-x-6 rotate-y-[-15deg] scale-[0.95] transition-all duration-700 hover:scale-100 hover:rotate-x-0 hover:rotate-y-0 mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl">
            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
              <Image
                src="/capture.webp"
                alt="Captura de pantalla"
                width={272}
                height={572}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="self-center md:self-end">*Aún en fase Beta.</p>
        </div>
      </div>
    </section>
  );
}
