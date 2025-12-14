"use client";

import React, { useCallback, useEffect, useState } from "react";
import Document from "@/components/user/Document";
import DocumentSlider from "@/components/user/DocumentSlider";
import Title from "@/components/user/Title";
import { cards as localCards } from "@/components/user/userDb";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function mapDoc(it) {
  return {
    id: it.id,
    title: it.title || it.name || it.file?.title || "بدون عنوان",
    fileSize: it.file?.size || it.size || it.file_size || "-",
    icon: it.icon || it.thumbnail || "/assets/icons/folder-2.svg",
    status: it.status || "unknown",
    raw: it,
  };
}

function Page() {
  const router = useRouter();
  const [docs, setDocs] = useState(() => localCards.map(mapDoc));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/user-documents/?ordering=-created_at&page_size=50`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      if (!res.ok) {
        throw new Error(`status ${res.status}`);
      }
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.results || [];
      if (items.length) {
        setDocs(items.map(mapDoc));
      } else {
        setDocs(localCards.map(mapDoc));
      }
    } catch (e) {
      console.warn("fetchDocs failed, using local fallback", e);
      setError("خطا در بارگذاری اسناد؛ نسخهٔ محلی نمایش داده می‌شود.");
      setDocs(localCards.map(mapDoc));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  return (
    <>
      <div className="mt-[40px]">
        <Title title={"اسناد"} />

        <div className="px-[20px] py-[30px] md:p-0 bg-[#6B9DFF33] md:bg-transparent h-fit">
          {/* موبایل: کارت‌ها */}
          <div className="md:hidden grid grid-cols-12 w-full gap-[10px]">
            {loading ? (
              <div className="col-span-12 flex justify-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
              </div>
            ) : (
              docs.slice(0, 5).map((c) => (
                <div key={c.id} className="col-span-12 sm:col-span-6">
                  <Document {...c} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* دسکتاپ: اسلایدر */}
        <div className="hidden md:flex container mx-auto h-full">
          {loading ? (
            <div className="w-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
            </div>
          ) : (
            <DocumentSlider documents={docs} />
          )}
        </div>

        {error && <div className="mt-4 text-sm text-red-600 text-center">{error}</div>}
      </div>
    </>
  );
}

export default Page;
