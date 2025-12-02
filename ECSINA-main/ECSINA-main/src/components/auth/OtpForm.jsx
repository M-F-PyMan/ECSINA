"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import AuthInput from "./AuthInput";
import Button from "../UI/Button";
import AuthCardLayout from "./LoginLayout";

const CodeVerificationForm = ({ phoneNumber, onBack }) => {
  const maskPhoneNumber = (phone) => {
    if (!phone || phone.length !== 11) return phone;
    // Reverse the number and apply the masking
    return `${phone.slice(7, 11)}***${phone.slice(0, 4)}`;
  };

  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(1, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

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

  const handleResend = () => {
    console.log("Resend code triggered");
    setTimeLeft(120);
    setCanResend(false);
    // You could also trigger actual API call here
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Entered code:", data.code);
  };

  return (
    <AuthCardLayout>
      <div className="bg-[#F4EFF9] h-[140px] w-full px-10 py-8 flex flex-row justify-between rounded-[10px] mb-13">
        <button className="cursor-pointer flex flex-row-reverse gap-1 items-center">
          <Image width={42} height={42} src="/icons/loginClose.svg" alt="Close" />
        </button>
        <p className="text-[#1E1328CC] flex items-center">ورود دو مرحله ای</p>
        <button onClick={onBack} className="cursor-pointer">
          <Image src="/icons/backArrow.svg" width={24} height={24} alt="Login"></Image>
        </button>
      </div>
      <p className="text-black text-[16px] font-normal">برای ورود ، کد ارسالی به موبایل خود را در فرم زیر را وارد نمایید.</p>
      <div className="flex justify-between items-center">
        <p className=" flex flex-row-reverse items-center rounded-[4px] bg-gradient-to-r from-[#3E243C] via-[#71416D] via-[45.5%] to-[#A45F9E] max-w-[350px] max-h-[42px] p-3 justify-center text-center text-white font-normal text-[14px] text-nowrap">
          کد تایید به شماره همراه {maskPhoneNumber(phoneNumber)} ارسال شده است.{" "}
        </p>
        {!canResend ? (
          <p className="bg-gradient-to-r from-[#3E243C] via-[#71416D] via-[45.5%] to-[#A45F9E] bg-clip-text text-transparent text-2xl">{formatTime(timeLeft)}</p>
        ) : (
          <button onClick={handleResend} className="text-[#71416D] underline text-sm">
            {" "}
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
        ></AuthInput>
        <Button type="submit" className={"w-[280px] flex justify-center h-[70px] [&>*]:text-2xl mb-6 justify-self-center"} text={"ورود"}></Button>
      </form>
    </AuthCardLayout>
  );
};

export default CodeVerificationForm;
