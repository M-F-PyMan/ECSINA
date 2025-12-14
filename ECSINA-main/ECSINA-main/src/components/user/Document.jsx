"use client";

import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { FaTag } from "react-icons/fa";
import { shamsiDateLong, shamsiDateShort } from "@/utils/shamsiDate";

const Document = ({
  icon,
  title,
  fileSize,
  date,
  statusText,
  statusDate,
  statusType,
  difficulty,
}) => {
  const safeDate = (d) => {
    try {
      return d ? new Date(d) : null;
    } catch {
      return null;
    }
  };

  const statusClass = () => {
    switch (statusType) {
      case "pending":
        return "text-[#F94701] border-[#F94701] hover:bg-[#F94701] hover:text-white";
      case "downloaded":
        return "text-[#0029BC] border-[#0029BC] hover:bg-[#0029BC] hover:text-white";
      case "reviewed":
        return "text-[#07D000] border-[#07D000] hover:bg-[#07D000] hover:text-white";
      default:
        return "text-[#757866] border-[#757866] hover:bg-[#757866] hover:text-white";
    }
  };

  const displayFileSize = fileSize ?? "-";

  return (
    <div className="keen-slider__slide w-full h-[250px] md:w-[280px] md:h-[430px] rounded-[30px] overflow-hidden shadow-[1px_1px_2px_1px_#00000040] bg-white relative">
      {/* overlay decorative */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[30px] pointer-events-none"
        style={{
          background:
            "linear-gradient(139.79deg, rgba(2, 8, 31, 0.02) 0.21%, rgba(102, 102, 102, 0.01) 106.61%)",
        }}
      />

      {/* mobile */}
      <div className="flex flex-col md:hidden p-4 w-full h-full relative">
        <div className="flex items-center justify-between">
          <button aria-label="more" className="p-1">
            <Image src="/assets/icons/moreo.svg" alt="more" width={15} height={15} />
          </button>
          <div className="flex items-center gap-2 text-[12px] text-primary-15">
            <FaTag color="#D3E964" />
            <span className="truncate">{difficulty}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <button className="border border-main-1 rounded-[30px] p-1">
            <Image
              src={icon || "/assets/icons/brain.svg"}
              alt={title || "document icon"}
              width={22}
              height={22}
            />
          </button>
          <h4 className="font-semibold text-[16px] my-3 font-iransans text-right truncate">{title}</h4>
        </div>

        <div className="text-secondary-15 text-[14px] mt-2 mb-1 text-center">
          <span>حجم فایل: </span>
          <span>{displayFileSize}</span>
        </div>

        <div className="text-secondary-15 text-[14px] text-center">
          {safeDate(date) ? shamsiDateLong(date) : "-"}
        </div>

        <button
          type="button"
          className={`mx-auto mt-3 font-iransans text-[14px] font-bold transition-colors duration-300 ${statusType === "pending" ? "text-[#F94701]" : ""}`}
        >
          <div className="flex flex-col items-center">
            <span>{statusText}</span>
            <span className="text-xs">{safeDate(statusDate) ? shamsiDateShort(statusDate) : "-"}</span>
          </div>
        </button>

        <div className="flex justify-center items-center gap-3 mt-3">
          <button
            aria-label="preview"
            className="w-[40px] h-[23px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-[#0029BC] hover:bg-[#0029BC] hover:text-white transition-all duration-150"
          >
            {/* preview icon */}
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.6792 4.79964L6.73248 16.3863C6.31915 16.8263 5.91915 17.693 5.83915 18.293L5.34582 22.613C5.17248 24.173 6.29248 25.2396 7.83915 24.973L12.1325 24.2396C12.7325 24.133 13.5725 23.693 13.9858 23.2396L24.9325 11.653C26.8258 9.65297 27.6792 7.37297 24.7325 4.5863C21.7992 1.8263 19.5725 2.79964 17.6792 4.79964Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.8516 6.73438C16.4249 10.4144 19.4116 13.2277 23.1182 13.601" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 29.334H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            aria-label="download"
            className="w-[40px] h-[23px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-white bg-[#0029BC]"
          >
            {/* download icon */}
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14.666V22.666L14.6667 19.9993" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.0002 22.6667L9.3335 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M29.3332 13.3327V19.9993C29.3332 26.666 26.6665 29.3327 19.9998 29.3327H11.9998C5.33317 29.3327 2.6665 26.666 2.6665 19.9993V11.9993C2.6665 5.33268 5.33317 2.66602 11.9998 2.66602H18.6665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M29.3332 13.3327H23.9998C19.9998 13.3327 18.6665 11.9993 18.6665 7.99935V2.66602L29.3332 13.3327Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* desktop */}
      <div className="hidden md:block relative p-4 text-center">
        <button aria-label="more" className="absolute left-2 top-4">
          <Image src="/assets/icons/more.svg" alt="more" width={24} height={24} />
        </button>

        <div className="mt-6">
          <button className="border border-main-1 rounded-[30px] p-2 inline-block">
            <Image src={icon || "/assets/icons/brain.svg"} alt={title || "icon"} width={50} height={50} />
          </button>
        </div>

        <h4 className="font-semibold text-[24px] my-3 font-iransans truncate">{title}</h4>

        <div className="text-[16px] text-[var(--color-secondary-15)]">
          <span>حجم فایل: </span>
          <span>{displayFileSize}</span>
        </div>

        <div className="my-4 text-[16px] text-[var(--color-secondary-15)]">
          {safeDate(date) ? shamsiDateLong(date) : "-"}
        </div>

        <button
          type="button"
          className={`border font-iransans text-[16px] rounded-[30px] p-2 transition-colors duration-300 ${statusClass()}`}
        >
          <div className="flex flex-col items-center">
            <span>{statusText}</span>
            <span className="text-sm">{safeDate(statusDate) ? shamsiDateShort(statusDate) : "-"}</span>
          </div>
        </button>

        <div className="flex items-center justify-center my-3 gap-3">
          <FaTag color="#D3E964" />
          <span>{difficulty}</span>
        </div>

        <div className="flex justify-center items-center gap-4">
          <button className="w-[100px] h-[50px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-[#0029BC] hover:bg-[#0029BC] hover:text-white transition-all duration-150">
            {/* preview svg */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.6792 4.79964L6.73248 16.3863C6.31915 16.8263 5.91915 17.693 5.83915 18.293L5.34582 22.613C5.17248 24.173 6.29248 25.2396 7.83915 24.973L12.1325 24.2396C12.7325 24.133 13.5725 23.693 13.9858 23.2396L24.9325 11.653C26.8258 9.65297 27.6792 7.37297 24.7325 4.5863C21.7992 1.8263 19.5725 2.79964 17.6792 4.79964Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.8516 6.73438C16.4249 10.4144 19.4116 13.2277 23.1182 13.601" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 29.334H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="w-[100px] h-[50px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-white bg-[#0029BC]">
            {/* download svg */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14.666V22.666L14.6667 19.9993" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.0002 22.6667L9.3335 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M29.3332 13.3327V19.9993C29.3332 26.666 26.6665 29.3327 19.9998 29.3327H11.9998C5.33317 29.3327 2.6665 26.666 2.6665 19.9993V11.9993C2.6665 5.33268 5.33317 2.66602 11.9998 2.66602H18.6665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M29.3332 13.3327H23.9998C19.9998 13.3327 18.6665 11.9993 18.6665 7.99935V2.66602L29.3332 13.3327Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

Document.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  fileSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  statusText: PropTypes.string,
  statusDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  statusType: PropTypes.string,
  difficulty: PropTypes.string,
};

Document.defaultProps = {
  icon: "/assets/icons/brain.svg",
  title: "بدون عنوان",
  fileSize: "-",
  date: null,
  statusText: "نامشخص",
  statusDate: null,
  statusType: "unknown",
  difficulty: "",
};

export default Document;
