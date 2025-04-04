import Btns from "../btns";
import Map from "../map";

interface WelcomeProps {
  title: string;
  subtitle: string;
}

const cities = [
  "Barcelona",
  "Madrid",
  "Valencia",
  "Sevilla",
  "Zaragoza",
  "Málaga",
  "Murcia",
  "Palma",
  "Bilbao",
  "Alicante",
];

const Welcome: React.FC<WelcomeProps> = ({ title, subtitle }) => {
  const firstHalf = cities.slice(0, 5);
  const secondHalf = cities.slice(5);

  return (
    <section className="w-full  md:flex-row flex flex-col gap-10 h-auto items-stretch !py-0 ">
      <div className="flex flex-col md:w-1/2 w-full gap-36 md:p-8 p-4 md:ml-[6vw]">
        <div className="flex flex-row justify-between items-start">
          <h1 className="text-3xl">
            Lugar definitivo
            <br /> de objetos perdidos
          </h1>
          <p className="text-3xl  font-bold">02</p>
        </div>
        <p className="text-7xl pt-20">Barcelona</p>
        <Btns />
        <div className="grid grid-cols-3">
          <div className="font-semibold pt-10 text-xl border-t-2 border-solid dark:border-white border-black">
            <p>2025-2027</p>
          </div>
          <ul className="pt-10">
            {firstHalf.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
          <ul className="pt-10">
            {secondHalf.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex md:w-1/2 shrink-0 flex-grow w-full relative h-[500px] md:h-auto ">
        <Map />
      </div>
    </section>
  );
};

export default Welcome;
