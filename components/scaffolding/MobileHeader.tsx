import Btns from "@/components/Btns";

export default function MobileHeader() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-cover bg-center bg-no-repeat container self-center">
      <div className="text-4xl md:text-9xl flex items-center font-extrabold">
        <span className="text-5xl text-primary">O</span>b-La-Di
      </div>
      <h1 className="flex items-center text-3xl">
        Encontramos objetos perdidos
      </h1>
      <Btns />
    </div>
  );
}
