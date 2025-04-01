"use client";

import { useState } from "react";

export default function LightBulb() {
  const [isOn, setIsOn] = useState(true);

  return (
    <div className="flex items-center justify-center  ">
      <div
        className="relative cursor-pointer transition-all duration-300"
        onClick={() => setIsOn(!isOn)}
      >
        {/* Círculo de luz */}
        {isOn && (
          <div
            className="absolute w-[160px] h-[160px] bg-yellow-400 rounded-full opacity-50 blur-3xl -top-10 -left-10 z-0 animate-pulse"
            style={{
              animation: "glowFlicker 2s infinite ease-in-out",
            }}
          />
        )}

        {/* Bombilla */}
        <div
          className={`w-16 h-16 rounded-full border-1 ${
            isOn ? "bg-yellow-300" : "bg-gray-700"
          } shadow-lg relative z-10 flex items-center justify-center transition-colors duration-300`}
          style={{
            boxShadow: isOn ? "0 0 10px #fde047, 0 0 25px #fde047" : "none",
            transition: "box-shadow 0.3s ease-in-out",
          }}
        >
          <div className="w-2 h-2 rounded-full bg-white opacity-40" />
        </div>

        {/* Base de la bombilla */}
        <div className="w-6 h-5 bg-gray-500 mx-auto rounded-b-md mt-[-4px] z-20 relative" />
      </div>

      {/* Animación CSS */}
      <style jsx>{`
        @keyframes glowFlicker {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
          75% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
