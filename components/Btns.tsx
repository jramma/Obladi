import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { FaHandsHelping } from "react-icons/fa";
export default function Btns() {
  return (
    <div className="flex gap-6 md:gap-10 flex-wrap text-xl ">
      <a
        href="#report"
        className="no-underline-effect bg-primary  py-2 px-6 rounded-full border-3 border-black  font-bold flex items-center gap-2 dark:border-white text-black text-xl"
      >
        <HiOutlineSpeakerphone />
        Reporta
      </a>
      <a
        href="#reclaim"
        className="no-underline-effect bg-secondary  py-2 px-6 rounded-full border-3 border-black  font-bold flex items-center gap-2 dark:border-white text-black text-xl"
      >
        <FaHandsHelping />
        Reclama
      </a>
      <a
        href="#find"
        className="no-underline-effect bg-tertiary py-2 px-6 rounded-full border-3 border-black  font-bold flex items-center gap-2 dark:border-white text-black text-xl"
      >
        <IoMdSearch />
        Encuentra
      </a>
    </div>
  );
}
