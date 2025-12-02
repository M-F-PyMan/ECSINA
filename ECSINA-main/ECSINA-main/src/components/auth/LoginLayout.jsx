import React from "react";
const AuthCardLayout = ({ children }) => {
  return (
    <div className="flex flex-col rounded-[10px] bg-white w-[800px] h-[600px] px-10 py-8 shadow-[0px_4px_12px_0px_#FE32FFB2] gap-5">
      {children}
      <p className="text-black font-semibold text-[12px] mb-6 mt-auto">تلفن پشتیبانی: 011-333247000</p>
    </div>
  );
};
export default AuthCardLayout;
