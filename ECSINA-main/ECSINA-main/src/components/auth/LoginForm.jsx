"use client";
import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import AuthCardLayout from "./LoginLayout";
import AuthInput from "./AuthInput";
import Image from "next/image";

const PhoneLoginForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.phoneNumber,   // می‌تونه ایمیل یا موبایل باشه
          password: data.password,      // باید فیلد پسورد هم اضافه بشه
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const tokens = await response.json();
      console.log("JWT tokens:", tokens);

      // ذخیره در localStorage
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);

      onSuccess?.(data.phoneNumber);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <AuthCardLayout>
      <div className="flex flex-row justify-between max-h-[30px]">
        <button className="cursor-pointer flex flex-row-reverse gap-1 items-center">
          <p className="text-[#2E334266] text-[16px]">ورود با دسترسی سریع</p>
          <Image src="/icons/login.svg" width={24} height={24} alt="Login"></Image>
        </button>

        <button className="cursor-pointer">
          <Image width={42} height={42} src="/icons/loginClose.svg" alt="Close" />
        </button>
      </div>
      <Image src="/icons/exinIconWithoutHandsPurple.svg" width={70} height={140} alt="Exin" className="self-center"></Image>
      <p className="text-black font-normal text-[20px]">
        {" "}
        برای ورود به
        <span className="text-[#71416D] text-[20px] font-semibold"> اکسینا </span> شماره تلفن یا ایمیل خود را وارد کنید .
      </p>
      <p className=" flex items-center rounded-[4px] bg-gradient-to-r from-[#3E243C] via-[#71416D] via-[45.5%] to-[#A45F9E] max-w-[300px] max-h-[42px] p-3 justify-center text-center text-white font-normal text-[14px]">
        کد تایید یا رمز عبور باید وارد شود.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput
          placeHolder={"ایمیل یا شماره تلفن"}
          {...register("phoneNumber", {
            required: "این فیلد اجباری است",
          })}
          error={errors.phoneNumber?.message}
        ></AuthInput>

        <AuthInput
          placeHolder={"رمز عبور"}
          type="password"
          {...register("password", {
            required: "رمز عبور اجباری است",
            minLength: { value: 8, message: "رمز عبور باید حداقل ۸ کاراکتر باشد" },
          })}
          error={errors.password?.message}
        ></AuthInput>

        <Button
          type="submit"
          className={"w-[280px] flex justify-center h-[70px] [&>*]:text-2xl justify-self-center"}
          text="ورود"
        ></Button>
      </form>
    </AuthCardLayout>
  );
};

export default PhoneLoginForm;
