import React from "react";

const colors = ["#F0523C", "#FEB0E1", "#F6D465"];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

type CardProps = {
  title: string;
  description: string;
};

const Card: React.FC<CardProps> = ({ title, description }) => {
  const shadowColor = getRandomColor();

  return (
    <div
      className="border-2 rounded-lg group border-black dark:border-white border-solid m-6 p-6 max-w-72 min-h-64 transition"
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
      <p className="text-3xl group-hover:text-4xl transition-all duration-300">
        {title}
      </p>
      <p className="group-hover:font-semibold transition-all duration-300">
        {description}
      </p>
    </div>
  );
};

export { Card };
