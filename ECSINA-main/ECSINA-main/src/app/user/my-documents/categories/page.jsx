import Title from "@/components/user/Title";
import { shamsiDateLong } from "@/utils/shamsiDate";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="font-iransans  pb-[40px]">
      <Title title={"دسته بندی ها"} />
      <div className="px-[20px] py-[30px] md:p-0 bg-[#6B9DFF33] md:bg-transparent h-fit ">
        <div className="md:hidden grid grid-cols-12 gap-[10px]">
          {[1, 2, 3, 4, 5, 6].map((c) => (
            <div
              key={c}
              className="bg-white transition-colors duration-100 hover:border-[0.5px] flex flex-col gap-[8px] col-span-12 sm:col-span-6 md:col-span-4 w-full h-[200px]  p-[50px] shadow-[0px_0px_4px_2px_#00000040] rounded-[30px]"
            >
              <Image
                src={"/assets/icons/folder-2.svg"}
                alt="document"
                width={32}
                height={32}
              />
              <p className="font-semibold text-[15px]">بیزنس مدل ...</p>
              <p className="flex gap-[5px] text-secondary-15 text-[12px]">
                <span>ایجاد شده در{shamsiDateLong(new Date())}</span>-
                <span>{Number(3).toLocaleString("fa-IR")}سند </span>
              </p>
            </div>
          ))}
        </div>
      </div>
        <div className="hidden md:flex container mx-auto w-full h-full">
          <div className="w-full grid grid-cols-12 gap-[10px]">
          {[1, 2, 3, 4, 5, 6].map((c) => (
            <div
              key={c}
              className="bg-white transition-colors duration-100 hover:border-[0.5px] flex flex-col gap-[8px] col-span-6 md:col-span-4 w-full h-[200px] p-[50px] shadow-[0px_0px_4px_2px_#00000040] rounded-[30px]"
            >
              <Image
                src={"/assets/icons/folder-2.svg"}
                alt="document"
                width={32}
                height={32}
              />
              <p className="font-semibold text-[20px]">بیزنس مدل ...</p>
              <p className="flex gap-[5px] text-secondary-15 text-[12px]">
                <span>ایجاد شده در{shamsiDateLong(new Date())}</span>-
                <span>{Number(3).toLocaleString("fa-IR")}سند </span>
              </p>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
};

export default page;
