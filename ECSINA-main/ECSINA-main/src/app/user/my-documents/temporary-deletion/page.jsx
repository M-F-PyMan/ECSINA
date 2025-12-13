import Title from "@/components/user/Title";
import { shamsiDateLong } from "@/utils/shamsiDate";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="font-iransans container mx-auto h-full pb-[40px]">
      <Title title={"حذف موقت"} />
      <div className="flex flex-col gap-[30px]">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              background: `linear-gradient(139.79deg, #F2F5FB 0.21%, #F7F9EE 106.61%)`,
            }}
            className="
          grid grid-cols-12 items-center   gap-4 p-4 rounded-[30px]
                shadow-[0px_0px_3px_3px_#00000020]
                px-[13px]
        "
          >
            <div className=" flex flex-col lg:flex-row items-center gap-3 col-span-4">
              <button className="border border-main-1 rounded-[30px] p-[8px] ">
                <Image
                  src={"/assets/icons/brain.svg"}
                  width={25}
                  height={25}
                  alt="icon"
                  className="w-[25px] h-[25px] lg:w-[40px] lg:h-[40px] "
                />
              </button>
              <div className="flex flex-col lg:text-center text-right lg:items-start items-center gap-[8px]">
                <div className="font-semibold text-[14px] md:text-[16px] lg:text-[18px] text-nowrap">
                  بیزنس مدل تجاری
                </div>
                <div className="font-normal text-[10px] md:text-[13px] lg:text-[14px] text-secondary-15 text-nowrap">
                  حجم فایل : 9mg
                </div>
              </div>
            </div>
            <div className="col-span-4 flex justify-center font-normal text-[14px] text-secondary-15  lg:text-nowrap ">
              {shamsiDateLong(new Date())}
            </div>


            <div className="flex justify-center flex-col lg:flex-row items-center gap-[7px] lg:gap-[15px] col-span-4">
             

              <button className=" w-[100px] h-[50px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-[#0029BC] hover:bg-[#0029BC] hover:text-white transition-all duration-150" >
                <svg
                  className="lg:w-[32px] lg:h-[32px] w-[25px] h-[25px]"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 7.97331C23.56 7.53331 19.0933 7.30664 14.64 7.30664C12 7.30664 9.36 7.43997 6.72 7.70664L4 7.97331"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.334 6.62602L11.6273 4.87935C11.8407 3.61268 12.0007 2.66602 14.254 2.66602H17.7473C20.0007 2.66602 20.174 3.66602 20.374 4.89268L20.6673 6.62602"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M25.1339 12.1875L24.2672 25.6142C24.1205 27.7075 24.0005 29.3342 20.2805 29.3342H11.7205C8.00052 29.3342 7.88052 27.7075 7.73385 25.6142L6.86719 12.1875"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.7734 22H18.2134"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.666 16.666H19.3327"
                    stroke="currentColor"
                    strokeWidth="1.5"
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
                    d="M29.3327 15.9993C29.3327 23.3593 23.3593 29.3327 15.9993 29.3327C8.63935 29.3327 4.14602 21.9193 4.14602 21.9193M4.14602 21.9193H10.1727M4.14602 21.9193V28.586M2.66602 15.9993C2.66602 8.63935 8.58602 2.66602 15.9993 2.66602C24.8927 2.66602 29.3327 10.0793 29.3327 10.0793M29.3327 10.0793V3.41268M29.3327 10.0793H23.4127"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
