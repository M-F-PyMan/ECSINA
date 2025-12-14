"use client";

import React, { useCallback, useEffect, useState } from "react";
import Title from "@/components/user/Title";
import Image from "next/image";
import { FaImage } from "react-icons/fa6";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function mapTrainingItem(it) {
  return {
    id: it.id,
    title: it.title || it.name || "بدون عنوان",
    duration: it.duration || it.length || it.time || null,
    size: it.size || it.file_size || null,
    videoUrl: it.video_url || it.video?.url || null,
    samples: it.samples || it.files || it.resources || [],
    roadmapUrl: it.roadmap_url || it.map_url || null,
    guideUrl: it.guide_url || it.manual_url || null,
    thumbnail: it.thumbnail || it.image || null,
    raw: it,
  };
}

function formatSize(size) {
  if (!size) return "-";
  if (typeof size === "string") return size;
  const kb = Math.round(size / 1024);
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const fetchTrainings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/trainings/?ordering=-created_at&page_size=20`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      if (!res.ok) {
        throw new Error(`status ${res.status}`);
      }
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.results || [];
      setItems(list.map(mapTrainingItem));
    } catch (e) {
      console.warn("fetchTrainings error:", e);
      // graceful fallback: two sample items
      setItems([
        {
          id: "fallback-1",
          title: "بیزنس مدل تجاری",
          duration: "12:34",
          size: "9 MB",
          videoUrl: null,
          samples: [{ name: "نمونه 1", url: "/assets/sample.pdf" }],
          roadmapUrl: "/assets/routing.pdf",
          guideUrl: "/assets/book.pdf",
          thumbnail: "/assets/icons/video-thumb.svg",
          raw: {},
        },
        {
          id: "fallback-2",
          title: "تحلیل بازار",
          duration: "08:20",
          size: "7 MB",
          videoUrl: null,
          samples: [],
          roadmapUrl: null,
          guideUrl: null,
          thumbnail: "/assets/icons/video-thumb.svg",
          raw: {},
        },
      ]);
      setError("خطا در بارگذاری آموزش‌ها؛ نسخهٔ نمونه نمایش داده می‌شود.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  const handleDownload = async (url, id, filename = "file") => {
    if (!url) {
      alert("آدرس دانلود موجود نیست.");
      return;
    }
    try {
      setDownloadingId(id);
      const headers = getAuthHeaders();
      if (!headers.Authorization) {
        window.open(url, "_blank");
      } else {
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error("download failed");
        const blob = await res.blob();
        const link = document.createElement("a");
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(objectUrl);
      }
    } catch (e) {
      console.error("download error", e);
      alert("خطا در دانلود. دوباره تلاش کنید.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="font-iransans container mx-auto h-full pb-[40px]">
      <Title title={"آموزش های مرتبط"} />

      <div className="text-[12px] text-nowrap border-b-2 pb-[12px] mb-[12px] border-b-[#4A4D3880] font-semibold text-center grid grid-cols-12 gap-4 px-4 py-2 justify-center">
        <div className="col-span-3">ویدیوی آموزشی</div>
        <div className="col-span-3">فایل های نمونه</div>
        <div className="col-span-3">نقشه راه</div>
        <div className="col-span-3">کتابچه راهنما</div>
      </div>

      <div className="mt-4 flex flex-col gap-[18px]">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
          </div>
        ) : (
          items.map((it) => (
            <div
              key={it.id}
              style={{ background: "linear-gradient(139.79deg, #F2F5FB 0.21%, #F7F9EE 106.61%)" }}
              className="grid grid-cols-12 items-center gap-4 p-4 rounded-[20px] shadow-[0px_0px_3px_3px_#00000010] px-[13px]"
            >
              <div className="flex flex-col lg:flex-row items-center gap-3 col-span-3">
                <div className="shadow-[0px_2px_4px_0px_#1E132840] w-[60px] h-[60px] rounded-full border border-main-1 flex justify-center items-center">
                  <div className="border border-main-1 w-[40px] h-[40px] flex justify-center items-center rounded-full overflow-hidden">
                    {it.thumbnail ? (
                      <Image src={it.thumbnail} alt={it.title} width={40} height={40} />
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" stroke="#0029BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 3h8v4H8z" fill="#0029BC" stroke="#0029BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="flex flex-col lg:text-center text-right lg:items-start items-center gap-[8px]">
                  <div className="font-semibold text-[14px] md:text-[16px] lg:text-[18px] text-nowrap">{it.title}</div>
                  <div className="font-normal text-[10px] md:text-[13px] lg:text-[14px] text-secondary-15 text-nowrap">
                    حجم فایل: {it.size ? formatSize(it.size) : "-"} {it.duration ? `• زمان: ${it.duration}` : ""}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 items-center justify-center gap-[6px] col-span-3">
                {it.samples && it.samples.length > 0 ? (
                  it.samples.slice(0, 4).map((s, idx) => (
                    <div
                      key={idx}
                      className="w-[33px] sm:w-[40px] col-span-6 md:col-span-3 border border-main-1 shadow-[0px_1px_0px_1px_#00000010] aspect-square rounded-[6px] flex justify-center items-center"
                    >
                      <button
                        onClick={() => handleDownload(s.url || s.file?.url || s.download_url, `${it.id}-sample-${idx}`, s.name || `sample-${idx}`)}
                        className="w-full h-full flex items-center justify-center"
                        type="button"
                        aria-label={`download-sample-${idx}`}
                      >
                        <FaImage className="text-main-1 text-[18px] sm:text-[22px] md:text-[26px]" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-12 text-sm text-gray-500">فایل نمونه‌ای موجود نیست</div>
                )}
              </div>

              <div className="col-span-3 flex gap-[8px] justify-center items-center">
                <Image src={"/assets/icons/routing.svg"} alt="map" width={24} height={24} className="aspect-square w-[15px] md:w-[24px]" />
                {it.roadmapUrl ? (
                  <button
                    onClick={() => handleDownload(it.roadmapUrl, `${it.id}-roadmap`, "roadmap.pdf")}
                    className="font-normal text-[10px] md:text-[13px] lg:text-[14px] text-secondary-15 text-nowrap underline"
                    type="button"
                  >
                    دانلود نقشه راه
                  </button>
                ) : (
                  <div className="text-sm text-gray-500">نقشه راه ندارد</div>
                )}
              </div>

              <div className="col-span-3 flex justify-center">
                {it.guideUrl ? (
                  <button
                    onClick={() => handleDownload(it.guideUrl, `${it.id}-guide`, "guide.pdf")}
                    className="shadow-[0px_2px_4px_0px_#1E132840] bg-main-1 w-[100px] h-[45px] rounded-[8px] flex justify-center items-center text-white"
                    type="button"
                  >
                    <Image src={"/assets/icons/book-saved.svg"} alt="book" width={24} height={24} />
                    <span className="mr-2 text-sm">کتابچه</span>
                  </button>
                ) : (
                  <div className="text-sm text-gray-500">راهنما ندارد</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
    </div>
  );
}

export default Page;
