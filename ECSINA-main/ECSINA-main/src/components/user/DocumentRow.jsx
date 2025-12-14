"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { shamsiDateLong, shamsiDateShort } from "@/utils/shamsiDate";
import Image from "next/image";
import { FaTag } from "react-icons/fa";

function safeDateFormatLong(d) {
  if (!d) return "-";
  try {
    return shamsiDateLong(new Date(d));
  } catch {
    return "-";
  }
}
function safeDateFormatShort(d) {
  if (!d) return "-";
  try {
    return shamsiDateShort(new Date(d));
  } catch {
    return "-";
  }
}

function DocumentRow({
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
  const [downloading, setDownloading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setError(null);
    setDownloading(true);
    try {
      const res = await fetch(`/api/user-proposal-uploads/${id}/download`, {
        headers: { Accept: "application/octet-stream" },
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        throw new Error(txt || `خطا در دانلود (${res.status})`);
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // اگر عنوان خالی است، از id استفاده کن
      a.download = title || `document-${id}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      // آزادسازی URL بعد از مدتی کوتاه
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error("download error:", e);
      setError("خطا در دانلود فایل. دوباره تلاش کنید.");
    } finally {
      setDownloading(false);
    }
  };

  const handleEdit = async () => {
    setError(null);
    setEditing(true);
    try {
      const res = await fetch(`/api/user-proposal-uploads/${id}/save-edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editable_content: "<p>ویرایش جدید...</p>" }),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        throw new Error(txt || `خطا در ویرایش (${res.status})`);
      }
      // در صورت نیاز می‌توانیم پاسخ را پردازش کنیم
    } catch (e) {
      console.error("edit error:", e);
      setError("خطا در ذخیرهٔ ویرایش. دوباره تلاش کنید.");
    } finally {
      setEditing(false);
    }
  };

  const statusClasses =
    statusType === "pending"
      ? "border-[#F94701] text-[#F94701]"
      : statusType === "approved"
      ? "border-[#07D000] text-[#07D000]"
      : statusType === "rejected"
      ? "border-red-600 text-red-600"
      : "border-[#0029BC] text-[#0029BC]";

  return (
    <div
      style={{
        background: `linear-gradient(139.79deg, #F2F5FB 0.21%, #F7F9EE 106.61%)`,
      }}
      className="relative grid grid-cols-12 items-center gap-4 p-4 rounded-[30px] shadow-[0px_0px_3px_3px_#00000020]"
      role="group"
      aria-label={`سند ${title || id}`}
    >
      {/* آیکون و عنوان */}
      <div className="flex flex-col lg:flex-row items-center gap-3 col-span-3">
        <div className="hidden md:block border border-main-1 rounded-[30px] p-[8px]">
          <Image
            src={icon || "/assets/icons/brain.svg"}
            width={25}
            height={25}
            alt={title || "icon"}
            unoptimized
          />
        </div>
        <div className="flex flex-col lg:text-center text-right lg:items-start items-center gap-[8px]">
          <div className="font-semibold text-[13px] md:text-[16px] lg:text-[18px] text-nowrap">
            {title || "بدون عنوان"}
          </div>
          <div className="font-normal text-[13px] lg:text-[14px] text-secondary-15 text-nowrap">
            حجم فایل: {fileSize ?? "-"}
          </div>
        </div>
      </div>

      {/* تاریخ ایجاد */}
      <div className="font-normal text-[14px] text-secondary-15 col-span-3 md:col-span-1 lg:text-nowrap text-center">
        {safeDateFormatLong(date)}
      </div>

      {/* وضعیت */}
      <div className="col-span-4 flex justify-center items-center">
        <button
          className={`md:border flex items-center gap-2 rounded-[30px] p-[8px] transition-colors duration-300 ${statusClasses}`}
          type="button"
          aria-label={`وضعیت: ${statusText}`}
        >
          <span className="ml-2">{statusText ?? "-"}</span>
          <span className="text-xs">{safeDateFormatShort(statusDate)}</span>
        </button>
      </div>

      {/* سختی */}
      <div className="flex items-center text-[14px] justify-center gap-[4px] col-span-3 md:col-span-2 lg:col-span-1">
        <FaTag color="#D3E964" />
        <span>{difficulty ?? "-"}</span>
      </div>

      {/* عملیات */}
      <div className="flex justify-center gap-[15px] col-span-12 md:col-span-2 lg:col-span-3">
        <button
          onClick={handleEdit}
          disabled={editing}
          aria-label="ویرایش سند"
          className={`w-[100px] h-[50px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-[#0029BC] hover:bg-[#0029BC] hover:text-white disabled:opacity-60`}
        >
          {editing ? "در حال ذخیره..." : "✏️"}
        </button>

        <button
          onClick={handleDownload}
          disabled={downloading}
          aria-label="دانلود سند"
          className={`w-[100px] h-[50px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-white bg-[#0029BC] disabled:opacity-60`}
        >
          {downloading ? "در حال دانلود..." : "⬇️"}
        </button>
      </div>

      {error && (
        <div className="col-span-12 mt-2 text-sm text-red-600 text-center" role="status">
          {error}
        </div>
      )}
    </div>
  );
}

DocumentRow.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
  fileSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  statusText: PropTypes.string,
  statusDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  statusType: PropTypes.string,
  difficulty: PropTypes.string,
};

DocumentRow.defaultProps = {
  icon: "/assets/icons/brain.svg",
  title: "بدون عنوان",
  fileSize: "-",
  date: null,
  statusText: "نامشخص",
  statusDate: null,
  statusType: "unknown",
  difficulty: "-",
};

export default DocumentRow;
