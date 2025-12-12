"use client";
import Image from "next/image";

const InviteCall = ({ card, index }) => {
  return (
    <div
      className={`group flex flex-col gap-0.5 md:gap-3 rounded-2xl pb-2 pt-4 px-2 md:pt-10 md:pb-4 md:px-6 gradient-invite-cart hover:scale-101 transition-all duration-400 shadow-invite-cart ${
        index >= 1 ? "md:min-h-[360px]" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between min-h-5">
        <p className="text-primary-15 font-semibold text-base md:text-xl">
          {card.title}
        </p>
        <Image
          src={"/assets/icons/ArrowRight.svg"}
          alt="Arrow Icon"
          width={36}
          height={36}
          className="group-hover:rotate-45 group-hover:mb-2 group-hover:ml-2 transition-all duration-400"
        />
      </div>

      {/* Body */}
      <div
        className={
          index >= 1
            ? "md:flex md:flex-col md:gap-2"
            : "lg:flex gap-5 justify-between"
        }
      >
        <p
          className={`text-black text-xs md:text-base font-normal text-right leading-5 mb-2 md:mb-0 md:min-h-20 lg:leading-7 ${
            index === 0 ? "md:max-w-96" : ""
          }`}
        >
          {card.description}
        </p>

        {/* Responsive Image */}
        <Image
          src={card.image || "/assets/images/NotFound.png"}
          alt={card.title || "Invite Image"}
          width={550}
          height={150}
          className="flex md:hidden h-full"
        />
        <Image
          src={card.image || "/assets/images/NotFound.png"}
          alt={card.title || "Invite Image"}
          width={750}
          height={450}
          className="hidden md:flex h-full"
        />
      </div>
    </div>
  );
};

export default InviteCall;
