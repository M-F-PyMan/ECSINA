import React from "react";
import Input from "../Form/Input";
import BaseIcon from "../icon/BaseIcon";

function SearchBar() {
  return (
    <div className="w-full mb-3 relative">
      <Input className="relative placeholder:font-normal w-full pl-6 pr-12 py-3 border-1 border-[#EBEBEB] rounded-2xl" placeholder="جست و جو" />
      <BaseIcon className="absolute top-[15%] -translate-x-3  translate-y-[10%] cursor-pointer" id="Search" size={25} disableGradient={true} fillColor="#000" />
    </div>
  );
}

export default SearchBar;
