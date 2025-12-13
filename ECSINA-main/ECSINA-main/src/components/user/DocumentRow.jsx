"use client";
import { shamsiDateLong, shamsiDateShort } from "@/utils/shamsiDate";

import Image from "next/image";
import { FaTag } from "react-icons/fa";

export default function DocumentRow({
  icon,
  title,
  fileSize,
  date,
  statusText,
  statusDate,
  statusType,
  difficulty,
}) {
  return (
    <div
      style={{
        background: `linear-gradient(139.79deg, #F2F5FB 0.21%, #F7F9EE 106.61%)`,
      }}
      className="
      relative
  grid grid-cols-12 items-center  gap-4 p-4 rounded-[30px]
        shadow-[0px_0px_3px_3px_#00000020]
"
    >
      <div className=" flex flex-col lg:flex-row items-center gap-3 col-span-3">
        <button className="hidden md:block border border-main-1 rounded-[30px] p-[8px] ">
          <Image
            src={icon}
            width={25}
            height={25}
            alt="icon"
            className="w-[25px] h-[25px] lg:w-[40px] lg:h-[40px] "
          />
        </button>
        <div className="flex flex-col lg:text-center text-right lg:items-start items-center gap-[8px]">
          <div className="font-semibold text-[13px] md:text-[16px] lg:text-[18px] text-nowrap">
            {title}
          </div>
          <div className="font-normal text-[13px] lg:text-[14px] text-secondary-15 text-nowrap">
            حجم فایل: {fileSize}
          </div>
        </div>
      </div>

      <div className=" font-normal text-[14px] text-secondary-15 col-span-3 md:col-span-1 lg:text-nowrap text-center ">
        {shamsiDateLong(date)}
      </div>

      <div className="col-span-4 flex justify-center items-center">
        <button
          className={`md:border  text-nowrap flex  items-center justify-center gap-1
    ${
      statusType === "pending"
        ? "border-[#F94701] text-[#F94701] md:hover:bg-[#F94701] md:hover:text-white"
        : statusType === "downloaded"
        ? "border-[#0029BC] text-[#0029BC] md:hover:bg-[#0029BC] md:hover:text-white"
        : statusType === "reviewed"
        ? "border-[#07D000] text-[#07D000] md:hover:bg-[#07D000] md:hover:text-white"
        : "border-[#757866] text-[#757866] md:hover:bg-[#757866] md:hover:text-white"
    } font-iransans text-[13px] xl:text-[16px] rounded-[30px] p-[8px] transition-colors duration-300 lg:text-nowrap w-fit`}
        >
          <span>{statusText}</span>
          <span>{shamsiDateShort(statusDate)}</span>
        </button>
      </div>

      <div className="flex items-center text-[14px] justify-center gap-[4px] col-span-3 md:col-span-2 lg:col-span-1">
        <FaTag color="#D3E964" />
        <span>{difficulty}</span>
      </div>

      <div className="flex justify-center flex-row md:flex-col lg:flex-row items-center gap-[7px] lg:gap-[15px] col-span-12 md:col-span-2 lg:col-span-3">
        <button className=" w-[100px] h-[50px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-[#0029BC] hover:bg-[#0029BC] hover:text-white transition-all duration-150">
          <svg
            className="lg:w-[32px] lg:h-[32px] w-[25px] h-[25px]"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.6792 4.79964L6.73248 16.3863C6.31915 16.8263 5.91915 17.693 5.83915 18.293L5.34582 22.613C5.17248 24.173 6.29248 25.2396 7.83915 24.973L12.1325 24.2396C12.7325 24.133 13.5725 23.693 13.9858 23.2396L24.9325 11.653C26.8258 9.65297 27.6792 7.37297 24.7325 4.5863C21.7992 1.8263 19.5725 2.79964 17.6792 4.79964Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.8516 6.73438C16.4249 10.4144 19.4116 13.2277 23.1182 13.601"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 29.334H28"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className=" w-[100px] h-[50px] rounded-lg flex justify-center items-center  border-2 border-[#0029BC] text-white bg-[#0029BC]">
          <svg
            className="lg:w-[32px] lg:h-[32px] w-[25px] h-[25px]"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 14.666V22.666L14.6667 19.9993"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.0002 22.6667L9.3335 20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M29.3332 13.3327V19.9993C29.3332 26.666 26.6665 29.3327 19.9998 29.3327H11.9998C5.33317 29.3327 2.6665 26.666 2.6665 19.9993V11.9993C2.6665 5.33268 5.33317 2.66602 11.9998 2.66602H18.6665"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M29.3332 13.3327H23.9998C19.9998 13.3327 18.6665 11.9993 18.6665 7.99935V2.66602L29.3332 13.3327Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <button className="absolute top-0 left-[10px]">
        <Image
          src={"/assets/icons/moreo.svg"}
          alt="more"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
