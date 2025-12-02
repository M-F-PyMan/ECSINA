import { BiLike } from "react-icons/bi";
import Image from "next/image";

const Commnet = ({ commnet }) => {
  return (
    <div className="flex flex-col gap-3 md:gap-6 rounded-3xl p-4 cursor-pointer gradient-comment  hover:scale-102 transition-all duration-400">
      {/* info */}
      <div className="flex flex-col md:flex-row items-start gap-2">
        <Image src={"/assets/images/User.png"} alt="" width={54} height={54} className="rounded-full" />
        <div className="flex flex-col items-start">
          <p className=" text-xs md:text-base text-black font-semibold">{commnet.name}</p>
          <p className="text-xs text-black font-light text-nowrap">{commnet.role}</p>
        </div>
      </div>
      {/* description */}
      <div className="mb-6">
        <p className="text-black text-xs md:text-base font-normal">{commnet.description}</p>
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <BiLike size={28} className="bg-white p-1 rounded-sm cursor-pointer hover:bg-secondary-3 " />
          <BiLike size={28} className="bg-white p-1 rounded-sm cursor-pointer hover:bg-secondary-3 rotate-180" />
        </span>
        <span className="flex items-center gap-1">
          <span>{commnet.rate}</span>
          <div className="relative w-4 h-4 md:w-5 md:h-5 mb-1.5">
            <Image src={"/assets/icons/RatingStar.svg"} alt="" fill />
          </div>
        </span>
      </div>
    </div>
  );
};

export default Commnet;
