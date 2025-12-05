"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import AuthInput from "./AuthInput";
import Button from "../UI/Button";
import AuthCardLayout from "./LoginLayout";

const CodeVerificationForm = ({ identifier, onBack }) => {
  const maskIdentifier = (id) => {
    if (!id) return id;
    if (id.includes("@")) {
      // ایمیل
      const [name, domain] = id.split("@");
      return `${name.slice(0, 2)}***@${domain}`;
    } else {
      // موبایل
      return `${id.slice(7, 11)}***${id.slice(0, 4)}`;
    }
  };

  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleResend = async () => {
    try {
      const res = await fetch("http://10.1.192.2:8000/auth/send-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      const result = await res.json();
      if (res.ok) {
        setTimeLeft(120);
        setCanResend(false);
        setError("");
      } else {
        setError(result.detail || "خطا در ارسال مجدد کد");
      }
    } catch (err) {
      setError("ارتباط با سرور برقرار نشد");
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://10.1.192.2:8000/auth/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, code: data.code }),
      });
      const result = await res.json();

      if (res.ok) {
        // ذخیره identifier برای مرحله بعد
        localStorage.setItem("identifier", identifier);
        // ریدایرکت به صفحه تغییر رمز عبور
        window.location.href = "/auth/reset_password/reset";
      } else {
        setError(result.detail || "کد اشتباه یا منقضی شده است");
      }
    } catch (err) {
      setError("ارتباط با سرور برقرار نشد");
    }
  };

  return (
    <AuthCardLayout>
      <div className="bg-[#F4EFF9] h-[140px] w-full px-10 py-8 flex flex-row justify-between rounded-[10px] mb-13">
        <button className="cursor-pointer flex flex-row-reverse gap-1 items-center">
          <Image width={42} height={42} src="/icons/loginClose.svg" alt="Close" />
        </button>
        <p className="text-[#1E1328CC] flex items-center">تأیید کد</p>
        <button onClick={onBack} className="cursor-pointer">
          <Image src="/icons/backArrow.svg" width={24} height={24} alt="Back"></Image>
        </button>
      </div>
      <p className="text-black text-[16px] font-normal">
        کد ارسال‌شده به {maskIdentifier(identifier)} را وارد کنید.
      </p>
      <div className="flex justify-between items-center">
        {!canResend ? (
          <p className="bg-gradient-to-r from-[#3E243C] via-[#71416D] to-[#A45F9E] bg-clip-text text-transparent text-2xl">
            {formatTime(timeLeft)}
          </p>
        ) : (
          <button onClick={handleResend} className="text-[#71416D] underline text-sm">
            ارسال مجدد کد
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput
          placeHolder={"کد تایید"}
          {...register("code", {
            required: "کد تایید الزامی است",
            minLength: { value: 4, message: "کد باید حداقل ۴ رقم باشد" },
          })}
          error={errors.code?.message}
        />
        {error && <p className="text-main-4 text-center">{error}</p>}
        <Button
          type="submit"
          className="w-[280px] flex justify-center h-[70px] [&>*]:text-2xl mb-6 justify-self-center"
          text={"تأیید"}
        />
      </form>
    </AuthCardLayout>
  );
};

export default CodeVerificationForm;
