"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "../UI/Button";

const CreateComment = ({ proposalId }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("لطفاً متن نظر را وارد کنید.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://10.1.192.2:8000/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
        },
        body: JSON.stringify({
          content,
          proposal: proposalId, // اتصال نظر به پروپوزال
        }),
      });

      const json = await res.json();
      if (res.ok) {
        alert("نظر شما با موفقیت ثبت شد.");
        setContent(""); // پاک کردن فرم
      } else {
        alert(json.detail || "خطا در ثبت نظر.");
      }
    } catch (err) {
      alert("خطا در ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-24 md:mt-36">
      <div className="shadow-future-cart rounded-2xl py-5 md:py-8 px-3 md:px-16 bg-white">
        {/* TITLE */}
        <div className="flex items-center justify-end">
          <p className="text-base border-b-3 pb-3 border-primary-7 md:text-4xl font-bold text-black">
            ثبت نظر جدید
          </p>
        </div>

        {/* AVATAR */}
        <div className="flex items-center gap-2 md:gap-6 mt-3">
          <div className="relative w-10 h-10 md:w-16 md:h-16">
            <Image
              src={"/assets/images/User.png"}
              alt=""
              fill
              className="rounded-full"
            />
          </div>
          <p className="text-black text-base md:text-3xl font-bold">
            نام کاربری
          </p>
        </div>

        {/* TEXT AREA */}
        <div>
          <div className="bg-blue-50 rounded-xl p-4 text-right mt-4 md:mt-8">
            <textarea
              className="w-full p-2 md:p-5 bg-transparent border-none focus:outline-none resize-none text-base md:text-xl placeholder-primary-7"
              rows="5"
              placeholder="نظر خود را بنویسید..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-center mt-5">
            <Button
              className="w-full md:w-auto"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "در حال ارسال..." : "ارسال پیام"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
