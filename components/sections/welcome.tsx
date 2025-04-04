"use client";
import Btns from "../btns";
import Map from "../map";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
interface WelcomeProps {
  title: string;
  subtitle: string;
}
const allCities = [
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
  const user = useUser();
  const [lostObjectsOnLocation, setLostObjectsOnLocation] = useState<number>(0);
  const [location, setLocation] = useState<string>("Barcelona");
  const [nearbyCities, setNearbyCities] = useState<string[]>(allCities);
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const fetchData = async () => {
      let userLocation = user?.location;

      // Si no hay location del usuario, usar la ubicación actual del navegador
      if (!userLocation && navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        const { latitude, longitude } = position.coords;
        const resLoc = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const dataLoc = await resLoc.json();
        userLocation =
          dataLoc.address.city || dataLoc.address.town || dataLoc.display_name;
      }

      if (!userLocation) return;
      setLocation(userLocation);

      // Obtener cantidad de objetos en la ubicación
      const res = await fetch(
        `/api/search?location=${encodeURIComponent(userLocation)}`
      );
      const data = await res.json();
      const count =
        (data?.lostObjects?.length || 0) + (data?.reclaimObjects?.length || 0);
      setLostObjectsOnLocation(count);

      // Obtener ciudades más cercanas (mock)

      // Simular cálculo de cercanía (a futuro puedes usar coordenadas reales)
      const sorted = allCities.sort((a, b) => a.localeCompare(b)); // Fake sort
      setNearbyCities(sorted.slice(0, 10));
    };

    fetchData();
  }, [user?.location]);

  const firstHalf = nearbyCities.slice(0, 5);
  const secondHalf = nearbyCities.slice(5);

  return (
    <section className="w-full  md:flex-row flex flex-col gap-10 h-auto items-stretch !py-0 ">
      <div className="flex flex-col md:w-1/2 w-full gap-36 md:p-8 p-4 md:ml-[6vw]">
        <div className="flex flex-row justify-between items-start">
          <h1 className="text-3xl">
            Lugar definitivo
            <br /> de objetos perdidos
          </h1>
          <p className="text-3xl  font-bold">{lostObjectsOnLocation}</p>
        </div>
        <p className="text-7xl pt-20">{location}</p>
        <Btns />
        <div className="grid grid-cols-3">
          <div className="font-semibold pt-10 text-xl border-t-2 border-solid dark:border-white border-black">
            <p>{currentDate}</p>
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
