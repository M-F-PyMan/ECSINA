"use client";

import Button from "@/components/UI/Button";
import Link from "next/link";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // ایمیل یا موبایل
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://10.1.192.2:8000/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || "خطا در ورود");
      }

      const data = await response.json();

      // ذخیره توکن‌ها
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // ریدایرکت بعد از موفقیت
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#E5EBFF] w-[800px] h-[136px] absolute top-0 right-0 left-0 z-10"></div>
      <div className="relative z-20">
        <Link href={"/"}>
          <IoClose size={24} />
        </Link>
        <h4 className="font-semibold text-[12px] md:text-[24px] text-primary-7 opacity-80 text-center mt-[18px] mb-[97px]">
          ورود به اکسینا
        </h4>
        <h6 className="opacity-60 text-primary-7 text-[10px] md:text-[20px]">
          فراموشی/ تغییر رمز عبور
        </h6>

        <div className="flex flex-col gap-[16px] mt-[16px] text-[8px] md:text-[16px]">
          <div className="bg-secondary-4 p-[16px] rounded-[4px] flex flex-col gap-[8px]">
            <label className="opacity-60 text-primary-7">ایمیل یا شماره موبایل</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ایمیل یا شماره موبایل"
              className="outline-0 font-yekan w-full"
            />
          </div>
          <div className="bg-secondary-4 p-[16px] rounded-[4px] flex flex-col gap-[8px]">
            <label className="opacity-60 text-primary-7">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              className="outline-0 font-yekan w-full"
            />
          </div>
        </div>

        {error && (
          <p className="text-main-4 text-center mt-4 text-[12px] md:text-[16px]">
            {error}
          </p>
        )}

        <Button
          icon={"/assets/icons/Arrow.svg"}
          className="mx-auto mt-[24px] mb-[90px] md:mb-[40px]"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "در حال ورود..." : "ورود"}
        </Button>
      </div>
    </>
  );
};

export default LoginPage;
