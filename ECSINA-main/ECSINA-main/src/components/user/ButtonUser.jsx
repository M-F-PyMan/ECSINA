'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ButtonUser = ({ text, image, id, alt,link, ...p }) => {
  const pathname=usePathname()
  return (
    <>
      <Link
      href={`${link}`}
        {...p}
        style={{
          background: `linear-gradient(139.79deg, #F2F5FB 0.21%, #F7F9EE 106.61%)`,
          boxShadow: `0px 2px 2px 0px #00000040`,
          borderRadius: "30px",
        }}
        className={` hidden md:flex items-center gap-[8px] transition-all duration-150 lg:gap-[12px] h-[85px] w-[150px] lg:h-[96px] lg:w-[220px] justify-center hover:border-[0.5px] hover:border-black ${pathname===link&&'border-[0.5px] border-black'}`}
      >
        <Image src={image} alt={alt} width={32} height={32} />
        <span className="font-semibold font-iransans text-[16px] lg:text-[22px]">
          {text}
        </span>
      </Link>
  <div className="flex md:hidden flex-col items-center gap-[8px]">
        <Link
        href={`${link}`}
        className="flex md:hidden  justify-center items-center"
        style={{
          background: `linear-gradient(139.79deg, #F2F5FB 0.21%, #F7F9EE 106.61%)`,
          border: `0.5px solid #083CF4`,
          boxShadow: "0px 2px 2px 0px #00000040",
          width: "50px",
          height: "50px",
          borderRadius: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid #083CF4",
            boxShadow: "0px 2px 4px 0px #1E132840",
          }}
          className="w-[30px] h-[30px] rounded-lg flex justify-center items-center"
        >
          <Image src={image} alt={alt} width={18} height={18} />
        </div>
      </Link>
      <p className="font-iransans text-[10px] font-bold text-center">{text}</p>
  </div>
    </>
  );
};


export default ButtonUser;

