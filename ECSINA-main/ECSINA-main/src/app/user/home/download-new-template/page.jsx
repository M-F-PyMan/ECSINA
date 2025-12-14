"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { getAuthHeaders } from "@/utils/authHelpers"; // اگر نداری، تابع زیر را استفاده کن
// fallback: اگر فایل کمکی نداری، از تابع داخلی استفاده کن (در صورت نیاز آن را حذف کن)
const _getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

function NewTemplateDownloadPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/templates/?ordering=-created_at`, {
        headers: { "Content-Type": "application/json", ...(getAuthHeaders ? getAuthHeaders() : _getAuthHeaders()) },
      });
      if (!res.ok) {
        // اگر API ساختار متفاوت دارد، اینجا را مطابق بک‌اند تغییر بده
        throw new Error(`خطا در دریافت قالب‌ها: ${res.status}`);
      }
      const data = await res.json();
      // انتظار داریم data.results یا آرایهٔ مستقیم باشد
      const items = Array.isArray(data) ? data : data.results || [];
      setTemplates(items);
    } catch (e) {
      console.error(e);
      setError("خطا در بارگذاری قالب‌ها. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleDownload = async (tpl) => {
    // tpl باید شامل فیلد file.url یا download_url باشد
    const fileUrl = tpl.file?.url || tpl.download_url || tpl.url;
    if (!fileUrl) {
      alert("آدرس دانلود برای این قالب موجود نیست.");
      return;
    }

    try {
      setDownloadingId(tpl.id);
      // اگر نیاز به هدر auth برای دانلود داری، fetch و blob سپس save:
      const headers = getAuthHeaders ? getAuthHeaders() : _getAuthHeaders();
      // اگر دانلود مستقیم با لینک کار می‌کند، از window.open استفاده کن
      if (!headers.Authorization) {
        // بدون احراز هویت، مستقیم باز کن
        window.open(fileUrl.startsWith("http") ? fileUrl : `${API_BASE}${fileUrl}`, "_blank");
      } else {
        // با احراز هویت: fetch به صورت blob و دانلود از طریق لینک موقت
        const res = await fetch(fileUrl.startsWith("http") ? fileUrl : `${API_BASE}${fileUrl}`, {
          headers,
        });
        if (!res.ok) throw new Error("خطا در دانلود فایل");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        // نام فایل را از پاسخ یا tpl.filename بگیر، در غیر این صورت id را قرار بده
        const filename = tpl.filename || tpl.name || `template-${tpl.id}.zip`;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error("download error", e);
      alert("خطا در دانلود. دوباره تلاش کنید.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="container mx-auto py-8 font-iransans">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">دانلود قالب جدید</h1>

      <div className="mb-6 text-center">
        <p className="text-gray-600">در این صفحه می‌توانید قالب‌های آماده را مشاهده و دانلود کنید. برای دانلود قالب‌هایی که نیاز به دسترسی دارند، وارد شوید.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 py-6">{error}</div>
      ) : templates.length === 0 ? (
        <div className="text-center text-gray-600 py-6">قالبی یافت نشد.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div key={tpl.id} className="border rounded-lg p-4 flex flex-col justify-between shadow-sm bg-white">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-md bg-[#F3F6FF] flex items-center justify-center overflow-hidden">
                    {tpl.thumbnail ? (
                      <Image src={tpl.thumbnail} alt={tpl.title || "thumbnail"} width={56} height={56} className="object-cover" />
                    ) : (
                      <div className="text-sm text-[#240579] font-semibold">قالب</div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{tpl.title || tpl.name || "بدون عنوان"}</h3>
                    <div className="text-sm text-gray-500">{tpl.description || tpl.summary || ""}</div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mb-2">
                  <div>حجم فایل: {tpl.file?.size ? `${Math.round(tpl.file.size / 1024)} KB` : tpl.file_size || "-"}</div>
                  <div>آپلود شده در: {tpl.uploaded_at ? new Date(tpl.uploaded_at).toLocaleDateString("fa-IR") : "-"}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 gap-3">
                <button
                  onClick={() => handleDownload(tpl)}
                  disabled={downloadingId === tpl.id}
                  className="px-4 py-2 bg-main-1 text-white rounded-lg text-sm disabled:opacity-60"
                  type="button"
                >
                  {downloadingId === tpl.id ? "در حال دانلود..." : "دانلود"}
                </button>

                <a
                  href={tpl.preview_url || tpl.file?.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-main-1 underline"
                >
                  پیش‌نمایش
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewTemplateDownloadPage;
