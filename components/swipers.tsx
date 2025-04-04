"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import Avatar from "./ui/client-avatar";
import { userReviews } from "@/lib/home"; 

export default function SwiperReviews() {
  const bgOptions = ["bg-primary", "bg-secondary", "bg-tertiary"];
  const [randomBgClasses, setRandomBgClasses] = useState<string[]>([]);

  useEffect(() => {
    const generated = userReviews.map(() => {
      const randomIndex = Math.floor(Math.random() * bgOptions.length);
      return bgOptions[randomIndex];
    });
    setRandomBgClasses(generated);
  }, []);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={60}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation={true}
      modules={[Navigation, Autoplay]}
      className="mySwiper !px-12"
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 60,
        },
      }}
    >
      {userReviews.map((review, index) => {
        const bgClass = randomBgClasses[index] || "bg-neutral";
        return (
          <SwiperSlide key={review.id}>
            <div
              className={`p-6 h-56 my-8 rounded-lg ${bgClass} text-black font-semibold card-style`}
            >
              <div className="flex items-start flex-grow">

                <Avatar seed={review.name} />
                <div className="ml-4">
                  <p className="font-semibold text-xl">{review.name}</p>
                  <p className="">{review.comment}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
