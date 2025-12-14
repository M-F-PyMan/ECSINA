"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Title from "@/components/user/Title";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

/* helper برای هدر احراز هویت (در صورت استفاده از JWT) */
function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* فرمت تاریخ شمسی/فارسی به صورت روز-ماه-سال برای گروه‌بندی */
function formatDateGroup(dateStr) {
  if (!dateStr) return "بدون تاریخ";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return dateStr;
  }
}

/* فرمت زمان کوتاه برای نمایش کنار هر سوال/پاسخ */
function formatTimeShort(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return dateStr;
  }
}

/* نگاشت پاسخ API به مدل ساده‌شده صفحه */
function mapQuestionItem(it) {
  return {
    id: it.id,
    title: it.title || it.subject || "بدون عنوان",
    body: it.body || it.question || "",
    createdAt: it.created_at || it.timestamp || it.date || null,
    status: it.status || it.status_display || "unknown",
    replies:
      Array.isArray(it.replies) && it.replies.length
        ? it.replies.map((r) => ({
            id: r.id,
            body: r.body || r.message || "",
            author: r.author_name || r.author || r.from || "ادمین",
            createdAt: r.created_at || r.timestamp || null,
          }))
        : [],
    attachments: it.attachments || it.files || it.files_list || [],
    raw: it,
  };
}

function Page() {
  const [questions, setQuestions] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/user-questions/?ordering=-created_at&limit=100`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `خطا در دریافت سوالات (${res.status})`);
      }
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.results || [];
      const mapped = items.map(mapQuestionItem);
      setQuestions(mapped);
    } catch (e) {
      console.error("fetchQuestions error:", e);
      setError("خطا در بارگذاری سوالات. دوباره تلاش کنید.");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  /* گروه‌بندی بر اساس تاریخ (روز) */
  useEffect(() => {
    const groups = {};
    questions.forEach((q) => {
      const key = formatDateGroup(q.createdAt);
      if (!groups[key]) groups[key] = [];
      groups[key].push(q);
    });
    setGrouped(groups);
  }, [questions]);

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchQuestions();
    setRefreshing(false);
  };

  return (
    <div className="container mx-auto font-iransans py-8">
      <Title title={"سوالات شما"} />

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-gray-600">در این بخش سوالات شما به تفکیک تاریخ نمایش داده می‌شوند و پاسخ‌های ادمین قابل مشاهده است.</p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-3 py-2 rounded-lg border border-main-1 text-main-1 text-sm hover:bg-main-1/10 disabled:opacity-60"
            type="button"
          >
            {refreshing ? "در حال بروزرسانی..." : "بروزرسانی"}
          </button>
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-6">{error}</div>
        ) : questions.length === 0 ? (
          <div className="text-center text-gray-600 py-8">شما هنوز سوالی ثبت نکرده‌اید.</div>
        ) : (
          <div className="space-y-6">
            {Object.keys(grouped).map((dateKey) => (
              <section key={dateKey} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-[#F7F9FF] border-b">
                  <h4 className="text-sm font-semibold text-[#240579]">{dateKey}</h4>
                </div>

                <div className="p-4 space-y-4">
                  {grouped[dateKey].map((q) => (
                    <article key={q.id} className="border rounded-lg p-4 bg-[#FFFFFF]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#F3F6FF] flex items-center justify-center text-[#240579] font-semibold">
                            س
                          </div>
                          <div>
                            <h5 className="font-semibold text-[15px] text-[#111]">{q.title}</h5>
                            <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{q.body}</p>
                            <div className="mt-2 text-xs text-gray-400 flex items-center gap-3">
                              <span>{formatTimeShort(q.createdAt)}</span>
                              <span className="px-2 py-0.5 rounded bg-[#F0F4FF] text-[#083CF4]">{q.status}</span>
                              {q.attachments && q.attachments.length > 0 && (
                                <span className="text-[#666]">ضمیمه: {q.attachments.length}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleExpand(q.id)}
                            className="px-3 py-1 rounded-md border border-main-1 text-main-1 text-sm hover:bg-main-1/10"
                            type="button"
                            aria-expanded={expanded === q.id}
                            aria-controls={`q-${q.id}-panel`}
                          >
                            {expanded === q.id ? "بستن" : "مشاهده پاسخ‌ها"}
                          </button>
                        </div>
                      </div>

                      {/* panel replies */}
                      <div
                        id={`q-${q.id}-panel`}
                        className={`mt-4 transition-all ${expanded === q.id ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                        aria-hidden={expanded !== q.id}
                      >
                        <div className="border-t pt-4 space-y-4">
                          {q.replies.length === 0 ? (
                            <div className="text-sm text-gray-500">هنوز پاسخی از طرف ادمین دریافت نشده است.</div>
                          ) : (
                            q.replies.map((r) => (
                              <div key={r.id} className="flex gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#F3F6FF] flex items-center justify-center">
                                  <Image src={"/assets/icons/admin-avatar.svg"} alt="admin" width={28} height={28} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="text-sm font-semibold text-[#111]">{r.author}</div>
                                    <div className="text-xs text-gray-400">{formatTimeShort(r.createdAt)}</div>
                                  </div>
                                  <div className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{r.body}</div>
                                </div>
                              </div>
                            ))
                          )}

                          {/* attachments list if any */}
                          {q.attachments && q.attachments.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs text-gray-500 mb-2">فایل‌های پیوست:</div>
                              <ul className="flex flex-col gap-2">
                                {q.attachments.map((a, idx) => {
                                  const url = a.url || a.file?.url || a.download_url || "#";
                                  const name = a.name || a.filename || `file-${idx + 1}`;
                                  return (
                                    <li key={idx} className="text-sm">
                                      <a
                                        href={url.startsWith("http") ? url : `${API_BASE}${url}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-main-1 underline"
                                      >
                                        {name}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
