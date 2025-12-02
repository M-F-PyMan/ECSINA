'use client'
import React from "react";

const loginLayout = ({ children }) => {
  return (
    <div
      className="flex justify-center items-center h-screen font-iransans"
      lang="fa"
      dir="rtl"
    >
      <div className="max-w-[800px] max-h-[600px] w-full h-full mx-[20px] md:mx-0 shadow-[0px_4px_12px_0px_#0029BC99] bg-white p-[16px] rounded-[10px] relative overflow-hidden ">
        {children}
        <span className="text-[10px] md:text-[16px] font-light relative z-20">
          تلفن پشتیبانی: 011-333247000
        </span>
      </div>
   </div>
  );
};

export default loginLayout;