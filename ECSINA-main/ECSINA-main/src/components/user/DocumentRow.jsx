"use client";
import { shamsiDateLong, shamsiDateShort } from "@/utils/shamsiDate";
import Image from "next/image";
import { FaTag } from "react-icons/fa";

export default function DocumentRow({
  id,
  icon,
  title,
  fileSize,
  date,
  statusText,
  statusDate,
  statusType,
  difficulty,
}) {
  const handleDownload = async () => {
    const res = await fetch(`/api/user-proposal-uploads/${id}/download`);
    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = title;
      a.click();
    }
  };

  const handleEdit = async () => {
    await fetch(`/api/user-proposal-uploads/${id}/save-edit`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ editable_content: "<p>ویرایش جدید...</p>" }),
    });
  };

  return (
    <div
      style={{
        background: `linear-gradient(139.79deg, #F2F5FB 0.21%, #F7F9EE 106.61%)`,
      }}
      className="relative grid grid-cols-12 items-center gap-4 p-4 rounded-[30px] shadow-[0px_0px_3px_3px_#00000020]"
    >
      {/* آیکون و عنوان */}
      <div className="flex flex-col lg:flex-row items-center gap-3 col-span-3">
        <button className="hidden md:block border border-main-1 rounded-[30px] p-[8px] ">
          <Image src={icon} width={25} height={25} alt="icon" />
        </button>
        <div className="flex flex-col lg:text-center text-right lg:items-start items-center gap-[8px]">
          <div className="font-semibold text-[13px] md:text-[16px] lg:text-[18px] text-nowrap">
            {title}
          </div>
          <div className="font-normal text-[13px] lg:text-[14px] text-secondary-15 text-nowrap">
            حجم فایل: {fileSize}
          </div>
        </div>
      </div>

      {/* تاریخ ایجاد */}
      <div className="font-normal text-[14px] text-secondary-15 col-span-3 md:col-span-1 lg:text-nowrap text-center">
        {shamsiDateLong(new Date(date))}
      </div>

      {/* وضعیت */}
      <div className="col-span-4 flex justify-center items-center">
        <button
          className={`md:border flex items-center gap-1 rounded-[30px] p-[8px] transition-colors duration-300 ${
            statusType === "pending"
              ? "border-[#F94701] text-[#F94701]"
              : statusType === "approved"
              ? "border-[#07D000] text-[#07D000]"
              : statusType === "rejected"
              ? "border-red-600 text-red-600"
              : "border-[#0029BC] text-[#0029BC]"
          }`}
        >
          <span>{statusText}</span>
          <span>{shamsiDateShort(new Date(statusDate))}</span>
        </button>
      </div>

      {/* سختی */}
      <div className="flex items-center text-[14px] justify-center gap-[4px] col-span-3 md:col-span-2 lg:col-span-1">
        <FaTag color="#D3E964" />
        <span>{difficulty}</span>
      </div>

      {/* عملیات */}
      <div className="flex justify-center gap-[15px] col-span-12 md:col-span-2 lg:col-span-3">
        <button
          onClick={handleEdit}
          className="w-[100px] h-[50px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-[#0029BC] hover:bg-[#0029BC] hover:text-white"
        >
          ✏️
        </button>
        <button
          onClick={handleDownload}
          className="w-[100px] h-[50px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-white bg-[#0029BC]"
        >
          ⬇️
        </button>
      </div>
    </div>
  );
}
