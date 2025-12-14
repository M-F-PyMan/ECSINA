"use client";
import React, { useEffect, useState } from "react";
import { shamsiDateLong, shamsiDateShort } from "@/utils/shamsiDate";

/*
  ProgressTimeline
  - اگر props.steps ارسال شود از آن استفاده می‌کند.
  - در غیر این صورت از endpoint زیر داده می‌گیرد:
    GET /api/user-activity-log/?ordering=-timestamp
    هر آیتم انتظار می‌رود حداقل فیلدهای زیر را داشته باشد:
      { id, action_type, timestamp, file: { id, title } }
  - توکن احراز هویت را از localStorage می‌خواند اگر موجود باشد.
*/

const ProgressTimeline = ({ steps: initialSteps = null, apiUrl = "/api/user-activity-log/" }) => {
  const [steps, setSteps] = useState(initialSteps);
  const [loading, setLoading] = useState(!initialSteps);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (initialSteps) return;

    const fetchSteps = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
        const res = await fetch(`${apiUrl}?ordering=-timestamp`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error(`خطا در دریافت داده: ${res.status}`);
        const data = await res.json();

        // نگاشت داده‌ها به فرمت مورد نیاز کامپوننت
        const mapped = data.map((d) => ({
          id: d.id,
          title:
            d.action_type === "download"
              ? `دانلود ${d.file?.title || ""}`
              : d.action_type === "edit"
              ? `ویرایش ${d.file?.title || ""}`
              : d.action_type === "review"
              ? `بازبینی ${d.file?.title || ""}`
              : d.action_type,
          // timestamp ممکن است رشته ISO باشد
          date: d.timestamp ? new Date(d.timestamp) : new Date(),
        }));

        if (mounted) {
          setSteps(mapped);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "خطای نامشخص");
          setLoading(false);
        }
      }
    };

    fetchSteps();
    return () => {
      mounted = false;
    };
  }, [initialSteps, apiUrl]);

  if (loading) {
    return <div className="py-6 text-center">در حال بارگذاری تاریخچه...</div>;
  }
  if (error) {
    return <div className="py-6 text-center text-red-600">خطا: {error}</div>;
  }
  if (!steps || steps.length === 0) {
    return <div className="py-6 text-center">هیچ فعالیتی برای نمایش وجود ندارد.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start md:justify-center mt-10 w-full md:w-[80%] md:mx-auto">
      <div className="relative flex flex-col md:flex-row justify-between md:items-center w-full gap-10 md:gap-0">
        {/* خط میانی */}
        <div
          aria-hidden="true"
          className="absolute right-4 left-4 md:left-0 md:right-0 md:top-14 border-dashed border-primary-7 z-0"
          style={{
            borderRightWidth: 2,
            borderTopWidth: 0,
            height: "100%",
          }}
        />
        {steps.map((step, index) => (
          <div
            key={step.id ?? index}
            className="relative z-10 flex flex-row md:flex-col items-center text-right gap-5 md:gap-0 md:text-center"
          >
            <div
              className="flex items-center justify-center w-8 h-8 bg-primary-7 rounded-full text-white mb-3"
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h5 className="text-[12px] md:text-[16px] font-medium">{step.title}</h5>
              <p className="text-[10px] md:text-[13px] text-[#4A4D38] mt-1">
                {/* اگر date شیء Date است از shamsiDateLong استفاده کن */}
                {step.date instanceof Date ? shamsiDateLong(step.date) : step.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="hidden md:flex mt-10 font-semibold hover:text-primary-7 transition border-b-2 font-iransans"
        aria-label="مشاهده بیشتر تاریخچه"
      >
        مشاهده بیشتر
      </button>
    </div>
  );
};

export default ProgressTimeline;
