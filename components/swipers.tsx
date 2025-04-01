'use client'

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Asegúrate de que el CSS de navegación esté cargado

import { Navigation,Autoplay } from "swiper/modules";
import Avatar from "./ui/client-avatar";

export default function SwiperReviews() {
  // Opciones posibles para el fondo
  const bgOptions = ["bg-primary", "bg-secondary", "bg-tertiary"];

  // Datos de ejemplo para las opiniones
  const reviews = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    comment: `This is a sample comment from User ${
      index + 1
    }. They are a great part of the community.`,
  }));

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={60}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Navigation,Autoplay]}
        className="mySwiper !px-12"
        breakpoints={{
            640: {
                slidesPerView: 2,
                spaceBetween: 60,
              }
          }}
      >
        {reviews.map((review, index) => {
          // Elegir una clase de fondo aleatoria
          const randomBg =
            bgOptions[Math.floor(Math.random() * bgOptions.length)];

          return (
            <SwiperSlide key={review.id}>
              <div
                className={`p-6 h-56 my-8 rounded-lg ${randomBg} text-black font-semibold card-style `}
              >
                <div className="flex items-center flex-grow">
                  <Avatar seed={review.name} />
                  <div className="ml-4">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
