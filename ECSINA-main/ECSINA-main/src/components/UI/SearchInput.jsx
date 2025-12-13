"use client";
import Image from "next/image";
import { useState } from "react";

const SearchInput = ({ placeholder = "جستجو...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[50%] md:w-[60%] lg:w-[70%] flex items-center border-2 border-primary-7 rounded-2xl bg-white"
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-3 md:py-5 outline-none text-black font-semibold text-xs md:text-xl placeholder:text-black md:placeholder:text-2xl placeholder:font-light"
      />
      <button
        type="submit"
        aria-label="Search"
        className="relative bg-primary-7 hover:bg-primary-8 py-3 px-5 md:py-6 md:px-12 rounded-xl text-white cursor-pointer transition-all duration-200"
      >
        <Image src={"/assets/icons/Search.svg"} alt="Search icon" width={30} height={30} />
      </button>
    </form>
  );
};

export default SearchInput;
