type CardProps = {
  title: string;
  description: string;
  shadowColor: string;
};

const Card: React.FC<CardProps> = ({ title, description, shadowColor }) => {
  return (
    <div
      className={`border-2 rounded-3xl card-style group ${shadowColor} m-6 p-6  min-h-64 transition`}
    >
      <p className="text-3xl group-hover:text-4xl transition-all duration-300">
        {title}
      </p>
      <div
        className="group-hover:font-semibold transition-all duration-300 flex flex-col gap-4 py-6"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export { Card };
