"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Title from "@/components/user/Title";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

/* helper برای هدر احراز هویت (JWT در localStorage) */
function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* فرمت تاریخ کوتاه */
function formatDateShort(dateStr) {
  if (!dateStr) return "-";
  try {
    return new Date(dateStr).toLocaleDateString("fa-IR");
  } catch {
    return dateStr;
  }
}

/* نگاشت آیتم API به مدل نمایش */
function mapTemplateItem(it, base = "") {
  return {
    id: it.id,
    title: it.title || it.name || "بدون عنوان",
    description: it.description || it.summary || "",
    thumbnail: it.thumbnail || it.image || null,
    fileUrl: it.file?.url || it.download_url || (it.file_url ? (it.file_url.startsWith("http") ? it.file_url : `${base}${it.file_url}`) : null),
    fileSize: it.file?.size || it.file_size || null,
    uploadedAt: it.uploaded_at || it.created_at || null,
    previewUrl: it.preview_url || it.file?.url || null,
    raw: it,
  };
}

function Page() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const perPage = 9;

  const fetchTemplates = useCallback(
    async (p = 1) => {
      setLoading(true);
      setError(null);
      try {
        const url = `${API_BASE}/api/templates/?ordering=-created_at&page=${p}&page_size=${perPage}`;
        const res = await fetch(url, {
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `خطا در دریافت قالب‌ها (${res.status})`);
        }
        const data = await res.json();
        // سازگاری با ساختارهای مختلف: results یا آرایه مستقیم
        const items = Array.isArray(data) ? data : data.results || [];
        const mapped = items.map((it) => mapTemplateItem(it, API_BASE));
        if (p === 1) setTemplates(mapped);
        else setTemplates((prev) => [...prev, ...mapped]);

        // تشخیص وجود صفحهٔ بعدی (اگر API فیلد next دارد)
        const nextExists = !!(data.next || (Array.isArray(data) ? mapped.length === perPage : data.count && p * perPage < data.count));
        setHasMore(nextExists);
      } catch (e) {
        console.error("fetchTemplates error:", e);
        setError("خطا در بارگذاری قالب‌ها. دوباره تلاش کنید.");
      } finally {
        setLoading(false);
      }
    },
    [perPage]
  );

  useEffect(() => {
    fetchTemplates(1);
  }, [fetchTemplates]);

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchTemplates(next);
  };

  const handleDownload = async (tpl) => {
    const fileUrl = tpl.fileUrl;
    if (!fileUrl) {
      alert("آدرس دانلود موجود نیست.");
      return;
    }
    try {
      setDownloadingId(tpl.id);
      const headers = getAuthHeaders();
      // اگر نیاز به هدر auth نیست، لینک را مستقیم باز کن
      if (!headers.Authorization) {
        window.open(fileUrl, "_blank");
      } else {
        // دانلود با fetch و blob برای ارسال هدر
        const res = await fetch(fileUrl, { headers });
        if (!res.ok) throw new Error("خطا در دانلود فایل");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const filename = tpl.raw?.filename || tpl.raw?.name || `template-${tpl.id}`;
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

  const templatesGrid = useMemo(() => {
    return templates.map((tpl) => (
      <div key={tpl.id} className="border rounded-lg p-4 flex flex-col justify-between bg-white shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-16 h-16 rounded-md bg-[#F3F6FF] flex items-center justify-center overflow-hidden">
              {tpl.thumbnail ? (
                <Image src={tpl.thumbnail} alt={tpl.title} width={64} height={64} className="object-cover" />
              ) : (
                <div className="text-sm text-[#240579] font-semibold">قالب</div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{tpl.title}</h3>
              <div className="text-sm text-gray-500 mt-1 line-clamp-2">{tpl.description}</div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <div>حجم فایل: {tpl.fileSize ? `${Math.round(tpl.fileSize / 1024)} KB` : "-"}</div>
            <div>آپلود: {formatDateShort(tpl.uploadedAt)}</div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-4">
          <button
            onClick={() => handleDownload(tpl)}
            disabled={downloadingId === tpl.id}
            className="px-3 py-2 bg-main-1 text-white rounded-md text-sm disabled:opacity-60"
            type="button"
          >
            {downloadingId === tpl.id ? "در حال دانلود..." : "دانلود"}
          </button>

          <a
            href={tpl.previewUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-main-1 underline"
          >
            پیش‌نمایش
          </a>
        </div>
      </div>
    ));
  }, [templates, downloadingId]);

  return (
    <div className="container mx-auto py-8 font-iransans">
      <Title title={"آخرین قالب‌ها"} />

      <div className="mt-6 text-gray-600">
        <p>در این بخش جدیدترین قالب‌های آماده را می‌توانید مشاهده و دانلود کنید. برای قالب‌های دارای دسترسی محدود، وارد شوید.</p>
      </div>

      <div className="mt-6">
        {loading && templates.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-6">{error}</div>
        ) : templates.length === 0 ? (
          <div className="text-center text-gray-600 py-8">قالبی یافت نشد.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templatesGrid}
            </div>

            <div className="mt-6 flex justify-center">
              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-4 py-2 rounded-md border border-main-1 text-main-1 hover:bg-main-1/10 disabled:opacity-60"
                  type="button"
                >
                  {loading ? "در حال بارگذاری..." : "بارگذاری بیشتر"}
                </button>
              ) : (
                <div className="text-sm text-gray-500">قالب‌های بیشتری موجود نیست.</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
