"use client";

import Button from "@/components/UI/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const TwoStep = () => {
  const [time, setTime] = useState(0);
  const [identifier, setIdentifier] = useState(""); // ایمیل یا موبایل
  const [code, setCode] = useState(""); // کد OTP
  const [step, setStep] = useState("input"); // input | verify
  const [error, setError] = useState("");

  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  // ارسال OTP
  const handleSendOTP = async () => {
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("verify");
        setTime(120);
        setError("");
      } else {
        setError(data.detail || "خطا در ارسال کد");
      }
    } catch (err) {
      setError("ارتباط با سرور برقرار نشد");
    }
  };

  // بررسی OTP
  const handleVerifyOTP = async () => {
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, code }),
      });
      const data = await res.json();
      if (res.ok) {
        setError("");
        // هدایت به صفحه تغییر رمز عبور
        window.location.href = "/reset-password";
      } else {
        setError(data.detail || "کد اشتباه یا منقضی شده است");
      }
    } catch (err) {
      setError("ارتباط با سرور برقرار نشد");
    }
  };

  return (
    <>
      <div className="bg-[#E5EBFF] w-[800px] h-[136px] absolute top-0 right-0 left-0 z-10"></div>
      <div className="relative z-20">
        <Link href={"/"}>
          <IoClose size={24} />
        </Link>
        <h4 className="font-semibold text-[12px] md:text-[24px] text-primary-7 opacity-80 text-center mt-[18px] mb-[40px]">
          فراموشی رمز عبور
        </h4>

        {step === "input" && (
          <div className="flex flex-col gap-[16px]">
            <label className="opacity-60 text-primary-7">ایمیل یا شماره موبایل</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="outline-0 font-yekan w-full p-2 border rounded"
            />
            <Button onClick={handleSendOTP}>ارسال کد تأیید</Button>
          </div>
        )}

        {step === "verify" && (
          <div className="flex flex-col gap-[16px]">
            <label className="opacity-60 text-primary-7">کد تأیید</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="outline-0 font-yekan w-full p-2 border rounded"
            />
            {error && <span className="text-main-4">{error}</span>}
            {time > 0 ? (
              <div className="font-bold text-[16px] md:text-[24px]">
                {minutes}:{seconds}
              </div>
            ) : (
              <span className="text-main-4">زمان شما به پایان رسیده است. دوباره تلاش کنید</span>
            )}
            <Button disabled={time <= 0} onClick={handleVerifyOTP}>
              تأیید کد
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default TwoStep;
