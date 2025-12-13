"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import SliderHeader from "./UserHeaderSlider";
import Link from "next/link";
import { menu, cards } from "./userDb";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

const UserHeader = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const [showNotification, setShowNotification] = useState(false);
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filteredCards = cards.filter(
      (card) =>
        card.title.includes(query) ||
        card.title.toLowerCase().includes(query.toLowerCase()) ||
        card.title.includes(query.replace(/\s+/g, ""))
    );

    setSearchResults(filteredCards);
    setShowResults(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectResult = (card) => {
    setSearchQuery(card.title);
    setShowResults(false);

    console.log("انتخاب شد:", card);
  };
  return (
    <>
      {/* دسکتاپ */}
      <header className="relative hidden md:flex flex-col py-[10px] container mx-auto h-full">
        <div className="flex items-center justify-between">
          <div className="rounded-full overflow-hidden w-[56px] h-[56px]">
            <Image
              src={"/assets/images/User.png"}
              alt="user"
              width={56}
              height={56}
            />
          </div>

          <div className="basis-[80%] flex items-center gap-[10px]">
            <div>
              <div className="transition-all text-main-1 hover:bg-main-1 hover:text-white cursor-pointer w-[56px] h-[56px] border border-[var(--color-primary-7)] rounded-full flex  justify-center items-center font-bold text-[32px] ">
                ؟
              </div>
            </div>
            <div className=" basis-[90%] border border-[#506BD1] flex justify-between items-center rounded-[30px] overflow-hidden text-[25px] placeholder:text-[#000000CC] p-[10px]">
              <input
                placeholder="جست وجو"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
                className="font-[IranSans] outline-0 basis-[90%] placeholder:text-[25px] text-[16px]"
              />
              <Image
                src={"/assets/icons/userSearch.svg"}
                alt="search"
                width={30}
                height={30}
              />
            </div>
            {showResults && searchResults.length > 0 && (
              <div className="bg-[#BDC8EE] absolute top-full md:top-[100px] left-0 right-0 mx-auto  border border-gray-300 rounded-[20px] shadow-lg z-50 max-h-[400px] max-w-[400px] w-full overflow-y-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-[16px] text-gray-700">
                      نتایج جستجو ({searchResults.length})
                    </h3>
                    <button
                      onClick={() => setShowResults(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <IoMdClose />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {searchResults.map((card) => (
                      <div
                        key={card.id}
                        onClick={() => handleSelectResult(card)}
                        className="flex items-center justify-between gap-3 p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-200"
                      >
                        <div className="flex items-center gap-[8px]">
                          <div className="w-12 h-12 flex items-center justify-center border border-main-1  rounded-[30px]">
                            <Image
                              src={card.icon}
                              alt={card.title}
                              width={24}
                              height={24}
                            />
                          </div>
                          <div className="flex flex-col lg:text-center text-right lg:items-start items-center gap-[8px]">
                            <div className="font-semibold text-[13px] md:text-[16px] lg:text-[18px] text-nowrap">
                              {card.title}
                            </div>
                            <div className="font-normal text-[13px] lg:text-[14px] text-secondary-15 text-nowrap">
                              حجم فایل: {card.fileSize}
                            </div>
                          </div>
                        </div>
                        <button className="bg-main-1  rounded-lg text-white max-w-[150px] w-full max-h-[60px] h-full flex justify-center items-center">
                          انتخاب
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="relative">
              <div
                onClick={() => setShowNotification((prev) => !prev)}
                className="transition-all text-main-1 hover:bg-main-1 hover:text-white cursor-pointer w-[56px] h-[56px] border border-main-1 rounded-full inline-flex justify-center items-center"
              >
                <IoNotificationsOutline size={32} />
              </div>

              {showNotification && (
                <div className="absolute top-full left-0  mt-2 w-64 max-h-[300px] overflow-y-auto bg-white border border-main-1 rounded-lg shadow-xl z-50">
                  <div className="p-3">
                    <div>
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          className="p-2 hover:bg-gray-50 rounded text-[13px] border-b border-gray-100 last:border-b-0"
                        >
                          سند بیزنس مدل تجاری بازبینی شد
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <Image
              src={"/assets/icons/Logo.svg"}
              alt="logo"
              width={60}
              height={60}
            />
          </div>
        </div>
        <SliderHeader />
      </header>
      {/* موبایل */}
      <header className="relative flex md:hidden flex-col  container mx-auto h-full">
        <nav className="flex justify-between py-[10px] items-center sm:gap-[15px]">
          <div className="flex items-center gap-[10px]">
            <div className="relative w-[24px] aspect-square">
           <div className="w-full h-full border border-main-1 rounded-lg inline-flex justify-center items-center transition-all text-main-1 hover:bg-main-1 hover:text-white cursor-pointer  ">
               <div   onClick={() => setShowNotification((prev) => !prev)}
                className="" >
                <IoNotificationsOutline size={16} />
                <span className="flex w-[5px] h-[5px] rounded-full bg-[#FE1E1E] absolute right-1 bottom-1"></span>
              </div>
           </div>

              {showNotification && (
                <div className="absolute top-full right-0  mt-2 w-64 max-h-[300px] overflow-y-auto bg-white border border-main-1 rounded-lg shadow-xl z-50">
                  <div className="p-3">
                    <div>
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          className="p-2 hover:bg-gray-50 rounded text-[13px] border-b border-gray-100 last:border-b-0"
                        >
                          سند بیزنس مدل تجاری بازبینی شد
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-[24px] h-[24px] rounded-lg border border-[#083CF4] flex justify-center items-center  cursor-pointer transition-all text-main-1 hover:bg-main-1 hover:text-white">
              ؟
            </div>
            <div className="w-[24px] h-[24px] bg-[#083CF4] rounded-lg border border-[#083CF4] flex justify-center items-center cursor-pointer">
              <Image
                src={"/assets/icons/Search.svg"}
                alt="search"
                width={16}
                height={16}
              />
            </div>
          </div>
          <div className="border border-[#083CF4] rounded-lg w-[50%] sm:w-[70%]">
            <input
              placeholder="جست و جو"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              className="text-[IranSans] placeholder:text-[10px] py-[5px] pr-[8px] placeholder:text-black outline-0"
            />
          </div>
          {showResults && searchResults.length > 0 && (
            <div className="absolute  top-full md:top-[100px] left-0 mx-auto right-0 mt-2 bg-[#BDC8EE] border border-gray-300 rounded-[20px] shadow-lg z-50 max-h-[400px] max-w-[400px] w-full overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-[16px] text-gray-700">
                    نتایج جستجو ({searchResults.length})
                  </h3>
                  <button
                    onClick={() => setShowResults(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <IoMdClose />
                  </button>
                </div>

                <div className="space-y-3">
                  {searchResults.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleSelectResult(card)}
                      className="flex items-center justify-between gap-3 p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-200"
                    >
                      <div className="flex items-center gap-[8px]">
                        <div className="w-12 h-12 flex items-center justify-center border border-main-1  rounded-[30px]">
                          <Image
                            src={card.icon}
                            alt={card.title}
                            width={24}
                            height={24}
                          />
                        </div>
                        <div className="flex flex-col lg:text-center text-right lg:items-start items-center gap-[8px]">
                          <div className="font-semibold text-[13px] md:text-[16px] lg:text-[18px] text-nowrap">
                            {card.title}
                          </div>
                          <div className="font-normal text-[13px] lg:text-[14px] text-secondary-15 text-nowrap">
                            حجم فایل: {card.fileSize}
                          </div>
                        </div>
                      </div>
                      <button className="bg-main-1  rounded-lg text-white max-w-[150px] w-full max-h-[60px] h-full flex justify-center items-center">
                        انتخاب
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsOpenMenu((prev) => !prev)}
            className="w-[24px] h-[24px] "
          >
            <Image
              src={"/assets/icons/bars.svg"}
              alt="bars"
              width={24}
              height={24}
              className="object-contain"
            />
          </button>
        </nav>
        <div
          style={{
            background: `radial-gradient(1626.6% 740.84% at -16.72% 96.63%, rgba(255, 255, 255, 0.3) 0%, #E5EBFF 58.12%, rgba(255, 255, 255, 0.1) 95.35%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
linear-gradient(20.48deg, rgba(255, 255, 255, 0.6) 26.6%, rgba(215, 224, 255, 0.6) 72.81%)`,
            backdropFilter: "blur(10px)",
            borderRadius: "40px 0 0 40px",
          }}
          className={`fixed z-50 right-0  top-0 bottom-0 pt-[30px]  transition-all duration-300 font-iransans ${
            isOpenMenu
              ? "w-[50%] sm:w-[40%] translate-x-0"
              : "translate-x-[100%] w-0"
          } overflow-hidden`}
        >
          <button
            className="pr-[80%] pb-[38px]"
            onClick={() => setIsOpenMenu(false)}
          >
            <Image
              src={"/assets/icons/close.svg"}
              alt="close"
              width={28}
              height={28}
              className="w-[23px] h-[23px] sm:w-[28px] sm:h-[28px]"
            />
          </button>
          <div
            style={{
              borderBottom: "1px solid transparent",
              borderImageSource: `linear-gradient(270deg, #0029BC 0%, #001E89 50%, #001870 75%, #001663 87.5%, #00145C 93.75%, #001356 100%)`,
              borderImageSlice: 1,
            }}
            className="flex gap-[6px] items-center pr-[15px] pb-[15px]"
          >
            <div
              style={{
                borderRadius: "50%",
                padding: "4px",
                background: `conic-gradient(from 180deg at 50% 50%, #FEDA75 0deg, #FA7E1E 180deg, #D62976 270deg, #962FBF 315deg, #4F5BD5 360deg)`,
              }}
              className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px]"
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={"/assets/images/User.png"}
                  width={60}
                  height={60}
                  alt="user"
                  className="rounded-full w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]"
                />
              </div>
            </div>
            <div>
              <div className="flex gap-[3px] items-center">
                <span className="font-semibold text-[12px]">
                  خانم نگار شریفی
                </span>
                <span>
                  <Image
                    src={"/assets/icons/arrow-bottom.svg"}
                    width={12}
                    alt="arrowBottom"
                    height={12}
                  />
                </span>
              </div>
              <span className="text-[var(--color-primary-15)] text-[10px] font-light">
                مدیر مارکتینگ
              </span>
            </div>
          </div>
          <ul className="w-full pr-[15px] pt-[15px] flex flex-col gap-[45px]">
            {menu.map((m) => (
              <Link
                href={`${m.link}`}
                key={m.id}
                className=" flex  items-center h-[35px]"
              >
                <div
                  className={`w-[24px] h-[24px]  ${
                    pathname == m.link ||
                    (pathname.startsWith("/user/home") && m.link === "/user")
                      ? "text-[var(--color-primary-7)]"
                      : "text-black"
                  }`}
                  dangerouslySetInnerHTML={{ __html: m.svg }}
                />
                <p
                  className={`w-full text-center ${
                    pathname == m.link ||
                    (pathname.startsWith("/user/home") && m.link === "/user")
                      ? " text-[var(--color-primary-7)]"
                      : "text-black"
                  } text-[14px] font-bold`}
                >
                  {m.title}
                </p>
              </Link>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
