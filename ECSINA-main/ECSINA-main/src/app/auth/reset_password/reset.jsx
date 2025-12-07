"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Button from "@/components/UI/Button";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیست.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      // ایمیل یا موبایل ذخیره‌شده در مرحله OTP
      const identifier = localStorage.getItem("identifier");

      const response = await fetch("http://10.1.192.2:8000/auth/reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, new_password: newPassword }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "خطا در تغییر رمز عبور");
      }

      alert("رمز عبور با موفقیت تغییر کرد. لطفاً دوباره وارد شوید.");
      window.location.href = "/auth/login";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-evenly md:justify-center items-center z-0 w-screen h-screen relative">
      <div className="flex-col md:hidden text-white items-center z-10">
        <h1 className="text-xl text-center">تغییر رمز عبور</h1>
        <p className="mt-3 text-xl">رمز جدید خود را وارد کنید.</p>
      </div>

      {/* Image background mobile responsive */}
      <div className="w-full md:hidden h-[250px] absolute z-0 top-0">
        <Image alt="" src={"/assets/images/sign-up.png"} fill />
      </div>

      {/* Auth Card */}
      <section className="w-2/3 h-fit relative bg-white z-10 blue_shadow rounded-xl p-4 flex flex-col items-center justify-start">
        <div className="w-full flex justify-end md:justify-between items-start z-40">
          <div className="relative size-12 md:size-21">
            <Image src={"/assets/icons/Logo.svg"} alt="Logo" fill />
          </div>
          <Link href={"/"} className="p-6 absolute -top-32 left-[-25%] md:left-0 md:top-0 md:relative">
            <IoClose className="md:text-black text-white hover:opacity-60" size={25} />
          </Link>
        </div>

        {/* فرم تغییر رمز */}
        <div className="w-full flex flex-col gap-4 mt-6">
          <label className="opacity-60 text-primary-7">رمز عبور جدید</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="رمز عبور جدید"
            className="outline-0 font-yekan w-full p-2 border rounded"
          />

          <label className="opacity-60 text-primary-7">تکرار رمز عبور</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="تکرار رمز عبور"
            className="outline-0 font-yekan w-full p-2 border rounded"
          />

          {error && <p className="text-main-4 text-center mt-2">{error}</p>}

          <Button
            className="mx-auto mt-4 bg-primary-7"
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? "در حال تغییر..." : "تغییر رمز عبور"}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ResetPasswordPage;

