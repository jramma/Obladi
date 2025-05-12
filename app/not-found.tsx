"use client";
import { useEffect } from "react";
import Waves from "@/components/animation/Waves";
export default function NotFoundPage() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const pupil = document.getElementById("pupil");
      if (pupil) {
        const eye = pupil.parentElement;
        if (eye) {
          const rect = eye.getBoundingClientRect();
          const eyeCenterX = rect.left + rect.width / 2;
          const eyeCenterY = rect.top + rect.height / 2;

          const dx = e.clientX - eyeCenterX;
          const dy = e.clientY - eyeCenterY;

          const angle = Math.atan2(dy, dx);
          const radius = 22; // movimiento máximo
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          pupil.style.transform = `translate(${x}px, ${y}px)`;
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-grow flex-col justify-center items-center gap-10 h-full pt-40 ">
      <Waves
        lineColor="currentColor"
        backgroundColor="rgba(255, 255, 255, 0.2)"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />
      <div className="flex flex-row  font-extrabold gap-3 text-[180px] items-center z-30">
        <p className="text-shadow">4</p>
        <div className="eye w-30 h-30 bg-white rounded-full flex justify-center items-center relative overflow-hidden border-black border-3 ">
          <div
            className="pupil w-8 h-8 bg-black rounded-full absolute transition"
            id="pupil"
          ></div>
        </div>
        <p className="text-shadow">4</p>
      </div>
      <p className="card-style2 bg-white text-black z-30 p-6 text-xl">
        Lo siento, no podemos encontrar la página que estás buscando.
      </p>
    </div>
  );
}
