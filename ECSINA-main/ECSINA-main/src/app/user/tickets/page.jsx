"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Title from "@/components/user/Title";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaSearch } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { shamsiDateShort } from "@/utils/shamsiDate";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

/* هدر احراز هویت (JWT از localStorage) */
function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* نگاشت پاسخ API به مدل مورد استفاده در UI */
function mapTicketItem(it) {
  return {
    id: it.id,
    numTicket: it.num_ticket || it.reference || `#${it.id}`,
    title: it.subject || it.title || "بدون عنوان",
    message: it.message || "",
    date: it.created_at || it.date || new Date().toISOString(),
    status: it.status || "open", // open | pending | closed
    statusDisplay:
      it.status === "pending" ? "در انتظار" : it.status === "closed" ? "بسته" : "باز",
    priority: it.priority || "none",
    raw: it,
  };
}

function Page() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/tickets/?ordering=-created_at&page_size=200`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `status ${res.status}`);
      }
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.results || [];
      setTickets(items.map(mapTicketItem));
    } catch (e) {
      console.error("fetchTickets error:", e);
      setError("خطا در بارگذاری تیکت‌ها. دوباره تلاش کنید.");
      setTickets([]); // خالی یا می‌توانی fallback محلی قرار دهی
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTickets();
    setRefreshing(false);
  };

  const filtered = useMemo(() => {
    if (!query.trim()) return tickets;
    const q = query.trim().toLowerCase();
    return tickets.filter(
      (t) =>
        `${t.numTicket} ${t.title} ${t.statusDisplay} ${t.message}`.toLowerCase().includes(q)
    );
  }, [tickets, query]);

  const summary = useMemo(() => {
    const s = { open: 0, pending: 0, closed: 0 };
    tickets.forEach((t) => {
      if (t.status === "pending") s.pending += 1;
      else if (t.status === "closed") s.closed += 1;
      else s.open += 1;
    });
    return s;
  }, [tickets]);

  return (
    <div className="container mx-auto h-full font-iransans pb-[40px]">
      <div className="hidden md:block">
        <Title title={"لیست تیکت‌ها"} />
      </div>

      {/* موبایل: جستجو و پروفایل */}
      <div className="md:hidden flex flex-col-reverse sm:flex-row gap-[8px] w-full items-center mb-[20px]">
        <div className="sm:basis-1/2 w-full">
          <div className="shadow-[0px_0px_3px_0px_#0029BC] rounded-[8px] flex items-center h-[40px] p-[6px]">
            <input
              type="text"
              placeholder="جست و جو تیکت..."
              className="basis-[90%] h-full outline-0 border-0 text-sm px-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="basis-[10%] flex items-center justify-center" onClick={() => {}}>
              <FaSearch color="#00000080" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-[12px]">
            <p className="font-semibold text-[12px]">
              <span>{tickets.length.toLocaleString("fa-IR")}</span> تیکت موجود
            </p>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-sm px-3 py-1 rounded-md border border-main-1 text-main-1 hover:bg-main-1/10 disabled:opacity-60"
              type="button"
            >
              {refreshing ? "در حال بروزرسانی..." : "بروزرسانی"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center sm:basis-1/2">
          <div className="w-[150px] aspect-square flex flex-col justify-center items-center shadow-[0px_0px_3px_0px_#0029BC] rounded-[8px] p-2">
            <Image src="/assets/images/User.png" alt="user" width={80} height={80} className="rounded-full" />
            <div className="text-[12px] font-semibold flex items-center gap-[3px] mt-[6px]">
              <span>حساب شما</span>
              <span>
                <TiArrowSortedDown />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* خلاصه وضعیت‌ها */}
      <div className="flex gap-3 items-center justify-center mb-6">
        <div className="px-4 py-2 rounded-lg bg-[#F7F9FF] text-sm">باز: <strong>{summary.open}</strong></div>
        <div className="px-4 py-2 rounded-lg bg-[#FFF7E6] text-sm">در انتظار: <strong>{summary.pending}</strong></div>
        <div className="px-4 py-2 rounded-lg bg-[#E8FFF0] text-sm">بسته: <strong>{summary.closed}</strong></div>
      </div>

      {/* جدول هدر */}
      <div className="grid grid-cols-12 border-b-2 border-b-secondary-17 md:border-b-0 text-[12px] md:text-[16px] md:bg-main-1 md:text-white py-[12px] px-[10px] md:rounded-[30px] font-semibold md:mb-[10px]">
        <p className="col-span-2">شماره تیکت</p>
        <p className="col-span-4">عنوان</p>
        <p className="col-span-3">تاریخ ارسال</p>
        <p className="col-span-3">وضعیت</p>
      </div>

      {/* لیست تیکت‌ها */}
      <div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-600 py-12">تیکتی یافت نشد.</div>
        ) : (
          filtered.map((t) => (
            <Link
              key={t.id}
              href={`/user/tickets/${t.id}`}
              className="grid grid-cols-12 py-[15px] px-[10px] font-semibold border-b-2 border-b-secondary-17 md:last:border-b-0 pb-[20px] text-[12px] md:text-[16px] hover:bg-[#F7F9FF] transition-colors"
            >
              <p className="col-span-2">{t.numTicket}</p>
              <p className="col-span-4 line-clamp-1">{t.title}</p>
              <p className="col-span-3">{shamsiDateShort(t.date)}</p>
              <p
                className={`col-span-3 ${
                  t.status === "pending" ? "text-[#FFC300]" : t.status === "closed" ? "text-[#BA0000]" : "text-[#22BA00]"
                }`}
              >
                {t.statusDisplay}
              </p>
            </Link>
          ))
        )}
      </div>

      {/* دکمهٔ ایجاد تیکت جدید */}
      <div className="flex justify-center mt-[30px]">
        <Link
          href={"/user/tickets/add-ticket"}
          className="overflow-hidden shadow-[0px_0px_3px_0px_#0029BC] md:shadow-none bg-white md:bg-main-0 rounded-[8px] md:rounded-[30px] flex justify-center items-center gap-[8px] w-[170px] h-[50px] text-[#00000080] md:text-white"
        >
          <span className="basis-[30%] bg-main-1 h-full md:basis-auto flex justify-center items-center">
            <FaPlus className="text-[15px]" />
          </span>
          <span className="font-semibold basis-[70%] md:basis-auto">تیکت جدید</span>
        </Link>
      </div>

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
    </div>
  );
}

export default Page;
