"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

/*
  Props:
    - title: string
    - showBack: boolean (default true)
    - backHref: string | null  (اگر مشخص شود از آن استفاده می‌شود)
    - onBack: function | null  (اگر مشخص شود اجرا می‌شود)
    - iconSrc: string (مسیر آیکون)
    - disableLog: boolean (اگر true باشد لاگ به سرور ارسال نمی‌شود)
    - logPayload: object (اختیاری، برای ارسال اطلاعات اضافی به API لاگ)
*/
const Title = ({
  title,
  showBack = true,
  backHref = null,
  onBack = null,
  iconSrc = "/assets/icons/chevron-left.svg",
  disableLog = false,
  logPayload = {},
}) => {
  const router = useRouter();

  const sendBackLog = async () => {
    if (disableLog) return;
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
      await fetch("/api/user-activity-log/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          action_type: "navigate_back",
          // می‌توانید فیلدهای بیشتری بر اساس مدل بک‌اند اضافه کنید
          ...logPayload,
        }),
      });
    } catch (e) {
      // خطا در لاگ نباید تجربه کاربری را خراب کند؛ فقط در کنسول لاگ می‌کنیم
      // eslint-disable-next-line no-console
      console.warn("Failed to send back log", e);
    }
  };

  const handleBack = async (e) => {
    e?.preventDefault?.();
    if (typeof onBack === "function") {
      try {
        await onBack();
      } catch (err) {
        // اگر onBack خطا داد، ادامه می‌دهیم تا کاربر گیر نکند
        // eslint-disable-next-line no-console
        console.warn("onBack handler error", err);
      }
      await sendBackLog();
      return;
    }
    await sendBackLog();
    if (backHref) {
      router.push(backHref);
      return;
    }
    router.back();
  };

  return (
    <div className="mb-[24px] md:mb-[60px] flex justify-between items-center md:justify-center mt-[40px] container mx-auto h-full w-full">
      <h3 className="font-iransans font-bold md:font-semibold text-[16px] md:text-[30px] text-center">
        {title}
      </h3>

      {showBack && (
        <button
          onClick={handleBack}
          aria-label="بازگشت"
          className="block md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-7"
          title="بازگشت"
        >
          <Image src={iconSrc} alt="بازگشت" width={15} height={15} />
        </button>
      )}
    </div>
  );
};

export default Title;
