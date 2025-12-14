"use client";

import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Document from "./Document";

const DocumentSlider = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useKeenSlider: return ref and instanceRef so we can update when items change
  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
    slides: { perView: 1, spacing: 5 },
    loop: true,
  });

  useEffect(() => {
    let mounted = true;
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
        const res = await fetch("/api/user-proposal-uploads/?ordering=-uploaded_at", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error(`خطا در دریافت داده: ${res.status}`);
        const data = await res.json();

        // نگاشت فیلدها و تبدیل تاریخ‌ها به Date
        const mapped = data.map((d) => ({
          id: d.id,
          title: d.title || d.file?.name || "بدون عنوان",
          fileSize: d.file_size || (d.file ? `${Math.round((d.file.size || 0) / 1024)} KB` : "-"),
          date: d.uploaded_at ? new Date(d.uploaded_at) : new Date(),
          statusText: d.status_display || d.status || "",
          statusDate: d.reviewed_at ? new Date(d.reviewed_at) : d.uploaded_at ? new Date(d.uploaded_at) : new Date(),
          statusType: d.status || "pending",
          difficulty: d.difficulty || "متوسط",
          icon: d.icon || "/assets/icons/brain.svg",
          // هر فیلد اضافی که Document نیاز داره
        }));

        if (mounted) {
          setItems(mapped);
          setLoading(false);
          // وقتی داده‌ها تغییر می‌کنن، slider رو آپدیت کن
          setTimeout(() => instanceRef.current?.update?.(), 50);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "خطای نامشخص");
          setLoading(false);
        }
      }
    };

    fetchItems();
    return () => {
      mounted = false;
    };
  }, [instanceRef]);

  if (loading) {
    return <div className="py-4 text-center">در حال بارگذاری...</div>;
  }
  if (error) {
    return <div className="py-4 text-center text-red-600">خطا: {error}</div>;
  }
  if (!items.length) {
    return <div className="py-4 text-center">موردی برای نمایش وجود ندارد.</div>;
  }

  return (
    <div ref={sliderRef} className="keen-slider py-[10px]">
      {items.map((c) => (
        <div key={c.id} className="keen-slider__slide">
          <Document {...c} />
        </div>
      ))}
    </div>
  );
};

export default DocumentSlider;
