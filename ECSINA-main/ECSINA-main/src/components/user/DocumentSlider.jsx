"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Document from "./Document";

const API_ENDPOINT = "/api/user-proposal-uploads/?ordering=-uploaded_at";

function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function mapItem(d) {
  const fileSize =
    d.file_size ??
    (d.file && (d.file.size || d.file.size === 0)
      ? `${Math.round((d.file.size || 0) / 1024)} KB`
      : "-");
  return {
    id: d.id,
    title: d.title || d.file?.name || "بدون عنوان",
    fileSize,
    date: d.uploaded_at || d.created_at || null,
    statusText: d.status_display || d.status || "",
    statusDate: d.reviewed_at || d.uploaded_at || null,
    statusType: d.status || "pending",
    difficulty: d.difficulty || "متوسط",
    icon: d.icon || "/assets/icons/brain.svg",
  };
}

function DocumentSlider() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": { slides: { perView: 2, spacing: 5 } },
      "(min-width: 1000px)": { slides: { perView: 4, spacing: 10 } },
    },
    slides: { perView: 1, spacing: 5 },
    loop: true,
  });

  const fetchItems = useCallback(
    async (signal) => {
      setLoading(true);
      setError(null);
      try {
        const headers = getAuthHeaders();
        const res = await fetch(API_ENDPOINT, { headers, signal });
        if (!res.ok) throw new Error(`خطا در دریافت داده: ${res.status}`);
        const json = await res.json();
        const raw = Array.isArray(json) ? json : json.results ?? [];
        const mapped = raw.map(mapItem);
        setItems(mapped);
        if (instanceRef.current) instanceRef.current.update?.();
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "خطای نامشخص");
        setLoading(false);
      }
    },
    [instanceRef]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchItems(controller.signal);
    return () => controller.abort();
  }, [fetchItems]);

  if (loading) {
    return (
      <div className="py-4 text-center" role="status" aria-live="polite">
        در حال بارگذاری...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-center text-red-600" role="alert">
        خطا: {error}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="py-4 text-center" role="status">
        موردی برای نمایش وجود ندارد.
      </div>
    );
  }

  return (
    <div ref={sliderRef} className="keen-slider py-[10px]" aria-roledescription="carousel">
      {items.map((c) => (
        <div key={c.id} className="keen-slider__slide">
          <Document {...c} />
        </div>
      ))}
    </div>
  );
}

export default DocumentSlider;
