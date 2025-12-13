"use client";
import DocumentRow from "@/components/user/DocumentRow";
import Title from "@/components/user/Title";
import { cards } from "@/components/user/userDb";
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
const page = () => {
  const [active, setActive] = useState(2);
  return (
    <div className="font-iransans container mx-auto h-full pb-[40px] flex flex-col items-center">
   
<Title title={' نام دسته بندی'}/>

      <div className="flex flex-row gap-[15px] xl:gap-[30px]">
        <div className="hidden md:flex flex-col mt-[50px] justify-around">
          {cards.map((c) => (
            <div
              onClick={() => setActive(c.id)}
              key={c.id}
              className={`w-[40px] xl:w-[50px] h-[40px] xl:h-[50px] border rounded-full transition-colors duration-100 hover:bg-black ${
                active == c.id ? "bg-black" : "bg-transparent"
              }`}
            />
          ))}
        </div>
        <div>
             <div className="text-[12px] md:text-nowrap border-b-2 pb-[12px] mb-[12px] border-b-[#4A4D3880] font-semibold text-center grid grid-cols-12 gap-4 px-4 py-2  justify-center">
          <div className="col-span-3">نام سند</div>
          <div className="col-span-3 md:col-span-1 flex flex-row-reverse items-center gap-[1px] text-center justify-center">
            <span>آخرین بازدید</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00877 20.5011L3.98967 15.4902"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.01506 3.50195L9.012 20.502"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.9916 3.50391L20.0107 8.51481"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.9886 20.5039L14.9916 3.50391"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="col-span-4 ">وضعیت</div>
            <div className="col-span-3 md:col-span-1 flex flex-row-reverse items-center gap-[1px] text-center justify-center">
            <span>اولویت</span>
            <svg
            className=""
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00877 20.5011L3.98967 15.4902"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.01506 3.50195L9.012 20.502"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.9916 3.50391L20.0107 8.51481"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.9886 20.5039L14.9916 3.50391"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="hidden md:block md:col-span-3 ">ویرایش و دانلود</div>
        </div>
          <div className="flex flex-col gap-[20px]">
            {cards.map((item, index) => (
              <div key={index}>
               <Switch
      checked={item.id==active}
      onChange={()=>{
        setActive(item.id)
      }}
      className={`${
        active==item.id ? "bg-green-500" : "bg-gray-300"
      } relative  inline-flex md:hidden h-[20px] w-[50px] items-center rounded-full transition-colors`}
    >
      <span
        className={`${
         active==item.id ? "-translate-x-[30px]" : "translate-x-0"
        } inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow transition`}
      />
    </Switch>
              <DocumentRow key={index} {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" mt-[13px]  self-end md:self-center ">
        <button className="shadow-[0px_2px_4px_0px_#1E132840] transition-colors duration-100 text-main-1 md:text-black hover:text-white hover:bg-main-1 md:hover:bg-black ml-[10px] md:ml-[20px] border border-main-1 md:border-black bg-white font-bold text-[13px] md:text-[18px] rounded-[5px] md:rounded-[30px] w-[60px] h-[30px] md:w-[170px] md:h-[50px]">
          انصراف
        </button>
        <button className="shadow-[0px_2px_4px_0px_#1E132840] transition-colors duration-100 text-white md:text-black hover:text-white hover:bg-main-1 md:hover:text-white md:hover:bg-black border border-main-1 md:border-black bg-main-1 md:bg-white font-bold  text-[13px] md:text-[18px] rounded-[5px] md:rounded-[30px] w-[60px] h-[30px] md:w-[170px] md:h-[50px]">
          تمام
        </button>
      </div>
    </div>
  );
};

export default page;
