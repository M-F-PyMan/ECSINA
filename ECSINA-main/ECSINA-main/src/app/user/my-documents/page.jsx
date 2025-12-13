import ButtonUser from "@/components/user/ButtonUser";
import DocumentRow from "@/components/user/DocumentRow";
import Title from "@/components/user/Title";
import { cards } from "@/components/user/userDb";
import React from "react";

const page = () => {
  return (
    <div className="font-iransans container mx-auto h-full pb-[40px]">
 
     <Title title={'اسناد من'}/>


      <div >
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
            <DocumentRow key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
