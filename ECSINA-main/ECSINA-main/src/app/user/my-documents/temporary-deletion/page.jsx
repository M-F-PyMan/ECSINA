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

function mapTrashItem(it) {
  return {
    id: it.id,
    title: it.title || it.name || it.file?.title || "بدون عنوان",
    size: it.file?.size || it.size || null,
    deletedAt: it.deleted_at || it.removed_at || it.trash_date || null,
    thumbnail: it.thumbnail || it.icon || "/assets/icons/brain.svg",
    raw: it,
  };
}

function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [confirmType, setConfirmType] = useState(null); // "restore" | "delete"

  const fetchTrashed = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/user-documents/trash/?ordering=-deleted_at&page_size=50`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.results || [];
      setItems(list.map(mapTrashItem));
    } catch (e) {
      console.warn("fetchTrashed error:", e);
      // graceful fallback: empty list
      setItems([]);
      setError("خطا در بارگذاری موارد حذف‌شده. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrashed();
  }, [fetchTrashed]);

  const handleRestore = async (id) => {
    setActionLoading(id);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/user-documents/${id}/restore/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `status ${res.status}`);
      }
      // remove from list
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      console.error("restore error:", e);
      setError("خطا در بازیابی سند. دوباره تلاش کنید.");
    } finally {
      setActionLoading(null);
      setConfirmId(null);
      setConfirmType(null);
    }
  };

  const handlePermanentDelete = async (id) => {
    setActionLoading(id);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/user-documents/${id}/`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `status ${res.status}`);
      }
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      console.error("delete error:", e);
      setError("خطا در حذف دائمی. دوباره تلاش کنید.");
    } finally {
      setActionLoading(null);
      setConfirmId(null);
      setConfirmType(null);
    }
  };

  const openConfirm = (id, type) => {
    setConfirmId(id);
    setConfirmType(type);
  };

  const cancelConfirm = () => {
    setConfirmId(null);
    setConfirmType(null);
  };

  return (
    <div className="font-iransans container mx-auto h-full pb-[40px]">
      <Title title={"حذف موقت"} />

      <div className="flex flex-col gap-[20px] mt-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-600 py-12">هیچ مورد حذف‌شده‌ای وجود ندارد.</div>
        ) : (
          items.map((it) => (
            <div
              key={it.id}
              style={{ background: "linear-gradient(139.79deg, #F2F5FB 0.21%, #F7F9EE 106.61%)" }}
              className="grid grid-cols-12 items-center gap-4 p-4 rounded-[20px] shadow-[0px_0px_3px_3px_#00000010] px-[13px]"
            >
              <div className="flex flex-col lg:flex-row items-center gap-3 col-span-4">
                <button className="border border-main-1 rounded-[30px] p-[8px] bg-white">
                  <Image src={it.thumbnail} width={36} height={36} alt="icon" className="w-[25px] h-[25px] lg:w-[40px] lg:h-[40px]" />
                </button>

                <div className="flex flex-col lg:text-center text-right lg:items-start items-center gap-[8px]">
                  <div className="font-semibold text-[14px] md:text-[16px] lg:text-[18px] text-nowrap">{it.title}</div>
                  <div className="font-normal text-[10px] md:text-[13px] lg:text-[14px] text-secondary-15 text-nowrap">
                    حجم فایل: {it.size ? `${Math.round(it.size / 1024)} KB` : "-"}
                  </div>
                </div>
              </div>

              <div className="col-span-4 flex justify-center font-normal text-[14px] text-secondary-15 lg:text-nowrap">
                {shamsiDateLong(new Date(it.deletedAt || Date.now()))}
              </div>

              <div className="flex justify-center flex-col lg:flex-row items-center gap-[7px] lg:gap-[15px] col-span-4">
                <button
                  onClick={() => openConfirm(it.id, "restore")}
                  disabled={actionLoading === it.id}
                  className="w-[100px] h-[50px] rounded-lg flex justify-center items-center border-2 border-[#0029BC] text-[#0029BC] hover:bg-[#0029BC] hover:text-white transition-all duration-150"
                  type="button"
                >
                  {actionLoading === it.id && confirmType === "restore" ? "در حال بازیابی..." : "بازیابی"}
                </button>

                <button
                  onClick={() => openConfirm(it.id, "delete")}
                  disabled={actionLoading === it.id}
                  className="w-[100px] h-[50px] rounded-lg flex justify-center items-center border-2 border-[#D32F2F] text-white bg-[#D32F2F] hover:opacity-90 transition-all duration-150"
                  type="button"
                >
                  {actionLoading === it.id && confirmType === "delete" ? "در حال حذف..." : "حذف دائمی"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* confirmation modal (simple inline) */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-3">
              {confirmType === "restore" ? "آیا از بازیابی این سند مطمئن هستید؟" : "آیا می‌خواهید این سند را به‌صورت دائمی حذف کنید؟"}
            </h3>
            <p className="text-sm text-gray-600 mb-6">این عملیات قابل بازگشت نیست. لطفاً تصمیم خود را تأیید کنید.</p>

            <div className="flex items-center justify-end gap-3">
              <button onClick={cancelConfirm} className="px-4 py-2 rounded-md border border-gray-300 text-sm">
                انصراف
              </button>

              {confirmType === "restore" ? (
                <button
                  onClick={() => handleRestore(confirmId)}
                  className="px-4 py-2 rounded-md bg-main-1 text-white text-sm"
                  type="button"
                >
                  {actionLoading === confirmId ? "در حال بازیابی..." : "بازیابی"}
                </button>
              ) : (
                <button
                  onClick={() => handlePermanentDelete(confirmId)}
                  className="px-4 py-2 rounded-md bg-red-600 text-white text-sm"
                  type="button"
                >
                  {actionLoading === confirmId ? "در حال حذف..." : "حذف دائمی"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
    </div>
  );
}

export default Page;
