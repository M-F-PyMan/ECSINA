"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Title from "@/components/user/Title";
import Document from "@/components/user/Document";
import DocumentSlider from "@/components/user/DocumentSlider";
import { cards as localCards } from "@/components/user/userDb";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

/* helper برای هدر احراز هویت (در صورت استفاده از JWT) */
function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* نگاشت آیتم‌های API به مدل مورد انتظار Document */
function mapDocToCard(it) {
  return {
    id: it.id,
    title: it.title || it.name || it.file?.title || "بدون عنوان",
    description: it.summary || it.description || it.file?.description || "",
    icon: it.icon || it.thumbnail || it.file?.thumbnail || "/assets/icons/doc-placeholder.svg",
    fileUrl: it.file?.url || it.download_url || null,
    fileSize: it.file?.size || it.file_size || null,
    uploadedAt: it.uploaded_at || it.created_at || null,
    raw: it,
  };
}

function Page() {
  const [cards, setCards] = useState(() => localCards.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLatestDocs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_BASE}/api/user-documents/?ordering=-uploaded_at&page_size=5`;
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      if (!res.ok) {
        // اگر API پاسخ نداد، از local fallback استفاده می‌کنیم
        throw new Error(`status ${res.status}`);
      }
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.results || [];
      const mapped = items.map(mapDocToCard);
      if (mapped.length) setCards(mapped);
      else setCards(localCards.slice(0, 5));
    } catch (e) {
      console.warn("fetchLatestDocs failed, using local cards", e);
      setError("خطا در بارگذاری اسناد؛ نسخهٔ محلی نمایش داده می‌شود.");
      setCards(localCards.slice(0, 5));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // تلاش برای گرفتن اسناد از بک‌اند؛ اگر بک‌اند در دسترس نباشد، کارت‌های محلی نمایش داده می‌شوند
    fetchLatestDocs();
  }, [fetchLatestDocs]);

  const sliderVisible = useMemo(() => {
    // اگر تعداد کارت‌ها بیشتر از 5 باشد یا در حالت دسکتاپ همیشه اسلایدر را نشان بده
    return cards && cards.length > 0;
  }, [cards]);

  return (
    <>
      <div className="mt-[40px]">
        <Title title={"اسناد"} />

        <div className="px-[20px] py-[30px] md:p-0 bg-[#6B9DFF33] md:bg-transparent h-fit">
          <div className="md:hidden grid grid-cols-12 w-full gap-[10px]">
            {loading ? (
              <div className="col-span-12 flex justify-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
              </div>
            ) : (
              cards.slice(0, 5).map((c) => (
                <div key={c.id} className="col-span-12 sm:col-span-6">
                  <Document {...c} />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="hidden md:flex container mx-auto h-full">
          {sliderVisible ? (
            <DocumentSlider items={cards} />
          ) : (
            <div className="w-full flex items-center justify-center py-12">
              <div className="text-center text-gray-600">
                <Image src="/assets/icons/empty-docs.svg" alt="no-docs" width={120} height={120} />
                <div className="mt-4">هیچ سندی برای نمایش وجود ندارد.</div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="container mx-auto mt-4">
            <div className="text-sm text-red-600">{error}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default Page;
