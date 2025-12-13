import Title from "@/components/user/Title";
import Image from "next/image";
import React from "react";
import { FaImage } from "react-icons/fa6";
const page = () => {
  return (
    <div className="font-iransans container mx-auto h-full pb-[40px]">
      <Title title={"آموزش های مرتبط"} />
      <div className="text-[12px] text-nowrap border-b-2 pb-[12px] mb-[12px] border-b-[#4A4D3880] font-semibold text-center grid grid-cols-12 gap-4 px-4 py-2  justify-center">
        <div className="col-span-3">ویدیوی آموزشی</div>
        <div className="col-span-3">فایل های نمونه</div>

        <div className="col-span-3">نقشه راه</div>

        <div className="col-span-3">کتابچه راهنما</div>
      </div>
      <div className="flex gap-[30px] flex-col">
        {[1, 2].map((c) => (
          <div
            key={c}
            style={{
              background: `linear-gradient(139.79deg, #F2F5FB 0.21%, #F7F9EE 106.61%)`,
            }}
            className="
  grid grid-cols-12 items-center  gap-4 p-4 rounded-[30px]
        shadow-[0px_0px_3px_3px_#00000020]
        px-[13px]
"
          >
            <div className=" flex flex-col lg:flex-row items-center gap-3 col-span-3">
              <div className="shadow-[0px_2px_4px_0px_#1E132840] w-[60px] h-[60px] rounded-full border border-main-1 flex justify-center items-center">
                <div className="border border-main-1 w-[40px] h-[40px] flex justify-center items-center rounded-full">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.75 7.98338V5.02338C0.75 1.20338 3.45 -0.33662 6.75 1.56338L9.31 3.04338L11.87 4.52338C15.17 6.42338 15.17 9.54338 11.87 11.4434L9.31 12.9234L6.75 14.4034C3.45 16.3034 0.75 14.7434 0.75 10.9434V7.98338Z"
                      fill="#0029BC"
                      stroke="#0029BC"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col lg:text-center text-right lg:items-start items-center gap-[8px]">
                <div className="font-semibold text-[14px] md:text-[16px] lg:text-[18px] text-nowrap">
                  بیزنس مدل تجاری
                </div>
                <div className="font-normal text-[10px] md:text-[13px] lg:text-[14px] text-secondary-15 text-nowrap">
                  حجم فایل : 9mg
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 items-center justify-center gap-[2px] col-span-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[33px] sm:w-[40px] col-span-6 md:col-span-3 border border-main-1 shadow-[0px_1px_0px_1px_#00000040] aspect-square rounded-[6px] flex justify-center items-center">
                  <FaImage className="text-main-1 text-[18px] sm:text-[22px] md:text-[26px]" size={18} />
                </div>
              ))}
            </div>
            <div className="col-span-3 flex gap-[4px] justify-center items-center">

              <Image
              src={'/assets/icons/routing.svg'}
              alt="map"
              width={24}
              height={24}
              className="aspect-square w-[15px] md:w-[24px]"
              />
              <span className="font-normal text-[10px] md:text-[13px] lg:text-[14px] text-secondary-15 text-nowrap">دانلود نقشه راه</span>
            </div>
            <div className="col-span-3 flex justify-center">
              <button className="shadow-[0px_2px_4px_0px_#1E132840] bg-main-1 w-[100px] h-[45px] rounded-[8px] flex justify-center items-center">
                <Image src={'/assets/icons/book-saved.svg'} alt='book' width={32} height={32} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
