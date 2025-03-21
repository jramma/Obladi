import React from "react";

const colors = ["#F0523C", "#FEB0E1", "#F6D465"];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const Card = () => {
  const shadowColor = getRandomColor();

  return (
    <div
      className="border-2 rounded-lg group border-black dark:border-white border-solid m-6 p-6 max-w-72 transition"
      style={{
        boxShadow: `5px 5px 0px 0px ${shadowColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `10px 10px 0px 0px ${shadowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `5px 5px 0px 0px ${shadowColor}`;
      }}
    >
      <p className="text-3xl group-hover:text-4xl  transition-all duration-300">Titulo</p>
      <p className="group-hover:font-semibold  transition-all duration-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ipsa
        inventore alias voluptas, incidunt minima non maiores quidem minus!
        Harum.
      </p>
    </div>
  );
};

export { Card };