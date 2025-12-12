"use client";
import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";

/**
 * MyAccordion
 * @param {Array} items - لیست سوالات متداول از بک‌اند
 * @param {boolean} allowMultiple - اجازه باز شدن چند آیتم همزمان
 * @param {string} className - کلاس‌های اضافی برای استایل
 */
export default function MyAccordion({ items = [], allowMultiple = false, className }) {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  if (!items.length) {
    return <p className="text-gray-500 text-sm">هیچ سوالی ثبت نشده است.</p>;
  }

  return (
    <div className={`space-y-2 md:space-y-6 pb-3 md:pb-10 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div key={item.id} className="space-y-1">
            {/* سوال */}
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center justify-between px-5 py-3 rounded-xl transition-all font-semibold shadow-icon ${
                isOpen
                  ? "bg-blue-700"
                  : "bg-gradient-to-r from-[#E5EBFF] via-[#DFE6FD] to-[#CED8F8]"
              }`}
            >
              <span
                className={`text-xs md:text-2xl font-semibold ${
                  !isOpen ? "text-black" : "text-white"
                }`}
              >
                {item.title}
              </span>
              <BiChevronDown
                fill={isOpen ? "#fff" : "#000"}
                className={`transition-transform duration-300 w-5 h-5 md:h-7 md:w-7 ${
                  isOpen ? "-rotate-90" : ""
                }`}
              />
            </button>

            {/* جواب */}
            <div
              className={`transition-all duration-400 ease-in-out mt-2 ${
                isOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 pointer-events-none h-0"
              }`}
            >
              <div className="bg-white shadow-icon px-2 py-3 md:px-4 md:py-6 border border-secondary-5 rounded-md md:rounded-2xl">
                <p className="text-black font-normal text-[10px] md:text-base">
                  {item.content || item.description}
                </p>
                {item.file && (
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-xs md:text-sm mt-2 block"
                  >
                    مشاهده فایل مرتبط
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
