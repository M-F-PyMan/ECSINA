"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/UI/Button";
import { IoClose } from "react-icons/io5";

function LoginPage() {
  const [username, setUsername] = useState(""); // ایمیل یا موبایل
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // پایهٔ آدرس API: از env استفاده کن یا مقدار پیش‌فرض لوکال
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      // اگر مقدار username شامل @ بود فرض می‌کنیم ایمیل است، در غیر این صورت آن را به عنوان email هم می‌فرستیم
      const payload = {
        email: username,
        password,
      };

      const res = await fetch(`${API_BASE}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // یک‌بار پاسخ را پارس کن
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        // اگر خطای مشخصی از سرور آمده آن را نمایش بده، در غیر این صورت پیام عمومی
        const msg =
          (body && (body.detail || body.non_field_errors || body.error)) ||
          // اگر سرور فیلدهای خطا را به شکل { email: [...], password: [...] } فرستاده باشد
          (body && typeof body === "object"
            ? Object.values(body)
                .flat()
                .filter(Boolean)
                .join(" | ")
            : null) ||
          "خطا در ورود";
        throw new Error(msg);
      }

      // انتظار داریم body شامل access و refresh باشد
      if (!body || !body.access) {
        throw new Error("توکن دریافت نشد. لطفاً دوباره تلاش کنید.");
      }

      localStorage.setItem("access", body.access);
      if (body.refresh) localStorage.setItem("refresh", body.refresh);

      // ریدایرکت به صفحهٔ اصلی
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.message || "خطای شبکه. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#E5EBFF] w-[800px] h-[136px] absolute top-0 right-0 left-0 z-10" />
      <div className="relative z-20 max-w-[720px] mx-auto p-4">
        <Link href={"/"}>
          <IoClose size={24} />
        </Link>

        <h4 className="font-semibold text-[12px] md:text-[24px] text-primary-7 opacity-80 text-center mt-[18px] mb-[40px]">
          ورود به اکسینا
        </h4>

        <div className="flex flex-col gap-[16px] mt-[16px] text-[8px] md:text-[16px]">
          <div className="bg-secondary-4 p-[16px] rounded-[4px] flex flex-col gap-[8px]">
            <label className="opacity-60 text-primary-7">ایمیل یا شماره موبایل</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ایمیل یا شماره موبایل"
              className="outline-0 font-yekan w-full"
              aria-label="email-or-phone"
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
              aria-label="password"
            />
          </div>
        </div>

        {error && (
          <p className="text-main-4 text-center mt-4 text-[12px] md:text-[16px]" role="alert">
            {error}
          </p>
        )}

        <Button
          icon={"/assets/icons/Arrow.svg"}
          className="mx-auto mt-[24px] mb-[20px]"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "در حال ورود..." : "ورود"}
        </Button>

        <div className="text-center mt-[10px]">
          <Link href="/auth/forgot_password/two_step" className="text-sm text-blue-600 hover:underline">
            فراموشی رمز عبور؟
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
