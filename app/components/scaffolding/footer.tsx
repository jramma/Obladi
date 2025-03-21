// app/components/Header.tsx

const Footer: React.FC = () => {
  return (
    <footer className="dark:bg-[#000000] bg-[#ffffff]  flex flex-col items-center w-full">
    <div className="w-full h-20  rounded-b-[50%] dark:bg-black bg-white"></div>
     
      <div className="container py-20 p-8 flex flex-row justify-between ">
        <div>
          Ayudamos a que encuentres tus cosas
        </div>
      </div>
    </footer>
  );
};

export default Footer;
