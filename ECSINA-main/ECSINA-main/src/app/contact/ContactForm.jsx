"use client";

import React, { useState } from "react";
import InputField from "@/components/UI/InputField";
import { FaTelegramPlane } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const access = localStorage.getItem("access");
    if (!access) {
      alert("برای ارسال پیام باید وارد شوید یا ثبت‌نام کنید.");
      window.location.href = "/auth/register";
      setLoading(false);
      return;
    }

    const phone = e.target.phone.value.trim();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();

    const payload = {
      subject: `تیکت کاربر: ${name || "بدون نام"} - ${phone || "بدون شماره"}`,
      message: `ایمیل: ${email || "—"}\nشماره: ${phone || "—"}\n\n${message}`,
      priority: "high", // می‌تونی اینو dynamic کنی (مثلاً انتخاب از dropdown)
    };

    try {
      const res = await fetch("http://192.168.56.1:8000/api/v1/support/tickets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("تیکت شما ثبت شد ✅ تیم پشتیبانی به‌زودی پاسخ خواهد داد.");
        e.target.reset();
      } else {
        const err = await res.json().catch(() => ({}));
        console.error("Support submit error:", err);
        alert("ارسال تیکت ناموفق بود ❌ لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error(error);
      alert("خطا در ارتباط با سرور. بعداً تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full justify-between p-2 md:p-6 gap-6 col-span-1 shadow-xl rounded-lg"
    >
      <div className="w-full grid gap-1 md:gap-2.5 grid-cols-2">
        <InputField type="text" title={"شماره تماس"} id={"phone"} required />
        <InputField type="text" title={"نام و نام‌خانوادگی"} id={"name"} required />
      </div>
      <InputField type="text" title={"ایمیل"} id={"email"} required />
      <div className="relative">
        <textarea
          id="message"
          rows="10"
          className="w-full block px-6 pt-6 rounded-md text-base bg-primary-0 text-primary-14 appearance-none focus:outline-none focus:ring-0 peer resize-none"
          placeholder="    "
          required
        ></textarea>
        <label
          htmlFor={"message"}
          className="absolute text-sm text-main-1 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] right-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3"
        >
          <span className="text-main-4 px-1 mt-2 text-sm">*</span>
          متن تیکت خود را وارد کنید...
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`bg-primary-7 mt-5 text-white p-2 rounded-lg text-base md:text-2xl hover:bg-primary-10 transition ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "در حال ارسال..." : "ارسال تیکت"}
      </button>

      <div className="mt-8 md:hidden flex md:flex-row-reverse items-center justify-center gap-8">
        <span className="bg-primary-7 flex items-center justify-center hover:bg-transparent border-2 text-white border-primary-7 hover:text-primary-7 transition-all ease-in duration-200 cursor-pointer p-3 rounded-full">
          <FaTelegramPlane size={35} />
        </span>
        <span className="bg-primary-7 flex items-center justify-center hover:bg-transparent border-2 text-white border-primary-7 hover:text-primary-7 transition-all ease-in duration-200 cursor-pointer p-3 rounded-full">
          <BiSolidPhoneCall size={35} />
        </span>
        <span className="bg-primary-7 flex items-center justify-center hover:bg-transparent border-2 text-white border-primary-7 hover:text-primary-7 transition-all ease-in duration-200 cursor-pointer p-3 rounded-full">
          <MdEmail size={35} />
        </span>
      </div>
    </form>
  );
}
