"use client";

import React, { useCallback, useEffect, useState } from "react";
import Title from "@/components/user/Title";
import { shamsiDateLong } from "@/utils/shamsiDate";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function mapCategoryItem(it) {
  return {
    id: it.id,
    name: it.name || it.title || `دسته ${it.id}`,
    createdAt: it.created_at || it.created || it.timestamp || null,
    count: it.documents_count ?? it.count ?? it.items_count ?? 0,
    thumbnail: it.thumbnail || it.icon || null,
    raw: it,
  };
}

function Page() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/document-categories/?ordering=-created_at&page_size=50`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      if (!res.ok) {
        // fallback to empty array and show message
        throw new Error(`status ${res.status}`);
      }
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.results || [];
      const mapped = items.map(mapCategoryItem);
      setCategories(mapped);
    } catch (e) {
      console.warn("fetchCategories error:", e);
      // graceful fallback: show a few placeholder categories
      const fallback = [1, 2, 3, 4, 5, 6].map((i) => ({
        id: `fallback-${i}`,
        name: `دسته نمونه ${i}`,
        createdAt: new Date().toISOString(),
        count: 3,
        thumbnail: "/assets/icons/folder-2.svg",
      }));
      setCategories(fallback);
      setError("خطا در بارگذاری دسته‌ها. نسخهٔ نمونه نمایش داده می‌شود.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="font-iransans pb-[40px]">
      <Title title={"دسته بندی ها"} />

      <div className="px-[20px] py-[30px] md:p-0 bg-[#6B9DFF33] md:bg-transparent h-fit">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
          </div>
        ) : (
          <div className="md:hidden grid grid-cols-12 gap-[10px]">
            {categories.map((c) => (
              <div
                key={c.id}
                className="bg-white transition-colors duration-100 hover:border-[0.5px] flex flex-col gap-[8px] col-span-12 sm:col-span-6 md:col-span-4 w-full h-[200px] p-[24px] shadow-[0px_0px_4px_2px_#00000010] rounded-[20px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#F3F6FF] flex items-center justify-center overflow-hidden">
                    {c.thumbnail ? (
                      // next/image requires absolute or configured domains; keep as img fallback if needed
                      <Image src={c.thumbnail} alt={c.name} width={32} height={32} className="object-cover" />
                    ) : (
                      <Image src={"/assets/icons/folder-2.svg"} alt="folder" width={24} height={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[15px]">{c.name}</p>
                    <p className="flex gap-[5px] text-secondary-15 text-[12px] mt-1">
                      <span>ایجاد شده در {shamsiDateLong(new Date(c.createdAt || Date.now()))}</span>
                      <span>- {Number(c.count).toLocaleString("fa-IR")} سند</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex container mx-auto w-full h-full mt-6">
        <div className="w-full grid grid-cols-12 gap-[16px]">
          {loading ? (
            <div className="col-span-12 flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
            </div>
          ) : (
            categories.map((c) => (
              <div
                key={c.id}
                className="bg-white transition-colors duration-100 hover:border-[0.5px] flex flex-col gap-[8px] col-span-6 md:col-span-4 w-full h-[200px] p-[30px] shadow-[0px_0px_6px_2px_#00000008] rounded-[20px]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-[#F3F6FF] flex items-center justify-center overflow-hidden">
                    {c.thumbnail ? (
                      <Image src={c.thumbnail} alt={c.name} width={36} height={36} className="object-cover" />
                    ) : (
                      <Image src={"/assets/icons/folder-2.svg"} alt="folder" width={28} height={28} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[20px]">{c.name}</p>
                    <p className="flex gap-[8px] text-secondary-15 text-[13px] mt-2">
                      <span>ایجاد شده در {shamsiDateLong(new Date(c.createdAt || Date.now()))}</span>
                      <span>- {Number(c.count).toLocaleString("fa-IR")} سند</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {error && (
        <div className="container mx-auto mt-4">
          <div className="text-sm text-red-600">{error}</div>
        </div>
      )}
    </div>
  );
}

export default Page;
