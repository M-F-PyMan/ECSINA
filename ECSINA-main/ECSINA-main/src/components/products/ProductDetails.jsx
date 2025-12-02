"use client";
import { BiImage } from "react-icons/bi";
import { BiDownload } from "react-icons/bi";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";
import Button from "../UI/Button";

const tabs = [
  { id: 1, title: "فیلم آموزشی" },
  { id: 2, title: "کتابچه راهنما" },
  { id: 3, title: "نقشه راه یادگیری" },
  { id: 4, title: "فایل مثال" },
];

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };
  return (
    <div className="container mt-4 md:mt-14">
      <div className="bg-secondary-2 border border-primary-7 rounded-[10px] md:rounded-4xl px-2 md:px-12 md:pb-11 md:pt-16 pb-2 pt-5">
        {/* header */}
        <div className="flex items-center justify-center md:justify-between">
          <p className="text-black font-bold text-xs md:text-3xl text-center md:text-right">عنوان قالب</p>
          {/* icons */}
          <div className=" hidden md:flex items-center gap-2 md:gap-9">
            <span className="flex items-center gap-1 md:gap-2">
              <AiOutlineShareAlt fill="#0018BC" className=" w-4 h-4 md:w-8 md:h-8" />
              <p className="text-primary-7 text-[10px] font-semibold md:text-lg">12 دانلود</p>
            </span>
            <span className="flex items-center gap-1 md:gap-2">
              <BiDownload fill="#0018BC" className=" w-4 h-4 md:w-8 md:h-8" />

              <p className="text-primary-7 text-[10px] font-semibold md:text-lg">12 دانلود</p>
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="mt-3">
          {/* Header */}
          <div>
            <div className="bg-primary-0 flex justify-between  rounded-t-[10px] md:rounded-t-4xl ">
              <div className="flex items-center">
                {tabs.map((tab, index) => (
                  <span
                    onClick={() => handleTabClick(tab.id)}
                    key={tab.id}
                    className={`px-1.5  md:px-5 md:py-4 py-3 text-[10px] md:text-[18px] font-semibold cursor-pointer transition-all duration-300 ${
                      index === 0 ? "rounded-tr-[10px] md:rounded-tr-4xl" : ""
                    } ${activeTab === index + 1 ? "bg-primary-8 text-white" : "bg-transparent text-primary-7"}`}
                  >
                    {tab.title}
                  </span>
                ))}
              </div>
              {/* Galery */}
              <div className=" hidden md:flex items-center gap-1 ml-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <BiImage key={Math.floor(Math.round() * 1000)} className="w-5 h-5 md:w-9 md:h-9 " fill="#0029BC" />
                ))}
              </div>
            </div>
          </div>
          {/* vidoe */}
          <div className="relative w-full h-40 md:h-72 xl:h-96">
            <Image src={"/assets/images/NotFound.png"} alt="" fill />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between md:hidden mt-3 mb-6">
          {/* Icons */}
          <div className=" flex items-center gap-2 md:gap-9">
            <span className="flex items-center gap-1 md:gap-2">
              <AiOutlineShareAlt fill="#0018BC" className=" w-4 h-4 md:w-8 md:h-8" />
              <p className="text-primary-7 text-[10px] font-semibold md:text-lg">12 دانلود</p>
            </span>
            <span className="flex items-center gap-1 md:gap-2">
              <BiDownload fill="#0018BC" className=" w-4 h-4 md:w-8 md:h-8" />

              <p className="text-primary-7 text-[10px] font-semibold md:text-lg">12 دانلود</p>
            </span>
          </div>
          {/* Galery */}
          <div className="flex items-center gap-1 ml-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <BiImage key={Math.floor(Math.round() * 1000)} className="w-5 h-5 md:w-9 md:h-9 " fill="#0029BC" />
            ))}
          </div>
        </div>
        {/* Button */}
        <div>
          <Button className="w-full text-center">دانلود قالب</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
