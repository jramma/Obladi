// app/components/Welcome.tsx
interface WelcomeProps {
  title: string;
  subtitle: string;
}

const Welcome: React.FC<WelcomeProps> = ({ title, subtitle }) => {
  return (
    <section className="container p-4 md:p-8">
      <div className="flex flex-col md:w-1/2 w-full gap-36">
        <div className="flex flex-row justify-between items-start">
          <h1 className="text-3xl ">
            Lugar definitivo
            <br /> de objetos perdidos
          </h1>
          <p className="text-3xl font-bold">02</p>
        </div>
        <p className="text-7xl">Barcelona</p>
        <div className="flex flex-row justify-between items-start">
        <div>
          
        </div>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Welcome;
