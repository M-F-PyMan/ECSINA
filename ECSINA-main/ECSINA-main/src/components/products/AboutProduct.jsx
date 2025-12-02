"use client";
import { useState } from "react";

const tabs = [
  { id: 1, title: " جزئیات" },
  { id: 2, title: " راهنمای دانلود قالب" },
];

const AboutProduct = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="container">
      <div className="border bg-white border-primary-7 rounded-[10px]  md:rounded-4xl shadow-product-cart mt-16 md:mt-48">
        {/* Header */}
        <div className="bg-primary-0 flex justify-between  rounded-t-[10px] md:rounded-t-4xl ">
          <div className="flex items-center">
            {tabs.map((tab, index) => (
              <span
                onClick={() => handleTabClick(tab.id)}
                key={tab.id}
                className={`px-6  md:px-16 md:py-4 py-3 text-[10px] md:text-[18px] font-semibold cursor-pointer transition-all duration-300 ${
                  index === 0 ? "rounded-tr-[10px] md:rounded-tr-4xl" : ""
                } ${
                  activeTab === index + 1
                    ? "bg-primary-8 text-white"
                    : "bg-transparent text-primary-7"
                }`}
              >
                {tab.title}
              </span>
            ))}
          </div>
        </div>
        {/* Body */}
        <div className="min-h-[20vh] p-4 md:p-16 ">
          <p className="text-black text-[10px] md:text-xl font-normal leading-6 md:leading-10 overflow-x-auto max-h-40 md:max-h-200 ">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutProduct;
