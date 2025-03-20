// app/components/Header.tsx
import Link from "next/link";
import { BsFillPinMapFill } from "react-icons/bs";

const Header: React.FC = () => {
  return (
    <header className="absolute bg-pink-500">
      <BsFillPinMapFill />
    </header>
  );
};

export default Header;
