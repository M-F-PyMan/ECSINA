"use client";
import Image from "next/image";
import Link from "next/link";

const ScrollTopButton = () => {
  return (
    <Link href={"#header"}>
      <button className=" relative w-8 h-8 md:w-15 md:h-15 rounded-xl shadow-icon gradient-stroke2 cursor-pointer hover:scale-105 transition-transform duration-300">
        <Image src={"/assets/icons/ArrowRight.svg"} alt="" fill className="-rotate-45 " />
      </button>
    </Link>
  );
};

export default ScrollTopButton;
