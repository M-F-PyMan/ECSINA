import Button from "@/components/UI/Button";
import Title from "@/components/user/Title";
import { tickets } from "@/components/user/userDb";
import { shamsiDateShort } from "@/utils/shamsiDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
const page = () => {
  return (
    <div className="container mx-auto h-full font-iransans pb-[40px] ">
     <div className="hidden md:block">
       <Title title={"لیست تیکت ها"} />
     </div>
     <div className="md:hidden flex flex-col-reverse sm:flex-row gap-[8px] w-full items-center mb-[30px]">
      <div className="sm:basis-1/2">
        <div className="shadow-[0px_0px_3px_0px_#0029BC] rounded-[8px] flex items-center h-[30px] p-[5px]">
          <input type="text" placeholder="جست و جو تیکت..." className="basis-[90%] h-full outline-0 border-0"/>
          <FaSearch className="basis-[10%]" color="#00000080"/>
        </div>
        <p className="font-semibold text-[12px] mt-[16px]"><span>{tickets.length.toLocaleString('fa-IR')}</span> تیکت موجود می باشد.</p>
      </div>
      <div className="flex items-center justify-center sm:basis-1/2">
        <div className="w-[150px] aspect-square flex flex-col justify-center items-center shadow-[0px_0px_3px_0px_#0029BC] rounded-[8px] ">
          <Image
         src="/assets/images/User.png"
          alt="user"
          width={100}
          height={100}
          className="rounded-full"
          />
          <div className="text-[12px] font-semibold flex items-center gap-[3px] mt-[6px]">
            <span>خانم نگار شریفی </span>
            <span>
              <TiArrowSortedDown/>
            </span>
          </div>
        </div>
      </div>
     </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-12 border-b-2 border-b-secondary-17 md:border-b-0 text-[12px] md:text-[16px] md:bg-main-1 md:text-white py-[15px] px-[10px] md:rounded-[30px] font-semibold md:mb-[30px]">
          <p className="col-span-2">شماره تیکت</p>
          <p className="col-span-4">عنوان</p>
          <p className="col-span-3">تاریخ ارسال</p>
          <p className="col-span-3">وضعیت</p>
        </div>

        <div>
          {tickets.map((t) => (
            <div
              key={t.id}
              className="grid grid-cols-12 py-[15px] px-[10px] font-semibold border-b-2 border-b-secondary-17 md:last:border-b-0 pb-[30px] text-[12px] md:text-[16px] "
            >
              <p className="col-span-2">{t.numTicket}</p>
              <p className="col-span-4">{t.title}</p>
              <p className="col-span-3">{shamsiDateShort(t.date)}</p>
              <p
                className={`col-span-3 ${
                  t.type == "pending"
                    ? "text-[#FFC300]"
                    : t.type == "finalizing"
                    ? "text-[#BA0000]"
                    : "text-[#22BA00]"
                }`}
              >
                {t.status}
              </p>
            </div>
          ))}
        </div>
        <Link href={'/user/tickets/add-ticket'} className="overflow-hidden shadow-[0px_0px_3px_0px_#0029BC] md:shadow-none self-center mt-[100px] bg-white md:bg-main-0 rounded-[8px] md:rounded-[30px] flex justify-center items-center gap-[5px] w-[160px] h-[50px] text-[#00000080] md:text-white ">
        <span className="basis-[30%] bg-main-1 h-full md:basis-auto flex justify-center items-center">
          <FaPlus className=" text-[15px]"/>
        </span>
        <span className="font-semibold basis-[70%] md:basis-auto">تیکت جدید</span>
        </Link>
      </div> 
    </div>
  );
};

export default page;
