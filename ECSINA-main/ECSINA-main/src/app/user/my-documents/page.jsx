"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ButtonUser from "@/components/user/ButtonUser";
import DocumentRow from "@/components/user/DocumentRow";
import Title from "@/components/user/Title";
import { cards as localCards } from "@/components/user/userDb";
import Image from "next/image";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function mapApiDoc(it) {
  return {
    id: it.id,
    title: it.title || it.name || it.file?.title || "بدون عنوان",
    description: it.summary || it.description || "",
    lastVisited: it.last_viewed || it.last_visited || it.updated_at || it.modified_at || null,
    status: it.status || it.status_display || "نامشخص",
    priority: it.priority || it.priority_level || "متوسط",
    downloadUrl: it.file?.url || it.download_url || it.file_url || null,
    fileSize: it.file?.size || it.file_size || null,
    thumbnail: it.thumbnail || it.icon || null,
    raw: it,
  };
}

function Page() {
  const router = useRouter();

  const [docs, setDocs] = useState(() => localCards);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/user-documents/?ordering=-last_viewed&page_size=50`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.results || [];
      const mapped = items.map(mapApiDoc);
      if (mapped.length) setDocs(mapped);
      else setDocs(localCards);
    } catch (e) {
      console.warn("fetchDocs failed, using local fallback", e);
      setError("خطا در بارگذاری اسناد؛ نسخهٔ محلی نمایش داده می‌شود.");
      setDocs(localCards);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const handleDownload = useCallback(
    async (doc) => {
      const url = doc.downloadUrl;
      if (!url) {
        alert("آدرس دانلود موجود نیست.");
        return;
      }
      try {
        setDownloadingId(doc.id);
        const headers = getAuthHeaders();
        if (!headers.Authorization) {
          window.open(url, "_blank");
        } else {
          const res = await fetch(url, { headers });
          if (!res.ok) throw new Error("download failed");
          const blob = await res.blob();
          const a = document.createElement("a");
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          const filename = doc.raw?.filename || doc.title || `document-${doc.id}`;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(objectUrl);
        }
      } catch (e) {
        console.error("download error", e);
        alert("خطا در دانلود. دوباره تلاش کنید.");
      } finally {
        setDownloadingId(null);
      }
    },
    []
  );

  const handleEdit = useCallback(
    (doc) => {
      // اگر صفحهٔ ویرایش وجود دارد، به آن هدایت کن؛ در غیر این صورت می‌توان modal یا route دیگری باز کرد
      if (!doc || !doc.id) return;
      router.push(`/user/my-documents/${doc.id}/edit`);
    },
    [router]
  );

  const docsList = useMemo(() => docs, [docs]);

  return (
    <div className="font-iransans container mx-auto h-full pb-[40px]">
      <Title title={"اسناد من"} />

      <div>
        <div className="text-[12px] md:text-nowrap border-b-2 pb-[12px] mb-[12px] border-b-[#4A4D3880] font-semibold text-center grid grid-cols-12 gap-4 px-4 py-2 justify-center">
          <div className="col-span-3">نام سند</div>
          <div className="col-span-3 md:col-span-1 flex flex-row-reverse items-center gap-[1px] text-center justify-center">
            <span>آخرین بازدید</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.00877 20.5011L3.98967 15.4902" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.01506 3.50195L9.012 20.502" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.9916 3.50391L20.0107 8.51481" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.9886 20.5039L14.9916 3.50391" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="col-span-4">وضعیت</div>
          <div className="col-span-3 md:col-span-1 flex flex-row-reverse items-center gap-[1px] text-center justify-center">
            <span>اولویت</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.00877 20.5011L3.98967 15.4902" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.01506 3.50195L9.012 20.502" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.9916 3.50391L20.0107 8.51481" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.9886 20.5039L14.9916 3.50391" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="hidden md:block md:col-span-3">ویرایش و دانلود</div>
        </div>

        <div className="flex flex-col gap-[20px]">
          {loading ? (
            <div className="py-8 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
            </div>
          ) : docsList.length === 0 ? (
            <div className="text-center text-gray-600 py-8">هیچ سندی یافت نشد.</div>
          ) : (
            docsList.map((item, index) => (
              <div key={item.id ?? index} className="relative">
                <DocumentRow
                  {...item}
                  onDownload={() => handleDownload(item)}
                  onEdit={() => handleEdit(item)}
                  downloading={downloadingId === item.id}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
