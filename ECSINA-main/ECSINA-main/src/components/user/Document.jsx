import { shamsiDateLong, shamsiDateShort } from "@/utils/shamsiDate";
import Image from "next/image";
import React from "react";
import { FaTag } from "react-icons/fa";

const Document = ({
  icon,
  title,
  fileSize,
  date,
  statusText,
  statusDate,
  statusType,
  difficulty,
}) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "30px",
        overflow: "hidden",
        boxShadow: "1px 1px 2px 1px #00000040",
        background: "#fff",
      }}
      className="keen-slider__slide w-full h-[250px] md:w-[280px] md:h-[430px]"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "30px",
          padding: "1px",
          background:
            "linear-gradient(139.79deg, rgba(2, 8, 31, 0.2) 0.21%, rgba(102, 102, 102, 0.1) 106.61%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      ></div>
      {/* mobile */}
      <div
        style={{
          position: "relative",
          borderRadius: "30px",
          background: "#fff",
          width: "100%",
          height: "100%",
        }}
        className="flex flex-col md:hidden p-[16px] w-full"
      >
        <div className="flex h-fit items-center justify-between w-full">
          <button>
            <Image
              src={"/assets/icons/moreo.svg"}
              alt="more"
              width={15}
              height={15}
            />
          </button>
          <div className="flex items-center justify-center  text-primary-15 text-[12px]">
            <FaTag color="#D3E964"/>
            <span>{difficulty}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button className="border border-main-1 rounded-[30px] p-[5px] ">
            <Image src={icon} alt="icon" width={22} height={22} />
          </button>
          <h4 className="font-semibold text-[16px] my-[13px] font-iransans">
            {title}
          </h4>
        </div>
        <div className="text-secondary-15 text-[14px] mt-[10px] mb-[3px] text-center">
          <span>حجم فایل:</span>
          <span>{fileSize}</span>
        </div>
        <div className=" text-secondary-15 text-[14px] text-center">
          {shamsiDateLong(date)}
        </div>
        <button
          className={` ${
            statusType === "pending"
              ? " text-[#F94701] hover:border-b hover:border-b-[#F94701] "
              : statusType === "downloaded"
              ? " text-[#0029BC] hover:border-b hover:border-b-[#0029BC]"
              : statusType === "reviewed"
              ? " text-[#07D000] hover:border-b hover:border-b-[#07D000] "
              : " text-[#757866] hover:border-b hover:border-b-[#757866] "
          } font-iransans text-[14px] font-bold transition-colors duration-300 w-fit mx-auto mt-[10px]`}
        >
          <span>{statusText}</span>
          <span>{shamsiDateShort(statusDate)}</span>
        </button>
        <div className="flex justify-center items-center gap-[10px] mt-[8px]">
          <button className=" w-[40px] h-[23px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-[#0029BC] hover:bg-[#0029BC] hover:text-white transition-all duration-150">
            <svg
              width="18"
              height="18"
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
          <button className=" w-[40px] h-[23px] rounded-lg flex justify-center items-center  border-2 border-[#0029BC] text-white bg-[#0029BC]">
            <svg
              width="18"
              height="18"
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
      </div>
      {/* desktop */}
      <div
        style={{
          position: "relative",
          borderRadius: "30px",
          background: "#fff",
          width: "100%",
          height: "100%",
          padding: "16px 8px",
          textAlign: "center",
        }}
        className="hidden md:block"
      >
        <button className="absolute left-[8px] top-[16px] ">
          <Image
            src={`/assets/icons/more.svg`}
            alt="more"
            width={24}
            height={24}
          />
        </button>
        <button className="border border-main-1 rounded-[30px] p-[8px] mt-[25px]">
          <Image src={icon} alt="icon" width={50} height={50} />
        </button>
        <h4 className="font-semibold text-[24px] my-[13px] font-iransans">
          {title}
        </h4>
        <div className="text-[var(--color-secondary-15)] text-[16px] ">
          <span>حجم فایل:</span>
          <span>{fileSize}</span>
        </div>
        <div className="my-[17px]  text-[var(--color-secondary-15)] text-[16px] ">
          {shamsiDateLong(date)}
        </div>
        <button
          className={`border ${
            statusType === "pending"
              ? "border-[#F94701] text-[#F94701]  hover:bg-[#F94701] hover:text-white"
              : statusType === "downloaded"
              ? "border-[#0029BC] text-[#0029BC] hover:bg-[#0029BC] hover:text-white"
              : statusType === "reviewed"
              ? "border-[#07D000] text-[#07D000] hover:bg-[#07D000] hover:text-white"
              : "border-[#757866] text-[#757866] hover:bg-[#757866] hover:text-white"
          } font-iransans text-[16px] rounded-[30px] p-[8px] transition-colors duration-300 `}
        >
          <span>{statusText}</span>
          <span>{shamsiDateShort(statusDate)}</span>
        </button>
        <div className="flex items-center justify-center my-[10px]">
         <FaTag color="#D3E964"/>
          <span>{difficulty}</span>
        </div>
        <div className="flex justify-center items-center gap-[15px]">
          <button className=" w-[100px] h-[50px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-[#0029BC] hover:bg-[#0029BC] hover:text-white transition-all duration-150">
            <svg
              width="32"
              height="32"
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
              width="32"
              height="32"
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
      </div>
    </div>
  );
};

export default Document;

