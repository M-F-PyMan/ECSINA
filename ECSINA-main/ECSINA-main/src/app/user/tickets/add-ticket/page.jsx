"use client";

import React, { useCallback, useState } from "react";
import Title from "@/components/user/Title";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function priorityValueToBackend(val) {
  // نگاشت مقادیر فرم به مقادیر مدل بک‌اند (در صورت نیاز تغییر بده)
  if (!val) return "none";
  if (val === "without") return "none";
  if (val === "urgent") return "high";
  return val; // low, medium
}

function Page() {
  const router = useRouter();

  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("without");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]); // برای پیش‌نمایش تصاویر
  const [files, setFiles] = useState([]); // فایل‌های آپلودی
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const onSelectImages = (e) => {
    const list = Array.from(e.target.files || []);
    setImages(list);
    // نگهداری فایل‌ها در files هم
    setFiles((prev) => [...prev, ...list]);
  };

  const onSelectFiles = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...list]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();
      setError(null);
      setSuccessMsg(null);

      if (!subject.trim() || !message.trim()) {
        setError("لطفاً موضوع و متن تیکت را وارد کنید.");
        return;
      }

      setLoading(true);

      try {
        const headers = getAuthHeaders();

        // اگر فایل وجود دارد، ابتدا با FormData ارسال می‌کنیم (multipart)
        if (files.length > 0) {
          const fd = new FormData();
          fd.append("subject", subject.trim());
          fd.append("message", message.trim());
          fd.append("priority", priorityValueToBackend(priority));

          // برخی بک‌اندها انتظار دارند فایل‌ها با نام خاصی ارسال شوند؛
          // اینجا از نام files[] استفاده می‌کنیم تا سرورهای معمول آن را دریافت کنند.
          files.forEach((f, idx) => {
            // کلید را files یا attachments یا file بسته به بک‌اند تغییر بده
            fd.append("files", f);
          });

          const res = await fetch(`${API_BASE}/api/tickets/`, {
            method: "POST",
            headers: {
              ...headers,
              // توجه: نباید Content-Type را برای FormData ست کنیم؛ مرورگر خودش می‌گذارد
            },
            body: fd,
          });

          if (!res.ok) {
            const txt = await res.text();
            throw new Error(txt || `خطا در ارسال تیکت (${res.status})`);
          }

          const data = await res.json();
          setSuccessMsg("تیکت با موفقیت ثبت شد.");
          // هدایت به صفحهٔ جزئیات یا لیست تیکت‌ها
          router.push(`/user/tickets/${data.id || ""}` || "/user/tickets");
          return;
        }

        // حالت بدون فایل: ارسال JSON
        const payload = {
          subject: subject.trim(),
          message: message.trim(),
          priority: priorityValueToBackend(priority),
        };

        const res = await fetch(`${API_BASE}/api/tickets/`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...headers },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || `خطا در ارسال تیکت (${res.status})`);
        }

        const data = await res.json();
        setSuccessMsg("تیکت با موفقیت ثبت شد.");
        router.push(`/user/tickets/${data.id || ""}` || "/user/tickets");
      } catch (e) {
        console.error("submit ticket error:", e);
        // تلاش برای استخراج پیام خطا از JSON
        try {
          const parsed = typeof e.message === "string" ? e.message : null;
          setError(parsed || "خطا در ارسال تیکت. دوباره تلاش کنید.");
        } catch {
          setError("خطا در ارسال تیکت. دوباره تلاش کنید.");
        }
      } finally {
        setLoading(false);
      }
    },
    [subject, message, priority, files, router]
  );

  return (
    <div className="container mx-auto h-full font-iransans pb-[40px]">
      <div className="hidden md:block">
        <Title title={"ثبت تیکت جدید"} />
      </div>

      <div className="bg-white rounded-[30px] md:border-1 p-[20px] md:p-[40px]">
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col scroll-auto">
          <div className="flex gap-[5px] flex-col md:flex-row items-start md:items-center rounded-[30px] md:border py-[12px] px-[10px]">
            <label htmlFor="subject" className="font-bold basis-[15%] text-[13px] md:text-[16px]">
              موضوع تیکت :
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="موضوع..."
              className="shadow-[0px_0px_7px_0px_#00000012] md:shadow-none py-[10px] md:py-0 rounded-[8px] px-[8px] basis-[100%] w-full outline-0 border-0 placeholder:text-[14px] md:placeholder:text-[16px]"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="flex gap-[5px] flex-col md:flex-row items-start md:items-center rounded-[30px] md:border py-[12px] px-[10px]">
            <label htmlFor="priority" className="font-bold basis-[15%] text-[13px] md:text-[16px]">
              اولویت :
            </label>
            <select
              id="priority"
              name="priority"
              className="shadow-[0px_0px_7px_0px_#00000012] md:shadow-none py-[10px] md:py-0 rounded-[8px] px-[8px] outline-0 border-0 w-full basis-[90%] text-[14px] md:text-[16px]"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="without">بدون اولویت</option>
              <option value="low">کم</option>
              <option value="medium">متوسط</option>
              <option value="urgent">فوری</option>
            </select>
          </div>

          <div className="flex gap-[5px] md:flex-row flex-col items-start rounded-[30px] md:border py-[12px] px-[10px]">
            <label htmlFor="message" className="font-bold basis-[15%] text-[13px] md:text-[16px]">
              متن تیکت:
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="متن تیکت را وارد کنید..."
              className="min-h-[160px] w-full border-0 outline-0 basis-[90%] placeholder:text-[14px] md:placeholder:text-[16px] shadow-[0px_0px_7px_0px_#00000012] md:shadow-none py-[10px] md:py-0 rounded-[8px] px-[8px]"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="w-[100%] md:w-[60%] mx-auto flex flex-wrap justify-between items-center gap-6">
            <div className="flex flex-col items-center">
              <label htmlFor="uploadImage" className="cursor-pointer flex flex-col items-center">
                <div className="border-2 border-main-1 md:border-[#00000012] w-[50px] h-[50px] flex justify-center items-center rounded-full hover:text-main-1 hover:border-main-1 transition-colors">
                  <FaPlus size={20} className="text-main-1 md:text-[#00000040]" />
                </div>
                <span className="font-bold mt-2 text-[14px] md:text-[14px]">آپلود تصویر</span>
              </label>
              <input type="file" id="uploadImage" accept="image/*" className="hidden" multiple onChange={onSelectImages} />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="uploadFile" className="cursor-pointer flex flex-col items-center">
                <div className="border-2 border-main-1 md:border-[#00000012] w-[50px] h-[50px] flex justify-center items-center rounded-full hover:text-main-1 hover:border-main-1 transition-colors">
                  <FaPlus size={20} className="text-main-1 md:text-[#00000040]" />
                </div>
                <span className="font-bold mt-2 text-[14px] md:text-[14px]">آپلود فایل</span>
              </label>
              <input type="file" id="uploadFile" className="hidden" multiple onChange={onSelectFiles} />
            </div>
          </div>

          {/* پیش‌نمایش فایل‌ها */}
          {files.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {files.map((f, idx) => (
                <div key={idx} className="flex flex-col items-center bg-[#FAFAFA] p-2 rounded-lg shadow-sm">
                  <div className="text-sm font-medium truncate max-w-[140px]">{f.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{Math.round(f.size / 1024)} KB</div>
                  <div className="mt-2 flex gap-2">
                    <button type="button" onClick={() => handleRemoveFile(idx)} className="text-sm px-2 py-1 rounded bg-red-50 text-red-600">
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-[50%] self-center text-center bg-main-1 text-white font-medium py-3 px-6 rounded-[30px] hover:bg-main-2 focus:outline-none focus:ring-2 focus:ring-main-1 focus:ring-offset-2 transition duration-300 disabled:opacity-60"
            >
              {loading ? "در حال ارسال..." : "ارسال تیکت"}
            </button>
          </div>

          {error && <div className="text-sm text-red-600 text-center mt-2">{error}</div>}
          {successMsg && <div className="text-sm text-green-600 text-center mt-2">{successMsg}</div>}
        </form>
      </div>

      <div className="mt-6">
        <p className="font-bold text-[16px] md:text-[20px] mt-[16px] text-center">قبل از ارسال تیکت توجه کنید...</p>
        <p className="font-normal text-[14px] border-r-2 border-r-main-1 pr-[5px] mt-[10px]">
          لطفاً در متن تیکت اطلاعات کافی و واضح وارد کنید تا تیم پشتیبانی سریع‌تر بتواند مشکل را بررسی کند.
          اگر فایل یا تصویر ارسال می‌کنید، حجم هر فایل نباید از ۱۰ مگابایت بیشتر باشد. در صورت نیاز به ارسال فایل‌های بزرگ‌تر،
          ابتدا آن‌ها را در سرویس‌های ذخیره‌سازی آپلود کرده و لینک را در متن تیکت قرار دهید.
        </p>
      </div>
    </div>
  );
}

export default Page;
