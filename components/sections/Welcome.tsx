"use client";
import Btns from "../Btns";
import { useEffect, useState } from "react";
import { useMongoUser } from "@/hooks/UseMongoUser";
import Image from "next/image";
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
const Welcome: React.FC = () => {
  const user = useMongoUser();

  const [objectsOnLocation, setobjectsOnLocation] = useState<number>(0);
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
          dataLoc.address.city ||
          dataLoc.address.town ||
          dataLoc.address.village ||
          dataLoc.address.hamlet ||
          "Ubicación desconocida";
      }

      if (!userLocation) return;
      setLocation(userLocation);

      const res = await fetch(
        `/api/objects/search?location=${encodeURIComponent(userLocation)}`
      );

      const data = await res.json();
      const count = data?.objects?.length || 0;
      setobjectsOnLocation(count);
      const sorted = allCities.sort((a, b) => a.localeCompare(b));
      setNearbyCities(sorted.slice(0, 10));
    };

    fetchData();
  }, [user?.location]);

  const firstHalf = nearbyCities.slice(0, 5);
  const secondHalf = nearbyCities.slice(5);

  return (
    <section className="w-full py-20 md:py-72  flex justify-center">
      <div className="container flex md:flex-row flex-col items-center gap-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-6 items-start">
            <h1 className="text-3xl">Objetos en tu zona:</h1>
            <p className="text-3xl font-bold text-primary">
              {objectsOnLocation}
            </p>
          </div>

          <p className="text-7xl md:pt-20">{location}</p>
          <Btns />
        </div>
        <div className="flex flex-col gap-6">
          <div className="relative  w-full aspect-square h-auto object-contain">
            <Image
              src="/comunity.png"
              alt="Comunity"
              fill
              className="object-contain dark:bg-white dark:rounded-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-6">
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
      </div>
    </section>
  );
};

export default Welcome;
