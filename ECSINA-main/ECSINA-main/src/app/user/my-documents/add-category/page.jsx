"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import DocumentRow from "@/components/user/DocumentRow";
import Title from "@/components/user/Title";
import { cards as localCards } from "@/components/user/userDb";
import { Switch } from "@headlessui/react";

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
    lastVisited: it.last_visited || it.last_viewed || it.updated_at || null,
    status: it.status || it.status_display || "نامشخص",
    priority: it.priority || it.priority_level || "متوسط",
    ...it,
  };
}

function Page() {
  const [active, setActive] = useState(localCards[0]?.id ?? 2);
  const [categories, setCategories] = useState([]);
  const [docsByCategory, setDocsByCategory] = useState({});
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoadingCats(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/document-categories/`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.results || [];
      if (!items.length) {
        const fallback = localCards.map((c) => ({ id: c.id, name: c.title || c.name || `دسته ${c.id}` }));
        setCategories(fallback);
        setActive((prev) => prev ?? fallback[0]?.id ?? localCards[0]?.id);
      } else {
        setCategories(items.map((c) => ({ id: c.id, name: c.name || c.title || `دسته ${c.id}` })));
        setActive((prev) => prev ?? items[0]?.id);
      }
    } catch (e) {
      console.warn("fetchCategories failed, using local fallback", e);
      const fallback = localCards.map((c) => ({ id: c.id, name: c.title || c.name || `دسته ${c.id}` }));
      setCategories(fallback);
      setActive((prev) => prev ?? fallback[0]?.id ?? localCards[0]?.id);
      setError("خطا در بارگذاری دسته‌ها؛ نسخهٔ محلی نمایش داده می‌شود.");
    } finally {
      setLoadingCats(false);
    }
  }, []);

  const fetchDocsForCategory = useCallback(
    async (catId) => {
      if (!catId) return;
      setLoadingDocs(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/user-documents/?category=${encodeURIComponent(catId)}&ordering=-last_viewed&page_size=50`,
          {
            headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          }
        );
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.results || [];
        const mapped = items.map(mapDoc);
        setDocsByCategory((prev) => ({ ...prev, [catId]: mapped }));
      } catch (e) {
        console.warn("fetchDocsForCategory failed, using local fallback", e);
        const fallback = localCards.filter((c) => c.categoryId == catId || c.id === catId).map(mapDoc);
        setDocsByCategory((prev) => ({ ...prev, [catId]: fallback }));
        setError("خطا در بارگذاری اسناد؛ نسخهٔ محلی نمایش داده می‌شود.");
      } finally {
        setLoadingDocs(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (active) fetchDocsForCategory(active);
  }, [active, fetchDocsForCategory]);

  const currentDocs = useMemo(() => docsByCategory[active] || [], [docsByCategory, active]);

  return (
    <div className="font-iransans container mx-auto h-full pb-[40px] flex flex-col items-center">
      <Title title={"نام دسته بندی"} />

      <div className="flex flex-row gap-[15px] xl:gap-[30px] w-full">
        <div className="hidden md:flex flex-col mt-[50px] justify-around">
          {loadingCats ? (
            <div className="w-[40px] h-[40px] flex items-center justify-center">...</div>
          ) : (
            categories.map((c) => (
              <div
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`w-[40px] xl:w-[50px] h-[40px] xl:h-[50px] border rounded-full transition-colors duration-100 hover:bg-black cursor-pointer ${
                  active === c.id ? "bg-black" : "bg-transparent"
                }`}
                title={c.name}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setActive(c.id)}
              />
            ))
          )}
        </div>

        <div className="flex-1">
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
            {loadingDocs ? (
              <div className="py-8 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
              </div>
            ) : currentDocs.length === 0 ? (
              <div className="text-center text-gray-600 py-8">هیچ سندی در این دسته وجود ندارد.</div>
            ) : (
              currentDocs.map((item, index) => (
                <div key={item.id ?? index}>
                  <div className="md:hidden mb-2">
                    <Switch
                      checked={item.id === active}
                      onChange={() => setActive(item.id)}
                      className={`${active === item.id ? "bg-green-500" : "bg-gray-300"} relative inline-flex md:hidden h-[20px] w-[50px] items-center rounded-full transition-colors`}
                    >
                      <span className={`${active === item.id ? "-translate-x-[30px]" : "translate-x-0"} inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow transition`} />
                    </Switch>
                  </div>

                  <DocumentRow {...item} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-[13px] self-end md:self-center flex gap-3">
        <button
          type="button"
          className="shadow-[0px_2px_4px_0px_#1E132840] transition-colors duration-100 text-main-1 md:text-black hover:text-white hover:bg-main-1 md:hover:bg-black ml-[10px] md:ml-[20px] border border-main-1 md:border-black bg-white font-bold text-[13px] md:text-[18px] rounded-[5px] md:rounded-[30px] w-[60px] h-[30px] md:w-[170px] md:h-[50px]"
        >
          انصراف
        </button>

        <button
          type="button"
          className="shadow-[0px_2px_4px_0px_#1E132840] transition-colors duration-100 text-white md:text-black hover:text-white hover:bg-main-1 md:hover:text-white md:hover:bg-black border border-main-1 md:border-black bg-main-1 md:bg-white font-bold text-[13px] md:text-[18px] rounded-[5px] md:rounded-[30px] w-[60px] h-[30px] md:w-[170px] md:h-[50px]"
        >
          تمام
        </button>
      </div>

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
    </div>
  );
}

export default Page;
