"use client";
import React from "react";
import { menu } from "./userDb";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ButtonsMobile = () => {
  const pathname = usePathname();

  return (
    <div className="bg-[#00000029] backdrop-blur-[16px] w-full px-[10px] py-[5px] rounded-[50px] flex flex-row-reverse justify-around items-center relative">
      {menu.map((m) => (
        <div
          key={m.id}
          className={`
            transition-colors duration-300 text-white relative flex items-center justify-center
          `}
        >
          <Link href={`${m.link}`}>
            <div
              dangerouslySetInnerHTML={{ __html: m.svg }}
              className="relative z-10"
            />
          </Link>

          {(pathname.split('/user/')[1]?(pathname.split('/user/')[1]=='home'?m.link=='/user':m.link.includes(pathname.split('/user/')[1].split('/')[0])):m.link==pathname ) && (
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,0,153,1) 0%, rgba(0,0,153,0.2) 70%, rgba(0,0,153,0) 100%)",
                filter: "blur(10px)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ButtonsMobile;
