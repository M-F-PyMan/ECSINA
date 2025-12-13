"use client";
import { useEffect, useRef, useState } from "react";
import { LuDownload, LuUpload } from "react-icons/lu";
import Title from "@/components/user/Title";
import { LuRefreshCcw } from "react-icons/lu";
import { FaRegTrashAlt, FaShare } from "react-icons/fa";
import { cards } from "@/components/user/userDb";
import { shamsiDateShort } from "@/utils/shamsiDate";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";
import { RiFolderTransferFill } from "react-icons/ri";
const DocumentReview = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [active, setActive] = useState(0);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
  const buttonsRef = useRef([]);
  const [documents, setDocuments] = useState([]);
  const [showMore, setShowMore] = useState({});

  const toggleMore = (id) => {
    setShowMore((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  useEffect(() => {
    const button = buttonsRef.current[active];
    if (button) {
      setLineStyle({
        left: button.offsetLeft,
        width: button.offsetWidth,
      });
      const documents =
        active === 0
          ? cards.filter((c) => c.statusType === "reviewed")
          : cards.filter((c) => c.statusType === "pending");
      setDocuments(documents);
    }
  }, [active]);

  const simulateUpload = (files) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          const fileList = Array.from(files).map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
          }));
          setUploadedFiles(fileList);
          return 100;
        }

        return prev + 10;
      });
    }, 200);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateUpload(files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateUpload(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemove = () => {
    alert("remove");
  };
  const handleRefresh = () => {
    setUploadProgress(0);
    alert("refresh");
  };

  return (
    <div className="container mx-auto font-iransans pb-[20px] h-full">
      <Title title={"باز بینی اسناد"} />
      <p className="text-[15px] text-right md:text-center md:text-[18px] mb-[30px]">
        سند مورد نظرت رو اینجا بارگذاری کن تا تیم ما بررسیش کنه. بعد از بازبینی،
        نتیجه از طریق داشبورد و اعلان‌ها در دسترست خواهد بود
      </p>

      <div
        style={{
          background: `
            "linear-gradient(90deg, #CBDEF7 0%, #FFFFFF 100%)"
          `,
        }}
        className="bg-[#DEE9FB] border-2 border-dashed border-main-1 md:bg-white md:border-[0.5px] md:border-black md:border-solid rounded-[30px] p-[25px] w-full"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="w-full flex flex-col  gap-[6px] md:flex-row items-center min-h-[160px] h-full">
          <div className="flex justify-center items-center h-full w-[50%]">
            <label
              htmlFor="upload"
              className="cursor-pointer shadow-[0px_2px_4px_0px_#1E132840] w-[80px] aspect-square rounded-[8px] border flex justify-center items-center border-main-1 text-main-1 hover:text-white transition hover:bg-main-1"
            >
              <LuDownload className="text-[40px]" />
            </label>
          </div>

          <div className="w-[50%]">
            <>
              <label
                htmlFor="upload"
                className="text-center flex md:hidden justify-center items-center flex-col gap-[8px] cursor-pointer"
              >
                <p className="text-[16px] md:text-[18px]">
                  اینجا<span className="text-main-1"> کلیک کنید</span> یا فایل
                  خود را <span className="text-main-1">بکشید</span> و اینجا رها
                  کنید.{" "}
                </p>
                <p className="text-secondary-15 text-[12px] md:text-[14px]">
                  فرمت‌های مجاز: PDF, DOC, JPG, PNG (حداکثر ۱۰ مگابایت)
                </p>
              </label>
              <input
                type="file"
                id="upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                multiple
              />
            </>
            {isUploading ? (
              <div className="hidden md:flex  items-center  gap-4 w-full">
                <div className="flex flex-col gap-[11px] w-[70%]">
                  <h6 className="text-[20px] font-bold">بیزنس مدل تجاری</h6>
                  <div className="w-full bg-white rounded-full h-[20px]">
                    <div
                      className="bg-[#FF1616] h-[20px] rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-[#292D32] font-light text-[12px]">
                    ارسال انجام نشد، دوباره تلاش کنید.
                  </span>
                </div>
                <div className="w-[30%] flex flex-col justify-between gap-[15px] h-full">
                  <button onClick={handleRemove}>
                    <FaRegTrashAlt color="#FF1616" className="text-[20px]" />
                  </button>

                  <button onClick={handleRefresh}>
                    <LuRefreshCcw color="#FF1616" className="text-[20px]" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <label
                  htmlFor="upload"
                  className="text-center hidden md:flex justify-center items-center flex-col gap-[8px] cursor-pointer"
                >
                  <p className="text-[16px] md:text-[18px]">
                    اینجا<span className="text-main-1"> کلیک کنید</span> یا فایل
                    خود را <span className="text-main-1">بکشید</span> و اینجا
                    رها کنید.
                  </p>
                  <p className="text-secondary-15 text-[12px] md:text-[14px]">
                    فرمت‌های مجاز: PDF, DOC, JPG, PNG (حداکثر ۱۰ مگابایت)
                  </p>
                </label>
                <input
                  type="file"
                  id="upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  multiple
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex md:hidden w-full mt-[13px]">
        {isUploading && (
          <div className="w-full ">
            <div
              style={{
                background: `linear-gradient(139.79deg, #F2F5FB 0.21%, #F7F9EE 106.61%)`,
              }}
              className="
                  relative  flex flex-col  w-full  gap-4 p-4 rounded-[30px]
                        shadow-[0px_0px_3px_3px_#00000020]
                        px-[13px]
                "
            >
              <div className="flex items-center justify-between w-full">
                <div className=" flex items-center gap-3 ">
                  <button className="border border-main-1 rounded-[30px] p-[8px] ">
                    <Image
                      src={"/assets/icons/brain.svg"}
                      width={25}
                      height={25}
                      alt="icon"
                      className="w-[15px] h-[15px] "
                    />
                  </button>
                  <div className="flex flex-col  text-right  items-center gap-[8px]">
                    <div className="font-semibold text-[13px]  text-nowrap">
                      بیزنس مدل تجاری
                    </div>
                    <div className="font-normal text-[13px]  text-secondary-15 text-nowrap">
                      حجم فایل: 9mg
                    </div>
                  </div>
                </div>
                <button>
                  <FaRegTrashAlt />
                </button>
              </div>
              <div className="w-full bg-white rounded-full h-[10px]">
                <div
                  className="bg-main-2 h-[10px] rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-[10px] md:gap-[40px] items-center justify-start md:justify-center mt-[30px] relative">
        <button
          ref={(el) => (buttonsRef.current[0] = el)}
          className="rounded-[30px] md:border font-semibold text-[16px] md:text-[20px] md:px-[20px] md:py-[15px]"
          onClick={() => setActive(0)}
        >
          اسناد بازبینی شده
        </button>
        <button
          ref={(el) => (buttonsRef.current[1] = el)}
          className="rounded-[30px] md:border font-semibold text-[16px] md:text-[20px] md:px-[20px] md:py-[15px]"
          onClick={() => setActive(1)}
        >
          در حال بررسی
        </button>

        <div
          className="absolute bottom-[-20px] h-[3px] bg-main-1 md:bg-black shadow-[0_0_10px_0_#00000040] transition-all duration-300"
          style={{ left: lineStyle.left, width: lineStyle.width }}
        />
      </div>
      <div className="mt-[60px] flex gap-[20px] w-full">
        {documents.map((d) => (
          <div
            key={d.id}
            style={{
              background: `linear-gradient(139.79deg, #F2F5FB 0.21%, #F7F9EE 106.61%)`,
            }}
            className="
                  relative grid grid-cols-12 items-center  w-full  gap-4 p-4 rounded-[30px]
                        shadow-[0px_0px_3px_3px_#00000020]
                        px-[13px]
                "
          >
            <div className=" flex flex-col lg:flex-row items-center gap-3 col-span-5">
              <button className="hidden md:block border border-main-1 rounded-[30px] p-[8px] ">
                <Image
                  src={d.icon}
                  width={25}
                  height={25}
                  alt="icon"
                  className="w-[25px] h-[25px] lg:w-[40px] lg:h-[40px] "
                />
              </button>
              <div className="flex flex-col lg:text-center text-right lg:items-start items-center gap-[8px]">
                <div className="font-semibold text-[13px] md:text-[16px] lg:text-[18px] text-nowrap">
                  {d.title}
                </div>
                <div className="font-normal text-[13px] lg:text-[14px] text-secondary-15 text-nowrap">
                  حجم فایل: {d.fileSize}
                </div>
              </div>
            </div>
            <button
              className={`md:border col-span-4 ${
                d.statusType === "pending"
                  ? "border-[#F94701] text-[#F94701]  md:hover:bg-[#F94701] md:hover:text-white"
                  : "border-[#07D000] text-[#07D000] md:hover:bg-[#07D000] md:hover:text-white"
              } font-iransans text-[13px] xl:text-[16px] rounded-[30px] p-[8px] transition-colors duration-300 lg:text-nowrap w-fit`}
            >
              <span>{d.statusText}</span>
              <span>{shamsiDateShort(d.statusDate)}</span>
            </button>
            <div className="col-span-3 flex items-center justify-end pl-[10px]">
              <button
                className={`${
                  d.statusType == "pending" ? "bg-[#737373]" : "bg-main-1"
                }  shadow-[0px_2px_4px_0px_#1E132840] w-[100px] h-[48px] rounded-lg flex justify-center items-center`}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 14.666V22.666L14.6667 19.9993"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0007 22.6667L9.33398 20"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M29.3327 13.3327V19.9993C29.3327 26.666 26.666 29.3327 19.9993 29.3327H11.9993C5.33268 29.3327 2.66602 26.666 2.66602 19.9993V11.9993C2.66602 5.33268 5.33268 2.66602 11.9993 2.66602H18.666"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M29.3327 13.3327H23.9993C19.9993 13.3327 18.666 11.9993 18.666 7.99935V2.66602L29.3327 13.3327Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={() => toggleMore(d.id)}
              className="absolute top-0 left-[10px]"
            >
              <Image
                src={"/assets/icons/moreo.svg"}
                alt="more"
                width={24}
                height={24}
              />
            </button>
            {showMore[d.id] && (
              <div
                style={{
                  background: `linear-gradient(139.79deg, #F2F5FB 0.21%, #F7F9EE 106.61%)`,
                }}
                className="absolute top-[30px] left-0 bg-[#F8F8F6]  rounded-[30px]
                        shadow-[0px_0px_3px_3px_#00000020] flex flex-col max-w-[280px] w-full overflow-hidden"
              >
                <div className="flex items-center gap-[4px] hover:bg-secondary-15 transition-all p-[10px]  border-b-[0.5px] border-b-[#E0E0E0]">
                  <RiFolderTransferFill />
                  <span >
                    انتقال به
                  </span>
                </div>
                <div className="border-b-[0.5px] border-b-[#E0E0E0] flex items-center gap-[4px] hover:bg-secondary-15 transition-all p-[10px]">
                  <FaShare />
                  <span>
                    اشتراک گذاری
                  </span>
                </div>
                <div className="flex items-center gap-[4px] hover:bg-secondary-15 transition-all p-[10px]">
                  <FaRegTrashAlt />
                  <span>
                    حذف موقت
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {active == 0 && (
        <div className="bg-[#78E46033] text-green-500 md:text-black md:bg-white mt-[30px] flex justify-between flex-row-reverse gap-[10px] mx-auto  items-center text-[10px] md:text-[14px] p-[10px]  border-r  md:border border-green-500 md:rounded-[30px] max-w-[400px] w-full">
          <IoIosClose className="text-[20px]" />
          <p>سند شما در حال بررسی است و تاریخ 04.02.02 ارسال میشود.</p>
        </div>
      )}
    </div>
  );
};

export default DocumentReview;
