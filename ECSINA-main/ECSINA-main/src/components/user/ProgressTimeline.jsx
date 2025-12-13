"use client";
import React from "react";

const steps = [
  { title: "دانلود قالب...", date: "شنبه 14 اردیبهشت، 1404" },
  { title: "ویرایش قالب...", date: "شنبه 14 اردیبهشت، 1404" },
  { title: "درخواست بازبینی سند", date: "شنبه 14 اردیبهشت، 1404" },
];

const ProgressTimeline = () => {
  return (
    <div className="flex flex-col items-center justify-start md:justify-center  mt-10 w-full md:w-[80%] md:mx-auto">
      <div className="relative flex flex-col md:flex-row justify-between md:items-center w-full gap-[40px] md:gap-0">
        <div className="absolute bottom-0 top-0 right-[14px] md:right-0 md:left-0 md:top-[14px] md:border-r-0 border-r-2 md:border-t-2 border-dashed border-primary-7 z-[-1]" />
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative z-10 flex flex-row md:flex-col items-center text-right gap-[20px] md:gap-0 md:text-center"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary-7 rounded-full text-white mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div>
              <h5 className="text-[12px] md:text-[16px]  ">{step.title}</h5>
              <p className="text-[10px] md:text-[13px] text-[#4A4D38] mt-1">{step.date}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="hidden md:flex mt-10 font-semibold  hover:text-primary-7 transition border-b-2 font-iransans ">
        مشاهده بیشتر
      </button>
    </div>
  );
};


export default ProgressTimeline;

