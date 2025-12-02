"use client";
import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";

const questions = [
  {
    id: 1,
    title: "سوال اول",
    answer:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ ",
  },
  {
    id: 2,
    title: "سوال دوم",
    answer:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ ",
  },
  {
    id: 3,
    title: "سوال سوم",
    answer:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ ",
  },
];

export default function MyAccordion({ allowMultiple = false, className }) {
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

  return (
    <div className={`space-y-2 md:space-y-6 pb-3 md:pb-10 ${className}`}>
      {questions.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div key={item.id} className="space-y-1">
            {/* سوال (دکمه) */}
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center justify-between px-5 py-3 rounded-xl  transition-all font-semibold  shadow-icon ${
                isOpen
                  ? "bg-blue-700"
                  : "bg-gradient-to-r from-[#E5EBFF] via-[#DFE6FD] to-[#CED8F8]"
              }`}
            >
              <span
                className={` text-xs md:text-2xl font-semibold ${
                  !isOpen ? "text-black" : "text-white"
                }`}
              >
                {item.title}
              </span>
              <BiChevronDown
                fill={isOpen ? "#fff" : "#000"}
                className={`transition-transform duration-300 w-5 h-5 md:h-7 md:w-7 ${
                  isOpen ? "-rotate-90" : ""
                } `}
              />
            </button>

            <div
              className={`transition-all duration-400 ease-in-out mt-2 ${
                isOpen
                  ? "opacity-100 scale-100 h-10 md:h-16"
                  : "opacity-0 scale-90 pointer-events-none h-0"
              }`}
            >
              <div className=" bg-white shadow-icon px-2 py-3 md:px-4 md:py-6 border border-secondary-5 rounded-md md:rounded-2xl">
                <p className="text-black font-normal text-[10px] md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
